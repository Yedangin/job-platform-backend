import { BaseVisaEvaluator } from '../base.evaluator';
import { EvaluateVisaInput, VisaEvaluation, VisaTypeWithRelations } from '../evaluator.interface';

/**
 * C-4 단기취업 평가기
 *
 * 90일 이내 단기 취업
 * 일시 흥행, 패션모델, 강연, 연구, 기술지도 등
 */
export class C4Evaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['C-4'];

  evaluate(input: EvaluateVisaInput, visaType: VisaTypeWithRelations): VisaEvaluation {
    const result = this.createEmptyResult();
    result.documents = ['여권 사본', '고용계약서 또는 초청장', '활동계획서'];

    result.eligible = true;
    result.matchedIndustries.push(input.ksicCode);
    result.restrictions.push('최대 90일 체류');
    result.restrictions.push('단기적 활동에 한정 (일시 흥행, 강연, 연구 등)');
    result.restrictions.push('연장 불가 - 장기 취업 시 E 시리즈 비자 필요');
    result.notes.push('패션모델, 연예활동, 학술활동, 기술지도 등이 해당');

    if (visaType.maxStayMonths) {
      result.notes.push(`최대 체류: ${visaType.maxStayMonths}개월`);
    }

    return result;
  }
}
