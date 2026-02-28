/**
 * 공고 만료/추천 해제 크론 서비스
 * Job expiry & featured removal cron service
 *
 * - 매일 00:00 KST: 만료된 ACTIVE 공고 → EXPIRED
 * - 매일 06:00 KST: featuredUntil 지난 공고 → isFeatured=false
 */
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AuthPrismaService, RedisLockService } from 'libs/common/src';

@Injectable()
export class JobCronService {
  private readonly logger = new Logger(JobCronService.name);

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly lock: RedisLockService,
  ) {}

  /**
   * 매일 00:00 KST — 만료된 공고 상태 변경
   * Daily 00:00 KST — Expire active job postings
   *
   * expiresAt < now() && status=ACTIVE → status=EXPIRED
   */
  @Cron('0 0 0 * * *', { name: 'job-expire', timeZone: 'Asia/Seoul' })
  async handleExpiredJobs() {
    // 분산 락: 다중 인스턴스 중복 실행 방지 / Distributed lock: prevent duplicate execution
    const executed = await this.lock.withLock(
      'cron:job-expire',
      300,
      async () => {
        const now = new Date();

        // 만료 대상 공고 업데이트 / Update expired postings
        const result = await this.prisma.jobPosting.updateMany({
          where: {
            status: 'ACTIVE',
            expiresAt: { lt: now },
            NOT: { expiresAt: null },
          },
          data: { status: 'EXPIRED' },
        });

        if (result.count > 0) {
          this.logger.log(
            `[Cron:JobExpire] ${result.count}건 공고 만료 처리 / ${result.count} postings expired`,
          );
        }

        // 만료 3일 전 공고 로그 / Log postings expiring in 3 days
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

        const soonExpiring = await this.prisma.jobPosting.findMany({
          where: {
            status: 'ACTIVE',
            expiresAt: { gt: now, lt: threeDaysFromNow },
          },
          select: { id: true, title: true, expiresAt: true, corporateId: true },
        });

        if (soonExpiring.length > 0) {
          this.logger.log(
            `[Cron:JobExpire] ${soonExpiring.length}건 공고 3일 내 만료 예정 / ${soonExpiring.length} postings expiring within 3 days`,
          );
          for (const job of soonExpiring) {
            this.logger.log(
              `  → jobId=${job.id}, title="${job.title}", expiresAt=${job.expiresAt?.toISOString()}`,
            );
          }
        }
      },
    );

    if (!executed) {
      this.logger.debug(
        '[Cron:JobExpire] 다른 인스턴스에서 실행 중 — 스킵 / Another instance running — skipped',
      );
    }
  }

  /**
   * 매일 06:00 KST — 추천 기간 만료 처리
   * Daily 06:00 KST — Remove expired featured status
   *
   * isFeatured=true && featuredUntil < now() → isFeatured=false
   */
  @Cron('0 0 6 * * *', { name: 'job-featured-expire', timeZone: 'Asia/Seoul' })
  async handleExpiredFeatured() {
    const executed = await this.lock.withLock(
      'cron:job-featured-expire',
      120,
      async () => {
        const now = new Date();

        const result = await this.prisma.jobPosting.updateMany({
          where: {
            isFeatured: true,
            featuredUntil: { lt: now },
            NOT: { featuredUntil: null },
          },
          data: { isFeatured: false },
        });

        if (result.count > 0) {
          this.logger.log(
            `[Cron:FeaturedExpire] ${result.count}건 추천 해제 / ${result.count} featured statuses removed`,
          );
        }
      },
    );

    if (!executed) {
      this.logger.debug(
        '[Cron:FeaturedExpire] 다른 인스턴스에서 실행 중 — 스킵 / Another instance running — skipped',
      );
    }
  }
}
