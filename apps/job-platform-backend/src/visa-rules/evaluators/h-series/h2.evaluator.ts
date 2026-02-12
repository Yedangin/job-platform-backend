import { BaseVisaEvaluator } from '../base.evaluator';
import { EvaluateVisaInput, VisaEvaluation, VisaTypeWithRelations } from '../evaluator.interface';

/**
 * H-2 방문취업 평가기
 *
 * 알고리즘:
 * 1. 재외동포(한국계) 확인 - 중국, CIS 국가
 * 2. 허용 업종 확인 (40개 업종)
 * 3. 단순노무 허용 (F-4와 차이)
 * 4. 체류기간: 4년10개월, 재입국 가능
 */
export class H2Evaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['H-2', 'H-2-1', 'H-2-5', 'H-2-7'];

  // H-2 허용 업종 KSIC prefix
  private readonly allowedIndustryPrefixes = [
    // 제조업 (C)
    '10', '13', '14', '15', '17', '20', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33',
    // 건설업 (F)
    '41', '42',
    // 농업 (A)
    '01', '02', '03',
    // 숙박음식점 (I)
    '55', '56',
    // 사업지원 (N) - 청소/방제 포함
    '74', '75',
    // 운수 (H)
    '49',
    // 폐기물 (E)
    '37', '38',
    // 도소매 (G)
    '46', '47',
  ];

  evaluate(input: EvaluateVisaInput, visaType: VisaTypeWithRelations): VisaEvaluation {
    const result = this.createEmptyResult();
    result.documents = this.getRequiredDocuments(visaType.requiredDocuments);
    result.notes.push('체류기간: 최대 4년 10개월');

    // 1. 재외동포 확인
    if (input.isEthnicKorean === false) {
      result.blockedReasons.push('H-2 비자는 재외동포(한국계)만 신청 가능');
      result.suggestions.push('재외동포 해당 여부 확인 (중국, CIS 국가 한국계)');
      result.suggestions.push('비동포의 경우 E-9(비전문취업) 비자 검토');
      return result;
    }

    // 2. 국가 확인 (있으면)
    const countryCheck = this.checkCountryAllowed(input.nationality ?? input.koreanAncestryCountry, visaType.countryRestrictions);
    if (!countryCheck.allowed) {
      result.blockedReasons.push(countryCheck.reason!);
      result.suggestions.push('H-2는 중국/CIS 국가 재외동포 대상');
      return result;
    }

    // 3. 업종 확인
    const industryAllowed = this.allowedIndustryPrefixes.some(p => input.ksicCode.startsWith(p));
    if (!industryAllowed) {
      result.blockedReasons.push(`업종코드 ${input.ksicCode}은(는) H-2 허용 업종이 아님`);
      result.suggestions.push('H-2 허용 업종: 제조, 건설, 농업, 서비스, 청소, 운수 등');
      return result;
    }
    result.matchedIndustries.push(input.ksicCode);

    // 4. 외국인 비율 확인
    const ratioCheck = this.checkForeignWorkerRatio(input.employeeCountKorean, input.employeeCountForeign);
    if (!ratioCheck.allowed) {
      result.blockedReasons.push(ratioCheck.reason!);
      return result;
    }

    result.eligible = true;
    result.restrictions.push('재외동포(한국계) 대상');
    result.restrictions.push('허용 업종에서만 취업 가능');
    result.restrictions.push('특례고용가능확인서 필요');
    result.notes.push('단순노무직 포함 가능 (F-4와 차별점)');
    if (visaType.renewalPossible) {
      result.notes.push('재입국 가능');
    }

    return result;
  }
}
