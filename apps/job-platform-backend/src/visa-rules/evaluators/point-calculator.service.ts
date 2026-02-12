import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from '../../../../../libs/common/src';
import { EvaluateVisaInput, ScoreBreakdown } from './evaluator.interface';

interface PointResult {
  totalScore: number;
  requiredScore: number;
  passed: boolean;
  breakdown: ScoreBreakdown[];
}

/**
 * 점수제 비자 점수 계산 서비스 (F-2-7, E-7-4 등)
 * DB에서 점수 기준을 로드하여 동적으로 계산
 */
@Injectable()
export class PointCalculatorService {
  constructor(private readonly prisma: AuthPrismaService) {}

  /** 점수제 비자의 점수를 계산 */
  async calculateScore(visaTypeId: bigint, input: EvaluateVisaInput): Promise<PointResult> {
    // DB에서 카테고리 및 기준 로드
    const categories = await this.prisma.pointSystemCategory.findMany({
      where: { visaTypeId },
      include: { criteria: { orderBy: { sortOrder: 'asc' } } },
      orderBy: { sortOrder: 'asc' },
    });

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

    // 필요 점수는 metadata에서 추출 (기본 80점)
    const requiredScore = 80;

    return {
      totalScore,
      requiredScore,
      passed: totalScore >= requiredScore,
      breakdown,
    };
  }

  /** 카테고리별 점수 계산 */
  private evaluateCategory(
    category: {
      categoryCode: string;
      criteria: Array<{
        criteriaName: string;
        minValue: number | null;
        maxValue: number | null;
        matchValue: string | null;
        score: number;
      }>;
    },
    input: EvaluateVisaInput,
  ): { score: number; detail: string } {
    switch (category.categoryCode) {
      case 'AGE':
        return this.evaluateRangeCriteria(category.criteria, input.age, '세');
      case 'EDUCATION':
        return this.evaluateMatchCriteria(category.criteria, input.educationLevel);
      case 'KOREAN':
        return this.evaluateKoreanLevel(category.criteria, input);
      case 'INCOME':
        return this.evaluateRangeCriteria(category.criteria, input.incomeGniPercent, '%');
      case 'SOCIAL':
        return this.evaluateSocialPoints(category.criteria, input);
      default:
        return { score: 0, detail: '해당 없음' };
    }
  }

  /** 범위 기반 기준 평가 (나이, 소득) */
  private evaluateRangeCriteria(
    criteria: Array<{ criteriaName: string; minValue: number | null; maxValue: number | null; score: number }>,
    value: number | undefined,
    unit: string,
  ): { score: number; detail: string } {
    if (value === undefined) return { score: 0, detail: '정보 미입력' };

    for (const c of criteria) {
      const min = c.minValue ?? -Infinity;
      const max = c.maxValue ?? Infinity;
      if (value >= min && value <= max) {
        return { score: c.score, detail: `${c.criteriaName} → ${c.score}점` };
      }
    }
    return { score: 0, detail: `${value}${unit} - 해당 구간 없음` };
  }

  /** 매칭 기반 기준 평가 (학력) */
  private evaluateMatchCriteria(
    criteria: Array<{ criteriaName: string; matchValue: string | null; score: number }>,
    value: string | undefined,
  ): { score: number; detail: string } {
    if (!value) return { score: 0, detail: '정보 미입력' };

    const match = criteria.find(c => c.matchValue === value);
    if (match) {
      return { score: match.score, detail: `${match.criteriaName} → ${match.score}점` };
    }
    return { score: 0, detail: `${value} - 해당 기준 없음` };
  }

  /** 한국어능력 평가 (TOPIK or KIIP) */
  private evaluateKoreanLevel(
    criteria: Array<{ criteriaName: string; matchValue: string | null; score: number }>,
    input: EvaluateVisaInput,
  ): { score: number; detail: string } {
    // KIIP와 TOPIK 모두 확인하고 더 높은 점수 적용
    const results: { score: number; detail: string }[] = [];

    if (input.koreanLevel) {
      const topik = criteria.find(c => c.matchValue === input.koreanLevel);
      if (topik) results.push({ score: topik.score, detail: `${topik.criteriaName} → ${topik.score}점` });
    }

    if (input.socialIntegrationLevel) {
      const kiip = criteria.find(c => c.matchValue === `KIIP${input.socialIntegrationLevel}`);
      if (kiip) results.push({ score: kiip.score, detail: `${kiip.criteriaName} → ${kiip.score}점` });
    }

    if (results.length === 0) return { score: 0, detail: '한국어능력 정보 미입력' };
    return results.reduce((a, b) => a.score >= b.score ? a : b);
  }

  /** 사회통합 가산점 평가 (복수 항목 합산) */
  private evaluateSocialPoints(
    criteria: Array<{ criteriaName: string; matchValue: string | null; score: number }>,
    input: EvaluateVisaInput,
  ): { score: number; detail: string } {
    let total = 0;
    const details: string[] = [];

    const check = (matchValue: string, condition: boolean) => {
      if (!condition) return;
      const c = criteria.find(cr => cr.matchValue === matchValue);
      if (c) {
        total += c.score;
        details.push(`${c.criteriaName}: ${c.score > 0 ? '+' : ''}${c.score}점`);
      }
    };

    // 자원봉사
    if (input.volunteerHours && input.volunteerHours >= 40) {
      check('VOLUNTEER_40H', true);
    } else if (input.volunteerHours && input.volunteerHours >= 20) {
      check('VOLUNTEER_20H', true);
    }

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
