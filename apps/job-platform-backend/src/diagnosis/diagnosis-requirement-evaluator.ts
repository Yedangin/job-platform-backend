import * as requirementCatalogData from '../data/diagnosis-requirements.json';

export type RequirementStatus =
  | 'met'
  | 'minimum_met'
  | 'unmet'
  | 'unknown'
  | 'not_applicable';

export type RequirementCategory =
  | 'age'
  | 'nationality'
  | 'education'
  | 'language'
  | 'funds'
  | 'experience'
  | 'admission'
  | 'employment'
  | 'documents'
  | 'insurance'
  | 'quota'
  | 'status'
  | 'investment'
  | 'points'
  | 'residence'
  | 'other';

export interface RequirementAssessment {
  id: string;
  stage: string;
  category: RequirementCategory;
  status: RequirementStatus;
  severity: 'required' | 'recommended' | 'variable';
  title: string;
  currentValue: string;
  requiredValue: string;
  explanation: string;
  action: string;
  sourceName: string;
  sourceUrl: string;
  sourceReviewedAt: string;
  shortfall?: string;
}

export interface RequirementSummary {
  met: number;
  minimumMet: number;
  unmet: number;
  unknown: number;
  notApplicable: number;
}

export type RequirementFitStatus =
  | 'MINIMUMS_CONFIRMED'
  | 'EVIDENCE_REQUIRED'
  | 'PREPARATION_REQUIRED'
  | 'NO_APPLICABLE_RULES';

export interface RequirementScore {
  score: number;
  completenessScore: number;
  status: RequirementFitStatus;
  requiredMet: number;
  requiredUnmet: number;
  requiredUnknown: number;
  applicableRuleCount: number;
}

export type RuleAutomationMode = 'automatic' | 'assisted' | 'manual';

export interface RequirementCatalogAudit {
  version: string;
  reviewedAt: string;
  pathwayCount: number;
  ruleCount: number;
  automaticCount: number;
  assistedCount: number;
  manualCount: number;
  automaticCoveragePercent: number;
  pathways: Array<{
    pathwayId: string;
    ruleCount: number;
    automaticCount: number;
    assistedCount: number;
    manualCount: number;
    automaticCoveragePercent: number;
  }>;
}

interface RequirementInput {
  nationality: string;
  residenceCountry?: string;
  age: number;
  educationLevel: string;
  availableAnnualFund: number;
  topikLevel?: number;
  kiipStage?: number;
  workExperienceYears?: number;
  isEthnicKorean?: boolean;
  currentVisa?: string;
  koreaStayMonths?: number;
}

interface NationalityFacts {
  epsCountry: boolean;
  whCountry: boolean;
}

interface CatalogRule {
  id: string;
  stage: string;
  category: RequirementCategory;
  severity: 'required' | 'recommended' | 'variable';
  evaluation: {
    type: string;
    field?: keyof RequirementInput;
    value?: number | string;
    values?: string[];
    topik?: number;
    kiip?: number;
  };
  titleKo: string;
  titleEn: string;
  requiredKo: string;
  requiredEn: string;
  explanationKo: string;
  explanationEn: string;
  actionKo: string;
  actionEn: string;
  sourceName: string;
  sourceUrl: string;
}

const catalog = requirementCatalogData as unknown as {
  version: string;
  reviewedAt: string;
  pathways: Record<string, CatalogRule[]>;
};

const educationLevels = [
  'none',
  'middle',
  'high_school',
  'associate',
  'bachelor',
  'master',
  'doctor',
];

const educationNames: Record<string, { ko: string; en: string }> = {
  none: { ko: '정규 학력 없음', en: 'No formal education' },
  middle: { ko: '중학교 이하', en: 'Middle school or below' },
  high_school: { ko: '고등학교 졸업', en: 'High school' },
  associate: { ko: '전문학사', en: 'Associate degree' },
  bachelor: { ko: '학사', en: 'Bachelor degree' },
  master: { ko: '석사', en: 'Master degree' },
  doctor: { ko: '박사', en: 'Doctoral degree' },
};

const epsSendingCountries = new Set([
  'BGD',
  'CHN',
  'IDN',
  'KHM',
  'KGZ',
  'LAO',
  'LKA',
  'MMR',
  'MNG',
  'NPL',
  'PAK',
  'PHL',
  'TJK',
  'THA',
  'TMP',
  'UZB',
  'VNM',
]);

// 2026/27 Working Holiday Info Center table. Japan's exceptional extension
// to age 30 is not auto-applied because it requires individual acceptance.
const h1AgeLimits: Record<string, { min: number; max: number }> = {
  AND: { min: 18, max: 30 },
  ARG: { min: 18, max: 34 },
  AUS: { min: 18, max: 30 },
  AUT: { min: 18, max: 30 },
  BEL: { min: 18, max: 30 },
  BRA: { min: 18, max: 34 },
  CAN: { min: 18, max: 35 },
  CHL: { min: 18, max: 34 },
  CZE: { min: 18, max: 30 },
  DNK: { min: 18, max: 34 },
  FIN: { min: 18, max: 35 },
  FRA: { min: 18, max: 30 },
  DEU: { min: 18, max: 34 },
  HKG: { min: 18, max: 30 },
  HUN: { min: 18, max: 30 },
  IRL: { min: 18, max: 34 },
  ISR: { min: 18, max: 30 },
  ITA: { min: 18, max: 30 },
  JPN: { min: 18, max: 25 },
  LVA: { min: 18, max: 34 },
  LUX: { min: 18, max: 35 },
  NLD: { min: 18, max: 30 },
  NZL: { min: 18, max: 30 },
  POL: { min: 18, max: 30 },
  PRT: { min: 18, max: 34 },
  ESP: { min: 18, max: 30 },
  SWE: { min: 18, max: 30 },
  TWN: { min: 18, max: 34 },
  GBR: { min: 18, max: 35 },
  USA: { min: 18, max: 30 },
};

function isKorean(language: string) {
  return language === 'ko';
}

function formatFund(value: number, language: string) {
  const won = value * 10_000;
  return isKorean(language)
    ? `${won.toLocaleString('ko-KR')}원`
    : `KRW ${won.toLocaleString('en-US')}`;
}

function currentEducation(input: RequirementInput, language: string) {
  const names = educationNames[input.educationLevel];
  return names
    ? isKorean(language)
      ? names.ko
      : names.en
    : input.educationLevel;
}

function unknownCurrent(language: string) {
  return isKorean(language) ? '아직 입력·확인되지 않음' : 'Not entered or verified';
}

function evaluateRule(
  rule: CatalogRule,
  input: RequirementInput,
  nationality: NationalityFacts | null,
  language: string,
): Pick<RequirementAssessment, 'status' | 'currentValue' | 'shortfall'> {
  const type = rule.evaluation.type;

  if (type === 'manual') {
    return { status: 'unknown', currentValue: unknownCurrent(language) };
  }
  if (type === 'not_applicable') {
    const level = input.topikLevel ?? 0;
    return {
      status: 'not_applicable',
      currentValue: isKorean(language)
        ? `TOPIK ${level}급 - 공통 필수 커트라인 아님`
        : `TOPIK ${level} - no universal cutoff`,
    };
  }
  if (type === 'route_closed') {
    return {
      status: 'unmet',
      currentValue: isKorean(language)
        ? '신규 신청 경로 종료'
        : 'Closed to new applications',
    };
  }
  if (type === 'min_education') {
    const required = String(rule.evaluation.value);
    const actualIndex = educationLevels.indexOf(input.educationLevel);
    const requiredIndex = educationLevels.indexOf(required);
    const status =
      actualIndex < requiredIndex
        ? 'unmet'
        : actualIndex === requiredIndex
          ? 'minimum_met'
          : 'met';
    const levelsShort = Math.max(0, requiredIndex - actualIndex);
    return {
      status,
      currentValue: currentEducation(input, language),
      shortfall:
        levelsShort > 0
          ? isKorean(language)
            ? `${educationNames[required]?.ko ?? required}까지 ${levelsShort}단계 부족`
            : `${levelsShort} education level(s) below ${educationNames[required]?.en ?? required}`
          : undefined,
    };
  }
  if (type === 'min_topik') {
    const current = input.topikLevel ?? 0;
    const minimum = Number(rule.evaluation.value);
    return {
      status:
        current < minimum
          ? 'unmet'
          : current === minimum
            ? 'minimum_met'
            : 'met',
      currentValue: `TOPIK ${current}`,
      shortfall:
        current < minimum
          ? isKorean(language)
            ? `최소 TOPIK ${minimum}급까지 ${minimum - current}단계 부족`
            : `${minimum - current} TOPIK level(s) short`
          : undefined,
    };
  }
  if (type === 'min_topik_or_kiip') {
    const topik = input.topikLevel ?? 0;
    const kiip = input.kiipStage ?? 0;
    const topikMinimum = Number(rule.evaluation.topik);
    const kiipMinimum = Number(rule.evaluation.kiip);
    const topikMet = topik >= topikMinimum;
    const kiipMet = kiip >= kiipMinimum;
    const exactlyMet = topik === topikMinimum || kiip === kiipMinimum;
    return {
      status: topikMet || kiipMet ? (exactlyMet ? 'minimum_met' : 'met') : 'unmet',
      currentValue: `TOPIK ${topik} / KIIP ${kiip}`,
      shortfall:
        topikMet || kiipMet
          ? undefined
          : isKorean(language)
            ? `TOPIK ${topikMinimum}급까지 ${topikMinimum - topik}단계 또는 KIIP ${kiipMinimum}단계까지 ${kiipMinimum - kiip}단계 부족`
            : `Need ${topikMinimum - topik} more TOPIK level(s) or ${kiipMinimum - kiip} KIIP stage(s)`,
    };
  }
  if (type === 'min_fund') {
    const current = input.availableAnnualFund;
    const minimum = Number(rule.evaluation.value);
    return {
      status:
        current < minimum
          ? 'unmet'
          : current === minimum
            ? 'minimum_met'
            : 'met',
      currentValue: formatFund(current, language),
      shortfall:
        current < minimum
          ? isKorean(language)
            ? `${formatFund(minimum - current, language)} 부족`
            : `${formatFund(minimum - current, language)} short`
          : undefined,
    };
  }
  if (type === 'study_funds_variable') {
    return {
      status: 'unknown',
      currentValue: formatFund(input.availableAnnualFund, language),
    };
  }
  if (type === 'd2_funds') {
    const current = input.availableAnnualFund;
    const lowestPublishedBase = 1600;
    return {
      status: current < lowestPublishedBase ? 'unmet' : 'unknown',
      currentValue: formatFund(current, language),
      shortfall:
        current < lowestPublishedBase
          ? isKorean(language)
            ? `비수도권 공개 기본선까지 ${formatFund(lowestPublishedBase - current, language)} 부족`
            : `${formatFund(lowestPublishedBase - current, language)} short of the published non-capital base`
          : undefined,
    };
  }
  if (type === 'max_number') {
    const current = Number(input[rule.evaluation.field ?? 'age']);
    const maximum = Number(rule.evaluation.value);
    return {
      status: current <= maximum ? 'met' : 'unmet',
      currentValue: isKorean(language) ? `만 ${current}세` : `Age ${current}`,
      shortfall:
        current > maximum
          ? isKorean(language)
            ? `상한보다 ${current - maximum}세 초과`
            : `${current - maximum} year(s) above the maximum`
          : undefined,
    };
  }
  if (type === 'eps_eligibility') {
    if (!epsSendingCountries.has(input.nationality)) {
      return {
        status: 'unmet',
        currentValue: isKorean(language)
          ? `${input.nationality} - EPS 송출국으로 확인되지 않음`
          : `${input.nationality} - not identified as an EPS sending country`,
      };
    }
    const maximum = 39;
    const inRange = input.age >= 18 && input.age <= maximum;
    return {
      status: inRange ? 'met' : 'unmet',
      currentValue: isKorean(language)
        ? `${input.nationality}, 만 ${input.age}세`
        : `${input.nationality}, age ${input.age}`,
      shortfall: inRange
        ? undefined
        : isKorean(language)
          ? `지원 연령 18~${maximum}세 범위 밖`
          : `Outside the age range 18-${maximum}`,
    };
  }
  if (type === 'h1_eligibility') {
    const limit = h1AgeLimits[input.nationality];
    if (!limit) {
      return {
        status: 'unmet',
        currentValue: isKorean(language)
          ? `${input.nationality} - 2026/27 협정 대상 확인 불가`
          : `${input.nationality} - not in the 2026/27 partner table`,
      };
    }
    const inRange = input.age >= limit.min && input.age <= limit.max;
    return {
      status: inRange ? 'met' : 'unmet',
      currentValue: isKorean(language)
        ? `${input.nationality}, 만 ${input.age}세`
        : `${input.nationality}, age ${input.age}`,
      shortfall: inRange
        ? undefined
        : isKorean(language)
          ? `국적별 연령 ${limit.min}~${limit.max}세 범위 밖`
          : `Outside the nationality-specific age range ${limit.min}-${limit.max}`,
    };
  }
  if (type === 'min_korea_stay') {
    const current = input.koreaStayMonths;
    const minimum = Number(rule.evaluation.value);
    if (current === undefined || current === null) {
      return { status: 'unknown', currentValue: unknownCurrent(language) };
    }
    return {
      status:
        current < minimum
          ? 'unmet'
          : current === minimum
            ? 'minimum_met'
            : 'met',
      currentValue: isKorean(language) ? `${current}개월` : `${current} months`,
      shortfall:
        current < minimum
          ? isKorean(language)
            ? `${minimum - current}개월 부족`
            : `${minimum - current} months short`
          : undefined,
    };
  }
  if (type === 'current_visa_in') {
    if (!input.currentVisa) {
      return { status: 'unknown', currentValue: unknownCurrent(language) };
    }
    const current = input.currentVisa.toUpperCase();
    const allowed = rule.evaluation.values ?? [];
    const matched = allowed.some((value) => current.startsWith(value));
    return { status: matched ? 'met' : 'unmet', currentValue: current };
  }
  if (type === 'current_visa_present') {
    return input.currentVisa
      ? { status: 'unknown', currentValue: input.currentVisa.toUpperCase() }
      : { status: 'unknown', currentValue: unknownCurrent(language) };
  }
  if (type === 'e7_qualification') {
    const educationIndex = educationLevels.indexOf(input.educationLevel);
    const years = input.workExperienceYears ?? 0;
    const bachelorIndex = educationLevels.indexOf('bachelor');
    const masterIndex = educationLevels.indexOf('master');
    const meets =
      educationIndex >= masterIndex ||
      (educationIndex >= bachelorIndex && years >= 1) ||
      years >= 5;
    return {
      status: meets ? 'unknown' : 'unmet',
      currentValue: isKorean(language)
        ? `${currentEducation(input, language)}, 관련 경력 입력 ${years}년`
        : `${currentEducation(input, language)}, ${years} entered experience year(s)`,
      shortfall:
        !meets && educationIndex < bachelorIndex
          ? isKorean(language)
            ? `관련 경력 5년 경로 기준 ${Math.max(0, 5 - years)}년 부족`
            : `${Math.max(0, 5 - years)} year(s) short of the 5-year experience route`
          : undefined,
    };
  }
  if (type === 'ethnic_korean') {
    if (!input.isEthnicKorean) {
      return {
        status: 'unmet',
        currentValue: isKorean(language)
          ? '재외동포 관계 없음으로 입력'
          : 'No overseas Korean relationship entered',
      };
    }
    return {
      status: 'unknown',
      currentValue: isKorean(language)
        ? '재외동포 가능성 체크 - 서류 미검증'
        : 'Possible overseas Korean relationship - documents unverified',
    };
  }

  return { status: 'unknown', currentValue: unknownCurrent(language) };
}

export function getRequirementCatalogVersion() {
  return catalog.version;
}

function getRuleAutomationMode(rule: CatalogRule): RuleAutomationMode {
  if (rule.evaluation.type === 'manual') return 'manual';
  if (
    [
      'study_funds_variable',
      'd2_funds',
      'current_visa_present',
      'e7_qualification',
      'ethnic_korean',
    ].includes(rule.evaluation.type)
  ) {
    return 'assisted';
  }
  return 'automatic';
}

export function getRequirementCatalogAudit(): RequirementCatalogAudit {
  const pathways = Object.entries(catalog.pathways).map(
    ([pathwayId, rules]) => {
      const modes = rules.map(getRuleAutomationMode);
      const automaticCount = modes.filter(
        (mode) => mode === 'automatic',
      ).length;
      const assistedCount = modes.filter((mode) => mode === 'assisted').length;
      const manualCount = modes.filter((mode) => mode === 'manual').length;
      return {
        pathwayId,
        ruleCount: rules.length,
        automaticCount,
        assistedCount,
        manualCount,
        automaticCoveragePercent:
          rules.length === 0
            ? 0
            : Math.round((automaticCount / rules.length) * 100),
      };
    },
  );
  const ruleCount = pathways.reduce((sum, item) => sum + item.ruleCount, 0);
  const automaticCount = pathways.reduce(
    (sum, item) => sum + item.automaticCount,
    0,
  );
  const assistedCount = pathways.reduce(
    (sum, item) => sum + item.assistedCount,
    0,
  );
  const manualCount = pathways.reduce(
    (sum, item) => sum + item.manualCount,
    0,
  );

  return {
    version: catalog.version,
    reviewedAt: catalog.reviewedAt,
    pathwayCount: pathways.length,
    ruleCount,
    automaticCount,
    assistedCount,
    manualCount,
    automaticCoveragePercent:
      ruleCount === 0 ? 0 : Math.round((automaticCount / ruleCount) * 100),
    pathways,
  };
}

export function getH1AgeLimit(nationality: string) {
  return h1AgeLimits[nationality] ?? null;
}

export function isEpsSendingCountry(nationality: string) {
  return epsSendingCountries.has(nationality);
}

export function assessPathwayRequirements(
  pathwayId: string,
  input: RequirementInput,
  nationality: NationalityFacts | null,
  language: string,
): RequirementAssessment[] {
  return (catalog.pathways[pathwayId] ?? []).map((rule) => {
    const evaluated = evaluateRule(rule, input, nationality, language);
    return {
      id: rule.id,
      stage: rule.stage,
      category: rule.category,
      status: evaluated.status,
      severity: rule.severity,
      title: isKorean(language) ? rule.titleKo : rule.titleEn,
      currentValue: evaluated.currentValue,
      requiredValue: isKorean(language) ? rule.requiredKo : rule.requiredEn,
      explanation: isKorean(language)
        ? rule.explanationKo
        : rule.explanationEn,
      action: isKorean(language) ? rule.actionKo : rule.actionEn,
      sourceName: rule.sourceName,
      sourceUrl: rule.sourceUrl,
      sourceReviewedAt: catalog.reviewedAt,
      shortfall: evaluated.shortfall,
    };
  });
}

export function summarizeRequirements(
  assessments: RequirementAssessment[],
): RequirementSummary {
  return assessments.reduce<RequirementSummary>(
    (summary, item) => {
      if (item.status === 'minimum_met') summary.minimumMet += 1;
      else if (item.status === 'not_applicable') summary.notApplicable += 1;
      else summary[item.status] += 1;
      return summary;
    },
    { met: 0, minimumMet: 0, unmet: 0, unknown: 0, notApplicable: 0 },
  );
}

/**
 * A conservative preparation score, not a visa approval probability.
 * Unknown rules receive no match points so missing evidence cannot improve rank.
 */
export function scoreRequirements(
  assessments: RequirementAssessment[],
): RequirementScore {
  const applicable = assessments.filter(
    (item) => item.status !== 'not_applicable',
  );
  const severityWeight = {
    required: 3,
    variable: 2,
    recommended: 1,
  } as const;
  const totalWeight = applicable.reduce(
    (sum, item) => sum + severityWeight[item.severity],
    0,
  );
  const matchedWeight = applicable.reduce(
    (sum, item) =>
      sum +
      (item.status === 'met' || item.status === 'minimum_met'
        ? severityWeight[item.severity]
        : 0),
    0,
  );
  const knownWeight = applicable.reduce(
    (sum, item) =>
      sum +
      (item.status === 'unknown' ? 0 : severityWeight[item.severity]),
    0,
  );
  const required = applicable.filter((item) => item.severity === 'required');
  const requiredMet = required.filter(
    (item) => item.status === 'met' || item.status === 'minimum_met',
  ).length;
  const requiredUnmet = required.filter(
    (item) => item.status === 'unmet',
  ).length;
  const requiredUnknown = required.filter(
    (item) => item.status === 'unknown',
  ).length;
  const preparationGapCount = applicable.filter(
    (item) => item.severity !== 'recommended' && item.status === 'unmet',
  ).length;
  const status: RequirementFitStatus =
    totalWeight === 0
      ? 'NO_APPLICABLE_RULES'
      : preparationGapCount > 0
        ? 'PREPARATION_REQUIRED'
        : requiredUnknown > 0
          ? 'EVIDENCE_REQUIRED'
          : 'MINIMUMS_CONFIRMED';

  return {
    score: totalWeight === 0 ? 0 : Math.round((matchedWeight / totalWeight) * 100),
    completenessScore:
      totalWeight === 0 ? 0 : Math.round((knownWeight / totalWeight) * 100),
    status,
    requiredMet,
    requiredUnmet,
    requiredUnknown,
    applicableRuleCount: applicable.length,
  };
}
