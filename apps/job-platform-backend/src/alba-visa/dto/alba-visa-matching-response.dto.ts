/**
 * 알바 비자 매칭 응답 DTO
 * Alba Visa Matching Response DTO
 *
 * POST /api/alba/visa-matching 엔드포인트용 응답 DTO.
 * Response DTO for POST /api/alba/visa-matching endpoint.
 *
 * eligible / conditional / blocked 3분류 결과 + 요약 정보.
 * Trichotomy result (eligible/conditional/blocked) + summary info.
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 비자별 매칭 평가 결과 DTO
 * Per-visa matching evaluation result DTO
 */
export class VisaEvalResultDto {
  @ApiProperty({
    description: '비자 코드 / Visa code',
    example: 'D-2',
  })
  visaCode: string;

  @ApiProperty({
    description: '비자 한글명 / Visa name in Korean',
    example: '유학',
  })
  visaName: string;

  @ApiProperty({
    description: '비자 영문명 / Visa name in English',
    example: 'Study Abroad',
  })
  visaNameEn: string;

  @ApiProperty({
    description:
      '매칭 상태: eligible(가능), conditional(조건부), blocked(불가) / Match status',
    enum: ['eligible', 'conditional', 'blocked'],
    example: 'conditional',
  })
  status: 'eligible' | 'conditional' | 'blocked';

  @ApiProperty({
    description:
      '조건부일 때 조건 목록 / Conditions when status is conditional',
    type: [String],
    example: ['TOPIK 3급 이상 필요', '체류자격외활동허가 필요'],
  })
  conditions: string[];

  @ApiProperty({
    description: '불가일 때 사유 목록 / Reasons when status is blocked',
    type: [String],
    example: [],
  })
  blockReasons: string[];

  @ApiPropertyOptional({
    description: '필요한 허가 유형 / Required permit type',
    example: '체류자격외활동허가',
    nullable: true,
  })
  requiredPermit: string | null;

  @ApiPropertyOptional({
    description:
      '해당 비자의 최대 주당 근무시간 (null = 무제한) / Max weekly hours (null = unlimited)',
    example: 30,
    nullable: true,
  })
  maxWeeklyHours: number | null;

  @ApiPropertyOptional({
    description:
      '동시 근무 가능 사업장 수 (null = 무제한) / Max concurrent workplaces (null = unlimited)',
    example: 2,
    nullable: true,
  })
  maxWorkplaces: number | null;

  @ApiPropertyOptional({
    description: '참고사항 / Additional notes',
    example: '주말 근무는 시간 제한 없음',
    nullable: true,
  })
  notes: string | null;
}

/**
 * 매칭 결과 요약 DTO
 * Matching result summary DTO
 */
export class MatchingSummaryDto {
  @ApiProperty({
    description: '무조건 가능 비자 수 / Unconditionally eligible visa count',
    example: 4,
  })
  totalEligible: number;

  @ApiProperty({
    description: '조건부 가능 비자 수 / Conditionally eligible visa count',
    example: 3,
  })
  totalConditional: number;

  @ApiProperty({
    description: '불가능 비자 수 / Blocked visa count',
    example: 2,
  })
  totalBlocked: number;
}

/**
 * 입력값 요약 DTO (자동 계산 필드 포함)
 * Input summary DTO (including auto-calculated fields)
 */
export class InputSummaryDto {
  @ApiProperty({
    description: '직종 코드 / Job category code',
    example: 'REST_SERVING',
  })
  jobCategoryCode: string;

  @ApiProperty({
    description: '매핑된 KSIC 코드 / Mapped KSIC code',
    example: 'I',
  })
  ksicCode: string;

  @ApiProperty({
    description: '주당 근무시간 / Weekly work hours',
    example: 20,
  })
  weeklyHours: number;

  @ApiProperty({
    description:
      '주말만 근무 여부 (자동 계산) / Weekend-only flag (auto-calculated)',
    example: true,
  })
  isWeekendOnly: boolean;

  @ApiProperty({
    description:
      '평일 근무 포함 여부 (자동 계산) / Weekday shift flag (auto-calculated)',
    example: false,
  })
  hasWeekdayShift: boolean;

  @ApiProperty({
    description:
      '인구감소지역 여부 (자동 판별) / Depopulation area flag (auto-determined)',
    example: false,
  })
  isDepopulationArea: boolean;
}

/**
 * 알바 비자 매칭 응답 DTO (최상위)
 * Alba Visa Matching Response DTO (top-level)
 */
export class AlbaVisaMatchingResponseDto {
  @ApiProperty({
    description:
      '무조건 가능 비자 목록 (제한 없음) / Unconditionally eligible visas',
    type: [VisaEvalResultDto],
  })
  eligible: VisaEvalResultDto[];

  @ApiProperty({
    description:
      '조건부 가능 비자 목록 (시간/업종/허가 조건) / Conditionally eligible visas',
    type: [VisaEvalResultDto],
  })
  conditional: VisaEvalResultDto[];

  @ApiProperty({
    description: '불가능 비자 목록 + 사유 / Blocked visas + reasons',
    type: [VisaEvalResultDto],
  })
  blocked: VisaEvalResultDto[];

  @ApiProperty({
    description: '매칭 결과 요약 / Matching result summary',
    type: MatchingSummaryDto,
  })
  summary: MatchingSummaryDto;

  @ApiProperty({
    description: '매칭 실행 시각 / Matching execution timestamp',
    example: '2026-02-18T12:00:00Z',
  })
  matchedAt: string;

  @ApiProperty({
    description: '입력값 요약 (자동 계산 필드 포함) / Input summary',
    type: InputSummaryDto,
  })
  inputSummary: InputSummaryDto;
}
