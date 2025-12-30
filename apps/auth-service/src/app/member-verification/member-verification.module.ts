import { Module } from '@nestjs/common';
import { MemberVerificationService } from './member-verification.service';
import { MemberVerificationController } from './member-verification.controller';
import { FileService } from '@in-job/common';

@Module({
  controllers: [MemberVerificationController],
  providers: [MemberVerificationService, FileService],
})
export class MemberVerificationModule {}
