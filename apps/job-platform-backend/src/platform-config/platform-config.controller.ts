/**
 * 플랫폼 공개 설정 컨트롤러 / Platform public configuration controller
 *
 * 최저임금 등 공개 데이터를 프론트엔드에 제공하는 API
 * Public API for minimum wage and other public config data
 */

import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PlatformConfigService } from './platform-config.service';

@ApiTags('Platform Config / 플랫폼 설정')
@Controller('platform-config')
export class PlatformConfigController {
  constructor(private readonly platformConfigService: PlatformConfigService) {}

  /**
   * 현재 적용 최저임금 조회 / Get current minimum wage
   *
   * 프론트엔드에서 시급 입력 검증에 사용
   * Used by frontend for hourly wage validation
   */
  @Get('minimum-wage')
  @ApiOperation({
    summary: '현재 최저임금 조회 / Get current minimum wage',
    description:
      '현재 날짜 기준 적용 최저임금 데이터 반환. ' +
      'year 파라미터로 특정 연도 조회 가능. ' +
      'Returns current minimum wage data. Use year param for specific year.',
  })
  @ApiQuery({
    name: 'year',
    required: false,
    description:
      '조회 연도 (미입력 시 현재 연도) / Target year (defaults to current)',
    example: 2025,
  })
  @ApiResponse({
    status: 200,
    description: '최저임금 데이터 / Minimum wage data',
    schema: {
      type: 'object',
      properties: {
        year: { type: 'number', example: 2025 },
        hourlyWage: { type: 'number', example: 10030 },
        dailyWage: { type: 'number', example: 80240 },
        monthlyWage: { type: 'number', example: 2096270 },
        effectiveFrom: { type: 'string', example: '2025-01-01' },
        effectiveTo: { type: 'string', example: '2025-12-31' },
        legalBasis: { type: 'string' },
      },
    },
  })
  getMinimumWage(@Query('year') year?: string) {
    if (year) {
      const parsed = parseInt(year, 10);
      const data = this.platformConfigService.getMinimumWageByYear(parsed);
      if (!data) {
        return {
          error: `${parsed}년 최저임금 데이터 없음 / No data for year ${parsed}`,
        };
      }
      return data;
    }
    return this.platformConfigService.getCurrentMinimumWage();
  }
}
