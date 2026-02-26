/**
 * 프리미엄 만료 크론 서비스
 * Premium expiry cron service
 *
 * - 매일 00:00 KST: upgradedAt 기준 프리미엄 기간 만료 → tierType=STANDARD 다운그레이드
 * - Daily 00:00 KST: Downgrade expired premium postings to STANDARD tier
 *
 * NOTE: The schema has no premiumExpiresAt column. Premium duration is determined
 * by the product's durationDays at time of purchase. This cron checks orders with
 * linked job postings whose paid premium period has elapsed.
 */
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AuthPrismaService, RedisPubSubService } from 'libs/common/src';

@Injectable()
export class JobPaymentCronService {
  private readonly logger = new Logger(JobPaymentCronService.name);

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly redisPubSub: RedisPubSubService,
  ) {}

  /**
   * 매일 00:00 KST — 프리미엄 만료 다운그레이드
   * Daily 00:00 KST — Downgrade expired premium postings
   *
   * Logic:
   *  1. Find all ACTIVE postings with tierType=PREMIUM that have an upgradedAt date.
   *  2. For each, look up the associated order → product → durationDays.
   *  3. If upgradedAt + durationDays < now, downgrade to STANDARD.
   *
   * Fallback: If no order is linked, use a default 30-day premium window.
   */
  @Cron('0 0 0 * * *', {
    name: 'job-premium-expire',
    timeZone: 'Asia/Seoul',
  })
  async handleExpiredPremiums() {
    const now = new Date();
    const DEFAULT_PREMIUM_DAYS = 30;

    try {
      // 프리미엄 ACTIVE 공고 조회 / Find active premium postings
      const premiumPostings = await this.prisma.jobPosting.findMany({
        where: {
          status: 'ACTIVE',
          tierType: 'PREMIUM',
          upgradedAt: { not: null },
        },
        select: {
          id: true,
          title: true,
          corporateId: true,
          upgradedAt: true,
          orderId: true,
        },
      });

      if (premiumPostings.length === 0) {
        return;
      }

      // 연결된 주문의 상품 기간 조회 / Fetch linked order product durations
      const orderIds = premiumPostings
        .filter((p) => p.orderId !== null)
        .map((p) => p.orderId!);

      const orders =
        orderIds.length > 0
          ? await this.prisma.jobOrder.findMany({
              where: { id: { in: orderIds } },
              include: { product: true },
            })
          : [];

      const orderMap = new Map(orders.map((o) => [o.id.toString(), o]));

      const toDowngrade: bigint[] = [];
      const corporateIds: string[] = [];

      for (const posting of premiumPostings) {
        const upgradedAt = posting.upgradedAt!;
        let durationDays = DEFAULT_PREMIUM_DAYS;

        // 주문에서 상품 기간 조회 / Get duration from linked order product
        if (posting.orderId) {
          const order = orderMap.get(posting.orderId.toString());
          if (order?.product?.durationDays) {
            durationDays = order.product.durationDays;
          }
        }

        const premiumExpiresAt = new Date(upgradedAt);
        premiumExpiresAt.setDate(premiumExpiresAt.getDate() + durationDays);

        if (premiumExpiresAt < now) {
          toDowngrade.push(posting.id);
          corporateIds.push(posting.corporateId.toString());

          this.logger.log(
            `  → jobId=${posting.id}, title="${posting.title}", ` +
              `upgradedAt=${upgradedAt.toISOString()}, ` +
              `durationDays=${durationDays}, expired`,
          );
        }
      }

      if (toDowngrade.length === 0) {
        return;
      }

      // 일괄 다운그레이드 / Batch downgrade
      const result = await this.prisma.jobPosting.updateMany({
        where: { id: { in: toDowngrade } },
        data: { tierType: 'STANDARD' },
      });

      this.logger.log(
        `[Cron:PremiumExpire] ${result.count}건 프리미엄 다운그레이드 / ` +
          `${result.count} postings downgraded from PREMIUM to STANDARD`,
      );

      // 기업 알림 발송 / Notify corporate users
      const uniqueCorpIds = [...new Set(corporateIds)].map((id) => BigInt(id));
      const corps = await this.prisma.corporateProfile.findMany({
        where: { companyId: { in: uniqueCorpIds } },
        select: { authId: true },
      });

      for (const corp of corps) {
        try {
          await this.redisPubSub.publish(
            `notification:${corp.authId}`,
            JSON.stringify({
              type: 'PREMIUM_EXPIRED',
              title: '프리미엄 기간 만료',
              message: '프리미엄 기간이 만료되어 일반 등급으로 변경되었습니다.',
              createdAt: now.toISOString(),
            }),
          );
        } catch (notifError) {
          this.logger.warn(
            `[Cron:PremiumExpire] 알림 발송 실패: userId=${corp.authId}`,
          );
        }
      }
    } catch (error) {
      this.logger.error(
        `[Cron:PremiumExpire] 프리미엄 만료 처리 실패 / ` +
          `Premium expiry processing failed: ${error.message}`,
      );
    }
  }
}
