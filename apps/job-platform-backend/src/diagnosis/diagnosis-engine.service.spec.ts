import { Test, TestingModule } from '@nestjs/testing';

// Prisma 서비스 목킹 / Mock Prisma services
jest.mock('libs/common/src', () => {
  class _AuthPrismaService {}
  return { AuthPrismaService: _AuthPrismaService };
});

import { DiagnosisEngineService, DiagnosisInput, DiagnosisResult } from './diagnosis-engine.service';
import { AuthPrismaService } from 'libs/common/src';

describe('DiagnosisEngineService', () => {
  let service: DiagnosisEngineService;
  let mockPrisma: any;

  beforeEach(async () => {
    mockPrisma = {
      diagnosisSession: {
        create: jest.fn().mockResolvedValue({ sessionId: 1n }),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
      },
      diagnosisPathwayClick: {
        create: jest.fn().mockResolvedValue({ clickId: 1n }),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiagnosisEngineService,
        { provide: AuthPrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<DiagnosisEngineService>(DiagnosisEngineService);
  });

  // ============================================================
  // 테스트 케이스 1: 베트남 24세 고졸 / 연 500만원 / 안정취업
  // Test Case 1: Vietnamese, 24, high school, 500만원, stability
  // ============================================================
  describe('케이스 1: 베트남 24세 고졸 안정취업 / Vietnamese 24yo HS stability', () => {
    let result: DiagnosisResult;

    beforeEach(async () => {
      const input: DiagnosisInput = {
        nationality: 'VNM',
        age: 24,
        educationLevel: 'high_school',
        availableAnnualFund: 500,
        finalGoal: 'employment',
        priorityPreference: 'stability',
      };
      result = await service.diagnose(input);
    });

    it('진단 결과가 존재해야 함 / should return diagnosis result', () => {
      expect(result).toBeDefined();
      expect(result.pathways).toBeDefined();
      expect(result.meta.totalPathwaysEvaluated).toBe(15);
    });

    it('최소 1개 이상 경로 추천 / should recommend at least 1 pathway', () => {
      expect(result.pathways.length).toBeGreaterThanOrEqual(1);
    });

    it('최대 5개 경로 / should return max 5 pathways', () => {
      expect(result.pathways.length).toBeLessThanOrEqual(5);
    });

    it('PW-003 (어학당→전문대) 점수 18점 / PW-003 score should be 18', () => {
      // 55 * (85/100) * 0.6 * 0.8 * 1.0 * 0.8 = 17.952 → 18
      const pw003 = result.pathways.find(p => p.pathwayId === 'PW-003');
      expect(pw003).toBeDefined();
      expect(pw003!.finalScore).toBe(18);
    });

    it('EPS(PW-006)가 포함되어야 함 (VNM은 EPS 16개국) / PW-006 should be included for VNM', () => {
      const pw006 = result.pathways.find(p => p.pathwayId === 'PW-006');
      expect(pw006).toBeDefined();
    });

    it('워킹홀리데이(PW-008)는 제외 (VNM은 WH 미대상) / PW-008 should be excluded', () => {
      const pw008 = result.pathways.find(p => p.pathwayId === 'PW-008');
      expect(pw008).toBeUndefined();
    });

    it('동포 경로(PW-014, PW-015)는 제외 / ethnic Korean paths should be excluded', () => {
      const pw014 = result.pathways.find(p => p.pathwayId === 'PW-014');
      const pw015 = result.pathways.find(p => p.pathwayId === 'PW-015');
      expect(pw014).toBeUndefined();
      expect(pw015).toBeUndefined();
    });

    it('점수 내림차순 정렬 / should be sorted by score descending', () => {
      for (let i = 1; i < result.pathways.length; i++) {
        expect(result.pathways[i - 1].finalScore).toBeGreaterThanOrEqual(result.pathways[i].finalScore);
      }
    });

    it('feasibilityLabel이 올바르게 부여됨 / should have correct feasibility labels', () => {
      for (const pw of result.pathways) {
        if (pw.finalScore >= 71) expect(pw.feasibilityLabel).toBe('높음');
        else if (pw.finalScore >= 51) expect(pw.feasibilityLabel).toBe('보통');
        else if (pw.finalScore >= 31) expect(pw.feasibilityLabel).toBe('낮음');
        else if (pw.finalScore >= 1) expect(pw.feasibilityLabel).toBe('매우낮음');
        else expect(pw.feasibilityLabel).toBe('불가');
      }
    });

    it('DB에 세션 저장 호출 / should save session to DB', () => {
      expect(mockPrisma.diagnosisSession.create).toHaveBeenCalledTimes(1);
    });
  });

  // ============================================================
  // 테스트 케이스 2: 미국 28세 학사 IT전공 / 연 2000만원 / 빠르게
  // Test Case 2: American, 28, bachelor, IT, 2000만원, speed
  // ============================================================
  describe('케이스 2: 미국 28세 학사 IT 빠르게 / American 28yo Bachelor IT speed', () => {
    let result: DiagnosisResult;

    beforeEach(async () => {
      const input: DiagnosisInput = {
        nationality: 'USA',
        age: 28,
        educationLevel: 'bachelor',
        availableAnnualFund: 2000,
        finalGoal: 'employment',
        priorityPreference: 'speed',
        major: 'IT',
      };
      result = await service.diagnose(input);
    });

    it('진단 결과가 존재해야 함 / should return diagnosis result', () => {
      expect(result).toBeDefined();
      expect(result.pathways.length).toBeGreaterThanOrEqual(1);
    });

    it('E-7 해외초청(PW-009)이 포함 / PW-009 should be included for bachelor+', () => {
      const pw009 = result.pathways.find(p => p.pathwayId === 'PW-009');
      expect(pw009).toBeDefined();
    });

    it('E-7 국내전환(PW-010)이 포함 (USA domesticE7=true) / PW-010 should be included', () => {
      const pw010 = result.pathways.find(p => p.pathwayId === 'PW-010');
      expect(pw010).toBeDefined();
    });

    it('PW-010 점수 25점 / PW-010 score should be 25', () => {
      // 30 * (75/100) * 1.0 * 1.0 * 1.0 * 1.1 = 24.75 → 25
      const pw010 = result.pathways.find(p => p.pathwayId === 'PW-010');
      expect(pw010).toBeDefined();
      expect(pw010!.finalScore).toBe(25);
    });

    it('EPS(PW-006)는 제외 (USA는 EPS 미대상) / PW-006 should be excluded for USA', () => {
      const pw006 = result.pathways.find(p => p.pathwayId === 'PW-006');
      expect(pw006).toBeUndefined();
    });

    it('워킹홀리데이(PW-008)는 제외 (USA whCountry=false) / PW-008 excluded for USA', () => {
      const pw008 = result.pathways.find(p => p.pathwayId === 'PW-008');
      expect(pw008).toBeUndefined();
    });

    it('GKS 학부(PW-001)는 나이 초과로 제외 / PW-001 excluded (age>25)', () => {
      const pw001 = result.pathways.find(p => p.pathwayId === 'PW-001');
      expect(pw001).toBeUndefined();
    });

    it('scoreBreakdown이 포함됨 / should include score breakdown', () => {
      for (const pw of result.pathways) {
        expect(pw.scoreBreakdown).toBeDefined();
        expect(pw.scoreBreakdown.base).toBeGreaterThan(0);
      }
    });
  });

  // ============================================================
  // 테스트 케이스 3: 중국(조선족) 35세 전문학사 / 연 1000만원 / 최소비용
  // Test Case 3: Chinese ethnic Korean, 35, associate, 1000만원, cost
  // ============================================================
  describe('케이스 3: 중국 조선족 35세 전문학사 최소비용 / Chinese-Korean 35yo Associate cost', () => {
    let result: DiagnosisResult;

    beforeEach(async () => {
      const input: DiagnosisInput = {
        nationality: 'CHN',
        age: 35,
        educationLevel: 'associate',
        availableAnnualFund: 1000,
        finalGoal: 'employment',
        priorityPreference: 'cost',
        isEthnicKorean: true,
      };
      result = await service.diagnose(input);
    });

    it('진단 결과가 존재해야 함 / should return diagnosis result', () => {
      expect(result).toBeDefined();
      expect(result.pathways.length).toBeGreaterThanOrEqual(1);
    });

    it('H-2 방문취업(PW-014) 포함 (동포+중국) / PW-014 should be included for ethnic Korean CHN', () => {
      const pw014 = result.pathways.find(p => p.pathwayId === 'PW-014');
      expect(pw014).toBeDefined();
    });

    it('PW-014 점수 35점 / PW-014 score should be 35', () => {
      // 55 * (70/100) * 0.9 * 1.0 * 1.0 * 1.0 = 34.65 → 35
      const pw014 = result.pathways.find(p => p.pathwayId === 'PW-014');
      expect(pw014).toBeDefined();
      expect(pw014!.finalScore).toBe(35);
    });

    it('F-4 재외동포(PW-015) 포함 (동포+전문학사) / PW-015 should be included', () => {
      const pw015 = result.pathways.find(p => p.pathwayId === 'PW-015');
      expect(pw015).toBeDefined();
    });

    it('PW-015 점수 32점 / PW-015 score should be 32', () => {
      // 50 * (75/100) * 0.95 * 1.0 * 1.0 * 0.9 = 32.0625 → 32
      const pw015 = result.pathways.find(p => p.pathwayId === 'PW-015');
      expect(pw015).toBeDefined();
      expect(pw015!.finalScore).toBe(32);
    });

    it('PW-014가 PW-015보다 높은 점수 / PW-014 should score higher than PW-015', () => {
      const pw014 = result.pathways.find(p => p.pathwayId === 'PW-014');
      const pw015 = result.pathways.find(p => p.pathwayId === 'PW-015');
      expect(pw014!.finalScore).toBeGreaterThan(pw015!.finalScore);
    });

    it('E-7 경로(PW-009, PW-010)는 학력 미달 제외 / E-7 paths excluded (bachelor required)', () => {
      const pw009 = result.pathways.find(p => p.pathwayId === 'PW-009');
      const pw010 = result.pathways.find(p => p.pathwayId === 'PW-010');
      expect(pw009).toBeUndefined();
      expect(pw010).toBeUndefined();
    });

    it('EPS(PW-006)는 제외 (CHN은 EPS 미대상) / PW-006 excluded (CHN not EPS)', () => {
      const pw006 = result.pathways.find(p => p.pathwayId === 'PW-006');
      expect(pw006).toBeUndefined();
    });
  });

  // ============================================================
  // 세션 관리 테스트 / Session management tests
  // ============================================================
  describe('세션 관리 / Session management', () => {
    it('getSession: 세션 조회 / should retrieve session', async () => {
      const mockSession = {
        sessionId: 1n,
        userId: 'user-1',
        anonymousId: null,
        inputSnapshot: {},
        resultsSnapshot: {},
      };
      mockPrisma.diagnosisSession.findUnique.mockResolvedValue(mockSession);

      const session = await service.getSession(1n, 'user-1');
      expect(session).toEqual(mockSession);
    });

    it('getSession: 다른 사용자 세션 접근 불가 / should reject unauthorized access', async () => {
      const mockSession = {
        sessionId: 1n,
        userId: 'user-1',
        anonymousId: null,
      };
      mockPrisma.diagnosisSession.findUnique.mockResolvedValue(mockSession);

      const session = await service.getSession(1n, 'user-2');
      expect(session).toBeNull();
    });

    it('trackClick: 클릭 추적 저장 / should save click tracking', async () => {
      await service.trackClick(1n, 'PW-003', 1, 'detail_view');
      expect(mockPrisma.diagnosisPathwayClick.create).toHaveBeenCalledWith({
        data: {
          sessionId: 1n,
          pathwayId: 'PW-003',
          rankPosition: 1,
          actionType: 'detail_view',
        },
      });
    });

    it('getHistory: 이력 조회 / should retrieve history with pagination', async () => {
      mockPrisma.diagnosisSession.findMany.mockResolvedValue([]);
      mockPrisma.diagnosisSession.count.mockResolvedValue(0);

      const history = await service.getHistory('user-1', 1, 10);
      expect(history).toEqual({ items: [], total: 0, page: 1, limit: 10 });
    });
  });

  // ============================================================
  // 매트릭스 접근 / Matrix access
  // ============================================================
  describe('매트릭스 접근 / Matrix access', () => {
    it('getMatrix: 매트릭스 반환 / should return matrix data', () => {
      const matrix = service.getMatrix();
      expect(matrix).toBeDefined();
      expect(matrix.pathways).toBeDefined();
      expect(matrix.pathways.length).toBe(15);
    });
  });
});
