
/**
 * E-7-S 특정활동(특정전문직종) 비자 정규직 평가기
 * E-7-S Specific Activities (Specialized Professional) Visa Fulltime Evaluator
 *
 * E-7-S 핵심: 고급 전문인력 비자. 석사 이상 + GNI 200% 이상 연봉 필수.
 * E-7-S core: Advanced professional talent visa. Master's+ degree + salary ≥ GNI × 200% required.
 *
 * [E-7-S 요건 / E-7-S Requirements]
 * ① 허용 직종: E-7-1과 동일 (91개 전문직종)
 *    Allowed occupations: Same as E-7-1 (91 professional occupations)
 * ② 최소 연봉: 1인당 GNI × 200% 이상
 *    Minimum salary: ≥ GNI per capita × 200%
 *    - 2024년: 85,520,000원 (GNI 42,760,000 × 2.0)
 *    - 2025년: 88,000,000원 (GNI 44,000,000 × 2.0)
 * ③ 학력: 석사학위 이상 필수
 *    Education: Master's degree or higher required
 * ④ 한국어: TOPIK 요구 없음 (고급 인력)
 *    Korean: No TOPIK requirement (advanced talent)
 *
 * [E-7-S 특전 / E-7-S Benefits]
 * - 배우자 동반 취업 가능 (F-1-11 자격)
 *   Spouse can work (F-1-11 status)
 * - 영주권(F-5) 신청 시 우대 (3년 체류 후 신청 가능)
 *   Preferential treatment for F-5 permanent residence (can apply after 3 years)
 * - 복수비자 발급 (Multiple-entry visa)
 *
 * [채용 트랙 / Hiring Tracks]
 * - SPONSOR: 해외 인재 스폰서 채용 (기업이 비자 스폰서)
 *            Overseas talent sponsor hire (company sponsors visa)
 * - TRANSFER: E비자 보유자 이직 채용 (E→E 직장 변경)
 *             E visa holder transfer (E→E job change)
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제7조제7항 — E-7-S 연봉 기준 (GNI × 2.0)
 * 법무부 고시 — E-7-S 비자 발급 대상 특정전문직종
 */

import {
  FulltimeJobInput,
  ApplicantProfile,
  FulltimeVisaEvalResult,
  IFulltimeVisaEvaluator,
  createEmptyFulltimeResult,
} from './fulltime-evaluator.interface';
import { isE7Allowed, getE7Occupation } from '../data/e7-occupation-map';
import { getCurrentGni, meetsE7sSalaryThreshold } from '../data/gni-table';

export class E7SFulltimeEvaluator implements IFulltimeVisaEvaluator {
  readonly visaCode = 'E-7-S';
  readonly visaName = '특정활동(특정전문직종)';
  readonly visaNameEn = 'Specific Activities (Specialized Professional)';

  /**
   * Job-side evaluation: 직종 + 연봉 기준 확인 (GNI × 200%)
   * Job-side evaluation: Check occupation + salary threshold (GNI × 200%)
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
    // STEP 1: E-7 허용 직종 확인 (E-7-S는 E-7-1과 동일 직종 목록)
    // STEP 1: Check E-7 allowed occupation (E-7-S uses same list as E-7-1)
    // ====================================================================
    if (!isE7Allowed(input.occupationCode)) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-7-S 비자는 법무부 고시 전문직종에만 발급됩니다. ' +
          '해당 직종은 허용 목록에 없습니다 ' +
          '(E-7-S visa is only issued for MOJ-designated professional occupations. ' +
          'This occupation is not on the allowed list)',
      );
      return result;
    }

    // ====================================================================
    // STEP 2: 연봉 기준 확인 (GNI × 200%) / Check salary threshold (GNI × 200%)
    // ====================================================================
    const gni = getCurrentGni();
    const meetsSalary = meetsE7sSalaryThreshold(input.salaryMin);

    if (!meetsSalary) {
      result.status = 'blocked';
      result.blockReasons.push(
        `E-7-S 비자는 최소 연봉 ${gni.e7sMinSalary.toLocaleString()}원 (GNI × 200%) 이상이 필요합니다. ` +
          `제시 연봉: ${input.salaryMin.toLocaleString()}원 ` +
          `(E-7-S visa requires minimum salary of ${gni.e7sMinSalary.toLocaleString()} KRW (GNI × 200%). ` +
          `Offered salary: ${input.salaryMin.toLocaleString()} KRW)`,
      );
      result.notes =
        `${gni.year}년 기준 GNI: ${gni.gniPerCapita.toLocaleString()}원, ` +
        `E-7-S 최소 연봉: ${gni.e7sMinSalary.toLocaleString()}원 ` +
        `(${gni.year} GNI: ${gni.gniPerCapita.toLocaleString()} KRW, ` +
        `E-7-S minimum: ${gni.e7sMinSalary.toLocaleString()} KRW)`;
      return result;
    }

    // ====================================================================
    // STEP 3: 학력 조건 확인 (석사 이상 필수)
    // STEP 3: Check education requirement (Master's+ required)
    // ====================================================================
    const occupation = getE7Occupation(input.occupationCode);

    // 조건부 적합 — 석사 이상 학력은 지원자 검증 시 확인
    // Conditional eligible — Master's+ education checked during applicant validation
    result.status = 'conditional';

    result.conditions.push(
      '석사학위 이상 필수 (박사학위 우대) ' +
        "(Master's degree or higher required, Doctorate preferred)",
    );

    result.requiredPermit = null; // 비자 자체가 취업허가 / Visa itself is work permit

    result.notes =
      `E-7-S 특정전문직종 비자 — ${occupation?.occupationName || '해당 직종'} 고급 인력 채용. ` +
      `최소 연봉: ${gni.e7sMinSalary.toLocaleString()}원 충족. ` +
      `[특전] 배우자 동반 취업 가능(F-1-11), 3년 후 F-5 영주권 신청 가능 ` +
      `(E-7-S Specialized Professional visa — Advanced talent for ${occupation?.occupationNameEn || 'this occupation'}. ` +
      `Minimum salary ${gni.e7sMinSalary.toLocaleString()} KRW met. ` +
      `[Benefits] Spouse can work (F-1-11), F-5 permanent residence eligible after 3 years)`;

    // 해외 스폰서 채용 vs 이직 채용
    // Overseas sponsor hire vs transfer hire
    if (hiringTrack === 'SPONSOR') {
      result.estimatedDays = 45; // 해외 인재: 비자 신청 ~45일 / Overseas: visa application ~45 days
      result.requiredDocuments = [
        '여권 사본 (Passport copy)',
        "석사학위 증명서 (Master's degree certificate)",
        '경력증명서 (Work experience certificate)',
        '표준계약서 (Standard labor contract)',
        '채용사유서 (Hiring rationale statement)',
        '사업자등록증 (Business registration certificate)',
        '연봉 증빙서류 (Salary proof documents)',
      ];
    } else {
      result.estimatedDays = 14; // E비자 이직: 직장변경 신고 ~14일 / E visa transfer: job change notification ~14 days
      result.requiredDocuments = [
        '외국인등록증 사본 (Copy of Alien Registration Card)',
        '현재 E-7 비자 사본 (Current E-7 visa copy)',
        "석사학위 증명서 (Master's degree certificate)",
        '이력서 및 경력증명서 (Resume and work experience certificate)',
        '근로계약서 (Labor contract)',
        '직장변경 신고서 (Job change notification)',
      ];
    }

    return result;
  }

  /**
   * Applicant-side evaluation: 지원자의 석사 이상 학력 교차 검증
   * Applicant-side evaluation: Cross-validate applicant's Master's+ education
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
    // 지원자 석사 이상 학력 교차 검증 / Cross-validate applicant Master's+ education
    // ====================================================================

    // 석사 이상 학위 확인
    // Check Master's+ degree
    const hasMasters =
      profile.educationLevel === 'MASTER' ||
      profile.educationLevel === 'DOCTORATE';

    if (!hasMasters) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-7-S 비자는 석사학위 이상이 필수입니다. ' +
          `지원자 학력: ${profile.educationLevel || '학력 미제공'} ` +
          "(E-7-S visa requires Master's degree or higher. " +
          `Applicant education: ${profile.educationLevel || 'education not provided'})`,
      );
      return result;
    }

    // 박사학위 소지자 우대 표시
    // Show preference for doctorate holders
    if (profile.educationLevel === 'DOCTORATE') {
      result.conditions = result.conditions.filter(
        (c) => !c.includes('석사학위'),
      );
      result.conditions.push(
        '박사학위 소지 — 고급 인력 우대 조건 충족 ' +
          '(Doctorate degree — Advanced talent preference condition met)',
      );
    }

    // 모든 조건 충족 시 eligible
    // If all conditions met, set to eligible
    result.status = 'eligible';

    return result;
  }
}
