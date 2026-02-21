/**
 * 교육기관 모듈 / Educational institutions module
 */

import { Module } from '@nestjs/common';
import { AuthPrismaModule } from '../../../../libs/common/src';
import { InstitutionsController } from './institutions.controller';
import { InstitutionsService } from './institutions.service';

@Module({
  imports: [AuthPrismaModule],
  controllers: [InstitutionsController],
  providers: [InstitutionsService],
  exports: [InstitutionsService],
})
export class InstitutionsModule {}
