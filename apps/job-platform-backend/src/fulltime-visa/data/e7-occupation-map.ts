/**
 * E-7 비자 허용 직종 매핑 데이터
 * E-7 Visa Allowed Occupation Mapping Data
 *
 * 한국표준직업분류 코드를 E-7 비자 허용 직종과 매핑합니다.
 * Maps Korean Standard Classification of Occupations codes to E-7 visa allowed occupations.
 *
 * 법령 근거 / Legal Basis:
 * - 출입국관리법 시행령 별표 1의2 제20호 (E-7 특정활동)
 * - Immigration Control Act Enforcement Decree Annex 1-2, Item 20 (E-7 Specific Activities)
 * - 법무부 고시: 외국인 전문인력 도입 및 고용 등에 관한 지침
 * - Ministry of Justice Notice: Guidelines on Introduction and Employment of Foreign Professional Workforce
 */

/**
 * E-7 하위 유형
 * E-7 sub-types
 */
export type E7Subtype = 'E-7-1' | 'E-7-2' | 'E-7-S';

/**
 * E-7 직종 매핑 인터페이스
 * E-7 occupation mapping interface
 */
export interface E7OccupationMapping {
  /** 한국표준직업분류 코드 / KSCO code */
  occupationCode: string;
  /** 직종명 (한글) / Occupation name (Korean) */
  occupationName: string;
  /** 직종명 (영문) / Occupation name (English) */
  occupationNameEn: string;
  /** E-7 하위 유형 / E-7 sub-type */
  e7Subtype: E7Subtype;
  /** 허용 여부 / Whether allowed */
  isAllowed: boolean;
}

/**
 * E-7 허용 직종 매핑 테이블
 * E-7 allowed occupation mapping table
 *
 * 우선 주요 10개 직종만 포함, 나머지는 추후 추가 예정
 * Initially includes 10 major occupations, more to be added later
 */
export const E7_OCCUPATION_MAP: ReadonlyArray<E7OccupationMapping> = [
  // ── IT 분야 / IT Field ──
  {
    occupationCode: '2211',
    occupationName: '컴퓨터시스템 설계 및 분석가',
    occupationNameEn: 'Computer System Designer and Analyst',
    e7Subtype: 'E-7-1',
    isAllowed: true,
  },
  {
    occupationCode: '2212',
    occupationName: '시스템 소프트웨어 개발자',
    occupationNameEn: 'System Software Developer',
    e7Subtype: 'E-7-1',
    isAllowed: true,
  },
  {
    occupationCode: '2213',
    occupationName: '응용 소프트웨어 개발자',
    occupationNameEn: 'Application Software Developer',
    e7Subtype: 'E-7-1',
    isAllowed: true,
  },
  {
    occupationCode: '2214',
    occupationName: '데이터베이스 개발자',
    occupationNameEn: 'Database Developer',
    e7Subtype: 'E-7-1',
    isAllowed: true,
  },

  // ── 경영/사무 분야 / Business/Office Field ──
  {
    occupationCode: '1321',
    occupationName: '경영기획 사무원',
    occupationNameEn: 'Business Planning Staff',
    e7Subtype: 'E-7-1',
    isAllowed: true,
  },

  // ── 공학 분야 / Engineering Field ──
  {
    occupationCode: '2411',
    occupationName: '기계공학 기술자',
    occupationNameEn: 'Mechanical Engineering Technician',
    e7Subtype: 'E-7-2', // E-7-2 준전문인력 (20% 고용비율 제한 적용)
    isAllowed: true,
  },
  {
    occupationCode: '2341',
    occupationName: '전기공학 기술자',
    occupationNameEn: 'Electrical Engineering Technician',
    e7Subtype: 'E-7-1',
    isAllowed: true,
  },

  // ── E-7-2 준전문인력 분야 / E-7-2 Semi-Professional Field ──
  {
    occupationCode: '1511',
    occupationName: '숙박시설 관리자',
    occupationNameEn: 'Accommodation Facility Manager',
    e7Subtype: 'E-7-2',
    isAllowed: true,
  },
  {
    occupationCode: '4214',
    occupationName: '조리사',
    occupationNameEn: 'Cook/Chef',
    e7Subtype: 'E-7-2',
    isAllowed: true,
  },

  // ── E-7-2 준전문인력 (20% 고용비율 제한 직종) / E-7-2 Semi-Professional (Employment Ratio Restricted) ──
  {
    occupationCode: '1334',
    occupationName: '해외영업원',
    occupationNameEn: 'Overseas Sales Staff',
    e7Subtype: 'E-7-2',
    isAllowed: true,
  },
  {
    occupationCode: '2719',
    occupationName: '여행상품개발자',
    occupationNameEn: 'Travel Product Developer',
    e7Subtype: 'E-7-2',
    isAllowed: true,
  },
  {
    occupationCode: '2822',
    occupationName: '통번역가',
    occupationNameEn: 'Translator/Interpreter',
    e7Subtype: 'E-7-2',
    isAllowed: true,
  },
  {
    occupationCode: '2831',
    occupationName: '제도사',
    occupationNameEn: 'Drafter',
    e7Subtype: 'E-7-2',
    isAllowed: true,
  },

  // TODO: 나머지 E-7 허용 직종 추가 (총 91개)
  // TODO: Add remaining E-7 allowed occupations (total 91)
  // 참고: 법무부 고시 "외국인 전문인력 도입 및 고용 등에 관한 지침" 별표 참조
  // Reference: Ministry of Justice Notice annex
];

/**
 * 직종 코드로 E-7 매핑 정보 조회
 * Get E-7 mapping information by occupation code
 *
 * @param occupationCode 한국표준직업분류 코드 / KSCO code
 * @returns E-7 매핑 정보 또는 undefined / E-7 mapping or undefined
 */
export function getE7Occupation(
  occupationCode: string,
): E7OccupationMapping | undefined {
  return E7_OCCUPATION_MAP.find(
    (mapping) => mapping.occupationCode === occupationCode,
  );
}

/**
 * E-7 비자 허용 직종 여부 확인
 * Check if occupation is allowed for E-7 visa
 *
 * @param occupationCode 한국표준직업분류 코드 / KSCO code
 * @returns 허용 여부 / Whether allowed
 */
export function isE7Allowed(occupationCode: string): boolean {
  const mapping = getE7Occupation(occupationCode);
  return mapping?.isAllowed ?? false;
}

/**
 * E-7-1 허용 직종 여부 확인
 * Check if occupation is allowed for E-7-1 visa
 *
 * @param occupationCode 한국표준직업분류 코드 / KSCO code
 * @returns 허용 여부 / Whether allowed
 */
export function isE71Allowed(occupationCode: string): boolean {
  const mapping = getE7Occupation(occupationCode);
  return !!mapping && mapping.isAllowed && mapping.e7Subtype === 'E-7-1';
}

/**
 * E-7-2 허용 직종 여부 확인
 * Check if occupation is allowed for E-7-2 visa
 *
 * @param occupationCode 한국표준직업분류 코드 / KSCO code
 * @returns 허용 여부 / Whether allowed
 */
export function isE72Allowed(occupationCode: string): boolean {
  const mapping = getE7Occupation(occupationCode);
  return !!mapping && mapping.isAllowed && mapping.e7Subtype === 'E-7-2';
}

/**
 * E-7-S 허용 직종 여부 확인 (네거티브리스트)
 * Check if occupation is allowed for E-7-S visa (negative list)
 *
 * E-7-S는 네거티브리스트 방식으로 금지 직종만 명시됩니다.
 * E-7-S uses a negative list approach, only prohibited occupations are specified.
 *
 * @param occupationCode 한국표준직업분류 코드 / KSCO code
 * @returns 허용 여부 / Whether allowed
 */
export function isE7sAllowed(occupationCode: string): boolean {
  // E-7-S는 금지직종 리스트에 없으면 허용
  // E-7-S is allowed unless in prohibited list
  // TODO: e7s-negative-list.ts 구현 후 연동
  // TODO: Integrate with e7s-negative-list.ts after implementation
  return true; // 임시로 모두 허용 / Temporarily allow all
}

/**
 * E-7 하위 유형별 필터링
 * Filter E-7 mappings by sub-type
 *
 * @param subtype E-7 하위 유형 / E-7 sub-type
 * @returns 해당 하위 유형의 직종 목록 / List of occupations for the sub-type
 */
export function getE7OccupationsBySubtype(
  subtype: E7Subtype,
): ReadonlyArray<E7OccupationMapping> {
  return E7_OCCUPATION_MAP.filter(
    (mapping) => mapping.e7Subtype === subtype && mapping.isAllowed,
  );
}

/**
 * E-7-2 고용비율 20% 제한 대상 직종 목록
 * E-7-2 occupations subject to 20% employment ratio restriction
 *
 * 법령 근거: E-7-2 준전문인력 중 특정 5개 직종에 대해서만 외국인 고용비율 20% 제한 적용
 * Legal basis: 20% foreign employment ratio restriction applies only to these 5 occupations
 *
 * 제한 직종 / Restricted occupations:
 * - 해외영업원 / Overseas Sales Staff
 * - 통번역가 / Translator/Interpreter
 * - 기계공학기술자 / Mechanical Engineering Technician
 * - 제도사 / Drafter
 * - 여행상품개발자 / Travel Product Developer
 */
export const E72_EMPLOYMENT_RATIO_RESTRICTED_OCCUPATIONS: ReadonlyArray<string> =
  [
    '1334', // 해외영업원 / Overseas Sales Staff
    '2822', // 통번역가 / Translator/Interpreter
    '2411', // 기계공학기술자 / Mechanical Engineering Technician
    '2831', // 제도사 / Drafter
    '2719', // 여행상품개발자 / Travel Product Developer
  ];

/**
 * E-7-2 고용비율 20% 제한 적용 직종 여부 확인
 * Check if E-7-2 occupation is subject to 20% employment ratio restriction
 *
 * @param occupationCode 한국표준직업분류 코드 / KSCO code
 * @returns 제한 적용 여부 / Whether restriction applies
 */
export function isE72EmploymentRatioRestricted(
  occupationCode: string,
): boolean {
  return E72_EMPLOYMENT_RATIO_RESTRICTED_OCCUPATIONS.includes(occupationCode);
}
