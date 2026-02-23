/**
 * Alba Hiring Manager Visa Analysis DTOs
 *
 * Hiring Manager(고용주)가 알바 공고 작성 시,
 * 입력한 직종/근무시간 기반으로 고용 가능한 비자를 실시간 필터링하는 API용 DTO.
 *
 * Simplified visa eligibility check for hiring managers during job posting creation.
 * Filters eligible visas in real-time based on job type and weekly hours.
 */

import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// ─── Request DTO ───

export class AlbaHiringVisaAnalysisRequestDto {
  @ApiProperty({
    description:
      '플랫폼 직종 코드 (KSIC 매핑 자동 적용) / Platform job category code',
    example: 'REST_SERVING',
  })
  @IsString()
  @IsNotEmpty()
  jobCategoryCode: string;

  @ApiProperty({
    description: '주당 근무시간 / Weekly working hours',
    example: 20,
    minimum: 1,
    maximum: 80,
  })
  @IsNumber()
  @Min(1)
  @Max(80)
  weeklyHours: number;
}

// ─── Visa Status Item ───

export class HiringVisaStatusDto {
  @ApiProperty({ description: '비자 코드 / Visa code', example: 'F-2' })
  visaCode: string;

  @ApiProperty({ description: '비자명 (한국어) / Visa name (Korean)', example: '거주' })
  visaName: string;

  @ApiProperty({ description: '비자명 (영어) / Visa name (English)', example: 'Residence' })
  visaNameEn: string;

  @ApiProperty({
    description: '고용 가능 상태 / Employment eligibility status',
    enum: ['eligible', 'restricted', 'blocked'],
  })
  status: 'eligible' | 'restricted' | 'blocked';

  @ApiProperty({
    description: '허가 필요 여부 / Whether employment permit is required',
    example: false,
  })
  requiresPermit: boolean;

  @ApiProperty({
    description: '최대 주당 근무시간 (null = 무제한) / Max weekly hours (null = unlimited)',
    example: null,
    nullable: true,
  })
  maxWeeklyHours: number | null;

  @ApiProperty({
    description: '제한/차단 사유 / Restriction or block reason',
    example: null,
    nullable: true,
  })
  reason: string | null;
}

// ─── Response DTO ───

export class AlbaHiringVisaAnalysisResponseDto {
  @ApiProperty({
    description: '자유취업 가능 비자 목록 / Free employment visas',
    type: [HiringVisaStatusDto],
  })
  freeEmployment: HiringVisaStatusDto[];

  @ApiProperty({
    description: '허가 필요 비자 목록 / Permit-required visas',
    type: [HiringVisaStatusDto],
  })
  permitRequired: HiringVisaStatusDto[];

  @ApiProperty({
    description: '차단된 비자 목록 / Blocked visas',
    type: [HiringVisaStatusDto],
  })
  blocked: HiringVisaStatusDto[];

  @ApiProperty({
    description: '적용된 필터링 규칙 / Applied filtering rules',
    type: [String],
  })
  appliedRules: string[];

  @ApiProperty({
    description: '입력 요약 / Input summary',
  })
  inputSummary: {
    jobCategoryCode: string;
    ksicCode: string;
    weeklyHours: number;
    isSimpleLabor: boolean;
    isEntertainment: boolean;
    isBlockedIndustryForH2: boolean;
  };

  @ApiProperty({
    description: '분석 요약 / Analysis summary',
  })
  summary: {
    totalEligible: number;
    totalRestricted: number;
    totalBlocked: number;
  };

  @ApiProperty({ description: '분석 시각 / Analysis timestamp' })
  analyzedAt: string;
}
