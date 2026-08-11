import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export const VISA_RULE_FIELDS = [
  'ksicCode',
  'companySizeType',
  'employeeCountKorean',
  'employeeCountForeign',
  'annualRevenue',
  'addressRoad',
  'jobType',
  'offeredSalary',
  'nationality',
  'age',
  'educationLevel',
  'koreanLevel',
  'workExperienceYears',
  'currentVisaCode',
  'targetOccupationCode',
  'hasRecommendation',
  'hasCriminalRecord',
  'annualIncome',
  'incomeGniPercent',
  'socialIntegrationLevel',
  'isEthnicKorean',
  'koreanAncestryCountry',
  'volunteerHours',
  'hasKoreanChild',
  'hasProperty',
  'taxYearsInKorea',
  'hasImmigrationViolation',
] as const;

export type VisaRuleField = (typeof VISA_RULE_FIELDS)[number];

interface VisaRuleClauseShape {
  field: VisaRuleField;
  op: string;
  value: unknown;
}

const NUMBER_FIELDS = new Set<VisaRuleField>([
  'employeeCountKorean',
  'employeeCountForeign',
  'annualRevenue',
  'offeredSalary',
  'age',
  'workExperienceYears',
  'annualIncome',
  'incomeGniPercent',
  'socialIntegrationLevel',
  'volunteerHours',
  'taxYearsInKorea',
]);
const BOOLEAN_FIELDS = new Set<VisaRuleField>([
  'hasRecommendation',
  'hasCriminalRecord',
  'isEthnicKorean',
  'hasKoreanChild',
  'hasProperty',
  'hasImmigrationViolation',
]);

/** 필드 자료형과 연산자·값의 호환성을 확인 / Validate field/operator/value compatibility */
@ValidatorConstraint({ name: 'visaRuleClauseCompatibility', async: false })
export class VisaRuleClauseCompatibilityConstraint
  implements ValidatorConstraintInterface
{
  validate(_value: unknown, args: ValidationArguments): boolean {
    const clause = args.object as VisaRuleClauseShape;
    if (NUMBER_FIELDS.has(clause.field)) {
      if (
        !['EQ', 'NEQ', 'GT', 'GTE', 'LT', 'LTE', 'IN', 'NOT_IN'].includes(
          clause.op,
        )
      )
        return false;
      if (['IN', 'NOT_IN'].includes(clause.op)) {
        return (
          Array.isArray(clause.value) &&
          clause.value.every((item) => typeof item === 'number')
        );
      }
      return typeof clause.value === 'number';
    }
    if (BOOLEAN_FIELDS.has(clause.field)) {
      return (
        ['EQ', 'NEQ'].includes(clause.op) && typeof clause.value === 'boolean'
      );
    }
    if (!['EQ', 'NEQ', 'IN', 'NOT_IN', 'CONTAINS'].includes(clause.op))
      return false;
    if (['IN', 'NOT_IN'].includes(clause.op)) {
      return (
        Array.isArray(clause.value) &&
        clause.value.every((item) => typeof item === 'string')
      );
    }
    return typeof clause.value === 'string';
  }

  defaultMessage(): string {
    return 'Rule operator/value is incompatible with the selected field type.';
  }
}
