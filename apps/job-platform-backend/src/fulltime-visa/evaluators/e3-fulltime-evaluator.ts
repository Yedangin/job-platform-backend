// @ts-nocheck — 플랫폼에서 제외. 파일 보관용. / Excluded from platform. Kept for reference.
/**
 * E-3 연구 비자 정규직 평가기
 * E-3 Researcher Visa Fulltime Evaluator
 *
 * E-3 핵심: 연구소, 대학 연구기관 등에서 연구 활동을 하는 외국인 비자.
 * E-3 core: Visa for foreigners engaged in research activities at research institutes, university research centers, etc.
 *
 * [E-3 요건 / E-3 Requirements]
 * ① 기관 유형: 연구기관 (정부출연연구소, 대학 부설 연구소, 기업부설연구소 등)
 *    Institution type: Research institutions (government-funded institutes, university research centers, corporate research labs, etc.)
 * ② 학력: 석사 + 3년 이상 경력 OR 박사 학위
 *    Education: Master's + 3+ years experience OR Doctorate degree
 * ③ 연봉: 별도 최저임금 제한 없음 (기관별 연구원 임금 기준)
 *    Salary: No separate minimum wage restriction (follows institution's researcher wage standards)
 * ④ 전공: 연구 분야와 관련된 전공 학위 필요
 *    Major: Degree related to research field required
 * ⑤ 연구 실적: 논문, 특허 등 연구 실적 권장
 *    Research achievements: Publications, patents, etc. recommended
 *
 * [채용 트랙 / Hiring Track]
 * - SPONSOR: 해외 연구 인재 채용 (기업이 비자 스폰서)
 *            Overseas researcher hire (company sponsors visa)
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제23조 제3항 — E-3 연구 체류자격
 * 과학기술기본법 제11조 — 연구기관의 정의
 * 기초연구진흥 및 기술개발지원에 관한 법률 — 연구원 자격
 */

import {
  FulltimeJobInput,
  ApplicantProfile,
  FulltimeVisaEvalResult,
  IFulltimeVisaEvaluator,
  createEmptyFulltimeResult,
} from './fulltime-evaluator.interface';

export class E3FulltimeEvaluator implements IFulltimeVisaEvaluator {
  readonly visaCode = 'E-3';
  readonly visaName = '연구';
  readonly visaNameEn = 'Researcher';

  /**
   * Job-side evaluation: 기관 유형 + 학력 기준 확인
   * Job-side evaluation: Check institution type + education requirements
   */
  evaluateJob(input: FulltimeJobInput): FulltimeVisaEvalResult {
    // 해외 연구 인재 채용 → SPONSOR 트랙
    // Overseas researcher hire → SPONSOR track
    const hiringTrack = input.overseasHireWilling ? 'SPONSOR' : 'TRANSFER';

    const result = createEmptyFulltimeResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
      hiringTrack,
    );

    // ====================================================================
    // STEP 1: 연구기관 확인 / Check research institution
    // ====================================================================
    if (!input.companyInfo) {
      // companyInfo 없음 → 연구기관 여부 확인 필요 (conditional)
      // No companyInfo → need to verify if research institution (conditional)
      result.status = 'conditional';
      result.conditions.push(
        '연구기관(정부출연연구소, 대학 부설 연구소, 기업부설연구소 등) 여부 확인 필요 ' +
          '(Need to verify if research institution: government-funded, university-affiliated, corporate lab, etc.)',
      );
    } else if (input.companyInfo.institutionType !== 'RESEARCH') {
      // institutionType이 RESEARCH가 아님 → blocked
      // institutionType is not RESEARCH → blocked
      result.status = 'blocked';
      result.blockReasons.push(
        'E-3 비자는 연구기관(정부출연연구소, 대학 부설 연구소, 기업부설연구소 등)에서만 발급됩니다. ' +
          '해당 기관은 연구기관이 아닙니다 ' +
          '(E-3 visa is only issued for research institutions (government-funded institutes, university research centers, corporate labs). ' +
          'This institution is not a research institution)',
      );
      result.notes =
        'E-1(교수), E-7-1(연구 전문직) 등 다른 비자 유형 검토 권장 ' +
        '(Recommend checking other visa types: E-1 Professor, E-7-1 Research Professional)';
      return result;
    }

    // ====================================================================
    // STEP 2: 학력 요구사항 확인 / Check education requirement
    // ====================================================================
    // E-3 연구 비자는 최소 석사 이상 필요 (박사 학위 권장)
    // E-3 Researcher visa requires at least Master's (doctorate recommended)
    const minEducationMet =
      input.educationLevel === 'MASTER' || input.educationLevel === 'DOCTORATE';

    if (!minEducationMet) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-3 비자는 석사 이상 학위가 필요합니다. ' +
          `제시 학력: ${input.educationLevel} ` +
          "(E-3 visa requires Master's or higher degree. " +
          `Offered education: ${input.educationLevel})`,
      );
      result.notes =
        '연구원 자격 기준: 석사 학위 + 3년 이상 경력 OR 박사 학위 ' +
        "(Researcher qualification: Master's + 3+ years experience OR Doctorate degree)";
      return result;
    }

    // ====================================================================
    // STEP 3: 조건부 적합 / Conditional eligible
    // ====================================================================
    result.status = 'conditional';

    result.conditions.push(
      '석사 학위 + 3년 이상 연구 경력 OR 박사 학위 필요 ' +
        "(Master's + 3+ years research experience OR Doctorate required)",
    );

    result.conditions.push(
      '연구 분야와 관련된 전공 학위 필요 ' +
        '(Degree related to research field required)',
    );

    result.conditions.push(
      '연구 실적 (논문, 특허 등) 증빙 권장 ' +
        '(Research achievements proof recommended: publications, patents, etc.)',
    );

    result.requiredPermit = null; // 비자 자체가 취업허가 / Visa itself is work permit

    result.notes =
      `E-3 연구 비자 — 연구기관 연구 활동 가능. ` +
      `학력 요구사항: ${input.educationLevel} ` +
      `(E-3 Researcher visa — Research activities at research institution allowed. ` +
      `Education requirement: ${input.educationLevel})`;

    // 해외 스폰서 채용 vs 이직 채용
    // Overseas sponsor hire vs transfer hire
    if (hiringTrack === 'SPONSOR') {
      result.estimatedDays = 45; // 해외 연구원: 비자 신청 ~45일 / Overseas: visa application ~45 days
      result.requiredDocuments = [
        '여권 사본 (Passport copy)',
        "학위증명서 (석사/박사) (Degree certificate: Master's/Doctorate)",
        '성적증명서 (Transcript)',
        '경력증명서 (Research experience certificate)',
        '연구 실적 목록 (논문, 특허 등) (Research achievements list: publications, patents, etc.)',
        '연구 계획서 (Research proposal)',
        '근로계약서 (Labor contract)',
        '연구기관 설립 허가서 사본 (Research institution establishment permit copy)',
        '사업자등록증 (Business registration certificate)',
      ];
    } else {
      result.estimatedDays = 14; // E비자 이직: 직장변경 신고 ~14일 / E visa transfer: job change notification ~14 days
      result.requiredDocuments = [
        '외국인등록증 사본 (Copy of Alien Registration Card)',
        '현재 E-3 비자 사본 (Current E-3 visa copy)',
        '학위증명서 (Degree certificate)',
        '경력증명서 (Research experience certificate)',
        '연구 실적 목록 (Research achievements list)',
        '근로계약서 (Labor contract)',
        '직장변경 신고서 (Job change notification)',
      ];
    }

    return result;
  }

  /**
   * Applicant-side evaluation: 지원자의 학력/전공/경력 교차 검증
   * Applicant-side evaluation: Cross-validate applicant's education/major/experience
   */
  evaluateApplicant(
    input: FulltimeJobInput,
    profile: ApplicantProfile,
  ): FulltimeVisaEvalResult {
    const result = this.evaluateJob(input);

    if (result.status === 'blocked') {
      return result; // 이미 blocked면 더 이상 검증 불필요 / If already blocked, no further validation
    }

    // ====================================================================
    // 지원자 학력 + 경력 교차 검증 / Cross-validate applicant education + experience
    // ====================================================================
    // 법령 기준: 석사 + 3년 OR 박사
    // Law basis: Master's + 3 years OR Doctorate
    const hasDoctorate = profile.educationLevel === 'DOCTORATE';
    const hasMastersWithThreeYears =
      profile.educationLevel === 'MASTER' && profile.experienceYears >= 3;

    if (!hasDoctorate && !hasMastersWithThreeYears) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-3 비자 요건 미충족: (1) 박사 학위, (2) 석사 + 3년 이상 연구 경력 중 하나 필요. ' +
          `지원자: ${profile.educationLevel || '학력 미제공'}, 경력 ${profile.experienceYears}년 ` +
          '(E-3 visa requirements not met: Need one of (1) Doctorate degree, ' +
          "(2) Master's + 3+ years research experience. " +
          `Applicant: ${profile.educationLevel || 'not provided'}, ${profile.experienceYears} years)`,
      );
      return result;
    }

    // ====================================================================
    // 전공 일치 확인 (권장사항, blocking은 아님)
    // Check major match (recommendation, not blocking)
    // ====================================================================
    if (
      profile.major &&
      input.preferredMajors &&
      input.preferredMajors.length > 0
    ) {
      const majorMatch = input.preferredMajors.some(
        (preferredMajor) => preferredMajor === profile.major,
      );

      if (majorMatch) {
        result.conditions = result.conditions.filter(
          (c) => !c.includes('연구 분야와 관련된 전공'),
        );
        result.conditions.push(
          `전공 일치: ${profile.major} — 연구 분야와 관련된 전공 보유 ` +
            `(Major match: ${profile.major} — Degree related to research field)`,
        );
      }
    }

    // ====================================================================
    // 학력 + 경력 요건 충족 시 eligible
    // If education + experience requirements met, set to eligible
    // ====================================================================
    if (hasDoctorate || hasMastersWithThreeYears) {
      result.status = 'eligible';
      result.conditions = result.conditions.filter(
        (c) => !c.includes('석사 학위') && !c.includes("Master's"),
      );

      if (hasDoctorate) {
        result.conditions.push(
          `학력 요건 충족: ${profile.educationLevel} ` +
            `(Education requirement met: ${profile.educationLevel})`,
        );
      } else {
        result.conditions.push(
          `학력 + 경력 요건 충족: ${profile.educationLevel} + ${profile.experienceYears}년 경력 ` +
            `(Education + experience requirement met: ${profile.educationLevel} + ${profile.experienceYears} years)`,
        );
      }
    }

    return result;
  }
}
