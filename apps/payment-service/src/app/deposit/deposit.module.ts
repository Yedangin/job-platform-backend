import { Module } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { AuthPrismaService, PaymentPrismaService } from '@in-job/common';

@Module({
  controllers: [DepositController],
  providers: [DepositService, PaymentPrismaService, AuthPrismaService],
})
export class DepositModule {}
