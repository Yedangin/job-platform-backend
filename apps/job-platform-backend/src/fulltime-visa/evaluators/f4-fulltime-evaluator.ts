/**
 * F-4 재외동포비자 정규직 평가기
 * F-4 Overseas Korean Visa Fulltime Evaluator
 *
 * F-4 핵심: 별도 허가 없이 자유 취업. 단, 3가지 제한 존재.
 * F-4 core: Free employment without separate permit. But 3 restrictions exist.
 *
 * ============================================================================
 * [H-2/F-4 통합 시행 (2026.2.12) / H-2/F-4 Integration (2026.2.12)]
 * 재외동포(F-4) 자격의 취업활동 제한범위 고시 (2026.2.2 시행)
 * Notice on Scope of Employment Restrictions for Overseas Korean (F-4) Status
 * (Effective 2026.2.2)
 *
 * 주요 변경사항 / Key Changes:
 * - 단순노무 제한 직종 39개 → 29개 (10개 해제)
 *   Simple labor restricted occupations 39 → 29 (10 lifted)
 * - 공공이익 제한직종 [붙임2] 8개 명시 (always blocked)
 *   Public interest restricted occupations [Appendix 2] 8 types specified
 * ============================================================================
 *
 * [3가지 제한 / Three Restrictions]
 * ① 선량한 풍속 위반 (유흥주점, 사행행위 등) — ALWAYS BLOCKED (인구감소지역 포함)
 *    Violation of public morals (entertainment bars, gambling) — ALWAYS BLOCKED (incl. depopulation areas)
 * ② 공공이익 제한직종 [붙임2] 8개 — ALWAYS BLOCKED (인구감소지역 포함)
 *    Public interest restricted occupations [Appendix 2] 8 types — ALWAYS BLOCKED (incl. depopulation areas)
 * ③ 단순노무 [붙임1] 29개 제한 (2026.2.12 H-2/F-4 통합 후)
 *    Simple labor [Appendix 1] 29 restricted (after 2026.2.12 H-2/F-4 integration)
 *
 * [F-4-R 지역특화형 / F-4-R Regional Type]
 * 인구감소지역에서는 ②공공이익 + ③단순노무 제한 해제. ①풍속 제한만 유지.
 * In depopulation areas, ②public interest + ③simple labor restrictions lifted. Only ①morals remains.
 *
 * [판별 순서 / Evaluation Order]
 * 1. 풍속 위반 확인 (항상 금지) / Public morals check (always blocked)
 * 2. 공공이익 제한직종 확인 (항상 금지) / Public interest restricted occupations check (always blocked)
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
 * 재외동포(F-4) 자격의 취업활동 제한범위 고시 (법무부 고시, 2026.2.2 시행)
 * H-2/F-4 통합 시행 (2026.2.12)
 */

import {
  FulltimeJobInput,
  ApplicantProfile,
  FulltimeVisaEvalResult,
  IFulltimeVisaEvaluator,
  createEmptyFulltimeResult,
} from './fulltime-evaluator.interface';
import { isSimpleLaborOccupation, getKsicMapping } from '../../common/data/visa';

// ============================================================================
// 공공이익 제한직종 [붙임2] 8개
// Public Interest Restricted Occupations [Appendix 2] — 8 types
//
// 재외동포(F-4) 자격의 취업활동 제한범위 고시 (2026.2.2 시행)
// Notice on Scope of Employment Restrictions for Overseas Korean (F-4) Status
//
// 이 직종들은 인구감소지역(F-4-R)에서도 항상 금지됩니다.
// These occupations are ALWAYS BLOCKED, even in depopulation areas (F-4-R).
// ============================================================================
export interface F4PublicInterestRestrictedEntry {
  /** 직종 한글명 / Occupation name (Korean) */
  nameKo: string;
  /** 직종 영문명 / Occupation name (English) */
  nameEn: string;
  /**
   * 한국표준직업분류(KSCO) 코드 (알려진 경우)
   * KSCO code (when known)
   * null인 경우 키워드 매칭 사용
   * When null, keyword matching is used
   */
  kscoCodes: string[] | null;
  /**
   * 플랫폼 직종 코드 매칭용 키워드 (KSIC mapping nameKo 비교)
   * Keywords for matching against platform job category codes (KSIC mapping nameKo comparison)
   */
  keywords: string[];
}

export const F4_PUBLIC_INTEREST_RESTRICTED: ReadonlyArray<F4PublicInterestRestrictedEntry> =
  [
    {
      nameKo: '피부관리사(피부미용사)',
      nameEn: 'Skin care specialist (aesthetician)',
      kscoCodes: ['4221'], // 피부미용 관련 종사자 / Skin care related worker
      keywords: ['피부관리', '피부미용'],
    },
    {
      nameKo: '발관리사',
      nameEn: 'Foot care specialist',
      kscoCodes: null, // TODO: 정확한 KSCO 코드 확인 필요 / Exact KSCO code TBD
      keywords: ['발관리', '발마사지', '풋케어'],
    },
    {
      nameKo: '목욕관리사',
      nameEn: 'Bath house attendant',
      kscoCodes: ['4222'], // 목욕 관련 종사자 / Bath related worker
      keywords: ['목욕관리', '목욕탕', '사우나'],
    },
    {
      nameKo: '예식장 직원',
      nameEn: 'Wedding hall staff',
      kscoCodes: null, // TODO: 정확한 KSCO 코드 확인 필요 / Exact KSCO code TBD
      keywords: ['예식장', '웨딩홀', '결혼식장'],
    },
    {
      nameKo: '노래방(노래연습장) 직원',
      nameEn: 'Karaoke room staff',
      kscoCodes: null, // TODO: 정확한 KSCO 코드 확인 필요 / Exact KSCO code TBD
      keywords: ['노래방', '노래연습장', '코인노래방'],
    },
    {
      nameKo: 'PC방/비디오방 직원',
      nameEn: 'PC room / video room staff',
      kscoCodes: null, // TODO: 정확한 KSCO 코드 확인 필요 / Exact KSCO code TBD
      keywords: ['PC방', '피시방', '비디오방', '인터넷카페'],
    },
    {
      nameKo: '골프장 캐디',
      nameEn: 'Golf course caddy',
      kscoCodes: ['4323'], // 골프장 캐디 / Golf caddy
      keywords: ['골프장', '캐디', '골프캐디'],
    },
    {
      nameKo: '주류 서비스 직원 (소믈리에 등)',
      nameEn: 'Alcohol service staff (sommelier etc.)',
      kscoCodes: null, // TODO: 정확한 KSCO 코드 확인 필요 / Exact KSCO code TBD
      keywords: ['소믈리에', '주류 서비스', '바텐더', '주류서비스'],
    },
  ];

/**
 * 공공이익 제한직종 해당 여부 확인
 * Check if occupation falls under public interest restricted occupations
 *
 * 판별 로직 / Matching Logic:
 * 1. KSCO 코드가 정의된 경우, 코드 앞자리 매칭으로 확인
 *    If KSCO codes are defined, check via code prefix matching
 * 2. 키워드 매칭: 직종명에 키워드 포함 여부 확인
 *    Keyword matching: check if occupation name contains keywords
 *
 * @param occupationCode 한국표준직업분류(KSCO) 코드 / KSCO code
 * @param occupationName 직종명 (선택, 키워드 매칭용) / Occupation name (optional, for keyword matching)
 * @returns 공공이익 제한직종 해당 여부 / Whether public interest restricted
 */
export function isF4PublicInterestRestricted(
  occupationCode: string,
  occupationName?: string,
): boolean {
  if (!occupationCode && !occupationName) {
    return false;
  }

  for (const entry of F4_PUBLIC_INTEREST_RESTRICTED) {
    // 1. KSCO 코드 매칭 / KSCO code matching
    if (entry.kscoCodes && occupationCode) {
      for (const kscoCode of entry.kscoCodes) {
        if (occupationCode.startsWith(kscoCode)) {
          return true;
        }
      }
    }

    // 2. 키워드 매칭 (직종명이 있는 경우) / Keyword matching (when occupation name is provided)
    if (occupationName) {
      for (const keyword of entry.keywords) {
        if (occupationName.includes(keyword)) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * 공공이익 제한직종 매칭 시 해당 항목 반환 (차단 사유 메시지용)
 * Return matching public interest restricted entry (for block reason messages)
 *
 * @param occupationCode KSCO 코드 / KSCO code
 * @param occupationName 직종명 (선택) / Occupation name (optional)
 * @returns 매칭된 제한직종 항목 또는 undefined / Matched restricted entry or undefined
 */
export function getMatchedPublicInterestRestriction(
  occupationCode: string,
  occupationName?: string,
): F4PublicInterestRestrictedEntry | undefined {
  if (!occupationCode && !occupationName) {
    return undefined;
  }

  for (const entry of F4_PUBLIC_INTEREST_RESTRICTED) {
    // 1. KSCO 코드 매칭 / KSCO code matching
    if (entry.kscoCodes && occupationCode) {
      for (const kscoCode of entry.kscoCodes) {
        if (occupationCode.startsWith(kscoCode)) {
          return entry;
        }
      }
    }

    // 2. 키워드 매칭 / Keyword matching
    if (occupationName) {
      for (const keyword of entry.keywords) {
        if (occupationName.includes(keyword)) {
          return entry;
        }
      }
    }
  }

  return undefined;
}

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

    // KSIC 매핑 조회 (STEP 1, 2에서 공통 사용)
    // Look up KSIC mapping (shared by STEP 1 and 2)
    const ksicEntry = getKsicMapping(input.occupationCode);
    const occupationName = ksicEntry?.nameKo;

    // ====================================================================
    // STEP 1: 풍속 위반 확인 (항상 금지)
    // STEP 1: Public morals check (always blocked)
    // ====================================================================
    if (ksicEntry?.isEntertainment) {
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
    // STEP 2: 공공이익 제한직종 [붙임2] 확인 (항상 금지, 8개 직종)
    // STEP 2: Public interest restricted occupations [Appendix 2] check
    //         (always blocked, 8 occupations)
    // 재외동포(F-4) 자격의 취업활동 제한범위 고시 (2026.2.2 시행)
    // ====================================================================
    if (isF4PublicInterestRestricted(input.occupationCode, occupationName)) {
      const matchedRestriction = getMatchedPublicInterestRestriction(
        input.occupationCode,
        occupationName,
      );
      const restrictionLabel = matchedRestriction
        ? `${matchedRestriction.nameKo} (${matchedRestriction.nameEn})`
        : '공공이익 제한직종 (public interest restricted occupation)';

      result.status = 'blocked';
      result.blockReasons.push(
        `F-4 비자는 공공이익 제한직종 취업이 금지됩니다: ${restrictionLabel} ` +
          '(F-4 visa prohibits employment in public interest restricted occupations ' +
          '[붙임2] per 2026.2.2 Notice)',
      );
      result.notes =
        '공공이익 제한직종 [붙임2] — 인구감소지역(F-4-R)에서도 불가 ' +
        '(Public interest restricted occupation [Appendix 2] — blocked even in F-4-R depopulation areas)';
      return result;
    }

    // ====================================================================
    // STEP 3: 단순노무 여부 판별 [붙임1] — 29개 제한 (2026.2.12 H-2/F-4 통합 후)
    // STEP 3: Simple labor determination [Appendix 1] — 29 restricted
    //         (after 2026.2.12 H-2/F-4 integration, reduced from 39)
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
   *
   * F-4-R (인구감소지역 지역특화형) 처리:
   * F-4-R (depopulation area regional type) handling:
   * - ① 풍속 위반: 유지 (ALWAYS BLOCKED) / Morals violation: remains blocked
   * - ② 공공이익 제한직종: 해제 / Public interest restriction: LIFTED
   * - ③ 단순노무: 해제 / Simple labor: LIFTED
   *
   * 근거: 재외동포(F-4) 자격의 취업활동 제한범위 고시 (2026.2.2 시행)
   * Basis: Notice on F-4 Employment Restriction Scope (Effective 2026.2.2)
   */
  evaluateApplicant(
    input: FulltimeJobInput,
    profile: ApplicantProfile,
  ): FulltimeVisaEvalResult {
    const result = this.evaluateJob(input);

    // F-4-R인 경우: ②공공이익 + ③단순노무 제한 해제, ①풍속만 유지
    // F-4-R case: ②public interest + ③simple labor lifted, only ①morals remains
    if (profile.currentVisaSubtype === 'F-4-R') {
      if (result.status === 'blocked') {
        // 풍속 위반(①)은 F-4-R에서도 해제 불가 — evaluateJob에서 이미 return됨
        // Morals violation(①) cannot be lifted for F-4-R — already returned from evaluateJob
        // 여기에 도달했다면 ②공공이익 또는 ③단순노무로 blocked된 경우임
        // If we reached here, it was blocked by ②public interest or ③simple labor

        const ksicEntry = getKsicMapping(input.occupationCode);
        const occupationName = ksicEntry?.nameKo;
        const isPublicInterest = isF4PublicInterestRestricted(
          input.occupationCode,
          occupationName,
        );
        const isSimpleLabor = isSimpleLaborOccupation(input.occupationCode);

        if (isPublicInterest || isSimpleLabor) {
          result.status = 'eligible';
          result.blockReasons = [];
          result.notes =
            'F-4-R 재외동포(지역특화) — 공공이익 제한직종 및 단순노무 포함 전 직종 취업 가능 (풍속 제한만 유지) ' +
            '(F-4-R Overseas Korean (Regional) — All occupations allowed including public interest restricted and simple labor, only morals restriction remains)';

          result.estimatedDays = 0; // 즉시 채용 가능 / Immediate hiring
          result.requiredDocuments = [
            '외국인등록증 사본 (Copy of Alien Registration Card)',
            '이력서 및 경력증명서 (Resume and work experience certificate)',
            '근로계약서 (Labor contract)',
            'F-4-R 체류자격 확인 (F-4-R residence status verification)',
          ];
        }
      }
    }

    return result;
  }
}
