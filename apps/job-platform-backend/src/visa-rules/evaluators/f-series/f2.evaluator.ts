import { BaseVisaEvaluator } from '../base.evaluator';
import { EvaluateVisaInput, VisaEvaluation, VisaTypeWithRelations } from '../evaluator.interface';

/**
 * F-2 거주 비자 평가기
 *
 * F-2 거주 = 자유취업 가능
 * F-2-7 점수제 = 120점 중 80점 이상 시 발급
 *
 * 점수 카테고리 (DB에서 로드):
 * - 나이 (25점)
 * - 학력 (35점)
 * - 한국어능력 (20점)
 * - 소득 (25점)
 * - 사회통합 가산점 (15점)
 *
 * 점수 계산은 PointCalculatorService에서 수행
 * 이 evaluator는 기본 적격 여부만 판단
 */
export class F2Evaluator extends BaseVisaEvaluator {
  readonly visaCodes = ['F-2', 'F-2-1', 'F-2-7', 'F-2-99'];

  evaluate(input: EvaluateVisaInput, visaType: VisaTypeWithRelations): VisaEvaluation {
    const result = this.createEmptyResult();
    result.documents = this.getRequiredDocuments(visaType.requiredDocuments);

    const code = visaType.code;

    if (code === 'F-2-7') {
      return this.evaluateF27(input, visaType, result);
    }

    // F-2 일반: 자유 취업 가능
    result.eligible = true;
    result.notes.push('F-2 거주비자 소지자는 업종 제한 없이 자유 취업 가능');
    result.matchedIndustries.push(input.ksicCode);
    return result;
  }

  /** F-2-7 점수제 평가 (기본 판정 - 상세 점수는 PointCalculatorService에서) */
  private evaluateF27(
    input: EvaluateVisaInput,
    visaType: VisaTypeWithRelations,
    result: VisaEvaluation,
  ): VisaEvaluation {
    result.requiredScore = 80;
    result.notes.push('F-2-7 점수제 거주비자 (120점 만점, 80점 이상 시 발급)');

    // 간이 점수 추정 (PointCalculatorService 미연동 시 fallback)
    let estimatedScore = 0;
    const breakdown: string[] = [];

    // 나이 점수
    if (input.age !== undefined) {
      let ageScore = 5;
      if (input.age >= 18 && input.age <= 24) ageScore = 25;
      else if (input.age <= 29) ageScore = 20;
      else if (input.age <= 34) ageScore = 15;
      else if (input.age <= 39) ageScore = 10;
      else if (input.age <= 44) ageScore = 7;
      estimatedScore += ageScore;
      breakdown.push(`나이(${input.age}세): ${ageScore}점`);
    }

    // 학력 점수
    const eduScoreMap: Record<string, number> = {
      DOCTOR: 35, MASTER: 30, BACHELOR: 25, COLLEGE: 15, HIGH_SCHOOL: 10,
    };
    const eduScore = eduScoreMap[input.educationLevel ?? ''] ?? 0;
    estimatedScore += eduScore;
    if (eduScore > 0) breakdown.push(`학력: ${eduScore}점`);

    // 한국어 점수
    const topikScoreMap: Record<string, number> = {
      TOPIK6: 20, TOPIK5: 16, TOPIK4: 12, TOPIK3: 8, TOPIK2: 4,
    };
    const korScore = topikScoreMap[input.koreanLevel ?? ''] ?? 0;
    estimatedScore += korScore;
    if (korScore > 0) breakdown.push(`한국어(${input.koreanLevel}): ${korScore}점`);

    // 소득 점수
    if (input.incomeGniPercent !== undefined) {
      let incScore = 0;
      if (input.incomeGniPercent >= 300) incScore = 25;
      else if (input.incomeGniPercent >= 200) incScore = 20;
      else if (input.incomeGniPercent >= 150) incScore = 15;
      else if (input.incomeGniPercent >= 100) incScore = 10;
      else if (input.incomeGniPercent >= 80) incScore = 5;
      estimatedScore += incScore;
      breakdown.push(`소득(GNI ${input.incomeGniPercent}%): ${incScore}점`);
    }

    result.score = estimatedScore;
    result.notes.push(`예상 점수: ${estimatedScore}점 / 120점 (상세 계산은 서버측 수행)`);
    result.notes.push(`점수 내역: ${breakdown.join(', ')}`);

    if (estimatedScore >= 80) {
      result.eligible = true;
      result.notes.push('80점 이상 - F-2-7 발급 가능 (예상)');
    } else {
      result.blockedReasons.push(`예상 점수 ${estimatedScore}점 < 80점 (부족: ${80 - estimatedScore}점)`);
      result.suggestions.push('TOPIK 등급 향상, 사회통합프로그램 이수 등으로 추가 점수 확보 필요');
    }

    // 감점 요인
    if (input.hasCriminalRecord) {
      result.notes.push('범죄경력: -5점 감점 적용');
      result.score! -= 5;
    }
    if (input.hasImmigrationViolation) {
      result.notes.push('출입국법 위반: -10점 감점 적용');
      result.score! -= 10;
    }

    result.matchedIndustries.push(input.ksicCode);
    return result;
  }
}
