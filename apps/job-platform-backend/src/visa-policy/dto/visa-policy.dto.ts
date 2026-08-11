import { Type } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const POLICY_REVIEW_STATUSES = [
  'PENDING',
  'REVIEWED',
  'RULE_DRAFTED',
  'APPLIED',
  'DISMISSED',
] as const;

export const POLICY_SOURCES = [
  'law_go_kr',
  'immigration_go_kr',
  'eps_go_kr',
  'moel_go_kr',
  'hikorea_go_kr',
] as const;

const REVIEW_ACTION_STATUSES = ['REVIEWED', 'APPLIED', 'DISMISSED'] as const;
const VISA_CODE_LIST_PATTERN =
  /^[A-Z][A-Z0-9]*-\d[A-Z0-9]*(?:-[A-Z0-9]+)*(?:\s*,\s*[A-Z][A-Z0-9]*-\d[A-Z0-9]*(?:-[A-Z0-9]+)*)*$/;

export class PolicyChangeQueryDto {
  @ApiPropertyOptional({ enum: POLICY_SOURCES })
  @IsOptional()
  @IsIn(POLICY_SOURCES)
  sourceSite?: string;

  @ApiPropertyOptional({ enum: POLICY_REVIEW_STATUSES })
  @IsOptional()
  @IsIn(POLICY_REVIEW_STATUSES)
  reviewStatus?: (typeof POLICY_REVIEW_STATUSES)[number];

  @ApiPropertyOptional({ example: 'E-7' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @Matches(VISA_CODE_LIST_PATTERN)
  affectedVisaTypes?: string;

  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ minimum: 1, maximum: 100, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}

export class ReviewPolicyChangeDto {
  @ApiProperty({ enum: REVIEW_ACTION_STATUSES })
  @IsIn(REVIEW_ACTION_STATUSES)
  reviewStatus: (typeof REVIEW_ACTION_STATUSES)[number];

  @ApiPropertyOptional({ maxLength: 2000 })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  reviewNote?: string;

  @ApiPropertyOptional({ example: 'E-7,E-7-4' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @Matches(VISA_CODE_LIST_PATTERN)
  affectedVisaTypes?: string;
}

export class TriggerScrapingDto {
  @ApiPropertyOptional({ enum: POLICY_SOURCES })
  @IsOptional()
  @IsIn(POLICY_SOURCES)
  siteKey?: string;
}

export class PolicyEvidenceQueryDto {
  @ApiPropertyOptional({
    description: 'Evidence date. Future dates are rejected.',
    example: '2026-08-03',
  })
  @IsOptional()
  @IsDateString({ strict: true })
  asOf?: string;
}
