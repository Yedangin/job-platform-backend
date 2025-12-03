import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { PaginationService } from 'libs/common/src';

@Module({
  controllers: [ReportController],
  providers: [ReportService, PaginationService],
})
export class ReportModule {}
