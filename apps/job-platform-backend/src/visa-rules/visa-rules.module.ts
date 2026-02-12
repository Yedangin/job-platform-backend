import { Module } from '@nestjs/common';
import { VisaRulesController } from './visa-rules.controller';
import { VisaRulesService } from './visa-rules.service';
import { RuleEngineService } from './rule-engine.service';
import { EvaluatorRegistryService } from './evaluators/evaluator-registry.service';
import { PointCalculatorService } from './evaluators/point-calculator.service';
import { AuthPrismaService, RedisService } from 'libs/common/src';

@Module({
  controllers: [VisaRulesController],
  providers: [
    VisaRulesService,
    RuleEngineService,
    EvaluatorRegistryService,
    PointCalculatorService,
    AuthPrismaService,
    RedisService,
  ],
  exports: [RuleEngineService, VisaRulesService, EvaluatorRegistryService, PointCalculatorService],
})
export class VisaRulesModule {}
