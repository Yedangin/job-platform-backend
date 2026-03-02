import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import {
  SessionAuthGuard,
  RolesGuard,
  CurrentSession,
  Roles,
  SessionData,
  AuthPrismaService,
} from 'libs/common/src';
import { JobApplicationService } from './job-application.service';
import { VisaScenarioService } from './visa-scenario.service';
import {
  ApplyToJobDto,
  GetMyApplicationsQueryDto,
  GetJobApplicationsQueryDto,
  UpdateApplicationStatusDto,
  CreateInterviewSlotsDto,
  SelectInterviewSlotDto,
  ProposeNewTimeDto,
  SendResultNotificationDto,
  ProposeInterviewDto,
  AcceptInterviewDto,
  CancelInterviewDto,
} from './dto';

@ApiTags('Applications')
@ApiBearerAuth()
@UseGuards(SessionAuthGuard, RolesGuard)
@Controller('applications')
export class JobApplicationController {
  constructor(
    private readonly jobApplicationService: JobApplicationService,
    private readonly visaScenarioService: VisaScenarioService,
    private readonly prisma: AuthPrismaService,
  ) {}

  // ========================================
  // Applicant (INDIVIDUAL) endpoints
  // ========================================

  @Post('jobs/:jobId/apply')
  @Roles('INDIVIDUAL')
  @ApiOperation({ summary: '공고 지원하기 / Apply to a job posting' })
  @ApiParam({ name: 'jobId', description: 'Job posting ID' })
  @ApiResponse({
    status: 201,
    description: 'Application submitted successfully',
  })
  @ApiResponse({ status: 400, description: 'Job posting is not active' })
  @ApiResponse({ status: 409, description: 'Already applied to this job' })
  async applyToJob(
    @CurrentSession() session: SessionData,
    @Param('jobId') jobId: string,
    @Body() dto: ApplyToJobDto,
  ) {
    return this.jobApplicationService.applyToJob(session.userId, jobId, dto);
  }

  @Get('my')
  @Roles('INDIVIDUAL')
  @ApiOperation({ summary: '내 지원 목록 / Get my applications (paginated)' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of my applications',
  })
  async getMyApplications(
    @CurrentSession() session: SessionData,
    @Query() query: GetMyApplicationsQueryDto,
  ) {
    return this.jobApplicationService.getMyApplications(session.userId, query);
  }

  @Post(':id/cancel')
  @Roles('INDIVIDUAL')
  @ApiOperation({ summary: '지원 취소 / Cancel my application' })
  @ApiParam({ name: 'id', description: 'Application ID' })
  @ApiResponse({
    status: 200,
    description: 'Application cancelled successfully',
  })
  @ApiResponse({ status: 404, description: 'Application not found' })
  async cancelApplication(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
  ) {
    return this.jobApplicationService.cancelApplication(session.userId, id);
  }

  @Post(':id/select-slot')
  @Roles('INDIVIDUAL')
  @ApiOperation({ summary: '면접 시간 선택 / Select an interview time slot' })
  @ApiParam({ name: 'id', description: 'Application ID' })
  @ApiResponse({
    status: 200,
    description: 'Interview slot selected successfully',
  })
  @ApiResponse({ status: 400, description: 'Slot is no longer available' })
  async selectInterviewSlot(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: SelectInterviewSlotDto,
  ) {
    return this.jobApplicationService.selectInterviewSlot(
      session.userId,
      id,
      dto,
    );
  }

  @Post(':id/propose-time')
  @Roles('INDIVIDUAL', 'CORPORATE', 'ADMIN')
  @ApiOperation({
    summary: '면접 시간 제안 / Propose an alternative interview time',
  })
  @ApiParam({ name: 'id', description: 'Application ID' })
  @ApiResponse({
    status: 200,
    description: 'Alternative time proposed successfully',
  })
  async proposeNewTime(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: ProposeNewTimeDto,
  ) {
    return this.jobApplicationService.proposeNewTime(session.userId, id, dto);
  }

  // ========================================
  // Employer (CORPORATE) endpoints
  // ========================================

  @Get('jobs/:jobId/applicants')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({
    summary: '공고별 지원자 목록 / List applicants for a job posting',
  })
  @ApiParam({ name: 'jobId', description: 'Job posting ID' })
  @ApiResponse({ status: 200, description: 'Paginated list of applicants' })
  async getJobApplicants(
    @CurrentSession() session: SessionData,
    @Param('jobId') jobId: string,
    @Query() query: GetJobApplicationsQueryDto,
  ) {
    return this.jobApplicationService.getJobApplications(
      session.userId,
      jobId,
      query,
    );
  }

  @Put(':id/status')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({
    summary: '지원 상태 변경 / Update application status (pass/fail/interview)',
  })
  @ApiParam({ name: 'id', description: 'Application ID' })
  @ApiResponse({ status: 200, description: 'Application status updated' })
  async updateApplicationStatus(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: UpdateApplicationStatusDto,
  ) {
    return this.jobApplicationService.updateApplicationStatus(
      session.userId,
      id,
      dto,
    );
  }

  @Post('jobs/:jobId/interview-slots')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({
    summary: '면접 시간 슬롯 생성 / Create interview time slots for a job',
  })
  @ApiParam({ name: 'jobId', description: 'Job posting ID' })
  @ApiResponse({
    status: 201,
    description: 'Interview slots created successfully',
  })
  async createInterviewSlots(
    @CurrentSession() session: SessionData,
    @Param('jobId') jobId: string,
    @Body() dto: CreateInterviewSlotsDto,
  ) {
    return this.jobApplicationService.createInterviewSlots(
      session.userId,
      jobId,
      dto,
    );
  }

  @Get('jobs/:jobId/interview-slots')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({
    summary: '공고별 면접 슬롯 조회 / View interview slots for a job posting',
  })
  @ApiParam({ name: 'jobId', description: 'Job posting ID' })
  @ApiResponse({ status: 200, description: 'List of interview slots' })
  async getInterviewSlotsForJob(
    @CurrentSession() session: SessionData,
    @Param('jobId') jobId: string,
  ) {
    return this.jobApplicationService.getInterviewSlots(session.userId, jobId);
  }

  @Post(':id/send-result')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({
    summary: '합격/불합격 통보 / Send pass/fail notification to applicant',
  })
  @ApiParam({ name: 'id', description: 'Application ID' })
  @ApiResponse({ status: 200, description: 'Result notification sent' })
  async sendResultNotification(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: SendResultNotificationDto,
  ) {
    return this.jobApplicationService.sendResultNotification(
      session.userId,
      id,
      dto,
    );
  }

  @Post(':id/send-interview-invite')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({
    summary: '면접 초대 이메일 발송 / Send interview invitation email',
  })
  @ApiParam({ name: 'id', description: 'Application ID' })
  @ApiResponse({ status: 200, description: 'Interview invitation email sent' })
  async sendInterviewInvite(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
  ) {
    return this.jobApplicationService.sendInterviewInvitation(
      session.userId,
      id,
    );
  }

  // ========================================
  // 면접 제안/수락 (Interview Proposal/Accept)
  // ========================================

  @Post(':id/propose-interview')
  @Roles('CORPORATE')
  @ApiOperation({
    summary:
      '면접 일정 제안 / Propose interview schedule (employer proposes times)',
  })
  @ApiParam({ name: 'id', description: 'Application ID' })
  @ApiResponse({
    status: 201,
    description: 'Interview proposed successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid status or max round-trips reached',
  })
  @ApiResponse({ status: 404, description: 'Application not found' })
  async proposeInterview(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: ProposeInterviewDto,
  ) {
    return this.jobApplicationService.proposeInterview(
      BigInt(id),
      dto,
      'EMPLOYER',
      BigInt(session.userId),
    );
  }

  @Post(':id/accept-interview')
  @Roles('INDIVIDUAL')
  @ApiOperation({
    summary:
      '면접 수락 / Accept a proposed interview time (applicant selects choice)',
  })
  @ApiParam({ name: 'id', description: 'Application ID' })
  @ApiResponse({
    status: 201,
    description: 'Interview accepted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid status or choice not available',
  })
  @ApiResponse({ status: 404, description: 'Application not found' })
  async acceptInterview(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: AcceptInterviewDto,
  ) {
    return this.jobApplicationService.acceptInterview(
      BigInt(id),
      dto,
      BigInt(session.userId),
    );
  }

  // ========================================
  // 면접 취소 (Cancel Interview — 양측 모두 가능)
  // ========================================

  @Post(':id/cancel-interview')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({
    summary: '면접 취소 (기업) / Cancel interview (employer side with reason)',
  })
  @ApiParam({ name: 'id', description: 'Application ID' })
  @ApiResponse({ status: 200, description: 'Interview cancelled' })
  @ApiResponse({ status: 400, description: 'Cannot cancel in current status' })
  async cancelInterviewByEmployer(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: CancelInterviewDto,
  ) {
    return this.jobApplicationService.cancelInterview(
      BigInt(id),
      dto,
      'EMPLOYER',
      session.userId,
    );
  }

  @Post(':id/cancel-interview-applicant')
  @Roles('INDIVIDUAL')
  @ApiOperation({
    summary:
      '면접 취소 (구직자) / Cancel interview (applicant side with reason)',
  })
  @ApiParam({ name: 'id', description: 'Application ID' })
  @ApiResponse({ status: 200, description: 'Interview cancelled' })
  @ApiResponse({ status: 400, description: 'Cannot cancel in current status' })
  async cancelInterviewByApplicant(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: CancelInterviewDto,
  ) {
    return this.jobApplicationService.cancelInterview(
      BigInt(id),
      dto,
      'APPLICANT',
      session.userId,
    );
  }

  // ========================================
  // 비자 가이드 + 체크리스트 (spec 08)
  // Visa guide + checklist endpoints
  // ========================================

  @Get(':id/visa-guide')
  @ApiOperation({
    summary: '비자 준비 가이드 조회 / Get visa preparation guide',
  })
  @ApiParam({ name: 'id', description: 'Application ID' })
  @ApiResponse({ status: 200, description: 'Visa guide retrieved' })
  async getVisaGuide(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
  ) {
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: BigInt(id) },
      include: {
        job: {
          select: {
            title: true,
            corporateId: true,
            allowedVisas: true,
          },
        },
        checklistItems: {
          orderBy: [{ category: 'asc' }, { itemOrder: 'asc' }],
        },
      },
    });
    if (!app) throw new NotFoundException('Application not found');

    // 접근 권한 확인: 구직자 본인 또는 해당 기업 / Access check
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: session.userId },
    });
    const isApplicant = app.applicantId === session.userId;
    const isCompany = corp && app.job.corporateId === corp.companyId;
    if (!isApplicant && !isCompany) {
      throw new ForbiddenException('Access denied');
    }

    // 구직자 프로필 조회 / Fetch applicant profile
    const profile = await this.prisma.individualProfile.findUnique({
      where: { authId: app.applicantId },
      select: {
        realName: true,
        visaType: true,
        visaExpiryDate: true,
        nationality: true,
      },
    });

    // 기업 프로필 조회 / Fetch company profile
    const company = await this.prisma.corporateProfile.findUnique({
      where: { companyId: app.job.corporateId },
      select: { brandName: true, companyNameOfficial: true },
    });

    // 체크리스트를 카테고리별로 분리 / Split checklist by category
    const companyItems = app.checklistItems.filter(
      (i) => i.category === 'COMPANY',
    );
    const applicantItems = app.checklistItems.filter(
      (i) => i.category === 'APPLICANT',
    );
    const totalItems = app.checklistItems.length;
    const checkedItems = app.checklistItems.filter((i) => i.isChecked).length;

    return {
      applicationId: app.id.toString(),
      status: app.status,
      scenario: app.visaGuideScenario,
      visaGuideGeneratedAt: app.visaGuideGeneratedAt,
      offeredSalary: app.offeredSalary,
      expectedStartDate: app.expectedStartDate,
      companyMessage: app.companyMessage,
      applicant: {
        name: profile?.realName,
        currentVisa: profile?.visaType,
        visaExpiryDate: profile?.visaExpiryDate,
        nationality: profile?.nationality,
      },
      company: {
        name: company?.brandName || company?.companyNameOfficial,
      },
      job: {
        title: app.job.title,
      },
      checklist: {
        company: companyItems.map((i) => ({
          id: i.id.toString(),
          text: i.itemText,
          order: i.itemOrder,
          isChecked: i.isChecked,
          checkedAt: i.checkedAt,
        })),
        applicant: applicantItems.map((i) => ({
          id: i.id.toString(),
          text: i.itemText,
          order: i.itemOrder,
          isChecked: i.isChecked,
          checkedAt: i.checkedAt,
        })),
        progress: {
          total: totalItems,
          checked: checkedItems,
          percentage:
            totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0,
        },
      },
    };
  }

  @Patch(':id/checklist/:itemId')
  @ApiOperation({
    summary: '체크리스트 항목 체크/해제 / Toggle checklist item',
  })
  @ApiParam({ name: 'id', description: 'Application ID' })
  @ApiParam({ name: 'itemId', description: 'Checklist item ID' })
  @ApiResponse({ status: 200, description: 'Checklist item updated' })
  async toggleChecklistItem(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Param('itemId') itemId: string,
  ) {
    // 지원 조회 / Fetch application
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: BigInt(id) },
      include: { job: { select: { corporateId: true } } },
    });
    if (!app) throw new NotFoundException('Application not found');

    // 체크리스트 아이템 조회 / Fetch checklist item
    const item = await this.prisma.visaChecklistItem.findUnique({
      where: { id: BigInt(itemId) },
    });
    if (!item || item.applicationId !== BigInt(id)) {
      throw new NotFoundException('Checklist item not found');
    }

    // 접근 권한: COMPANY 카테고리 → 기업만, APPLICANT → 구직자만 / Access check
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: session.userId },
    });
    const isApplicant = app.applicantId === session.userId;
    const isCompany = corp && app.job.corporateId === corp.companyId;

    if (item.category === 'COMPANY' && !isCompany) {
      throw new ForbiddenException(
        '기업만 기업 체크리스트를 수정할 수 있습니다 / Only company can check company items',
      );
    }
    if (item.category === 'APPLICANT' && !isApplicant) {
      throw new ForbiddenException(
        '구직자만 본인 체크리스트를 수정할 수 있습니다 / Only applicant can check applicant items',
      );
    }

    // 토글 / Toggle
    const updated = await this.prisma.visaChecklistItem.update({
      where: { id: BigInt(itemId) },
      data: {
        isChecked: !item.isChecked,
        checkedAt: !item.isChecked ? new Date() : null,
        checkedBy: !item.isChecked ? session.userId : null,
      },
    });

    return {
      id: updated.id.toString(),
      isChecked: updated.isChecked,
      checkedAt: updated.checkedAt,
    };
  }
}
