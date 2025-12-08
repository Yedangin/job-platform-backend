import { Module } from '@nestjs/common';
import { CorporateRegistrationController } from './corporate-registration.controller';
import { CorporateRegistrationService } from './corporate-registration.service';

@Module({
  controllers: [CorporateRegistrationController],
  providers: [CorporateRegistrationService],
})
export class CorporateRegistrationModule {}
