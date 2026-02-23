/**
 * D-4 어학연수비자 알바 평가기
 * D-4 Language Training Visa Alba (Part-time) Evaluator
 *
 * @visaCode       D-4
 * @legalBasis     출입국관리법 시행령 제23조 (체류자격외활동허가) / Immigration Control Act Enforcement Decree Art. 23
 *                 법무부 고시 — 어학연수생 시간제취업 허용범위 / MOJ Notice — Part-time Employment Scope for Language Trainees
 * @conditionSummary
 *   - 입국 후 6개월 경과 필수 (6-month waiting period mandatory)
 *   - 최대 1개 사업장 (Max 1 workplace)
 *   - 주 20시간 고정 — 방학/공휴일 무제한 없음 (Fixed 20h/week, no vacation unlimited)
 *   - TOPIK 2급 + 출석률 90% 이상 (TOPIK 2+ with 90%+ attendance)
 *   - TOPIK 미충족 시 주 10시간 (10h/week without TOPIK)
 *   - 거리 제한: 학교/거주지 1시간 이내 (Distance: within 1h from school/residence)
 * @lastVerified   2026-02-23
 */

import {
  AlbaJobInput,
  AlbaVisaEvalResult,
  IAlbaVisaEvaluator,
  createEmptyAlbaResult,
} from './alba-evaluator.interface';
import {
  D2_BLOCKED_KSIC_CODES,
  D2_BLOCK_DELIVERY,
  D2_CONDITIONAL_KSIC_CODES,
} from '../data/d2-blocked-industries';
import { getKsicMapping } from '../../common/data/visa';

/** D-4 최대 사업장 수 / D-4 maximum concurrent workplaces */
const D4_MAX_WORKPLACES = 1;

/**
 * D-4 TOPIK 충족 시 최대 주당 근무시간 (방학·공휴일 포함)
 * D-4 max weekly hours when TOPIK is met (including vacation/holidays)
 */
const D4_MAX_WEEKLY_HOURS_TOPIK_MET = 20;

/**
 * D-4 TOPIK 미충족 시 최대 주당 근무시간
 * D-4 max weekly hours when TOPIK is NOT met
 */
const D4_MAX_WEEKLY_HOURS_TOPIK_NOT_MET = 10;

/**
 * D-4 허가 최대 기간 (개월)
 * D-4 maximum permit duration (months)
 */
const D4_MAX_PERMIT_DURATION_MONTHS = 6;

export class D4AlbaEvaluator implements IAlbaVisaEvaluator {
  readonly visaCode = 'D-4';
  readonly visaName = '어학연수';
  readonly visaNameEn = 'Language Training';

  evaluate(input: AlbaJobInput): AlbaVisaEvalResult {
    const result = createEmptyAlbaResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
    );

    // 사업장 수 제한 설정 / Set workplace limit
    result.maxWorkplaces = D4_MAX_WORKPLACES;

    // === STEP 1: 업종 제한 확인 (D-2와 동일) / Industry restriction (same as D-2) ===
    const industryResult = this.checkIndustryRestriction(input);
    if (industryResult.blocked) {
      result.status = 'blocked';
      result.blockReasons.push(industryResult.reason);
      return result;
    }
    if (industryResult.conditional) {
      result.conditions.push(industryResult.reason);
    }

    // === STEP 2: 시간 제한 확인 / Hour limit check ===
    // D-4는 D-2와 달리 방학/공휴일 무제한 없음. 항상 주 20시간 고정.
    // Unlike D-2, D-4 has NO vacation/holiday unlimited exception. Always fixed at 20h/week.
    const hourResult = this.checkHourLimit(input);

    if (hourResult.status === 'blocked') {
      result.status = 'blocked';
      result.blockReasons.push(hourResult.reason);
      return result;
    }

    if (hourResult.status === 'eligible') {
      result.status = industryResult.conditional ? 'conditional' : 'eligible';
      result.maxWeeklyHours = hourResult.maxWeeklyHours ?? null;
    } else {
      // conditional: TOPIK 조건이 필요한 경우
      // conditional: when TOPIK condition is needed
      result.status = 'conditional';
      result.conditions.push(hourResult.reason);
      result.maxWeeklyHours = hourResult.maxWeeklyHours ?? null;
    }

    // === STEP 3: 입국 후 6개월 경과 필수 조건 / 6-month residency requirement (MANDATORY) ===
    // 이 조건은 구직자 측에서 확인 (공고 데이터로는 판별 불가)
    // This condition is checked on job seeker side (cannot determine from posting data)
    result.conditions.push(
      '입국 후 6개월 경과 후 알바 가능 (Must have been in Korea 6+ months from entry/status change)',
    );
    if (result.status === 'eligible') {
      result.status = 'conditional';
    }

    // === STEP 4: 사업장 수 제한 (1개만) / Workplace limit (1 only) ===
    const workplaceNote = `D-4 비자는 ${D4_MAX_WORKPLACES}개 사업장에서만 근무 가능 (D-4 visa allows only ${D4_MAX_WORKPLACES} workplace)`;
    result.notes = workplaceNote;

    // === STEP 5: 허가 기간 안내 / Permit duration info ===
    result.notes += ` / 허가 기간 최대 ${D4_MAX_PERMIT_DURATION_MONTHS}개월, 갱신 가능 (Permit max ${D4_MAX_PERMIT_DURATION_MONTHS} months, renewable)`;

    // === STEP 6: 방학·공휴일 무제한 없음 명시 / No vacation/holiday unlimited exception ===
    // D-2와 달리 D-4는 방학·공휴일에도 시간 제한이 동일하게 적용됨
    // Unlike D-2, D-4 hour limits apply equally during vacation/holidays
    result.notes +=
      ' / 주 20시간 (방학·공휴일 포함 — 무제한 아님) (20h/week including vacation/holidays — NOT unlimited)';

    // === STEP 7: 근무지 거리 제한 안내 / Distance restriction info ===
    // D-4: 학교/거주지에서 1시간 이내 (D-2의 수도권 90분/비수도권 60분과 다름)
    // D-4: within 1 hour from school/residence (differs from D-2's 90min/60min rule)
    result.conditions.push(
      '근무지가 학교/거주지에서 대중교통 1시간 이내여야 함 (Workplace must be within 1 hour by public transit from school/residence)',
    );

    // 체류자격외활동허가 필수 / Extra-status activity permit required
    result.requiredPermit = '체류자격외활동허가';

    return result;
  }

  /**
   * 업종 제한 확인 (D-2와 동일 로직)
   * Industry restriction check (same logic as D-2)
   *
   * 금지 업종 목록 / Blocked industries:
   * - 유흥업소 / Entertainment venues
   * - 건설업 / Construction
   * - 배달 전문 / Delivery-only
   * - 선원취업(E-10) 업종 / Fishery (E-10 type)
   * - 미성년 대상 외국어 회화지도 / Minor language tutoring
   * - 파견·도급·알선 / Dispatch/subcontract/brokerage
   */
  private checkIndustryRestriction(input: AlbaJobInput): {
    blocked: boolean;
    conditional: boolean;
    reason: string;
  } {
    // 1. 전면 금지 업종 / Fully blocked industries
    const blockedEntry = D2_BLOCKED_KSIC_CODES.find(
      (entry) => entry.ksicCode === input.ksicCode,
    );
    if (blockedEntry) {
      return {
        blocked: true,
        conditional: false,
        reason: blockedEntry.reasonKo.replace('D-2', 'D-4'),
      };
    }

    // 2. 배달 전문 금지 / Delivery block
    if (D2_BLOCK_DELIVERY) {
      const mapping = getKsicMapping(input.jobCategoryCode);
      if (mapping?.isDelivery) {
        return {
          blocked: true,
          conditional: false,
          reason:
            'D-4 비자는 배달 전문 업종 취업이 금지됩니다 (D-4 visa prohibits delivery-only jobs)',
        };
      }
    }

    // 3. 유흥업소 / Entertainment venues
    const mapping = getKsicMapping(input.jobCategoryCode);
    if (mapping?.isEntertainment) {
      return {
        blocked: true,
        conditional: false,
        reason:
          'D-4 비자는 유흥업소 취업이 전면 금지됩니다 (D-4 visa fully blocks entertainment venue employment)',
      };
    }

    // 4. 조건부 업종 (제조업 등) / Conditional industries (manufacturing, etc.)
    const conditionalEntry = D2_CONDITIONAL_KSIC_CODES.find(
      (entry) => entry.ksicCode === input.ksicCode,
    );
    if (conditionalEntry) {
      return {
        blocked: false,
        conditional: true,
        reason: conditionalEntry.reasonKo.replace('D-2', 'D-4'),
      };
    }

    return { blocked: false, conditional: false, reason: '' };
  }

  /**
   * 시간 제한 확인 (D-2와 핵심 차이)
   * Hour limit check (key difference from D-2)
   *
   * D-4 시간 규칙 / D-4 hour rules:
   * - TOPIK 2급 이상 + 출석률 90% → 주 20시간 (방학·공휴일 포함)
   *   TOPIK Level 2+ with 90%+ attendance → 20h/week (including vacation/holidays)
   * - TOPIK 미충족 → 주 10시간만 가능
   *   TOPIK not met → only 10h/week
   * - 방학/공휴일에도 무제한 아님 (D-2와 다름)
   *   NO unlimited hours during vacation/holidays (unlike D-2)
   * - 주말만 근무여도 시간 제한 동일 적용 (D-2와 다름)
   *   Weekend-only work still subject to same hour limits (unlike D-2)
   */
  private checkHourLimit(input: AlbaJobInput): {
    status: 'eligible' | 'conditional' | 'blocked';
    reason: string;
    maxWeeklyHours?: number;
  } {
    const hours = input.weeklyHours;

    // D-4는 주말만 근무여도 시간 제한 예외 없음 (D-2와 핵심 차이)
    // D-4 has NO weekend-only exception (key difference from D-2)
    // D-2는 주말만 근무 시 시간 무제한이지만 D-4는 항상 20시간 제한
    // D-2 allows unlimited hours for weekend-only work, but D-4 always caps at 20h

    // 주 20시간 초과 → 절대 불가 / Over 20h/week → always blocked
    if (hours > D4_MAX_WEEKLY_HOURS_TOPIK_MET) {
      return {
        status: 'blocked',
        reason:
          `D-4 비자 최대 주 ${D4_MAX_WEEKLY_HOURS_TOPIK_MET}시간 초과 (신청 ${hours}시간). 방학·공휴일 포함 동일 제한. ` +
          `(D-4 visa max ${D4_MAX_WEEKLY_HOURS_TOPIK_MET}h/week exceeded (requested ${hours}h). Same limit during vacation/holidays.)`,
        maxWeeklyHours: D4_MAX_WEEKLY_HOURS_TOPIK_MET,
      };
    }

    // 주 10시간 초과 ~ 20시간: TOPIK 2급 + 출석률 90% 필요
    // Over 10h ~ 20h: requires TOPIK Level 2 + 90% attendance
    if (hours > D4_MAX_WEEKLY_HOURS_TOPIK_NOT_MET) {
      return {
        status: 'conditional',
        reason:
          'TOPIK 2급 이상 + 출석률 90% 이상 필요 (주 20시간까지) ' +
          '(Requires TOPIK Level 2+ and 90%+ attendance for up to 20h/week)',
        maxWeeklyHours: D4_MAX_WEEKLY_HOURS_TOPIK_MET,
      };
    }

    // 주 10시간 이하 → eligible (TOPIK 미충족이어도 가능)
    // 10h/week or less → eligible (allowed even without TOPIK)
    return {
      status: 'eligible',
      reason: '',
      maxWeeklyHours: D4_MAX_WEEKLY_HOURS_TOPIK_NOT_MET,
    };
  }
}
