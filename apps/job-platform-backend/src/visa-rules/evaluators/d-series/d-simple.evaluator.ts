import { BaseVisaEvaluator } from '../base.evaluator';
import {
  EvaluateVisaInput,
  VisaEvaluation,
  VisaTypeWithRelations,
} from '../evaluator.interface';

/**
 * D 시리즈 간단 평가기 (D-1, D-3, D-4, D-10)
 */
export class DSimpleEvaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['D-1', 'D-3', 'D-4', 'D-4-1', 'D-4-7', 'D-10'];

  evaluate(
    input: EvaluateVisaInput,
    visaType: VisaTypeWithRelations,
  ): VisaEvaluation {
    const result = this.createEmptyResult();

    switch (visaType.parentCode ?? visaType.code) {
      case 'D-1': // 문화예술 - 취업불가
        result.blockedReasons.push('D-1 문화예술 비자는 취업 불가');
        result.suggestions.push('취업 목적 시 E-6(예술흥행) 비자 검토');
        break;

      case 'D-3': // 기술연수 - 취업불가
        result.blockedReasons.push('D-3 기술연수 비자는 연수기관 외 취업 불가');
        result.suggestions.push('연수 완료 후 E-7(특정활동) 비자 전환 검토');
        break;

      case 'D-4': // 일반연수 - 시간제 제한적
        if (input.jobType === 'FULL_TIME') {
          result.blockedReasons.push('D-4 일반연수 비자는 풀타임 취업 불가');
          result.suggestions.push(
            '시간제 취업만 가능 (체류자격외활동허가 필요)',
          );
        } else {
          result.eligible = true;
          result.restrictions.push('주 20시간 이내');
          result.restrictions.push('체류자격외활동허가 필수');
          result.notes.push('어학연수 6개월 이상 수료 시 시간제 취업 가능');
        }
        break;

      case 'D-10': // 구직 - 조건부
        result.eligible = true;
        result.restrictions.push('D-10 구직비자로 취업활동 가능 (6개월)');
        result.restrictions.push('E-7 전환 대상 직종에 한함');
        result.notes.push('D-10 → E-7 자격변경 필요');
        result.notes.push('구직기간 중 인턴/시간제 허용');
        if (visaType.maxStayMonths) {
          result.notes.push(`최대 체류: ${visaType.maxStayMonths}개월`);
        }
        break;

      default:
        result.notes.push('해당 비자 상세 평가기준은 추후 업데이트 예정');
    }

    return result;
  }
}
