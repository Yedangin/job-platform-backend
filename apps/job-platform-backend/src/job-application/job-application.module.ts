import { Module } from '@nestjs/common';
import { JobApplicationController } from './job-application.controller';
import { JobApplicationService } from './job-application.service';
import { VisaScenarioService } from './visa-scenario.service';
import {
  AuthPrismaService,
  NotificationPrismaService,
  RedisService,
} from 'libs/common/src';

@Module({
  controllers: [JobApplicationController],
  providers: [
    JobApplicationService,
    VisaScenarioService,
    AuthPrismaService,
    NotificationPrismaService,
    RedisService,
  ],
  exports: [JobApplicationService, VisaScenarioService],
})
export class JobApplicationModule {}
