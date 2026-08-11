import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { InfoBoardLocaleEnum } from './info-board.enums';

export class TranslateInfoBoardDto {
  @ApiProperty({ enum: InfoBoardLocaleEnum })
  @IsEnum(InfoBoardLocaleEnum)
  sourceLocale: InfoBoardLocaleEnum;

  @ApiProperty({ enum: InfoBoardLocaleEnum, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  @ArrayUnique()
  @IsEnum(InfoBoardLocaleEnum, { each: true })
  targetLocales: InfoBoardLocaleEnum[];

  @ApiProperty({ maxLength: 200 })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiProperty({ required: false, maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  summary?: string;

  @ApiProperty()
  @IsString()
  content: string;
}
