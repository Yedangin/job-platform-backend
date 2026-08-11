import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
  BadGatewayException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { createHash, randomUUID } from 'crypto';
import { AuthPrismaService, RedisLockService } from 'libs/common/src';
import type {
  JobOrder,
  JobPosting,
  JobProduct,
  Prisma,
} from 'generated/prisma-user';

type IamportPayment = {
  impUid: string;
  merchantUid: string;
  amount: number;
  cancelledAmount: number;
  status: string;
  pgProvider?: string;
  storeId?: string;
};

type IamportConfig = {
  apiKey: string;
  apiSecret: string;
  storeId: string;
  pgProvider: string;
};

type IamportEnvelope<T> = {
  code?: unknown;
  response?: T;
};

type IamportPaymentResponse = {
  imp_uid?: unknown;
  merchant_uid?: unknown;
  amount?: unknown;
  cancel_amount?: unknown;
  status?: unknown;
  pg_provider?: unknown;
  user_code?: unknown;
};

type IamportPreparedPaymentResponse = {
  merchant_uid?: unknown;
  amount?: unknown;
};

type IamportCancellationResponse = {
  imp_uid?: unknown;
  merchant_uid?: unknown;
  cancel_amount?: unknown;
};

type IamportTokenResponse = {
  access_token?: unknown;
};

type JobOrderWithProduct = Prisma.JobOrderGetPayload<{
  include: { product: true };
}>;

@Injectable()
export class JobPaymentService {
  private readonly logger = new Logger(JobPaymentService.name);

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly lock: RedisLockService,
  ) {}

  // ========================================
  // 상품 목록 / List available products
  // ========================================
  async getProducts(boardType?: string) {
    const where: Prisma.JobProductWhereInput = { isActive: true };
    if (boardType === 'PART_TIME' || boardType === 'FULL_TIME') {
      where.boardType = boardType;
    }

    const products = await this.prisma.jobProduct.findMany({
      where,
      orderBy: [{ boardType: 'asc' }, { tierType: 'asc' }],
    });

    return products.map((p) => ({
      id: p.id.toString(),
      productCode: p.productCode,
      boardType: p.boardType,
      tierType: p.tierType,
      nameKo: p.nameKo,
      originalPrice: p.originalPrice,
      discountPrice: p.discountPrice,
      discountPercent: p.discountPercent,
      durationDays: p.durationDays,
      features: this.parseJson(p.features),
    }));
  }

  // ========================================
  // 상품 상세 / Get product by code
  // ========================================
  async getProductByCode(code: string) {
    const product = await this.prisma.jobProduct.findUnique({
      where: { productCode: code },
    });
    if (!product) throw new NotFoundException('Product not found');

    return {
      id: product.id.toString(),
      productCode: product.productCode,
      boardType: product.boardType,
      tierType: product.tierType,
      nameKo: product.nameKo,
      originalPrice: product.originalPrice,
      discountPrice: product.discountPrice,
      discountPercent: product.discountPercent,
      durationDays: product.durationDays,
      features: this.parseJson(product.features),
    };
  }

  // ========================================
  // 주문 생성 (가격 스냅샷) / Create order with price snapshot
  // ========================================
  async createOrder(
    userId: string,
    data: { productCode: string; jobPostingId: string },
  ) {
    this.assertProductCode(data.productCode);
    const jobId = this.parseId(data.jobPostingId, 'jobPostingId');

    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) throw new ForbiddenException('Corporate profile required');

    const product = await this.prisma.jobProduct.findUnique({
      where: { productCode: data.productCode },
    });
    if (!product || !product.isActive) {
      throw new NotFoundException('Product not found');
    }
    this.assertValidProduct(product);

    return this.withResourceLock(`job:${jobId}`, async () => {
      const job = await this.getOwnedJobPosting(userId, data.jobPostingId);
      this.assertProductMatchesPosting(product, job);

      if (product.tierType === 'PREMIUM') {
        this.assertPremiumUpgradeAllowed(job);
      } else if (job.orderId) {
        throw new ConflictException('Posting already has an order');
      }

      return this.issueOrder(corp.companyId, product, job);
    });
  }

  // ========================================
  // 결제 검증 (PortOne/Iamport) / Verify payment
  // ========================================
  async verifyPayment(
    userId: string,
    orderNo: string,
    data: { impUid: string },
  ) {
    this.assertOrderNo(orderNo);
    this.assertImpUid(data.impUid);
    return this.completePayment(userId, orderNo, data.impUid);
  }

  // ========================================
  // 주문 취소 / Cancel pending order
  // ========================================
  async cancelOrder(userId: string, orderNo: string, reason?: string) {
    this.assertOrderNo(orderNo);
    const safeReason = this.normalizeReason(reason, 'Customer cancellation');
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) throw new ForbiddenException('Corporate profile required');

    return this.withResourceLock(`order:${orderNo}`, async () => {
      const order = await this.prisma.jobOrder.findUnique({
        where: { orderNo },
        include: { product: true },
      });
      if (!order) throw new NotFoundException('Order not found');
      if (order.corporateId !== corp.companyId) {
        throw new ForbiddenException('Not the owner');
      }

      if (
        order.paymentStatus === 'CANCELLED' ||
        order.paymentStatus === 'REFUNDED'
      ) {
        return { success: true, paymentStatus: order.paymentStatus };
      }

      if (
        order.paymentStatus === 'PENDING' ||
        order.paymentStatus === 'FAILED'
      ) {
        await this.prisma.jobOrder.updateMany({
          where: {
            id: order.id,
            paymentStatus: { in: ['PENDING', 'FAILED'] },
          },
          data: {
            paymentStatus: 'CANCELLED',
            cancelledAt: new Date(),
            cancelReason: safeReason,
          },
        });
        return { success: true, paymentStatus: 'CANCELLED' };
      }

      if (order.paymentStatus !== 'PAID' || !order.impUid) {
        throw new ConflictException('Order cannot be cancelled');
      }

      const remote = await this.verifyWithIamport(order.impUid);
      this.assertRemotePaymentMatches(order, remote, true);
      if (remote.status !== 'cancelled') {
        if (remote.status !== 'paid') {
          throw new ConflictException('Remote payment is not refundable');
        }
        await this.cancelIamportPayment(
          order.impUid,
          order.merchantUid!,
          order.paidAmount,
          safeReason,
        );
      }

      await this.prisma.$transaction(async (tx) => {
        const changed = await tx.jobOrder.updateMany({
          where: { id: order.id, paymentStatus: 'PAID' },
          data: {
            paymentStatus: 'REFUNDED',
            cancelledAt: new Date(),
            cancelReason: safeReason,
          },
        });
        if (changed.count === 0) return;
        await this.revokeOrderFulfillment(tx, order);
      });

      this.logger.log(`[Order] paid order refunded: orderNo=${orderNo}`);
      return { success: true, paymentStatus: 'REFUNDED' };
    });
  }

  // ========================================
  // 내 주문 내역 / Corporate's order history
  // ========================================
  async getMyOrders(userId: string, query: { page?: number; limit?: number }) {
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) throw new ForbiddenException('Corporate profile required');

    const page = query.page || 1;
    const limit = query.limit || 20;

    const [items, total] = await Promise.all([
      this.prisma.jobOrder.findMany({
        where: { corporateId: corp.companyId },
        include: { product: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.jobOrder.count({ where: { corporateId: corp.companyId } }),
    ]);

    // 공고 정보 조회 / Fetch job posting info
    const jobIds = items
      .filter((i) => i.jobPostingId)
      .map((i) => i.jobPostingId!);
    const jobs =
      jobIds.length > 0
        ? await this.prisma.jobPosting.findMany({
            where: { id: { in: jobIds } },
          })
        : [];
    const jobMap = new Map(jobs.map((j) => [j.id.toString(), j]));

    return {
      items: items.map((o) => {
        const job = o.jobPostingId
          ? jobMap.get(o.jobPostingId.toString())
          : null;
        return {
          id: o.id.toString(),
          orderNo: o.orderNo,
          productCode: o.product.productCode,
          snapshotProductName: o.snapshotProductName,
          snapshotOriginalPrice: o.snapshotOriginalPrice,
          snapshotDiscountPrice: o.snapshotDiscountPrice,
          snapshotDiscountPct: o.snapshotDiscountPct,
          paidAmount: o.paidAmount,
          paymentStatus: o.paymentStatus,
          paidAt: o.paidAt,
          createdAt: o.createdAt,
          jobPosting: job
            ? { id: job.id.toString(), title: job.title, status: job.status }
            : null,
        };
      }),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ========================================
  // 프리미엄 업그레이드 요청 / Upgrade to Premium
  // ========================================
  async upgradeToPremium(userId: string, data: { jobPostingId: string }) {
    const jobId = this.parseId(data.jobPostingId, 'jobPostingId');
    return this.withResourceLock(`job:${jobId}`, async () => {
      const job = await this.getOwnedJobPosting(userId, data.jobPostingId);
      this.assertPremiumUpgradeAllowed(job);

      const premiumProduct = await this.prisma.jobProduct.findFirst({
        where: {
          boardType: job.boardType,
          tierType: 'PREMIUM',
          isActive: true,
        },
      });
      if (!premiumProduct) {
        throw new NotFoundException('Premium product not found');
      }
      this.assertValidProduct(premiumProduct);

      const corp = await this.prisma.corporateProfile.findUnique({
        where: { authId: userId },
      });
      if (!corp) throw new ForbiddenException('Corporate profile required');

      const existing = await this.prisma.jobOrder.findFirst({
        where: {
          corporateId: corp.companyId,
          jobPostingId: job.id,
          productId: premiumProduct.id,
          paymentStatus: { in: ['PENDING', 'PAID'] },
        },
        orderBy: { createdAt: 'desc' },
      });
      if (existing) {
        if (existing.paymentStatus === 'PAID') {
          throw new ConflictException(
            'Posting already has a paid premium order',
          );
        }
        return this.toCheckoutResponse(existing, premiumProduct, job.id);
      }

      return this.issueOrder(corp.companyId, premiumProduct, job);
    });
  }

  // ========================================
  // 프리미엄 업그레이드 결제 확인 / Confirm premium upgrade after payment
  // ========================================
  async confirmPremiumUpgrade(
    userId: string,
    orderNo: string,
    data: { impUid: string },
  ) {
    this.assertOrderNo(orderNo);
    this.assertImpUid(data.impUid);
    return this.completePayment(userId, orderNo, data.impUid, true);
  }

  // ========================================
  // Admin: 전체 판매 내역 / Admin: all orders
  // ========================================
  async getAllOrders(query: {
    paymentStatus?: string;
    productCode?: string;
    page?: number;
    limit?: number;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: Prisma.JobOrderWhereInput = {};
    switch (query.paymentStatus) {
      case 'PENDING':
      case 'PAID':
      case 'CANCELLED':
      case 'REFUNDED':
      case 'FAILED':
        where.paymentStatus = query.paymentStatus;
        break;
    }
    if (query.productCode) {
      where.product = { productCode: query.productCode };
    }

    const [items, total] = await Promise.all([
      this.prisma.jobOrder.findMany({
        where,
        include: { product: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.jobOrder.count({ where }),
    ]);

    // 기업 정보 조회 / Fetch corporate info
    const corpIds = [...new Set(items.map((i) => i.corporateId))];
    const corporates = await this.prisma.corporateProfile.findMany({
      where: { companyId: { in: corpIds } },
    });
    const corpMap = new Map(corporates.map((c) => [c.companyId.toString(), c]));

    return {
      items: items.map((o) => {
        const corp = corpMap.get(o.corporateId.toString());
        return {
          id: o.id.toString(),
          orderNo: o.orderNo,
          corporateId: o.corporateId.toString(),
          companyName: corp?.companyNameOfficial || 'Unknown',
          productCode: o.product.productCode,
          snapshotProductName: o.snapshotProductName,
          snapshotOriginalPrice: o.snapshotOriginalPrice,
          snapshotDiscountPrice: o.snapshotDiscountPrice,
          snapshotDiscountPct: o.snapshotDiscountPct,
          paidAmount: o.paidAmount,
          paymentStatus: o.paymentStatus,
          paidAt: o.paidAt,
          createdAt: o.createdAt,
        };
      }),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ========================================
  // Admin: 판매 통계 / Admin: revenue statistics
  // ========================================
  async getPaymentStats() {
    const allOrders = await this.prisma.jobOrder.findMany({
      where: { paymentStatus: 'PAID' },
      include: { product: true },
    });

    const totalRevenue = allOrders.reduce((sum, o) => sum + o.paidAmount, 0);
    const totalOrders = allOrders.length;

    // 상품별 집계 / Aggregate by product
    const byProduct: Record<
      string,
      { count: number; revenue: number; name: string }
    > = {};
    for (const o of allOrders) {
      const key = o.product.productCode;
      if (!byProduct[key]) {
        byProduct[key] = { count: 0, revenue: 0, name: o.snapshotProductName };
      }
      byProduct[key].count++;
      byProduct[key].revenue += o.paidAmount;
    }

    // 월별 매출 / Monthly revenue
    const byMonth: Record<string, number> = {};
    for (const o of allOrders) {
      const month = o.paidAt
        ? o.paidAt.toISOString().slice(0, 7)
        : o.createdAt.toISOString().slice(0, 7);
      byMonth[month] = (byMonth[month] || 0) + o.paidAmount;
    }

    return {
      totalRevenue,
      totalOrders,
      byProduct: Object.entries(byProduct).map(([code, data]) => ({
        productCode: code,
        productName: data.name,
        count: data.count,
        revenue: data.revenue,
      })),
      byMonth: Object.entries(byMonth)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, revenue]) => ({ month, revenue })),
    };
  }

  // ========================================
  // Admin: 프리미엄 수동 부여 (강화) / Admin: manually grant premium (enhanced)
  // ========================================
  async adminGrantPremium(
    adminId: string,
    jobId: string,
    days: number,
    options?: { reason?: string; memo?: string; grantFeatured?: boolean },
  ) {
    const job = await this.prisma.jobPosting.findUnique({
      where: { id: BigInt(jobId) },
    });
    if (!job) throw new NotFoundException('Job posting not found');

    const now = new Date();
    // 기존 프리미엄이 유효하면 종료일 기준 연장 / Extend from existing end date if still valid
    const baseDate =
      job.isPremium && job.premiumEndAt && job.premiumEndAt > now
        ? job.premiumEndAt
        : now;
    const premiumEndAt = new Date(baseDate);
    premiumEndAt.setDate(premiumEndAt.getDate() + days);

    // 이전 상태 스냅샷 / Previous state snapshot
    const previousState = {
      tierType: job.tierType,
      isPremium: job.isPremium,
      premiumSource: job.premiumSource,
      premiumStartAt: job.premiumStartAt?.toISOString() || null,
      premiumEndAt: job.premiumEndAt?.toISOString() || null,
      isFeatured: job.isFeatured,
    };

    // 공고 업데이트 / Update posting
    const premiumStartAt = job.isPremium ? job.premiumStartAt : now;
    const updateData: Prisma.JobPostingUncheckedUpdateInput = {
      tierType: 'PREMIUM',
      isPremium: true,
      premiumStartAt,
      premiumEndAt,
      upgradedAt: now,
      premiumSource: 'ADMIN_GRANT',
      premiumGrantedBy: adminId,
      premiumMemo: options?.memo || null,
    };

    if (options?.grantFeatured) {
      updateData.isFeatured = true;
      updateData.featuredUntil = premiumEndAt;
    }

    await this.prisma.jobPosting.update({
      where: { id: BigInt(jobId) },
      data: updateData,
    });

    // AdminJobAction 로그 기록 / Record admin action log
    await this.prisma.adminJobAction.create({
      data: {
        jobId: BigInt(jobId),
        adminId,
        actionType: 'PREMIUM_GRANT',
        reason: options?.reason || 'ADMIN_MANUAL',
        metadata: {
          days,
          memo: options?.memo || null,
          grantFeatured: options?.grantFeatured || false,
          previousState,
          newPremiumEndAt: premiumEndAt.toISOString(),
        },
      },
    });

    // Featured 부여 시 별도 로그 / Log featured grant separately
    if (options?.grantFeatured) {
      await this.prisma.adminJobAction.create({
        data: {
          jobId: BigInt(jobId),
          adminId,
          actionType: 'FEATURED_GRANT',
          reason: options?.reason || 'ADMIN_MANUAL',
          metadata: {
            grantedWith: 'PREMIUM_GRANT',
            memo: options?.memo || null,
          },
        },
      });
    }

    this.logger.log(
      `[Admin] 프리미엄 수동 부여: adminId=${adminId}, jobId=${jobId}, days=${days}, reason=${options?.reason || 'N/A'}, premiumEnd=${premiumEndAt.toISOString()}`,
    );

    return {
      success: true,
      jobPostingId: jobId,
      tierType: 'PREMIUM',
      isPremium: true,
      premiumStartAt,
      premiumEndAt,
      premiumSource: 'ADMIN_GRANT',
      grantedBy: adminId,
      durationDays: days,
      isFeatured: options?.grantFeatured || false,
    };
  }

  // ========================================
  // Admin: 프리미엄 해제 / Admin: revoke premium
  // ========================================
  async adminRevokePremium(
    adminId: string,
    jobId: string,
    dto: { reason: string; memo?: string; forceNoRefund?: boolean },
  ) {
    const job = await this.prisma.jobPosting.findUnique({
      where: { id: BigInt(jobId) },
    });
    if (!job) throw new NotFoundException('Job posting not found');
    if (!job.isPremium) {
      throw new BadRequestException(
        '이미 일반 공고입니다 / Already a standard posting',
      );
    }

    // 환불 분기 / Refund branching logic
    let refundInfo: {
      eligible: boolean;
      amount: number;
      reason: string;
    } | null = null;

    if (job.premiumSource === 'PAID' && !dto.forceNoRefund) {
      // 결제 공고 + 환불 대상 → 잔여 기간 일할계산 / Paid + refund eligible → pro-rata calculation
      const order = await this.prisma.jobOrder.findFirst({
        where: {
          jobPostingId: BigInt(jobId),
          paymentStatus: 'PAID',
        },
        include: { product: true },
        orderBy: { paidAt: 'desc' },
      });

      if (order && job.premiumStartAt && job.premiumEndAt) {
        const totalDays = Math.ceil(
          (job.premiumEndAt.getTime() - job.premiumStartAt.getTime()) /
            (1000 * 60 * 60 * 24),
        );
        const usedDays = Math.ceil(
          (Date.now() - job.premiumStartAt.getTime()) / (1000 * 60 * 60 * 24),
        );
        const remainingDays = Math.max(totalDays - usedDays, 0);

        // 50% 초과 사용 시 환불 제한 / Refund limited if > 50% used
        if (usedDays <= totalDays * 0.5) {
          const dailyRate = order.paidAmount / totalDays;
          const refundAmount = Math.floor(dailyRate * remainingDays);
          refundInfo = {
            eligible: true,
            amount: refundAmount,
            reason: `잔여 ${remainingDays}일 / ${totalDays}일, 일할계산 환불`,
          };
        } else {
          refundInfo = {
            eligible: false,
            amount: 0,
            reason: `사용 기간(${usedDays}일)이 전체(${totalDays}일)의 50% 초과 — 환불 제한`,
          };
        }
      }
    } else if (job.premiumSource === 'PAID' && dto.forceNoRefund) {
      // 위반 사유 환불 없이 해제 / Violation — no refund
      refundInfo = {
        eligible: false,
        amount: 0,
        reason: '위반 사유로 환불 없이 해제 / Violation — no refund',
      };
    }
    // ADMIN_GRANT / PROMOTION → 환불 없음 (무상 부여) / No refund (free grant)

    // 이전 상태 스냅샷 / Previous state snapshot
    const previousState = {
      tierType: job.tierType,
      isPremium: job.isPremium,
      premiumSource: job.premiumSource,
      premiumStartAt: job.premiumStartAt?.toISOString() || null,
      premiumEndAt: job.premiumEndAt?.toISOString() || null,
      isFeatured: job.isFeatured,
    };

    // 공고 다운그레이드 / Downgrade posting
    await this.prisma.jobPosting.update({
      where: { id: BigInt(jobId) },
      data: {
        tierType: 'STANDARD',
        isPremium: false,
        premiumSource: null,
        premiumGrantedBy: null,
        premiumMemo: null,
        isFeatured: false,
        featuredUntil: null,
      },
    });

    // AdminJobAction 로그 / Record admin action
    await this.prisma.adminJobAction.create({
      data: {
        jobId: BigInt(jobId),
        adminId,
        actionType: 'PREMIUM_REVOKE',
        reason: dto.reason,
        metadata: {
          memo: dto.memo || null,
          forceNoRefund: dto.forceNoRefund || false,
          previousState,
          refundInfo,
        },
      },
    });

    this.logger.log(
      `[Admin] 프리미엄 해제: adminId=${adminId}, jobId=${jobId}, reason=${dto.reason}, refund=${refundInfo?.eligible ? refundInfo.amount + '원' : 'N/A'}`,
    );

    return {
      success: true,
      jobPostingId: jobId,
      tierType: 'STANDARD',
      isPremium: false,
      revokedBy: adminId,
      reason: dto.reason,
      refundInfo,
    };
  }

  // ========================================
  // Admin: 프리미엄 이력 조회 / Admin: premium action history
  // ========================================
  async getPremiumHistory(jobId: string) {
    const job = await this.prisma.jobPosting.findUnique({
      where: { id: BigInt(jobId) },
      select: {
        id: true,
        title: true,
        tierType: true,
        isPremium: true,
        premiumSource: true,
        premiumStartAt: true,
        premiumEndAt: true,
        premiumGrantedBy: true,
        premiumMemo: true,
        isFeatured: true,
        corporateId: true,
      },
    });
    if (!job) throw new NotFoundException('Job posting not found');

    // AdminJobAction 이력 / Admin action history
    const adminActions = await this.prisma.adminJobAction.findMany({
      where: {
        jobId: BigInt(jobId),
        actionType: {
          in: [
            'PREMIUM_GRANT',
            'PREMIUM_REVOKE',
            'FEATURED_GRANT',
            'FEATURED_REVOKE',
          ],
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // 결제 이력 / Payment history
    const orders = await this.prisma.jobOrder.findMany({
      where: {
        jobPostingId: BigInt(jobId),
        paymentStatus: 'PAID',
      },
      include: { product: true },
      orderBy: { paidAt: 'desc' },
    });

    return {
      currentStatus: {
        jobPostingId: job.id.toString(),
        title: job.title,
        tierType: job.tierType,
        isPremium: job.isPremium,
        premiumSource: job.premiumSource,
        premiumStartAt: job.premiumStartAt,
        premiumEndAt: job.premiumEndAt,
        premiumGrantedBy: job.premiumGrantedBy,
        premiumMemo: job.premiumMemo,
        isFeatured: job.isFeatured,
      },
      adminActions: adminActions.map((a) => ({
        id: a.id.toString(),
        actionType: a.actionType,
        adminId: a.adminId,
        reason: a.reason,
        metadata: a.metadata,
        createdAt: a.createdAt,
      })),
      paymentHistory: orders.map((o) => ({
        orderId: o.id.toString(),
        orderNo: o.orderNo,
        productCode: o.product.productCode,
        productName: o.snapshotProductName,
        paidAmount: o.paidAmount,
        paidAt: o.paidAt,
      })),
    };
  }

  // ========================================
  // Private: PortOne (Iamport) 결제 검증
  // Private: PortOne (Iamport) payment verification
  // ========================================
  private async completePayment(
    userId: string,
    orderNo: string,
    impUid: string,
    requirePremium = false,
  ) {
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) throw new ForbiddenException('Corporate profile required');

    return this.withPaymentLocks(orderNo, impUid, async () => {
      const order = await this.prisma.jobOrder.findUnique({
        where: { orderNo },
        include: { product: true },
      });
      if (!order) throw new NotFoundException('Order not found');
      if (order.corporateId !== corp.companyId) {
        throw new ForbiddenException('Not the owner of this order');
      }
      if (requirePremium && order.product.tierType !== 'PREMIUM') {
        throw new BadRequestException('Not a premium product order');
      }
      if (!order.jobPostingId || !order.merchantUid) {
        throw new ConflictException('Order is missing fulfillment data');
      }

      if (order.paymentStatus === 'PAID') {
        if (order.impUid !== impUid) {
          throw new ConflictException('Order was paid with another payment');
        }
        return this.toPaidResponse(order);
      }
      if (order.paymentStatus !== 'PENDING') {
        throw new ConflictException('Order is not payable');
      }

      const reusedPayment = await this.prisma.jobOrder.findFirst({
        where: { impUid, id: { not: order.id } },
      });
      if (reusedPayment) {
        throw new ConflictException(
          'Payment is already bound to another order',
        );
      }

      const remote = await this.verifyWithIamport(impUid);
      this.assertRemotePaymentMatches(order, remote);
      if (remote.status !== 'paid') {
        throw new BadRequestException('Payment is not paid');
      }

      const paidAt = new Date();
      await this.prisma.$transaction(async (tx) => {
        const duplicate = await tx.jobOrder.findFirst({
          where: { impUid, id: { not: order.id } },
        });
        if (duplicate) {
          throw new ConflictException(
            'Payment is already bound to another order',
          );
        }

        const changed = await tx.jobOrder.updateMany({
          where: { id: order.id, paymentStatus: 'PENDING', impUid: null },
          data: { paymentStatus: 'PAID', impUid, paidAt },
        });
        if (changed.count !== 1) {
          throw new ConflictException('Payment was processed concurrently');
        }
        await this.fulfillOrder(tx, order, order.product, paidAt);
      });

      this.logger.log(`[Payment] payment verified: orderNo=${orderNo}`);
      return this.toPaidResponse({ ...order, impUid, paidAt });
    });
  }

  private async verifyWithIamport(impUid: string): Promise<IamportPayment> {
    this.assertImpUid(impUid);
    const config = this.getIamportConfig();
    const accessToken = await this.getIamportAccessToken(config);
    const paymentData = await this.iamportRequest<
      IamportEnvelope<IamportPaymentResponse>
    >(`https://api.iamport.kr/payments/${encodeURIComponent(impUid)}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const payment = paymentData.response;
    if (
      paymentData.code !== 0 ||
      !payment ||
      payment.imp_uid !== impUid ||
      typeof payment.merchant_uid !== 'string' ||
      typeof payment.amount !== 'number' ||
      !Number.isSafeInteger(payment.amount) ||
      typeof payment.status !== 'string'
    ) {
      throw new BadGatewayException('Invalid payment verification response');
    }

    return {
      impUid: payment.imp_uid,
      merchantUid: payment.merchant_uid,
      amount: payment.amount,
      cancelledAmount:
        typeof payment.cancel_amount === 'number' &&
        Number.isSafeInteger(payment.cancel_amount)
          ? payment.cancel_amount
          : 0,
      status: payment.status,
      pgProvider:
        typeof payment.pg_provider === 'string'
          ? payment.pg_provider
          : undefined,
      storeId:
        typeof payment.user_code === 'string' ? payment.user_code : undefined,
    };
  }

  private async registerPreparedPayment(merchantUid: string, amount: number) {
    const config = this.getIamportConfig();
    const accessToken = await this.getIamportAccessToken(config);
    const result = await this.iamportRequest<
      IamportEnvelope<IamportPreparedPaymentResponse>
    >('https://api.iamport.kr/payments/prepare', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ merchant_uid: merchantUid, amount }),
    });
    if (
      result.code !== 0 ||
      result.response?.merchant_uid !== merchantUid ||
      result.response?.amount !== amount
    ) {
      throw new BadGatewayException('Payment amount preparation failed');
    }
  }

  private async cancelIamportPayment(
    impUid: string,
    merchantUid: string,
    amount: number,
    reason: string,
  ) {
    const config = this.getIamportConfig();
    const accessToken = await this.getIamportAccessToken(config);
    const result = await this.iamportRequest<
      IamportEnvelope<IamportCancellationResponse>
    >('https://api.iamport.kr/payments/cancel', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imp_uid: impUid,
        merchant_uid: merchantUid,
        amount,
        reason,
      }),
    });
    const response = result.response;
    if (
      result.code !== 0 ||
      !response ||
      response.imp_uid !== impUid ||
      response.merchant_uid !== merchantUid ||
      typeof response.cancel_amount !== 'number' ||
      !Number.isSafeInteger(response.cancel_amount) ||
      response.cancel_amount < amount
    ) {
      throw new BadGatewayException('Payment cancellation failed');
    }
  }

  private async getIamportAccessToken(config: IamportConfig) {
    const tokenData = await this.iamportRequest<
      IamportEnvelope<IamportTokenResponse>
    >('https://api.iamport.kr/users/getToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imp_key: config.apiKey,
        imp_secret: config.apiSecret,
      }),
    });
    const accessToken = tokenData.response?.access_token;
    if (tokenData.code !== 0 || typeof accessToken !== 'string') {
      throw new BadGatewayException('Payment provider authentication failed');
    }
    return accessToken;
  }

  private async iamportRequest<T>(url: string, init: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    try {
      const response = await fetch(url, {
        ...init,
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new BadGatewayException('Payment provider request failed');
      }
      const body: unknown = await response.json();
      if (!body || typeof body !== 'object') {
        throw new BadGatewayException('Invalid payment provider response');
      }
      return body as T;
    } catch (error) {
      if (error instanceof BadGatewayException) throw error;
      this.logger.error('Payment provider request failed');
      throw new BadGatewayException('Payment provider request failed');
    } finally {
      clearTimeout(timer);
    }
  }

  private async issueOrder(
    corporateId: bigint,
    product: JobProduct,
    job: JobPosting,
  ) {
    const existing = await this.prisma.jobOrder.findFirst({
      where: {
        corporateId,
        productId: product.id,
        jobPostingId: job.id,
        paymentStatus: { in: ['PENDING', 'PAID'] },
      },
      orderBy: { createdAt: 'desc' },
    });
    if (existing) {
      return this.toCheckoutResponse(existing, product, job.id);
    }

    const isFree = product.discountPrice === 0;
    const orderNo = this.generateOrderNo();
    const merchantUid = `job_${randomUUID()}`;
    const config = isFree ? null : this.getIamportConfig();
    if (!isFree) {
      await this.registerPreparedPayment(merchantUid, product.discountPrice);
    }

    const now = new Date();
    const order = await this.prisma.$transaction(async (tx) => {
      const created = await tx.jobOrder.create({
        data: {
          orderNo,
          corporateId,
          productId: product.id,
          snapshotProductName: product.nameKo,
          snapshotOriginalPrice: product.originalPrice,
          snapshotDiscountPrice: product.discountPrice,
          snapshotDiscountPct: product.discountPercent,
          paidAmount: product.discountPrice,
          paymentStatus: isFree ? 'PAID' : 'PENDING',
          pgProvider: config?.pgProvider || null,
          merchantUid,
          paidAt: isFree ? now : null,
          jobPostingId: job.id,
        },
      });
      if (isFree) {
        await this.fulfillOrder(tx, created, product, now);
      }
      return created;
    });

    this.logger.log(
      `[Order] server order issued: orderNo=${orderNo}, product=${product.productCode}`,
    );
    return this.toCheckoutResponse(order, product, job.id);
  }

  private async fulfillOrder(
    tx: Prisma.TransactionClient,
    order: JobOrder,
    product: JobProduct,
    now: Date,
  ) {
    if (!order.jobPostingId) {
      throw new ConflictException('Order has no linked posting');
    }

    if (product.tierType === 'PREMIUM') {
      const premiumEndAt = new Date(now);
      premiumEndAt.setUTCDate(premiumEndAt.getUTCDate() + product.durationDays);
      const changed = await tx.jobPosting.updateMany({
        where: {
          id: order.jobPostingId,
          corporateId: order.corporateId,
          status: 'ACTIVE',
          tierType: 'STANDARD',
        },
        data: {
          tierType: 'PREMIUM',
          isPremium: true,
          premiumStartAt: now,
          premiumEndAt,
          upgradedAt: now,
          premiumSource: 'PAID',
          premiumGrantedBy: null,
          premiumMemo: null,
          orderId: order.id,
        },
      });
      if (changed.count !== 1) {
        throw new ConflictException('Posting is no longer upgradeable');
      }
      return;
    }

    const changed = await tx.jobPosting.updateMany({
      where: { id: order.jobPostingId, corporateId: order.corporateId },
      data: { status: 'ACTIVE', orderId: order.id },
    });
    if (changed.count !== 1) {
      throw new ForbiddenException('Posting ownership changed');
    }
  }

  private async revokeOrderFulfillment(
    tx: Prisma.TransactionClient,
    order: JobOrderWithProduct,
  ) {
    if (!order.jobPostingId) return;
    if (order.product.tierType === 'PREMIUM') {
      await tx.jobPosting.updateMany({
        where: { id: order.jobPostingId, orderId: order.id },
        data: {
          tierType: 'STANDARD',
          isPremium: false,
          premiumSource: null,
          premiumGrantedBy: null,
          premiumMemo: null,
          isFeatured: false,
          featuredUntil: null,
        },
      });
      return;
    }
    await tx.jobPosting.updateMany({
      where: { id: order.jobPostingId, orderId: order.id },
      data: { status: 'DRAFT', orderId: null },
    });
  }

  private assertRemotePaymentMatches(
    order: JobOrder,
    remote: IamportPayment,
    allowCancelled = false,
  ) {
    const config = this.getIamportConfig();
    if (
      remote.impUid !== order.impUid &&
      order.impUid !== null &&
      order.impUid !== undefined
    ) {
      throw new BadRequestException('Payment UID mismatch');
    }
    if (remote.merchantUid !== order.merchantUid) {
      throw new BadRequestException('Merchant order ID mismatch');
    }
    if (remote.amount !== order.paidAmount) {
      throw new BadRequestException('Payment amount mismatch');
    }
    if (remote.storeId && remote.storeId !== config.storeId) {
      throw new BadRequestException('Payment store mismatch');
    }
    if (remote.pgProvider && remote.pgProvider !== config.pgProvider) {
      throw new BadRequestException('Payment provider mismatch');
    }
    if (!allowCancelled && remote.status !== 'paid') {
      throw new BadRequestException('Payment is not paid');
    }
  }

  private toCheckoutResponse(
    order: JobOrder,
    product: JobProduct,
    jobPostingId: bigint,
  ) {
    const isFree = order.paidAmount === 0;
    const config = isFree ? null : this.getIamportConfig();
    if (!order.merchantUid) {
      throw new ConflictException('Order has no merchant UID');
    }
    return {
      orderId: order.id.toString(),
      orderNo: order.orderNo,
      merchantUid: order.merchantUid,
      paidAmount: order.paidAmount,
      paymentStatus: order.paymentStatus,
      productName: product.nameKo,
      jobPostingId: jobPostingId.toString(),
      isFree,
      checkout: isFree
        ? null
        : {
            storeId: config!.storeId,
            pgProvider: config!.pgProvider,
            merchantUid: order.merchantUid,
            amount: order.paidAmount,
          },
    };
  }

  private toPaidResponse(order: JobOrder) {
    return {
      success: true,
      paymentStatus: 'PAID',
      orderNo: order.orderNo,
      paidAt: order.paidAt,
    };
  }

  private assertValidProduct(product: JobProduct) {
    if (
      !Number.isSafeInteger(product.originalPrice) ||
      !Number.isSafeInteger(product.discountPrice) ||
      product.originalPrice < 0 ||
      product.discountPrice < 0 ||
      product.discountPrice > product.originalPrice ||
      !Number.isSafeInteger(product.durationDays) ||
      product.durationDays < 1 ||
      product.durationDays > 365
    ) {
      throw new ConflictException('Product catalog contains invalid values');
    }
  }

  private assertProductMatchesPosting(product: JobProduct, job: JobPosting) {
    if (product.boardType !== job.boardType) {
      throw new BadRequestException('Product does not match posting board');
    }
  }

  private assertPremiumUpgradeAllowed(job: JobPosting) {
    if (job.status !== 'ACTIVE' || job.tierType !== 'STANDARD') {
      throw new ConflictException('Posting is not upgradeable');
    }
  }

  private getIamportConfig(): IamportConfig {
    const config = {
      apiKey: process.env.IAMPORT_API_KEY?.trim() || '',
      apiSecret: process.env.IAMPORT_API_SECRET?.trim() || '',
      storeId: process.env.IAMPORT_STORE_ID?.trim() || '',
      pgProvider: process.env.IAMPORT_PG_PROVIDER?.trim() || '',
    };
    if (Object.values(config).some((value) => this.isMissingSecret(value))) {
      throw new ServiceUnavailableException(
        'Payment provider is not configured',
      );
    }
    return config;
  }

  private isMissingSecret(value: string) {
    return (
      !value || /^(change|replace|your[-_]|example|placeholder)/i.test(value)
    );
  }

  private parseJson(value: string | null): unknown {
    if (!value) return null;
    try {
      return JSON.parse(value) as unknown;
    } catch {
      return null;
    }
  }

  private async withPaymentLocks<T>(
    orderNo: string,
    impUid: string,
    task: () => Promise<T>,
  ): Promise<T> {
    return this.withResourceLock(`imp:${impUid}`, () =>
      this.withResourceLock(`order:${orderNo}`, task),
    );
  }

  private async withResourceLock<T>(resource: string, task: () => Promise<T>) {
    const key = `job-payment:${createHash('sha256')
      .update(resource)
      .digest('hex')}`;
    const value = await this.lock.acquireLock(key, 60);
    if (!value) {
      throw new ConflictException('Payment operation already in progress');
    }
    try {
      return await task();
    } finally {
      await this.lock.releaseLock(key, value);
    }
  }

  private normalizeReason(reason: string | undefined, fallback: string) {
    const normalized = reason?.replace(/[\r\n\t]+/g, ' ').trim() || fallback;
    return normalized.slice(0, 200);
  }

  private parseId(value: string, field: string) {
    if (!/^[1-9]\d{0,17}$/.test(value)) {
      throw new BadRequestException(`Invalid ${field}`);
    }
    return BigInt(value);
  }

  private assertProductCode(value: string) {
    if (!/^[A-Z0-9_]{1,64}$/.test(value)) {
      throw new BadRequestException('Invalid productCode');
    }
  }

  private assertOrderNo(value: string) {
    if (!/^ORD-\d{8}-[A-Z0-9]{5,32}$/.test(value)) {
      throw new BadRequestException('Invalid orderNo');
    }
  }

  private assertImpUid(value: string) {
    if (!/^imp_[A-Za-z0-9_-]{1,124}$/.test(value)) {
      throw new BadRequestException('Invalid impUid');
    }
  }

  // ========================================
  // Private: 기업 소유 공고 검증 / Validate corporate ownership
  // ========================================
  private async getOwnedJobPosting(userId: string, jobId: string) {
    const parsedJobId = this.parseId(jobId, 'jobId');
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) throw new ForbiddenException('Corporate profile required');

    const job = await this.prisma.jobPosting.findUnique({
      where: { id: parsedJobId },
    });
    if (!job) throw new NotFoundException('Job posting not found');
    if (job.corporateId !== corp.companyId) {
      throw new ForbiddenException(
        '본인의 공고가 아닙니다 / Not the owner of this posting',
      );
    }

    return job;
  }

  // ========================================
  // Private: 주문번호 생성 / Generate order number
  // ========================================
  private generateOrderNo(): string {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const random = randomUUID().replace(/-/g, '').slice(0, 16).toUpperCase();
    return `ORD-${dateStr}-${random}`;
  }
}
