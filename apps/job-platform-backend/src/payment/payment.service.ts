import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadGatewayException,
} from '@nestjs/common';
import { PaymentPrismaService } from 'libs/common/src';
import { AuthPrismaService } from 'libs/common/src';
import type { Prisma } from 'generated/prisma-payment';
import { PortonePaymentResponse, PortoneService } from './portone.service';
import { ProductService } from './product.service';
import { CouponService } from './coupon.service';
import { ViewingCreditService } from './viewing-credit.service';
import { createHash, randomUUID } from 'crypto';

/**
 * 상위노출(프리미엄) 상품 코드 판별 헬퍼
 * Helper to check if product code is a premium listing product
 */
function isPremiumProduct(code: string): boolean {
  return (
    code === 'JOB_PREMIUM' ||
    code.startsWith('PREMIUM_') ||
    code.startsWith('ALBA_PREMIUM_') ||
    code.startsWith('FULL_PREMIUM_')
  );
}

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
    if (!Number.isSafeInteger(product.price) || product.price <= 0) {
      throw new BadRequestException(
        '상품 가격 설정이 올바르지 않습니다 / Product price configuration is invalid',
      );
    }
    await this.validateTargetJobOwnership(userId, product.code, targetJobId);

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
      if (
        !Number.isSafeInteger(discount) ||
        discount < 0 ||
        discount > product.price
      ) {
        throw new BadRequestException(
          '쿠폰 할인 설정이 올바르지 않습니다 / Coupon discount configuration is invalid',
        );
      }
      couponId = coupon.id;
    }

    const originalAmount = product.price;
    const totalAmount = Math.max(0, originalAmount - discount);
    if (totalAmount <= 0) {
      throw new BadRequestException(
        '0원 주문은 결제창에서 처리할 수 없습니다 / Zero-value orders require a free-grant flow',
      );
    }

    // 서버가 주문번호와 결제 ID를 함께 선점한다. 브라우저가 paymentId를 만들면
    // 동일 금액의 다른 결제를 주문에 붙일 수 있으므로 허용하지 않는다.
    const orderNo = this.generateOrderNo();
    const portonePaymentId = `pay_${randomUUID().replace(/-/g, '')}`;
    const currency = 'KRW';
    const storeId = this.portoneService.getStoreId();
    // Fail before writing a pending order when the browser channel is not ready.
    const checkout = this.portoneService.getCheckoutConfig(
      portonePaymentId,
      product.name,
      totalAmount,
      currency,
    );

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
        currency,
        payment: {
          create: {
            portonePaymentId,
            storeId,
            currency,
            status: 'PENDING',
            method: 'UNKNOWN',
          },
        },
      },
      include: { product: true, payment: true },
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
      checkout,
    };
  }

  // ================================================
  // 2. 결제 확인 / Confirm payment
  // ================================================
  async confirmPayment(
    orderId: number,
    portonePaymentId: string,
    userId: string,
  ) {
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

    // 소유권 검증 (IDOR 방지) / Ownership check (prevent IDOR)
    if (order.userId !== userId) {
      throw new ForbiddenException(
        '본인의 주문만 확인할 수 있습니다 / Can only confirm your own orders',
      );
    }

    if (!order.payment || order.payment.portonePaymentId !== portonePaymentId) {
      throw new BadRequestException(
        '결제 ID가 주문에 발급된 값과 일치하지 않습니다 / Payment ID does not belong to this order',
      );
    }

    if (order.status === 'PAID' && order.payment.status === 'PAID') {
      await this.fulfillPaidOrder(order.id);
      return this.buildPaidOrderResponse(order);
    }

    if (order.status !== 'PENDING' || order.payment.status !== 'PENDING') {
      throw new ConflictException(
        `처리할 수 없는 주문 상태입니다 / Invalid order state: order=${order.status}, payment=${order.payment.status}`,
      );
    }

    const portonePayment = await this.portoneService.verifyPayment(
      portonePaymentId,
      {
        amount: order.totalAmount,
        currency: order.currency,
        requirePaid: true,
      },
    );
    await this.persistPaidPayment(order.id, portonePayment);
    await this.fulfillPaidOrder(order.id);

    this.logger.log(
      `[Payment] 결제 확인 완료: orderId=${orderId}, payment=${this.maskPaymentId(portonePaymentId)}`,
    );

    return this.buildPaidOrderResponse(order, portonePayment.amount.total);
  }

  private async validateTargetJobOwnership(
    userId: string,
    productCode: string,
    targetJobId?: number,
  ): Promise<void> {
    const requiresTarget =
      isPremiumProduct(productCode) ||
      ['JOB_EXTENSION', 'BUMP_UP', 'URGENT_BADGE', 'FEATURED'].includes(
        productCode,
      );

    if (!requiresTarget) {
      if (targetJobId !== undefined) {
        throw new BadRequestException(
          '이 상품에는 대상 공고를 지정할 수 없습니다 / Target job is not valid for this product',
        );
      }
      return;
    }
    if (!Number.isSafeInteger(targetJobId) || (targetJobId ?? 0) <= 0) {
      throw new BadRequestException(
        '대상 공고가 필요합니다 / A target job posting is required',
      );
    }

    const corporate = await this.authPrisma.corporateProfile.findUnique({
      where: { authId: userId },
      select: { companyId: true },
    });
    if (!corporate) {
      throw new ForbiddenException(
        '기업회원만 공고 상품을 구매할 수 있습니다 / Corporate account required',
      );
    }
    const job = await this.authPrisma.jobPosting.findUnique({
      where: { id: BigInt(targetJobId!) },
      select: { corporateId: true },
    });
    if (!job || job.corporateId !== corporate.companyId) {
      throw new ForbiddenException(
        '본인 기업의 공고만 결제할 수 있습니다 / Target job is not owned by this company',
      );
    }
  }

  private async persistPaidPayment(
    orderId: number,
    portonePayment: PortonePaymentResponse,
  ): Promise<void> {
    const paidAt = portonePayment.paidAt
      ? new Date(portonePayment.paidAt)
      : new Date();
    const cardInfo = this.buildSafeMethodMetadata(portonePayment);

    await this.paymentPrisma.$transaction(async (tx) => {
      const transitioned = await tx.payment.updateMany({
        where: {
          orderId,
          portonePaymentId: portonePayment.id,
          status: { in: ['PENDING', 'FAILED'] },
        },
        data: {
          method: this.mapPaymentMethod(portonePayment.method?.type),
          status: 'PAID',
          transactionId: portonePayment.transactionId ?? null,
          paidAmount: portonePayment.amount.total,
          paidAt,
          receiptUrl: portonePayment.receiptUrl ?? null,
          cardInfo,
          failReason: null,
          lastSyncedAt: new Date(),
        },
      });

      if (transitioned.count === 0) {
        const existing = await tx.payment.findUnique({ where: { orderId } });
        if (
          existing?.status === 'PAID' &&
          existing.portonePaymentId === portonePayment.id &&
          existing.paidAmount === portonePayment.amount.total
        ) {
          return;
        }
        throw new ConflictException(
          '결제 상태가 동시에 변경되었습니다 / Payment state changed concurrently',
        );
      }

      const orderTransition = await tx.order.updateMany({
        where: { id: orderId, status: { in: ['PENDING', 'FAILED'] } },
        data: { status: 'PAID' },
      });
      if (orderTransition.count !== 1) {
        throw new ConflictException(
          '주문 상태가 동시에 변경되었습니다 / Order state changed concurrently',
        );
      }
    });
  }

  private async fulfillPaidOrder(orderId: number): Promise<void> {
    const staleBefore = new Date(Date.now() - 5 * 60 * 1000);
    const claim = await this.paymentPrisma.order.updateMany({
      where: {
        id: orderId,
        status: 'PAID',
        OR: [
          { fulfillmentStatus: 'PENDING' },
          { fulfillmentStatus: 'FAILED' },
          {
            fulfillmentStatus: 'PROCESSING',
            fulfillmentStartedAt: { lt: staleBefore },
          },
        ],
      },
      data: {
        fulfillmentStatus: 'PROCESSING',
        fulfillmentStartedAt: new Date(),
        fulfillmentAttempts: { increment: 1 },
        fulfillmentError: null,
      },
    });

    if (claim.count === 0) {
      const current = await this.paymentPrisma.order.findUnique({
        where: { id: orderId },
        select: { fulfillmentStatus: true },
      });
      if (
        current?.fulfillmentStatus === 'FULFILLED' ||
        current?.fulfillmentStatus === 'PROCESSING'
      ) {
        return;
      }
      throw new ConflictException(
        '상품 지급 상태를 확인할 수 없습니다 / Fulfillment is not available',
      );
    }

    const order = await this.paymentPrisma.order.findUnique({
      where: { id: orderId },
      include: { product: true, payment: true, coupon: true },
    });
    if (!order?.payment || order.payment.status !== 'PAID') {
      throw new ConflictException(
        '결제 완료 상태가 아닙니다 / Payment is not in PAID state',
      );
    }

    try {
      if (order.couponId) {
        await this.couponService.recordUsage(
          order.couponId,
          order.userId,
          order.id,
        );
      }
      await this.applyProductEffect(order);
      await this.paymentPrisma.order.update({
        where: { id: order.id },
        data: {
          fulfillmentStatus: 'FULFILLED',
          fulfilledAt: new Date(),
          fulfillmentError: null,
        },
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message.slice(0, 1000) : 'Unknown error';
      await this.paymentPrisma.order.updateMany({
        where: { id: order.id, fulfillmentStatus: 'PROCESSING' },
        data: { fulfillmentStatus: 'FAILED', fulfillmentError: message },
      });
      throw error;
    }
  }

  private buildSafeMethodMetadata(
    payment: PortonePaymentResponse,
  ): string | null {
    if (!payment.method) return null;
    const metadata = {
      type: payment.method.type,
      provider: payment.method.provider,
      card: payment.method.card
        ? {
            publisher: payment.method.card.publisher,
            issuer: payment.method.card.issuer,
            brand: payment.method.card.brand,
            type: payment.method.card.type,
          }
        : undefined,
    };
    return JSON.stringify(metadata);
  }

  private buildPaidOrderResponse(order: any, paidAmount?: number) {
    return {
      orderId: order.id,
      orderNo: order.orderNo,
      status: 'PAID',
      paidAmount: paidAmount ?? order.payment?.paidAmount ?? order.totalAmount,
      productName: order.product.name,
    };
  }

  // ================================================
  // 3. 상품 효과 적용 / Apply product effect
  // ================================================
  private async applyProductEffect(order: any) {
    const product = order.product;
    const metadata = product.metadata ? JSON.parse(product.metadata) : {};

    // 상위노출 상품 판별 / Check if premium product
    if (isPremiumProduct(product.code)) {
      // 공고 상위노출(프리미엄) 업그레이드 / Job premium listing upgrade
      if (order.targetJobId) {
        const jobId = Number(order.targetJobId);

        const job = await this.authPrisma.jobPosting.findUnique({
          where: { id: BigInt(jobId) },
        });

        if (job) {
          // 기간별 상위노출권: metadata.durationDays 사용, 레거시는 boardType별 계산
          // Duration-based premium: use metadata.durationDays, legacy uses boardType
          let premiumDays: number;
          if (metadata.durationDays) {
            premiumDays = metadata.durationDays;
          } else {
            const isPartTime = job.boardType === 'PART_TIME';
            premiumDays = isPartTime
              ? metadata.premiumDays?.partTime || 30
              : metadata.premiumDays?.fullTime || 60;
          }

          // 기존 프리미엄 남은 기간 + 신규 기간 합산 / Add new days to remaining premium days
          const now = new Date();
          const baseDate =
            job.premiumEndAt && job.premiumEndAt > now ? job.premiumEndAt : now;
          const newPremiumEnd = new Date(baseDate);
          newPremiumEnd.setDate(newPremiumEnd.getDate() + premiumDays);

          // 공고 만료일도 프리미엄 종료일 이상으로 연장 / Extend job expiry to at least premium end
          const newExpiresAt =
            job.expiresAt && job.expiresAt > newPremiumEnd
              ? job.expiresAt
              : newPremiumEnd;

          await this.authPrisma.jobPosting.update({
            where: { id: BigInt(jobId) },
            data: {
              tierType: 'PREMIUM',
              premiumStartAt: job.premiumStartAt || now,
              premiumEndAt: newPremiumEnd,
              expiresAt: newExpiresAt,
              upgradedAt: now,
            },
          });

          this.logger.log(
            `[Payment] 상위노출 업그레이드: jobId=${jobId}, +${premiumDays}일, premiumEnd=${newPremiumEnd.toISOString()}`,
          );
        }
      }
    } else
      switch (product.code) {
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
            order.id,
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

  /**
   * 결제 취소 (부분 취소 지원)
   * Cancel payment with partial refund support
   *
   * 취소 불가 조건 / Non-refundable conditions:
   * - 본인 주문 아님 / Not owner's order
   * - PAID 상태 아님 / Not in PAID status
   * - 결제 후 7일 초과 / More than 7 days since payment
   * - 열람권 전부 사용 / All viewing credits used
   * - 즉시 적용 상품 24시간 초과 / Instant-effect product after 24h
   */
  async cancelPayment(orderId: number, userId: string, reason: string) {
    const normalizedReason = reason?.trim();
    if (
      typeof normalizedReason !== 'string' ||
      normalizedReason.length < 2 ||
      normalizedReason.length > 200
    ) {
      throw new BadRequestException(
        '취소 사유는 2~200자로 입력해주세요 / Cancellation reason must be 2-200 characters',
      );
    }
    const order = await this.paymentPrisma.order.findUnique({
      where: { id: orderId },
      include: { product: true, payment: true, coupon: true },
    });

    if (!order) {
      throw new NotFoundException('주문을 찾을 수 없습니다 / Order not found');
    }

    if (order.userId !== userId) {
      throw new ForbiddenException(
        '본인 주문만 취소 가능합니다 / Can only cancel your own orders',
      );
    }

    if (!order.payment) {
      throw new BadRequestException(
        '결제 정보가 없습니다 / No payment information',
      );
    }

    const succeededCancellation =
      await this.paymentPrisma.paymentCancellation.findFirst({
        where: { paymentId: order.payment.id, status: 'SUCCEEDED' },
        orderBy: { createdAt: 'desc' },
      });
    if (succeededCancellation) {
      const refundInfo = await this.calculateRefundAmount(order);
      await this.rollbackFulfilledOrder(order, refundInfo);
      return this.buildCancellationResponse(
        order,
        succeededCancellation.amount,
        refundInfo,
        'REFUNDED',
      );
    }

    const activeCancellation =
      await this.paymentPrisma.paymentCancellation.findFirst({
        where: {
          paymentId: order.payment.id,
          status: { in: ['PROCESSING', 'REQUESTED'] },
        },
        orderBy: { createdAt: 'desc' },
      });
    if (activeCancellation) {
      const refundInfo = await this.calculateRefundAmount(order);
      return this.processCancellation(order, activeCancellation, refundInfo);
    }

    if (
      order.status !== 'PAID' ||
      !['PAID', 'PARTIAL_CANCELLED'].includes(order.payment.status)
    ) {
      throw new BadRequestException(
        '결제 완료된 주문만 취소 가능합니다 / Only paid orders can be cancelled',
      );
    }
    if (order.fulfillmentStatus === 'PROCESSING') {
      throw new ConflictException(
        '상품 지급 처리 중에는 취소할 수 없습니다 / Fulfillment is still processing',
      );
    }

    const paidAt = order.payment.paidAt;
    if (paidAt) {
      const daysSincePaid =
        (Date.now() - paidAt.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSincePaid > 7) {
        throw new BadRequestException(
          `결제 후 7일이 초과하여 취소가 불가합니다. (결제일: ${paidAt.toLocaleDateString('ko-KR')}) / Cancellation period expired (7 days)`,
        );
      }
    }

    // 2. 상품별 환불 금액 계산 / Calculate refund amount per product type
    const refundInfo = await this.calculateRefundAmount(order);

    if (!refundInfo.canRefund) {
      throw new BadRequestException(refundInfo.reason);
    }

    const refundAmount = refundInfo.refundAmount;
    const paidAmount = order.payment.paidAmount ?? order.totalAmount;
    if (refundAmount <= 0 || refundAmount > paidAmount) {
      throw new BadRequestException('환불 금액 계산 결과가 올바르지 않습니다');
    }

    const cancellationId = randomUUID();
    const cancellation = await this.paymentPrisma.$transaction(async (tx) => {
      const claimed = await tx.payment.updateMany({
        where: {
          id: order.payment!.id,
          status: { in: ['PAID', 'PARTIAL_CANCELLED'] },
        },
        data: { status: 'CANCELLATION_PENDING' },
      });
      if (claimed.count !== 1) {
        throw new ConflictException(
          '다른 취소 요청이 처리 중입니다 / Another cancellation is in progress',
        );
      }
      return tx.paymentCancellation.create({
        data: {
          id: cancellationId,
          paymentId: order.payment!.id,
          idempotencyKey: `cancel_${cancellationId.replace(/-/g, '')}`,
          amount: refundAmount,
          reason: normalizedReason,
          previousPaymentStatus: order.payment!.status,
          status: 'PROCESSING',
        },
      });
    });

    return this.processCancellation(order, cancellation, refundInfo);
  }

  async cancelPaymentAsAdmin(orderId: number, reason: string) {
    const order = await this.paymentPrisma.order.findUnique({
      where: { id: orderId },
      select: { userId: true },
    });
    if (!order) {
      throw new NotFoundException('주문을 찾을 수 없습니다 / Order not found');
    }
    return this.cancelPayment(orderId, order.userId, reason);
  }

  private async processCancellation(
    order: Prisma.OrderGetPayload<{
      include: { product: true; payment: true; coupon: true };
    }>,
    cancellation: Prisma.PaymentCancellationGetPayload<object>,
    refundInfo: {
      canRefund: boolean;
      reason?: string;
      refundAmount: number;
      usedValue: number;
      usedDescription: string;
    },
  ) {
    if (!order.payment) {
      throw new ConflictException('결제 정보가 없습니다');
    }

    let result;
    try {
      const paidAmount = order.payment.paidAmount ?? order.totalAmount;
      const alreadyCancelled = order.payment.cancelledAmount ?? 0;
      const currentCancellableAmount = paidAmount - alreadyCancelled;
      if (currentCancellableAmount <= 0) {
        throw new ConflictException('취소 가능한 결제 잔액이 없습니다');
      }
      const isPartial = cancellation.amount < currentCancellableAmount;
      result = await this.portoneService.cancelPayment(
        order.payment.portonePaymentId,
        cancellation.reason,
        isPartial ? cancellation.amount : undefined,
        cancellation.idempotencyKey,
        currentCancellableAmount,
      );
    } catch (error) {
      await this.paymentPrisma.paymentCancellation.update({
        where: { id: cancellation.id },
        data: {
          status: 'PROCESSING',
          lastError:
            'PortOne cancellation result is uncertain; retry with the same idempotency key',
        },
      });
      throw error;
    }

    if (result.status === 'REQUESTED') {
      await this.paymentPrisma.paymentCancellation.update({
        where: { id: cancellation.id },
        data: {
          status: 'REQUESTED',
          portoneCancellationId: result.id,
          lastError: null,
        },
      });
      return {
        orderId: order.id,
        status: 'CANCELLATION_PENDING',
        refundAmount: cancellation.amount,
      };
    }

    if (result.status !== 'SUCCEEDED') {
      await this.paymentPrisma.$transaction([
        this.paymentPrisma.paymentCancellation.update({
          where: { id: cancellation.id },
          data: {
            status: 'FAILED',
            portoneCancellationId: result.id,
            completedAt: new Date(),
            lastError: 'PortOne reported cancellation failure',
          },
        }),
        this.paymentPrisma.payment.update({
          where: { id: order.payment.id },
          data: { status: cancellation.previousPaymentStatus },
        }),
      ]);
      throw new BadGatewayException('결제사에서 취소 요청을 거절했습니다');
    }

    if (result.cancelledAmount !== cancellation.amount) {
      await this.paymentPrisma.paymentCancellation.update({
        where: { id: cancellation.id },
        data: {
          portoneCancellationId: result.id,
          lastError:
            'Cancellation amount mismatch; awaiting webhook reconciliation',
        },
      });
      throw new BadGatewayException(
        '결제사 취소 금액 확인이 필요합니다. 자동 재처리됩니다',
      );
    }

    const paidAmount = order.payment.paidAmount ?? order.totalAmount;
    const cumulativeCancelledAmount =
      (order.payment.cancelledAmount ?? 0) + cancellation.amount;
    const paymentStatus =
      cumulativeCancelledAmount < paidAmount
        ? 'PARTIAL_CANCELLED'
        : 'CANCELLED';
    const cancelledAt = result.cancelledAt
      ? new Date(result.cancelledAt)
      : new Date();

    await this.paymentPrisma.$transaction([
      this.paymentPrisma.paymentCancellation.update({
        where: { id: cancellation.id },
        data: {
          status: 'SUCCEEDED',
          portoneCancellationId: result.id,
          completedAt: cancelledAt,
          lastError: null,
        },
      }),
      this.paymentPrisma.payment.update({
        where: { id: order.payment.id },
        data: {
          status: paymentStatus,
          cancelledAmount: cumulativeCancelledAmount,
          cancelledAt,
          cancelReason: cancellation.reason,
          lastSyncedAt: new Date(),
        },
      }),
      this.paymentPrisma.order.update({
        where: { id: order.id },
        data: { status: 'REFUNDED' },
      }),
    ]);

    await this.rollbackFulfilledOrder(order, refundInfo);
    return this.buildCancellationResponse(
      order,
      cancellation.amount,
      refundInfo,
      'REFUNDED',
    );
  }

  private async rollbackFulfilledOrder(
    order: Prisma.OrderGetPayload<{
      include: { product: true; payment: true; coupon: true };
    }>,
    refundInfo: {
      canRefund: boolean;
      reason?: string;
      refundAmount: number;
      usedValue: number;
      usedDescription: string;
    },
  ): Promise<void> {
    if (order.fulfillmentStatus === 'ROLLED_BACK') return;
    if (order.fulfillmentStatus === 'PENDING') {
      await this.paymentPrisma.order.updateMany({
        where: { id: order.id, fulfillmentStatus: 'PENDING' },
        data: {
          fulfillmentStatus: 'ROLLED_BACK',
          fulfillmentError: null,
        },
      });
      return;
    }

    const staleBefore = new Date(Date.now() - 5 * 60 * 1000);
    const claimed = await this.paymentPrisma.order.updateMany({
      where: {
        id: order.id,
        OR: [
          { fulfillmentStatus: 'FULFILLED' },
          { fulfillmentStatus: 'FAILED' },
          {
            fulfillmentStatus: 'ROLLBACK_PROCESSING',
            fulfillmentStartedAt: { lt: staleBefore },
          },
        ],
      },
      data: {
        fulfillmentStatus: 'ROLLBACK_PROCESSING',
        fulfillmentStartedAt: new Date(),
        fulfillmentAttempts: { increment: 1 },
        fulfillmentError: null,
      },
    });
    if (claimed.count === 0) {
      const current = await this.paymentPrisma.order.findUnique({
        where: { id: order.id },
        select: { fulfillmentStatus: true },
      });
      if (current?.fulfillmentStatus === 'ROLLED_BACK') return;
      throw new ConflictException(
        '상품 환불 후처리가 진행 중입니다 / Refund fulfillment is already processing',
      );
    }

    try {
      await this.rollbackProductEffectWithRefund(order, refundInfo);
      await this.paymentPrisma.order.updateMany({
        where: { id: order.id, fulfillmentStatus: 'ROLLBACK_PROCESSING' },
        data: {
          fulfillmentStatus: 'ROLLED_BACK',
          fulfillmentError: null,
        },
      });
    } catch (error) {
      await this.paymentPrisma.order.updateMany({
        where: { id: order.id, fulfillmentStatus: 'ROLLBACK_PROCESSING' },
        data: {
          fulfillmentStatus: 'FAILED',
          fulfillmentError:
            error instanceof Error
              ? error.message.slice(0, 1000)
              : 'Refund fulfillment failed',
        },
      });
      throw error;
    }
  }

  private buildCancellationResponse(
    order: {
      id: number;
      totalAmount: number;
      couponId: number | null;
      payment: any;
    },
    refundAmount: number,
    refundInfo: { usedValue: number; usedDescription: string },
    status: string,
  ) {
    const paidAmount = order.payment?.paidAmount ?? order.totalAmount;
    const isPartialRefund = refundAmount < paidAmount;
    return {
      orderId: order.id,
      status,
      refundAmount,
      usedValue: refundInfo.usedValue,
      isPartialRefund,
      refundMessage: isPartialRefund
        ? `사용한 ${refundInfo.usedDescription} 제외 후 ${refundAmount.toLocaleString()}원 환불됩니다. (3~5 영업일 소요)`
        : `${refundAmount.toLocaleString()}원 전액 환불됩니다. (3~5 영업일 소요)`,
      couponNote: order.couponId
        ? '쿠폰 할인분은 환불되지 않으며, 사용된 쿠폰은 재사용이 불가합니다.'
        : undefined,
    };
  }

  /**
   * 상품별 환불 금액 계산
   * Calculate refund amount based on product type and usage
   *
   * 열람권: 미사용 건수 비례 환불 / Viewing credits: pro-rata by unused count
   * 프리미엄 공고: 24시간 이내 전액, 이후 잔여 기간 비례 / Premium: full <24h, pro-rata after
   * 즉시 적용 상품: 24시간 이내 전액, 이후 취소 불가 / Instant: full <24h, no refund after
   */
  private async calculateRefundAmount(
    order: Prisma.OrderGetPayload<{
      include: { product: true; payment: true; coupon: true };
    }>,
  ): Promise<{
    canRefund: boolean;
    reason?: string;
    refundAmount: number;
    usedValue: number;
    usedDescription: string;
  }> {
    const product = order.product;
    const paidAmount = order.payment?.paidAmount ?? order.totalAmount;

    // 상위노출(프리미엄) 상품 환불 계산 / Premium listing refund calculation
    if (isPremiumProduct(product.code)) {
      if (!order.targetJobId) {
        return {
          canRefund: true,
          refundAmount: paidAmount,
          usedValue: 0,
          usedDescription: '',
        };
      }

      const job = await this.authPrisma.jobPosting.findUnique({
        where: { id: BigInt(Number(order.targetJobId)) },
      });

      if (!job || !job.upgradedAt) {
        return {
          canRefund: true,
          refundAmount: paidAmount,
          usedValue: 0,
          usedDescription: '',
        };
      }

      const hoursUsed =
        (Date.now() - job.upgradedAt.getTime()) / (1000 * 60 * 60);

      if (hoursUsed <= 24) {
        return {
          canRefund: true,
          refundAmount: paidAmount,
          usedValue: 0,
          usedDescription: '',
        };
      }

      const metadata = product.metadata ? JSON.parse(product.metadata) : {};
      const totalDays =
        metadata.durationDays ?? metadata.premiumDays?.fullTime ?? 60;
      const daysUsed = hoursUsed / 24;
      const daysRemaining = Math.max(0, totalDays - daysUsed);

      if (daysRemaining < 1) {
        return {
          canRefund: false,
          reason:
            '상위노출 기간이 모두 소진되어 환불이 불가합니다. / Premium listing period fully used',
          refundAmount: 0,
          usedValue: paidAmount,
          usedDescription: `상위노출 ${Math.floor(daysUsed)}일 사용`,
        };
      }

      const refundAmount = Math.floor(paidAmount * (daysRemaining / totalDays));
      const usedValue = paidAmount - refundAmount;
      return {
        canRefund: true,
        refundAmount,
        usedValue,
        usedDescription: `상위노출 ${Math.floor(daysUsed)}일 사용 (${usedValue.toLocaleString()}원)`,
      };
    }

    switch (product.code) {
      case 'VIEW_1':
      case 'VIEW_5':
      case 'VIEW_10':
      case 'VIEW_30':
      case 'VIEW_50':
      case 'VIEW_100': {
        // 열람권: 미사용 건수 비례 환불
        // Viewing credits: refund proportional to unused credits
        const refundInfo =
          await this.viewingCreditService.calculateCreditRefund(
            order.userId,
            product.code,
            order.id,
          );

        // 레코드 자체가 없으면 전액 환불 (이미 롤백됐거나 오류 상황)
        // No record → full refund (already rolled back or error state)
        if (refundInfo.totalCredits === 0) {
          return {
            canRefund: true,
            refundAmount: paidAmount,
            usedValue: 0,
            usedDescription: '',
          };
        }

        // 전부 사용 → 환불 불가
        // All used → no refund
        if (refundInfo.refundableCredits === 0) {
          return {
            canRefund: false,
            reason: `열람권 ${refundInfo.totalCredits}건을 모두 사용하여 환불이 불가합니다. / All ${refundInfo.totalCredits} viewing credits have been used`,
            refundAmount: 0,
            usedValue: paidAmount,
            usedDescription: `열람권 ${refundInfo.usedCredits}건`,
          };
        }

        // 비례 환불 금액 계산: 단가 × 미사용 건수
        // Pro-rata refund = unit_price × unused_credits
        const unitPrice = Math.floor(paidAmount / refundInfo.totalCredits);
        const refundAmount = unitPrice * refundInfo.refundableCredits;
        const usedValue = paidAmount - refundAmount;

        return {
          canRefund: true,
          refundAmount,
          usedValue,
          usedDescription: `열람권 ${refundInfo.usedCredits}건 (${usedValue.toLocaleString()}원)`,
        };
      }

      case 'BUMP_UP':
      case 'URGENT_BADGE':
      case 'FEATURED': {
        // 즉시 적용 상품: 구매 24시간 이내 전액 환불, 이후 취소 불가
        // Instant-effect products: full refund within 24h, no refund after
        const paidAt = order.payment?.paidAt;
        if (paidAt) {
          const hoursElapsed =
            (Date.now() - paidAt.getTime()) / (1000 * 60 * 60);
          if (hoursElapsed > 24) {
            return {
              canRefund: false,
              reason: `${product.name}은 즉시 적용 상품으로, 구매 24시간 이후 환불이 불가합니다. / Instant-effect products are non-refundable after 24h`,
              refundAmount: 0,
              usedValue: paidAmount,
              usedDescription: `${product.name} 적용됨`,
            };
          }
        }
        return {
          canRefund: true,
          refundAmount: paidAmount,
          usedValue: 0,
          usedDescription: '',
        };
      }

      default:
        // 알 수 없는 상품 코드 → 전액 환불 기본값 / Unknown product code → full refund default
        return {
          canRefund: true,
          refundAmount: paidAmount,
          usedValue: 0,
          usedDescription: '',
        };
    }
  }

  /**
   * 상품 효과 롤백 (부분 환불 포함)
   * Rollback product effect with partial refund support
   *
   * 열람권: 미사용분만 제거 / Viewing credits: remove only unused
   * 공고 관련 상품: 상태 원복 / Job products: restore original state
   */
  private async rollbackProductEffectWithRefund(
    order: Prisma.OrderGetPayload<{
      include: { product: true; payment: true; coupon: true };
    }>,
    refundInfo: {
      canRefund: boolean;
      reason?: string;
      refundAmount: number;
      usedValue: number;
      usedDescription: string;
    },
  ) {
    const product = order.product;

    switch (product.code) {
      case 'VIEW_1':
      case 'VIEW_5':
      case 'VIEW_10':
      case 'VIEW_30':
      case 'VIEW_50':
      case 'VIEW_100': {
        // 미사용 크레딧만 제거 (사용한 것은 유지)
        // Remove only unused credits (keep used ones)
        const refundData =
          await this.viewingCreditService.calculateCreditRefund(
            order.userId,
            product.code,
            order.id,
          );
        if (refundData.creditId) {
          await this.viewingCreditService.executeRefund(
            refundData.creditId,
            refundData.refundableCredits,
          );
        }
        break;
      }

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

      default:
        // 상위노출 상품 롤백 / Premium listing rollback
        if (isPremiumProduct(product.code) && order.targetJobId) {
          await this.authPrisma.jobPosting.update({
            where: { id: BigInt(Number(order.targetJobId)) },
            data: {
              tierType: 'STANDARD',
              premiumStartAt: null,
              premiumEndAt: null,
              upgradedAt: null,
            },
          });
        } else {
          this.logger.warn(
            `[Payment] rollbackProductEffectWithRefund: 알 수 없는 상품 코드=${product.code} / unknown product code`,
          );
        }
    }

    // 롤백 완료 로그 / Rollback completion log
    this.logger.log(
      `[Payment] 상품 효과 롤백 완료: orderId=${order.id}, productCode=${product.code}, refundAmount=${refundInfo.refundAmount}`,
    );
  }

  /**
   * 상품 효과 롤백 (웹훅 기반 전액 취소용 — 레거시)
   * Rollback product effect for full cancellation from webhook (legacy use)
   *
   * 주의: 웹훅 CANCELLED 이벤트 처리에만 사용.
   * WARNING: Use only for webhook CANCELLED event processing.
   * 신규 결제 취소는 rollbackProductEffectWithRefund 사용.
   * For new cancellations, use rollbackProductEffectWithRefund instead.
   */
  private async rollbackProductEffect(
    order: Prisma.OrderGetPayload<{
      include: { product: true };
    }>,
  ) {
    const product = order.product;

    // 상위노출 상품 롤백 (웹훅) / Premium product rollback (webhook)
    if (isPremiumProduct(product.code)) {
      if (order.targetJobId) {
        await this.authPrisma.jobPosting.update({
          where: { id: BigInt(Number(order.targetJobId)) },
          data: {
            tierType: 'STANDARD',
            premiumStartAt: null,
            premiumEndAt: null,
            upgradedAt: null,
          },
        });
      }
      return;
    }

    switch (product.code) {
      case 'VIEW_1':
      case 'VIEW_5':
      case 'VIEW_10':
      case 'VIEW_30':
      case 'VIEW_50':
      case 'VIEW_100':
        // 웹훅 취소: 구버전 전액 롤백 사용 (웹훅은 이미 포트원에서 취소 처리됨)
        // Webhook cancel: use legacy full rollback (PortOne already cancelled)
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
  async getOrder(orderId: number, userId: string) {
    const order = await this.paymentPrisma.order.findUnique({
      where: { id: orderId },
      include: { product: true, payment: true, coupon: true },
    });
    if (!order) {
      throw new NotFoundException(`주문을 찾을 수 없습니다 / Order not found`);
    }
    // 소유권 검증 (IDOR 방지) / Ownership check (prevent IDOR)
    if (order.userId !== userId) {
      throw new ForbiddenException(
        '본인의 주문만 조회할 수 있습니다 / Can only view your own orders',
      );
    }
    return this.serializeCustomerOrder(order);
  }

  /** 내 주문 목록 / My orders */
  async getMyOrders(userId: string, page = 1, limit = 20) {
    page = Number.isSafeInteger(page) && page > 0 ? page : 1;
    limit = Number.isSafeInteger(limit)
      ? Math.min(Math.max(limit, 1), 100)
      : 20;
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
      orders: orders.map((order) => this.serializeCustomerOrder(order)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  private serializeCustomerOrder(order: any) {
    return {
      id: order.id,
      orderNo: order.orderNo,
      product: order.product,
      targetJobId: order.targetJobId,
      quantity: order.quantity,
      totalAmount: order.totalAmount,
      originalAmount: order.originalAmount,
      currency: order.currency,
      status: order.status,
      fulfillmentStatus: order.fulfillmentStatus,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      payment: order.payment
        ? {
            method: order.payment.method,
            status: order.payment.status,
            paidAmount: order.payment.paidAmount,
            paidAt: order.payment.paidAt,
            receiptUrl: order.payment.receiptUrl,
            cancelledAmount: order.payment.cancelledAmount,
            cancelledAt: order.payment.cancelledAt,
          }
        : null,
    };
  }

  // ================================================
  // 웹훅 처리 / Webhook processing
  // ================================================

  async beginWebhookEvent(input: {
    webhookId: string;
    eventType: string;
    paymentId?: string;
    rawBody: string;
  }): Promise<'PROCESS' | 'DUPLICATE' | 'BUSY'> {
    const payloadHash = createHash('sha256')
      .update(input.rawBody)
      .digest('hex');
    const lockedUntil = new Date(Date.now() + 30_000);
    try {
      await this.paymentPrisma.paymentWebhookEvent.create({
        data: {
          id: input.webhookId,
          eventType: input.eventType,
          paymentId: input.paymentId ?? null,
          payloadHash,
          status: 'PROCESSING',
          lockedUntil,
        },
      });
      return 'PROCESS';
    } catch (error) {
      if ((error as { code?: string })?.code !== 'P2002') {
        throw error;
      }
    }

    const existing = await this.paymentPrisma.paymentWebhookEvent.findUnique({
      where: { id: input.webhookId },
    });
    if (!existing || existing.payloadHash !== payloadHash) {
      throw new BadRequestException('웹훅 ID와 본문이 일치하지 않습니다');
    }
    if (existing.status === 'PROCESSED') return 'DUPLICATE';
    if (existing.status === 'PROCESSING' && existing.lockedUntil > new Date()) {
      return 'BUSY';
    }

    const reclaimed = await this.paymentPrisma.paymentWebhookEvent.updateMany({
      where: {
        id: input.webhookId,
        payloadHash,
        status: { in: ['PROCESSING', 'FAILED'] },
        lockedUntil: { lte: new Date() },
      },
      data: {
        status: 'PROCESSING',
        lockedUntil,
        attemptCount: { increment: 1 },
        lastError: null,
      },
    });
    return reclaimed.count === 1 ? 'PROCESS' : 'BUSY';
  }

  async completeWebhookEvent(webhookId: string): Promise<void> {
    await this.paymentPrisma.paymentWebhookEvent.update({
      where: { id: webhookId },
      data: {
        status: 'PROCESSED',
        processedAt: new Date(),
        lockedUntil: new Date(),
        lastError: null,
      },
    });
  }

  async failWebhookEvent(webhookId: string): Promise<void> {
    await this.paymentPrisma.paymentWebhookEvent.updateMany({
      where: { id: webhookId, status: 'PROCESSING' },
      data: {
        status: 'FAILED',
        lockedUntil: new Date(),
        lastError: 'Processing failed; safe to retry',
      },
    });
  }

  async synchronizePaymentFromWebhook(
    remote: PortonePaymentResponse,
    event: { webhookId: string; eventType: string },
  ): Promise<'SYNCED' | 'IGNORED'> {
    const payment = await this.paymentPrisma.payment.findUnique({
      where: { portonePaymentId: remote.id },
      include: {
        order: { include: { product: true, coupon: true, payment: true } },
        cancellations: {
          where: { status: { in: ['PROCESSING', 'REQUESTED'] } },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
    if (!payment) {
      this.logger.warn(
        `Ignoring PortOne webhook for an unknown payment (${this.maskPaymentId(remote.id)})`,
      );
      return 'IGNORED';
    }

    this.portoneService.validatePayment(remote, {
      paymentId: payment.portonePaymentId,
      amount: payment.order.totalAmount,
      currency: payment.order.currency,
      requirePaid: false,
    });
    const webhookSummary = JSON.stringify({
      webhookId: event.webhookId,
      eventType: event.eventType,
    });

    switch (remote.status) {
      case 'PAID':
        await this.persistPaidPayment(payment.orderId, remote);
        await this.paymentPrisma.payment.update({
          where: { id: payment.id },
          data: { webhookData: webhookSummary },
        });
        await this.fulfillPaidOrder(payment.orderId);
        return 'SYNCED';

      case 'CANCELLED':
      case 'PARTIAL_CANCELLED':
        await this.synchronizeCancelledPayment(payment, remote, webhookSummary);
        return 'SYNCED';

      case 'FAILED':
        await this.paymentPrisma.$transaction([
          this.paymentPrisma.payment.updateMany({
            where: { id: payment.id, status: 'PENDING' },
            data: {
              status: 'FAILED',
              failReason: 'PortOne reported payment failure',
              webhookData: webhookSummary,
              lastSyncedAt: new Date(),
            },
          }),
          this.paymentPrisma.order.updateMany({
            where: { id: payment.orderId, status: 'PENDING' },
            data: { status: 'FAILED' },
          }),
        ]);
        return 'SYNCED';

      default:
        await this.paymentPrisma.payment.update({
          where: { id: payment.id },
          data: { webhookData: webhookSummary, lastSyncedAt: new Date() },
        });
        return 'SYNCED';
    }
  }

  private async synchronizeCancelledPayment(
    payment: any,
    remote: PortonePaymentResponse,
    webhookSummary: string,
  ): Promise<void> {
    const paidAmount = payment.paidAmount ?? payment.order.totalAmount;
    const cancelledAmount =
      remote.amount.cancelled ??
      (remote.status === 'CANCELLED'
        ? paidAmount
        : (payment.cancelledAmount ?? 0));
    if (
      !Number.isSafeInteger(cancelledAmount) ||
      cancelledAmount <= 0 ||
      cancelledAmount > paidAmount
    ) {
      throw new BadRequestException('결제사 취소 금액이 올바르지 않습니다');
    }

    const paymentStatus =
      cancelledAmount < paidAmount ? 'PARTIAL_CANCELLED' : 'CANCELLED';
    const cancelledAt = remote.cancelledAt
      ? new Date(remote.cancelledAt)
      : new Date();
    const activeCancellation = payment.cancellations?.[0];
    const operations: Prisma.PrismaPromise<any>[] = [
      this.paymentPrisma.payment.update({
        where: { id: payment.id },
        data: {
          status: paymentStatus,
          cancelledAmount,
          cancelledAt,
          webhookData: webhookSummary,
          lastSyncedAt: new Date(),
        },
      }),
      this.paymentPrisma.order.update({
        where: { id: payment.orderId },
        data: {
          status: payment.paidAmount ? 'REFUNDED' : 'CANCELLED',
        },
      }),
    ];
    if (
      activeCancellation &&
      ['PROCESSING', 'REQUESTED'].includes(activeCancellation.status)
    ) {
      operations.push(
        this.paymentPrisma.paymentCancellation.update({
          where: { id: activeCancellation.id },
          data: {
            status: 'SUCCEEDED',
            amount: cancelledAmount,
            portoneCancellationId:
              remote.cancellations?.at(-1)?.id ??
              activeCancellation.portoneCancellationId,
            completedAt: cancelledAt,
            lastError: null,
          },
        }),
      );
    }
    await this.paymentPrisma.$transaction(operations);

    if (payment.paidAmount) {
      const refundInfo = await this.calculateRefundAmount(payment.order);
      refundInfo.refundAmount = cancelledAmount;
      await this.rollbackFulfilledOrder(payment.order, refundInfo);
    }
  }

  // ================================================
  // 유틸리티 / Utilities
  // ================================================

  /** 주문번호 생성: ORD-YYYYMMDD-XXXXX / Generate order number */
  private generateOrderNo(): string {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const random = randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase();
    return `ORD-${dateStr}-${random}`;
  }

  /** 결제 수단 매핑 / Map payment method */
  private mapPaymentMethod(
    type?: string,
  ):
    | 'CARD'
    | 'VIRTUAL_ACCOUNT'
    | 'EASY_PAY'
    | 'TRANSFER'
    | 'MOBILE'
    | 'GIFT_CERTIFICATE'
    | 'CONVENIENCE_STORE'
    | 'PAYPAL'
    | 'ALIPAY'
    | 'CRYPTO'
    | 'UNKNOWN' {
    switch (type?.toUpperCase()) {
      case 'CARD':
      case 'Card':
        return 'CARD';
      case 'VIRTUAL_ACCOUNT':
      case 'VirtualAccount':
        return 'VIRTUAL_ACCOUNT';
      case 'EASY_PAY':
      case 'EasyPay':
        return 'EASY_PAY';
      case 'TRANSFER':
      case 'Transfer':
        return 'TRANSFER';
      case 'MOBILE':
        return 'MOBILE';
      case 'GIFT_CERTIFICATE':
        return 'GIFT_CERTIFICATE';
      case 'CONVENIENCE_STORE':
        return 'CONVENIENCE_STORE';
      case 'PAYPAL':
        return 'PAYPAL';
      case 'ALIPAY':
        return 'ALIPAY';
      case 'CRYPTO':
        return 'CRYPTO';
      default:
        return 'UNKNOWN';
    }
  }

  private maskPaymentId(paymentId: string): string {
    if (paymentId.length <= 8) return '***';
    return `${paymentId.slice(0, 4)}...${paymentId.slice(-4)}`;
  }
}
