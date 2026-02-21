import { BaseVisaEvaluator } from '../base.evaluator';
import {
  EvaluateVisaInput,
  VisaEvaluation,
  VisaTypeWithRelations,
} from '../evaluator.interface';

/**
 * F-4 재외동포 평가기
 * F-4 Overseas Korean Evaluator
 *
 * 알고리즘 (DB 기반) / Algorithm (DB-driven):
 * 1. 재외동포 여부 확인
 * 2. 유흥/사행업종 금지 (DB: IndustryCode flags)
 * 3. 단순노무직(KSCO 9xxx) 금지 (DB: IndustryCode.isSimpleLabor)
 * 4. 금지 업종 확인 (DB: ProhibitedIndustry — 청소/경비 등)
 * 5. 전문직/사무직 활동 → 자유
 */
export class F4Evaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['F-4'];

  evaluate(
    input: EvaluateVisaInput,
    visaType: VisaTypeWithRelations,
  ): VisaEvaluation {
    const result = this.createEmptyResult();
    result.documents = this.getRequiredDocuments(visaType.requiredDocuments);

    // 1. 재외동포 확인 / Ethnic Korean check
    if (input.isEthnicKorean === false) {
      result.blockedReasons.push('F-4 비자는 재외동포만 신청 가능');
      result.suggestions.push('재외동포 해당 여부 확인 필요');
      return result;
    }

    // 2. 유흥/사행업종 금지 (DB: IndustryCode 플래그) / Entertainment/gambling blocked (DB flags)
    const flags = input.inputIndustryFlags;
    if (flags?.isEntertainment || flags?.isGambling) {
      result.blockedReasons.push('유흥업소/사행업종은 F-4 비자 취업 금지 업종');
      return result;
    }

    // 3. 단순노무직 확인 — KSCO 9xxx 또는 isSimpleLabor 플래그
    // Simple labor check — KSCO 9xxx or isSimpleLabor flag
    if (input.targetOccupationCode?.startsWith('9')) {
      result.blockedReasons.push(
        'F-4 비자 소지자는 단순노무직(KSCO 9xxx) 취업 제한',
      );
      result.suggestions.push('H-2(방문취업) 비자로 전환 시 단순노무직 가능');
      result.suggestions.push('E-9(비전문취업) 비자를 통한 채용도 검토');
      return result;
    }
    if (flags?.isSimpleLabor) {
      result.blockedReasons.push('F-4 비자 소지자는 단순노무 업종 취업 제한');
      result.suggestions.push(
        'H-2(방문취업) 또는 E-9(비전문취업) 비자 소지자 채용 검토',
      );
      return result;
    }

    // 4. 금지 업종 확인 (DB: ProhibitedIndustry) / Prohibited industry check (from DB)
    const prohibited = visaType.prohibitedIndustries ?? [];
    const isProhibited = this.checkProhibitedIndustry(
      input.ksicCode,
      prohibited,
    );
    if (isProhibited.blocked) {
      result.blockedReasons.push(
        `업종코드 ${input.ksicCode}은(는) F-4 취업 제한 업종: ${isProhibited.reason}`,
      );
      result.suggestions.push(
        'H-2(방문취업) 또는 E-9(비전문취업) 비자 소지자 채용 검토',
      );
      return result;
    }

    // 5. 통과 - 전문직/사무직 자유 취업 / Pass - unrestricted professional/office work
    result.eligible = true;
    result.matchedIndustries.push(input.ksicCode);
    result.notes.push('F-4 재외동포는 전문직/사무직 등 자유 취업 가능');
    result.restrictions.push('단순노무직(청소, 경비, 건설현장 노무) 취업 제한');
    result.restrictions.push('유흥업소 취업 금지');

    return result;
  }

  /** 금지업종 체크 (예외코드 고려) / Check prohibited industries with exception handling */
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
