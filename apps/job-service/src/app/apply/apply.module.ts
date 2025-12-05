import { Module } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { ApplyController } from './apply.controller';
import { PaginationService } from '@in-job/common';

@Module({
  controllers: [ApplyController],
  providers: [ApplyService, PaginationService],
})
export class ApplyModule {}
