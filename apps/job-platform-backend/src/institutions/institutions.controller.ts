/**
 * 교육기관 검색 API / Educational institutions search API
 *
 * D-2, D-4 비자의 거리 제한 검증에 사용
 * Used for distance restriction validation for D-2, D-4 visas
 */

import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { InstitutionsService } from './institutions.service';
import { InstitutionSearchDto, InstitutionDto } from './dto/institution.dto';

@ApiTags('Institutions')
@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  /**
   * 교육기관 검색 / Search educational institutions
   *
   * @param query - 검색 쿼리 / Search query
   * @returns 매칭된 교육기관 목록 / Matched institutions list
   */
  @Get('search')
  @ApiOperation({
    summary: '교육기관 검색 / Search institutions',
    description:
      '국내 대학교, 어학당 검색 (자동완성용) / Search Korean universities and language institutes (for autocomplete)',
  })
  @ApiQuery({
    name: 'q',
    required: true,
    description: '검색어 / Search keyword',
    example: '서울대',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    description: '교육기관 유형 필터 / Institution type filter',
    enum: [
      'UNIVERSITY',
      'COLLEGE',
      'GRADUATE_SCHOOL',
      'LANGUAGE_INSTITUTE',
      'VOCATIONAL_SCHOOL',
    ],
    example: 'UNIVERSITY',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: '최대 결과 수 / Max results',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: '검색 결과 / Search results',
    type: [InstitutionDto],
  })
  async searchInstitutions(
    @Query() query: InstitutionSearchDto,
  ): Promise<InstitutionDto[]> {
    return this.institutionsService.search(query);
  }

  /**
   * 교육기관 상세 정보 조회 / Get institution details
   *
   * @param id - 교육기관 ID / Institution ID
   * @returns 교육기관 상세 정보 / Institution details
   */
  @Get(':id')
  @ApiOperation({
    summary: '교육기관 상세 조회 / Get institution by ID',
    description:
      '특정 교육기관의 상세 정보 조회 / Get detailed information of a specific institution',
  })
  @ApiResponse({
    status: 200,
    description: '교육기관 상세 정보 / Institution details',
    type: InstitutionDto,
  })
  @ApiResponse({
    status: 404,
    description: '교육기관을 찾을 수 없음 / Institution not found',
  })
  async getInstitution(
    @Query('id') id: string,
  ): Promise<InstitutionDto | null> {
    return this.institutionsService.findById(parseInt(id, 10));
  }
}
