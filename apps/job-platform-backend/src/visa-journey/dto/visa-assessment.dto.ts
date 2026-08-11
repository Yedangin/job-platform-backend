import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

/** 시점 고정 판정 입력 / Point-in-time assessment input */
export class CreateVisaAssessmentDto {
  @ApiPropertyOptional({
    example: '10',
    description: 'KSIC 업종코드 / KSIC code',
  })
  @IsOptional()
  @IsString()
  ksicCode?: string;

  @ApiPropertyOptional({ example: 'SME' })
  @IsOptional()
  @IsString()
  companySizeType?: string;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  employeeCountKorean?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  @Min(0)
  employeeCountForeign?: number;

  @ApiPropertyOptional({
    example: 50000,
    description: '만원 / KRW 10,000 units',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  annualRevenue?: number;

  @ApiPropertyOptional({ example: '서울특별시 중구' })
  @IsOptional()
  @IsString()
  addressRoad?: string;

  @ApiPropertyOptional({ example: 'FULL_TIME' })
  @IsOptional()
  @IsString()
  jobType?: string;

  @ApiPropertyOptional({
    example: 300,
    description: '만원/월 / KRW 10,000 per month',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  offeredSalary?: number;

  @ApiPropertyOptional({ example: 'VN' })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiPropertyOptional({ example: 28 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  age?: number;

  @ApiPropertyOptional({ example: 'BACHELOR' })
  @IsOptional()
  @IsString()
  educationLevel?: string;

  @ApiPropertyOptional({ example: 'TOPIK4' })
  @IsOptional()
  @IsString()
  koreanLevel?: string;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  workExperienceYears?: number;

  @ApiPropertyOptional({ example: 'D-10' })
  @IsOptional()
  @IsString()
  currentVisaCode?: string;

  @ApiPropertyOptional({ example: '2221' })
  @IsOptional()
  @IsString()
  targetOccupationCode?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean() hasRecommendation?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() hasCriminalRecord?: boolean;

  @ApiPropertyOptional({ example: 4200 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  annualIncome?: number;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  incomeGniPercent?: number;

  @ApiPropertyOptional({ example: 4 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  socialIntegrationLevel?: number;

  @ApiPropertyOptional() @IsOptional() @IsBoolean() isEthnicKorean?: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  koreanAncestryCountry?: string;

  @ApiPropertyOptional({ example: 40 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  volunteerHours?: number;

  @ApiPropertyOptional() @IsOptional() @IsBoolean() hasKoreanChild?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() hasProperty?: boolean;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  taxYearsInKorea?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasImmigrationViolation?: boolean;
}
