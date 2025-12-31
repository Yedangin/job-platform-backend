// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   Logger,
//   NestMiddleware,
// } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { LogPrismaService } from '../prisma/log/log-prisma.service';

// export interface AuditLogData {
//   service: string;
//   userId?: string;
//   action: string;
//   resource?: string;
//   resourceId?: string;
//   method?: string;
//   endpoint?: string;
//   statusCode?: number;
//   ipAddress?: string;
//   userAgent?: string;
//   requestId?: string;
//   sessionId?: string;
//   metadata?: any;
//   oldValues?: any;
//   newValues?: any;
//   duration?: number;
//   success?: boolean;
//   errorMessage?: string;
// }

// @Injectable()
// export class LoggingMiddleware implements NestMiddleware {
//   constructor(private readonly prisma: LogPrismaService) {}

//   private readonly logger = new Logger(LoggingMiddleware.name);

//   private logHttpCall(context: ExecutionContext, next: CallHandler) {
//     const request = context.switchToHttp().getRequest();
//     const userAgent = request.get('user-agent') || '';
//     const { ip, method, path: url } = request;
//     const userId = request.user?.userId;

//     this.logger.log(`${ip} , ${userId}`);
//   }

//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('Request received...');
//     console.log(`Method: ${req.method}, URL: ${req.originalUrl},`);
//     console.log('request :', req);

//     // this.prisma.auditLog.create({
//     //   data: {
//     //     service: req.service,
//     //     userId: req.userId || undefined,
//     //     action: req.action,
//     //     resource: req.resource,
//     //     resourceId: req.resourceId,
//     //     method: req.method,
//     //     endpoint: req.endpoint,
//     //     statusCode: req.statusCode,
//     //     ipAddress: req.ipAddress,
//     //     userAgent: req.userAgent,
//     //     requestId: req.requestId,
//     //     sessionId: req.sessionId,
//     //     metadata: req.metadata,
//     //     oldValues: req.oldValues,
//     //     newValues: req.newValues,
//     //     duration: req.duration,
//     //     success: req.success ?? true,
//     //     errorMessage: req.errorMessage,
//     //   },
//     // });
//     next();
//   }
// }

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { LogPrismaService } from '../prisma/log/log-prisma.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  constructor(private readonly prisma: LogPrismaService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    const requestId = uuidv4();
    const method = req.method;
    const url = req.originalUrl;
    const data = req.body;
    const ip =
      req.ip ||
      (req.headers['x-forwarded-for'] as string) ||
      req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';
    const userId = (req as any).user?.userId;

    const path = req.path.replace(/^\/+/, '');
    const segments = path.split('/');

    let resource: string | undefined;
    let resourceId: string | undefined;

    if (segments[0] === 'auth') {
      resource = 'AUTH';
    } else if (segments[0] === 'payment' || segments[0] === 'payments') {
      resource = 'PAYMENT';
    } else {
      resource = segments[0]?.toUpperCase();
      resourceId = segments[1];
    }

    // attach requestId so controllers/services can reuse it
    (req as any).requestId = requestId;

    this.logger.log(
      `[${requestId}] ${method} ${url} ${
        userId ?? 'anonymous'
      } ${userAgent} ${ip}`
    );

    res.on('finish', async () => {
      const duration = Date.now() - startTime;
      const statusCode = res.statusCode;
      const success = statusCode < 400;

      this.logger.log(
        `[${requestId}] ${method} ${url} ${statusCode} ${duration}ms`
      );

      // console.log('Req : ', req);
      // console.log('data : ', data);

      try {
        await this.prisma.auditLog.create({
          data: {
            service: 'api',
            userId,
            action: `${method} ${url}`,
            resource,
            resourceId,
            method,
            endpoint: url,
            statusCode,
            ipAddress: ip,
            userAgent,
            requestId,
            duration,
            success: statusCode < 400,
          },
        });
      } catch (err) {
        this.logger.error(
          'Failed to create audit log',
          err instanceof Error ? err.stack : String(err)
        );
      }
    });

    next();
  }
}
