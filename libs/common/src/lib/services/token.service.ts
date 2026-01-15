import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';
import { SessionData } from '../interfaces/session.interface';
import * as crypto from 'crypto';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService
  ) {}

  /**
   * Refresh access token using session ID
   * This can be called when access token expires
   */
  async refreshAccessToken(sessionId: string): Promise<string> {
    // Get session data from Redis
    const sessionDataStr = await this.redisService.get(`session:${sessionId}`);

    if (!sessionDataStr) {
      throw new Error('Invalid or expired session');
    }

    const sessionData: SessionData = JSON.parse(sessionDataStr);

    // Verify refresh token is still valid
    try {
      this.jwtService.verify(sessionData.refreshToken);
    } catch (error) {
      throw new Error('Refresh token expired');
    }

    // Generate new access token
    const payload = {
      userId: sessionData.userId,
      email: sessionData.email,
      role: sessionData.role,
    };

    const newAccessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    // Update session data in Redis
    sessionData.accessToken = newAccessToken;
    await this.redisService.set(
      `session:${sessionId}`,
      JSON.stringify(sessionData),
      7 * 24 * 60 * 60 // Keep same TTL
    );

    return newAccessToken;
  }

  /**
   * Verify if access token is valid
   */
  verifyAccessToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }

  /**
   * Generate email verification token using crypto
   */
  generateVerificationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Decode token without verification (useful for debugging)
   */
  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}
