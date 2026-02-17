import { BaseVisaEvaluator } from '../base.evaluator';
import {
  EvaluateVisaInput,
  VisaEvaluation,
  VisaTypeWithRelations,
} from '../evaluator.interface';

/**
 * E-9 비전문취업 평가기
 * E-9 Non-Professional Employment Evaluator
 *
 * 알고리즘 (DB 기반) / Algorithm (DB-driven):
 * 1. MOU 17개국 국적 확인 (DB: VisaCountryRestriction)
 * 2. 유흥/사행업종 금지 (DB: IndustryCode.isEntertainment/isGambling)
 * 3. 허용 업종 확인 (DB: VisaIndustryMapping)
 * 4. 외국인 고용비율 확인 (DB: HireQuotaRule)
 * 5. 사업장 규모 확인
 */
export class E9Evaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['E-9', 'E-9-1', 'E-9-2', 'E-9-3', 'E-9-4', 'E-9-5'];

  evaluate(
    input: EvaluateVisaInput,
    visaType: VisaTypeWithRelations,
  ): VisaEvaluation {
    const result = this.createEmptyResult();
    result.documents = this.getRequiredDocuments(visaType.requiredDocuments);
    result.notes.push('체류기간: 최대 4년 10개월');

    // 1. 국적 확인 (MOU 17개국 - DB 조회) / Country check (MOU 17 countries - from DB)
    const countryCheck = this.checkCountryAllowed(
      input.nationality,
      visaType.countryRestrictions,
    );
    if (!countryCheck.allowed) {
      result.blockedReasons.push(countryCheck.reason!);
      result.suggestions.push(
        'E-9 비자는 고용허가제(EPS) MOU 체결 17개국 국민만 신청 가능',
      );
      return result;
    }

    // 2. 유흥/사행업종 금지 (DB: IndustryCode 플래그) / Entertainment/gambling blocked (DB flags)
    const flags = input.inputIndustryFlags;
    if (flags?.isEntertainment || flags?.isGambling) {
      result.blockedReasons.push(
        '유흥업소/사행업종은 E-9 비자 취업 금지 업종',
      );
      return result;
    }

    // 3. 허용 업종 확인 (DB: VisaIndustryMapping) / Industry check (DB: VisaIndustryMapping)
    const industryCheck = this.checkIndustryAllowed(
      input.ksicCode,
      visaType.industryMappings,
    );
    if (!industryCheck.allowed) {
      result.blockedReasons.push(
        `업종코드 ${input.ksicCode}은(는) E-9 허용 업종이 아님`,
      );
      result.suggestions.push(
        'E-9 허용 업종: 제조업, 건설업, 농축산업, 어업, 서비스업(숙박/음식점)',
      );
      return result;
    }
    result.matchedIndustries.push(input.ksicCode);

    // 4. 외국인 고용비율 / Foreign worker ratio
    const ratioCheck = this.checkForeignWorkerRatio(
      input.employeeCountKorean,
      input.employeeCountForeign,
      0.2,
    );
    if (!ratioCheck.allowed) {
      result.blockedReasons.push(ratioCheck.reason!);
      result.suggestions.push('한국인 직원 추가 채용 후 비율 조정 필요');
      return result;
    }

    // 5. 사업장 규모 확인 / Company size check
    if (input.companySizeType === 'LARGE') {
      result.blockedReasons.push('대기업은 E-9 채용 불가 (중소기업 대상)');
      result.suggestions.push('E-7 특정활동 비자를 통한 전문인력 채용 검토');
      return result;
    }

    // 통과 / Pass
    result.eligible = true;
    result.restrictions.push('EPS(고용허가제)를 통한 채용만 가능');
    result.restrictions.push(
      `외국인 고용비율 현재 ${(ratioCheck.currentRatio * 100).toFixed(1)}% (한도 20%)`,
    );
    if (visaType.renewalPossible) {
      result.notes.push('성실근로자 재입국 특례 가능');
    }

    return result;
  }
}
