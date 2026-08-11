import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsOptional, IsString, Length } from 'class-validator';

export const VISA_ITEM_STATUSES = [
  'TODO',
  'IN_PROGRESS',
  'COMPLETED',
  'BLOCKED',
  'NOT_APPLICABLE',
] as const;

export const VISA_EXPERT_SERVICE_TYPES = [
  'CONSULTATION',
  'DOCUMENT_REVIEW',
  'APPLICATION_AGENCY',
] as const;

/** 여정 항목 상태 변경 / Journey item status update */
export class UpdateVisaJourneyItemDto {
  @ApiProperty({ enum: VISA_ITEM_STATUSES, example: 'COMPLETED' })
  @IsString()
  @IsIn(VISA_ITEM_STATUSES)
  status: (typeof VISA_ITEM_STATUSES)[number];
}

/** 행정사 상담·대행 연결 요청 / Administrative agent handoff request */
export class CreateVisaExpertCaseDto {
  @ApiProperty({ enum: VISA_EXPERT_SERVICE_TYPES, example: 'CONSULTATION' })
  @IsString()
  @IsIn(VISA_EXPERT_SERVICE_TYPES)
  serviceType: (typeof VISA_EXPERT_SERVICE_TYPES)[number];

  @ApiPropertyOptional({
    description: '확인받을 질문 / Question for the expert',
  })
  @IsOptional()
  @IsString()
  @Length(1, 4000)
  question?: string;

  @ApiProperty({
    example: true,
    description: '여정 자료의 행정사 제공 동의 / Consent to share journey data',
  })
  @IsBoolean()
  consentToShare: boolean;
}

/** 검증된 행정사를 사건에 배정 / Assign a verified administrative agent */
export class AssignVisaExpertCaseDto {
  @ApiProperty({ description: '검증된 행정사 식별자 / Verified expert ID' })
  @IsString()
  @Length(1, 100)
  expertId: string;

  @ApiProperty({ description: '배정 사유 / Assignment reason' })
  @IsString()
  @Length(3, 2000)
  reason: string;
}
