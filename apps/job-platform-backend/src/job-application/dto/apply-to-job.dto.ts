import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ApplyToJobDto {
  @ApiPropertyOptional({
    description:
      '지원 방법 / Application method (PLATFORM, EXTERNAL_URL, EXTERNAL_EMAIL)',
    example: 'PLATFORM',
  })
  @IsOptional()
  @IsString()
  applicationMethod?: string;

  @ApiPropertyOptional({
    description: '자기소개서 / Cover letter',
    example: 'I am very interested in this position...',
  })
  @IsOptional()
  @IsString()
  coverLetter?: string;
}
