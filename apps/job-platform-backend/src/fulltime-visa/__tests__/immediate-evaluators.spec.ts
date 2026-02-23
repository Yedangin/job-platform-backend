/**
 * IMMEDIATE 트랙 Evaluator 테스트 (F-5, F-6, F-2, F-4)
 * IMMEDIATE Track Evaluator Tests
 *
 * 테스트 대상: F비자 소지자 즉시 채용 가능 여부 판정
 * Test target: F visa holder immediate hiring eligibility evaluation
 *
 * 각 Evaluator를 직접 인스턴스화하여 테스트합니다 (서비스 레이어 우회).
 * Each evaluator is instantiated directly (bypassing the service layer).
 *
 * 테스트 카테고리:
 * ① 불변 (Invariant): 항상 참인 속성 — 어떤 입력에서도 변하지 않는 조건
 * ② 골든 케이스 (Golden): 대표 입출력 검증 — 핵심 시나리오
 * ③ 경계 (Boundary): 엣지 케이스 — 하위 비자 유형, 인구감소지역 전환 등
 */

import { F5FulltimeEvaluator } from '../evaluators/f5-fulltime-evaluator';
import { F6FulltimeEvaluator } from '../evaluators/f6-fulltime-evaluator';
import { F2FulltimeEvaluator } from '../evaluators/f2-fulltime-evaluator';
import { F4FulltimeEvaluator } from '../evaluators/f4-fulltime-evaluator';
import {
  FulltimeJobInput,
  ApplicantProfile,
} from '../evaluators/fulltime-evaluator.interface';

// ============================================================================
// 헬퍼 함수 / Helper Functions
// ============================================================================

/**
 * 기본 FulltimeJobInput 생성 헬퍼
 * Helper to create a default FulltimeJobInput
 *
 * 기본값: IT 전문직(2211), 서울, 비인구감소지역
 * Defaults: IT professional (2211), Seoul, non-depopulation area
 */
function createJobInput(
  overrides: Partial<FulltimeJobInput> = {},
): FulltimeJobInput {
  return {
    occupationCode: '2211', // 응용 소프트웨어 개발자 / Application SW Developer
    salaryMin: 30_000_000,
    salaryMax: 50_000_000,
    experienceLevel: 'JUNIOR',
    educationLevel: 'BACHELOR',
    weeklyWorkHours: 40,
    overseasHireWilling: false,
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
 * Helper to create a default ApplicantProfile
 */
function createProfile(
  visaType: string,
  overrides: Partial<ApplicantProfile> = {},
): ApplicantProfile {
  return {
    currentVisaType: visaType,
    educationLevel: 'BACHELOR',
    experienceYears: 3,
    ...overrides,
  };
}

// ============================================================================
// F-5 영주비자 테스트
// F-5 Permanent Residence Visa Tests
//
// 법령 근거: 출입국관리법 시행령 별표1 제28호
// Legal basis: Immigration Act Enforcement Decree Appendix 1, No. 28
//
// 핵심: 내국인과 동일한 취업 권리 — 모든 직종/연봉/학력에 무관하게 항상 eligible
// Core: Same employment rights as Korean nationals — always eligible
// ============================================================================
describe('F5FulltimeEvaluator', () => {
  const evaluator = new F5FulltimeEvaluator();

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ① 불변 (Invariant)
  // 출입국관리법 시행령 별표1 제28호: F-5 영주자격 — 활동 제한 없음
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  describe('① 불변: 항상 eligible (활동 제한 없음)', () => {
    // 법령 근거: 출입국관리법 시행령 별표1 제28호 — F-5 영주자격, 활동 제한 없음
    it('어떤 직종이든 status=eligible, hiringTrack=IMMEDIATE', () => {
      const inputs = [
        createJobInput({ occupationCode: '2211' }), // IT 전문직
        createJobInput({ occupationCode: '9111' }), // 단순노무
        createJobInput({ occupationCode: 'ENTERTAINMENT' }), // 유흥업소
        createJobInput({ occupationCode: '4221' }), // 피부미용사 (F-4 공공이익 제한)
      ];

      for (const input of inputs) {
        const result = evaluator.evaluateJob(input);
        expect(result.status).toBe('eligible');
        expect(result.hiringTrack).toBe('IMMEDIATE');
        expect(result.blockReasons).toEqual([]);
        expect(result.visaCode).toBe('F-5');
      }
    });

    // 법령 근거: 출입국관리법 시행령 별표1 제28호 — 연봉/학력 무관
    it('연봉이나 학력에 무관하게 항상 eligible', () => {
      const lowSalary = createJobInput({
        salaryMin: 10_000_000,
        salaryMax: 15_000_000,
        educationLevel: 'HIGH_SCHOOL',
      });
      const highSalary = createJobInput({
        salaryMin: 200_000_000,
        salaryMax: 300_000_000,
        educationLevel: 'DOCTORATE',
      });

      expect(evaluator.evaluateJob(lowSalary).status).toBe('eligible');
      expect(evaluator.evaluateJob(highSalary).status).toBe('eligible');
    });

    // 법령 근거: 출입국관리법 시행령 별표1 제28호 — 별도 허가 불필요
    it('requiredPermit은 항상 null (별도 허가 불필요)', () => {
      const result = evaluator.evaluateJob(createJobInput());
      expect(result.requiredPermit).toBeNull();
    });
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ② 골든 케이스 (Golden)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  describe('② 골든: 대표 입출력 검증', () => {
    // 법령 근거: 출입국관리법 시행령 별표1 제28호 — 즉시 채용 가능
    it('evaluateJob: IT 전문직 → eligible, IMMEDIATE, estimatedDays=0', () => {
      const input = createJobInput({ occupationCode: '2211' });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('eligible');
      expect(result.hiringTrack).toBe('IMMEDIATE');
      expect(result.estimatedDays).toBe(0);
      expect(result.conditions).toEqual([]);
      expect(result.blockReasons).toEqual([]);
      expect(result.requiredDocuments.length).toBeGreaterThan(0);
    });

    // 법령 근거: 출입국관리법 시행령 별표1 제28호 — applicant 평가도 동일
    it('evaluateApplicant: 프로필과 무관하게 항상 eligible', () => {
      const input = createJobInput();
      const profile = createProfile('F-5', {
        educationLevel: 'HIGH_SCHOOL',
        experienceYears: 0,
      });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.hiringTrack).toBe('IMMEDIATE');
    });
  });
});

// ============================================================================
// F-6 결혼이민비자 테스트
// F-6 Marriage Immigration Visa Tests
//
// 법령 근거: 출입국관리법 시행령 별표1 제28호의2
// Legal basis: Immigration Act Enforcement Decree Appendix 1, No. 28-2
//
// 핵심: 내국인과 동일한 취업 권리 — 모든 직종/연봉/학력에 무관하게 항상 eligible
// Core: Same employment rights as Korean nationals — always eligible
// ============================================================================
describe('F6FulltimeEvaluator', () => {
  const evaluator = new F6FulltimeEvaluator();

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ① 불변 (Invariant)
  // 출입국관리법 시행령 별표1 제28호의2: F-6 결혼이민자 — 활동 제한 없음
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  describe('① 불변: 항상 eligible (활동 제한 없음)', () => {
    // 법령 근거: 출입국관리법 시행령 별표1 제28호의2 — F-6 결혼이민, 활동 제한 없음
    it('어떤 직종이든 status=eligible, hiringTrack=IMMEDIATE', () => {
      const inputs = [
        createJobInput({ occupationCode: '2211' }), // IT 전문직
        createJobInput({ occupationCode: '9111' }), // 단순노무
        createJobInput({ occupationCode: 'ENTERTAINMENT' }), // 유흥업소
        createJobInput({ occupationCode: '4221' }), // 피부미용사
      ];

      for (const input of inputs) {
        const result = evaluator.evaluateJob(input);
        expect(result.status).toBe('eligible');
        expect(result.hiringTrack).toBe('IMMEDIATE');
        expect(result.blockReasons).toEqual([]);
        expect(result.visaCode).toBe('F-6');
      }
    });

    // 법령 근거: 출입국관리법 시행령 별표1 제28호의2 — 연봉/학력 무관
    it('연봉이나 학력에 무관하게 항상 eligible', () => {
      const lowSalary = createJobInput({
        salaryMin: 10_000_000,
        salaryMax: 15_000_000,
        educationLevel: 'HIGH_SCHOOL',
      });
      const highSalary = createJobInput({
        salaryMin: 200_000_000,
        salaryMax: 300_000_000,
        educationLevel: 'DOCTORATE',
      });

      expect(evaluator.evaluateJob(lowSalary).status).toBe('eligible');
      expect(evaluator.evaluateJob(highSalary).status).toBe('eligible');
    });

    // 법령 근거: 출입국관리법 시행령 별표1 제28호의2 — 별도 허가 불필요
    it('requiredPermit은 항상 null (별도 허가 불필요)', () => {
      const result = evaluator.evaluateJob(createJobInput());
      expect(result.requiredPermit).toBeNull();
    });
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ② 골든 케이스 (Golden)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  describe('② 골든: 대표 입출력 검증', () => {
    // 법령 근거: 출입국관리법 시행령 별표1 제28호의2 — 즉시 채용 가능
    it('evaluateJob: IT 전문직 → eligible, IMMEDIATE, estimatedDays=0', () => {
      const input = createJobInput({ occupationCode: '2211' });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('eligible');
      expect(result.hiringTrack).toBe('IMMEDIATE');
      expect(result.estimatedDays).toBe(0);
      expect(result.conditions).toEqual([]);
      expect(result.blockReasons).toEqual([]);
      expect(result.requiredDocuments.length).toBeGreaterThan(0);
    });

    // 법령 근거: 출입국관리법 시행령 별표1 제28호의2 — applicant 평가도 동일
    it('evaluateApplicant: 프로필과 무관하게 항상 eligible', () => {
      const input = createJobInput();
      const profile = createProfile('F-6', {
        educationLevel: 'HIGH_SCHOOL',
        experienceYears: 0,
      });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.hiringTrack).toBe('IMMEDIATE');
    });
  });
});

// ============================================================================
// F-2 거주비자 테스트
// F-2 Residence Visa Tests
//
// 법령 근거: 출입국관리법 시행령 별표1의3
// Legal basis: Immigration Act Enforcement Decree Appendix 1-3
//
// 핵심: 유흥업소 항상 금지, 단순노무(KSCO 대분류9) 금지 (인구감소지역 예외)
// Core: Entertainment always blocked, simple labor (KSCO group 9) blocked
//       (depopulation area exception)
// ============================================================================
describe('F2FulltimeEvaluator', () => {
  const evaluator = new F2FulltimeEvaluator();

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ① 불변 (Invariant)
  // 출입국관리법 시행령 별표1의3: F-2 취업활동 제한
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  describe('① 불변: 유흥업소 항상 금지, 비유흥/비단순노무 항상 허용', () => {
    // 법령 근거: 출입국관리법 시행령 별표1의3 — 유흥업소 취업 금지
    it('유흥업소 직종은 어떤 조건에서든 blocked (인구감소지역도 불가)', () => {
      // 비인구감소지역 유흥
      const entertainmentNormal = createJobInput({
        occupationCode: 'ENTERTAINMENT',
      });
      const resultNormal = evaluator.evaluateJob(entertainmentNormal);
      expect(resultNormal.status).toBe('blocked');
      expect(resultNormal.blockReasons.length).toBeGreaterThan(0);
      expect(resultNormal.blockReasons[0]).toContain('유흥업소');

      // 인구감소지역 유흥 — 여전히 blocked
      const entertainmentDepop = createJobInput({
        occupationCode: 'ENTERTAINMENT',
        workAddress: {
          sido: '경상북도',
          sigungu: '영양군',
          isDepopulationArea: true,
        },
      });
      const resultDepop = evaluator.evaluateJob(entertainmentDepop);
      expect(resultDepop.status).toBe('blocked');
      expect(resultDepop.blockReasons[0]).toContain('유흥업소');
    });

    // 법령 근거: 출입국관리법 시행령 별표1의3 — 유흥/단순노무 외 자유 취업
    it('비유흥·비단순노무 직종은 blocked가 아님 (conditional 이상)', () => {
      const normalJob = createJobInput({ occupationCode: '2211' }); // IT 전문직
      const result = evaluator.evaluateJob(normalJob);
      expect(result.status).not.toBe('blocked');
      expect(result.blockReasons).toEqual([]);
    });

    // 법령 근거: 출입국관리법 시행령 별표1의3 — IMMEDIATE 트랙
    it('hiringTrack은 항상 IMMEDIATE', () => {
      const result = evaluator.evaluateJob(createJobInput());
      expect(result.hiringTrack).toBe('IMMEDIATE');
    });
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ② 골든 케이스 (Golden)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  describe('② 골든: 대표 시나리오', () => {
    // 법령 근거: 출입국관리법 시행령 별표1의3 — 전문직은 자유 취업 (F-2-7 조건부)
    it('occupationCode=2211 (IT 전문직) → conditional (F-2-7 조건 포함)', () => {
      const input = createJobInput({ occupationCode: '2211' });
      const result = evaluator.evaluateJob(input);

      // evaluateJob은 F-2-7 조건을 포함하므로 conditional
      expect(result.status).toBe('conditional');
      expect(result.blockReasons).toEqual([]);
      expect(result.conditions.length).toBeGreaterThan(0);
      expect(result.conditions.some((c) => c.includes('F-2-7'))).toBe(true);
    });

    // 법령 근거: 출입국관리법 시행령 별표1의3 — 단순노무(KSCO 9) 금지
    it('occupationCode=9111 (단순노무) + 비인구감소지역 → blocked', () => {
      const input = createJobInput({ occupationCode: '9111' });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
      expect(result.blockReasons[0]).toContain('단순노무');
    });

    // 법령 근거: 출입국관리법 시행령 별표1의3 — 인구감소지역 단순노무 예외
    it('occupationCode=9111 (단순노무) + isDepopulationArea=true → conditional (제한 해제)', () => {
      const input = createJobInput({
        occupationCode: '9111',
        workAddress: {
          sido: '경상북도',
          sigungu: '영양군',
          isDepopulationArea: true,
        },
      });
      const result = evaluator.evaluateJob(input);

      // 인구감소지역이므로 단순노무 제한 해제 → blocked가 아님
      expect(result.status).not.toBe('blocked');
      expect(result.blockReasons).toEqual([]);
    });

    // 법령 근거: 출입국관리법 시행령 별표1의3 — 유흥업소 항상 금지
    it('occupationCode=ENTERTAINMENT (유흥업소) → blocked', () => {
      const input = createJobInput({ occupationCode: 'ENTERTAINMENT' });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
      expect(result.blockReasons[0]).toContain('유흥업소');
    });
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ③ 경계 (Boundary)
  // F-2-R 지역특화형: 단순노무 제한 해제 (유흥업소만 유지)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  describe('③ 경계: F-2-R vs generic F-2 subtype', () => {
    // 법령 근거: 출입국관리법 시행령 별표1의3 — F-2-R 지역특화형 단순노무 제한 해제
    it('F-2-R + 단순노무(9111) + 비인구감소지역 → evaluateApplicant에서 단순노무 제한 해제 → eligible', () => {
      // evaluateJob에서는 단순노무라 blocked되지만,
      // evaluateApplicant에서 F-2-R이면 단순노무 차단 해제
      const input = createJobInput({ occupationCode: '9111' });
      const profile = createProfile('F-2', { currentVisaSubtype: 'F-2-R' });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toEqual([]);
    });

    // 법령 근거: 출입국관리법 시행령 별표1의3 — F-2-R에서도 유흥업소는 불가
    it('F-2-R + 유흥업소(ENTERTAINMENT) → 여전히 blocked (유흥 제한은 해제 불가)', () => {
      const input = createJobInput({ occupationCode: 'ENTERTAINMENT' });
      const profile = createProfile('F-2', { currentVisaSubtype: 'F-2-R' });
      const result = evaluator.evaluateApplicant(input, profile);

      // F-2-R이라도 유흥업소는 blocked 유지 (evaluateJob에서 이미 early return)
      expect(result.status).toBe('blocked');
      expect(result.blockReasons[0]).toContain('유흥업소');
    });

    // 법령 근거: 출입국관리법 시행령 별표1의3 — generic F-2 (subtype 미지정)
    it('generic F-2 (visaSubtype=undefined) + 단순노무(9111) → blocked 유지', () => {
      const input = createJobInput({ occupationCode: '9111' });
      const profile = createProfile('F-2'); // visaSubtype 미지정
      const result = evaluator.evaluateApplicant(input, profile);

      // generic F-2는 단순노무 차단 유지
      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
      expect(result.blockReasons[0]).toContain('단순노무');
    });

    // 법령 근거: 출입국관리법 시행령 별표1의3 — F-2-R + 비단순노무 전문직
    it('F-2-R + IT 전문직(2211) → eligible (F-2-7 조건도 제거)', () => {
      const input = createJobInput({ occupationCode: '2211' });
      const profile = createProfile('F-2', { currentVisaSubtype: 'F-2-R' });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toEqual([]);
      // F-2-R은 F-2-7 조건을 필요로 하지 않음
      expect(result.conditions.some((c) => c.includes('F-2-7'))).toBe(false);
    });

    // 법령 근거: 출입국관리법 시행령 별표1의3 — F-2-7 점수제
    it('F-2-7 + IT 전문직(2211) → eligible (유흥/단순노무 아니므로)', () => {
      const input = createJobInput({ occupationCode: '2211' });
      const profile = createProfile('F-2', { currentVisaSubtype: 'F-2-7' });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toEqual([]);
    });

    // 법령 근거: 출입국관리법 시행령 별표1의3 — F-2-7 점수제, 단순노무 차단 유지
    it('F-2-7 + 단순노무(9111) → blocked (F-2-7도 단순노무 제한)', () => {
      const input = createJobInput({ occupationCode: '9111' });
      const profile = createProfile('F-2', { currentVisaSubtype: 'F-2-7' });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
    });

    // 법령 근거: 출입국관리법 시행령 별표1의3 — 기타 F-2 subtype (F-2-1 등)
    it('F-2-1 (국민의 미성년 외국인 자녀) + IT 전문직 → eligible', () => {
      const input = createJobInput({ occupationCode: '2211' });
      const profile = createProfile('F-2', { currentVisaSubtype: 'F-2-1' });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toEqual([]);
    });
  });
});

// ============================================================================
// F-4 재외동포비자 테스트
// F-4 Overseas Korean Visa Tests
//
// 법령 근거:
// - 재외동포법 + 출입국관리법 시행령 제23조의3
// - 재외동포(F-4) 자격의 취업활동 제한범위 고시 (2026.2.2 개정)
// - H-2/F-4 통합 시행 (2026.2.12)
//
// 핵심: ① 유흥 항상 금지 ② 공공이익 제한직종 [붙임2] 8개 항상 금지
//       ③ 단순노무 [붙임1] 29개 금지 (인구감소지역/F-4-R 예외)
// Core: ① Entertainment always blocked ② Public interest restricted [Appendix 2] always blocked
//       ③ Simple labor [Appendix 1] blocked (depopulation/F-4-R exception)
// ============================================================================
describe('F4FulltimeEvaluator', () => {
  const evaluator = new F4FulltimeEvaluator();

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ① 불변 (Invariant)
  // 재외동포(F-4) 자격의 취업활동 제한범위 고시 (2026.2.2 시행)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  describe('① 불변: 유흥 항상 금지, 비유흥/비단순노무/비공공이익 항상 허용', () => {
    // 법령 근거: 출입국관리법 시행령 제23조의3 — 선량한 풍속 위반 업종 금지
    it('유흥업소 직종은 어떤 조건에서든 blocked (인구감소지역도 불가)', () => {
      const entertainmentNormal = createJobInput({
        occupationCode: 'ENTERTAINMENT',
      });
      const resultNormal = evaluator.evaluateJob(entertainmentNormal);
      expect(resultNormal.status).toBe('blocked');
      expect(resultNormal.blockReasons[0]).toContain('풍속');

      // 인구감소지역에서도 유흥은 여전히 blocked
      const entertainmentDepop = createJobInput({
        occupationCode: 'ENTERTAINMENT',
        workAddress: {
          sido: '경상북도',
          sigungu: '영양군',
          isDepopulationArea: true,
        },
      });
      const resultDepop = evaluator.evaluateJob(entertainmentDepop);
      expect(resultDepop.status).toBe('blocked');
      expect(resultDepop.blockReasons[0]).toContain('풍속');
    });

    // 법령 근거: 재외동포(F-4) 자격의 취업활동 제한범위 고시 — 전문직 자유취업
    it('비유흥·비단순노무·비공공이익 직종은 항상 eligible', () => {
      const normalJob = createJobInput({ occupationCode: '2211' }); // IT 전문직
      const result = evaluator.evaluateJob(normalJob);
      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toEqual([]);
    });

    // 법령 근거: 출입국관리법 시행령 제23조의3 — IMMEDIATE 트랙
    it('hiringTrack은 항상 IMMEDIATE', () => {
      const result = evaluator.evaluateJob(createJobInput());
      expect(result.hiringTrack).toBe('IMMEDIATE');
    });
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ② 골든 케이스 (Golden)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  describe('② 골든: 대표 시나리오', () => {
    // 법령 근거: 재외동포(F-4) 자격의 취업활동 제한범위 고시 — 전문직 자유취업
    it('occupationCode=2211 (IT 전문직) + 비인구감소지역 → eligible', () => {
      const input = createJobInput({ occupationCode: '2211' });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('eligible');
      expect(result.hiringTrack).toBe('IMMEDIATE');
      expect(result.estimatedDays).toBe(0);
      expect(result.blockReasons).toEqual([]);
      expect(result.requiredDocuments.length).toBeGreaterThan(0);
    });

    // 법령 근거: 재외동포(F-4) 자격의 취업활동 제한범위 고시 [붙임1] — 단순노무 금지
    it('occupationCode=9111 (단순노무) + 비인구감소지역 → blocked', () => {
      const input = createJobInput({ occupationCode: '9111' });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
      expect(result.blockReasons[0]).toContain('단순노무');
    });

    // 법령 근거: 재외동포(F-4) 자격의 취업활동 제한범위 고시 — 인구감소지역 예외
    it('occupationCode=9111 (단순노무) + isDepopulationArea=true → eligible (인구감소지역 예외)', () => {
      const input = createJobInput({
        occupationCode: '9111',
        workAddress: {
          sido: '경상북도',
          sigungu: '영양군',
          isDepopulationArea: true,
        },
      });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toEqual([]);
    });

    // 법령 근거: 재외동포(F-4) 자격의 취업활동 제한범위 고시 [붙임2] — 공공이익 제한직종
    // 4221 = 피부관리사(피부미용사) — 공공이익 제한직종 8개 중 하나
    it('occupationCode=4221 (피부미용사, 공공이익 제한직종) → blocked', () => {
      const input = createJobInput({ occupationCode: '4221' });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
      expect(result.blockReasons[0]).toContain('공공이익');
    });

    // 법령 근거: 재외동포(F-4) 자격의 취업활동 제한범위 고시 [붙임2] — 골프장 캐디
    // 4323 = 골프장 캐디 — 공공이익 제한직종 8개 중 하나
    it('occupationCode=4323 (골프장 캐디, 공공이익 제한직종) → blocked', () => {
      const input = createJobInput({ occupationCode: '4323' });
      const result = evaluator.evaluateJob(input);

      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
      expect(result.blockReasons[0]).toContain('공공이익');
    });

    // 법령 근거: 재외동포(F-4) 자격의 취업활동 제한범위 고시 [붙임2]
    // 공공이익 제한직종은 인구감소지역에서도 금지
    it('공공이익 제한직종(4221) + 인구감소지역 → evaluateJob에서 여전히 blocked', () => {
      const input = createJobInput({
        occupationCode: '4221',
        workAddress: {
          sido: '경상북도',
          sigungu: '영양군',
          isDepopulationArea: true,
        },
      });
      const result = evaluator.evaluateJob(input);

      // evaluateJob 단계에서는 인구감소 예외 없이 차단
      // (F-4-R은 evaluateApplicant에서 처리)
      expect(result.status).toBe('blocked');
      expect(result.blockReasons[0]).toContain('공공이익');
    });
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ③ 경계 (Boundary)
  // F-4-R 취업특례: 공공이익 + 단순노무 제한 해제 (풍속만 유지)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  describe('③ 경계: F-4-R vs generic F-4', () => {
    // 법령 근거: 재외동포(F-4) 자격의 취업활동 제한범위 고시 (2026.2.2)
    // F-4-R: ②공공이익 + ③단순노무 제한 해제, ①풍속만 유지
    it('F-4-R + 단순노무(9111) → evaluateApplicant에서 제한 해제 → eligible', () => {
      const input = createJobInput({ occupationCode: '9111' });
      const profile = createProfile('F-4', { currentVisaSubtype: 'F-4-R' });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toEqual([]);
    });

    // 법령 근거: 재외동포(F-4) 자격의 취업활동 제한범위 고시 (2026.2.2)
    // F-4-R: 공공이익 제한직종도 해제
    it('F-4-R + 공공이익 제한직종(4221 피부미용사) → 제한 해제 → eligible', () => {
      const input = createJobInput({ occupationCode: '4221' });
      const profile = createProfile('F-4', { currentVisaSubtype: 'F-4-R' });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toEqual([]);
    });

    // 법령 근거: 출입국관리법 시행령 제23조의3 — F-4-R에서도 풍속 위반은 불가
    it('F-4-R + 유흥업소(ENTERTAINMENT) → 여전히 blocked (풍속 제한 해제 불가)', () => {
      const input = createJobInput({ occupationCode: 'ENTERTAINMENT' });
      const profile = createProfile('F-4', { currentVisaSubtype: 'F-4-R' });
      const result = evaluator.evaluateApplicant(input, profile);

      // evaluateJob에서 유흥으로 early return → F-4-R이라도 해제 불가
      expect(result.status).toBe('blocked');
      expect(result.blockReasons[0]).toContain('풍속');
    });

    // 법령 근거: 재외동포(F-4) 자격의 취업활동 제한범위 고시 — generic F-4
    it('generic F-4 (visaSubtype=undefined) + 단순노무(9111) → blocked 유지', () => {
      const input = createJobInput({ occupationCode: '9111' });
      const profile = createProfile('F-4'); // visaSubtype 미지정
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
      expect(result.blockReasons[0]).toContain('단순노무');
    });

    // 법령 근거: 재외동포(F-4) 자격의 취업활동 제한범위 고시 — generic F-4 + 공공이익
    it('generic F-4 (visaSubtype=undefined) + 공공이익 제한직종(4221) → blocked 유지', () => {
      const input = createJobInput({ occupationCode: '4221' });
      const profile = createProfile('F-4'); // visaSubtype 미지정
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('blocked');
      expect(result.blockReasons.length).toBeGreaterThan(0);
      expect(result.blockReasons[0]).toContain('공공이익');
    });

    // 법령 근거: 재외동포(F-4) 자격의 취업활동 제한범위 고시 — generic F-4 + 전문직
    it('generic F-4 + IT 전문직(2211) → eligible (제한 해당 없음)', () => {
      const input = createJobInput({ occupationCode: '2211' });
      const profile = createProfile('F-4');
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toEqual([]);
    });

    // 법령 근거: 재외동포(F-4) 자격의 취업활동 제한범위 고시 (2026.2.2)
    // F-4-R + 골프장 캐디(공공이익) → 해제
    it('F-4-R + 골프장 캐디(4323, 공공이익 제한직종) → 제한 해제 → eligible', () => {
      const input = createJobInput({ occupationCode: '4323' });
      const profile = createProfile('F-4', { currentVisaSubtype: 'F-4-R' });
      const result = evaluator.evaluateApplicant(input, profile);

      expect(result.status).toBe('eligible');
      expect(result.blockReasons).toEqual([]);
    });
  });
});
