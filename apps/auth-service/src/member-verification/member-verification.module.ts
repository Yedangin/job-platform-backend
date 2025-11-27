import { Module } from '@nestjs/common';
import { MemberVerificationService } from './member-verification.service';
import { MemberVerificationController } from './member-verification.controller';

@Module({
  controllers: [MemberVerificationController],
  providers: [MemberVerificationService],
})
export class MemberVerificationModule {}
