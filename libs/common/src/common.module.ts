import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { PaginationService } from './common/helper/pagination.service';

@Module({
  imports: [PrismaModule],
  providers: [CommonService, PaginationService],
  exports: [CommonService, PrismaModule, PaginationService],
})
export class CommonModule {}
