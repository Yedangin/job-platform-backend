import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PostStatus, BoardType } from '../enums';

export class GetAdminJobPostingsQueryDto {
  @ApiPropertyOptional({ enum: PostStatus })
  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  @ApiPropertyOptional({ enum: BoardType })
  @IsOptional()
  @IsEnum(BoardType)
  boardType?: BoardType;

  @ApiPropertyOptional({
    description: '제목/회사명 검색 / Search title/company',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: '기업 ID 필터 / Corporate ID filter' })
  @IsOptional()
  @IsString()
  corporateId?: string;

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
