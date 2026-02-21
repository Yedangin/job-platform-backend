/**
 * 공고 모듈 — 공고 CRUD + 비자 기반 적격성 필터링 + 만료 크론
 * Job posting module — CRUD + visa-based eligibility filtering + expiry cron
 */
import { Module } from '@nestjs/common';
import { JobPostingController } from './job-posting.controller';
import { JobPostingService } from './job-posting.service';
import { JobEligibilityService } from './job-eligibility.service';
import { JobCronService } from './job-cron.service';
import { VisaRulesModule } from '../visa-rules/visa-rules.module';
import { AuthPrismaService, RedisService } from 'libs/common/src';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [VisaRulesModule, PaymentModule],
  controllers: [JobPostingController],
  providers: [
    JobPostingService,
    JobEligibilityService,
    JobCronService,
    AuthPrismaService,
    RedisService,
  ],
  exports: [JobPostingService, JobEligibilityService],
})
export class JobPostingModule {}
