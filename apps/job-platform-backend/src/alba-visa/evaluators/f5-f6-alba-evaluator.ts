/**
 * F-5 영주 / F-6 결혼이민 비자 알바 평가기
 * F-5 Permanent Residence / F-6 Marriage Immigration Visa Alba (Part-time) Evaluator
 *
 * @visaCode       F-5, F-6
 * @legalBasis     출입국관리법 시행령 제12조 별표1 / Immigration Control Act Enforcement Decree Art. 12, Schedule 1
 *                 근로기준법 제17조 — 서면 근로계약서 교부 의무 / Labor Standards Act Art. 17
 *                 최저임금법 제10조 — 최저임금 기준 / Minimum Wage Act Art. 10
 *                 국민연금법 제126조 — 외국인 상호주의 / National Pension Act Art. 126
 * @conditionSummary
 *   - 무조건 가능 — 내국인과 동일 (Always eligible — same rights as Korean nationals)
 *   - 시간/업종/사업장 제한 없음 (No hour, industry, or workplace limits)
 *   - 별도 허가 불필요 (No additional permit required)
 *   - 최저임금 준수 의무 (Minimum wage compliance required, see minimum-wage-standards.ts)
 * @lastVerified   2026-02-23
 */

import {
  AlbaJobInput,
  AlbaVisaEvalResult,
  IAlbaVisaEvaluator,
  createEmptyAlbaResult,
} from './alba-evaluator.interface';
import { getCurrentMinimumWage } from '../../common/data/visa';

/**
 * F-5 영주비자 알바 평가기
 * F-5 Permanent Residence Visa Alba Evaluator
 */
export class F5AlbaEvaluator implements IAlbaVisaEvaluator {
  readonly visaCode = 'F-5';
  readonly visaName = '영주';
  readonly visaNameEn = 'Permanent Residence';

  evaluate(_input: AlbaJobInput): AlbaVisaEvalResult {
    const result = createEmptyAlbaResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
    );

    // 무조건 가능 — 내국인과 동일한 취업 권리
    // Always eligible — same employment rights as Korean nationals
    result.status = 'eligible';
    result.maxWeeklyHours = null; // 무제한 / Unlimited
    result.maxWorkplaces = null; // 무제한 / Unlimited
    result.requiredPermit = null; // 별도 허가 불필요 / No additional permit

    // 고용주 의무 안내를 notes에 포함
    // Include employer obligation guidance in notes
    const mw = getCurrentMinimumWage();
    result.notes =
      '내국인과 동일한 취업 권리. ' +
      '[고용주 의무] 별도 고용허가 불필요, 산재보험 의무 가입, 건강보험 의무 가입, ' +
      `최저시급 준수 (${mw.year}년 ${mw.hourlyWage.toLocaleString()}원), ` +
      '서면 근로계약서 교부 의무 (미교부 시 500만원 벌금), ' +
      '국민연금 상호주의 적용 ' +
      '(Same employment rights as Korean nationals. ' +
      '[Employer Obligations] No separate employment permit, ' +
      'industrial accident insurance mandatory, health insurance mandatory, ' +
      `minimum wage compliance (${mw.hourlyWage.toLocaleString()} KRW in ${mw.year}), ` +
      'written labor contract issuance mandatory (5M KRW fine for non-issuance), ' +
      'national pension reciprocity applies)';

    return result;
  }
}

/**
 * F-6 결혼이민비자 알바 평가기
 * F-6 Marriage Immigration Visa Alba Evaluator
 */
export class F6AlbaEvaluator implements IAlbaVisaEvaluator {
  readonly visaCode = 'F-6';
  readonly visaName = '결혼이민';
  readonly visaNameEn = 'Marriage Immigration';

  evaluate(_input: AlbaJobInput): AlbaVisaEvalResult {
    const result = createEmptyAlbaResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
    );

    // 무조건 가능 — 내국인과 동일한 취업 권리
    // Always eligible — same employment rights as Korean nationals
    result.status = 'eligible';
    result.maxWeeklyHours = null; // 무제한 / Unlimited
    result.maxWorkplaces = null; // 무제한 / Unlimited
    result.requiredPermit = null; // 별도 허가 불필요 / No additional permit

    // 고용주 의무 안내를 notes에 포함
    // Include employer obligation guidance in notes
    const mw = getCurrentMinimumWage();
    result.notes =
      '내국인과 동일한 취업 권리. ' +
      '[고용주 의무] 별도 고용허가 불필요, 산재보험 의무 가입, 건강보험 의무 가입, ' +
      `최저시급 준수 (${mw.year}년 ${mw.hourlyWage.toLocaleString()}원), ` +
      '서면 근로계약서 교부 의무 (미교부 시 500만원 벌금), ' +
      '국민연금 상호주의 적용 ' +
      '(Same employment rights as Korean nationals. ' +
      '[Employer Obligations] No separate employment permit, ' +
      'industrial accident insurance mandatory, health insurance mandatory, ' +
      `minimum wage compliance (${mw.hourlyWage.toLocaleString()} KRW in ${mw.year}), ` +
      'written labor contract issuance mandatory (5M KRW fine for non-issuance), ' +
      'national pension reciprocity applies)';

    return result;
  }
}
