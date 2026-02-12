import { Injectable } from '@nestjs/common';
import { IVisaEvaluator, EvaluateVisaInput, VisaEvaluation, VisaTypeWithRelations } from './evaluator.interface';
import { E9Evaluator } from './e-series/e9.evaluator';
import { E7Evaluator } from './e-series/e7.evaluator';
import { E2Evaluator } from './e-series/e2.evaluator';
import { ESimpleEvaluator } from './e-series/e-simple.evaluator';
import { D2Evaluator } from './d-series/d2.evaluator';
import { DSimpleEvaluator } from './d-series/d-simple.evaluator';
import { F2Evaluator } from './f-series/f2.evaluator';
import { F4Evaluator } from './f-series/f4.evaluator';
import { F5Evaluator } from './f-series/f5.evaluator';
import { FSimpleEvaluator } from './f-series/f-simple.evaluator';
import { H1Evaluator } from './h-series/h1.evaluator';
import { H2Evaluator } from './h-series/h2.evaluator';
import { ProhibitedEvaluator } from './other/prohibited.evaluator';
import { C4Evaluator } from './other/c4.evaluator';

/**
 * Evaluator Registry - 비자 코드 → 평가기 매핑
 * 모든 evaluator를 등록하고 비자 코드로 조회
 */
@Injectable()
export class EvaluatorRegistryService {
  private registry = new Map<string, IVisaEvaluator>();

  constructor() {
    const evaluators: IVisaEvaluator[] = [
      new E9Evaluator(),
      new E7Evaluator(),
      new E2Evaluator(),
      new ESimpleEvaluator(),
      new D2Evaluator(),
      new DSimpleEvaluator(),
      new F2Evaluator(),
      new F4Evaluator(),
      new F5Evaluator(),
      new FSimpleEvaluator(),
      new H1Evaluator(),
      new H2Evaluator(),
      new ProhibitedEvaluator(),
      new C4Evaluator(),
    ];

    for (const evaluator of evaluators) {
      for (const code of evaluator.visaCodes) {
        this.registry.set(code, evaluator);
      }
    }
  }

  /** 비자 코드에 해당하는 evaluator 반환 (없으면 null) */
  getEvaluator(visaCode: string): IVisaEvaluator | null {
    // exact match
    const exact = this.registry.get(visaCode);
    if (exact) return exact;

    // parent match (E-7-1 → E-7)
    const parts = visaCode.split('-');
    if (parts.length >= 3) {
      const parentCode = `${parts[0]}-${parts[1]}`;
      return this.registry.get(parentCode) ?? null;
    }

    return null;
  }

  /** 비자 평가 실행 */
  evaluate(
    visaCode: string,
    input: EvaluateVisaInput,
    visaType: VisaTypeWithRelations,
  ): VisaEvaluation | null {
    const evaluator = this.getEvaluator(visaCode);
    if (!evaluator) return null;
    return evaluator.evaluate(input, visaType);
  }

  /** 등록된 모든 비자 코드 반환 */
  getRegisteredCodes(): string[] {
    return Array.from(this.registry.keys());
  }

  /** evaluator가 등록되어 있는지 확인 */
  hasEvaluator(visaCode: string): boolean {
    return this.getEvaluator(visaCode) !== null;
  }
}
