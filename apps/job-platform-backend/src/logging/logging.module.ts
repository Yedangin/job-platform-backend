import { Global, Module } from '@nestjs/common';
import { LogPrismaModule } from 'libs/common/src';
import { LoggingService } from './logging.service';
import { LoggingController } from './logging.controller';

/**
 * 로깅 모듈 — 전역 등록하여 모든 모듈에서 LoggingService 사용 가능
 * Logging module — registered globally so LoggingService is available everywhere
 */
@Global()
@Module({
  imports: [LogPrismaModule],
  controllers: [LoggingController],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
