import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

export enum SanctionType {
  SANCTION_TYPE_UNSPECIFIED = 0,
  SUSPENSION = 1,
  WARNING = 2,
  BANNED = 3,
}

export class CreateSanctionDto {
  @ApiProperty({
    example: 'user_123',
    description: 'ID of the user being sanctioned',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'SUSPENSION',
    description: 'Type of sanction',
    enum: SanctionType,
    required: true,
  })
  @IsEnum(SanctionType)
  @IsNotEmpty()
  sanctionType: SanctionType;

  @ApiProperty({
    example: 'Violation of community guidelines',
    description: 'Reason for the sanction',
    required: false,
  })
  @IsString()
  @IsOptional()
  reason?: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Start date of the sanction',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    example: '2024-12-31T23:59:59.999Z',
    description: 'End date of the sanction',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}
