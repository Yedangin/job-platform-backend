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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CurrentSession,
  Roles,
  RolesGuard,
  SessionAuthGuard,
  SessionData,
} from 'libs/common/src';
import {
  AssignVisaExpertCaseDto,
  CreateReleaseVisaRuleDto,
  CreateVisaPolicyReleaseDto,
  RollbackVisaPolicyDto,
  UpdateVisaPolicyReleaseDto,
  UpsertVisaPathwayDto,
  VerifyVisaExpertCredentialDto,
  VisaJourneyAuditQueryDto,
  VisaPolicyReasonDto,
} from './dto';
import { VisaExpertAdminService } from './visa-expert-admin.service';
import { VisaJourneyAdminService } from './visa-journey-admin.service';
import { VisaPolicyCommandService } from './visa-policy-command.service';
import { VisaPolicyDraftService } from './visa-policy-draft.service';

/** 관리자 정책 운영·감사 API / Admin policy operations and audit API */
@ApiTags('Visa Journey Admin / 비자 여정 관리')
@ApiBearerAuth()
@UseGuards(SessionAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPERADMIN')
@Controller('visa-journeys/admin')
export class VisaJourneyAdminController {
  constructor(
    private readonly adminService: VisaJourneyAdminService,
    private readonly commandService: VisaPolicyCommandService,
    private readonly expertService: VisaExpertAdminService,
    private readonly draftService: VisaPolicyDraftService,
  ) {}

  @Get('overview')
  @ApiOperation({
    summary: '정책·여정 운영 현황 / Policy and journey overview',
  })
  overview() {
    return this.adminService.overview();
  }

  @Get('audit/decision-logs')
  @ApiOperation({ summary: '판정 시점·버전 감사 로그 / Decision audit logs' })
  decisionLogs(@Query() query: VisaJourneyAuditQueryDto) {
    return this.adminService.decisionLogs(query);
  }

  @Get('audit/rule-changes')
  @ApiOperation({
    summary: '정책·규칙 변경 감사 로그 / Policy change audit logs',
  })
  ruleChanges(@Query() query: VisaJourneyAuditQueryDto) {
    return this.adminService.ruleChanges(query);
  }

  @Get('affected-journeys')
  @ApiOperation({
    summary: '재판정 대상 여정 / Journeys affected by policy changes',
  })
  affectedJourneys() {
    return this.adminService.affectedJourneys();
  }

  @Get('release-gates')
  @ApiOperation({ summary: '릴리스 배포 게이트 / Release gates' })
  releaseGates() {
    return this.adminService.releaseGates();
  }

  @Get('pathways')
  @ApiOperation({
    summary: '5단계 비자 경로 정의 / Five-stage pathway definitions',
  })
  pathways() {
    return this.adminService.pathways();
  }

  @Get('expert-cases')
  @ApiOperation({ summary: '행정사 상담·대행 요청 큐 / Expert request queue' })
  expertCases() {
    return this.expertService.listCases();
  }

  @Get('expert-credentials')
  @ApiOperation({
    summary: '행정사 자격 확인 원장 / Verified expert credentials',
  })
  expertCredentials() {
    return this.expertService.listCredentials();
  }

  @Post('expert-cases/:id/assign')
  @ApiOperation({ summary: '검증된 행정사 배정 / Assign a verified expert' })
  assignExpertCase(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: AssignVisaExpertCaseDto,
  ) {
    return this.expertService.assign(session.userId, id, dto);
  }

  @Post('releases')
  @ApiOperation({ summary: '정책 릴리스 초안 생성 / Create release draft' })
  createRelease(
    @CurrentSession() session: SessionData,
    @Body() dto: CreateVisaPolicyReleaseDto,
  ) {
    return this.draftService.createRelease(session.userId, dto);
  }

  @Put('releases/:id')
  @ApiOperation({ summary: '정책 릴리스 초안 수정 / Update release draft' })
  updateRelease(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: UpdateVisaPolicyReleaseDto,
  ) {
    return this.draftService.updateRelease(session.userId, id, dto);
  }

  @Post('releases/:id/pathways')
  @ApiOperation({
    summary: '5단계 경로 초안 생성 / Create five-stage pathway draft',
  })
  createPathway(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: UpsertVisaPathwayDto,
  ) {
    return this.draftService.createPathway(session.userId, id, dto);
  }

  @Put('pathways/:id')
  @ApiOperation({ summary: '5단계 경로 초안 수정 / Update pathway draft' })
  updatePathway(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: UpsertVisaPathwayDto,
  ) {
    return this.draftService.updatePathway(session.userId, id, dto);
  }

  @Post('releases/:id/rules')
  @ApiOperation({
    summary: '릴리스 판정 규칙 초안 생성 / Create release rule draft',
  })
  createRule(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: CreateReleaseVisaRuleDto,
  ) {
    return this.draftService.createRule(session.userId, id, dto);
  }

  @Post('releases/:id/submit-review')
  submitReview(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: VisaPolicyReasonDto,
  ) {
    return this.commandService.submitReview(session.userId, id, dto);
  }

  @Post('releases/:id/expert-review')
  expertReview(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: VisaPolicyReasonDto,
  ) {
    return this.commandService.expertReview(session.userId, id, dto);
  }

  @Post('releases/:id/schedule')
  schedule(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: VisaPolicyReasonDto,
  ) {
    return this.commandService.schedule(session.userId, id, dto);
  }

  @Post('releases/:id/activate')
  activate(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: VisaPolicyReasonDto,
  ) {
    return this.commandService.activate(session.userId, id, dto);
  }

  @Post('releases/rollback')
  rollback(
    @CurrentSession() session: SessionData,
    @Body() dto: RollbackVisaPolicyDto,
  ) {
    return this.commandService.rollback(session.userId, dto);
  }

  @Post('expert-credentials/verify')
  verifyCredential(
    @CurrentSession() session: SessionData,
    @Body() dto: VerifyVisaExpertCredentialDto,
  ) {
    return this.draftService.verifyCredential(session.userId, dto);
  }
}
