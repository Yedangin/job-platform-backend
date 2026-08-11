import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

/** 비자 여정 생성 요청 / Visa journey creation request */
export class CreateVisaJourneyDto {
  @ApiProperty({
    example: 'E-7-1',
    description: '목표 비자 코드 / Target visa code',
  })
  @IsString()
  @Matches(/^[A-Z0-9-]{1,30}$/)
  targetVisaCode: string;

  @ApiPropertyOptional({
    example: 'D-10에서 E-7-1 취업 전환',
    description: '사용자 표시용 경로명 / User-facing pathway name',
  })
  @IsOptional()
  @IsString()
  @Length(1, 160)
  targetPathwayName?: string;

  @ApiPropertyOptional({
    example: 'D-10',
    description: '현재 비자 코드 / Current visa code',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[A-Z0-9-]{1,30}$/)
  currentVisaCode?: string;

  @ApiPropertyOptional({
    example: '2026-10-01',
    description: '목표 신청일 / Target application date',
  })
  @IsOptional()
  @IsDateString()
  targetApplicationDate?: string;

  @ApiPropertyOptional({
    example: 'ko',
    description: '표시 언어 / Display locale',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-z]{2}(-[A-Z]{2})?$/)
  locale?: string;
}
