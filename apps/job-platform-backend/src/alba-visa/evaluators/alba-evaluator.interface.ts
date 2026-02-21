/**
 * 알바 비자 매칭 엔진 — 인터페이스 정의
 * Alba Visa Matching Engine — Interface Definitions
 *
 * 정규직 매칭 엔진(IVisaEvaluator)과 완전 분리된 알바 전용 인터페이스.
 * Completely separate from full-time matching engine (IVisaEvaluator).
 *
 * 정규직: "이 사람의 조건으로 취업비자 발급이 가능한가?"
 * Full-time: "Can this person get a work visa with their qualifications?"
 *
 * 알바: "이 사람의 현재 비자로 이 알바가 가능한가?"
 * Part-time: "Can this person work this part-time job with their current visa?"
 */

// === 스케줄 항목 / Schedule Item ===
export interface AlbaScheduleItem {
  /** 근무 요일 / Day of week */
  dayOfWeek: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  /** 근무 시작 시간 (HH:mm) / Work start time */
  startTime: string;
  /** 근무 종료 시간 (HH:mm) / Work end time */
  endTime: string;
}

// === 근무지 주소 / Workplace Address ===
export interface AlbaWorkAddress {
  /** 시/도 / Province/City */
  sido: string;
  /** 시/군/구 / District */
  sigungu: string;
  /** 상세주소 / Detailed address */
  detail: string;
  /** 위도 / Latitude */
  lat: number;
  /** 경도 / Longitude */
  lng: number;
}

// === 알바 공고 입력 데이터 (매칭 엔진에 전달) / Alba Job Input (passed to matching engine) ===
export interface AlbaJobInput {
  /** 플랫폼 직종 코드 / Platform job category code */
  jobCategoryCode: string;
  /** 자동 매핑된 KSIC 대분류 코드 / Auto-mapped KSIC section code */
  ksicCode: string;
  /** 주당 총 근무시간 / Total weekly work hours */
  weeklyHours: number;
  /** 주말만 근무 여부 (schedule 기반 자동 계산) / Weekend-only flag (auto-calculated from schedule) */
  isWeekendOnly: boolean;
  /** 평일 근무 포함 여부 (자동 계산) / Whether weekday shifts are included (auto-calculated) */
  hasWeekdayShift: boolean;
  /** 근무지 주소 / Workplace address */
  workAddress: AlbaWorkAddress & {
    /** 인구감소지역 여부 (자동 판별) / Depopulation area flag (auto-determined) */
    isDepopulationArea: boolean;
  };
  /** 시급 (원, 정수) / Hourly wage (KRW, integer) */
  hourlyWage: number;
  /** 근무 시작일 / Work start date */
  startDate: string;
  /** 근무 종료일 (null = 채용시까지) / Work end date (null = until filled) */
  endDate?: string | null;
  /** 근무 스케줄 / Work schedule */
  schedule: AlbaScheduleItem[];
}

// === 비자별 매칭 평가 결과 / Per-visa Matching Evaluation Result ===
export interface AlbaVisaEvalResult {
  /** 비자 코드 / Visa code */
  visaCode: string;
  /** 비자 한글명 / Visa name in Korean */
  visaName: string;
  /** 비자 영문명 / Visa name in English */
  visaNameEn: string;
  /** 매칭 상태 / Match status */
  status: 'eligible' | 'conditional' | 'blocked';
  /** 조건부일 때 조건 목록 / Conditions when status is conditional */
  conditions: string[];
  /** 불가일 때 사유 목록 / Reasons when status is blocked */
  blockReasons: string[];
  /** 필요한 허가 유형 / Required permit type */
  requiredPermit: string | null;
  /** 해당 비자의 최대 주당 근무시간 (null = 무제한) / Max weekly hours (null = unlimited) */
  maxWeeklyHours: number | null;
  /** 동시 근무 가능 사업장 수 (null = 무제한) / Max concurrent workplaces (null = unlimited) */
  maxWorkplaces: number | null;
  /** 참고사항 / Additional notes */
  notes: string | null;
}

/**
 * 알바 비자 평가기 인터페이스
 * Alba Visa Evaluator Interface
 *
 * 각 비자 유형별로 구현되는 Strategy Pattern.
 * Strategy Pattern implemented per visa type.
 */
export interface IAlbaVisaEvaluator {
  /** 이 evaluator가 처리하는 비자 코드 / Visa codes handled by this evaluator */
  readonly visaCode: string;
  /** 비자 한글명 / Visa name in Korean */
  readonly visaName: string;
  /** 비자 영문명 / Visa name in English */
  readonly visaNameEn: string;

  /**
   * 알바 적격성 평가 실행
   * Execute alba eligibility evaluation
   *
   * @param input 알바 공고 데이터 / Alba job posting data
   * @returns 비자별 매칭 결과 / Per-visa matching result
   */
  evaluate(input: AlbaJobInput): AlbaVisaEvalResult;
}

/**
 * 빈 평가 결과 생성 헬퍼
 * Helper to create empty evaluation result
 */
export function createEmptyAlbaResult(
  visaCode: string,
  visaName: string,
  visaNameEn: string,
): AlbaVisaEvalResult {
  return {
    visaCode,
    visaName,
    visaNameEn,
    status: 'blocked',
    conditions: [],
    blockReasons: [],
    requiredPermit: null,
    maxWeeklyHours: null,
    maxWorkplaces: null,
    notes: null,
  };
}
