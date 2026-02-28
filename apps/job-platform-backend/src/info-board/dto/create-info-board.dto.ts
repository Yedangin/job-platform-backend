import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * 정보 게시판 카테고리 / Info board categories
 */
export enum InfoCategoryEnum {
  VISA_INFO = 'VISA_INFO',
  EDUCATION = 'EDUCATION',
  LIVING_TIPS = 'LIVING_TIPS',
  POLICY_LAW = 'POLICY_LAW',
  ANNOUNCEMENTS = 'ANNOUNCEMENTS',
}

/**
 * 게시글 생성 DTO / Create info board post DTO
 */
export class CreateInfoBoardDto {
  @ApiProperty({ description: '게시글 제목 / Post title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: '게시글 내용 / Post content' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ enum: InfoCategoryEnum, description: '카테고리 / Category' })
  @IsEnum(InfoCategoryEnum)
  category: InfoCategoryEnum;

  @ApiProperty({ required: false, description: '썸네일 URL / Thumbnail URL' })
  @IsOptional()
  @IsString()
  thumbnail?: string;
}
