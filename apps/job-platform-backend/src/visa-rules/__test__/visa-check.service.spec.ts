/**
 * visa-check.service.ts 테스트
 * Tests for visa check service (4 endpoints)
 *
 * 테스트 구조:
 * 1. POST /visa/check — 소거 알고리즘 단일 비자 체크
 * 2. GET /visa/eligible-visas — 채용조건 기반 전체 비자 평가
 * 3. GET /visa/eligible-jobs/:visaCode — 비자별 허용 업종/직종
 * 4. GET /visa/transitions/:visaCode — 비자 전환 경로
 */

import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

// Prisma 서비스 mock (generated 모듈 해결) / Mock Prisma services (avoid generated module resolution)
class MockAuthPrismaService {}
class MockRedisService {}

jest.mock('libs/common/src', () => ({
  AuthPrismaService: MockAuthPrismaService,
  RedisService: MockRedisService,
}));

import { VisaCheckService, VisaCheckInput } from '../visa-check.service';
import { RuleEngineService } from '../rule-engine.service';
import { EvaluatorRegistryService } from '../evaluators/evaluator-registry.service';
import { PointCalculatorService } from '../evaluators/point-calculator.service';
import { AuthPrismaService, RedisService } from 'libs/common/src';

// ============================================================
// Mock 설정 / Mock setup
// ============================================================

const mockPrisma = {
  visaType: {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
  industryCode: {
    findFirst: jest.fn(),
  },
  visaTransition: {
    findMany: jest.fn(),
  },
  visaTransitionChain: {
    findMany: jest.fn(),
  },
};

const mockRuleEngine = {
  evaluateVisaEligibility: jest.fn(),
  evaluateSingleVisa: jest.fn(),
};

const mockEvaluatorRegistry = {
  evaluate: jest.fn(),
  hasEvaluator: jest.fn(),
  getEvaluator: jest.fn(),
};

const mockPointCalculator = {
  calculateScore: jest.fn(),
};

const mockRedis = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
};

// 테스트용 비자 타입 데이터 / Test visa type data
const mockF2VisaType = {
  id: 1n,
  code: 'F-2',
  nameKo: '거주',
  nameEn: 'Residence',
  category: 'RESIDENCE',
  isActive: true,
  employmentLevel: 'FULL',
  workType: 'unrestricted',
  permitType: null,
  baseWeeklyHours: null,
  maxWorkHoursWeekly: null,
  weekendHolidayRule: null,
  vacationRule: null,
  maxWorkplaces: null,
  metadata: null,
  countryRestrictions: [],
  industryMappings: [],
  occupationMappings: [],
  requiredDocuments: [
    { documentName: '여권 사본', isRequired: true, sortOrder: 1 },
  ],
  prohibitedIndustries: [],
  workHourRules: [],
  hireQuotaRules: [],
  pointCategories: [],
};

const mockE9VisaType = {
  id: 2n,
  code: 'E-9',
  nameKo: '비전문취업',
  nameEn: 'Non-Professional Employment',
  category: 'WORK',
  isActive: true,
  employmentLevel: 'LIMITED',
  workType: 'employment_permit',
  permitType: '고용허가',
  baseWeeklyHours: null,
  maxWorkHoursWeekly: null,
  weekendHolidayRule: null,
  vacationRule: null,
  maxWorkplaces: 1,
  metadata: null,
  countryRestrictions: [],
  industryMappings: [
    { industryCode: { ksicCode: 'C', nameKo: '제조업' }, isAllowed: true },
  ],
  occupationMappings: [],
  requiredDocuments: [
    { documentName: '표준근로계약서', isRequired: true, sortOrder: 1 },
    { documentName: '건강진단서', isRequired: true, sortOrder: 2 },
  ],
  prohibitedIndustries: [],
  workHourRules: [],
  hireQuotaRules: [],
  pointCategories: [],
};

const mockD2VisaType = {
  id: 3n,
  code: 'D-2',
  nameKo: '유학',
  nameEn: 'Study Abroad',
  category: 'STUDY',
  isActive: true,
  employmentLevel: 'PART_TIME',
  workType: 'part_time_permit_required',
  permitType: '체류자격외활동허가',
  baseWeeklyHours: 20,
  maxWorkHoursWeekly: 20,
  weekendHolidayRule: 'unlimited',
  vacationRule: 'unlimited',
  maxWorkplaces: 1,
  metadata: null,
  countryRestrictions: [],
  industryMappings: [],
  occupationMappings: [],
  requiredDocuments: [],
  prohibitedIndustries: [],
  workHourRules: [],
  hireQuotaRules: [],
  pointCategories: [],
};

describe('VisaCheckService', () => {
  let service: VisaCheckService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisaCheckService,
        { provide: AuthPrismaService, useValue: mockPrisma },
        { provide: RuleEngineService, useValue: mockRuleEngine },
        { provide: EvaluatorRegistryService, useValue: mockEvaluatorRegistry },
        { provide: PointCalculatorService, useValue: mockPointCalculator },
        { provide: RedisService, useValue: mockRedis },
      ],
    }).compile();

    service = module.get<VisaCheckService>(VisaCheckService);
  });

  // ============================================================
  // 1. POST /visa/check 테스트
  // ============================================================
  describe('checkVisaEligibility', () => {
    const baseInput: VisaCheckInput = {
      visaCode: 'F-2',
      ksicCode: 'C10',
      companySizeType: 'SME',
      jobType: 'FULL_TIME',
      offeredSalary: 300,
      employeeCountKorean: 10,
      employeeCountForeign: 2,
    };

    it('비자 미발견 시 NotFoundException / NotFoundException when visa not found', async () => {
      mockPrisma.visaType.findFirst.mockResolvedValue(null);

      await expect(
        service.checkVisaEligibility({ ...baseInput, visaCode: 'X-99' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('비활성 비자 → eligible: false / Inactive visa → not eligible', async () => {
      mockPrisma.visaType.findFirst.mockResolvedValue({
        ...mockF2VisaType,
        isActive: false,
      });
      mockPrisma.industryCode.findFirst.mockResolvedValue(null);

      const result = await service.checkVisaEligibility(baseInput);
      expect(result.eligible).toBe(false);
      expect(result.blockedReasons).toContainEqual(
        expect.stringContaining('비활성'),
      );
    });

    it('자유취업 비자(F-2) → 즉시 eligible / Unrestricted visa (F-2) → immediate pass', async () => {
      mockPrisma.visaType.findFirst.mockResolvedValue(mockF2VisaType);
      mockPrisma.industryCode.findFirst.mockResolvedValue(null);

      const result = await service.checkVisaEligibility(baseInput);
      expect(result.eligible).toBe(true);
      expect(result.visaCode).toBe('F-2');
      expect(result.hours).toBeNull(); // 무제한 / Unlimited
      expect(result.requiredDocuments).toContain('여권 사본');
    });

    it('유흥업종 → 전 비자 금지 / Entertainment industry → blocked for all visas', async () => {
      mockPrisma.visaType.findFirst.mockResolvedValue({
        ...mockE9VisaType,
        workType: 'employment_permit',
      });
      mockPrisma.industryCode.findFirst.mockResolvedValue({
        isSimpleLabor: false,
        isEntertainment: true,
        isGambling: false,
        isGigWork: false,
        requiresSafetyTraining: false,
        platformTag: null,
      });

      const result = await service.checkVisaEligibility({
        ...baseInput,
        visaCode: 'E-9',
        ksicCode: '56221',
      });
      expect(result.eligible).toBe(false);
      expect(result.blockedReasons).toContainEqual(
        expect.stringContaining('유흥'),
      );
    });

    it('사행업종 → 전 비자 금지 / Gambling industry → blocked for all visas', async () => {
      mockPrisma.visaType.findFirst.mockResolvedValue({
        ...mockE9VisaType,
        workType: 'employment_permit',
      });
      mockPrisma.industryCode.findFirst.mockResolvedValue({
        isSimpleLabor: false,
        isEntertainment: false,
        isGambling: true,
        isGigWork: false,
        requiresSafetyTraining: false,
        platformTag: null,
      });

      const result = await service.checkVisaEligibility({
        ...baseInput,
        visaCode: 'E-9',
        ksicCode: '9121',
      });
      expect(result.eligible).toBe(false);
      expect(result.blockedReasons).toContainEqual(
        expect.stringContaining('사행'),
      );
    });

    it('Evaluator 불합격 시 blocked reasons 반환 / Evaluator rejection returns blocked reasons', async () => {
      mockPrisma.visaType.findFirst.mockResolvedValue(mockE9VisaType);
      mockPrisma.industryCode.findFirst.mockResolvedValue({
        isSimpleLabor: false, isEntertainment: false, isGambling: false,
        isGigWork: false, requiresSafetyTraining: false, platformTag: null,
      });
      mockEvaluatorRegistry.evaluate.mockReturnValue({
        eligible: false,
        blockedReasons: ['국적 US은(는) 허용 국가 목록에 포함되지 않음'],
        suggestions: ['E-9 비자는 MOU 17개국만 가능'],
        documents: ['표준근로계약서'],
        restrictions: [],
        notes: [],
        matchedIndustries: [],
        matchedOccupations: [],
      });

      const result = await service.checkVisaEligibility({
        ...baseInput,
        visaCode: 'E-9',
        nationality: 'US',
      });
      expect(result.eligible).toBe(false);
      expect(result.blockedReasons).toContain(
        '국적 US은(는) 허용 국가 목록에 포함되지 않음',
      );
    });

    it('Evaluator 합격 시 시간/조건/서류 반환 / Evaluator pass returns hours/conditions/documents', async () => {
      mockPrisma.visaType.findFirst.mockResolvedValue(mockD2VisaType);
      mockPrisma.industryCode.findFirst.mockResolvedValue({
        isSimpleLabor: false, isEntertainment: false, isGambling: false,
        isGigWork: false, requiresSafetyTraining: false, platformTag: null,
      });
      mockEvaluatorRegistry.evaluate.mockReturnValue({
        eligible: true,
        blockedReasons: [],
        suggestions: [],
        documents: ['시간제취업 허가서'],
        restrictions: ['학기 중 주 20시간 이내'],
        notes: ['방학 중 무제한 근무 가능'],
        matchedIndustries: ['C10'],
        matchedOccupations: [],
      });

      const result = await service.checkVisaEligibility({
        ...baseInput,
        visaCode: 'D-2',
        jobType: 'PART_TIME',
      });
      expect(result.eligible).toBe(true);
      expect(result.hours).toBeDefined();
      expect(result.hours?.weekday).toBe(20);
      expect(result.conditions).toContain('학기 중 주 20시간 이내');
      expect(result.requiredDocuments).toContain('시간제취업 허가서');
    });

    it('허가 필요 비자 → warning 포함 / Permit-required visa → includes warning', async () => {
      mockPrisma.visaType.findFirst.mockResolvedValue(mockD2VisaType);
      mockPrisma.industryCode.findFirst.mockResolvedValue(null);
      mockEvaluatorRegistry.evaluate.mockReturnValue({
        eligible: true,
        blockedReasons: [],
        suggestions: [],
        documents: [],
        restrictions: [],
        notes: [],
        matchedIndustries: [],
        matchedOccupations: [],
      });

      const result = await service.checkVisaEligibility({
        ...baseInput,
        visaCode: 'D-2',
      });
      expect(result.warnings).toContainEqual(
        expect.stringContaining('체류자격외활동허가'),
      );
    });
  });

  // ============================================================
  // 2. GET /visa/eligible-visas 테스트
  // ============================================================
  describe('getEligibleVisasForJob', () => {
    it('전체 비자 평가 결과를 3그룹으로 분류 / Classifies results into 3 groups', async () => {
      mockRuleEngine.evaluateVisaEligibility.mockResolvedValue({
        eligibleVisas: [
          {
            code: 'F-2',
            nameKo: '거주',
            documents: ['여권'],
            restrictions: [],
            notes: ['자유취업'],
          },
          {
            code: 'E-7',
            nameKo: '특정활동',
            documents: ['고용계약서'],
            restrictions: ['사업장 제한'],
            notes: [],
            requiredScore: undefined,
          },
        ],
        blockedVisas: [
          {
            code: 'B-1',
            nameKo: '사증면제',
            reasons: ['취업불가 비자'],
            suggestions: ['취업비자 변경 필요'],
          },
        ],
        summary: '',
        appliedRuleCount: 5,
        evaluatedAt: new Date().toISOString(),
      });
      mockPrisma.visaType.findUnique.mockImplementation(({ where }: any) => {
        if (where.code === 'F-2') return { nameEn: 'Residence', employmentLevel: 'FULL', workType: 'unrestricted' };
        if (where.code === 'E-7') return { nameEn: 'Special Activities', employmentLevel: 'CONDITIONAL', workType: 'employer_specific' };
        if (where.code === 'B-1') return { nameEn: 'Visa Exemption', employmentLevel: 'PROHIBITED' };
        return null;
      });

      const result = await service.getEligibleVisasForJob({
        ksicCode: 'C10',
        companySizeType: 'SME',
        jobType: 'FULL_TIME',
        offeredSalary: 300,
        employeeCountKorean: 10,
        employeeCountForeign: 2,
      });

      expect(result.eligible.length).toBeGreaterThanOrEqual(1);
      expect(result.blocked.length).toBe(1);
      expect(result.summary).toContain('채용가능');
      expect(result.blocked[0].visaCode).toBe('B-1');
    });

    it('빈 결과 처리 / Handles empty results', async () => {
      mockRuleEngine.evaluateVisaEligibility.mockResolvedValue({
        eligibleVisas: [],
        blockedVisas: [],
        summary: '0개 비자 발급 가능',
        appliedRuleCount: 0,
        evaluatedAt: new Date().toISOString(),
      });

      const result = await service.getEligibleVisasForJob({
        ksicCode: 'Z99',
        companySizeType: 'SME',
        jobType: 'FULL_TIME',
        offeredSalary: 0,
        employeeCountKorean: 0,
        employeeCountForeign: 0,
      });

      expect(result.eligible).toHaveLength(0);
      expect(result.conditional).toHaveLength(0);
      expect(result.blocked).toHaveLength(0);
    });
  });

  // ============================================================
  // 3. GET /visa/eligible-jobs/:visaCode 테스트
  // ============================================================
  describe('getEligibleJobConditions', () => {
    it('비자별 허용 업종/직종 반환 / Returns allowed industries and occupations', async () => {
      mockPrisma.visaType.findUnique.mockResolvedValue({
        code: 'E-9',
        nameKo: '비전문취업',
        employmentLevel: 'LIMITED',
        workType: 'employment_permit',
        maxWorkHoursWeekly: null,
        permitType: '고용허가',
        maxWorkplaces: 1,
        industryMappings: [
          { industryCode: { ksicCode: 'C', nameKo: '제조업' }, isAllowed: true },
          { industryCode: { ksicCode: 'F', nameKo: '건설업' }, isAllowed: true },
        ],
        occupationMappings: [],
        prohibitedIndustries: [],
      });

      const result = await service.getEligibleJobConditions('E-9');
      expect(result.visaCode).toBe('E-9');
      expect(result.allowedIndustries).toHaveLength(2);
      expect(result.allowedIndustries[0].ksicCode).toBe('C');
      expect(result.restrictions).toContain('고용허가 필요');
      expect(result.restrictions).toContain('동시 1개 사업장에서만 근무 가능');
    });

    it('비자 미발견 시 NotFoundException / Throws NotFoundException for unknown visa', async () => {
      mockPrisma.visaType.findUnique.mockResolvedValue(null);

      await expect(
        service.getEligibleJobConditions('X-99'),
      ).rejects.toThrow(NotFoundException);
    });

    it('H-2 금지업종 목록 반환 / Returns prohibited industries for H-2', async () => {
      mockPrisma.visaType.findUnique.mockResolvedValue({
        code: 'H-2',
        nameKo: '방문취업',
        employmentLevel: 'LIMITED',
        workType: 'negative_list',
        maxWorkHoursWeekly: null,
        permitType: null,
        maxWorkplaces: null,
        industryMappings: [],
        occupationMappings: [],
        prohibitedIndustries: [
          { ksicCode: 'G', reasonKo: '소매업 일부 제한' },
          { ksicCode: 'K', reasonKo: '금융업 제한' },
        ],
      });

      const result = await service.getEligibleJobConditions('H-2');
      expect(result.prohibitedIndustries).toHaveLength(2);
      expect(result.prohibitedIndustries[0].ksicCode).toBe('G');
    });
  });

  // ============================================================
  // 4. GET /visa/transitions/:visaCode 테스트
  // ============================================================
  describe('getVisaTransitions', () => {
    it('전환 경로 + 체인 반환 / Returns transitions and chains', async () => {
      mockPrisma.visaType.findUnique.mockImplementation(({ where }: any) => {
        if (where.code === 'D-2') return {
          code: 'D-2', nameKo: '유학',
          requiredDocuments: [
            { documentName: '재학증명서', isRequired: true, sortOrder: 1 },
          ],
        };
        if (where.code === 'D-10') return {
          code: 'D-10', nameKo: '구직',
          requiredDocuments: [
            { documentName: '졸업증명서', isRequired: true, sortOrder: 1 },
          ],
        };
        return null;
      });

      mockPrisma.visaTransition.findMany.mockResolvedValue([
        {
          id: 1n,
          fromVisa: 'D-2',
          toVisa: 'D-10',
          transitionType: 'upgrade',
          conditions: JSON.stringify({ degree_min: 'bachelor' }),
          grantedStayMonths: 6,
          noteKo: '졸업 후 구직활동',
          priority: 1,
          isActive: true,
          effectiveFrom: new Date(),
          effectiveUntil: null,
          legalBasis: null,
          scoringSystemId: null,
          scoringExemptConditions: null,
          maxExtensions: null,
          createdAt: new Date(),
        },
      ]);

      mockPrisma.visaType.findMany.mockResolvedValue([
        { code: 'D-10', nameKo: '구직' },
      ]);

      mockPrisma.visaTransitionChain.findMany.mockResolvedValue([
        {
          id: 1n,
          chainNameKo: '유학생 취업 경로',
          visaPath: 'D-2 → D-10 → E-7',
          totalEstimatedYears: 4.5,
          descriptionKo: '유학 → 구직활동 → 전문인력 취업',
          isActive: true,
        },
      ]);

      const result = await service.getVisaTransitions('D-2');
      expect(result.fromVisa).toBe('D-2');
      expect(result.fromVisaName).toBe('유학');
      expect(result.transitions).toHaveLength(1);
      expect(result.transitions[0].toVisa).toBe('D-10');
      expect(result.transitions[0].transitionType).toBe('upgrade');
      expect(result.transitions[0].conditions).toHaveProperty('degree_min');
      expect(result.transitions[0].requiredDocuments).toContain('졸업증명서');
      expect(result.chains).toHaveLength(1);
      expect(result.chains[0].visaPath).toBe('D-2 → D-10 → E-7');
    });

    it('비자 미발견 시 NotFoundException / Throws NotFoundException', async () => {
      mockPrisma.visaType.findUnique.mockResolvedValue(null);

      await expect(
        service.getVisaTransitions('X-99'),
      ).rejects.toThrow(NotFoundException);
    });

    it('전환 경로 없는 비자 / Visa with no transitions', async () => {
      mockPrisma.visaType.findUnique.mockResolvedValue({
        code: 'F-5', nameKo: '영주',
      });
      mockPrisma.visaTransition.findMany.mockResolvedValue([]);
      mockPrisma.visaType.findMany.mockResolvedValue([]);
      mockPrisma.visaTransitionChain.findMany.mockResolvedValue([]);

      const result = await service.getVisaTransitions('F-5');
      expect(result.transitions).toHaveLength(0);
      expect(result.chains).toHaveLength(0);
    });
  });
});
