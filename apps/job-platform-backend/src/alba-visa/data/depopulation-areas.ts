/**
 * 인구감소지역 목록
 * Depopulation Area List
 *
 * [법적 근거 / Legal Basis]
 * 인구감소지역 지정 고시 (행정안전부 고시 제2024-XX호)
 * Depopulation Area Designation Notice (Ministry of Interior and Safety)
 * 지방소멸 위기 극복을 위한 특별법 (2023.01 시행)
 * Special Act for Overcoming the Crisis of Local Extinction (effective 2023.01)
 *
 * [F-4-R 관련 / F-4-R Related]
 * F-4-R (지역특화형 재외동포): 인구감소지역에서 전 직종 취업 가능 (단순노무 포함)
 * F-4-R (Regional Overseas Korean): All occupations allowed in depopulation areas (including simple labor)
 *
 * [업데이트 방법 / How to update]
 * 행정안전부 인구감소지역 고시 개정 시 이 목록 업데이트.
 * Update this list when MOIS depopulation area notices are amended.
 * 추후 DB 테이블로 마이그레이션 가능.
 * Can be migrated to DB table later.
 */

/**
 * 인구감소지역 목록 (시/군/구 단위)
 * Depopulation areas (at si/gun/gu level)
 *
 * 2024년 기준 89개 지역 (시군구 코드 + 명칭)
 * 89 areas as of 2024 (administrative codes + names)
 */
export const DEPOPULATION_AREAS: ReadonlyArray<{
  /** 시/도 / Province */
  sido: string;
  /** 시/군/구 / District */
  sigungu: string;
}> = [
  // === 부산광역시 / Busan (3) ===
  { sido: '부산광역시', sigungu: '동구' },
  { sido: '부산광역시', sigungu: '서구' },
  { sido: '부산광역시', sigungu: '영도구' },

  // === 대구광역시 / Daegu (2) ===
  { sido: '대구광역시', sigungu: '남구' },
  { sido: '대구광역시', sigungu: '서구' },

  // === 인천광역시 / Incheon (1) ===
  { sido: '인천광역시', sigungu: '강화군' },

  // === 경기도 / Gyeonggi (2) ===
  { sido: '경기도', sigungu: '가평군' },
  { sido: '경기도', sigungu: '연천군' },

  // === 강원특별자치도 / Gangwon (12) ===
  { sido: '강원특별자치도', sigungu: '고성군' },
  { sido: '강원특별자치도', sigungu: '삼척시' },
  { sido: '강원특별자치도', sigungu: '양구군' },
  { sido: '강원특별자치도', sigungu: '양양군' },
  { sido: '강원특별자치도', sigungu: '영월군' },
  { sido: '강원특별자치도', sigungu: '인제군' },
  { sido: '강원특별자치도', sigungu: '정선군' },
  { sido: '강원특별자치도', sigungu: '철원군' },
  { sido: '강원특별자치도', sigungu: '태백시' },
  { sido: '강원특별자치도', sigungu: '평창군' },
  { sido: '강원특별자치도', sigungu: '홍천군' },
  { sido: '강원특별자치도', sigungu: '화천군' },

  // === 충청북도 / Chungcheongbuk (6) ===
  { sido: '충청북도', sigungu: '괴산군' },
  { sido: '충청북도', sigungu: '단양군' },
  { sido: '충청북도', sigungu: '보은군' },
  { sido: '충청북도', sigungu: '영동군' },
  { sido: '충청북도', sigungu: '옥천군' },
  { sido: '충청북도', sigungu: '제천시' },

  // === 충청남도 / Chungcheongnam (6) ===
  { sido: '충청남도', sigungu: '공주시' },
  { sido: '충청남도', sigungu: '금산군' },
  { sido: '충청남도', sigungu: '논산시' },
  { sido: '충청남도', sigungu: '보령시' },
  { sido: '충청남도', sigungu: '부여군' },
  { sido: '충청남도', sigungu: '서천군' },
  { sido: '충청남도', sigungu: '예산군' },
  { sido: '충청남도', sigungu: '청양군' },
  { sido: '충청남도', sigungu: '태안군' },

  // === 전북특별자치도 / Jeonbuk (10) ===
  { sido: '전북특별자치도', sigungu: '고창군' },
  { sido: '전북특별자치도', sigungu: '김제시' },
  { sido: '전북특별자치도', sigungu: '남원시' },
  { sido: '전북특별자치도', sigungu: '무주군' },
  { sido: '전북특별자치도', sigungu: '부안군' },
  { sido: '전북특별자치도', sigungu: '순창군' },
  { sido: '전북특별자치도', sigungu: '임실군' },
  { sido: '전북특별자치도', sigungu: '장수군' },
  { sido: '전북특별자치도', sigungu: '정읍시' },
  { sido: '전북특별자치도', sigungu: '진안군' },

  // === 전라남도 / Jeonnam (14) ===
  { sido: '전라남도', sigungu: '강진군' },
  { sido: '전라남도', sigungu: '고흥군' },
  { sido: '전라남도', sigungu: '곡성군' },
  { sido: '전라남도', sigungu: '구례군' },
  { sido: '전라남도', sigungu: '담양군' },
  { sido: '전라남도', sigungu: '보성군' },
  { sido: '전라남도', sigungu: '신안군' },
  { sido: '전라남도', sigungu: '영광군' },
  { sido: '전라남도', sigungu: '영암군' },
  { sido: '전라남도', sigungu: '완도군' },
  { sido: '전라남도', sigungu: '장성군' },
  { sido: '전라남도', sigungu: '장흥군' },
  { sido: '전라남도', sigungu: '진도군' },
  { sido: '전라남도', sigungu: '함평군' },
  { sido: '전라남도', sigungu: '해남군' },
  { sido: '전라남도', sigungu: '화순군' },

  // === 경상북도 / Gyeongsangbuk (15) ===
  { sido: '경상북도', sigungu: '군위군' },
  { sido: '경상북도', sigungu: '고령군' },
  { sido: '경상북도', sigungu: '문경시' },
  { sido: '경상북도', sigungu: '봉화군' },
  { sido: '경상북도', sigungu: '상주시' },
  { sido: '경상북도', sigungu: '성주군' },
  { sido: '경상북도', sigungu: '안동시' },
  { sido: '경상북도', sigungu: '영덕군' },
  { sido: '경상북도', sigungu: '영양군' },
  { sido: '경상북도', sigungu: '영주시' },
  { sido: '경상북도', sigungu: '영천시' },
  { sido: '경상북도', sigungu: '예천군' },
  { sido: '경상북도', sigungu: '울릉군' },
  { sido: '경상북도', sigungu: '의성군' },
  { sido: '경상북도', sigungu: '청도군' },
  { sido: '경상북도', sigungu: '청송군' },
  { sido: '경상북도', sigungu: '칠곡군' },

  // === 경상남도 / Gyeongsangnam (11) ===
  { sido: '경상남도', sigungu: '거창군' },
  { sido: '경상남도', sigungu: '고성군' },
  { sido: '경상남도', sigungu: '남해군' },
  { sido: '경상남도', sigungu: '밀양시' },
  { sido: '경상남도', sigungu: '산청군' },
  { sido: '경상남도', sigungu: '의령군' },
  { sido: '경상남도', sigungu: '창녕군' },
  { sido: '경상남도', sigungu: '하동군' },
  { sido: '경상남도', sigungu: '함안군' },
  { sido: '경상남도', sigungu: '함양군' },
  { sido: '경상남도', sigungu: '합천군' },
] as const;

/**
 * 인구감소지역 여부 확인
 * Check if address is in a depopulation area
 *
 * @param sido 시/도 / Province
 * @param sigungu 시/군/구 / District
 * @returns 인구감소지역 여부 / Whether it's a depopulation area
 */
export function isDepopulationArea(sido: string, sigungu: string): boolean {
  return DEPOPULATION_AREAS.some(
    (area) => area.sido === sido && area.sigungu === sigungu,
  );
}
