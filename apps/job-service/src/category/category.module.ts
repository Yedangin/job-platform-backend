import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JobPrismaService, PaginationService } from 'libs/common/src';
import { CategoryController } from './category.controller';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PaginationService, JobPrismaService],
})
export class CategoryModule {}
