import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FulltimeAttributesDto {
  @ApiPropertyOptional({
    description: '최소 급여 (만원/월) / Min salary (만원/month)',
    example: 250,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  salaryMin?: number;

  @ApiPropertyOptional({
    description: '최대 급여 (만원/월) / Max salary (만원/month)',
    example: 400,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  salaryMax?: number;

  @ApiPropertyOptional({
    description: '경력 수준 / Experience level',
    example: 'ENTRY',
  })
  @IsOptional()
  @IsString()
  experienceLevel?: string;

  @ApiPropertyOptional({
    description: '학력 수준 / Education level',
    example: 'BACHELOR',
  })
  @IsOptional()
  @IsString()
  educationLevel?: string;
}
