import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Session, RedisService, SessionData } from 'libs/common/src';
import { LawAmendmentService } from './law-amendment.service';

/**
 * 법령 변경 관리 컨트롤러 — 어드민 전용
 * Law amendment management controller — admin only
 *
 * Base path: /admin/law-amendments
 */
@ApiTags('Law Amendment Management')
@Controller('admin/law-amendments')
export class LawAmendmentController {
  constructor(
    private readonly lawAmendmentService: LawAmendmentService,
    private readonly redisService: RedisService,
  ) {}

  /** 어드민 권한 확인 / Verify admin role */
  private async requireAdmin(sessionId: string): Promise<string> {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    const sd = await this.redisService.get(`session:${sessionId}`);
    if (!sd) throw new UnauthorizedException('Invalid session');
    const session: SessionData = JSON.parse(sd);
    if (session.role !== 'ADMIN')
      throw new UnauthorizedException('Admin access required');
    return session.userId;
  }

  // ================================================
  // POST /admin/law-amendments — 수동 등록
  // Create amendment (manual registration)
  // ================================================
  @Post()
  @ApiOperation({ summary: '법령 변경 수동 등록 / Create law amendment' })
  async create(
    @Session() sessionId: string,
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
    const adminId = await this.requireAdmin(sessionId);
    return await this.lawAmendmentService.create(adminId, body);
  }

  // ================================================
  // GET /admin/law-amendments — 목록
  // List amendments with optional status filter
  // ================================================
  @Get()
  @ApiOperation({ summary: '법령 변경 목록 / List law amendments' })
  async findAll(
    @Session() sessionId: string,
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    await this.requireAdmin(sessionId);
    return await this.lawAmendmentService.findAll({
      status,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  // ================================================
  // GET /admin/law-amendments/:id — 상세
  // Get amendment detail with items and diff
  // ================================================
  @Get(':id')
  @ApiOperation({ summary: '법령 변경 상세 / Get amendment detail' })
  async findOne(@Session() sessionId: string, @Param('id') id: string) {
    await this.requireAdmin(sessionId);
    return await this.lawAmendmentService.findOne(id);
  }

  // ================================================
  // PUT /admin/law-amendments/:id/approve — 승인
  // Approve amendment with optional new effectiveDate
  // ================================================
  @Put(':id/approve')
  @ApiOperation({ summary: '법령 변경 승인 / Approve amendment' })
  async approve(
    @Session() sessionId: string,
    @Param('id') id: string,
    @Body() body?: { effectiveDate?: string },
  ) {
    const adminId = await this.requireAdmin(sessionId);
    return await this.lawAmendmentService.approve(
      adminId,
      id,
      body?.effectiveDate,
    );
  }

  // ================================================
  // PUT /admin/law-amendments/:id/reject — 반려
  // Reject amendment with reason
  // ================================================
  @Put(':id/reject')
  @ApiOperation({ summary: '법령 변경 반려 / Reject amendment' })
  async reject(
    @Session() sessionId: string,
    @Param('id') id: string,
    @Body() body: { reason: string },
  ) {
    const adminId = await this.requireAdmin(sessionId);
    return await this.lawAmendmentService.reject(adminId, id, body.reason);
  }

  // ================================================
  // POST /admin/law-amendments/:id/simulate — 시뮬레이션
  // Simulate amendment — preview what changes would be applied
  // ================================================
  @Post(':id/simulate')
  @ApiOperation({ summary: '법령 변경 시뮬레이션 / Simulate amendment' })
  async simulate(@Session() sessionId: string, @Param('id') id: string) {
    await this.requireAdmin(sessionId);
    return await this.lawAmendmentService.simulate(id);
  }

  // ================================================
  // POST /admin/law-amendments/:id/apply — 즉시 적용 (긴급)
  // Apply amendment immediately (emergency)
  // ================================================
  @Post(':id/apply')
  @ApiOperation({
    summary: '법령 변경 즉시 적용 / Apply amendment immediately',
  })
  async apply(@Session() sessionId: string, @Param('id') id: string) {
    const adminId = await this.requireAdmin(sessionId);
    return await this.lawAmendmentService.applyAmendment(adminId, id);
  }

  // ================================================
  // GET /admin/law-amendments/:id/impact — 영향 분석
  // Get impact analysis for an amendment
  // ================================================
  @Get(':id/impact')
  @ApiOperation({ summary: '영향 분석 / Impact analysis' })
  async getImpact(@Session() sessionId: string, @Param('id') id: string) {
    await this.requireAdmin(sessionId);
    return await this.lawAmendmentService.getImpactAnalysis(id);
  }

  // ================================================
  // POST /admin/law-amendments/:id/items — 변경 항목 추가
  // Add change item to amendment
  // ================================================
  @Post(':id/items')
  @ApiOperation({ summary: '변경 항목 추가 / Add amendment item' })
  async addItem(
    @Session() sessionId: string,
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
    await this.requireAdmin(sessionId);
    return await this.lawAmendmentService.createItem(id, body);
  }

  // ================================================
  // GET /admin/law-amendments/items/:itemId/diff — 전/후 비교
  // Get before/after diff for an item
  // ================================================
  @Get('items/:itemId/diff')
  @ApiOperation({ summary: '변경 전후 비교 / Get item diff' })
  async getDiff(@Session() sessionId: string, @Param('itemId') itemId: string) {
    await this.requireAdmin(sessionId);
    return await this.lawAmendmentService.getDiff(itemId);
  }
}
