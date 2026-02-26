import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import {
  Public,
  CurrentSession,
  Roles,
  SessionAuthGuard,
  RolesGuard,
  SessionData,
} from 'libs/common/src';
import { JobPostingService } from './job-posting.service';
import { JobEligibilityService } from './job-eligibility.service';
import { JobScrapService } from './job-scrap.service';
import {
  CreateJobPostingDto,
  UpdateJobPostingDto,
  ActivateJobPostingDto,
  SuspendJobPostingDto,
  GetJobListingsQueryDto,
  GetMyJobPostingsQueryDto,
  GetAdminJobPostingsQueryDto,
  GetEligibleListingsQueryDto,
} from './dto';

@ApiTags('Jobs')
@ApiBearerAuth()
@UseGuards(SessionAuthGuard, RolesGuard)
@Controller('jobs')
export class JobPostingController {
  constructor(
    private readonly jobPostingService: JobPostingService,
    private readonly jobEligibilityService: JobEligibilityService,
    private readonly jobScrapService: JobScrapService,
  ) {}

  // ========================================
  // Public endpoints (specific routes FIRST)
  // ========================================

  @Public()
  @Get('listing')
  @ApiOperation({
    summary: '공고 목록 조회 / Job listings (public + optional visa filter)',
  })
  @ApiResponse({ status: 200, description: 'Paginated job listings' })
  async getJobListings(
    @CurrentSession() session: SessionData | undefined,
    @Query() query: GetJobListingsQueryDto,
  ) {
    const page = query.page || 1;
    const limit = query.limit || 20;

    if (query.visaFilter === 'true' && session?.userId) {
      try {
        return await this.jobEligibilityService.getVisaFilteredListings(
          session.userId,
          {
            boardType: query.boardType,
            keyword: query.keyword,
            employmentSubType: query.employmentSubType,
            page,
            limit,
          },
        );
      } catch {
        // 비자 인증이 없으면 기본 목록으로 fallback
      }
    }

    return this.jobPostingService.getJobListings({
      boardType: query.boardType,
      tierType: query.tierType,
      visa: query.visa,
      keyword: query.keyword,
      employmentSubType: query.employmentSubType,
      page,
      limit,
    });
  }

  @Public()
  @Get('visa-types')
  @ApiOperation({ summary: '비자 유형 목록 / Available visa types' })
  @ApiResponse({ status: 200, description: 'List of active visa types' })
  async getVisaTypes() {
    return this.jobPostingService.getVisaTypes();
  }

  // ========================================
  // Corporate endpoints (specific routes before :id)
  // ========================================

  @Get('my/list')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({ summary: '내 공고 목록 / My job postings' })
  @ApiResponse({ status: 200, description: 'Paginated corporate job postings' })
  async getMyJobPostings(
    @CurrentSession() session: SessionData,
    @Query() query: GetMyJobPostingsQueryDto,
  ) {
    return this.jobPostingService.getMyJobPostings(session.userId, {
      status: query.status,
      page: query.page || 1,
      limit: query.limit || 20,
    });
  }

  @Get('my/scraps')
  @Roles('INDIVIDUAL', 'ADMIN')
  @ApiOperation({ summary: '스크랩 목록 / My scrapped jobs' })
  @ApiResponse({ status: 200, description: 'Paginated scrapped jobs' })
  async getMyScraps(
    @CurrentSession() session: SessionData,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.jobScrapService.getMyScraps(
      session.userId,
      page || 1,
      limit || 20,
    );
  }

  @Get('visa-suggest/for-company')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({ summary: '비자 추천 / Visa suggestions for company' })
  @ApiResponse({
    status: 200,
    description: 'Visa suggestions with company info',
  })
  async suggestVisas(@CurrentSession() session: SessionData) {
    return this.jobPostingService.suggestVisas(session.userId);
  }

  // ========================================
  // Visa-filtered listings (authenticated)
  // ========================================

  @Get('eligible')
  @ApiOperation({ summary: '비자 필터링 공고 / Visa-filtered listings' })
  @ApiResponse({ status: 200, description: 'Visa-eligible job listings' })
  async getVisaFilteredListings(
    @CurrentSession() session: SessionData,
    @Query() query: GetEligibleListingsQueryDto,
  ) {
    return this.jobEligibilityService.getVisaFilteredListings(session.userId, {
      boardType: query.boardType,
      keyword: query.keyword,
      employmentSubType: query.employmentSubType,
      page: query.page || 1,
      limit: query.limit || 20,
    });
  }

  // ========================================
  // Admin endpoints
  // ========================================

  @Get('admin/all')
  @Roles('ADMIN')
  @ApiOperation({ summary: '전체 공고 관리 / Admin: all postings' })
  @ApiResponse({ status: 200, description: 'Paginated admin job postings' })
  async getAllJobPostings(@Query() query: GetAdminJobPostingsQueryDto) {
    return this.jobPostingService.getAllJobPostings({
      status: query.status,
      boardType: query.boardType,
      search: query.search,
      corporateId: query.corporateId,
      page: query.page || 1,
      limit: query.limit || 20,
    });
  }

  @Post('admin/:id/suspend')
  @Roles('ADMIN')
  @ApiOperation({ summary: '공고 중지 / Admin: suspend posting' })
  @ApiParam({ name: 'id', description: 'Job posting ID' })
  @ApiResponse({ status: 200, description: 'Posting suspended' })
  async suspendJobPosting(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: SuspendJobPostingDto,
  ) {
    return this.jobPostingService.suspendJobPosting(
      session.userId,
      id,
      dto.reason,
    );
  }

  @Post('admin/:id/unsuspend')
  @Roles('ADMIN')
  @ApiOperation({ summary: '공고 중지 해제 / Admin: unsuspend posting' })
  @ApiParam({ name: 'id', description: 'Job posting ID' })
  @ApiResponse({ status: 200, description: 'Posting unsuspended' })
  async unsuspendJobPosting(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
  ) {
    return this.jobPostingService.unsuspendJobPosting(session.userId, id);
  }

  // ========================================
  // Create
  // ========================================

  @Post('create')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({ summary: '공고 생성 / Create job posting' })
  @ApiResponse({ status: 201, description: 'Job posting created (DRAFT)' })
  async createJobPosting(
    @CurrentSession() session: SessionData,
    @Body() dto: CreateJobPostingDto,
  ) {
    return this.jobPostingService.createJobPosting(session.userId, dto);
  }

  // ========================================
  // Parametric routes LAST
  // ========================================

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: '공고 상세 (번역 지원) / Job detail with translation',
  })
  @ApiParam({ name: 'id', description: 'Job posting ID' })
  @ApiQuery({
    name: 'lang',
    required: false,
    description:
      'Translation language code (e.g., en, vi, zh). Defaults to ko (Korean original).',
  })
  @ApiResponse({
    status: 200,
    description: 'Job posting detail (with translation if lang specified)',
  })
  async getJobDetail(
    @Param('id') id: string,
    @Req() req: any,
    @Query('lang') lang?: string,
  ) {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    return this.jobPostingService.getJobDetail(id, ip, lang);
  }

  @Get(':id/eligibility')
  @ApiOperation({ summary: '적격성 확인 / Eligibility check' })
  @ApiParam({ name: 'id', description: 'Job posting ID' })
  @ApiResponse({ status: 200, description: 'Eligibility result' })
  async checkJobEligibility(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
  ) {
    return this.jobEligibilityService.checkJobEligibility(session.userId, id);
  }

  @Put(':id')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({ summary: '공고 수정 / Update job posting' })
  @ApiParam({ name: 'id', description: 'Job posting ID' })
  @ApiResponse({ status: 200, description: 'Job posting updated' })
  async updateJobPosting(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: UpdateJobPostingDto,
  ) {
    return this.jobPostingService.updateJobPosting(session.userId, id, dto);
  }

  @Delete(':id')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({ summary: '공고 삭제 / Delete job posting' })
  @ApiParam({ name: 'id', description: 'Job posting ID' })
  @ApiResponse({ status: 200, description: 'Job posting deleted or closed' })
  async deleteJobPosting(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
  ) {
    return this.jobPostingService.deleteJobPosting(session.userId, id);
  }

  @Post(':id/activate')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({ summary: '공고 활성화 / Activate job posting' })
  @ApiParam({ name: 'id', description: 'Job posting ID' })
  @ApiResponse({ status: 200, description: 'Job posting activated' })
  async activateJobPosting(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
    @Body() dto: ActivateJobPostingDto,
  ) {
    return this.jobPostingService.activateJobPosting(
      session.userId,
      id,
      dto.orderId,
    );
  }

  @Post(':id/close')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({ summary: '공고 마감 / Close job posting' })
  @ApiParam({ name: 'id', description: 'Job posting ID' })
  @ApiResponse({ status: 200, description: 'Job posting closed' })
  async closeJobPosting(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
  ) {
    return this.jobPostingService.closeJobPosting(session.userId, id);
  }

  @Post(':id/bump')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({ summary: '공고 끌어올리기 / Bump job posting' })
  @ApiParam({ name: 'id', description: 'Job posting ID' })
  @ApiResponse({ status: 200, description: 'Job posting bumped' })
  async bumpJobPosting(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
  ) {
    return this.jobPostingService.bumpJobPosting(session.userId, id);
  }

  @Post(':id/toggle-urgent')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({ summary: '긴급 공고 토글 / Toggle urgent' })
  @ApiParam({ name: 'id', description: 'Job posting ID' })
  @ApiResponse({ status: 200, description: 'Urgent flag toggled' })
  async toggleUrgent(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
  ) {
    return this.jobPostingService.toggleUrgent(session.userId, id);
  }

  @Post(':id/scrap')
  @ApiOperation({ summary: '공고 스크랩 / Scrap job' })
  @ApiParam({ name: 'id', description: 'Job posting ID' })
  @ApiResponse({ status: 200, description: 'Job scrapped' })
  async scrapJob(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
  ) {
    return this.jobScrapService.scrapJob(session.userId, id);
  }

  @Delete(':id/scrap')
  @ApiOperation({ summary: '스크랩 취소 / Unscrap job' })
  @ApiParam({ name: 'id', description: 'Job posting ID' })
  @ApiResponse({ status: 200, description: 'Scrap removed' })
  async unscrapJob(
    @CurrentSession() session: SessionData,
    @Param('id') id: string,
  ) {
    return this.jobScrapService.unscrapJob(session.userId, id);
  }
}
