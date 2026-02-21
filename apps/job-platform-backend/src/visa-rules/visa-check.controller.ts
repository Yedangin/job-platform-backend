import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { Session, RedisService, SessionData } from 'libs/common/src';
import { VisaCheckService, VisaCheckInput } from './visa-check.service';

/**
 * 비자 적격성 체크 API (소거형 알고리즘)
 * Visa eligibility check API (elimination-based algorithm)
 *
 * Phase 5 알고리즘 기반 4개 엔드포인트:
 * 1. POST /visa/check — 단일 비자 적격성 체크
 * 2. GET /visa/eligible-visas — 채용공고 조건 기반 전체 비자 평가
 * 3. GET /visa/eligible-jobs/:visaCode — 비자로 허용되는 업종/직종
 * 4. GET /visa/transitions/:visaCode — 비자 전환 경로 조회
 */
@ApiTags('Visa Check')
@Controller('visa')
export class VisaCheckController {
  constructor(
    private readonly visaCheckService: VisaCheckService,
    private readonly redisService: RedisService,
  ) {}

  private async requireAuth(sessionId: string): Promise<string> {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    const sd = await this.redisService.get(`session:${sessionId}`);
    if (!sd) throw new UnauthorizedException('Invalid session');
    return JSON.parse(sd).userId;
  }

  // ==========================================
  // 1. POST /visa/check — 소거형 알고리즘 비자 적격성 체크
  // 1. POST /visa/check — Elimination-based visa eligibility check
  // ==========================================
  @Post('check')
  @ApiOperation({
    summary:
      '소거 알고리즘 기반 비자 적격성 체크 / Elimination-based visa eligibility check',
    description:
      '9단계 소거 알고리즘으로 특정 비자의 적격성 판정. 근로시간, 조건, 경고, 필요서류 반환.',
  })
  async checkVisa(@Session() sessionId: string, @Body() input: VisaCheckInput) {
    await this.requireAuth(sessionId);
    return await this.visaCheckService.checkVisaEligibility(input);
  }

  // ==========================================
  // 2. GET /visa/eligible-visas — 채용공고 조건 기반 전체 비자 평가
  // 2. GET /visa/eligible-visas — All visa evaluation for job conditions
  // ==========================================
  @Get('eligible-visas')
  @ApiOperation({
    summary:
      '채용공고 조건으로 가능한 비자 목록 / Eligible visas for job conditions',
    description:
      '채용공고의 업종/고용유형/급여/직종으로 31개 비자 유형 일괄 평가. 채용가능/조건부/불가 3그룹 분류.',
  })
  @ApiQuery({ name: 'ksicCode', required: true, description: 'KSIC 업종코드' })
  @ApiQuery({
    name: 'companySizeType',
    required: true,
    description: 'SME, MID, LARGE, STARTUP',
  })
  @ApiQuery({
    name: 'jobType',
    required: true,
    description: 'FULL_TIME, PART_TIME',
  })
  @ApiQuery({
    name: 'offeredSalary',
    required: true,
    description: '제시급여 (만원/월)',
  })
  @ApiQuery({
    name: 'employeeCountKorean',
    required: true,
    description: '한국인 직원 수',
  })
  @ApiQuery({
    name: 'employeeCountForeign',
    required: true,
    description: '외국인 직원 수',
  })
  @ApiQuery({
    name: 'targetOccupationCode',
    required: false,
    description: 'KSCO 직종코드',
  })
  async getEligibleVisas(
    @Session() sessionId: string,
    @Query('ksicCode') ksicCode: string,
    @Query('companySizeType') companySizeType: string,
    @Query('jobType') jobType: string,
    @Query('offeredSalary') offeredSalary: string,
    @Query('employeeCountKorean') employeeCountKorean: string,
    @Query('employeeCountForeign') employeeCountForeign: string,
    @Query('targetOccupationCode') targetOccupationCode?: string,
  ) {
    await this.requireAuth(sessionId);
    return await this.visaCheckService.getEligibleVisasForJob({
      ksicCode,
      companySizeType,
      jobType,
      offeredSalary: parseInt(offeredSalary, 10) || 0,
      employeeCountKorean: parseInt(employeeCountKorean, 10) || 0,
      employeeCountForeign: parseInt(employeeCountForeign, 10) || 0,
      targetOccupationCode,
    });
  }

  // ==========================================
  // 3. GET /visa/eligible-jobs/:visaCode — 비자로 허용되는 업종/직종
  // 3. GET /visa/eligible-jobs/:visaCode — Allowed industries/occupations
  // ==========================================
  @Get('eligible-jobs/:visaCode')
  @ApiOperation({
    summary: '비자별 허용 업종/직종 조건 / Allowed job conditions for visa',
    description:
      '특정 비자로 취업 가능한 업종(KSIC), 직종(KSCO), 금지업종, 근로시간 제한 반환.',
  })
  @ApiParam({ name: 'visaCode', description: '비자 코드 (예: E-9, H-2, F-4)' })
  async getEligibleJobs(
    @Session() sessionId: string,
    @Param('visaCode') visaCode: string,
  ) {
    await this.requireAuth(sessionId);
    return await this.visaCheckService.getEligibleJobConditions(visaCode);
  }

  // ==========================================
  // 4. GET /visa/transitions/:visaCode — 비자 전환 경로
  // 4. GET /visa/transitions/:visaCode — Visa transition paths
  // ==========================================
  @Get('transitions/:visaCode')
  @ApiOperation({
    summary: '비자 전환 경로 + 조건 + 필요서류 / Visa transition paths',
    description:
      '현재 비자에서 전환 가능한 비자 목록, 조건, 필요서류, 예상 소요기간 반환. 전환 체인(경로 시각화)도 포함.',
  })
  @ApiParam({
    name: 'visaCode',
    description: '현재 비자 코드 (예: D-2, E-9, H-2)',
  })
  async getTransitions(
    @Session() sessionId: string,
    @Param('visaCode') visaCode: string,
  ) {
    await this.requireAuth(sessionId);
    return await this.visaCheckService.getVisaTransitions(visaCode);
  }
}
