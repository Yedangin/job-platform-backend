/**
 * 플랫폼 공개 설정 모듈 / Platform public configuration module
 *
 * 최저임금, 서비스 설정 등 공개 API 제공
 * Provides public APIs for minimum wage, service config, etc.
 */

import { Module } from '@nestjs/common';
import { PlatformConfigController } from './platform-config.controller';
import { PlatformConfigService } from './platform-config.service';

@Module({
  controllers: [PlatformConfigController],
  providers: [PlatformConfigService],
  exports: [PlatformConfigService],
})
export class PlatformConfigModule {}
