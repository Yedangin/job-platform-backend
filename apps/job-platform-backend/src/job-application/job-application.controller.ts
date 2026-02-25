import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
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
} from 'libs/common/src';
import { JobApplicationService } from './job-application.service';
import {
  ApplyToJobDto,
  GetMyApplicationsQueryDto,
  GetJobApplicationsQueryDto,
  UpdateApplicationStatusDto,
  CreateInterviewSlotsDto,
  SelectInterviewSlotDto,
  ProposeNewTimeDto,
  SendResultNotificationDto,
} from './dto';

@ApiTags('Applications')
@ApiBearerAuth()
@UseGuards(SessionAuthGuard, RolesGuard)
@Controller('applications')
export class JobApplicationController {
  constructor(
    private readonly jobApplicationService: JobApplicationService,
  ) {}

  // ========================================
  // Applicant (INDIVIDUAL) endpoints
  // ========================================

  @Post('jobs/:jobId/apply')
  @Roles('INDIVIDUAL')
  @ApiOperation({ summary: '공고 지원하기 / Apply to a job posting' })
  @ApiParam({ name: 'jobId', description: 'Job posting ID' })
  @ApiResponse({ status: 201, description: 'Application submitted successfully' })
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
  @ApiResponse({ status: 200, description: 'Paginated list of my applications' })
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
  @ApiResponse({ status: 200, description: 'Application cancelled successfully' })
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
  @ApiResponse({ status: 200, description: 'Interview slot selected successfully' })
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
  @ApiOperation({ summary: '면접 시간 제안 / Propose an alternative interview time' })
  @ApiParam({ name: 'id', description: 'Application ID' })
  @ApiResponse({ status: 200, description: 'Alternative time proposed successfully' })
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
  @ApiOperation({ summary: '공고별 지원자 목록 / List applicants for a job posting' })
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
  @ApiOperation({ summary: '지원 상태 변경 / Update application status (pass/fail/interview)' })
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
  @ApiOperation({ summary: '면접 시간 슬롯 생성 / Create interview time slots for a job' })
  @ApiParam({ name: 'jobId', description: 'Job posting ID' })
  @ApiResponse({ status: 201, description: 'Interview slots created successfully' })
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
  @ApiOperation({ summary: '공고별 면접 슬롯 조회 / View interview slots for a job posting' })
  @ApiParam({ name: 'jobId', description: 'Job posting ID' })
  @ApiResponse({ status: 200, description: 'List of interview slots' })
  async getInterviewSlotsForJob(
    @CurrentSession() session: SessionData,
    @Param('jobId') jobId: string,
  ) {
    return this.jobApplicationService.getInterviewSlots(
      session.userId,
      jobId,
    );
  }

  @Post(':id/send-result')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({ summary: '합격/불합격 통보 / Send pass/fail notification to applicant' })
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
  @ApiOperation({ summary: '면접 초대 이메일 발송 / Send interview invitation email' })
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
}
