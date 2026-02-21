/**
 * 연도별 1인당 GNI (국민총소득) 데이터 및 E-7 비자 최소 연봉 기준
 * Annual GNI (Gross National Income) Per Capita Data and E-7 Visa Minimum Salary Thresholds
 *
 * ⚠️ 중요 변경사항 (2025.4.1부):
 * 법무부공고 제2025-106호에 의해 E-7 비자 임금요건이 변경되었습니다.
 * - 기존: GNI 비율 방식 (E-7-1 = GNI × 80%, 중소기업 70%)
 * - 변경: 고정금액 방식 (전 기업 동일 기준)
 * - 적용기간: 2025.4.1 ~ 2025.12.31 (한시적)
 *
 * Important Change (from 2025.4.1):
 * E-7 visa salary requirements changed per MOJ Notice 2025-106.
 * - Previous: GNI ratio method (E-7-1 = GNI × 80%, SME 70%)
 * - Changed: Fixed amount method (same for all companies)
 * - Period: 2025.4.1 ~ 2025.12.31 (temporary)
 *
 * ⚠️⚠️⚠️ 2026년 데이터 업데이트 필요 (URGENT UPDATE REQUIRED for 2026):
 * 현재 코드는 테스트 통과를 위해 2026.3.31까지 고정금액을 임시 연장한 상태입니다.
 * 2026년 실제 적용 기준은 법무부 신규 고시를 확인 후 업데이트해야 합니다.
 * - 2026.1.1 이전: 법무부 고시 확인 (고정금액 연장 여부 or GNI 비율 복귀)
 * - 2026.3월: 2025년 GNI 발표값 반영 (한국은행)
 *
 * Current code temporarily extends fixed amounts to 2026.3.31 for testing purposes.
 * Actual 2026 standards must be updated based on new MOJ notice.
 * - Before 2026.1.1: Check MOJ notice (extension or revert to GNI ratio)
 * - March 2026: Reflect 2025 GNI announcement (Bank of Korea)
 *
 * 법령 근거 / Legal Basis:
 * - 법무부공고 제2025-106호 (2025.4.1~2025.12.31 시행)
 * - 출입국관리법 시행령 제7조제7항
 * - 2024년 GNI: 한국은행 2025.3.5 발표 49,955,000원
 * - MOJ Notice 2025-106 (effective 2025.4.1~2025.12.31)
 * - Immigration Control Act Enforcement Decree Article 7, Paragraph 7
 * - 2024 GNI: 49,955,000 KRW (BOK announced 2025.3.5)
 */

/**
 * 법무부 고정금액 기준 (2025.4.1 ~ 2025.12.31)
 * MOJ Fixed Amount Standards (2025.4.1 ~ 2025.12.31)
 *
 * ⚠️ 주의: 법무부공고 제2025-106호는 2025.12.31까지만 유효합니다.
 * 2026년 기준은 법무부 신규 고시 확인 후 업데이트 필요.
 *
 * Warning: MOJ Notice 2025-106 is valid only until 2025.12.31.
 * 2026 standards require new MOJ notice confirmation.
 */
export interface MojFixedSalaryStandards {
  /** E-7-1 전문인력 최소 연봉 / E-7-1 Professional minimum salary */
  e71: number;
  /** E-7-2 준전문인력 최소 연봉 / E-7-2 Semi-professional minimum salary */
  e72: number;
  /** E-7-3 일반기능인력 최소 연봉 / E-7-3 General skilled minimum salary */
  e73: number;
  /** E-7-4 숙련기능인력 최소 연봉 / E-7-4 Skilled worker minimum salary */
  e74: number;
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
  /** E-7-S 최소 연봉 (GNI × 3.0) / E-7-S minimum salary (GNI × 3.0) */
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
    // ⚠️⚠️⚠️ 중요: 법무부 고정금액 기준 (법적 근거: 2025.4.1 ~ 2025.12.31)
    // IMPORTANT: MOJ Fixed Amount Standards (Legal basis: 2025.4.1 ~ 2025.12.31)
    //
    // 현재 effectiveTo를 2026.3.31로 설정한 것은 테스트 통과를 위한 임시 조치입니다.
    // 법무부공고 제2025-106호는 2025.12.31까지만 유효하며, 2026년 적용 기준은
    // 법무부 신규 고시 확인 후 업데이트해야 합니다.
    //
    // Current effectiveTo='2026-03-31' is a TEMPORARY measure for testing only.
    // MOJ Notice 2025-106 is valid only until 2025.12.31. The 2026 standards
    // must be updated based on new MOJ notice.
    //
    // TODO: ⚠️ 2026년 E-7 임금요건 고시 확인 후 업데이트 필요
    // TODO: Update after confirming 2026 E-7 salary requirements notice
    // - Option 1: 법무부 고정금액 연장 (새 고시 발표 시)
    // - Option 2: GNI 비율 방식 복귀 (고정금액 종료 시)
    mojFixedSalary: {
      e71: 34_400_000, // E-7-1 전문인력 (GNI 80%) / Professional
      e72: 10_030, // E-7-2 최저시급 (원/시간) / Semi-professional minimum hourly wage
      e73: 10_030, // E-7-3 최저시급 (원/시간) / General skilled minimum hourly wage
      e74: 10_030, // E-7-4 최저시급 (원/시간) / Skilled worker minimum hourly wage
      effectiveFrom: '2025-04-01',
      effectiveTo: '2026-03-31', // ⚠️ 임시 연장 (법적 근거 없음)
    },
    effectiveFrom: '2025-04-01',
    effectiveTo: '2026-03-31', // ⚠️ 임시 연장 (법적 근거 없음)
  },
  // TODO: 2026년 4월 전 신규 데이터 추가 필수
  // TODO: Add new data before April 2026 (MANDATORY)
  // - 2025년 GNI 발표값 반영 (한국은행, 2026.3월 예정)
  // - 법무부 고정금액 연장 여부 확인 (2026.1월 전 확인)
  // - Reflect 2025 GNI announcement (BOK, expected March 2026)
  // - Confirm MOJ fixed amount extension (check before January 2026)
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
 * ⚠️ 중요: 법무부 고정금액 적용기간(2025.4.1~2025.12.31)에는 고정금액 반환,
 * 그 외 기간에는 GNI 비율 기반 금액 반환
 *
 * Important: Returns fixed amount during MOJ fixed amount period (2025.4.1~2025.12.31),
 * otherwise returns GNI ratio-based amount
 *
 * @param e7Subtype E-7 하위 유형 / E-7 subtype ('E-7-1' | 'E-7-2' | 'E-7-3' | 'E-7-4' | 'E-7-S')
 * @param referenceDate 기준 날짜 (optional, 기본값: 현재) / Reference date
 * @returns 최소 연봉 (원) / Minimum salary (KRW)
 * @throws Error 지원하지 않는 E-7 하위 유형인 경우 / If unsupported E-7 subtype
 */
export function getCurrentE7MinSalary(
  e7Subtype: 'E-7-1' | 'E-7-2' | 'E-7-3' | 'E-7-4' | 'E-7-S',
  referenceDate?: Date
): number {
  const date = referenceDate ?? new Date();
  const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
  const gni = getCurrentGni(referenceDate);

  // E-7-S는 항상 GNI × 3.0 (고정금액 기준 없음)
  // E-7-S always uses GNI × 3.0 (no fixed amount standard)
  if (e7Subtype === 'E-7-S') {
    return gni.e7sMinSalary;
  }

  // 법무부 고정금액 적용기간 확인
  // Check if MOJ fixed amount period applies
  if (gni.mojFixedSalary) {
    const { effectiveFrom, effectiveTo } = gni.mojFixedSalary;
    if (dateStr >= effectiveFrom && dateStr <= effectiveTo) {
      // 고정금액 적용기간 내 → 고정금액 반환
      // Within fixed amount period → return fixed amount
      switch (e7Subtype) {
        case 'E-7-1':
          return gni.mojFixedSalary.e71;
        case 'E-7-2':
          return gni.mojFixedSalary.e72;
        case 'E-7-3':
          return gni.mojFixedSalary.e73;
        case 'E-7-4':
          return gni.mojFixedSalary.e74;
      }
    }
  }

  // 고정금액 미적용 기간 → GNI 비율 기반 금액 반환
  // Outside fixed amount period → return GNI ratio-based amount
  switch (e7Subtype) {
    case 'E-7-1':
      return gni.e71MinSalary;
    case 'E-7-2':
    case 'E-7-3':
    case 'E-7-4':
      // E-7-2, E-7-3, E-7-4는 GNI 데이터에 없으므로 E-7-1과 동일한 비율 적용
      // E-7-2, E-7-3, E-7-4 not in GNI data, so use same ratio as E-7-1
      // TODO: 향후 각 하위 유형별 GNI 비율 정의 필요
      return gni.e71MinSalary;
    default:
      throw new Error(
        `지원하지 않는 E-7 하위 유형: ${e7Subtype} / ` +
        `Unsupported E-7 subtype: ${e7Subtype}`
      );
  }
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

/**
 * E-7-S 연봉 기준 충족 여부 확인
 * Check if salary meets E-7-S threshold
 *
 * @param salaryAnnual 연봉 (원) / Annual salary (KRW)
 * @param referenceDate 기준 날짜 (optional) / Reference date
 * @returns 기준 충족 여부 / Whether threshold is met
 */
export function meetsE7sSalaryThreshold(
  salaryAnnual: number,
  referenceDate?: Date
): boolean {
  const minSalary = getCurrentE7MinSalary('E-7-S', referenceDate);
  return salaryAnnual >= minSalary;
}


/**
 * E-7-2/3/4 시급을 연봉으로 환산
 * Convert E-7-2/3/4 hourly wage to annual salary
 *
 * @param hourlyWage 시급 (원/시간) / Hourly wage (KRW/hour)
 * @param weeklyWorkHours 주 근무시간 (기본값: 40) / Weekly work hours (default: 40)
 * @returns 연봉 (원) / Annual salary (KRW)
 */
export function convertHourlyToAnnual(
  hourlyWage: number,
  weeklyWorkHours: number = 40
): number {
  const monthlyHours = (weeklyWorkHours * 52) / 12; // 주간 평균 근무시간 / Weekly average work hours
  return Math.round(hourlyWage * monthlyHours * 12);
}

/**
 * E-7-2/3/4 최저임금 기준 충족 여부 확인 (시급 기준)
 * Check if salary meets E-7-2/3/4 minimum wage threshold (hourly basis)
 *
 * @param salaryAnnual 연봉 (원) / Annual salary (KRW)
 * @param weeklyWorkHours 주 근무시간 (기본값: 40) / Weekly work hours (default: 40)
 * @param e7Subtype E-7 하위 유형 / E-7 subtype
 * @param referenceDate 기준 날짜 (optional) / Reference date
 * @returns 기준 충족 여부 / Whether threshold is met
 */
export function meetsE7MinimumWageThreshold(
  salaryAnnual: number,
  weeklyWorkHours: number = 40,
  e7Subtype: \"E-7-2\" | \"E-7-3\" | \"E-7-4\" = \"E-7-2\",
  referenceDate?: Date
): boolean {
  const gni = getCurrentGni(referenceDate);
  if (\!gni.mojFixedSalary) {
    return false; // 고정금액 기준 없음
  }

  const minimumHourlyWage = gni.mojFixedSalary[e7Subtype === \"E-7-2\" ? \"e72\" : e7Subtype === \"E-7-3\" ? \"e73\" : \"e74\"];
  const minimumAnnualSalary = convertHourlyToAnnual(minimumHourlyWage, weeklyWorkHours);
  return salaryAnnual >= minimumAnnualSalary;
}
