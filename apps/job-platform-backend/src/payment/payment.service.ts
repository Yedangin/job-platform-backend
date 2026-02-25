import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PaymentPrismaService } from 'libs/common/src';
import { AuthPrismaService } from 'libs/common/src';
import { Prisma } from 'generated/prisma-payment';
import { PortoneService } from './portone.service';
import { ProductService } from './product.service';
import { CouponService } from './coupon.service';
import { ViewingCreditService } from './viewing-credit.service';

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
  async confirmPayment(orderId: number, portonePaymentId: string, userId?: string) {
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
    if (userId && order.userId !== userId) {
      throw new UnauthorizedException(
        '본인의 주문만 확인할 수 있습니다 / Can only confirm your own orders',
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
    // 주문 조회 (쿠폰 포함) / Get order with coupon
    const order = await this.paymentPrisma.order.findUnique({
      where: { id: orderId },
      include: { product: true, payment: true, coupon: true },
    });

    if (!order) {
      throw new NotFoundException('주문을 찾을 수 없습니다 / Order not found');
    }

    if (order.userId !== userId) {
      throw new BadRequestException(
        '본인 주문만 취소 가능합니다 / Can only cancel your own orders',
      );
    }

    if (order.status !== 'PAID') {
      throw new BadRequestException(
        '결제 완료된 주문만 취소 가능합니다 / Only paid orders can be cancelled',
      );
    }

    if (!order.payment) {
      throw new BadRequestException(
        '결제 정보가 없습니다 / No payment information',
      );
    }

    // 1. 취소 기간 검증 (7일 이내) / Validate cancellation period (within 7 days)
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
    const isPartialRefund = refundAmount < paidAmount;

    this.logger.log(
      `[Payment] 취소 처리 시작: orderId=${orderId}, refundAmount=${refundAmount}, isPartial=${isPartialRefund}, usedValue=${refundInfo.usedValue}`,
    );

    // 3. 포트원 취소 호출 (부분 취소 또는 전액 취소)
    //    Call PortOne cancel (partial or full)
    await this.portoneService.cancelPayment(
      order.payment.portonePaymentId,
      reason,
      isPartialRefund ? refundAmount : undefined, // undefined = 전액 취소 / full cancel
    );

    // 4. DB 업데이트 / Update DB
    //    부분 취소 시: payment=PARTIAL_CANCELLED, order=PAID(유지) / Partial: keep order PAID
    //    전액 취소 시: payment=CANCELLED, order=CANCELLED / Full: cancel both
    const paymentStatus = isPartialRefund ? 'PARTIAL_CANCELLED' : 'CANCELLED';
    const orderStatus = isPartialRefund ? 'PAID' : 'CANCELLED';

    await this.paymentPrisma.$transaction([
      this.paymentPrisma.payment.update({
        where: { id: order.payment.id },
        data: {
          status: paymentStatus,
          cancelledAmount: refundAmount,
          cancelledAt: new Date(),
          cancelReason: reason,
        },
      }),
      this.paymentPrisma.order.update({
        where: { id: order.id },
        data: { status: orderStatus },
      }),
    ]);

    // 5. 상품 효과 롤백 (부분 환불 정보 전달)
    //    Rollback product effect with partial refund support
    await this.rollbackProductEffectWithRefund(order, refundInfo);

    this.logger.log(
      `[Payment] 결제 취소 완료: orderId=${orderId}, refundAmount=${refundAmount}, isPartial=${isPartialRefund}`,
    );

    return {
      orderId,
      status: orderStatus,
      refundAmount,
      usedValue: refundInfo.usedValue,
      isPartialRefund,
      reason,
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
  async getOrder(orderId: number, userId?: string) {
    const order = await this.paymentPrisma.order.findUnique({
      where: { id: orderId },
      include: { product: true, payment: true, coupon: true },
    });
    if (!order) {
      throw new NotFoundException(`주문을 찾을 수 없습니다 / Order not found`);
    }
    // 소유권 검증 (IDOR 방지) / Ownership check (prevent IDOR)
    if (userId && order.userId !== userId) {
      throw new UnauthorizedException(
        '본인의 주문만 조회할 수 있습니다 / Can only view your own orders',
      );
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
