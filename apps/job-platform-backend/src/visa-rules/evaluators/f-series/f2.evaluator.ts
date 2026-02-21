import { BaseVisaEvaluator } from '../base.evaluator';
import {
  EvaluateVisaInput,
  ScoreBreakdown,
  VisaEvaluation,
  VisaTypeWithRelations,
} from '../evaluator.interface';

/**
 * F-2 거주 비자 평가기
 * F-2 Residence Visa Evaluator
 *
 * 알고리즘 (DB 기반) / Algorithm (DB-driven):
 * F-2 일반 = 자유취업 가능
 * F-2-7 점수제 = DB PointSystemCategory + PointSystemCriteria로 동적 계산
 *   (120점 만점, 80점 이상 시 발급)
 */
export class F2Evaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['F-2', 'F-2-1', 'F-2-7', 'F-2-99'];

  evaluate(
    input: EvaluateVisaInput,
    visaType: VisaTypeWithRelations,
  ): VisaEvaluation {
    const result = this.createEmptyResult();
    result.documents = this.getRequiredDocuments(visaType.requiredDocuments);

    const code = visaType.code;

    if (code === 'F-2-7') {
      return this.evaluateF27(input, visaType, result);
    }

    // F-2 일반: 자유 취업 가능 / F-2 general: unrestricted employment
    result.eligible = true;
    result.notes.push('F-2 거주비자 소지자는 업종 제한 없이 자유 취업 가능');
    result.matchedIndustries.push(input.ksicCode);
    return result;
  }

  /**
   * F-2-7 점수제 평가 (DB PointSystemCategory 기반)
   * F-2-7 point system evaluation (DB-driven via PointSystemCategory)
   */
  private evaluateF27(
    input: EvaluateVisaInput,
    visaType: VisaTypeWithRelations,
    result: VisaEvaluation,
  ): VisaEvaluation {
    result.requiredScore = 80;
    result.notes.push('F-2-7 점수제 거주비자 (120점 만점, 80점 이상 시 발급)');

    const categories = visaType.pointCategories ?? [];
    const breakdown: ScoreBreakdown[] = [];
    let totalScore = 0;

    for (const cat of categories) {
      const { score, detail } = this.evaluateCategory(cat, input);
      const capped = Math.min(score, cat.maxScore);
      totalScore += capped;
      breakdown.push({
        categoryCode: cat.categoryCode,
        categoryName: cat.categoryName,
        score: capped,
        maxScore: cat.maxScore,
        detail,
      });
    }

    // 감점 요인 (SOCIAL 카테고리에 포함될 수 있으나 별도 표시)
    // Deduction factors (may be included in SOCIAL category but displayed separately)
    if (input.hasCriminalRecord) {
      result.notes.push('범죄경력: 감점 적용');
    }
    if (input.hasImmigrationViolation) {
      result.notes.push('출입국법 위반: 감점 적용');
    }

    result.score = totalScore;
    result.scoreBreakdown = breakdown;

    const breakdownStr = breakdown
      .filter((b) => b.score > 0)
      .map((b) => `${b.categoryName}: ${b.score}점`)
      .join(', ');
    result.notes.push(`점수 내역: ${breakdownStr || '해당 없음'}`);

    if (totalScore >= 80) {
      result.eligible = true;
      result.notes.push(`${totalScore}점 ≥ 80점 — F-2-7 발급 가능`);
    } else {
      result.blockedReasons.push(
        `점수 ${totalScore}점 < 80점 (부족: ${80 - totalScore}점)`,
      );
      result.suggestions.push(
        'TOPIK 등급 향상, 사회통합프로그램 이수 등으로 추가 점수 확보 필요',
      );
    }

    result.matchedIndustries.push(input.ksicCode);
    return result;
  }

  /** 카테고리별 점수 계산 (DB criteria 기반) / Score per category (DB-driven) */
  private evaluateCategory(
    category: NonNullable<VisaTypeWithRelations['pointCategories']>[number],
    input: EvaluateVisaInput,
  ): { score: number; detail: string } {
    switch (category.categoryCode) {
      case 'AGE':
        return this.evaluateRangeCriteria(category.criteria, input.age);
      case 'EDUCATION':
        return this.evaluateMatchCriteria(
          category.criteria,
          input.educationLevel,
        );
      case 'KOREAN':
        return this.evaluateKoreanLevel(category.criteria, input);
      case 'INCOME':
        return this.evaluateRangeCriteria(
          category.criteria,
          input.incomeGniPercent,
        );
      case 'SOCIAL':
        return this.evaluateSocialPoints(category.criteria, input);
      default:
        return { score: 0, detail: '해당 없음' };
    }
  }

  /** 범위 기반 기준 (나이, 소득) / Range-based criteria (age, income) */
  private evaluateRangeCriteria(
    criteria: NonNullable<
      VisaTypeWithRelations['pointCategories']
    >[number]['criteria'],
    value: number | undefined,
  ): { score: number; detail: string } {
    if (value === undefined) return { score: 0, detail: '정보 미입력' };
    for (const c of criteria) {
      const min = c.minValue ?? -Infinity;
      const max = c.maxValue ?? Infinity;
      if (value >= min && value <= max) {
        return { score: c.score, detail: `${c.criteriaName} → ${c.score}점` };
      }
    }
    return { score: 0, detail: '해당 구간 없음' };
  }

  /** 매칭 기반 기준 (학력) / Match-based criteria (education) */
  private evaluateMatchCriteria(
    criteria: NonNullable<
      VisaTypeWithRelations['pointCategories']
    >[number]['criteria'],
    value: string | undefined,
  ): { score: number; detail: string } {
    if (!value) return { score: 0, detail: '정보 미입력' };
    const match = criteria.find((c) => c.matchValue === value);
    if (match) {
      return {
        score: match.score,
        detail: `${match.criteriaName} → ${match.score}점`,
      };
    }
    return { score: 0, detail: '해당 기준 없음' };
  }

  /** 한국어능력 (TOPIK + KIIP) / Korean proficiency (TOPIK + KIIP) */
  private evaluateKoreanLevel(
    criteria: NonNullable<
      VisaTypeWithRelations['pointCategories']
    >[number]['criteria'],
    input: EvaluateVisaInput,
  ): { score: number; detail: string } {
    const results: { score: number; detail: string }[] = [];

    if (input.koreanLevel) {
      const topik = criteria.find((c) => c.matchValue === input.koreanLevel);
      if (topik)
        results.push({
          score: topik.score,
          detail: `${topik.criteriaName} → ${topik.score}점`,
        });
    }
    if (input.socialIntegrationLevel) {
      const kiip = criteria.find(
        (c) => c.matchValue === `KIIP${input.socialIntegrationLevel}`,
      );
      if (kiip)
        results.push({
          score: kiip.score,
          detail: `${kiip.criteriaName} → ${kiip.score}점`,
        });
    }

    if (results.length === 0)
      return { score: 0, detail: '한국어능력 정보 미입력' };
    return results.reduce((a, b) => (a.score >= b.score ? a : b));
  }

  /** 사회통합 가산점 (복수 항목 합산) / Social integration bonus (sum multiple items) */
  private evaluateSocialPoints(
    criteria: NonNullable<
      VisaTypeWithRelations['pointCategories']
    >[number]['criteria'],
    input: EvaluateVisaInput,
  ): { score: number; detail: string } {
    let total = 0;
    const details: string[] = [];

    const check = (matchValue: string, condition: boolean) => {
      if (!condition) return;
      const c = criteria.find((cr) => cr.matchValue === matchValue);
      if (c) {
        total += c.score;
        details.push(
          `${c.criteriaName}: ${c.score > 0 ? '+' : ''}${c.score}점`,
        );
      }
    };

    if (input.volunteerHours && input.volunteerHours >= 40)
      check('VOLUNTEER_40H', true);
    else if (input.volunteerHours && input.volunteerHours >= 20)
      check('VOLUNTEER_20H', true);

    check('KR_CHILD', input.hasKoreanChild === true);
    check('GOV_RECOMMEND', input.hasRecommendation === true);
    check('PROPERTY', input.hasProperty === true);
    check('TAX_3Y', (input.taxYearsInKorea ?? 0) >= 3);
    check('NO_CRIME', input.hasCriminalRecord === false);
    check('HAS_CRIME', input.hasCriminalRecord === true);
    check('IMMIGRATION_VIOLATION', input.hasImmigrationViolation === true);

    return {
      score: total,
      detail: details.length > 0 ? details.join(', ') : '해당 없음',
    };
  }
}
