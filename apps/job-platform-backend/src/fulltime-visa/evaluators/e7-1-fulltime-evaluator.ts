/**
 * E-7-1 특정활동(전문직종) 비자 정규직 평가기
 * E-7-1 Specific Activities (Professional Occupations) Visa Fulltime Evaluator
 *
 * E-7-1 핵심: 전문 직종 취업비자. 91개 허용 직종 + GNI 80% 이상 연봉 필수.
 * E-7-1 core: Professional occupation work visa. 91 allowed occupations + salary ≥ GNI × 80% required.
 *
 * [E-7-1 요건 / E-7-1 Requirements]
 * ① 허용 직종: 법무부 고시 91개 전문직종 (KSCO 기준)
 *    Allowed occupations: 91 professional occupations per MOJ (KSCO-based)
 * ② 최소 연봉: 1인당 GNI × 80% 이상
 *    Minimum salary: ≥ GNI per capita × 80%
 *    - 2024년: 34,208,000원 (GNI 42,760,000 × 0.8)
 *    - 2025년: 35,200,000원 (GNI 44,000,000 × 0.8)
 * ③ 학력/경력: 학사학위 또는 5년 이상 경력 (직종별 상이)
 *    Education/Experience: Bachelor's degree or 5+ years experience (varies by occupation)
 * ④ 한국어: TOPIK 4급 이상 권장 (직종별 상이)
 *    Korean: TOPIK 4+ recommended (varies by occupation)
 *
 * [채용 트랙 / Hiring Tracks]
 * - SPONSOR: 해외 인재 스폰서 채용 (기업이 비자 스폰서)
 *            Overseas talent sponsor hire (company sponsors visa)
 * - TRANSFER: E비자 보유자 이직 채용 (E→E 직장 변경)
 *             E visa holder transfer (E→E job change)
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제7조제7항 — E-7-1 연봉 기준 (GNI × 0.8)
 * 법무부 고시 — E-7 비자 발급 대상 전문직종 91개
 * 한국표준직업분류(KSCO) — 직종 코드 체계
 */

import {
  FulltimeJobInput,
  ApplicantProfile,
  FulltimeVisaEvalResult,
  IFulltimeVisaEvaluator,
  createEmptyFulltimeResult,
} from './fulltime-evaluator.interface';
import {
  E7_JOB_CATEGORIES,
  getE7TypeByJobCode,
} from '../constants/e7-job-categories';
import {
  getCurrentGni,
  getCurrentE7MinSalary,
  meetsE71SalaryThreshold,
} from '../data/gni-table';

export class E71FulltimeEvaluator implements IFulltimeVisaEvaluator {
  readonly visaCode = 'E-7-1';
  readonly visaName = '특정활동(전문직종)';
  readonly visaNameEn = 'Specific Activities (Professional)';

  /**
   * Job-side evaluation: 직종 + 연봉 기준 확인
   * Job-side evaluation: Check occupation + salary threshold
   */
  evaluateJob(input: FulltimeJobInput): FulltimeVisaEvalResult {
    // 해외 인재 스폰서 채용 시 SPONSOR 트랙
    // Overseas hire → SPONSOR track
    const hiringTrack = input.overseasHireWilling ? 'SPONSOR' : 'TRANSFER';

    const result = createEmptyFulltimeResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
      hiringTrack,
    );

    // ====================================================================
    // STEP 1: E-7-1 허용 직종 확인 / Check E-7-1 allowed occupation
    // ====================================================================
    const e7Type = getE7TypeByJobCode(input.occupationCode);
    if (e7Type !== 'E-7-1') {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-7-1 비자는 법무부 고시 91개 전문직종에만 발급됩니다. ' +
          '해당 직종은 허용 목록에 없습니다 ' +
          '(E-7-1 visa is only issued for 91 MOJ-designated professional occupations. ' +
          'This occupation is not on the allowed list)',
      );
      result.notes =
        'E-7-2(교수), E-7-4(첨단기술), E-7-S(특정전문직종) 등 다른 E-7 하위 유형 검토 권장 ' +
        '(Recommend checking other E-7 subtypes: E-7-2 Professor, E-7-4 Advanced Tech, E-7-S Specialized Professional)';
      return result;
    }

    // ====================================================================
    // STEP 2: 연봉 기준 확인 / Check salary threshold
    // ⚠️ 2025.4.1부 법무부 고정금액 기준 적용 (법무부공고 제2025-106호)
    // As of 2025.4.1, MOJ fixed amount standard applies (MOJ Notice 2025-106)
    // ====================================================================
    const gni = getCurrentGni();
    const e71MinSalary = getCurrentE7MinSalary('E-7-1');
    const meetsSalary = meetsE71SalaryThreshold(input.salaryMin);

    if (!meetsSalary) {
      result.status = 'blocked';

      // 법무부 고정금액 적용기간 여부 확인
      // Check if MOJ fixed amount period applies
      const isMojFixedPeriod =
        gni.mojFixedSalary &&
        new Date().toISOString().split('T')[0] >=
          gni.mojFixedSalary.effectiveFrom &&
        new Date().toISOString().split('T')[0] <=
          gni.mojFixedSalary.effectiveTo;

      if (isMojFixedPeriod) {
        // 법무부 고정금액 기준 메시지
        // MOJ fixed amount standard message
        result.blockReasons.push(
          `E-7-1 비자는 법무부 고시 최소 연봉 ${e71MinSalary.toLocaleString()}원 이상이 필요합니다. ` +
            `제시 연봉: ${input.salaryMin.toLocaleString()}원 ` +
            `(E-7-1 visa requires MOJ-designated minimum salary of ${e71MinSalary.toLocaleString()} KRW. ` +
            `Offered salary: ${input.salaryMin.toLocaleString()} KRW)`,
        );
        result.notes =
          `법무부공고 제2025-106호 기준 (2025.4.1 ~ 2025.12.31) — ` +
          `E-7-1 최소 연봉: ${e71MinSalary.toLocaleString()}원 ` +
          `(MOJ Notice 2025-106 (2025.4.1 ~ 2025.12.31) — ` +
          `E-7-1 minimum: ${e71MinSalary.toLocaleString()} KRW)`;
      } else {
        // GNI 비율 기준 메시지
        // GNI ratio standard message
        result.blockReasons.push(
          `E-7-1 비자는 최소 연봉 ${e71MinSalary.toLocaleString()}원 (GNI × 80%) 이상이 필요합니다. ` +
            `제시 연봉: ${input.salaryMin.toLocaleString()}원 ` +
            `(E-7-1 visa requires minimum salary of ${e71MinSalary.toLocaleString()} KRW (GNI × 80%). ` +
            `Offered salary: ${input.salaryMin.toLocaleString()} KRW)`,
        );
        result.notes =
          `${gni.year}년 기준 GNI: ${gni.gniPerCapita.toLocaleString()}원, ` +
          `E-7-1 최소 연봉: ${e71MinSalary.toLocaleString()}원 ` +
          `(${gni.year} GNI: ${gni.gniPerCapita.toLocaleString()} KRW, ` +
          `E-7-1 minimum: ${e71MinSalary.toLocaleString()} KRW)`;
      }
      return result;
    }

    // ====================================================================
    // STEP 3: 학력/경력 조건 확인 / Check education/experience conditions
    // ====================================================================
    const occupation = E7_JOB_CATEGORIES.find(
      (cat) => cat.code === input.occupationCode,
    );

    // 조건부 적합 — 학력/경력 요구사항은 지원자 검증 시 확인
    // Conditional eligible — education/experience checked during applicant validation
    result.status = 'conditional';

    result.conditions.push(
      '학사 학위 또는 5년 이상 관련 경력 필요 (직종별 상이) ' +
        "(Bachelor's degree or 5+ years related experience required, varies by occupation)",
    );

    result.conditions.push(
      'TOPIK 4급 이상 권장 (직종에 따라 면제 가능) ' +
        '(TOPIK 4+ recommended, exemption possible depending on occupation)',
    );

    result.requiredPermit = null; // 비자 자체가 취업허가 / Visa itself is work permit

    result.notes =
      `E-7-1 전문직종 비자 — ${occupation?.nameKo || '해당 직종'} 취업 가능. ` +
      `최소 연봉: ${e71MinSalary.toLocaleString()}원 충족 ` +
      `(E-7-1 Professional visa — Employment allowed for ${occupation?.nameEn || 'this occupation'}. ` +
      `Minimum salary ${e71MinSalary.toLocaleString()} KRW met)`;

    // 해외 스폰서 채용 vs 이직 채용
    // Overseas sponsor hire vs transfer hire
    if (hiringTrack === 'SPONSOR') {
      result.estimatedDays = 45; // 해외 인재: 비자 신청 ~45일 / Overseas: visa application ~45 days
      result.requiredDocuments = [
        '여권 사본 (Passport copy)',
        '학위증명서 또는 경력증명서 (Degree certificate or work experience certificate)',
        '표준계약서 (Standard labor contract)',
        '채용사유서 (Hiring rationale statement)',
        '사업자등록증 (Business registration certificate)',
        '재직증명서 (Certificate of employment - if applicable)',
      ];
    } else {
      result.estimatedDays = 14; // E비자 이직: 직장변경 신고 ~14일 / E visa transfer: job change notification ~14 days
      result.requiredDocuments = [
        '외국인등록증 사본 (Copy of Alien Registration Card)',
        '현재 E-7 비자 사본 (Current E-7 visa copy)',
        '이력서 및 경력증명서 (Resume and work experience certificate)',
        '근로계약서 (Labor contract)',
        '직장변경 신고서 (Job change notification)',
      ];
    }

    return result;
  }

  /**
   * Applicant-side evaluation: 지원자의 학력/경력/한국어 수준 교차 검증
   * Applicant-side evaluation: Cross-validate applicant's education/experience/Korean level
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
    // 지원자 학력/경력 교차 검증 / Cross-validate applicant education/experience
    // ====================================================================
    // 법령 기준 (visa-rules-full.md:235-243):
    // Law basis:
    // - 석사 이상: 경력 불요 / Master's+: Experience not required
    // - 학사 + 1년 이상 경력 / Bachelor's + 1+ years experience
    // - 학력 무관 + 5년 이상 경력 / Any education + 5+ years experience

    // 석사 이상 (경력 불요)
    // Master's or higher (no experience required)
    const hasMastersOrHigher =
      profile.educationLevel === 'MASTER' ||
      profile.educationLevel === 'DOCTORATE';

    // 학사 + 1년 이상 경력
    // Bachelor's + 1+ years experience
    const hasBachelorsWithOneYear =
      profile.educationLevel === 'BACHELOR' && profile.experienceYears >= 1;

    // 학력 무관 + 5년 이상 경력
    // Any education + 5+ years experience
    const hasFiveYearsExp = profile.experienceYears >= 5;

    // 셋 중 하나도 충족하지 못하면 blocked
    // If none of the three conditions are met, blocked
    if (!hasMastersOrHigher && !hasBachelorsWithOneYear && !hasFiveYearsExp) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-7-1 비자 요건 미충족: (1) 석사 이상 학위, (2) 학사 + 1년 이상 경력, ' +
          '(3) 학력 무관 + 5년 이상 경력 중 하나 필요. ' +
          `지원자: ${profile.educationLevel || '학력 미제공'}, 경력 ${profile.experienceYears}년 ` +
          "(E-7-1 visa requirements not met: Need one of (1) Master's+ degree, " +
          "(2) Bachelor's + 1+ years, (3) Any education + 5+ years. " +
          `Applicant: ${profile.educationLevel || 'not provided'}, ${profile.experienceYears} years)`,
      );
      return result;
    }

    // 한국어 수준 확인 (권장사항, blocking은 아님)
    // Check Korean level (recommendation, not blocking)
    if (
      profile.topikLevel &&
      (profile.topikLevel === 'TOPIK_4' ||
        profile.topikLevel === 'TOPIK_5' ||
        profile.topikLevel === 'TOPIK_6')
    ) {
      result.conditions = result.conditions.filter((c) => !c.includes('TOPIK'));
      result.conditions.push(
        `TOPIK ${profile.topikLevel.replace('TOPIK_', '')}급 보유 — 한국어 요건 충족 ` +
          `(TOPIK ${profile.topikLevel.replace('TOPIK_', '')} — Korean language requirement met)`,
      );
    }

    // 학력/경력 요건 충족 시 eligible
    // If education/experience requirements met, set to eligible
    if (hasMastersOrHigher || hasBachelorsWithOneYear || hasFiveYearsExp) {
      result.status = 'eligible';
      // 충족된 조건 문구 제거
      // Remove met condition text
      result.conditions = result.conditions.filter(
        (c) => !c.includes('학사 학위') && !c.includes("Bachelor's degree"),
      );
    }

    return result;
  }
}
