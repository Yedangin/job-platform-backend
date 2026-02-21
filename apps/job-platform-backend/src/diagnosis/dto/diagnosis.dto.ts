import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsIn,
  Min,
  Max,
} from 'class-validator';

/**
 * 진단 요청 DTO / Diagnosis request DTO
 */
export class DiagnosisRequestDto {
  @ApiProperty({
    description: '국적 ISO 3166-1 alpha-3 / Nationality code',
    example: 'VNM',
  })
  @IsString()
  nationality: string;

  @ApiProperty({ description: '만 나이 / Age', example: 24 })
  @IsNumber()
  @Min(15)
  @Max(70)
  age: number;

  @ApiProperty({
    description: '최종 학력 / Education level',
    example: 'high_school',
    enum: [
      'none',
      'middle',
      'high_school',
      'associate',
      'bachelor',
      'master',
      'doctor',
    ],
  })
  @IsString()
  @IsIn([
    'none',
    'middle',
    'high_school',
    'associate',
    'bachelor',
    'master',
    'doctor',
  ])
  educationLevel: string;

  @ApiProperty({
    description: '연간 가용 자금 (만원) / Available annual fund (만원)',
    example: 500,
  })
  @IsNumber()
  @Min(0)
  availableAnnualFund: number;

  @ApiProperty({
    description: '최종 목표 / Final goal',
    example: 'employment',
    enum: ['employment', 'degree', 'permanent_residence', 'explore'],
  })
  @IsString()
  @IsIn(['employment', 'degree', 'permanent_residence', 'explore'])
  finalGoal: string;

  @ApiProperty({
    description: '우선순위 / Priority preference',
    example: 'stability',
    enum: ['speed', 'stability', 'cost', 'income'],
  })
  @IsString()
  @IsIn(['speed', 'stability', 'cost', 'income'])
  priorityPreference: string;

  @ApiPropertyOptional({
    description: 'TOPIK 등급 (0-6) / TOPIK level',
    example: 3,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(6)
  topikLevel?: number;

  @ApiPropertyOptional({
    description: '경력 연수 / Work experience years',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  workExperienceYears?: number;

  @ApiPropertyOptional({ description: '전공 / Major', example: 'IT' })
  @IsOptional()
  @IsString()
  major?: string;

  @ApiPropertyOptional({
    description: '재외동포 여부 / Is ethnic Korean',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isEthnicKorean?: boolean;

  @ApiPropertyOptional({
    description: '현재 비자 / Current visa',
    example: 'D-2',
  })
  @IsOptional()
  @IsString()
  currentVisa?: string;

  @ApiPropertyOptional({
    description: '한국 체류 개월 수 / Korea stay months',
    example: 12,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  koreaStayMonths?: number;
}

/**
 * 클릭 추적 DTO / Click tracking DTO
 */
export class TrackClickDto {
  @ApiProperty({ description: '경로 ID / Pathway ID', example: 'PW-003' })
  @IsString()
  pathwayId: string;

  @ApiProperty({ description: '순위 위치 / Rank position', example: 1 })
  @IsNumber()
  @Min(1)
  rankPosition: number;

  @ApiProperty({
    description: '액션 유형 / Action type',
    example: 'detail_view',
    enum: ['detail_view', 'next_step_click', 'share', 'save'],
  })
  @IsString()
  @IsIn(['detail_view', 'next_step_click', 'share', 'save'])
  actionType: string;
}
