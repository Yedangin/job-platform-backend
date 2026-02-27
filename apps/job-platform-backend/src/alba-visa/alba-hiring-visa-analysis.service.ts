/**
 * 알바 고용주 비자 분석 서비스
 * Alba Hiring Manager Visa Analysis Service
 *
 * @visaCode       ALL (11 visa types: F-2, F-5, F-6, F-4, H-1, H-2, D-2, D-4, D-10, F-1, F-3)
 * @legalBasis     출입국관리법 시행령 제12조 별표1 / Immigration Control Act Enforcement Decree Art. 12, Schedule 1
 *                 외국인근로자의 고용 등에 관한 법률 / Act on Employment of Foreign Workers
 * @conditionSummary
 *   - 유흥업소 → 모든 비자 차단 (Entertainment → block ALL)
 *   - 단순노무 → F-4 제외 (Simple labor → remove F-4)
 *   - H-2 네거티브 리스트 → H-2 제외 (H-2 negative list → remove H-2)
 *   - 근무시간 초과 → D-2 >25h, D-4 >20h, H-1 >25h 제외 (Hour limits)
 * @lastVerified   2026-02-23
 */

import { Injectable, BadRequestException } from '@nestjs/common';
import {
  AlbaHiringVisaAnalysisRequestDto,
  AlbaHiringVisaAnalysisResponseDto,
  HiringVisaStatusDto,
} from './dto/alba-hiring-visa-analysis.dto';
import { getKsicMapping } from '../common/data/visa';
import {
  getH2JobCategoryMapping,
  isH2NegativeJobCategory,
  isH2NegativeException,
  isH2ConditionalJobCategory,
  type H2JobCategoryMapping,
} from './data/h2-negative-list';
import {
  getF4RestrictionType,
  isF4ExceptionAllowed,
  F4_EXCEPTION_ALLOWED_CODES,
  F4_SIMPLE_LABOR_BLOCKED_CODES,
} from './data/f4-simple-labor';

// ─── Visa Definition ───

interface VisaDefinition {
  visaCode: string;
  visaName: string;
  visaNameEn: string;
  category: 'free' | 'permit';
  maxWeeklyHours: number | null; // null = unlimited
}

const INITIAL_VISA_LIST: VisaDefinition[] = [
  // Free Employment (자유취업)
  {
    visaCode: 'F-2',
    visaName: '거주',
    visaNameEn: 'Residence',
    category: 'free',
    maxWeeklyHours: null,
  },
  {
    visaCode: 'F-5',
    visaName: '영주',
    visaNameEn: 'Permanent Residence',
    category: 'free',
    maxWeeklyHours: null,
  },
  {
    visaCode: 'F-6',
    visaName: '결혼이민',
    visaNameEn: 'Marriage Immigration',
    category: 'free',
    maxWeeklyHours: null,
  },
  {
    visaCode: 'F-4',
    visaName: '재외동포',
    visaNameEn: 'Overseas Korean',
    category: 'free',
    maxWeeklyHours: null,
  },
  {
    visaCode: 'H-1',
    visaName: '워킹홀리데이',
    visaNameEn: 'Working Holiday',
    category: 'free',
    maxWeeklyHours: 25,
  },
  {
    visaCode: 'H-2',
    visaName: '방문취업',
    visaNameEn: 'Visit & Employment',
    category: 'free',
    maxWeeklyHours: null,
  },

  // Permit Required (허가 필요)
  {
    visaCode: 'D-2',
    visaName: '유학',
    visaNameEn: 'Study Abroad',
    category: 'permit',
    maxWeeklyHours: 25,
  },
  {
    visaCode: 'D-4',
    visaName: '어학연수',
    visaNameEn: 'Language Training',
    category: 'permit',
    maxWeeklyHours: 20,
  },
  {
    visaCode: 'D-10',
    visaName: '구직',
    visaNameEn: 'Job Seeking',
    category: 'permit',
    maxWeeklyHours: null,
  },
  {
    visaCode: 'F-1',
    visaName: '방문동거',
    visaNameEn: 'Family Visit',
    category: 'permit',
    maxWeeklyHours: null,
  },
  {
    visaCode: 'F-3',
    visaName: '동반',
    visaNameEn: 'Dependent Family',
    category: 'permit',
    maxWeeklyHours: null,
  },
];

/** 비자 평가 컨텍스트 / Visa evaluation context */
interface EvaluationContext {
  jobCategoryCode: string;
  isSimpleLabor: boolean;
  isEntertainment: boolean;
  isDepopulationArea: boolean;
  weeklyHours: number;
  h2Mapping: H2JobCategoryMapping | undefined;
}

@Injectable()
export class AlbaHiringVisaAnalysisService {
  /**
   * 고용주 입력 기반 비자 분석 실행
   * Execute visa analysis based on hiring manager input
   */
  analyze(
    dto: AlbaHiringVisaAnalysisRequestDto,
  ): AlbaHiringVisaAnalysisResponseDto {
    const { jobCategoryCode, weeklyHours } = dto;
    const isDepopulationArea = dto.isDepopulationArea ?? false;

    // ─── 1. KSIC 매핑 조회 ───
    const mapping = getKsicMapping(jobCategoryCode);
    if (!mapping) {
      throw new BadRequestException(
        `알 수 없는 직종 코드입니다: ${jobCategoryCode} / Unknown job category code`,
      );
    }

    const isSimpleLabor = mapping.isSimpleLabor;
    const isEntertainment = mapping.isEntertainment;

    // H-2: 직종 코드 기반 정밀 판정 (대분류 레벨 아닌 중분류/소분류 레벨)
    // H-2: Precise per-job-category determination (mid/sub-category level, not section level)
    const h2Mapping = getH2JobCategoryMapping(jobCategoryCode);
    const isBlockedForH2 = isH2NegativeJobCategory(jobCategoryCode);

    // ─── 2. 평가 컨텍스트 구성 ───
    const ctx: EvaluationContext = {
      jobCategoryCode,
      isSimpleLabor,
      isEntertainment,
      isDepopulationArea,
      weeklyHours,
      h2Mapping,
    };

    // ─── 3. 필터링 실행 ───
    const appliedRules: string[] = [];
    const freeEmployment: HiringVisaStatusDto[] = [];
    const permitRequired: HiringVisaStatusDto[] = [];
    const blocked: HiringVisaStatusDto[] = [];

    for (const visa of INITIAL_VISA_LIST) {
      const result = this.evaluateVisa(visa, ctx, appliedRules);

      if (result.status === 'blocked') {
        blocked.push(result);
      } else if (visa.category === 'free') {
        freeEmployment.push(result);
      } else {
        permitRequired.push(result);
      }
    }

    // ─── 4. 응답 구성 ───
    return {
      freeEmployment,
      permitRequired,
      blocked,
      appliedRules: [...new Set(appliedRules)],
      inputSummary: {
        jobCategoryCode,
        ksicCode: mapping.ksicCode,
        weeklyHours,
        isSimpleLabor,
        isEntertainment,
        isBlockedForH2,
        isDepopulationArea,
      },
      summary: {
        totalEligible:
          freeEmployment.filter((v) => v.status === 'eligible').length +
          permitRequired.filter((v) => v.status === 'eligible').length,
        totalRestricted:
          freeEmployment.filter((v) => v.status === 'restricted').length +
          permitRequired.filter((v) => v.status === 'restricted').length,
        totalBlocked: blocked.length,
      },
      analyzedAt: new Date().toISOString(),
    };
  }

  /**
   * 개별 비자 평가 (법적 근거 기반 4가지 규칙)
   * Evaluate a single visa against all filtering rules (law-based 4 rules)
   */
  private evaluateVisa(
    visa: VisaDefinition,
    ctx: EvaluationContext,
    appliedRules: string[],
  ): HiringVisaStatusDto {
    const result: HiringVisaStatusDto = {
      visaCode: visa.visaCode,
      visaName: visa.visaName,
      visaNameEn: visa.visaNameEn,
      status: 'eligible',
      requiresPermit: visa.category === 'permit',
      maxWeeklyHours: visa.maxWeeklyHours,
      reason: null,
    };

    // ─── Rule 1: Adult Entertainment → Block ALL ───
    if (ctx.isEntertainment) {
      result.status = 'blocked';
      result.reason =
        '유흥업소는 모든 외국인 비자에서 취업이 금지됩니다. / Adult entertainment venues prohibit employment for all foreign visa holders.';
      appliedRules.push(
        'Adult Entertainment → 모든 비자 차단 / All visas blocked',
      );
      return result;
    }

    // ─── Rule 2: F-4 Restriction (3-tier: morals > public interest > simple labor) ───
    if (visa.visaCode === 'F-4') {
      const f4Restriction = getF4RestrictionType(ctx.jobCategoryCode);

      if (f4Restriction === 'PUBLIC_MORALS') {
        result.status = 'blocked';
        result.reason =
          'F-4 비자는 선량한 풍속 위반 업종(유흥업소 등) 취업이 금지됩니다. / F-4 visa prohibits employment in public morals violation industries.';
        appliedRules.push('Public Morals → F-4 차단 / F-4 blocked');
        return result;
      }

      if (f4Restriction === 'PUBLIC_INTEREST') {
        result.status = 'blocked';
        result.reason =
          'F-4 비자는 공공이익 제한 직종 취업이 금지됩니다. / F-4 visa prohibits employment in public interest restricted jobs.';
        appliedRules.push('Public Interest → F-4 차단 / F-4 blocked');
        return result;
      }

      if (f4Restriction === 'SIMPLE_LABOR') {
        // 2024 예외 직종 확인 / Check 2024 exception list
        if (isF4ExceptionAllowed(ctx.jobCategoryCode)) {
          const exception = F4_EXCEPTION_ALLOWED_CODES.find(
            (e) => e.jobCategoryCode === ctx.jobCategoryCode,
          );
          result.status = 'eligible';
          result.reason = exception
            ? `${exception.reasonKo} / ${exception.reasonEn}`
            : '2024년 법무부 예외 허용 직종 / 2024 MOJ exception allowed';
          appliedRules.push(
            'Simple Labor → F-4 예외 허용 / F-4 exception allowed',
          );
          return result;
        }

        // 인구감소지역 → 단순노무 제한 해제 / Depopulation area → restriction lifted
        if (ctx.isDepopulationArea) {
          result.status = 'restricted';
          result.reason =
            '인구감소지역에서는 F-4 단순노무 제한이 해제됩니다 (F-4-R). / F-4 simple labor restriction is lifted in depopulation areas (F-4-R).';
          appliedRules.push(
            'Simple Labor + 인구감소지역 → F-4 제한적 허용 / F-4 conditionally allowed',
          );
          return result;
        }

        // 일반 지역 단순노무 → 차단 / Non-depopulation simple labor → block
        const blockedEntry = F4_SIMPLE_LABOR_BLOCKED_CODES.find(
          (e) => e.jobCategoryCode === ctx.jobCategoryCode,
        );
        result.status = 'blocked';
        result.reason = blockedEntry
          ? `${blockedEntry.reasonKo} / ${blockedEntry.reasonEn}`
          : '단순노무 업종은 F-4 비자로 취업할 수 없습니다 (인구감소지역 제외). / Simple labor jobs are not permitted under F-4 visa (except depopulation areas).';
        appliedRules.push('Simple Labor → F-4 차단 / F-4 blocked');
        return result;
      }
    }

    // ─── Rule 3: H-2 Negative List (직종 코드 기반 정밀 판정) ───
    if (visa.visaCode === 'H-2' && ctx.h2Mapping) {
      if (ctx.h2Mapping.isNegative && !ctx.h2Mapping.isException) {
        // 조건부(회색지대) 직종은 restricted로 처리
        // Conditional (gray area) jobs are treated as restricted
        if (isH2ConditionalJobCategory(ctx.jobCategoryCode)) {
          result.status = 'restricted';
          result.reason = `${ctx.h2Mapping.reasonKo} / ${ctx.h2Mapping.reasonEn}`;
          appliedRules.push(
            'Industry Restriction → H-2 조건부 / H-2 conditional',
          );
          return result;
        }

        result.status = 'blocked';
        result.reason = `${ctx.h2Mapping.reasonKo} / ${ctx.h2Mapping.reasonEn}`;
        appliedRules.push('Industry Restriction → H-2 차단 / H-2 blocked');
        return result;
      }

      // 예외 허용 (네거티브 중분류이나 소분류 예외)
      // Exception allowed (negative mid-category but sub-category exception)
      if (ctx.h2Mapping.isNegative && ctx.h2Mapping.isException) {
        result.status = 'eligible';
        result.reason = `${ctx.h2Mapping.reasonKo} / ${ctx.h2Mapping.reasonEn}`;
        appliedRules.push(
          'Industry Exception → H-2 예외 허용 / H-2 exception allowed',
        );
        return result;
      }
    }

    // ─── Rule 4: Working Hours Limit ───

    // D-2: > 25h/week → blocked
    if (visa.visaCode === 'D-2' && ctx.weeklyHours > 25) {
      result.status = 'blocked';
      result.reason = `D-2 비자는 주 25시간을 초과할 수 없습니다 (현재: ${ctx.weeklyHours}시간). / D-2 visa cannot exceed 25 hours/week (current: ${ctx.weeklyHours}h).`;
      appliedRules.push('Working Hours → D-2 차단 (>25h) / D-2 blocked (>25h)');
      return result;
    }

    // D-4: > 20h/week → blocked
    if (visa.visaCode === 'D-4' && ctx.weeklyHours > 20) {
      result.status = 'blocked';
      result.reason = `D-4 비자는 주 20시간을 초과할 수 없습니다 (현재: ${ctx.weeklyHours}시간). / D-4 visa cannot exceed 20 hours/week (current: ${ctx.weeklyHours}h).`;
      appliedRules.push('Working Hours → D-4 차단 (>20h) / D-4 blocked (>20h)');
      return result;
    }

    // H-1: > 25h/week → blocked
    if (visa.visaCode === 'H-1' && ctx.weeklyHours > 25) {
      result.status = 'blocked';
      result.reason = `H-1 비자는 주 25시간을 초과할 수 없습니다 (현재: ${ctx.weeklyHours}시간). / H-1 visa cannot exceed 25 hours/week (current: ${ctx.weeklyHours}h).`;
      appliedRules.push('Working Hours → H-1 차단 (>25h) / H-1 blocked (>25h)');
      return result;
    }

    // ─── Hour-restricted but within limit → mark as restricted ───
    if (
      visa.maxWeeklyHours !== null &&
      ctx.weeklyHours <= visa.maxWeeklyHours
    ) {
      result.status = 'restricted';
      result.reason = `주 ${visa.maxWeeklyHours}시간 이내 근무 가능 (허가 필요). / May work up to ${visa.maxWeeklyHours}h/week (permit required).`;
    }

    return result;
  }
}
