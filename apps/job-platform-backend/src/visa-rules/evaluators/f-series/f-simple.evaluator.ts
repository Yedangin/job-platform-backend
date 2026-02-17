import { BaseVisaEvaluator } from '../base.evaluator';
import {
  EvaluateVisaInput,
  VisaEvaluation,
  VisaTypeWithRelations,
} from '../evaluator.interface';

/**
 * F 시리즈 간단 평가기 (F-1, F-3, F-6)
 */
export class FSimpleEvaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['F-1', 'F-3', 'F-6'];

  evaluate(
    input: EvaluateVisaInput,
    visaType: VisaTypeWithRelations,
  ): VisaEvaluation {
    const result = this.createEmptyResult();

    switch (visaType.code) {
      case 'F-1': // 방문동거 - 취업불가 (체류자격외활동허가 필요)
        result.blockedReasons.push('F-1 방문동거 비자는 취업 불가');
        result.suggestions.push('체류자격외활동허가 신청 시 제한적 취업 가능');
        result.suggestions.push('F-2(거주) 또는 F-6(결혼이민) 자격 변경 검토');
        break;

      case 'F-3': // 동반 - 취업불가
        result.blockedReasons.push('F-3 동반 비자는 취업 불가');
        result.suggestions.push(
          '체류자격외활동허가 신청 시 제한적 시간제 취업 가능',
        );
        break;

      case 'F-6': // 결혼이민 - 자유취업
        result.eligible = true;
        result.matchedIndustries.push(input.ksicCode);
        result.notes.push(
          'F-6 결혼이민 비자 소지자는 업종 제한 없이 자유 취업 가능',
        );
        break;
    }

    return result;
  }
}
