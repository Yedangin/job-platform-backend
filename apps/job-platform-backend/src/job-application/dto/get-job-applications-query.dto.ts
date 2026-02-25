import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetJobApplicationsQueryDto {
  @ApiPropertyOptional({
    description: '지원 상태 필터 / Application status filter',
    example: 'PENDING',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: '페이지 / Page', default: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({ description: '페이지 크기 / Limit', default: 20 })
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
