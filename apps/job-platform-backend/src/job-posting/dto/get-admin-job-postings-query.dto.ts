import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
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

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
