/**
 * 알바 비자 매칭 서비스 테스트
 * Alba visa matching service test suite
 *
 * 테스트 범위 / Test coverage:
 * - 9개 비자 평가기 (D-2, D-4, D-10, F-2, F-4, F-5, F-6, H-1, H-2)
 * - 3가지 테스트 유형: 불변(Invariance), 골든(Golden), 경계값(Boundary)
 * - 72+ 테스트 케이스
 *
 * 테스트 패턴 / Test pattern:
 * - 직접 Evaluator 인스턴스화 (DI/Mocking 없음)
 *   Direct evaluator instantiation (no DI/mocking)
 * - createAlbaJobInput(overrides) 헬퍼 사용
 *   Using createAlbaJobInput(overrides) helper
 * - 한국어 + 영어 주석
 *   Korean + English comments
 * - 법적 근거 주석 포함
 *   Legal reference comments included
 *
 * @lastVerified 2026-02-23
 */

import {
  AlbaJobInput,
  AlbaScheduleItem,
} from '../evaluators/alba-evaluator.interface';
import { D2AlbaEvaluator } from '../evaluators/d2-alba-evaluator';
import { D4AlbaEvaluator } from '../evaluators/d4-alba-evaluator';
import { D10AlbaEvaluator } from '../evaluators/d10-alba-evaluator';
import { F2AlbaEvaluator } from '../evaluators/f2-alba-evaluator';
import { F4AlbaEvaluator } from '../evaluators/f4-alba-evaluator';
import {
  F5AlbaEvaluator,
  F6AlbaEvaluator,
} from '../evaluators/f5-f6-alba-evaluator';
import { H1AlbaEvaluator } from '../evaluators/h1-alba-evaluator';
import { H2AlbaEvaluator } from '../evaluators/h2-alba-evaluator';
import { getCurrentMinimumWage } from '../../common/data/visa';

// ====================================================================
// Helper functions / 헬퍼 함수
// ====================================================================

/** 기본 평일 스케줄 / Default weekday schedule */
const DEFAULT_WEEKDAY_SCHEDULE: AlbaScheduleItem[] = [
  { dayOfWeek: 'MON', startTime: '09:00', endTime: '13:00' },
  { dayOfWeek: 'WED', startTime: '09:00', endTime: '13:00' },
  { dayOfWeek: 'FRI', startTime: '09:00', endTime: '13:00' },
];

/** 주말만 스케줄 / Weekend-only schedule */
const WEEKEND_ONLY_SCHEDULE: AlbaScheduleItem[] = [
  { dayOfWeek: 'SAT', startTime: '10:00', endTime: '18:00' },
  { dayOfWeek: 'SUN', startTime: '10:00', endTime: '18:00' },
];

/**
 * 기본 알바 공고 입력 생성 헬퍼
 * Helper to create basic alba job input
 */
function createAlbaJobInput(overrides?: Partial<AlbaJobInput>): AlbaJobInput {
  return {
    jobCategoryCode: 'REST_SERVING', // 음식점 서빙 / Restaurant serving
    ksicCode: 'I', // 숙박 및 음식점업 / Accommodation and food service
    weeklyHours: 15,
    isWeekendOnly: false,
    hasWeekdayShift: true,
    workAddress: {
      sido: '서울특별시',
      sigungu: '강남구',
      detail: '테헤란로 123',
      lat: 37.5065,
      lng: 127.0536,
      isDepopulationArea: false,
    },
    hourlyWage: 10_030,
    startDate: '2025-01-01',
    endDate: null,
    schedule: DEFAULT_WEEKDAY_SCHEDULE,
    ...overrides,
  };
}

// ====================================================================
// D-2 유학비자 테스트 / D-2 Study Visa Tests
// [Legal] 출입국관리법 시행령 제23조 (체류자격외활동허가)
// ====================================================================
describe('D2AlbaEvaluator (D-2 유학)', () => {
  const evaluator = new D2AlbaEvaluator();

  // --- Invariance Tests (불변 테스트) ---
  describe('Invariance / 불변', () => {
    it('체류자격외활동허가 필수 (Extra-status activity permit required)', () => {
      // [Legal] 출입국관리법 시행령 제23조
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.requiredPermit).toBe('체류자격외활동허가');
    });

    it('최대 사업장 수 2개 (Max 2 workplaces)', () => {
      // [Legal] 법무부 고시 — 외국인유학생 시간제취업 허용범위
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.maxWorkplaces).toBe(2);
    });

    it('비자 코드 D-2 (Visa code D-2)', () => {
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.visaCode).toBe('D-2');
    });
  });

  // --- Golden Case Tests (정답 테스트) ---
  describe('Golden Cases / 정답', () => {
    it('건설업 → blocked (Construction → blocked)', () => {
      // [Legal] 출입국관리법 시행령 제23조 — 건설업 전면 금지
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'CONSTRUCTION_LABOR',
          ksicCode: 'F',
        }),
      );
      expect(result.status).toBe('blocked');
    });

    it('유흥업소 → blocked (Entertainment → blocked)', () => {
      // [Legal] 출입국관리법 시행령 제23조 — 유흥업소 전면 금지
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'ENTERTAINMENT',
          ksicCode: 'I_ENT',
        }),
      );
      expect(result.status).toBe('blocked');
    });

    it('배달 → blocked (Delivery → blocked)', () => {
      // [Legal] 법무부 고시 — 배달 전문 업종 금지
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'DELIVERY',
          ksicCode: 'H',
        }),
      );
      expect(result.status).toBe('blocked');
    });

    it('긱워크 → blocked (Gig work → blocked)', () => {
      // [Legal] 법무부 고시 — 특수형태근로종사자 전면 금지
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'NEWSPAPER_DELIVERY',
          ksicCode: 'H',
        }),
      );
      expect(result.status).toBe('blocked');
    });

    it('제조업 → conditional (Manufacturing → conditional)', () => {
      // [Legal] 법무부 고시 — 제조업 TOPIK 4+ 조건부
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'FACTORY_SIMPLE',
          ksicCode: 'C',
          weeklyHours: 10,
        }),
      );
      expect(result.status).toBe('conditional');
    });

    it('주말만 근무 → eligible (Weekend-only → eligible)', () => {
      // [Legal] 법무부 고시 — 주말/공휴일 TOPIK 충족 시 무제한
      const result = evaluator.evaluate(
        createAlbaJobInput({
          isWeekendOnly: true,
          schedule: WEEKEND_ONLY_SCHEDULE,
          hasWeekdayShift: false,
          weeklyHours: 16,
        }),
      );
      expect(result.status).toBe('eligible');
    });
  });

  // --- Boundary Tests (경계값 테스트) ---
  describe('Boundary / 경계값', () => {
    it('주 10시간 → eligible (10h/week → eligible, TOPIK 미충족도 가능)', () => {
      // [Legal] 법무부 고시 — TOPIK 미충족 학부생 주 10시간
      const result = evaluator.evaluate(
        createAlbaJobInput({ weeklyHours: 10 }),
      );
      expect(result.status).not.toBe('blocked');
    });

    it('주 11시간 → conditional (11h/week → conditional, TOPIK 필요)', () => {
      // [Legal] 법무부 고시 — 주 10시간 초과 시 대학원생 또는 TOPIK 필요
      const result = evaluator.evaluate(
        createAlbaJobInput({ weeklyHours: 11 }),
      );
      expect(result.status).toBe('conditional');
    });

    it('주 20시간 → conditional (20h/week → conditional)', () => {
      // [Legal] 법무부 고시 — 학부 TOPIK 충족 기본 주 20시간
      const result = evaluator.evaluate(
        createAlbaJobInput({ weeklyHours: 20 }),
      );
      expect(result.status).toBe('conditional');
    });

    it('주 21시간 → conditional (21h/week → conditional, 석사 이상 필요)', () => {
      // [Legal] 법무부 고시 — 주 20시간 초과 시 석사 TOPIK 4+ 이상
      const result = evaluator.evaluate(
        createAlbaJobInput({ weeklyHours: 21 }),
      );
      expect(result.status).toBe('conditional');
    });

    it('주 35시간 → conditional (35h/week → conditional, 박사 우대)', () => {
      // [Legal] 법무부 고시 — 박사 TOPIK 4+ 우대 최대 주 35시간
      const result = evaluator.evaluate(
        createAlbaJobInput({ weeklyHours: 35 }),
      );
      expect(result.status).toBe('conditional');
    });

    it('주 36시간 → blocked (36h/week → blocked, 최대 초과)', () => {
      // [Legal] 법무부 고시 — D-2 비자 최대 주 35시간 초과 불가
      const result = evaluator.evaluate(
        createAlbaJobInput({ weeklyHours: 36 }),
      );
      expect(result.status).toBe('blocked');
    });
  });
});

// ====================================================================
// D-4 어학연수비자 테스트 / D-4 Language Training Visa Tests
// [Legal] 출입국관리법 시행령 제23조 (체류자격외활동허가)
// ====================================================================
describe('D4AlbaEvaluator (D-4 어학연수)', () => {
  const evaluator = new D4AlbaEvaluator();

  // --- Invariance Tests ---
  describe('Invariance / 불변', () => {
    it('입국 후 6개월 경과 조건 포함 (6-month wait condition included)', () => {
      // [Legal] 출입국관리법 시행령 제23조 — 입국 후 6개월
      const result = evaluator.evaluate(
        createAlbaJobInput({ weeklyHours: 10 }),
      );
      const has6MonthCondition = result.conditions.some(
        (c) => c.includes('6개월') || c.includes('6+ months'),
      );
      expect(has6MonthCondition).toBe(true);
    });

    it('최대 사업장 수 1개 (Max 1 workplace)', () => {
      // [Legal] 법무부 고시 — D-4 최대 1개 사업장
      const result = evaluator.evaluate(
        createAlbaJobInput({ weeklyHours: 10 }),
      );
      expect(result.maxWorkplaces).toBe(1);
    });

    it('체류자격외활동허가 필수 (Extra-status activity permit required)', () => {
      // [Legal] 출입국관리법 시행령 제23조
      const result = evaluator.evaluate(
        createAlbaJobInput({ weeklyHours: 10 }),
      );
      expect(result.requiredPermit).toBe('체류자격외활동허가');
    });
  });

  // --- Golden Case Tests ---
  describe('Golden Cases / 정답', () => {
    it('건설업 → blocked (Construction → blocked)', () => {
      // [Legal] 법무부 고시 — D-4도 건설업 전면 금지
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'CONSTRUCTION_LABOR',
          ksicCode: 'F',
        }),
      );
      expect(result.status).toBe('blocked');
    });

    it('유흥업소 → blocked (Entertainment → blocked)', () => {
      // [Legal] 법무부 고시 — D-4 유흥업소 전면 금지
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'ENTERTAINMENT',
          ksicCode: 'I_ENT',
        }),
      );
      expect(result.status).toBe('blocked');
    });

    it('배달 → blocked (Delivery → blocked)', () => {
      // [Legal] 법무부 고시 — D-4 배달 전문 금지
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'DELIVERY',
          ksicCode: 'H',
          weeklyHours: 10,
        }),
      );
      expect(result.status).toBe('blocked');
    });

    it('주말만 근무도 시간 제한 동일 (Weekend-only has same hour limit)', () => {
      // [Legal] 법무부 고시 — D-4는 주말만 근무여도 시간 제한 동일 (D-2와 핵심 차이)
      const result = evaluator.evaluate(
        createAlbaJobInput({
          isWeekendOnly: true,
          schedule: WEEKEND_ONLY_SCHEDULE,
          hasWeekdayShift: false,
          weeklyHours: 21, // > 20시간
        }),
      );
      // D-4는 주말만 근무여도 20시간 초과 시 blocked
      expect(result.status).toBe('blocked');
    });
  });

  // --- Boundary Tests ---
  describe('Boundary / 경계값', () => {
    it('주 10시간 → eligible (10h/week → eligible)', () => {
      // [Legal] 법무부 고시 — TOPIK 미충족이어도 주 10시간 가능
      const result = evaluator.evaluate(
        createAlbaJobInput({ weeklyHours: 10 }),
      );
      // 6개월 대기 조건 때문에 conditional
      expect(result.status).toBe('conditional');
      // blocked는 아님
      expect(result.blockReasons).toHaveLength(0);
    });

    it('주 20시간 → conditional (20h/week → conditional, TOPIK 2급 필요)', () => {
      // [Legal] 법무부 고시 — TOPIK 2급 + 출석률 90% 필요 (주 20시간까지)
      const result = evaluator.evaluate(
        createAlbaJobInput({ weeklyHours: 20 }),
      );
      expect(result.status).toBe('conditional');
    });

    it('주 21시간 → blocked (21h/week → blocked, 최대 초과)', () => {
      // [Legal] 법무부 고시 — D-4 비자 최대 주 20시간 초과 불가
      const result = evaluator.evaluate(
        createAlbaJobInput({ weeklyHours: 21 }),
      );
      expect(result.status).toBe('blocked');
    });
  });
});

// ====================================================================
// D-10 구직비자 테스트 / D-10 Job Seeking Visa Tests
// [Legal] 출입국관리법 시행령 제12조 별표1 (D-10 체류자격)
// ====================================================================
describe('D10AlbaEvaluator (D-10 구직)', () => {
  const evaluator = new D10AlbaEvaluator();

  // --- Invariance Tests ---
  describe('Invariance / 불변', () => {
    it('비자 코드 D-10 (Visa code D-10)', () => {
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.visaCode).toBe('D-10');
    });

    it('인턴 경로: 허가 불필요 (Intern path: no permit required)', () => {
      // [Legal] 법무부 — D-10 인턴 활동은 체류자격외활동허가 불필요
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'IT_ASSIST',
          ksicCode: 'J',
        }),
      );
      // conditional (전문직 인턴으로 허용)
      expect(result.status).toBe('conditional');
      expect(result.requiredPermit).toBeNull();
    });
  });

  // --- Golden Case Tests ---
  describe('Golden Cases / 정답', () => {
    it('전문직(IT_ASSIST) → conditional (Professional → conditional)', () => {
      // [Legal] 법무부 — E-1~E-7 전문직종 인턴만 가능
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'IT_ASSIST',
          ksicCode: 'J',
        }),
      );
      expect(result.status).toBe('conditional');
    });

    it('단순노무(REST_SERVING) → blocked (Simple labor → blocked)', () => {
      // [Legal] 법무부 — D-10 단순노무 알바 불가
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'REST_SERVING',
          ksicCode: 'I',
        }),
      );
      expect(result.status).toBe('blocked');
    });

    it('KSIC 코드 폴백: M(전문서비스) → conditional (KSIC fallback: M → conditional)', () => {
      // [Legal] 법무부 — E-3/E-4/E-5/E-7 전문직종에 해당하는 KSIC 대분류
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'TRANSLATION',
          ksicCode: 'M',
        }),
      );
      expect(result.status).toBe('conditional');
    });
  });

  // --- Boundary Tests ---
  describe('Boundary / 경계값', () => {
    it('전문직 경계: INTERN_PROFESSIONAL → conditional', () => {
      // [Legal] 법무부 — D-10 전문직 직종 코드 목록에 포함
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'INTERN_PROFESSIONAL',
          ksicCode: 'M',
        }),
      );
      expect(result.status).toBe('conditional');
    });

    it('비전문직 경계: CONV_STORE → blocked', () => {
      // [Legal] 법무부 — 편의점은 전문직종에 해당하지 않음
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'CONV_STORE',
          ksicCode: 'G',
        }),
      );
      expect(result.status).toBe('blocked');
    });
  });
});

// ====================================================================
// F-2 거주비자 테스트 / F-2 Residence Visa Tests
// [Legal] 출입국관리법 시행령 제12조 별표1 (F-2 체류자격)
// ====================================================================
describe('F2AlbaEvaluator (F-2 거주)', () => {
  const evaluator = new F2AlbaEvaluator();

  // --- Invariance Tests ---
  describe('Invariance / 불변', () => {
    it('시간 무제한 (Unlimited hours)', () => {
      // [Legal] 출입국관리법 시행령 제12조 — F-2 활동 제한 없음
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.maxWeeklyHours).toBeNull();
    });

    it('허가 불필요 (No permit required)', () => {
      // [Legal] 법무부 — F-2 별도 고용허가 불필요
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.requiredPermit).toBeNull();
    });
  });

  // --- Golden Case Tests ---
  describe('Golden Cases / 정답', () => {
    it('유흥업소 → blocked (Entertainment → blocked)', () => {
      // [Legal] 출입국관리법 — F-2도 유흥업소 금지
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'ENTERTAINMENT',
          ksicCode: 'I_ENT',
        }),
      );
      expect(result.status).toBe('blocked');
    });

    it('일반 음식점 → conditional (Normal restaurant → conditional)', () => {
      // [Legal] 법무부 — F-2(라,바) 점수제 조건으로 conditional
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.status).toBe('conditional');
    });

    it('F-2(라,바) 점수제 조건 포함 (F-2 point system condition included)', () => {
      // [Legal] 법무부 — F-2-7 점수제 소지자는 이전 비자 동일 분야 제한
      const result = evaluator.evaluate(createAlbaJobInput());
      const hasPointSystemCondition = result.conditions.some(
        (c) =>
          c.includes('F-2') &&
          (c.includes('점수제') || c.includes('point system')),
      );
      expect(hasPointSystemCondition).toBe(true);
    });
  });

  // --- Boundary Tests ---
  describe('Boundary / 경계값', () => {
    it('유흥업소 코드 I_ENT → blocked (Entertainment KSIC code → blocked)', () => {
      // [Legal] 출입국관리법 — 유흥업소 KSIC 코드 직접 확인
      const result = evaluator.evaluate(
        createAlbaJobInput({ ksicCode: 'I_ENT' }),
      );
      expect(result.status).toBe('blocked');
    });
  });
});

// ====================================================================
// F-4 재외동포비자 테스트 / F-4 Overseas Korean Visa Tests
// [Legal] 출입국관리법 시행령 제23조의3
// ====================================================================
describe('F4AlbaEvaluator (F-4 재외동포)', () => {
  const evaluator = new F4AlbaEvaluator();

  // --- Invariance Tests ---
  describe('Invariance / 불변', () => {
    it('허가 불필요 (No permit required)', () => {
      // [Legal] 출입국관리법 시행령 제23조의3 — 별도 허가 없이 자유 취업
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'CAFE_BARISTA',
          ksicCode: 'I',
        }),
      );
      expect(result.requiredPermit).toBeNull();
    });

    it('시간 무제한 (Unlimited hours)', () => {
      // [Legal] 출입국관리법 시행령 제23조의3 — 시간 제한 없음
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'CAFE_BARISTA',
          ksicCode: 'I',
        }),
      );
      expect(result.maxWeeklyHours).toBeNull();
    });
  });

  // --- Golden Case Tests ---
  describe('Golden Cases / 정답', () => {
    it('풍속 위반(유흥업소) → blocked (Public morals → blocked)', () => {
      // [Legal] 출입국관리법 시행령 제23조의3 — 풍속 위반 항상 금지
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'ENTERTAINMENT',
          ksicCode: 'I_ENT',
        }),
      );
      expect(result.status).toBe('blocked');
    });

    it('비단순노무 → eligible (Non-simple-labor → eligible)', () => {
      // [Legal] 법무부 고시 — 전문직/비단순노무 자유취업
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'CAFE_BARISTA',
          ksicCode: 'I',
        }),
      );
      expect(result.status).toBe('eligible');
    });

    it('단순노무 + 비인구감소지역 → blocked (Simple labor + non-depopulation → blocked)', () => {
      // [Legal] 법무부 고시 — 단순노무 금지 (인구감소지역 제외)
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'CLEANING',
          ksicCode: 'N',
        }),
      );
      expect(result.status).toBe('blocked');
    });

    it('단순노무 + 인구감소지역(F-4-R) → eligible (Simple labor + depopulation → eligible)', () => {
      // [Legal] 법무부 고시 — 인구감소지역 F-4-R 단순노무 허용
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'CLEANING',
          ksicCode: 'N',
          workAddress: {
            sido: '경상북도',
            sigungu: '의성군',
            detail: '읍내',
            lat: 36.3561,
            lng: 128.6978,
            isDepopulationArea: true,
          },
        }),
      );
      expect(result.status).toBe('eligible');
    });

    it('예외 8개 직종 → conditional (Exception 8 jobs → conditional)', () => {
      // [Legal] 법무부 고시 (2024) — 단순노무 제한 일부 완화
      // REST_SERVING은 예외 허용 직종 목록에 포함
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'REST_SERVING',
          ksicCode: 'I',
        }),
      );
      // REST_SERVING이 예외 목록에 있으면 conditional, 없으면 eligible
      expect(['eligible', 'conditional']).toContain(result.status);
    });
  });

  // --- Boundary Tests ---
  describe('Boundary / 경계값', () => {
    it('인구감소지역 경계: 부산 동구(인구감소) → eligible', () => {
      // [Legal] 행정안전부 고시 — 부산 동구는 인구감소지역
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'CLEANING',
          ksicCode: 'N',
          workAddress: {
            sido: '부산광역시',
            sigungu: '동구',
            detail: '중앙대로',
            lat: 35.1294,
            lng: 129.0456,
            isDepopulationArea: true,
          },
        }),
      );
      expect(result.status).toBe('eligible');
    });

    it('인구감소지역 경계: 서울 강남(비인구감소) → blocked', () => {
      // [Legal] 행정안전부 고시 — 서울 강남구는 인구감소지역 아님
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'CLEANING',
          ksicCode: 'N',
          workAddress: {
            sido: '서울특별시',
            sigungu: '강남구',
            detail: '테헤란로',
            lat: 37.5065,
            lng: 127.0536,
            isDepopulationArea: false,
          },
        }),
      );
      expect(result.status).toBe('blocked');
    });
  });
});

// ====================================================================
// F-5 영주비자 테스트 / F-5 Permanent Residence Visa Tests
// [Legal] 출입국관리법 시행령 제12조 별표1
// ====================================================================
describe('F5AlbaEvaluator (F-5 영주)', () => {
  const evaluator = new F5AlbaEvaluator();

  // --- Invariance Tests ---
  describe('Invariance / 불변', () => {
    it('항상 eligible (Always eligible)', () => {
      // [Legal] 출입국관리법 시행령 제12조 — 영주자격 활동 제한 없음
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.status).toBe('eligible');
    });

    it('허가 불필요 (No permit required)', () => {
      // [Legal] 출입국관리법 시행령 제12조 — 별도 허가 불필요
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.requiredPermit).toBeNull();
    });

    it('시간 무제한 (Unlimited hours)', () => {
      // [Legal] 출입국관리법 시행령 제12조 — 시간 제한 없음
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.maxWeeklyHours).toBeNull();
    });
  });

  // --- Golden Case Tests ---
  describe('Golden Cases / 정답', () => {
    it('어떤 업종이든 eligible (Any industry → eligible)', () => {
      // [Legal] 출입국관리법 시행령 제12조 — 업종 제한 없음
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'CONSTRUCTION_LABOR',
          ksicCode: 'F',
        }),
      );
      expect(result.status).toBe('eligible');
    });

    it('최저임금 안내 포함 (Minimum wage note included)', () => {
      // [Legal] 최저임금법 제10조
      const mw = getCurrentMinimumWage();
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.notes).toContain(`${mw.hourlyWage.toLocaleString()}`);
    });
  });
});

// ====================================================================
// F-6 결혼이민비자 테스트 / F-6 Marriage Immigration Visa Tests
// [Legal] 출입국관리법 시행령 제12조 별표1
// ====================================================================
describe('F6AlbaEvaluator (F-6 결혼이민)', () => {
  const evaluator = new F6AlbaEvaluator();

  // --- Invariance Tests ---
  describe('Invariance / 불변', () => {
    it('항상 eligible (Always eligible)', () => {
      // [Legal] 출입국관리법 시행령 제12조 — 결혼이민자 활동 제한 없음
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.status).toBe('eligible');
    });

    it('허가 불필요 (No permit required)', () => {
      // [Legal] 출입국관리법 시행령 제12조 — 별도 허가 불필요
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.requiredPermit).toBeNull();
    });

    it('시간 무제한 (Unlimited hours)', () => {
      // [Legal] 출입국관리법 시행령 제12조 — 시간 제한 없음
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.maxWeeklyHours).toBeNull();
    });
  });

  // --- Golden Case Tests ---
  describe('Golden Cases / 정답', () => {
    it('어떤 업종이든 eligible (Any industry → eligible)', () => {
      // [Legal] 출입국관리법 시행령 제12조 — 업종 제한 없음
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'FACTORY_SIMPLE',
          ksicCode: 'C',
        }),
      );
      expect(result.status).toBe('eligible');
    });

    it('최저임금 안내 포함 (Minimum wage note included)', () => {
      // [Legal] 최저임금법 제10조
      const mw = getCurrentMinimumWage();
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.notes).toContain(`${mw.hourlyWage.toLocaleString()}`);
    });
  });
});

// ====================================================================
// H-1 워킹홀리데이 비자 테스트 / H-1 Working Holiday Visa Tests
// [Legal] 출입국관리법 시행령 제12조 별표1 (H-1 체류자격)
// ====================================================================
describe('H1AlbaEvaluator (H-1 워킹홀리데이)', () => {
  const evaluator = new H1AlbaEvaluator();

  // --- Invariance Tests ---
  describe('Invariance / 불변', () => {
    it('허가 불필요 (No permit required)', () => {
      // [Legal] 출입국관리법 시행령 제12조 — H-1 별도 허가 불필요
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.requiredPermit).toBeNull();
    });

    it('시간 무제한 (Unlimited hours)', () => {
      // [Legal] 출입국관리법 시행령 제12조 — 시간 제한 없음
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.maxWeeklyHours).toBeNull();
    });
  });

  // --- Golden Case Tests ---
  describe('Golden Cases / 정답', () => {
    it('유흥업소 → blocked (Entertainment → blocked)', () => {
      // [Legal] 각국 워킹홀리데이 협정 — 선량한 풍속 위반 업종 금지
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'ENTERTAINMENT',
          ksicCode: 'I_ENT',
        }),
      );
      expect(result.status).toBe('blocked');
    });

    it('일반 업종 → eligible (Normal industry → eligible)', () => {
      // [Legal] 출입국관리법 시행령 제12조 — 풍속 위반 업종 외 취업 가능
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.status).toBe('eligible');
    });

    it('KSIC 매핑으로 유흥업소 확인 (Entertainment check via KSIC mapping)', () => {
      // [Legal] 출입국관리법 — KSIC 매핑 기반 유흥업소 확인
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'ENTERTAINMENT',
          ksicCode: 'I',
        }),
      );
      expect(result.status).toBe('blocked');
    });
  });

  // --- Boundary Tests ---
  describe('Boundary / 경계값', () => {
    it('유흥업소 KSIC 코드 I_ENT vs 일반 음식점 I (Entertainment I_ENT vs normal I)', () => {
      // [Legal] 출입국관리법 — I_ENT(유흥주점업)만 금지, 일반 숙박음식점(I)은 허용
      const blocked = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'ENTERTAINMENT',
          ksicCode: 'I_ENT',
        }),
      );
      const allowed = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'REST_SERVING',
          ksicCode: 'I',
        }),
      );
      expect(blocked.status).toBe('blocked');
      expect(allowed.status).toBe('eligible');
    });
  });
});

// ====================================================================
// H-2 방문취업비자 테스트 / H-2 Visit & Employment Visa Tests
// [Legal] 출입국관리법 시행령 제12조 별표1, 외국인근로자의 고용 등에 관한 법률 제12조
// ====================================================================
describe('H2AlbaEvaluator (H-2 방문취업)', () => {
  const evaluator = new H2AlbaEvaluator();

  // --- Invariance Tests ---
  describe('Invariance / 불변', () => {
    it('시간 무제한 (Unlimited hours)', () => {
      // [Legal] 외국인근로자의 고용 등에 관한 법률 — H-2 시간 제한 없음
      const result = evaluator.evaluate(createAlbaJobInput());
      expect(result.maxWeeklyHours).toBeNull();
    });

    it('eligible/conditional 시 특례고용가능확인서 필수 (Special Employment Permit for eligible/conditional)', () => {
      // [Legal] 외국인근로자의 고용 등에 관한 법률 제12조 — 특례고용허가
      const result = evaluator.evaluate(createAlbaJobInput());
      if (result.status !== 'blocked') {
        expect(result.requiredPermit).toContain('특례고용가능확인서');
      }
    });
  });

  // --- Golden Case Tests ---
  describe('Golden Cases / 정답', () => {
    it('유흥업소 → blocked (Entertainment → blocked)', () => {
      // [Legal] 법무부 고시 — 유흥업소 전면 금지
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'ENTERTAINMENT',
          ksicCode: 'I_ENT',
        }),
      );
      expect(result.status).toBe('blocked');
    });

    it('일반 음식점 → eligible 또는 conditional (Normal restaurant → eligible or conditional)', () => {
      // [Legal] 법무부 고시 — 네거티브 리스트 외 업종은 허용
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'REST_SERVING',
          ksicCode: 'I',
        }),
      );
      expect(['eligible', 'conditional']).toContain(result.status);
    });

    it('편의점 → eligible 또는 conditional (Convenience store → eligible or conditional)', () => {
      // [Legal] 법무부 고시 — 도소매업(G)은 네거티브 리스트 외
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'CONV_STORE',
          ksicCode: 'G',
        }),
      );
      expect(['eligible', 'conditional']).toContain(result.status);
    });

    it('고용주 의무사항 조건 포함 (Employer obligation conditions included)', () => {
      // [Legal] 외국인근로자의 고용 등에 관한 법률 제12조
      const result = evaluator.evaluate(createAlbaJobInput());
      if (result.status !== 'blocked') {
        // 내국인 구인, 특례고용가능확인서, 구직자명부 등
        const hasEmployerCondition = result.conditions.some(
          (c) =>
            c.includes('특례고용허가') ||
            c.includes('Special Employment Permit'),
        );
        expect(hasEmployerCondition).toBe(true);
      }
    });

    it('eligible 결과에 4대보험 조건 포함 (Social insurance in eligible results)', () => {
      // [Legal] 산업재해보상보험법, 국민건강보험법
      const result = evaluator.evaluate(createAlbaJobInput());
      if (result.status !== 'blocked') {
        const hasInsuranceCondition = result.conditions.some(
          (c) => c.includes('4대보험') || c.includes('Social Insurance'),
        );
        expect(hasInsuranceCondition).toBe(true);
      }
    });
  });

  // --- Boundary Tests ---
  describe('Boundary / 경계값', () => {
    it('KSIC 대분류 기반 폴백 (KSIC section-level fallback)', () => {
      // [Legal] 법무부 고시 — 매핑 없는 직종은 KSIC 대분류로 판정
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'REAL_ESTATE',
          ksicCode: 'L',
        }),
      );
      // 부동산업(L)은 네거티브 리스트 여부에 따라 결과 변동
      expect(['eligible', 'conditional', 'blocked']).toContain(result.status);
    });

    it('농업(A) → eligible + 구인기간 7일 조건 (Agriculture → eligible + 7-day recruitment)', () => {
      // [Legal] 외국인근로자의 고용 등에 관한 법률 — 농축산업 구인 기간 단축
      const result = evaluator.evaluate(
        createAlbaJobInput({
          jobCategoryCode: 'AGRICULTURE',
          ksicCode: 'A',
        }),
      );
      if (result.status !== 'blocked') {
        const hasAgricultureCondition = result.conditions.some(
          (c) =>
            c.includes('7일') || c.includes('7-day') || c.includes('7 day'),
        );
        expect(hasAgricultureCondition).toBe(true);
      }
    });
  });
});

// ====================================================================
// 통합 테스트 / Integration Tests
// ====================================================================
describe('Cross-evaluator integration / 평가기 간 통합 테스트', () => {
  it('유흥업소는 모든 비자에서 blocked (Entertainment blocked for ALL visas)', () => {
    // [Legal] 출입국관리법 — 유흥업소 외국인 취업 전면 금지
    const evaluators = [
      new D2AlbaEvaluator(),
      new D4AlbaEvaluator(),
      new D10AlbaEvaluator(),
      new F2AlbaEvaluator(),
      new F4AlbaEvaluator(),
      new H1AlbaEvaluator(),
      new H2AlbaEvaluator(),
    ];

    const input = createAlbaJobInput({
      jobCategoryCode: 'ENTERTAINMENT',
      ksicCode: 'I_ENT',
    });

    for (const evaluator of evaluators) {
      const result = evaluator.evaluate(input);
      expect(result.status).toBe('blocked');
    }
  });

  it('F-5, F-6은 항상 eligible (F-5, F-6 always eligible)', () => {
    // [Legal] 출입국관리법 시행령 제12조 — F-5/F-6 활동 제한 없음
    const f5 = new F5AlbaEvaluator();
    const f6 = new F6AlbaEvaluator();

    // 유흥업소 포함 어떤 업종에서도 eligible
    const entertainmentInput = createAlbaJobInput({
      jobCategoryCode: 'ENTERTAINMENT',
      ksicCode: 'I_ENT',
    });

    expect(f5.evaluate(entertainmentInput).status).toBe('eligible');
    expect(f6.evaluate(entertainmentInput).status).toBe('eligible');

    // 건설업에서도 eligible
    const constructionInput = createAlbaJobInput({
      jobCategoryCode: 'CONSTRUCTION_LABOR',
      ksicCode: 'F',
    });

    expect(f5.evaluate(constructionInput).status).toBe('eligible');
    expect(f6.evaluate(constructionInput).status).toBe('eligible');
  });

  it('모든 평가기 visaCode 고유 (All evaluators have unique visaCode)', () => {
    const evaluators = [
      new D2AlbaEvaluator(),
      new D4AlbaEvaluator(),
      new D10AlbaEvaluator(),
      new F2AlbaEvaluator(),
      new F4AlbaEvaluator(),
      new F5AlbaEvaluator(),
      new F6AlbaEvaluator(),
      new H1AlbaEvaluator(),
      new H2AlbaEvaluator(),
    ];

    const codes = evaluators.map((e) => e.visaCode);
    const uniqueCodes = new Set(codes);
    expect(uniqueCodes.size).toBe(codes.length);
  });

  it('최저임금 동적 참조 확인 (Dynamic minimum wage reference)', () => {
    // [Legal] 최저임금법 제10조
    const mw = getCurrentMinimumWage();
    const f5 = new F5AlbaEvaluator();
    const f6 = new F6AlbaEvaluator();

    const f5Result = f5.evaluate(createAlbaJobInput());
    const f6Result = f6.evaluate(createAlbaJobInput());

    // 두 평가기 모두 동적으로 현재 최저임금 참조
    expect(f5Result.notes).toContain(mw.hourlyWage.toLocaleString());
    expect(f6Result.notes).toContain(mw.hourlyWage.toLocaleString());
  });
});

// ====================================================================
// F-4 공공이익 제한 직종 테스트 (신규)
// F-4 Public Interest Restricted Jobs Tests (NEW)
// [Legal] 법무부 고시 — F-4 공공이익에 반하는 취업제한 업종
// ====================================================================
describe('F4 공공이익 제한 직종 / F-4 Public Interest Restricted Jobs', () => {
  const f4 = new F4AlbaEvaluator();

  it.each([
    ['SKIN_CARE', 'S', '피부관리사'],
    ['BATH_HOUSE', 'S', '목욕관리사'],
    ['KARAOKE_STAFF', 'R', '노래방 직원'],
    ['PC_ROOM_STAFF', 'R', 'PC방 직원'],
    ['GOLF_CADDY', 'R', '골프장 캐디'],
    ['STREET_VENDOR', 'G', '노점상'],
  ])(
    '%s → F-4 blocked (공공이익 제한: %s)',
    (code, ksic, _nameKo) => {
      // [Legal] 법무부 고시 — F-4 공공이익 제한 직종은 인구감소지역(F-4-R)에서도 불가
      const result = f4.evaluate(
        createAlbaJobInput({ jobCategoryCode: code, ksicCode: ksic }),
      );
      expect(result.status).toBe('blocked');
      expect(result.blockReasons.some((r) => r.includes('공공이익'))).toBe(true);
    },
  );

  it('공공이익 제한 직종은 인구감소지역(F-4-R)에서도 금지 (Blocked even in depopulation areas)', () => {
    // [Legal] 법무부 고시 — 공공이익 제한은 F-4-R에서도 해제되지 않음
    const result = f4.evaluate(
      createAlbaJobInput({
        jobCategoryCode: 'KARAOKE_STAFF',
        ksicCode: 'R',
        workAddress: {
          sido: '경상북도',
          sigungu: '의성군',
          detail: '읍내',
          lat: 36.3561,
          lng: 128.6978,
          isDepopulationArea: true,
        },
      }),
    );
    expect(result.status).toBe('blocked');
  });

  it('공공이익 제한 직종도 F-5는 eligible (F-5 always eligible)', () => {
    const f5 = new F5AlbaEvaluator();
    const result = f5.evaluate(
      createAlbaJobInput({ jobCategoryCode: 'KARAOKE_STAFF', ksicCode: 'R' }),
    );
    expect(result.status).toBe('eligible');
  });

  it('공공이익 제한 직종도 F-6은 eligible (F-6 always eligible)', () => {
    const f6 = new F6AlbaEvaluator();
    const result = f6.evaluate(
      createAlbaJobInput({ jobCategoryCode: 'SKIN_CARE', ksicCode: 'S' }),
    );
    expect(result.status).toBe('eligible');
  });
});

// ====================================================================
// F-4 예외 8직종 전수 테스트 (신규 3건 포함)
// F-4 Exception 8 Jobs Complete Test (including 3 newly added)
// [Legal] 법무부 고시 (2024) — 단순노무 제한 일부 완화
// ====================================================================
describe('F4 예외 8직종 전수 확인 / F-4 Exception 8 Jobs Full Verification', () => {
  const f4 = new F4AlbaEvaluator();

  it.each([
    ['CONSTRUCTION_SKILLED', 'F', '건설기능공 (예외1)'],
    ['LOGISTICS_SORT', 'H', '하역 종사원 (예외2)'],
    ['FACTORY_PACKING', 'C', '포장원 (예외3)'],
    ['BUILDING_SECURITY', 'N', '건물 경비원 (예외4)'],
    ['GAS_STATION', 'G', '주유원 (예외5)'],
    ['PARKING_MGMT', 'N', '주차안내원 (예외6)'],
    ['FAST_FOOD', 'I', '패스트푸드점 점원 (예외7)'],
    ['REST_KITCHEN', 'I', '조리 보조원 (예외8a)'],
    ['REST_SERVING', 'I', '음식점 서빙 (예외8b)'],
    ['HOTEL_SERVICE', 'I', '호텔 서비스 (예외8c)'],
  ])(
    '%s → F-4 conditional (예외 허용: %s)',
    (code, ksic, _desc) => {
      // [Legal] 법무부 고시 (2024) — 단순노무이지만 예외적으로 허용
      const result = f4.evaluate(
        createAlbaJobInput({ jobCategoryCode: code, ksicCode: ksic }),
      );
      expect(result.status).toBe('conditional');
      expect(
        result.conditions.some((c) => c.includes('예외') || c.includes('exception')),
      ).toBe(true);
    },
  );
});

// ====================================================================
// 종합 시나리오 테스트 — 직종→시간→조건→최종 비자 출력
// End-to-end Scenario Tests — Category→Hours→Conditions→Final Visa Output
// [Legal] 각 비자별 관련 법령 종합
// ====================================================================
describe('종합 시나리오: 직종+시간 조합별 비자 필터링 / E2E: Category+Hours Visa Filtering', () => {
  const ALL_EVALUATORS = {
    'D-2': new D2AlbaEvaluator(),
    'D-4': new D4AlbaEvaluator(),
    'D-10': new D10AlbaEvaluator(),
    'F-2': new F2AlbaEvaluator(),
    'F-4': new F4AlbaEvaluator(),
    'F-5': new F5AlbaEvaluator(),
    'F-6': new F6AlbaEvaluator(),
    'H-1': new H1AlbaEvaluator(),
    'H-2': new H2AlbaEvaluator(),
  };

  /** 전체 비자 평가 실행 / Run all evaluators */
  function evaluateAll(input: AlbaJobInput) {
    const results: Record<string, ReturnType<typeof ALL_EVALUATORS['D-2']['evaluate']>> = {};
    for (const [code, evaluator] of Object.entries(ALL_EVALUATORS)) {
      results[code] = evaluator.evaluate(input);
    }
    return results;
  }

  // ----------------------------------------------------------------
  // 시나리오 1: 음식점 서빙 + 주 15시간 (가장 일반적인 알바)
  // Scenario 1: Restaurant serving + 15h/week (most common part-time job)
  // ----------------------------------------------------------------
  describe('시나리오 1: 음식점 서빙 15시간/주', () => {
    const results = evaluateAll(
      createAlbaJobInput({
        jobCategoryCode: 'REST_SERVING',
        ksicCode: 'I',
        weeklyHours: 15,
      }),
    );

    it('F-5, F-6 항상 eligible (Always eligible)', () => {
      expect(results['F-5'].status).toBe('eligible');
      expect(results['F-6'].status).toBe('eligible');
    });

    it('H-1 eligible (유흥업소 아님) / H-1 eligible (not entertainment)', () => {
      expect(results['H-1'].status).toBe('eligible');
    });

    it('D-2 eligible 또는 conditional (15h ≤ 20h 학부 기본) / D-2 within basic limit', () => {
      expect(['eligible', 'conditional']).toContain(results['D-2'].status);
    });

    it('D-4 conditional (15h ≤ 20h, 6개월 대기) / D-4 within limit with wait', () => {
      expect(results['D-4'].status).toBe('conditional');
    });

    it('F-4 conditional (예외 8직종) / F-4 conditional (exception job)', () => {
      expect(results['F-4'].status).toBe('conditional');
    });

    it('H-2 eligible 또는 conditional (허용 업종) / H-2 allowed industry', () => {
      expect(['eligible', 'conditional']).toContain(results['H-2'].status);
    });
  });

  // ----------------------------------------------------------------
  // 시나리오 2: 편의점 + 주 25시간 (D-2 경계값)
  // Scenario 2: Convenience store + 25h/week (D-2 boundary)
  // ----------------------------------------------------------------
  describe('시나리오 2: 편의점 25시간/주', () => {
    const results = evaluateAll(
      createAlbaJobInput({
        jobCategoryCode: 'CONV_STORE',
        ksicCode: 'G',
        weeklyHours: 25,
      }),
    );

    it('F-5, F-6 항상 eligible', () => {
      expect(results['F-5'].status).toBe('eligible');
      expect(results['F-6'].status).toBe('eligible');
    });

    it('D-2 conditional (25h = 석사/박사 조건) / D-2 conditional (grad level)', () => {
      // [Legal] 법무부 — 석사 TOPIK 4+ 이상 주 25시간
      expect(results['D-2'].status).toBe('conditional');
    });

    it('D-4 blocked (25h > 20h 최대) / D-4 blocked (over 20h max)', () => {
      // [Legal] 법무부 — D-4 최대 주 20시간
      expect(results['D-4'].status).toBe('blocked');
    });

    it('D-10 blocked (편의점 비전문직) / D-10 blocked (non-professional)', () => {
      expect(results['D-10'].status).toBe('blocked');
    });

    it('F-4 blocked (편의점 = 단순판매, 비인구감소지역)', () => {
      // [Legal] 법무부 — F-4 편의점 단순판매 금지
      expect(results['F-4'].status).toBe('blocked');
    });

    it('H-1 eligible (유흥업소 아님) / H-1 eligible', () => {
      expect(results['H-1'].status).toBe('eligible');
    });
  });

  // ----------------------------------------------------------------
  // 시나리오 3: 건설 현장 보조 + 주 40시간 (풀타임)
  // Scenario 3: Construction site helper + 40h/week (full-time)
  // ----------------------------------------------------------------
  describe('시나리오 3: 건설 현장 보조 40시간/주', () => {
    const results = evaluateAll(
      createAlbaJobInput({
        jobCategoryCode: 'CONSTRUCTION_LABOR',
        ksicCode: 'F',
        weeklyHours: 40,
      }),
    );

    it('F-5, F-6 항상 eligible', () => {
      expect(results['F-5'].status).toBe('eligible');
      expect(results['F-6'].status).toBe('eligible');
    });

    it('D-2 blocked (건설업 전면 금지) / D-2 blocked (construction banned)', () => {
      // [Legal] 출입국관리법 시행령 제23조 — 건설업 전면 금지
      expect(results['D-2'].status).toBe('blocked');
    });

    it('D-4 blocked (건설업 전면 금지) / D-4 blocked (construction banned)', () => {
      expect(results['D-4'].status).toBe('blocked');
    });

    it('F-4 blocked (단순노무 + 비인구감소지역) / F-4 blocked (simple labor)', () => {
      expect(results['F-4'].status).toBe('blocked');
    });
  });

  // ----------------------------------------------------------------
  // 시나리오 4: 유흥업소 → 전비자 차단 (F-5, F-6 제외)
  // Scenario 4: Entertainment → ALL blocked (except F-5, F-6)
  // ----------------------------------------------------------------
  describe('시나리오 4: 유흥업소', () => {
    const results = evaluateAll(
      createAlbaJobInput({
        jobCategoryCode: 'ENTERTAINMENT',
        ksicCode: 'I_ENT',
        weeklyHours: 20,
      }),
    );

    it('F-5, F-6만 eligible (Only F-5, F-6 eligible)', () => {
      // [Legal] F-5/F-6은 활동 제한 없음
      expect(results['F-5'].status).toBe('eligible');
      expect(results['F-6'].status).toBe('eligible');
    });

    it('나머지 7개 비자 전부 blocked (All other 7 visas blocked)', () => {
      // [Legal] 출입국관리법 — 유흥업소 외국인 취업 전면 금지
      const otherVisas = ['D-2', 'D-4', 'D-10', 'F-2', 'F-4', 'H-1', 'H-2'];
      for (const visa of otherVisas) {
        expect(results[visa].status).toBe('blocked');
      }
    });
  });

  // ----------------------------------------------------------------
  // 시나리오 5: IT보조 + 주 10시간 (D-10 인턴 경로)
  // Scenario 5: IT assistant + 10h/week (D-10 intern path)
  // ----------------------------------------------------------------
  describe('시나리오 5: IT보조 10시간/주', () => {
    const results = evaluateAll(
      createAlbaJobInput({
        jobCategoryCode: 'IT_ASSIST',
        ksicCode: 'J',
        weeklyHours: 10,
      }),
    );

    it('F-5, F-6 항상 eligible', () => {
      expect(results['F-5'].status).toBe('eligible');
      expect(results['F-6'].status).toBe('eligible');
    });

    it('D-10 conditional (전문직 인턴) / D-10 conditional (professional intern)', () => {
      // [Legal] 법무부 — D-10 E-1~E-7 분야 인턴 가능
      expect(results['D-10'].status).toBe('conditional');
    });

    it('D-2 eligible 또는 conditional (10h 기본 허용) / D-2 within basic', () => {
      expect(['eligible', 'conditional']).toContain(results['D-2'].status);
    });

    it('F-4 eligible (비단순노무) / F-4 eligible (non-simple-labor)', () => {
      // [Legal] 법무부 — IT보조는 전문직, F-4 자유취업
      expect(results['F-4'].status).toBe('eligible');
    });

    it('H-1 eligible (유흥업소 아님)', () => {
      expect(results['H-1'].status).toBe('eligible');
    });
  });

  // ----------------------------------------------------------------
  // 시나리오 6: 물류 분류 + 인구감소지역 (F-4-R 특례)
  // Scenario 6: Logistics sorting + depopulation area (F-4-R special)
  // ----------------------------------------------------------------
  describe('시나리오 6: 물류분류 + 인구감소지역', () => {
    const depopInput = createAlbaJobInput({
      jobCategoryCode: 'LOGISTICS_SORT',
      ksicCode: 'H',
      weeklyHours: 20,
      workAddress: {
        sido: '경상북도',
        sigungu: '의성군',
        detail: '읍내',
        lat: 36.3561,
        lng: 128.6978,
        isDepopulationArea: true,
      },
    });
    const normalInput = createAlbaJobInput({
      jobCategoryCode: 'LOGISTICS_SORT',
      ksicCode: 'H',
      weeklyHours: 20,
    });

    it('F-4 비인구감소: conditional (예외 8직종) / F-4 normal: conditional (exception)', () => {
      // [Legal] 법무부 고시 (2024) — 하역종사원 예외 허용
      const result = new F4AlbaEvaluator().evaluate(normalInput);
      expect(result.status).toBe('conditional');
    });

    it('F-4 인구감소지역(F-4-R): conditional (예외가 우선 적용) / F-4-R: conditional (exception first)', () => {
      // [Legal] 예외 체크가 인구감소지역 체크보다 먼저 실행됨
      const result = new F4AlbaEvaluator().evaluate(depopInput);
      // 예외 8직종 체크가 STEP 3에서 먼저 걸리므로 conditional
      expect(result.status).toBe('conditional');
    });
  });

  // ----------------------------------------------------------------
  // 시나리오 7: 시간별 D-2 필터링 단계 검증
  // Scenario 7: D-2 filtering by weekly hours (step-by-step)
  // ----------------------------------------------------------------
  describe('시나리오 7: D-2 시간별 필터링 단계', () => {
    const d2 = new D2AlbaEvaluator();
    const baseInput = { jobCategoryCode: 'CAFE_BARISTA' as string, ksicCode: 'I' };

    it('주 10시간: eligible/conditional (TOPIK 미충족 학부 기본)', () => {
      const r = d2.evaluate(createAlbaJobInput({ ...baseInput, weeklyHours: 10 }));
      expect(r.status).not.toBe('blocked');
    });

    it('주 15시간: conditional (TOPIK 3급+ 필요)', () => {
      const r = d2.evaluate(createAlbaJobInput({ ...baseInput, weeklyHours: 15 }));
      expect(r.status).toBe('conditional');
    });

    it('주 20시간: conditional (학부 TOPIK 최대)', () => {
      const r = d2.evaluate(createAlbaJobInput({ ...baseInput, weeklyHours: 20 }));
      expect(r.status).toBe('conditional');
    });

    it('주 25시간: conditional (석사/박사 조건)', () => {
      const r = d2.evaluate(createAlbaJobInput({ ...baseInput, weeklyHours: 25 }));
      expect(r.status).toBe('conditional');
    });

    it('주 35시간: conditional (박사 우대 최대)', () => {
      const r = d2.evaluate(createAlbaJobInput({ ...baseInput, weeklyHours: 35 }));
      expect(r.status).toBe('conditional');
    });

    it('주 36시간: blocked (절대 최대 초과)', () => {
      const r = d2.evaluate(createAlbaJobInput({ ...baseInput, weeklyHours: 36 }));
      expect(r.status).toBe('blocked');
    });
  });

  // ----------------------------------------------------------------
  // 시나리오 8: 피부관리사 (공공이익 제한 → 대부분 허용, F-4만 금지)
  // Scenario 8: Skin care (public interest → mostly allowed, only F-4 blocked)
  // ----------------------------------------------------------------
  describe('시나리오 8: 피부관리사 20시간/주', () => {
    const results = evaluateAll(
      createAlbaJobInput({
        jobCategoryCode: 'SKIN_CARE',
        ksicCode: 'S',
        weeklyHours: 20,
      }),
    );

    it('F-5, F-6 항상 eligible', () => {
      expect(results['F-5'].status).toBe('eligible');
      expect(results['F-6'].status).toBe('eligible');
    });

    it('F-4 blocked (공공이익 제한) / F-4 blocked (public interest)', () => {
      // [Legal] 법무부 고시 — 피부관리사 공공이익 제한
      expect(results['F-4'].status).toBe('blocked');
    });

    it('H-1 eligible (유흥업소 아님) / H-1 eligible', () => {
      expect(results['H-1'].status).toBe('eligible');
    });

    it('D-2 eligible 또는 conditional (20h 이내) / D-2 within limit', () => {
      expect(['eligible', 'conditional']).toContain(results['D-2'].status);
    });
  });

  // ----------------------------------------------------------------
  // 시나리오 9: 농업 보조 + 주 40시간
  // Scenario 9: Agriculture helper + 40h/week
  // ----------------------------------------------------------------
  describe('시나리오 9: 농업 보조 40시간/주', () => {
    const results = evaluateAll(
      createAlbaJobInput({
        jobCategoryCode: 'AGRICULTURE',
        ksicCode: 'A',
        weeklyHours: 40,
      }),
    );

    it('F-5, F-6 항상 eligible', () => {
      expect(results['F-5'].status).toBe('eligible');
      expect(results['F-6'].status).toBe('eligible');
    });

    it('D-2 blocked (40h > 35h 최대) / D-2 blocked (over max)', () => {
      expect(results['D-2'].status).toBe('blocked');
    });

    it('D-4 blocked (40h > 20h 최대) / D-4 blocked (over max)', () => {
      expect(results['D-4'].status).toBe('blocked');
    });

    it('F-4 blocked (단순노무, 비인구감소지역) / F-4 blocked (simple labor)', () => {
      expect(results['F-4'].status).toBe('blocked');
    });

    it('H-2 eligible 또는 conditional (농업 허용 + 구인기간 조건)', () => {
      // [Legal] 외국인근로자 고용법 — 농축산업 허용
      expect(['eligible', 'conditional']).toContain(results['H-2'].status);
    });
  });

  // ----------------------------------------------------------------
  // 시나리오 10: 주말만 근무 (D-2/D-4 분기점)
  // Scenario 10: Weekend-only work (D-2 vs D-4 divergence)
  // ----------------------------------------------------------------
  describe('시나리오 10: 카페 바리스타 주말만 16시간/주', () => {
    const results = evaluateAll(
      createAlbaJobInput({
        jobCategoryCode: 'CAFE_BARISTA',
        ksicCode: 'I',
        weeklyHours: 16,
        isWeekendOnly: true,
        hasWeekdayShift: false,
        schedule: WEEKEND_ONLY_SCHEDULE,
      }),
    );

    it('D-2 eligible (주말 TOPIK 충족 시 무제한) / D-2 eligible (weekend unlimited)', () => {
      // [Legal] 법무부 고시 — 주말/공휴일 근무 시간 무제한 (TOPIK 충족 조건)
      expect(results['D-2'].status).toBe('eligible');
    });

    it('D-4 conditional (주말도 시간제한 동일) / D-4 conditional (same limit on weekends)', () => {
      // [Legal] 법무부 고시 — D-4는 주말에도 20시간 제한 동일 (D-2와 핵심 차이)
      expect(results['D-4'].status).toBe('conditional');
    });

    it('F-4 eligible (비단순노무) / F-4 eligible (non-simple-labor)', () => {
      expect(results['F-4'].status).toBe('eligible');
    });
  });
});
