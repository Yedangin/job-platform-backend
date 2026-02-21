/**
 * F-2 거주비자 알바 평가기
 * F-2 Residence Visa Alba (Part-time) Evaluator
 *
 * F-2는 거의 제한 없음:
 * F-2 has almost no restrictions:
 * - 시간 제한 없음 (no hour limit)
 * - 업종 제한 거의 없음 (almost no industry restriction)
 * - 사업장 수 제한 없음 (no workplace limit)
 *
 * 예외: F-2(라,바) 점수제 → 이전 비자와 동일 분야에서만 근무 가능
 * Exception: F-2(ra,ba) point system → work only in same field as previous visa
 *
 * [고용주 의무 / Employer Obligations]
 * - 별도 고용허가 불필요 (No separate employment permit required)
 * - 통상적 근로계약 + 4대보험 (Standard labor contract + 4 major insurance)
 * - 산재보험 의무 가입 (Industrial accident insurance mandatory)
 * - 건강보험 의무 가입 (Health insurance mandatory)
 * - 서면 근로계약서 교부 의무 (Written labor contract issuance mandatory)
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제12조 별표1 (F-2 체류자격)
 * 법무부 — F-2 거주자격 취업활동 범위
 * 근로기준법 제17조 — 서면 근로계약서 교부 의무
 * 산업재해보상보험법 — 외국인근로자 산재보험 적용
 * 국민건강보험법 — 외국인 건강보험 적용
 */

import {
  AlbaJobInput,
  AlbaVisaEvalResult,
  IAlbaVisaEvaluator,
  createEmptyAlbaResult,
} from './alba-evaluator.interface';

export class F2AlbaEvaluator implements IAlbaVisaEvaluator {
  readonly visaCode = 'F-2';
  readonly visaName = '거주';
  readonly visaNameEn = 'Residence';

  evaluate(input: AlbaJobInput): AlbaVisaEvalResult {
    const result = createEmptyAlbaResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
    );

    // F-2 비자는 거의 모든 알바 가능 / F-2 visa allows almost all part-time work
    // 유흥업소만 확인 / Only check entertainment venues
    if (input.ksicCode === 'I_ENT') {
      result.status = 'blocked';
      result.blockReasons.push(
        'F-2 비자도 유흥업소 취업은 금지됩니다 (F-2 visa also prohibits entertainment venue employment)',
      );
      return result;
    }

    // 기본적으로 eligible / Basically eligible
    result.status = 'eligible';
    result.maxWeeklyHours = null; // 무제한 / Unlimited
    result.maxWorkplaces = null; // 무제한 / Unlimited
    result.requiredPermit = null; // 별도 고용허가 불필요 / No separate employment permit required

    // F-2(라,바) 점수제 하위 유형은 조건부
    // F-2(ra,ba) point system subtypes are conditional
    // 참고: 이 조건은 구직자의 하위비자 유형 정보가 필요하므로
    //       공고 기반 매칭에서는 일반 주의사항으로만 표시
    // Note: This condition requires sub-visa type info from job seeker,
    //       so in posting-based matching, it's shown as a general note only
    result.conditions.push(
      'F-2(라,바) 점수제 비자 소지자는 이전 비자와 동일 분야에서만 근무 가능 ' +
        '(F-2 point system holders can only work in the same field as their previous visa)',
    );

    // 조건이 있으므로 conditional로 변경
    // Since there's a condition, change to conditional
    // 다만 대부분의 F-2는 eligible이므로 notes에 추가 정보 표시
    // However, most F-2 holders are eligible, so show as additional info in notes
    result.status = 'conditional';

    // 고용주 의무 안내를 notes에 포함
    // Include employer obligation guidance in notes
    result.notes =
      '대부분의 F-2 비자 소지자는 제한 없이 취업 가능. F-2(라,바) 점수제 해당 시 동일분야 제한. ' +
      '[고용주 의무] 별도 고용허가 불필요, 통상적 근로계약 체결 + 4대보험 가입, ' +
      '산재보험 의무, 건강보험 의무, 서면 근로계약서 교부 의무 ' +
      '(Most F-2 holders have no restrictions. F-2 point system limited to same field. ' +
      '[Employer Obligations] No separate employment permit required, standard labor contract + 4 major insurance, ' +
      'industrial accident insurance mandatory, health insurance mandatory, written labor contract issuance mandatory)';

    return result;
  }
}
