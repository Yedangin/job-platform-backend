import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';
import { RuleEngineService, EvaluateVisaInput } from './rule-engine.service';
import { EvaluatorRegistryService } from './evaluators/evaluator-registry.service';
import { PointCalculatorService } from './evaluators/point-calculator.service';
import { VisaTypeWithRelations } from './evaluators/evaluator.interface';

// ============================================================
// DTO 인터페이스 / DTO Interfaces
// ============================================================

/** POST /visa/check 요청 / Check visa eligibility request */
export interface VisaCheckInput {
  visaCode: string;
  ksicCode: string;
  companySizeType?: string;
  employeeCountKorean?: number;
  employeeCountForeign?: number;
  jobType?: string;
  offeredSalary?: number;
  targetOccupationCode?: string;
  // 개인 자격요건 / Individual qualifications
  nationality?: string;
  age?: number;
  educationLevel?: string;
  koreanLevel?: string;
  workExperienceYears?: number;
  isEthnicKorean?: boolean;
  koreanAncestryCountry?: string;
  incomeGniPercent?: number;
  hasCriminalRecord?: boolean;
  hasImmigrationViolation?: boolean;
  socialIntegrationLevel?: number;
  hasRecommendation?: boolean;
  volunteerHours?: number;
  hasKoreanChild?: boolean;
  hasProperty?: boolean;
  taxYearsInKorea?: number;
}

/** POST /visa/check 응답 / Check visa eligibility response */
export interface VisaCheckResult {
  eligible: boolean;
  visaCode: string;
  visaNameKo: string;
  hours: {
    weekday: number | null;
    weekend: string | null;
    vacation: string | null;
  } | null;
  conditions: string[];
  warnings: string[];
  blockedReasons: string[];
  requiredDocuments: string[];
  score?: number;
  requiredScore?: number;
  scoreBreakdown?: Array<{
    categoryCode: string;
    categoryName: string;
    score: number;
    maxScore: number;
    detail: string;
  }>;
}

/** GET /visa/eligible-visas 응답 항목 / Eligible visa item */
export interface EligibleVisaItem {
  visaCode: string;
  visaNameKo: string;
  visaNameEn: string | null;
  employmentLevel: string;
  eligible: boolean;
  hours: { weekday: number | null; weekend: string | null; vacation: string | null } | null;
  conditions: string[];
  warnings: string[];
  blockedReasons: string[];
  requiredDocuments: string[];
  score?: number;
  requiredScore?: number;
}

/** GET /visa/transitions 응답 / Visa transition response */
export interface VisaTransitionResult {
  fromVisa: string;
  fromVisaName: string;
  transitions: Array<{
    toVisa: string;
    toVisaName: string;
    transitionType: string;
    conditions: Record<string, unknown>;
    requiredDocuments: string[];
    estimatedMonths: number | null;
    notes: string | null;
  }>;
  chains: Array<{
    chainName: string;
    visaPath: string;
    totalEstimatedYears: number | null;
    description: string | null;
  }>;
}

/**
 * 비자 적격성 체크 서비스 (소거형 알고리즘)
 * Visa eligibility check service (elimination-based algorithm)
 *
 * Phase 5 알고리즘 9단계:
 * 1. 비자 활성 상태 확인
 * 2. 자유취업 비자 즉시 통과 (F-2, F-5, F-6)
 * 3. 유흥/사행업종 일괄 소거
 * 4. 네거티브 리스트 소거 (H-2)
 * 5. 단순노무 제한 소거 (F-4)
 * 6. Evaluator 매칭 (비자별 로직)
 * 7. 근로시간 계산
 * 8. 고용인원 확인
 * 9. 추가 경고 (허가 필요 등)
 */
@Injectable()
export class VisaCheckService {
  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly ruleEngine: RuleEngineService,
    private readonly evaluatorRegistry: EvaluatorRegistryService,
    private readonly pointCalculator: PointCalculatorService,
  ) {}

  // ============================================================
  // 1. POST /visa/check — 소거형 알고리즘 기반 단일 비자 체크
  // 1. POST /visa/check — Elimination-based single visa check
  // ============================================================
  async checkVisaEligibility(input: VisaCheckInput): Promise<VisaCheckResult> {
    const { visaCode, ksicCode } = input;

    // Step 1: 비자 활성 상태 확인 / Check visa active status
    const visaType = await this.loadVisaTypeWithRelations(visaCode);
    if (!visaType) {
      throw new NotFoundException(
        `비자 유형을 찾을 수 없습니다: ${visaCode} / Visa type not found: ${visaCode}`,
      );
    }
    if (!visaType.isActive) {
      return this.buildResult(visaType, {
        eligible: false,
        blockedReasons: [`비자 ${visaCode}은(는) 현재 비활성 상태`],
      });
    }

    // 업종 플래그 사전 로드 / Pre-load industry flags
    const industryFlags = await this.loadIndustryFlags(ksicCode);

    // Step 2: 자유취업 비자 즉시 통과 / Unrestricted visa → immediate pass
    if (visaType.workType === 'unrestricted') {
      return this.buildResult(visaType, {
        eligible: true,
        hours: null,
        conditions: [],
        warnings: [],
        requiredDocuments: this.extractDocuments(visaType),
      });
    }

    // Step 3: 유흥/사행업종 일괄 소거 / Entertainment/gambling → block all
    if (industryFlags?.isEntertainment || industryFlags?.isGambling) {
      return this.buildResult(visaType, {
        eligible: false,
        blockedReasons: ['유흥업소/사행업종은 전 비자 취업 금지 업종'],
      });
    }

    // Step 4~6: Evaluator 실행 (비자별 상세 로직)
    // Steps 4-6: Run evaluator (per-visa detailed logic)
    const evalInput = this.buildEvalInput(input, industryFlags);
    const evalResult = this.evaluatorRegistry.evaluate(
      visaCode,
      evalInput,
      visaType as unknown as VisaTypeWithRelations,
    );

    if (evalResult && !evalResult.eligible) {
      return this.buildResult(visaType, {
        eligible: false,
        blockedReasons: evalResult.blockedReasons,
        warnings: evalResult.suggestions,
        requiredDocuments: evalResult.documents,
        conditions: evalResult.restrictions,
        score: evalResult.score,
        requiredScore: evalResult.requiredScore,
        scoreBreakdown: evalResult.scoreBreakdown,
      });
    }

    // Step 7: 근로시간 계산 / Work hour calculation
    const hours = this.calculateWorkHours(visaType);

    // Step 8: 고용인원 확인 / Hire quota check
    const warnings: string[] = [];
    const quotaWarning = await this.checkHireQuota(
      visaType, ksicCode, input.employeeCountKorean, input.employeeCountForeign,
    );
    if (quotaWarning) warnings.push(quotaWarning);

    // Step 9: 추가 경고 / Additional warnings
    if (visaType.permitType) {
      warnings.push(`${visaType.permitType} 필요 — 허가 완료 후 근무 가능`);
    }
    if (visaType.maxWorkplaces && visaType.maxWorkplaces === 1) {
      warnings.push('동시 1개 사업장에서만 근무 가능');
    }

    // 점수제 비자 점수 계산 / Calculate score for point-based visas
    let score: number | undefined;
    let requiredScore: number | undefined;
    let scoreBreakdown: VisaCheckResult['scoreBreakdown'];
    if (evalResult?.score !== undefined) {
      score = evalResult.score;
      requiredScore = evalResult.requiredScore;
      scoreBreakdown = evalResult.scoreBreakdown;
    }

    return this.buildResult(visaType, {
      eligible: true,
      hours,
      conditions: evalResult?.restrictions ?? [],
      warnings: [...warnings, ...(evalResult?.notes ?? [])],
      requiredDocuments: evalResult?.documents ?? this.extractDocuments(visaType),
      score,
      requiredScore,
      scoreBreakdown,
    });
  }

  // ============================================================
  // 2. GET /visa/eligible-visas — 채용공고 조건 기반 전체 비자 평가
  // 2. GET /visa/eligible-visas — Evaluate all visas for job conditions
  // ============================================================
  async getEligibleVisasForJob(jobConditions: {
    ksicCode: string;
    companySizeType: string;
    jobType: string;
    offeredSalary: number;
    employeeCountKorean: number;
    employeeCountForeign: number;
    annualRevenue?: number;
    addressRoad?: string;
    targetOccupationCode?: string;
  }): Promise<{
    eligible: EligibleVisaItem[];
    conditional: EligibleVisaItem[];
    blocked: EligibleVisaItem[];
    summary: string;
  }> {
    // EvaluateVisaInput 구성 / Build input
    const evalInput: EvaluateVisaInput = {
      ksicCode: jobConditions.ksicCode,
      companySizeType: jobConditions.companySizeType,
      jobType: jobConditions.jobType,
      offeredSalary: jobConditions.offeredSalary,
      employeeCountKorean: jobConditions.employeeCountKorean,
      employeeCountForeign: jobConditions.employeeCountForeign,
      annualRevenue: jobConditions.annualRevenue ?? 0,
      addressRoad: jobConditions.addressRoad ?? '',
      targetOccupationCode: jobConditions.targetOccupationCode,
    };

    // 기존 ruleEngine으로 전체 평가 수행 / Run full evaluation via existing engine
    const result = await this.ruleEngine.evaluateVisaEligibility(evalInput, true);

    // 결과를 3그룹으로 분류 / Classify into 3 groups
    const eligible: EligibleVisaItem[] = [];
    const conditional: EligibleVisaItem[] = [];
    const blocked: EligibleVisaItem[] = [];

    for (const ev of result.eligibleVisas) {
      const vt = await this.prisma.visaType.findUnique({ where: { code: ev.code } });
      const item: EligibleVisaItem = {
        visaCode: ev.code,
        visaNameKo: ev.nameKo,
        visaNameEn: vt?.nameEn ?? null,
        employmentLevel: vt?.employmentLevel ?? 'UNKNOWN',
        eligible: true,
        hours: vt ? this.calculateWorkHours(vt as any) : null,
        conditions: ev.restrictions ?? [],
        warnings: ev.notes ?? [],
        blockedReasons: [],
        requiredDocuments: ev.documents ?? [],
        score: ev.score,
        requiredScore: ev.requiredScore,
      };

      // 조건부: 제한사항이 있거나 점수제인 경우 / Conditional: has restrictions or is point-based
      if (ev.restrictions?.length > 0 || ev.requiredScore) {
        conditional.push(item);
      } else {
        eligible.push(item);
      }
    }

    for (const bv of result.blockedVisas) {
      const vt = await this.prisma.visaType.findUnique({ where: { code: bv.code } });
      blocked.push({
        visaCode: bv.code,
        visaNameKo: bv.nameKo,
        visaNameEn: vt?.nameEn ?? null,
        employmentLevel: vt?.employmentLevel ?? 'UNKNOWN',
        eligible: false,
        hours: null,
        conditions: [],
        warnings: bv.suggestions ?? [],
        blockedReasons: bv.reasons ?? [],
        requiredDocuments: [],
      });
    }

    return {
      eligible,
      conditional,
      blocked,
      summary: `채용가능 ${eligible.length}개, 조건부 ${conditional.length}개, 불가 ${blocked.length}개`,
    };
  }

  // ============================================================
  // 3. GET /visa/eligible-jobs/:visaCode — 비자로 허용되는 업종/직종 조건
  // 3. GET /visa/eligible-jobs/:visaCode — Allowed industries/occupations for visa
  // ============================================================
  async getEligibleJobConditions(visaCode: string): Promise<{
    visaCode: string;
    visaNameKo: string;
    employmentLevel: string;
    workType: string | null;
    allowedIndustries: Array<{ ksicCode: string; nameKo: string }>;
    allowedOccupations: Array<{ kscoCode: string; nameKo: string }>;
    prohibitedIndustries: Array<{ ksicCode: string; reasonKo: string | null }>;
    restrictions: string[];
    maxWeeklyHours: number | null;
    permitType: string | null;
  }> {
    const vt = await this.prisma.visaType.findUnique({
      where: { code: visaCode },
      include: {
        industryMappings: {
          where: { isAllowed: true },
          include: { industryCode: { select: { ksicCode: true, nameKo: true } } },
        },
        occupationMappings: {
          where: { isAllowed: true },
          include: { occupationCode: { select: { kscoCode: true, nameKo: true } } },
        },
        prohibitedIndustries: true,
      },
    });

    if (!vt) {
      throw new NotFoundException(
        `비자 유형을 찾을 수 없습니다: ${visaCode} / Visa type not found: ${visaCode}`,
      );
    }

    const restrictions: string[] = [];
    if (vt.maxWorkHoursWeekly) {
      restrictions.push(`주 ${vt.maxWorkHoursWeekly}시간 이내`);
    }
    if (vt.permitType) {
      restrictions.push(`${vt.permitType} 필요`);
    }
    if (vt.maxWorkplaces === 1) {
      restrictions.push('동시 1개 사업장에서만 근무 가능');
    }

    return {
      visaCode: vt.code,
      visaNameKo: vt.nameKo,
      employmentLevel: vt.employmentLevel,
      workType: vt.workType,
      allowedIndustries: vt.industryMappings.map(m => ({
        ksicCode: m.industryCode.ksicCode,
        nameKo: m.industryCode.nameKo,
      })),
      allowedOccupations: vt.occupationMappings.map(m => ({
        kscoCode: m.occupationCode.kscoCode,
        nameKo: m.occupationCode.nameKo,
      })),
      prohibitedIndustries: vt.prohibitedIndustries.map(p => ({
        ksicCode: p.ksicCode,
        reasonKo: p.reasonKo,
      })),
      restrictions,
      maxWeeklyHours: vt.maxWorkHoursWeekly,
      permitType: vt.permitType,
    };
  }

  // ============================================================
  // 4. GET /visa/transitions/:visaCode — 비자 전환 경로 조회
  // 4. GET /visa/transitions/:visaCode — Visa transition paths
  // ============================================================
  async getVisaTransitions(visaCode: string): Promise<VisaTransitionResult> {
    const vt = await this.prisma.visaType.findUnique({
      where: { code: visaCode },
    });
    if (!vt) {
      throw new NotFoundException(
        `비자 유형을 찾을 수 없습니다: ${visaCode} / Visa type not found: ${visaCode}`,
      );
    }

    // 전환 경로 조회 (현재 비자 → 다음 비자) / Load transitions (from this visa)
    const transitions = await this.prisma.visaTransition.findMany({
      where: { fromVisa: visaCode },
      orderBy: { priority: 'asc' },
    });

    // 전환 체인 조회 (이 비자가 포함된 체인) / Load chains containing this visa
    const allChains = await this.prisma.visaTransitionChain.findMany({
      where: { isActive: true },
    });
    const relevantChains = allChains.filter(
      c => c.visaPath.includes(visaCode),
    );

    // 전환 대상 비자 이름 조회 / Load target visa names
    const toVisaCodes = transitions.map(t => t.toVisa);
    const toVisaTypes = await this.prisma.visaType.findMany({
      where: { code: { in: toVisaCodes } },
      select: { code: true, nameKo: true },
    });
    const visaNameMap = new Map(toVisaTypes.map(v => [v.code, v.nameKo]));

    // 전환별 필요서류 조회 / Load required documents for target visas
    const transitionResults = await Promise.all(
      transitions.map(async (t) => {
        let conditions: Record<string, unknown> = {};
        try {
          conditions = JSON.parse(t.conditions ?? '{}');
        } catch { /* 파싱 실패 무시 / Ignore parse error */ }

        // 대상 비자의 서류 / Target visa documents
        const targetVt = await this.prisma.visaType.findUnique({
          where: { code: t.toVisa },
          include: { requiredDocuments: { where: { isRequired: true }, orderBy: { sortOrder: 'asc' } } },
        });
        const docs = targetVt?.requiredDocuments.map(d => d.documentName) ?? [];

        return {
          toVisa: t.toVisa,
          toVisaName: visaNameMap.get(t.toVisa) ?? t.toVisa,
          transitionType: t.transitionType,
          conditions,
          requiredDocuments: docs,
          estimatedMonths: t.grantedStayMonths,
          notes: t.noteKo,
        };
      }),
    );

    return {
      fromVisa: visaCode,
      fromVisaName: vt.nameKo,
      transitions: transitionResults,
      chains: relevantChains.map(c => ({
        chainName: c.chainNameKo,
        visaPath: c.visaPath,
        totalEstimatedYears: c.totalEstimatedYears ? Number(c.totalEstimatedYears) : null,
        description: c.descriptionKo,
      })),
    };
  }

  // ============================================================
  // 내부 헬퍼 메서드 / Internal helper methods
  // ============================================================

  /** 비자 타입 + 관계 데이터 로드 / Load visa type with all relations */
  private async loadVisaTypeWithRelations(visaCode: string) {
    return this.prisma.visaType.findFirst({
      where: { code: visaCode },
      include: {
        countryRestrictions: true,
        industryMappings: { include: { industryCode: true } },
        occupationMappings: { include: { occupationCode: true } },
        requiredDocuments: { orderBy: { sortOrder: 'asc' } },
        prohibitedIndustries: true,
        workHourRules: { orderBy: { priority: 'desc' } },
        hireQuotaRules: { include: { industryCode: true } },
        pointCategories: {
          include: { criteria: { orderBy: { sortOrder: 'asc' } } },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
  }

  /** 업종 플래그 로드 (exact match + prefix fallback) / Load industry flags */
  private async loadIndustryFlags(ksicCode: string) {
    const exact = await this.prisma.industryCode.findFirst({
      where: { ksicCode },
    });
    if (exact) {
      return {
        isSimpleLabor: exact.isSimpleLabor,
        isEntertainment: exact.isEntertainment,
        isGambling: exact.isGambling,
        isGigWork: exact.isGigWork,
        requiresSafetyTraining: exact.requiresSafetyTraining,
        platformTag: exact.platformTag,
      };
    }
    // 상위 코드 fallback / Parent code fallback
    const parent = await this.prisma.industryCode.findFirst({
      where: { ksicCode: ksicCode.substring(0, 2) },
    });
    if (parent) {
      return {
        isSimpleLabor: parent.isSimpleLabor,
        isEntertainment: parent.isEntertainment,
        isGambling: parent.isGambling,
        isGigWork: parent.isGigWork,
        requiresSafetyTraining: parent.requiresSafetyTraining,
        platformTag: parent.platformTag,
      };
    }
    return null;
  }

  /** EvaluateVisaInput 구성 / Build EvaluateVisaInput from check input */
  private buildEvalInput(
    input: VisaCheckInput,
    industryFlags: Awaited<ReturnType<typeof this.loadIndustryFlags>>,
  ): EvaluateVisaInput {
    return {
      ksicCode: input.ksicCode,
      companySizeType: input.companySizeType ?? 'SME',
      employeeCountKorean: input.employeeCountKorean ?? 10,
      employeeCountForeign: input.employeeCountForeign ?? 0,
      annualRevenue: 0,
      addressRoad: '',
      jobType: input.jobType ?? 'FULL_TIME',
      offeredSalary: input.offeredSalary ?? 0,
      nationality: input.nationality,
      age: input.age,
      educationLevel: input.educationLevel,
      koreanLevel: input.koreanLevel,
      workExperienceYears: input.workExperienceYears,
      targetOccupationCode: input.targetOccupationCode,
      isEthnicKorean: input.isEthnicKorean,
      koreanAncestryCountry: input.koreanAncestryCountry,
      incomeGniPercent: input.incomeGniPercent,
      hasCriminalRecord: input.hasCriminalRecord,
      hasImmigrationViolation: input.hasImmigrationViolation,
      socialIntegrationLevel: input.socialIntegrationLevel,
      hasRecommendation: input.hasRecommendation,
      volunteerHours: input.volunteerHours,
      hasKoreanChild: input.hasKoreanChild,
      hasProperty: input.hasProperty,
      taxYearsInKorea: input.taxYearsInKorea,
      inputIndustryFlags: industryFlags ?? undefined,
    };
  }

  /** 근로시간 계산 / Calculate work hours from visa type */
  private calculateWorkHours(visaType: {
    baseWeeklyHours?: number | null;
    maxWorkHoursWeekly?: number | null;
    weekendHolidayRule?: string | null;
    vacationRule?: string | null;
    workType?: string | null;
  }): VisaCheckResult['hours'] {
    if (visaType.workType === 'unrestricted') return null;

    const weekday = visaType.baseWeeklyHours ?? visaType.maxWorkHoursWeekly ?? null;
    return {
      weekday,
      weekend: visaType.weekendHolidayRule ?? null,
      vacation: visaType.vacationRule ?? null,
    };
  }

  /** 고용인원 확인 / Check hire quota */
  private async checkHireQuota(
    visaType: any,
    ksicCode: string,
    koreanCount?: number,
    foreignCount?: number,
  ): Promise<string | null> {
    const quotaRules = visaType.hireQuotaRules ?? [];
    if (quotaRules.length === 0) return null;

    // 업종 매칭되는 쿼터 규칙 찾기 / Find matching quota rule for industry
    const matchedQuota = quotaRules.find(
      (q: any) => ksicCode.startsWith(q.industryCode.ksicCode),
    );
    if (!matchedQuota) return null;

    const domestic = koreanCount ?? 0;
    if (domestic >= matchedQuota.domesticMin) {
      return `고용허용인원: 내국인 ${matchedQuota.domesticMin}명 이상 시 외국인 ${matchedQuota.foreignQuota}명 고용 가능`;
    }
    return `고용쿼터 미충족: 내국인 ${domestic}명 < 최소 ${matchedQuota.domesticMin}명`;
  }

  /** 서류 추출 / Extract required documents */
  private extractDocuments(visaType: any): string[] {
    return (visaType.requiredDocuments ?? [])
      .filter((d: any) => d.isRequired)
      .map((d: any) => d.documentName);
  }

  /** 결과 빌드 / Build result object */
  private buildResult(
    visaType: any,
    data: Partial<VisaCheckResult>,
  ): VisaCheckResult {
    return {
      eligible: data.eligible ?? false,
      visaCode: visaType.code,
      visaNameKo: visaType.nameKo,
      hours: data.hours ?? this.calculateWorkHours(visaType),
      conditions: data.conditions ?? [],
      warnings: data.warnings ?? [],
      blockedReasons: data.blockedReasons ?? [],
      requiredDocuments: data.requiredDocuments ?? this.extractDocuments(visaType),
      score: data.score,
      requiredScore: data.requiredScore,
      scoreBreakdown: data.scoreBreakdown,
    };
  }
}
