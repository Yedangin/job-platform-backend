import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  SessionAuthGuard,
  RolesGuard,
  Roles,
  CurrentSession,
  SessionData,
} from 'libs/common/src';
import { LawAmendmentService } from './law-amendment.service';

/**
 * 법령 변경 관리 컨트롤러 -- 어드민 전용
 * Law amendment management controller -- admin only
 *
 * Guard + Decorator 패턴으로 어드민 인증 통일
 * Unified admin auth via Guard + Decorator pattern
 *
 * Base path: /admin/law-amendments
 */
@ApiTags('Law Amendment Management')
@Controller('admin/law-amendments')
@UseGuards(SessionAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPERADMIN')
export class LawAmendmentController {
  constructor(private readonly lawAmendmentService: LawAmendmentService) {}

  // ================================================
  // POST /admin/law-amendments -- 수동 등록
  // Create amendment (manual registration)
  // ================================================
  @Post()
  @ApiOperation({ summary: '법령 변경 수동 등록 / Create law amendment' })
  async create(
    @CurrentSession() session: SessionData,
    @Body()
    body: {
      title: string;
      source: string;
      sourceUrl?: string;
      effectiveDate: string;
      affectedVisaCodes: string[];
      changeSummary: Record<string, any>;
      changeDetails: Record<string, any>;
      items?: Array<{
        targetTable: string;
        targetId?: string;
        action: string;
        beforeData?: Record<string, any>;
        afterData: Record<string, any>;
      }>;
    },
  ) {
    // 세션에서 관리자 ID 추출 / Extract admin ID from session
    return await this.lawAmendmentService.create(session.userId, body);
  }

  // ================================================
  // GET /admin/law-amendments -- 목록
  // List amendments with optional status filter
  // ================================================
  @Get()
  @ApiOperation({ summary: '법령 변경 목록 / List law amendments' })
  async findAll(
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return await this.lawAmendmentService.findAll({
      status,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  // ================================================
  // GET /admin/law-amendments/:id -- 상세
  // Get amendment detail with items and diff
  // ================================================
  @Get(':id')
  @ApiOperation({ summary: '법령 변경 상세 / Get amendment detail' })
  async findOne(@Param('id') id: string) {
    return await this.lawAmendmentService.findOne(id);
  }

  // ================================================
  // PUT /admin/law-amendments/:id/approve -- 승인
  // Approve amendment with optional new effectiveDate
  // ================================================
  @Put(':id/approve')
  @ApiOperation({ summary: '법령 변경 승인 / Approve amendment' })
  async approve(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() body?: { effectiveDate?: string },
  ) {
    // 세션에서 관리자 ID 추출 / Extract admin ID from session
    return await this.lawAmendmentService.approve(
      session.userId,
      id,
      body?.effectiveDate,
    );
  }

  // ================================================
  // PUT /admin/law-amendments/:id/reject -- 반려
  // Reject amendment with reason
  // ================================================
  @Put(':id/reject')
  @ApiOperation({ summary: '법령 변경 반려 / Reject amendment' })
  async reject(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() body: { reason: string },
  ) {
    // 세션에서 관리자 ID 추출 / Extract admin ID from session
    return await this.lawAmendmentService.reject(
      session.userId,
      id,
      body.reason,
    );
  }

  // ================================================
  // POST /admin/law-amendments/:id/simulate -- 시뮬레이션
  // Simulate amendment -- preview what changes would be applied
  // ================================================
  @Post(':id/simulate')
  @ApiOperation({ summary: '법령 변경 시뮬레이션 / Simulate amendment' })
  async simulate(@Param('id') id: string) {
    return await this.lawAmendmentService.simulate(id);
  }

  // ================================================
  // POST /admin/law-amendments/:id/apply -- 즉시 적용 (긴급)
  // Apply amendment immediately (emergency)
  // ================================================
  @Post(':id/apply')
  @ApiOperation({
    summary: '법령 변경 즉시 적용 / Apply amendment immediately',
  })
  async apply(@CurrentSession() session: SessionData, @Param('id') id: string) {
    // 세션에서 관리자 ID 추출 / Extract admin ID from session
    return await this.lawAmendmentService.applyAmendment(session.userId, id);
  }

  // ================================================
  // GET /admin/law-amendments/:id/impact -- 영향 분석
  // Get impact analysis for an amendment
  // ================================================
  @Get(':id/impact')
  @ApiOperation({ summary: '영향 분석 / Impact analysis' })
  async getImpact(@Param('id') id: string) {
    return await this.lawAmendmentService.getImpactAnalysis(id);
  }

  // ================================================
  // POST /admin/law-amendments/:id/items -- 변경 항목 추가
  // Add change item to amendment
  // ================================================
  @Post(':id/items')
  @ApiOperation({ summary: '변경 항목 추가 / Add amendment item' })
  async addItem(
    @Param('id') id: string,
    @Body()
    body: {
      targetTable: string;
      targetId?: string;
      action: string;
      beforeData?: Record<string, any>;
      afterData: Record<string, any>;
    },
  ) {
    return await this.lawAmendmentService.createItem(id, body);
  }

  // ================================================
  // GET /admin/law-amendments/items/:itemId/diff -- 전/후 비교
  // Get before/after diff for an item
  // ================================================
  @Get('items/:itemId/diff')
  @ApiOperation({ summary: '변경 전후 비교 / Get item diff' })
  async getDiff(@Param('itemId') itemId: string) {
    return await this.lawAmendmentService.getDiff(itemId);
  }
}
