import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';
import { Session } from 'libs/common/src';
import { RedisService, SessionData } from 'libs/common/src';
import { DiagnosisEngineService } from './diagnosis-engine.service';

/**
 * 매트릭스 점수 수정 DTO / Matrix score update DTO
 */
class UpdateMatrixScoreDto {
  @IsString()
  @IsIn(['age', 'nationality', 'fund', 'education', 'priority'])
  dimension: string;

  @IsString()
  value: string;

  @IsNumber()
  newScore: number;

  @IsString()
  changeReason: string;
}

/**
 * Admin 진단 매트릭스 관리 컨트롤러
 * Admin diagnosis matrix management controller
 */
@ApiTags('Admin Diagnosis')
@Controller('admin/diagnosis')
export class AdminDiagnosisController {
  constructor(
    private readonly diagnosisEngine: DiagnosisEngineService,
    private readonly redisService: RedisService,
  ) {}

  /** 관리자 인증 / Admin authentication */
  private async requireAdmin(sessionId: string): Promise<string> {
    if (!sessionId) throw new UnauthorizedException('세션 없음 / No session');
    const sd = await this.redisService.get(`session:${sessionId}`);
    if (!sd) throw new UnauthorizedException('잘못된 세션 / Invalid session');
    const session: SessionData = JSON.parse(sd);
    if (session.role !== 'ADMIN')
      throw new UnauthorizedException('관리자 권한 필요 / Admin required');
    return session.userId;
  }

  // ============================================================
  // GET /admin/diagnosis/matrix — 매트릭스 전체 조회
  // ============================================================

  @Get('matrix')
  @ApiOperation({
    summary: '진단 매트릭스 전체 조회 / Get full diagnosis matrix',
  })
  async getMatrix(@Session() sessionId: string) {
    await this.requireAdmin(sessionId);
    return this.diagnosisEngine.getMatrix();
  }

  // ============================================================
  // PATCH /admin/diagnosis/matrix/:pathwayId — 매트릭스 점수 수정
  // ============================================================

  @Patch('matrix/:pathwayId')
  @ApiOperation({
    summary: '매트릭스 점수 수정 / Update matrix score for a pathway',
  })
  @ApiParam({ name: 'pathwayId', example: 'PW-003' })
  async updateMatrixScore(
    @Session() sessionId: string,
    @Param('pathwayId') pathwayId: string,
    @Body() dto: UpdateMatrixScoreDto,
  ) {
    const adminId = await this.requireAdmin(sessionId);
    try {
      return await this.diagnosisEngine.updateMatrixScore(
        pathwayId,
        dto.dimension,
        dto.value,
        dto.newScore,
        adminId,
        dto.changeReason,
      );
    } catch (err) {
      throw new BadRequestException((err as Error).message);
    }
  }

  // ============================================================
  // GET /admin/diagnosis/analytics — 진단 분석 통계
  // ============================================================

  @Get('analytics')
  @ApiOperation({ summary: '진단 분석 통계 / Diagnosis analytics' })
  @ApiQuery({
    name: 'from',
    required: false,
    description: '시작 날짜 / Start date (ISO)',
    example: '2026-01-01',
  })
  @ApiQuery({
    name: 'to',
    required: false,
    description: '종료 날짜 / End date (ISO)',
    example: '2026-12-31',
  })
  @ApiQuery({
    name: 'groupBy',
    required: false,
    description: '그룹 기준 / Group by',
    enum: ['pathway', 'nationality', 'age'],
  })
  async getAnalytics(
    @Session() sessionId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('groupBy') groupBy?: string,
  ) {
    await this.requireAdmin(sessionId);

    const fromDate = from
      ? new Date(from)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const toDate = to ? new Date(to) : new Date();
    const group = groupBy ?? 'pathway';

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      throw new BadRequestException('잘못된 날짜 형식 / Invalid date format');
    }

    return await this.diagnosisEngine.getAnalytics(fromDate, toDate, group);
  }
}
