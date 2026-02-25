import { Module } from '@nestjs/common';
import { JobApplicationController } from './job-application.controller';
import { JobApplicationService } from './job-application.service';
import {
  AuthPrismaService,
  NotificationPrismaService,
  RedisService,
} from 'libs/common/src';

@Module({
  controllers: [JobApplicationController],
  providers: [
    JobApplicationService,
    AuthPrismaService,
    NotificationPrismaService,
    RedisService,
  ],
  exports: [JobApplicationService],
})
export class JobApplicationModule {}
