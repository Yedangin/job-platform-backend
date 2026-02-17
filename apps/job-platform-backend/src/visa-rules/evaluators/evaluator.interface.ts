/**
 * 비자 평가 엔진 - 인터페이스 정의
 * 각 비자 유형별 evaluator가 구현해야 하는 공통 인터페이스
 */

export interface EvaluateVisaInput {
  // === 기업측 (Company-side) ===
  ksicCode: string; // KSIC 업종코드
  companySizeType: string; // SME, MID, LARGE, STARTUP
  employeeCountKorean: number; // 한국인 직원수
  employeeCountForeign: number; // 외국인 직원수
  annualRevenue: number; // 매출액 (만원)
  addressRoad: string; // 소재지
  jobType: string; // PART_TIME, FULL_TIME
  offeredSalary: number; // 제시급여 (만원/월)

  // === 개인측 (Individual-side) ===
  nationality?: string; // ISO 3166-1 alpha-2 국가코드
  age?: number; // 나이
  educationLevel?: string; // DOCTOR, MASTER, BACHELOR, COLLEGE, HIGH_SCHOOL
  koreanLevel?: string; // TOPIK1~6, KIIP1~5
  workExperienceYears?: number; // 경력 연수
  currentVisaCode?: string; // 현재 보유 비자
  targetOccupationCode?: string; // KSCO 직종코드
  hasRecommendation?: boolean; // 추천서 보유
  hasCriminalRecord?: boolean; // 범죄경력
  annualIncome?: number; // 연소득 (만원) - F-2-7 소득점수용
  incomeGniPercent?: number; // GNI 대비 소득비율 (%)
  socialIntegrationLevel?: number; // 사회통합프로그램 단계 (1~5)
  isEthnicKorean?: boolean; // 재외동포 여부
  koreanAncestryCountry?: string; // 한국계 출신국
  volunteerHours?: number; // 자원봉사 시간
  hasKoreanChild?: boolean; // 한국 국적 자녀
  hasProperty?: boolean; // 한국 내 부동산
  taxYearsInKorea?: number; // 한국 내 납세 연수
  hasImmigrationViolation?: boolean; // 출입국법 위반

  // === DB 조회 결과 (rule engine이 사전 로드) / Pre-loaded from DB by rule engine ===
  inputIndustryFlags?: IndustryFlags; // 입력 업종코드의 DB 플래그 / Industry flags for input KSIC code
}

/** 업종코드 DB 플래그 (rule engine이 사전 로드) / Industry code flags (pre-loaded by rule engine) */
export interface IndustryFlags {
  isSimpleLabor: boolean;
  isEntertainment: boolean;
  isGambling: boolean;
  isGigWork: boolean;
  requiresSafetyTraining: boolean;
  platformTag: string | null;
}

export interface VisaEvaluation {
  eligible: boolean;
  score?: number; // 점수제 비자 점수
  requiredScore?: number; // 최소 필요 점수
  scoreBreakdown?: ScoreBreakdown[]; // 점수 상세 내역
  documents: string[]; // 필요 서류
  restrictions: string[]; // 제한 사항
  blockedReasons: string[]; // 불가 사유
  suggestions: string[]; // 대안 제안
  notes: string[]; // 참고 사항
  matchedIndustries: string[]; // 매칭된 업종코드
  matchedOccupations: string[]; // 매칭된 직종코드
}

export interface ScoreBreakdown {
  categoryCode: string;
  categoryName: string;
  score: number;
  maxScore: number;
  detail: string; // "석사학위 → 30점"
}

export interface VisaTypeWithRelations {
  id: bigint;
  code: string;
  nameKo: string;
  nameEn: string | null;
  category: string;
  description: string | null;
  employmentLevel: string;
  parentCode: string | null;
  subTypeCode: string | null;
  maxWorkHoursWeekly: number | null;
  maxStayMonths: number | null;
  renewalPossible: boolean;
  minAge: number | null;
  maxAge: number | null;
  metadata: string | null;
  countryRestrictions: Array<{
    countryCode: string;
    countryNameKo: string;
    restrictionType: string;
  }>;
  industryMappings: Array<{
    industryCode: { ksicCode: string; nameKo: string };
    isAllowed: boolean;
    maxForeignWorkerRatio: number | null;
  }>;
  occupationMappings: Array<{
    occupationCode: { kscoCode: string; nameKo: string };
    isAllowed: boolean;
  }>;
  requiredDocuments: Array<{
    documentName: string;
    documentCode: string;
    isRequired: boolean;
    conditionDesc: string | null;
  }>;
  // [신규] Step 2 관계 / New Step 2 relations
  prohibitedIndustries?: Array<{
    ksicCode: string;
    categoryLevel: string;
    hasExceptions: boolean;
    exceptionCodes: string | null;
    reasonKo: string | null;
  }>;
  workHourRules?: Array<{
    degreeLevel: string | null;
    topikLevel: number | null;
    topikMet: boolean;
    isCertifiedUniv: boolean | null;
    hasBonus: boolean;
    weekdayHours: number;
    weekendHoliday: string;
    weekendHours: number | null;
    vacation: string;
    vacationHours: number | null;
    annualMaxHours: number | null;
    priority: number;
  }>;
  hireQuotaRules?: Array<{
    domesticMin: number;
    domesticMax: number | null;
    foreignQuota: number;
    industryCode: { ksicCode: string; nameKo: string };
  }>;
  // [신규] 점수제 카테고리 (F-2-7, E-7-4 등) / Point system categories
  pointCategories?: Array<{
    categoryCode: string;
    categoryName: string;
    maxScore: number;
    criteria: Array<{
      criteriaName: string;
      minValue: number | null;
      maxValue: number | null;
      matchValue: string | null;
      score: number;
    }>;
  }>;
  // [신규] VisaType 확장 필드 / New VisaType extension fields
  visaGroup?: string | null;
  workType?: string | null;
  permitType?: string | null;
  baseWeeklyHours?: number | null;
}

/**
 * 비자별 평가기 인터페이스
 * 각 비자 시리즈별로 구현
 */
export interface IVisaEvaluator {
  /** 이 evaluator가 처리하는 비자 코드 목록 */
  readonly visaCodes: string[];

  /** 비자 적격성 평가 실행 */
  evaluate(
    input: EvaluateVisaInput,
    visaType: VisaTypeWithRelations,
  ): VisaEvaluation;
}
