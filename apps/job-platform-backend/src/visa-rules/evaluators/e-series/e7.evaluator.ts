import { BaseVisaEvaluator } from '../base.evaluator';
import { EvaluateVisaInput, VisaEvaluation, VisaTypeWithRelations } from '../evaluator.interface';

/**
 * E-7 특정활동 평가기
 *
 * 알고리즘:
 * 1. 직종코드 확인 (KSCO 전문직 매칭)
 * 2. 하위유형 결정: E-7-1(전문), E-7-2(준전문), E-7-3(숙련기능), E-7-4(점수제)
 * 3. 급여 확인: GNI 80% (중소기업 70%) - 약 290만/250만원
 * 4. 학력/경력: 학사+5년 or 중소기업 3년
 * 5. E-7-4는 별도 점수제
 */
export class E7Evaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['E-7', 'E-7-1', 'E-7-2', 'E-7-3', 'E-7-4'];

  private readonly GNI_80_PERCENT = 290; // 만원/월
  private readonly GNI_70_PERCENT = 250; // 만원/월 (중소기업)

  evaluate(input: EvaluateVisaInput, visaType: VisaTypeWithRelations): VisaEvaluation {
    const result = this.createEmptyResult();
    result.documents = this.getRequiredDocuments(visaType.requiredDocuments);

    // 직종코드 확인 (있으면)
    const occCheck = this.checkOccupationAllowed(input.targetOccupationCode, visaType.occupationMappings);
    if (!occCheck.allowed) {
      result.blockedReasons.push(occCheck.reason!);
      result.suggestions.push('E-7 허용 직종코드(KSCO) 확인 필요');
      return result;
    }
    if (occCheck.matched) result.matchedOccupations.push(occCheck.matched);

    // 단순노무직(9xxx) 금지
    if (input.targetOccupationCode?.startsWith('9')) {
      result.blockedReasons.push('단순노무직(KSCO 9xxx)은 E-7 비자 대상이 아님');
      result.suggestions.push('E-9(비전문취업) 또는 H-2(방문취업) 비자 검토');
      return result;
    }

    // 급여 요건 확인
    const isSME = ['SME', 'STARTUP'].includes(input.companySizeType);
    const minSalary = isSME ? this.GNI_70_PERCENT : this.GNI_80_PERCENT;

    if (input.offeredSalary < minSalary) {
      result.blockedReasons.push(
        `제시 급여 ${input.offeredSalary}만원 < 최소 요건 ${minSalary}만원 (GNI ${isSME ? '70%' : '80%'})`,
      );
      result.suggestions.push(`최소 월 ${minSalary}만원 이상의 급여 제시 필요`);
      if (!isSME) {
        result.suggestions.push('중소기업/스타트업 확인서 제출 시 GNI 70%(250만원) 적용 가능');
      }
      return result;
    }

    // 학력/경력 확인
    const eduLevel = this.educationToNumber(input.educationLevel);
    const experience = input.workExperienceYears ?? 0;
    const minExperience = isSME ? 3 : 5;

    if (eduLevel < 3 && experience < minExperience) {
      // 학사 미만 + 경력 부족
      result.blockedReasons.push(
        `학사학위 미보유 및 경력 ${experience}년 < ${minExperience}년`,
      );
      result.suggestions.push(`학사학위 이상 또는 관련 경력 ${minExperience}년 이상 필요`);
      return result;
    }

    // 하위 유형 결정 & 참고사항
    const subType = this.determineSubType(input, isSME);
    result.notes.push(`E-7 하위유형: ${subType}`);

    result.eligible = true;
    result.matchedIndustries.push(input.ksicCode);
    result.restrictions.push('고용계약서 상 사업장에서만 근무 가능');
    result.restrictions.push('사업장 변경 시 출입국관리사무소 신고 필요');

    if (isSME) {
      result.notes.push('중소기업/스타트업 완화 적용 (GNI 70%)');
      result.documents.push('중소기업확인서 또는 벤처기업확인서');
    }

    return result;
  }

  private determineSubType(input: EvaluateVisaInput, isSME: boolean): string {
    const edu = this.educationToNumber(input.educationLevel);
    const exp = input.workExperienceYears ?? 0;

    if (edu >= 3) return 'E-7-1 전문인력 (학사 이상)';
    if (edu === 2) return 'E-7-2 준전문인력 (전문학사/기능사)';
    if (exp >= 5) return 'E-7-3 숙련기능인력 (경력 기반)';
    return 'E-7-4 점수제 숙련기능인력';
  }
}
