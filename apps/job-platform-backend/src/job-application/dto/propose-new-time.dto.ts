import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class ProposeNewTimeDto {
  @ApiProperty({
    description: '제안 면접 시간 / Proposed interview time (ISO 8601)',
    example: '2026-03-16T10:00:00.000Z',
  })
  @IsDateString()
  proposedTime: string;

  @ApiPropertyOptional({
    description: '메모 / Note for the other party',
    example: 'I have a prior commitment at the original time',
  })
  @IsOptional()
  @IsString()
  note?: string;
}
