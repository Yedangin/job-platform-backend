/**
 * 결제 어드민 서비스 / Payment admin service
 *
 * 관리자 전용 주문/상품/쿠폰 관리 로직
 * Admin-only order/product/coupon management logic
 */
import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { PaymentPrismaService } from 'libs/common/src';
import { PortoneService } from './portone.service';

@Injectable()
export class AdminPaymentService {
  private readonly logger = new Logger(AdminPaymentService.name);

  constructor(
    private readonly paymentPrisma: PaymentPrismaService,
    private readonly portoneService: PortoneService,
  ) {}

  // ──── 주문 관리 / Order management ────

  /**
   * 전체 주문 목록 (필터, 페이지네이션)
   * All orders list with filters and pagination
   */
  async getOrders(filters: {
    status?: string;
    from?: string;
    to?: string;
    page?: number;
  }) {
    const page = filters.page || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters.status) where.status = filters.status;
    if (filters.from || filters.to) {
      where.createdAt = {};
      if (filters.from) where.createdAt.gte = new Date(filters.from);
      if (filters.to) where.createdAt.lte = new Date(filters.to + 'T23:59:59Z');
    }

    const [orders, total] = await Promise.all([
      this.paymentPrisma.order.findMany({
        where,
        include: { product: true, payment: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.paymentPrisma.order.count({ where }),
    ]);

    return {
      orders: orders.map(this.formatOrder),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * 주문 상세 / Order detail
   */
  async getOrderDetail(orderId: number) {
    const order = await this.paymentPrisma.order.findUnique({
      where: { id: orderId },
      include: { product: true, payment: true },
    });
    if (!order) throw new NotFoundException('주문을 찾을 수 없습니다 / Order not found');
    return this.formatOrder(order);
  }

  /**
   * 어드민 환불 처리 / Admin refund
   */
  async cancelOrder(orderId: number, reason: string) {
    const order = await this.paymentPrisma.order.findUnique({
      where: { id: orderId },
      include: { payment: true },
    });
    if (!order) throw new NotFoundException('주문을 찾을 수 없습니다 / Order not found');
    if (order.status === 'CANCELLED') {
      throw new BadRequestException('이미 취소된 주문입니다 / Already cancelled');
    }

    // 포트원 환불 요청 / Request PortOne refund
    if (order.payment && order.payment.portonePaymentId) {
      try {
        await this.portoneService.cancelPayment(
          order.payment.portonePaymentId,
          reason,
        );
      } catch (err) {
        this.logger.error(`[AdminPayment] 포트원 환불 실패: orderId=${orderId}`, err);
      }
    }

    // 주문 상태 업데이트 / Update order status
    await this.paymentPrisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
    });

    if (order.payment) {
      await this.paymentPrisma.payment.update({
        where: { id: order.payment.id },
        data: { status: 'CANCELLED', cancelledAt: new Date(), cancelReason: reason },
      });
    }

    this.logger.log(`[AdminPayment] 주문 환불: orderId=${orderId}, reason=${reason}`);
    return { success: true, orderId };
  }

  // ──── 결제 통계 / Payment stats ────

  /**
   * 결제 통계 / Payment statistics
   */
  async getStats() {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [todayOrders, weekOrders, monthOrders, totalOrders] = await Promise.all([
      this.getOrderStats(todayStart, now),
      this.getOrderStats(weekStart, now),
      this.getOrderStats(monthStart, now),
      this.getOrderStats(new Date('2020-01-01'), now),
    ]);

    // 상품별 매출 / Revenue by product
    const productRevenue = await this.paymentPrisma.order.groupBy({
      by: ['productId'],
      where: { status: 'PAID' },
      _sum: { totalAmount: true },
      _count: { id: true },
    });

    // 상품 정보 조회 / Get product info
    const products = await this.paymentPrisma.product.findMany();
    const productMap = new Map(products.map((p) => [p.id, p]));

    const revenueByProduct = productRevenue.map((r) => {
      const product = productMap.get(r.productId);
      return {
        productCode: product?.code || 'UNKNOWN',
        productName: product?.name || 'Unknown',
        category: product?.category || 'UNKNOWN',
        orderCount: r._count.id,
        totalRevenue: r._sum.totalAmount || 0,
      };
    });

    return {
      today: todayOrders,
      weekly: weekOrders,
      monthly: monthOrders,
      total: totalOrders,
      revenueByProduct,
    };
  }

  private async getOrderStats(from: Date, to: Date) {
    const where = { createdAt: { gte: from, lte: to } };
    const [paidCount, paidSum, cancelledCount, cancelledSum] = await Promise.all([
      this.paymentPrisma.order.count({ where: { ...where, status: 'PAID' } }),
      this.paymentPrisma.order.aggregate({
        where: { ...where, status: 'PAID' },
        _sum: { totalAmount: true },
      }),
      this.paymentPrisma.order.count({ where: { ...where, status: 'CANCELLED' } }),
      this.paymentPrisma.order.aggregate({
        where: { ...where, status: 'CANCELLED' },
        _sum: { totalAmount: true },
      }),
    ]);

    return {
      revenue: paidSum._sum.totalAmount || 0,
      orderCount: paidCount,
      refundCount: cancelledCount,
      refundAmount: cancelledSum._sum.totalAmount || 0,
    };
  }

  // ──── 상품 관리 / Product management ────

  async getProducts() {
    const products = await this.paymentPrisma.product.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return products.map((p) => ({
      id: p.id,
      code: p.code,
      name: p.name,
      category: p.category,
      price: p.price,
      isActive: p.isActive,
      metadata: p.metadata,
    }));
  }

  async updateProduct(productId: number, data: { name?: string; price?: number; isActive?: boolean; metadata?: any }) {
    const product = await this.paymentPrisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('상품을 찾을 수 없습니다 / Product not found');

    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.metadata !== undefined) updateData.metadata = data.metadata;

    const updated = await this.paymentPrisma.product.update({
      where: { id: productId },
      data: updateData,
    });

    this.logger.log(`[AdminPayment] 상품 수정: productId=${productId}`);
    return { id: updated.id, code: updated.code, name: updated.name, price: updated.price, isActive: updated.isActive };
  }

  // ──── 쿠폰 관리 / Coupon management ────

  async getCoupons() {
    const coupons = await this.paymentPrisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return coupons.map((c) => ({
      id: c.id,
      code: c.code,
      name: c.name,
      type: c.type,
      value: c.value,
      targetProduct: c.targetProduct,
      isActive: c.isActive,
      maxUses: c.maxUses,
      usedCount: c.usedCount,
      maxUsesPerUser: c.maxUsesPerUser,
      startsAt: c.startsAt,
      expiresAt: c.expiresAt,
    }));
  }

  async createCoupon(data: {
    code: string;
    name: string;
    type: string;
    value: number;
    targetProduct?: string;
    maxUses?: number;
    maxUsesPerUser?: number;
    startsAt?: string;
    expiresAt?: string;
  }) {
    const coupon = await this.paymentPrisma.coupon.create({
      data: {
        code: data.code,
        name: data.name,
        type: data.type as any,
        value: data.value,
        targetProduct: (data.targetProduct || null) as any,
        maxUses: data.maxUses || null,
        maxUsesPerUser: data.maxUsesPerUser || 1,
        startsAt: data.startsAt ? new Date(data.startsAt) : new Date(),
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : new Date('2099-12-31'),
        isActive: true,
      },
    });

    this.logger.log(`[AdminPayment] 쿠폰 생성: code=${data.code}`);
    return { id: coupon.id, code: coupon.code, name: coupon.name };
  }

  async updateCoupon(couponId: number, data: { isActive?: boolean; maxUses?: number; expiresAt?: string }) {
    const coupon = await this.paymentPrisma.coupon.findUnique({ where: { id: couponId } });
    if (!coupon) throw new NotFoundException('쿠폰을 찾을 수 없습니다 / Coupon not found');

    const updateData: any = {};
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.maxUses !== undefined) updateData.maxUses = data.maxUses;
    if (data.expiresAt !== undefined) updateData.expiresAt = new Date(data.expiresAt);

    const updated = await this.paymentPrisma.coupon.update({
      where: { id: couponId },
      data: updateData,
    });

    this.logger.log(`[AdminPayment] 쿠폰 수정: couponId=${couponId}`);
    return { id: updated.id, code: updated.code, isActive: updated.isActive };
  }

  // ──── 헬퍼 / Helpers ────

  private formatOrder(order: any) {
    return {
      id: order.id,
      orderNo: order.orderNo,
      userId: order.userId,
      status: order.status,
      productCode: order.product?.code,
      productName: order.product?.name,
      originalAmount: order.originalAmount,
      discountAmount: order.discountAmount,
      totalAmount: order.totalAmount,
      couponCode: order.couponCode,
      targetJobId: order.targetJobId,
      createdAt: order.createdAt,
      payment: order.payment
        ? {
            id: order.payment.id,
            portonePaymentId: order.payment.portonePaymentId,
            status: order.payment.status,
            method: order.payment.method,
            paidAt: order.payment.paidAt,
            cancelledAt: order.payment.cancelledAt,
            cancelReason: order.payment.cancelReason,
          }
        : null,
    };
  }
}
