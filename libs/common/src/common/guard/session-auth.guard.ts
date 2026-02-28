import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isPublic } from '../decorator/public.decorator';
import { RedisService } from '../redis/redis.service';

// 세션 TTL 상수 / Session TTL constant
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7일 / 7 days

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const _isPublic = isPublic(context, this.reflector);
    if (_isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const cookieSessionId = request.cookies?.sessionId;
    const authHeader: string | undefined = request.headers?.authorization;
    const bearerSessionId = authHeader?.toLowerCase().startsWith('bearer ')
      ? authHeader.slice(7).trim()
      : undefined;
    const sessionId = cookieSessionId || bearerSessionId;

    if (!sessionId) {
      throw new UnauthorizedException('Session not found');
    }

    // 세션 유효성 검증 / Validate session exists in Redis
    const sessionData = await this.redisService.get(`session:${sessionId}`);

    if (!sessionData) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    // 세션 데이터를 요청에 첨부 / Attach session data to request for use in controllers
    request.session = JSON.parse(sessionData);

    // 세션 슬라이딩: 활성 사용자의 TTL을 갱신하여 7일간 미접속 시에만 만료
    // Session sliding: renew TTL on active users — expires only after 7 days of inactivity
    this.redisService
      .expire(`session:${sessionId}`, SESSION_TTL_SECONDS)
      .catch(() => {
        // 슬라이딩 실패는 무시 — 세션 자체는 유효 / Sliding failure is non-critical
      });

    return true;
  }
}
