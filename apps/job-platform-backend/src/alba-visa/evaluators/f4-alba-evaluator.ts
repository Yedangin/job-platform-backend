/**
 * F-4 재외동포비자 알바 평가기
 * F-4 Overseas Korean Visa Alba (Part-time) Evaluator
 *
 * @visaCode       F-4
 * @legalBasis     출입국관리법 시행령 제23조의3 / Immigration Control Act Enforcement Decree Art. 23-3
 *                 법무부 고시 — F-4 취업활동 제한 업종 / MOJ Notice — F-4 Employment Restricted Industries
 *                 법무부 고시 (2024) — 단순노무 제한 일부 완화 (8개 예외 직종) / MOJ Notice (2024) — Partial Simple Labor Relaxation (8 exceptions)
 * @conditionSummary
 *   - 별도 허가 없이 자유 취업 (Free employment without permit)
 *   - 풍속 위반 업종 항상 금지 (Public morals violations always blocked)
 *   - 공공이익 제한 업종 항상 금지 (Public interest restrictions always blocked)
 *   - 단순노무 금지 (8개 예외 제외) (Simple labor blocked, except 8 exceptions)
 *   - F-4-R 인구감소지역: 단순노무 제한 해제 (F-4-R depopulation area: simple labor allowed)
 * @lastVerified   2026-02-23
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
import { getKsicMapping } from '../../common/data/visa';

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
