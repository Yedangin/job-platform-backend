import { Module } from '@nestjs/common';
import { AuthPrismaService, RedisService } from 'libs/common/src';
import { DiagnosisEngineService } from './diagnosis-engine.service';
import { DiagnosisController } from './diagnosis.controller';
import { AdminDiagnosisController } from './admin-diagnosis.controller';
import { ScoreCalibrationService } from './score-calibration.service';

/**
 * 비자 진단 엔진 모듈 / Visa Diagnosis Engine Module
 * 15개 경로 하드필터 + 소프트스코어링 진단 제공
 * Provides 15-pathway hard filter + soft scoring diagnosis
 */
@Module({
  controllers: [DiagnosisController, AdminDiagnosisController],
  providers: [AuthPrismaService, RedisService, DiagnosisEngineService, ScoreCalibrationService],
  exports: [DiagnosisEngineService],
})
export class DiagnosisModule {}
