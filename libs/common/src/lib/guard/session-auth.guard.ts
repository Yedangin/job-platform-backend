import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { isPublic } from '../decorator/public.decorator';
import { RedisService } from '../redis/redis.service';
import { SessionData } from '../interfaces/session.interface';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (isPublic(context, this.reflector)) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // const response = context.switchToHttp().getResponse();
    const sessionId = request.cookies?.sessionId;

    if (!sessionId) {
      throw new UnauthorizedException('Session not found');
    }

    console.log('Session ID:', sessionId);

    const sessionRaw = await this.redisService.get(`session:${sessionId}`);
    if (!sessionRaw) {
      console.log('Session NOT found in Redis');
      throw new UnauthorizedException('Invalid or expired session');
    }

    console.log('Session found in Redis');
    const session: SessionData = JSON.parse(sessionRaw);

    //Check AT
    try {
      await this.jwtService.verifyAsync(session.accessToken, {
        secret: process.env['JWT_SECRET'],
      });

      console.log('Access token VALID');

      request.session = session;
      request.user = {
        userId: session.userId,
        email: session.email,
        role: session.role,
      };

      return true;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        console.log(' Access token EXPIRED');
      } else {
        console.log(' Access token INVALID');
        throw new UnauthorizedException('Invalid access token');
      }
    }

    //Check RT
    let refreshPayload: any;

    try {
      refreshPayload = await this.jwtService.verifyAsync(session.refreshToken, {
        secret: process.env['JWT_SECRET'],
      });
      console.log(' Refresh token VALID – issuing new access token');
    } catch {
      console.log('Refresh token EXPIRED / INVALID');

      await this.redisService.del(`session:${sessionId}`);

      console.log(' Session removed from Redis');
      console.log(' USER MUST LOGIN AGAIN');

      throw new UnauthorizedException('Session expired, please login again');
    }

    // Issue New AT
    const newAccessToken = await this.jwtService.signAsync(
      {
        userId: refreshPayload.userId,
        email: refreshPayload.email,
        role: refreshPayload.role,
      },
      {
        secret: process.env['JWT_SECRET'],
        expiresIn: '15m',
      }
    );

    const updatedSession: SessionData = {
      ...session,
      accessToken: newAccessToken,
    };

    await this.redisService.set(
      `session:${sessionId}`,
      JSON.stringify(updatedSession)
    );

    request.session = updatedSession;
    request.user = {
      userId: session.userId,
      email: session.email,
      role: session.role,
    };

    // response.setHeader('x-access-token', newAccessToken);

    return true;
  }
}
