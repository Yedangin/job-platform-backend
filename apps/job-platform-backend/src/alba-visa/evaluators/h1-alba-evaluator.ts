/**
 * H-1 워킹홀리데이 비자 알바 평가기
 * H-1 Working Holiday Visa Alba (Part-time) Evaluator
 *
 * H-1 핵심 특징:
 * H-1 key features:
 * - 대부분의 업종 취업 가능 (most industries allowed)
 * - 선량한 풍속 위반 업종 불가 (industries violating public morals prohibited)
 *   → 유흥주점, 사행업소, PC방, 노래방 등
 *   → Entertainment bars, gambling, PC rooms, karaoke rooms, etc.
 * - 시간 제한 없음 (no hour limit)
 * - 체류기간 최대 1년, 18~30세 대상 (max 1 year stay, ages 18-30)
 * - 협정국별 세부 조건 상이 (detailed conditions vary by agreement country)
 * - 사업장 수 특별 제한 없음 (no specific workplace limit)
 *
 * [허용 업종 예시 / Allowed Industry Examples]
 * - 음식점, 카페, 편의점, 마트 → eligible
 *   Restaurant, cafe, convenience store, mart → eligible
 * - 공장, 건설, 물류창고 → eligible
 *   Factory, construction, warehouse → eligible
 *
 * [금지 업종 예시 / Blocked Industry Examples]
 * - 유흥주점, 사행업소, PC방, 노래방 → blocked
 *   Entertainment bars, gambling, PC rooms, karaoke rooms → blocked
 *
 * [고용주 의무 / Employer Obligations]
 * - 별도 고용허가 불필요 (No separate employment permit required)
 * - 4대보험 중 산재보험·건강보험 의무 가입
 *   (Industrial accident insurance and health insurance mandatory among 4 major insurance)
 * - 서면 근로계약서 교부 의무 (Written labor contract issuance mandatory)
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제12조 별표1 (H-1 체류자격)
 * 각국 워킹홀리데이 협정
 * Each country's Working Holiday Agreement
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
import { getKsicMapping } from '../data/ksic-mapping';

export class H1AlbaEvaluator implements IAlbaVisaEvaluator {
  readonly visaCode = 'H-1';
  readonly visaName = '워킹홀리데이';
  readonly visaNameEn = 'Working Holiday';

  evaluate(input: AlbaJobInput): AlbaVisaEvalResult {
    const result = createEmptyAlbaResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
    );

    // 시간/사업장 무제한 / Unlimited hours and workplaces
    result.maxWeeklyHours = null;
    result.maxWorkplaces = null;

    // === STEP 1: 업종 제한 — 선량한 풍속 위반 업종 금지 ===
    // === Industry check — industries violating public morals prohibited ===

    // 1-1. 유흥업소 직접 KSIC 코드 확인 / Direct entertainment KSIC code check
    if (input.ksicCode === 'I_ENT') {
      result.status = 'blocked';
      result.blockReasons.push(
        '워킹홀리데이 비자는 선량한 풍속 위반 업종(유흥주점 등) 취업 불가 ' +
          '(Working Holiday visa prohibits employment in industries violating public morals, e.g., entertainment bars)',
      );
      return result;
    }

    // 1-2. KSIC 매핑을 통한 유흥업소 확인 / Check entertainment via KSIC mapping
    const mapping = getKsicMapping(input.jobCategoryCode);
    if (mapping?.isEntertainment) {
      result.status = 'blocked';
      result.blockReasons.push(
        '워킹홀리데이 비자는 선량한 풍속 위반 업종(유흥주점, 사행업소, PC방, 노래방 등) 취업 불가 ' +
          '(Working Holiday visa prohibits employment in industries violating public morals: ' +
          'entertainment bars, gambling, PC rooms, karaoke rooms, etc.)',
      );
      return result;
    }

    // === 선량한 풍속 위반 업종 외 → eligible ===
    // === Non-public-morals-violating industries → eligible ===
    result.status = 'eligible';
    result.requiredPermit = null; // 별도 허가 불필요 / No separate employment permit required

    // 고용주 의무 안내를 notes에 포함
    // Include employer obligation guidance in notes
    result.notes =
      '체류기간 최대 1년, 18~30세 대상. 선량한 풍속 위반 업종(유흥주점, 사행업소 등) 외 대부분 취업 가능. ' +
      '[고용주 의무] 별도 고용허가 불필요, 산재보험 의무, 건강보험 의무, 서면 근로계약서 교부 의무 ' +
      '(Max 1 year stay, ages 18-30. Most jobs allowed except industries violating public morals. ' +
      '[Employer Obligations] No separate employment permit, ' +
      'industrial accident insurance mandatory, health insurance mandatory, ' +
      'written labor contract issuance mandatory)';

    return result;
  }
}
