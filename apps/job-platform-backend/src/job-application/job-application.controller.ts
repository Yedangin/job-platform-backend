import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { Public } from 'libs/common/src/common/decorator/public.decorator';
import { Session } from 'libs/common/src/common/decorator/session.decorator';
import { RedisService } from 'libs/common/src';
import { JobApplicationService } from './job-application.service';

interface SessionData {
  userId: string;
  role: string;
}

@Controller()
export class JobApplicationController {
  constructor(
    private readonly jobApplicationService: JobApplicationService,
    private readonly redisService: RedisService,
  ) {}

  private async requireAuth(sessionId: string): Promise<SessionData> {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    const sd = await this.redisService.get(`session:${sessionId}`);
    if (!sd) throw new UnauthorizedException('Invalid session');
    return JSON.parse(sd);
  }

  private async requireIndividual(sessionId: string): Promise<string> {
    const session = await this.requireAuth(sessionId);
    if (session.role !== 'INDIVIDUAL' && session.role !== 'ADMIN') {
      throw new UnauthorizedException('Individual access required');
    }
    return session.userId;
  }

  private async requireCorporate(sessionId: string): Promise<string> {
    const session = await this.requireAuth(sessionId);
    if (session.role !== 'CORPORATE' && session.role !== 'ADMIN') {
      throw new UnauthorizedException('Corporate access required');
    }
    return session.userId;
  }

  // ========================================
  // Applications
  // ========================================
  @Post('applications/apply')
  async applyToJob(
    @Session() sessionId: string,
    @Body() body: { jobId: string; applicationMethod?: string; coverLetter?: string },
  ) {
    const userId = await this.requireIndividual(sessionId);
    return this.jobApplicationService.applyToJob(userId, body);
  }

  @Get('applications/my')
  async getMyApplications(
    @Session() sessionId: string,
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = await this.requireIndividual(sessionId);
    return this.jobApplicationService.getMyApplications(userId, {
      status,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get('applications/job/:jobId')
  async getJobApplications(
    @Session() sessionId: string,
    @Param('jobId') jobId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = await this.requireCorporate(sessionId);
    return this.jobApplicationService.getJobApplications(userId, jobId, {
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Put('applications/:id/status')
  async updateApplicationStatus(
    @Session() sessionId: string,
    @Param('id') id: string,
    @Body() body: {
      status: string;
      interviewDate?: string;
      interviewNote?: string;
      rejectionReason?: string;
    },
  ) {
    const userId = await this.requireCorporate(sessionId);
    return this.jobApplicationService.updateApplicationStatus(userId, id, body);
  }

  @Post('applications/:id/self-report')
  async selfReportApplication(
    @Session() sessionId: string,
    @Param('id') id: string,
  ) {
    const userId = await this.requireIndividual(sessionId);
    return this.jobApplicationService.selfReportApplication(userId, id);
  }

  // ========================================
  // Scraps
  // ========================================
  @Post('scraps/:jobId')
  async toggleScrap(
    @Session() sessionId: string,
    @Param('jobId') jobId: string,
  ) {
    const userId = await this.requireIndividual(sessionId);
    return this.jobApplicationService.toggleScrap(userId, jobId);
  }

  @Get('scraps/my')
  async getMyScraps(
    @Session() sessionId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = await this.requireIndividual(sessionId);
    return this.jobApplicationService.getMyScraps(userId, {
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get('scraps/check/:jobId')
  async checkScrap(
    @Session() sessionId: string,
    @Param('jobId') jobId: string,
  ) {
    const userId = await this.requireIndividual(sessionId);
    return this.jobApplicationService.checkScrap(userId, jobId);
  }
}
