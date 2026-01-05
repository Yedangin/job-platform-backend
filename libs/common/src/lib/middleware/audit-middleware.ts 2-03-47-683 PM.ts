import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuditLogService } from '../audit-log/audit-log.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(private readonly auditService: AuditLogService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const requestId = uuidv4();

    // Add request ID to request for tracking
    req['requestId'] = requestId;

    // Extract user info from request
    const userId = req.user?.id || req.user?.userId;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Get service name based on route
    const serviceName = this.getServiceFromRoute(req.path);

    // Override res.end to capture response
    const originalEnd = res.end;
    res.end = function (chunk?: any, encoding?: any) {
      const duration = Date.now() - startTime;

      // Log the API call
      this.auditService
        .logApiCall(
          serviceName,
          req.method,
          req.path,
          res.statusCode,
          duration,
          userId,
          requestId,
          ipAddress,
          userAgent,
          res.statusCode < 400,
          res.statusCode >= 400 ? `HTTP ${res.statusCode}` : undefined
        )
        .catch((error) => {
          console.error('Failed to log API call:', error);
        });

      // Call original end
      originalEnd.call(this, chunk, encoding);
    }.bind(this);

    next();
  }

  private getServiceFromRoute(path: string): string {
    if (path.startsWith('/auth') || path.startsWith('/api/auth')) {
      return 'auth-service';
    }
    if (path.startsWith('/payment') || path.startsWith('/api/payment')) {
      return 'payment-service';
    }
    if (path.startsWith('/job') || path.startsWith('/api/job')) {
      return 'job-service';
    }
    if (
      path.startsWith('/notification') ||
      path.startsWith('/api/notification')
    ) {
      return 'notification-service';
    }
    return 'api-gateway';
  }
}
