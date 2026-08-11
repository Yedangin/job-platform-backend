import { Module } from '@nestjs/common';
import { AuthPrismaService, RedisService } from 'libs/common/src';
import { DiagnosisEngineService } from './diagnosis-engine.service';
import { DiagnosisV2EngineService } from './diagnosis-v2-engine.service';
import { DiagnosisController } from './diagnosis.controller';
import { AdminDiagnosisController } from './admin-diagnosis.controller';
import { ScoreCalibrationService } from './score-calibration.service';
import { TranslationModule } from '../translation/translation.module';
import { VisaPolicyModule } from '../visa-policy/visa-policy.module';

/**
 * 비자 진단 엔진 모듈 / Visa Diagnosis Engine Module
 * 15개 경로 하드필터 + 소프트스코어링 진단 제공
 * Provides 15-pathway hard filter + soft scoring diagnosis
 */
@Module({
  imports: [TranslationModule, VisaPolicyModule],
  controllers: [DiagnosisController, AdminDiagnosisController],
  providers: [
    AuthPrismaService,
    RedisService,
    DiagnosisEngineService,
    DiagnosisV2EngineService,
    ScoreCalibrationService,
  ],
  exports: [DiagnosisEngineService, DiagnosisV2EngineService],
})
export class DiagnosisModule {}
