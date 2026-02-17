import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Public } from 'libs/common/src/common/decorator/public.decorator';
import { Session } from 'libs/common/src/common/decorator/session.decorator';
import { RedisService } from 'libs/common/src';
import { JobPostingService } from './job-posting.service';
import { JobEligibilityService } from './job-eligibility.service';

interface SessionData {
  userId: string;
  role: string;
  email?: string;
}

@Controller('jobs')
export class JobPostingController {
  constructor(
    private readonly jobPostingService: JobPostingService,
    private readonly jobEligibilityService: JobEligibilityService,
    private readonly redisService: RedisService,
  ) {}

  // ========================================
  // Auth helpers
  // ========================================
  private async requireAuth(sessionId: string): Promise<SessionData> {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    const sd = await this.redisService.get(`session:${sessionId}`);
    if (!sd) throw new UnauthorizedException('Invalid session');
    return JSON.parse(sd);
  }

  private async requireCorporate(sessionId: string): Promise<string> {
    const session = await this.requireAuth(sessionId);
    if (session.role !== 'CORPORATE' && session.role !== 'ADMIN') {
      throw new UnauthorizedException('Corporate access required');
    }
    return session.userId;
  }

  private async requireAdmin(sessionId: string): Promise<string> {
    const session = await this.requireAuth(sessionId);
    if (session.role !== 'ADMIN') {
      throw new UnauthorizedException('Admin access required');
    }
    return session.userId;
  }

  // ========================================
  // Public endpoints (specific routes FIRST)
  // ========================================
  /**
   * 공고 목록 조회 (공개 + 비자 필터 옵션)
   * Job listings (public + optional visa filter)
   *
   * visaFilter=true: 로그인 사용자의 비자 기반 적격성 필터링 (Goal B)
   * visaFilter=true: Filter by logged-in user's visa eligibility (Goal B)
   */
  @Public()
  @Get('listing')
  async getJobListings(
    @Session() sessionId: string,
    @Query('boardType') boardType?: string,
    @Query('tierType') tierType?: string,
    @Query('visa') visa?: string,
    @Query('keyword') keyword?: string,
    @Query('employmentSubType') employmentSubType?: string,
    @Query('visaFilter') visaFilter?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    // visaFilter=true이고 세션이 있으면 비자 기반 필터링
    // If visaFilter=true and session exists, apply visa-based filtering
    if (visaFilter === 'true' && sessionId) {
      try {
        return await this.jobEligibilityService.getVisaFilteredListings(
          sessionId,
          {
            boardType,
            keyword,
            employmentSubType,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 20,
          },
        );
      } catch {
        // 비자 인증이 없으면 기본 목록으로 fallback
        // If no visa verification, fallback to default listing
      }
    }

    return this.jobPostingService.getJobListings({
      boardType,
      tierType,
      visa,
      keyword,
      employmentSubType,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Public()
  @Get('visa-types')
  async getVisaTypes() {
    return this.jobPostingService.getVisaTypes();
  }

  // ========================================
  // Corporate endpoints (specific routes before :id)
  // ========================================
  @Get('my/list')
  async getMyJobPostings(
    @Session() sessionId: string,
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = await this.requireCorporate(sessionId);
    return this.jobPostingService.getMyJobPostings(userId, {
      status,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get('visa-suggest/for-company')
  async suggestVisas(@Session() sessionId: string) {
    const userId = await this.requireCorporate(sessionId);
    return this.jobPostingService.suggestVisas(userId);
  }

  // ========================================
  // Admin endpoints (specific routes before :id)
  // ========================================
  @Get('admin/all')
  async getAllJobPostings(
    @Session() sessionId: string,
    @Query('status') status?: string,
    @Query('boardType') boardType?: string,
    @Query('search') search?: string,
    @Query('corporateId') corporateId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    await this.requireAdmin(sessionId);
    return this.jobPostingService.getAllJobPostings({
      status,
      boardType,
      search,
      corporateId,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Post('admin/:id/suspend')
  async suspendJobPosting(
    @Session() sessionId: string,
    @Param('id') id: string,
    @Body() body: { reason: string },
  ) {
    const adminId = await this.requireAdmin(sessionId);
    return this.jobPostingService.suspendJobPosting(adminId, id, body.reason);
  }

  @Post('admin/:id/unsuspend')
  async unsuspendJobPosting(
    @Session() sessionId: string,
    @Param('id') id: string,
  ) {
    const adminId = await this.requireAdmin(sessionId);
    return this.jobPostingService.unsuspendJobPosting(adminId, id);
  }

  // ========================================
  // 비자 필터링 — 구직자 비자 기반 공고 목록 (Goal B)
  // Visa filtering — job listings filtered by seeker's visa (Goal B)
  // ========================================
  @Get('eligible')
  async getVisaFilteredListings(
    @Session() sessionId: string,
    @Query('boardType') boardType?: string,
    @Query('keyword') keyword?: string,
    @Query('employmentSubType') employmentSubType?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.jobEligibilityService.getVisaFilteredListings(sessionId, {
      boardType,
      keyword,
      employmentSubType,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  // ========================================
  // Create (POST /jobs/create)
  // ========================================
  @Post('create')
  async createJobPosting(@Session() sessionId: string, @Body() body: any) {
    const userId = await this.requireCorporate(sessionId);
    return this.jobPostingService.createJobPosting(userId, body);
  }

  // ========================================
  // Parametric routes LAST (to avoid matching specific routes)
  // ========================================
  @Public()
  @Get(':id')
  async getJobDetail(@Param('id') id: string, @Req() req: any) {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    return this.jobPostingService.getJobDetail(id, ip);
  }

  /**
   * 특정 공고에 대한 지원 가능 여부 상세 (Goal B)
   * Detailed eligibility check for a specific job posting (Goal B)
   */
  @Get(':id/eligibility')
  async checkJobEligibility(
    @Session() sessionId: string,
    @Param('id') id: string,
  ) {
    return this.jobEligibilityService.checkJobEligibility(sessionId, id);
  }

  @Put(':id')
  async updateJobPosting(
    @Session() sessionId: string,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    const userId = await this.requireCorporate(sessionId);
    return this.jobPostingService.updateJobPosting(userId, id, body);
  }

  @Post(':id/activate')
  async activateJobPosting(
    @Session() sessionId: string,
    @Param('id') id: string,
    @Body() body: { orderId?: string },
  ) {
    const userId = await this.requireCorporate(sessionId);
    return this.jobPostingService.activateJobPosting(userId, id, body?.orderId);
  }

  @Post(':id/close')
  async closeJobPosting(@Session() sessionId: string, @Param('id') id: string) {
    const userId = await this.requireCorporate(sessionId);
    return this.jobPostingService.closeJobPosting(userId, id);
  }
}
