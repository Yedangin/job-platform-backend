import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Matches, MaxLength } from 'class-validator';

export class UpdateScoutVisibilityDto {
  @ApiProperty({
    description: '인재채용관 공개 동의 / Talent-pool disclosure consent',
  })
  @IsBoolean()
  isOpenToScout: boolean;

  @ApiProperty({
    description: '동의문 버전 / Consent policy version',
    example: 'talent-disclosure-2026-08-03',
  })
  @IsString()
  @MaxLength(30)
  @Matches(/^[a-z0-9-]+$/)
  consentVersion: string;
}
