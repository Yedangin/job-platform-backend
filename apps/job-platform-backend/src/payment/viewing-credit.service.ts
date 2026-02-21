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
    // 이미 열람한 이력서인지 확인 / Check if already viewed
    const existing = await this.paymentPrisma.viewingLog.findFirst({
      where: { userId, resumeId: BigInt(resumeId) },
    });
    if (existing) {
      this.logger.log(
        `[ViewingCredit] 이미 열람한 이력서: userId=${userId}, resumeId=${resumeId}`,
      );
      const remaining = await this.getRemainingCredits(userId);
      return { success: true, remainingCredits: remaining }; // 중복 차감 방지 / Prevent double deduction
    }

    // 유효한 크레딧 조회 (만료되지 않은 것, 먼저 만료되는 순)
    // Get valid credits (not expired, earliest-expiring first)
    const credits = await this.paymentPrisma.viewingCredit.findMany({
      where: {
        userId,
        expiresAt: { gt: new Date() },
      },
      orderBy: { expiresAt: 'asc' },
    });

    const availableCredit = credits.find((c) => c.usedCredits < c.totalCredits);

    if (!availableCredit) {
      throw new BadRequestException(
        '열람권이 부족합니다 / Insufficient viewing credits',
      );
    }

    // 트랜잭션으로 차감 + 기록 / Deduct and log in transaction
    await this.paymentPrisma.$transaction([
      this.paymentPrisma.viewingCredit.update({
        where: { id: availableCredit.id },
        data: { usedCredits: { increment: 1 } },
      }),
      this.paymentPrisma.viewingLog.create({
        data: {
          userId,
          resumeId: BigInt(resumeId),
          creditId: availableCredit.id,
        },
      }),
    ]);

    this.logger.log(
      `[ViewingCredit] 열람권 차감: userId=${userId}, resumeId=${resumeId}, creditId=${availableCredit.id}`,
    );

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
        `[ViewingCredit] 열람권 롤백: userId=${userId}, source=${source}`,
      );
    }
  }
}
