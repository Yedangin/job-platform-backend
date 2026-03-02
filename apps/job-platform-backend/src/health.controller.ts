import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { AuthPrismaService, RedisService } from 'libs/common/src';

/**
 * 헬스체크 엔드포인트 / Health check endpoint
 * 서비스 상태 + DB/Redis 연결 확인 (spec 11 §7-1)
 * Service status + DB/Redis connection check
 */
@ApiTags('Health')
@Controller('health')
@SkipThrottle()
export class HealthController {
  private readonly startedAt = Date.now();

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly redis: RedisService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Health check — DB/Redis 상태 확인 / Check service health',
  })
  @ApiResponse({ status: 200, description: 'Service is healthy.' })
  async check() {
    const services: Record<string, string> = {};

    // PostgreSQL 연결 확인 / Check PostgreSQL connection
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      services.postgres = 'connected';
    } catch {
      services.postgres = 'disconnected';
    }

    // Redis 연결 확인 / Check Redis connection
    try {
      await this.redis.ping();
      services.redis = 'connected';
    } catch {
      services.redis = 'disconnected';
    }

    const allConnected = Object.values(services).every(
      (s) => s === 'connected',
    );

    return {
      status: allConnected ? 'OK' : 'DEGRADED',
      uptime: Math.floor((Date.now() - this.startedAt) / 1000),
      services,
    };
  }
}
