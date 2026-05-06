/**
 * 탈퇴 계정 하드 삭제 Cron
 * Hard-delete scheduled accounts Cron
 *
 * deleteScheduledAt < now() 인 계정을 매일 자정(KST)에 완전 삭제
 * Permanently deletes accounts past their deleteScheduledAt daily at midnight KST
 */
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AuthPrismaService, RedisLockService } from 'libs/common/src';

@Injectable()
export class AuthCronService {
  private readonly logger = new Logger(AuthCronService.name);

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly lock: RedisLockService,
  ) {}

  /**
   * 매일 00:00 KST (15:00 UTC) 실행
   * Run daily at 00:00 KST (15:00 UTC)
   * deleteScheduledAt이 지난 계정 영구 삭제
   * Permanently delete accounts past their scheduled deletion date
   */
  @Cron('0 15 * * *', { timeZone: 'UTC' }) // 00:00 KST = 15:00 UTC
  async hardDeleteExpiredAccounts() {
    const executed = await this.lock.withLock(
      'cron:hard-delete-accounts',
      300, // 5분 TTL / 5 min TTL
      async () => {
        this.logger.log(
          '탈퇴 계정 하드 삭제 Cron 시작 / Hard-delete expired accounts cron started',
        );

        const now = new Date();
        const expiredUsers = await this.prisma.user.findMany({
          where: {
            isActive: false,
            deleteScheduledAt: { lt: now },
          },
          select: { id: true, email: true },
        });

        if (expiredUsers.length === 0) {
          this.logger.log('삭제 대상 계정 없음 / No accounts to delete');
          return;
        }

        this.logger.log(
          `삭제 대상: ${expiredUsers.length}명 / Accounts to delete: ${expiredUsers.length}`,
        );

        for (const user of expiredUsers) {
          try {
            // Cascade delete cascades to all related data via DB relations
            await this.prisma.user.delete({ where: { id: user.id } });
            this.logger.log(
              `계정 삭제 완료: ${user.id} / Account deleted: ${user.id}`,
            );
          } catch (err) {
            this.logger.error(
              `계정 삭제 실패: ${user.id} — ${err.message} / Account delete failed`,
            );
          }
        }

        this.logger.log(
          `하드 삭제 완료: ${expiredUsers.length}건 / Hard-delete done: ${expiredUsers.length}`,
        );
      },
    );

    if (!executed) {
      this.logger.debug(
        '하드 삭제 Cron: 다른 인스턴스 실행 중, 건너뜀 / Cron skipped — another instance running',
      );
    }
  }
}
