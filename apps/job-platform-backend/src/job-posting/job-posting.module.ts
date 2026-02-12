import { Module } from '@nestjs/common';
import { JobPostingController } from './job-posting.controller';
import { JobPostingService } from './job-posting.service';
import { AuthPrismaService, RedisService } from 'libs/common/src';

@Module({
  controllers: [JobPostingController],
  providers: [JobPostingService, AuthPrismaService, RedisService],
  exports: [JobPostingService],
})
export class JobPostingModule {}
