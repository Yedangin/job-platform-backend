/**
 * 알림 스케줄러 / Notification scheduler
 * Cron 기반 자동 알림: 비자 만료, 공고 만료, 프리미엄 만료, 면접 리마인더
 * Cron-based auto notifications: visa expiry, job expiry, premium expiry, interview reminder
 */
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AuthPrismaService } from 'libs/common/src';
import { NotificationTriggerService } from './notification-trigger.service';

@Injectable()
export class NotificationCronService {
  private readonly logger = new Logger(NotificationCronService.name);

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly trigger: NotificationTriggerService,
  ) {}

  /**
   * 매일 09:00 KST 실행 / Run daily at 09:00 KST (00:00 UTC)
   * 비자 만료 경고 (D-90, D-60, D-30, D-7)
   * Visa expiry warning at D-90, D-60, D-30, D-7
   */
  @Cron('0 0 * * *') // 09:00 KST = 00:00 UTC
  async checkVisaExpiry() {
    this.logger.log(
      '비자 만료 경고 Cron 시작 / Visa expiry warning cron started',
    );

    const thresholds = [90, 60, 30, 7]; // D-N days

    for (const days of thresholds) {
      try {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + days);
        const dateStr = targetDate.toISOString().slice(0, 10);

        // 비자 만료일이 정확히 D-N인 사용자 조회 / Find users with visa expiry on D-N
        const profiles = await this.prisma.individualProfile.findMany({
          where: {
            visaExpiryDate: {
              gte: new Date(`${dateStr}T00:00:00Z`),
              lt: new Date(`${dateStr}T23:59:59Z`),
            },
          },
          select: {
            authId: true,
            user: {
              select: { id: true, email: true },
            },
            visaType: true,
            visaExpiryDate: true,
          },
        });

        for (const p of profiles) {
          if (!p.user) continue;
          await this.trigger.fire(
            'N-11',
            p.user.id,
            {
              daysLeft: days,
              visaType: p.visaType || '체류자격',
              expiryDate: p.visaExpiryDate?.toISOString().slice(0, 10) || '',
            },
            { email: p.user.email || undefined },
          );
        }

        if (profiles.length > 0) {
          this.logger.log(
            `비자 만료 D-${days}: ${profiles.length}명 알림 / Visa expiry D-${days}: ${profiles.length} notified`,
          );
        }
      } catch (err) {
        this.logger.error(
          `비자 만료 D-${days} 처리 실패 / Visa expiry D-${days} failed: ${err}`,
        );
      }
    }
  }

  /**
   * 매일 09:00 KST 실행 / Run daily at 09:00 KST
   * 공고 만료 3일 전 알림 (N-18)
   * Job expiry warning D-3 (N-18)
   */
  @Cron('0 0 * * *')
  async checkJobExpiry() {
    this.logger.log(
      '공고 만료 경고 Cron 시작 / Job expiry warning cron started',
    );

    try {
      const d3 = new Date();
      d3.setDate(d3.getDate() + 3);
      const dateStr = d3.toISOString().slice(0, 10);

      // 만료 D-3 공고 조회 (ACTIVE 상태만) / Find active jobs expiring in 3 days
      const jobs = await this.prisma.jobPosting.findMany({
        where: {
          status: 'ACTIVE',
          expiresAt: {
            gte: new Date(`${dateStr}T00:00:00Z`),
            lt: new Date(`${dateStr}T23:59:59Z`),
          },
        },
        select: {
          id: true,
          title: true,
          corporateId: true,
        },
      });

      for (const job of jobs) {
        // corporateId → authId 조회 / Lookup authId from corporateId
        const corp = await this.prisma.corporateProfile.findUnique({
          where: { companyId: job.corporateId },
          select: { authId: true },
        });
        if (!corp) continue;
        await this.trigger.fire(
          'N-18',
          corp.authId,
          {
            title: job.title,
            daysLeft: 3,
            jobId: job.id.toString(),
          },
          { relatedJobPostId: job.id.toString() },
        );
      }

      if (jobs.length > 0) {
        this.logger.log(
          `공고 만료 D-3: ${jobs.length}건 알림 / Job expiry D-3: ${jobs.length} notified`,
        );
      }
    } catch (err) {
      this.logger.error(
        `공고 만료 체크 실패 / Job expiry check failed: ${err}`,
      );
    }
  }

  /**
   * 매일 09:00 KST 실행 / Run daily at 09:00 KST
   * 프리미엄 만료 3일 전 알림 (N-29)
   * Premium expiry warning D-3 (N-29)
   */
  @Cron('0 0 * * *')
  async checkPremiumExpiry() {
    this.logger.log(
      '프리미엄 만료 경고 Cron 시작 / Premium expiry warning cron started',
    );

    try {
      const d3 = new Date();
      d3.setDate(d3.getDate() + 3);
      const dateStr = d3.toISOString().slice(0, 10);

      const premiumJobs = await this.prisma.jobPosting.findMany({
        where: {
          isPremium: true,
          premiumEndAt: {
            gte: new Date(`${dateStr}T00:00:00Z`),
            lt: new Date(`${dateStr}T23:59:59Z`),
          },
        },
        select: {
          id: true,
          title: true,
          corporateId: true,
        },
      });

      for (const job of premiumJobs) {
        // corporateId → authId 조회 / Lookup authId from corporateId
        const corp = await this.prisma.corporateProfile.findUnique({
          where: { companyId: job.corporateId },
          select: { authId: true },
        });
        if (!corp) continue;
        await this.trigger.fire(
          'N-29',
          corp.authId,
          {
            title: job.title,
            daysLeft: 3,
            jobId: job.id.toString(),
          },
          { relatedJobPostId: job.id.toString() },
        );
      }

      if (premiumJobs.length > 0) {
        this.logger.log(
          `프리미엄 만료 D-3: ${premiumJobs.length}건 알림 / Premium expiry D-3: ${premiumJobs.length} notified`,
        );
      }
    } catch (err) {
      this.logger.error(
        `프리미엄 만료 체크 실패 / Premium expiry check failed: ${err}`,
      );
    }
  }

  /**
   * 매일 09:00 KST 실행 / Run daily at 09:00 KST
   * 기업인증 SLA 3일 경과 알림 (N-05)
   * Corporate verification SLA 3-day overdue (N-05)
   */
  @Cron('0 0 * * *')
  async checkVerificationSLA() {
    this.logger.log(
      '기업인증 SLA 체크 Cron 시작 / Verification SLA check cron started',
    );

    try {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      // 제출 후 3일 경과된 인증 건 조회 / Count verifications submitted 3+ days ago
      const pendingCount = await this.prisma.corporateProfile.count({
        where: {
          verificationStatus: 'SUBMITTED',
          submittedAt: { lt: threeDaysAgo },
        },
      });

      if (pendingCount > 0) {
        // 어드민 사용자에게 알림 / Notify admin users
        const admins = await this.prisma.user.findMany({
          where: { userType: 'ADMIN' },
          select: { id: true },
        });

        for (const admin of admins) {
          await this.trigger.fire('N-05', admin.id, {
            count: pendingCount,
          });
        }

        this.logger.log(
          `기업인증 SLA 3일 경과: ${pendingCount}건 → ${admins.length}명 어드민 알림 / Verification SLA: ${pendingCount} overdue → ${admins.length} admins notified`,
        );
      }
    } catch (err) {
      this.logger.error(
        `기업인증 SLA 체크 실패 / Verification SLA check failed: ${err}`,
      );
    }
  }

  /**
   * 매일 09:00 KST 실행 / Run daily at 09:00 KST
   * 재진단 쿠폰 활성화 알림 (N-12)
   * Rediagnosis coupon activation notification
   */
  @Cron('0 0 * * *')
  async checkCouponActivation() {
    this.logger.log(
      '쿠폰 활성화 체크 Cron 시작 / Coupon activation check cron started',
    );

    try {
      const today = new Date();

      // 오늘 활성화되는 쿠폰 조회 / Find coupons activating today
      const coupons = await this.prisma.rediagnosisCoupon.findMany({
        where: {
          status: 'ISSUED',
          availableAt: {
            gte: new Date(today.toISOString().slice(0, 10) + 'T00:00:00Z'),
            lt: new Date(today.toISOString().slice(0, 10) + 'T23:59:59Z'),
          },
        },
        select: {
          id: true,
          userId: true,
          couponCode: true,
          expiresAt: true,
        },
      });

      for (const c of coupons) {
        // 상태 업데이트 / Update status
        await this.prisma.rediagnosisCoupon.update({
          where: { id: c.id },
          data: { status: 'AVAILABLE' },
        });

        await this.trigger.fire('N-12', c.userId, {
          couponCode: c.couponCode,
          expiryDate: c.expiresAt.toISOString().slice(0, 10),
        });
      }

      if (coupons.length > 0) {
        this.logger.log(
          `쿠폰 활성화: ${coupons.length}건 / Coupons activated: ${coupons.length}`,
        );
      }
    } catch (err) {
      this.logger.error(
        `쿠폰 활성화 체크 실패 / Coupon activation check failed: ${err}`,
      );
    }
  }
}
