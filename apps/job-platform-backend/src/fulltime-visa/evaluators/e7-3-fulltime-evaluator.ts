/**
 * E-7-3 일반기능인력 비자 정규직 평가기
 * E-7-3 General Skilled Worker Visa Fulltime Evaluator
 *
 * E-7-3 핵심: 일반기능 직종 취업비자. 9개 허용 직종 + 기업 추천 (주무부처 고용추천서).
 * E-7-3 core: General skilled occupation work visa. 9 allowed occupations + company recommendation (competent ministry employment recommendation).
 *
 * [E-7-3 요건 / E-7-3 Requirements]
 * ① 허용 직종: 법무부 고시 9개 일반기능직종
 *    Allowed occupations: 9 general skilled occupations per MOJ
 * ② 최소 연봉: 법무부 고정금액 기준 (2026.2.1~12.31: 25,890,000원)
 *    Minimum salary: MOJ fixed amount (2026.2.1~12.31: 25,890,000 KRW)
 * ③ 고용비율: 전 직종 외국인 고용비율 20% 이하
 *    Employment ratio: All occupations, foreign workers ≤ 20% of total
 * ④ 학력/경력: 석사+ / 학사+1년 / 5년경력 (직종별 특수요건 있음)
 *    Education/Experience: Master's+ / Bachelor's+1yr / 5yr exp (occupation-specific special requirements)
 * ⑤ 국내 대학 특례: 국내 학사+ 경력불요 전공무관, 전문학사 경력불요 전공관련만
 *    Domestic university special: Bachelor's+ no exp any major, Associate no exp related major only
 * ⑥ 선발 방식: 기업 추천 (주무부처 고용추천서) — 점수제 아님
 *    Selection: Company recommendation (competent ministry employment recommendation) — NOT points-based
 *
 * [직종별 특수요건 / Occupation-specific Special Requirements]
 * - 조선용접공 (7430): 국제 중급 이상 용접자격증 필수
 *   Shipbuilding Welder: International intermediate+ welding certificate required
 * - 양식기술자 (6301): 해양수산부 추천 필수
 *   Aquaculture Technician: Ministry of Oceans and Fisheries recommendation required
 * - 할랄 도축원 (7103): 이슬람 단체 인증 업체만
 *   Halal Slaughterer: Only Islamic organization-certified companies
 * - 악기제조/조율사 (7303): 10년 이상 경력
 *   Musical Instrument Maker/Tuner: 10+ years experience required
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 별표 1의2 제20호 — E-7-3 일반기능인력
 * 법무부공고 제2025-406호 — E-7-3 연봉 기준 (25,890,000원, 2026.2.1~12.31)
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
import { getCurrentE7MinSalary, getCurrentGni } from '../data/gni-table';

/**
 * E-7-3 직종별 특수요건 / Occupation-specific special requirements
 */
const E73_SPECIAL_REQUIREMENTS: Record<string, { ko: string; en: string }> = {
  // 조선용접공: 국제 중급 이상 용접자격증 필수
  // Shipbuilding Welder: International intermediate+ welding certificate required
  '7430': {
    ko: '국제 중급 이상 용접자격증 필수',
    en: 'International intermediate+ welding certificate required',
  },
  // 양식기술자: 해양수산부 추천 필수
  // Aquaculture Technician: Ministry of Oceans and Fisheries recommendation required
  '6301': {
    ko: '해양수산부 추천 필수',
    en: 'Ministry of Oceans and Fisheries recommendation required',
  },
  // 할랄 도축원: 이슬람 단체 인증 업체만
  // Halal Slaughterer: Only Islamic organization-certified companies
  '7103': {
    ko: '이슬람 단체 인증 업체만 고용 가능',
    en: 'Only Islamic organization-certified companies may hire',
  },
  // 악기제조/조율사: 10년 이상 경력
  // Musical Instrument Maker/Tuner: 10+ years experience required
  '7303': {
    ko: '10년 이상 경력 필수',
    en: '10+ years experience required',
  },
};

export class E73FulltimeEvaluator implements IFulltimeVisaEvaluator {
  readonly visaCode = 'E-7-3';
  readonly visaName = '일반기능인력';
  readonly visaNameEn = 'General Skilled Worker';

  /**
   * Job-side evaluation: 직종 + 연봉 + 고용비율 + 특수요건 기준 확인
   * Job-side evaluation: Check occupation + salary + employment ratio + special requirements threshold
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
    // STEP 1: E-7-3 허용 직종 확인 / Check E-7-3 allowed occupation
    // ====================================================================
    const e7Type = getE7TypeByJobCode(input.occupationCode);
    if (e7Type !== 'E-7-3') {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-7-3 비자는 법무부 고시 9개 일반기능직종에만 발급됩니다. ' +
          '해당 직종은 허용 목록에 없습니다 ' +
          '(E-7-3 visa is only issued for 9 MOJ-designated general skilled occupations. ' +
          'This occupation is not on the allowed list)',
      );
      result.notes =
        'E-7-1(전문직종), E-7-2(준전문직종), E-7-4(숙련기능인력), E-7-S(특정전문직종) 등 다른 E-7 하위 유형 검토 권장 ' +
        '(Recommend checking other E-7 subtypes: E-7-1 Professional, E-7-2 Semi-Professional, E-7-4 Skilled, E-7-S Specialized)';
      return result;
    }

    // ====================================================================
    // STEP 2: 연봉 기준 확인 / Check salary threshold
    // ⚠️ 2026.2.1부 법무부 고정금액 기준 적용 (법무부공고 제2025-406호)
    // As of 2026.2.1, MOJ fixed amount standard applies (MOJ Notice 2025-406)
    // ====================================================================
    const gni = getCurrentGni();
    const e73MinSalary = getCurrentE7MinSalary('E-7-3');
    const meetsSalary = input.salaryMin >= e73MinSalary;

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
          `E-7-3 비자는 법무부 고시 최소 연봉 ${e73MinSalary.toLocaleString()}원 이상이 필요합니다. ` +
            `제시 연봉: ${input.salaryMin.toLocaleString()}원 ` +
            `(E-7-3 visa requires MOJ-designated minimum salary of ${e73MinSalary.toLocaleString()} KRW. ` +
            `Offered salary: ${input.salaryMin.toLocaleString()} KRW)`,
        );
        result.notes =
          `법무부공고 제2025-406호 기준 (2026.2.1 ~ 2026.12.31) — ` +
          `E-7-3 최소 연봉: ${e73MinSalary.toLocaleString()}원 ` +
          `(MOJ Notice 2025-406 (2026.2.1 ~ 2026.12.31) — ` +
          `E-7-3 minimum: ${e73MinSalary.toLocaleString()} KRW)`;
      } else {
        // GNI 비율 기준 메시지 (향후 환원 시)
        // GNI ratio standard message (when reverted in future)
        result.blockReasons.push(
          `E-7-3 비자는 최소 연봉 ${e73MinSalary.toLocaleString()}원 이상이 필요합니다. ` +
            `제시 연봉: ${input.salaryMin.toLocaleString()}원 ` +
            `(E-7-3 visa requires minimum salary of ${e73MinSalary.toLocaleString()} KRW. ` +
            `Offered salary: ${input.salaryMin.toLocaleString()} KRW)`,
        );
      }
      return result;
    }

    // ====================================================================
    // STEP 3: 고용비율 20% 제한 확인 (전 직종 적용)
    // Check 20% employment ratio restriction (applies to ALL E-7-3 occupations)
    // 법무부공고 제2025-406호: E-7-3 전 직종 외국인 고용비율 20% 이하
    // MOJ Notice 2025-406: All E-7-3 occupations — foreign employee ratio ≤ 20%
    // ====================================================================
    const isRatioRestricted = true; // 전 직종 적용 / Applies to all E-7-3 occupations
    if (isRatioRestricted) {
      if (!input.companyInfo) {
        result.status = 'conditional';
        result.conditions.push(
          '외국인 고용비율 20% 이하 확인 필요 (E-7-3 전 직종 적용, 법무부공고 2025-406호) ' +
            '(Foreign employee ratio ≤ 20% verification required — applies to all E-7-3 occupations, MOJ Notice 2025-406)',
        );
      } else {
        const { totalEmployees, foreignEmployeeCount } = input.companyInfo;
        const foreignRatio =
          totalEmployees > 0
            ? (foreignEmployeeCount / totalEmployees) * 100
            : 0;

        if (foreignRatio >= 20) {
          result.status = 'blocked';
          result.blockReasons.push(
            `E-7-3 비자는 전 직종 외국인 고용비율 20% 이하 제한이 적용됩니다. ` +
              `현재 비율: ${foreignRatio.toFixed(1)}% ` +
              `(E-7-3 visa requires foreign employee ratio ≤ 20% for all occupations. ` +
              `Current ratio: ${foreignRatio.toFixed(1)}%)`,
          );
          result.notes =
            '법무부공고 제2025-406호: E-7-3 전 직종 외국인 고용비율 20% 이하 제한 적용 ' +
            '(MOJ Notice 2025-406: Employment ratio ≤ 20% restriction applies to all E-7-3 occupations)';
          return result;
        }
      }
    }

    // ====================================================================
    // STEP 4: 직종별 특수요건 확인 / Check occupation-specific special requirements
    // ====================================================================
    const specialReq = E73_SPECIAL_REQUIREMENTS[input.occupationCode];
    if (specialReq) {
      result.conditions.push(
        `직종 특수요건: ${specialReq.ko} ` +
          `(Occupation special requirement: ${specialReq.en})`,
      );
    }

    // ====================================================================
    // STEP 5: 선발 방식 — 기업 추천 (주무부처 고용추천서)
    // Selection method — Company recommendation (competent ministry employment recommendation)
    // ⚠️ E-7-3은 점수제(E-7-4)가 아닌 기업 추천 방식
    // E-7-3 uses company recommendation, NOT points-based (that's E-7-4)
    // ====================================================================
    result.conditions.push(
      '주무부처 고용추천서 필수 (기업 추천 방식) ' +
        '(Competent ministry employment recommendation letter required — company recommendation method)',
    );

    // ====================================================================
    // STEP 6: 학력/경력 조건 확인 / Check education/experience conditions
    // ====================================================================
    const occupation = E7_JOB_CATEGORIES.find(
      (cat) => cat.code === input.occupationCode,
    );

    // 조건부 적합 — 학력/경력 요구사항은 지원자 검증 시 확인
    // Conditional eligible — education/experience checked during applicant validation
    result.status = 'conditional';

    result.conditions.push(
      '석사 이상 또는 학사+1년 경력 또는 5년 이상 경력 (직종별 상이) ' +
        "(Master's+ or Bachelor's+1yr exp or 5+ years experience, varies by occupation)",
    );

    result.conditions.push(
      'TOPIK 3급 이상 권장 (직종에 따라 면제 가능) ' +
        '(TOPIK 3+ recommended, exemption possible depending on occupation)',
    );

    result.requiredPermit = null; // 비자 자체가 취업허가 / Visa itself is work permit

    result.notes =
      `E-7-3 일반기능인력 비자 — ${occupation?.nameKo || '해당 직종'} 취업 가능. ` +
      `최소 연봉: ${e73MinSalary.toLocaleString()}원 충족. 기업 추천 방식 (점수제 아님) ` +
      `(E-7-3 General Skilled Worker visa — Employment allowed for ${occupation?.nameEn || 'this occupation'}. ` +
      `Minimum salary ${e73MinSalary.toLocaleString()} KRW met. Company recommendation method, not points-based)`;

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
        '주무부처 고용추천서 (Competent ministry employment recommendation letter)',
      ];
    } else {
      result.estimatedDays = 14; // E비자 이직: 직장변경 신고 ~14일 / E visa transfer: job change notification ~14 days
      result.requiredDocuments = [
        '외국인등록증 사본 (Copy of Alien Registration Card)',
        '현재 E-7-3 비자 사본 (Current E-7-3 visa copy)',
        '이력서 및 경력증명서 (Resume and work experience certificate)',
        '근로계약서 (Labor contract)',
        '직장변경 신고서 (Job change notification)',
        '주무부처 고용추천서 (Competent ministry employment recommendation letter)',
      ];
    }

    // 직종별 추가 서류 / Occupation-specific additional documents
    if (input.occupationCode === '7430') {
      result.requiredDocuments.push(
        '국제 중급 이상 용접자격증 사본 (Copy of international intermediate+ welding certificate)',
      );
    }
    if (input.occupationCode === '6301') {
      result.requiredDocuments.push(
        '해양수산부 추천서 (Ministry of Oceans and Fisheries recommendation letter)',
      );
    }
    if (input.occupationCode === '7103') {
      result.requiredDocuments.push(
        '이슬람 단체 인증서 (Islamic organization certification)',
      );
    }
    if (input.occupationCode === '7303') {
      result.requiredDocuments.push(
        '10년 이상 경력증명서 (Certificate of 10+ years experience)',
      );
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
    // E-7-3 학력/경력 경로 (법무부공고 2025-406호):
    // E-7-3 education/experience paths (MOJ Notice 2025-406):
    //
    // [일반 경로 / General paths]
    // ① 석사 이상: 경력불요 / Master's+: no experience required
    // ② 학사 + 1년 이상 경력 / Bachelor's + 1+ years experience
    // ③ 학력 무관 + 5년 이상 경력 / Any education + 5+ years experience
    //
    // [국내 대학 특례 / Domestic university special provisions]
    // ④ 국내 학사+: 경력불요, 전공무관 / Domestic Bachelor's+: no exp, any major
    // ⑤ 국내 전문학사: 경력불요, 전공관련만 / Domestic Associate: no exp, related major only
    //
    // [직종별 특수요건 / Occupation-specific special requirements]
    // - 조선용접공: 국제 중급 이상 용접자격증 필수
    // - 양식기술자: 해양수산부 추천 필수
    // - 할랄 도축원: 이슬람 단체 인증 업체만
    // - 악기제조/조율사: 10년 이상 경력

    // ====================================================================
    // 직종별 특수요건 검증 / Validate occupation-specific special requirements
    // ====================================================================

    // 악기제조/조율사: 10년 이상 경력 필수 (일반 학력/경력 경로와 별도)
    // Musical Instrument Maker/Tuner: 10+ years experience required (separate from general paths)
    if (input.occupationCode === '7303' && profile.experienceYears < 10) {
      result.status = 'blocked';
      result.blockReasons.push(
        `E-7-3 악기제조 및 조율사 직종은 10년 이상 경력이 필수입니다. ` +
          `지원자 경력: ${profile.experienceYears}년 ` +
          `(E-7-3 Musical Instrument Maker/Tuner requires 10+ years experience. ` +
          `Applicant experience: ${profile.experienceYears} years)`,
      );
      return result;
    }

    // ====================================================================
    // ④⑤ 국내 대학 특례 확인 / Check domestic university special provisions
    // ====================================================================
    if (profile.isDomesticUniversity && profile.domesticDegreeLevel) {
      const domesticBachelorOrHigher =
        profile.domesticDegreeLevel === 'BACHELOR' ||
        profile.domesticDegreeLevel === 'MASTER' ||
        profile.domesticDegreeLevel === 'DOCTORATE';

      if (domesticBachelorOrHigher) {
        // ④ 국내 학사 이상: 경력불요, 전공무관
        // Domestic Bachelor's or higher: no experience required, any major
        result.status = 'eligible';
        result.conditions = result.conditions.filter(
          (c) =>
            !c.includes('석사 이상') &&
            !c.includes("Master's+") &&
            !c.includes('학사+1년') &&
            !c.includes("Bachelor's+1yr"),
        );
        result.conditions.push(
          '국내 대학 학사 이상 특례 적용 — 경력불요, 전공무관 ' +
            "(Domestic university Bachelor's+ special provision — no experience required, any major)",
        );

        // 한국어 수준 확인 / Check Korean level
        if (
          profile.topikLevel &&
          (profile.topikLevel === 'TOPIK_3' ||
            profile.topikLevel === 'TOPIK_4' ||
            profile.topikLevel === 'TOPIK_5' ||
            profile.topikLevel === 'TOPIK_6')
        ) {
          result.conditions = result.conditions.filter(
            (c) => !c.includes('TOPIK'),
          );
          result.conditions.push(
            `TOPIK ${profile.topikLevel.replace('TOPIK_', '')}급 보유 — 한국어 요건 충족 ` +
              `(TOPIK ${profile.topikLevel.replace('TOPIK_', '')} — Korean language requirement met)`,
          );
        }

        return result;
      }

      if (profile.domesticDegreeLevel === 'ASSOCIATE') {
        // ⑤ 국내 전문학사: 경력불요, 전공관련만
        // Domestic Associate: no experience required, related major only
        result.status = 'conditional';
        result.conditions = result.conditions.filter(
          (c) =>
            !c.includes('석사 이상') &&
            !c.includes("Master's+") &&
            !c.includes('학사+1년') &&
            !c.includes("Bachelor's+1yr"),
        );
        result.conditions.push(
          '국내 대학 전문학사 특례 적용 — 경력불요, 전공관련 여부 확인 필요 ' +
            '(Domestic university Associate special provision — no experience required, related major verification needed)',
        );

        // 한국어 수준 확인 / Check Korean level
        if (
          profile.topikLevel &&
          (profile.topikLevel === 'TOPIK_3' ||
            profile.topikLevel === 'TOPIK_4' ||
            profile.topikLevel === 'TOPIK_5' ||
            profile.topikLevel === 'TOPIK_6')
        ) {
          result.conditions = result.conditions.filter(
            (c) => !c.includes('TOPIK'),
          );
          result.conditions.push(
            `TOPIK ${profile.topikLevel.replace('TOPIK_', '')}급 보유 — 한국어 요건 충족 ` +
              `(TOPIK ${profile.topikLevel.replace('TOPIK_', '')} — Korean language requirement met)`,
          );
        }

        return result;
      }
    }

    // ====================================================================
    // ①②③ 일반 학력/경력 경로 확인 / Check general education/experience paths
    // ====================================================================

    // ① 석사 이상 (경력 불요)
    // Master's or higher (no experience required)
    const hasMastersOrHigher =
      profile.educationLevel === 'MASTER' ||
      profile.educationLevel === 'DOCTORATE';

    // ② 학사 + 1년 이상 경력
    // Bachelor's + 1+ years experience
    const hasBachelorsWithOneYear =
      profile.educationLevel === 'BACHELOR' && profile.experienceYears >= 1;

    // ③ 학력 무관 + 5년 이상 경력
    // Any education + 5+ years experience
    const hasFiveYearsExp = profile.experienceYears >= 5;

    // 셋 중 하나도 충족하지 못하면 blocked
    // If none of the three conditions are met, blocked
    if (!hasMastersOrHigher && !hasBachelorsWithOneYear && !hasFiveYearsExp) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-7-3 비자 요건 미충족: (1) 석사 이상 학위, (2) 학사 + 1년 이상 경력, ' +
          '(3) 학력 무관 + 5년 이상 경력 중 하나 필요. ' +
          `지원자: ${profile.educationLevel || '학력 미제공'}, 경력 ${profile.experienceYears}년 ` +
          "(E-7-3 visa requirements not met: Need one of (1) Master's+ degree, " +
          "(2) Bachelor's + 1+ years, (3) Any education + 5+ years. " +
          `Applicant: ${profile.educationLevel || 'not provided'}, ${profile.experienceYears} years)`,
      );
      return result;
    }

    // 한국어 수준 확인 (권장사항, blocking은 아님)
    // Check Korean level (recommendation, not blocking)
    if (
      profile.topikLevel &&
      (profile.topikLevel === 'TOPIK_3' ||
        profile.topikLevel === 'TOPIK_4' ||
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
        (c) =>
          !c.includes('석사 이상') &&
          !c.includes("Master's+") &&
          !c.includes('학사+1년') &&
          !c.includes("Bachelor's+1yr"),
      );
    }

    return result;
  }
}
