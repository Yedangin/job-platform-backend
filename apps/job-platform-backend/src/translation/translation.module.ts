import { Module } from '@nestjs/common';
import { JobPrismaModule } from 'libs/common/src';
import { TranslationService } from './translation.service';

@Module({
  imports: [JobPrismaModule],
  providers: [TranslationService],
  exports: [TranslationService],
})
export class TranslationModule {}
