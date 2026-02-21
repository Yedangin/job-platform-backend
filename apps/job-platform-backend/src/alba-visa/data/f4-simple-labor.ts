/**
 * F-4 재외동포 비자 — 취업제한 목록 및 예외
 * F-4 Overseas Korean Visa — Employment Restriction List & Exceptions
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제23조의3 (재외동포 체류자격의 활동범위)
 * Immigration Control Act Enforcement Decree Article 23-3 (Activity scope of overseas Korean status)
 * 법무부 고시 — 재외동포(F-4) 체류자격 해당자의 취업활동 제한 업종
 * MOJ Notice — Employment activity restricted industries for F-4 visa holders
 *
 * [3가지 제한 사유 / Three Restriction Categories]
 * ① 단순노무 (직업분류 9번대) — BLOCKED, 8개 예외 직종 제외
 *    Simple labor (occupational classification 9xx) — BLOCKED, except 8 exception jobs
 * ② 선량한 풍속 위반 (유흥주점, 사행행위 등) — BLOCKED 항상
 *    Violation of public morals (entertainment bars, gambling, etc.) — ALWAYS BLOCKED
 * ③ 공공이익 제한 (피부관리사, 목욕관리사, 노래방·PC방 직원, 골프장 캐디, 노점상)
 *    Public interest restriction (skin care, bath house, karaoke/PC room staff, golf caddy, street vendor)
 *
 * [F-4-R 지역특화형 / F-4-R Regional Type]
 * 인구감소지역에서는 단순노무 제한 해제. 풍속 제한만 유지.
 * In depopulation areas, simple labor restriction lifted. Only public morals restriction remains.
 *
 * [2024년 예외 8개 직종 / 2024 Exception - 8 Allowed Jobs]
 * 법무부 「단순노무행위 취업제한 업종 일부 완화 고시」(2024)
 * MOJ Notice on Partial Relaxation of Simple Labor Employment Restrictions (2024)
 * 1. 건설 종사원(건설기능공 수준) / Construction worker (skilled level)
 * 2. 하역 종사원 / Stevedore/Loading worker
 * 3. 포장원 / Packer
 * 4. 건물 경비원 / Building security guard
 * 5. 주유원 / Gas station attendant
 * 6. 주차안내원 / Parking attendant
 * 7. 패스트푸드점 점원 / Fast food worker
 * 8. 음식점·레스토랑·호텔·학교 등의 조리 보조원 / Kitchen helper at restaurants, hotels, schools, etc.
 *
 * [2025년 변경사항 / 2025 Changes]
 * 건설업 단순노무직 허용 확대 + H-2→F-4 통합 추진 중
 * Expanding construction simple labor allowance + H-2→F-4 integration in progress
 *
 * [업데이트 방법 / How to update]
 * 법무부 고시 개정 시 이 파일의 금지 목록, 예외 직종, 풍속/공공이익 목록 업데이트.
 * Update prohibition, exception, morals, and public interest lists when MOJ notices are amended.
 */

// ============================================================================
// 제한 유형 열거 / Restriction Type Enum
// ============================================================================

/**
 * F-4 제한 유형 / F-4 Restriction Type
 * 어떤 사유로 제한되는지 구분 / Categorizes why the job is restricted
 */
export type F4RestrictionType =
  /** 단순노무 금지 (직업분류 9번대) / Simple labor prohibition */
  | 'SIMPLE_LABOR'
  /** 선량한 풍속 위반 (유흥, 사행행위 등) / Violation of public morals */
  | 'PUBLIC_MORALS'
  /** 공공이익 제한 (피부관리사, 목욕관리사, 노래방·PC방 직원 등) / Public interest restriction */
  | 'PUBLIC_INTEREST';

// ============================================================================
// ① 선량한 풍속 위반 직종 (항상 금지, F-4-R도 금지)
//    Public morals violation jobs (ALWAYS blocked, even F-4-R)
// ============================================================================

/**
 * 풍속 위반 금지 직종 코드 목록
 * Public morals violation blocked job category codes
 *
 * 유흥주점, 단란주점, 무도장, 사행행위업 등
 * Entertainment bars, singing bars, dance halls, gambling businesses, etc.
 *
 * 이 직종은 F-4-R(인구감소지역)이라도 불가
 * These jobs are blocked even in F-4-R (depopulation areas)
 */
export const F4_PUBLIC_MORALS_BLOCKED_CODES: ReadonlyArray<{
  /** 플랫폼 직종 코드 / Platform job category code */
  jobCategoryCode: string;
  /** 직종명 (한글) / Category name (Korean) */
  nameKo: string;
  /** 제한 유형 / Restriction type */
  restrictionType: F4RestrictionType;
  /** 사유 (한글) / Reason (Korean) */
  reasonKo: string;
  /** 사유 (영어) / Reason (English) */
  reasonEn: string;
}> = [
  {
    jobCategoryCode: 'ENTERTAINMENT',
    nameKo: '유흥업소',
    restrictionType: 'PUBLIC_MORALS',
    reasonKo: 'F-4 비자는 선량한 풍속 위반 업종(유흥주점 등) 취업이 금지됩니다',
    reasonEn:
      'F-4 visa prohibits employment in public morals violation industries (entertainment bars, etc.)',
  },
] as const;

// ============================================================================
// ③ 공공이익 제한 직종 (F-4-R도 금지)
//    Public interest restricted jobs (blocked even in F-4-R)
// ============================================================================

/**
 * 공공이익 제한 금지 직종 코드 목록
 * Public interest restricted blocked job category codes
 *
 * 피부관리사, 목욕관리사, 노래방·PC방 직원, 골프장 캐디, 노점상 등
 * Skin care workers, bath house workers, karaoke/PC room staff, golf caddies, street vendors, etc.
 *
 * 이 직종은 F-4-R(인구감소지역)이라도 불가
 * These jobs are blocked even in F-4-R (depopulation areas)
 *
 * [참고 / Note]
 * 현재 플랫폼 직종 코드에 해당 직종이 없으면 빈 배열.
 * 추후 직종 추가 시 이 목록에도 반영 필요.
 * If no matching platform job category codes exist, this array is empty.
 * Must update this list when new job categories are added.
 */
export const F4_PUBLIC_INTEREST_BLOCKED_CODES: ReadonlyArray<{
  /** 플랫폼 직종 코드 / Platform job category code */
  jobCategoryCode: string;
  /** 직종명 (한글) / Category name (Korean) */
  nameKo: string;
  /** 제한 유형 / Restriction type */
  restrictionType: F4RestrictionType;
  /** 사유 (한글) / Reason (Korean) */
  reasonKo: string;
  /** 사유 (영어) / Reason (English) */
  reasonEn: string;
}> = [
  // 현재 플랫폼 직종 코드 중 해당 직종 없음. 추후 피부관리사, 노래방 직원 등 추가 시 여기에 등록.
  // No matching platform job categories currently. Register here when skin care, karaoke staff, etc. are added.
] as const;

// ============================================================================
// ① 단순노무 금지 직종 (F-4-R 지역에서는 해제)
//    Simple labor prohibited jobs (lifted in F-4-R depopulation areas)
// ============================================================================

/**
 * F-4 단순노무 금지 직종 코드 목록
 * F-4 simple labor prohibited job category codes
 *
 * 직업분류 9번대(단순노무)에 해당하며, 8개 예외 직종에 포함되지 않는 직종
 * Occupational classification 9xx (simple labor), NOT included in 8 exception jobs
 *
 * F-4-R(인구감소지역)에서는 이 제한이 해제됨
 * This restriction is lifted in F-4-R (depopulation areas)
 */
export const F4_SIMPLE_LABOR_BLOCKED_CODES: ReadonlyArray<{
  /** 플랫폼 직종 코드 / Platform job category code */
  jobCategoryCode: string;
  /** 직종명 (한글) / Category name (Korean) */
  nameKo: string;
  /** 제한 유형 / Restriction type */
  restrictionType: F4RestrictionType;
  /** 사유 (한글) / Reason (Korean) */
  reasonKo: string;
  /** 사유 (영어) / Reason (English) */
  reasonEn: string;
}> = [
  {
    jobCategoryCode: 'MOVING_LABOR',
    nameKo: '이삿짐 운반',
    restrictionType: 'SIMPLE_LABOR',
    reasonKo: 'F-4 비자는 이삿짐 운반 단순노무 금지 (인구감소지역 제외)',
    reasonEn:
      'F-4 visa prohibits simple labor in moving/hauling (except depopulation areas)',
  },
  {
    jobCategoryCode: 'NEWSPAPER_DELIVERY',
    nameKo: '신문 배달',
    restrictionType: 'SIMPLE_LABOR',
    reasonKo: 'F-4 비자는 신문 배달 단순노무 금지 (인구감소지역 제외)',
    reasonEn:
      'F-4 visa prohibits simple labor in newspaper delivery (except depopulation areas)',
  },
  {
    jobCategoryCode: 'CLEANING',
    nameKo: '청소원',
    restrictionType: 'SIMPLE_LABOR',
    reasonKo: 'F-4 비자는 청소 단순노무 금지 (인구감소지역 제외)',
    reasonEn:
      'F-4 visa prohibits simple labor in cleaning (except depopulation areas)',
  },
  {
    jobCategoryCode: 'CAREGIVER',
    nameKo: '간병인',
    restrictionType: 'SIMPLE_LABOR',
    reasonKo: 'F-4 비자는 간병 단순노무 금지 (인구감소지역 제외)',
    reasonEn:
      'F-4 visa prohibits simple labor in caregiving (except depopulation areas)',
  },
  {
    jobCategoryCode: 'HOUSEKEEPER',
    nameKo: '가사도우미',
    restrictionType: 'SIMPLE_LABOR',
    reasonKo: 'F-4 비자는 가사 단순노무 금지 (인구감소지역 제외)',
    reasonEn:
      'F-4 visa prohibits simple labor in housekeeping (except depopulation areas)',
  },
  {
    jobCategoryCode: 'CONSTRUCTION_LABOR',
    nameKo: '건설 현장 보조',
    restrictionType: 'SIMPLE_LABOR',
    reasonKo:
      'F-4 비자는 건설 현장 단순노무 금지 (기능공 수준 예외, 인구감소지역 제외)',
    reasonEn:
      'F-4 visa prohibits construction simple labor (skilled level exception, except depopulation areas)',
  },
  {
    jobCategoryCode: 'AGRICULTURE',
    nameKo: '농업 보조',
    restrictionType: 'SIMPLE_LABOR',
    reasonKo: 'F-4 비자는 농업 단순노무 금지 (인구감소지역 제외)',
    reasonEn:
      'F-4 visa prohibits simple labor in agriculture (except depopulation areas)',
  },
  {
    jobCategoryCode: 'FISHING',
    nameKo: '어업 보조',
    restrictionType: 'SIMPLE_LABOR',
    reasonKo: 'F-4 비자는 어업 단순노무 금지 (인구감소지역 제외)',
    reasonEn:
      'F-4 visa prohibits simple labor in fishing (except depopulation areas)',
  },
  {
    jobCategoryCode: 'LOGISTICS_SORT',
    nameKo: '물류/택배 분류',
    restrictionType: 'SIMPLE_LABOR',
    reasonKo: 'F-4 비자는 물류 단순노무 금지 (인구감소지역 제외)',
    reasonEn:
      'F-4 visa prohibits simple labor in logistics (except depopulation areas)',
  },
  {
    jobCategoryCode: 'DELIVERY',
    nameKo: '배달',
    restrictionType: 'SIMPLE_LABOR',
    reasonKo: 'F-4 비자는 배달 단순노무 금지 (인구감소지역 제외)',
    reasonEn:
      'F-4 visa prohibits simple labor in delivery (except depopulation areas)',
  },
  {
    jobCategoryCode: 'FACTORY_SIMPLE',
    nameKo: '공장/제조 단순작업',
    restrictionType: 'SIMPLE_LABOR',
    reasonKo: 'F-4 비자는 제조업 단순노무 금지 (인구감소지역 제외)',
    reasonEn:
      'F-4 visa prohibits simple labor in manufacturing (except depopulation areas)',
  },
  {
    jobCategoryCode: 'FACTORY_PACKING',
    nameKo: '포장/검수',
    restrictionType: 'SIMPLE_LABOR',
    reasonKo: 'F-4 비자는 제조업 단순노무 금지 (인구감소지역 제외)',
    reasonEn:
      'F-4 visa prohibits simple labor in manufacturing (except depopulation areas)',
  },
  {
    jobCategoryCode: 'CONV_STORE',
    nameKo: '편의점',
    restrictionType: 'SIMPLE_LABOR',
    reasonKo: 'F-4 비자는 편의점 단순판매 금지 (인구감소지역 제외)',
    reasonEn:
      'F-4 visa prohibits simple sales at convenience stores (except depopulation areas)',
  },
  {
    jobCategoryCode: 'MART_SALES',
    nameKo: '마트/슈퍼 판매',
    restrictionType: 'SIMPLE_LABOR',
    reasonKo: 'F-4 비자는 마트 단순판매 금지 (인구감소지역 제외)',
    reasonEn:
      'F-4 visa prohibits simple sales at marts (except depopulation areas)',
  },
] as const;

// ============================================================================
// 2024년 예외 허용 8개 직종 (단순노무이지만 예외적으로 허용)
// 2024 Exception - 8 Allowed Jobs (simple labor but exceptionally permitted)
// ============================================================================

/**
 * F-4 예외 허용 직종 (단순노무이지만 예외적으로 허용)
 * F-4 exception allowed categories (simple labor but exceptionally permitted)
 *
 * [법적 근거 / Legal Basis]
 * 법무부 고시 (2024) — 인력 부족 직종 예외 허용
 * MOJ Notice (2024) — Exception for labor shortage categories
 *
 * [8개 예외 직종 / 8 Exception Jobs]
 * 1. 건설 종사원(건설기능공 수준) → CONSTRUCTION_SKILLED
 * 2. 하역 종사원 → WAREHOUSE (하역/물류 포함)
 * 3. 포장원 → WAREHOUSE (포장 업무 포함)
 * 4. 건물 경비원 → BUILDING_SECURITY
 * 5. 주유원 → GAS_STATION
 * 6. 주차안내원 → PARKING_MGMT
 * 7. 패스트푸드점 점원 → FAST_FOOD
 * 8. 음식점·레스토랑·호텔·학교 등의 조리 보조원 → REST_KITCHEN, REST_SERVING, HOTEL_SERVICE
 *
 * [참고 / Note]
 * REST_SERVING: 음식점 서빙은 조리보조원 범위에 포함 (음식점 업무 전반)
 * HOTEL_SERVICE: 호텔 조리보조원 예외에 해당
 * CONSTRUCTION_SKILLED: 건설기능공 수준은 단순노무가 아닌 기능직이지만, 예외 목록에 명시
 */
export const F4_EXCEPTION_ALLOWED_CODES: ReadonlyArray<{
  /** 플랫폼 직종 코드 / Platform job category code */
  jobCategoryCode: string;
  /** 직종명 (한글) / Category name (Korean) */
  nameKo: string;
  /** 매핑된 예외 직종 (한글) / Mapped exception job name (Korean) */
  exceptionNameKo: string;
  /** 매핑된 예외 직종 (영어) / Mapped exception job name (English) */
  exceptionNameEn: string;
  /** 예외 허용 사유 (한글) / Exception reason (Korean) */
  reasonKo: string;
  /** 예외 허용 사유 (영어) / Exception reason (English) */
  reasonEn: string;
}> = [
  // === 예외 8번: 음식점·레스토랑·호텔·학교 등의 조리 보조원 ===
  // === Exception #8: Kitchen helper at restaurants, hotels, schools, etc. ===
  {
    jobCategoryCode: 'REST_KITCHEN',
    nameKo: '주방보조/설거지',
    exceptionNameKo: '음식점 조리 보조원',
    exceptionNameEn: 'Restaurant kitchen helper',
    reasonKo:
      '2024년 법무부 예외 허용 — 음식점·레스토랑·호텔·학교 등의 조리 보조원',
    reasonEn:
      '2024 MOJ exception — Kitchen helper at restaurants, hotels, schools, etc.',
  },
  {
    jobCategoryCode: 'REST_SERVING',
    nameKo: '음식점 서빙',
    exceptionNameKo: '음식점 조리 보조원 (서빙 포함)',
    exceptionNameEn: 'Restaurant kitchen helper (including serving)',
    reasonKo:
      '2024년 법무부 예외 허용 — 음식점·레스토랑 업무 (조리보조원 범위)',
    reasonEn:
      '2024 MOJ exception — Restaurant work (within kitchen helper scope)',
  },
  {
    jobCategoryCode: 'HOTEL_SERVICE',
    nameKo: '호텔 객실/서비스',
    exceptionNameKo: '호텔 조리 보조원',
    exceptionNameEn: 'Hotel kitchen helper',
    reasonKo: '2024년 법무부 예외 허용 — 호텔 등의 조리 보조원',
    reasonEn: '2024 MOJ exception — Kitchen helper at hotels, etc.',
  },

  // === 예외 7번: 패스트푸드점 점원 ===
  // === Exception #7: Fast food worker ===
  {
    jobCategoryCode: 'FAST_FOOD',
    nameKo: '패스트푸드/분식',
    exceptionNameKo: '패스트푸드점 점원',
    exceptionNameEn: 'Fast food worker',
    reasonKo: '2024년 법무부 예외 허용 — 패스트푸드점 점원',
    reasonEn: '2024 MOJ exception — Fast food worker',
  },

  // === 예외 5번: 주유원 ===
  // === Exception #5: Gas station attendant ===
  {
    jobCategoryCode: 'GAS_STATION',
    nameKo: '주유원',
    exceptionNameKo: '주유원',
    exceptionNameEn: 'Gas station attendant',
    reasonKo: '2024년 법무부 예외 허용 — 주유원',
    reasonEn: '2024 MOJ exception — Gas station attendant',
  },

  // === 예외 6번: 주차안내원 ===
  // === Exception #6: Parking attendant ===
  {
    jobCategoryCode: 'PARKING_MGMT',
    nameKo: '주차장 관리',
    exceptionNameKo: '주차안내원',
    exceptionNameEn: 'Parking attendant',
    reasonKo: '2024년 법무부 예외 허용 — 주차안내원',
    reasonEn: '2024 MOJ exception — Parking attendant',
  },

  // === 예외 1번: 건설 종사원(건설기능공 수준) ===
  // === Exception #1: Construction worker (skilled level) ===
  {
    jobCategoryCode: 'CONSTRUCTION_SKILLED',
    nameKo: '건설 기능공',
    exceptionNameKo: '건설 종사원 (건설기능공 수준)',
    exceptionNameEn: 'Construction worker (skilled level)',
    reasonKo: '2024년 법무부 예외 허용 — 건설 종사원 (건설기능공 수준)',
    reasonEn: '2024 MOJ exception — Construction worker (skilled level)',
  },
] as const;

// ============================================================================
// 헬퍼 함수 / Helper Functions
// ============================================================================

/**
 * F-4 선량한 풍속 위반 직종인지 확인
 * Check if job category violates F-4 public morals restriction
 *
 * 이 제한은 F-4-R(인구감소지역)에서도 해제되지 않음
 * This restriction is NOT lifted even in F-4-R (depopulation areas)
 */
export function isF4PublicMoralsBlocked(jobCategoryCode: string): boolean {
  return F4_PUBLIC_MORALS_BLOCKED_CODES.some(
    (entry) => entry.jobCategoryCode === jobCategoryCode,
  );
}

/**
 * F-4 공공이익 제한 직종인지 확인
 * Check if job category is F-4 public interest restricted
 *
 * 이 제한은 F-4-R(인구감소지역)에서도 해제되지 않음
 * This restriction is NOT lifted even in F-4-R (depopulation areas)
 */
export function isF4PublicInterestBlocked(jobCategoryCode: string): boolean {
  return F4_PUBLIC_INTEREST_BLOCKED_CODES.some(
    (entry) => entry.jobCategoryCode === jobCategoryCode,
  );
}

/**
 * F-4 단순노무 금지 직종인지 확인
 * Check if job category is F-4 simple labor blocked
 *
 * 이 제한은 F-4-R(인구감소지역)에서는 해제됨
 * This restriction IS lifted in F-4-R (depopulation areas)
 */
export function isF4SimpleLaborBlocked(jobCategoryCode: string): boolean {
  return F4_SIMPLE_LABOR_BLOCKED_CODES.some(
    (entry) => entry.jobCategoryCode === jobCategoryCode,
  );
}

/**
 * @deprecated isF4SimpleLaberBlocked → isF4SimpleLaborBlocked (오타 수정 / typo fix)
 * 하위 호환성 유지 / Backward compatibility
 */
export const isF4SimpleLaberBlocked = isF4SimpleLaborBlocked;

/**
 * F-4 2024년 예외 직종인지 확인
 * Check if job category is F-4 2024 exception
 */
export function isF4ExceptionAllowed(jobCategoryCode: string): boolean {
  return F4_EXCEPTION_ALLOWED_CODES.some(
    (entry) => entry.jobCategoryCode === jobCategoryCode,
  );
}

/**
 * F-4 전체 금지 직종인지 확인 (풍속 + 공공이익 + 단순노무)
 * Check if job category is blocked by any F-4 restriction
 *
 * @param jobCategoryCode 직종 코드 / Job category code
 * @returns 제한 유형 또는 null / Restriction type or null
 */
export function getF4RestrictionType(
  jobCategoryCode: string,
): F4RestrictionType | null {
  // 풍속 위반 우선 확인 (가장 강력한 제한) / Check public morals first (strongest restriction)
  if (isF4PublicMoralsBlocked(jobCategoryCode)) {
    return 'PUBLIC_MORALS';
  }

  // 공공이익 제한 확인 / Check public interest restriction
  if (isF4PublicInterestBlocked(jobCategoryCode)) {
    return 'PUBLIC_INTEREST';
  }

  // 단순노무 금지 확인 / Check simple labor prohibition
  if (isF4SimpleLaborBlocked(jobCategoryCode)) {
    return 'SIMPLE_LABOR';
  }

  return null;
}
