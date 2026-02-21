/**
 * F-5 영주 / F-6 결혼이민 비자 알바 평가기
 * F-5 Permanent Residence / F-6 Marriage Immigration Visa Alba (Part-time) Evaluator
 *
 * F-5, F-6은 무조건 가능 (내국인과 동일):
 * F-5, F-6 are always eligible (same rights as Korean nationals):
 * - 시간 제한 없음 / No hour limit
 * - 업종 제한 없음 / No industry restriction
 * - 사업장 수 제한 없음 / No workplace limit
 * - 별도 허가 불필요 / No additional permit required
 *
 * [고용주 의무 / Employer Obligations]
 * - 별도 고용허가 불필요 (No separate employment permit required)
 * - 산재보험 의무 가입 (Industrial accident insurance mandatory)
 * - 건강보험 의무 가입 (Health insurance mandatory)
 * - 최저시급 준수: 2025년 10,030원 (Minimum wage compliance: 10,030 KRW in 2025)
 * - 서면 근로계약서 교부 의무 — 미교부 시 500만원 벌금
 *   (Written labor contract issuance mandatory — 5M KRW fine for non-issuance)
 * - F-5: 국민연금 상호주의 적용 (National pension reciprocity applies)
 * - F-6: 국민연금 상호주의 적용 (National pension reciprocity applies)
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제12조 별표1
 * F-5: 영주자격 — 대한민국에서 영구적 체류 가능, 활동 제한 없음
 * F-6: 결혼이민자 — 대한민국 국민의 배우자, 활동 제한 없음
 * 근로기준법 제17조 — 서면 근로계약서 교부 의무 (위반 시 500만원 이하 벌금)
 * 최저임금법 — 2025년 최저시급 10,030원
 * 산업재해보상보험법 — 외국인근로자 산재보험 적용
 * 국민건강보험법 — 외국인 건강보험 적용
 * 국민연금법 제126조 — 외국인 국민연금 상호주의 적용
 */

import {
  AlbaJobInput,
  AlbaVisaEvalResult,
  IAlbaVisaEvaluator,
  createEmptyAlbaResult,
} from './alba-evaluator.interface';

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
    result.notes =
      '내국인과 동일한 취업 권리. ' +
      '[고용주 의무] 별도 고용허가 불필요, 산재보험 의무 가입, 건강보험 의무 가입, ' +
      '최저시급 준수 (2025년 10,030원), ' +
      '서면 근로계약서 교부 의무 (미교부 시 500만원 벌금), ' +
      '국민연금 상호주의 적용 ' +
      '(Same employment rights as Korean nationals. ' +
      '[Employer Obligations] No separate employment permit, ' +
      'industrial accident insurance mandatory, health insurance mandatory, ' +
      'minimum wage compliance (10,030 KRW in 2025), ' +
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
    result.notes =
      '내국인과 동일한 취업 권리. ' +
      '[고용주 의무] 별도 고용허가 불필요, 산재보험 의무 가입, 건강보험 의무 가입, ' +
      '최저시급 준수 (2025년 10,030원), ' +
      '서면 근로계약서 교부 의무 (미교부 시 500만원 벌금), ' +
      '국민연금 상호주의 적용 ' +
      '(Same employment rights as Korean nationals. ' +
      '[Employer Obligations] No separate employment permit, ' +
      'industrial accident insurance mandatory, health insurance mandatory, ' +
      'minimum wage compliance (10,030 KRW in 2025), ' +
      'written labor contract issuance mandatory (5M KRW fine for non-issuance), ' +
      'national pension reciprocity applies)';

    return result;
  }
}
