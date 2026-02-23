// @ts-nocheck — 플랫폼에서 제외. 파일 보관용. / Excluded from platform. Kept for reference.
/**
 * E-1 교수 비자 정규직 평가기
 * E-1 Professor Visa Fulltime Evaluator
 *
 * E-1 핵심: 대학 및 전문대학에서 전임강사 이상의 교수 활동을 하는 외국인 비자.
 * E-1 core: Visa for foreigners engaged in professor activities (full-time lecturer or higher) at universities and colleges.
 *
 * [E-1 요건 / E-1 Requirements]
 * ① 기관 유형: 고등교육기관 (대학, 전문대학 등)
 *    Institution type: Higher education institutions (universities, colleges, etc.)
 * ② 직위: 전임강사, 조교수, 부교수, 정교수 등
 *    Position: Full-time lecturer, assistant professor, associate professor, professor, etc.
 * ③ 학력: 석사 이상 (일반적으로 박사학위 보유)
 *    Education: Master's or higher (typically doctorate degree)
 * ④ 연봉: 별도 최저임금 제한 없음 (기관별 교원 임금 기준)
 *    Salary: No separate minimum wage restriction (follows institution's faculty wage standards)
 * ⑤ 전공: 강의 과목과 관련된 전공 학위 필요
 *    Major: Degree related to teaching subject required
 *
 * [채용 트랙 / Hiring Track]
 * - SPONSOR: 해외 교수 인재 채용 (기업이 비자 스폰서)
 *            Overseas professor hire (company sponsors visa)
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제23조 제1항 — E-1 교수 체류자격
 * 교육공무원법 제2조 — 교원의 정의 및 범위
 * 고등교육법 제14조 — 대학 교원의 자격
 */

import {
  FulltimeJobInput,
  ApplicantProfile,
  FulltimeVisaEvalResult,
  IFulltimeVisaEvaluator,
  createEmptyFulltimeResult,
} from './fulltime-evaluator.interface';

export class E1FulltimeEvaluator implements IFulltimeVisaEvaluator {
  readonly visaCode = 'E-1';
  readonly visaName = '교수';
  readonly visaNameEn = 'Professor';

  /**
   * Job-side evaluation: 기관 유형 + 학력 기준 확인
   * Job-side evaluation: Check institution type + education requirements
   */
  evaluateJob(input: FulltimeJobInput): FulltimeVisaEvalResult {
    // 해외 교수 채용 → SPONSOR 트랙
    // Overseas professor hire → SPONSOR track
    const hiringTrack = input.overseasHireWilling ? 'SPONSOR' : 'TRANSFER';

    const result = createEmptyFulltimeResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
      hiringTrack,
    );

    // ====================================================================
    // STEP 1: 고등교육기관 확인 / Check higher education institution
    // ====================================================================
    if (!input.companyInfo) {
      // companyInfo 없음 → 교육기관 여부 확인 필요 (conditional)
      // No companyInfo → need to verify if educational institution (conditional)
      result.status = 'conditional';
      result.conditions.push(
        '고등교육기관(대학, 전문대학 등) 여부 확인 필요 ' +
          '(Need to verify if higher education institution: university, college, etc.)',
      );
    } else if (input.companyInfo.institutionType !== 'EDUCATION') {
      // institutionType이 EDUCATION이 아님 → blocked
      // institutionType is not EDUCATION → blocked
      result.status = 'blocked';
      result.blockReasons.push(
        'E-1 비자는 고등교육기관(대학, 전문대학 등)에서만 발급됩니다. ' +
          '해당 기관은 고등교육기관이 아닙니다 ' +
          '(E-1 visa is only issued for higher education institutions (universities, colleges). ' +
          'This institution is not a higher education institution)',
      );
      result.notes =
        'E-2(회화지도), E-7-1(교육 전문직) 등 다른 비자 유형 검토 권장 ' +
        '(Recommend checking other visa types: E-2 Foreign Language Instructor, E-7-1 Education Professional)';
      return result;
    }

    // ====================================================================
    // STEP 2: 학력 요구사항 확인 / Check education requirement
    // ====================================================================
    // E-1 교수 비자는 최소 석사 이상 필요 (일반적으로 박사)
    // E-1 Professor visa requires at least Master's (typically doctorate)
    const minEducationMet =
      input.educationLevel === 'MASTER' || input.educationLevel === 'DOCTORATE';

    if (!minEducationMet) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-1 비자는 석사 이상 학위가 필요합니다. ' +
          `제시 학력: ${input.educationLevel} ` +
          "(E-1 visa requires Master's or higher degree. " +
          `Offered education: ${input.educationLevel})`,
      );
      result.notes =
        '대학 교원 자격 기준: 석사 학위(전임강사), 박사 학위(조교수 이상) ' +
        "(University faculty qualification: Master's (full-time lecturer), Doctorate (assistant professor or higher))";
      return result;
    }

    // ====================================================================
    // STEP 3: 조건부 적합 / Conditional eligible
    // ====================================================================
    result.status = 'conditional';

    result.conditions.push(
      '석사 이상 학위 필요 (박사 학위 권장) ' +
        "(Master's or higher degree required, Doctorate recommended)",
    );

    result.conditions.push(
      '강의 과목과 관련된 전공 학위 필요 ' +
        '(Degree related to teaching subject required)',
    );

    result.conditions.push(
      '교육 경력 또는 연구 실적 증빙 필요 ' +
        '(Teaching experience or research achievements proof required)',
    );

    result.requiredPermit = null; // 비자 자체가 취업허가 / Visa itself is work permit

    result.notes =
      `E-1 교수 비자 — 고등교육기관 전임교수 활동 가능. ` +
      `학력 요구사항: ${input.educationLevel} ` +
      `(E-1 Professor visa — Full-time professor activities at higher education institution allowed. ` +
      `Education requirement: ${input.educationLevel})`;

    // 해외 스폰서 채용 vs 이직 채용
    // Overseas sponsor hire vs transfer hire
    if (hiringTrack === 'SPONSOR') {
      result.estimatedDays = 45; // 해외 교수: 비자 신청 ~45일 / Overseas: visa application ~45 days
      result.requiredDocuments = [
        '여권 사본 (Passport copy)',
        "학위증명서 (박사/석사) (Degree certificate: Doctorate/Master's)",
        '성적증명서 (Transcript)',
        '경력증명서 (Teaching/research experience certificate)',
        '연구 실적 목록 (Research achievements list)',
        '교원 임용 계약서 (Faculty appointment contract)',
        '대학 설립 허가서 사본 (University establishment permit copy)',
        '사업자등록증 (Business registration certificate)',
      ];
    } else {
      result.estimatedDays = 14; // E비자 이직: 직장변경 신고 ~14일 / E visa transfer: job change notification ~14 days
      result.requiredDocuments = [
        '외국인등록증 사본 (Copy of Alien Registration Card)',
        '현재 E-1 비자 사본 (Current E-1 visa copy)',
        '학위증명서 (Degree certificate)',
        '경력증명서 (Teaching/research experience certificate)',
        '교원 임용 계약서 (Faculty appointment contract)',
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
    // 지원자 학력 교차 검증 / Cross-validate applicant education
    // ====================================================================
    const hasMastersOrHigher =
      profile.educationLevel === 'MASTER' ||
      profile.educationLevel === 'DOCTORATE';

    if (!hasMastersOrHigher) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-1 비자 요건 미충족: 석사 이상 학위 필요. ' +
          `지원자 학력: ${profile.educationLevel || '학력 미제공'} ` +
          "(E-1 visa requirements not met: Master's or higher degree required. " +
          `Applicant education: ${profile.educationLevel || 'not provided'})`,
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
          (c) => !c.includes('강의 과목과 관련된 전공'),
        );
        result.conditions.push(
          `전공 일치: ${profile.major} — 강의 과목과 관련된 전공 보유 ` +
            `(Major match: ${profile.major} — Degree related to teaching subject)`,
        );
      }
    }

    // ====================================================================
    // 교육 경력 확인 (권장사항, blocking은 아님)
    // Check teaching experience (recommendation, not blocking)
    // ====================================================================
    if (profile.experienceYears >= 3) {
      result.conditions = result.conditions.filter(
        (c) => !c.includes('교육 경력'),
      );
      result.conditions.push(
        `교육/연구 경력 ${profile.experienceYears}년 — 경력 요건 충족 ` +
          `(${profile.experienceYears} years teaching/research experience — Experience requirement met)`,
      );
    }

    // ====================================================================
    // 학력 요건 충족 시 eligible
    // If education requirements met, set to eligible
    // ====================================================================
    if (hasMastersOrHigher) {
      result.status = 'eligible';
      result.conditions = result.conditions.filter(
        (c) => !c.includes('석사 이상 학위 필요'),
      );
      result.conditions.push(
        `학력 요건 충족: ${profile.educationLevel} ` +
          `(Education requirement met: ${profile.educationLevel})`,
      );
    }

    return result;
  }
}
