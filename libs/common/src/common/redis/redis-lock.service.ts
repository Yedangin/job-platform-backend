/**
 * Redis 기반 분산 락 서비스
 * Redis-based distributed lock service
 *
 * 다중 인스턴스 환경에서 Cron 중복 실행 방지용
 * Prevents duplicate cron execution in multi-instance deployments
 *
 * 패턴 / Pattern: SET key value NX EX ttl (atomic lock acquire)
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from './redis.service';
import { randomUUID } from 'crypto';

@Injectable()
export class RedisLockService {
  private readonly logger = new Logger(RedisLockService.name);

  constructor(private readonly redis: RedisService) {}

  /**
   * 분산 락 획득 시도
   * Attempt to acquire a distributed lock
   *
   * @param lockKey 락 키 / Lock key (e.g., 'cron:job-expire')
   * @param ttlSeconds 락 자동 해제 시간(초) / Auto-release TTL in seconds
   * @returns lockValue (성공 시) 또는 null (실패 시) / lockValue on success, null on failure
   */
  async acquireLock(
    lockKey: string,
    ttlSeconds: number,
  ): Promise<string | null> {
    const lockValue = randomUUID();
    const acquired = await this.redis.setNx(lockKey, lockValue, ttlSeconds);

    if (acquired) {
      this.logger.debug(
        `락 획득 성공 / Lock acquired: key=${lockKey}, ttl=${ttlSeconds}s`,
      );
    } else {
      this.logger.debug(
        `락 획득 실패 (다른 인스턴스 실행 중) / Lock not acquired (another instance running): key=${lockKey}`,
      );
    }

    return acquired ? lockValue : null;
  }

  /**
   * 분산 락 해제 (소유자만 해제 가능)
   * Release a distributed lock (only the owner can release)
   *
   * @param lockKey 락 키 / Lock key
   * @param lockValue acquireLock에서 반환된 값 / Value returned from acquireLock
   */
  async releaseLock(lockKey: string, lockValue: string): Promise<void> {
    const currentValue = await this.redis.get(lockKey);

    // 소유자 확인 후 삭제 / Verify ownership before deleting
    if (currentValue === lockValue) {
      await this.redis.del(lockKey);
      this.logger.debug(`락 해제 완료 / Lock released: key=${lockKey}`);
    }
  }

  /**
   * 분산 락으로 보호된 작업 실행 헬퍼
   * Helper to execute a task protected by a distributed lock
   *
   * @param lockKey 락 키 / Lock key
   * @param ttlSeconds 락 TTL(초) / Lock TTL in seconds
   * @param task 실행할 비동기 작업 / Async task to execute
   * @returns 작업 실행 여부 / Whether the task was executed
   */
  async withLock(
    lockKey: string,
    ttlSeconds: number,
    task: () => Promise<void>,
  ): Promise<boolean> {
    const lockValue = await this.acquireLock(lockKey, ttlSeconds);
    if (!lockValue) {
      return false;
    }

    try {
      await task();
      return true;
    } finally {
      await this.releaseLock(lockKey, lockValue);
    }
  }
}
