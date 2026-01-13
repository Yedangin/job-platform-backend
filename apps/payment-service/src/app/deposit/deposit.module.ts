import { Module } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import {
  AuthPrismaService,
  PaginationService,
  PaymentPrismaService,
} from '@in-job/common';

@Module({
  controllers: [DepositController],
  providers: [
    DepositService,
    PaymentPrismaService,
    AuthPrismaService,
    PaginationService,
  ],
})
export class DepositModule {}
