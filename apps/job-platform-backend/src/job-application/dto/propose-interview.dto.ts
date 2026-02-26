import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProposeInterviewDto {
  @ApiProperty({ enum: ['OFFLINE', 'ONLINE'] })
  @IsEnum(['OFFLINE', 'ONLINE'])
  interviewMethod: 'OFFLINE' | 'ONLINE';

  @ApiProperty({ description: '1st priority datetime (ISO 8601)' })
  @IsDateString()
  firstChoice: string;

  @ApiPropertyOptional({ description: '2nd priority datetime (ISO 8601)' })
  @IsDateString()
  @IsOptional()
  secondChoice?: string;

  @ApiPropertyOptional({
    description: 'Physical location for OFFLINE interview',
  })
  @ValidateIf((o) => o.interviewMethod === 'OFFLINE')
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: 'Meeting URL for ONLINE interview' })
  @ValidateIf((o) => o.interviewMethod === 'ONLINE')
  @IsString()
  link?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
}
