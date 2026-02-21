/**
 * 정규직 비자 매칭 응답 DTO
 * Fulltime visa matching response DTO
 *
 * 4가지 채용 트랙으로 분류:
 * Categorized into 4 hiring tracks:
 * - IMMEDIATE: 즉시 채용 가능 (F비자 소지자)
 * - SPONSOR: 해외 인재 스폰서 채용 (E비자)
 * - TRANSITION: 체류자격 전환 채용 (D-10, D-2 → E비자)
 * - TRANSFER: 비자 보유자 이직 채용 (E비자 → E비자)
 */

import { ApiProperty } from '@nestjs/swagger';

/**
 * 채용 트랙 타입 / Hiring track type
 */
export type HiringTrack = 'IMMEDIATE' | 'SPONSOR' | 'TRANSITION' | 'TRANSFER';

/**
 * 비자 매칭 상태 / Visa match status
 */
export type VisaMatchStatus = 'eligible' | 'conditional' | 'blocked';

/**
 * 비자별 평가 결과 DTO / Per-visa evaluation result DTO
 */
export class VisaEvalResultDto {
  @ApiProperty({
    description: '비자 코드 (F-5, E-7-1 등) / Visa code',
    example: 'E-7-1',
  })
  visaCode: string;

  @ApiProperty({
    description: '비자 명칭 (한글) / Visa name (Korean)',
    example: '특정활동(E-7) - 전문직종',
  })
  visaName: string;

  @ApiProperty({
    description: '비자 명칭 (영문) / Visa name (English)',
    example: 'Specific Activities (E-7) - Professional',
  })
  visaNameEn: string;

  @ApiProperty({
    description: '채용 트랙 / Hiring track',
    enum: ['IMMEDIATE', 'SPONSOR', 'TRANSITION', 'TRANSFER'],
    example: 'SPONSOR',
  })
  hiringTrack: HiringTrack;

  @ApiProperty({
    description:
      '매칭 상태: eligible(적합), conditional(조건부), blocked(불가) / Match status',
    enum: ['eligible', 'conditional', 'blocked'],
    example: 'eligible',
  })
  status: VisaMatchStatus;

  @ApiProperty({
    description:
      '충족 조건 목록 (conditional일 때) / Conditions (when conditional)',
    type: [String],
    example: ['학사 학위 필요', 'TOPIK 4급 이상 권장'],
  })
  conditions: string[];

  @ApiProperty({
    description: '차단 이유 목록 (blocked일 때) / Block reasons (when blocked)',
    type: [String],
    example: [],
  })
  blockReasons: string[];

  @ApiProperty({
    description: '필요 허가 (학습활동허가서 등) / Required permit',
    example: null,
    nullable: true,
  })
  requiredPermit: string | null;

  @ApiProperty({
    description: '비고 / Notes',
    example: 'E-7-1 비자는 전문 직종 취업 가능',
    nullable: true,
  })
  notes: string | null;

  @ApiProperty({
    description: '추정 소요 기간 (일) / Estimated processing days',
    example: 30,
    nullable: true,
  })
  estimatedDays: number | null;

  @ApiProperty({
    description: '필요 서류 목록 / Required documents',
    type: [String],
    example: ['학위증명서', '경력증명서', '표준계약서'],
  })
  requiredDocuments: string[];
}

/**
 * 채용 트랙별 그룹 DTO / Hiring track group DTO
 */
export class HiringTrackGroupDto {
  @ApiProperty({
    description: '채용 트랙 / Hiring track',
    enum: ['IMMEDIATE', 'SPONSOR', 'TRANSITION', 'TRANSFER'],
    example: 'IMMEDIATE',
  })
  track: HiringTrack;

  @ApiProperty({
    description: '트랙명 (한글) / Track name (Korean)',
    example: '즉시 채용 가능',
  })
  trackName: string;

  @ApiProperty({
    description: '트랙명 (영문) / Track name (English)',
    example: 'Immediate Hiring',
  })
  trackNameEn: string;

  @ApiProperty({
    description: '적합(eligible) 비자 목록 / Eligible visas',
    type: [VisaEvalResultDto],
  })
  eligible: VisaEvalResultDto[];

  @ApiProperty({
    description: '조건부(conditional) 비자 목록 / Conditional visas',
    type: [VisaEvalResultDto],
  })
  conditional: VisaEvalResultDto[];

  @ApiProperty({
    description: '불가(blocked) 비자 목록 / Blocked visas',
    type: [VisaEvalResultDto],
  })
  blocked: VisaEvalResultDto[];

  @ApiProperty({
    description: '트랙별 집계 / Track summary',
    example: { totalEligible: 3, totalConditional: 1, totalBlocked: 0 },
  })
  summary: {
    totalEligible: number;
    totalConditional: number;
    totalBlocked: number;
  };
}

/**
 * 정규직 비자 매칭 응답 DTO
 * Fulltime visa matching response DTO
 */
export class FulltimeVisaMatchingResponseDto {
  @ApiProperty({
    description:
      '즉시 채용 가능 트랙 (F비자 소지자) / Immediate hiring track (F visa holders)',
    type: HiringTrackGroupDto,
  })
  immediate: HiringTrackGroupDto;

  @ApiProperty({
    description:
      '해외 인재 스폰서 트랙 (E비자, 기업 스폰서) / Overseas sponsor track (E visa, company sponsors)',
    type: HiringTrackGroupDto,
  })
  sponsor: HiringTrackGroupDto;

  @ApiProperty({
    description:
      '체류자격 전환 트랙 (D-10, D-2 → E비자) / Status transition track (D-10, D-2 → E visa)',
    type: HiringTrackGroupDto,
  })
  transition: HiringTrackGroupDto;

  @ApiProperty({
    description:
      '비자 보유자 이직 트랙 (E비자 → E비자) / Visa holder transfer track (E visa → E visa)',
    type: HiringTrackGroupDto,
  })
  transfer: HiringTrackGroupDto;

  @ApiProperty({
    description: '전체 집계 / Overall summary',
    example: {
      totalEligible: 8,
      totalConditional: 3,
      totalBlocked: 2,
      totalVisasEvaluated: 13,
    },
  })
  overallSummary: {
    totalEligible: number;
    totalConditional: number;
    totalBlocked: number;
    totalVisasEvaluated: number;
  };

  @ApiProperty({
    description: '매칭 수행 시각 (ISO 8601) / Matching performed at',
    example: '2025-04-01T09:00:00.000Z',
  })
  matchedAt: string;

  @ApiProperty({
    description: '입력 요약 / Input summary',
    example: {
      occupationCode: '2211',
      salaryMin: 35000000,
      salaryMax: 50000000,
      experienceLevel: 'JUNIOR',
      educationLevel: 'BACHELOR',
      overseasHireWilling: true,
      isDepopulationArea: false,
    },
  })
  inputSummary: {
    occupationCode: string;
    salaryMin: number;
    salaryMax: number;
    experienceLevel: string;
    educationLevel: string;
    overseasHireWilling: boolean;
    isDepopulationArea: boolean;
  };
}

/**
 * Applicant-side 비자 매칭 응답 DTO (교차 검증)
 * Applicant-side visa matching response DTO (cross-validation)
 *
 * 지원자가 특정 공고에 지원할 수 있는지 교차 검증한 결과
 * Cross-validation result for whether applicant can apply to specific job
 */
export class FulltimeVisaMatchingWithApplicantResponseDto {
  @ApiProperty({
    description: '지원 가능 여부 / Can apply',
    example: true,
  })
  canApply: boolean;

  @ApiProperty({
    description: '지원자의 현재 비자 타입 / Applicant current visa type',
    example: 'D-10',
  })
  currentVisaType: string;

  @ApiProperty({
    description:
      '해당 공고에 대한 비자 평가 결과 / Visa evaluation for this job',
    type: VisaEvalResultDto,
  })
  evaluationResult: VisaEvalResultDto;

  @ApiProperty({
    description:
      '추가 조건 또는 권고사항 / Additional conditions or recommendations',
    type: [String],
    example: ['학사 학위 소지 확인됨', 'E-7-1 비자 전환 필요'],
  })
  recommendations: string[];

  @ApiProperty({
    description: '매칭 수행 시각 (ISO 8601) / Matching performed at',
    example: '2025-04-01T09:00:00.000Z',
  })
  matchedAt: string;
}
