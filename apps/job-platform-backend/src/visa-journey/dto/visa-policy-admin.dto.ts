import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsDefined,
  IsIn,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  Min,
  ValidateNested,
  Validate,
} from 'class-validator';
import {
  VISA_RULE_FIELDS,
  VisaRuleClauseCompatibilityConstraint,
  VisaRuleField,
} from './visa-rule-clause.validator';

export class VisaSourceCitationDto {
  @ApiProperty() @IsString() @Length(1, 240) title: string;
  @ApiProperty() @IsUrl({ require_protocol: true }) url: string;
  @ApiProperty() @IsString() @Length(1, 500) clause: string;
  @ApiProperty() @IsDateString() effectiveFrom: string;
}

export class CreateVisaPolicyReleaseDto {
  @ApiProperty() @IsString() @Length(1, 160) name: string;
  @ApiProperty({ example: '2026.08.1' })
  @IsString()
  @Length(1, 50)
  version: string;
  @ApiProperty() @IsString() @Length(32, 128) contentHash: string;
  @ApiProperty() @IsDateString() effectiveFrom: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() effectiveTo?: string;
  @ApiProperty() @IsString() @Length(3, 2000) reason: string;
}

export class UpdateVisaPolicyReleaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 160)
  name?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(32, 128)
  contentHash?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() effectiveFrom?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() effectiveTo?: string;
  @ApiProperty() @IsString() @Length(3, 2000) reason: string;
}

export class VisaPolicyReasonDto {
  @ApiProperty() @IsString() @Length(3, 2000) reason: string;
}

export class RollbackVisaPolicyDto extends VisaPolicyReasonDto {
  @ApiProperty() @IsString() targetReleaseId: string;
}

export class VisaPathwayDefinitionItemDto {
  @ApiProperty() @IsString() @Length(1, 100) code: string;
  @ApiProperty() @IsString() @Length(1, 240) title: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 4000)
  description?: string;
  @ApiProperty({ type: VisaSourceCitationDto })
  @ValidateNested()
  @Type(() => VisaSourceCitationDto)
  sourceCitation: VisaSourceCitationDto;
  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
  @ApiPropertyOptional() @IsOptional() @IsObject() metadata?: Record<
    string,
    unknown
  >;
}

export class VisaPathwayFiveStageDefinitionDto {
  @ApiProperty({ type: [VisaPathwayDefinitionItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => VisaPathwayDefinitionItemDto)
  eligibilityRequirements: VisaPathwayDefinitionItemDto[];

  @ApiProperty({ type: [VisaPathwayDefinitionItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VisaPathwayDefinitionItemDto)
  remediationOptions: VisaPathwayDefinitionItemDto[];

  @ApiProperty({ type: [VisaPathwayDefinitionItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => VisaPathwayDefinitionItemDto)
  evidenceRequirements: VisaPathwayDefinitionItemDto[];

  @ApiProperty({ type: [VisaPathwayDefinitionItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => VisaPathwayDefinitionItemDto)
  procedureSteps: VisaPathwayDefinitionItemDto[];

  @ApiProperty({ type: [VisaPathwayDefinitionItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => VisaPathwayDefinitionItemDto)
  escalationRules: VisaPathwayDefinitionItemDto[];
}

export class UpsertVisaPathwayDto {
  @ApiPropertyOptional() @IsOptional() @IsString() currentVisaCode?: string;
  @ApiProperty() @IsString() targetVisaCode: string;
  @ApiProperty() @IsString() @Length(1, 160) name: string;
  @ApiPropertyOptional({ default: 'ko' })
  @IsOptional()
  @IsString()
  locale?: string;
  @ApiProperty({ type: VisaPathwayFiveStageDefinitionDto })
  @ValidateNested()
  @Type(() => VisaPathwayFiveStageDefinitionDto)
  definition: VisaPathwayFiveStageDefinitionDto;
  @ApiProperty() @IsString() @Length(3, 2000) reason: string;
}

export class VisaRuleClauseDto {
  @ApiProperty({ enum: VISA_RULE_FIELDS })
  @IsString()
  @IsIn(VISA_RULE_FIELDS)
  field: VisaRuleField;
  @ApiProperty({
    enum: ['EQ', 'NEQ', 'GT', 'GTE', 'LT', 'LTE', 'IN', 'NOT_IN', 'CONTAINS'],
  })
  @IsString()
  @IsIn(['EQ', 'NEQ', 'GT', 'GTE', 'LT', 'LTE', 'IN', 'NOT_IN', 'CONTAINS'])
  op: string;
  @ApiProperty()
  @IsDefined()
  @Validate(VisaRuleClauseCompatibilityConstraint)
  value: string | number | boolean | string[] | number[];
}

export class VisaRuleConditionDto {
  @ApiProperty({ enum: ['AND', 'OR'] })
  @IsString()
  @IsIn(['AND', 'OR'])
  operator: 'AND' | 'OR';
  @ApiProperty({ type: [VisaRuleClauseDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => VisaRuleClauseDto)
  clauses: VisaRuleClauseDto[];
}

export class VisaRuleActionDto {
  @ApiProperty({ enum: ['ELIGIBLE', 'BLOCKED', 'DOCUMENT', 'RESTRICTION'] })
  @IsString()
  @IsIn(['ELIGIBLE', 'BLOCKED', 'DOCUMENT', 'RESTRICTION'])
  type: 'ELIGIBLE' | 'BLOCKED' | 'DOCUMENT' | 'RESTRICTION';
  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  documents?: string[];
  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  restrictions?: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reason?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() suggestion?: string;
}

export class CreateReleaseVisaRuleDto {
  @ApiProperty() @IsString() visaTypeCode: string;
  @ApiProperty() @IsString() @Length(1, 200) ruleName: string;
  @ApiPropertyOptional() @IsOptional() @IsString() ruleDescription?: string;
  @ApiPropertyOptional({ default: 100 })
  @IsOptional()
  @IsInt()
  priority?: number;
  @ApiProperty({ enum: ['ELIGIBILITY', 'RESTRICTION', 'DOCUMENT', 'QUOTA'] })
  @IsString()
  @IsIn(['ELIGIBILITY', 'RESTRICTION', 'DOCUMENT', 'QUOTA'])
  ruleType: 'ELIGIBILITY' | 'RESTRICTION' | 'DOCUMENT' | 'QUOTA';
  @ApiProperty({ type: VisaRuleConditionDto })
  @ValidateNested()
  @Type(() => VisaRuleConditionDto)
  conditions: VisaRuleConditionDto;
  @ApiProperty({ type: VisaRuleActionDto })
  @ValidateNested()
  @Type(() => VisaRuleActionDto)
  actions: VisaRuleActionDto;
  @ApiProperty() @IsString() @Length(3, 2000) reason: string;
}

export class VerifyVisaExpertCredentialDto {
  @ApiProperty() @IsString() expertId: string;
  @ApiProperty({ example: 'ADMINISTRATIVE_AGENT' })
  @IsString()
  @Length(3, 80)
  qualificationType: string;
  @ApiProperty({ example: '12-****-89' })
  @IsString()
  @Length(3, 80)
  @Matches(/\*/)
  qualificationNumberMasked: string;
  @ApiProperty() @IsDateString() businessFilingVerifiedAt: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  immigrationAgencyRegistrationVerifiedAt?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() validUntil?: string;
  @ApiProperty() @IsString() @Length(3, 2000) reason: string;
}
