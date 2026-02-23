/**
 * TRANSITION 트랙 평가기 테스트 — D-2 유학, D-10 구직 → E-7 전환
 * TRANSITION Track Evaluator Tests — D-2 Study, D-10 Job Seeking → E-7 Transition
 *
 * 테스트 대상:
 * - D2FulltimeEvaluator: D-2 유학 → E-7 전환 (출입국관리법 시행령 별표1 제18호, 고등교육법 제2조)
 * - D10FulltimeEvaluator: D-10 구직 → E-7 전환 (출입국관리법 시행령 별표1 제19호)
 *
 * 법적 근거:
 * - 출입국관리법 시행령 제23조 — 체류자격 전환 요건
 * - 고등교육법 제2조 — 국내 대학 정의 (domestic university definition)
 * - 법무부공고 제2025-406호 — E-7 최소 연봉 기준 (2026.2.1~2026.12.31)
 *   E-7-1: 31,120,000원, E-7-2: 25,890,000원, E-7-3: 25,890,000원
 */

import { D2FulltimeEvaluator } from '../evaluators/d2-fulltime-evaluator';
import { D10FulltimeEvaluator } from '../evaluators/d10-fulltime-evaluator';
import { F5FulltimeEvaluator } from '../evaluators/f5-fulltime-evaluator';
import { F6FulltimeEvaluator } from '../evaluators/f6-fulltime-evaluator';
import { F2FulltimeEvaluator } from '../evaluators/f2-fulltime-evaluator';
import { F4FulltimeEvaluator } from '../evaluators/f4-fulltime-evaluator';
import { E71FulltimeEvaluator } from '../evaluators/e7-1-fulltime-evaluator';
import { E72FulltimeEvaluator } from '../evaluators/e7-2-fulltime-evaluator';
import { E73FulltimeEvaluator } from '../evaluators/e7-3-fulltime-evaluator';
import { getCurrentE7MinSalary } from '../data/gni-table';
import {
  FulltimeJobInput,
  ApplicantProfile,
  IFulltimeVisaEvaluator,
} from '../evaluators/fulltime-evaluator.interface';

// ============================================================================
// 헬퍼 함수 / Helper Functions
// ============================================================================

/**
 * 기본 FulltimeJobInput 생성 헬퍼
 * Default FulltimeJobInput creation helper
 *
 * 기본값: E-7-1 허용 직종(2223 응용 소프트웨어 개발자), 충분한 연봉
 * Defaults: E-7-1 allowed occupation (2223 Application Software Developer), sufficient salary
 */
function createJobInput(
  overrides: Partial<FulltimeJobInput> = {},
): FulltimeJobInput {
  return {
    occupationCode: '2223', // E-7-1 응용 소프트웨어 개발자 / Application Software Developer
    salaryMin: 40_000_000,
    salaryMax: 60_000_000,
    experienceLevel: 'JUNIOR',
    educationLevel: 'BACHELOR',
    overseasHireWilling: true,
    workAddress: {
      sido: '서울특별시',
      sigungu: '강남구',
      isDepopulationArea: false,
    },
    ...overrides,
  };
}

/**
 * 기본 ApplicantProfile 생성 헬퍼
 * Default ApplicantProfile creation helper
 */
function createApplicantProfile(
  overrides: Partial<ApplicantProfile> = {},
): ApplicantProfile {
  return {
    currentVisaType: 'D-2',
    educationLevel: 'BACHELOR',
    experienceYears: 0,
    isDomesticUniversity: true,
    ...overrides,
  };
}

// ============================================================================
// 동적 값 (법무부공고 2025-406호 기준)
// Dynamic values (based on MOJ Notice 2025-406)
// ============================================================================
const E71_MIN_SALARY = getCurrentE7MinSalary('E-7-1'); // 31,120,000원
const E72_MIN_SALARY = getCurrentE7MinSalary('E-7-2'); // 25,890,000원
const E73_MIN_SALARY = getCurrentE7MinSalary('E-7-3'); // 25,890,000원

// ============================================================================
// 테스트 상수: 직종 코드
// Test constants: Occupation codes
// ============================================================================
const E71_OCCUPATION = '2223'; // 응용 소프트웨어 개발자 (E-7-1) / Application Software Developer
const E72_OCCUPATION = '31215'; // 면세점 판매 사무원 (E-7-2) / Duty-Free Sales Clerk
const E73_OCCUPATION = '7430'; // 조선 용접공 (E-7-3) / Shipbuilding Welder
const NON_E7_OCCUPATION = '9999'; // E-7 비허용 직종 / Non-E-7 occupation

// ============================================================================
// D-2 유학→E-7 전환 테스트
// D-2 Study → E-7 Transition Tests
//
// 법적 근거: 출입국관리법 시행령 별표1 제18호, 고등교육법 제2조
// Legal basis: Immigration Act Enforcement Decree Annex 1 Item 18,
//              Higher Education Act Article 2
// ============================================================================
describe('D2FulltimeEvaluator — D-2 유학→E-7 전환', () => {
  let evaluator: D2FulltimeEvaluator;

  beforeAll(() => {
    evaluator = new D2FulltimeEvaluator();
  });

  // ==========================================================================
  // ① 불변 속성 (Invariants)
  // 출입국관리법 시행령 제23조 — D-2 체류자격 전환 요건
  // ==========================================================================
  describe('① 불변 속성 (Invariants)', () => {
    // 출입국관리법 시행령 제23조 — D-2 → E-7 전환은 항상 TRANSITION 트랙
    it('hiringTrack은 항상 TRANSITION이다', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.hiringTrack).toBe('TRANSITION');
    });

    // 출입국관리법 시행령 제23조 — overseasHireWilling 값과 무관하게 TRANSITION 유지
    it('overseasHireWilling=false여도 hiringTrack은 TRANSITION', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
        overseasHireWilling: false,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.hiringTrack).toBe('TRANSITION');
    });

    // 출입국관리법 시행령 별표1 제18호 — E-7 비허용 직종은 항상 blocked
    it('E-7 비허용 직종(non-E7 occupation) → 항상 blocked', () => {
      const input = createJobInput({
        occupationCode: NON_E7_OCCUPATION,
        salaryMin: 100_000_000, // 매우 높은 연봉도 직종이 안 되면 blocked
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
      expect(result.blockReasons[0]).toContain('E-7 허용직종');
    });

    // D-2 소지자는 국내 대학 재학/졸업이므로 isDomesticUniversity=true 자동 적용
    // 고등교육법 제2조 — D-2 holders are by definition domestic university students
    it('D-2 소지자는 국내 대학 졸업이므로 isDomesticUniversity=true가 자동 적용된다', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-2',
        educationLevel: 'BACHELOR',
        isDomesticUniversity: true,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      // D-2 + BACHELOR + isDomesticUniversity → eligible with domestic provision
      expect(result.status).toBe('eligible');
      expect(result.conditions.some((c) => c.includes('국내 대학 특례'))).toBe(
        true,
      );
    });
  });

  // ==========================================================================
  // ② 골든 케이스 (Golden Path Cases)
  // ==========================================================================
  describe('② 골든 케이스 (Golden Path)', () => {
    // 법무부공고 제2025-406호 — E-7-1 허용직종 + 연봉 충족 → conditional
    it('E-7-1 허용 직종 + salary >= E-7-1 최소 연봉 → conditional (job-side)', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('conditional');
      expect(result.conditions.length).toBeGreaterThan(0);
      expect(result.conditions.some((c) => c.includes('졸업'))).toBe(true);
    });

    // 법무부공고 제2025-406호 — E-7-2 허용직종 + 연봉 충족 → conditional (lower tier)
    it('E-7-2 허용 직종 + salary >= E-7-2 최소 연봉 → conditional (lower E-7 tier)', () => {
      const input = createJobInput({
        occupationCode: E72_OCCUPATION,
        salaryMin: E72_MIN_SALARY,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('conditional');
      expect(result.hiringTrack).toBe('TRANSITION');
    });

    // 법무부공고 제2025-406호 — E-7-3 허용직종 + 연봉 충족 → conditional
    it('E-7-3 허용 직종 + salary >= E-7-3 최소 연봉 → conditional', () => {
      const input = createJobInput({
        occupationCode: E73_OCCUPATION,
        salaryMin: E73_MIN_SALARY,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('conditional');
      expect(result.hiringTrack).toBe('TRANSITION');
    });

    // 고등교육법 제2조 — D-2 + BACHELOR + related major → eligible
    it('D-2 비자 + BACHELOR + 국내 대학 → eligible (applicant-side)', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-2',
        educationLevel: 'BACHELOR',
        major: 'Computer Science',
        isDomesticUniversity: true,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('eligible');
      expect(result.hiringTrack).toBe('TRANSITION');
    });

    // 고등교육법 제2조 — D-2 + MASTER → eligible (학사+ 경력불요/전공무관)
    it('D-2 비자 + MASTER → eligible (학사+ 특례: 경력불요, 전공무관)', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-2',
        educationLevel: 'MASTER',
        isDomesticUniversity: true,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('eligible');
    });

    // 출입국관리법 시행령 별표1 제18호 — D-2-7 졸업자 → 국민고용비율 면제 note
    it('D-2-7 (일학습연계) 지원자 → 국민고용비율 면제 조건 포함', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-2',
        currentVisaSubtype: 'D-2-7',
        educationLevel: 'BACHELOR',
        isDomesticUniversity: true,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('eligible');
      expect(
        result.conditions.some((c) => c.includes('국민고용비율 면제')),
      ).toBe(true);
      expect(result.notes).toContain('D-2-7');
    });

    // D-2-7 + ASSOCIATE → conditional 이지만 국민고용비율 면제 note는 포함
    it('D-2-7 + ASSOCIATE → conditional, 국민고용비율 면제 note 포함', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-2',
        currentVisaSubtype: 'D-2-7',
        educationLevel: 'ASSOCIATE',
        isDomesticUniversity: true,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('conditional');
      expect(
        result.conditions.some((c) => c.includes('국민고용비율 면제')),
      ).toBe(true);
    });
  });

  // ==========================================================================
  // ③ 경계값 테스트 (Boundary Value Tests)
  // 법무부공고 제2025-406호 — E-7 최소 연봉 기준
  // ==========================================================================
  describe('③ 경계값 (Boundary Values)', () => {
    // 법무부공고 제2025-406호 — E-7-2/3 최소 연봉 경계
    // E-7-2 occupations: 25,890,000원 기준
    it('E-7-2 직종 salary = 25,890,000 → conditional (경계값 통과)', () => {
      const input = createJobInput({
        occupationCode: E72_OCCUPATION,
        salaryMin: 25_890_000,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('conditional');
    });

    it('E-7-2 직종 salary = 25,889,999 → blocked (경계값 미달)', () => {
      const input = createJobInput({
        occupationCode: E72_OCCUPATION,
        salaryMin: 25_889_999,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
    });

    // 법무부공고 제2025-406호 — E-7-1 최소 연봉 경계
    it('E-7-1 직종 salary = 31,120,000 → conditional (경계값 통과)', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: 31_120_000,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('conditional');
    });

    it('E-7-1 직종 salary = 31,119,999 → blocked (경계값 미달)', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: 31_119_999,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('blocked');
    });

    // 고등교육법 제2조 — 학력 경계: BACHELOR → eligible, HIGH_SCHOOL → blocked
    it('지원자 학력 BACHELOR → eligible (applicant-side)', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-2',
        educationLevel: 'BACHELOR',
        isDomesticUniversity: true,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('eligible');
    });

    // 출입국관리법 시행령 제23조 — HIGH_SCHOOL은 졸업 상태 미충족으로 blocked
    it('지원자 학력 HIGH_SCHOOL → blocked (졸업 미인정)', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-2',
        educationLevel: 'HIGH_SCHOOL',
        isGraduating: false,
        isDomesticUniversity: true,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('blocked');
      expect(result.blockReasons.some((r) => r.includes('졸업'))).toBe(true);
    });

    // ASSOCIATE → conditional (전문학사: 경력불요, 전공관련만)
    it('지원자 학력 ASSOCIATE → conditional (전문학사 특례: 전공관련 직종만)', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-2',
        educationLevel: 'ASSOCIATE',
        isDomesticUniversity: true,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('conditional');
      expect(result.conditions.some((c) => c.includes('전문학사'))).toBe(true);
    });

    // 비자 타입 불일치: D-2 evaluator에 F-5 지원자 → blocked
    it('D-2 evaluator에 D-2가 아닌 비자 지원자 → blocked', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'F-5',
        educationLevel: 'BACHELOR',
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('blocked');
      expect(
        result.blockReasons.some((r) => r.includes('D-2 비자 소지자만')),
      ).toBe(true);
    });

    // E-7-3 직종 경계값: 25,890,000 → pass
    it('E-7-3 직종 salary = 25,890,000 → conditional', () => {
      const input = createJobInput({
        occupationCode: E73_OCCUPATION,
        salaryMin: 25_890_000,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('conditional');
    });

    // E-7-3 직종 경계값: 25,889,999 → blocked
    it('E-7-3 직종 salary = 25,889,999 → blocked', () => {
      const input = createJobInput({
        occupationCode: E73_OCCUPATION,
        salaryMin: 25_889_999,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('blocked');
    });
  });

  // ==========================================================================
  // 추가 엣지 케이스 / Additional Edge Cases
  // ==========================================================================
  describe('추가 엣지 케이스', () => {
    // DOCTORATE → eligible (학사+ 특례)
    it('D-2 + DOCTORATE → eligible', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-2',
        educationLevel: 'DOCTORATE',
        isDomesticUniversity: true,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('eligible');
    });

    // visaCode 반환 확인
    it('visaCode는 D-2를 반환한다', () => {
      expect(evaluator.visaCode).toBe('D-2');
    });

    // estimatedDays 확인 — D-2 → E-7 전환: 약 30일
    it('conditional일 때 estimatedDays = 30', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('conditional');
      expect(result.estimatedDays).toBe(30);
    });

    // requiredDocuments가 반환되는지 확인
    it('conditional일 때 requiredDocuments가 비어있지 않다', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.requiredDocuments.length).toBeGreaterThan(0);
      expect(result.requiredDocuments.some((d) => d.includes('졸업'))).toBe(
        true,
      );
    });
  });
});

// ============================================================================
// D-10 구직→E-7 전환 테스트
// D-10 Job Seeking → E-7 Transition Tests
//
// 법적 근거: 출입국관리법 시행령 별표1 제19호 (D-10 구직 체류자격)
//           출입국관리법 시행령 별표1 제27호의3
// ============================================================================
describe('D10FulltimeEvaluator — D-10 구직→E-7 전환', () => {
  let evaluator: D10FulltimeEvaluator;

  beforeAll(() => {
    evaluator = new D10FulltimeEvaluator();
  });

  // ==========================================================================
  // ① 불변 속성 (Invariants)
  // 출입국관리법 시행령 별표1 제27호의3 — D-10 구직 체류자격
  // ==========================================================================
  describe('① 불변 속성 (Invariants)', () => {
    // 출입국관리법 시행령 제23조 — D-10 → E-7 전환은 항상 TRANSITION 트랙
    it('hiringTrack은 항상 TRANSITION이다', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.hiringTrack).toBe('TRANSITION');
    });

    // overseasHireWilling 값과 무관하게 TRANSITION 유지
    it('overseasHireWilling=false여도 hiringTrack은 TRANSITION', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
        overseasHireWilling: false,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.hiringTrack).toBe('TRANSITION');
    });

    // 출입국관리법 시행령 별표1 제27호의3 — E-7 비허용 직종은 항상 blocked
    it('E-7 비허용 직종(non-E7 occupation) → 항상 blocked', () => {
      const input = createJobInput({
        occupationCode: NON_E7_OCCUPATION,
        salaryMin: 200_000_000,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
      expect(result.blockReasons[0]).toContain('E-7 허용직종');
    });

    // 출입국관리법 시행령 별표1 제27호의3 — D-10 applicant-side에서 학사 이상 필요
    it('D-10 applicant-side: ASSOCIATE 학력 → blocked (학사 이상 필요)', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-10',
        educationLevel: 'ASSOCIATE',
        experienceYears: 0,
        isDomesticUniversity: false,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('blocked');
      expect(result.blockReasons.some((r) => r.includes('학사 이상'))).toBe(
        true,
      );
    });
  });

  // ==========================================================================
  // ② 골든 케이스 (Golden Path Cases)
  // ==========================================================================
  describe('② 골든 케이스 (Golden Path)', () => {
    // 법무부공고 제2025-406호 — E-7-1 허용직종 + 연봉 충족 + BACHELOR → conditional (job-side)
    it('E-7-1 허용 직종 + salary >= E-7-1 최소 연봉 → conditional (job-side)', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
        educationLevel: 'BACHELOR',
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('conditional');
      expect(result.hiringTrack).toBe('TRANSITION');
      expect(result.conditions.length).toBeGreaterThan(0);
    });

    // 출입국관리법 시행령 별표1 제27호의3 — D-10 + BACHELOR → eligible (applicant-side, domestic)
    it('D-10 비자 + BACHELOR + isDomesticUniversity=true → eligible', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-10',
        educationLevel: 'BACHELOR',
        isDomesticUniversity: true,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('eligible');
      expect(result.conditions.some((c) => c.includes('국내 대학 특례'))).toBe(
        true,
      );
    });

    // 국내 대학 특례 — isDomesticUniversity=true + BACHELOR → 경력불요, 전공무관
    it('D-10 + isDomesticUniversity=true + BACHELOR → 국내 대학 특례 적용', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-10',
        educationLevel: 'BACHELOR',
        isDomesticUniversity: true,
        experienceYears: 0,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('eligible');
      expect(result.conditions.some((c) => c.includes('국내 대학 특례'))).toBe(
        true,
      );
      expect(result.conditions.some((c) => c.includes('경력불요'))).toBe(true);
    });

    // 해외 대학 졸업자 경로: MASTER → eligible (경력 불요)
    it('D-10 + 해외 대학 MASTER → eligible (석사 이상: 경력 불요)', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-10',
        educationLevel: 'MASTER',
        isDomesticUniversity: false,
        experienceYears: 0,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('eligible');
      expect(result.conditions.some((c) => c.includes('석사 이상'))).toBe(true);
    });

    // 해외 대학 졸업자 경로: BACHELOR + 1년 경력 → eligible
    it('D-10 + 해외 대학 BACHELOR + 1년 경력 → eligible', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-10',
        educationLevel: 'BACHELOR',
        isDomesticUniversity: false,
        experienceYears: 1,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('eligible');
    });

    // 해외 대학 졸업자 경로: BACHELOR + 5년 경력 → eligible (5년 경력 경로)
    it('D-10 + BACHELOR + 5년 경력 → eligible (5년 경력 경로)', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-10',
        educationLevel: 'BACHELOR',
        isDomesticUniversity: false,
        experienceYears: 5,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('eligible');
    });

    // E-7-2 직종으로도 D-10 전환 가능
    it('E-7-2 허용 직종 + 연봉 충족 → conditional (job-side)', () => {
      const input = createJobInput({
        occupationCode: E72_OCCUPATION,
        salaryMin: E72_MIN_SALARY,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('conditional');
      expect(result.hiringTrack).toBe('TRANSITION');
    });
  });

  // ==========================================================================
  // ③ 경계값 테스트 (Boundary Value Tests)
  // 법무부공고 제2025-406호 — E-7 최소 연봉 기준
  // ==========================================================================
  describe('③ 경계값 (Boundary Values)', () => {
    // 학력 경계: BACHELOR → pass (applicant-side, overseas)
    it('지원자 학력 BACHELOR + 1년 경력 (해외 대학) → eligible', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-10',
        educationLevel: 'BACHELOR',
        isDomesticUniversity: false,
        experienceYears: 1,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('eligible');
    });

    // 학력 경계: ASSOCIATE → blocked (학사 이상 필요)
    it('지원자 학력 ASSOCIATE → blocked', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-10',
        educationLevel: 'ASSOCIATE',
        isDomesticUniversity: false,
        experienceYears: 3,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('blocked');
      expect(result.blockReasons.some((r) => r.includes('학사 이상'))).toBe(
        true,
      );
    });

    // 학력 경계: HIGH_SCHOOL → blocked
    it('지원자 학력 HIGH_SCHOOL → blocked', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-10',
        educationLevel: 'HIGH_SCHOOL',
        isDomesticUniversity: false,
        experienceYears: 10,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('blocked');
    });

    // 연봉 경계: E-7-1 최소 연봉 정확히 충족
    it('E-7-1 직종 salary = E-7-1 최소 연봉 → conditional', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('conditional');
    });

    // 연봉 경계: E-7-1 최소 연봉 1원 미달
    it('E-7-1 직종 salary = E-7-1 최소 연봉 - 1 → blocked', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY - 1,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('blocked');
    });

    // 해외 대학 BACHELOR + 0년 경력 → blocked (1년 필요)
    it('해외 대학 BACHELOR + 0년 경력 → blocked (표준 경로 미충족)', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-10',
        educationLevel: 'BACHELOR',
        isDomesticUniversity: false,
        experienceYears: 0,
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('blocked');
      expect(
        result.blockReasons.some((r) => r.includes('전환 요건 미충족')),
      ).toBe(true);
    });

    // 비자 타입 불일치: D-10 evaluator에 D-2 지원자 → blocked
    it('D-10 evaluator에 D-10이 아닌 비자 지원자 → blocked', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-2',
        educationLevel: 'BACHELOR',
      });
      const result = evaluator.evaluateApplicant(input, profile);
      expect(result.status).toBe('blocked');
      expect(
        result.blockReasons.some((r) => r.includes('D-10 비자 소지자만')),
      ).toBe(true);
    });
  });

  // ==========================================================================
  // 추가 엣지 케이스 / Additional Edge Cases
  // ==========================================================================
  describe('추가 엣지 케이스', () => {
    // visaCode 반환 확인
    it('visaCode는 D-10을 반환한다', () => {
      expect(evaluator.visaCode).toBe('D-10');
    });

    // estimatedDays 확인 — D-10 → E-7 전환: 약 21일
    it('conditional일 때 estimatedDays = 21', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.status).toBe('conditional');
      expect(result.estimatedDays).toBe(21);
    });

    // requiredDocuments가 반환되는지 확인
    it('conditional일 때 requiredDocuments가 비어있지 않다', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.requiredDocuments.length).toBeGreaterThan(0);
    });

    // D-10 notes에 체류 기간 경고 포함
    it('conditional일 때 notes에 D-10 최대 체류 2년 경고 포함', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const result = evaluator.evaluateJob(input);
      expect(result.notes).toContain('D-10');
      expect(result.notes).toContain('2년');
    });

    // 국내 대학 특례: domesticDegreeLevel 우선 적용
    it('isDomesticUniversity=true + domesticDegreeLevel=ASSOCIATE → conditional (전문학사)', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });
      const profile = createApplicantProfile({
        currentVisaType: 'D-10',
        educationLevel: 'BACHELOR',
        isDomesticUniversity: true,
        domesticDegreeLevel: 'ASSOCIATE',
      });
      const result = evaluator.evaluateApplicant(input, profile);
      // domesticDegreeLevel이 ASSOCIATE이므로 전문학사 특례 적용
      expect(result.status).toBe('conditional');
      expect(result.conditions.some((c) => c.includes('전문학사'))).toBe(true);
    });
  });
});

// ============================================================================
// 통합 테스트 / Cross-Evaluator Integration Tests
//
// 모든 9개 evaluator 간의 불변 속성(invariants)과 일관성 검증
// Invariant and consistency validation across all 9 evaluators
// ============================================================================
describe('Cross-Evaluator Integration Tests — 전체 평가기 불변 속성 검증', () => {
  // 전체 9개 evaluator 인스턴스
  const allEvaluators: IFulltimeVisaEvaluator[] = [
    new F5FulltimeEvaluator(),
    new F6FulltimeEvaluator(),
    new F2FulltimeEvaluator(),
    new F4FulltimeEvaluator(),
    new E71FulltimeEvaluator(),
    new E72FulltimeEvaluator(),
    new E73FulltimeEvaluator(),
    new D2FulltimeEvaluator(),
    new D10FulltimeEvaluator(),
  ];

  const fEvaluators: IFulltimeVisaEvaluator[] = [
    new F5FulltimeEvaluator(),
    new F6FulltimeEvaluator(),
    new F2FulltimeEvaluator(),
    new F4FulltimeEvaluator(),
  ];

  const e7Evaluators: IFulltimeVisaEvaluator[] = [
    new E71FulltimeEvaluator(),
    new E72FulltimeEvaluator(),
    new E73FulltimeEvaluator(),
  ];

  // ==========================================================================
  // 연봉 단조성 (Salary Monotonicity)
  // "연봉을 올리면 eligible한 비자 수가 줄어들지 않는다"
  //
  // 법적 근거: 모든 비자 유형의 연봉 기준은 최소 기준이므로,
  //           연봉이 높아지면 조건 충족 가능성이 줄지 않아야 한다.
  // ==========================================================================
  describe('연봉을 올리면 eligible/conditional한 비자 수가 줄어들지 않는다 (Salary Monotonicity)', () => {
    // 법무부공고 제2025-406호 — 모든 E-7 최소 연봉은 하한 기준이므로 단조성 보장
    it('salary를 올릴 때 non-blocked 비자 수는 감소하지 않는다 (E-7-1 직종)', () => {
      const salaryLevels = [
        20_000_000, 25_890_000, 31_120_000, 40_000_000, 60_000_000, 150_000_000,
      ];

      let prevNonBlockedCount = 0;

      for (const salary of salaryLevels) {
        const input = createJobInput({
          occupationCode: E71_OCCUPATION,
          salaryMin: salary,
          overseasHireWilling: true,
        });

        let nonBlockedCount = 0;
        for (const evaluator of allEvaluators) {
          const result = evaluator.evaluateJob(input);
          if (result.status !== 'blocked') {
            nonBlockedCount++;
          }
        }

        expect(nonBlockedCount).toBeGreaterThanOrEqual(prevNonBlockedCount);
        prevNonBlockedCount = nonBlockedCount;
      }
    });

    // E-7-2 직종에서도 단조성 검증
    it('salary를 올릴 때 non-blocked 비자 수는 감소하지 않는다 (E-7-2 직종)', () => {
      const salaryLevels = [20_000_000, 25_890_000, 31_120_000, 50_000_000];

      let prevNonBlockedCount = 0;

      for (const salary of salaryLevels) {
        const input = createJobInput({
          occupationCode: E72_OCCUPATION,
          salaryMin: salary,
          overseasHireWilling: true,
        });

        let nonBlockedCount = 0;
        for (const evaluator of allEvaluators) {
          const result = evaluator.evaluateJob(input);
          if (result.status !== 'blocked') {
            nonBlockedCount++;
          }
        }

        expect(nonBlockedCount).toBeGreaterThanOrEqual(prevNonBlockedCount);
        prevNonBlockedCount = nonBlockedCount;
      }
    });

    // E-7-3 직종에서도 단조성 검증
    it('salary를 올릴 때 non-blocked 비자 수는 감소하지 않는다 (E-7-3 직종)', () => {
      const salaryLevels = [20_000_000, 25_890_000, 31_120_000, 50_000_000];

      let prevNonBlockedCount = 0;

      for (const salary of salaryLevels) {
        const input = createJobInput({
          occupationCode: E73_OCCUPATION,
          salaryMin: salary,
          overseasHireWilling: true,
        });

        let nonBlockedCount = 0;
        for (const evaluator of allEvaluators) {
          const result = evaluator.evaluateJob(input);
          if (result.status !== 'blocked') {
            nonBlockedCount++;
          }
        }

        expect(nonBlockedCount).toBeGreaterThanOrEqual(prevNonBlockedCount);
        prevNonBlockedCount = nonBlockedCount;
      }
    });
  });

  // ==========================================================================
  // visaCode 정확성
  // "모든 evaluator는 visaCode를 정확히 반환한다"
  //
  // IFulltimeVisaEvaluator.visaCode와 evaluateJob() 결과의 visaCode 일치 검증
  // ==========================================================================
  describe('모든 evaluator는 visaCode를 정확히 반환한다', () => {
    const expectedVisaCodes = [
      'F-5',
      'F-6',
      'F-2',
      'F-4',
      'E-7-1',
      'E-7-2',
      'E-7-3',
      'D-2',
      'D-10',
    ];

    it.each(expectedVisaCodes)(
      'evaluator.visaCode === %s 이고 evaluateJob 결과에도 동일 visaCode',
      (expectedCode) => {
        const evaluator = allEvaluators.find(
          (e) => e.visaCode === expectedCode,
        );
        expect(evaluator).toBeDefined();

        const input = createJobInput({
          occupationCode: E71_OCCUPATION,
          salaryMin: E71_MIN_SALARY,
        });
        const result = evaluator!.evaluateJob(input);
        expect(result.visaCode).toBe(expectedCode);
      },
    );

    // 9개 evaluator 모두 고유한 visaCode를 가진다
    it('9개 evaluator는 모두 고유한 visaCode를 가진다', () => {
      const codes = allEvaluators.map((e) => e.visaCode);
      const uniqueCodes = new Set(codes);
      expect(uniqueCodes.size).toBe(allEvaluators.length);
    });
  });

  // ==========================================================================
  // IMMEDIATE 트랙 + overseasHireWilling 독립성
  // "모든 IMMEDIATE 트랙 비자는 overseasHireWilling과 무관하다"
  //
  // 법적 근거: F비자 소지자는 국내 거주 외국인이므로
  //           해외인재채용 의사(overseasHireWilling)와 무관하게 즉시 채용 가능
  // ==========================================================================
  describe('모든 IMMEDIATE 트랙 비자는 overseasHireWilling과 무관하다 (F-visa independence)', () => {
    // 출입국관리법 제23조 — F비자 소지자는 체류자격 내 자유취업 가능
    it.each(['F-5', 'F-6', 'F-2', 'F-4'])(
      '%s: overseasHireWilling=true와 false의 결과가 동일하다',
      (visaCode) => {
        const evaluator = fEvaluators.find((e) => e.visaCode === visaCode);
        expect(evaluator).toBeDefined();

        const inputTrue = createJobInput({
          occupationCode: E71_OCCUPATION,
          salaryMin: E71_MIN_SALARY,
          overseasHireWilling: true,
        });
        const inputFalse = createJobInput({
          occupationCode: E71_OCCUPATION,
          salaryMin: E71_MIN_SALARY,
          overseasHireWilling: false,
        });

        const resultTrue = evaluator!.evaluateJob(inputTrue);
        const resultFalse = evaluator!.evaluateJob(inputFalse);

        expect(resultTrue.status).toBe(resultFalse.status);
        expect(resultTrue.hiringTrack).toBe(resultFalse.hiringTrack);
        expect(resultTrue.hiringTrack).toBe('IMMEDIATE');
      },
    );
  });

  // ==========================================================================
  // overseasHireWilling=false → SPONSOR 트랙 없음, TRANSFER만
  // "E-7 evaluators with overseasHireWilling=false return TRANSFER track"
  //
  // 법적 근거: 해외 인재 채용 의사가 없으면 기존 E비자 보유자 이직만 가능
  //           → SPONSOR 대신 TRANSFER 트랙 반환
  // ==========================================================================
  describe('overseasHireWilling=false → E-7 evaluator는 TRANSFER 트랙만 반환', () => {
    // 출입국관리법 시행령 별표1 — E-7 비자 직장 변경은 TRANSFER 트랙
    it.each(['E-7-1', 'E-7-2', 'E-7-3'])(
      '%s: overseasHireWilling=false → hiringTrack이 TRANSFER',
      (visaCode) => {
        const evaluator = e7Evaluators.find((e) => e.visaCode === visaCode);
        expect(evaluator).toBeDefined();

        // 각 E-7 evaluator에 맞는 직종 코드 사용
        let occupationCode = E71_OCCUPATION;
        if (visaCode === 'E-7-2') occupationCode = E72_OCCUPATION;
        if (visaCode === 'E-7-3') occupationCode = E73_OCCUPATION;

        const input = createJobInput({
          occupationCode,
          salaryMin: 50_000_000, // 충분히 높은 연봉
          overseasHireWilling: false,
        });

        const result = evaluator!.evaluateJob(input);
        expect(result.hiringTrack).toBe('TRANSFER');
      },
    );

    // E-7 evaluator + overseasHireWilling=true → SPONSOR 트랙
    it.each(['E-7-1', 'E-7-2', 'E-7-3'])(
      '%s: overseasHireWilling=true → hiringTrack이 SPONSOR',
      (visaCode) => {
        const evaluator = e7Evaluators.find((e) => e.visaCode === visaCode);
        expect(evaluator).toBeDefined();

        let occupationCode = E71_OCCUPATION;
        if (visaCode === 'E-7-2') occupationCode = E72_OCCUPATION;
        if (visaCode === 'E-7-3') occupationCode = E73_OCCUPATION;

        const input = createJobInput({
          occupationCode,
          salaryMin: 50_000_000,
          overseasHireWilling: true,
        });

        const result = evaluator!.evaluateJob(input);
        expect(result.hiringTrack).toBe('SPONSOR');
      },
    );

    // TRANSITION 트랙(D-2, D-10)은 overseasHireWilling과 무관하게 항상 TRANSITION
    it.each(['D-2', 'D-10'])(
      '%s: overseasHireWilling 값과 무관하게 항상 TRANSITION 트랙',
      (visaCode) => {
        const evaluator = allEvaluators.find((e) => e.visaCode === visaCode);
        expect(evaluator).toBeDefined();

        const inputTrue = createJobInput({
          occupationCode: E71_OCCUPATION,
          salaryMin: E71_MIN_SALARY,
          overseasHireWilling: true,
        });
        const inputFalse = createJobInput({
          occupationCode: E71_OCCUPATION,
          salaryMin: E71_MIN_SALARY,
          overseasHireWilling: false,
        });

        const resultTrue = evaluator!.evaluateJob(inputTrue);
        const resultFalse = evaluator!.evaluateJob(inputFalse);

        expect(resultTrue.hiringTrack).toBe('TRANSITION');
        expect(resultFalse.hiringTrack).toBe('TRANSITION');
      },
    );
  });

  // ==========================================================================
  // 추가 통합 검증 / Additional Integration Checks
  // ==========================================================================
  describe('추가 통합 검증', () => {
    // 모든 evaluator는 blocked일 때 blockReasons가 비어있지 않다
    it('모든 evaluator: blocked일 때 blockReasons.length > 0', () => {
      const input = createJobInput({
        occupationCode: NON_E7_OCCUPATION,
        salaryMin: 10_000_000,
      });

      for (const evaluator of allEvaluators) {
        const result = evaluator.evaluateJob(input);
        // F비자는 직종 무관 항상 eligible이므로 blocked가 아닐 수 있음
        if (result.status === 'blocked') {
          expect(result.blockReasons.length).toBeGreaterThan(0);
        }
      }
    });

    // 모든 evaluator는 eligible/conditional일 때 blockReasons가 비어있다
    it('모든 evaluator: eligible/conditional일 때 blockReasons는 비어있다', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: 50_000_000,
      });

      for (const evaluator of allEvaluators) {
        const result = evaluator.evaluateJob(input);
        if (result.status === 'eligible' || result.status === 'conditional') {
          expect(result.blockReasons).toEqual([]);
        }
      }
    });

    // 모든 evaluator의 visaName과 visaNameEn이 비어있지 않다
    it('모든 evaluator: visaName과 visaNameEn이 비어있지 않다', () => {
      for (const evaluator of allEvaluators) {
        expect(evaluator.visaName.length).toBeGreaterThan(0);
        expect(evaluator.visaNameEn.length).toBeGreaterThan(0);
      }
    });

    // 모든 evaluator: evaluateJob 결과에 visaName, visaNameEn이 포함된다
    it('모든 evaluator: evaluateJob 결과에 visaName, visaNameEn이 일관성 있다', () => {
      const input = createJobInput({
        occupationCode: E71_OCCUPATION,
        salaryMin: E71_MIN_SALARY,
      });

      for (const evaluator of allEvaluators) {
        const result = evaluator.evaluateJob(input);
        expect(result.visaName).toBe(evaluator.visaName);
        expect(result.visaNameEn).toBe(evaluator.visaNameEn);
      }
    });
  });
});
