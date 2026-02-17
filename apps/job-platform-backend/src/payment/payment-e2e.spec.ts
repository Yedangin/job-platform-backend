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
    id: 1, code: 'JOB_PREMIUM', name: '프리미엄 공고', nameEn: 'Premium Job',
    category: 'JOB_POSTING', price: 50000, isActive: true,
    metadata: JSON.stringify({
      standardDays: { partTime: 14, fullTime: 30 },
      premiumDays: { partTime: 30, fullTime: 60 },
    }),
  },
  VIEW_30: {
    id: 4, code: 'VIEW_30', name: '인재 열람 프로', nameEn: 'Pro Talent View',
    category: 'TALENT_VIEW', price: 60000, isActive: true,
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
      order: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
      payment: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
      $transaction: jest.fn((arr) => Promise.resolve(arr.map(() => ({})))),
    };
    mockAuthPrisma = {
      jobPosting: { findUnique: jest.fn(), update: jest.fn() },
    };
    mockPortoneService = {
      getPayment: jest.fn(),
      verifyPayment: jest.fn(),
      cancelPayment: jest.fn(),
    };
    mockProductService = { findActiveByCode: jest.fn() };
    mockCouponService = {
      validate: jest.fn(), calculateDiscount: jest.fn(), recordUsage: jest.fn(),
    };
    mockViewingCreditService = {
      grantCredits: jest.fn(), rollbackCredits: jest.fn(),
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
    // STEP 1: 주문 생성 / Create order
    mockProductService.findActiveByCode.mockResolvedValue(PRODUCTS.JOB_PREMIUM);
    mockPaymentPrisma.order.create.mockResolvedValue({
      id: 1,
      orderNo: 'ORD-20260214-PREM1',
      totalAmount: 50000,
      originalAmount: 50000,
      product: PRODUCTS.JOB_PREMIUM,
    });

    const order = await paymentService.createOrder('biz-user-1', 'JOB_PREMIUM', 42);
    expect(order.totalAmount).toBe(50000);
    expect(order.productName).toBe('프리미엄 공고');

    // STEP 2: 결제 확인 / Confirm payment
    mockPaymentPrisma.order.findUnique.mockResolvedValue({
      id: 1,
      orderNo: 'ORD-20260214-PREM1',
      userId: 'biz-user-1',
      status: 'PENDING',
      totalAmount: 50000,
      couponId: null,
      payment: null,
      product: PRODUCTS.JOB_PREMIUM,
      targetJobId: BigInt(42),
    });
    mockPortoneService.verifyPayment.mockResolvedValue({
      status: 'PAID',
      amount: { total: 50000 },
      method: { type: 'Card', card: { name: '신한카드' } },
      paidAt: '2026-02-14T12:00:00Z',
    });
    mockPaymentPrisma.$transaction.mockResolvedValue([
      { id: 1, portonePaymentId: 'portone_prem_1', status: 'PAID' },
      { id: 1, status: 'PAID' },
    ]);
    mockAuthPrisma.jobPosting.findUnique.mockResolvedValue({
      id: BigInt(42),
      boardType: 'FULL_TIME',
      tierType: 'STANDARD',
    });
    mockAuthPrisma.jobPosting.update.mockResolvedValue({});

    const confirm = await paymentService.confirmPayment(1, 'portone_prem_1');
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
      order: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
      payment: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
      viewingCredit: { create: jest.fn(), findMany: jest.fn(), findFirst: jest.fn(), update: jest.fn(), delete: jest.fn() },
      viewingLog: { findFirst: jest.fn(), create: jest.fn() },
      $transaction: jest.fn((arr) => Promise.resolve(arr.map(() => ({})))),
    };
    mockAuthPrisma = {
      jobPosting: { findUnique: jest.fn(), update: jest.fn() },
    };
    mockPortoneService = {
      getPayment: jest.fn(), verifyPayment: jest.fn(), cancelPayment: jest.fn(),
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
        { provide: CouponService, useValue: { validate: jest.fn(), calculateDiscount: jest.fn(), recordUsage: jest.fn() } },
      ],
    }).compile();

    paymentService = module.get<PaymentService>(PaymentService);
    viewingCreditService = module.get<ViewingCreditService>(ViewingCreditService);
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
    mockPaymentPrisma.order.findUnique.mockResolvedValue({
      id: 10,
      userId: 'biz-user-2',
      status: 'PENDING',
      totalAmount: 60000,
      couponId: null,
      payment: null,
      product: PRODUCTS.VIEW_30,
      targetJobId: null,
    });
    mockPortoneService.verifyPayment.mockResolvedValue({
      status: 'PAID',
      amount: { total: 60000 },
      method: { type: 'Card' },
    });
    mockPaymentPrisma.$transaction.mockResolvedValue([{}, {}]);
    mockPaymentPrisma.viewingCredit.create.mockResolvedValue({
      id: 1, totalCredits: 30, usedCredits: 0, source: 'VIEW_30',
    });

    await paymentService.confirmPayment(10, 'portone_view_1');

    // 크레딧 부여 확인 / Verify credit grant
    expect(mockPaymentPrisma.viewingCredit.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId: 'biz-user-2',
        totalCredits: 30,
        usedCredits: 0,
        source: 'VIEW_30',
      }),
    });

    // STEP 3: 열람권 1건 사용 / Use 1 credit
    mockPaymentPrisma.viewingLog.findFirst.mockResolvedValue(null);
    mockPaymentPrisma.viewingCredit.findMany
      .mockResolvedValueOnce([
        { id: 1, totalCredits: 30, usedCredits: 0, expiresAt: new Date('2027-01-01') },
      ])
      .mockResolvedValueOnce([
        { id: 1, totalCredits: 30, usedCredits: 1, expiresAt: new Date('2027-01-01') },
      ]);

    const use1 = await viewingCreditService.useCredit('biz-user-2', 100);
    expect(use1.success).toBe(true);
    expect(use1.remainingCredits).toBe(29);

    // STEP 4: 같은 이력서 재열람 → 차감 없음 / Re-view same resume → no deduction
    mockPaymentPrisma.viewingLog.findFirst.mockResolvedValue({ id: 1 });
    mockPaymentPrisma.viewingCredit.findMany.mockResolvedValue([
      { id: 1, totalCredits: 30, usedCredits: 1, expiresAt: new Date('2027-01-01') },
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
    id: 1, code: 'WELCOME_VIEW_5', name: '회원가입 축하 열람 5건',
    type: 'FREE_ITEM', value: 5, targetProduct: 'TALENT_VIEW',
    minOrderAmount: null, maxUses: null, usedCount: 0, maxUsesPerUser: 1,
    startsAt: new Date('2025-01-01'), expiresAt: new Date('2027-01-01'), isActive: true,
  };

  const firstPostCoupon = {
    id: 2, code: 'FIRST_POST_VIEW_5', name: '첫 공고 축하 열람 5건',
    type: 'FREE_ITEM', value: 5, targetProduct: 'TALENT_VIEW',
    minOrderAmount: null, maxUses: null, usedCount: 0, maxUsesPerUser: 1,
    startsAt: new Date('2025-01-01'), expiresAt: new Date('2027-01-01'), isActive: true,
  };

  beforeEach(async () => {
    mockPaymentPrisma = {
      coupon: { findUnique: jest.fn(), update: jest.fn() },
      couponUsage: { count: jest.fn(), findFirst: jest.fn(), create: jest.fn() },
      viewingCredit: { create: jest.fn(), findMany: jest.fn(), findFirst: jest.fn(), update: jest.fn(), delete: jest.fn() },
      viewingLog: { findFirst: jest.fn(), create: jest.fn() },
      $transaction: jest.fn((arr) => Promise.resolve(arr.map(() => ({})))),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CouponService,
        ViewingCreditService,
        { provide: MockPaymentPrismaService, useValue: mockPaymentPrisma },
      ],
    }).compile();

    couponService = module.get<CouponService>(CouponService);
    viewingCreditService = module.get<ViewingCreditService>(ViewingCreditService);
  });

  it('환영 쿠폰 5건 → 첫 공고 쿠폰 5건 → 열람 5건 사용 → 잔여 5건 / Welcome + first post + use 5', async () => {
    // STEP 1: 환영 쿠폰 발급 / Grant welcome coupon
    mockPaymentPrisma.coupon.findUnique.mockResolvedValue(welcomeCoupon);
    mockPaymentPrisma.couponUsage.findFirst.mockResolvedValue(null);
    mockPaymentPrisma.viewingCredit.create.mockResolvedValue({
      id: 1, totalCredits: 5, usedCredits: 0, source: 'COUPON:WELCOME',
    });

    const welcome = await couponService.grantWelcomeCoupons('new-user-1');
    expect(welcome).toEqual({ credits: 5, source: 'COUPON:WELCOME' });

    // STEP 2: 첫 공고 쿠폰 발급 / Grant first post coupon
    mockPaymentPrisma.coupon.findUnique.mockResolvedValue(firstPostCoupon);
    mockPaymentPrisma.couponUsage.findFirst.mockResolvedValue(null);
    mockPaymentPrisma.viewingCredit.create.mockResolvedValue({
      id: 2, totalCredits: 5, usedCredits: 0, source: 'COUPON:FIRST_POST',
    });

    const firstPost = await couponService.grantFirstPostCoupons('new-user-1', 1);
    expect(firstPost).toEqual({ credits: 5, source: 'COUPON:FIRST_POST' });

    // STEP 3: 열람 5건 사용 / Use 5 credits
    for (let i = 0; i < 5; i++) {
      mockPaymentPrisma.viewingLog.findFirst.mockResolvedValue(null);
      mockPaymentPrisma.viewingCredit.findMany
        .mockResolvedValueOnce([
          { id: 1, totalCredits: 5, usedCredits: i, expiresAt: new Date('2027-01-01') },
          { id: 2, totalCredits: 5, usedCredits: 0, expiresAt: new Date('2027-03-01') },
        ])
        .mockResolvedValueOnce([
          { id: 1, totalCredits: 5, usedCredits: i + 1, expiresAt: new Date('2027-01-01') },
          { id: 2, totalCredits: 5, usedCredits: 0, expiresAt: new Date('2027-03-01') },
        ]);

      const result = await viewingCreditService.useCredit('new-user-1', 200 + i);
      expect(result.success).toBe(true);
    }

    // STEP 4: 잔여 확인 → 5건 (첫 공고 쿠폰 미사용) / Verify remaining = 5
    mockPaymentPrisma.viewingCredit.findMany.mockResolvedValue([
      { id: 1, totalCredits: 5, usedCredits: 5, expiresAt: new Date('2027-01-01') },
      { id: 2, totalCredits: 5, usedCredits: 0, expiresAt: new Date('2027-03-01') },
    ]);

    const remaining = await viewingCreditService.getRemainingCredits('new-user-1');
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
      order: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
      payment: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
      $transaction: jest.fn((arr) => Promise.resolve(arr.map(() => ({})))),
    };
    mockAuthPrisma = {
      jobPosting: { findUnique: jest.fn(), update: jest.fn() },
    };
    mockPortoneService = {
      getPayment: jest.fn(), verifyPayment: jest.fn(), cancelPayment: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: MockPaymentPrismaService, useValue: mockPaymentPrisma },
        { provide: MockAuthPrismaService, useValue: mockAuthPrisma },
        { provide: PortoneService, useValue: mockPortoneService },
        { provide: ProductService, useValue: { findActiveByCode: jest.fn() } },
        { provide: CouponService, useValue: { validate: jest.fn(), calculateDiscount: jest.fn(), recordUsage: jest.fn() } },
        { provide: ViewingCreditService, useValue: { grantCredits: jest.fn(), rollbackCredits: jest.fn() } },
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
      product: PRODUCTS.JOB_PREMIUM,
      payment: { id: 5, portonePaymentId: 'portone_refund_1', paidAmount: 50000 },
      targetJobId: BigInt(99),
    };

    mockPaymentPrisma.order.findUnique.mockResolvedValue(paidOrder);
    mockPortoneService.cancelPayment.mockResolvedValue({
      status: 'CANCELLED',
      cancelledAmount: 50000,
    });
    mockPaymentPrisma.$transaction.mockResolvedValue([{}, {}]);
    mockAuthPrisma.jobPosting.update.mockResolvedValue({});

    // 환불 실행 / Execute refund
    const result = await paymentService.cancelPayment(5, 'biz-user-3', '서비스 불만족');
    expect(result.status).toBe('CANCELLED');

    // 포트원 환불 호출 확인 / Verify PortOne cancel called
    expect(mockPortoneService.cancelPayment).toHaveBeenCalledWith(
      'portone_refund_1',
      '서비스 불만족',
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
    mockPortoneService = { getPayment: jest.fn() };
    mockPaymentService = {
      handleWebhookPaid: jest.fn().mockResolvedValue(undefined),
      handleWebhookCancelled: jest.fn().mockResolvedValue(undefined),
      handleWebhookFailed: jest.fn().mockResolvedValue(undefined),
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

  it('유효 서명 Transaction.Paid → handleWebhookPaid 호출 / Valid signature → paid handler called', async () => {
    const body = JSON.stringify({
      type: 'Transaction.Paid',
      data: { paymentId: 'portone_wh_1' },
    });
    const ts = String(Math.floor(Date.now() / 1000));
    const sig = generateSignature('msg_e2e_1', ts, body);

    mockPortoneService.getPayment.mockResolvedValue({ status: 'PAID' });

    const req: any = { rawBody: Buffer.from(body), body: JSON.parse(body) };
    const res = mockRes();

    await controller.handleWebhook(req, res, 'msg_e2e_1', ts, sig);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockPaymentService.handleWebhookPaid).toHaveBeenCalledWith(
      'portone_wh_1',
      expect.objectContaining({ paymentId: 'portone_wh_1' }),
    );
  });

  it('잘못된 서명 → 400 거부 / Invalid signature → 400 rejected', async () => {
    const body = JSON.stringify({
      type: 'Transaction.Paid',
      data: { paymentId: 'portone_wh_2' },
    });
    const ts = String(Math.floor(Date.now() / 1000));

    const req: any = { rawBody: Buffer.from(body), body: JSON.parse(body) };
    const res = mockRes();

    await controller.handleWebhook(req, res, 'msg_e2e_2', ts, 'v1,FAKE_SIG');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockPaymentService.handleWebhookPaid).not.toHaveBeenCalled();
  });
});
