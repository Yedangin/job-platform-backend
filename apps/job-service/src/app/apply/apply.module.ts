import { Module } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { ApplyController } from './apply.controller';
import { AuthPrismaService, PaginationService } from '@in-job/common';

@Module({
  controllers: [ApplyController],
  providers: [ApplyService, PaginationService, AuthPrismaService],
})
export class ApplyModule {}
