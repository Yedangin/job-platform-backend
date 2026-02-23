/**
 * 알바 비자 매칭 서비스 — 메인 오케스트레이터
 * Alba Visa Matching Service — Main Orchestrator
 *
 * 9개 알바 전용 Evaluator를 순차 실행하여
 * 비자별 eligible / conditional / blocked 결과를 수집하고 정렬.
 *
 * Sequentially executes 9 alba-specific evaluators and
 * collects per-visa eligible / conditional / blocked results with sorting.
 *
 * [핵심 흐름 / Core Flow]
 * 1. jobCategoryCode → KSIC 코드 매핑
 * 2. schedule 분석 → isWeekendOnly, hasWeekdayShift 자동 계산
 * 3. address → isDepopulationArea 자동 판별
 * 4. 9개 비자 Evaluator 실행
 * 5. 결과 분류 (eligible / conditional / blocked) + 요약
 */

import { Injectable, Logger } from '@nestjs/common';
import {
  AlbaVisaMatchingRequestDto,
  DayOfWeek,
} from './dto/alba-visa-matching-request.dto';
import {
  AlbaVisaMatchingResponseDto,
  VisaEvalResultDto,
} from './dto/alba-visa-matching-response.dto';
import {
  AlbaJobInput,
  AlbaVisaEvalResult,
  IAlbaVisaEvaluator,
} from './evaluators/alba-evaluator.interface';
import { getKsicMapping } from '../common/data/visa';
import { isDepopulationArea } from '../common/data/visa';

// 평가기 임포트 / Evaluator imports
import { D2AlbaEvaluator } from './evaluators/d2-alba-evaluator';
import { D4AlbaEvaluator } from './evaluators/d4-alba-evaluator';
import { D10AlbaEvaluator } from './evaluators/d10-alba-evaluator';
import { F2AlbaEvaluator } from './evaluators/f2-alba-evaluator';
import { F4AlbaEvaluator } from './evaluators/f4-alba-evaluator';
import {
  F5AlbaEvaluator,
  F6AlbaEvaluator,
} from './evaluators/f5-f6-alba-evaluator';
import { H1AlbaEvaluator } from './evaluators/h1-alba-evaluator';
import { H2AlbaEvaluator } from './evaluators/h2-alba-evaluator';

/** 평일 요일 목록 / Weekday list */
const WEEKDAYS: ReadonlyArray<DayOfWeek> = [
  DayOfWeek.MON,
  DayOfWeek.TUE,
  DayOfWeek.WED,
  DayOfWeek.THU,
  DayOfWeek.FRI,
];

/** 주말 요일 목록 / Weekend list */
const WEEKEND_DAYS: ReadonlyArray<DayOfWeek> = [DayOfWeek.SAT, DayOfWeek.SUN];

@Injectable()
export class AlbaVisaMatchingService {
  private readonly logger = new Logger(AlbaVisaMatchingService.name);

  /** 등록된 알바 비자 평가기 목록 / Registered alba visa evaluators */
  private readonly evaluators: ReadonlyArray<IAlbaVisaEvaluator>;

  constructor() {
    // 9개 알바 전용 Evaluator 등록 / Register 9 alba-specific evaluators
    this.evaluators = [
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

    this.logger.log(
      `알바 비자 매칭 엔진 초기화 완료: ${this.evaluators.length}개 Evaluator 등록 / ` +
        `Alba visa matching engine initialized: ${this.evaluators.length} evaluators registered`,
    );
  }

  /**
   * 알바 비자 매칭 실행
   * Execute alba visa matching
   *
   * @param dto 매칭 요청 DTO / Matching request DTO
   * @returns 비자별 매칭 결과 (3분류 + 요약) / Per-visa matching results (trichotomy + summary)
   */
  evaluateAll(dto: AlbaVisaMatchingRequestDto): AlbaVisaMatchingResponseDto {
    this.logger.log(
      `알바 비자 매칭 시작: jobCategoryCode=${dto.jobCategoryCode}, weeklyHours=${dto.weeklyHours} / ` +
        `Alba visa matching start: jobCategoryCode=${dto.jobCategoryCode}, weeklyHours=${dto.weeklyHours}`,
    );

    // === 1. 입력 데이터 변환 / Transform input data ===
    const input = this.buildAlbaJobInput(dto);

    this.logger.log(
      `입력 변환 완료: ksicCode=${input.ksicCode}, isWeekendOnly=${input.isWeekendOnly}, ` +
        `hasWeekdayShift=${input.hasWeekdayShift}, isDepopulationArea=${input.workAddress.isDepopulationArea} / ` +
        `Input transformed: ksicCode=${input.ksicCode}, isWeekendOnly=${input.isWeekendOnly}, ` +
        `hasWeekdayShift=${input.hasWeekdayShift}, isDepopulationArea=${input.workAddress.isDepopulationArea}`,
    );

    // === 2. 모든 Evaluator 실행 / Execute all evaluators ===
    const results: AlbaVisaEvalResult[] = [];
    for (const evaluator of this.evaluators) {
      try {
        const evalResult = evaluator.evaluate(input);
        results.push(evalResult);

        this.logger.debug(
          `[${evaluator.visaCode}] ${evaluator.visaName}: ${evalResult.status} / ` +
            `[${evaluator.visaCode}] ${evaluator.visaNameEn}: ${evalResult.status}`,
        );
      } catch (error) {
        this.logger.error(
          `Evaluator 실행 오류: ${evaluator.visaCode} — ${error instanceof Error ? error.message : String(error)} / ` +
            `Evaluator execution error: ${evaluator.visaCode}`,
        );
        // 오류 발생 시 해당 비자는 blocked로 처리 / On error, mark as blocked
        results.push({
          visaCode: evaluator.visaCode,
          visaName: evaluator.visaName,
          visaNameEn: evaluator.visaNameEn,
          status: 'blocked',
          conditions: [],
          blockReasons: ['평가 중 오류 발생 (Evaluation error occurred)'],
          requiredPermit: null,
          maxWeeklyHours: null,
          maxWorkplaces: null,
          notes: null,
        });
      }
    }

    // === 3. 결과 분류 / Categorize results ===
    const eligible = results.filter((r) => r.status === 'eligible');
    const conditional = results.filter((r) => r.status === 'conditional');
    const blocked = results.filter((r) => r.status === 'blocked');

    // === 4. 정렬 (eligible → conditional → blocked 내에서 비자 코드순) ===
    // Sort (within each category, by visa code)
    const sortByVisaCode = (a: AlbaVisaEvalResult, b: AlbaVisaEvalResult) =>
      a.visaCode.localeCompare(b.visaCode);
    eligible.sort(sortByVisaCode);
    conditional.sort(sortByVisaCode);
    blocked.sort(sortByVisaCode);

    // === 5. 응답 DTO 구성 / Build response DTO ===
    const response: AlbaVisaMatchingResponseDto = {
      eligible: eligible.map(this.toVisaEvalResultDto),
      conditional: conditional.map(this.toVisaEvalResultDto),
      blocked: blocked.map(this.toVisaEvalResultDto),
      summary: {
        totalEligible: eligible.length,
        totalConditional: conditional.length,
        totalBlocked: blocked.length,
      },
      matchedAt: new Date().toISOString(),
      inputSummary: {
        jobCategoryCode: dto.jobCategoryCode,
        ksicCode: input.ksicCode,
        weeklyHours: input.weeklyHours,
        isWeekendOnly: input.isWeekendOnly,
        hasWeekdayShift: input.hasWeekdayShift,
        isDepopulationArea: input.workAddress.isDepopulationArea,
      },
    };

    this.logger.log(
      `알바 비자 매칭 완료: eligible=${eligible.length}, conditional=${conditional.length}, blocked=${blocked.length} / ` +
        `Alba visa matching completed: eligible=${eligible.length}, conditional=${conditional.length}, blocked=${blocked.length}`,
    );

    return response;
  }

  /**
   * 요청 DTO → AlbaJobInput 변환
   * Transform request DTO to AlbaJobInput
   */
  private buildAlbaJobInput(dto: AlbaVisaMatchingRequestDto): AlbaJobInput {
    // 1. KSIC 코드 결정: 직접 지정 > 자동 매핑
    // Determine KSIC code: direct specification > auto-mapping
    let ksicCode = dto.ksicCode ?? '';
    if (!ksicCode) {
      const mapping = getKsicMapping(dto.jobCategoryCode);
      ksicCode = mapping?.ksicCode ?? '';
      if (!ksicCode) {
        this.logger.warn(
          `직종 코드 '${dto.jobCategoryCode}'에 대한 KSIC 매핑을 찾을 수 없습니다 / ` +
            `KSIC mapping not found for job category code '${dto.jobCategoryCode}'`,
        );
      }
    }

    // 2. 스케줄 분석: 주말만 근무 여부, 평일 근무 포함 여부
    // Analyze schedule: weekend-only flag, weekday shift flag
    const scheduleDays = dto.schedule.map((s) => s.dayOfWeek);
    const hasWeekdayShift = scheduleDays.some((d) =>
      WEEKDAYS.includes(d as DayOfWeek),
    );
    const hasWeekendShift = scheduleDays.some((d) =>
      WEEKEND_DAYS.includes(d as DayOfWeek),
    );
    const isWeekendOnly = hasWeekendShift && !hasWeekdayShift;

    // 3. 인구감소지역 판별 / Depopulation area determination
    const isDepopArea = isDepopulationArea(
      dto.address.sido,
      dto.address.sigungu,
    );

    return {
      jobCategoryCode: dto.jobCategoryCode,
      ksicCode,
      weeklyHours: dto.weeklyHours,
      isWeekendOnly,
      hasWeekdayShift,
      workAddress: {
        sido: dto.address.sido,
        sigungu: dto.address.sigungu,
        detail: dto.address.detail,
        lat: dto.address.lat,
        lng: dto.address.lng,
        isDepopulationArea: isDepopArea,
      },
      hourlyWage: dto.hourlyWage,
      startDate: new Date().toISOString().split('T')[0],
      endDate: null,
      schedule: dto.schedule.map((s) => ({
        dayOfWeek: s.dayOfWeek as
          | 'MON'
          | 'TUE'
          | 'WED'
          | 'THU'
          | 'FRI'
          | 'SAT'
          | 'SUN',
        startTime: s.startTime,
        endTime: s.endTime,
      })),
    };
  }

  /**
   * AlbaVisaEvalResult → VisaEvalResultDto 변환
   * Transform AlbaVisaEvalResult to VisaEvalResultDto
   */
  private toVisaEvalResultDto(result: AlbaVisaEvalResult): VisaEvalResultDto {
    return {
      visaCode: result.visaCode,
      visaName: result.visaName,
      visaNameEn: result.visaNameEn,
      status: result.status,
      conditions: result.conditions,
      blockReasons: result.blockReasons,
      requiredPermit: result.requiredPermit,
      maxWeeklyHours: result.maxWeeklyHours,
      maxWorkplaces: result.maxWorkplaces,
      notes: result.notes,
    };
  }
}
