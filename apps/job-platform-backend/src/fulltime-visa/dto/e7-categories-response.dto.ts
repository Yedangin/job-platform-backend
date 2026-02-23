/**
 * E-7 직종 목록 응답 DTO
 * E-7 job categories response DTO
 *
 * 프론트엔드 드롭다운 구성용 (웹/앱 공통)
 * For frontend dropdown (shared by web and app)
 */

import { ApiProperty } from '@nestjs/swagger';

/**
 * E-7 단일 직종 항목 DTO
 * Single E-7 job category item DTO
 */
export class E7JobCategoryDto {
  @ApiProperty({
    description: '법무부 직종 코드 / Ministry of Justice occupation code',
    example: '2223',
  })
  code: string;

  @ApiProperty({
    description: '직종명 (한글) / Occupation name (Korean)',
    example: '응용 소프트웨어 개발자',
  })
  nameKo: string;

  @ApiProperty({
    description: '직종명 (영문) / Occupation name (English)',
    example: 'Application Software Developer',
  })
  nameEn: string;

  @ApiProperty({
    description: 'E-7 서브타입 / E-7 subtype',
    enum: ['E-7-1', 'E-7-2', 'E-7-3'],
    example: 'E-7-1',
  })
  e7Type: 'E-7-1' | 'E-7-2' | 'E-7-3';

  @ApiProperty({
    description: '직종 그룹 (관리자, 전문가, 사무종사자 등) / Category group',
    example: '전문가',
  })
  categoryGroup: string;
}

/**
 * E-7 직종 목록 응답 DTO
 * E-7 job categories list response DTO
 */
export class E7CategoriesResponseDto {
  @ApiProperty({
    description: 'E-7 전체 직종 목록 / All E-7 job categories',
    type: [E7JobCategoryDto],
  })
  categories: E7JobCategoryDto[];

  @ApiProperty({
    description: 'E-7-1 전문인력 직종 수 / E-7-1 professional count',
    example: 67,
  })
  e71Count: number;

  @ApiProperty({
    description: 'E-7-2 준전문인력 직종 수 / E-7-2 semi-professional count',
    example: 10,
  })
  e72Count: number;

  @ApiProperty({
    description: 'E-7-3 일반기능인력 직종 수 / E-7-3 skilled worker count',
    example: 13,
  })
  e73Count: number;

  @ApiProperty({
    description: '전체 직종 수 / Total category count',
    example: 90,
  })
  totalCount: number;

  @ApiProperty({
    description: '법령 기준일 / Legal basis date',
    example: '2026-01-01',
  })
  basedOn: string;
}
