/**
 * 정규직 비자 매칭 컨트롤러
 * Fulltime visa matching controller
 *
 * REST API 엔드포인트:
 * REST API endpoints:
 * - POST /fulltime-visa/evaluate: Job-side 비자 매칭
 * - POST /fulltime-visa/evaluate-applicant: Applicant-side 비자 매칭
 */

import { Controller, Post, Get, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FulltimeVisaMatchingService } from '../services/fulltime-visa-matching.service';
import {
  FulltimeVisaMatchingRequestDto,
  FulltimeVisaMatchingWithApplicantRequestDto,
} from '../dto/fulltime-visa-matching-request.dto';
import {
  FulltimeVisaMatchingResponseDto,
  FulltimeVisaMatchingWithApplicantResponseDto,
} from '../dto/fulltime-visa-matching-response.dto';
import { FulltimeVisaFilterRulesResponseDto } from '../dto/fulltime-visa-filter-rules-response.dto';

@ApiTags('Fulltime Visa Matching')
@Controller('fulltime-visa')
export class FulltimeVisaMatchingController {
  constructor(
    private readonly fulltimeVisaMatchingService: FulltimeVisaMatchingService,
  ) {}

  /**
   * 정규직 비자 필터링 규칙 조회 (프론트엔드 실시간 필터링용)
   * Get fulltime visa filter rules (for frontend real-time filtering)
   *
   * 사용 시나리오:
   * Use case:
   * - 프론트엔드에서 실시간 비자 필터링 인디케이터 표시
   *   Frontend displays real-time visa filtering indicator
   * - 각 비자별 최저연봉, 최소학력, 해외채용의사 필요 여부 제공
   *   Provides minSalary, minEducation, requiresOverseasHire for each visa
   * - 사용자가 입력할 때마다 클라이언트에서 필터링
   *   Client-side filtering as user inputs data
   */
  @Get('filter-rules')
  @ApiOperation({
    summary: '정규직 비자 필터링 규칙 조회 / Get fulltime visa filter rules',
    description:
      '프론트엔드 실시간 필터링을 위한 각 비자별 기본 규칙을 반환합니다. ' +
      '(Returns basic filter rules for each visa for frontend real-time filtering)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '필터링 규칙 조회 성공 / Filter rules retrieved successfully',
    type: FulltimeVisaFilterRulesResponseDto,
  })
  async getFilterRules(): Promise<FulltimeVisaFilterRulesResponseDto> {
    return this.fulltimeVisaMatchingService.getFilterRules();
  }

  /**
   * Job-side 비자 매칭: 공고 조건만으로 전체 비자 평가
   * Job-side visa matching: Evaluate all visas based on job requirements only
   *
   * 사용 시나리오:
   * Use case:
   * - 기업이 정규직 공고를 등록할 때
   *   When a company posts a fulltime job
   * - "이 공고에 어떤 비자 보유자가 지원할 수 있나요?"
   *   "Which visa holders can apply to this job?"
   * - 채용 가능한 비자 목록을 4가지 트랙(IMMEDIATE, SPONSOR, TRANSITION, TRANSFER)으로 분류
   *   Classify hireable visas into 4 tracks
   */
  @Post('evaluate')
  @ApiOperation({
    summary: 'Job-side 비자 매칭 / Job-side visa matching',
    description:
      '정규직 공고 조건만으로 전체 비자 타입을 평가하여 채용 가능 여부를 판별합니다. ' +
      '4가지 채용 트랙(즉시 채용, 스폰서, 전환, 이직)으로 분류하여 반환합니다. ' +
      '(Evaluates all visa types based on job requirements only and returns classification by 4 hiring tracks)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '비자 매칭 성공 / Visa matching successful',
    type: FulltimeVisaMatchingResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '잘못된 요청 / Invalid request',
  })
  async evaluateJob(
    @Body() dto: FulltimeVisaMatchingRequestDto,
  ): Promise<FulltimeVisaMatchingResponseDto> {
    return this.fulltimeVisaMatchingService.evaluateJob(dto);
  }

  /**
   * Applicant-side 비자 매칭: 지원자 프로필 기반 교차 검증
   * Applicant-side visa matching: Cross-validation with applicant profile
   *
   * 사용 시나리오:
   * Use case:
   * - 외국인 구직자가 특정 공고에 지원하려 할 때
   *   When a foreign job seeker wants to apply to a specific job
   * - "내가 이 공고에 지원할 수 있나요?"
   *   "Can I apply to this job?"
   * - 지원자의 비자 타입, 학력, 경력 등을 교차 검증하여 지원 가능 여부 판별
   *   Cross-validate applicant's visa type, education, experience to determine eligibility
   */
  @Post('evaluate-applicant')
  @ApiOperation({
    summary: 'Applicant-side 비자 매칭 / Applicant-side visa matching',
    description:
      '지원자의 프로필(비자, 학력, 경력 등)과 공고 조건을 교차 검증하여 ' +
      '해당 공고에 지원 가능한지 여부를 판별합니다. ' +
      '(Cross-validates applicant profile with job requirements to determine eligibility)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '지원자 매칭 성공 / Applicant matching successful',
    type: FulltimeVisaMatchingWithApplicantResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '잘못된 요청 / Invalid request',
  })
  async evaluateApplicant(
    @Body() dto: FulltimeVisaMatchingWithApplicantRequestDto,
  ): Promise<FulltimeVisaMatchingWithApplicantResponseDto> {
    return this.fulltimeVisaMatchingService.evaluateApplicant(dto);
  }
}
