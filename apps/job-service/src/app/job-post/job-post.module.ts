import { Module } from '@nestjs/common';
import { JobPostService } from './job-post.service';
import { JobPostController } from './job-post.controller';
import { CategoryService } from '../category/category.service';
import { AuthPrismaService, JobPrismaService, PaginationService } from '@in-job/common';

@Module({
  controllers: [JobPostController],
  providers: [
    JobPostService,
    CategoryService,
    PaginationService,
    JobPrismaService,
    AuthPrismaService,
  ],
})
export class JobPostModule {}
