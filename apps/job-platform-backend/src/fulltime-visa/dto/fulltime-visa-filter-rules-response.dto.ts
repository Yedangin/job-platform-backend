/**
 * 정규직 비자 필터링 규칙 응답 DTO
 * Fulltime visa filter rules response DTO
 *
 * 프론트엔드에서 실시간 비자 필터링을 위한 규칙 제공
 * Provides rules for frontend real-time visa filtering
 */

import { ApiProperty } from '@nestjs/swagger';

/**
 * 비자별 필터링 규칙 DTO / Per-visa filtering rule DTO
 */
export class VisaFilterRuleDto {
  @ApiProperty({
    description: '비자 코드 (F-5, E-7-1 등) / Visa code',
    example: 'E-7-1',
  })
  visaCode: string;

  @ApiProperty({
    description: '비자 명칭 (한글) / Visa name (Korean)',
    example: '특정활동(전문직종)',
  })
  visaName: string;

  @ApiProperty({
    description: '비자 명칭 (영문) / Visa name (English)',
    example: 'Specific Activities (Professional)',
  })
  visaNameEn: string;

  @ApiProperty({
    description: '채용 트랙 / Hiring track',
    enum: ['IMMEDIATE', 'SPONSOR', 'TRANSITION', 'TRANSFER'],
    example: 'SPONSOR',
  })
  hiringTrack: string;

  @ApiProperty({
    description:
      '최저 연봉 (원, null이면 제한 없음) / Minimum salary (KRW, null = no limit)',
    example: 35200000,
    nullable: true,
  })
  minSalary: number | null;

  @ApiProperty({
    description:
      '최소 학력 요구사항 (null이면 제한 없음) / Minimum education (null = no limit)',
    enum: ['HIGH_SCHOOL', 'ASSOCIATE', 'BACHELOR', 'MASTER', 'DOCTORATE'],
    example: 'BACHELOR',
    nullable: true,
  })
  minEducation: string | null;

  @ApiProperty({
    description:
      '해외 채용 의사 필요 여부 (true면 overseasHireWilling=true 필수) / Requires overseas hire willingness',
    example: true,
  })
  requiresOverseasHire: boolean;

  @ApiProperty({
    description:
      '허용 직종 카테고리 (null이면 모든 직종 가능, 배열이면 해당 직종만) / Allowed job categories (null = all, array = specific only)',
    type: [String],
    example: null,
    nullable: true,
  })
  allowedJobCategories: string[] | null;

  @ApiProperty({
    description: '비고 / Notes',
    example: 'E-7-1 비자는 전문 직종 취업 가능',
    nullable: true,
  })
  notes: string | null;

  @ApiProperty({
    description:
      '신입 채용만 가능 여부 (true면 experienceLevel이 ENTRY 또는 ANY일 때만 표시) / Requires entry-level hiring only',
    example: false,
    nullable: true,
  })
  requiresEntryLevel?: boolean;
}

/**
 * 정규직 비자 필터링 규칙 응답 DTO
 * Fulltime visa filter rules response DTO
 */
export class FulltimeVisaFilterRulesResponseDto {
  @ApiProperty({
    description: '전체 비자 필터링 규칙 목록 / All visa filter rules',
    type: [VisaFilterRuleDto],
  })
  visas: VisaFilterRuleDto[];

  @ApiProperty({
    description: '총 비자 수 / Total visa count',
    example: 13,
  })
  totalCount: number;

  @ApiProperty({
    description: '조회 시각 (ISO 8601) / Retrieved at',
    example: '2025-04-01T09:00:00.000Z',
  })
  retrievedAt: string;
}
