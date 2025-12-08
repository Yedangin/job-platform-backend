import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { PaginationService } from '@in-job/common';

@Module({
  controllers: [ReportController],
  providers: [ReportService, PaginationService],
})
export class ReportModule {}
