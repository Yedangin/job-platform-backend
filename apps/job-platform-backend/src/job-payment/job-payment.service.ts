import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthPrismaService, RedisService } from 'libs/common/src';

@Injectable()
export class JobPaymentService {
  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly redis: RedisService,
  ) {}

  // ========================================
  // 상품 목록
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
  // 상품 상세
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
  // 주문 생성 (가격 스냅샷)
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

    // 주문번호 생성
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 99999)
      .toString()
      .padStart(5, '0');
    const orderNo = `ORD-${dateStr}-${random}`;
    const merchantUid = `merchant_${Date.now()}_${random}`;

    const order = await this.prisma.jobOrder.create({
      data: {
        orderNo,
        corporateId: corp.companyId,
        productId: product.id,
        // ★ 가격 스냅샷
        snapshotProductName: product.nameKo,
        snapshotOriginalPrice: product.originalPrice,
        snapshotDiscountPrice: product.discountPrice,
        snapshotDiscountPct: product.discountPercent,
        paidAmount: product.discountPrice,
        // 결제 정보
        paymentStatus: product.discountPrice === 0 ? 'PAID' : 'PENDING',
        pgProvider: product.discountPrice === 0 ? null : 'html5_inicis',
        merchantUid,
        paidAt: product.discountPrice === 0 ? now : null,
        jobPostingId: data.jobPostingId ? BigInt(data.jobPostingId) : null,
      },
    });

    // 무료 상품이면 바로 공고 활성화
    if (product.discountPrice === 0 && data.jobPostingId) {
      await this.prisma.jobPosting.update({
        where: { id: BigInt(data.jobPostingId) },
        data: { status: 'ACTIVE', orderId: order.id },
      });
    }

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
  // 결제 검증 (PortOne)
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
      // PortOne API로 결제 검증
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

      // 결제 성공
      await this.prisma.jobOrder.update({
        where: { orderNo },
        data: {
          paymentStatus: 'PAID',
          impUid: data.impUid,
          paidAt: new Date(),
        },
      });

      // 공고 활성화
      if (order.jobPostingId) {
        await this.prisma.jobPosting.update({
          where: { id: order.jobPostingId },
          data: { status: 'ACTIVE', orderId: order.id },
        });
      }

      return { success: true, paymentStatus: 'PAID', orderNo };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException('Payment verification failed');
    }
  }

  // ========================================
  // 결제 취소
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

    return { success: true };
  }

  // ========================================
  // 내 주문 내역
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

    // 공고 정보 조회
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
  // Admin: 전체 판매 내역
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

    // 기업 정보 조회
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
  // Admin: 판매 통계
  // ========================================
  async getPaymentStats() {
    const allOrders = await this.prisma.jobOrder.findMany({
      where: { paymentStatus: 'PAID' },
      include: { product: true },
    });

    const totalRevenue = allOrders.reduce((sum, o) => sum + o.paidAmount, 0);
    const totalOrders = allOrders.length;

    // 상품별 집계
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

    // 월별 매출
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
  // PortOne (Iamport) API
  // ========================================
  private async verifyWithIamport(
    impUid: string,
  ): Promise<{ amount: number; status: string }> {
    const apiKey = process.env.IAMPORT_API_KEY;
    const apiSecret = process.env.IAMPORT_API_SECRET;

    if (!apiKey || !apiSecret) {
      // 개발 환경에서 키가 없으면 스킵 (테스트용)
      console.warn('[Payment] IAMPORT keys not set, skipping verification');
      return { amount: 0, status: 'paid' };
    }

    // 1. 토큰 발급
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

    // 2. 결제 정보 조회
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
}
