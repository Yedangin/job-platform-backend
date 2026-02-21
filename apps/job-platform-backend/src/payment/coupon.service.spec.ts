import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Prisma 서비스 목킹 / Mock Prisma services
// jest.mock이 호이스팅되므로 factory 내에서 직접 정의
jest.mock('libs/common/src', () => {
  class _PaymentPrismaService {}
  return { PaymentPrismaService: _PaymentPrismaService };
});

// mock 후 import
import { CouponService } from './coupon.service';
import { ViewingCreditService } from './viewing-credit.service';
import { PaymentPrismaService } from 'libs/common/src';

describe('CouponService', () => {
  let service: CouponService;
  let mockPaymentPrisma: any;
  let mockViewingCreditService: any;

  const mockCoupon = {
    id: 1,
    code: 'WELCOME_VIEW_5',
    name: '회원가입 축하 열람 5건',
    type: 'FREE_ITEM',
    value: 5,
    targetProduct: 'TALENT_VIEW',
    minOrderAmount: null,
    maxUses: null,
    usedCount: 0,
    maxUsesPerUser: 1,
    startsAt: new Date('2025-01-01'),
    expiresAt: new Date('2027-01-01'),
    isActive: true,
  };

  const mockExpiredCoupon = {
    ...mockCoupon,
    code: 'EXPIRED',
    expiresAt: new Date('2024-01-01'),
  };

  beforeEach(async () => {
    mockPaymentPrisma = {
      coupon: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      couponUsage: {
        count: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
      },
      $transaction: jest.fn((arr) => Promise.resolve(arr.map(() => ({})))),
    };

    mockViewingCreditService = {
      grantCredits: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CouponService,
        { provide: PaymentPrismaService, useValue: mockPaymentPrisma },
        { provide: ViewingCreditService, useValue: mockViewingCreditService },
      ],
    }).compile();

    service = module.get<CouponService>(CouponService);
  });

  // ================================================
  // validate
  // ================================================
  describe('validate', () => {
    it('정상 쿠폰 검증 / should validate valid coupon', async () => {
      mockPaymentPrisma.coupon.findUnique.mockResolvedValue(mockCoupon);
      mockPaymentPrisma.couponUsage.count.mockResolvedValue(0);

      const result = await service.validate('WELCOME_VIEW_5', 'user-1');
      expect(result.code).toBe('WELCOME_VIEW_5');
    });

    it('만료된 쿠폰 거부 / should reject expired coupon', async () => {
      mockPaymentPrisma.coupon.findUnique.mockResolvedValue(mockExpiredCoupon);

      await expect(service.validate('EXPIRED', 'user-1')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('사용 한도 초과 거부 / should reject over usage limit', async () => {
      mockPaymentPrisma.coupon.findUnique.mockResolvedValue(mockCoupon);
      mockPaymentPrisma.couponUsage.count.mockResolvedValue(1);

      await expect(
        service.validate('WELCOME_VIEW_5', 'user-1'),
      ).rejects.toThrow(BadRequestException);
    });

    it('존재하지 않는 쿠폰 / should reject non-existent coupon', async () => {
      mockPaymentPrisma.coupon.findUnique.mockResolvedValue(null);

      await expect(service.validate('INVALID', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ================================================
  // calculateDiscount
  // ================================================
  describe('calculateDiscount', () => {
    it('정액 할인 / should apply fixed discount', () => {
      const discount = service.calculateDiscount(
        { type: 'FIXED_DISCOUNT', value: 10000, minOrderAmount: null },
        50000,
      );
      expect(discount).toBe(10000);
    });

    it('정률 할인 / should apply percent discount', () => {
      const discount = service.calculateDiscount(
        { type: 'PERCENT_DISCOUNT', value: 20, minOrderAmount: null },
        50000,
      );
      expect(discount).toBe(10000);
    });

    it('FREE_ITEM은 할인 0 / FREE_ITEM should return 0 discount', () => {
      const discount = service.calculateDiscount(
        { type: 'FREE_ITEM', value: 5, minOrderAmount: null },
        50000,
      );
      expect(discount).toBe(0);
    });

    it('최소 주문 금액 미달 거부 / should reject below min order', () => {
      expect(() =>
        service.calculateDiscount(
          { type: 'FIXED_DISCOUNT', value: 5000, minOrderAmount: 10000 },
          3000,
        ),
      ).toThrow(BadRequestException);
    });
  });

  // ================================================
  // grantWelcomeCoupons
  // ================================================
  describe('grantWelcomeCoupons', () => {
    it('환영 쿠폰 발급 / should grant welcome coupons', async () => {
      mockPaymentPrisma.coupon.findUnique.mockResolvedValue(mockCoupon);
      mockPaymentPrisma.couponUsage.findFirst.mockResolvedValue(null);

      const result = await service.grantWelcomeCoupons('user-1');
      expect(result).toEqual({ credits: 5, source: 'COUPON:WELCOME' });
      expect(mockViewingCreditService.grantCredits).toHaveBeenCalledWith(
        'user-1',
        5,
        'COUPON:WELCOME',
        90,
      );
    });

    it('이미 발급된 경우 중복 발급 방지 / should prevent duplicate grant', async () => {
      mockPaymentPrisma.coupon.findUnique.mockResolvedValue(mockCoupon);
      mockPaymentPrisma.couponUsage.findFirst.mockResolvedValue({ id: 1 });

      const result = await service.grantWelcomeCoupons('user-1');
      expect(result).toBeNull();
      expect(mockViewingCreditService.grantCredits).not.toHaveBeenCalled();
    });
  });

  // ================================================
  // grantFirstPostCoupons
  // ================================================
  describe('grantFirstPostCoupons', () => {
    it('첫 공고 쿠폰 발급 / should grant first post coupons', async () => {
      const firstPostCoupon = { ...mockCoupon, code: 'FIRST_POST_VIEW_5' };
      mockPaymentPrisma.coupon.findUnique.mockResolvedValue(firstPostCoupon);
      mockPaymentPrisma.couponUsage.findFirst.mockResolvedValue(null);

      const result = await service.grantFirstPostCoupons('user-1', 123);
      expect(result).toEqual({ credits: 5, source: 'COUPON:FIRST_POST' });
      expect(mockViewingCreditService.grantCredits).toHaveBeenCalledWith(
        'user-1',
        5,
        'COUPON:FIRST_POST',
        60,
      );
    });
  });
});
