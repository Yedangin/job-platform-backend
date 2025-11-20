import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { PaginationService } from './common/helper/pagination.service';

@Module({
  imports: [],
  providers: [CommonService, PaginationService],
  exports: [CommonService, PaginationService],
})
export class CommonModule {}
