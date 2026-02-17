import { BaseVisaEvaluator } from '../base.evaluator';
import {
  EvaluateVisaInput,
  VisaEvaluation,
  VisaTypeWithRelations,
} from '../evaluator.interface';

/**
 * E-7 특정활동 평가기
 * E-7 Specially Designated Activities Evaluator
 *
 * 알고리즘 (DB 기반) / Algorithm (DB-driven):
 * 1. 단순노무직(9xxx) 우선 금지 체크
 * 2. 직종코드 확인 (KSCO 전문직 매칭 - DB: VisaOccupationMapping)
 * 3. 급여 요건 확인 (GNI 기준 - DB: visaType.metadata JSON)
 * 4. 학력/경력 확인 (하위유형별 차등)
 * 5. 하위 유형 결정
 */
export class E7Evaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['E-7', 'E-7-1', 'E-7-2', 'E-7-3', 'E-7-4'];

  evaluate(
    input: EvaluateVisaInput,
    visaType: VisaTypeWithRelations,
  ): VisaEvaluation {
    const result = this.createEmptyResult();
    result.documents = this.getRequiredDocuments(visaType.requiredDocuments);

    // 1. 단순노무직(9xxx) 우선 금지 체크 / Block simple labor (KSCO 9xxx)
    if (input.targetOccupationCode?.startsWith('9')) {
      result.blockedReasons.push(
        '단순노무직(KSCO 9xxx)은 E-7 비자 대상이 아님',
      );
      result.suggestions.push('E-9(비전문취업) 또는 H-2(방문취업) 비자 검토');
      return result;
    }

    // 2. 직종코드 확인 (DB: VisaOccupationMapping) / Occupation check (from DB)
    const occCheck = this.checkOccupationAllowed(
      input.targetOccupationCode,
      visaType.occupationMappings,
    );
    if (!occCheck.allowed) {
      result.blockedReasons.push(occCheck.reason!);
      result.suggestions.push('E-7 허용 직종코드(KSCO) 확인 필요');
      return result;
    }
    if (occCheck.matched) result.matchedOccupations.push(occCheck.matched);

    // 3. 급여 요건 확인 (DB: metadata JSON) / Salary check (from DB metadata)
    const gniThresholds = this.getGniThresholds(visaType);
    const isSME = ['SME', 'STARTUP'].includes(input.companySizeType);
    const minSalary = isSME ? gniThresholds.sme : gniThresholds.standard;

    if (input.offeredSalary < minSalary) {
      result.blockedReasons.push(
        `제시 급여 ${input.offeredSalary}만원 < 최소 요건 ${minSalary}만원 (GNI ${isSME ? '70%' : '80%'})`,
      );
      result.suggestions.push(`최소 월 ${minSalary}만원 이상의 급여 제시 필요`);
      if (!isSME) {
        result.suggestions.push(
          `중소기업/스타트업 확인서 제출 시 GNI 70%(${gniThresholds.sme}만원) 적용 가능`,
        );
      }
      return result;
    }

    // 4. 학력/경력 확인 (하위유형별 차등) / Education/experience check by sub-type
    const eduLevel = this.educationToNumber(input.educationLevel);
    const experience = input.workExperienceYears ?? 0;

    if (eduLevel >= 3) {
      // 학사 이상 → E-7-1 전문인력: OK / Bachelor+ → E-7-1 professional: OK
    } else if (eduLevel === 2) {
      // 전문학사 → E-7-2 준전문인력: OK / Associate → E-7-2 semi-professional: OK
      result.notes.push('E-7-2 준전문인력: 관련 자격증(기능사 이상) 보유 권장');
    } else {
      // 고졸 이하 → 경력 기반 필요 / High school or below → experience required
      const minExperience = isSME ? 3 : 5;
      if (experience < minExperience) {
        result.blockedReasons.push(
          `학사학위 미보유 및 경력 ${experience}년 < ${minExperience}년`,
        );
        result.suggestions.push(
          `학사학위 이상 또는 관련 경력 ${minExperience}년 이상 필요`,
        );
        result.suggestions.push(
          '전문학사(2년제) 취득 시 E-7-2 준전문인력으로 신청 가능',
        );
        return result;
      }
    }

    // 하위 유형 결정 & 참고사항 / Determine sub-type & add notes
    const subType = this.determineSubType(input, isSME);
    result.notes.push(`E-7 하위유형: ${subType}`);

    result.eligible = true;
    result.matchedIndustries.push(input.ksicCode);
    result.restrictions.push('고용계약서 상 사업장에서만 근무 가능');
    result.restrictions.push('사업장 변경 시 출입국관리사무소 신고 필요');

    if (isSME) {
      result.notes.push(`중소기업/스타트업 완화 적용 (GNI 70%, ${gniThresholds.sme}만원)`);
      result.documents.push('중소기업확인서 또는 벤처기업확인서');
    }

    return result;
  }

  /**
   * visaType.metadata에서 GNI 급여 기준 추출 (DB 기반)
   * Extract GNI salary thresholds from visaType.metadata (DB-driven)
   */
  private getGniThresholds(visaType: VisaTypeWithRelations): {
    standard: number;
    sme: number;
  } {
    if (visaType.metadata) {
      try {
        const meta = JSON.parse(visaType.metadata);
        if (meta.gniThresholds) {
          return {
            standard: meta.gniThresholds.standard ?? 290,
            sme: meta.gniThresholds.sme ?? 250,
          };
        }
      } catch {
        // metadata 파싱 실패 시 기본값 / Fallback on parse error
      }
    }
    // DB에 값이 없으면 기본값 (2024년 기준) / Default if not in DB (2024 baseline)
    return { standard: 290, sme: 250 };
  }

  /** 하위 유형 결정 / Determine E-7 sub-type */
  private determineSubType(input: EvaluateVisaInput, isSME: boolean): string {
    const edu = this.educationToNumber(input.educationLevel);
    const exp = input.workExperienceYears ?? 0;

    if (edu >= 3) return 'E-7-1 전문인력 (학사 이상)';
    if (edu === 2) return 'E-7-2 준전문인력 (전문학사/기능사)';
    if (exp >= 5) return 'E-7-3 숙련기능인력 (경력 기반)';
    return 'E-7-4 점수제 숙련기능인력';
  }
}
