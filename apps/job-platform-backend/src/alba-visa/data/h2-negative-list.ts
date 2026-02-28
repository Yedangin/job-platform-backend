/**
 * H-2 방문취업 비자 — 네거티브 리스트 (금지 업종 22개 중분류)
 * H-2 Visit & Employment Visa — Negative List (22 Prohibited Mid-Category Industries)
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제12조 별표1 (H-2 체류자격 활동범위)
 * Immigration Control Act Enforcement Decree Article 12, Schedule 1 (H-2 activity scope)
 * 외국인근로자의 고용 등에 관한 법률 제12조 (특례고용허가제)
 * Act on Employment of Foreign Workers Article 12 (Special Employment Permit System)
 * 법무부 고시 — 방문취업(H-2) 허용 업종 및 금지 업종 (2023.1.1 기준)
 * MOJ Notice — Permitted and Prohibited Industries for H-2 Visa (as of 2023.1.1)
 *
 * H-2 비자는 "네거티브 리스트" 방식:
 * 22개 중분류 금지 업종 외에는 모두 취업 가능.
 * 단, 기존 허용된 소분류(사업시설 유지관리, 건물·산업설비 청소업 등)는 계속 허용.
 * H-2 visa uses "negative list" approach:
 * Employment is allowed in all industries except 22 prohibited mid-categories.
 * However, previously allowed sub-categories (facility maintenance, building/industrial cleaning, etc.) remain allowed.
 *
 * [업데이트 방법 / How to update]
 * 법무부 고시 개정 시 이 파일의 금지 업종 목록 업데이트.
 * Update this list when MOJ notices are amended.
 */

// === H-2 네거티브 리스트 항목 인터페이스 / Negative list entry interface ===
export interface H2NegativeEntry {
  /** KSIC 중분류 코드 / KSIC mid-category code */
  ksicMidCode: string;
  /** KSIC 대분류 코드 (매핑용) / KSIC section code (for mapping) */
  ksicSectionCode: string;
  /** 중분류명 (한글) / Mid-category name (Korean) */
  nameKo: string;
  /** 중분류명 (영어) / Mid-category name (English) */
  nameEn: string;
  /** 금지 사유 (한글) / Prohibition reason (Korean) */
  reasonKo: string;
  /** 금지 사유 (영어) / Prohibition reason (English) */
  reasonEn: string;
  /** 예외 허용 소분류 존재 여부 / Whether exception sub-categories exist */
  hasExceptions: boolean;
}

// === 예외 허용 소분류 인터페이스 / Exception sub-category interface ===
export interface H2NegativeException {
  /** 예외가 속한 KSIC 중분류 코드 / Parent mid-category code */
  parentMidCode: string;
  /** 소분류 코드 / Sub-category code */
  ksicSubCode: string;
  /** 소분류명 (한글) / Sub-category name (Korean) */
  nameKo: string;
  /** 소분류명 (영어) / Sub-category name (English) */
  nameEn: string;
  /** 허용 사유 (한글) / Allowed reason (Korean) */
  reasonKo: string;
  /** 허용 사유 (영어) / Allowed reason (English) */
  reasonEn: string;
  /** 매핑되는 플랫폼 직종 코드 목록 / Mapped platform job category codes */
  mappedJobCategories: string[];
}

/**
 * H-2 금지 업종 22개 중분류 (2023.1.1 기준)
 * H-2 prohibited industries — 22 mid-categories (as of 2023.1.1)
 */
export const H2_NEGATIVE_LIST: ReadonlyArray<H2NegativeEntry> = [
  // === 광업 관련 / Mining ===
  {
    ksicMidCode: 'B05',
    ksicSectionCode: 'B',
    nameKo: '석탄·원유·천연가스 광업',
    nameEn: 'Coal, Crude Oil and Natural Gas Mining',
    reasonKo:
      'H-2 비자 네거티브 리스트 — 석탄·원유·천연가스 광업은 금지 업종입니다',
    reasonEn:
      'H-2 visa negative list — Coal, crude oil and natural gas mining is prohibited',
    hasExceptions: false,
  },

  // === 전기·가스·수도 관련 / Utilities ===
  {
    ksicMidCode: 'D35',
    ksicSectionCode: 'D',
    nameKo: '전기·가스 공급업',
    nameEn: 'Electricity and Gas Supply',
    reasonKo: 'H-2 비자 네거티브 리스트 — 전기·가스 공급업은 금지 업종입니다',
    reasonEn:
      'H-2 visa negative list — Electricity and gas supply is prohibited',
    hasExceptions: false,
  },
  {
    ksicMidCode: 'E36',
    ksicSectionCode: 'E',
    nameKo: '수도업',
    nameEn: 'Water Collection, Treatment and Supply',
    reasonKo: 'H-2 비자 네거티브 리스트 — 수도업은 금지 업종입니다',
    reasonEn: 'H-2 visa negative list — Water supply is prohibited',
    hasExceptions: false,
  },
  {
    ksicMidCode: 'E39',
    ksicSectionCode: 'E',
    nameKo: '환경 정화·복원업',
    nameEn: 'Environmental Remediation and Restoration',
    reasonKo: 'H-2 비자 네거티브 리스트 — 환경 정화·복원업은 금지 업종입니다',
    reasonEn:
      'H-2 visa negative list — Environmental remediation is prohibited',
    hasExceptions: false,
  },

  // === 자동차 판매 / Automotive Sales ===
  {
    ksicMidCode: 'G45',
    ksicSectionCode: 'G',
    nameKo: '자동차 및 부품 판매업',
    nameEn: 'Sale of Motor Vehicles and Parts',
    reasonKo:
      'H-2 비자 네거티브 리스트 — 자동차 및 부품 판매업은 금지 업종입니다',
    reasonEn:
      'H-2 visa negative list — Motor vehicle and parts sales is prohibited',
    hasExceptions: false,
  },

  // === 운수·물류 관련 / Transportation & Logistics ===
  {
    ksicMidCode: 'H49',
    ksicSectionCode: 'H',
    nameKo: '육상 운송업',
    nameEn: 'Land Transport',
    reasonKo: 'H-2 비자 네거티브 리스트 — 육상 운송업은 금지 업종입니다',
    reasonEn: 'H-2 visa negative list — Land transport is prohibited',
    hasExceptions: false,
  },
  {
    ksicMidCode: 'H50',
    ksicSectionCode: 'H',
    nameKo: '수상 운송업',
    nameEn: 'Water Transport',
    reasonKo: 'H-2 비자 네거티브 리스트 — 수상 운송업은 금지 업종입니다',
    reasonEn: 'H-2 visa negative list — Water transport is prohibited',
    hasExceptions: false,
  },
  {
    ksicMidCode: 'H51',
    ksicSectionCode: 'H',
    nameKo: '항공 운송업',
    nameEn: 'Air Transport',
    reasonKo: 'H-2 비자 네거티브 리스트 — 항공 운송업은 금지 업종입니다',
    reasonEn: 'H-2 visa negative list — Air transport is prohibited',
    hasExceptions: false,
  },
  {
    ksicMidCode: 'H52',
    ksicSectionCode: 'H',
    nameKo: '창고 및 운송관련 서비스업',
    nameEn: 'Warehousing and Transport Support',
    reasonKo:
      'H-2 비자 네거티브 리스트 — 창고 및 운송관련 서비스업은 금지 업종입니다',
    reasonEn:
      'H-2 visa negative list — Warehousing and transport support is prohibited',
    hasExceptions: false,
  },

  // === 정보통신 관련 / Information & Communication ===
  {
    ksicMidCode: 'J58',
    ksicSectionCode: 'J',
    nameKo: '출판업',
    nameEn: 'Publishing Activities',
    reasonKo: 'H-2 비자 네거티브 리스트 — 출판업은 금지 업종입니다',
    reasonEn: 'H-2 visa negative list — Publishing is prohibited',
    hasExceptions: false,
  },
  {
    ksicMidCode: 'J61',
    ksicSectionCode: 'J',
    nameKo: '우편 및 통신업',
    nameEn: 'Postal and Telecommunications',
    reasonKo: 'H-2 비자 네거티브 리스트 — 우편 및 통신업은 금지 업종입니다',
    reasonEn:
      'H-2 visa negative list — Postal and telecommunications is prohibited',
    hasExceptions: false,
  },
  {
    ksicMidCode: 'J62',
    ksicSectionCode: 'J',
    nameKo: '컴퓨터 프로그래밍·시스템 관리업',
    nameEn: 'Computer Programming and System Management',
    reasonKo:
      'H-2 비자 네거티브 리스트 — 컴퓨터 프로그래밍·시스템 관리업은 금지 업종입니다',
    reasonEn:
      'H-2 visa negative list — Computer programming and system management is prohibited',
    hasExceptions: false,
  },
  {
    ksicMidCode: 'J63',
    ksicSectionCode: 'J',
    nameKo: '정보서비스업',
    nameEn: 'Information Service Activities',
    reasonKo: 'H-2 비자 네거티브 리스트 — 정보서비스업은 금지 업종입니다',
    reasonEn: 'H-2 visa negative list — Information services is prohibited',
    hasExceptions: false,
  },

  // === 금융·보험 관련 / Finance & Insurance ===
  {
    ksicMidCode: 'K64',
    ksicSectionCode: 'K',
    nameKo: '금융업',
    nameEn: 'Financial Intermediation',
    reasonKo: 'H-2 비자 네거티브 리스트 — 금융업은 금지 업종입니다',
    reasonEn: 'H-2 visa negative list — Financial intermediation is prohibited',
    hasExceptions: false,
  },
  {
    ksicMidCode: 'K65',
    ksicSectionCode: 'K',
    nameKo: '보험·연금업',
    nameEn: 'Insurance and Pension',
    reasonKo: 'H-2 비자 네거티브 리스트 — 보험·연금업은 금지 업종입니다',
    reasonEn: 'H-2 visa negative list — Insurance and pension is prohibited',
    hasExceptions: false,
  },
  {
    ksicMidCode: 'K66',
    ksicSectionCode: 'K',
    nameKo: '금융·보험 관련 서비스업',
    nameEn: 'Auxiliary Financial and Insurance Services',
    reasonKo:
      'H-2 비자 네거티브 리스트 — 금융·보험 관련 서비스업은 금지 업종입니다',
    reasonEn:
      'H-2 visa negative list — Auxiliary financial and insurance services is prohibited',
    hasExceptions: false,
  },

  // === 부동산 / Real Estate ===
  {
    ksicMidCode: 'L68',
    ksicSectionCode: 'L',
    nameKo: '부동산업',
    nameEn: 'Real Estate Activities',
    reasonKo: 'H-2 비자 네거티브 리스트 — 부동산업은 금지 업종입니다',
    reasonEn: 'H-2 visa negative list — Real estate is prohibited',
    hasExceptions: false,
  },

  // === 전문·과학·기술 서비스 / Professional Services ===
  {
    ksicMidCode: 'M70',
    ksicSectionCode: 'M',
    nameKo: '연구개발업',
    nameEn: 'Research and Development',
    reasonKo: 'H-2 비자 네거티브 리스트 — 연구개발업은 금지 업종입니다',
    reasonEn: 'H-2 visa negative list — Research and development is prohibited',
    hasExceptions: false,
  },
  {
    ksicMidCode: 'M71',
    ksicSectionCode: 'M',
    nameKo: '전문 서비스업',
    nameEn: 'Professional Services',
    reasonKo:
      'H-2 비자 네거티브 리스트 — 전문 서비스업은 금지 업종입니다 (번역/통역/법률/회계 등)',
    reasonEn:
      'H-2 visa negative list — Professional services is prohibited (translation/legal/accounting etc.)',
    hasExceptions: false,
  },
  {
    ksicMidCode: 'M72',
    ksicSectionCode: 'M',
    nameKo: '건축기술·엔지니어링업',
    nameEn: 'Architecture and Engineering Services',
    reasonKo:
      'H-2 비자 네거티브 리스트 — 건축기술·엔지니어링업은 금지 업종입니다',
    reasonEn:
      'H-2 visa negative list — Architecture and engineering services is prohibited',
    hasExceptions: false,
  },

  // === 사업시설 관리 / Business Facilities Management ===
  {
    ksicMidCode: 'N74',
    ksicSectionCode: 'N',
    nameKo: '사업시설 관리·조경 서비스업',
    nameEn: 'Business Facilities Management and Landscaping',
    reasonKo:
      'H-2 비자 네거티브 리스트 — 사업시설 관리·조경 서비스업은 금지 업종입니다 (단, 청소업 등 일부 소분류 예외 허용)',
    reasonEn:
      'H-2 visa negative list — Business facilities management is prohibited (except cleaning and some sub-categories)',
    hasExceptions: true,
  },

  // === 고용 알선 / Employment Agencies ===
  {
    ksicMidCode: 'N75',
    ksicSectionCode: 'N',
    nameKo: '고용 알선·인력 공급업',
    nameEn: 'Employment Placement and Staffing',
    reasonKo:
      'H-2 비자 네거티브 리스트 — 고용 알선·인력 공급업은 금지 업종입니다',
    reasonEn:
      'H-2 visa negative list — Employment placement and staffing is prohibited',
    hasExceptions: false,
  },

  // === 교육 서비스 / Education ===
  {
    ksicMidCode: 'P85',
    ksicSectionCode: 'P',
    nameKo: '교육 서비스업',
    nameEn: 'Education Services',
    reasonKo: 'H-2 비자 네거티브 리스트 — 교육 서비스업은 금지 업종입니다',
    reasonEn: 'H-2 visa negative list — Education services is prohibited',
    hasExceptions: false,
  },
] as const;

/**
 * 예외 허용 소분류 목록 (네거티브 중분류에 속하지만 예외적으로 허용)
 * Exception sub-categories (belong to negative mid-categories but exceptionally allowed)
 *
 * 사업시설 관리·조경 서비스업(N74)은 중분류 전체가 네거티브이지만,
 * 아래 소분류는 기존 허용이 유지됨.
 * Business Facilities Management (N74) mid-category is entirely negative,
 * but the following sub-categories remain allowed as pre-existing exceptions.
 */
export const H2_NEGATIVE_EXCEPTIONS: ReadonlyArray<H2NegativeException> = [
  {
    parentMidCode: 'N74',
    ksicSubCode: 'N7421',
    nameKo: '사업시설 유지관리 서비스업',
    nameEn: 'Building and Industrial Facility Maintenance',
    reasonKo:
      '사업시설 유지관리 — 네거티브 중분류(N74)에 속하나 기존 허용 소분류로 계속 허용',
    reasonEn:
      'Facility maintenance — belongs to negative mid-category (N74) but allowed as pre-existing exception',
    mappedJobCategories: ['PARKING_MGMT'],
  },
  {
    parentMidCode: 'N74',
    ksicSubCode: 'N7422',
    nameKo: '건물·산업설비 청소업',
    nameEn: 'Building and Industrial Facility Cleaning',
    reasonKo:
      '건물·산업설비 청소업 — 네거티브 중분류(N74)에 속하나 기존 허용 소분류로 계속 허용',
    reasonEn:
      'Building/industrial cleaning — belongs to negative mid-category (N74) but allowed as pre-existing exception',
    mappedJobCategories: ['CLEANING'],
  },
] as const;

/**
 * 플랫폼 직종 코드 → H-2 네거티브 리스트 매핑 테이블
 * Platform job category → H-2 negative list mapping table
 *
 * 플랫폼의 직종 코드는 KSIC 대분류(section) 수준으로 매핑되어 있으므로,
 * 중분류 수준의 네거티브 리스트와 정확히 매핑하기 위한 보조 테이블.
 * Platform job codes are mapped at KSIC section level, so this auxiliary
 * table provides precise mapping to mid-category negative list.
 */
export interface H2JobCategoryMapping {
  /** 플랫폼 직종 코드 / Platform job category code */
  jobCategoryCode: string;
  /** H-2 네거티브 해당 여부 / Whether on H-2 negative list */
  isNegative: boolean;
  /** 예외 허용 여부 (네거티브이지만 소분류 예외) / Exception allowed (negative but sub-category exception) */
  isException: boolean;
  /** 사유 (한글) / Reason (Korean) */
  reasonKo: string;
  /** 사유 (영어) / Reason (English) */
  reasonEn: string;
}

/**
 * 직종 코드별 H-2 네거티브 판정 결과
 * Per-job-category H-2 negative determination
 *
 * 이 매핑은 자주 사용되는 직종 코드에 대해 미리 계산된 판정 결과를 제공.
 * 여기에 없는 직종은 KSIC 대분류 코드 기반으로 폴백 판정.
 * This mapping provides pre-computed results for commonly used job categories.
 * Categories not listed here fall back to KSIC section-level determination.
 */
export const H2_JOB_CATEGORY_MAP: ReadonlyArray<H2JobCategoryMapping> = [
  // === 허용 (음식점업 — 네거티브 리스트에 없음) / Allowed (Food service — not on negative list) ===
  {
    jobCategoryCode: 'REST_SERVING',
    isNegative: false,
    isException: false,
    reasonKo: '음식점업(I)은 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Food service (I) is not on the H-2 negative list',
  },
  {
    jobCategoryCode: 'REST_KITCHEN',
    isNegative: false,
    isException: false,
    reasonKo: '음식점업(I)은 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Food service (I) is not on the H-2 negative list',
  },
  {
    jobCategoryCode: 'CAFE_BARISTA',
    isNegative: false,
    isException: false,
    reasonKo: '음식점업(I)은 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Food service (I) is not on the H-2 negative list',
  },
  {
    jobCategoryCode: 'FAST_FOOD',
    isNegative: false,
    isException: false,
    reasonKo: '음식점업(I)은 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Food service (I) is not on the H-2 negative list',
  },
  {
    jobCategoryCode: 'HOTEL_SERVICE',
    isNegative: false,
    isException: false,
    reasonKo: '숙박업(I)은 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Accommodation (I) is not on the H-2 negative list',
  },

  // === 허용 (소매업 — 네거티브 리스트에 없음, 단 자동차 판매 제외) ===
  // === Allowed (Retail — not on negative list, except motor vehicle sales) ===
  {
    jobCategoryCode: 'CONV_STORE',
    isNegative: false,
    isException: false,
    reasonKo:
      '소매업(G47)은 H-2 네거티브 리스트에 해당하지 않음 (자동차판매 G45만 금지)',
    reasonEn:
      'Retail (G47) is not on the H-2 negative list (only motor vehicle sales G45 is prohibited)',
  },
  {
    jobCategoryCode: 'MART_SALES',
    isNegative: false,
    isException: false,
    reasonKo: '소매업(G47)은 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Retail (G47) is not on the H-2 negative list',
  },
  {
    jobCategoryCode: 'CLOTHING_SALES',
    isNegative: false,
    isException: false,
    reasonKo: '소매업(G47)은 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Retail (G47) is not on the H-2 negative list',
  },
  {
    jobCategoryCode: 'GAS_STATION',
    isNegative: false,
    isException: false,
    reasonKo: '소매업(G47)은 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Retail (G47) is not on the H-2 negative list',
  },

  // === 허용 (제조업 — 네거티브 리스트에 없음, 300인 미만) ===
  // === Allowed (Manufacturing — not on negative list, under 300 employees) ===
  {
    jobCategoryCode: 'FACTORY_SIMPLE',
    isNegative: false,
    isException: false,
    reasonKo:
      '제조업(C)은 H-2 네거티브 리스트에 해당하지 않음 (300인 미만 사업장, 특례고용허가 필요)',
    reasonEn:
      'Manufacturing (C) is not on the H-2 negative list (under 300 employees, special employment permit required)',
  },
  {
    jobCategoryCode: 'FACTORY_PACKING',
    isNegative: false,
    isException: false,
    reasonKo:
      '제조업(C)은 H-2 네거티브 리스트에 해당하지 않음 (300인 미만 사업장, 특례고용허가 필요)',
    reasonEn:
      'Manufacturing (C) is not on the H-2 negative list (under 300 employees, special employment permit required)',
  },

  // === 허용 (건설업 — 네거티브 리스트에 없음) ===
  // === Allowed (Construction — not on negative list) ===
  {
    jobCategoryCode: 'CONSTRUCTION_LABOR',
    isNegative: false,
    isException: false,
    reasonKo:
      '건설업(F)은 H-2 네거티브 리스트에 해당하지 않음 (특례고용허가 필요)',
    reasonEn:
      'Construction (F) is not on the H-2 negative list (special employment permit required)',
  },
  {
    jobCategoryCode: 'CONSTRUCTION_SKILLED',
    isNegative: false,
    isException: false,
    reasonKo:
      '건설업(F)은 H-2 네거티브 리스트에 해당하지 않음 (특례고용허가 필요)',
    reasonEn:
      'Construction (F) is not on the H-2 negative list (special employment permit required)',
  },

  // === 허용 (농림어업 — 네거티브 리스트에 없음) ===
  // === Allowed (Agriculture/Fishing — not on negative list) ===
  {
    jobCategoryCode: 'AGRICULTURE',
    isNegative: false,
    isException: false,
    reasonKo: '농림어업(A)은 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Agriculture (A) is not on the H-2 negative list',
  },
  {
    jobCategoryCode: 'FISHING',
    isNegative: false,
    isException: false,
    reasonKo: '농림어업(A)은 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Agriculture/Fishing (A) is not on the H-2 negative list',
  },

  // === 조건부 (청소업 — 사업시설 관리 중분류 네거티브이나 청소업 소분류 예외 허용) ===
  // === Conditional (Cleaning — Business facility mgmt mid-category is negative, but cleaning sub-category is exception) ===
  {
    jobCategoryCode: 'CLEANING',
    isNegative: true,
    isException: true,
    reasonKo:
      '사업시설 관리·조경(N74) 중분류는 네거티브이나, 건물·산업설비 청소업(N7422) 소분류는 예외 허용',
    reasonEn:
      'Business facilities management (N74) mid-category is negative, but building/industrial cleaning (N7422) is an exception',
  },

  // === 조건부 (사무보조 — N 대분류이나 단순 사무보조는 별도 판단) ===
  // === Conditional (Office assist — N section but simple office assist requires separate determination) ===
  {
    jobCategoryCode: 'OFFICE_ASSIST',
    isNegative: true,
    isException: false,
    reasonKo:
      '사업시설 관리(N) 대분류 — 사업시설 관리·조경(N74) 및 고용알선(N75) 중분류 금지. 단순 사무보조는 업무 내용에 따라 별도 판단 필요',
    reasonEn:
      'Business facilities (N) section — Facility management (N74) and employment placement (N75) are prohibited. Simple office assistance requires case-by-case determination',
  },

  // === 조건부 (주차장 관리 — N 대분류이나 사업시설 유지관리 소분류 예외) ===
  // === Conditional (Parking management — N section but facility maintenance sub-category is exception) ===
  {
    jobCategoryCode: 'PARKING_MGMT',
    isNegative: true,
    isException: true,
    reasonKo:
      '사업시설 관리·조경(N74) 중분류는 네거티브이나, 사업시설 유지관리(N7421) 소분류는 예외 허용',
    reasonEn:
      'Business facilities management (N74) mid-category is negative, but facility maintenance (N7421) is an exception',
  },

  // === 조건부 (배달 — 운송업 네거티브이나 소규모 음식 배달은 회색지대) ===
  // === Conditional (Delivery — Transport is negative, but small-scale food delivery is a gray area) ===
  {
    jobCategoryCode: 'DELIVERY',
    isNegative: true,
    isException: false,
    reasonKo:
      '육상 운송업(H49)은 H-2 네거티브 리스트에 해당. 소규모 음식 배달은 업무 성격에 따라 판단 필요',
    reasonEn:
      'Land transport (H49) is on the H-2 negative list. Small-scale food delivery requires case-by-case determination',
  },

  // === 조건부 (물류/택배 — 운송업 네거티브) ===
  // === Conditional (Logistics — Transport is negative) ===
  {
    jobCategoryCode: 'LOGISTICS_SORT',
    isNegative: true,
    isException: false,
    reasonKo: '창고 및 운송관련 서비스업(H52)은 H-2 네거티브 리스트에 해당',
    reasonEn:
      'Warehousing and transport support (H52) is on the H-2 negative list',
  },

  // === 조건부 (홍보/전단지 — N 대분류이나 고용알선이 아닌 경우 별도 판단) ===
  // === Conditional (Promotion — N section but not employment placement, requires judgment) ===
  {
    jobCategoryCode: 'PROMOTION',
    isNegative: true,
    isException: false,
    reasonKo:
      '사업시설 관리(N) 대분류 — 해당 중분류에 따라 금지 여부 다름. 전단지/홍보는 업무 내용에 따라 별도 판단 필요',
    reasonEn:
      'Business facilities (N) section — prohibition depends on mid-category. Flyer distribution/promotion requires case-by-case determination',
  },

  // === 금지 (IT — 정보통신업 네거티브) / Blocked (IT — Information & communication negative) ===
  {
    jobCategoryCode: 'IT_ASSIST',
    isNegative: true,
    isException: false,
    reasonKo:
      '컴퓨터 프로그래밍·시스템 관리업(J62) 및 정보서비스업(J63)은 H-2 네거티브 리스트에 해당',
    reasonEn:
      'Computer programming (J62) and information services (J63) are on the H-2 negative list',
  },

  // === 금지 (과외/학원 — 교육서비스업 네거티브) / Blocked (Tutoring — Education services negative) ===
  {
    jobCategoryCode: 'TUTORING',
    isNegative: true,
    isException: false,
    reasonKo: '교육 서비스업(P85)은 H-2 네거티브 리스트에 해당',
    reasonEn: 'Education services (P85) is on the H-2 negative list',
  },

  // === 금지 (번역/통역 — 전문서비스업 네거티브) / Blocked (Translation — Professional services negative) ===
  {
    jobCategoryCode: 'TRANSLATION',
    isNegative: true,
    isException: false,
    reasonKo: '전문 서비스업(M71)은 H-2 네거티브 리스트에 해당',
    reasonEn: 'Professional services (M71) is on the H-2 negative list',
  },

  // === 금지 (금융 — 금융업 네거티브) / Blocked (Finance — Financial negative) ===
  {
    jobCategoryCode: 'FINANCE',
    isNegative: true,
    isException: false,
    reasonKo: '금융업(K64)은 H-2 네거티브 리스트에 해당',
    reasonEn: 'Financial intermediation (K64) is on the H-2 negative list',
  },

  // === 금지 (부동산 — 부동산업 네거티브) / Blocked (Real estate — Real estate negative) ===
  {
    jobCategoryCode: 'REAL_ESTATE',
    isNegative: true,
    isException: false,
    reasonKo: '부동산업(L68)은 H-2 네거티브 리스트에 해당',
    reasonEn: 'Real estate (L68) is on the H-2 negative list',
  },

  // === 금지 (공공행정) / Blocked (Public admin — not on negative list but restricted by visa scope) ===
  {
    jobCategoryCode: 'PUBLIC_ADMIN',
    isNegative: true,
    isException: false,
    reasonKo: '공공 행정(O)은 H-2 비자 취업 범위에 해당하지 않음',
    reasonEn:
      'Public administration (O) is not within H-2 visa employment scope',
  },

  // === 금지 (유흥업소) / Blocked (Entertainment venues) ===
  {
    jobCategoryCode: 'ENTERTAINMENT',
    isNegative: true,
    isException: false,
    reasonKo: '유흥업소는 모든 비자에서 취업 금지',
    reasonEn: 'Entertainment venues are prohibited for all visa types',
  },

  // === 허용 (기타 서비스 — 네거티브 리스트에 없음) ===
  // === Allowed (Other services — not on negative list) ===
  {
    jobCategoryCode: 'CAREGIVER',
    isNegative: false,
    isException: false,
    reasonKo: '보건업 및 사회복지(Q)는 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Health and social work (Q) is not on the H-2 negative list',
  },
  {
    jobCategoryCode: 'HOUSEKEEPER',
    isNegative: false,
    isException: false,
    reasonKo: '기타 개인 서비스업(S)은 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Other personal services (S) is not on the H-2 negative list',
  },
  {
    jobCategoryCode: 'EVENT_STAFF',
    isNegative: false,
    isException: false,
    reasonKo: '예술·스포츠·여가(R)는 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Arts, sports and recreation (R) is not on the H-2 negative list',
  },
  {
    jobCategoryCode: 'NEWSPAPER_DELIVERY',
    isNegative: true,
    isException: false,
    reasonKo:
      '운수업(H)은 H-2 네거티브 리스트에 해당. 신문 배달은 육상 운송업(H49)에 해당',
    reasonEn:
      'Transport (H) is on the H-2 negative list. Newspaper delivery falls under land transport (H49)',
  },

  // === 금지 (전문직 인턴 — 전문서비스업 네거티브) / Blocked (Professional intern — Professional services negative) ===
  {
    jobCategoryCode: 'INTERN_PROFESSIONAL',
    isNegative: true,
    isException: false,
    reasonKo:
      '전문 서비스업(M71) 또는 연구개발업(M70)은 H-2 네거티브 리스트에 해당',
    reasonEn:
      'Professional services (M71) or R&D (M70) is on the H-2 negative list',
  },

  // === 이삿짐 운반 — 운수업 네거티브 / Moving labor — Transport negative ===
  {
    jobCategoryCode: 'MOVING_LABOR',
    isNegative: true,
    isException: false,
    reasonKo:
      '운수업(H)은 H-2 네거티브 리스트에 해당. 이삿짐 운반은 육상 운송업(H49)에 해당',
    reasonEn:
      'Transport (H) is on the H-2 negative list. Moving labor falls under land transport (H49)',
  },

  // === 건물 경비 — N80(보안 및 탐정업)으로 네거티브 아님 ===
  // === Building security — N80 (Security & Investigation) is NOT on negative list ===
  {
    jobCategoryCode: 'BUILDING_SECURITY',
    isNegative: false,
    isException: false,
    reasonKo:
      '건물 경비원은 보안 서비스업(N80)에 해당 — H-2 네거티브 중분류(N74·N75)에 해당하지 않음',
    reasonEn:
      'Building security falls under Security Services (N80) — not in the H-2 negative mid-categories (N74/N75)',
  },

  // === 피부관리사 — S(기타 개인 서비스)는 네거티브 아님 ===
  // === Skin care — S (Other personal services) is NOT on negative list ===
  {
    jobCategoryCode: 'SKIN_CARE',
    isNegative: false,
    isException: false,
    reasonKo: '기타 개인 서비스업(S)은 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Other personal services (S) is not on the H-2 negative list',
  },

  // === 목욕관리사 — S(기타 개인 서비스)는 네거티브 아님 ===
  // === Bath house — S (Other personal services) is NOT on negative list ===
  {
    jobCategoryCode: 'BATH_HOUSE',
    isNegative: false,
    isException: false,
    reasonKo: '기타 개인 서비스업(S)은 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Other personal services (S) is not on the H-2 negative list',
  },

  // === 노래방 직원 — R(여가 관련)은 네거티브 아님 ===
  // === Karaoke staff — R (Arts/Recreation) is NOT on negative list ===
  {
    jobCategoryCode: 'KARAOKE_STAFF',
    isNegative: false,
    isException: false,
    reasonKo: '예술·스포츠·여가(R)는 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Arts, sports and recreation (R) is not on the H-2 negative list',
  },

  // === PC방 직원 — R(여가 관련)은 네거티브 아님 ===
  // === Internet cafe — R (Arts/Recreation) is NOT on negative list ===
  {
    jobCategoryCode: 'PC_ROOM_STAFF',
    isNegative: false,
    isException: false,
    reasonKo: '예술·스포츠·여가(R)는 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Arts, sports and recreation (R) is not on the H-2 negative list',
  },

  // === 골프장 캐디 — R(여가 관련)은 네거티브 아님 ===
  // === Golf caddy — R (Arts/Recreation) is NOT on negative list ===
  {
    jobCategoryCode: 'GOLF_CADDY',
    isNegative: false,
    isException: false,
    reasonKo: '예술·스포츠·여가(R)는 H-2 네거티브 리스트에 해당하지 않음',
    reasonEn: 'Arts, sports and recreation (R) is not on the H-2 negative list',
  },

  // === 노점상 — G47(소매업)은 네거티브 아님 (G45 자동차만 금지) ===
  // === Street vendor — G47 (Retail) is NOT negative (only G45 motor vehicles) ===
  {
    jobCategoryCode: 'STREET_VENDOR',
    isNegative: false,
    isException: false,
    reasonKo:
      '소매업(G47)은 H-2 네거티브 리스트에 해당하지 않음 (자동차판매 G45만 금지)',
    reasonEn:
      'Retail (G47) is not on the H-2 negative list (only motor vehicle sales G45 is prohibited)',
  },
] as const;

// ============================================================
// 헬퍼 함수 / Helper Functions
// ============================================================

/**
 * KSIC 대분류 코드가 H-2 네거티브 리스트 중분류에 해당하는지 확인
 * Check if a KSIC section code has any mid-categories on the H-2 negative list
 *
 * @param ksicSectionCode KSIC 대분류 코드 (A~S) / KSIC section code (A~S)
 * @returns 해당 대분류에 네거티브 중분류가 하나라도 있으면 true
 */
export function isH2NegativeSection(ksicSectionCode: string): boolean {
  return H2_NEGATIVE_LIST.some(
    (entry) => entry.ksicSectionCode === ksicSectionCode,
  );
}

/**
 * KSIC 대분류 코드로 해당하는 네거티브 중분류 목록 조회
 * Get negative mid-categories for a given KSIC section code
 */
export function getH2NegativeEntriesBySection(
  ksicSectionCode: string,
): ReadonlyArray<H2NegativeEntry> {
  return H2_NEGATIVE_LIST.filter(
    (entry) => entry.ksicSectionCode === ksicSectionCode,
  );
}

/**
 * 직종 코드로 H-2 네거티브 판정 조회
 * Look up H-2 negative determination by job category code
 */
export function getH2JobCategoryMapping(
  jobCategoryCode: string,
): H2JobCategoryMapping | undefined {
  return H2_JOB_CATEGORY_MAP.find(
    (entry) => entry.jobCategoryCode === jobCategoryCode,
  );
}

/**
 * 직종 코드가 H-2 네거티브 리스트에 해당하는지 확인
 * Check if a job category code is on the H-2 negative list
 *
 * @param jobCategoryCode 플랫폼 직종 코드 / Platform job category code
 * @returns true면 네거티브 (금지), false면 허용 / true = negative (blocked), false = allowed
 */
export function isH2NegativeJobCategory(jobCategoryCode: string): boolean {
  const mapping = getH2JobCategoryMapping(jobCategoryCode);
  if (mapping) {
    return mapping.isNegative && !mapping.isException;
  }
  // 매핑 없으면 KSIC 대분류 기반 폴백 — 보수적 판단 불가, false 반환
  // No mapping → cannot determine at mid-category level, return false (allowed by default)
  return false;
}

/**
 * 직종 코드가 H-2 네거티브 예외 허용인지 확인
 * Check if a job category is a negative-list exception (negative mid-category but allowed sub-category)
 */
export function isH2NegativeException(jobCategoryCode: string): boolean {
  const mapping = getH2JobCategoryMapping(jobCategoryCode);
  return mapping?.isNegative === true && mapping?.isException === true;
}

/**
 * 직종 코드가 H-2 조건부(회색지대)인지 확인
 * Check if a job category is conditional (gray area) for H-2
 *
 * 네거티브 중분류에 속하지만, 예외도 아니고 완전 금지도 아닌 경우
 * Belongs to a negative mid-category, but neither an exception nor fully blocked
 */
export function isH2ConditionalJobCategory(jobCategoryCode: string): boolean {
  const mapping = getH2JobCategoryMapping(jobCategoryCode);
  if (!mapping) return false;

  // 네거티브인데 예외가 아니고, 업무 성격에 따라 판단이 필요한 직종
  // Negative but not exception, and requires case-by-case judgment
  const conditionalCodes = [
    'DELIVERY', // 배달 — 소규모 음식 배달은 회색지대 / Small food delivery is gray area
    'OFFICE_ASSIST', // 사무보조 — 단순 사무보조는 별도 판단 / Simple office assist requires judgment
    'PROMOTION', // 홍보 — 업무 내용에 따라 판단 / Depends on work content
  ];

  return conditionalCodes.includes(jobCategoryCode);
}

/**
 * H-2 네거티브 리스트 전체 대분류 코드 집합 (빠른 lookup 용)
 * Set of all KSIC section codes that have negative mid-categories (for fast lookup)
 */
export const H2_NEGATIVE_SECTION_CODES: ReadonlySet<string> = new Set(
  H2_NEGATIVE_LIST.map((entry) => entry.ksicSectionCode),
);

// ============================================================
// 하위 호환성을 위한 레거시 함수 (deprecated)
// Legacy functions for backward compatibility (deprecated)
// ============================================================

/**
 * @deprecated isH2NegativeJobCategory 사용 권장 / Use isH2NegativeJobCategory instead
 * 기존 KSIC 대분류 코드 기반 판별 (이전 버전 호환)
 * Legacy section-code-based check (backward compatible)
 */
export function isH2NegativeIndustry(ksicCode: string): boolean {
  // 기존에 대분류 코드로 판별하던 방식 — 중분류 기반으로 전환됨
  // Legacy section-level check — now replaced by mid-category-level check
  return H2_NEGATIVE_SECTION_CODES.has(ksicCode);
}

/**
 * @deprecated getH2NegativeEntriesBySection 사용 권장 / Use getH2NegativeEntriesBySection instead
 * 기존 KSIC 대분류 코드 기반 항목 조회 (이전 버전 호환)
 * Legacy section-code-based entry lookup (backward compatible)
 */
export function getH2NegativeEntry(
  ksicCode: string,
): H2NegativeEntry | undefined {
  return H2_NEGATIVE_LIST.find((entry) => entry.ksicSectionCode === ksicCode);
}
