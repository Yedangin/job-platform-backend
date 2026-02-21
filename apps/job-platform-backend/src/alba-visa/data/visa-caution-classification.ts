/**
 * 비자별 주의사항 분류 체계 (검색 필터용)
 * Visa caution classification system (for search filters)
 *
 * 차후 구직자 검색 필터에서 활용 예정:
 * - "내 비자로 지원 가능한 공고만 보기"
 * - "시간 제한 내 공고만 보기"
 * - "허가 필요 없는 공고만 보기"
 * Future use in worker search filters:
 * - "Show only jobs I can apply to with my visa"
 * - "Show only jobs within my hour limit"
 * - "Show only jobs that don't require a permit"
 */

// ============================================================
// 1. 비자 기본 정보 / Visa Basic Info
// ============================================================

export interface VisaBasicInfo {
  visaCode: string;
  visaName: string;
  visaNameEn: string;
  /** 알바 가능 여부 기본값 / Default alba eligibility */
  defaultEligibility:
    | 'free'
    | 'permit_required'
    | 'restricted'
    | 'mostly_blocked';
  /** 별도 고용허가 필요 여부 / Whether separate employment permit is needed */
  requiresPermit: boolean;
  /** 허가 유형 / Permit type */
  permitType: string | null;
  /** 최대 근무시간 제한 여부 / Whether max work hours apply */
  hasHourLimit: boolean;
  /** 사업장 수 제한 / Max workplaces */
  maxWorkplaces: number | null;
}

export const VISA_BASIC_INFO: VisaBasicInfo[] = [
  {
    visaCode: 'D-2',
    visaName: '유학',
    visaNameEn: 'Study Abroad',
    defaultEligibility: 'permit_required',
    requiresPermit: true,
    permitType: '체류자격외활동허가',
    hasHourLimit: true,
    maxWorkplaces: 2,
  },
  {
    visaCode: 'D-4',
    visaName: '어학연수',
    visaNameEn: 'Language Training',
    defaultEligibility: 'permit_required',
    requiresPermit: true,
    permitType: '체류자격외활동허가',
    hasHourLimit: true,
    maxWorkplaces: 1,
  },
  {
    visaCode: 'D-10',
    visaName: '구직',
    visaNameEn: 'Job Seeking',
    defaultEligibility: 'mostly_blocked',
    requiresPermit: false,
    permitType: null,
    hasHourLimit: true,
    maxWorkplaces: 1,
  },
  {
    visaCode: 'F-2',
    visaName: '거주',
    visaNameEn: 'Residence',
    defaultEligibility: 'free',
    requiresPermit: false,
    permitType: null,
    hasHourLimit: false,
    maxWorkplaces: null,
  },
  {
    visaCode: 'F-4',
    visaName: '재외동포',
    visaNameEn: 'Overseas Korean',
    defaultEligibility: 'restricted',
    requiresPermit: false,
    permitType: null,
    hasHourLimit: false,
    maxWorkplaces: null,
  },
  {
    visaCode: 'F-5',
    visaName: '영주',
    visaNameEn: 'Permanent Residence',
    defaultEligibility: 'free',
    requiresPermit: false,
    permitType: null,
    hasHourLimit: false,
    maxWorkplaces: null,
  },
  {
    visaCode: 'F-6',
    visaName: '결혼이민',
    visaNameEn: 'Marriage Immigration',
    defaultEligibility: 'free',
    requiresPermit: false,
    permitType: null,
    hasHourLimit: false,
    maxWorkplaces: null,
  },
  {
    visaCode: 'H-1',
    visaName: '워킹홀리데이',
    visaNameEn: 'Working Holiday',
    defaultEligibility: 'free',
    requiresPermit: false,
    permitType: null,
    hasHourLimit: false,
    maxWorkplaces: null,
  },
  {
    visaCode: 'H-2',
    visaName: '방문취업',
    visaNameEn: 'Working Visit',
    defaultEligibility: 'restricted',
    requiresPermit: true,
    permitType: '특례고용가능확인서',
    hasHourLimit: false,
    maxWorkplaces: null,
  },
];

// ============================================================
// 2. 주의사항 카테고리 / Caution Categories
// ============================================================

/** 주의사항 카테고리 / Caution category */
export type CautionCategory =
  | 'HOUR_LIMIT' // 시간 제한 / Hour restrictions
  | 'INDUSTRY_BLOCK' // 업종 제한 / Industry restrictions
  | 'PERMIT_REQUIRED' // 허가 필요 / Permit required
  | 'WAITING_PERIOD' // 대기 기간 / Waiting period
  | 'DISTANCE_LIMIT' // 거리 제한 / Distance restrictions
  | 'WORKPLACE_LIMIT' // 사업장 수 제한 / Workplace count limit
  | 'EMPLOYER_DOC' // 고용주 서류 / Employer documents
  | 'EMPLOYER_PROCEDURE' // 고용주 절차 / Employer procedures
  | 'PENALTY' // 벌칙 / Penalties
  | 'INSURANCE' // 보험 의무 / Insurance obligations
  | 'TOPIK_REQUIRED' // TOPIK 요건 / TOPIK requirement
  | 'SEASON_VARIATION' // 학기/방학 차이 / Semester/vacation variation
  | 'SUB_TYPE_VARIATION' // 하위유형별 차이 / Sub-type variations
  | 'SIMPLE_LABOR_RESTRICTION'; // 단순노무 제한 / Simple labor restriction

/** 주의사항 심각도 / Caution severity */
export type CautionSeverity = 'info' | 'warning' | 'critical';

/** 주의사항 대상 / Caution target audience */
export type CautionTarget = 'employer' | 'worker' | 'both';

// ============================================================
// 3. 비자별 주의사항 목록 / Per-Visa Caution Lists
// ============================================================

export interface VisaCaution {
  visaCode: string;
  category: CautionCategory;
  severity: CautionSeverity;
  target: CautionTarget;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  /** 검색 필터에서 사용 가능 여부 / Usable in search filters */
  filterable: boolean;
  /** 필터 키 (filterable=true 시) / Filter key */
  filterKey?: string;
}

export const VISA_CAUTIONS: VisaCaution[] = [
  // ─── D-2 유학 / Study Abroad ───
  {
    visaCode: 'D-2',
    category: 'HOUR_LIMIT',
    severity: 'critical',
    target: 'both',
    titleKo: '주당 근무시간 제한',
    titleEn: 'Weekly Hour Limit',
    descriptionKo: 'TOPIK·학위과정별 주 10~35시간 제한. 초과 시 불법취업 처벌.',
    descriptionEn:
      '10-35h/week limit based on TOPIK level and degree. Exceeding leads to illegal employment charges.',
    filterable: true,
    filterKey: 'max_weekly_hours',
  },
  {
    visaCode: 'D-2',
    category: 'PERMIT_REQUIRED',
    severity: 'critical',
    target: 'both',
    titleKo: '체류자격외활동허가 필수',
    titleEn: 'Extra-Status Activity Permit Required',
    descriptionKo: '하이코리아 온라인 신청. 허가 전 근무 시작 절대 금지.',
    descriptionEn:
      'Apply online via HiKorea. Work before permit approval is strictly prohibited.',
    filterable: true,
    filterKey: 'permit_type',
  },
  {
    visaCode: 'D-2',
    category: 'INDUSTRY_BLOCK',
    severity: 'critical',
    target: 'employer',
    titleKo: '금지 업종 확인 필수',
    titleEn: 'Prohibited Industry Check Required',
    descriptionKo: '건설업(즉시 출국명령), 유흥업소, 배달대행, 파견 등 금지.',
    descriptionEn:
      'Construction (immediate deportation), entertainment, gig delivery, dispatch forbidden.',
    filterable: true,
    filterKey: 'blocked_industries',
  },
  {
    visaCode: 'D-2',
    category: 'TOPIK_REQUIRED',
    severity: 'warning',
    target: 'worker',
    titleKo: 'TOPIK 등급별 시간 차등',
    titleEn: 'TOPIK Grade Affects Hours',
    descriptionKo: 'TOPIK 미충족 시 주 10~15시간으로 대폭 감소.',
    descriptionEn: 'Without TOPIK, weekly hours drop to 10-15h.',
    filterable: true,
    filterKey: 'topik_level',
  },
  {
    visaCode: 'D-2',
    category: 'DISTANCE_LIMIT',
    severity: 'warning',
    target: 'both',
    titleKo: '근무지 거리 제한',
    titleEn: 'Workplace Distance Limit',
    descriptionKo:
      '수도권 90분, 비수도권 60분 (대중교통 기준, 학교 소재지 기준).',
    descriptionEn:
      'Capital area 90min, non-capital 60min (public transit from school).',
    filterable: true,
    filterKey: 'distance_limit',
  },
  {
    visaCode: 'D-2',
    category: 'SEASON_VARIATION',
    severity: 'info',
    target: 'both',
    titleKo: '학기/방학 시간 차이',
    titleEn: 'Semester vs Vacation Hours Differ',
    descriptionKo: 'TOPIK 충족 시 방학 무제한. 토·공휴일은 시간 산정 제외.',
    descriptionEn:
      'Unlimited during vacation if TOPIK met. Weekends/holidays excluded from count.',
    filterable: false,
  },
  {
    visaCode: 'D-2',
    category: 'WORKPLACE_LIMIT',
    severity: 'info',
    target: 'worker',
    titleKo: '사업장 2곳까지',
    titleEn: 'Max 2 Workplaces',
    descriptionKo: '동시에 최대 2개 사업장에서 근무 가능.',
    descriptionEn: 'Can work at up to 2 workplaces simultaneously.',
    filterable: true,
    filterKey: 'max_workplaces',
  },
  {
    visaCode: 'D-2',
    category: 'EMPLOYER_DOC',
    severity: 'warning',
    target: 'employer',
    titleKo: '고용주 서류 준비',
    titleEn: 'Employer Document Preparation',
    descriptionKo: '사업자등록증, 표준근로계약서, 시간제취업확인서 서명 필요.',
    descriptionEn:
      'Business registration, labor contract, part-time work confirmation with signature.',
    filterable: false,
  },
  {
    visaCode: 'D-2',
    category: 'PENALTY',
    severity: 'critical',
    target: 'employer',
    titleKo: '무허가 고용 시 벌칙',
    titleEn: 'Penalty for Unauthorized Employment',
    descriptionKo:
      '3년 이하 징역 또는 3,000만원 이하 벌금. 최대 3년 외국인 고용 금지.',
    descriptionEn:
      'Up to 3 years prison or 30M KRW fine. Up to 3-year foreign employment ban.',
    filterable: false,
  },

  // ─── D-4 어학연수 / Language Training ───
  {
    visaCode: 'D-4',
    category: 'WAITING_PERIOD',
    severity: 'critical',
    target: 'worker',
    titleKo: '6개월 대기 기간',
    titleEn: '6-Month Waiting Period',
    descriptionKo: '입국/자격변경 후 6개월 경과해야 알바 가능.',
    descriptionEn:
      'Must wait 6 months after entry/status change before working.',
    filterable: true,
    filterKey: 'waiting_period',
  },
  {
    visaCode: 'D-4',
    category: 'HOUR_LIMIT',
    severity: 'critical',
    target: 'both',
    titleKo: '주 20시간 고정 (방학 포함)',
    titleEn: 'Fixed 20h/week (Including Vacation)',
    descriptionKo: 'D-2와 달리 방학·공휴일에도 주 20시간 제한.',
    descriptionEn:
      'Unlike D-2, 20h/week limit applies even during vacation/holidays.',
    filterable: true,
    filterKey: 'max_weekly_hours',
  },
  {
    visaCode: 'D-4',
    category: 'WORKPLACE_LIMIT',
    severity: 'warning',
    target: 'worker',
    titleKo: '1개 사업장만 가능',
    titleEn: 'Only 1 Workplace',
    descriptionKo: 'D-2(2곳)와 달리 1개 사업장에서만 근무 가능.',
    descriptionEn: 'Unlike D-2 (2 workplaces), only 1 workplace allowed.',
    filterable: true,
    filterKey: 'max_workplaces',
  },
  {
    visaCode: 'D-4',
    category: 'TOPIK_REQUIRED',
    severity: 'warning',
    target: 'worker',
    titleKo: 'TOPIK 2급 + 출석률 90%',
    titleEn: 'TOPIK 2+ & 90% Attendance',
    descriptionKo:
      'TOPIK 2급 이상 + 출석률 90% 이상 필요. 미충족 시 주 10시간.',
    descriptionEn:
      'TOPIK 2+ and 90%+ attendance required. Only 10h/week without.',
    filterable: true,
    filterKey: 'topik_level',
  },

  // ─── D-10 구직 / Job Seeking ───
  {
    visaCode: 'D-10',
    category: 'INDUSTRY_BLOCK',
    severity: 'critical',
    target: 'both',
    titleKo: '단순노무 알바 불가',
    titleEn: 'Simple Labor Part-Time Blocked',
    descriptionKo: 'D-10은 E-1~E-7 전문직종 인턴만 가능. 식당·매장 알바 불가.',
    descriptionEn:
      'D-10 allows only E-1~E-7 professional internships. Restaurant/store work blocked.',
    filterable: true,
    filterKey: 'professional_only',
  },
  {
    visaCode: 'D-10',
    category: 'SUB_TYPE_VARIATION',
    severity: 'warning',
    target: 'worker',
    titleKo: 'D-10 하위유형별 제한',
    titleEn: 'D-10 Sub-type Restrictions',
    descriptionKo:
      'D-10-1(유학생 출신)만 인턴 가능. D-10-2(창업), D-10-1(경력자)은 불가.',
    descriptionEn:
      'Only D-10-1 (former student) allows internship. D-10-2, D-10-1 (career) blocked.',
    filterable: false,
  },

  // ─── F-4 재외동포 / Overseas Korean ───
  {
    visaCode: 'F-4',
    category: 'SIMPLE_LABOR_RESTRICTION',
    severity: 'warning',
    target: 'both',
    titleKo: '단순노무 제한 (예외 8개 직종)',
    titleEn: 'Simple Labor Restricted (8 Exceptions)',
    descriptionKo:
      '단순노무 원칙 금지. 조리보조, 건설기능공, 주유원 등 8개 예외.',
    descriptionEn:
      'Simple labor generally banned. 8 exceptions: cook assistant, construction, etc.',
    filterable: true,
    filterKey: 'f4_exception_jobs',
  },
  {
    visaCode: 'F-4',
    category: 'SIMPLE_LABOR_RESTRICTION',
    severity: 'info',
    target: 'both',
    titleKo: 'F-4-R 인구감소지역 자유취업',
    titleEn: 'F-4-R Free Employment in Depopulation Areas',
    descriptionKo:
      '인구감소지역(107개)에서는 단순노무 제한 해제. 풍속 위반만 제한.',
    descriptionEn:
      'In 107 depopulation areas, simple labor restriction lifted. Only morals restriction remains.',
    filterable: true,
    filterKey: 'depopulation_area',
  },

  // ─── H-2 방문취업 / Working Visit ───
  {
    visaCode: 'H-2',
    category: 'EMPLOYER_PROCEDURE',
    severity: 'critical',
    target: 'employer',
    titleKo: '특례고용허가 절차',
    titleEn: 'Special Employment Permit Procedure',
    descriptionKo:
      '내국인 구인(14일) → 특례고용가능확인서 → 구직자명부 채용 → 근로개시 신고.',
    descriptionEn:
      'Domestic recruitment (14d) → Permit → Hire from registry → Report work start.',
    filterable: true,
    filterKey: 'employer_permit',
  },
  {
    visaCode: 'H-2',
    category: 'INDUSTRY_BLOCK',
    severity: 'warning',
    target: 'employer',
    titleKo: '네거티브 리스트 22개 중분류',
    titleEn: '22 Negative Mid-Category Industries',
    descriptionKo:
      'IT, 교육, 금융, 부동산, 출판, 연구개발 등 22개 중분류 금지.',
    descriptionEn:
      'IT, education, finance, real estate, publishing, R&D etc. 22 mid-categories blocked.',
    filterable: true,
    filterKey: 'h2_negative_list',
  },
  {
    visaCode: 'H-2',
    category: 'PENALTY',
    severity: 'critical',
    target: 'employer',
    titleKo: '고용 관련 과태료',
    titleEn: 'Employment-Related Fines',
    descriptionKo:
      '구직자명부 미등록자 채용: 500만원. 근로개시 미신고: 500만원.',
    descriptionEn:
      'Hiring unregistered worker: 5M KRW. Unreported work start: 5M KRW.',
    filterable: false,
  },

  // ─── 공통 / Common ───
  {
    visaCode: '*',
    category: 'INSURANCE',
    severity: 'warning',
    target: 'employer',
    titleKo: '산재보험·건강보험 의무',
    titleEn: 'Industrial Accident & Health Insurance Mandatory',
    descriptionKo:
      '모든 외국인 근로자에게 산재보험 당연 적용. 건강보험 14일 이내 신고.',
    descriptionEn:
      'Industrial accident insurance applies to ALL foreign workers. Health insurance within 14 days.',
    filterable: false,
  },
  {
    visaCode: '*',
    category: 'EMPLOYER_DOC',
    severity: 'warning',
    target: 'employer',
    titleKo: '서면 근로계약서 교부 의무',
    titleEn: 'Written Labor Contract Required',
    descriptionKo:
      '미교부 시 500만원 이하 벌금. 외국인 표준근로계약서 사용 권장.',
    descriptionEn:
      'Up to 5M KRW fine for non-issuance. Use standard foreign worker contract.',
    filterable: false,
  },
  {
    visaCode: '*',
    category: 'PENALTY',
    severity: 'critical',
    target: 'employer',
    titleKo: '무허가 고용 벌칙',
    titleEn: 'Unauthorized Employment Penalty',
    descriptionKo:
      '출입국관리법 제18조: 3년 이하 징역/3,000만원 벌금. 3년간 외국인 고용 금지.',
    descriptionEn:
      'Immigration Act §18: Up to 3y prison/30M KRW fine. 3-year foreign employment ban.',
    filterable: false,
  },
];

// ============================================================
// 4. 헬퍼 함수 / Helper Functions
// ============================================================

/** 특정 비자의 주의사항 조회 / Get cautions for a specific visa */
export function getCautionsForVisa(visaCode: string): VisaCaution[] {
  return VISA_CAUTIONS.filter(
    (c) => c.visaCode === visaCode || c.visaCode === '*',
  );
}

/** 특정 카테고리의 주의사항 조회 / Get cautions by category */
export function getCautionsByCategory(
  category: CautionCategory,
): VisaCaution[] {
  return VISA_CAUTIONS.filter((c) => c.category === category);
}

/** 검색 필터에서 사용할 수 있는 주의사항만 조회 / Get filterable cautions */
export function getFilterableCautions(): VisaCaution[] {
  return VISA_CAUTIONS.filter((c) => c.filterable);
}

/** 고용주 대상 주의사항만 조회 / Get employer-targeted cautions */
export function getEmployerCautions(visaCode?: string): VisaCaution[] {
  return VISA_CAUTIONS.filter(
    (c) =>
      (c.target === 'employer' || c.target === 'both') &&
      (visaCode ? c.visaCode === visaCode || c.visaCode === '*' : true),
  );
}

/** 구직자 대상 주의사항만 조회 / Get worker-targeted cautions */
export function getWorkerCautions(visaCode?: string): VisaCaution[] {
  return VISA_CAUTIONS.filter(
    (c) =>
      (c.target === 'worker' || c.target === 'both') &&
      (visaCode ? c.visaCode === visaCode || c.visaCode === '*' : true),
  );
}
