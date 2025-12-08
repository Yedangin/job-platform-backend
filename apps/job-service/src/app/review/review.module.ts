import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { JobPrismaService, PaginationService } from '@in-job/common';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, PaginationService, JobPrismaService],
})
export class ReviewModule {}
