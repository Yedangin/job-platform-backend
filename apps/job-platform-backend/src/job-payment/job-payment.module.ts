/**
 * 공고 결제 모듈 — 상품 조회, 주문, 결제 검증, 프리미엄 만료 크론
 * Job payment module — products, orders, payment verification, premium expiry cron
 */
import { Module } from '@nestjs/common';
import { JobPaymentController } from './job-payment.controller';
import { JobPaymentService } from './job-payment.service';
import { AuthPrismaService, RedisService } from 'libs/common/src';

@Module({
  controllers: [JobPaymentController],
  providers: [
    JobPaymentService,
    AuthPrismaService,
    RedisService,
  ],
  exports: [JobPaymentService],
})
export class JobPaymentModule {}
