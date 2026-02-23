/**
 * E-7-S 특정활동(특정전문직종) 비자 정규직 평가기
 * E-7-S Specific Activities (Specialized Professional) Visa Fulltime Evaluator
 *
 * E-7-S 두 트랙 / Two tracks:
 *
 * [S1 — 고소득자 트랙 / S1 — High-income track]
 * - 연봉 ≥ GNI × 3.0 → 학력·경력·직종 요건 전부 면제
 *   Salary ≥ GNI × 3.0 → Education/experience/occupation requirements ALL EXEMPT
 * - 2025/26: 149,865,000원 (GNI 49,955,000 × 3.0)
 * - 법적 근거: 출입국관리법 시행령 별표 1의2 제20호
 *
 * [S2 — 첨단산업 트랙 / S2 — Advanced Industry track]
 * - 첨단산업발전법상 첨단기술·제품 분야 해당 직종 (isAdvancedIndustry=true)
 *   Occupation in Advanced Industry Development Act advanced technology/product sector
 * - 연봉 ≥ GNI × 1.0 (49,955,000원)
 *   Salary ≥ GNI × 1.0
 * - 점수제 60점 이상 (학력·경력·한국어·기술자격 등 합산)
 *   Points-based evaluation ≥ 60 points
 * - 법적 근거: 출입국관리법 시행령 별표 1의2 제20호 — E-7-S2 첨단산업 트랙
 *
 * [E-7-S 공통 특전 / E-7-S Common Benefits]
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
 * 출입국관리법 시행령 별표 1의2 제20호 — E-7-S1 고소득자 트랙 (GNI × 3.0)
 * 출입국관리법 시행령 별표 1의2 제20호 — E-7-S2 첨단산업 트랙 (GNI × 1.0 + 60점)
 * 법무부 공고 제2025-406호 — 2026년 E-7 체류자격 임금요건 기준
 */

import {
  FulltimeJobInput,
  ApplicantProfile,
  FulltimeVisaEvalResult,
  IFulltimeVisaEvaluator,
  createEmptyFulltimeResult,
} from './fulltime-evaluator.interface';
import { isE7Allowed, getE7Occupation } from '../data/e7-occupation-map';
import {
  getCurrentGni,
  meetsE7sSalaryThreshold,
  meetsE7s2SalaryThreshold,
} from '../data/gni-table';

export class E7SFulltimeEvaluator implements IFulltimeVisaEvaluator {
  readonly visaCode = 'E-7-S';
  readonly visaName = '특정활동(특정전문직종)';
  readonly visaNameEn = 'Specific Activities (Specialized Professional)';

  /**
   * Job-side evaluation: S1(GNI×3.0) / S2(첨단산업+GNI×1.0) 트랙 분기
   * Job-side evaluation: Branch into S1 (GNI×3.0) or S2 (Advanced Industry+GNI×1.0) track
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

    const gni = getCurrentGni();
    const occupation = getE7Occupation(input.occupationCode);

    // ====================================================================
    // STEP 2: S1 트랙 확인 (GNI × 3.0 이상 — 학력/직종/경력 요건 전부 면제)
    // STEP 2: Check S1 track (≥ GNI × 3.0 — ALL education/occupation/experience exempt)
    // ====================================================================
    if (meetsE7sSalaryThreshold(input.salaryMin)) {
      // S1 고소득자 트랙: 연봉 조건만으로 즉시 eligible
      // S1 high-income track: salary alone qualifies → eligible
      result.status = 'eligible';

      result.requiredPermit = null; // 비자 자체가 취업허가 / Visa itself is work permit

      result.notes =
        `[E-7-S1 고소득자 트랙] ${occupation?.occupationName || '해당 직종'} 고급 인력 채용. ` +
        `연봉 ${input.salaryMin.toLocaleString()}원 ≥ GNI×3.0(${gni.e7sMinSalary.toLocaleString()}원) 충족 → ` +
        `학력·경력·직종 요건 전부 면제. ` +
        `[특전] 배우자 동반 취업 가능(F-1-11), 3년 후 F-5 영주권 신청 가능 ` +
        `([E-7-S1 High-income Track] Advanced talent for ${occupation?.occupationNameEn || 'this occupation'}. ` +
        `Salary ${input.salaryMin.toLocaleString()} KRW ≥ GNI×3.0(${gni.e7sMinSalary.toLocaleString()} KRW) → ` +
        `Education/experience/occupation requirements ALL EXEMPT. ` +
        `[Benefits] Spouse can work (F-1-11), F-5 permanent residence eligible after 3 years)`;

      if (hiringTrack === 'SPONSOR') {
        result.estimatedDays = 45; // 해외 인재: 비자 신청 ~45일 / Overseas: visa application ~45 days
        result.requiredDocuments = [
          '여권 사본 (Passport copy)',
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
          '이력서 (Resume)',
          '근로계약서 (Labor contract)',
          '직장변경 신고서 (Job change notification)',
        ];
      }

      return result;
    }

    // ====================================================================
    // STEP 3: S2 트랙 확인 (첨단산업 + GNI × 1.0 이상)
    // STEP 3: Check S2 track (Advanced Industry + ≥ GNI × 1.0)
    // ====================================================================

    // S2 트랙: 첨단산업발전법 해당 직종 여부 확인
    // S2 track: Check if occupation falls under Advanced Industry Development Act
    if (!input.isAdvancedIndustry) {
      result.status = 'blocked';
      result.blockReasons.push(
        `E-7-S 비자 요건 미충족: ` +
          `S1 트랙(연봉 ≥ GNI×3.0: ${gni.e7sMinSalary.toLocaleString()}원)이나 ` +
          `S2 트랙(첨단산업발전법 해당 직종 + 연봉 ≥ GNI×1.0: ${gni.gniPerCapita.toLocaleString()}원) 중 하나를 충족해야 합니다 ` +
          `(E-7-S visa requirements not met: Must satisfy either ` +
          `S1 track (salary ≥ GNI×3.0: ${gni.e7sMinSalary.toLocaleString()} KRW) or ` +
          `S2 track (Advanced Industry Act occupation + salary ≥ GNI×1.0: ${gni.gniPerCapita.toLocaleString()} KRW))`,
      );
      result.notes =
        `제시 연봉: ${input.salaryMin.toLocaleString()}원 (S1 기준 ${gni.e7sMinSalary.toLocaleString()}원 미달). ` +
        `S2 트랙은 첨단산업발전법상 첨단기술·제품 분야 직종에만 적용됩니다 ` +
        `(Offered salary: ${input.salaryMin.toLocaleString()} KRW (below S1 threshold ${gni.e7sMinSalary.toLocaleString()} KRW). ` +
        `S2 track applies only to advanced technology/product sector occupations under Advanced Industry Development Act)`;
      return result;
    }

    // S2 트랙: 연봉 GNI × 1.0 이상 확인
    // S2 track: Check salary ≥ GNI × 1.0
    if (!meetsE7s2SalaryThreshold(input.salaryMin)) {
      result.status = 'blocked';
      result.blockReasons.push(
        `E-7-S2 첨단산업 트랙: 최소 연봉 ${gni.gniPerCapita.toLocaleString()}원 (GNI × 1.0) 이상이 필요합니다. ` +
          `제시 연봉: ${input.salaryMin.toLocaleString()}원 ` +
          `(E-7-S2 Advanced Industry track: Minimum salary ${gni.gniPerCapita.toLocaleString()} KRW (GNI × 1.0) required. ` +
          `Offered salary: ${input.salaryMin.toLocaleString()} KRW)`,
      );
      result.notes =
        `${gni.year}년 기준 GNI: ${gni.gniPerCapita.toLocaleString()}원 (GNI × 1.0 = E-7-S2 최소 연봉) ` +
        `(${gni.year} GNI: ${gni.gniPerCapita.toLocaleString()} KRW (GNI × 1.0 = E-7-S2 minimum salary))`;
      return result;
    }

    // S2 트랙: 연봉 조건 충족 → 점수제 확인은 지원자 검증 시
    // S2 track: Salary met → points check deferred to applicant evaluation
    result.status = 'conditional';

    result.conditions.push(
      '점수제 평가 60점 이상 필요 (학력·경력·한국어·기술자격 등) ' +
        '(Points-based evaluation ≥ 60 points required: education, experience, Korean, qualifications, etc.)',
    );

    result.requiredPermit = null; // 비자 자체가 취업허가 / Visa itself is work permit

    result.notes =
      `[E-7-S2 첨단산업 트랙] ${occupation?.occupationName || '해당 직종'} — 첨단기술·제품 분야 인력 채용. ` +
      `연봉 ${input.salaryMin.toLocaleString()}원 ≥ GNI×1.0(${gni.gniPerCapita.toLocaleString()}원) 충족. ` +
      `점수제 60점 이상 충족 시 발급 가능 ` +
      `[특전] 배우자 동반 취업 가능(F-1-11), 3년 후 F-5 영주권 신청 가능 ` +
      `([E-7-S2 Advanced Industry Track] ${occupation?.occupationNameEn || 'This occupation'} — Advanced technology/product sector talent. ` +
      `Salary ${input.salaryMin.toLocaleString()} KRW ≥ GNI×1.0(${gni.gniPerCapita.toLocaleString()} KRW) met. ` +
      `Issuable if 60+ points achieved. ` +
      `[Benefits] Spouse can work (F-1-11), F-5 permanent residence eligible after 3 years)`;

    if (hiringTrack === 'SPONSOR') {
      result.estimatedDays = 45;
      result.requiredDocuments = [
        '여권 사본 (Passport copy)',
        '학력증명서 (Education certificate)',
        '경력증명서 (Work experience certificate)',
        '표준계약서 (Standard labor contract)',
        '채용사유서 (Hiring rationale statement)',
        '사업자등록증 (Business registration certificate)',
        '연봉 증빙서류 (Salary proof documents)',
        'E-7-S2 점수제 평가표 (E-7-S2 points evaluation form)',
        '첨단산업발전법 해당 분야 확인서 (Advanced Industry Act sector confirmation)',
      ];
    } else {
      result.estimatedDays = 14;
      result.requiredDocuments = [
        '외국인등록증 사본 (Copy of Alien Registration Card)',
        '현재 E-7 비자 사본 (Current E-7 visa copy)',
        '학력증명서 (Education certificate)',
        '이력서 및 경력증명서 (Resume and work experience certificate)',
        '근로계약서 (Labor contract)',
        '직장변경 신고서 (Job change notification)',
        'E-7-S2 점수제 평가표 (E-7-S2 points evaluation form)',
        '첨단산업발전법 해당 분야 확인서 (Advanced Industry Act sector confirmation)',
      ];
    }

    return result;
  }

  /**
   * Applicant-side evaluation: S1은 추가 검증 없음, S2는 점수제 60점 교차 검증
   * Applicant-side evaluation: S1 no additional checks, S2 cross-validate 60 points
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
    // S1 트랙 (eligible): 고소득자는 학력/경력 요건 면제 — 추가 검증 불필요
    // S1 track (eligible): High-income earner exempts education/experience — no further checks
    // ====================================================================
    if (result.status === 'eligible') {
      // S1 트랙: 요건 전부 면제 → 지원자 검증 없이 eligible 유지
      // S1 track: All requirements exempt → keep eligible without applicant checks
      return result;
    }

    // ====================================================================
    // S2 트랙 (conditional): 점수제 60점 교차 검증
    // S2 track (conditional): Cross-validate 60-point threshold
    // ====================================================================

    // e7s2Points는 별도 점수제 API로 계산 후 제공되므로, 제공되지 않으면 conditional 유지
    // e7s2Points calculated by separate points API; if not provided → keep conditional
    const e7s2Points = (profile as any).e7s2Points;

    if (e7s2Points !== undefined && e7s2Points < 60) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-7-S2 비자 요건 미충족: 점수제 평가 60점 이상 필요. ' +
          `지원자 점수: ${e7s2Points}점 ` +
          '(E-7-S2 visa requirements not met: 60+ points required in points-based evaluation. ' +
          `Applicant score: ${e7s2Points} points)`,
      );
      return result;
    }

    // 점수 60점 이상 충족 (또는 점수 미제공 → conditional 유지)
    // Points ≥ 60 met (or not provided → keep conditional)
    if (e7s2Points !== undefined && e7s2Points >= 60) {
      result.status = 'eligible';
      result.conditions = result.conditions.filter(
        (c) => !c.includes('점수제'),
      );
      result.conditions.push(
        `점수제 평가 통과: ${e7s2Points}점 (60점 이상) ` +
          `(Points evaluation passed: ${e7s2Points} points (60+ required))`,
      );
    }

    return result;
  }
}
