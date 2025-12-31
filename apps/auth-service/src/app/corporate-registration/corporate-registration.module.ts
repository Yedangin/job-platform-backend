import { Module } from '@nestjs/common';
import { CorporateRegistrationController } from './corporate-registration.controller';
import { CorporateRegistrationService } from './corporate-registration.service';
import { FileService } from '@in-job/common';

@Module({
  controllers: [CorporateRegistrationController],
  providers: [CorporateRegistrationService, FileService],
})
export class CorporateRegistrationModule {}
