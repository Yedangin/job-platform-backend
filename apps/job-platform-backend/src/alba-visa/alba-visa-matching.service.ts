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
import { getKsicMapping, KSIC_MAPPING } from '../common/data/visa';
import { isDepopulationArea } from '../common/data/visa';
import {
  AlbaCategoriesResponseDto,
  AlbaJobCategoryDto,
  AlbaCategoryGroupDto,
} from './dto/alba-categories-response.dto';

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
   * 알바 직종 목록 조회 (웹/앱 드롭다운용)
   * Get alba job categories (for web/app dropdown)
   *
   * KSIC 매핑 테이블의 34개 직종을 그룹별로 정리하여 반환합니다.
   * Returns 34 job categories from KSIC mapping table, grouped by category.
   * 정규직 getE7Categories()와 동일 패턴.
   * Same pattern as fulltime getE7Categories().
   */
  getAlbaCategories(): AlbaCategoriesResponseDto {
    this.logger.log(
      '[getAlbaCategories] 알바 직종 목록 조회 / Fetching alba job categories',
    );

    // 그룹 매핑 정의 / Group mapping definitions
    const GROUP_MAP: Record<string, { group: string; groupName: string; icon: string }> = {
      'REST_SERVING': { group: 'FOOD', groupName: '음식점/카페', icon: '🍽️' },
      'REST_KITCHEN': { group: 'FOOD', groupName: '음식점/카페', icon: '🧑‍🍳' },
      'CAFE_BARISTA': { group: 'FOOD', groupName: '음식점/카페', icon: '☕' },
      'FAST_FOOD': { group: 'FOOD', groupName: '음식점/카페', icon: '🍔' },
      'HOTEL_SERVICE': { group: 'FOOD', groupName: '음식점/카페', icon: '🏨' },
      'CONV_STORE': { group: 'RETAIL', groupName: '판매/유통', icon: '🏪' },
      'MART_SALES': { group: 'RETAIL', groupName: '판매/유통', icon: '🛒' },
      'CLOTHING_SALES': { group: 'RETAIL', groupName: '판매/유통', icon: '👗' },
      'LOGISTICS_SORT': { group: 'LOGISTICS', groupName: '물류/배달', icon: '📦' },
      'DELIVERY': { group: 'LOGISTICS', groupName: '물류/배달', icon: '🛵' },
      'MOVING_LABOR': { group: 'LOGISTICS', groupName: '물류/배달', icon: '🚛' },
      'NEWSPAPER_DELIVERY': { group: 'LOGISTICS', groupName: '물류/배달', icon: '📰' },
      'CONSTRUCTION_LABOR': { group: 'CONSTRUCTION', groupName: '건설', icon: '🏗️' },
      'CONSTRUCTION_SKILLED': { group: 'CONSTRUCTION', groupName: '건설', icon: '🔧' },
      'FACTORY_SIMPLE': { group: 'MANUFACTURING', groupName: '제조/생산', icon: '🏭' },
      'FACTORY_PACKING': { group: 'MANUFACTURING', groupName: '제조/생산', icon: '📋' },
      'AGRICULTURE': { group: 'PRIMARY', groupName: '농축수산', icon: '🌾' },
      'FISHING': { group: 'PRIMARY', groupName: '농축수산', icon: '🐟' },
      'OFFICE_ASSIST': { group: 'OFFICE', groupName: '사무/전문직', icon: '💼' },
      'TRANSLATION': { group: 'OFFICE', groupName: '사무/전문직', icon: '🌐' },
      'IT_ASSIST': { group: 'IT', groupName: 'IT/개발', icon: '💻' },
      'TUTORING': { group: 'EDUCATION', groupName: '교육', icon: '📚' },
      'GAS_STATION': { group: 'SERVICE', groupName: '서비스', icon: '⛽' },
      'PARKING_MGMT': { group: 'SERVICE', groupName: '서비스', icon: '🅿️' },
      'CLEANING': { group: 'SERVICE', groupName: '서비스', icon: '🧹' },
      'CAREGIVER': { group: 'SERVICE', groupName: '서비스', icon: '🩺' },
      'HOUSEKEEPER': { group: 'SERVICE', groupName: '서비스', icon: '🏠' },
      'ENTERTAINMENT': { group: 'ENTERTAINMENT', groupName: '유흥업소', icon: '🚫' },
      'FINANCE': { group: 'OFFICE', groupName: '사무/전문직', icon: '🏦' },
      'REAL_ESTATE': { group: 'OFFICE', groupName: '사무/전문직', icon: '🏢' },
      'PUBLIC_ADMIN': { group: 'OFFICE', groupName: '사무/전문직', icon: '🏛️' },
      'INTERN_PROFESSIONAL': { group: 'OFFICE', groupName: '사무/전문직', icon: '🎓' },
      'BUILDING_SECURITY': { group: 'SERVICE', groupName: '서비스', icon: '🛡️' },
      'SKIN_CARE': { group: 'BEAUTY', groupName: '뷰티/관리', icon: '💆' },
      'BATH_HOUSE': { group: 'BEAUTY', groupName: '뷰티/관리', icon: '🛁' },
      'KARAOKE_STAFF': { group: 'LEISURE', groupName: '여가/오락', icon: '🎤' },
      'PC_ROOM_STAFF': { group: 'LEISURE', groupName: '여가/오락', icon: '🖥️' },
      'GOLF_CADDY': { group: 'LEISURE', groupName: '여가/오락', icon: '⛳' },
      'STREET_VENDOR': { group: 'RETAIL', groupName: '판매/유통', icon: '🏪' },
      'EVENT_STAFF': { group: 'ETC', groupName: '기타', icon: '🎪' },
      'PROMOTION': { group: 'ETC', groupName: '기타', icon: '📢' },
    };

    // 카테고리 변환 / Transform categories
    const categories: AlbaJobCategoryDto[] = KSIC_MAPPING.map((entry) => {
      const groupInfo = GROUP_MAP[entry.jobCategoryCode] ?? {
        group: 'ETC',
        groupName: '기타',
        icon: '📌',
      };
      return {
        code: entry.jobCategoryCode,
        nameKo: entry.nameKo,
        nameEn: entry.nameEn,
        group: groupInfo.group,
        groupName: groupInfo.groupName,
        icon: groupInfo.icon,
        ksicCode: entry.ksicCode,
        isSimpleLabor: entry.isSimpleLabor,
        isEntertainment: entry.isEntertainment,
      };
    });

    // 그룹 집계 / Aggregate groups
    const groupCounts = new Map<string, { group: string; groupName: string; count: number }>();
    for (const cat of categories) {
      const existing = groupCounts.get(cat.group);
      if (existing) {
        existing.count++;
      } else {
        groupCounts.set(cat.group, {
          group: cat.group,
          groupName: cat.groupName,
          count: 1,
        });
      }
    }

    const groups: AlbaCategoryGroupDto[] = Array.from(groupCounts.values());
    const simpleLaborCount = categories.filter((c) => c.isSimpleLabor).length;

    return {
      categories,
      groups,
      totalCount: categories.length,
      simpleLaborCount,
      basedOn: 'KSIC 제11차 개정 (통계청 고시 제2024-001호)',
    };
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
