import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
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
  CreateVisaAssessmentDto,
  CreateVisaExpertCaseDto,
  CreateVisaJourneyDto,
  UpdateVisaJourneyItemDto,
} from './dto';
import { VisaJourneyAssessmentService } from './visa-journey-assessment.service';
import { VisaJourneyService } from './visa-journey.service';

/** 회원용 5단계 비자 여정 API / Member five-stage visa journey API */
@ApiTags('Visa Journeys / 비자 여정')
@ApiBearerAuth()
@UseGuards(SessionAuthGuard, RolesGuard)
@Roles('INDIVIDUAL', 'MEMBER', 'ADMIN', 'SUPERADMIN')
@Controller('visa-journeys')
export class VisaJourneyController {
  constructor(
    private readonly journeyService: VisaJourneyService,
    private readonly assessmentService: VisaJourneyAssessmentService,
  ) {}

  @Post()
  @ApiOperation({ summary: '비자 여정 생성 / Create a visa journey' })
  create(
    @CurrentSession() session: SessionData,
    @Body() dto: CreateVisaJourneyDto,
  ) {
    return this.journeyService.create(session.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: '내 비자 여정 목록 / List my visa journeys' })
  listMine(@CurrentSession() session: SessionData) {
    return this.journeyService.listMine(session.userId);
  }

  @Get(':journeyId')
  @ApiOperation({ summary: '내 비자 여정 상세 / Get my visa journey' })
  getMine(
    @CurrentSession() session: SessionData,
    @Param('journeyId') journeyId: string,
  ) {
    return this.journeyService.getMineById(session.userId, journeyId);
  }

  @Post(':journeyId/assessments')
  @ApiOperation({
    summary:
      '현재 정책 기준 판정 스냅숏 생성 / Create current-policy assessment',
  })
  async assess(
    @CurrentSession() session: SessionData,
    @Param('journeyId') journeyId: string,
    @Body() dto: CreateVisaAssessmentDto,
  ) {
    await this.assessmentService.assess(journeyId, session.userId, dto);
    return this.journeyService.getMineById(session.userId, journeyId);
  }

  @Patch(':journeyId/items/:itemId')
  @ApiOperation({
    summary: '조건·서류·수속 작업 상태 변경 / Update journey item status',
  })
  updateItem(
    @CurrentSession() session: SessionData,
    @Param('journeyId') journeyId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateVisaJourneyItemDto,
  ) {
    return this.journeyService.updateItem(
      session.userId,
      journeyId,
      itemId,
      dto,
    );
  }

  @Post(':journeyId/expert-cases')
  @ApiOperation({
    summary: '행정사 상담·검토·대행 연결 요청 / Request expert handoff',
  })
  createExpertCase(
    @CurrentSession() session: SessionData,
    @Param('journeyId') journeyId: string,
    @Body() dto: CreateVisaExpertCaseDto,
  ) {
    return this.journeyService.createExpertCase(session.userId, journeyId, dto);
  }
}
