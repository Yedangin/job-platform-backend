/**
 * 연도별 최저임금 기준 데이터
 * Annual Minimum Wage Standards Data
 *
 * @legalBasis    최저임금법 제10조 / Minimum Wage Act Article 10
 * @conditionSummary
 *   - 모든 사업장에 동일 적용 (업종별 구분 폐지, 2019~)
 *     Uniform application to all workplaces (industry-specific rates abolished since 2019)
 *   - 매년 8월 5일까지 고시, 다음 해 1월 1일 시행
 *     Announced by August 5 each year, effective January 1 of the following year
 *   - 수습 3개월 이내: 최저임금의 90% 적용 가능 (1년 이상 근로계약 체결 시)
 *     Probation within 3 months: 90% of minimum wage applicable (for contracts of 1+ year)
 * @lastVerified  2026-02-23
 */

/**
 * 최저임금 데이터 인터페이스
 * Minimum wage data interface
 */
export interface MinimumWageData {
  /** 적용 연도 / Applicable year */
  year: number;
  /** 시급 (원) / Hourly wage (KRW) */
  hourlyWage: number;
  /** 일급 (원, 8시간 기준) / Daily wage (KRW, based on 8 hours) */
  dailyWage: number;
  /** 월급 (원, 주 40시간, 월 209시간 기준) / Monthly wage (KRW, 40h/week, 209h/month) */
  monthlyWage: number;
  /** 시행일 / Effective from */
  effectiveFrom: string;
  /** 종료일 / Effective to */
  effectiveTo: string;
  /** 법적 근거 / Legal basis */
  legalBasis: string;
}

/**
 * 연도별 최저임금 테이블
 * Minimum wage table by year
 *
 * 매년 1월 1일부터 12월 31일까지 적용.
 * Applied from January 1 to December 31 each year.
 */
export const MINIMUM_WAGE_TABLE: ReadonlyArray<MinimumWageData> = [
  {
    year: 2024,
    hourlyWage: 9_860,
    dailyWage: 9_860 * 8, // 78,880원
    monthlyWage: 9_860 * 209, // 2,060,740원
    effectiveFrom: '2024-01-01',
    effectiveTo: '2024-12-31',
    legalBasis: '최저임금법 제10조, 고용노동부 고시 제2023-XX호',
  },
  {
    year: 2025,
    hourlyWage: 10_030,
    dailyWage: 10_030 * 8, // 80,240원
    monthlyWage: 10_030 * 209, // 2,096,270원
    effectiveFrom: '2025-01-01',
    effectiveTo: '2025-12-31',
    legalBasis: '최저임금법 제10조, 고용노동부 고시 제2024-XX호',
  },
  {
    // TODO: 2026년 최저임금 확정 시 업데이트 필요
    // TODO: Update when 2026 minimum wage is confirmed
    // 현재 2025년 값을 임시 적용 (placeholder)
    // Currently using 2025 value as placeholder
    year: 2026,
    hourlyWage: 10_030,
    dailyWage: 10_030 * 8,
    monthlyWage: 10_030 * 209,
    effectiveFrom: '2026-01-01',
    effectiveTo: '2026-12-31',
    legalBasis: '최저임금법 제10조 (2026년 고시 미발표 — placeholder)',
  },
];

/**
 * 현재 적용 최저임금 조회
 * Get current applicable minimum wage
 *
 * @param referenceDate 기준 날짜 (optional, 기본값: 현재) / Reference date
 * @returns 현재 적용 최저임금 데이터 / Current minimum wage data
 * @throws Error 적용 가능한 최저임금 데이터가 없는 경우 / If no applicable data found
 */
export function getCurrentMinimumWage(referenceDate?: Date): MinimumWageData {
  const date = referenceDate ?? new Date();
  const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD

  const applicable = MINIMUM_WAGE_TABLE.find(
    (mw) => dateStr >= mw.effectiveFrom && dateStr <= mw.effectiveTo,
  );

  if (!applicable) {
    throw new Error(
      `적용 가능한 최저임금 데이터를 찾을 수 없습니다. 기준일: ${dateStr} / ` +
        `No applicable minimum wage data found for date: ${dateStr}`,
    );
  }

  return applicable;
}

/**
 * 특정 연도의 최저임금 조회
 * Get minimum wage data for a specific year
 *
 * @param year 연도 / Year
 * @returns 최저임금 데이터 또는 undefined / Minimum wage data or undefined
 */
export function getMinimumWageByYear(
  year: number,
): MinimumWageData | undefined {
  return MINIMUM_WAGE_TABLE.find((mw) => mw.year === year);
}

/**
 * 시급이 최저임금 이상인지 확인
 * Check if hourly wage meets minimum wage standard
 *
 * @param hourlyWage 시급 (원) / Hourly wage (KRW)
 * @param referenceDate 기준 날짜 (optional) / Reference date
 * @returns 최저임금 충족 여부 / Whether minimum wage is met
 */
export function meetsMinimumWage(
  hourlyWage: number,
  referenceDate?: Date,
): boolean {
  const mw = getCurrentMinimumWage(referenceDate);
  return hourlyWage >= mw.hourlyWage;
}
