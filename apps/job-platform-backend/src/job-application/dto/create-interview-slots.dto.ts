import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class InterviewSlotDto {
  @ApiProperty({
    description: '면접 시작 시간 / Interview start time (ISO 8601)',
    example: '2026-03-15T09:00:00.000Z',
  })
  @IsDateString()
  startTime: string;

  @ApiProperty({
    description: '면접 종료 시간 / Interview end time (ISO 8601)',
    example: '2026-03-15T09:30:00.000Z',
  })
  @IsDateString()
  endTime: string;

  @ApiPropertyOptional({
    description: '최대 수용 인원 / Max capacity per slot',
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  maxCapacity?: number;
}

export class CreateInterviewSlotsDto {
  @ApiProperty({
    description: '면접 슬롯 목록 / Array of interview time slots',
    type: [InterviewSlotDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InterviewSlotDto)
  slots: InterviewSlotDto[];

  @ApiPropertyOptional({
    description: '면접 장소 / Interview location',
    example: 'Seoul Office, 3rd Floor Meeting Room',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: '면접 관련 메모 / Additional notes for candidates',
    example: 'Please bring your ID and portfolio',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
