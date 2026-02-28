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
}
