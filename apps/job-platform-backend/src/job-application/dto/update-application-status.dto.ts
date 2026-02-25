import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateApplicationStatusDto {
  @ApiProperty({
    description:
      '변경할 상태 / New status (REVIEWING, INTERVIEW, ACCEPTED, REJECTED)',
    example: 'INTERVIEW',
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
}
