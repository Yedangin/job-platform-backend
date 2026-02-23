/**
 * 플랫폼 직종 코드 → KSIC 대분류 매핑 테이블
 * Platform job category code → KSIC section mapping table
 *
 * [법적 근거 / Legal Basis]
 * 한국표준산업분류(KSIC) 제11차 개정 (통계청 고시 제2024-001호)
 * Korean Standard Industrial Classification (KSIC) 11th revision
 *
 * [참고 / Note]
 * 이 매핑 테이블은 법령 개정 시 업데이트 가능하도록 별도 파일로 관리.
 * This mapping table is managed as a separate file for updates when laws are amended.
 * DB 기반 관리로 전환 가능 (JobCategoryKsicMapping 테이블).
 * Can be migrated to DB-driven management (JobCategoryKsicMapping table).
 *
 * KSIC 대분류 코드 / KSIC Section Codes:
 * A: 농업, 임업 및 어업 / Agriculture, forestry and fishing
 * B: 광업 / Mining and quarrying
 * C: 제조업 / Manufacturing
 * D: 전기, 가스, 증기 및 공기 조절 공급업 / Electricity, gas, steam
 * E: 수도, 하수 및 폐기물 처리 / Water supply, sewerage, waste
 * F: 건설업 / Construction
 * G: 도매 및 소매업 / Wholesale and retail trade
 * H: 운수 및 창고업 / Transportation and storage
 * I: 숙박 및 음식점업 / Accommodation and food service
 * J: 정보통신업 / Information and communication
 * K: 금융 및 보험업 / Financial and insurance
 * L: 부동산업 / Real estate
 * M: 전문, 과학 및 기술 서비스업 / Professional, scientific, technical
 * N: 사업시설 관리, 사업지원 및 임대 서비스업 / Business facilities management
 * O: 공공 행정, 국방 및 사회보장 행정 / Public administration
 * P: 교육 서비스업 / Education
 * Q: 보건업 및 사회복지 서비스업 / Health and social work
 * R: 예술, 스포츠 및 여가 관련 서비스업 / Arts, sports and recreation
 * S: 협회 및 단체, 수리 및 기타 개인 서비스업 / Other service activities
 */

/** 직종 코드 → KSIC 대분류 매핑 / Job category → KSIC section mapping */
export interface KsicMappingEntry {
  /** 플랫폼 직종 코드 / Platform job category code */
  jobCategoryCode: string;
  /** 직종 한글명 / Category name in Korean */
  nameKo: string;
  /** 직종 영문명 / Category name in English */
  nameEn: string;
  /** KSIC 대분류 코드 / KSIC section code */
  ksicCode: string;
  /** KSIC 대분류명 / KSIC section name */
  ksicName: string;
  /** 단순노무 해당 여부 / Whether classified as simple labor */
  isSimpleLabor: boolean;
  /** 유흥업소 해당 여부 / Whether classified as entertainment venue */
  isEntertainment: boolean;
  /** 배달 전문 여부 / Whether classified as delivery-only */
  isDelivery: boolean;
  /**
   * 특수형태근로종사자(긱워크) 해당 여부
   * Whether classified as gig/platform worker (택배기사, 배달대행, 대리기사 등)
   * D-2, D-4 비자 전면 금지 대상
   * Fully blocked for D-2, D-4 visa holders
   */
  isGigWork: boolean;
}

/**
 * 알바 직종 코드 → KSIC 매핑 테이블
 * Alba job category → KSIC mapping table
 *
 * [업데이트 방법 / How to update]
 * 1. 법령 개정 시 KSIC 코드 변경 반영
 * 2. 신규 직종 추가 시 이 테이블에 추가
 * 3. 추후 DB 테이블(JobCategoryKsicMapping)로 마이그레이션 가능
 */
export const KSIC_MAPPING: ReadonlyArray<KsicMappingEntry> = [
  // === 음식점/카페 관련 / Restaurant & Cafe ===
  {
    jobCategoryCode: 'REST_SERVING',
    nameKo: '음식점 서빙',
    nameEn: 'Restaurant Serving',
    ksicCode: 'I',
    ksicName: '숙박 및 음식점업',
    isSimpleLabor: false,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'REST_KITCHEN',
    nameKo: '주방보조/설거지',
    nameEn: 'Kitchen Helper/Dishwashing',
    ksicCode: 'I',
    ksicName: '숙박 및 음식점업',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'CAFE_BARISTA',
    nameKo: '카페 바리스타',
    nameEn: 'Cafe Barista',
    ksicCode: 'I',
    ksicName: '숙박 및 음식점업',
    isSimpleLabor: false,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'FAST_FOOD',
    nameKo: '패스트푸드/분식',
    nameEn: 'Fast Food Service',
    ksicCode: 'I',
    ksicName: '숙박 및 음식점업',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'HOTEL_SERVICE',
    nameKo: '호텔 객실/서비스',
    nameEn: 'Hotel Room/Service',
    ksicCode: 'I',
    ksicName: '숙박 및 음식점업',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },

  // === 판매/유통 관련 / Sales & Retail ===
  {
    jobCategoryCode: 'CONV_STORE',
    nameKo: '편의점',
    nameEn: 'Convenience Store',
    ksicCode: 'G',
    ksicName: '도매 및 소매업',
    isSimpleLabor: false,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'MART_SALES',
    nameKo: '마트/슈퍼 판매',
    nameEn: 'Mart/Super Sales',
    ksicCode: 'G',
    ksicName: '도매 및 소매업',
    isSimpleLabor: false,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'CLOTHING_SALES',
    nameKo: '의류 판매',
    nameEn: 'Clothing Sales',
    ksicCode: 'G',
    ksicName: '도매 및 소매업',
    isSimpleLabor: false,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },

  // === 물류/배달 관련 / Logistics & Delivery ===
  {
    jobCategoryCode: 'LOGISTICS_SORT',
    nameKo: '물류/택배 분류',
    nameEn: 'Logistics/Parcel Sorting',
    ksicCode: 'H',
    ksicName: '운수 및 창고업',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'DELIVERY',
    nameKo: '배달',
    nameEn: 'Delivery',
    ksicCode: 'H',
    ksicName: '운수 및 창고업',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: true,
    isGigWork: true,
  },
  {
    jobCategoryCode: 'MOVING_LABOR',
    nameKo: '이삿짐 운반',
    nameEn: 'Moving Labor',
    ksicCode: 'H',
    ksicName: '운수 및 창고업',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },

  // === 건설 관련 / Construction ===
  {
    jobCategoryCode: 'CONSTRUCTION_LABOR',
    nameKo: '건설 현장 보조',
    nameEn: 'Construction Site Helper',
    ksicCode: 'F',
    ksicName: '건설업',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'CONSTRUCTION_SKILLED',
    nameKo: '건설 기능공',
    nameEn: 'Construction Skilled Worker',
    ksicCode: 'F',
    ksicName: '건설업',
    isSimpleLabor: false,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },

  // === 제조 관련 / Manufacturing ===
  {
    jobCategoryCode: 'FACTORY_SIMPLE',
    nameKo: '공장/제조 단순작업',
    nameEn: 'Factory/Manufacturing Simple Work',
    ksicCode: 'C',
    ksicName: '제조업',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'FACTORY_PACKING',
    nameKo: '포장/검수',
    nameEn: 'Packing/Inspection',
    ksicCode: 'C',
    ksicName: '제조업',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },

  // === 농림어업 관련 / Agriculture & Fishing ===
  {
    jobCategoryCode: 'AGRICULTURE',
    nameKo: '농업 보조',
    nameEn: 'Agriculture Helper',
    ksicCode: 'A',
    ksicName: '농업, 임업 및 어업',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'FISHING',
    nameKo: '어업 보조',
    nameEn: 'Fishing Helper',
    ksicCode: 'A',
    ksicName: '농업, 임업 및 어업',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },

  // === 사무/전문직 관련 / Office & Professional ===
  {
    jobCategoryCode: 'OFFICE_ASSIST',
    nameKo: '사무보조',
    nameEn: 'Office Assistant',
    ksicCode: 'N',
    ksicName: '사업시설 관리 및 지원',
    isSimpleLabor: false,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'TRANSLATION',
    nameKo: '번역/통역',
    nameEn: 'Translation/Interpretation',
    ksicCode: 'M',
    ksicName: '전문, 과학 및 기술 서비스업',
    isSimpleLabor: false,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'IT_ASSIST',
    nameKo: 'IT/개발 보조',
    nameEn: 'IT/Development Assistant',
    ksicCode: 'J',
    ksicName: '정보통신업',
    isSimpleLabor: false,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },

  // === 교육 관련 / Education ===
  {
    jobCategoryCode: 'TUTORING',
    nameKo: '과외/학원 강사',
    nameEn: 'Tutoring/Academy Instructor',
    ksicCode: 'P',
    ksicName: '교육 서비스업',
    isSimpleLabor: false,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },

  // === 서비스 관련 / Service ===
  {
    jobCategoryCode: 'GAS_STATION',
    nameKo: '주유원',
    nameEn: 'Gas Station Attendant',
    ksicCode: 'G',
    ksicName: '도매 및 소매업',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'PARKING_MGMT',
    nameKo: '주차장 관리',
    nameEn: 'Parking Management',
    ksicCode: 'N',
    ksicName: '사업시설 관리 및 지원',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'CLEANING',
    nameKo: '청소원',
    nameEn: 'Cleaner',
    ksicCode: 'N',
    ksicName: '사업시설 관리 및 지원',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'CAREGIVER',
    nameKo: '간병인',
    nameEn: 'Caregiver',
    ksicCode: 'Q',
    ksicName: '보건업 및 사회복지',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'HOUSEKEEPER',
    nameKo: '가사도우미',
    nameEn: 'Housekeeper',
    ksicCode: 'S',
    ksicName: '기타 개인 서비스업',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'NEWSPAPER_DELIVERY',
    nameKo: '신문 배달',
    nameEn: 'Newspaper Delivery',
    ksicCode: 'H',
    ksicName: '운수 및 창고업',
    isSimpleLabor: true,
    isEntertainment: false,
    isDelivery: true,
    isGigWork: true,
  },

  // === 유흥업소 관련 / Entertainment Venues ===
  {
    jobCategoryCode: 'ENTERTAINMENT',
    nameKo: '유흥업소',
    nameEn: 'Entertainment Venue',
    ksicCode: 'I_ENT',
    ksicName: '유흥 주점업',
    isSimpleLabor: false,
    isEntertainment: true,
    isDelivery: false,
    isGigWork: false,
  },

  // === 금융/보험 관련 / Finance & Insurance ===
  {
    jobCategoryCode: 'FINANCE',
    nameKo: '금융/보험 사무',
    nameEn: 'Finance/Insurance Office',
    ksicCode: 'K',
    ksicName: '금융 및 보험업',
    isSimpleLabor: false,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },

  // === 부동산 관련 / Real Estate ===
  {
    jobCategoryCode: 'REAL_ESTATE',
    nameKo: '부동산 보조',
    nameEn: 'Real Estate Assistant',
    ksicCode: 'L',
    ksicName: '부동산업',
    isSimpleLabor: false,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },

  // === 공공행정 관련 / Public Administration ===
  {
    jobCategoryCode: 'PUBLIC_ADMIN',
    nameKo: '공공행정 보조',
    nameEn: 'Public Administration Assistant',
    ksicCode: 'O',
    ksicName: '공공 행정',
    isSimpleLabor: false,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },

  // === 인턴 관련 / Internship ===
  {
    jobCategoryCode: 'INTERN_PROFESSIONAL',
    nameKo: '전문직 인턴',
    nameEn: 'Professional Internship',
    ksicCode: 'M',
    ksicName: '전문, 과학 및 기술 서비스업',
    isSimpleLabor: false,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },

  // === 기타 / Other ===
  {
    jobCategoryCode: 'EVENT_STAFF',
    nameKo: '행사/이벤트 스태프',
    nameEn: 'Event Staff',
    ksicCode: 'R',
    ksicName: '예술, 스포츠 및 여가',
    isSimpleLabor: false,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
  {
    jobCategoryCode: 'PROMOTION',
    nameKo: '전단지/홍보',
    nameEn: 'Flyer Distribution/Promotion',
    ksicCode: 'N',
    ksicName: '사업시설 관리 및 지원',
    isSimpleLabor: false,
    isEntertainment: false,
    isDelivery: false,
    isGigWork: false,
  },
] as const;

/**
 * 직종 코드로 KSIC 매핑 조회
 * Look up KSIC mapping by job category code
 */
export function getKsicMapping(
  jobCategoryCode: string,
): KsicMappingEntry | undefined {
  return KSIC_MAPPING.find((m) => m.jobCategoryCode === jobCategoryCode);
}

/**
 * KSIC 코드로 직종 목록 조회
 * Look up job categories by KSIC code
 */
export function getJobCategoriesByKsic(
  ksicCode: string,
): ReadonlyArray<KsicMappingEntry> {
  return KSIC_MAPPING.filter((m) => m.ksicCode === ksicCode);
}
