import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateApplicationStatusDto {
  @ApiProperty({
    description:
      '변경할 상태 / New status (DOCUMENT_PASSED, INTERVIEW_SCHEDULED, FINAL_ACCEPTED, REJECTED, etc.)',
    example: 'DOCUMENT_PASSED',
  })
  @IsString()
  status: string;

  @ApiPropertyOptional({
    description: '면접 일시 / Interview date (ISO 8601)',
    example: '2026-03-15T14:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  interviewDate?: string;

  @ApiPropertyOptional({
    description: '면접 메모 / Interview note',
    example: 'Please bring your portfolio',
  })
  @IsOptional()
  @IsString()
  interviewNote?: string;

  @ApiPropertyOptional({
    description: '불합격 사유 / Rejection reason',
    example: 'Position has been filled',
  })
  @IsOptional()
  @IsString()
  rejectionReason?: string;

  // ── 최종 합격 전용 필드 (spec 08 §3-3) / Final acceptance fields ──

  @ApiPropertyOptional({
    description: '제시 연봉 (만원 단위) / Offered salary (unit: 10K KRW)',
    example: 3600,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  offeredSalary?: number;

  @ApiPropertyOptional({
    description: '입사 예정일 / Expected start date (ISO 8601)',
    example: '2026-04-01',
  })
  @IsOptional()
  @IsDateString()
  expectedStartDate?: string;

  @ApiPropertyOptional({
    description: '기업 메시지 / Company message to applicant',
    example: '축하합니다! 최종 합격되셨습니다.',
  })
  @IsOptional()
  @IsString()
  companyMessage?: string;
}
