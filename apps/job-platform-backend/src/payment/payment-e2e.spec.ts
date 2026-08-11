/**
 * 결제 E2E 시나리오 테스트 / Payment E2E scenario tests
 *
 * 포트원 API 100% 목킹, DB도 목킹
 * All PortOne API calls mocked, DB also mocked
 *
 * 5개 시나리오:
 * 1. 프리미엄 업그레이드 / Premium upgrade
 * 2. 인재 열람 / Talent viewing
 * 3. 쿠폰 / Coupons
 * 4. 환불 / Refund
 * 5. 웹훅 / Webhook
 */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';

// Prisma 서비스 목킹 / Mock Prisma services
class MockPaymentPrismaService {}
class MockAuthPrismaService {}

jest.mock('libs/common/src', () => ({
  PaymentPrismaService: MockPaymentPrismaService,
  AuthPrismaService: MockAuthPrismaService,
  SkipCsrf: () => () => undefined,
}));

import { PaymentService } from './payment.service';
import { PortoneService } from './portone.service';
import { ProductService } from './product.service';
import { CouponService } from './coupon.service';
import { ViewingCreditService } from './viewing-credit.service';
import { PortoneWebhookController } from './portone-webhook.controller';

// ──── 상품 Fixtures / Product fixtures ────
const PRODUCTS = {
  JOB_PREMIUM: {
    id: 1,
    code: 'JOB_PREMIUM',
    name: '프리미엄 공고',
    nameEn: 'Premium Job',
    category: 'JOB_POSTING',
    price: 50000,
    isActive: true,
    metadata: JSON.stringify({
      standardDays: { partTime: 14, fullTime: 30 },
      premiumDays: { partTime: 30, fullTime: 60 },
    }),
  },
  VIEW_30: {
    id: 4,
    code: 'VIEW_30',
    name: '인재 열람 프로',
    nameEn: 'Pro Talent View',
    category: 'TALENT_VIEW',
    price: 60000,
    isActive: true,
    metadata: JSON.stringify({ credits: 30, validDays: 90 }),
  },
};

// ================================================
// 시나리오 1: 프리미엄 업그레이드 플로우
// Scenario 1: Premium upgrade flow
// ================================================
describe('E2E 시나리오 1: 프리미엄 업그레이드 / Premium upgrade', () => {
  let paymentService: PaymentService;
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
        update: jest.fn().mockResolvedValue({}),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      payment: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      $transaction: jest.fn(async (input) =>
        typeof input === 'function'
          ? input(mockPaymentPrisma)
          : Promise.all(input),
      ),
    };
    mockAuthPrisma = {
      corporateProfile: {
        findUnique: jest.fn().mockResolvedValue({ companyId: BigInt(7) }),
      },
      jobPosting: { findUnique: jest.fn(), update: jest.fn() },
    };
    mockPortoneService = {
      getStoreId: jest.fn().mockReturnValue('store-e2e12345678'),
      getCheckoutConfig: jest.fn().mockReturnValue({
        storeId: 'store-e2e12345678',
        channelKey: 'channel-key-e2e12345678',
      }),
      getPayment: jest.fn(),
      verifyPayment: jest.fn(),
      cancelPayment: jest.fn(),
    };
    mockProductService = { findActiveByCode: jest.fn() };
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

    paymentService = module.get<PaymentService>(PaymentService);
  });

  it('공고 → 주문 → 결제 → 프리미엄 업그레이드 전체 플로우 / Full premium upgrade flow', async () => {
    mockAuthPrisma.jobPosting.findUnique.mockResolvedValue({
      id: BigInt(42),
      corporateId: BigInt(7),
      boardType: 'FULL_TIME',
      tierType: 'STANDARD',
      premiumStartAt: null,
      premiumEndAt: null,
      expiresAt: null,
      upgradedAt: null,
    });

    // STEP 1: 주문 생성 / Create order
    mockProductService.findActiveByCode.mockResolvedValue(PRODUCTS.JOB_PREMIUM);
    mockPaymentPrisma.order.create.mockResolvedValue({
      id: 1,
      orderNo: 'ORD-20260214-PREM1',
      totalAmount: 50000,
      originalAmount: 50000,
      product: PRODUCTS.JOB_PREMIUM,
    });

    const order = await paymentService.createOrder(
      'biz-user-1',
      'JOB_PREMIUM',
      42,
    );
    expect(order.totalAmount).toBe(50000);
    expect(order.productName).toBe('프리미엄 공고');

    // STEP 2: 결제 확인 / Confirm payment
    const pendingOrder = {
      id: 1,
      orderNo: 'ORD-20260214-PREM1',
      userId: 'biz-user-1',
      status: 'PENDING',
      totalAmount: 50000,
      currency: 'KRW',
      couponId: null,
      fulfillmentStatus: 'PENDING',
      payment: {
        id: 1,
        portonePaymentId: 'portone_prem_1',
        status: 'PENDING',
      },
      product: PRODUCTS.JOB_PREMIUM,
      targetJobId: BigInt(42),
    };
    mockPaymentPrisma.order.findUnique
      .mockResolvedValueOnce(pendingOrder)
      .mockResolvedValueOnce({
        ...pendingOrder,
        status: 'PAID',
        payment: {
          ...pendingOrder.payment,
          status: 'PAID',
          paidAmount: 50000,
        },
      });
    mockPortoneService.verifyPayment.mockResolvedValue({
      id: 'portone_prem_1',
      storeId: 'store-e2e12345678',
      status: 'PAID',
      currency: 'KRW',
      amount: { total: 50000, paid: 50000 },
      method: { type: 'Card', card: { name: '신한카드' } },
      paidAt: '2026-02-14T12:00:00Z',
    });
    mockAuthPrisma.jobPosting.update.mockResolvedValue({});

    const confirm = await paymentService.confirmPayment(
      1,
      'portone_prem_1',
      'biz-user-1',
    );
    expect(confirm.status).toBe('PAID');

    // STEP 3: 프리미엄 업그레이드 확인 / Verify premium upgrade
    expect(mockAuthPrisma.jobPosting.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: BigInt(42) },
        data: expect.objectContaining({
          tierType: 'PREMIUM',
          expiresAt: expect.any(Date),
        }),
      }),
    );

    // 만료일이 오늘로부터 60일 이후인지 확인 / Verify expiry is ~60 days from now
    const updateCall = mockAuthPrisma.jobPosting.update.mock.calls[0][0];
    const expiresAt = updateCall.data.expiresAt;
    const daysUntilExpiry = Math.round(
      (expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    expect(daysUntilExpiry).toBeGreaterThanOrEqual(59);
    expect(daysUntilExpiry).toBeLessThanOrEqual(61);
  });
});

// ================================================
// 시나리오 2: 인재 열람 플로우
// Scenario 2: Talent viewing flow
// ================================================
describe('E2E 시나리오 2: 인재 열람 / Talent viewing', () => {
  let paymentService: PaymentService;
  let viewingCreditService: ViewingCreditService;
  let mockPaymentPrisma: any;
  let mockAuthPrisma: any;
  let mockPortoneService: any;
  let mockProductService: any;

  beforeEach(async () => {
    mockPaymentPrisma = {
      order: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn().mockResolvedValue({}),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      payment: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      viewingCredit: {
        create: jest.fn(),
        upsert: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        delete: jest.fn(),
      },
      viewingLog: { findFirst: jest.fn(), create: jest.fn() },
      $transaction: jest.fn(async (input) =>
        typeof input === 'function'
          ? input(mockPaymentPrisma)
          : Promise.all(input),
      ),
    };
    mockAuthPrisma = {
      corporateProfile: { findUnique: jest.fn() },
      jobPosting: { findUnique: jest.fn(), update: jest.fn() },
    };
    mockPortoneService = {
      getStoreId: jest.fn().mockReturnValue('store-e2e12345678'),
      getCheckoutConfig: jest.fn().mockReturnValue({
        storeId: 'store-e2e12345678',
        channelKey: 'channel-key-e2e12345678',
      }),
      getPayment: jest.fn(),
      verifyPayment: jest.fn(),
      cancelPayment: jest.fn(),
    };
    mockProductService = { findActiveByCode: jest.fn() };

    // 실제 ViewingCreditService 사용 / Use real ViewingCreditService
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        ViewingCreditService,
        { provide: MockPaymentPrismaService, useValue: mockPaymentPrisma },
        { provide: MockAuthPrismaService, useValue: mockAuthPrisma },
        { provide: PortoneService, useValue: mockPortoneService },
        { provide: ProductService, useValue: mockProductService },
        {
          provide: CouponService,
          useValue: {
            validate: jest.fn(),
            calculateDiscount: jest.fn(),
            recordUsage: jest.fn(),
          },
        },
      ],
    }).compile();

    paymentService = module.get<PaymentService>(PaymentService);
    viewingCreditService =
      module.get<ViewingCreditService>(ViewingCreditService);
  });

  it('VIEW_30 구매 → 열람권 30건 → 1건 사용 → 중복 열람 차감 없음 / Buy 30 credits → use 1 → reuse no deduction', async () => {
    // STEP 1: 주문 + 결제 / Order + payment
    mockProductService.findActiveByCode.mockResolvedValue(PRODUCTS.VIEW_30);
    mockPaymentPrisma.order.create.mockResolvedValue({
      id: 10,
      orderNo: 'ORD-20260214-VIEW1',
      totalAmount: 60000,
      originalAmount: 60000,
      product: PRODUCTS.VIEW_30,
    });

    await paymentService.createOrder('biz-user-2', 'VIEW_30');

    // STEP 2: 결제 확인 → 크레딧 부여 / Confirm → grant credits
    const pendingOrder = {
      id: 10,
      orderNo: 'ORD-20260214-VIEW1',
      userId: 'biz-user-2',
      status: 'PENDING',
      totalAmount: 60000,
      currency: 'KRW',
      couponId: null,
      fulfillmentStatus: 'PENDING',
      payment: {
        id: 10,
        portonePaymentId: 'portone_view_1',
        status: 'PENDING',
      },
      product: PRODUCTS.VIEW_30,
      targetJobId: null,
    };
    mockPaymentPrisma.order.findUnique
      .mockResolvedValueOnce(pendingOrder)
      .mockResolvedValueOnce({
        ...pendingOrder,
        status: 'PAID',
        payment: {
          ...pendingOrder.payment,
          status: 'PAID',
          paidAmount: 60000,
        },
      });
    mockPortoneService.verifyPayment.mockResolvedValue({
      id: 'portone_view_1',
      storeId: 'store-e2e12345678',
      status: 'PAID',
      currency: 'KRW',
      amount: { total: 60000, paid: 60000 },
      method: { type: 'Card' },
      paidAt: '2026-02-14T12:00:00Z',
    });
    mockPaymentPrisma.viewingCredit.upsert.mockResolvedValue({
      id: 1,
      totalCredits: 30,
      usedCredits: 0,
      source: 'VIEW_30',
    });

    await paymentService.confirmPayment(10, 'portone_view_1', 'biz-user-2');

    // 크레딧 부여 확인 / Verify credit grant
    expect(mockPaymentPrisma.viewingCredit.upsert).toHaveBeenCalledWith({
      where: { orderId: 10 },
      create: expect.objectContaining({
        userId: 'biz-user-2',
        totalCredits: 30,
        usedCredits: 0,
        source: 'VIEW_30',
        orderId: 10,
      }),
      update: { source: 'VIEW_30' },
    });

    // STEP 3: 열람권 1건 사용 / Use 1 credit
    mockPaymentPrisma.viewingLog.findFirst.mockResolvedValue(null);
    mockPaymentPrisma.viewingCredit.findMany
      .mockResolvedValueOnce([
        {
          id: 1,
          totalCredits: 30,
          usedCredits: 0,
          expiresAt: new Date('2027-01-01'),
        },
      ])
      .mockResolvedValueOnce([
        {
          id: 1,
          totalCredits: 30,
          usedCredits: 1,
          expiresAt: new Date('2027-01-01'),
        },
      ]);

    const use1 = await viewingCreditService.useCredit('biz-user-2', 100);
    expect(use1.success).toBe(true);
    expect(use1.remainingCredits).toBe(29);

    // STEP 4: 같은 이력서 재열람 → 차감 없음 / Re-view same resume → no deduction
    mockPaymentPrisma.viewingLog.findFirst.mockResolvedValue({ id: 1 });
    mockPaymentPrisma.viewingCredit.findMany.mockResolvedValue([
      {
        id: 1,
        totalCredits: 30,
        usedCredits: 1,
        expiresAt: new Date('2027-01-01'),
      },
    ]);

    const use2 = await viewingCreditService.useCredit('biz-user-2', 100);
    expect(use2.success).toBe(true);
    expect(use2.remainingCredits).toBe(29); // 동일 — 중복 차감 없음 / Same — no double deduction
  });
});

// ================================================
// 시나리오 3: 쿠폰 시나리오
// Scenario 3: Coupon flow
// ================================================
describe('E2E 시나리오 3: 쿠폰 / Coupons', () => {
  let couponService: CouponService;
  let viewingCreditService: ViewingCreditService;
  let mockPaymentPrisma: any;

  const welcomeCoupon = {
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

  const firstPostCoupon = {
    id: 2,
    code: 'FIRST_POST_VIEW_5',
    name: '첫 공고 축하 열람 5건',
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

  beforeEach(async () => {
    mockPaymentPrisma = {
      coupon: { findUnique: jest.fn(), update: jest.fn() },
      couponUsage: {
        count: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
      },
      viewingCredit: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        delete: jest.fn(),
      },
      viewingLog: { findFirst: jest.fn(), create: jest.fn() },
      $transaction: jest.fn(async (input) =>
        typeof input === 'function'
          ? input(mockPaymentPrisma)
          : Promise.all(input),
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CouponService,
        ViewingCreditService,
        { provide: MockPaymentPrismaService, useValue: mockPaymentPrisma },
      ],
    }).compile();

    couponService = module.get<CouponService>(CouponService);
    viewingCreditService =
      module.get<ViewingCreditService>(ViewingCreditService);
  });

  it('환영 쿠폰 5건 → 첫 공고 쿠폰 5건 → 열람 5건 사용 → 잔여 5건 / Welcome + first post + use 5', async () => {
    // STEP 1: 환영 쿠폰 발급 / Grant welcome coupon
    mockPaymentPrisma.coupon.findUnique.mockResolvedValue(welcomeCoupon);
    mockPaymentPrisma.couponUsage.findFirst.mockResolvedValue(null);
    mockPaymentPrisma.viewingCredit.create.mockResolvedValue({
      id: 1,
      totalCredits: 5,
      usedCredits: 0,
      source: 'COUPON:WELCOME',
    });

    const welcome = await couponService.grantWelcomeCoupons('new-user-1');
    expect(welcome).toEqual({ credits: 5, source: 'COUPON:WELCOME' });

    // STEP 2: 첫 공고 쿠폰 발급 / Grant first post coupon
    mockPaymentPrisma.coupon.findUnique.mockResolvedValue(firstPostCoupon);
    mockPaymentPrisma.couponUsage.findFirst.mockResolvedValue(null);
    mockPaymentPrisma.viewingCredit.create.mockResolvedValue({
      id: 2,
      totalCredits: 5,
      usedCredits: 0,
      source: 'COUPON:FIRST_POST',
    });

    const firstPost = await couponService.grantFirstPostCoupons(
      'new-user-1',
      1,
    );
    expect(firstPost).toEqual({ credits: 5, source: 'COUPON:FIRST_POST' });

    // STEP 3: 열람 5건 사용 / Use 5 credits
    for (let i = 0; i < 5; i++) {
      mockPaymentPrisma.viewingLog.findFirst.mockResolvedValue(null);
      mockPaymentPrisma.viewingCredit.findMany
        .mockResolvedValueOnce([
          {
            id: 1,
            totalCredits: 5,
            usedCredits: i,
            expiresAt: new Date('2027-01-01'),
          },
          {
            id: 2,
            totalCredits: 5,
            usedCredits: 0,
            expiresAt: new Date('2027-03-01'),
          },
        ])
        .mockResolvedValueOnce([
          {
            id: 1,
            totalCredits: 5,
            usedCredits: i + 1,
            expiresAt: new Date('2027-01-01'),
          },
          {
            id: 2,
            totalCredits: 5,
            usedCredits: 0,
            expiresAt: new Date('2027-03-01'),
          },
        ]);

      const result = await viewingCreditService.useCredit(
        'new-user-1',
        200 + i,
      );
      expect(result.success).toBe(true);
    }

    // STEP 4: 잔여 확인 → 5건 (첫 공고 쿠폰 미사용) / Verify remaining = 5
    mockPaymentPrisma.viewingCredit.findMany.mockResolvedValue([
      {
        id: 1,
        totalCredits: 5,
        usedCredits: 5,
        expiresAt: new Date('2027-01-01'),
      },
      {
        id: 2,
        totalCredits: 5,
        usedCredits: 0,
        expiresAt: new Date('2027-03-01'),
      },
    ]);

    const remaining =
      await viewingCreditService.getRemainingCredits('new-user-1');
    expect(remaining).toBe(5); // 첫 공고 쿠폰 5건 남음 / First post coupon 5 remaining
  });
});

// ================================================
// 시나리오 4: 환불 플로우
// Scenario 4: Refund flow
// ================================================
describe('E2E 시나리오 4: 환불 / Refund', () => {
  let paymentService: PaymentService;
  let mockPaymentPrisma: any;
  let mockAuthPrisma: any;
  let mockPortoneService: any;

  beforeEach(async () => {
    mockPaymentPrisma = {
      order: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn().mockResolvedValue({}),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      payment: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      paymentCancellation: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockImplementation(async ({ data }) => data),
        update: jest.fn().mockResolvedValue({}),
      },
      $transaction: jest.fn(async (input) =>
        typeof input === 'function'
          ? input(mockPaymentPrisma)
          : Promise.all(input),
      ),
    };
    mockAuthPrisma = {
      corporateProfile: { findUnique: jest.fn() },
      jobPosting: { findUnique: jest.fn(), update: jest.fn() },
    };
    mockPortoneService = {
      getStoreId: jest.fn(),
      getCheckoutConfig: jest.fn(),
      getPayment: jest.fn(),
      verifyPayment: jest.fn(),
      cancelPayment: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: MockPaymentPrismaService, useValue: mockPaymentPrisma },
        { provide: MockAuthPrismaService, useValue: mockAuthPrisma },
        { provide: PortoneService, useValue: mockPortoneService },
        { provide: ProductService, useValue: { findActiveByCode: jest.fn() } },
        {
          provide: CouponService,
          useValue: {
            validate: jest.fn(),
            calculateDiscount: jest.fn(),
            recordUsage: jest.fn(),
          },
        },
        {
          provide: ViewingCreditService,
          useValue: {
            grantCredits: jest.fn(),
            rollbackCredits: jest.fn(),
            calculateCreditRefund: jest.fn(),
            executeRefund: jest.fn(),
          },
        },
      ],
    }).compile();

    paymentService = module.get<PaymentService>(PaymentService);
  });

  it('프리미엄 결제 → 환불 → tier STANDARD 복원 / Premium paid → refund → tier restored', async () => {
    // 프리미엄 결제 완료 상태의 주문 / Order in PAID state
    const paidOrder = {
      id: 5,
      userId: 'biz-user-3',
      status: 'PAID',
      totalAmount: 50000,
      couponId: null,
      fulfillmentStatus: 'FULFILLED',
      product: PRODUCTS.JOB_PREMIUM,
      payment: {
        id: 5,
        portonePaymentId: 'portone_refund_1',
        status: 'PAID',
        paidAmount: 50000,
        paidAt: new Date(),
      },
      targetJobId: BigInt(99),
    };

    mockPaymentPrisma.order.findUnique.mockResolvedValue(paidOrder);
    mockPortoneService.cancelPayment.mockResolvedValue({
      id: 'cancel_refund_1',
      status: 'SUCCEEDED',
      cancelledAmount: 50000,
    });
    mockAuthPrisma.jobPosting.findUnique.mockResolvedValue({
      id: BigInt(99),
      upgradedAt: null,
    });
    mockAuthPrisma.jobPosting.update.mockResolvedValue({});

    // 환불 실행 / Execute refund
    const result = await paymentService.cancelPayment(
      5,
      'biz-user-3',
      '서비스 불만족',
    );
    expect(result.status).toBe('REFUNDED');

    // 포트원 환불 호출 확인 / Verify PortOne cancel called
    expect(mockPortoneService.cancelPayment).toHaveBeenCalledWith(
      'portone_refund_1',
      '서비스 불만족',
      undefined,
      expect.stringMatching(/^cancel_[a-f0-9]{32}$/),
      50000,
    );

    // tier 롤백 확인 / Verify tier rollback
    expect(mockAuthPrisma.jobPosting.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: BigInt(99) },
        data: expect.objectContaining({ tierType: 'STANDARD' }),
      }),
    );
  });
});

// ================================================
// 시나리오 5: 웹훅 플로우
// Scenario 5: Webhook flow
// ================================================
describe('E2E 시나리오 5: 웹훅 / Webhook', () => {
  let controller: PortoneWebhookController;
  let mockPaymentService: any;
  let mockPortoneService: any;

  const rawSecret = Buffer.from('e2e-test-webhook-secret');
  const webhookSecret = `whsec_${rawSecret.toString('base64')}`;

  function generateSignature(id: string, ts: string, body: string): string {
    const secretBytes = Buffer.from(
      webhookSecret.replace(/^whsec_/, ''),
      'base64',
    );
    const sig = createHmac('sha256', secretBytes)
      .update(`${id}.${ts}.${body}`)
      .digest('base64');
    return `v1,${sig}`;
  }

  function mockRes() {
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    return res;
  }

  beforeEach(async () => {
    mockPortoneService = {
      getStoreId: jest.fn().mockReturnValue('store-e2e12345678'),
      getPayment: jest.fn(),
    };
    mockPaymentService = {
      beginWebhookEvent: jest.fn().mockResolvedValue('PROCESS'),
      synchronizePaymentFromWebhook: jest.fn().mockResolvedValue('SYNCED'),
      completeWebhookEvent: jest.fn().mockResolvedValue(undefined),
      failWebhookEvent: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortoneWebhookController],
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string, fallback?: string) => {
              if (key === 'PORTONE_WEBHOOK_SECRET') return webhookSecret;
              return fallback;
            }),
          },
        },
        { provide: PortoneService, useValue: mockPortoneService },
        { provide: PaymentService, useValue: mockPaymentService },
      ],
    }).compile();

    controller = module.get<PortoneWebhookController>(PortoneWebhookController);
  });

  it('유효 서명 Transaction.Paid → API 재조회·동기화 / Valid signature → API re-fetch and sync', async () => {
    const body = JSON.stringify({
      type: 'Transaction.Paid',
      data: {
        paymentId: 'portone_wh_1',
        storeId: 'store-e2e12345678',
      },
    });
    const ts = String(Math.floor(Date.now() / 1000));
    const sig = generateSignature('msg_e2e_1', ts, body);

    const remotePayment = {
      id: 'portone_wh_1',
      storeId: 'store-e2e12345678',
      status: 'PAID',
      currency: 'KRW',
      amount: { total: 50000, paid: 50000 },
    };
    mockPortoneService.getPayment.mockResolvedValue(remotePayment);

    const req: any = { rawBody: Buffer.from(body), body: JSON.parse(body) };
    const res = mockRes();

    await controller.handleWebhook(req, res, 'msg_e2e_1', ts, sig);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(
      mockPaymentService.synchronizePaymentFromWebhook,
    ).toHaveBeenCalledWith(remotePayment, {
      webhookId: 'msg_e2e_1',
      eventType: 'Transaction.Paid',
    });
    expect(mockPaymentService.completeWebhookEvent).toHaveBeenCalledWith(
      'msg_e2e_1',
    );
  });

  it('잘못된 서명 → 400 거부 / Invalid signature → 400 rejected', async () => {
    const body = JSON.stringify({
      type: 'Transaction.Paid',
      data: {
        paymentId: 'portone_wh_2',
        storeId: 'store-e2e12345678',
      },
    });
    const ts = String(Math.floor(Date.now() / 1000));

    const req: any = { rawBody: Buffer.from(body), body: JSON.parse(body) };
    const res = mockRes();

    await controller.handleWebhook(req, res, 'msg_e2e_2', ts, 'v1,FAKE_SIG');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockPaymentService.beginWebhookEvent).not.toHaveBeenCalled();
  });
});
