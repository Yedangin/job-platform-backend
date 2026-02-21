import { Test, TestingModule } from '@nestjs/testing';
import {
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

// Prisma 서비스 목킹 / Mock Prisma services (avoid generated module resolution)
class MockPaymentPrismaService {}
class MockAuthPrismaService {}

jest.mock('libs/common/src', () => ({
  PaymentPrismaService: MockPaymentPrismaService,
  AuthPrismaService: MockAuthPrismaService,
}));

import { PaymentService } from './payment.service';
import { PortoneService } from './portone.service';
import { ProductService } from './product.service';
import { CouponService } from './coupon.service';
import { ViewingCreditService } from './viewing-credit.service';

// 모의 데이터 / Mock data
const mockProduct = {
  id: 1,
  code: 'JOB_PREMIUM',
  name: '프리미엄 공고',
  nameEn: 'Premium Job Posting',
  category: 'JOB_POSTING',
  price: 50000,
  isActive: true,
  metadata: JSON.stringify({
    standardDays: { partTime: 14, fullTime: 30 },
    premiumDays: { partTime: 30, fullTime: 60 },
  }),
};

const mockViewProduct = {
  id: 3,
  code: 'VIEW_10',
  name: '인재 열람 라이트',
  nameEn: 'Light Talent View',
  category: 'TALENT_VIEW',
  price: 25000,
  isActive: true,
  metadata: JSON.stringify({ credits: 10, validDays: 60 }),
};

const mockInactiveProduct = {
  id: 9,
  code: 'BUMP_UP',
  name: '끌어올리기',
  nameEn: 'Bump Up',
  category: 'ADDON',
  price: 10000,
  isActive: false,
  metadata: null,
};

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

describe('PaymentService', () => {
  let service: PaymentService;
  let mockPaymentPrisma: any;
  let mockAuthPrisma: any;
  let mockPortoneService: any;
  let mockProductService: any;
  let mockCouponService: any;
  let mockViewingCreditService: any;

  beforeEach(async () => {
    mockPaymentPrisma = {
      order: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        count: jest.fn(),
      },
      payment: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      $transaction: jest.fn((arr) => Promise.resolve(arr.map(() => ({})))),
    };

    mockAuthPrisma = {
      jobPosting: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };

    mockPortoneService = {
      getPayment: jest.fn(),
      verifyPayment: jest.fn(),
      cancelPayment: jest.fn(),
    };

    mockProductService = {
      findActiveByCode: jest.fn(),
      findByCode: jest.fn(),
    };

    mockCouponService = {
      validate: jest.fn(),
      calculateDiscount: jest.fn(),
      recordUsage: jest.fn(),
    };

    mockViewingCreditService = {
      grantCredits: jest.fn(),
      rollbackCredits: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: MockPaymentPrismaService, useValue: mockPaymentPrisma },
        { provide: MockAuthPrismaService, useValue: mockAuthPrisma },
        { provide: PortoneService, useValue: mockPortoneService },
        { provide: ProductService, useValue: mockProductService },
        { provide: CouponService, useValue: mockCouponService },
        { provide: ViewingCreditService, useValue: mockViewingCreditService },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  // ================================================
  // createOrder
  // ================================================
  describe('createOrder', () => {
    it('정상 주문 생성 / should create order successfully', async () => {
      mockProductService.findActiveByCode.mockResolvedValue(mockProduct);
      mockPaymentPrisma.order.create.mockResolvedValue({
        id: 1,
        orderNo: 'ORD-20260101-ABC12',
        totalAmount: 50000,
        originalAmount: 50000,
        product: mockProduct,
      });

      const result = await service.createOrder('user-1', 'JOB_PREMIUM', 1);
      expect(result.totalAmount).toBe(50000);
      expect(result.productName).toBe('프리미엄 공고');
      expect(mockProductService.findActiveByCode).toHaveBeenCalledWith(
        'JOB_PREMIUM',
      );
    });

    it('비활성 상품 주문 거부 / should reject inactive product', async () => {
      mockProductService.findActiveByCode.mockRejectedValue(
        new NotFoundException('Product is not currently active: BUMP_UP'),
      );

      await expect(service.createOrder('user-1', 'BUMP_UP')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('쿠폰 적용 주문 / should apply coupon discount', async () => {
      const discountProduct = { ...mockProduct, price: 50000 };
      const fixedCoupon = {
        ...mockCoupon,
        type: 'FIXED_DISCOUNT',
        value: 10000,
        targetProduct: 'JOB_POSTING',
      };

      mockProductService.findActiveByCode.mockResolvedValue(discountProduct);
      mockCouponService.validate.mockResolvedValue(fixedCoupon);
      mockCouponService.calculateDiscount.mockReturnValue(10000);
      mockPaymentPrisma.order.create.mockResolvedValue({
        id: 2,
        orderNo: 'ORD-20260101-DEF34',
        totalAmount: 40000,
        originalAmount: 50000,
        product: discountProduct,
      });

      const result = await service.createOrder(
        'user-1',
        'JOB_PREMIUM',
        1,
        'FIXED_10K',
      );
      expect(result.totalAmount).toBe(40000);
      expect(result.discount).toBe(10000);
    });

    it('만료된 쿠폰 거부 / should reject expired coupon', async () => {
      mockProductService.findActiveByCode.mockResolvedValue(mockProduct);
      mockCouponService.validate.mockRejectedValue(
        new BadRequestException('Coupon expired'),
      );

      await expect(
        service.createOrder('user-1', 'JOB_PREMIUM', 1, 'EXPIRED_COUPON'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  // ================================================
  // confirmPayment
  // ================================================
  describe('confirmPayment', () => {
    it('정상 결제 확인 / should confirm payment successfully', async () => {
      const mockOrder = {
        id: 1,
        orderNo: 'ORD-20260101-ABC12',
        userId: 'user-1',
        status: 'PENDING',
        totalAmount: 50000,
        couponId: null,
        payment: null,
        product: mockProduct,
        targetJobId: BigInt(1),
      };

      mockPaymentPrisma.order.findUnique.mockResolvedValue(mockOrder);
      mockPortoneService.verifyPayment.mockResolvedValue({
        status: 'PAID',
        amount: { total: 50000 },
        method: { type: 'Card' },
        paidAt: '2026-01-01T00:00:00Z',
      });
      mockPaymentPrisma.$transaction.mockResolvedValue([
        { id: 1, portonePaymentId: 'pay_123', status: 'PAID' },
        { id: 1, status: 'PAID' },
      ]);
      mockAuthPrisma.jobPosting.findUnique.mockResolvedValue({
        id: BigInt(1),
        boardType: 'FULL_TIME',
        tierType: 'STANDARD',
      });
      mockAuthPrisma.jobPosting.update.mockResolvedValue({});

      const result = await service.confirmPayment(1, 'pay_123');
      expect(result.status).toBe('PAID');
      expect(mockPortoneService.verifyPayment).toHaveBeenCalledWith(
        'pay_123',
        50000,
      );
    });

    it('이미 처리된 주문 거부 / should reject already processed order', async () => {
      mockPaymentPrisma.order.findUnique.mockResolvedValue({
        id: 1,
        status: 'PAID',
        payment: { id: 1 },
        product: mockProduct,
      });

      await expect(service.confirmPayment(1, 'pay_123')).rejects.toThrow(
        ConflictException,
      );
    });

    it('금액 불일치 거부 / should reject mismatched amount', async () => {
      mockPaymentPrisma.order.findUnique.mockResolvedValue({
        id: 1,
        status: 'PENDING',
        totalAmount: 50000,
        payment: null,
        product: mockProduct,
      });
      mockPortoneService.verifyPayment.mockRejectedValue(
        new BadRequestException('Payment amount mismatch'),
      );

      await expect(service.confirmPayment(1, 'pay_123')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // ================================================
  // cancelPayment
  // ================================================
  describe('cancelPayment', () => {
    it('프리미엄 취소 → tier 롤백 / should rollback tier on premium cancel', async () => {
      const mockOrder = {
        id: 1,
        userId: 'user-1',
        status: 'PAID',
        totalAmount: 50000,
        product: mockProduct,
        payment: { id: 1, portonePaymentId: 'pay_123', paidAmount: 50000 },
        targetJobId: BigInt(1),
      };

      mockPaymentPrisma.order.findUnique.mockResolvedValue(mockOrder);
      mockPortoneService.cancelPayment.mockResolvedValue({
        status: 'CANCELLED',
        cancelledAmount: 50000,
      });
      mockPaymentPrisma.$transaction.mockResolvedValue([{}, {}]);
      mockAuthPrisma.jobPosting.update.mockResolvedValue({});

      const result = await service.cancelPayment(1, 'user-1', '단순 변심');
      expect(result.status).toBe('CANCELLED');
      expect(mockPortoneService.cancelPayment).toHaveBeenCalledWith(
        'pay_123',
        '단순 변심',
      );
      expect(mockAuthPrisma.jobPosting.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: BigInt(1) },
          data: expect.objectContaining({ tierType: 'STANDARD' }),
        }),
      );
    });

    it('열람권 취소 → 크레딧 롤백 / should rollback credits on viewing cancel', async () => {
      const mockOrder = {
        id: 2,
        userId: 'user-1',
        status: 'PAID',
        totalAmount: 25000,
        product: mockViewProduct,
        payment: { id: 2, portonePaymentId: 'pay_456', paidAmount: 25000 },
        targetJobId: null,
      };

      mockPaymentPrisma.order.findUnique.mockResolvedValue(mockOrder);
      mockPortoneService.cancelPayment.mockResolvedValue({
        status: 'CANCELLED',
        cancelledAmount: 25000,
      });
      mockPaymentPrisma.$transaction.mockResolvedValue([{}, {}]);
      mockViewingCreditService.rollbackCredits.mockResolvedValue({});

      const result = await service.cancelPayment(2, 'user-1', '환불 요청');
      expect(result.status).toBe('CANCELLED');
      expect(mockViewingCreditService.rollbackCredits).toHaveBeenCalledWith(
        'user-1',
        'VIEW_10',
      );
    });

    it('타인 주문 취소 거부 / should reject cancelling another user order', async () => {
      mockPaymentPrisma.order.findUnique.mockResolvedValue({
        id: 1,
        userId: 'user-2',
        status: 'PAID',
        product: mockProduct,
        payment: { id: 1, portonePaymentId: 'pay_123' },
      });

      await expect(service.cancelPayment(1, 'user-1', '환불')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('미결제 주문 취소 거부 / should reject cancelling non-PAID order', async () => {
      mockPaymentPrisma.order.findUnique.mockResolvedValue({
        id: 1,
        userId: 'user-1',
        status: 'PENDING',
        product: mockProduct,
        payment: null,
      });

      await expect(service.cancelPayment(1, 'user-1', '환불')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // ================================================
  // applyProductEffect
  // ================================================
  describe('applyProductEffect (via confirmPayment)', () => {
    it('프리미엄 업그레이드 효과 / should apply premium upgrade effect', async () => {
      const mockOrder = {
        id: 1,
        status: 'PENDING',
        totalAmount: 50000,
        couponId: null,
        payment: null,
        product: mockProduct,
        targetJobId: BigInt(1),
        userId: 'user-1',
      };

      mockPaymentPrisma.order.findUnique.mockResolvedValue(mockOrder);
      mockPortoneService.verifyPayment.mockResolvedValue({
        status: 'PAID',
        amount: { total: 50000 },
        method: { type: 'Card' },
      });
      mockPaymentPrisma.$transaction.mockResolvedValue([{}, {}]);
      mockAuthPrisma.jobPosting.findUnique.mockResolvedValue({
        id: BigInt(1),
        boardType: 'FULL_TIME',
        tierType: 'STANDARD',
      });
      mockAuthPrisma.jobPosting.update.mockResolvedValue({});

      await service.confirmPayment(1, 'pay_123');
      expect(mockAuthPrisma.jobPosting.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: BigInt(1) },
          data: expect.objectContaining({ tierType: 'PREMIUM' }),
        }),
      );
    });

    it('열람권 생성 효과 / should create viewing credits', async () => {
      const mockOrder = {
        id: 2,
        status: 'PENDING',
        totalAmount: 25000,
        couponId: null,
        payment: null,
        product: mockViewProduct,
        targetJobId: null,
        userId: 'user-1',
      };

      mockPaymentPrisma.order.findUnique.mockResolvedValue(mockOrder);
      mockPortoneService.verifyPayment.mockResolvedValue({
        status: 'PAID',
        amount: { total: 25000 },
        method: { type: 'Card' },
      });
      mockPaymentPrisma.$transaction.mockResolvedValue([{}, {}]);
      mockViewingCreditService.grantCredits.mockResolvedValue({});

      await service.confirmPayment(2, 'pay_456');
      expect(mockViewingCreditService.grantCredits).toHaveBeenCalledWith(
        'user-1',
        10, // credits from metadata
        'VIEW_10',
        60, // validDays from metadata
      );
    });
  });
});
