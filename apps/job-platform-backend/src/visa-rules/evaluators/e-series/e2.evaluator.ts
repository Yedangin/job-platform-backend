import { BaseVisaEvaluator } from '../base.evaluator';
import { EvaluateVisaInput, VisaEvaluation, VisaTypeWithRelations } from '../evaluator.interface';

/**
 * E-2 회화지도 평가기
 *
 * 알고리즘:
 * 1. 원어민 국가 확인 (US, GB, CA, AU, NZ, IE, ZA)
 * 2. 학사학위 이상 확인
 * 3. 범죄경력 확인 (아포스티유)
 * 4. 교육기관 고용계약 확인
 */
export class E2Evaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['E-2', 'E-2-1', 'E-2-2'];

  evaluate(input: EvaluateVisaInput, visaType: VisaTypeWithRelations): VisaEvaluation {
    const result = this.createEmptyResult();
    result.documents = this.getRequiredDocuments(visaType.requiredDocuments);

    // 1. 원어민 국가 확인
    const countryCheck = this.checkCountryAllowed(input.nationality, visaType.countryRestrictions);
    if (!countryCheck.allowed) {
      result.blockedReasons.push(countryCheck.reason!);
      result.suggestions.push('E-2 비자는 영어 원어민 국가(미국, 영국, 캐나다, 호주, 뉴질랜드, 아일랜드, 남아공) 국민 대상');
      result.suggestions.push('비원어민 국가의 경우 E-1(교수) 또는 E-7(특정활동) 비자 검토');
      return result;
    }

    // 2. 학사학위 확인
    if (this.educationToNumber(input.educationLevel) < 3) {
      result.blockedReasons.push('학사학위 미보유 - E-2 비자 발급 불가');
      result.suggestions.push('학사학위 이상 필요 (전공 무관)');
      return result;
    }

    // 3. 범죄경력 확인
    if (input.hasCriminalRecord === true) {
      result.blockedReasons.push('범죄경력 보유 - E-2 비자 발급 불가');
      return result;
    }

    // 4. 교육 업종 확인
    const isEducation = input.ksicCode.startsWith('85');
    if (!isEducation) {
      result.restrictions.push('E-2 비자는 교육기관(학원, 학교)에서만 활동 가능');
    }

    result.eligible = true;
    result.matchedIndustries.push(input.ksicCode);
    result.restrictions.push('회화지도 활동만 허용');
    result.notes.push('범죄경력증명서 아포스티유 인증 필수');

    return result;
  }
}
