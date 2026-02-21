import { BaseVisaEvaluator } from '../base.evaluator';
import {
  EvaluateVisaInput,
  VisaEvaluation,
  VisaTypeWithRelations,
} from '../evaluator.interface';

/**
 * H-2 방문취업 평가기
 * H-2 Working Visit Evaluator
 *
 * 알고리즘 (DB 기반) / Algorithm (DB-driven):
 * 1. 재외동포(한국계) 확인
 * 2. 국가 확인 (DB: VisaCountryRestriction)
 * 3. 금지업종 확인 - 네거티브 리스트 (DB: ProhibitedIndustry)
 * 4. 유흥/사행업종 금지 (DB: IndustryCode flags)
 * 5. 외국인 고용비율 확인
 */
export class H2Evaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['H-2', 'H-2-1', 'H-2-5', 'H-2-7'];

  evaluate(
    input: EvaluateVisaInput,
    visaType: VisaTypeWithRelations,
  ): VisaEvaluation {
    const result = this.createEmptyResult();
    result.documents = this.getRequiredDocuments(visaType.requiredDocuments);
    result.notes.push('체류기간: 최대 4년 10개월');

    // 1. 재외동포 확인 / Ethnic Korean check
    if (input.isEthnicKorean === false) {
      result.blockedReasons.push('H-2 비자는 재외동포(한국계)만 신청 가능');
      result.suggestions.push(
        '재외동포 해당 여부 확인 (중국, CIS 국가 한국계)',
      );
      result.suggestions.push('비동포의 경우 E-9(비전문취업) 비자 검토');
      return result;
    }

    // 2. 국가 확인 (DB 조회) / Country check (from DB)
    const countryCheck = this.checkCountryAllowed(
      input.nationality ?? input.koreanAncestryCountry,
      visaType.countryRestrictions,
    );
    if (!countryCheck.allowed) {
      result.blockedReasons.push(countryCheck.reason!);
      result.suggestions.push('H-2는 중국/CIS 국가 재외동포 대상');
      return result;
    }

    // 3. 유흥/사행업종 일괄 금지 (DB: IndustryCode 플래그) / Entertainment/gambling blocked
    const flags = input.inputIndustryFlags;
    if (flags?.isEntertainment || flags?.isGambling) {
      result.blockedReasons.push('유흥업소/사행업종은 H-2 비자 취업 금지 업종');
      return result;
    }

    // 4. 네거티브 리스트 확인 (DB: ProhibitedIndustry) / Negative list check (from DB)
    const prohibited = visaType.prohibitedIndustries ?? [];
    const isProhibited = this.checkProhibitedIndustry(
      input.ksicCode,
      prohibited,
    );
    if (isProhibited.blocked) {
      result.blockedReasons.push(
        `업종코드 ${input.ksicCode}은(는) H-2 허용제외 업종: ${isProhibited.reason}`,
      );
      result.suggestions.push(
        'H-2 허용 업종: 제조, 건설, 농업, 서비스, 청소, 운수 등',
      );
      return result;
    }
    result.matchedIndustries.push(input.ksicCode);

    // 5. 외국인 비율 확인 / Foreign worker ratio
    const ratioCheck = this.checkForeignWorkerRatio(
      input.employeeCountKorean,
      input.employeeCountForeign,
    );
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

  /** 금지업종 체크 (네거티브 리스트, 예외코드 고려) / Check prohibited industries with exception handling */
  private checkProhibitedIndustry(
    ksicCode: string,
    prohibited: NonNullable<VisaTypeWithRelations['prohibitedIndustries']>,
  ): { blocked: boolean; reason?: string } {
    for (const p of prohibited) {
      if (ksicCode.startsWith(p.ksicCode)) {
        // 예외코드 확인 / Check exception codes
        if (p.hasExceptions && p.exceptionCodes) {
          try {
            const exceptions: string[] = JSON.parse(p.exceptionCodes);
            if (exceptions.some((exc) => ksicCode.startsWith(exc))) {
              return { blocked: false }; // 예외 허용 / Exception allowed
            }
          } catch {
            // JSON 파싱 실패 시 금지 유지 / If JSON parse fails, keep blocked
          }
        }
        return { blocked: true, reason: p.reasonKo ?? p.ksicCode };
      }
    }
    return { blocked: false };
  }
}
