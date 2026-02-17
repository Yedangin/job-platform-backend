import { Injectable, Logger } from '@nestjs/common';
import { LogPrismaService } from 'libs/common/src';

/**
 * 로깅 서비스 — MongoDB에 4종 로그 저장
 * Logging service — stores 4 types of logs in MongoDB
 */
@Injectable()
export class LoggingService {
  private readonly logger = new Logger(LoggingService.name);

  constructor(private readonly logPrisma: LogPrismaService) {}

  // ================================================
  // 요청 로그 / Request log
  // ================================================
  async logRequest(data: {
    method: string;
    path: string;
    statusCode: number;
    userId?: string;
    responseTime: number;
    ip?: string;
    userAgent?: string;
  }): Promise<void> {
    try {
      await this.logPrisma.requestLog.create({ data });
    } catch (e) {
      this.logger.warn(`Request log write failed: ${e.message}`);
    }
  }

  // ================================================
  // 매칭 로그 / Matching log
  // ================================================
  async logMatching(data: {
    userId?: string;
    inputData: string;
    eligibleCount: number;
    eligibleVisas?: string;
    blockedCount: number;
    durationMs: number;
  }): Promise<void> {
    try {
      await this.logPrisma.matchingLog.create({ data });
    } catch (e) {
      this.logger.warn(`Matching log write failed: ${e.message}`);
    }
  }

  // ================================================
  // 에러 로그 / Error log
  // ================================================
  async logError(data: {
    errorType: string;
    message: string;
    stack?: string;
    userId?: string;
    path?: string;
    method?: string;
    statusCode: number;
  }): Promise<void> {
    try {
      await this.logPrisma.errorLog.create({
        data: {
          ...data,
          is500: data.statusCode >= 500,
        },
      });
    } catch (e) {
      this.logger.warn(`Error log write failed: ${e.message}`);
    }
  }

  // ================================================
  // 변경 로그 / Change log (비자 규칙 CUD)
  // ================================================
  async logChange(data: {
    adminId: string;
    tableName: string;
    recordId: string;
    action: 'CREATE' | 'UPDATE' | 'DELETE';
    before?: string;
    after?: string;
  }): Promise<void> {
    try {
      await this.logPrisma.changeLog.create({ data });
    } catch (e) {
      this.logger.warn(`Change log write failed: ${e.message}`);
    }
  }

  // ================================================
  // 로그 조회 — 어드민 전용 / Log queries — admin only
  // ================================================

  /** 요청 로그 조회 / Query request logs */
  async getRequestLogs(filter: {
    startDate?: Date;
    endDate?: Date;
    statusCode?: number;
    path?: string;
    page?: number;
    limit?: number;
  }) {
    const { startDate, endDate, statusCode, path, page = 1, limit = 50 } = filter;
    const where: any = {};

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }
    if (statusCode) where.statusCode = statusCode;
    if (path) where.path = { contains: path };

    const [items, total] = await Promise.all([
      this.logPrisma.requestLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.logPrisma.requestLog.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  /** 매칭 로그 조회 / Query matching logs */
  async getMatchingLogs(filter: {
    startDate?: Date;
    endDate?: Date;
    visaCode?: string;
    page?: number;
    limit?: number;
  }) {
    const { startDate, endDate, visaCode, page = 1, limit = 50 } = filter;
    const where: any = {};

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }
    if (visaCode) where.eligibleVisas = { contains: visaCode };

    const [items, total] = await Promise.all([
      this.logPrisma.matchingLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.logPrisma.matchingLog.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  /** 에러 로그 조회 / Query error logs */
  async getErrorLogs(filter: {
    startDate?: Date;
    endDate?: Date;
    errorType?: string;
    is500Only?: boolean;
    page?: number;
    limit?: number;
  }) {
    const { startDate, endDate, errorType, is500Only, page = 1, limit = 50 } = filter;
    const where: any = {};

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }
    if (errorType) where.errorType = { contains: errorType };
    if (is500Only) where.is500 = true;

    const [items, total] = await Promise.all([
      this.logPrisma.errorLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.logPrisma.errorLog.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  /** 변경 로그 조회 / Query change logs */
  async getChangeLogs(filter: {
    startDate?: Date;
    endDate?: Date;
    tableName?: string;
    adminId?: string;
    page?: number;
    limit?: number;
  }) {
    const { startDate, endDate, tableName, adminId, page = 1, limit = 50 } = filter;
    const where: any = {};

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }
    if (tableName) where.tableName = tableName;
    if (adminId) where.adminId = adminId;

    const [items, total] = await Promise.all([
      this.logPrisma.changeLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.logPrisma.changeLog.count({ where }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
