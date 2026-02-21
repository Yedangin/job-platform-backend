import { BaseVisaEvaluator } from '../base.evaluator';
import {
  EvaluateVisaInput,
  VisaEvaluation,
  VisaTypeWithRelations,
} from '../evaluator.interface';

/**
 * D-2 유학 평가기 (시간제 취업)
 * D-2 Study Abroad Evaluator (part-time work)
 *
 * 알고리즘 (DB 기반) / Algorithm (DB-driven):
 * 1. 풀타임 불가
 * 2. 유흥/사행업종 금지 (DB: IndustryCode flags)
 * 3. TOPIK 레벨 확인 (권장)
 * 4. 근로시간 규칙 (DB: WorkHourRule — 학위, TOPIK, 인증대학별 차등)
 * 5. 체류자격외활동허가 필요
 */
export class D2Evaluator extends BaseVisaEvaluator {
  readonly visaCodes = [
    'D-2',
    'D-2-1',
    'D-2-2',
    'D-2-3',
    'D-2-4',
    'D-2-5',
    'D-2-6',
    'D-2-7',
    'D-2-8',
  ];

  evaluate(
    input: EvaluateVisaInput,
    visaType: VisaTypeWithRelations,
  ): VisaEvaluation {
    const result = this.createEmptyResult();
    result.documents = this.getRequiredDocuments(visaType.requiredDocuments);

    // DB에 서류가 없으면 기본값 / Default documents if DB empty
    if (result.documents.length === 0) {
      result.documents = ['시간제취업 허가서', '재학증명서', '여권 사본'];
    }

    // 1. 풀타임 불가 / Full-time not allowed
    if (input.jobType === 'FULL_TIME') {
      result.blockedReasons.push('D-2 유학비자는 풀타임 취업 불가 (학기 중)');
      result.suggestions.push('학기 중 시간제만 가능');
      result.suggestions.push(
        '방학 중에는 주당 근무시간 확대 가능 (출입국사무소 허가)',
      );
      result.suggestions.push('졸업 후 D-10(구직) 전환 후 E-7 취업 검토');
      return result;
    }

    // 2. 유흥/사행업종 금지 (DB: IndustryCode 플래그) / Entertainment/gambling blocked (DB flags)
    const flags = input.inputIndustryFlags;
    if (flags?.isEntertainment || flags?.isGambling) {
      result.blockedReasons.push(
        '유흥업소/사행업종은 D-2 시간제 취업 금지 업종',
      );
      return result;
    }

    // 3. 긱워크 금지 (배달/대리운전 등) / Gig work blocked (delivery/designated driving)
    if (flags?.isGigWork) {
      result.blockedReasons.push(
        '특수형태근로(배달/대리운전 등)는 D-2 비자 취업 금지',
      );
      return result;
    }

    // 4. TOPIK 레벨 확인 (권장) / TOPIK level check (recommended)
    const topik = this.topikToNumber(input.koreanLevel);
    if (topik > 0 && topik < 4) {
      result.notes.push(
        `TOPIK ${topik}급 - 시간제 취업 허가 심사 시 TOPIK 4급 이상 권장`,
      );
    }

    // 5. 근로시간 규칙 적용 (DB: WorkHourRule) / Work hour rules (from DB)
    const hourRules = visaType.workHourRules ?? [];
    const matchedRule = this.findMatchingHourRule(hourRules, input);
    if (matchedRule) {
      result.restrictions.push(
        `학기 중 주 ${matchedRule.weekdayHours}시간 이내`,
      );
      if (matchedRule.weekendHoliday === 'unlimited') {
        result.notes.push('주말/공휴일: 무제한');
      }
      if (matchedRule.vacation === 'unlimited') {
        result.notes.push('방학(여름/겨울) 중 무제한 근무 가능');
      }
    } else if (visaType.baseWeeklyHours) {
      // DB 규칙 없으면 VisaType 기본값 사용 / Fallback to VisaType base hours
      result.restrictions.push(
        `학기 중 주 ${visaType.baseWeeklyHours}시간 이내`,
      );
      result.notes.push('방학(여름/겨울) 중 확대 근무 가능 (별도 허가)');
    } else {
      result.restrictions.push('학기 중 주 20시간 이내');
    }

    result.eligible = true;
    result.matchedIndustries.push(input.ksicCode);
    result.restrictions.push('유흥업소 불가');
    result.restrictions.push('체류자격외활동허가 필수');

    return result;
  }

  /** 근로시간 규칙 매칭 (우선순위 높은 순) / Match work hour rule (priority descending) */
  private findMatchingHourRule(
    rules: NonNullable<VisaTypeWithRelations['workHourRules']>,
    input: EvaluateVisaInput,
  ) {
    const topik = this.topikToNumber(input.koreanLevel);

    for (const rule of rules) {
      // TOPIK 충족/미충족 분기 / TOPIK met/unmet branch
      if (
        rule.topikMet &&
        rule.topikLevel !== null &&
        topik < rule.topikLevel
      ) {
        continue; // TOPIK 미충족 → 이 충족 규칙 스킵 / TOPIK not met → skip this met-rule
      }
      if (
        !rule.topikMet &&
        rule.topikLevel !== null &&
        topik >= rule.topikLevel
      ) {
        continue; // TOPIK 충족했는데 미충족 규칙이면 스킵 / TOPIK met but unmet-rule → skip
      }
      // 학위 매칭 / Degree level matching
      if (rule.degreeLevel && input.educationLevel) {
        const ruleEdu = this.educationToNumber(rule.degreeLevel.toUpperCase());
        const inputEdu = this.educationToNumber(input.educationLevel);
        if (inputEdu !== ruleEdu) continue;
      }
      return rule; // 첫 매칭 반환 (우선순위 높은 순 정렬됨) / Return first match (sorted by priority)
    }
    return null;
  }
}
