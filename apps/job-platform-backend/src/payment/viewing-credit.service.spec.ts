import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

// Prisma 서비스 목킹 / Mock Prisma services
jest.mock('libs/common/src', () => {
  class _PaymentPrismaService {}
  return { PaymentPrismaService: _PaymentPrismaService };
});

import { ViewingCreditService } from './viewing-credit.service';
import { PaymentPrismaService } from 'libs/common/src';

describe('ViewingCreditService', () => {
  let service: ViewingCreditService;
  let mockPaymentPrisma: any;

  const futureDate = new Date('2027-01-01');

  beforeEach(async () => {
    mockPaymentPrisma = {
      viewingCredit: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      viewingLog: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        count: jest.fn(),
      },
      $transaction: jest.fn((arr) => Promise.resolve(arr.map(() => ({})))),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ViewingCreditService,
        { provide: PaymentPrismaService, useValue: mockPaymentPrisma },
      ],
    }).compile();

    service = module.get<ViewingCreditService>(ViewingCreditService);
  });

  // ================================================
  // grantCredits
  // ================================================
  describe('grantCredits', () => {
    it('열람권 부여 / should grant credits', async () => {
      mockPaymentPrisma.viewingCredit.create.mockResolvedValue({
        id: 1,
        totalCredits: 10,
        usedCredits: 0,
        source: 'VIEW_10',
      });

      const result = await service.grantCredits('user-1', 10, 'VIEW_10', 60);
      expect(result.totalCredits).toBe(10);
      expect(mockPaymentPrisma.viewingCredit.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user-1',
          totalCredits: 10,
          usedCredits: 0,
          source: 'VIEW_10',
        }),
      });
    });
  });

  // ================================================
  // getRemainingCredits
  // ================================================
  describe('getRemainingCredits', () => {
    it('잔여 열람권 합산 / should sum remaining credits', async () => {
      mockPaymentPrisma.viewingCredit.findMany.mockResolvedValue([
        { totalCredits: 10, usedCredits: 3, expiresAt: futureDate },
        { totalCredits: 5, usedCredits: 0, expiresAt: futureDate },
      ]);

      const remaining = await service.getRemainingCredits('user-1');
      expect(remaining).toBe(12); // (10-3) + (5-0) = 12
    });

    it('만료된 것 제외 / should exclude expired credits', async () => {
      mockPaymentPrisma.viewingCredit.findMany.mockResolvedValue([]);
      const remaining = await service.getRemainingCredits('user-1');
      expect(remaining).toBe(0);
    });
  });

  // ================================================
  // useCredit
  // ================================================
  describe('useCredit', () => {
    it('열람권 차감 (FIFO) / should deduct credit (FIFO)', async () => {
      mockPaymentPrisma.viewingLog.findFirst.mockResolvedValue(null);
      mockPaymentPrisma.viewingCredit.findMany
        .mockResolvedValueOnce([
          {
            id: 1,
            totalCredits: 5,
            usedCredits: 2,
            expiresAt: new Date('2026-06-01'),
          },
          {
            id: 2,
            totalCredits: 10,
            usedCredits: 0,
            expiresAt: new Date('2026-12-01'),
          },
        ])
        .mockResolvedValueOnce([
          {
            id: 1,
            totalCredits: 5,
            usedCredits: 3,
            expiresAt: new Date('2026-06-01'),
          },
          {
            id: 2,
            totalCredits: 10,
            usedCredits: 0,
            expiresAt: new Date('2026-12-01'),
          },
        ]);

      const result = await service.useCredit('user-1', 100);
      expect(result.success).toBe(true);
      expect(result.remainingCredits).toBe(12);
    });

    it('중복 열람 시 차감 안 함 / should not deduct on duplicate view', async () => {
      mockPaymentPrisma.viewingLog.findFirst.mockResolvedValue({ id: 1 });
      mockPaymentPrisma.viewingCredit.findMany.mockResolvedValue([
        { totalCredits: 5, usedCredits: 2, expiresAt: futureDate },
      ]);

      const result = await service.useCredit('user-1', 100);
      expect(result.success).toBe(true);
      expect(mockPaymentPrisma.$transaction).not.toHaveBeenCalled();
    });

    it('열람권 부족 시 에러 / should throw when insufficient credits', async () => {
      mockPaymentPrisma.viewingLog.findFirst.mockResolvedValue(null);
      mockPaymentPrisma.viewingCredit.findMany.mockResolvedValue([
        { id: 1, totalCredits: 5, usedCredits: 5, expiresAt: futureDate },
      ]);

      await expect(service.useCredit('user-1', 200)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // ================================================
  // getViewingHistory
  // ================================================
  describe('getViewingHistory', () => {
    it('열람 기록 조회 / should return viewing history', async () => {
      mockPaymentPrisma.viewingLog.findMany.mockResolvedValue([
        { id: 1, resumeId: BigInt(100), creditId: 1, viewedAt: new Date() },
      ]);
      mockPaymentPrisma.viewingLog.count.mockResolvedValue(1);

      const result = await service.getViewingHistory('user-1');
      expect(result.logs).toHaveLength(1);
      expect(result.logs[0].resumeId).toBe(100);
      expect(result.pagination.total).toBe(1);
    });
  });
});
