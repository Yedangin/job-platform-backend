/**
 * F-4 재외동포비자 알바 평가기
 * F-4 Overseas Korean Visa Alba (Part-time) Evaluator
 *
 * F-4 핵심: 별도 허가 없이 자유 취업. 단, 3가지 제한 존재.
 * F-4 core: Free employment without separate permit. But 3 restrictions exist.
 *
 * [3가지 제한 / Three Restrictions]
 * ① 단순노무 (직업분류 9번대) — BLOCKED, 8개 예외 직종 제외
 *    Simple labor (occupational classification 9xx) — BLOCKED, except 8 exception jobs
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
 * 1. 풍속 위반 확인 (항상 금지, F-4-R도 금지) / Public morals check (always blocked)
 * 2. 공공이익 제한 확인 (항상 금지, F-4-R도 금지) / Public interest check (always blocked)
 * 3. 예외 8개 직종 확인 → conditional / 8 exception jobs check → conditional
 * 4. 단순노무 여부 판별 / Simple labor determination
 *    4-a. 단순노무 아님 → eligible / Not simple labor → eligible
 *    4-b. 인구감소지역(F-4-R) → eligible (단순노무 제한 해제)
 * 5. 단순노무, 예외 아님, 비인구감소지역 → blocked
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제23조의3
 * 법무부 고시 — F-4 취업활동 제한 업종
 * 법무부 고시 (2024) — 단순노무 제한 일부 완화 (8개 예외 직종)
 * 2025년: 건설업 단순노무 허용 확대 + H-2→F-4 통합 추진 중
 */

import {
  AlbaJobInput,
  AlbaVisaEvalResult,
  IAlbaVisaEvaluator,
  createEmptyAlbaResult,
} from './alba-evaluator.interface';
import {
  F4_SIMPLE_LABOR_BLOCKED_CODES,
  F4_EXCEPTION_ALLOWED_CODES,
  F4_PUBLIC_MORALS_BLOCKED_CODES,
  F4_PUBLIC_INTEREST_BLOCKED_CODES,
  isF4PublicMoralsBlocked,
  isF4PublicInterestBlocked,
  isF4SimpleLaborBlocked,
  isF4ExceptionAllowed,
} from '../data/f4-simple-labor';
import { getKsicMapping } from '../data/ksic-mapping';

export class F4AlbaEvaluator implements IAlbaVisaEvaluator {
  readonly visaCode = 'F-4';
  readonly visaName = '재외동포';
  readonly visaNameEn = 'Overseas Korean';

  evaluate(input: AlbaJobInput): AlbaVisaEvalResult {
    const result = createEmptyAlbaResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
    );

    // F-4는 별도 허가 불필요. 자유 취업.
    // F-4 does not require a separate permit. Free employment.
    result.requiredPermit = null;

    // 시간/사업장 제한 없음 / No hour/workplace limits
    result.maxWeeklyHours = null;
    result.maxWorkplaces = null;

    // ====================================================================
    // STEP 1: 풍속 위반 확인 (항상 금지, F-4-R도 금지)
    // STEP 1: Public morals check (ALWAYS blocked, even F-4-R)
    // ====================================================================
    if (isF4PublicMoralsBlocked(input.jobCategoryCode)) {
      const entry = F4_PUBLIC_MORALS_BLOCKED_CODES.find(
        (e) => e.jobCategoryCode === input.jobCategoryCode,
      );
      result.status = 'blocked';
      result.blockReasons.push(
        entry?.reasonKo ??
          'F-4 비자는 선량한 풍속 위반 업종 취업이 금지됩니다 ' +
            '(F-4 visa prohibits employment in public morals violation industries)',
      );
      result.notes =
        '선량한 풍속 위반 — 인구감소지역(F-4-R)에서도 불가 ' +
        '(Public morals violation — blocked even in F-4-R depopulation areas)';
      return result;
    }

    // KSIC 매핑 조회 (유흥업소 플래그 추가 확인)
    // KSIC mapping lookup (additional entertainment venue flag check)
    const mapping = getKsicMapping(input.jobCategoryCode);
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
    // STEP 2: 공공이익 제한 확인 (항상 금지, F-4-R도 금지)
    // STEP 2: Public interest check (ALWAYS blocked, even F-4-R)
    // ====================================================================
    if (isF4PublicInterestBlocked(input.jobCategoryCode)) {
      const entry = F4_PUBLIC_INTEREST_BLOCKED_CODES.find(
        (e) => e.jobCategoryCode === input.jobCategoryCode,
      );
      result.status = 'blocked';
      result.blockReasons.push(
        entry?.reasonKo ??
          'F-4 비자는 공공이익 제한 업종 취업이 금지됩니다 ' +
            '(F-4 visa prohibits employment in public interest restricted industries)',
      );
      result.notes =
        '공공이익 제한 — 인구감소지역(F-4-R)에서도 불가 ' +
        '(Public interest restriction — blocked even in F-4-R depopulation areas)';
      return result;
    }

    // ====================================================================
    // STEP 3: 예외 8개 직종 우선 확인 (일부 비단순노무이지만 예외 목록에 포함)
    // STEP 3: Check 8 exception jobs FIRST (some are non-simple-labor but in exception list)
    // ====================================================================
    // 예외 확인을 단순노무 판별보다 먼저 수행.
    // REST_SERVING, HOTEL_SERVICE, CONSTRUCTION_SKILLED 등은 KSIC에서 비단순노무이지만
    // 법무부 예외 8개 직종에 명시적으로 포함되어 있어 conditional로 처리해야 함.
    // Check exceptions before simple labor determination.
    // REST_SERVING, HOTEL_SERVICE, CONSTRUCTION_SKILLED etc. are non-simple-labor in KSIC
    // but explicitly listed in MOJ 8 exception jobs, so they must be conditional.
    if (isF4ExceptionAllowed(input.jobCategoryCode)) {
      const exceptionEntry = F4_EXCEPTION_ALLOWED_CODES.find(
        (e) => e.jobCategoryCode === input.jobCategoryCode,
      );
      result.status = 'conditional';
      result.conditions.push(
        exceptionEntry
          ? `${exceptionEntry.reasonKo} (${exceptionEntry.reasonEn})`
          : '2024년 법무부 예외 허용 직종 (2024 MOJ exception allowed category)',
      );
      result.notes = exceptionEntry
        ? `단순노무 예외 허용 — ${exceptionEntry.exceptionNameKo} ` +
          `(Simple labor exception — ${exceptionEntry.exceptionNameEn})`
        : '단순노무 예외 8개 직종에 해당 (Matches 8 simple labor exception jobs)';
      return result;
    }

    // ====================================================================
    // STEP 4: 단순노무 여부 판별 / Simple labor determination
    // ====================================================================
    const isSimpleLabor = mapping?.isSimpleLabor ?? false;
    const isDirectlyBlocked = isF4SimpleLaborBlocked(input.jobCategoryCode);

    // --- 4-a: 단순노무가 아닌 경우 → eligible ---
    // --- 4-a: Not simple labor → eligible ---
    if (!isSimpleLabor && !isDirectlyBlocked) {
      result.status = 'eligible';
      result.notes =
        '재외동포(F-4) 비자 — 전문직/비단순노무 자유취업, 별도 허가 불필요 ' +
        '(F-4 Overseas Korean — Professional/non-simple-labor free employment, no permit needed)';
      return result;
    }

    // --- 4-b: 인구감소지역(F-4-R) → eligible (단순노무 제한 해제) ---
    // --- 4-b: Depopulation area (F-4-R) → eligible (simple labor restriction lifted) ---
    if (input.workAddress.isDepopulationArea) {
      result.status = 'eligible';
      result.notes =
        '인구감소지역 F-4-R — 단순노무 포함 전 직종 자유취업 (풍속·공공이익 제한만 유지) ' +
        '(Depopulation area F-4-R — All occupations including simple labor allowed, only morals/public interest restrictions remain)';
      return result;
    }

    // ====================================================================
    // STEP 5: 단순노무이고 예외/인구감소지역 아님 → blocked
    // STEP 5: Simple labor, no exception, not depopulation area → blocked
    // ====================================================================
    const blockedEntry = F4_SIMPLE_LABOR_BLOCKED_CODES.find(
      (e) => e.jobCategoryCode === input.jobCategoryCode,
    );
    result.status = 'blocked';
    result.blockReasons.push(
      blockedEntry?.reasonKo ??
        'F-4 비자는 단순노무행위가 금지됩니다 (인구감소지역 제외) ' +
          '(F-4 visa prohibits simple labor, except depopulation areas)',
    );
    result.notes =
      '인구감소지역(F-4-R) 전환 시 취업 가능 ' +
      '(Employment possible if converted to F-4-R in depopulation area)';

    return result;
  }
}
