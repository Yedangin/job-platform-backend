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
  CurrentSession,
  Public,
  Roles,
  RolesGuard,
  SessionAuthGuard,
  SessionData,
} from 'libs/common/src';
import { VisaPolicyService } from './visa-policy.service';
import { ScrapingService } from './scraping/scraping.service';
import {
  PolicyChangeQueryDto,
  PolicyEvidenceQueryDto,
  ReviewPolicyChangeDto,
  TriggerScrapingDto,
} from './dto/visa-policy.dto';

@ApiTags('Policy Monitoring')
@Controller('policy')
@UseGuards(SessionAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPERADMIN')
export class VisaPolicyController {
  constructor(
    private readonly visaPolicyService: VisaPolicyService,
    private readonly scrapingService: ScrapingService,
  ) {}

  @Public()
  @Roles()
  @Get('evidence/:visaCode')
  @ApiOperation({
    summary: 'Get approved policy evidence for an allowlisted visa code',
  })
  getApprovedEvidence(
    @Param('visaCode') visaCode: string,
    @Query() query: PolicyEvidenceQueryDto,
  ) {
    return this.visaPolicyService.getApprovedEvidence(visaCode, query.asOf);
  }

  // ==========================================
  // 정책 변경 관리
  // ==========================================

  @Get('changes')
  @ApiOperation({ summary: 'List policy changes' })
  getPolicyChanges(@Query() query: PolicyChangeQueryDto) {
    return this.visaPolicyService.getPolicyChanges(query);
  }

  @Get('changes/:id')
  @ApiOperation({ summary: 'Get policy change detail' })
  getPolicyChange(@Param('id') id: string) {
    return this.visaPolicyService.getPolicyChangeById(id);
  }

  @Put('changes/:id/review')
  @ApiOperation({ summary: 'Review a policy change' })
  async reviewPolicyChange(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() body: ReviewPolicyChangeDto,
  ) {
    return this.visaPolicyService.reviewPolicyChange(id, body, session.userId);
  }

  @Post('changes/:id/create-draft-rule')
  @ApiOperation({ summary: 'Create draft rule from policy change' })
  createDraftRule(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
  ) {
    return this.visaPolicyService.createDraftRuleFromChange(id, session.userId);
  }

  // ==========================================
  // 스크래핑 관리
  // ==========================================

  @Get('scraping/status')
  @ApiOperation({ summary: 'Get scraping status for all sites' })
  getScrapingStatus() {
    return this.scrapingService.getScrapingStatus();
  }

  @Post('scraping/trigger')
  @ApiOperation({ summary: 'Manually trigger scraping' })
  triggerScraping(@Body() body: TriggerScrapingDto) {
    return this.scrapingService.triggerScraping(body?.siteKey);
  }

  // ==========================================
  // 요약 통계
  // ==========================================

  @Get('summary')
  @ApiOperation({ summary: 'Get policy dashboard summary' })
  getSummary() {
    return this.visaPolicyService.getPolicySummary();
  }
}
