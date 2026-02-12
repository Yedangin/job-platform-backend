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
import { VisaPolicyService } from './visa-policy.service';
import { ScrapingService } from './scraping/scraping.service';

@ApiTags('Policy Monitoring')
@Controller('policy')
export class VisaPolicyController {
  constructor(
    private readonly visaPolicyService: VisaPolicyService,
    private readonly scrapingService: ScrapingService,
    private readonly redisService: RedisService,
  ) {}

  private async requireAdmin(sessionId: string): Promise<string> {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    const sd = await this.redisService.get(`session:${sessionId}`);
    if (!sd) throw new UnauthorizedException('Invalid session');
    const session: SessionData = JSON.parse(sd);
    if (session.role !== 'ADMIN')
      throw new UnauthorizedException('Admin access required');
    return session.userId;
  }

  // ==========================================
  // 정책 변경 관리
  // ==========================================

  @Get('changes')
  @ApiOperation({ summary: 'List policy changes' })
  async getPolicyChanges(
    @Session() sessionId: string,
    @Query('sourceSite') sourceSite?: string,
    @Query('reviewStatus') reviewStatus?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    await this.requireAdmin(sessionId);
    return await this.visaPolicyService.getPolicyChanges({
      sourceSite,
      reviewStatus,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get('changes/:id')
  @ApiOperation({ summary: 'Get policy change detail' })
  async getPolicyChange(
    @Session() sessionId: string,
    @Param('id') id: string,
  ) {
    await this.requireAdmin(sessionId);
    return await this.visaPolicyService.getPolicyChangeById(id);
  }

  @Put('changes/:id/review')
  @ApiOperation({ summary: 'Review a policy change' })
  async reviewPolicyChange(
    @Session() sessionId: string,
    @Param('id') id: string,
    @Body()
    body: {
      reviewStatus: string;
      reviewNote?: string;
      affectedVisaTypes?: string;
    },
  ) {
    const adminId = await this.requireAdmin(sessionId);
    return await this.visaPolicyService.reviewPolicyChange(
      id,
      body,
      adminId,
    );
  }

  @Post('changes/:id/create-draft-rule')
  @ApiOperation({ summary: 'Create draft rule from policy change' })
  async createDraftRule(
    @Session() sessionId: string,
    @Param('id') id: string,
  ) {
    const adminId = await this.requireAdmin(sessionId);
    return await this.visaPolicyService.createDraftRuleFromChange(id, adminId);
  }

  // ==========================================
  // 스크래핑 관리
  // ==========================================

  @Get('scraping/status')
  @ApiOperation({ summary: 'Get scraping status for all sites' })
  async getScrapingStatus(@Session() sessionId: string) {
    await this.requireAdmin(sessionId);
    return await this.scrapingService.getScrapingStatus();
  }

  @Post('scraping/trigger')
  @ApiOperation({ summary: 'Manually trigger scraping' })
  async triggerScraping(
    @Session() sessionId: string,
    @Body() body?: { siteKey?: string },
  ) {
    await this.requireAdmin(sessionId);
    return await this.scrapingService.triggerScraping(body?.siteKey);
  }

  // ==========================================
  // 요약 통계
  // ==========================================

  @Get('summary')
  @ApiOperation({ summary: 'Get policy dashboard summary' })
  async getSummary(@Session() sessionId: string) {
    await this.requireAdmin(sessionId);
    return await this.visaPolicyService.getPolicySummary();
  }
}
