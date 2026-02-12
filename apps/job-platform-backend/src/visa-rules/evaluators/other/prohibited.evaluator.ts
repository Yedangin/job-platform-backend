import { BaseVisaEvaluator } from '../base.evaluator';
import { EvaluateVisaInput, VisaEvaluation, VisaTypeWithRelations } from '../evaluator.interface';

/**
 * 취업불가 비자 평가기
 * A-1, A-2, A-3, B-1, B-2, C-1, C-3
 */
export class ProhibitedEvaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['A-1', 'A-2', 'A-3', 'B-1', 'B-2', 'C-1', 'C-3'];

  private readonly suggestions: Record<string, string> = {
    'A-1': '외교관 비자 - 취업 활동 불가',
    'A-2': '공무 비자 - 취업 활동 불가',
    'A-3': '협정 비자 - 취업 활동 불가',
    'B-1': '사증면제 체류 - E 또는 H 시리즈 취업비자 필요',
    'B-2': '관광/통과 비자 - E 또는 H 시리즈 취업비자 필요',
    'C-1': '일시취재 비자 - 취업 목적 체류 불가',
    'C-3': '단기방문 비자 - C-4(단기취업) 또는 E 시리즈 비자 필요',
  };

  evaluate(input: EvaluateVisaInput, visaType: VisaTypeWithRelations): VisaEvaluation {
    const result = this.createEmptyResult();

    result.blockedReasons.push(`${visaType.code} ${visaType.nameKo} 비자는 취업 활동이 허용되지 않음`);
    result.suggestions.push(this.suggestions[visaType.code] ?? '취업 가능 비자 유형으로 자격 변경 필요');
    result.suggestions.push('취업 목적 시 E-7(특정활동), E-9(비전문취업), H-2(방문취업) 등 검토');

    return result;
  }
}
