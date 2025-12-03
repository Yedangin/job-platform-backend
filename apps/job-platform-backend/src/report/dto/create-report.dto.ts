import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export enum ReportStatus {
  REPORT_STATUS_UNSPECIFIED = 0,
  PENDING = 1,
  UNDER_REVIEW = 2,
  RESOLVED = 3,
  REJECTED = 4,
  CLOSED = 5,
}

export class CreateReportDto {
  @ApiProperty({
    example: 'Inappropriate Behavior',
    description: 'Report title',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'user_123',
    description: 'ID of the user making the report',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  reporterId: string;

  @ApiProperty({
    example: 'user_456',
    description: 'ID of the user being reported',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  reportedUserId: string;

  @ApiProperty({
    example: 'User was harassing other members in the chat',
    description: 'Detailed reason for the report',
    required: false,
  })
  @IsString()
  @IsOptional()
  reason?: string;

  @ApiProperty({
    example: 'PENDING',
    description: 'Report status',
    enum: ReportStatus,
    default: ReportStatus.PENDING,
  })
  @IsEnum(ReportStatus)
  @IsOptional()
  status?: ReportStatus;
}
