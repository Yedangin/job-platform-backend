import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  InfoBoardAudienceEnum,
  InfoBoardBannerThemeEnum,
  InfoBoardLocaleEnum,
  InfoBoardStatusEnum,
  InfoCategoryEnum,
} from './info-board.enums';

export {
  InfoBoardAudienceEnum,
  InfoBoardBannerThemeEnum,
  InfoBoardLocaleEnum,
  InfoBoardStatusEnum,
  InfoCategoryEnum,
} from './info-board.enums';

export class InfoBoardTranslationDto {
  @ApiProperty({ enum: InfoBoardLocaleEnum })
  @IsEnum(InfoBoardLocaleEnum)
  locale: InfoBoardLocaleEnum;

  @ApiProperty({ maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({ maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  summary?: string;

  @ApiProperty({ description: 'Plain text only', maxLength: 100000 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100000)
  content: string;
}

export class CreateInfoBoardDto {
  @ApiPropertyOptional({
    description: 'Legacy Korean title. Use translations for new clients.',
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title?: string;

  @ApiPropertyOptional({
    description:
      'Legacy Korean plain-text content. Use translations for new clients.',
    maxLength: 100000,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100000)
  content?: string;

  @ApiProperty({ enum: InfoCategoryEnum })
  @IsEnum(InfoCategoryEnum)
  category: InfoCategoryEnum;

  @ApiPropertyOptional({
    description: 'Legacy external thumbnail. HTTPS URLs only.',
    maxLength: 2048,
  })
  @IsOptional()
  @IsUrl(
    {
      protocols: ['https'],
      require_protocol: true,
      require_valid_protocol: true,
    },
    { message: 'thumbnail must be a valid HTTPS URL' },
  )
  @MaxLength(2048)
  thumbnail?: string;

  @ApiPropertyOptional({ enum: InfoBoardStatusEnum, default: 'DRAFT' })
  @IsOptional()
  @IsEnum(InfoBoardStatusEnum)
  status?: InfoBoardStatusEnum;

  @ApiPropertyOptional({ enum: InfoBoardAudienceEnum, default: 'ALL' })
  @IsOptional()
  @IsEnum(InfoBoardAudienceEnum)
  audience?: InfoBoardAudienceEnum;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPinned?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ minimum: 1, maximum: 8 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(8)
  featuredOrder?: number;

  @ApiPropertyOptional({ enum: InfoBoardBannerThemeEnum, default: 'BRAND' })
  @IsOptional()
  @IsEnum(InfoBoardBannerThemeEnum)
  bannerTheme?: InfoBoardBannerThemeEnum;

  @ApiPropertyOptional({ minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  bannerAssetId?: number;

  @ApiPropertyOptional({ description: 'ISO 8601 slider exposure start time' })
  @IsOptional()
  @IsISO8601({ strict: true })
  featuredStartAt?: string;

  @ApiPropertyOptional({ description: 'ISO 8601 slider exposure end time' })
  @IsOptional()
  @IsISO8601({ strict: true })
  featuredEndAt?: string;

  @ApiPropertyOptional({
    description: 'ISO 8601 timestamp; required for SCHEDULED',
  })
  @IsOptional()
  @IsISO8601({ strict: true })
  scheduledAt?: string;

  @ApiPropertyOptional({ type: [InfoBoardTranslationDto] })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @ArrayUnique((translation: InfoBoardTranslationDto) => translation.locale)
  @ValidateNested({ each: true })
  @Type(() => InfoBoardTranslationDto)
  translations?: InfoBoardTranslationDto[];

  @ApiPropertyOptional({ type: [Number], maxItems: 20 })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(Number.MAX_SAFE_INTEGER, { each: true })
  @Type(() => Number)
  attachmentIds?: number[];
}
