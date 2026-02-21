/**
 * 정규직 비자 매칭 Evaluator 인터페이스
 * Fulltime Visa Matching Evaluator Interface
 *
 * 알바(Alba) Evaluator와의 차이점:
 * Differences from Alba Evaluator:
 * - 이중 평가 모델: evaluateJob() + evaluateApplicant()
 *   Dual evaluation model: evaluateJob() + evaluateApplicant()
 * - 4가지 채용 트랙 분류 (IMMEDIATE, SPONSOR, TRANSITION, TRANSFER)
 *   4 hiring track classification (IMMEDIATE, SPONSOR, TRANSITION, TRANSFER)
 * - 지원자 프로필 기반 교차 검증
 *   Applicant profile-based cross-validation
 */

/**
 * 채용 트랙 타입 / Hiring track type
 *
 * IMMEDIATE: F비자 소지자, 즉시 채용 가능 (F-5, F-6, F-2, F-4)
 *            F visa holders, immediate hiring (F-5, F-6, F-2, F-4)
 * SPONSOR: 해외 인재 스폰서 채용 (E비자, 기업이 비자 스폰서)
 *          Overseas talent sponsor hiring (E visa, company sponsors visa)
 * TRANSITION: 체류자격 전환 채용 (D-10, D-2 → E비자 전환)
 *             Status transition hiring (D-10, D-2 → E visa transition)
 * TRANSFER: 비자 보유자 이직 채용 (E비자 → E비자 직장 변경)
 *           Visa holder transfer hiring (E visa → E visa job change)
 */
export type HiringTrack = 'IMMEDIATE' | 'SPONSOR' | 'TRANSITION' | 'TRANSFER';

/**
 * 비자 매칭 상태 / Visa match status
 */
export type VisaMatchStatus = 'eligible' | 'conditional' | 'blocked';

/**
 * 정규직 채용 공고 입력 데이터 (Job-side evaluation)
 * Fulltime job posting input data
 */
export interface FulltimeJobInput {
  /** 직종 코드 (KSCO 4자리) / Occupation code (KSCO 4-digit) */
  occupationCode: string;

  /** 최소 연봉 (원) / Minimum annual salary (KRW) */
  salaryMin: number;

  /** 최대 연봉 (원) / Maximum annual salary (KRW) */
  salaryMax: number;

  /** 경력 수준 / Experience level */
  experienceLevel: 'ENTRY' | 'JUNIOR' | 'SENIOR' | 'EXPERT';

  /** 학력 요구사항 / Education requirement */
  educationLevel:
    | 'HIGH_SCHOOL'
    | 'ASSOCIATE'
    | 'BACHELOR'
    | 'MASTER'
    | 'DOCTORATE';

  /** 주 근무시간 (E-7-2/3 최저임금 계산용) / Weekly work hours (for E-7-2/3 minimum wage calculation) */
  weeklyWorkHours?: number;

  /** 우대 전공 목록 (선택) / Preferred majors (optional) */
  preferredMajors?: string[];

  /** 해외 인재 채용 의사 / Overseas hire willingness */
  overseasHireWilling: boolean;

  /** 근무지 주소 / Work address */
  workAddress: {
    sido: string;
    sigungu: string;
    /** 인구감소지역 여부 / Is depopulation area */
    isDepopulationArea: boolean;
  };

  /** 회사 정보 / Company information */
  companyInfo?: {
    /** 전체 직원 수 / Total employees */
    totalEmployees: number;
    /** 외국인 직원 수 / Foreign employee count */
    foreignEmployeeCount: number;
    /** 기관 유형 / Institution type */
    institutionType?: 'GENERAL' | 'EDUCATION' | 'RESEARCH' | 'MEDICAL';
  };
}

/**
 * 지원자 프로필 (Applicant-side evaluation)
 * Applicant profile for cross-validation
 */
export interface ApplicantProfile {
  /** 현재 비자 타입 / Current visa type */
  currentVisaType: string;

  /** 현재 비자 세부 타입 (E-7-1, E-7-4 등) / Current visa subtype */
  currentVisaSubtype?: string;

  /** 학력 수준 / Education level */
  educationLevel:
    | 'HIGH_SCHOOL'
    | 'ASSOCIATE'
    | 'BACHELOR'
    | 'MASTER'
    | 'DOCTORATE';

  /** 전공 / Major */
  major?: string;

  /** 경력 연수 (년) / Experience years */
  experienceYears: number;

  /** 한국어 수준 (TOPIK) / Korean level (TOPIK) */
  topikLevel?:
    | 'TOPIK_1'
    | 'TOPIK_2'
    | 'TOPIK_3'
    | 'TOPIK_4'
    | 'TOPIK_5'
    | 'TOPIK_6';

  /** 모국어 / Native language */
  nativeSpeakerOf?: string;

  /** 전문 자격증 목록 / Professional licenses */
  professionalLicense?: string[];

  /** 합법 체류 기간 (년) / Legal stay duration (years) */
  legalStayYears?: number;

  /** 한국 경력 기간 (년) / Korea experience years */
  koreaExperienceYears?: number;
}

/**
 * 정규직 비자 평가 결과 (단일 비자 타입)
 * Fulltime visa evaluation result (single visa type)
 */
export interface FulltimeVisaEvalResult {
  /** 비자 코드 (F-5, E-7-1 등) / Visa code */
  visaCode: string;

  /** 비자 명칭 (한글) / Visa name (Korean) */
  visaName: string;

  /** 비자 명칭 (영문) / Visa name (English) */
  visaNameEn: string;

  /** 채용 트랙 / Hiring track */
  hiringTrack: HiringTrack;

  /** 매칭 상태 / Match status */
  status: VisaMatchStatus;

  /** 충족 조건 (conditional일 때) / Conditions (when conditional) */
  conditions: string[];

  /** 차단 이유 (blocked일 때) / Block reasons (when blocked) */
  blockReasons: string[];

  /** 필요 허가 (학습활동허가서 등) / Required permit */
  requiredPermit: string | null;

  /** 비고 / Notes */
  notes: string | null;

  /** 추정 소요 기간 (일) / Estimated processing days */
  estimatedDays: number | null;

  /** 필요 서류 목록 / Required documents */
  requiredDocuments: string[];
}

/**
 * 정규직 비자 Evaluator 인터페이스
 * Fulltime visa evaluator interface
 *
 * 이중 평가 모델:
 * Dual evaluation model:
 * 1. evaluateJob: 공고 기준 평가 (Job-side)
 * 2. evaluateApplicant: 지원자 기준 교차 평가 (Applicant-side)
 */
export interface IFulltimeVisaEvaluator {
  /** 비자 코드 / Visa code */
  readonly visaCode: string;

  /** 비자 명칭 (한글) / Visa name (Korean) */
  readonly visaName: string;

  /** 비자 명칭 (영문) / Visa name (English) */
  readonly visaNameEn: string;

  /**
   * Job-side evaluation: 공고 조건만으로 채용 가능 여부 판별
   * Evaluates if this visa type can apply to the job posting
   *
   * @param input 공고 입력 데이터 / Job posting input
   * @returns 평가 결과 / Evaluation result
   */
  evaluateJob(input: FulltimeJobInput): FulltimeVisaEvalResult;

  /**
   * Applicant-side evaluation: 지원자 프로필 + 공고 조건 교차 검증
   * Cross-validates applicant profile against job requirements
   *
   * @param input 공고 입력 데이터 / Job posting input
   * @param profile 지원자 프로필 / Applicant profile
   * @returns 평가 결과 / Evaluation result
   */
  evaluateApplicant(
    input: FulltimeJobInput,
    profile: ApplicantProfile,
  ): FulltimeVisaEvalResult;
}

/**
 * 빈 평가 결과 객체 생성 유틸리티
 * Create empty evaluation result utility
 *
 * @param visaCode 비자 코드 / Visa code
 * @param visaName 비자 명칭 (한글) / Visa name (Korean)
 * @param visaNameEn 비자 명칭 (영문) / Visa name (English)
 * @param hiringTrack 채용 트랙 / Hiring track
 * @returns 초기화된 평가 결과 / Initialized evaluation result
 */
export function createEmptyFulltimeResult(
  visaCode: string,
  visaName: string,
  visaNameEn: string,
  hiringTrack: HiringTrack,
): FulltimeVisaEvalResult {
  return {
    visaCode,
    visaName,
    visaNameEn,
    hiringTrack,
    status: 'blocked',
    conditions: [],
    blockReasons: [],
    requiredPermit: null,
    notes: null,
    estimatedDays: null,
    requiredDocuments: [],
  };
}
