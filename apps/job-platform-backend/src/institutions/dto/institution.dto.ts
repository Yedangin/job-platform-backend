/**
 * 교육기관 DTO / Institution DTOs
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export enum InstitutionType {
  UNIVERSITY = 'UNIVERSITY',
  COLLEGE = 'COLLEGE',
  GRADUATE_SCHOOL = 'GRADUATE_SCHOOL',
  LANGUAGE_INSTITUTE = 'LANGUAGE_INSTITUTE',
  VOCATIONAL_SCHOOL = 'VOCATIONAL_SCHOOL',
}

/**
 * 교육기관 검색 요청 DTO / Institution search request DTO
 */
export class InstitutionSearchDto {
  @ApiProperty({
    description: '검색어 / Search keyword',
    example: '서울대',
  })
  @IsString()
  q: string;

  @ApiPropertyOptional({
    description: '교육기관 유형 필터 / Institution type filter',
    enum: InstitutionType,
    example: InstitutionType.UNIVERSITY,
  })
  @IsOptional()
  @IsEnum(InstitutionType)
  type?: InstitutionType;

  @ApiPropertyOptional({
    description: '최대 결과 수 / Max results',
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 50,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;
}

/**
 * 교육기관 응답 DTO / Institution response DTO
 */
export class InstitutionDto {
  @ApiProperty({
    description: '교육기관 ID / Institution ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '교육기관명 (한글) / Institution name (Korean)',
    example: '서울대학교',
  })
  name: string;

  @ApiPropertyOptional({
    description: '교육기관명 (영문) / Institution name (English)',
    example: 'Seoul National University',
  })
  nameEn?: string;

  @ApiProperty({
    description: '교육기관 유형 / Institution type',
    enum: InstitutionType,
    example: InstitutionType.UNIVERSITY,
  })
  type: InstitutionType;

  @ApiProperty({
    description: '주소 / Address',
    example: '서울특별시 관악구 관악로 1',
  })
  address: string;

  @ApiPropertyOptional({
    description: '상세 주소 / Address detail',
    example: '본관',
  })
  addressDetail?: string;

  @ApiProperty({
    description: '위도 / Latitude',
    example: 37.4601,
  })
  latitude: number;

  @ApiProperty({
    description: '경도 / Longitude',
    example: 126.952,
  })
  longitude: number;

  @ApiProperty({
    description: '수도권 여부 / Is metro area',
    example: true,
  })
  isMetroArea: boolean;

  @ApiPropertyOptional({
    description:
      '소속 대학 (어학당의 경우) / Affiliated university (for language institutes)',
    example: '서울대학교',
  })
  affiliatedUniversity?: string;

  @ApiProperty({
    description: '검색 키워드 / Search keywords',
    example: ['서울대', 'SNU', '서울대학교'],
    type: [String],
  })
  searchKeywords: string[];
}
