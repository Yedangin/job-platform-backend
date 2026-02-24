import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { BoardType, TierType, EmploymentSubType } from '../enums';

export class GetJobListingsQueryDto {
  @ApiPropertyOptional({ enum: BoardType })
  @IsOptional()
  @IsEnum(BoardType)
  boardType?: BoardType;

  @ApiPropertyOptional({ enum: TierType })
  @IsOptional()
  @IsEnum(TierType)
  tierType?: TierType;

  @ApiPropertyOptional({ description: '비자 코드 필터 / Visa code filter' })
  @IsOptional()
  @IsString()
  visa?: string;

  @ApiPropertyOptional({ description: '검색 키워드 / Search keyword' })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({ enum: EmploymentSubType })
  @IsOptional()
  @IsEnum(EmploymentSubType)
  employmentSubType?: EmploymentSubType;

  @ApiPropertyOptional({
    description: '비자 필터 적용 여부 / Apply visa filter',
    example: 'true',
  })
  @IsOptional()
  @IsString()
  visaFilter?: string;

  @ApiPropertyOptional({ description: '페이지 / Page', default: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({ description: '페이지 크기 / Limit', default: 20 })
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
