/**
 * H-1 워킹홀리데이 비자 알바 평가기
 * H-1 Working Holiday Visa Alba (Part-time) Evaluator
 *
 * @visaCode       H-1
 * @legalBasis     출입국관리법 시행령 제12조 별표1 (H-1 체류자격) / Immigration Control Act Enforcement Decree Art. 12, Schedule 1
 *                 각국 워킹홀리데이 협정 / Each Country's Working Holiday Agreement
 *                 근로기준법 제17조 — 서면 근로계약서 교부 의무 / Labor Standards Act Art. 17
 * @conditionSummary
 *   - 대부분의 업종 취업 가능 (Most industries allowed)
 *   - 선량한 풍속 위반 업종 불가 (Public morals violation industries blocked)
 *   - 시간/사업장 무제한, 별도 허가 불필요 (Unlimited hours/workplaces, no permit)
 *   - 체류기간 최대 1년, 18~30세 대상 (Max 1 year stay, ages 18-30)
 * @lastVerified   2026-02-23
 */

import {
  AlbaJobInput,
  AlbaVisaEvalResult,
  IAlbaVisaEvaluator,
  createEmptyAlbaResult,
} from './alba-evaluator.interface';
import { getKsicMapping } from '../../common/data/visa';

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
