import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Matches, Min } from 'class-validator';

export class AlbaAttributesDto {
  @ApiProperty({ description: '시급 (원) / Hourly wage (KRW)', example: 9860 })
  @IsInt()
  @Min(0)
  hourlyWage: number;

  @ApiPropertyOptional({
    description: '근무 기간 / Work period',
    example: '3개월',
  })
  @IsOptional()
  @IsString()
  workPeriod?: string;

  @ApiProperty({
    description:
      '근무 요일 마스크 (7자리 이진수, 월~일) / Work days mask (7-char binary Mon-Sun)',
    example: '1111100',
  })
  @Matches(/^[01]{7}$/, {
    message: 'workDaysMask must be a 7-character binary string (e.g. 1111100)',
  })
  workDaysMask: string;

  @ApiPropertyOptional({
    description: '근무 시작 시간 / Work start time',
    example: '09:00',
  })
  @IsOptional()
  @IsString()
  workTimeStart?: string;

  @ApiPropertyOptional({
    description: '근무 종료 시간 / Work end time',
    example: '18:00',
  })
  @IsOptional()
  @IsString()
  workTimeEnd?: string;
}
