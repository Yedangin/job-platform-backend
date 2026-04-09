import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobPrismaModule } from 'libs/common/src';
import { TranslationService } from './translation.service';

@Module({
  imports: [ConfigModule, JobPrismaModule],
  providers: [TranslationService],
  exports: [TranslationService],
})
export class TranslationModule {}
