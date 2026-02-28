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

  @ApiPropertyOptional({
    description:
      '오시는 길 안내 (오프라인 면접용) / Directions to interview location',
  })
  @IsString()
  @IsOptional()
  directions?: string;

  @ApiPropertyOptional({
    description: '면접 준비물 안내 / Items to bring for the interview',
  })
  @IsString()
  @IsOptional()
  whatToBring?: string;

  @ApiPropertyOptional({ description: '기업 메모 / Note from employer' })
  @IsString()
  @IsOptional()
  note?: string;
}
