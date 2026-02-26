/**
 * 공고 모듈 — 공고 CRUD + 비자 기반 적격성 필터링 + 만료 크론 + 스크랩
 * Job posting module — CRUD + visa-based eligibility filtering + expiry cron + scraps
 */
import { Module } from '@nestjs/common';
import { JobPostingController } from './job-posting.controller';
import { JobPostingService } from './job-posting.service';
import { JobEligibilityService } from './job-eligibility.service';
import { JobCronService } from './job-cron.service';
import { JobScrapService } from './job-scrap.service';
import { VisaRulesModule } from '../visa-rules/visa-rules.module';
import { AuthPrismaService, RedisService } from 'libs/common/src';
import { PaymentModule } from '../payment/payment.module';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [VisaRulesModule, PaymentModule, TranslationModule],
  controllers: [JobPostingController],
  providers: [
    JobPostingService,
    JobEligibilityService,
    JobCronService,
    JobScrapService,
    AuthPrismaService,
    RedisService,
  ],
  exports: [JobPostingService, JobEligibilityService, JobScrapService],
})
export class JobPostingModule {}
