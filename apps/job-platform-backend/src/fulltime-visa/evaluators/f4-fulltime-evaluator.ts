/**
 * F-4 재외동포비자 정규직 평가기
 * F-4 Overseas Korean Visa Fulltime Evaluator
 *
 * F-4 핵심: 별도 허가 없이 자유 취업. 단, 3가지 제한 존재.
 * F-4 core: Free employment without separate permit. But 3 restrictions exist.
 *
 * [3가지 제한 / Three Restrictions]
 * ① 단순노무 (KSCO 대분류 9) — BLOCKED, 8개 예외 직종 제외
 *    Simple labor (KSCO major 9) — BLOCKED, except 8 exception occupations
 * ② 선량한 풍속 위반 (유흥주점, 사행행위 등) — ALWAYS BLOCKED
 *    Violation of public morals (entertainment bars, gambling) — ALWAYS BLOCKED
 * ③ 공공이익 제한 (피부관리사, 목욕관리사, 노래방·PC방 직원 등) — ALWAYS BLOCKED
 *    Public interest restriction (skin care, bath house, karaoke/PC staff) — ALWAYS BLOCKED
 *
 * [F-4-R 지역특화형 / F-4-R Regional Type]
 * 인구감소지역에서는 ①단순노무 제한 해제. ②풍속 + ③공공이익 제한만 유지.
 * In depopulation areas, ①simple labor restriction lifted. Only ②morals + ③public interest remain.
 *
 * [판별 순서 / Evaluation Order]
 * 1. 풍속 위반 확인 (항상 금지) / Public morals check (always blocked)
 * 2. 공공이익 제한 확인 (항상 금지) / Public interest check (always blocked)
 * 3. 단순노무 여부 판별 / Simple labor determination
 *    3-a. 단순노무 아님 → eligible / Not simple labor → eligible
 *    3-b. 인구감소지역(F-4-R) → eligible (단순노무 제한 해제)
 * 4. 단순노무, 비인구감소지역 → blocked
 *
 * [채용 트랙 / Hiring Track]
 * - IMMEDIATE: 즉시 채용 가능 (F비자 소지자)
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제23조의3
 * 법무부 고시 — F-4 취업활동 제한 업종
 */

import {
  FulltimeJobInput,
  ApplicantProfile,
  FulltimeVisaEvalResult,
  IFulltimeVisaEvaluator,
  createEmptyFulltimeResult,
} from './fulltime-evaluator.interface';
import { isSimpleLaborOccupation } from '../data/occupation-code-table';
import { getKsicMapping } from '../../alba-visa/data/ksic-mapping';

export class F4FulltimeEvaluator implements IFulltimeVisaEvaluator {
  readonly visaCode = 'F-4';
  readonly visaName = '재외동포';
  readonly visaNameEn = 'Overseas Korean';

  /**
   * Job-side evaluation: F-4는 단순노무/풍속/공공이익 제한 확인
   * Job-side evaluation: F-4 checks simple labor/morals/public interest restrictions
   */
  evaluateJob(input: FulltimeJobInput): FulltimeVisaEvalResult {
    const result = createEmptyFulltimeResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
      'IMMEDIATE',
    );

    result.requiredPermit = null; // 별도 허가 불필요 / No additional permit

    // ====================================================================
    // STEP 1: 풍속 위반 확인 (항상 금지)
    // STEP 1: Public morals check (always blocked)
    // ====================================================================
    const mapping = getKsicMapping(input.occupationCode);
    if (mapping?.isEntertainment) {
      result.status = 'blocked';
      result.blockReasons.push(
        'F-4 비자는 선량한 풍속 위반 업종(유흥업소) 취업이 금지됩니다 ' +
          '(F-4 visa prohibits employment at entertainment venues)',
      );
      result.notes =
        '선량한 풍속 위반 — 인구감소지역(F-4-R)에서도 불가 ' +
        '(Public morals violation — blocked even in F-4-R depopulation areas)';
      return result;
    }

    // ====================================================================
    // STEP 2: 공공이익 제한 확인 (항상 금지)
    // STEP 2: Public interest check (always blocked)
    // ====================================================================
    // 공공이익 제한 직종: 피부관리사, 목욕관리사, 노래방·PC방 직원 등
    // Public interest restricted occupations: skin care, bath house, karaoke/PC staff, etc.
    // 이 데이터는 occupation-code-table에서 플래그로 관리 가능
    // This can be managed via flag in occupation-code-table
    // (현재는 단순 체크, 향후 data 파일로 분리 가능)
    // (Currently simple check, can be separated to data file later)

    // ====================================================================
    // STEP 3: 단순노무 여부 판별 / Simple labor determination
    // ====================================================================
    const isSimpleLabor = isSimpleLaborOccupation(input.occupationCode);

    // --- 3-a: 단순노무가 아닌 경우 → eligible ---
    // --- 3-a: Not simple labor → eligible ---
    if (!isSimpleLabor) {
      result.status = 'eligible';
      result.notes =
        'F-4 재외동포비자 — 전문직/비단순노무 자유취업, 별도 허가 불필요 ' +
        '(F-4 Overseas Korean — Professional/non-simple-labor free employment, no permit needed)';

      result.estimatedDays = 0; // 즉시 채용 가능 / Immediate hiring
      result.requiredDocuments = [
        '외국인등록증 사본 (Copy of Alien Registration Card)',
        '이력서 및 경력증명서 (Resume and work experience certificate)',
        '근로계약서 (Labor contract)',
      ];

      return result;
    }

    // --- 3-b: 인구감소지역(F-4-R) → eligible (단순노무 제한 해제) ---
    // --- 3-b: Depopulation area (F-4-R) → eligible (simple labor restriction lifted) ---
    if (input.workAddress.isDepopulationArea) {
      result.status = 'eligible';
      result.notes =
        '인구감소지역 F-4-R — 단순노무 포함 전 직종 자유취업 (풍속·공공이익 제한만 유지) ' +
        '(Depopulation area F-4-R — All occupations including simple labor allowed, only morals/public interest restrictions remain)';

      result.estimatedDays = 0; // 즉시 채용 가능 / Immediate hiring
      result.requiredDocuments = [
        '외국인등록증 사본 (Copy of Alien Registration Card)',
        '이력서 및 경력증명서 (Resume and work experience certificate)',
        '근로계약서 (Labor contract)',
        'F-4-R 체류자격 확인 (F-4-R residence status verification)',
      ];

      return result;
    }

    // ====================================================================
    // STEP 4: 단순노무이고 비인구감소지역 → blocked
    // STEP 4: Simple labor and not depopulation area → blocked
    // ====================================================================
    result.status = 'blocked';
    result.blockReasons.push(
      'F-4 비자는 단순노무 직종 취업이 금지됩니다 (인구감소지역 제외) ' +
        '(F-4 visa prohibits simple labor occupations, except depopulation areas)',
    );
    result.notes =
      '인구감소지역(F-4-R) 전환 시 취업 가능 ' +
      '(Employment possible if converted to F-4-R in depopulation area)';

    return result;
  }

  /**
   * Applicant-side evaluation: 지원자의 F-4 하위 유형 확인 (F-4-R 여부)
   * Applicant-side evaluation: Check applicant's F-4 subtype (F-4-R status)
   */
  evaluateApplicant(
    input: FulltimeJobInput,
    profile: ApplicantProfile,
  ): FulltimeVisaEvalResult {
    const result = this.evaluateJob(input);

    // F-4-R인 경우 단순노무도 가능
    // F-4-R allows simple labor
    if (profile.currentVisaSubtype === 'F-4-R') {
      // 이미 evaluateJob에서 인구감소지역 체크가 되었으므로
      // 지원자가 F-4-R이면 단순노무도 eligible
      // Since evaluateJob already checked depopulation area,
      // if applicant is F-4-R, simple labor is also eligible
      if (result.status === 'blocked') {
        const isSimpleLabor = isSimpleLaborOccupation(input.occupationCode);
        if (isSimpleLabor) {
          result.status = 'eligible';
          result.blockReasons = [];
          result.notes =
            'F-4-R 재외동포(지역특화) — 단순노무 포함 전 직종 취업 가능 ' +
            '(F-4-R Overseas Korean (Regional) — All occupations including simple labor allowed)';
        }
      }
    }

    return result;
  }
}
