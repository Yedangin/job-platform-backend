/**
 * D-2 유학(Study) → E-7 전환 정규직 평가기
 * D-2 Study → E-7 Transition Fulltime Evaluator
 *
 * D-2 핵심: 국내 대학 재학/졸업(예정) 외국인의 E-7 체류자격 전환.
 * D-2 core: Domestic university students/graduates transitioning from D-2 to E-7.
 *
 * [D-2 하위 유형 / D-2 Subtypes]
 * D-2-1: 전문학사 (Associate degree)
 * D-2-2: 학사 (Bachelor's)
 * D-2-3: 석사 (Master's)
 * D-2-4: 박사 (Doctorate)
 * D-2-5: 연구 (Research)
 * D-2-6: 교환 (Exchange)
 * D-2-7: 일학습연계 (Work-study linkage) ← 국민고용비율 면제 특례
 * D-2-8: 단기유학 (Short-term study)
 *
 * [D-2 → E-7 전환 요건 / D-2 → E-7 Transition Requirements]
 * ① 허용 직종: E-7 전체 허용직종 (E-7-1 + E-7-2 + E-7-3)
 *    Allowed occupations: All E-7 allowed occupations (E-7-1 + E-7-2 + E-7-3)
 * ② 최소 연봉: E-7 하위 유형별 기준 적용
 *    Minimum salary: Depends on which E-7 subtype the occupation falls under
 *    - E-7-1: 31,120,000원 (2026년 법무부공고 2025-406호)
 *    - E-7-2: 25,890,000원
 *    - E-7-3: 25,890,000원
 * ③ 졸업(예정) 확인: 졸업 또는 졸업예정 상태 필수
 *    Graduation verification: Graduated or graduating status required
 * ④ 국내 대학 특례 (고등교육법 제2조):
 *    Domestic university special provision (Higher Education Act Article 2):
 *    - 학사+: 경력불요, 전공무관
 *      Bachelor's+: No experience required, any major
 *    - 전문학사: 경력불요, 전공관련만
 *      Associate: No experience required, related major only
 * ⑤ D-2-7 특례: 국민고용비율 면제
 *    D-2-7 special: Employment ratio exemption
 *
 * [채용 트랙 / Hiring Track]
 * - TRANSITION: D-2 → E-7 체류자격 전환
 *               D-2 → E-7 status transition
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제23조 — D-2 체류자격 전환 요건
 * 고등교육법 제2조 — 국내 대학 정의 (domestic university definition)
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

export class D2FulltimeEvaluator implements IFulltimeVisaEvaluator {
  readonly visaCode = 'D-2';
  readonly visaName = '유학';
  readonly visaNameEn = 'Study';

  /**
   * Job-side evaluation: E-7 허용 직종 + 연봉 기준 확인 (D-2 → E-7 전환)
   * Job-side evaluation: Check E-7 allowed occupation + salary threshold (D-2 → E-7 transition)
   */
  evaluateJob(input: FulltimeJobInput): FulltimeVisaEvalResult {
    // D-2 → E-7 전환이므로 TRANSITION 트랙
    // D-2 → E-7 transition, so TRANSITION track
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
        'D-2 → E-7 전환은 E-7 허용직종(E-7-1/E-7-2/E-7-3)에만 가능합니다. ' +
          '해당 직종은 E-7 허용 목록에 없습니다 ' +
          '(D-2 → E-7 transition is only possible for E-7 allowed occupations (E-7-1/E-7-2/E-7-3). ' +
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
        `D-2 → E-7 전환 시 ${e7Type} 직종 최소 연봉 ${minSalary.toLocaleString()}원 이상이 필요합니다. ` +
          `제시 연봉: ${input.salaryMin.toLocaleString()}원 ` +
          `(D-2 → E-7 transition requires ${e7Type} minimum salary of ${minSalary.toLocaleString()} KRW. ` +
          `Offered salary: ${input.salaryMin.toLocaleString()} KRW)`,
      );
      result.notes =
        `${e7Type} 직종 최소 연봉: ${minSalary.toLocaleString()}원 ` +
        `(${e7Type} occupation minimum salary: ${minSalary.toLocaleString()} KRW)`;
      return result;
    }

    // ====================================================================
    // STEP 3: 조건부 적합 — 졸업(예정) 확인 필요
    // STEP 3: Conditional — Graduation (expected) verification required
    // ====================================================================
    result.status = 'conditional';

    result.conditions.push(
      '졸업(예정) 확인 필요 — D-2 소지자의 졸업 또는 졸업예정 상태 확인 ' +
        '(Graduation verification required — D-2 holder must be graduated or graduating)',
    );

    result.requiredPermit = null; // 전환 후 E-7이 취업허가 / After transition, E-7 is the work permit

    result.notes =
      `D-2 유학 → ${e7Type} 전환 가능. ` +
      `최소 연봉: ${minSalary.toLocaleString()}원 충족. ` +
      `국내 대학 졸업(예정)자 특례 적용 가능 ` +
      `(D-2 Study → ${e7Type} transition possible. ` +
      `Minimum salary ${minSalary.toLocaleString()} KRW met. ` +
      `Domestic university graduate special provision may apply)`;

    // D-2 → E-7 전환: 약 30일 소요
    // D-2 → E-7 transition: approximately 30 days
    result.estimatedDays = 30;

    result.requiredDocuments = [
      '졸업(예정)증명서 (Graduation (expected) certificate)',
      '학위증명서 (Degree certificate)',
      '성적증명서 (Academic transcript)',
      '근로계약서 (Labor contract)',
      '체류자격변경허가신청서 (Application for change of status of stay)',
    ];

    return result;
  }

  /**
   * Applicant-side evaluation: D-2 소지자 졸업 상태 + 국내 대학 특례 교차 검증
   * Applicant-side evaluation: Cross-validate D-2 holder graduation status + domestic university special provision
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
    if (profile.currentVisaType !== 'D-2') {
      result.status = 'blocked';
      result.blockReasons.push(
        `D-2 → E-7 전환은 D-2 비자 소지자만 가능합니다. ` +
          `현재 비자: ${profile.currentVisaType} ` +
          `(D-2 → E-7 transition is only for D-2 visa holders. ` +
          `Current visa: ${profile.currentVisaType})`,
      );
      return result;
    }

    // ====================================================================
    // 졸업 상태 확인 / Check graduation status
    // ====================================================================
    const isGraduatedOrGraduating =
      profile.isGraduating === true ||
      profile.educationLevel === 'ASSOCIATE' ||
      profile.educationLevel === 'BACHELOR' ||
      profile.educationLevel === 'MASTER' ||
      profile.educationLevel === 'DOCTORATE';

    if (!isGraduatedOrGraduating) {
      result.status = 'blocked';
      result.blockReasons.push(
        'D-2 → E-7 전환은 졸업 또는 졸업예정 상태가 필요합니다. ' +
          `지원자 학력: ${profile.educationLevel || '미제공'}, 졸업예정: ${profile.isGraduating ? '예' : '아니오'} ` +
          '(D-2 → E-7 transition requires graduated or graduating status. ' +
          `Applicant education: ${profile.educationLevel || 'not provided'}, graduating: ${profile.isGraduating ? 'yes' : 'no'})`,
      );
      return result;
    }

    // ====================================================================
    // 국내 대학 특례 적용 (고등교육법 제2조)
    // Domestic university special provision (Higher Education Act Article 2)
    // - 학사+: 경력불요, 전공무관
    //   Bachelor's+: No experience required, any major
    // - 전문학사: 경력불요, 전공관련만
    //   Associate: No experience required, related major only
    // ====================================================================
    // D-2 소지자는 국내 대학 재학/졸업이므로 자동으로 국내 대학 특례 적용
    // D-2 holders are domestic university students/graduates, so automatic domestic university special provision

    const hasBachelorsOrHigher =
      profile.educationLevel === 'BACHELOR' ||
      profile.educationLevel === 'MASTER' ||
      profile.educationLevel === 'DOCTORATE';

    const hasAssociate = profile.educationLevel === 'ASSOCIATE';

    if (hasBachelorsOrHigher) {
      // 학사 이상: 경력불요, 전공무관
      // Bachelor's+: No experience required, any major
      result.status = 'eligible';
      result.conditions = result.conditions.filter(
        (c) => !c.includes('졸업(예정)') && !c.includes('Graduation'),
      );
      result.conditions.push(
        '국내 대학 특례 적용 (학사+): 경력불요, 전공무관 ' +
          "(Domestic university special provision (Bachelor's+): No experience required, any major)",
      );
    } else if (hasAssociate) {
      // 전문학사: 경력불요, 전공관련만
      // Associate: No experience required, related major only
      result.status = 'conditional';
      result.conditions = result.conditions.filter(
        (c) => !c.includes('졸업(예정)') && !c.includes('Graduation'),
      );
      result.conditions.push(
        '국내 대학 특례 적용 (전문학사): 경력불요, 전공관련 직종만 가능 ' +
          '(Domestic university special provision (Associate): No experience required, related major only)',
      );
    }

    // ====================================================================
    // D-2-7 일학습연계 특례: 국민고용비율 면제
    // D-2-7 Work-study linkage special: Employment ratio exemption
    // ====================================================================
    if (profile.currentVisaSubtype === 'D-2-7') {
      result.conditions.push(
        '국민고용비율 면제 (D-2-7 일학습연계 특례) ' +
          '(Employment ratio exemption — D-2-7 work-study linkage special provision)',
      );
      if (result.notes) {
        result.notes +=
          ' | D-2-7 일학습연계: 국민고용비율 면제 적용 ' +
          '(D-2-7 work-study: employment ratio exemption applied)';
      }
    }

    return result;
  }
}
