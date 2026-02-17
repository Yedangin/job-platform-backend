/**
 * 비자 인증 모듈
 * Visa verification module
 */
import { Module } from '@nestjs/common';
import { VisaVerificationController } from './visa-verification.controller';
import { VisaVerificationService } from './visa-verification.service';
import { AuthPrismaService, RedisService } from 'libs/common/src';

@Module({
  controllers: [VisaVerificationController],
  providers: [VisaVerificationService, AuthPrismaService, RedisService],
  exports: [VisaVerificationService],
})
export class VisaVerificationModule {}
