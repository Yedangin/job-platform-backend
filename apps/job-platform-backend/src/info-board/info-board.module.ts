import { Module } from '@nestjs/common';
import { InfoBoardController } from './info-board.controller';
import { InfoBoardService } from './info-board.service';
import { AuthPrismaService } from 'libs/common/src';
import { TranslationModule } from '../translation/translation.module';

/**
 * 정보 게시판 모듈 — 외국인 생활 가이드
 * Info board module — foreign worker life guide
 */
@Module({
  imports: [TranslationModule],
  controllers: [InfoBoardController],
  providers: [InfoBoardService, AuthPrismaService],
  exports: [InfoBoardService],
})
export class InfoBoardModule {}
