/**
 * 알바 비자 매칭 모듈
 * Alba Visa Matching Module
 *
 * 알바 전용 비자 매칭 엔진을 제공하는 NestJS 모듈.
 * NestJS module that provides the alba-specific visa matching engine.
 *
 * [구성 / Components]
 * - Controller: POST /api/alba/visa-matching
 * - Service: AlbaVisaMatchingService (9개 Evaluator 오케스트레이션)
 * - Evaluators: D-2, D-4, D-10, F-2, F-4, F-5, F-6, H-1, H-2
 * - Data: KSIC 매핑, 금지업종, 단순노무, 네거티브리스트, 인구감소지역
 *
 * [참고 / Note]
 * - 이 모듈은 기존 visa-rules 모듈과 완전히 독립.
 *   This module is completely independent from the existing visa-rules module.
 * - 기존 visa-rules는 정규직 매칭용, 이 모듈은 알바 매칭용.
 *   Existing visa-rules is for full-time matching; this module is for alba matching.
 * - JobPrismaService를 사용하지 않음 (Jobs DB 미가용).
 *   Does NOT use JobPrismaService (Jobs DB not available).
 */

import { Module } from '@nestjs/common';
import { AlbaVisaMatchingController } from './alba-visa-matching.controller';
import { AlbaVisaMatchingService } from './alba-visa-matching.service';

@Module({
  controllers: [AlbaVisaMatchingController],
  providers: [AlbaVisaMatchingService],
  exports: [AlbaVisaMatchingService],
})
export class AlbaVisaMatchingModule {}
