import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  InfoBoardAudienceEnum,
  InfoBoardLocaleEnum,
  InfoBoardStatusEnum,
  InfoCategoryEnum,
} from './info-board.enums';

export class InfoBoardLocaleQueryDto {
  @ApiPropertyOptional({ enum: InfoBoardLocaleEnum, default: 'ko' })
  @IsOptional()
  @IsEnum(InfoBoardLocaleEnum)
  locale?: InfoBoardLocaleEnum;

  @ApiPropertyOptional({ enum: InfoBoardAudienceEnum, default: 'ALL' })
  @IsOptional()
  @IsEnum(InfoBoardAudienceEnum)
  audience?: InfoBoardAudienceEnum;
}

export class InfoBoardQueryDto extends InfoBoardLocaleQueryDto {
  @ApiPropertyOptional({
    enum: InfoCategoryEnum,
    description: '카테고리 필터 / Category filter',
  })
  @IsOptional()
  @IsEnum(InfoCategoryEnum)
  category?: InfoCategoryEnum;

  @ApiPropertyOptional({
    description: '검색어 / Search keyword',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ minimum: 1, maximum: 50, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number;
}

export class FeaturedInfoBoardQueryDto {
  @ApiPropertyOptional({ enum: InfoBoardLocaleEnum, default: 'ko' })
  @IsOptional()
  @IsEnum(InfoBoardLocaleEnum)
  locale?: InfoBoardLocaleEnum;

  @ApiPropertyOptional({ minimum: 1, maximum: 8, default: 8 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(8)
  limit?: number;
}

export class AdminInfoBoardQueryDto extends InfoBoardQueryDto {
  @ApiPropertyOptional({ enum: InfoBoardStatusEnum })
  @IsOptional()
  @IsEnum(InfoBoardStatusEnum)
  status?: InfoBoardStatusEnum;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  includeDeleted?: boolean;
}
