/**
 * 재진단 쿠폰 서비스 / Rediagnosis coupon service
 * 유료 플래너 결제 후 6개월 무료 재진단 쿠폰 관리
 * Manages free re-diagnosis coupons issued after premium purchase
 */
import { Injectable, Logger } from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';
import { randomBytes } from 'crypto';

/** 쿠폰 상태 / Coupon status */
export type CouponStatus =
  | 'ISSUED'
  | 'AVAILABLE'
  | 'USED'
  | 'EXPIRED'
  | 'CANCELLED';

@Injectable()
export class RediagnosisCouponService {
  private readonly logger = new Logger(RediagnosisCouponService.name);

  constructor(private readonly prisma: AuthPrismaService) {}

  /**
   * 쿠폰 발급 / Issue coupon
   * 결제 완료 시 호출 / Called on payment completion
   */
  async issueCoupon(
    userId: string,
    sessionId: bigint,
  ): Promise<{
    couponCode: string;
    availableAt: Date;
    expiresAt: Date;
  }> {
    const now = new Date();
    const availableAt = new Date(now);
    availableAt.setMonth(availableAt.getMonth() + 6); // +6개월

    const expiresAt = new Date(now);
    expiresAt.setMonth(expiresAt.getMonth() + 12); // +12개월

    const couponCode = this.generateCouponCode();

    await this.prisma.rediagnosisCoupon.create({
      data: {
        userId,
        originalSessionId: sessionId,
        couponCode,
        status: 'ISSUED',
        availableAt,
        expiresAt,
      },
    });

    this.logger.log(
      `재진단 쿠폰 발급: userId=${userId}, code=${couponCode} / Rediagnosis coupon issued`,
    );

    return { couponCode, availableAt, expiresAt };
  }

  /**
   * 쿠폰 상태 조회 (자동 상태 전이 포함) / Get coupon status with auto state transition
   */
  async getCouponStatus(userId: string): Promise<{
    hasCoupon: boolean;
    coupon?: {
      couponCode: string;
      status: CouponStatus;
      issuedAt: Date;
      availableAt: Date;
      expiresAt: Date;
      usedAt: Date | null;
    };
  }> {
    const coupon = await this.prisma.rediagnosisCoupon.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!coupon) return { hasCoupon: false };

    // 자동 상태 전이 / Auto state transition
    const now = new Date();
    let currentStatus = coupon.status as CouponStatus;

    if (currentStatus === 'ISSUED' && now >= coupon.availableAt) {
      currentStatus = 'AVAILABLE';
      await this.prisma.rediagnosisCoupon.update({
        where: { id: coupon.id },
        data: { status: 'AVAILABLE' },
      });
    }

    if (
      (currentStatus === 'ISSUED' || currentStatus === 'AVAILABLE') &&
      now >= coupon.expiresAt
    ) {
      currentStatus = 'EXPIRED';
      await this.prisma.rediagnosisCoupon.update({
        where: { id: coupon.id },
        data: { status: 'EXPIRED' },
      });
    }

    return {
      hasCoupon: true,
      coupon: {
        couponCode: coupon.couponCode,
        status: currentStatus,
        issuedAt: coupon.issuedAt,
        availableAt: coupon.availableAt,
        expiresAt: coupon.expiresAt,
        usedAt: coupon.usedAt,
      },
    };
  }

  /**
   * 쿠폰 사용 / Use coupon
   */
  async useCoupon(
    userId: string,
    couponCode: string,
    rediagnosisSessionId: bigint,
  ): Promise<{ success: boolean; message: string }> {
    const coupon = await this.prisma.rediagnosisCoupon.findFirst({
      where: { userId, couponCode },
    });

    if (!coupon) {
      return {
        success: false,
        message: '쿠폰을 찾을 수 없습니다 / Coupon not found',
      };
    }

    const now = new Date();

    // 상태 전이 확인 / Check state transitions
    if (coupon.status === 'USED') {
      return {
        success: false,
        message: '이미 사용된 쿠폰입니다 / Coupon already used',
      };
    }
    if (coupon.status === 'EXPIRED' || now >= coupon.expiresAt) {
      return { success: false, message: '만료된 쿠폰입니다 / Coupon expired' };
    }
    if (coupon.status === 'CANCELLED') {
      return {
        success: false,
        message: '취소된 쿠폰입니다 / Coupon cancelled',
      };
    }
    if (coupon.status === 'ISSUED' && now < coupon.availableAt) {
      return {
        success: false,
        message: `쿠폰 사용 가능일: ${coupon.availableAt.toISOString().slice(0, 10)} / Available from: ${coupon.availableAt.toISOString().slice(0, 10)}`,
      };
    }

    // 사용 처리 / Mark as used
    await this.prisma.rediagnosisCoupon.update({
      where: { id: coupon.id },
      data: {
        status: 'USED',
        usedAt: now,
        usedSessionId: rediagnosisSessionId,
      },
    });

    this.logger.log(
      `재진단 쿠폰 사용: userId=${userId}, code=${couponCode} / Coupon used`,
    );

    return { success: true, message: '쿠폰이 사용되었습니다 / Coupon applied' };
  }

  /**
   * 쿠폰 취소 (환불 시) / Cancel coupon on refund
   */
  async cancelCoupon(sessionId: bigint): Promise<void> {
    await this.prisma.rediagnosisCoupon.updateMany({
      where: {
        originalSessionId: sessionId,
        status: { in: ['ISSUED', 'AVAILABLE'] },
      },
      data: { status: 'CANCELLED' },
    });

    this.logger.log(
      `재진단 쿠폰 취소: sessionId=${sessionId} / Coupon cancelled`,
    );
  }

  // ──── 헬퍼 / Helpers ────

  /** 쿠폰 코드 생성 / Generate coupon code */
  private generateCouponCode(): string {
    const bytes = randomBytes(3);
    const hex = bytes.toString('hex').toUpperCase();
    return `RDX-${hex}`;
  }
}
