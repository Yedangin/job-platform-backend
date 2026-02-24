import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { BoardType, EmploymentSubType } from '../enums';

export class GetEligibleListingsQueryDto {
  @ApiPropertyOptional({ enum: BoardType })
  @IsOptional()
  @IsEnum(BoardType)
  boardType?: BoardType;

  @ApiPropertyOptional({ description: '검색 키워드 / Search keyword' })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({ enum: EmploymentSubType })
  @IsOptional()
  @IsEnum(EmploymentSubType)
  employmentSubType?: EmploymentSubType;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
