import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

const educationLevels = [
  'none',
  'middle',
  'high_school',
  'associate',
  'bachelor',
  'master',
  'doctor',
] as const;

const goals = [
  'employment',
  'degree',
  'permanent_residence',
  'explore',
] as const;

const priorities = ['speed', 'stability', 'cost', 'income'] as const;
const plannerLanguages = ['en', 'ko', 'vi', 'th', 'fil', 'tl'] as const;

export class DiagnosisV2RequestDto {
  @ApiProperty({ description: 'Nationality code, ISO 3166-1 alpha-3', example: 'VNM' })
  @IsString()
  nationality: string;

  @ApiPropertyOptional({ description: 'Current residence country code', example: 'VNM' })
  @IsOptional()
  @IsString()
  residenceCountry?: string;

  @ApiProperty({ description: 'Age', example: 24 })
  @IsNumber()
  @Min(15)
  @Max(70)
  age: number;

  @ApiProperty({ description: 'Highest education level', enum: educationLevels })
  @IsString()
  @IsIn(educationLevels)
  educationLevel: string;

  @ApiProperty({ description: 'Annual preparation fund, unit: 10,000 KRW', example: 500 })
  @IsNumber()
  @Min(0)
  availableAnnualFund: number;

  @ApiProperty({ description: 'Final goal', enum: goals })
  @IsString()
  @IsIn(goals)
  finalGoal: string;

  @ApiProperty({ description: 'Priority preference', enum: priorities })
  @IsString()
  @IsIn(priorities)
  priorityPreference: string;

  @ApiPropertyOptional({ description: 'Result language', enum: plannerLanguages, example: 'en' })
  @IsOptional()
  @IsString()
  @IsIn(plannerLanguages)
  language?: string;

  @ApiPropertyOptional({ description: 'TOPIK level, 0-6', example: 3 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(6)
  topikLevel?: number;

  @ApiPropertyOptional({ description: 'KIIP stage, 0-5', example: 2 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  kiipStage?: number;

  @ApiPropertyOptional({ description: 'Work experience years', example: 2 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  workExperienceYears?: number;

  @ApiPropertyOptional({ description: 'Major name or field', example: 'IT' })
  @IsOptional()
  @IsString()
  major?: string;

  @ApiPropertyOptional({ description: 'Major category', example: 'tech' })
  @IsOptional()
  @IsString()
  majorCategory?: string;

  @ApiPropertyOptional({ description: 'Target occupation', example: 'software_developer' })
  @IsOptional()
  @IsString()
  targetOccupation?: string;

  @ApiPropertyOptional({ description: 'Ethnic Korean status', example: false })
  @IsOptional()
  @IsBoolean()
  isEthnicKorean?: boolean;

  @ApiPropertyOptional({ description: 'Current Korean visa, if any', example: 'D-2' })
  @IsOptional()
  @IsString()
  currentVisa?: string;

  @ApiPropertyOptional({ description: 'Korea stay months', example: 12 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  koreaStayMonths?: number;

  @ApiPropertyOptional({ description: 'Whether degree documents are ready', example: true })
  @IsOptional()
  @IsBoolean()
  hasDegreeDocument?: boolean;
}

export class ClaimDiagnosisDto {
  @ApiPropertyOptional({ description: 'Anonymous id from the browser that created the session' })
  @IsOptional()
  @IsString()
  anonymousId?: string;
}

export class TrackClickDto {
  @ApiProperty({ description: 'Pathway ID', example: 'PW-003' })
  @IsString()
  pathwayId: string;

  @ApiProperty({ description: 'Rank position', example: 1 })
  @IsNumber()
  @Min(1)
  rankPosition: number;

  @ApiProperty({
    description: 'Action type',
    example: 'detail_view',
    enum: ['detail_view', 'next_step_click', 'share', 'save'],
  })
  @IsString()
  @IsIn(['detail_view', 'next_step_click', 'share', 'save'])
  actionType: string;
}
