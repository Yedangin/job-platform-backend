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

interface SessionData {
  userId: string;
  role: string;
  email?: string;
}

@Controller('jobs')
export class JobPostingController {
  constructor(
    private readonly jobPostingService: JobPostingService,
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
  @Public()
  @Get('listing')
  async getJobListings(
    @Query('boardType') boardType?: string,
    @Query('tierType') tierType?: string,
    @Query('visa') visa?: string,
    @Query('keyword') keyword?: string,
    @Query('employmentSubType') employmentSubType?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
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
  // Create (POST /jobs/create)
  // ========================================
  @Post('create')
  async createJobPosting(
    @Session() sessionId: string,
    @Body() body: any,
  ) {
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
  async closeJobPosting(
    @Session() sessionId: string,
    @Param('id') id: string,
  ) {
    const userId = await this.requireCorporate(sessionId);
    return this.jobPostingService.closeJobPosting(userId, id);
  }
}
