import { BaseVisaEvaluator } from '../base.evaluator';
import {
  EvaluateVisaInput,
  VisaEvaluation,
  VisaTypeWithRelations,
} from '../evaluator.interface';

/**
 * H-1 관광취업(워킹홀리데이) 평가기
 *
 * 알고리즘:
 * 1. 협정국 확인 (25개국)
 * 2. 연령 확인 (18~30세, 일부 국가 18~25)
 * 3. 체류기간: 1년, 연장불가
 * 4. 업종 제한: 유흥업소 금지
 */
export class H1Evaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['H-1'];

  evaluate(
    input: EvaluateVisaInput,
    visaType: VisaTypeWithRelations,
  ): VisaEvaluation {
    const result = this.createEmptyResult();
    result.documents = this.getRequiredDocuments(visaType.requiredDocuments);

    // 1. 협정국 확인
    const countryCheck = this.checkCountryAllowed(
      input.nationality,
      visaType.countryRestrictions,
    );
    if (!countryCheck.allowed) {
      result.blockedReasons.push(countryCheck.reason!);
      result.suggestions.push(
        'H-1 비자는 워킹홀리데이 협정국(25개국) 국민만 신청 가능',
      );
      return result;
    }

    // 2. 연령 확인
    const ageCheck = this.checkAge(input.age, visaType.minAge, visaType.maxAge);
    if (!ageCheck.allowed) {
      result.blockedReasons.push(ageCheck.reason!);
      result.suggestions.push('H-1 비자는 만 18~30세 청년 대상');
      return result;
    }

    // 3. 유흥업소 금지
    if (input.ksicCode.startsWith('56221')) {
      result.blockedReasons.push('유흥업소(주점업)는 워킹홀리데이 금지 업종');
      return result;
    }

    result.eligible = true;
    result.matchedIndustries.push(input.ksicCode);
    result.restrictions.push('체류기간: 1년 (연장 불가)');
    result.restrictions.push('유흥업소 취업 금지');
    result.notes.push('동일 고용주 하 최대 3~6개월 근무 (국가별 상이)');
    result.notes.push('관광과 취업을 병행하는 체류자격');

    return result;
  }
}
