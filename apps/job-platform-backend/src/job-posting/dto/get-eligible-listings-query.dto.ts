import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
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

  @ApiPropertyOptional({ description: '페이지 번호 / Page number', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    description: '페이지 크기 / Items per page',
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
