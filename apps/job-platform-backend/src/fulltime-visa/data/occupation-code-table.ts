/**
 * 한국표준직업분류 대분류 코드 테이블
 * Korean Standard Classification of Occupations (KSCO) Major Group Table
 *
 * F-4 재외동포 비자의 단순노무 제한 판정에 사용됩니다.
 * Used for determining F-4 Overseas Korean visa simple labor restrictions.
 *
 * 법령 근거 / Legal Basis:
 * - 출입국관리법 시행령 제23조 제3항 (F-4 단순노무 제한)
 * - Immigration Control Act Enforcement Decree Article 23, Paragraph 3 (F-4 simple labor restriction)
 * - 통계청 고시: 한국표준직업분류
 * - Statistics Korea Notice: Korean Standard Classification of Occupations
 */

/**
 * 직업 대분류 인터페이스
 * Occupation major group interface
 */
export interface OccupationMajorGroup {
  /** 대분류 코드 (1~9) / Major group code */
  majorCode: string;
  /** 대분류명 (한글) / Major group name (Korean) */
  name: string;
  /** 대분류명 (영문) / Major group name (English) */
  nameEn: string;
  /** 단순노무 여부 / Whether simple labor */
  isSimpleLabor: boolean;
}

/**
 * 한국표준직업분류 대분류 (1~9)
 * KSCO Major Groups (1~9)
 */
export const OCCUPATION_MAJOR_GROUPS: ReadonlyArray<OccupationMajorGroup> = [
  {
    majorCode: '1',
    name: '관리자',
    nameEn: 'Managers',
    isSimpleLabor: false,
  },
  {
    majorCode: '2',
    name: '전문가 및 관련 종사자',
    nameEn: 'Professionals and Related Workers',
    isSimpleLabor: false,
  },
  {
    majorCode: '3',
    name: '사무 종사자',
    nameEn: 'Clerks',
    isSimpleLabor: false,
  },
  {
    majorCode: '4',
    name: '서비스 종사자',
    nameEn: 'Service Workers',
    isSimpleLabor: false,
  },
  {
    majorCode: '5',
    name: '판매 종사자',
    nameEn: 'Sales Workers',
    isSimpleLabor: false,
  },
  {
    majorCode: '6',
    name: '농림어업 숙련 종사자',
    nameEn: 'Skilled Agricultural, Forestry and Fishery Workers',
    isSimpleLabor: false,
  },
  {
    majorCode: '7',
    name: '기능원 및 관련 기능 종사자',
    nameEn: 'Craft and Related Trades Workers',
    isSimpleLabor: false,
  },
  {
    majorCode: '8',
    name: '장치·기계 조작 및 조립 종사자',
    nameEn: 'Plant and Machine Operators and Assemblers',
    isSimpleLabor: false,
  },
  {
    majorCode: '9',
    name: '단순노무 종사자',
    nameEn: 'Elementary Occupations',
    isSimpleLabor: true, // ← F-4 제한 대상 / F-4 restricted
  },
];

/**
 * 대분류 코드로 정보 조회
 * Get major group information by code
 *
 * @param majorCode 대분류 코드 (1~9) / Major group code
 * @returns 대분류 정보 또는 undefined / Major group info or undefined
 */
export function getOccupationMajorGroup(
  majorCode: string,
): OccupationMajorGroup | undefined {
  return OCCUPATION_MAJOR_GROUPS.find((group) => group.majorCode === majorCode);
}

/**
 * 직종 코드가 단순노무인지 확인
 * Check if occupation code is simple labor
 *
 * 한국표준직업분류 코드의 첫 자리가 9인 경우 단순노무로 판정합니다.
 * If the first digit of KSCO code is 9, it is classified as simple labor.
 *
 * @param occupationCode 한국표준직업분류 코드 / KSCO code (예: "9112")
 * @returns 단순노무 여부 / Whether simple labor
 *
 * @example
 * isSimpleLaborOccupation('9112') // true (건물청소원)
 * isSimpleLaborOccupation('2213') // false (응용SW개발자)
 */
export function isSimpleLaborOccupation(occupationCode: string): boolean {
  if (!occupationCode || occupationCode.length === 0) {
    return false;
  }

  // 첫 자리가 9인지 확인 / Check if first digit is 9
  const firstDigit = occupationCode.charAt(0);
  return firstDigit === '9';
}

/**
 * 대분류 코드 추출
 * Extract major group code from occupation code
 *
 * @param occupationCode 한국표준직업분류 코드 / KSCO code
 * @returns 대분류 코드 (첫 자리) / Major group code (first digit)
 *
 * @example
 * getMajorGroupCode('2213') // '2'
 * getMajorGroupCode('9112') // '9'
 */
export function getMajorGroupCode(occupationCode: string): string {
  if (!occupationCode || occupationCode.length === 0) {
    return '';
  }
  return occupationCode.charAt(0);
}

/**
 * 대분류명 조회
 * Get major group name
 *
 * @param occupationCode 한국표준직업분류 코드 / KSCO code
 * @returns 대분류명 (한글) 또는 null / Major group name (Korean) or null
 */
export function getMajorGroupName(occupationCode: string): string | null {
  const majorCode = getMajorGroupCode(occupationCode);
  const group = getOccupationMajorGroup(majorCode);
  return group?.name ?? null;
}
