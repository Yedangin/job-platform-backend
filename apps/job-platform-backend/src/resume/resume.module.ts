/**
 * 이력서 모듈 / Resume module
 * PaymentModule: ViewingCreditService 사용 (인재 열람권)
 */
import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { AuthPrismaService, RedisService } from 'libs/common/src';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [PaymentModule],
  controllers: [ResumeController],
  providers: [ResumeService, AuthPrismaService, RedisService],
  exports: [ResumeService],
})
export class ResumeModule {}
