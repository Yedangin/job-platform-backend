/**
 * 플랫폼 공개 설정 서비스 / Platform public configuration service
 *
 * 최저임금, 서비스 설정 등의 조회 로직
 * Business logic for minimum wage, service config, etc.
 */

import { Injectable, Logger } from '@nestjs/common';
import {
  getCurrentMinimumWage,
  getMinimumWageByYear,
  MINIMUM_WAGE_TABLE,
  type MinimumWageData,
} from '../common/data/visa/minimum-wage-standards';

@Injectable()
export class PlatformConfigService {
  private readonly logger = new Logger(PlatformConfigService.name);

  /**
   * 현재 적용 최저임금 조회 / Get current minimum wage
   *
   * @returns 현재 최저임금 데이터 / Current minimum wage data
   */
  getCurrentMinimumWage(): MinimumWageData {
    this.logger.debug('현재 최저임금 조회 / Fetching current minimum wage');
    return getCurrentMinimumWage();
  }

  /**
   * 특정 연도 최저임금 조회 / Get minimum wage by year
   *
   * @param year 조회 연도 / Target year
   * @returns 최저임금 데이터 또는 null / Minimum wage data or null
   */
  getMinimumWageByYear(year: number): MinimumWageData | null {
    this.logger.debug(
      `${year}년 최저임금 조회 / Fetching minimum wage for year ${year}`,
    );
    return getMinimumWageByYear(year) ?? null;
  }

  /**
   * 전체 최저임금 이력 조회 / Get all minimum wage history
   *
   * @returns 연도별 최저임금 목록 / Minimum wage list by year
   */
  getAllMinimumWages(): ReadonlyArray<MinimumWageData> {
    return MINIMUM_WAGE_TABLE;
  }
}
