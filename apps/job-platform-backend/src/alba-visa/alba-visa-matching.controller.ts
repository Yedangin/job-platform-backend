/**
 * 알바 비자 매칭 컨트롤러
 * Alba Visa Matching Controller
 *
 * 엔드포인트: POST /api/alba/visa-matching
 * Endpoint: POST /api/alba/visa-matching
 *
 * 알바 공고 데이터를 기반으로 비자별 취업 가능 여부를 판별합니다.
 * Determines per-visa work eligibility based on alba job posting data.
 *
 * 공고 저장 시 자동 호출되지만, 미리보기용으로 독립 호출도 가능합니다.
 * Auto-called on posting save, but also callable independently for preview.
 */

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AlbaVisaMatchingService } from './alba-visa-matching.service';
import { AlbaVisaMatchingRequestDto } from './dto/alba-visa-matching-request.dto';
import { AlbaVisaMatchingResponseDto } from './dto/alba-visa-matching-response.dto';
import { AlbaHiringVisaAnalysisService } from './alba-hiring-visa-analysis.service';
import {
  AlbaHiringVisaAnalysisRequestDto,
  AlbaHiringVisaAnalysisResponseDto,
} from './dto/alba-hiring-visa-analysis.dto';

@ApiTags('alba-visa-matching')
@Controller('api/alba')
export class AlbaVisaMatchingController {
  constructor(
    private readonly albaVisaMatchingService: AlbaVisaMatchingService,
    private readonly albaHiringVisaAnalysisService: AlbaHiringVisaAnalysisService,
  ) {}

  /**
   * 알바 비자 매칭 실행
   * Execute alba visa matching
   *
   * 9개 비자 유형(D-2, D-4, D-10, F-2, F-4, F-5, F-6, H-1, H-2)에 대해
   * 입력된 알바 공고 조건으로 취업 가능 여부를 판별합니다.
   *
   * Evaluates work eligibility for 9 visa types based on
   * the input alba job posting conditions.
   *
   * @param dto 매칭 요청 DTO / Matching request DTO
   * @returns 비자별 매칭 결과 (eligible/conditional/blocked) / Per-visa matching results
   */
  @Post('visa-matching')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @ApiOperation({
    summary:
      '알바 비자 매칭 (독립 호출 가능) / Alba visa matching (independently callable)',
    description: `
알바 공고 데이터를 기반으로 비자별 취업 가능 여부를 판별합니다.
공고 저장 시 자동으로 호출되지만, 미리보기용으로 독립 호출도 가능합니다.

Determines per-visa work eligibility based on alba job posting data.
Auto-called on posting save, but also callable independently for preview.

## 매칭 엔진 동작 / Matching Engine Operation
1. jobCategoryCode → KSIC 대분류 코드 매핑
2. schedule 분석 → isWeekendOnly, hasWeekdayShift 계산
3. address → isDepopulationArea 판별
4. 9개 비자 Evaluator 순차 실행

## 평가 대상 비자 / Evaluated Visas
- D-2 (유학): 업종제한 + 시간제한(TOPIK/학년별) + 주말무제한
- D-4 (어학연수): D-2 유사 + 사업장1개 + 6개월경과
- D-10 (구직): 인턴만 + E-1~E-7 분야
- F-2 (거주): 거의 무제한 (F-2 점수제 동일분야)
- F-4 (재외동포): 단순노무 금지 + 예외 + 인구감소지역
- F-5 (영주): 무조건 가능
- F-6 (결혼이민): 무조건 가능
- H-1 (워킹홀리데이): 유흥업소만 금지
- H-2 (방문취업): 네거티브 리스트
    `,
  })
  @ApiBody({ type: AlbaVisaMatchingRequestDto })
  @ApiResponse({
    status: 200,
    description: '매칭 결과 반환 / Matching results returned',
    type: AlbaVisaMatchingResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: '유효성 검증 실패 / Validation error',
  })
  matchAlbaVisa(
    @Body() dto: AlbaVisaMatchingRequestDto,
  ): AlbaVisaMatchingResponseDto {
    return this.albaVisaMatchingService.evaluateAll(dto);
  }

  /**
   * 고용주용 비자 분석 (실시간 필터링)
   * Hiring Manager Visa Analysis (Real-time Filtering)
   *
   * 알바 공고 작성 시 직종과 근무시간을 입력하면
   * 고용 가능한 비자를 실시간으로 필터링합니다.
   *
   * Filters eligible visas in real-time when hiring manager
   * inputs job category and weekly hours during job posting.
   *
   * @param dto 분석 요청 DTO / Analysis request DTO
   * @returns 비자 분석 결과 / Visa analysis results
   */
  @Post('hiring/visa-analysis')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @ApiOperation({
    summary:
      '고용주용 비자 분석 (실시간) / Hiring Manager Visa Analysis (Real-time)',
    description: `
고용주가 알바 공고 작성 시 직종코드와 주당 근무시간을 입력하면,
고용 가능한 비자를 실시간으로 필터링하여 반환합니다.

When a hiring manager inputs job category and weekly hours,
this endpoint filters and returns eligible visas in real-time.

## 필터링 규칙 / Filtering Rules
1. **유흥업소** → 모든 비자 차단 / Adult Entertainment → Block ALL
2. **단순노무** → F-4 제외 / Simple Labor → Remove F-4
3. **업종 제한** → H-2 네거티브 리스트 해당 시 제외 / Industry → Remove H-2
4. **근무시간 초과** / Working Hours:
   - D-2: >25h/week → 제외
   - D-4: >20h/week → 제외
   - H-1: >25h/week → 제외

## 비자 분류 / Visa Categories
**자유취업 / Free Employment:** F-2, F-5, F-6, F-4, H-1, H-2
**허가필요 / Permit Required:** D-2, D-4, D-10, F-1, F-3
    `,
  })
  @ApiBody({ type: AlbaHiringVisaAnalysisRequestDto })
  @ApiResponse({
    status: 200,
    description: '비자 분석 결과 반환 / Visa analysis results returned',
    type: AlbaHiringVisaAnalysisResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: '유효성 검증 실패 / Validation error',
  })
  analyzeHiringVisas(
    @Body() dto: AlbaHiringVisaAnalysisRequestDto,
  ): AlbaHiringVisaAnalysisResponseDto {
    return this.albaHiringVisaAnalysisService.analyze(dto);
  }
}
