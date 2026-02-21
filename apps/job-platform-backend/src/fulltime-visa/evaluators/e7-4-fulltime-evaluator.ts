/**
 * E-7-4 숙련기능인력 비자 정규직 평가기
 * E-7-4 Skilled Worker Visa Fulltime Evaluator
 *
 * E-7-4 핵심: E-9/H-2 단순노무 업종에서 4년 이상 체류한 외국인의 전환 비자.
 * E-7-4 core: Transition visa for foreigners with 4+ years stay in E-9/H-2 simple labor occupations.
 *
 * [E-7-4 요건 / E-7-4 Requirements]
 * ① 대상: E-9/H-2 단순노무 업종에 종사했던 외국인
 *    Target: Foreigners who worked in E-9/H-2 simple labor occupations
 * ② 체류 요건: 최근 10년간 4년 이상 합법 체류
 *    Stay requirement: 4+ years legal stay within last 10 years
 * ③ 점수 요건: 200점 이상 (학력, 경력, 한국어, 기술자격 등)
 *    Points requirement: 200+ points (education, experience, Korean, technical qualifications, etc.)
 * ④ 최소 연봉: 2025년 기준 26,000,000원 (법무부 고정금액)
 *    Minimum salary: 26,000,000 KRW (2025 MOJ fixed amount)
 * ⑤ 업종 제한: E-9/H-2 허용 업종 (단순노무 직종)
 *    Occupation restriction: E-9/H-2 allowed occupations (simple labor)
 *
 * [채용 트랙 / Hiring Track]
 * - TRANSITION: E-9/H-2 → E-7-4 전환
 *               E-9/H-2 → E-7-4 transition
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제23조 제5항 — E-7-4 체류자격 전환 요건
 * 법무부공고 제2025-106호 — E-7-4 최소 연봉 26,000,000원 (2025.4.1~12.31)
 * 법무부 고시 — E-7-4 점수제 평가 기준 (200점 이상)
 */

import {
  FulltimeJobInput,
  ApplicantProfile,
  FulltimeVisaEvalResult,
  IFulltimeVisaEvaluator,
  createEmptyFulltimeResult,
} from './fulltime-evaluator.interface';
import { getCurrentE7MinSalary } from '../data/gni-table';
import { isSimpleLaborOccupation } from '../data/occupation-code-table';

export class E74FulltimeEvaluator implements IFulltimeVisaEvaluator {
  readonly visaCode = 'E-7-4';
  readonly visaName = '숙련기능인력';
  readonly visaNameEn = 'Skilled Worker';

  /**
   * Job-side evaluation: 직종 + 연봉 기준 확인
   * Job-side evaluation: Check occupation + salary threshold
   */
  evaluateJob(input: FulltimeJobInput): FulltimeVisaEvalResult {
    // E-7-4는 E-9/H-2 → E-7-4 전환이므로 TRANSITION 트랙
    // E-7-4 is E-9/H-2 → E-7-4 transition, so TRANSITION track
    const result = createEmptyFulltimeResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
      'TRANSITION',
    );

    // ====================================================================
    // STEP 1: E-9/H-2 단순노무 업종 확인 / Check E-9/H-2 simple labor occupation
    // ====================================================================
    if (!isSimpleLaborOccupation(input.occupationCode)) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-7-4 비자는 E-9/H-2 단순노무 업종(대분류 9)에만 발급됩니다. ' +
          '해당 직종은 단순노무가 아닙니다 ' +
          '(E-7-4 visa is only issued for E-9/H-2 simple labor occupations (major group 9). ' +
          'This occupation is not simple labor)',
      );
      result.notes =
        'E-7-1(전문직종), E-7-2(준전문인력) 등 다른 E-7 하위 유형 검토 권장 ' +
        '(Recommend checking other E-7 subtypes: E-7-1 Professional, E-7-2 Semi-professional)';
      return result;
    }

    // ====================================================================
    // STEP 2: 연봉 기준 확인 / Check salary threshold
    // E-7-4: 2025년 법무부 고정금액 26,000,000원
    // E-7-4: 2025 MOJ fixed amount 26,000,000 KRW
    // ====================================================================
    const e74MinSalary = getCurrentE7MinSalary('E-7-4');

    if (input.salaryMin < e74MinSalary) {
      result.status = 'blocked';
      result.blockReasons.push(
        `E-7-4 비자는 최소 연봉 ${e74MinSalary.toLocaleString()}원 이상이 필요합니다. ` +
          `제시 연봉: ${input.salaryMin.toLocaleString()}원 ` +
          `(E-7-4 visa requires minimum salary of ${e74MinSalary.toLocaleString()} KRW. ` +
          `Offered salary: ${input.salaryMin.toLocaleString()} KRW)`,
      );
      result.notes =
        `법무부공고 제2025-106호 기준 (2025.4.1 ~ 2025.12.31) — ` +
        `E-7-4 최소 연봉: ${e74MinSalary.toLocaleString()}원 ` +
        `(MOJ Notice 2025-106 (2025.4.1 ~ 2025.12.31) — ` +
        `E-7-4 minimum: ${e74MinSalary.toLocaleString()} KRW)`;
      return result;
    }

    // ====================================================================
    // STEP 3: 조건부 적합 / Conditional eligible
    // ====================================================================
    result.status = 'conditional';

    result.conditions.push(
      '최근 10년간 4년 이상 합법 체류 필요 (E-9/H-2 체류 포함) ' +
        '(4+ years legal stay within last 10 years required, including E-9/H-2)',
    );

    result.conditions.push(
      '점수제 평가 200점 이상 필요 (학력, 경력, 한국어, 기술자격 등) ' +
        '(200+ points required in points-based evaluation: education, experience, Korean, technical qualifications)',
    );

    result.requiredPermit = null; // 비자 자체가 취업허가 / Visa itself is work permit

    result.notes =
      `E-7-4 숙련기능인력 비자 — E-9/H-2 단순노무 업종에서 전환. ` +
      `최소 연봉: ${e74MinSalary.toLocaleString()}원 충족 ` +
      `(E-7-4 Skilled Worker visa — Transition from E-9/H-2 simple labor. ` +
      `Minimum salary ${e74MinSalary.toLocaleString()} KRW met)`;

    result.estimatedDays = 30; // 전환 신청: ~30일 / Transition application: ~30 days
    result.requiredDocuments = [
      '외국인등록증 사본 (Copy of Alien Registration Card)',
      '현재 E-9/H-2 비자 사본 (Current E-9/H-2 visa copy)',
      '체류 증명서 (최근 10년간 4년 이상 합법 체류 증빙) ' +
        '(Proof of stay: 4+ years legal stay within last 10 years)',
      '점수제 평가표 (Points evaluation form)',
      '학력증명서 (Education certificate)',
      '경력증명서 (Work experience certificate)',
      'TOPIK 성적표 (TOPIK score certificate)',
      '기술자격증 (Technical qualification certificate - if applicable)',
      '근로계약서 (Labor contract)',
      '사업자등록증 (Business registration certificate)',
    ];

    return result;
  }

  /**
   * Applicant-side evaluation: 지원자의 체류 요건 + 점수 교차 검증
   * Applicant-side evaluation: Cross-validate applicant's stay requirement + points
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
    // 지원자 체류 요건 교차 검증 / Cross-validate applicant stay requirement
    // ====================================================================
    const legalStayYears = profile.legalStayYears ?? 0;

    if (legalStayYears < 4) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-7-4 비자 요건 미충족: 최근 10년간 4년 이상 합법 체류 필요. ' +
          `지원자 체류 기간: ${legalStayYears}년 ` +
          '(E-7-4 visa requirements not met: 4+ years legal stay within last 10 years required. ' +
          `Applicant stay: ${legalStayYears} years)`,
      );
      return result;
    }

    // ====================================================================
    // 점수제 교차 검증 / Cross-validate points-based evaluation
    // ====================================================================
    // e74Score는 별도 점수제 API로 계산 후 제공되므로, 제공되지 않으면 conditional
    // e74Score calculated by separate points API, if not provided → conditional
    const e74Score = (profile as any).e74Score;

    if (e74Score !== undefined && e74Score < 200) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-7-4 비자 요건 미충족: 점수제 평가 200점 이상 필요. ' +
          `지원자 점수: ${e74Score}점 ` +
          '(E-7-4 visa requirements not met: 200+ points required in points-based evaluation. ' +
          `Applicant score: ${e74Score} points)`,
      );
      result.notes =
        '점수제 평가 항목: 학력(최대 40점), 경력(최대 35점), 한국어(최대 40점), ' +
        '기술자격(최대 30점), 나이(최대 20점), 가족관계(최대 15점), 지역(최대 20점) ' +
        '(Points categories: Education (max 40), Experience (max 35), Korean (max 40), ' +
        'Technical qualifications (max 30), Age (max 20), Family (max 15), Region (max 20))';
      return result;
    }

    // ====================================================================
    // 체류 요건 충족 시 eligible (점수는 별도 확인)
    // If stay requirement met → eligible (points checked separately)
    // ====================================================================
    result.status = 'eligible';
    result.conditions = result.conditions.filter(
      (c) => !c.includes('최근 10년간') && !c.includes('점수제'),
    );
    result.conditions.push(
      `체류 요건 충족: 최근 10년간 ${legalStayYears}년 합법 체류 ` +
        `(Stay requirement met: ${legalStayYears} years legal stay within last 10 years)`,
    );
    if (e74Score !== undefined) {
      result.conditions.push(
        `점수제 평가 통과: ${e74Score}점 (200점 이상) ` +
          `(Points evaluation passed: ${e74Score} points (200+ required))`,
      );
    } else {
      result.conditions.push(
        '점수제 평가 필요 (200점 이상) ' +
          '(Points-based evaluation required (200+ points))',
      );
    }

    return result;
  }
}
