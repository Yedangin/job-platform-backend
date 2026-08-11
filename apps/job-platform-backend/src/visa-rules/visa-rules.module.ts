import { Module } from '@nestjs/common';
import { VisaRulesController } from './visa-rules.controller';
import { VisaCheckController } from './visa-check.controller';
import { VisaRulesService } from './visa-rules.service';
import { VisaCheckService } from './visa-check.service';
import { RuleEngineService } from './rule-engine.service';
import { EvaluatorRegistryService } from './evaluators/evaluator-registry.service';
import { PointCalculatorService } from './evaluators/point-calculator.service';
import { AuthPrismaService, RedisService } from 'libs/common/src';
import { VisaPolicyEvaluationService } from './visa-policy-evaluation.service';

@Module({
  controllers: [VisaRulesController, VisaCheckController],
  providers: [
    VisaRulesService,
    VisaCheckService,
    RuleEngineService,
    EvaluatorRegistryService,
    PointCalculatorService,
    VisaPolicyEvaluationService,
    AuthPrismaService,
    RedisService,
  ],
  exports: [
    RuleEngineService,
    VisaRulesService,
    VisaCheckService,
    EvaluatorRegistryService,
    PointCalculatorService,
    VisaPolicyEvaluationService,
  ],
})
export class VisaRulesModule {}
