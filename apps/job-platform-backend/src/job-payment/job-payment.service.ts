import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AuthPrismaService, RedisService } from 'libs/common/src';

@Injectable()
export class JobPaymentService {
  private readonly logger = new Logger(JobPaymentService.name);

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly redis: RedisService,
  ) {}

  // ========================================
  // 상품 목록 / List available products
  // ========================================
  async getProducts(boardType?: string) {
    const where: any = { isActive: true };
    if (boardType) where.boardType = boardType;

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
      features: p.features ? JSON.parse(p.features) : null,
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
      features: product.features ? JSON.parse(product.features) : null,
    };
  }

  // ========================================
  // 주문 생성 (가격 스냅샷) / Create order with price snapshot
  // ========================================
  async createOrder(
    userId: string,
    data: { productCode: string; jobPostingId?: string },
  ) {
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) throw new ForbiddenException('Corporate profile required');

    const product = await this.prisma.jobProduct.findUnique({
      where: { productCode: data.productCode },
    });
    if (!product) throw new NotFoundException('Product not found');

    // 주문번호 생성 / Generate order number
    const orderNo = this.generateOrderNo();
    const merchantUid = `merchant_${Date.now()}_${Math.floor(
      Math.random() * 99999,
    )
      .toString()
      .padStart(5, '0')}`;

    const order = await this.prisma.jobOrder.create({
      data: {
        orderNo,
        corporateId: corp.companyId,
        productId: product.id,
        // ★ 가격 스냅샷 / Price snapshot
        snapshotProductName: product.nameKo,
        snapshotOriginalPrice: product.originalPrice,
        snapshotDiscountPrice: product.discountPrice,
        snapshotDiscountPct: product.discountPercent,
        paidAmount: product.discountPrice,
        // 결제 정보 / Payment info
        paymentStatus: product.discountPrice === 0 ? 'PAID' : 'PENDING',
        pgProvider: product.discountPrice === 0 ? null : 'html5_inicis',
        merchantUid,
        paidAt: product.discountPrice === 0 ? new Date() : null,
        jobPostingId: data.jobPostingId ? BigInt(data.jobPostingId) : null,
      },
    });

    // 무료 상품이면 바로 공고 활성화 / If free product, auto-activate posting
    if (product.discountPrice === 0 && data.jobPostingId) {
      await this.prisma.jobPosting.update({
        where: { id: BigInt(data.jobPostingId) },
        data: { status: 'ACTIVE', orderId: order.id },
      });
    }

    this.logger.log(
      `[Order] 주문 생성: orderNo=${orderNo}, product=${data.productCode}, amount=${product.discountPrice}`,
    );

    return {
      orderId: order.id.toString(),
      orderNo: order.orderNo,
      merchantUid: order.merchantUid,
      paidAmount: order.paidAmount,
      paymentStatus: order.paymentStatus,
      productName: product.nameKo,
      isFree: product.discountPrice === 0,
    };
  }

  // ========================================
  // 결제 검증 (PortOne/Iamport) / Verify payment
  // ========================================
  async verifyPayment(
    userId: string,
    orderNo: string,
    data: { impUid: string },
  ) {
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) throw new ForbiddenException('Corporate profile required');

    const order = await this.prisma.jobOrder.findUnique({
      where: { orderNo },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (order.corporateId !== corp.companyId) {
      throw new ForbiddenException('Not the owner of this order');
    }
    if (order.paymentStatus !== 'PENDING') {
      throw new BadRequestException('Order is not in PENDING status');
    }

    try {
      // PortOne API로 결제 검증 / Verify payment via PortOne
      const iamportData = await this.verifyWithIamport(data.impUid);

      if (iamportData.amount !== order.paidAmount) {
        await this.prisma.jobOrder.update({
          where: { orderNo },
          data: { paymentStatus: 'FAILED', impUid: data.impUid },
        });
        throw new BadRequestException('Payment amount mismatch');
      }

      if (iamportData.status !== 'paid') {
        await this.prisma.jobOrder.update({
          where: { orderNo },
          data: { paymentStatus: 'FAILED', impUid: data.impUid },
        });
        throw new BadRequestException(`Payment status: ${iamportData.status}`);
      }

      // 결제 성공 / Payment success
      await this.prisma.jobOrder.update({
        where: { orderNo },
        data: {
          paymentStatus: 'PAID',
          impUid: data.impUid,
          paidAt: new Date(),
        },
      });

      // 공고 활성화 / Activate posting
      if (order.jobPostingId) {
        await this.prisma.jobPosting.update({
          where: { id: order.jobPostingId },
          data: { status: 'ACTIVE', orderId: order.id },
        });
      }

      this.logger.log(
        `[Payment] 결제 검증 성공: orderNo=${orderNo}, impUid=${data.impUid}`,
      );

      return { success: true, paymentStatus: 'PAID', orderNo };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException('Payment verification failed');
    }
  }

  // ========================================
  // 주문 취소 / Cancel pending order
  // ========================================
  async cancelOrder(userId: string, orderNo: string, reason?: string) {
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) throw new ForbiddenException('Corporate profile required');

    const order = await this.prisma.jobOrder.findUnique({
      where: { orderNo },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (order.corporateId !== corp.companyId) {
      throw new ForbiddenException('Not the owner');
    }

    await this.prisma.jobOrder.update({
      where: { orderNo },
      data: {
        paymentStatus: 'CANCELLED',
        cancelledAt: new Date(),
        cancelReason: reason,
      },
    });

    this.logger.log(
      `[Order] 주문 취소: orderNo=${orderNo}, reason=${reason || 'N/A'}`,
    );

    return { success: true };
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
    // 1. 기업 소유 공고 검증 / Validate corporate owns the posting
    const job = await this.getOwnedJobPosting(userId, data.jobPostingId);

    // 2. 공고 상태 검증 / Validate posting is ACTIVE and STANDARD tier
    if (job.status !== 'ACTIVE') {
      throw new BadRequestException(
        '활성 상태의 공고만 업그레이드할 수 있습니다 / Only ACTIVE postings can be upgraded',
      );
    }
    if (job.tierType !== 'STANDARD') {
      throw new BadRequestException(
        '이미 프리미엄 공고입니다 / Posting is already PREMIUM tier',
      );
    }

    // 3. 프리미엄 상품 조회 / Find PREMIUM product for this board type
    const premiumProduct = await this.prisma.jobProduct.findFirst({
      where: {
        boardType: job.boardType,
        tierType: 'PREMIUM',
        isActive: true,
      },
    });
    if (!premiumProduct) {
      throw new NotFoundException(
        '프리미엄 상품을 찾을 수 없습니다 / Premium product not found',
      );
    }

    // 4. 주문 생성 / Create order for premium upgrade
    const orderNo = this.generateOrderNo();
    const merchantUid = `merchant_${Date.now()}_${Math.floor(
      Math.random() * 99999,
    )
      .toString()
      .padStart(5, '0')}`;

    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });

    const order = await this.prisma.jobOrder.create({
      data: {
        orderNo,
        corporateId: corp!.companyId,
        productId: premiumProduct.id,
        snapshotProductName: premiumProduct.nameKo,
        snapshotOriginalPrice: premiumProduct.originalPrice,
        snapshotDiscountPrice: premiumProduct.discountPrice,
        snapshotDiscountPct: premiumProduct.discountPercent,
        paidAmount: premiumProduct.discountPrice,
        paymentStatus: 'PENDING',
        pgProvider: 'html5_inicis',
        merchantUid,
        jobPostingId: BigInt(data.jobPostingId),
      },
    });

    this.logger.log(
      `[Premium] 업그레이드 주문 생성: orderNo=${orderNo}, jobId=${data.jobPostingId}, amount=${premiumProduct.discountPrice}`,
    );

    return {
      orderId: order.id.toString(),
      orderNo: order.orderNo,
      merchantUid: order.merchantUid,
      paidAmount: order.paidAmount,
      paymentStatus: order.paymentStatus,
      productName: premiumProduct.nameKo,
      jobPostingId: data.jobPostingId,
      message: '결제를 진행해 주세요 / Please proceed with payment',
    };
  }

  // ========================================
  // 프리미엄 업그레이드 결제 확인 / Confirm premium upgrade after payment
  // ========================================
  async confirmPremiumUpgrade(
    userId: string,
    orderNo: string,
    data: { impUid: string },
  ) {
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) throw new ForbiddenException('Corporate profile required');

    const order = await this.prisma.jobOrder.findUnique({
      where: { orderNo },
      include: { product: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (order.corporateId !== corp.companyId) {
      throw new ForbiddenException('Not the owner of this order');
    }
    if (order.paymentStatus !== 'PENDING') {
      throw new BadRequestException(
        '주문이 PENDING 상태가 아닙니다 / Order is not in PENDING status',
      );
    }

    // 프리미엄 상품인지 확인 / Verify it's a premium product order
    if (order.product.tierType !== 'PREMIUM') {
      throw new BadRequestException(
        '프리미엄 상품 주문이 아닙니다 / Not a premium product order',
      );
    }

    if (!order.jobPostingId) {
      throw new BadRequestException(
        '공고 ID가 연결되지 않은 주문입니다 / Order has no linked job posting',
      );
    }

    try {
      // PortOne 결제 검증 / Verify payment via PortOne
      const iamportData = await this.verifyWithIamport(data.impUid);

      if (iamportData.amount !== order.paidAmount) {
        await this.prisma.jobOrder.update({
          where: { orderNo },
          data: { paymentStatus: 'FAILED', impUid: data.impUid },
        });
        throw new BadRequestException(
          '결제 금액 불일치 / Payment amount mismatch',
        );
      }

      if (iamportData.status !== 'paid') {
        await this.prisma.jobOrder.update({
          where: { orderNo },
          data: { paymentStatus: 'FAILED', impUid: data.impUid },
        });
        throw new BadRequestException(
          `결제 미완료: ${iamportData.status} / Payment not completed: ${iamportData.status}`,
        );
      }

      // 결제 성공 → 주문 상태 업데이트 / Payment success → update order
      await this.prisma.jobOrder.update({
        where: { orderNo },
        data: {
          paymentStatus: 'PAID',
          impUid: data.impUid,
          paidAt: new Date(),
        },
      });

      // 공고 프리미엄 업그레이드 / Upgrade job posting to premium
      const now = new Date();
      const premiumEndAt = new Date(now);
      const durationDays = order.product.durationDays;
      premiumEndAt.setDate(premiumEndAt.getDate() + durationDays);

      await this.prisma.jobPosting.update({
        where: { id: order.jobPostingId },
        data: {
          tierType: 'PREMIUM',
          isPremium: true,
          premiumStartAt: now,
          premiumEndAt: premiumEndAt,
          upgradedAt: now,
        },
      });

      this.logger.log(
        `[Premium] 업그레이드 완료: jobId=${order.jobPostingId}, premiumEnd=${premiumEndAt.toISOString()}`,
      );

      return {
        success: true,
        orderNo,
        paymentStatus: 'PAID',
        premium: {
          jobPostingId: order.jobPostingId.toString(),
          tierType: 'PREMIUM',
          isPremium: true,
          premiumStartAt: now,
          premiumEndAt: premiumEndAt,
          durationDays,
        },
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new BadRequestException(
        '결제 검증 실패 / Payment verification failed',
      );
    }
  }

  // ========================================
  // 프리미엄 만료 자동 다운그레이드 (매일 자정 KST)
  // Auto-downgrade expired premiums (daily at midnight KST)
  // ========================================
  @Cron('0 0 0 * * *', { name: 'premium-downgrade', timeZone: 'Asia/Seoul' })
  async downgradeExpiredPremiums() {
    const now = new Date();

    try {
      // 만료된 프리미엄 공고 조회 / Find expired premium postings
      const expiredPostings = await this.prisma.jobPosting.findMany({
        where: {
          isPremium: true,
          premiumEndAt: { lt: now },
          NOT: { premiumEndAt: null },
        },
        select: {
          id: true,
          title: true,
          corporateId: true,
          premiumEndAt: true,
        },
      });

      if (expiredPostings.length === 0) {
        return;
      }

      // 각 공고 다운그레이드 / Downgrade each posting
      for (const posting of expiredPostings) {
        await this.prisma.jobPosting.update({
          where: { id: posting.id },
          data: {
            tierType: 'STANDARD',
            isPremium: false,
          },
        });

        this.logger.log(
          `[Cron:PremiumDowngrade] 프리미엄 만료: jobId=${posting.id}, title="${posting.title}", expiredAt=${posting.premiumEndAt?.toISOString()}`,
        );
      }

      this.logger.log(
        `[Cron:PremiumDowngrade] ${expiredPostings.length}건 다운그레이드 완료 / ${expiredPostings.length} postings downgraded`,
      );
    } catch (error) {
      this.logger.error(
        `[Cron:PremiumDowngrade] 다운그레이드 처리 실패 / Downgrade processing failed: ${error.message}`,
      );
    }
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
    const where: any = {};
    if (query.paymentStatus) where.paymentStatus = query.paymentStatus;
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
  // Admin: 프리미엄 수동 부여 / Admin: manually grant premium
  // ========================================
  async adminGrantPremium(adminId: string, jobId: string, days: number) {
    const job = await this.prisma.jobPosting.findUnique({
      where: { id: BigInt(jobId) },
    });
    if (!job) throw new NotFoundException('Job posting not found');

    const now = new Date();
    const premiumEndAt = new Date(now);
    premiumEndAt.setDate(premiumEndAt.getDate() + days);

    await this.prisma.jobPosting.update({
      where: { id: BigInt(jobId) },
      data: {
        tierType: 'PREMIUM',
        isPremium: true,
        premiumStartAt: now,
        premiumEndAt: premiumEndAt,
        upgradedAt: now,
      },
    });

    this.logger.log(
      `[Admin] 프리미엄 수동 부여: adminId=${adminId}, jobId=${jobId}, days=${days}, premiumEnd=${premiumEndAt.toISOString()}`,
    );

    return {
      success: true,
      jobPostingId: jobId,
      tierType: 'PREMIUM',
      isPremium: true,
      premiumStartAt: now,
      premiumEndAt: premiumEndAt,
      grantedBy: adminId,
      durationDays: days,
    };
  }

  // ========================================
  // Private: PortOne (Iamport) 결제 검증
  // Private: PortOne (Iamport) payment verification
  // ========================================
  private async verifyWithIamport(
    impUid: string,
  ): Promise<{ amount: number; status: string }> {
    const apiKey = process.env.IAMPORT_API_KEY;
    const apiSecret = process.env.IAMPORT_API_SECRET;

    if (!apiKey || !apiSecret) {
      // 결제 검증 키 미설정 시 에러 (fake success 반환 금지)
      // Throw error when keys not configured (never return fake success)
      throw new BadRequestException(
        '결제 검증 키가 설정되지 않았습니다 / Payment verification keys not configured (IAMPORT_API_KEY, IAMPORT_API_SECRET)',
      );
    }

    // 1. 토큰 발급 / Get access token
    const tokenRes = await fetch('https://api.iamport.kr/users/getToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imp_key: apiKey, imp_secret: apiSecret }),
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.response?.access_token;

    if (!accessToken) {
      throw new BadRequestException('Failed to get iamport token');
    }

    // 2. 결제 정보 조회 / Get payment info
    const paymentRes = await fetch(
      `https://api.iamport.kr/payments/${impUid}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    const paymentData = await paymentRes.json();

    if (paymentData.code !== 0) {
      throw new BadRequestException('Failed to verify payment');
    }

    return {
      amount: paymentData.response.amount,
      status: paymentData.response.status,
    };
  }

  // ========================================
  // Private: 기업 소유 공고 검증 / Validate corporate ownership
  // ========================================
  private async getOwnedJobPosting(userId: string, jobId: string) {
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) throw new ForbiddenException('Corporate profile required');

    const job = await this.prisma.jobPosting.findUnique({
      where: { id: BigInt(jobId) },
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
    const random = Math.floor(Math.random() * 99999)
      .toString()
      .padStart(5, '0');
    return `ORD-${dateStr}-${random}`;
  }
}
