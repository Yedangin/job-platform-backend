/**
 * 알바 직종 목록 응답 DTO
 * Alba job categories response DTO
 *
 * 프론트엔드/앱 드롭다운 구성용 (웹/앱 공통)
 * For frontend/app dropdown (shared by web and app)
 *
 * 정규직의 GET /fulltime-visa/e7-categories 와 동일 패턴
 * Same pattern as GET /fulltime-visa/e7-categories for fulltime
 */

import { ApiProperty } from '@nestjs/swagger';

/**
 * 알바 단일 직종 항목 DTO
 * Single alba job category item DTO
 */
export class AlbaJobCategoryDto {
  @ApiProperty({
    description: '플랫폼 직종 코드 / Platform job category code',
    example: 'REST_SERVING',
  })
  code: string;

  @ApiProperty({
    description: '직종명 (한글) / Category name (Korean)',
    example: '음식점 서빙',
  })
  nameKo: string;

  @ApiProperty({
    description: '직종명 (영문) / Category name (English)',
    example: 'Restaurant Serving',
  })
  nameEn: string;

  @ApiProperty({
    description: '그룹 코드 / Group code',
    example: 'FOOD',
  })
  group: string;

  @ApiProperty({
    description: '그룹명 (한글) / Group name (Korean)',
    example: '음식점/카페',
  })
  groupName: string;

  @ApiProperty({
    description: '아이콘 (이모지) / Icon (emoji)',
    example: '🍽️',
  })
  icon: string;

  @ApiProperty({
    description: 'KSIC 대분류 코드 / KSIC section code',
    example: 'I',
  })
  ksicCode: string;

  @ApiProperty({
    description: '단순노무 해당 여부 / Whether classified as simple labor',
    example: false,
  })
  isSimpleLabor: boolean;

  @ApiProperty({
    description: '유흥업소 해당 여부 / Whether classified as entertainment',
    example: false,
  })
  isEntertainment: boolean;
}

/**
 * 알바 직종 그룹 DTO
 * Alba job category group DTO
 */
export class AlbaCategoryGroupDto {
  @ApiProperty({
    description: '그룹 코드 / Group code',
    example: 'FOOD',
  })
  group: string;

  @ApiProperty({
    description: '그룹명 (한글) / Group name (Korean)',
    example: '음식점/카페',
  })
  groupName: string;

  @ApiProperty({
    description: '그룹 내 직종 수 / Category count in group',
    example: 5,
  })
  count: number;
}

/**
 * 알바 직종 목록 응답 DTO
 * Alba job categories list response DTO
 */
export class AlbaCategoriesResponseDto {
  @ApiProperty({
    description: '전체 알바 직종 목록 / All alba job categories',
    type: [AlbaJobCategoryDto],
  })
  categories: AlbaJobCategoryDto[];

  @ApiProperty({
    description: '직종 그룹 목록 / Category group list',
    type: [AlbaCategoryGroupDto],
  })
  groups: AlbaCategoryGroupDto[];

  @ApiProperty({
    description: '전체 직종 수 / Total category count',
    example: 34,
  })
  totalCount: number;

  @ApiProperty({
    description: '단순노무 직종 수 / Simple labor category count',
    example: 16,
  })
  simpleLaborCount: number;

  @ApiProperty({
    description: '데이터 기준 / Data basis',
    example: 'KSIC 제11차 개정 (통계청 고시 제2024-001호)',
  })
  basedOn: string;
}
