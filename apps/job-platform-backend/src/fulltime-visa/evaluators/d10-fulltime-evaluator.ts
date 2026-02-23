/**
 * D-10 구직(Job Seeking) → E-7 전환 정규직 평가기
 * D-10 Job Seeking → E-7 Transition Fulltime Evaluator
 *
 * D-10 핵심: 구직활동 체류자격 소지자의 E-7 체류자격 전환.
 * D-10 core: Job seekers transitioning from D-10 to E-7.
 *
 * [D-10 하위 유형 / D-10 Subtypes]
 * D-10-1: 일반구직 (General job seeking) — 학사+, 점수제 60점+
 * D-10-2: 기술창업 (Tech startup) — 학사+, IP ownership
 * D-10-3: 첨단인턴 (Advanced intern) — 30세 이하, 세계 200위 대학
 * D-10-4/T: 최우수 (Top talent) — 세계 100위 대학 석사+
 *
 * [D-10 → E-7 전환 요건 / D-10 → E-7 Transition Requirements]
 * ① 허용 직종: E-7 전체 허용직종 (E-7-1 + E-7-2 + E-7-3)
 *    Allowed occupations: All E-7 allowed occupations (E-7-1 + E-7-2 + E-7-3)
 * ② 최소 연봉: E-7 하위 유형별 기준 적용
 *    Minimum salary: Depends on which E-7 subtype the occupation falls under
 *    - E-7-1: 31,120,000원 (2026년 법무부공고 2025-406호)
 *    - E-7-2: 25,890,000원
 *    - E-7-3: 25,890,000원
 * ③ 학력: 학사 이상 (Bachelor's degree or higher)
 * ④ 국내 대학 졸업자: 국내 대학 특례 적용 가능
 *    Domestic university graduate: Special provision applicable
 * ⑤ 해외 대학 졸업자: 석사+, 학사+1년, 5년경력 경로
 *    Overseas university graduate: Master's+, Bachelor's+1yr, 5yr experience paths
 *
 * [체류 제한 / Stay Limitation]
 * ⚠️ D-10 최대 체류 기간: 2년. 기간 내 E-7 전환 못하면 출국 필수.
 * D-10 maximum stay: 2 years. Must depart if E-7 transition not completed within period.
 *
 * [채용 트랙 / Hiring Track]
 * - TRANSITION: D-10 → E-7 체류자격 전환
 *               D-10 → E-7 status transition
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 별표1 제27호의3 — D-10 구직 체류자격
 * 법무부공고 제2025-406호 — E-7 최소 연봉 기준 (2026.2.1~2026.12.31)
 */

import {
  FulltimeJobInput,
  ApplicantProfile,
  FulltimeVisaEvalResult,
  IFulltimeVisaEvaluator,
  createEmptyFulltimeResult,
} from './fulltime-evaluator.interface';
import { getE7TypeByJobCode } from '../constants/e7-job-categories';
import { getCurrentE7MinSalary } from '../data/gni-table';

export class D10FulltimeEvaluator implements IFulltimeVisaEvaluator {
  readonly visaCode = 'D-10';
  readonly visaName = '구직';
  readonly visaNameEn = 'Job Seeking';

  /**
   * Job-side evaluation: E-7 허용 직종 + 연봉 기준 확인 (D-10 → E-7 전환)
   * Job-side evaluation: Check E-7 allowed occupation + salary threshold (D-10 → E-7 transition)
   */
  evaluateJob(input: FulltimeJobInput): FulltimeVisaEvalResult {
    // D-10 → E-7 전환이므로 TRANSITION 트랙
    // D-10 → E-7 transition, so TRANSITION track
    const result = createEmptyFulltimeResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
      'TRANSITION',
    );

    // ====================================================================
    // STEP 1: 직종 확인 — E-7 전체 허용직종 (E-7-1 + E-7-2 + E-7-3)
    // STEP 1: Occupation check — All E-7 allowed occupations (E-7-1 + E-7-2 + E-7-3)
    // ====================================================================
    const e7Type = getE7TypeByJobCode(input.occupationCode);

    if (!e7Type) {
      result.status = 'blocked';
      result.blockReasons.push(
        'D-10 → E-7 전환은 E-7 허용직종(E-7-1/E-7-2/E-7-3)에만 가능합니다. ' +
          '해당 직종은 E-7 허용 목록에 없습니다 ' +
          '(D-10 → E-7 transition is only possible for E-7 allowed occupations (E-7-1/E-7-2/E-7-3). ' +
          'This occupation is not on the E-7 allowed list)',
      );
      result.notes =
        'E-7 허용직종 목록 확인 필요 — 전문인력(E-7-1), 준전문인력(E-7-2), 일반기능인력(E-7-3) ' +
        '(Check E-7 allowed occupation list — Professional (E-7-1), Semi-professional (E-7-2), General skilled (E-7-3))';
      return result;
    }

    // ====================================================================
    // STEP 2: 연봉 기준 — E-7 하위 유형별 최소 연봉 확인
    // STEP 2: Salary threshold — Check minimum salary by E-7 subtype
    // E-7-1: 31,120,000원, E-7-2: 25,890,000원, E-7-3: 25,890,000원
    // ====================================================================
    const minSalary = getCurrentE7MinSalary(e7Type);
    const meetsSalary = input.salaryMin >= minSalary;

    if (!meetsSalary) {
      result.status = 'blocked';
      result.blockReasons.push(
        `D-10 → E-7 전환 시 ${e7Type} 직종 최소 연봉 ${minSalary.toLocaleString()}원 이상이 필요합니다. ` +
          `제시 연봉: ${input.salaryMin.toLocaleString()}원 ` +
          `(D-10 → E-7 transition requires ${e7Type} minimum salary of ${minSalary.toLocaleString()} KRW. ` +
          `Offered salary: ${input.salaryMin.toLocaleString()} KRW)`,
      );
      result.notes =
        `${e7Type} 직종 최소 연봉: ${minSalary.toLocaleString()}원 ` +
        `(${e7Type} occupation minimum salary: ${minSalary.toLocaleString()} KRW)`;
      return result;
    }

    // ====================================================================
    // STEP 3: 조건부 적합 — D-10 소지자 고용계약 체결 필요
    // STEP 3: Conditional — D-10 holder employment contract required
    // ====================================================================
    result.status = 'conditional';

    result.conditions.push(
      'D-10 소지자 고용계약 체결 필요 — 고용계약 체결 후 체류자격 전환 신청 ' +
        '(Employment contract with D-10 holder required — Apply for status transition after contract)',
    );

    result.requiredPermit = null; // 전환 후 E-7이 취업허가 / After transition, E-7 is the work permit

    result.notes =
      `D-10 구직 → ${e7Type} 전환 가능. ` +
      `최소 연봉: ${minSalary.toLocaleString()}원 충족. ` +
      `⚠️ D-10 최대 체류 2년 이내 전환 필요 ` +
      `(D-10 Job Seeking → ${e7Type} transition possible. ` +
      `Minimum salary ${minSalary.toLocaleString()} KRW met. ` +
      `Warning: Must transition within D-10 maximum 2-year stay)`;

    // D-10 → E-7 전환: 약 21일 소요
    // D-10 → E-7 transition: approximately 21 days
    result.estimatedDays = 21;

    result.requiredDocuments = [
      '구직활동 증빙 (Proof of job seeking activities)',
      '고용계약서 (Employment contract)',
      '체류자격변경허가신청서 (Application for change of status of stay)',
      '학위증명서 (Degree certificate)',
    ];

    return result;
  }

  /**
   * Applicant-side evaluation: D-10 소지자 학력 + 국내 대학 특례 교차 검증
   * Applicant-side evaluation: Cross-validate D-10 holder education + domestic university special provision
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
    // 비자 타입 확인 / Verify visa type
    // ====================================================================
    if (profile.currentVisaType !== 'D-10') {
      result.status = 'blocked';
      result.blockReasons.push(
        `D-10 → E-7 전환은 D-10 비자 소지자만 가능합니다. ` +
          `현재 비자: ${profile.currentVisaType} ` +
          `(D-10 → E-7 transition is only for D-10 visa holders. ` +
          `Current visa: ${profile.currentVisaType})`,
      );
      return result;
    }

    // ====================================================================
    // 학력 확인 — D-10은 학사 이상 필요
    // Education check — D-10 requires Bachelor's degree or higher
    // ====================================================================
    const hasBachelorsOrHigher =
      profile.educationLevel === 'BACHELOR' ||
      profile.educationLevel === 'MASTER' ||
      profile.educationLevel === 'DOCTORATE';

    if (!hasBachelorsOrHigher) {
      result.status = 'blocked';
      result.blockReasons.push(
        'D-10 → E-7 전환은 학사 이상 학위가 필요합니다. ' +
          `지원자 학력: ${profile.educationLevel || '미제공'} ` +
          "(D-10 → E-7 transition requires Bachelor's degree or higher. " +
          `Applicant education: ${profile.educationLevel || 'not provided'})`,
      );
      return result;
    }

    // ====================================================================
    // 국내 대학 졸업자 특례 적용 여부 확인
    // Check if domestic university special provision applies
    // ====================================================================
    if (profile.isDomesticUniversity) {
      // 국내 대학 특례 적용 (고등교육법 제2조)
      // Domestic university special provision (Higher Education Act Article 2)
      const domesticDegree = profile.domesticDegreeLevel || profile.educationLevel;

      if (
        domesticDegree === 'BACHELOR' ||
        domesticDegree === 'MASTER' ||
        domesticDegree === 'DOCTORATE'
      ) {
        // 학사 이상: 경력불요, 전공무관
        // Bachelor's+: No experience required, any major
        result.status = 'eligible';
        result.conditions = result.conditions.filter(
          (c) => !c.includes('고용계약') && !c.includes('Employment contract'),
        );
        result.conditions.push(
          '국내 대학 특례 적용 (학사+): 경력불요, 전공무관 ' +
            "(Domestic university special provision (Bachelor's+): No experience required, any major)",
        );
      } else if (domesticDegree === 'ASSOCIATE') {
        // 전문학사: 경력불요, 전공관련만
        // Associate: No experience required, related major only
        result.status = 'conditional';
        result.conditions = result.conditions.filter(
          (c) => !c.includes('고용계약') && !c.includes('Employment contract'),
        );
        result.conditions.push(
          '국내 대학 특례 적용 (전문학사): 경력불요, 전공관련 직종만 가능 ' +
            '(Domestic university special provision (Associate): No experience required, related major only)',
        );
      }
    } else {
      // ====================================================================
      // 해외 대학 졸업자 — 표준 경로 적용
      // Overseas university graduate — Standard paths apply
      // - 석사 이상: 경력 불요 / Master's+: No experience required
      // - 학사 + 1년 이상 경력 / Bachelor's + 1+ years experience
      // - 학력 무관 + 5년 이상 경력 / Any education + 5+ years experience
      // ====================================================================
      const hasMastersOrHigher =
        profile.educationLevel === 'MASTER' ||
        profile.educationLevel === 'DOCTORATE';

      const hasBachelorsWithOneYear =
        profile.educationLevel === 'BACHELOR' && profile.experienceYears >= 1;

      const hasFiveYearsExp = profile.experienceYears >= 5;

      if (hasMastersOrHigher || hasBachelorsWithOneYear || hasFiveYearsExp) {
        result.status = 'eligible';
        result.conditions = result.conditions.filter(
          (c) => !c.includes('고용계약') && !c.includes('Employment contract'),
        );

        if (hasMastersOrHigher) {
          result.conditions.push(
            '석사 이상 학위 보유 — 경력 불요 ' +
              "(Master's degree or higher — No experience required)",
          );
        } else if (hasBachelorsWithOneYear) {
          result.conditions.push(
            `학사 학위 + ${profile.experienceYears}년 경력 보유 ` +
              `(Bachelor's degree + ${profile.experienceYears} years experience)`,
          );
        } else {
          result.conditions.push(
            `${profile.experienceYears}년 이상 경력 보유 (학력 무관 경로) ` +
              `(${profile.experienceYears}+ years experience — any education path)`,
          );
        }
      } else {
        // 표준 경로 요건 미충족
        // Standard path requirements not met
        result.status = 'blocked';
        result.blockReasons.push(
          'D-10 → E-7 전환 요건 미충족 (해외 대학): (1) 석사 이상 학위, ' +
            '(2) 학사 + 1년 이상 경력, (3) 학력 무관 + 5년 이상 경력 중 하나 필요. ' +
            `지원자: ${profile.educationLevel || '학력 미제공'}, 경력 ${profile.experienceYears}년 ` +
            "(D-10 → E-7 transition requirements not met (overseas university): Need one of " +
            "(1) Master's+ degree, (2) Bachelor's + 1+ years, (3) Any education + 5+ years. " +
            `Applicant: ${profile.educationLevel || 'not provided'}, ${profile.experienceYears} years)`,
        );
        return result;
      }
    }

    return result;
  }
}
