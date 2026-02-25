import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PaymentPrismaService } from 'libs/common/src';

/**
 * 인재 열람권 관리 서비스 / Talent viewing credit management service
 */
@Injectable()
export class ViewingCreditService {
  private readonly logger = new Logger(ViewingCreditService.name);

  constructor(private readonly paymentPrisma: PaymentPrismaService) {}

  /**
   * 열람권 부여 / Grant viewing credits
   * @param userId 사용자 ID
   * @param credits 열람 건수
   * @param source 출처 (상품코드 또는 쿠폰코드)
   * @param validDays 유효 기간 (일)
   */
  async grantCredits(
    userId: string,
    credits: number,
    source: string,
    validDays: number,
  ) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + validDays);

    const record = await this.paymentPrisma.viewingCredit.create({
      data: {
        userId,
        totalCredits: credits,
        usedCredits: 0,
        source,
        expiresAt,
      },
    });

    this.logger.log(
      `[ViewingCredit] 열람권 부여: userId=${userId}, credits=${credits}, source=${source}, expiresAt=${expiresAt.toISOString()}`,
    );
    return record;
  }

  /**
   * 잔여 열람권 조회 / Get remaining credits
   * 만료되지 않은 크레딧만 합산
   * Only sums non-expired credits
   */
  async getRemainingCredits(userId: string): Promise<number> {
    const credits = await this.paymentPrisma.viewingCredit.findMany({
      where: {
        userId,
        expiresAt: { gt: new Date() },
      },
    });

    return credits.reduce(
      (sum, c) => sum + (c.totalCredits - c.usedCredits),
      0,
    );
  }

  /**
   * 열람권 차감 / Use one viewing credit
   * 가장 먼저 만료되는 크레딧부터 차감 (FIFO)
   * Deducts from the earliest-expiring credit first (FIFO)
   */
  async useCredit(
    userId: string,
    resumeId: number,
  ): Promise<{ success: boolean; remainingCredits: number }> {
    // 인터랙티브 트랜잭션으로 전체 로직을 감싸서 race condition 방지
    // Wrap entire logic in interactive transaction to prevent race condition
    const result = await this.paymentPrisma.$transaction(async (tx) => {
      // 이미 열람한 이력서인지 확인 (트랜잭션 내부)
      // Check if already viewed (inside transaction)
      const existing = await tx.viewingLog.findFirst({
        where: { userId, resumeId: BigInt(resumeId) },
      });
      if (existing) {
        return { alreadyViewed: true };
      }

      // 유효한 크레딧 조회 (만료되지 않은 것, 먼저 만료되는 순)
      // Get valid credits (not expired, earliest-expiring first)
      const credits = await tx.viewingCredit.findMany({
        where: {
          userId,
          expiresAt: { gt: new Date() },
        },
        orderBy: { expiresAt: 'asc' },
      });

      const availableCredit = credits.find(
        (c) => c.usedCredits < c.totalCredits,
      );

      if (!availableCredit) {
        throw new BadRequestException(
          '열람권이 부족합니다 / Insufficient viewing credits',
        );
      }

      // 차감 + 기록 (같은 트랜잭션 내) / Deduct and log (within same transaction)
      await tx.viewingCredit.update({
        where: { id: availableCredit.id },
        data: { usedCredits: { increment: 1 } },
      });
      await tx.viewingLog.create({
        data: {
          userId,
          resumeId: BigInt(resumeId),
          creditId: availableCredit.id,
        },
      });

      return { alreadyViewed: false, creditId: availableCredit.id };
    });

    if (result.alreadyViewed) {
      this.logger.log(
        `[ViewingCredit] 이미 열람한 이력서: userId=${userId}, resumeId=${resumeId}`,
      );
    } else {
      this.logger.log(
        `[ViewingCredit] 열람권 차감: userId=${userId}, resumeId=${resumeId}, creditId=${result.creditId}`,
      );
    }

    const remaining = await this.getRemainingCredits(userId);
    return { success: true, remainingCredits: remaining };
  }

  /**
   * 열람권 상세 조회 / Get credit details for a user
   */
  async getCreditDetails(userId: string) {
    const credits = await this.paymentPrisma.viewingCredit.findMany({
      where: { userId },
      orderBy: { expiresAt: 'asc' },
    });

    const now = new Date();
    return credits.map((c) => ({
      id: c.id,
      totalCredits: c.totalCredits,
      usedCredits: c.usedCredits,
      remainingCredits: c.totalCredits - c.usedCredits,
      source: c.source,
      expiresAt: c.expiresAt,
      isExpired: c.expiresAt < now,
      createdAt: c.createdAt,
    }));
  }

  /**
   * 열람권 롤백 (결제 취소 시)
   * Rollback credits (on payment cancellation)
   */
  /**
   * 열람 기록 조회 / Get viewing history
   */
  async getViewingHistory(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [logs, total] = await Promise.all([
      this.paymentPrisma.viewingLog.findMany({
        where: { userId },
        orderBy: { viewedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.paymentPrisma.viewingLog.count({ where: { userId } }),
    ]);

    return {
      logs: logs.map((l) => ({
        id: l.id,
        resumeId: Number(l.resumeId),
        creditId: l.creditId,
        viewedAt: l.viewedAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * 잔고 상세 조회 / Get balance details
   * STEP 14 spec: { totalRemaining, credits: [...] }
   */
  async getBalance(userId: string) {
    const totalRemaining = await this.getRemainingCredits(userId);
    const credits = await this.getCreditDetails(userId);
    return { totalRemaining, credits };
  }

  /**
   * @deprecated 전액 삭제 방식으로 부분 사용 시 환불 과다 지급됨.
   * 새 코드는 calculateCreditRefund + executeRefund 조합을 사용할 것.
   *
   * @deprecated Full-delete approach causes over-refund when credits are partially used.
   * New code should use calculateCreditRefund + executeRefund combination instead.
   */
  async rollbackCredits(userId: string, source: string) {
    const credit = await this.paymentPrisma.viewingCredit.findFirst({
      where: { userId, source },
      orderBy: { createdAt: 'desc' },
    });
    if (credit) {
      await this.paymentPrisma.viewingCredit.delete({
        where: { id: credit.id },
      });
      this.logger.log(
        `[ViewingCredit] 열람권 롤백(구버전): userId=${userId}, source=${source}`,
      );
    }
  }

  /**
   * 열람권 환불 계산 (부분 취소 지원)
   * Calculate refund for viewing credits (supports partial cancellation)
   *
   * 반환값 / Return values:
   * - creditId: ViewingCredit 레코드 ID (0이면 레코드 없음)
   * - totalCredits: 구매 시 총 열람권 건수
   * - usedCredits: 이미 사용한 건수 (환불 불가)
   * - refundableCredits: 환불 가능한 건수 (미사용 건수)
   * - canFullRefund: 전액 환불 가능 여부 (한 건도 사용 안 했을 때 true)
   */
  async calculateCreditRefund(
    userId: string,
    source: string,
  ): Promise<{
    creditId: number;
    totalCredits: number;
    usedCredits: number;
    refundableCredits: number;
    canFullRefund: boolean;
  }> {
    const credit = await this.paymentPrisma.viewingCredit.findFirst({
      where: { userId, source },
      orderBy: { createdAt: 'desc' },
    });

    if (!credit) {
      // 레코드 없음: 환불할 것이 없으므로 전액 환불 가능으로 간주
      // No record: treat as fully refundable (nothing to deduct)
      return {
        creditId: 0,
        totalCredits: 0,
        usedCredits: 0,
        refundableCredits: 0,
        canFullRefund: true,
      };
    }

    const refundableCredits = credit.totalCredits - credit.usedCredits;

    return {
      creditId: credit.id,
      totalCredits: credit.totalCredits,
      usedCredits: credit.usedCredits,
      refundableCredits,
      canFullRefund: credit.usedCredits === 0,
    };
  }

  /**
   * 열람권 환불 실행 (미사용분만 제거)
   * Execute credit refund (remove only unused credits)
   *
   * - 전혀 사용 안 한 경우: 레코드 삭제 / No usage → delete record
   * - 일부 사용한 경우: totalCredits를 usedCredits로 축소 (이미 사용한 만큼만 유지)
   *   Partially used → shrink totalCredits to usedCredits (keep only what was used)
   */
  async executeRefund(
    creditId: number,
    refundableCredits: number,
  ): Promise<void> {
    const credit = await this.paymentPrisma.viewingCredit.findUnique({
      where: { id: creditId },
    });

    if (!credit) return;

    if (credit.usedCredits === 0) {
      // 전혀 사용 안 했으면 레코드 삭제 / No usage → delete record
      await this.paymentPrisma.viewingCredit.delete({
        where: { id: creditId },
      });
    } else {
      // 일부 사용 → totalCredits를 usedCredits로 줄임 (이미 사용한 만큼만 남김)
      // Partially used → shrink totalCredits to usedCredits (keep only used amount)
      await this.paymentPrisma.viewingCredit.update({
        where: { id: creditId },
        data: { totalCredits: credit.usedCredits },
      });
    }

    this.logger.log(
      `[ViewingCredit] 환불 실행: creditId=${creditId}, refunded=${refundableCredits}건, kept=${credit.usedCredits}건`,
    );
  }
}
