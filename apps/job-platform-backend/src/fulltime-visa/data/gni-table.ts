/**
 * 연도별 1인당 GNI (국민총소득) 데이터 및 E-7 비자 최소 연봉 기준
 * Annual GNI (Gross National Income) Per Capita Data and E-7 Visa Minimum Salary Thresholds
 *
 * [법령 근거]
 * - 법무부공고 제2025-106호 (2025.4.1~2025.12.31)
 * - 법무부공고 제2025-406호 (2026.2.1~2026.12.31)
 * - 출입국관리법 시행령 제7조제7항
 * - 2024년 GNI: 한국은행 2025.3.5 발표 49,955,000원
 *
 * [2025년] 법무부공고 2025-106호 — 고정금액 방식 (전 기업 동일)
 *   E-7-1: 34,400,000원, E-7-2/3: 시급 10,030원 기준
 *   적용기간: 2025.4.1 ~ 2025.12.31
 *
 * [2026년] 법무부공고 2025-406호 — 고정금액 방식 (전 기업 동일)
 *   E-7-1: 31,120,000원, E-7-2/3: 25,890,000원 (최저임금 연동, 시급 10,320원)
 *   적용기간: 2026.2.1 ~ 2026.12.31
 *   ⚠️ 중소기업 70% 특례 폐지 (전 기업 동일 기준)
 *
 * [마지막 검증일] 2026-02-23
 */

/**
 * 법무부 고정금액 기준 (E-7 비자 최소 연봉)
 * MOJ Fixed Amount Standards (E-7 visa minimum annual salary)
 *
 * 법적 근거:
 * - 2025: 법무부공고 제2025-106호 (2025.4.1~2025.12.31)
 * - 2026: 법무부공고 제2025-406호 (2026.2.1~2026.12.31)
 *
 * ⚠️ 2026년부터 중소기업 70% 특례 폐지 — 전 기업 동일 기준 적용
 */
export interface MojFixedSalaryStandards {
  /** E-7-1 전문인력 최소 연봉 / E-7-1 Professional minimum annual salary */
  e71: number;
  /** E-7-2 준전문인력 최소 연봉 / E-7-2 Semi-professional minimum annual salary */
  e72: number;
  /** E-7-3 일반기능인력 최소 연봉 / E-7-3 General skilled minimum annual salary */
  e73: number;
  /** 적용 시작일 / Effective from */
  effectiveFrom: string;
  /** 적용 종료일 / Effective to */
  effectiveTo: string;
}

/**
 * GNI 연도별 데이터 인터페이스
 * GNI annual data interface
 */
export interface GniData {
  /** 적용 연도 / Applicable year */
  year: number;
  /** 1인당 GNI (원) / GNI per capita (KRW) */
  gniPerCapita: number;
  /** E-7-1 최소 연봉 (GNI × 0.8) — 법무부 고정금액 미적용 시 / E-7-1 minimum salary (GNI × 0.8) — when fixed amount not applied */
  e71MinSalary: number;
  /** GNI × 3.0 — E-7-1 학력/경력/직종 면제 기준 (출입국관리법 시행령 제7조제7항) */
  e7sMinSalary: number;
  /** 법무부 고정금액 기준 (있는 경우) / MOJ fixed amount standards (if applicable) */
  mojFixedSalary?: MojFixedSalaryStandards;
  /** 적용 시작일 / Effective from */
  effectiveFrom: string;
  /** 적용 종료일 / Effective to */
  effectiveTo: string;
}

/**
 * 연도별 GNI 테이블
 * GNI table by year
 *
 * 매년 4월 1일 기준으로 갱신됩니다.
 * Updated annually on April 1st.
 */
export const GNI_TABLE: ReadonlyArray<GniData> = [
  {
    year: 2024,
    gniPerCapita: 49_955_000, // 한국은행 2025.3.5 발표 / BOK announced 2025.3.5
    e71MinSalary: 49_955_000 * 0.8, // 39,964,000원 (GNI × 80%)
    e7sMinSalary: 49_955_000 * 3.0, // 149,865,000원 (GNI × 3.0)
    effectiveFrom: '2024-04-01',
    effectiveTo: '2025-03-31',
  },
  {
    year: 2025,
    gniPerCapita: 49_955_000, // 2024년 GNI 적용 / Using 2024 GNI
    e71MinSalary: 49_955_000 * 0.8, // 39,964,000원 (GNI × 80%, 고정금액 미적용 시)
    e7sMinSalary: 49_955_000 * 3.0, // 149,865,000원 (GNI × 3.0)
    // 법무부공고 제2025-106호 (2025.4.1 ~ 2025.12.31)
    // MOJ Notice 2025-106 (2025.4.1 ~ 2025.12.31)
    mojFixedSalary: {
      e71: 34_400_000, // E-7-1 전문인력 / Professional
      e72: 25_150_000, // E-7-2 준전문인력 (시급 10,030원 × 209h × 12개월) / Semi-professional
      e73: 25_150_000, // E-7-3 일반기능인력 (시급 10,030원 × 209h × 12개월) / General skilled
      effectiveFrom: '2025-04-01',
      effectiveTo: '2025-12-31', // 법무부공고 2025-106호 유효기간
    },
    effectiveFrom: '2025-04-01',
    effectiveTo: '2025-12-31', // 법무부공고 2025-106호 유효기간
  },
  {
    // 법무부공고 제2025-406호 (2026.2.1 ~ 2026.12.31)
    // MOJ Notice 2025-406 (2026.2.1 ~ 2026.12.31)
    // ⚠️ 중소기업 70% 특례 폐지 — 전 기업 동일 기준 적용
    // SME 70% special provision abolished — same standard for all companies
    year: 2026,
    gniPerCapita: 49_955_000, // 2024년 GNI 적용 (한국은행 2025.3.5 발표) / Using 2024 GNI (BOK 2025.3.5)
    e71MinSalary: 49_955_000 * 0.8, // 39,964,000원 (GNI × 80%, 고정금액 미적용 시 fallback)
    e7sMinSalary: 49_955_000 * 3.0, // 149,865,000원 (GNI × 3.0, E-7-1 학력/경력/직종 면제 기준)
    mojFixedSalary: {
      e71: 31_120_000, // E-7-1 전문인력 / Professional (법무부공고 2025-406호)
      e72: 25_890_000, // E-7-2 준전문인력 (최저임금 연동, 시급 10,320원) / Semi-professional
      e73: 25_890_000, // E-7-3 일반기능인력 (최저임금 연동, 시급 10,320원) / General skilled
      effectiveFrom: '2026-02-01',
      effectiveTo: '2026-12-31',
    },
    effectiveFrom: '2026-01-01',
    effectiveTo: '2026-12-31',
  },
  // TODO: 2027년 데이터 추가 시
  // - 2025년 GNI 발표값 반영 (한국은행, 2026.3월 예정)
  // - 법무부 신규 고시 확인
];

/**
 * 현재 날짜 기준 적용 GNI 조회
 * Get applicable GNI based on current date
 *
 * @param referenceDate 기준 날짜 (optional, 기본값: 현재) / Reference date
 * @returns 적용 GNI 데이터 / Applicable GNI data
 * @throws Error GNI 데이터가 없는 경우 / If no GNI data available
 */
export function getCurrentGni(referenceDate?: Date): GniData {
  const date = referenceDate ?? new Date();
  const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD

  const applicableGni = GNI_TABLE.find(
    (gni) => dateStr >= gni.effectiveFrom && dateStr <= gni.effectiveTo
  );

  if (!applicableGni) {
    throw new Error(
      `적용 가능한 GNI 데이터를 찾을 수 없습니다. 기준일: ${dateStr} / ` +
      `No applicable GNI data found for date: ${dateStr}`
    );
  }

  return applicableGni;
}

/**
 * 특정 연도의 GNI 조회
 * Get GNI data for a specific year
 *
 * @param year 연도 / Year
 * @returns GNI 데이터 또는 undefined / GNI data or undefined
 */
export function getGniByYear(year: number): GniData | undefined {
  return GNI_TABLE.find((gni) => gni.year === year);
}

/**
 * E-7 비자 하위 유형별 최소 연봉 조회
 * Get E-7 visa minimum salary by subtype
 *
 * 법무부 고정금액 적용기간에는 고정금액 반환, 그 외에는 GNI 비율 기반 금액 반환.
 * Returns fixed amount during MOJ fixed amount period, otherwise GNI ratio-based amount.
 *
 * 법적 근거:
 * - 법무부공고 2025-106호 (2025.4.1~2025.12.31)
 * - 법무부공고 2025-406호 (2026.2.1~2026.12.31)
 *
 * @param e7Subtype E-7 하위 유형 / E-7 subtype ('E-7-1' | 'E-7-2' | 'E-7-3')
 * @param referenceDate 기준 날짜 (optional, 기본값: 현재) / Reference date
 * @returns 최소 연봉 (원) / Minimum annual salary (KRW)
 */
export function getCurrentE7MinSalary(
  e7Subtype: 'E-7-1' | 'E-7-2' | 'E-7-3',
  referenceDate?: Date
): number {
  const date = referenceDate ?? new Date();
  const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
  const gni = getCurrentGni(referenceDate);

  // 법무부 고정금액 적용기간 확인
  // Check if MOJ fixed amount period applies
  if (gni.mojFixedSalary) {
    const { effectiveFrom, effectiveTo } = gni.mojFixedSalary;
    if (dateStr >= effectiveFrom && dateStr <= effectiveTo) {
      switch (e7Subtype) {
        case 'E-7-1':
          return gni.mojFixedSalary.e71;
        case 'E-7-2':
          return gni.mojFixedSalary.e72;
        case 'E-7-3':
          return gni.mojFixedSalary.e73;
      }
    }
  }

  // 고정금액 미적용 기간 → GNI 비율 기반 fallback
  // Outside fixed amount period → GNI ratio-based fallback
  switch (e7Subtype) {
    case 'E-7-1':
      return gni.e71MinSalary; // GNI × 80%
    case 'E-7-2':
    case 'E-7-3':
      // E-7-2/3는 최저임금 연동이므로, 고정금액이 없으면 GNI × 80% 사용
      // E-7-2/3 are minimum wage-based; if no fixed amount, use GNI × 80% as fallback
      return gni.e71MinSalary;
  }
}

/**
 * GNI 3배 기준 금액 조회 (E-7-1 학력/경력/직종 면제 기준)
 * Get GNI × 3 threshold (E-7-1 education/experience/occupation exemption)
 *
 * 법적 근거: 출입국관리법 시행령 제7조제7항
 * GNI 3배 이상 연봉 시 학력/경력/직종 요건 전부 면제
 *
 * @param referenceDate 기준 날짜 (optional) / Reference date
 * @returns GNI × 3 금액 (원) / GNI × 3 amount (KRW)
 */
export function getGniTripleThreshold(referenceDate?: Date): number {
  const gni = getCurrentGni(referenceDate);
  return gni.e7sMinSalary; // GNI × 3.0
}

/**
 * E-7-1 연봉 기준 충족 여부 확인
 * Check if salary meets E-7-1 threshold
 *
 * @param salaryAnnual 연봉 (원) / Annual salary (KRW)
 * @param referenceDate 기준 날짜 (optional) / Reference date
 * @returns 기준 충족 여부 / Whether threshold is met
 */
export function meetsE71SalaryThreshold(
  salaryAnnual: number,
  referenceDate?: Date
): boolean {
  const minSalary = getCurrentE7MinSalary('E-7-1', referenceDate);
  return salaryAnnual >= minSalary;
}

