import { Module } from '@nestjs/common';
import { JobPostService } from './job-post.service';
import { JobPostController } from './job-post.controller';
import { CategoryService } from '../category/category.service';
import { JobPrismaService, PaginationService } from 'libs/common/src';

@Module({
  controllers: [JobPostController],
  providers: [
    JobPostService,
    CategoryService,
    PaginationService,
    JobPrismaService,
  ],
})
export class JobPostModule {}
