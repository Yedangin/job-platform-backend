import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PaymentPrismaService } from 'libs/common/src';
import { ViewingCreditService } from './viewing-credit.service';

/**
 * 쿠폰 검증 + 적용 서비스 / Coupon validation & application service
 */
@Injectable()
export class CouponService {
  private readonly logger = new Logger(CouponService.name);

  constructor(
    private readonly paymentPrisma: PaymentPrismaService,
    private readonly viewingCreditService: ViewingCreditService,
  ) {}

  /**
   * 쿠폰 검증 / Validate coupon
   * - 존재 여부, 활성 상태, 유효 기간, 사용 횟수 한도 확인
   * - Checks existence, active status, validity period, usage limits
   */
  async validate(couponCode: string, userId: string) {
    const coupon = await this.paymentPrisma.coupon.findUnique({
      where: { code: couponCode },
    });
    if (!coupon) {
      throw new NotFoundException(
        `쿠폰을 찾을 수 없습니다 / Coupon not found: ${couponCode}`,
      );
    }

    if (!coupon.isActive) {
      throw new BadRequestException(
        `비활성 쿠폰입니다 / Coupon is inactive: ${couponCode}`,
      );
    }

    const now = new Date();
    if (now < coupon.startsAt) {
      throw new BadRequestException(
        `쿠폰 사용 기간 전입니다 / Coupon not yet valid: starts at ${coupon.startsAt.toISOString()}`,
      );
    }
    if (now > coupon.expiresAt) {
      throw new BadRequestException(
        `만료된 쿠폰입니다 / Coupon expired: ${couponCode}`,
      );
    }

    // 전체 사용 횟수 한도 / Global usage limit
    if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
      throw new BadRequestException(
        `쿠폰 사용 한도 초과 / Coupon usage limit reached: ${couponCode}`,
      );
    }

    // 사용자별 사용 횟수 한도 / Per-user usage limit
    const userUsageCount = await this.paymentPrisma.couponUsage.count({
      where: { couponId: coupon.id, userId },
    });
    if (userUsageCount >= coupon.maxUsesPerUser) {
      throw new BadRequestException(
        `이미 사용한 쿠폰입니다 / Coupon already used by this user: ${couponCode}`,
      );
    }

    return coupon;
  }

  /**
   * 할인 금액 계산 / Calculate discount amount
   */
  calculateDiscount(
    coupon: { type: string; value: number; minOrderAmount: number | null },
    originalAmount: number,
  ): number {
    // 최소 주문 금액 확인 / Minimum order amount check
    if (coupon.minOrderAmount && originalAmount < coupon.minOrderAmount) {
      throw new BadRequestException(
        `최소 주문 금액 미달 / Below minimum order amount: required=${coupon.minOrderAmount}, actual=${originalAmount}`,
      );
    }

    switch (coupon.type) {
      case 'FIXED_DISCOUNT':
        return Math.min(coupon.value, originalAmount);
      case 'PERCENT_DISCOUNT':
        return Math.floor(originalAmount * (coupon.value / 100));
      case 'FREE_ITEM':
        // FREE_ITEM 쿠폰은 금액 할인이 아님 (열람권 등 아이템 직접 지급)
        // FREE_ITEM coupons don't discount price (they grant items like viewing credits)
        return 0;
      default:
        return 0;
    }
  }

  /**
   * 쿠폰 사용 기록 / Record coupon usage
   */
  async recordUsage(couponId: number, userId: string) {
    await this.paymentPrisma.$transaction([
      this.paymentPrisma.couponUsage.create({
        data: { couponId, userId },
      }),
      this.paymentPrisma.coupon.update({
        where: { id: couponId },
        data: { usedCount: { increment: 1 } },
      }),
    ]);
  }

  /**
   * 회원가입 시 환영 쿠폰 발급 / Grant welcome coupons on signup
   * WELCOME_VIEW_5 → ViewingCredit 5건 (source: "COUPON:WELCOME")
   * 유효기간: 가입일 + 90일
   */
  async grantWelcomeCoupons(userId: string) {
    try {
      const coupon = await this.paymentPrisma.coupon.findUnique({
        where: { code: 'WELCOME_VIEW_5' },
      });

      if (!coupon || !coupon.isActive) {
        this.logger.warn(
          `[Coupon] WELCOME_VIEW_5 쿠폰 없음 또는 비활성 / Welcome coupon not found or inactive`,
        );
        return null;
      }

      // 이미 발급 여부 확인 / Check if already granted
      const existing = await this.paymentPrisma.couponUsage.findFirst({
        where: { couponId: coupon.id, userId },
      });
      if (existing) {
        this.logger.log(`[Coupon] 이미 환영 쿠폰 발급됨: userId=${userId}`);
        return null;
      }

      // 열람권 부여 / Grant viewing credits
      await this.viewingCreditService.grantCredits(
        userId,
        coupon.value, // 5건
        'COUPON:WELCOME',
        90, // 90일 유효
      );

      // 쿠폰 사용 기록 / Record coupon usage
      await this.recordUsage(coupon.id, userId);

      this.logger.log(`[Coupon] 환영 쿠폰 발급: userId=${userId}, credits=${coupon.value}`);
      return { credits: coupon.value, source: 'COUPON:WELCOME' };
    } catch (error) {
      this.logger.error(`[Coupon] 환영 쿠폰 발급 실패: ${error.message}`);
      return null; // 쿠폰 발급 실패가 회원가입을 막으면 안 됨 / Coupon failure shouldn't block signup
    }
  }

  /**
   * 첫 공고 등록 시 쿠폰 발급 / Grant coupons on first job posting
   * FIRST_POST_VIEW_5 → ViewingCredit 5건 (source: "COUPON:FIRST_POST")
   * 유효기간: 등록일 + 60일
   */
  async grantFirstPostCoupons(userId: string, jobId: number) {
    try {
      const coupon = await this.paymentPrisma.coupon.findUnique({
        where: { code: 'FIRST_POST_VIEW_5' },
      });

      if (!coupon || !coupon.isActive) {
        this.logger.warn(
          `[Coupon] FIRST_POST_VIEW_5 쿠폰 없음 또는 비활성 / First post coupon not found or inactive`,
        );
        return null;
      }

      // 이미 발급 여부 확인 / Check if already granted
      const existing = await this.paymentPrisma.couponUsage.findFirst({
        where: { couponId: coupon.id, userId },
      });
      if (existing) {
        this.logger.log(`[Coupon] 이미 첫 공고 쿠폰 발급됨: userId=${userId}`);
        return null;
      }

      // 열람권 부여 / Grant viewing credits
      await this.viewingCreditService.grantCredits(
        userId,
        coupon.value, // 5건
        'COUPON:FIRST_POST',
        60, // 60일 유효
      );

      // 쿠폰 사용 기록 / Record coupon usage
      await this.recordUsage(coupon.id, userId);

      this.logger.log(
        `[Coupon] 첫 공고 쿠폰 발급: userId=${userId}, jobId=${jobId}, credits=${coupon.value}`,
      );
      return { credits: coupon.value, source: 'COUPON:FIRST_POST' };
    } catch (error) {
      this.logger.error(`[Coupon] 첫 공고 쿠폰 발급 실패: ${error.message}`);
      return null;
    }
  }

  /**
   * 쿠폰 검증 (REST 엔드포인트용) / Validate coupon (for REST endpoint)
   * 할인 금액 포함 반환
   */
  async validateForProduct(couponCode: string, userId: string, productCategory?: string) {
    const coupon = await this.validate(couponCode, userId);

    if (productCategory && coupon.targetProduct && coupon.targetProduct !== productCategory) {
      throw new BadRequestException(
        `이 쿠폰은 해당 상품 카테고리에 사용할 수 없습니다 / Coupon not applicable to this category`,
      );
    }

    return {
      couponId: coupon.id,
      code: coupon.code,
      name: coupon.name,
      type: coupon.type,
      value: coupon.value,
      targetProduct: coupon.targetProduct,
      expiresAt: coupon.expiresAt,
    };
  }
}
