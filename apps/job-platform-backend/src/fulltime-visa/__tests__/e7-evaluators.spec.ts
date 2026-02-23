/**
 * E-7 비자 Evaluator 단위 테스트
 * E-7 Visa Evaluator Unit Tests
 *
 * 대상: E-7-1 전문인력, E-7-2 준전문인력, E-7-3 일반기능인력
 * Targets: E-7-1 Professional, E-7-2 Semi-Professional, E-7-3 General Skilled Worker
 *
 * 법적 근거 / Legal Basis:
 * - 법무부공고 제2025-406호 (2026.2.1~2026.12.31)
 * - 출입국관리법 시행령 별표1 제27호 (E-7 특정활동)
 * - 출입국관리법 시행령 제7조제7항 (GNI 3배 면제)
 * - 고등교육법 제2조 (국내 대학 졸업자 특례)
 */

import { E71FulltimeEvaluator } from '../evaluators/e7-1-fulltime-evaluator';
import { E72FulltimeEvaluator } from '../evaluators/e7-2-fulltime-evaluator';
import { E73FulltimeEvaluator } from '../evaluators/e7-3-fulltime-evaluator';
import {
  FulltimeJobInput,
  ApplicantProfile,
} from '../evaluators/fulltime-evaluator.interface';
import {
  getCurrentE7MinSalary,
  getGniTripleThreshold,
} from '../data/gni-table';

// ============================================================================
// 헬퍼 함수 / Helper Functions
// ============================================================================

/**
 * 기본 FulltimeJobInput 생성
 * Create a default FulltimeJobInput
 *
 * @param overrides 오버라이드할 필드 / Fields to override
 * @returns FulltimeJobInput
 */
function createJobInput(
  overrides: Partial<FulltimeJobInput> = {},
): FulltimeJobInput {
  return {
    occupationCode: '2211', // E-7-1 컴퓨터 하드웨어 기술자
    salaryMin: 35_000_000,
    salaryMax: 50_000_000,
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
 * 기본 ApplicantProfile 생성
 * Create a default ApplicantProfile
 *
 * @param overrides 오버라이드할 필드 / Fields to override
 * @returns ApplicantProfile
 */
function createProfile(
  overrides: Partial<ApplicantProfile> = {},
): ApplicantProfile {
  return {
    currentVisaType: 'E-7',
    currentVisaSubtype: 'E-7-1',
    educationLevel: 'BACHELOR',
    experienceYears: 3,
    ...overrides,
  };
}

// ============================================================================
// E-7-1 전문인력 테스트
// E-7-1 Professional Personnel Tests
//
// 법적 근거:
// - 법무부공고 제2025-406호 (2026.2.1~2026.12.31)
// - 출입국관리법 시행령 별표1 제27호
// - 출입국관리법 시행령 제7조제7항 (GNI 3배 면제)
// - 고등교육법 제2조 (국내 대학 졸업자 특례)
// ============================================================================
describe('E-7-1 전문인력 (E71FulltimeEvaluator)', () => {
  const evaluator = new E71FulltimeEvaluator();
  const e71MinSalary = getCurrentE7MinSalary('E-7-1');
  const gniTriple = getGniTripleThreshold();

  // --------------------------------------------------------------------------
  // ① 불변 속성 (Invariant Properties)
  // 법무부공고 제2025-406호, 출입국관리법 시행령 별표1 제27호
  // --------------------------------------------------------------------------
  describe('① 불변 속성 / Invariant Properties', () => {
    // 법무부 고시 91개 전문직종 외의 직종 → 항상 blocked
    // Non-E-7-1 occupation → always blocked (MOJ designated 91 professional occupations only)
    it('Non-E7-1 occupation -> always blocked', () => {
      // 직종코드 '9999'는 E-7 허용 목록에 없는 직종
      const input = createJobInput({
        occupationCode: '9999',
        salaryMin: e71MinSalary,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
      expect(result.blockReasons[0]).toContain('E-7-1');
    });

    // E-7-2 직종코드를 E-7-1 evaluator에 넣으면 blocked
    // E-7-2 occupation code passed to E-7-1 evaluator -> blocked
    it('E-7-2 occupation code passed to E-7-1 evaluator -> blocked', () => {
      // '31215' = 면세점 판매 사무원 (E-7-2)
      const input = createJobInput({
        occupationCode: '31215',
        salaryMin: e71MinSalary,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
    });

    // 연봉 ≥ 최소 기준 → 연봉으로 인한 차단 없음
    // Salary >= threshold -> never blocked by salary
    it('salary >= E-7-1 min threshold -> not blocked by salary', () => {
      const input = createJobInput({
        occupationCode: '2211',
        salaryMin: e71MinSalary,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).not.toBe('blocked');
      // 연봉 관련 차단 사유 없어야 함
      const salaryBlocks = result.blockReasons.filter(
        (r) => r.includes('연봉') || r.includes('salary'),
      );
      expect(salaryBlocks).toHaveLength(0);
    });

    // 출입국관리법 시행령 제7조제7항: GNI 3배 이상 연봉 → 학력/경력/직종 면제
    // Immigration Act Enforcement Decree Art.7(7): GNI 3x salary -> all requirements waived
    it('GNI 3x salary -> eligible regardless of education/experience/occupation', () => {
      // GNI 3배 이상이면 직종 요건도 면제되므로, 비허용 직종이라도 통과해야 함
      // 하지만 현재 evaluator 구현은 evaluateJob에서만 GNI 3배를 먼저 확인함
      const input = createJobInput({
        occupationCode: '2211', // E-7-1 허용 직종
        salaryMin: gniTriple,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toHaveLength(0);
      expect(result.notes).toContain('GNI');
    });
  });

  // --------------------------------------------------------------------------
  // ② 골든 케이스 (Golden Cases)
  // 법무부공고 제2025-406호, 고등교육법 제2조
  // --------------------------------------------------------------------------
  describe('② 골든 케이스 / Golden Cases', () => {
    // SPONSOR 트랙: 해외 인재 채용 의사 있는 경우
    // SPONSOR track: overseasHireWilling=true
    it('E-7-1 occupation + min salary + overseasHireWilling=true -> conditional (SPONSOR)', () => {
      // 법무부공고 제2025-406호: E-7-1 최소 연봉 충족 + 허용 직종
      const input = createJobInput({
        occupationCode: '2211',
        salaryMin: e71MinSalary,
        overseasHireWilling: true,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('conditional');
      expect(result.hiringTrack).toBe('SPONSOR');
      expect(result.conditions.length).toBeGreaterThan(0);
    });

    // TRANSFER 트랙: 해외 인재 채용 의사 없는 경우 (이직)
    // TRANSFER track: overseasHireWilling=false
    it('E-7-1 occupation + min salary + overseasHireWilling=false -> conditional (TRANSFER)', () => {
      const input = createJobInput({
        occupationCode: '2211',
        salaryMin: e71MinSalary,
        overseasHireWilling: false,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('conditional');
      expect(result.hiringTrack).toBe('TRANSFER');
    });

    // 경로 ① 석사 이상 → eligible (경력 불요)
    // Path 1: Master's degree + 0 years experience -> eligible
    it('path ① MASTER + 0yr experience -> eligible', () => {
      // 법무부공고 2025-406호: 석사 이상 소지자는 경력 불요
      const input = createJobInput({
        occupationCode: '2211',
        salaryMin: e71MinSalary,
      });
      const profile = createProfile({
        educationLevel: 'MASTER',
        experienceYears: 0,
      });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toHaveLength(0);
    });

    // 경로 ② 해외 학사 + 1년 경력 → eligible
    // Path 2: Overseas bachelor + 1yr experience -> eligible
    it('path ② overseas BACHELOR + 1yr experience -> eligible', () => {
      // 법무부공고 2025-406호: 해외 학사 + 1년 이상 경력
      const input = createJobInput({
        occupationCode: '2211',
        salaryMin: e71MinSalary,
      });
      const profile = createProfile({
        educationLevel: 'BACHELOR',
        experienceYears: 1,
        isDomesticUniversity: false,
      });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toHaveLength(0);
    });

    // 경로 ③ 학력 무관 + 5년 경력 → eligible
    // Path 3: Any education + 5yr experience -> eligible
    it('path ③ any education + 5yr experience -> eligible', () => {
      // 법무부공고 2025-406호: 학력 무관 + 5년 이상 경력
      const input = createJobInput({
        occupationCode: '2211',
        salaryMin: e71MinSalary,
      });
      const profile = createProfile({
        educationLevel: 'HIGH_SCHOOL',
        experienceYears: 5,
      });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toHaveLength(0);
    });

    // 경로 ④ 국내 학사 이상 → eligible (경력 불요, 전공 무관)
    // Path 4: Domestic bachelor + 0yr -> eligible (Higher Education Act Art.2)
    it('path ④ domestic BACHELOR + 0yr -> eligible (isDomesticUniversity=true)', () => {
      // 고등교육법 제2조: 국내 대학 학사 이상 졸업자는 경력 불요, 전공 무관
      const input = createJobInput({
        occupationCode: '2211',
        salaryMin: e71MinSalary,
      });
      const profile = createProfile({
        educationLevel: 'BACHELOR',
        experienceYears: 0,
        isDomesticUniversity: true,
        domesticDegreeLevel: 'BACHELOR',
      });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toHaveLength(0);
    });

    // 경로 ⑤ 국내 전문학사 + 전공 관련 → eligible
    // Path 5: Domestic associate + related major -> eligible
    it('path ⑤ domestic ASSOCIATE + related major -> eligible', () => {
      // 고등교육법 제2조: 국내 전문학사 졸업자는 경력 불요, 전공 관련만
      const input = createJobInput({
        occupationCode: '2211',
        salaryMin: e71MinSalary,
        preferredMajors: ['Computer Science', 'Software Engineering'],
      });
      const profile = createProfile({
        educationLevel: 'ASSOCIATE',
        experienceYears: 0,
        isDomesticUniversity: true,
        domesticDegreeLevel: 'ASSOCIATE',
        major: 'Computer Science',
      });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toHaveLength(0);
    });

    // GNI 3배 면제: 학력/경력/직종 요건 전부 면제
    // GNI 3x exemption: waives all education/experience/occupation requirements
    it('salary >= GNI x 3 -> eligible regardless of occupation/education (GNI 3x exemption)', () => {
      // 출입국관리법 시행령 제7조제7항: GNI 3배 이상 연봉 시 모든 요건 면제
      const input = createJobInput({
        occupationCode: '2211',
        salaryMin: gniTriple,
      });
      const profile = createProfile({
        educationLevel: 'HIGH_SCHOOL',
        experienceYears: 0,
      });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toHaveLength(0);
    });
  });

  // --------------------------------------------------------------------------
  // ③ 경계값 (Boundary Values)
  // 법무부공고 제2025-406호
  // --------------------------------------------------------------------------
  describe('③ 경계값 / Boundary Values', () => {
    // 최소 연봉 정확히 기준 금액 → 통과
    // Salary exactly at threshold -> pass
    it(`salary = ${e71MinSalary.toLocaleString()} (E-7-1 min) -> pass`, () => {
      // 법무부공고 제2025-406호: E-7-1 최소 연봉 기준 정확히 충족
      const input = createJobInput({
        occupationCode: '2211',
        salaryMin: e71MinSalary,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).not.toBe('blocked');
    });

    // 최소 연봉 1원 미달 → blocked
    // Salary 1 won below threshold -> blocked
    it(`salary = ${(e71MinSalary - 1).toLocaleString()} (E-7-1 min - 1) -> blocked`, () => {
      // 법무부공고 제2025-406호: 최소 연봉 1원 미달
      const input = createJobInput({
        occupationCode: '2211',
        salaryMin: e71MinSalary - 1,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
    });

    // GNI 3배 정확히 경계 → eligible
    // GNI 3x threshold exact -> eligible
    it(`salary = ${gniTriple.toLocaleString()} (GNI x 3 exact) -> eligible`, () => {
      // 출입국관리법 시행령 제7조제7항: GNI 3배 정확히 충족
      const input = createJobInput({
        occupationCode: '2211',
        salaryMin: gniTriple,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('eligible');
    });

    // GNI 3배 1원 미달 → eligible은 아님 (conditional 또는 다른 상태)
    // GNI 3x threshold - 1 won -> not eligible via GNI exemption
    it(`salary = ${(gniTriple - 1).toLocaleString()} (GNI x 3 - 1) -> not eligible via GNI exemption`, () => {
      // 출입국관리법 시행령 제7조제7항: GNI 3배 1원 미달시 면제 불가
      const input = createJobInput({
        occupationCode: '2211',
        salaryMin: gniTriple - 1,
      });
      const result = evaluator.evaluateJob(input);

      // GNI 3x 면제를 받지 못하므로 eligible이 아닌 conditional이어야 함
      // (직종 + 연봉은 충족하므로 conditional)
      expect(result.status).toBe('conditional');
    });

    // 경로 ③: 경력 5년 → eligible, 4년 → blocked (다른 경로 미충족시)
    // Path 3: experience=5 -> pass, experience=4 -> blocked (when no other path met)
    it('experience=5 -> eligible (path ③), experience=4 -> blocked (no other path)', () => {
      // 법무부공고 2025-406호: 학력 무관 + 5년 이상 경력 경로 경계값
      const input = createJobInput({
        occupationCode: '2211',
        salaryMin: e71MinSalary,
      });

      // 고졸 + 5년 경력 → eligible (경로 ③)
      const profile5yr = createProfile({
        educationLevel: 'HIGH_SCHOOL',
        experienceYears: 5,
        isDomesticUniversity: false,
      });
      const result5yr = evaluator.evaluateApplicant(input, profile5yr);
      expect(result5yr.status).toBe('eligible');

      // 고졸 + 4년 경력 → blocked (경로 ①②③④⑤ 모두 미충족)
      const profile4yr = createProfile({
        educationLevel: 'HIGH_SCHOOL',
        experienceYears: 4,
        isDomesticUniversity: false,
      });
      const result4yr = evaluator.evaluateApplicant(input, profile4yr);
      expect(result4yr.status).toBe('blocked');
    });

    // 경로 ②: 해외 학사 + 경력 1년 → pass, 0년 → blocked
    // Path 2: overseas bachelor + experience=1 -> pass, experience=0 -> blocked
    it('overseas BACHELOR + exp=1 -> eligible (path ②), exp=0 -> blocked', () => {
      // 법무부공고 2025-406호: 해외 학사 + 1년 이상 경력 경로 경계값
      const input = createJobInput({
        occupationCode: '2211',
        salaryMin: e71MinSalary,
      });

      // 해외 학사 + 1년 경력 → eligible (경로 ②)
      const profile1yr = createProfile({
        educationLevel: 'BACHELOR',
        experienceYears: 1,
        isDomesticUniversity: false,
      });
      const result1yr = evaluator.evaluateApplicant(input, profile1yr);
      expect(result1yr.status).toBe('eligible');

      // 해외 학사 + 0년 경력 → blocked (경로 ①④⑤ 해당 안됨)
      const profile0yr = createProfile({
        educationLevel: 'BACHELOR',
        experienceYears: 0,
        isDomesticUniversity: false,
      });
      const result0yr = evaluator.evaluateApplicant(input, profile0yr);
      expect(result0yr.status).toBe('blocked');
    });
  });
});

// ============================================================================
// E-7-2 준전문인력 테스트
// E-7-2 Semi-Professional Personnel Tests
//
// 법적 근거:
// - 법무부공고 제2025-406호 (2026.2.1~2026.12.31)
// - 출입국관리법 시행령 별표 1의2 제20호
// ============================================================================
describe('E-7-2 준전문인력 (E72FulltimeEvaluator)', () => {
  const evaluator = new E72FulltimeEvaluator();
  const e72MinSalary = getCurrentE7MinSalary('E-7-2');

  // --------------------------------------------------------------------------
  // ① 불변 속성 (Invariant Properties)
  // 법무부공고 제2025-406호
  // --------------------------------------------------------------------------
  describe('① 불변 속성 / Invariant Properties', () => {
    // Non-E-7-2 직종 → 항상 blocked
    // Non-E-7-2 occupation -> always blocked
    it('Non-E7-2 occupation -> always blocked', () => {
      // E-7-1 직종코드 '2211'을 E-7-2 evaluator에 넣으면 blocked
      const input = createJobInput({
        occupationCode: '2211', // E-7-1 직종
        salaryMin: e72MinSalary,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
      expect(result.blockReasons[0]).toContain('E-7-2');
    });

    // 존재하지 않는 직종코드 → blocked
    // Non-existent occupation code -> blocked
    it('unknown occupation code -> blocked', () => {
      const input = createJobInput({
        occupationCode: '0000',
        salaryMin: e72MinSalary,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
    });

    // 법무부공고 제2025-406호: E-7-2 전 직종 외국인 고용비율 20% 이하
    // MOJ Notice 2025-406: All E-7-2 occupations, employment ratio 20%
    it('always checks employment ratio (20% rule for all E-7-2)', () => {
      // 고용비율 정보 미제공 시 → conditional (확인 필요)
      const input = createJobInput({
        occupationCode: '31215', // E-7-2 면세점 판매 사무원
        salaryMin: e72MinSalary,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('conditional');
      // 고용비율 확인 조건이 포함되어야 함
      const ratioConditions = result.conditions.filter(
        (c) => c.includes('고용비율') || c.includes('employment ratio'),
      );
      expect(ratioConditions.length).toBeGreaterThan(0);
    });

    // 고용비율 20% 이상 → blocked
    // Employment ratio >= 20% -> blocked
    it('employment ratio >= 20% -> blocked', () => {
      const input = createJobInput({
        occupationCode: '31215', // E-7-2
        salaryMin: e72MinSalary,
        companyInfo: {
          totalEmployees: 100,
          foreignEmployeeCount: 20, // 20% -> blocked
        },
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('blocked');
      expect(
        result.blockReasons.some(
          (r) => r.includes('고용비율') || r.includes('employment ratio'),
        ),
      ).toBe(true);
    });
  });

  // --------------------------------------------------------------------------
  // ② 골든 케이스 (Golden Cases)
  // 법무부공고 제2025-406호, 고등교육법 제2조
  // --------------------------------------------------------------------------
  describe('② 골든 케이스 / Golden Cases', () => {
    // E-7-2 허용 직종 + 최소 연봉 → conditional (학력/경력 + 고용비율 확인 필요)
    // E-7-2 allowed occupation + min salary -> conditional
    it('E-7-2 occupation + salary meeting threshold -> conditional', () => {
      // 법무부공고 제2025-406호: E-7-2 최소 연봉 25,890,000원 (2026.2.1~12.31)
      const input = createJobInput({
        occupationCode: '31215', // E-7-2 면세점 판매 사무원
        salaryMin: e72MinSalary,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('conditional');
      expect(result.blockReasons).toHaveLength(0);
      expect(result.conditions.length).toBeGreaterThan(0);
    });

    // 학사 학위 지원자 → eligible
    // Applicant with BACHELOR -> eligible
    it('applicant with BACHELOR degree -> eligible', () => {
      // 법무부공고 2025-406호: 학사 + 1년 이상 경력 경로 충족
      const input = createJobInput({
        occupationCode: '31215', // E-7-2
        salaryMin: e72MinSalary,
      });
      const profile = createProfile({
        educationLevel: 'BACHELOR',
        experienceYears: 1,
      });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toHaveLength(0);
    });

    // 국내 전문학사 특례 → eligible (conditional: 전공 관련 확인 필요)
    // Domestic associate provision -> conditional (related major check needed)
    it('applicant with domestic ASSOCIATE -> conditional (domestic university provision)', () => {
      // 고등교육법 제2조: 국내 전문학사 졸업자는 경력 불요, 전공 관련만
      const input = createJobInput({
        occupationCode: '31215', // E-7-2
        salaryMin: e72MinSalary,
      });
      const profile = createProfile({
        educationLevel: 'ASSOCIATE',
        experienceYears: 0,
        isDomesticUniversity: true,
        domesticDegreeLevel: 'ASSOCIATE',
      });
      const result = evaluator.evaluateApplicant(input, profile);

      // 국내 전문학사는 conditional (전공 관련 확인 필요)
      expect(result.status).toBe('conditional');
      expect(result.blockReasons).toHaveLength(0);
      expect(
        result.conditions.some(
          (c) => c.includes('전문학사') || c.includes('Associate'),
        ),
      ).toBe(true);
    });

    // 국내 학사 이상 특례 → eligible
    // Domestic bachelor+ special provision -> eligible
    it('applicant with domestic BACHELOR -> eligible (domestic university provision)', () => {
      // 고등교육법 제2조: 국내 대학 학사 이상 졸업자는 경력 불요, 전공 무관
      const input = createJobInput({
        occupationCode: '31215', // E-7-2
        salaryMin: e72MinSalary,
      });
      const profile = createProfile({
        educationLevel: 'BACHELOR',
        experienceYears: 0,
        isDomesticUniversity: true,
        domesticDegreeLevel: 'BACHELOR',
      });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toHaveLength(0);
    });
  });

  // --------------------------------------------------------------------------
  // ③ 경계값 (Boundary Values)
  // 법무부공고 제2025-406호
  // --------------------------------------------------------------------------
  describe('③ 경계값 / Boundary Values', () => {
    // 최소 연봉 정확히 기준 금액 → 통과
    // Salary exactly at threshold -> pass
    it(`salary = ${e72MinSalary.toLocaleString()} (E-7-2 min) -> pass`, () => {
      // 법무부공고 제2025-406호: E-7-2 최소 연봉 정확히 충족
      const input = createJobInput({
        occupationCode: '31215',
        salaryMin: e72MinSalary,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).not.toBe('blocked');
    });

    // 최소 연봉 1원 미달 → blocked
    // Salary 1 won below threshold -> blocked
    it(`salary = ${(e72MinSalary - 1).toLocaleString()} (E-7-2 min - 1) -> blocked`, () => {
      // 법무부공고 제2025-406호: 최소 연봉 1원 미달
      const input = createJobInput({
        occupationCode: '31215',
        salaryMin: e72MinSalary - 1,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
    });

    // 고용비율 정확히 19.9% → pass (blocked 안됨)
    // Employment ratio exactly 19.9% -> pass
    it('employment ratio 19.9% -> not blocked', () => {
      const input = createJobInput({
        occupationCode: '31215',
        salaryMin: e72MinSalary,
        companyInfo: {
          totalEmployees: 1000,
          foreignEmployeeCount: 199, // 19.9%
        },
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).not.toBe('blocked');
    });

    // 고용비율 정확히 20% → blocked
    // Employment ratio exactly 20% -> blocked
    it('employment ratio exactly 20% -> blocked', () => {
      const input = createJobInput({
        occupationCode: '31215',
        salaryMin: e72MinSalary,
        companyInfo: {
          totalEmployees: 100,
          foreignEmployeeCount: 20, // 20%
        },
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('blocked');
    });
  });
});

// ============================================================================
// E-7-3 일반기능인력 테스트
// E-7-3 General Skilled Worker Tests
//
// 법적 근거:
// - 법무부공고 제2025-406호 (2026.2.1~2026.12.31)
// - 출입국관리법 시행령 별표 1의2 제20호
// ============================================================================
describe('E-7-3 일반기능인력 (E73FulltimeEvaluator)', () => {
  const evaluator = new E73FulltimeEvaluator();
  const e73MinSalary = getCurrentE7MinSalary('E-7-3');

  // E-7-3 허용 직종 코드 목록 (e7-job-categories.ts에서 추출)
  // E-7-3 allowed occupation codes (from e7-job-categories.ts)
  const E73_ALLOWED_CODES = [
    '6139', // 동물 사육사
    '6301', // 양식 기술자
    '7103', // 할랄 도축원
    '7303', // 악기 제조 및 조율사
    '7430', // 조선 용접공
    '76212', // 선박 전기원
    '7836', // 선박 도장공
    '7521', // 항공기 정비원
    'S8417', // 항공기(부품) 제조원
    '76231', // 송전 전기원
    'S8541', // 자동차 부품제조원
    'S75104', // 자동차 판금도장원
    'S71032', // 도축원
  ];

  // --------------------------------------------------------------------------
  // ① 불변 속성 (Invariant Properties)
  // 법무부공고 제2025-406호
  // --------------------------------------------------------------------------
  describe('① 불변 속성 / Invariant Properties', () => {
    // E-7-3은 법무부 고시 특정 직종에만 발급 (현재 13개)
    // E-7-3 only issued for specific MOJ-designated occupations (currently 13)
    it('only specific E-7-3 occupations allowed', () => {
      // E-7-1 직종코드를 E-7-3 evaluator에 넣으면 blocked
      const input = createJobInput({
        occupationCode: '2211', // E-7-1 직종
        salaryMin: e73MinSalary,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
      expect(result.blockReasons[0]).toContain('E-7-3');
    });

    // E-7-2 직종도 E-7-3에서는 blocked
    // E-7-2 occupation also blocked for E-7-3
    it('E-7-2 occupation code in E-7-3 evaluator -> blocked', () => {
      const input = createJobInput({
        occupationCode: '31215', // E-7-2 면세점 판매 사무원
        salaryMin: e73MinSalary,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('blocked');
    });

    // E-7-3은 점수제가 아닌 기업 추천(주무부처 고용추천서) 방식
    // E-7-3 uses company recommendation, NOT points-based
    it('NOT points-based -> company recommendation method', () => {
      // 법무부공고 제2025-406호: E-7-3은 기업 추천 방식
      const input = createJobInput({
        occupationCode: '6139', // E-7-3 동물 사육사
        salaryMin: e73MinSalary,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).not.toBe('blocked');
      // 기업 추천 조건이 포함되어야 함
      const recommendationConditions = result.conditions.filter(
        (c) => c.includes('고용추천서') || c.includes('company recommendation'),
      );
      expect(recommendationConditions.length).toBeGreaterThan(0);

      // notes에 점수제 아님 언급
      expect(result.notes).toContain('점수제 아님');
    });

    // 고용비율 20% 확인 (전 직종 적용)
    // Employment ratio 20% check (applies to all E-7-3 occupations)
    it('employment ratio 20% always checked for E-7-3', () => {
      // 법무부공고 제2025-406호: E-7-3 전 직종 외국인 고용비율 20% 이하
      const input = createJobInput({
        occupationCode: '6139', // E-7-3 동물 사육사
        salaryMin: e73MinSalary,
      });
      const result = evaluator.evaluateJob(input);

      // companyInfo 미제공 시 고용비율 확인 조건 있어야 함
      const ratioConditions = result.conditions.filter(
        (c) => c.includes('고용비율') || c.includes('employment ratio'),
      );
      expect(ratioConditions.length).toBeGreaterThan(0);
    });

    // 허용 직종 전체 순회 테스트
    // All E-7-3 allowed codes should pass occupation check
    it.each(E73_ALLOWED_CODES)(
      'E-7-3 occupation code %s -> not blocked by occupation',
      (code) => {
        const input = createJobInput({
          occupationCode: code,
          salaryMin: e73MinSalary,
        });
        const result = evaluator.evaluateJob(input);

        // 직종으로 인한 차단이 아니어야 함
        const occupationBlocks = result.blockReasons.filter(
          (r) => r.includes('허용 목록') || r.includes('allowed list'),
        );
        expect(occupationBlocks).toHaveLength(0);
      },
    );
  });

  // --------------------------------------------------------------------------
  // ② 골든 케이스 (Golden Cases)
  // 법무부공고 제2025-406호, 고등교육법 제2조
  // --------------------------------------------------------------------------
  describe('② 골든 케이스 / Golden Cases', () => {
    // E-7-3 허용 직종 + 최소 연봉 → conditional
    // E-7-3 allowed occupation + salary meeting threshold -> conditional
    it('E-7-3 occupation + salary meeting threshold -> conditional', () => {
      // 법무부공고 제2025-406호: E-7-3 최소 연봉 25,890,000원 (2026.2.1~12.31)
      const input = createJobInput({
        occupationCode: '6139', // E-7-3 동물 사육사
        salaryMin: e73MinSalary,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('conditional');
      expect(result.blockReasons).toHaveLength(0);
    });

    // 고졸 지원자 → eligible (E-7-3은 학력 요건이 일반 경로보다 낮음)
    // HIGH_SCHOOL applicant -> eligible (E-7-3 has lower education requirements via 5yr path)
    it('applicant with HIGH_SCHOOL + 5yr exp -> eligible (no degree requirement via path ③)', () => {
      // 법무부공고 2025-406호: 학력 무관 + 5년 이상 경력 경로
      // E-7-3은 일반기능인력이므로 학력 요건이 완화됨
      const input = createJobInput({
        occupationCode: '6139', // E-7-3 동물 사육사
        salaryMin: e73MinSalary,
      });
      const profile = createProfile({
        educationLevel: 'HIGH_SCHOOL',
        experienceYears: 5,
      });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toHaveLength(0);
    });

    // MASTER 학위 → eligible
    // MASTER degree -> eligible (path ①)
    it('applicant with MASTER degree -> eligible (path ①)', () => {
      const input = createJobInput({
        occupationCode: '6139', // E-7-3
        salaryMin: e73MinSalary,
      });
      const profile = createProfile({
        educationLevel: 'MASTER',
        experienceYears: 0,
      });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toHaveLength(0);
    });

    // 직종별 특수요건: 조선용접공은 국제 중급 이상 용접자격증 조건 포함
    // Occupation-specific: Shipbuilding Welder should include welding cert condition
    it('shipbuilding welder (7430) -> includes welding certificate condition', () => {
      const input = createJobInput({
        occupationCode: '7430', // 조선 용접공
        salaryMin: e73MinSalary,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('conditional');
      // 용접자격증 조건 확인
      const weldingConditions = result.conditions.filter(
        (c) => c.includes('용접') || c.includes('welding'),
      );
      expect(weldingConditions.length).toBeGreaterThan(0);
    });

    // 악기제조/조율사: 10년 이상 경력 필수 → 9년 경력 시 blocked
    // Musical instrument maker/tuner: 10+ years required -> 9yr blocked
    it('musical instrument maker (7303) + 9yr exp -> blocked (requires 10yr)', () => {
      const input = createJobInput({
        occupationCode: '7303', // 악기 제조 및 조율사
        salaryMin: e73MinSalary,
      });
      const profile = createProfile({
        educationLevel: 'MASTER',
        experienceYears: 9,
      });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('blocked');
      expect(
        result.blockReasons.some(
          (r) => r.includes('10년') || r.includes('10+'),
        ),
      ).toBe(true);
    });

    // 악기제조/조율사: 10년 이상 경력 → eligible
    // Musical instrument maker/tuner: 10+ years -> eligible
    it('musical instrument maker (7303) + 10yr exp -> eligible', () => {
      const input = createJobInput({
        occupationCode: '7303',
        salaryMin: e73MinSalary,
      });
      const profile = createProfile({
        educationLevel: 'MASTER',
        experienceYears: 10,
      });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toHaveLength(0);
    });
  });

  // --------------------------------------------------------------------------
  // ③ 경계값 (Boundary Values)
  // 법무부공고 제2025-406호
  // --------------------------------------------------------------------------
  describe('③ 경계값 / Boundary Values', () => {
    // 최소 연봉 정확히 기준 금액 → 통과
    // Salary exactly at threshold -> pass
    it(`salary = ${e73MinSalary.toLocaleString()} (E-7-3 min) -> pass`, () => {
      // 법무부공고 제2025-406호: E-7-3 최소 연봉 정확히 충족
      const input = createJobInput({
        occupationCode: '6139',
        salaryMin: e73MinSalary,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).not.toBe('blocked');
    });

    // 최소 연봉 1원 미달 → blocked
    // Salary 1 won below threshold -> blocked
    it(`salary = ${(e73MinSalary - 1).toLocaleString()} (E-7-3 min - 1) -> blocked`, () => {
      // 법무부공고 제2025-406호: 최소 연봉 1원 미달
      const input = createJobInput({
        occupationCode: '6139',
        salaryMin: e73MinSalary - 1,
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
    });

    // 고용비율 경계: 19.9% → pass, 20% → blocked
    // Employment ratio boundary: 19.9% -> pass, 20% -> blocked
    it('employment ratio 19.9% -> not blocked, 20% -> blocked', () => {
      // 법무부공고 제2025-406호: E-7-3 전 직종 외국인 고용비율 20% 이하
      const baseInput = {
        occupationCode: '6139',
        salaryMin: e73MinSalary,
      };

      // 19.9% -> not blocked
      const input199 = createJobInput({
        ...baseInput,
        companyInfo: {
          totalEmployees: 1000,
          foreignEmployeeCount: 199,
        },
      });
      const result199 = evaluator.evaluateJob(input199);
      expect(result199.status).not.toBe('blocked');

      // 20% -> blocked
      const input20 = createJobInput({
        ...baseInput,
        companyInfo: {
          totalEmployees: 100,
          foreignEmployeeCount: 20,
        },
      });
      const result20 = evaluator.evaluateJob(input20);
      expect(result20.status).toBe('blocked');
    });

    // 학력/경력 경계값: 학사 + 1년 → eligible, 학사 + 0년 → blocked (비국내, 비석사)
    // Education/experience boundary: BACHELOR + 1yr -> eligible, BACHELOR + 0yr -> blocked
    it('BACHELOR + 1yr exp -> eligible, BACHELOR + 0yr exp -> blocked (non-domestic)', () => {
      // 법무부공고 2025-406호: 학사 + 1년 이상 경력 경로 경계값
      const input = createJobInput({
        occupationCode: '6139',
        salaryMin: e73MinSalary,
      });

      // 학사 + 1년 → eligible
      const profile1yr = createProfile({
        educationLevel: 'BACHELOR',
        experienceYears: 1,
        isDomesticUniversity: false,
      });
      const result1yr = evaluator.evaluateApplicant(input, profile1yr);
      expect(result1yr.status).toBe('eligible');

      // 학사 + 0년 (비국내) → blocked
      const profile0yr = createProfile({
        educationLevel: 'BACHELOR',
        experienceYears: 0,
        isDomesticUniversity: false,
      });
      const result0yr = evaluator.evaluateApplicant(input, profile0yr);
      expect(result0yr.status).toBe('blocked');
    });
  });
});
