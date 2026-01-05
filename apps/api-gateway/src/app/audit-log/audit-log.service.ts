import { LogPrismaService } from '@in-job/common';
import { Injectable, Logger } from '@nestjs/common';

export interface AuditLogData {
  service: string;
  userId?: string;
  action: string;
  resource?: string;
  resourceId?: string;
  method?: string;
  endpoint?: string;
  statusCode?: number;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
  sessionId?: string;
  metadata?: any;
  oldValues?: any;
  newValues?: any;
  duration?: number;
  success?: boolean;
  errorMessage?: string;
}

export interface AuditLogFilters {
  service?: string;
  userId?: string;
  action?: string;
  resource?: string;
  resourceId?: string;
  method?: string;
  endpoint?: string;
  statusCode?: number;
  startDate?: Date;
  endDate?: Date;
  success?: boolean;
  limit?: number;
  offset?: number;
  search?: string;
}

export interface AuditLogStatistics {
  total: number;
  success: number;
  failed: number;
  successRate: number;
  byService?: Record<string, number>;
  byAction?: Record<string, number>;
  byHour?: Record<string, number>;
}

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private readonly logPrisma: LogPrismaService) {}

  // ========== CORE LOGGING METHODS ==========

  async log(data: AuditLogData): Promise<void> {
    try {
      await this.logPrisma.auditLog.create({
        data: {
          service: data.service,
          userId: data.userId,
          action: data.action,
          resource: data.resource,
          resourceId: data.resourceId,
          method: data.method,
          endpoint: data.endpoint,
          statusCode: data.statusCode,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          requestId: data.requestId,
          sessionId: data.sessionId,
          metadata: data.metadata,
          oldValues: data.oldValues,
          newValues: data.newValues,
          duration: data.duration,
          success: data.success ?? true,
          errorMessage: data.errorMessage,
        },
      });
    } catch (error) {
      // Log to console if audit logging fails to prevent infinite loops
      console.error('Failed to create audit log:', error);
    }
  }

  async logUserAction(
    service: string,
    userId: string,
    action: string,
    resource?: string,
    resourceId?: string,
    metadata?: any
  ): Promise<void> {
    await this.log({
      service,
      userId,
      action,
      resource,
      resourceId,
      metadata,
    });
  }

  async logApiCall(
    service: string,
    method: string,
    endpoint: string,
    statusCode: number,
    duration: number,
    userId?: string,
    requestId?: string,
    ipAddress?: string,
    userAgent?: string,
    success?: boolean,
    errorMessage?: string
  ): Promise<void> {
    await this.log({
      service,
      userId,
      action: 'API_CALL',
      method,
      endpoint,
      statusCode,
      duration,
      requestId,
      ipAddress,
      userAgent,
      success,
      errorMessage,
    });
  }

  async logDataChange(
    service: string,
    userId: string,
    action: string,
    resource: string,
    resourceId: string,
    oldValues?: any,
    newValues?: any,
    metadata?: any
  ): Promise<void> {
    await this.log({
      service,
      userId,
      action,
      resource,
      resourceId,
      oldValues,
      newValues,
      metadata,
    });
  }

  async logError(
    service: string,
    action: string,
    errorMessage: string,
    userId?: string,
    metadata?: any
  ): Promise<void> {
    await this.log({
      service,
      userId,
      action,
      success: false,
      errorMessage,
      metadata,
    });
  }

  // ========== RETRIEVAL METHODS ==========

  async getAuditLogs(filters: AuditLogFilters) {
    const where: any = {};

    if (filters.service) where.service = filters.service;
    if (filters.userId) where.userId = filters.userId;
    if (filters.action) where.action = filters.action;
    if (filters.resource) where.resource = filters.resource;
    if (filters.resourceId) where.resourceId = filters.resourceId;
    if (filters.method) where.method = filters.method;
    if (filters.endpoint)
      where.endpoint = { contains: filters.endpoint, mode: 'insensitive' };
    if (filters.statusCode) where.statusCode = filters.statusCode;
    if (filters.success !== undefined) where.success = filters.success;

    if (filters.startDate || filters.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = filters.startDate;
      if (filters.endDate) where.createdAt.lte = filters.endDate;
    }

    if (filters.search) {
      where.OR = [
        { service: { contains: filters.search, mode: 'insensitive' } },
        { userId: { contains: filters.search, mode: 'insensitive' } },
        { action: { contains: filters.search, mode: 'insensitive' } },
        { resource: { contains: filters.search, mode: 'insensitive' } },
        { endpoint: { contains: filters.search, mode: 'insensitive' } },
        { errorMessage: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [logs, total] = await Promise.all([
      this.logPrisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: filters.limit || 100,
        skip: filters.offset || 0,
        // include: {
        //   systemLog: filters.search ? {
        //     where: {
        //       OR: [
        //         { actionType: { contains: filters.search, mode: 'insensitive' } },
        //         { description: { contains: filters.search, mode: 'insensitive' } },
        //       ],
        //     },
        //   } : false,
        // },
      }),
      this.logPrisma.auditLog.count({ where }),
    ]);

    return {
      data: logs,
      meta: {
        total,
        limit: filters.limit || 100,
        offset: filters.offset || 0,
        hasMore: total > (filters.offset || 0) + (filters.limit || 100),
      },
    };
  }

  async findOne(id: string) {
    try {
      return await this.logPrisma.auditLog.findUnique({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to find audit log with id ${id}:`, error);
      throw error;
    }
  }

  async findByRequestId(requestId: string) {
    return await this.logPrisma.auditLog.findMany({
      where: { requestId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySessionId(sessionId: string) {
    return await this.logPrisma.auditLog.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByUserAndAction(
    userId: string,
    action: string,
    limit: number = 50
  ) {
    return await this.logPrisma.auditLog.findMany({
      where: { userId, action },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  // ========== AUTH-SPECIFIC LOGGING METHODS ==========

  async logLogin(
    userId: string,
    success: boolean,
    ipAddress?: string,
    userAgent?: string,
    sessionId?: string,
    errorMessage?: string,
    metadata?: any
  ): Promise<void> {
    await this.log({
      service: 'auth-service',
      userId,
      action: 'LOGIN',
      resource: 'user',
      resourceId: userId,
      success,
      ipAddress,
      userAgent,
      sessionId,
      errorMessage,
      metadata,
    });
  }

  async logRegister(
    userId: string,
    success: boolean,
    ipAddress?: string,
    userAgent?: string,
    errorMessage?: string,
    metadata?: any
  ): Promise<void> {
    await this.log({
      service: 'auth-service',
      userId,
      action: 'REGISTER',
      resource: 'user',
      resourceId: userId,
      success,
      ipAddress,
      userAgent,
      errorMessage,
      metadata,
    });
  }

  async logLogout(
    userId: string,
    ipAddress?: string,
    userAgent?: string,
    sessionId?: string,
    metadata?: any
  ): Promise<void> {
    await this.log({
      service: 'auth-service',
      userId,
      action: 'LOGOUT',
      resource: 'user',
      resourceId: userId,
      success: true,
      ipAddress,
      userAgent,
      sessionId,
      metadata,
    });
  }

  async logSocialLogin(
    userId: string,
    provider: string,
    success: boolean,
    ipAddress?: string,
    userAgent?: string,
    sessionId?: string,
    errorMessage?: string,
    metadata?: any
  ): Promise<void> {
    await this.log({
      service: 'auth-service',
      userId,
      action: 'SOCIAL_LOGIN',
      resource: 'user',
      resourceId: userId,
      success,
      ipAddress,
      userAgent,
      sessionId,
      errorMessage,
      metadata: {
        provider,
        ...metadata,
      },
    });
  }

  async logPasswordReset(
    userId: string,
    success: boolean,
    ipAddress?: string,
    userAgent?: string,
    errorMessage?: string,
    metadata?: any
  ): Promise<void> {
    await this.log({
      service: 'auth-service',
      userId,
      action: 'PASSWORD_RESET',
      resource: 'user',
      resourceId: userId,
      success,
      ipAddress,
      userAgent,
      errorMessage,
      metadata,
    });
  }

  async logEmailVerification(
    userId: string,
    success: boolean,
    ipAddress?: string,
    userAgent?: string,
    errorMessage?: string,
    metadata?: any
  ): Promise<void> {
    await this.log({
      service: 'auth-service',
      userId,
      action: 'EMAIL_VERIFICATION',
      resource: 'user',
      resourceId: userId,
      success,
      ipAddress,
      userAgent,
      errorMessage,
      metadata,
    });
  }

  // ========== PAYMENT-SPECIFIC LOGGING METHODS ==========

  async logPaymentCreated(
    userId: string,
    orderId: string,
    amount: number,
    success: boolean,
    ipAddress?: string,
    userAgent?: string,
    errorMessage?: string,
    metadata?: any
  ): Promise<void> {
    await this.log({
      service: 'payment-service',
      userId,
      action: 'PAYMENT_CREATED',
      resource: 'payment',
      resourceId: orderId,
      success,
      ipAddress,
      userAgent,
      errorMessage,
      metadata: {
        amount,
        ...metadata,
      },
    });
  }

  async logPaymentConfirmed(
    userId: string,
    orderId: string,
    paymentKey: string,
    amount: number,
    success: boolean,
    ipAddress?: string,
    userAgent?: string,
    errorMessage?: string,
    metadata?: any
  ): Promise<void> {
    await this.log({
      service: 'payment-service',
      userId,
      action: 'PAYMENT_CONFIRMED',
      resource: 'payment',
      resourceId: orderId,
      success,
      ipAddress,
      userAgent,
      errorMessage,
      metadata: {
        paymentKey,
        amount,
        ...metadata,
      },
    });
  }

  async logPaymentFailed(
    userId: string,
    orderId: string,
    failureCode: string,
    failureMessage: string,
    ipAddress?: string,
    userAgent?: string,
    metadata?: any
  ): Promise<void> {
    await this.log({
      service: 'payment-service',
      userId,
      action: 'PAYMENT_FAILED',
      resource: 'payment',
      resourceId: orderId,
      success: false,
      ipAddress,
      userAgent,
      errorMessage: `${failureCode}: ${failureMessage}`,
      metadata: {
        failureCode,
        ...metadata,
      },
    });
  }

  async logWalletAccess(
    userId: string,
    action: string,
    success: boolean,
    ipAddress?: string,
    userAgent?: string,
    errorMessage?: string,
    metadata?: any
  ): Promise<void> {
    await this.log({
      service: 'payment-service',
      userId,
      action: `WALLET_${action.toUpperCase()}`,
      resource: 'wallet',
      resourceId: userId,
      success,
      ipAddress,
      userAgent,
      errorMessage,
      metadata,
    });
  }

  async logWalletBalanceUpdate(
    userId: string,
    walletId: string,
    amount: number,
    previousBalance: number,
    newBalance: number,
    reason: string,
    ipAddress?: string,
    userAgent?: string,
    metadata?: any
  ): Promise<void> {
    await this.log({
      service: 'payment-service',
      userId,
      action: 'WALLET_BALANCE_UPDATE',
      resource: 'wallet',
      resourceId: walletId,
      success: true,
      ipAddress,
      userAgent,
      metadata: {
        amount,
        previousBalance,
        newBalance,
        reason,
        ...metadata,
      },
    });
  }

  // ========== SYSTEM LOG METHODS (Backward Compatibility) ==========

  async createSystemLog(data: {
    userId?: string;
    actionType: string;
    description?: string;
  }): Promise<void> {
    try {
      await this.logPrisma.systemLog.create({
        data: {
          userId: data.userId,
          actionType: data.actionType,
          description: data.description,
        },
      });
    } catch (error) {
      console.error('Failed to create system log:', error);
    }
  }

  async getSystemLogs(filters: {
    userId?: string;
    actionType?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    offset?: number;
  }) {
    const where: any = {};

    if (filters.userId) where.userId = filters.userId;
    if (filters.actionType) where.actionType = filters.actionType;

    if (filters.startDate || filters.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = filters.startDate;
      if (filters.endDate) where.createdAt.lte = filters.endDate;
    }

    return this.logPrisma.systemLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: filters.limit || 100,
      skip: filters.offset || 0,
    });
  }

  // ========== STATISTICS & ANALYTICS METHODS ==========

  async getStatistics(filters: {
    service?: string;
    userId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<AuditLogStatistics> {
    const where: any = {};

    if (filters.service) where.service = filters.service;
    if (filters.userId) where.userId = filters.userId;

    if (filters.startDate || filters.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = filters.startDate;
      if (filters.endDate) where.createdAt.lte = filters.endDate;
    }

    const [total, success, failed, byService, byAction, byHour] =
      await Promise.all([
        this.logPrisma.auditLog.count({ where }),
        this.logPrisma.auditLog.count({ where: { ...where, success: true } }),
        this.logPrisma.auditLog.count({ where: { ...where, success: false } }),
        this.getStatsByService(where),
        this.getStatsByAction(where),
        this.getStatsByHour(where),
      ]);

    return {
      total,
      success,
      failed,
      successRate: total > 0 ? (success / total) * 100 : 0,
      byService,
      byAction,
      byHour,
    };
  }

  private async getStatsByService(where: any): Promise<Record<string, number>> {
    const results = await this.logPrisma.auditLog.groupBy({
      by: ['service'],
      where,
      _count: true,
    });

    return results.reduce((acc, curr) => {
      acc[curr.service] = curr._count;
      return acc;
    }, {});
  }

  private async getStatsByAction(where: any): Promise<Record<string, number>> {
    const results = await this.logPrisma.auditLog.groupBy({
      by: ['action'],
      where,
      _count: true,
    });

    return results.reduce((acc, curr) => {
      acc[curr.action] = curr._count;
      return acc;
    }, {});
  }

  private async getStatsByHour(where: any): Promise<Record<string, number>> {
    const results = await this.logPrisma.auditLog.groupBy({
      by: ['createdAt'],
      where,
      _count: true,
    });

    return results.reduce((acc, curr) => {
      const hour = new Date(curr.createdAt).getHours();
      const hourKey = `${hour}:00`;
      acc[hourKey] = (acc[hourKey] || 0) + curr._count;
      return acc;
    }, {});
  }

  // ========== MAINTENANCE & CLEANUP METHODS ==========

  async cleanupOldLogs(
    daysToKeep: number = 90
  ): Promise<{ auditLogs: number; systemLogs: number }> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    try {
      const [auditResult, systemResult] = await Promise.all([
        this.logPrisma.auditLog.deleteMany({
          where: {
            createdAt: {
              lt: cutoffDate,
            },
          },
        }),
        this.logPrisma.systemLog.deleteMany({
          where: {
            createdAt: {
              lt: cutoffDate,
            },
          },
        }),
      ]);

      return {
        auditLogs: auditResult.count,
        systemLogs: systemResult.count,
      };
    } catch (error) {
      this.logger.error('Failed to cleanup old logs:', error);
      throw error;
    }
  }

  async archiveLogsToFile(): Promise<string> {
    const logs = await this.logPrisma.auditLog.findMany({
      where: {
        createdAt: {
          lt: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
      take: 1000,
    });

    // Convert to JSON string for archiving
    const archiveData = JSON.stringify(logs, null, 2);

    // In a real implementation, you would save this to a file storage service
    // For now, we'll return the JSON string
    return archiveData;
  }

  // ========== HEALTH CHECK METHODS ==========

  async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    message: string;
    timestamp: Date;
  }> {
    try {
      // Test database connection
      await this.logPrisma.auditLog.count({ take: 1 });

      return {
        status: 'healthy',
        message: 'Audit service is operational',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: `Audit service database error: ${error.message}`,
        timestamp: new Date(),
      };
    }
  }

  async getRecentActivity(limit: number = 20) {
    return await this.logPrisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  // ========== BATCH OPERATIONS ==========

  async createBatchLogs(logs: AuditLogData[]): Promise<number> {
    try {
      const data = logs.map((log) => ({
        service: log.service,
        userId: log.userId,
        action: log.action,
        resource: log.resource,
        resourceId: log.resourceId,
        method: log.method,
        endpoint: log.endpoint,
        statusCode: log.statusCode,
        ipAddress: log.ipAddress,
        userAgent: log.userAgent,
        requestId: log.requestId,
        sessionId: log.sessionId,
        metadata: log.metadata,
        oldValues: log.oldValues,
        newValues: log.newValues,
        duration: log.duration,
        success: log.success ?? true,
        errorMessage: log.errorMessage,
      }));

      const result = await this.logPrisma.auditLog.createMany({
        data,
      });

      return result.count;
    } catch (error) {
      this.logger.error('Failed to create batch audit logs:', error);
      throw error;
    }
  }

  // ========== HELPER METHODS ==========

  async logWithTimestamp(
    service: string,
    action: string,
    userId?: string,
    metadata?: any
  ): Promise<{ id: string; timestamp: Date }> {
    const log = await this.logPrisma.auditLog.create({
      data: {
        service,
        userId,
        action,
        metadata,
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    return {
      id: log.id,
      timestamp: log.createdAt,
    };
  }

  async logOperation(
    service: string,
    operation: string,
    userId?: string,
    details?: {
      resource?: string;
      resourceId?: string;
      oldValue?: any;
      newValue?: any;
      status?: 'success' | 'failed';
      error?: string;
    }
  ): Promise<void> {
    await this.log({
      service,
      userId,
      action: operation,
      resource: details?.resource,
      resourceId: details?.resourceId,
      oldValues: details?.oldValue ? { value: details.oldValue } : undefined,
      newValues: details?.newValue ? { value: details.newValue } : undefined,
      success: details?.status !== 'failed',
      errorMessage: details?.error,
      metadata: details,
    });
  }
}
