/**
 * E-2 회화지도 비자 정규직 평가기
 * E-2 Foreign Language Instructor Visa Fulltime Evaluator
 *
 * E-2 핵심: 외국어학원, 초중고, 대학 등에서 외국어 회화 지도 활동을 하는 외국인 비자.
 * E-2 core: Visa for foreigners engaged in foreign language instruction at language schools, K-12, universities, etc.
 *
 * [E-2 요건 / E-2 Requirements]
 * ① 기관 유형: 교육기관 (외국어학원, 초중고, 대학 등)
 *    Institution type: Educational institutions (language schools, K-12, universities, etc.)
 * ② 모국어: 지도 언어의 모국어 화자 (Native speaker of teaching language)
 *    Native language: Native speaker of teaching language
 * ③ 학력: 학사 이상 학위
 *    Education: Bachelor's degree or higher
 * ④ 연봉: 별도 최저임금 제한 없음 (기관별 임금 기준)
 *    Salary: No separate minimum wage restriction (follows institution's wage standards)
 * ⑤ 경력: 교육 경력 또는 관련 자격증 권장
 *    Experience: Teaching experience or related certifications recommended
 *
 * [채용 트랙 / Hiring Track]
 * - SPONSOR: 해외 외국어 강사 채용 (기업이 비자 스폰서)
 *            Overseas language instructor hire (company sponsors visa)
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제23조 제2항 — E-2 회화지도 체류자격
 * 학원의 설립·운영 및 과외교습에 관한 법률 — 외국어학원 강사 자격
 * 초·중등교육법 제21조 — 교원 자격
 */

import {
  FulltimeJobInput,
  ApplicantProfile,
  FulltimeVisaEvalResult,
  IFulltimeVisaEvaluator,
  createEmptyFulltimeResult,
} from './fulltime-evaluator.interface';

export class E2FulltimeEvaluator implements IFulltimeVisaEvaluator {
  readonly visaCode = 'E-2';
  readonly visaName = '회화지도';
  readonly visaNameEn = 'Foreign Language Instructor';

  /**
   * Job-side evaluation: 기관 유형 + 학력 기준 확인
   * Job-side evaluation: Check institution type + education requirements
   */
  evaluateJob(input: FulltimeJobInput): FulltimeVisaEvalResult {
    // 해외 외국어 강사 채용 → SPONSOR 트랙
    // Overseas language instructor hire → SPONSOR track
    const hiringTrack = input.overseasHireWilling ? 'SPONSOR' : 'TRANSFER';

    const result = createEmptyFulltimeResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
      hiringTrack,
    );

    // ====================================================================
    // STEP 1: 교육기관 확인 / Check educational institution
    // ====================================================================
    if (!input.companyInfo) {
      // companyInfo 없음 → 교육기관 여부 확인 필요 (conditional)
      // No companyInfo → need to verify if educational institution (conditional)
      result.status = 'conditional';
      result.conditions.push(
        '교육기관(외국어학원, 초중고, 대학 등) 여부 확인 필요 ' +
          '(Need to verify if educational institution: language school, K-12, university, etc.)',
      );
    } else if (input.companyInfo.institutionType !== 'EDUCATION') {
      // institutionType이 EDUCATION이 아님 → blocked
      // institutionType is not EDUCATION → blocked
      result.status = 'blocked';
      result.blockReasons.push(
        'E-2 비자는 교육기관(외국어학원, 초중고, 대학 등)에서만 발급됩니다. ' +
          '해당 기관은 교육기관이 아닙니다 ' +
          '(E-2 visa is only issued for educational institutions (language schools, K-12, universities). ' +
          'This institution is not an educational institution)',
      );
      result.notes =
        'E-1(교수), E-7-1(교육 전문직) 등 다른 비자 유형 검토 권장 ' +
        '(Recommend checking other visa types: E-1 Professor, E-7-1 Education Professional)';
      return result;
    }

    // ====================================================================
    // STEP 2: 학력 요구사항 확인 / Check education requirement
    // ====================================================================
    // E-2 회화지도 비자는 최소 학사 이상 필요
    // E-2 Foreign Language Instructor visa requires at least Bachelor's
    const minEducationMet =
      input.educationLevel === 'BACHELOR' ||
      input.educationLevel === 'MASTER' ||
      input.educationLevel === 'DOCTORATE';

    if (!minEducationMet) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-2 비자는 학사 이상 학위가 필요합니다. ' +
          `제시 학력: ${input.educationLevel} ` +
          "(E-2 visa requires Bachelor's degree or higher. " +
          `Offered education: ${input.educationLevel})`,
      );
      result.notes =
        '외국어 회화지도 자격 기준: 학사 학위 + 해당 언어의 모국어 화자 ' +
        "(Foreign language instructor qualification: Bachelor's degree + Native speaker of teaching language)";
      return result;
    }

    // ====================================================================
    // STEP 3: 조건부 적합 / Conditional eligible
    // ====================================================================
    result.status = 'conditional';

    result.conditions.push(
      '학사 이상 학위 필요 ' + "(Bachelor's degree or higher required)",
    );

    result.conditions.push(
      '지도 언어의 모국어 화자 필요 (Native speaker required) ' +
        '(Native speaker of teaching language required)',
    );

    result.conditions.push(
      '교육 경력 또는 TESOL/TEFL 자격증 권장 ' +
        '(Teaching experience or TESOL/TEFL certification recommended)',
    );

    result.requiredPermit = null; // 비자 자체가 취업허가 / Visa itself is work permit

    result.notes =
      `E-2 회화지도 비자 — 외국어 회화 지도 활동 가능. ` +
      `학력 요구사항: ${input.educationLevel} ` +
      `(E-2 Foreign Language Instructor visa — Foreign language instruction allowed. ` +
      `Education requirement: ${input.educationLevel})`;

    // 해외 스폰서 채용 vs 이직 채용
    // Overseas sponsor hire vs transfer hire
    if (hiringTrack === 'SPONSOR') {
      result.estimatedDays = 45; // 해외 강사: 비자 신청 ~45일 / Overseas: visa application ~45 days
      result.requiredDocuments = [
        '여권 사본 (Passport copy)',
        "학위증명서 (학사 이상) (Degree certificate: Bachelor's or higher)",
        '성적증명서 (Transcript)',
        '범죄경력증명서 (Criminal record certificate)',
        '경력증명서 (Teaching experience certificate - if applicable)',
        'TESOL/TEFL 자격증 (TESOL/TEFL certification - if applicable)',
        '근로계약서 (Labor contract)',
        '학원 등록증 사본 (Language school registration copy)',
        '사업자등록증 (Business registration certificate)',
      ];
    } else {
      result.estimatedDays = 14; // E비자 이직: 직장변경 신고 ~14일 / E visa transfer: job change notification ~14 days
      result.requiredDocuments = [
        '외국인등록증 사본 (Copy of Alien Registration Card)',
        '현재 E-2 비자 사본 (Current E-2 visa copy)',
        '학위증명서 (Degree certificate)',
        '경력증명서 (Teaching experience certificate)',
        '근로계약서 (Labor contract)',
        '직장변경 신고서 (Job change notification)',
      ];
    }

    return result;
  }

  /**
   * Applicant-side evaluation: 지원자의 학력/모국어/경력 교차 검증
   * Applicant-side evaluation: Cross-validate applicant's education/native language/experience
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
    const hasBachelorsOrHigher =
      profile.educationLevel === 'BACHELOR' ||
      profile.educationLevel === 'MASTER' ||
      profile.educationLevel === 'DOCTORATE';

    if (!hasBachelorsOrHigher) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-2 비자 요건 미충족: 학사 이상 학위 필요. ' +
          `지원자 학력: ${profile.educationLevel || '학력 미제공'} ` +
          "(E-2 visa requirements not met: Bachelor's degree or higher required. " +
          `Applicant education: ${profile.educationLevel || 'not provided'})`,
      );
      return result;
    }

    // ====================================================================
    // 모국어 화자 확인 / Check native speaker
    // ====================================================================
    // profile.nativeSpeakerOf 확인 (예: 'English', 'Chinese', 'Japanese' 등)
    // Check profile.nativeSpeakerOf (e.g., 'English', 'Chinese', 'Japanese', etc.)
    // (실제 구현 시 FulltimeJobInput에 teachingLanguage 필드 추가 필요)
    const teachingLanguage = (input as any).teachingLanguage;
    if (teachingLanguage && profile.nativeSpeakerOf) {
      if (profile.nativeSpeakerOf !== teachingLanguage) {
        result.status = 'blocked';
        result.blockReasons.push(
          `E-2 비자 요건 미충족: ${teachingLanguage} 모국어 화자 필요. ` +
            `지원자 모국어: ${profile.nativeSpeakerOf} ` +
            `(E-2 visa requirements not met: Native speaker of ${teachingLanguage} required. ` +
            `Applicant native language: ${profile.nativeSpeakerOf})`,
        );
        return result;
      }

      // 모국어 일치 시 조건 제거
      // Remove native speaker condition if matched
      result.conditions = result.conditions.filter(
        (c) => !c.includes('모국어 화자 필요'),
      );
      result.conditions.push(
        `모국어 확인: ${profile.nativeSpeakerOf} — 지도 언어 일치 ` +
          `(Native language confirmed: ${profile.nativeSpeakerOf} — Teaching language match)`,
      );
    }

    // ====================================================================
    // 교육 경력 확인 (권장사항, blocking은 아님)
    // Check teaching experience (recommendation, not blocking)
    // ====================================================================
    if (profile.experienceYears >= 2) {
      result.conditions = result.conditions.filter(
        (c) => !c.includes('교육 경력'),
      );
      result.conditions.push(
        `교육 경력 ${profile.experienceYears}년 — 경력 요건 충족 ` +
          `(${profile.experienceYears} years teaching experience — Experience requirement met)`,
      );
    }

    // ====================================================================
    // 학력 요건 충족 시 eligible
    // If education requirements met, set to eligible
    // ====================================================================
    if (hasBachelorsOrHigher) {
      result.status = 'eligible';
      result.conditions = result.conditions.filter(
        (c) => !c.includes('학사 이상 학위 필요'),
      );
      result.conditions.push(
        `학력 요건 충족: ${profile.educationLevel} ` +
          `(Education requirement met: ${profile.educationLevel})`,
      );
    }

    return result;
  }
}
