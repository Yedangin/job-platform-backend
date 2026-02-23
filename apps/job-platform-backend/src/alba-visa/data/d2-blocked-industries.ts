/**
 * D-2 유학비자 금지/제한 업종 목록
 * D-2 Study Visa Blocked/Restricted Industry List
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제23조 (체류자격외활동허가)
 * Immigration Control Act Enforcement Decree Article 23 (Extra-status Activity Permit)
 * 법무부 고시 — 외국인유학생 시간제취업 허용 범위 및 절차
 * Ministry of Justice Notice — Scope and Procedures for Part-time Employment of Foreign Students
 *
 * [업데이트 방법 / How to update]
 * 법무부 고시 개정 시 이 파일의 목록을 업데이트.
 * 추후 DB 테이블(ProhibitedIndustry)로 마이그레이션 가능.
 * Update this list when MOJ notices are amended.
 * Can be migrated to DB table (ProhibitedIndustry) later.
 */

// ============================================================================
// D-2 전면 금지 업종 (KSIC 코드 기준)
// D-2 fully blocked industries (by KSIC code)
//
// 어떤 TOPIK 등급이든 이 업종에서는 취업 불가
// Employment prohibited in these industries regardless of TOPIK level
// ============================================================================

/**
 * 금지 업종 항목의 심각도 분류
 * Severity classification for blocked industry entries
 *
 * - ABSOLUTE: 1차 적발 즉시 출국명령 / Immediate deportation on first offense
 * - FULL: 전면 금지, 예외 없음 / Full block, no exceptions
 */
export type D2BlockSeverity = 'ABSOLUTE' | 'FULL';

export const D2_BLOCKED_KSIC_CODES: ReadonlyArray<{
  /** KSIC 대분류 코드 / KSIC section code */
  ksicCode: string;
  /** 사유 (한글) / Reason (Korean) */
  reasonKo: string;
  /** 사유 (영어) / Reason (English) */
  reasonEn: string;
  /** 심각도 / Severity level */
  severity: D2BlockSeverity;
  /** 위반 시 처벌 (한글) / Penalty on violation (Korean) */
  penaltyKo: string;
  /** 위반 시 처벌 (영어) / Penalty on violation (English) */
  penaltyEn: string;
}> = [
  // === 건설업 — 절대 금지 / Construction — ABSOLUTE block ===
  {
    ksicCode: 'F',
    reasonKo:
      'D-2 비자는 건설업 취업이 전면 금지됩니다 (1차 적발 즉시 출국명령)',
    reasonEn:
      'D-2 visa absolutely prohibits all construction industry employment (immediate deportation on first offense)',
    severity: 'ABSOLUTE',
    penaltyKo:
      '1차 적발 즉시 출국명령. 고용주: 3년 이하 징역 또는 3,000만원 이하 벌금 + 최대 3년 외국인 고용 금지',
    penaltyEn:
      'Immediate deportation order on first offense. Employer: up to 3 years prison or 30M KRW fine + up to 3-year ban on hiring foreigners',
  },

  // === 유흥업소 — 전면 금지 / Entertainment venues — FULL block ===
  // 노래방, 유흥주점, 단란주점, 마사지업, PC방, 무도장
  // Karaoke, entertainment bars, hostess bars, massage parlors, PC cafes, dance halls
  {
    ksicCode: 'I_ENT',
    reasonKo:
      'D-2 비자는 유흥업소(노래방, 유흥주점, 단란주점, 마사지업, PC방, 무도장) 취업이 전면 금지됩니다',
    reasonEn:
      'D-2 visa prohibits all entertainment venue employment (karaoke, entertainment bars, hostess bars, massage parlors, PC cafes, dance halls)',
    severity: 'FULL',
    penaltyKo:
      '유학생: 1차 위반 시 1년 취업 제한, 2차 위반 시 강제퇴거. 고용주: 3년 이하 징역 또는 3,000만원 이하 벌금',
    penaltyEn:
      'Student: 1st offense 1-year employment restriction, 2nd offense deportation. Employer: up to 3 years prison or 30M KRW fine',
  },
] as const;

// ============================================================================
// D-2 배달/긱워크 전면 금지 플래그
// D-2 delivery/gig work full block flag
//
// 특수형태근로종사자 (택배, 배달대행, 대리기사 등) 전면 금지
// Platform/gig workers (parcel delivery, food delivery agents, designated drivers, etc.) fully blocked
// ============================================================================

/**
 * D-2 배달 전문 금지 플래그
 * D-2 delivery-only block flag
 *
 * 직종코드의 isDelivery=true인 경우 금지
 * Blocked when job category has isDelivery=true
 */
export const D2_BLOCK_DELIVERY = true;

/**
 * D-2 긱워크 전면 금지 플래그
 * D-2 gig work full block flag
 *
 * 특수형태근로종사자: 택배기사, 배달대행, 대리기사 등
 * Platform/gig workers: parcel couriers, delivery agents, designated drivers, etc.
 * 예외 없음 / No exceptions
 */
export const D2_BLOCK_GIG_WORK = true;

/**
 * D-2 파견/도급/알선 금지 플래그
 * D-2 dispatch/outsourcing/placement block flag
 *
 * 파견·도급·알선 관계 취업 전면 금지
 * Dispatch, outsourcing, and job placement employment fully blocked
 * 예외: 법무부 지정 산학연계 인턴만 허용
 * Exception: Only MOJ-designated industry-academia internships allowed
 */
export const D2_BLOCK_DISPATCH_OUTSOURCING = true;

// ============================================================================
// D-2 조건부 허용 업종 (TOPIK 4급 이상 필요)
// D-2 conditionally allowed industries (requires TOPIK 4+)
// ============================================================================
export const D2_CONDITIONAL_KSIC_CODES: ReadonlyArray<{
  /** KSIC 대분류 코드 / KSIC section code */
  ksicCode: string;
  /** 필요 TOPIK 등급 / Required TOPIK level */
  requiredTopikLevel: number;
  /** 사유 (한글) / Reason (Korean) */
  reasonKo: string;
  /** 사유 (영어) / Reason (English) */
  reasonEn: string;
}> = [
  {
    ksicCode: 'C',
    requiredTopikLevel: 4,
    reasonKo:
      '제조업은 TOPIK 4급 이상 소지자만 취업 가능합니다 (비전문취업(E-9) 해당 업종 예외)',
    reasonEn:
      'Manufacturing industry requires TOPIK level 4 or above (exception from E-9 non-professional employment restriction)',
  },
] as const;

// ============================================================================
// D-2 하위유형별 허용/차단 규칙
// D-2 sub-type permission rules
//
// D-2-5(연구)는 연구 수당 수령 중이므로 시간제취업 불허
// D-2-5 (Research) is blocked because they receive research stipends
//
// D-2-8(단기유학)은 입국일/자격변경일로부터 6개월 경과 후 허용
// D-2-8 (Short-term study) allowed only after 6 months from entry/status change
// ============================================================================

export type D2SubTypePermission = 'allowed' | 'blocked' | 'waiting_period';

export interface D2SubTypeRule {
  /** D-2 하위유형 코드 / D-2 sub-type code */
  subType: string;
  /** 한글명 / Korean name */
  nameKo: string;
  /** 영문명 / English name */
  nameEn: string;
  /** 허용 상태 / Permission status */
  permission: D2SubTypePermission;
  /** 필요 TOPIK 등급 (최소) / Required minimum TOPIK level */
  requiredTopikMin: number;
  /** 대기기간 (일, 0 = 없음) / Waiting period (days, 0 = none) */
  waitingPeriodDays: number;
  /** 사유 (한글) / Reason (Korean) */
  reasonKo: string;
  /** 사유 (영어) / Reason (English) */
  reasonEn: string;
}

export const D2_SUB_TYPE_RULES: ReadonlyArray<D2SubTypeRule> = [
  {
    subType: 'D-2-1',
    nameKo: '전문학사',
    nameEn: 'Associate Degree',
    permission: 'allowed',
    requiredTopikMin: 3,
    waitingPeriodDays: 0,
    reasonKo: 'TOPIK 3급 이상 필요',
    reasonEn: 'Requires TOPIK level 3+',
  },
  {
    subType: 'D-2-2',
    nameKo: '학사',
    nameEn: "Bachelor's Degree",
    permission: 'allowed',
    requiredTopikMin: 3, // 1~2학년: 3+, 3~4학년: 4+ (학년별 차등은 hour rule에서 처리)
    waitingPeriodDays: 0,
    reasonKo: '1~2학년 TOPIK 3급+, 3~4학년 TOPIK 4급+',
    reasonEn: '1st-2nd year TOPIK 3+, 3rd-4th year TOPIK 4+',
  },
  {
    subType: 'D-2-3',
    nameKo: '석사',
    nameEn: "Master's Degree",
    permission: 'allowed',
    requiredTopikMin: 4,
    waitingPeriodDays: 0,
    reasonKo: 'TOPIK 4급 이상 필요',
    reasonEn: 'Requires TOPIK level 4+',
  },
  {
    subType: 'D-2-4',
    nameKo: '박사',
    nameEn: 'Doctoral Degree',
    permission: 'allowed',
    requiredTopikMin: 4,
    waitingPeriodDays: 0,
    reasonKo: 'TOPIK 4급 이상 필요',
    reasonEn: 'Requires TOPIK level 4+',
  },
  {
    subType: 'D-2-5',
    nameKo: '연구',
    nameEn: 'Research',
    permission: 'blocked',
    requiredTopikMin: 0,
    waitingPeriodDays: 0,
    reasonKo: '연구 수당 수령 중 — 추가 시간제취업 불허',
    reasonEn:
      'Receiving research stipend — additional part-time employment not permitted',
  },
  {
    subType: 'D-2-6',
    nameKo: '교환학생',
    nameEn: 'Exchange Student',
    permission: 'allowed',
    requiredTopikMin: 3,
    waitingPeriodDays: 0,
    reasonKo: '별도 대기기간 없음',
    reasonEn: 'No additional waiting period',
  },
  {
    subType: 'D-2-7',
    nameKo: '산학연계',
    nameEn: 'Industry-Academia',
    permission: 'allowed',
    requiredTopikMin: 3,
    waitingPeriodDays: 0,
    reasonKo: '별도 대기기간 없음',
    reasonEn: 'No additional waiting period',
  },
  {
    subType: 'D-2-8',
    nameKo: '단기유학',
    nameEn: 'Short-term Study',
    permission: 'waiting_period',
    requiredTopikMin: 3,
    waitingPeriodDays: 180, // 6개월 / 6 months
    reasonKo: '입국일/자격변경일로부터 6개월 경과 후 허용',
    reasonEn: 'Allowed only after 6 months from date of entry or status change',
  },
] as const;

// ============================================================================
// D-2 TOPIK 등급별 주당 허용시간 매트릭스 (2025년)
// D-2 TOPIK-based weekly hour limit matrix (2025)
//
// [법적 근거 / Legal Basis]
// 법무부 「외국인유학생 시간제취업 허용범위 등에 관한 고시」
// MOJ Notice on Part-time Employment Scope for Foreign Students
//
// 주말/공휴일: TOPIK 충족 시 무제한, 미충족 시 허용시간의 1/2
// Weekends/holidays: Unlimited when TOPIK met, half when not met
//
// 방학: TOPIK 충족 시 무제한, 미충족 시 허용시간의 1/2
// Vacation: Unlimited when TOPIK met, half when not met
//
// 우대조건: 인증대학 재학 / 직전학기 A학점 이상 / TOPIK 5급 이상
// Bonus conditions: Certified university / Previous semester GPA A+ / TOPIK 5+
// 하나 해당 시 +5시간 / +5 hours if any one condition met
// ============================================================================

export interface D2HourRule {
  /** 학년/과정 / Academic year/program */
  schoolYear: string;
  /** TOPIK 등급 구간 하한 (이상) / TOPIK level lower bound (inclusive) */
  topikLevelMin: number;
  /** TOPIK 등급 구간 상한 (이하) / TOPIK level upper bound (inclusive) */
  topikLevelMax: number;
  /** 학기 중 기본 주당 시간 / Base weekly hours during semester */
  maxWeeklyHours: number;
  /** 우대조건 충족 시 주당 시간 / Weekly hours with bonus conditions met */
  maxWeeklyHoursWithBonus: number;
  /** TOPIK 미충족 시 주당 시간 / Weekly hours when TOPIK not met */
  noTopikWeeklyHours: number;
  /** 방학 중 TOPIK 충족 시 무제한 여부 / Unlimited during vacation when TOPIK met */
  vacationUnlimited: boolean;
  /** 방학 중 TOPIK 미충족 시 주당 시간 / Vacation weekly hours when TOPIK not met */
  vacationNoTopikWeeklyHours: number;
  /** 주말/공휴일 TOPIK 충족 시 무제한 여부 / Unlimited on weekends/holidays when TOPIK met */
  weekendUnlimited: boolean;
  /** 주말/공휴일 TOPIK 미충족 시 주당 시간 / Weekend hours when TOPIK not met */
  weekendNoTopikWeeklyHours: number;
  /** 필요 최소 TOPIK 등급 (충족 기준) / Required minimum TOPIK level for this tier */
  requiredTopikForTier: number;
  /** 설명 (한글) / Description (Korean) */
  descKo: string;
  /** 설명 (영어) / Description (English) */
  descEn: string;
}

/**
 * D-2 시간제한 규칙 (2025년 매트릭스)
 * D-2 hour limit rules (2025 matrix)
 *
 * 매칭 시: 학년+TOPIK으로 해당하는 규칙 찾아 maxWeeklyHours 결정
 * During matching: find rule by schoolYear + TOPIK to determine maxWeeklyHours
 *
 * 우대조건 (+5시간):
 * - 인증대학 재학 / Enrolled in certified university
 * - 직전학기 A학점(GPA 4.0) 이상 / Previous semester GPA A or above
 * - TOPIK 5급 이상 / TOPIK level 5 or above
 * 위 3가지 중 하나만 충족하면 +5시간
 * +5 hours if any ONE of the above 3 conditions is met
 */
export const D2_HOUR_RULES: ReadonlyArray<D2HourRule> = [
  // ============================
  // 박사과정 (TOPIK 4급+)
  // Doctoral program (TOPIK 4+)
  // ============================
  {
    schoolYear: 'DOCTORAL',
    topikLevelMin: 4,
    topikLevelMax: 6,
    maxWeeklyHours: 30,
    maxWeeklyHoursWithBonus: 35,
    noTopikWeeklyHours: 15,
    vacationUnlimited: true,
    vacationNoTopikWeeklyHours: 15,
    weekendUnlimited: true,
    weekendNoTopikWeeklyHours: 15,
    requiredTopikForTier: 4,
    descKo: '박사 TOPIK 4급+: 기본 주 30시간 / 우대 주 35시간',
    descEn: 'Doctoral TOPIK 4+: base 30h/week / bonus 35h/week',
  },
  {
    schoolYear: 'DOCTORAL',
    topikLevelMin: 0,
    topikLevelMax: 3,
    maxWeeklyHours: 15,
    maxWeeklyHoursWithBonus: 15,
    noTopikWeeklyHours: 15,
    vacationUnlimited: false,
    vacationNoTopikWeeklyHours: 15,
    weekendUnlimited: false,
    weekendNoTopikWeeklyHours: 15,
    requiredTopikForTier: 4,
    descKo: '박사 TOPIK 미충족(4급 미만): 주 15시간',
    descEn: 'Doctoral TOPIK not met (below 4): 15h/week',
  },

  // ============================
  // 석사과정 (TOPIK 4급+)
  // Master's program (TOPIK 4+)
  // ============================
  {
    schoolYear: 'MASTER',
    topikLevelMin: 4,
    topikLevelMax: 6,
    maxWeeklyHours: 25,
    maxWeeklyHoursWithBonus: 30,
    noTopikWeeklyHours: 15,
    vacationUnlimited: true,
    vacationNoTopikWeeklyHours: 15,
    weekendUnlimited: true,
    weekendNoTopikWeeklyHours: 15,
    requiredTopikForTier: 4,
    descKo: '석사 TOPIK 4급+: 기본 주 25시간 / 우대 주 30시간',
    descEn: "Master's TOPIK 4+: base 25h/week / bonus 30h/week",
  },
  {
    schoolYear: 'MASTER',
    topikLevelMin: 0,
    topikLevelMax: 3,
    maxWeeklyHours: 15,
    maxWeeklyHoursWithBonus: 15,
    noTopikWeeklyHours: 15,
    vacationUnlimited: false,
    vacationNoTopikWeeklyHours: 15,
    weekendUnlimited: false,
    weekendNoTopikWeeklyHours: 15,
    requiredTopikForTier: 4,
    descKo: '석사 TOPIK 미충족(4급 미만): 주 15시간',
    descEn: "Master's TOPIK not met (below 4): 15h/week",
  },

  // ============================
  // 학부 3~4학년 (TOPIK 4급+)
  // Undergraduate 3rd-4th year (TOPIK 4+)
  // ============================
  {
    schoolYear: 'YEAR_4',
    topikLevelMin: 4,
    topikLevelMax: 6,
    maxWeeklyHours: 20,
    maxWeeklyHoursWithBonus: 25,
    noTopikWeeklyHours: 10,
    vacationUnlimited: true,
    vacationNoTopikWeeklyHours: 10,
    weekendUnlimited: true,
    weekendNoTopikWeeklyHours: 10,
    requiredTopikForTier: 4,
    descKo: '학부 4학년 TOPIK 4급+: 기본 주 20시간 / 우대 주 25시간',
    descEn: '4th year TOPIK 4+: base 20h/week / bonus 25h/week',
  },
  {
    schoolYear: 'YEAR_4',
    topikLevelMin: 0,
    topikLevelMax: 3,
    maxWeeklyHours: 10,
    maxWeeklyHoursWithBonus: 10,
    noTopikWeeklyHours: 10,
    vacationUnlimited: false,
    vacationNoTopikWeeklyHours: 10,
    weekendUnlimited: false,
    weekendNoTopikWeeklyHours: 10,
    requiredTopikForTier: 4,
    descKo: '학부 4학년 TOPIK 미충족(4급 미만): 주 10시간',
    descEn: '4th year TOPIK not met (below 4): 10h/week',
  },
  {
    schoolYear: 'YEAR_3',
    topikLevelMin: 4,
    topikLevelMax: 6,
    maxWeeklyHours: 20,
    maxWeeklyHoursWithBonus: 25,
    noTopikWeeklyHours: 10,
    vacationUnlimited: true,
    vacationNoTopikWeeklyHours: 10,
    weekendUnlimited: true,
    weekendNoTopikWeeklyHours: 10,
    requiredTopikForTier: 4,
    descKo: '학부 3학년 TOPIK 4급+: 기본 주 20시간 / 우대 주 25시간',
    descEn: '3rd year TOPIK 4+: base 20h/week / bonus 25h/week',
  },
  {
    schoolYear: 'YEAR_3',
    topikLevelMin: 0,
    topikLevelMax: 3,
    maxWeeklyHours: 10,
    maxWeeklyHoursWithBonus: 10,
    noTopikWeeklyHours: 10,
    vacationUnlimited: false,
    vacationNoTopikWeeklyHours: 10,
    weekendUnlimited: false,
    weekendNoTopikWeeklyHours: 10,
    requiredTopikForTier: 4,
    descKo: '학부 3학년 TOPIK 미충족(4급 미만): 주 10시간',
    descEn: '3rd year TOPIK not met (below 4): 10h/week',
  },

  // ============================
  // 전문학사/학부 1~2학년 (TOPIK 3급+)
  // Associate/Undergraduate 1st-2nd year (TOPIK 3+)
  // ============================
  {
    schoolYear: 'YEAR_2',
    topikLevelMin: 3,
    topikLevelMax: 6,
    maxWeeklyHours: 20,
    maxWeeklyHoursWithBonus: 25,
    noTopikWeeklyHours: 10,
    vacationUnlimited: true,
    vacationNoTopikWeeklyHours: 10,
    weekendUnlimited: true,
    weekendNoTopikWeeklyHours: 10,
    requiredTopikForTier: 3,
    descKo: '학부 2학년 TOPIK 3급+: 기본 주 20시간 / 우대 주 25시간',
    descEn: '2nd year TOPIK 3+: base 20h/week / bonus 25h/week',
  },
  {
    schoolYear: 'YEAR_2',
    topikLevelMin: 0,
    topikLevelMax: 2,
    maxWeeklyHours: 10,
    maxWeeklyHoursWithBonus: 10,
    noTopikWeeklyHours: 10,
    vacationUnlimited: false,
    vacationNoTopikWeeklyHours: 10,
    weekendUnlimited: false,
    weekendNoTopikWeeklyHours: 10,
    requiredTopikForTier: 3,
    descKo: '학부 2학년 TOPIK 미충족(3급 미만): 주 10시간',
    descEn: '2nd year TOPIK not met (below 3): 10h/week',
  },
  {
    schoolYear: 'YEAR_1',
    topikLevelMin: 3,
    topikLevelMax: 6,
    maxWeeklyHours: 20,
    maxWeeklyHoursWithBonus: 25,
    noTopikWeeklyHours: 10,
    vacationUnlimited: true,
    vacationNoTopikWeeklyHours: 10,
    weekendUnlimited: true,
    weekendNoTopikWeeklyHours: 10,
    requiredTopikForTier: 3,
    descKo: '학부 1학년 TOPIK 3급+: 기본 주 20시간 / 우대 주 25시간',
    descEn: '1st year TOPIK 3+: base 20h/week / bonus 25h/week',
  },
  {
    schoolYear: 'YEAR_1',
    topikLevelMin: 0,
    topikLevelMax: 2,
    maxWeeklyHours: 10,
    maxWeeklyHoursWithBonus: 10,
    noTopikWeeklyHours: 10,
    vacationUnlimited: false,
    vacationNoTopikWeeklyHours: 10,
    weekendUnlimited: false,
    weekendNoTopikWeeklyHours: 10,
    requiredTopikForTier: 3,
    descKo: '학부 1학년 TOPIK 미충족(3급 미만): 주 10시간',
    descEn: '1st year TOPIK not met (below 3): 10h/week',
  },

  // 전문학사 (ASSOCIATE) — 1~2학년과 동일 기준
  // Associate degree — same criteria as 1st-2nd year
  {
    schoolYear: 'ASSOCIATE',
    topikLevelMin: 3,
    topikLevelMax: 6,
    maxWeeklyHours: 20,
    maxWeeklyHoursWithBonus: 25,
    noTopikWeeklyHours: 10,
    vacationUnlimited: true,
    vacationNoTopikWeeklyHours: 10,
    weekendUnlimited: true,
    weekendNoTopikWeeklyHours: 10,
    requiredTopikForTier: 3,
    descKo: '전문학사 TOPIK 3급+: 기본 주 20시간 / 우대 주 25시간',
    descEn: 'Associate TOPIK 3+: base 20h/week / bonus 25h/week',
  },
  {
    schoolYear: 'ASSOCIATE',
    topikLevelMin: 0,
    topikLevelMax: 2,
    maxWeeklyHours: 10,
    maxWeeklyHoursWithBonus: 10,
    noTopikWeeklyHours: 10,
    vacationUnlimited: false,
    vacationNoTopikWeeklyHours: 10,
    weekendUnlimited: false,
    weekendNoTopikWeeklyHours: 10,
    requiredTopikForTier: 3,
    descKo: '전문학사 TOPIK 미충족(3급 미만): 주 10시간',
    descEn: 'Associate TOPIK not met (below 3): 10h/week',
  },

  // ============================
  // D-2-8 단기유학 (6개월 대기 후)
  // D-2-8 Short-term study (after 6-month waiting)
  // 전문학사/학부 1~2학년과 동일 기준 적용
  // Same criteria as associate/1st-2nd year
  // ============================
  {
    schoolYear: 'SHORT_TERM',
    topikLevelMin: 3,
    topikLevelMax: 6,
    maxWeeklyHours: 20,
    maxWeeklyHoursWithBonus: 25,
    noTopikWeeklyHours: 10,
    vacationUnlimited: true,
    vacationNoTopikWeeklyHours: 10,
    weekendUnlimited: true,
    weekendNoTopikWeeklyHours: 10,
    requiredTopikForTier: 3,
    descKo:
      'D-2-8 단기유학 TOPIK 3급+: 기본 주 20시간 / 우대 주 25시간 (6개월 경과 필수)',
    descEn:
      'D-2-8 short-term TOPIK 3+: base 20h/week / bonus 25h/week (6-month wait required)',
  },
  {
    schoolYear: 'SHORT_TERM',
    topikLevelMin: 0,
    topikLevelMax: 2,
    maxWeeklyHours: 10,
    maxWeeklyHoursWithBonus: 10,
    noTopikWeeklyHours: 10,
    vacationUnlimited: false,
    vacationNoTopikWeeklyHours: 10,
    weekendUnlimited: false,
    weekendNoTopikWeeklyHours: 10,
    requiredTopikForTier: 3,
    descKo:
      'D-2-8 단기유학 TOPIK 미충족(3급 미만): 주 10시간 (6개월 경과 필수)',
    descEn:
      'D-2-8 short-term TOPIK not met (below 3): 10h/week (6-month wait required)',
  },
] as const;

// ============================================================================
// D-2 최대 사업장 수
// D-2 maximum concurrent workplaces
// ============================================================================
export const D2_MAX_WORKPLACES = 2;

// ============================================================================
// D-2 근무지 거리 제한 (대중교통 기준)
// D-2 workplace distance restriction (public transit basis)
//
// 직선거리가 아닌 대중교통 이동시간 기준
// Based on public transit travel time, NOT straight-line distance
// ============================================================================
export interface D2DistanceLimit {
  /** 지역 유형 / Area type */
  areaType: 'METRO' | 'NON_METRO';
  /** 한글명 / Korean name */
  nameKo: string;
  /** 영문명 / English name */
  nameEn: string;
  /** 최대 이동시간(분) / Maximum travel time (minutes) */
  maxMinutes: number;
  /** 기준 / Basis */
  basisKo: string;
  /** 기준 (영어) / Basis (English) */
  basisEn: string;
}

export const D2_DISTANCE_LIMITS: ReadonlyArray<D2DistanceLimit> = [
  {
    areaType: 'METRO',
    nameKo: '수도권 (서울·경기·인천)',
    nameEn: 'Seoul Metropolitan Area (Seoul, Gyeonggi, Incheon)',
    maxMinutes: 90,
    basisKo:
      '대중교통 기준 90분 이내 (학기 중: 대학 소재지 기준, 방학 중: 대학 소재지 또는 거주지)',
    basisEn:
      'Within 90 minutes by public transit (semester: from university, vacation: from university or residence)',
  },
  {
    areaType: 'NON_METRO',
    nameKo: '비수도권',
    nameEn: 'Non-metropolitan area',
    maxMinutes: 60,
    basisKo:
      '대중교통 기준 60분 이내 (학기 중: 대학 소재지 기준, 방학 중: 대학 소재지 또는 거주지)',
    basisEn:
      'Within 60 minutes by public transit (semester: from university, vacation: from university or residence)',
  },
] as const;

// ============================================================================
// D-2 고용주 준비 서류 및 의무사항
// D-2 employer required documents and obligations
// ============================================================================

export interface D2EmployerRequirement {
  /** 서류/의무 한글명 / Document/obligation Korean name */
  nameKo: string;
  /** 서류/의무 영문명 / Document/obligation English name */
  nameEn: string;
  /** 필수 여부 / Required or optional */
  required: boolean;
  /** 조건부 (특정 업종만) / Conditional (specific industries only) */
  conditionalIndustry: string | null;
  /** 상세 설명 (한글) / Detailed description (Korean) */
  descKo: string;
  /** 상세 설명 (영어) / Detailed description (English) */
  descEn: string;
}

export const D2_EMPLOYER_REQUIREMENTS: ReadonlyArray<D2EmployerRequirement> = [
  {
    nameKo: '사업자등록증 사본',
    nameEn: 'Copy of business registration certificate',
    required: true,
    conditionalIndustry: null,
    descKo: '유학생이 체류자격외활동허가 신청 시 필요. 고용주가 제공해야 함.',
    descEn:
      'Required for student extra-status activity permit application. Employer must provide.',
  },
  {
    nameKo: '고용주(대표자) 신분증 사본',
    nameEn: 'Copy of employer (representative) ID',
    required: false,
    conditionalIndustry: null,
    descKo: '일부 출입국사무소에서 요구할 수 있음.',
    descEn: 'May be required by some immigration offices.',
  },
  {
    nameKo: '표준근로계약서',
    nameEn: 'Standard employment contract',
    required: true,
    conditionalIndustry: null,
    descKo:
      '고용주 서명 필수. 시급·근무내용·시간·기간·요일 명시. 미교부 시 500만원 이하 벌금.',
    descEn:
      'Employer signature required. Must specify hourly wage, duties, hours, period, days. Fine up to 5M KRW if not provided.',
  },
  {
    nameKo: '시간제취업확인서 (고용주란 작성·서명)',
    nameEn:
      'Part-time employment confirmation (employer section completed and signed)',
    required: true,
    conditionalIndustry: null,
    descKo:
      '근로기간, 근무요일, 시간, 시급, 근무내용 기재. 고용주 작성 및 서명 필수.',
    descEn:
      'Must include work period, days, hours, hourly wage, duties. Employer must complete and sign.',
  },
  {
    nameKo: '시간제취업 요건 준수 확인서',
    nameEn: 'Part-time employment compliance confirmation',
    required: true,
    conditionalIndustry: 'C,F', // 제조업, 건설업 / Manufacturing, Construction
    descKo: '사업자등록증에 제조업·건설업 포함 시에만 추가 제출.',
    descEn:
      'Additional submission required only when business registration includes manufacturing or construction.',
  },
] as const;

// ============================================================================
// D-2 위반 시 처벌 요약
// D-2 penalty summary for violations
// ============================================================================

export interface D2Penalty {
  /** 위반 유형 (한글) / Violation type (Korean) */
  violationKo: string;
  /** 위반 유형 (영어) / Violation type (English) */
  violationEn: string;
  /** 유학생 처벌 (한글) / Student penalty (Korean) */
  studentPenaltyKo: string;
  /** 유학생 처벌 (영어) / Student penalty (English) */
  studentPenaltyEn: string;
  /** 고용주 처벌 (한글) / Employer penalty (Korean) */
  employerPenaltyKo: string;
  /** 고용주 처벌 (영어) / Employer penalty (English) */
  employerPenaltyEn: string;
  /** 법적 근거 / Legal basis */
  legalBasis: string;
}

export const D2_PENALTIES: ReadonlyArray<D2Penalty> = [
  {
    violationKo: '무허가 고용 (체류자격외활동허가 없이 근무)',
    violationEn:
      'Unauthorized employment (working without extra-status activity permit)',
    studentPenaltyKo: '1차: 1년 취업 제한 / 2차: 강제퇴거',
    studentPenaltyEn:
      '1st offense: 1-year employment restriction / 2nd offense: deportation',
    employerPenaltyKo:
      '3년 이하 징역 또는 3,000만원 이하 벌금 + 최대 3년 외국인 고용 금지',
    employerPenaltyEn:
      'Up to 3 years prison or 30M KRW fine + up to 3-year foreign worker hiring ban',
    legalBasis: '출입국관리법 제18조',
  },
  {
    violationKo: '허용 시간 초과 근무',
    violationEn: 'Working beyond permitted hours',
    studentPenaltyKo: '1차: 1년 취업 제한 / 2차: 강제퇴거',
    studentPenaltyEn:
      '1st offense: 1-year employment restriction / 2nd offense: deportation',
    employerPenaltyKo: '3년 이하 징역 또는 3,000만원 이하 벌금',
    employerPenaltyEn: 'Up to 3 years prison or 30M KRW fine',
    legalBasis: '출입국관리법 제18조',
  },
  {
    violationKo: '금지 업종 취업 (건설업)',
    violationEn: 'Employment in prohibited industry (construction)',
    studentPenaltyKo: '1차 적발 즉시 출국명령',
    studentPenaltyEn: 'Immediate deportation order on first offense',
    employerPenaltyKo:
      '3년 이하 징역 또는 3,000만원 이하 벌금 + 최대 3년 외국인 고용 금지',
    employerPenaltyEn:
      'Up to 3 years prison or 30M KRW fine + up to 3-year foreign worker hiring ban',
    legalBasis: '출입국관리법 제18조',
  },
  {
    violationKo: '근로계약서 미교부',
    violationEn: 'Failure to provide employment contract',
    studentPenaltyKo: '해당없음',
    studentPenaltyEn: 'N/A',
    employerPenaltyKo: '500만원 이하 벌금',
    employerPenaltyEn: 'Fine up to 5M KRW',
    legalBasis: '근로기준법 제17조',
  },
  {
    violationKo: '최저임금 위반',
    violationEn: 'Minimum wage violation',
    studentPenaltyKo: '해당없음',
    studentPenaltyEn: 'N/A',
    // 최저시급 값은 common/data/visa/minimum-wage-standards.ts 참조
    // Minimum wage value: see common/data/visa/minimum-wage-standards.ts
    employerPenaltyKo:
      '3년 이하 징역 또는 2,000만원 이하 벌금 (2025년 최저시급: 10,030원)',
    employerPenaltyEn:
      'Up to 3 years prison or 20M KRW fine (2025 minimum hourly wage: 10,030 KRW)',
    legalBasis: '최저임금법 제28조',
  },
] as const;
