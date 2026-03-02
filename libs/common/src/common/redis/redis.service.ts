import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT!) || 6379,
      },
    });

    this.client.on('error', (err) =>
      this.logger.error('Redis Client Error', err),
    );
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.setEx(key, ttl, value);
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }

  /**
   * Redis PING — 연결 상태 확인 / Check connection status
   * @returns 'PONG' on success
   */
  async ping(): Promise<string> {
    return await this.client.ping();
  }

  /**
   * SET NX (Not eXists) — 키가 없을 때만 설정 (분산 락용)
   * SET NX — only set if key does not exist (for distributed locks)
   *
   * @returns true: 설정 성공 (락 획득), false: 이미 존재 (락 실패)
   * @returns true: key was set (lock acquired), false: key already exists (lock failed)
   */
  async setNx(
    key: string,
    value: string,
    ttlSeconds: number,
  ): Promise<boolean> {
    const result = await this.client.set(key, value, {
      NX: true,
      EX: ttlSeconds,
    });
    return result === 'OK';
  }

  /**
   * TTL 갱신 (세션 슬라이딩용)
   * Refresh TTL on existing key (for session sliding)
   */
  async expire(key: string, ttlSeconds: number): Promise<boolean> {
    const result = await this.client.expire(key, ttlSeconds);
    return Boolean(result);
  }

  // 패턴에 매칭되는 모든 키를 SCAN으로 조회
  // Retrieve all keys matching a pattern using Redis SCAN (safe for large keyspaces)
  async keys(pattern: string): Promise<string[]> {
    const result: string[] = [];

    // redis v4 scanIterator: 매 이터레이션마다 string[] (배치) 를 yield함
    // redis v4 scanIterator: yields a string[] (batch) per iteration
    for await (const batch of this.client.scanIterator({
      MATCH: pattern,
      COUNT: 100,
    })) {
      // batch가 string[]이므로 각 항목을 result에 추가
      // batch is string[], push each item individually
      if (Array.isArray(batch)) {
        result.push(...(batch as string[]));
      } else {
        result.push(batch as string);
      }
    }

    return result;
  }

  // --- Sorted Set 연산 (동시 세션 제한용) ---
  // --- Sorted Set operations (for concurrent session limit) ---

  /**
   * Sorted Set에 멤버 추가 / Add member to sorted set
   * @param key Redis key
   * @param score 정렬 점수 (타임스탬프) / Sort score (timestamp)
   * @param member 멤버 값 / Member value
   */
  async zadd(key: string, score: number, member: string): Promise<number> {
    return await this.client.zAdd(key, { score, value: member });
  }

  /**
   * Sorted Set 크기 반환 / Get sorted set cardinality
   */
  async zcard(key: string): Promise<number> {
    return await this.client.zCard(key);
  }

  /**
   * Sorted Set 범위 조회 (인덱스 기반) / Get range from sorted set by index
   * @param start 시작 인덱스 / Start index
   * @param stop 끝 인덱스 / End index
   */
  async zrange(key: string, start: number, stop: number): Promise<string[]> {
    return await this.client.zRange(key, start, stop);
  }

  /**
   * Sorted Set에서 멤버 제거 / Remove member from sorted set
   */
  async zrem(key: string, member: string): Promise<number> {
    return await this.client.zRem(key, member);
  }

  /**
   * 키의 카운터 증가 / Increment counter for key
   * @returns 증가 후 값 / Value after increment
   */
  async incr(key: string): Promise<number> {
    return await this.client.incr(key);
  }
}
