import { Controller, Get, Query, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RedisService } from 'libs/common/src';
import { Session } from 'libs/common/src';
import { LoggingService } from './logging.service';

/**
 * 로그 조회 컨트롤러 — 어드민 전용
 * Log query controller — admin only
 *
 * GET /admin/logs/requests  — 요청 로그
 * GET /admin/logs/matching  — 매칭 로그
 * GET /admin/logs/errors    — 에러 로그
 * GET /admin/logs/changes   — 변경 로그
 */
@ApiTags('Logs')
@Controller('admin/logs')
export class LoggingController {
  constructor(
    private readonly loggingService: LoggingService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * 어드민 권한 확인 / Verify admin role
   */
  private async requireAdmin(sessionId: string): Promise<string> {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    const sd = await this.redisService.get(`session:${sessionId}`);
    if (!sd) throw new UnauthorizedException('Invalid session');
    const session = JSON.parse(sd);
    if (session.role !== 'ADMIN')
      throw new UnauthorizedException('Admin access required');
    return session.userId;
  }

  // ================================================
  // GET /admin/logs/requests — 요청 로그 조회
  // ================================================
  @Get('requests')
  async getRequestLogs(
    @Session() sessionId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('statusCode') statusCode?: string,
    @Query('path') path?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    await this.requireAdmin(sessionId);

    return this.loggingService.getRequestLogs({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      statusCode: statusCode ? parseInt(statusCode) : undefined,
      path,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 50,
    });
  }

  // ================================================
  // GET /admin/logs/matching — 매칭 로그 조회
  // ================================================
  @Get('matching')
  async getMatchingLogs(
    @Session() sessionId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('visaCode') visaCode?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    await this.requireAdmin(sessionId);

    return this.loggingService.getMatchingLogs({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      visaCode,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 50,
    });
  }

  // ================================================
  // GET /admin/logs/errors — 에러 로그 조회
  // ================================================
  @Get('errors')
  async getErrorLogs(
    @Session() sessionId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('errorType') errorType?: string,
    @Query('is500Only') is500Only?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    await this.requireAdmin(sessionId);

    return this.loggingService.getErrorLogs({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      errorType,
      is500Only: is500Only === 'true',
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 50,
    });
  }

  // ================================================
  // GET /admin/logs/changes — 변경 로그 조회
  // ================================================
  @Get('changes')
  async getChangeLogs(
    @Session() sessionId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('tableName') tableName?: string,
    @Query('adminId') adminId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    await this.requireAdmin(sessionId);

    return this.loggingService.getChangeLogs({
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      tableName,
      adminId,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 50,
    });
  }
}
