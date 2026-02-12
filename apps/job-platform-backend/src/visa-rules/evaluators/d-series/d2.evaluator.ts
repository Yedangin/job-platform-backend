import { BaseVisaEvaluator } from '../base.evaluator';
import { EvaluateVisaInput, VisaEvaluation, VisaTypeWithRelations } from '../evaluator.interface';

/**
 * D-2 유학 평가기 (시간제 취업)
 *
 * 알고리즘:
 * 1. 시간제 취업만 허용 (주 20시간)
 * 2. 유흥업소/위험 제조업 금지
 * 3. TOPIK 4급 이상 권장
 * 4. 체류자격외활동허가 필요
 */
export class D2Evaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['D-2', 'D-2-1', 'D-2-2', 'D-2-3', 'D-2-4', 'D-2-5', 'D-2-6', 'D-2-7', 'D-2-8'];

  // 금지 업종
  private readonly prohibitedPrefixes = ['56221']; // 주점업

  evaluate(input: EvaluateVisaInput, visaType: VisaTypeWithRelations): VisaEvaluation {
    const result = this.createEmptyResult();
    result.documents = ['시간제취업 허가서', '재학증명서', '여권 사본'];

    // 풀타임 불가
    if (input.jobType === 'FULL_TIME') {
      result.blockedReasons.push('D-2 유학비자는 풀타임 취업 불가 (학기 중)');
      result.suggestions.push('학기 중 주 20시간 이내 시간제만 가능');
      result.suggestions.push('방학 중에는 주당 근무시간 확대 가능 (출입국사무소 허가)');
      result.suggestions.push('졸업 후 D-10(구직) 전환 후 E-7 취업 검토');
      return result;
    }

    // 금지 업종 확인
    for (const prefix of this.prohibitedPrefixes) {
      if (input.ksicCode.startsWith(prefix)) {
        result.blockedReasons.push('유흥업소(주점업)는 D-2 시간제 취업 금지 업종');
        return result;
      }
    }

    // TOPIK 레벨 확인 (권장)
    const topik = this.topikToNumber(input.koreanLevel);
    if (topik > 0 && topik < 4) {
      result.notes.push(`TOPIK ${topik}급 - 시간제 취업 허가 심사 시 TOPIK 4급 이상 권장`);
    }

    result.eligible = true;
    result.matchedIndustries.push(input.ksicCode);
    result.restrictions.push('학기 중 주 20시간 이내');
    result.restrictions.push('유흥업소 불가');
    result.restrictions.push('체류자격외활동허가 필수');
    result.notes.push('방학(여름/겨울) 중 확대 근무 가능 (별도 허가)');
    if (visaType.maxWorkHoursWeekly) {
      result.notes.push(`최대 주 ${visaType.maxWorkHoursWeekly}시간`);
    }

    return result;
  }
}
