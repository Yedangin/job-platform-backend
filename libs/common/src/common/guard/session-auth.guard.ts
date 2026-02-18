import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isPublic } from '../decorator/public.decorator';
import { RedisService } from '../redis/redis.service';

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
    const bearerSessionId =
      authHeader?.toLowerCase().startsWith('bearer ')
        ? authHeader.slice(7).trim()
        : undefined;
    const sessionId = cookieSessionId || bearerSessionId;

    if (!sessionId) {
      throw new UnauthorizedException('Session not found');
    }

    // Validate session exists in Redis
    const sessionData = await this.redisService.get(`session:${sessionId}`);

    if (!sessionData) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    // Attach session data to request for use in controllers
    request.session = JSON.parse(sessionData);

    return true;
  }
}
