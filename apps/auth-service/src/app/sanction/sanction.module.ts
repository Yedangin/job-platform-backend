import { Module } from '@nestjs/common';
import { SanctionService } from './sanction.service';
import { SanctionController } from './sanction.controller';
import { AuthPrismaService, PaginationService } from '@in-job/common';

@Module({
  controllers: [SanctionController],
  providers: [SanctionService, PaginationService, AuthPrismaService],
})
export class SanctionModule {}
