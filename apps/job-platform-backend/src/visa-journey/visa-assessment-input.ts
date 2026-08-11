import { EvaluateVisaInput } from '../visa-rules/rule-engine.service';
import { CreateVisaAssessmentDto } from './dto';
import {
  DECISION_SNAPSHOT_FIELDS,
  REQUIRED_ENGINE_INPUTS,
} from './visa-journey.constants';
import {
  JourneyRequirement,
  SanitizedDecisionInput,
} from './visa-journey.types';

export function findMissingAssessmentInputs(dto: CreateVisaAssessmentDto) {
  return REQUIRED_ENGINE_INPUTS.filter((field) => dto[field] === undefined);
}

/** 허용 필드만 감사 스냅숏으로 보존 / Keep only allowlisted audit fields */
export function sanitizeAssessmentInput(
  dto: CreateVisaAssessmentDto,
): SanitizedDecisionInput {
  const snapshot: SanitizedDecisionInput = {};
  for (const field of DECISION_SNAPSHOT_FIELDS) {
    const value = dto[field];
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      snapshot[field] = value;
    }
  }
  return snapshot;
}

export function toLegacyEngineInput(
  dto: CreateVisaAssessmentDto,
): EvaluateVisaInput {
  return {
    ksicCode: dto.ksicCode!,
    companySizeType: dto.companySizeType!,
    employeeCountKorean: dto.employeeCountKorean!,
    employeeCountForeign: dto.employeeCountForeign!,
    annualRevenue: dto.annualRevenue!,
    addressRoad: dto.addressRoad!,
    jobType: dto.jobType!,
    offeredSalary: dto.offeredSalary!,
    nationality: dto.nationality,
    age: dto.age,
    educationLevel: dto.educationLevel,
    koreanLevel: dto.koreanLevel,
    workExperienceYears: dto.workExperienceYears,
    currentVisaCode: dto.currentVisaCode,
    targetOccupationCode: dto.targetOccupationCode,
    hasRecommendation: dto.hasRecommendation,
    hasCriminalRecord: dto.hasCriminalRecord,
    annualIncome: dto.annualIncome,
    incomeGniPercent: dto.incomeGniPercent,
    socialIntegrationLevel: dto.socialIntegrationLevel,
    isEthnicKorean: dto.isEthnicKorean,
    koreanAncestryCountry: dto.koreanAncestryCountry,
    volunteerHours: dto.volunteerHours,
    hasKoreanChild: dto.hasKoreanChild,
    hasProperty: dto.hasProperty,
    taxYearsInKorea: dto.taxYearsInKorea,
    hasImmigrationViolation: dto.hasImmigrationViolation,
  };
}

export function toJourneyRequirements(result: {
  blockedReasons: string[];
  restrictions: string[];
}): JourneyRequirement[] {
  const blocked = result.blockedReasons.map((message, index) => ({
    code: `BLOCKED_${index + 1}`,
    status: 'NOT_SATISFIED' as const,
    message,
  }));
  const conditional = result.restrictions.map((message, index) => ({
    code: `CONDITION_${index + 1}`,
    status: 'CONDITIONAL' as const,
    message,
  }));
  return [...blocked, ...conditional];
}
