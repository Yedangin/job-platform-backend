/**
 * 비자 플래너 모듈 / Visa Planner Module
 * 프리미엄 진단, Stripe 결제, 재진단 쿠폰, What-If 시뮬레이션
 * Premium diagnosis, Stripe payment, rediagnosis coupons, What-If simulation
 */
import { Module } from '@nestjs/common';
import { AuthPrismaService, RedisService } from 'libs/common/src';
import { DiagnosisModule } from '../diagnosis/diagnosis.module';
import { VisaPlannerController } from './visa-planner.controller';
import { PremiumEngineService } from './premium-engine.service';
import { CareerAggregationService } from './career-aggregation.service';
import { WhatIfSimulationService } from './what-if-simulation.service';
import { StripeService } from './stripe.service';
import { RediagnosisCouponService } from './rediagnosis-coupon.service';
import { VisaPlannerSeedService } from './visa-planner-seed.service';

@Module({
  imports: [DiagnosisModule],
  controllers: [VisaPlannerController],
  providers: [
    AuthPrismaService,
    RedisService,
    PremiumEngineService,
    CareerAggregationService,
    WhatIfSimulationService,
    StripeService,
    RediagnosisCouponService,
    VisaPlannerSeedService,
  ],
  exports: [PremiumEngineService, CareerAggregationService],
})
export class VisaPlannerModule {}
