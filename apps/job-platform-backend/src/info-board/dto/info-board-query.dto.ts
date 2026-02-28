import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { InfoCategoryEnum } from './create-info-board.dto';

/**
 * 게시판 목록 조회 쿼리 / Info board list query DTO
 */
export class InfoBoardQueryDto {
  @ApiPropertyOptional({ enum: InfoCategoryEnum, description: '카테고리 필터 / Category filter' })
  @IsOptional()
  @IsEnum(InfoCategoryEnum)
  category?: InfoCategoryEnum;

  @ApiPropertyOptional({ description: '검색어 / Search keyword' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: '페이지 (1부터) / Page number (1-indexed)' })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional({ description: '페이지당 개수 / Items per page' })
  @IsOptional()
  @IsString()
  limit?: string;
}
