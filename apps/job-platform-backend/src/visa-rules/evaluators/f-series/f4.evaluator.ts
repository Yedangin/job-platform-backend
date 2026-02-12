import { BaseVisaEvaluator } from '../base.evaluator';
import { EvaluateVisaInput, VisaEvaluation, VisaTypeWithRelations } from '../evaluator.interface';

/**
 * F-4 재외동포 평가기
 *
 * 알고리즘:
 * 1. 재외동포 여부 확인
 * 2. 전문직/사무직 활동 → 자유
 * 3. 단순노무(KSCO 9xxx) → 금지
 * 4. 제한 업종 확인 (건설현장노무, 청소, 경비)
 */
export class F4Evaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['F-4'];

  // F-4 금지 업종 KSIC prefix
  private readonly restrictedPrefixes = [
    '75',   // 청소/방제 서비스
  ];

  evaluate(input: EvaluateVisaInput, visaType: VisaTypeWithRelations): VisaEvaluation {
    const result = this.createEmptyResult();
    result.documents = this.getRequiredDocuments(visaType.requiredDocuments);

    // 1. 재외동포 확인
    if (input.isEthnicKorean === false) {
      result.blockedReasons.push('F-4 비자는 재외동포만 신청 가능');
      result.suggestions.push('재외동포 해당 여부 확인 필요');
      return result;
    }

    // 2. 단순노무직 확인 (KSCO 9xxx)
    if (input.targetOccupationCode?.startsWith('9')) {
      result.blockedReasons.push('F-4 비자 소지자는 단순노무직(KSCO 9xxx) 취업 제한');
      result.suggestions.push('H-2(방문취업) 비자로 전환 시 단순노무직 가능');
      result.suggestions.push('E-9(비전문취업) 비자를 통한 채용도 검토');
      return result;
    }

    // 3. 제한 업종 확인
    for (const prefix of this.restrictedPrefixes) {
      if (input.ksicCode.startsWith(prefix)) {
        result.blockedReasons.push('F-4 비자 소지자는 청소/경비 등 단순노무 업종 취업 제한');
        result.suggestions.push('H-2(방문취업) 또는 E-9(비전문취업) 비자 소지자 채용 검토');
        return result;
      }
    }

    // 4. 통과 - 전문직/사무직 자유 취업
    result.eligible = true;
    result.matchedIndustries.push(input.ksicCode);
    result.notes.push('F-4 재외동포는 전문직/사무직 등 자유 취업 가능');
    result.restrictions.push('단순노무직(청소, 경비, 건설현장 노무) 취업 제한');
    result.restrictions.push('유흥업소 취업 금지');

    return result;
  }
}
