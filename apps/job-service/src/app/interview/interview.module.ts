import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { JobPostService } from '../job-post/job-post.service';
import { CategoryService } from '../category/category.service';
import { JobPrismaService, PaginationService } from '@in-job/common';

@Module({
  controllers: [InterviewController],
  providers: [
    InterviewService,
    JobPostService,
    CategoryService,
    PaginationService,
    JobPrismaService,
  ],
})
export class InterviewModule {}
