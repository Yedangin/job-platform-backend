import { Module } from '@nestjs/common';
import { JobPaymentController } from './job-payment.controller';
import { JobPaymentService } from './job-payment.service';
import { AuthPrismaService, RedisService } from 'libs/common/src';

@Module({
  controllers: [JobPaymentController],
  providers: [JobPaymentService, AuthPrismaService, RedisService],
  exports: [JobPaymentService],
})
export class JobPaymentModule {}
