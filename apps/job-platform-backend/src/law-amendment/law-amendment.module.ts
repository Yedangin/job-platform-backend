import { Module } from '@nestjs/common';
import { LogPrismaModule, AuthPrismaModule } from 'libs/common/src';
import { LawAmendmentController } from './law-amendment.controller';
import { LawAmendmentService } from './law-amendment.service';

/**
 * 법령 변경 관리 모듈
 * Law amendment management module
 *
 * - LogPrismaModule: MongoDB — LawAmendment/LawAmendmentItem CRUD + 변경 로그
 * - AuthPrismaModule: PostgreSQL — VisaType/VisaRule 읽기/수정 (영향분석, 적용)
 * - LoggingService: 글로벌 주입 (LoggingModule @Global)
 */
@Module({
  imports: [LogPrismaModule, AuthPrismaModule],
  controllers: [LawAmendmentController],
  providers: [LawAmendmentService],
  exports: [LawAmendmentService],
})
export class LawAmendmentModule {}
