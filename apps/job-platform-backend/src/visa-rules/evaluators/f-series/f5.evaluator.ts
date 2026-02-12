import { BaseVisaEvaluator } from '../base.evaluator';
import { EvaluateVisaInput, VisaEvaluation, VisaTypeWithRelations } from '../evaluator.interface';

/**
 * F-5 영주 비자 평가기
 * 영주권 = 업종 제한 없이 자유 취업
 */
export class F5Evaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['F-5', 'F-5-1', 'F-5-2', 'F-5-3', 'F-5-6', 'F-5-11', 'F-5-16'];

  evaluate(input: EvaluateVisaInput, visaType: VisaTypeWithRelations): VisaEvaluation {
    const result = this.createEmptyResult();
    result.documents = this.getRequiredDocuments(visaType.requiredDocuments);

    result.eligible = true;
    result.matchedIndustries.push(input.ksicCode);
    result.notes.push('F-5 영주비자 소지자는 업종/직종 제한 없이 자유 취업 가능');
    result.notes.push('사업장 변경 자유, 고용주 변경 제한 없음');

    return result;
  }
}
