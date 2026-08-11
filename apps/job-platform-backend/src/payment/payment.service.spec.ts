import { Test, TestingModule } from '@nestjs/testing';
import {
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  BadGatewayException,
} from '@nestjs/common';
import { createHash } from 'crypto';

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
        updateMany: jest.fn(),
        count: jest.fn(),
      },
      payment: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
      },
      paymentCancellation: {
        create: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
      },
      paymentWebhookEvent: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
      },
      $transaction: jest.fn(async (input) =>
        typeof input === 'function'
          ? input(mockPaymentPrisma)
          : Promise.all(input),
      ),
    };

    mockAuthPrisma = {
      corporateProfile: {
        findUnique: jest.fn(),
      },
      jobPosting: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };

    mockPortoneService = {
      getStoreId: jest.fn(),
      getCheckoutConfig: jest.fn(),
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
      calculateCreditRefund: jest.fn(),
      executeRefund: jest.fn(),
    };

    mockPortoneService.getStoreId.mockReturnValue('store-test12345678');
    mockPortoneService.getCheckoutConfig.mockImplementation(
      (paymentId, orderName, totalAmount, currency) => ({
        storeId: 'store-test12345678',
        channelKey: 'channel-key-test12345678',
        paymentId,
        orderName,
        totalAmount,
        currency,
      }),
    );
    mockAuthPrisma.corporateProfile.findUnique.mockResolvedValue({
      companyId: BigInt(10),
    });
    mockAuthPrisma.jobPosting.findUnique.mockResolvedValue({
      id: BigInt(1),
      corporateId: BigInt(10),
      boardType: 'FULL_TIME',
      tierType: 'STANDARD',
      premiumStartAt: null,
      premiumEndAt: null,
      expiresAt: null,
      upgradedAt: null,
    });
    mockPaymentPrisma.order.updateMany.mockResolvedValue({ count: 1 });
    mockPaymentPrisma.order.update.mockResolvedValue({});
    mockPaymentPrisma.payment.updateMany.mockResolvedValue({ count: 1 });
    mockPaymentPrisma.paymentCancellation.findFirst.mockResolvedValue(null);
    mockPaymentPrisma.paymentCancellation.create.mockImplementation(
      async ({ data }) => ({ ...data, createdAt: new Date() }),
    );
    mockPaymentPrisma.paymentCancellation.update.mockResolvedValue({});
    mockPaymentPrisma.paymentWebhookEvent.update.mockResolvedValue({});
    mockPaymentPrisma.paymentWebhookEvent.updateMany.mockResolvedValue({
      count: 1,
    });

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

    it('잘못된 서버 상품 가격 거부 / should reject an invalid server-side product price', async () => {
      mockProductService.findActiveByCode.mockResolvedValue({
        ...mockProduct,
        price: -1,
      });

      await expect(
        service.createOrder('user-1', 'JOB_PREMIUM', 1),
      ).rejects.toThrow(BadRequestException);
      expect(mockPaymentPrisma.order.create).not.toHaveBeenCalled();
    });

    it('결제 채널 설정 오류는 주문 저장 전에 실패한다', async () => {
      mockProductService.findActiveByCode.mockResolvedValue(mockViewProduct);
      mockPortoneService.getCheckoutConfig.mockImplementation(() => {
        throw new BadGatewayException('Payment channel is not configured');
      });

      await expect(
        service.createOrder('user-1', 'VIEW_10'),
      ).rejects.toThrow(BadGatewayException);
      expect(mockPaymentPrisma.order.create).not.toHaveBeenCalled();
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
        currency: 'KRW',
        couponId: null,
        fulfillmentStatus: 'PENDING',
        payment: {
          id: 1,
          portonePaymentId: 'pay_123',
          status: 'PENDING',
        },
        product: mockProduct,
        targetJobId: BigInt(1),
      };

      const paidOrder = {
        ...mockOrder,
        status: 'PAID',
        payment: {
          ...mockOrder.payment,
          status: 'PAID',
          paidAmount: 50000,
        },
      };
      mockPaymentPrisma.order.findUnique
        .mockResolvedValueOnce(mockOrder)
        .mockResolvedValueOnce(paidOrder);
      mockPortoneService.verifyPayment.mockResolvedValue({
        id: 'pay_123',
        storeId: 'store-test12345678',
        status: 'PAID',
        currency: 'KRW',
        amount: { total: 50000, paid: 50000 },
        method: { type: 'Card' },
        paidAt: '2026-01-01T00:00:00Z',
      });
      mockAuthPrisma.jobPosting.update.mockResolvedValue({});

      const result = await service.confirmPayment(1, 'pay_123', 'user-1');
      expect(result.status).toBe('PAID');
      expect(mockPortoneService.verifyPayment).toHaveBeenCalledWith('pay_123', {
        amount: 50000,
        currency: 'KRW',
        requirePaid: true,
      });
    });

    it('이미 처리된 같은 결제는 멱등 응답 / should idempotently return an already paid order', async () => {
      const paidOrder = {
        id: 1,
        orderNo: 'ORD-20260101-ABC12',
        userId: 'user-1',
        status: 'PAID',
        totalAmount: 50000,
        fulfillmentStatus: 'FULFILLED',
        payment: {
          id: 1,
          portonePaymentId: 'pay_123',
          status: 'PAID',
          paidAmount: 50000,
        },
        product: mockProduct,
      };
      mockPaymentPrisma.order.findUnique
        .mockResolvedValueOnce(paidOrder)
        .mockResolvedValueOnce({ fulfillmentStatus: 'FULFILLED' });
      mockPaymentPrisma.order.updateMany.mockResolvedValueOnce({ count: 0 });

      const result = await service.confirmPayment(1, 'pay_123', 'user-1');
      expect(result).toEqual(
        expect.objectContaining({ status: 'PAID', paidAmount: 50000 }),
      );
      expect(mockPortoneService.verifyPayment).not.toHaveBeenCalled();
    });

    it('금액 불일치 거부 / should reject mismatched amount', async () => {
      mockPaymentPrisma.order.findUnique.mockResolvedValue({
        id: 1,
        userId: 'user-1',
        status: 'PENDING',
        totalAmount: 50000,
        currency: 'KRW',
        payment: {
          id: 1,
          portonePaymentId: 'pay_123',
          status: 'PENDING',
        },
        product: mockProduct,
      });
      mockPortoneService.verifyPayment.mockRejectedValue(
        new BadRequestException('Payment amount mismatch'),
      );

      await expect(
        service.confirmPayment(1, 'pay_123', 'user-1'),
      ).rejects.toThrow(BadRequestException);
    });

    it('타인 주문의 결제 확인 거부 / should reject another user order', async () => {
      mockPaymentPrisma.order.findUnique.mockResolvedValue({
        id: 1,
        userId: 'user-2',
        status: 'PENDING',
        payment: { portonePaymentId: 'pay_123', status: 'PENDING' },
        product: mockProduct,
      });

      await expect(
        service.confirmPayment(1, 'pay_123', 'user-1'),
      ).rejects.toThrow(ForbiddenException);
      expect(mockPortoneService.verifyPayment).not.toHaveBeenCalled();
    });

    it('서버가 발급하지 않은 결제 ID 거부 / should reject a foreign payment id', async () => {
      mockPaymentPrisma.order.findUnique.mockResolvedValue({
        id: 1,
        userId: 'user-1',
        status: 'PENDING',
        payment: { portonePaymentId: 'pay_server', status: 'PENDING' },
        product: mockProduct,
      });

      await expect(
        service.confirmPayment(1, 'pay_attacker', 'user-1'),
      ).rejects.toThrow(BadRequestException);
      expect(mockPortoneService.verifyPayment).not.toHaveBeenCalled();
    });
  });

  // ================================================
  // cancelPayment
  // ================================================
  describe('cancelPayment', () => {
    it('공백 취소 사유는 상태 변경 전에 거부 / should reject blank reason before state changes', async () => {
      await expect(service.cancelPayment(1, 'user-1', '   ')).rejects.toThrow(
        BadRequestException,
      );
      expect(mockPaymentPrisma.order.findUnique).not.toHaveBeenCalled();
      expect(mockPaymentPrisma.payment.updateMany).not.toHaveBeenCalled();
    });

    it('프리미엄 취소 → tier 롤백 / should rollback tier on premium cancel', async () => {
      const mockOrder = {
        id: 1,
        userId: 'user-1',
        status: 'PAID',
        totalAmount: 50000,
        couponId: null,
        fulfillmentStatus: 'FULFILLED',
        product: mockProduct,
        payment: {
          id: 1,
          portonePaymentId: 'pay_123',
          status: 'PAID',
          paidAmount: 50000,
          paidAt: new Date(),
        },
        targetJobId: BigInt(1),
      };

      mockPaymentPrisma.order.findUnique.mockResolvedValue(mockOrder);
      mockPortoneService.cancelPayment.mockResolvedValue({
        id: 'cancel_123',
        status: 'SUCCEEDED',
        cancelledAmount: 50000,
      });
      mockAuthPrisma.jobPosting.update.mockResolvedValue({});

      const result = await service.cancelPayment(1, 'user-1', '단순 변심');
      expect(result.status).toBe('REFUNDED');
      expect(mockPortoneService.cancelPayment).toHaveBeenCalledWith(
        'pay_123',
        '단순 변심',
        undefined,
        expect.stringMatching(/^cancel_[a-f0-9]{32}$/),
        50000,
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
        couponId: null,
        fulfillmentStatus: 'FULFILLED',
        product: mockViewProduct,
        payment: {
          id: 2,
          portonePaymentId: 'pay_456',
          status: 'PAID',
          paidAmount: 25000,
          paidAt: new Date(),
        },
        targetJobId: null,
      };

      mockPaymentPrisma.order.findUnique.mockResolvedValue(mockOrder);
      mockPortoneService.cancelPayment.mockResolvedValue({
        id: 'cancel_456',
        status: 'SUCCEEDED',
        cancelledAmount: 25000,
      });
      mockViewingCreditService.calculateCreditRefund.mockResolvedValue({
        creditId: 22,
        totalCredits: 10,
        usedCredits: 0,
        refundableCredits: 10,
        canFullRefund: true,
      });
      mockViewingCreditService.executeRefund.mockResolvedValue({});

      const result = await service.cancelPayment(2, 'user-1', '환불 요청');
      expect(result.status).toBe('REFUNDED');
      expect(mockViewingCreditService.executeRefund).toHaveBeenCalledWith(
        22,
        10,
      );
    });

    it('부분 환불 시 결제사 잔액 검증과 누적 취소 금액 저장 / should verify provider balance for a partial refund', async () => {
      const mockOrder = {
        id: 4,
        userId: 'user-1',
        status: 'PAID',
        totalAmount: 25000,
        couponId: null,
        fulfillmentStatus: 'FULFILLED',
        product: mockViewProduct,
        payment: {
          id: 4,
          portonePaymentId: 'pay_partial',
          status: 'PAID',
          paidAmount: 25000,
          cancelledAmount: null,
          paidAt: new Date(),
        },
        targetJobId: null,
      };
      mockPaymentPrisma.order.findUnique.mockResolvedValue(mockOrder);
      mockViewingCreditService.calculateCreditRefund.mockResolvedValue({
        creditId: 44,
        totalCredits: 10,
        usedCredits: 4,
        refundableCredits: 6,
        canFullRefund: false,
      });
      mockPortoneService.cancelPayment.mockResolvedValue({
        id: 'cancel_partial',
        status: 'SUCCEEDED',
        cancelledAmount: 15000,
      });

      const result = await service.cancelPayment(4, 'user-1', '부분 환불');

      expect(result).toEqual(expect.objectContaining({ isPartialRefund: true }));
      expect(mockPortoneService.cancelPayment).toHaveBeenCalledWith(
        'pay_partial',
        '부분 환불',
        15000,
        expect.stringMatching(/^cancel_[a-f0-9]{32}$/),
        25000,
      );
      expect(mockPaymentPrisma.payment.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 4 },
          data: expect.objectContaining({
            status: 'PARTIAL_CANCELLED',
            cancelledAmount: 15000,
          }),
        }),
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
        ForbiddenException,
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

    it('취소 통신 장애 후 같은 멱등 키로 재처리 / should resume uncertain cancellation with the same key', async () => {
      const mockOrder = {
        id: 3,
        userId: 'user-1',
        status: 'PAID',
        totalAmount: 50000,
        couponId: null,
        fulfillmentStatus: 'FULFILLED',
        product: mockProduct,
        payment: {
          id: 3,
          portonePaymentId: 'pay_retry',
          status: 'PAID',
          paidAmount: 50000,
          paidAt: new Date(),
        },
        targetJobId: BigInt(1),
      };
      mockPaymentPrisma.order.findUnique.mockResolvedValue(mockOrder);
      mockPaymentPrisma.paymentCancellation.findFirst
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);
      mockPortoneService.cancelPayment.mockRejectedValueOnce(
        new BadGatewayException('timeout'),
      );

      await expect(
        service.cancelPayment(3, 'user-1', '재시도 검증'),
      ).rejects.toThrow(BadGatewayException);

      const created =
        mockPaymentPrisma.paymentCancellation.create.mock.calls[0][0].data;
      mockPaymentPrisma.paymentCancellation.findFirst
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(created);
      mockPortoneService.cancelPayment.mockResolvedValueOnce({
        id: 'cancel_retry',
        status: 'SUCCEEDED',
        cancelledAmount: 50000,
      });

      const result = await service.cancelPayment(3, 'user-1', '재시도 검증');
      expect(result.status).toBe('REFUNDED');
      expect(mockPortoneService.cancelPayment).toHaveBeenNthCalledWith(
        2,
        'pay_retry',
        '재시도 검증',
        undefined,
        created.idempotencyKey,
        50000,
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
        orderNo: 'ORD-20260101-PREMIUM',
        status: 'PENDING',
        totalAmount: 50000,
        currency: 'KRW',
        couponId: null,
        fulfillmentStatus: 'PENDING',
        payment: {
          id: 1,
          portonePaymentId: 'pay_123',
          status: 'PENDING',
        },
        product: mockProduct,
        targetJobId: BigInt(1),
        userId: 'user-1',
      };

      mockPaymentPrisma.order.findUnique
        .mockResolvedValueOnce(mockOrder)
        .mockResolvedValueOnce({
          ...mockOrder,
          status: 'PAID',
          payment: { ...mockOrder.payment, status: 'PAID', paidAmount: 50000 },
        });
      mockPortoneService.verifyPayment.mockResolvedValue({
        id: 'pay_123',
        storeId: 'store-test12345678',
        status: 'PAID',
        currency: 'KRW',
        amount: { total: 50000, paid: 50000 },
        method: { type: 'Card' },
        paidAt: '2026-01-01T00:00:00Z',
      });
      mockAuthPrisma.jobPosting.update.mockResolvedValue({});

      await service.confirmPayment(1, 'pay_123', 'user-1');
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
        orderNo: 'ORD-20260101-VIEW',
        status: 'PENDING',
        totalAmount: 25000,
        currency: 'KRW',
        couponId: null,
        fulfillmentStatus: 'PENDING',
        payment: {
          id: 2,
          portonePaymentId: 'pay_456',
          status: 'PENDING',
        },
        product: mockViewProduct,
        targetJobId: null,
        userId: 'user-1',
      };

      mockPaymentPrisma.order.findUnique
        .mockResolvedValueOnce(mockOrder)
        .mockResolvedValueOnce({
          ...mockOrder,
          status: 'PAID',
          payment: { ...mockOrder.payment, status: 'PAID', paidAmount: 25000 },
        });
      mockPortoneService.verifyPayment.mockResolvedValue({
        id: 'pay_456',
        storeId: 'store-test12345678',
        status: 'PAID',
        currency: 'KRW',
        amount: { total: 25000, paid: 25000 },
        method: { type: 'Card' },
        paidAt: '2026-01-01T00:00:00Z',
      });
      mockViewingCreditService.grantCredits.mockResolvedValue({});

      await service.confirmPayment(2, 'pay_456', 'user-1');
      expect(mockViewingCreditService.grantCredits).toHaveBeenCalledWith(
        'user-1',
        10, // credits from metadata
        'VIEW_10',
        60, // validDays from metadata
        2,
      );
    });
  });

  describe('webhook idempotency', () => {
    const rawBody = JSON.stringify({
      type: 'Transaction.Paid',
      data: { paymentId: 'pay_webhook' },
    });

    it('새 웹훅을 영속적으로 선점 / should persistently claim a new webhook', async () => {
      mockPaymentPrisma.paymentWebhookEvent.create.mockResolvedValue({});

      await expect(
        service.beginWebhookEvent({
          webhookId: 'msg_new',
          eventType: 'Transaction.Paid',
          paymentId: 'pay_webhook',
          rawBody,
        }),
      ).resolves.toBe('PROCESS');
      expect(mockPaymentPrisma.paymentWebhookEvent.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            id: 'msg_new',
            payloadHash: createHash('sha256').update(rawBody).digest('hex'),
            status: 'PROCESSING',
          }),
        }),
      );
    });

    it('처리 완료된 동일 웹훅은 중복 응답 / should acknowledge an already processed webhook', async () => {
      const payloadHash = createHash('sha256').update(rawBody).digest('hex');
      mockPaymentPrisma.paymentWebhookEvent.create.mockRejectedValue({
        code: 'P2002',
      });
      mockPaymentPrisma.paymentWebhookEvent.findUnique.mockResolvedValue({
        id: 'msg_done',
        payloadHash,
        status: 'PROCESSED',
        lockedUntil: new Date(0),
      });

      await expect(
        service.beginWebhookEvent({
          webhookId: 'msg_done',
          eventType: 'Transaction.Paid',
          paymentId: 'pay_webhook',
          rawBody,
        }),
      ).resolves.toBe('DUPLICATE');
    });

    it('같은 ID의 다른 본문은 거부 / should reject payload substitution for the same ID', async () => {
      mockPaymentPrisma.paymentWebhookEvent.create.mockRejectedValue({
        code: 'P2002',
      });
      mockPaymentPrisma.paymentWebhookEvent.findUnique.mockResolvedValue({
        id: 'msg_tampered',
        payloadHash: 'different-hash',
        status: 'PROCESSED',
        lockedUntil: new Date(0),
      });

      await expect(
        service.beginWebhookEvent({
          webhookId: 'msg_tampered',
          eventType: 'Transaction.Paid',
          paymentId: 'pay_webhook',
          rawBody,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
