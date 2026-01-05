import { Module } from '@nestjs/common';
import { AuditService } from './audit-log.service';
import { AuditLogController } from './audit-log.controller';
import {
  AuthPrismaService,
  LogPrismaService,
  PaymentPrismaService,
} from '@in-job/common';

@Module({
  controllers: [AuditLogController],
  providers: [
    AuditService,
    LogPrismaService,
    PaymentPrismaService,
    AuthPrismaService,
  ],
})
export class AuditLogModule {}
