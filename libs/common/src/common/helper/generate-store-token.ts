import { JwtService } from '@nestjs/jwt';
import { SessionData } from '../interfaces/session.interface';
import { RedisService } from '../redis/redis.service';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';

export type Payload = {
  userId: string;
  email: string | null;
  role: string;
};
@Injectable()
export class GenerateStoreToken {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}
  async generate(payload: Payload): Promise<string> {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    // Generate session ID (also as JWT for security)
    const sessionId = this.jwtService.sign(
      { sessionUuid: uuidv4(), userId: payload.userId },
      { expiresIn: '7d' },
    );

    // Store session data in Redis
    const sessionData: SessionData = {
      userId: payload.userId,
      email: payload.email || '',
      role: payload.role,
      accessToken,
      refreshToken,
    };

    // Store with 7 days TTL (same as refresh token)
    await this.redisService.set(
      `session:${sessionId}`,
      JSON.stringify(sessionData),
      7 * 24 * 60 * 60, // 7 days in seconds
    );

    return sessionId;
  }
}
