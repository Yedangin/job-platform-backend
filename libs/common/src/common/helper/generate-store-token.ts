import { JwtService } from '@nestjs/jwt';
import { SessionData } from '../interfaces/session.interface';
import { RedisService } from '../redis/redis.service';
import { v4 as uuidv4 } from 'uuid';
import { Injectable, Logger } from '@nestjs/common';

export type Payload = {
  userId: string;
  email: string | null;
  role: string;
};

// 세션 TTL: 24시간 (활동 시 슬라이딩 연장)
// Session TTL: 24 hours (sliding window on activity)
export const SESSION_TTL_SECONDS = 24 * 60 * 60; // 24 hours

// 동시 세션 최대 개수 / Maximum concurrent sessions per user
const MAX_CONCURRENT_SESSIONS = 3;

@Injectable()
export class GenerateStoreToken {
  private readonly logger = new Logger(GenerateStoreToken.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}
  async generate(payload: Payload): Promise<string> {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
    });

    // 세션 ID 생성 (보안을 위해 JWT 형태) / Generate session ID (also as JWT for security)
    const sessionId = this.jwtService.sign(
      { sessionUuid: uuidv4(), userId: payload.userId },
      { expiresIn: '1d' },
    );

    // Redis에 세션 데이터 저장 / Store session data in Redis
    const sessionData: SessionData = {
      userId: payload.userId,
      email: payload.email || '',
      role: payload.role,
      accessToken,
      refreshToken,
    };

    // 24시간 TTL로 저장 (활동 시 슬라이딩 연장)
    // Store with 24h TTL (renewed on activity via sliding window)
    await this.redisService.set(
      `session:${sessionId}`,
      JSON.stringify(sessionData),
      SESSION_TTL_SECONDS,
    );

    // 동시 세션 제한: sorted set에 세션 추적, 초과 시 가장 오래된 세션 삭제
    // Concurrent session limit: track in sorted set, evict oldest if over limit
    await this.enforceSessionLimit(payload.userId, sessionId);

    return sessionId;
  }

  /**
   * 동시 세션 제한 적용 / Enforce concurrent session limit
   * Redis sorted set으로 사용자별 세션 추적, 최대 3개 초과 시 오래된 세션 삭제
   * Track per-user sessions in sorted set, evict oldest if exceeding max
   */
  private async enforceSessionLimit(
    userId: string,
    newSessionId: string,
  ): Promise<void> {
    const setKey = `user_sessions:${userId}`;
    const now = Date.now();

    try {
      // 새 세션을 sorted set에 추가 (score = 현재 타임스탬프)
      // Add new session to sorted set (score = current timestamp)
      await this.redisService.zadd(setKey, now, newSessionId);

      // sorted set TTL 설정 (세션보다 약간 길게)
      // Set sorted set TTL (slightly longer than session)
      await this.redisService.expire(setKey, SESSION_TTL_SECONDS + 3600);

      // 현재 세션 수 확인 / Check current session count
      const sessionCount = await this.redisService.zcard(setKey);

      if (sessionCount > MAX_CONCURRENT_SESSIONS) {
        // 가장 오래된 세션 가져오기 (score가 낮은 순)
        // Get oldest sessions (lowest score first)
        const excessCount = sessionCount - MAX_CONCURRENT_SESSIONS;
        const oldestSessions = await this.redisService.zrange(
          setKey,
          0,
          excessCount - 1,
        );

        for (const oldSessionId of oldestSessions) {
          // Redis에서 세션 데이터 삭제 / Delete session data from Redis
          await this.redisService.del(`session:${oldSessionId}`);
          // sorted set에서 제거 / Remove from sorted set
          await this.redisService.zrem(setKey, oldSessionId);
          this.logger.log(
            `[세션 제한] 오래된 세션 삭제 / [Session limit] Evicted old session for user ${userId}`,
          );
        }
      }
    } catch (error) {
      // 세션 제한 실패는 로그인을 차단하지 않음 / Session limit failure should not block login
      this.logger.warn(
        `[세션 제한 오류] / [Session limit error]: ${error.message}`,
      );
    }
  }
}
