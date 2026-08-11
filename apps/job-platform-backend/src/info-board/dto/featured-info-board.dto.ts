import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  InfoBoardBannerThemeEnum,
  InfoBoardLocaleEnum,
} from './info-board.enums';

export class FeaturedBannerAssetDto {
  @ApiProperty({ enum: InfoBoardLocaleEnum })
  @IsEnum(InfoBoardLocaleEnum)
  locale: InfoBoardLocaleEnum;

  @ApiProperty({ minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  assetId: number;
}

export class FeaturedOrderItemDto {
  @ApiProperty({ minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id: number;

  @ApiProperty({ minimum: 1, maximum: 8 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(8)
  order: number;

  @ApiProperty({ minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  expectedVersion: number;
}

export class ReorderFeaturedInfoBoardDto {
  @ApiProperty({ type: [FeaturedOrderItemDto], maxItems: 8 })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(8)
  @ArrayUnique((item: FeaturedOrderItemDto) => item.id)
  @ValidateNested({ each: true })
  @Type(() => FeaturedOrderItemDto)
  items: FeaturedOrderItemDto[];
}

export class RemoveFeaturedInfoBoardDto {
  @ApiProperty({ minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  expectedVersion: number;
}

export class ConfigureFeaturedInfoBoardDto {
  @ApiProperty({ minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  expectedVersion: number;

  @ApiProperty({ minimum: 1, maximum: 8 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(8)
  featuredOrder: number;

  @ApiProperty({ enum: InfoBoardBannerThemeEnum })
  @IsEnum(InfoBoardBannerThemeEnum)
  bannerTheme: InfoBoardBannerThemeEnum;

  @ApiProperty({
    type: [FeaturedBannerAssetDto],
    minItems: 1,
    maxItems: 5,
    description: 'A base image plus optional locale-specific overrides',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @ArrayUnique((item: FeaturedBannerAssetDto) => item.locale)
  @ValidateNested({ each: true })
  @Type(() => FeaturedBannerAssetDto)
  bannerAssets: FeaturedBannerAssetDto[];

  @IsOptional()
  @IsISO8601({ strict: true })
  featuredStartAt?: string;

  @IsOptional()
  @IsISO8601({ strict: true })
  featuredEndAt?: string;
}
