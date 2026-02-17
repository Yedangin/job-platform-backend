import { Injectable, Optional } from '@nestjs/common';
import { AuthPrismaService, RedisService } from 'libs/common/src';
import { EvaluatorRegistryService } from './evaluators/evaluator-registry.service';
import { LoggingService } from '../logging/logging.service';
import {
  EvaluateVisaInput as EnhancedInput,
  VisaTypeWithRelations,
} from './evaluators/evaluator.interface';

// --- 타입 정의 ---
interface Clause {
  field: string;
  op: string;
  value: any;
  of?: string;
  percent?: number;
}

interface ConditionBlock {
  operator: 'AND' | 'OR';
  clauses: Clause[];
}

interface RuleAction {
  type: 'ELIGIBLE' | 'BLOCKED' | 'DOCUMENT' | 'RESTRICTION';
  documents?: string[];
  restrictions?: string[];
  notes?: string;
  reason?: string;
  suggestion?: string;
}

/** 기존 호환 + 개인측 확장 input */
export type EvaluateVisaInput = EnhancedInput;

interface VisaResult {
  visaCode: string;
  visaNameKo: string;
  eligible: boolean;
  documents: string[];
  restrictions: string[];
  notes: string[];
  blockedReasons: string[];
  suggestions: string[];
  score?: number;
  requiredScore?: number;
  scoreBreakdown?: Array<{
    categoryCode: string;
    categoryName: string;
    score: number;
    maxScore: number;
    detail: string;
  }>;
  matchedIndustries?: string[];
  matchedOccupations?: string[];
}

export interface EvaluationResult {
  eligibleVisas: {
    code: string;
    nameKo: string;
    documents: string[];
    restrictions: string[];
    notes: string[];
    score?: number;
    requiredScore?: number;
    scoreBreakdown?: Array<{
      categoryCode: string;
      categoryName: string;
      score: number;
      maxScore: number;
      detail: string;
    }>;
    matchedIndustries?: string[];
    matchedOccupations?: string[];
  }[];
  blockedVisas: {
    code: string;
    nameKo: string;
    reasons: string[];
    suggestions: string[];
  }[];
  summary: string;
  appliedRuleCount: number;
  evaluatedAt: string;
}

@Injectable()
export class RuleEngineService {
  private readonly CACHE_KEY = 'visa_rules:active';
  private readonly CACHE_TTL = 300; // 5분

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly redisService: RedisService,
    private readonly evaluatorRegistry: EvaluatorRegistryService,
    @Optional() private readonly loggingService?: LoggingService,
  ) {}

  /**
   * 비자 적격성 평가 (핵심 엔진)
   */
  async evaluateVisaEligibility(
    input: EvaluateVisaInput,
    log = true,
  ): Promise<EvaluationResult> {
    const startTime = Date.now();

    // 1. 활성 규칙 로드 (캐시 우선)
    const rules = await this.loadActiveRules();

    // 2. 비자별 결과 맵 초기화 (관계 데이터 포함)
    const visaTypes = await this.prisma.visaType.findMany({
      where: { isActive: true, parentCode: null }, // top-level만
      include: {
        countryRestrictions: true,
        industryMappings: { include: { industryCode: true } },
        occupationMappings: { include: { occupationCode: true } },
        requiredDocuments: { orderBy: { sortOrder: 'asc' } },
        // [신규] Step 2 관계 포함 / Include new Step 2 relations
        prohibitedIndustries: true,
        workHourRules: { orderBy: { priority: 'desc' } },
        hireQuotaRules: { include: { industryCode: true } },
        // [신규] 점수제 카테고리 포함 / Include point system categories
        pointCategories: {
          include: { criteria: { orderBy: { sortOrder: 'asc' } } },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    // [신규] 입력 업종코드의 DB 플래그 사전 로드 / Pre-load industry flags for input KSIC code
    const industryRecord = await this.prisma.industryCode.findFirst({
      where: { ksicCode: input.ksicCode },
    });
    if (industryRecord) {
      (input as any).inputIndustryFlags = {
        isSimpleLabor: industryRecord.isSimpleLabor,
        isEntertainment: industryRecord.isEntertainment,
        isGambling: industryRecord.isGambling,
        isGigWork: industryRecord.isGigWork,
        requiresSafetyTraining: industryRecord.requiresSafetyTraining,
        platformTag: industryRecord.platformTag,
      };
    } else {
      // 상위 코드로 prefix 매칭 시도 / Try prefix match with parent code
      const parentIndustry = await this.prisma.industryCode.findFirst({
        where: { ksicCode: input.ksicCode.substring(0, 2) },
      });
      if (parentIndustry) {
        (input as any).inputIndustryFlags = {
          isSimpleLabor: parentIndustry.isSimpleLabor,
          isEntertainment: parentIndustry.isEntertainment,
          isGambling: parentIndustry.isGambling,
          isGigWork: parentIndustry.isGigWork,
          requiresSafetyTraining: parentIndustry.requiresSafetyTraining,
          platformTag: parentIndustry.platformTag,
        };
      }
    }

    const resultsMap = new Map<string, VisaResult>();
    for (const vt of visaTypes) {
      resultsMap.set(vt.code, {
        visaCode: vt.code,
        visaNameKo: vt.nameKo,
        eligible: true,
        documents: [],
        restrictions: [],
        notes: [],
        blockedReasons: [],
        suggestions: [],
      });
    }

    // 3. 규칙 평가 (priority 순서로 정렬됨)
    const appliedRuleIds: string[] = [];
    const inputData = this.flattenInput(input);

    for (const rule of rules) {
      const visaCode = visaTypes.find((vt) => vt.id === rule.visaTypeId)?.code;
      if (!visaCode) continue;

      const result = resultsMap.get(visaCode);
      if (!result) continue;

      try {
        const conditions: ConditionBlock = JSON.parse(rule.conditions);
        const actions: RuleAction = JSON.parse(rule.actions);

        if (this.evaluateConditions(conditions, inputData)) {
          appliedRuleIds.push(rule.id.toString());
          this.applyActions(actions, result);
        }
      } catch (e) {
        console.error(`[RuleEngine] 규칙 평가 오류 (ruleId=${rule.id}):`, e);
      }
    }

    // 4. Strategy Evaluator 실행 (per-visa 알고리즘)
    for (const vt of visaTypes) {
      if (!this.evaluatorRegistry.hasEvaluator(vt.code)) continue;

      const evalResult = this.evaluatorRegistry.evaluate(
        vt.code,
        input,
        vt as unknown as VisaTypeWithRelations,
      );
      if (!evalResult) continue;

      const existing = resultsMap.get(vt.code);
      if (!existing) continue;

      // Evaluator 결과를 기존 JSON rule 결과와 병합
      if (!evalResult.eligible) {
        existing.eligible = false;
        existing.blockedReasons.push(...evalResult.blockedReasons);
        existing.suggestions.push(...evalResult.suggestions);
      }
      existing.documents.push(...evalResult.documents);
      existing.restrictions.push(...evalResult.restrictions);
      existing.notes.push(...evalResult.notes);
      if (evalResult.score !== undefined) existing.score = evalResult.score;
      if (evalResult.requiredScore !== undefined)
        existing.requiredScore = evalResult.requiredScore;
      if (evalResult.scoreBreakdown)
        existing.scoreBreakdown = evalResult.scoreBreakdown;
      existing.matchedIndustries = evalResult.matchedIndustries;
      existing.matchedOccupations = evalResult.matchedOccupations;
    }

    // 5. 결과 컴파일
    const eligibleVisas: EvaluationResult['eligibleVisas'] = [];
    const blockedVisas: EvaluationResult['blockedVisas'] = [];

    for (const [, result] of resultsMap) {
      if (result.eligible && result.blockedReasons.length === 0) {
        eligibleVisas.push({
          code: result.visaCode,
          nameKo: result.visaNameKo,
          documents: [...new Set(result.documents)],
          restrictions: [...new Set(result.restrictions)],
          notes: [...new Set(result.notes)],
          score: result.score,
          requiredScore: result.requiredScore,
          scoreBreakdown: result.scoreBreakdown,
          matchedIndustries: result.matchedIndustries,
          matchedOccupations: result.matchedOccupations,
        });
      } else if (result.blockedReasons.length > 0) {
        blockedVisas.push({
          code: result.visaCode,
          nameKo: result.visaNameKo,
          reasons: [...new Set(result.blockedReasons)],
          suggestions: [...new Set(result.suggestions)],
        });
      }
    }

    const evaluationResult: EvaluationResult = {
      eligibleVisas,
      blockedVisas,
      summary: `${eligibleVisas.length}개 비자 발급 가능, ${blockedVisas.length}개 제한`,
      appliedRuleCount: appliedRuleIds.length,
      evaluatedAt: new Date().toISOString(),
    };

    // 6. 로그 기록 (PostgreSQL + MongoDB)
    if (log) {
      const durationMs = Date.now() - startTime;
      try {
        await this.prisma.visaEvaluationLog.create({
          data: {
            requestData: JSON.stringify(input),
            eligibleVisas: JSON.stringify(eligibleVisas),
            blockedVisas: JSON.stringify(blockedVisas),
            appliedRuleIds: appliedRuleIds.join(','),
            durationMs,
          },
        });
      } catch (e) {
        console.error('[RuleEngine] 평가 로그 기록 실패:', e);
      }

      // 매칭 로그 (MongoDB) / Matching log to MongoDB
      if (this.loggingService) {
        const eligibleCodes = eligibleVisas.map((v) => v.code);
        this.loggingService.logMatching({
          inputData: JSON.stringify(input),
          eligibleCount: eligibleVisas.length,
          eligibleVisas: JSON.stringify(eligibleCodes),
          blockedCount: blockedVisas.length,
          durationMs,
        });
      }
    }

    return evaluationResult;
  }

  /**
   * 활성 규칙 로드 (Redis 캐시)
   */
  private async loadActiveRules() {
    // 캐시 확인
    const cached = await this.redisService.get(this.CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }

    const now = new Date();
    const rules = await this.prisma.visaRule.findMany({
      where: {
        status: 'ACTIVE',
        effectiveFrom: { lte: now },
        OR: [{ effectiveTo: null }, { effectiveTo: { gte: now } }],
      },
      orderBy: { priority: 'asc' },
    });

    // BigInt → string 변환 (JSON 직렬화용)
    const serializable = rules.map((r) => ({
      ...r,
      id: r.id.toString(),
      visaTypeId: r.visaTypeId.toString(),
      parentRuleId: r.parentRuleId?.toString() || null,
    }));

    await this.redisService.set(
      this.CACHE_KEY,
      JSON.stringify(serializable),
      this.CACHE_TTL,
    );

    return serializable;
  }

  /**
   * 입력 데이터 평탄화
   */
  private flattenInput(input: EvaluateVisaInput): Record<string, any> {
    return {
      // Company-side
      ksicCode: input.ksicCode,
      companySizeType: input.companySizeType,
      employeeCountKorean: Number(input.employeeCountKorean),
      employeeCountForeign: Number(input.employeeCountForeign),
      annualRevenue: Number(input.annualRevenue),
      addressRoad: input.addressRoad,
      jobType: input.jobType,
      offeredSalary: Number(input.offeredSalary),
      // Individual-side (새로 추가)
      nationality: input.nationality,
      age: input.age ? Number(input.age) : undefined,
      educationLevel: input.educationLevel,
      koreanLevel: input.koreanLevel,
      workExperienceYears: input.workExperienceYears
        ? Number(input.workExperienceYears)
        : undefined,
      currentVisaCode: input.currentVisaCode,
      targetOccupationCode: input.targetOccupationCode,
      isEthnicKorean: input.isEthnicKorean,
    };
  }

  /**
   * 조건 블록 평가
   */
  private evaluateConditions(
    block: ConditionBlock,
    input: Record<string, any>,
  ): boolean {
    if (!block.clauses || block.clauses.length === 0) return true;

    if (block.operator === 'OR') {
      return block.clauses.some((clause) => this.evaluateClause(clause, input));
    }
    // AND (기본값)
    return block.clauses.every((clause) => this.evaluateClause(clause, input));
  }

  /**
   * 개별 clause 평가
   */
  private evaluateClause(clause: Clause, input: Record<string, any>): boolean {
    const fieldValue = input[clause.field];
    if (fieldValue === undefined || fieldValue === null) return false;

    switch (clause.op) {
      case 'EQ':
        return String(fieldValue) === String(clause.value);
      case 'NEQ':
        return String(fieldValue) !== String(clause.value);
      case 'GT':
        return Number(fieldValue) > Number(clause.value);
      case 'GTE':
        return Number(fieldValue) >= Number(clause.value);
      case 'LT':
        return Number(fieldValue) < Number(clause.value);
      case 'LTE':
        return Number(fieldValue) <= Number(clause.value);
      case 'IN':
        return Array.isArray(clause.value) && clause.value.includes(fieldValue);
      case 'NOT_IN':
        return (
          Array.isArray(clause.value) && !clause.value.includes(fieldValue)
        );
      case 'STARTS_WITH':
        return String(fieldValue).startsWith(String(clause.value));
      case 'CONTAINS':
        return String(fieldValue).includes(String(clause.value));
      case 'PERCENTAGE_LTE': {
        const refValue = Number(input[clause.of || '']);
        if (refValue === 0) return Number(fieldValue) === 0;
        const threshold = refValue * ((clause.percent || 0) / 100);
        return Number(fieldValue) <= threshold;
      }
      default:
        console.warn(`[RuleEngine] 알 수 없는 연산자: ${clause.op}`);
        return false;
    }
  }

  /**
   * 액션 적용
   */
  private applyActions(actions: RuleAction, result: VisaResult): void {
    switch (actions.type) {
      case 'ELIGIBLE':
        if (actions.documents) result.documents.push(...actions.documents);
        if (actions.restrictions)
          result.restrictions.push(...actions.restrictions);
        if (actions.notes) result.notes.push(actions.notes);
        break;
      case 'BLOCKED':
        result.eligible = false;
        if (actions.reason) result.blockedReasons.push(actions.reason);
        if (actions.suggestion) result.suggestions.push(actions.suggestion);
        break;
      case 'DOCUMENT':
        if (actions.documents) result.documents.push(...actions.documents);
        break;
      case 'RESTRICTION':
        if (actions.restrictions)
          result.restrictions.push(...actions.restrictions);
        if (actions.notes) result.notes.push(actions.notes);
        break;
    }
  }

  /**
   * 단일 비자 적격성 평가 (특정 비자 코드만 평가 — Goal B 필터링용)
   * Evaluate a single visa code against a job/company + individual input
   */
  async evaluateSingleVisa(
    input: EvaluateVisaInput,
    targetVisaCode: string,
  ): Promise<{
    eligible: boolean;
    documents: string[];
    restrictions: string[];
    notes: string[];
    blockedReasons: string[];
    suggestions: string[];
    score?: number;
    requiredScore?: number;
    scoreBreakdown?: Array<{
      categoryCode: string;
      categoryName: string;
      score: number;
      maxScore: number;
      detail: string;
    }>;
    matchedIndustries?: string[];
    matchedOccupations?: string[];
  }> {
    // 1. 대상 비자 타입 로드 (관계 포함)
    // 1. Load target visa type with relations
    const visaType = await this.prisma.visaType.findFirst({
      where: {
        code: targetVisaCode,
        isActive: true,
      },
      include: {
        countryRestrictions: true,
        industryMappings: { include: { industryCode: true } },
        occupationMappings: { include: { occupationCode: true } },
        requiredDocuments: { orderBy: { sortOrder: 'asc' } },
        // [신규] Step 2 관계 포함 / Include new Step 2 relations
        prohibitedIndustries: true,
        workHourRules: { orderBy: { priority: 'desc' } },
        hireQuotaRules: { include: { industryCode: true } },
        // [신규] 점수제 카테고리 포함 / Include point system categories
        pointCategories: {
          include: { criteria: { orderBy: { sortOrder: 'asc' } } },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    // [신규] 입력 업종코드의 DB 플래그 사전 로드 / Pre-load industry flags
    if (!input.inputIndustryFlags) {
      const industryRecord = await this.prisma.industryCode.findFirst({
        where: { ksicCode: input.ksicCode },
      });
      if (industryRecord) {
        (input as any).inputIndustryFlags = {
          isSimpleLabor: industryRecord.isSimpleLabor,
          isEntertainment: industryRecord.isEntertainment,
          isGambling: industryRecord.isGambling,
          isGigWork: industryRecord.isGigWork,
          requiresSafetyTraining: industryRecord.requiresSafetyTraining,
          platformTag: industryRecord.platformTag,
        };
      } else {
        const parentIndustry = await this.prisma.industryCode.findFirst({
          where: { ksicCode: input.ksicCode.substring(0, 2) },
        });
        if (parentIndustry) {
          (input as any).inputIndustryFlags = {
            isSimpleLabor: parentIndustry.isSimpleLabor,
            isEntertainment: parentIndustry.isEntertainment,
            isGambling: parentIndustry.isGambling,
            isGigWork: parentIndustry.isGigWork,
            requiresSafetyTraining: parentIndustry.requiresSafetyTraining,
            platformTag: parentIndustry.platformTag,
          };
        }
      }
    }

    if (!visaType) {
      return {
        eligible: false,
        documents: [],
        restrictions: [],
        notes: [],
        blockedReasons: [
          `비자 유형을 찾을 수 없습니다: ${targetVisaCode} / Visa type not found: ${targetVisaCode}`,
        ],
        suggestions: [],
      };
    }

    // 2. 초기 결과
    // 2. Initialize result
    const result = {
      eligible: true,
      documents: [] as string[],
      restrictions: [] as string[],
      notes: [] as string[],
      blockedReasons: [] as string[],
      suggestions: [] as string[],
      score: undefined as number | undefined,
      requiredScore: undefined as number | undefined,
      scoreBreakdown: undefined as
        | Array<{
            categoryCode: string;
            categoryName: string;
            score: number;
            maxScore: number;
            detail: string;
          }>
        | undefined,
      matchedIndustries: undefined as string[] | undefined,
      matchedOccupations: undefined as string[] | undefined,
    };

    // 3. JSON 규칙 평가 (해당 비자만)
    // 3. Evaluate JSON rules (for this visa only)
    const rules = await this.loadActiveRules();
    const inputData = this.flattenInput(input);

    for (const rule of rules) {
      if (rule.visaTypeId !== visaType.id.toString()) continue;

      try {
        const conditions: ConditionBlock = JSON.parse(rule.conditions);
        const actions: RuleAction = JSON.parse(rule.actions);

        if (this.evaluateConditions(conditions, inputData)) {
          switch (actions.type) {
            case 'ELIGIBLE':
              if (actions.documents)
                result.documents.push(...actions.documents);
              if (actions.restrictions)
                result.restrictions.push(...actions.restrictions);
              if (actions.notes) result.notes.push(actions.notes);
              break;
            case 'BLOCKED':
              result.eligible = false;
              if (actions.reason)
                result.blockedReasons.push(actions.reason);
              if (actions.suggestion)
                result.suggestions.push(actions.suggestion);
              break;
            case 'DOCUMENT':
              if (actions.documents)
                result.documents.push(...actions.documents);
              break;
            case 'RESTRICTION':
              if (actions.restrictions)
                result.restrictions.push(...actions.restrictions);
              if (actions.notes) result.notes.push(actions.notes);
              break;
          }
        }
      } catch (e) {
        // 규칙 파싱 오류 무시 / Ignore rule parse errors
      }
    }

    // 4. Strategy Evaluator 실행 (해당 비자만)
    // 4. Run strategy evaluator (for this visa only)
    if (this.evaluatorRegistry.hasEvaluator(visaType.code)) {
      const evalResult = this.evaluatorRegistry.evaluate(
        visaType.code,
        input,
        visaType as unknown as VisaTypeWithRelations,
      );

      if (evalResult) {
        if (!evalResult.eligible) {
          result.eligible = false;
          result.blockedReasons.push(...evalResult.blockedReasons);
          result.suggestions.push(...evalResult.suggestions);
        }
        result.documents.push(...evalResult.documents);
        result.restrictions.push(...evalResult.restrictions);
        result.notes.push(...evalResult.notes);
        if (evalResult.score !== undefined) result.score = evalResult.score;
        if (evalResult.requiredScore !== undefined)
          result.requiredScore = evalResult.requiredScore;
        if (evalResult.scoreBreakdown)
          result.scoreBreakdown = evalResult.scoreBreakdown;
        result.matchedIndustries = evalResult.matchedIndustries;
        result.matchedOccupations = evalResult.matchedOccupations;
      }
    }

    // 5. 중복 제거
    // 5. Deduplicate
    result.documents = [...new Set(result.documents)];
    result.restrictions = [...new Set(result.restrictions)];
    result.notes = [...new Set(result.notes)];
    result.blockedReasons = [...new Set(result.blockedReasons)];
    result.suggestions = [...new Set(result.suggestions)];

    return result;
  }

  /**
   * 규칙 캐시 무효화
   */
  async invalidateCache(): Promise<void> {
    await this.redisService.del(this.CACHE_KEY);
  }
}
