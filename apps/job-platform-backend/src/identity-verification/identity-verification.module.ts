import { Module } from '@nestjs/common';
import { AuthPrismaModule } from 'libs/common/src';
import { IdentityCryptoService } from './identity-crypto.service';
import { IdentityVerificationController } from './identity-verification.controller';
import { IdentityVerificationService } from './identity-verification.service';

@Module({
  imports: [AuthPrismaModule],
  controllers: [IdentityVerificationController],
  providers: [IdentityCryptoService, IdentityVerificationService],
  exports: [IdentityVerificationService],
})
export class IdentityVerificationModule {}
