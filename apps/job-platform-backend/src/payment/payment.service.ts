import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PaymentPrismaService } from 'libs/common/src';
import { AuthPrismaService } from 'libs/common/src';
import { PortoneService } from './portone.service';
import { ProductService } from './product.service';
import { CouponService } from './coupon.service';
import { ViewingCreditService } from './viewing-credit.service';

/**
 * 주문/결제 핵심 로직 서비스
 * Order/payment core business logic service
 */
@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private readonly paymentPrisma: PaymentPrismaService,
    private readonly authPrisma: AuthPrismaService,
    private readonly portoneService: PortoneService,
    private readonly productService: ProductService,
    private readonly couponService: CouponService,
    private readonly viewingCreditService: ViewingCreditService,
  ) {}

  // ================================================
  // 1. 주문 생성 / Create order
  // ================================================
  async createOrder(
    userId: string,
    productCode: string,
    targetJobId?: number,
    couponCode?: string,
  ) {
    // 상품 조회 (활성 상품만) / Get active product
    const product = await this.productService.findActiveByCode(productCode);

    // 쿠폰 검증 + 할인 계산 / Validate coupon + calculate discount
    let couponId: number | null = null;
    let discount = 0;
    if (couponCode) {
      const coupon = await this.couponService.validate(couponCode, userId);

      // 상품 카테고리 확인 / Check product category match
      if (coupon.targetProduct && coupon.targetProduct !== product.category) {
        throw new BadRequestException(
          `이 쿠폰은 해당 상품에 사용할 수 없습니다 / Coupon not applicable to this product category`,
        );
      }

      discount = this.couponService.calculateDiscount(
        {
          type: coupon.type,
          value: coupon.value,
          minOrderAmount: coupon.minOrderAmount,
        },
        product.price,
      );
      couponId = coupon.id;
    }

    const originalAmount = product.price;
    const totalAmount = Math.max(0, originalAmount - discount);

    // 주문번호 생성: ORD-YYYYMMDD-XXXXX / Generate order number
    const orderNo = this.generateOrderNo();

    // 주문 생성 / Create order
    const order = await this.paymentPrisma.order.create({
      data: {
        orderNo,
        userId,
        productId: product.id,
        targetJobId: targetJobId ? BigInt(targetJobId) : null,
        quantity: 1,
        totalAmount,
        originalAmount,
        couponId,
        status: 'PENDING',
      },
      include: { product: true },
    });

    this.logger.log(
      `[Payment] 주문 생성: orderNo=${orderNo}, productCode=${productCode}, total=${totalAmount}`,
    );

    return {
      orderId: order.id,
      orderNo: order.orderNo,
      totalAmount: order.totalAmount,
      originalAmount: order.originalAmount,
      discount,
      productName: product.name,
      productNameEn: product.nameEn,
    };
  }

  // ================================================
  // 2. 결제 확인 / Confirm payment
  // ================================================
  async confirmPayment(orderId: number, portonePaymentId: string) {
    // 주문 조회 / Get order
    const order = await this.paymentPrisma.order.findUnique({
      where: { id: orderId },
      include: { product: true, payment: true },
    });

    if (!order) {
      throw new NotFoundException(
        `주문을 찾을 수 없습니다 / Order not found: ${orderId}`,
      );
    }

    if (order.status !== 'PENDING') {
      throw new ConflictException(
        `이미 처리된 주문입니다 / Order already processed: status=${order.status}`,
      );
    }

    if (order.payment) {
      throw new ConflictException(
        `이미 결제 정보가 등록된 주문입니다 / Payment already exists for this order`,
      );
    }

    // 포트원 결제 검증 / Verify with PortOne
    const portonePayment = await this.portoneService.verifyPayment(
      portonePaymentId,
      order.totalAmount,
    );

    // 결제 수단 매핑 / Map payment method
    const method = this.mapPaymentMethod(portonePayment.method?.type);

    // 트랜잭션: Payment 생성 + Order 상태 변경 + 쿠폰 사용 기록
    // Transaction: Create Payment + Update Order + Record coupon usage
    const [payment] = await this.paymentPrisma.$transaction([
      this.paymentPrisma.payment.create({
        data: {
          orderId: order.id,
          portonePaymentId,
          method,
          status: 'PAID',
          paidAmount: portonePayment.amount.total,
          paidAt: portonePayment.paidAt
            ? new Date(portonePayment.paidAt)
            : new Date(),
          receiptUrl: portonePayment.receiptUrl || null,
          cardInfo: portonePayment.method?.card
            ? JSON.stringify(portonePayment.method.card)
            : null,
        },
      }),
      this.paymentPrisma.order.update({
        where: { id: order.id },
        data: { status: 'PAID' },
      }),
    ]);

    // 쿠폰 사용 기록 / Record coupon usage
    if (order.couponId) {
      await this.couponService.recordUsage(order.couponId, order.userId);
    }

    // 상품 효과 적용 / Apply product effect
    await this.applyProductEffect(order);

    this.logger.log(
      `[Payment] 결제 확인 완료: orderId=${orderId}, portonePaymentId=${portonePaymentId}`,
    );

    return {
      orderId: order.id,
      orderNo: order.orderNo,
      status: 'PAID',
      paidAmount: portonePayment.amount.total,
      productName: order.product.name,
    };
  }

  // ================================================
  // 3. 상품 효과 적용 / Apply product effect
  // ================================================
  private async applyProductEffect(order: any) {
    const product = order.product;
    const metadata = product.metadata ? JSON.parse(product.metadata) : {};

    switch (product.code) {
      case 'JOB_PREMIUM': {
        // 공고 프리미엄 업그레이드 / Job premium upgrade
        if (!order.targetJobId) break;
        const jobId = Number(order.targetJobId);

        // 노출 기간 연장 계산 / Calculate extended exposure days
        const job = await this.authPrisma.jobPosting.findUnique({
          where: { id: BigInt(jobId) },
        });
        if (!job) break;

        const isPartTime = job.boardType === 'PART_TIME';
        const premiumDays = isPartTime
          ? metadata.premiumDays?.partTime || 30
          : metadata.premiumDays?.fullTime || 60;

        const newExpiresAt = new Date();
        newExpiresAt.setDate(newExpiresAt.getDate() + premiumDays);

        await this.authPrisma.jobPosting.update({
          where: { id: BigInt(jobId) },
          data: {
            tierType: 'PREMIUM',
            expiresAt: newExpiresAt,
            upgradedAt: new Date(),
          },
        });

        this.logger.log(
          `[Payment] 프리미엄 업그레이드: jobId=${jobId}, expiresAt=${newExpiresAt.toISOString()}`,
        );
        break;
      }

      case 'JOB_EXTENSION': {
        // 공고 연장 / Job posting extension
        if (!order.targetJobId) break;
        const jobId = Number(order.targetJobId);

        const job = await this.authPrisma.jobPosting.findUnique({
          where: { id: BigInt(jobId) },
        });
        if (!job) break;

        const isPartTime = job.boardType === 'PART_TIME';
        const isPremium = job.tierType === 'PREMIUM';
        const extensionKey = isPremium ? 'premium' : 'standard';
        const dayKey = isPartTime ? 'partTime' : 'fullTime';
        const extensionDays =
          metadata.extensionDays?.[extensionKey]?.[dayKey] || 30;

        const baseDate =
          job.expiresAt && job.expiresAt > new Date()
            ? job.expiresAt
            : new Date();
        const newExpiresAt = new Date(baseDate);
        newExpiresAt.setDate(newExpiresAt.getDate() + extensionDays);

        await this.authPrisma.jobPosting.update({
          where: { id: BigInt(jobId) },
          data: {
            expiresAt: newExpiresAt,
            status: 'ACTIVE',
          },
        });

        this.logger.log(
          `[Payment] 공고 연장: jobId=${jobId}, +${extensionDays}일, expiresAt=${newExpiresAt.toISOString()}`,
        );
        break;
      }

      case 'VIEW_1':
      case 'VIEW_10':
      case 'VIEW_30':
      case 'VIEW_100': {
        // 인재 열람권 생성 / Create viewing credits
        const credits =
          metadata.credits || parseInt(product.code.replace('VIEW_', ''));
        const validDays = metadata.validDays || 30;

        await this.viewingCreditService.grantCredits(
          order.userId,
          credits,
          product.code,
          validDays,
        );
        break;
      }

      case 'BUMP_UP': {
        // 끌어올리기 / Bump up
        if (!order.targetJobId) break;
        await this.authPrisma.jobPosting.update({
          where: { id: BigInt(Number(order.targetJobId)) },
          data: { bumpedAt: new Date() },
        });
        this.logger.log(`[Payment] 끌어올리기: jobId=${order.targetJobId}`);
        break;
      }

      case 'URGENT_BADGE': {
        // 긴급 채용 배지 / Urgent badge
        if (!order.targetJobId) break;
        await this.authPrisma.jobPosting.update({
          where: { id: BigInt(Number(order.targetJobId)) },
          data: { isUrgent: true },
        });
        this.logger.log(`[Payment] 긴급 배지: jobId=${order.targetJobId}`);
        break;
      }

      case 'FEATURED': {
        // 홈 추천 / Featured posting
        if (!order.targetJobId) break;
        const durationDays = metadata.durationDays || 7;
        const featuredUntil = new Date();
        featuredUntil.setDate(featuredUntil.getDate() + durationDays);

        await this.authPrisma.jobPosting.update({
          where: { id: BigInt(Number(order.targetJobId)) },
          data: { isFeatured: true, featuredUntil },
        });
        this.logger.log(
          `[Payment] 홈 추천: jobId=${order.targetJobId}, until=${featuredUntil.toISOString()}`,
        );
        break;
      }

      default:
        this.logger.warn(`[Payment] 알 수 없는 상품 코드: ${product.code}`);
    }
  }

  // ================================================
  // 4. 결제 취소 / Cancel payment
  // ================================================
  async cancelPayment(orderId: number, userId: string, reason: string) {
    const order = await this.paymentPrisma.order.findUnique({
      where: { id: orderId },
      include: { product: true, payment: true },
    });

    if (!order) {
      throw new NotFoundException(`주문을 찾을 수 없습니다 / Order not found`);
    }

    if (order.userId !== userId) {
      throw new BadRequestException(
        `본인의 주문만 취소할 수 있습니다 / Can only cancel your own orders`,
      );
    }

    if (order.status !== 'PAID') {
      throw new BadRequestException(
        `결제 완료된 주문만 취소 가능합니다 / Only paid orders can be cancelled`,
      );
    }

    if (!order.payment) {
      throw new BadRequestException(
        `결제 정보가 없습니다 / No payment information`,
      );
    }

    // 포트원 결제 취소 / Cancel via PortOne
    const cancelResult = await this.portoneService.cancelPayment(
      order.payment.portonePaymentId,
      reason,
    );

    // DB 업데이트 / Update DB
    await this.paymentPrisma.$transaction([
      this.paymentPrisma.payment.update({
        where: { id: order.payment.id },
        data: {
          status: 'CANCELLED',
          cancelledAmount:
            cancelResult.cancelledAmount || order.payment.paidAmount,
          cancelledAt: new Date(),
          cancelReason: reason,
        },
      }),
      this.paymentPrisma.order.update({
        where: { id: order.id },
        data: { status: 'CANCELLED' },
      }),
    ]);

    // 상품 효과 롤백 / Rollback product effect
    await this.rollbackProductEffect(order);

    this.logger.log(
      `[Payment] 결제 취소: orderId=${orderId}, reason=${reason}`,
    );
    return { orderId, status: 'CANCELLED', reason };
  }

  /**
   * 상품 효과 롤백 / Rollback product effect
   */
  private async rollbackProductEffect(order: any) {
    const product = order.product;

    switch (product.code) {
      case 'JOB_PREMIUM':
        if (order.targetJobId) {
          await this.authPrisma.jobPosting.update({
            where: { id: BigInt(Number(order.targetJobId)) },
            data: {
              tierType: 'STANDARD',
              upgradedAt: null,
            },
          });
        }
        break;

      case 'VIEW_1':
      case 'VIEW_10':
      case 'VIEW_30':
      case 'VIEW_100':
        await this.viewingCreditService.rollbackCredits(
          order.userId,
          product.code,
        );
        break;

      case 'BUMP_UP':
        if (order.targetJobId) {
          await this.authPrisma.jobPosting.update({
            where: { id: BigInt(Number(order.targetJobId)) },
            data: { bumpedAt: null },
          });
        }
        break;

      case 'URGENT_BADGE':
        if (order.targetJobId) {
          await this.authPrisma.jobPosting.update({
            where: { id: BigInt(Number(order.targetJobId)) },
            data: { isUrgent: false },
          });
        }
        break;

      case 'FEATURED':
        if (order.targetJobId) {
          await this.authPrisma.jobPosting.update({
            where: { id: BigInt(Number(order.targetJobId)) },
            data: { isFeatured: false, featuredUntil: null },
          });
        }
        break;
    }
  }

  // ================================================
  // 5. 주문 조회 / Get orders
  // ================================================

  /** 주문 상세 / Order detail */
  async getOrder(orderId: number) {
    const order = await this.paymentPrisma.order.findUnique({
      where: { id: orderId },
      include: { product: true, payment: true, coupon: true },
    });
    if (!order) {
      throw new NotFoundException(`주문을 찾을 수 없습니다 / Order not found`);
    }
    return order;
  }

  /** 내 주문 목록 / My orders */
  async getMyOrders(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [orders, total] = await Promise.all([
      this.paymentPrisma.order.findMany({
        where: { userId },
        include: { product: true, payment: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.paymentPrisma.order.count({ where: { userId } }),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ================================================
  // 웹훅 처리 / Webhook processing
  // ================================================

  /** 웹훅에서 결제 확정 / Confirm payment from webhook */
  async handleWebhookPaid(portonePaymentId: string, webhookData: any) {
    // 기존 Payment 찾기 / Find existing payment
    let payment = await this.paymentPrisma.payment.findUnique({
      where: { portonePaymentId },
      include: { order: { include: { product: true } } },
    });

    if (payment) {
      // 이미 PAID면 스킵 / Skip if already PAID
      if (payment.status === 'PAID') {
        this.logger.log(
          `[Webhook] 이미 결제 확인됨 (중복 웹훅): ${portonePaymentId}`,
        );
        return;
      }

      // 웹훅 데이터 저장 + 상태 업데이트 / Save webhook data + update status
      await this.paymentPrisma.$transaction([
        this.paymentPrisma.payment.update({
          where: { id: payment.id },
          data: {
            status: 'PAID',
            webhookData: JSON.stringify(webhookData),
            paidAt: new Date(),
          },
        }),
        this.paymentPrisma.order.update({
          where: { id: payment.orderId },
          data: { status: 'PAID' },
        }),
      ]);

      // 상품 효과 적용 / Apply product effect
      await this.applyProductEffect(payment.order);
    } else {
      // confirmPayment보다 웹훅이 먼저 도착한 경우 — 웹훅 데이터만 기록
      // Webhook arrived before confirmPayment — just log
      this.logger.warn(
        `[Webhook] Payment 레코드 없음 (confirmPayment 미호출): ${portonePaymentId}`,
      );
    }
  }

  /** 웹훅에서 결제 취소 / Handle cancelled from webhook */
  async handleWebhookCancelled(portonePaymentId: string, webhookData: any) {
    const payment = await this.paymentPrisma.payment.findUnique({
      where: { portonePaymentId },
      include: { order: { include: { product: true } } },
    });

    if (!payment) return;

    await this.paymentPrisma.$transaction([
      this.paymentPrisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'CANCELLED',
          cancelledAt: new Date(),
          webhookData: JSON.stringify(webhookData),
        },
      }),
      this.paymentPrisma.order.update({
        where: { id: payment.orderId },
        data: { status: 'CANCELLED' },
      }),
    ]);

    await this.rollbackProductEffect(payment.order);
    this.logger.log(`[Webhook] 결제 취소 처리: ${portonePaymentId}`);
  }

  /** 웹훅에서 결제 실패 / Handle failed from webhook */
  async handleWebhookFailed(portonePaymentId: string, webhookData: any) {
    const payment = await this.paymentPrisma.payment.findUnique({
      where: { portonePaymentId },
    });

    if (!payment) return;

    await this.paymentPrisma.$transaction([
      this.paymentPrisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'FAILED',
          failReason: webhookData?.reason || 'Unknown',
          webhookData: JSON.stringify(webhookData),
        },
      }),
      this.paymentPrisma.order.update({
        where: { id: payment.orderId },
        data: { status: 'FAILED' },
      }),
    ]);

    this.logger.log(`[Webhook] 결제 실패 처리: ${portonePaymentId}`);
  }

  // ================================================
  // 유틸리티 / Utilities
  // ================================================

  /** 주문번호 생성: ORD-YYYYMMDD-XXXXX / Generate order number */
  private generateOrderNo(): string {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `ORD-${dateStr}-${random}`;
  }

  /** 결제 수단 매핑 / Map payment method */
  private mapPaymentMethod(
    type?: string,
  ): 'CARD' | 'VIRTUAL_ACCOUNT' | 'EASY_PAY' | 'TRANSFER' {
    switch (type) {
      case 'Card':
        return 'CARD';
      case 'VirtualAccount':
        return 'VIRTUAL_ACCOUNT';
      case 'EasyPay':
        return 'EASY_PAY';
      case 'Transfer':
        return 'TRANSFER';
      default:
        return 'CARD';
    }
  }
}
