/**
 * E-7-2 준전문인력 비자 정규직 평가기
 * E-7-2 Semi-Professional Visa Fulltime Evaluator
 *
 * E-7-2 핵심: 준전문 직종 취업비자. 9개 허용 직종 + 연봉 기준 완화.
 * E-7-2 core: Semi-professional occupation work visa. 9 allowed occupations + relaxed salary requirements.
 *
 * [E-7-2 요건 / E-7-2 Requirements]
 * ① 허용 직종: 법무부 고시 9개 준전문직종
 *    Allowed occupations: 9 semi-professional occupations per MOJ
 * ② 최소 연봉: 법무부 고정금액 기준 (2025.4.1~12.31: 25,150,000원)
 *    Minimum salary: MOJ fixed amount (2025.4.1~12.31: 25,150,000 KRW)
 * ③ 고용비율: 특정 5개 직종에 한해 외국인 고용비율 20% 이하
 *    Employment ratio: For 5 specific occupations, foreign workers ≤ 20% of total
 * ④ 학력/경력: E-7-1보다 완화 (직종별 상이)
 *    Education/Experience: More relaxed than E-7-1 (varies by occupation)
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 별표 1의2 제20호 — E-7-2 준전문인력
 * 법무부공고 제2025-106호 — E-7-2 연봉 기준 (25,150,000원)
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

export class E72FulltimeEvaluator implements IFulltimeVisaEvaluator {
  readonly visaCode = 'E-7-2';
  readonly visaName = '준전문인력';
  readonly visaNameEn = 'Semi-Professional';

  /**
   * Job-side evaluation: 직종 + 연봉 + 고용비율 기준 확인
   * Job-side evaluation: Check occupation + salary + employment ratio threshold
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
    // STEP 1: E-7-2 허용 직종 확인 / Check E-7-2 allowed occupation
    // ====================================================================
    const e7Type = getE7TypeByJobCode(input.occupationCode);
    if (e7Type !== 'E-7-2') {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-7-2 비자는 법무부 고시 9개 준전문직종에만 발급됩니다. ' +
          '해당 직종은 허용 목록에 없습니다 ' +
          '(E-7-2 visa is only issued for 9 MOJ-designated semi-professional occupations. ' +
          'This occupation is not on the allowed list)',
      );
      result.notes =
        'E-7-1(전문직종), E-7-4(숙련기능인력), E-7-S(특정전문직종) 등 다른 E-7 하위 유형 검토 권장 ' +
        '(Recommend checking other E-7 subtypes: E-7-1 Professional, E-7-4 Skilled, E-7-S Specialized)';
      return result;
    }

    // ====================================================================
    // STEP 2: 연봉 기준 확인 / Check salary threshold
    // ⚠️ 2025.4.1부 법무부 고정금액 기준 적용 (법무부공고 제2025-106호)
    // As of 2025.4.1, MOJ fixed amount standard applies (MOJ Notice 2025-106)
    // ====================================================================
    const gni = getCurrentGni();
    const e72MinSalary = getCurrentE7MinSalary('E-7-2');
    const meetsSalary = input.salaryMin >= e72MinSalary;

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
          `E-7-2 비자는 법무부 고시 최소 연봉 ${e72MinSalary.toLocaleString()}원 이상이 필요합니다. ` +
            `제시 연봉: ${input.salaryMin.toLocaleString()}원 ` +
            `(E-7-2 visa requires MOJ-designated minimum salary of ${e72MinSalary.toLocaleString()} KRW. ` +
            `Offered salary: ${input.salaryMin.toLocaleString()} KRW)`,
        );
        result.notes =
          `법무부공고 제2025-106호 기준 (2025.4.1 ~ 2025.12.31) — ` +
          `E-7-2 최소 연봉: ${e72MinSalary.toLocaleString()}원 ` +
          `(MOJ Notice 2025-106 (2025.4.1 ~ 2025.12.31) — ` +
          `E-7-2 minimum: ${e72MinSalary.toLocaleString()} KRW)`;
      } else {
        // GNI 비율 기준 메시지 (향후 환원 시)
        // GNI ratio standard message (when reverted in future)
        result.blockReasons.push(
          `E-7-2 비자는 최소 연봉 ${e72MinSalary.toLocaleString()}원 이상이 필요합니다. ` +
            `제시 연봉: ${input.salaryMin.toLocaleString()}원 ` +
            `(E-7-2 visa requires minimum salary of ${e72MinSalary.toLocaleString()} KRW. ` +
            `Offered salary: ${input.salaryMin.toLocaleString()} KRW)`,
        );
      }
      return result;
    }

    // ====================================================================
    // STEP 3: 고용비율 20% 제한 확인 (5개 직종에만 적용)
    // Check 20% employment ratio restriction (only for 5 occupations)
    // TODO: E-7-2 중 고용비율 제한 직종 구체적으로 식별 필요
    // ====================================================================
    // E-7-2 중 일부 직종만 고용비율 제한 적용 (임시로 모든 E-7-2에 적용)
    const isRatioRestricted = false; // TODO: 실제 제한 직종 목록 확인 필요
    if (isRatioRestricted) {
      if (!input.companyInfo) {
        result.status = 'conditional';
        result.conditions.push(
          '외국인 고용비율 20% 이하 확인 필요 (해당 직종) ' +
            '(Foreign employee ratio ≤ 20% verification required for this occupation)',
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
            `E-7-2 비자 해당 직종은 외국인 고용비율 20% 이하 제한이 적용됩니다. ` +
              `현재 비율: ${foreignRatio.toFixed(1)}% ` +
              `(E-7-2 visa for this occupation requires foreign employee ratio ≤ 20%. ` +
              `Current ratio: ${foreignRatio.toFixed(1)}%)`,
          );
          result.notes =
            '해외영업원, 통번역가, 기계공학기술자, 제도사, 여행상품개발자 직종에만 고용비율 제한 적용 ' +
            '(Employment ratio restriction applies only to: Overseas Sales, Translator/Interpreter, ' +
            'Mechanical Engineer, Drafter, Travel Product Developer)';
          return result;
        } else {
        }
      }
    } else {
    }

    // ====================================================================
    // STEP 4: 학력/경력 조건 확인 / Check education/experience conditions
    // ====================================================================
    const occupation = E7_JOB_CATEGORIES.find((cat) => cat.code === input.occupationCode);

    // 조건부 적합 — 학력/경력 요구사항은 지원자 검증 시 확인
    // Conditional eligible — education/experience checked during applicant validation
    result.status = 'conditional';

    result.conditions.push(
      '전문학사 이상 또는 관련 경력 (직종별 상이) ' +
        '(Associate degree or higher, or relevant experience, varies by occupation)',
    );

    result.conditions.push(
      'TOPIK 3급 이상 권장 (직종에 따라 면제 가능) ' +
        '(TOPIK 3+ recommended, exemption possible depending on occupation)',
    );

    result.requiredPermit = null; // 비자 자체가 취업허가 / Visa itself is work permit

    result.notes =
      `E-7-2 준전문직종 비자 — ${occupation?.occupationName || '해당 직종'} 취업 가능. ` +
      `최소 연봉: ${e72MinSalary.toLocaleString()}원 충족 ` +
      `(E-7-2 Semi-Professional visa — Employment allowed for ${occupation?.occupationNameEn || 'this occupation'}. ` +
      `Minimum salary ${e72MinSalary.toLocaleString()} KRW met)`;

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
      ];
    } else {
      result.estimatedDays = 14; // E비자 이직: 직장변경 신고 ~14일 / E visa transfer: job change notification ~14 days
      result.requiredDocuments = [
        '외국인등록증 사본 (Copy of Alien Registration Card)',
        '현재 E-7-2 비자 사본 (Current E-7-2 visa copy)',
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
    // E-7-2는 E-7-1보다 학력/경력 요건이 완화됨
    // E-7-2 has more relaxed education/experience requirements than E-7-1
    // - 전문학사 이상 OR 관련 경력 3년 이상
    // - Associate degree or higher OR 3+ years related experience

    const hasAssociateOrHigher =
      profile.educationLevel === 'ASSOCIATE' ||
      profile.educationLevel === 'BACHELOR' ||
      profile.educationLevel === 'MASTER' ||
      profile.educationLevel === 'DOCTORATE';

    const hasThreeYearsExp = profile.experienceYears >= 3;

    // 둘 중 하나도 충족하지 못하면 blocked
    // If neither condition is met, blocked
    if (!hasAssociateOrHigher && !hasThreeYearsExp) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-7-2 비자 요건 미충족: (1) 전문학사 이상 학위 또는 (2) 관련 경력 3년 이상 필요. ' +
          `지원자: ${profile.educationLevel || '학력 미제공'}, 경력 ${profile.experienceYears}년 ` +
          '(E-7-2 visa requirements not met: Need (1) Associate degree or higher OR ' +
          '(2) 3+ years related experience. ' +
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
    if (hasAssociateOrHigher || hasThreeYearsExp) {
      result.status = 'eligible';
      // 충족된 조건 문구 제거
      // Remove met condition text
      result.conditions = result.conditions.filter(
        (c) => !c.includes('전문학사') && !c.includes('Associate'),
      );
    }

    return result;
  }
}
