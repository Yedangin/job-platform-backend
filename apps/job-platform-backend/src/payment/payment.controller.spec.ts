import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

class MockRedisService {}

jest.mock('libs/common/src', () => ({
  RedisService: MockRedisService,
  Session: createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const authorization = req.headers.authorization as string | undefined;
    return authorization?.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length)
      : undefined;
  }),
}));

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ProductService } from './product.service';
import { CouponService } from './coupon.service';
import { ViewingCreditService } from './viewing-credit.service';

describe('PaymentController', () => {
  const paymentService = {
    createOrder: jest.fn(),
    confirmPayment: jest.fn(),
    getOrder: jest.fn(),
    getMyOrders: jest.fn(),
    cancelPayment: jest.fn(),
  };
  const productService = { findAll: jest.fn(), findByCode: jest.fn() };
  const couponService = { validateForProduct: jest.fn() };
  const viewingCreditService = {
    getBalance: jest.fn(),
    useCredit: jest.fn(),
    getViewingHistory: jest.fn(),
  };
  const redisService = {
    get: jest.fn().mockResolvedValue(
      JSON.stringify({
        userId: 'user-1',
        email: 'user@example.com',
        role: 'CORPORATE',
      }),
    ),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    redisService.get.mockResolvedValue(
      JSON.stringify({ userId: 'user-1', role: 'CORPORATE' }),
    );
  });

  async function createApp() {
    const moduleRef = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        { provide: PaymentService, useValue: paymentService },
        { provide: ProductService, useValue: productService },
        { provide: CouponService, useValue: couponService },
        { provide: ViewingCreditService, useValue: viewingCreditService },
        { provide: MockRedisService, useValue: redisService },
      ],
    }).compile();
    const app = moduleRef.createNestApplication();
    await app.init();
    return app;
  }

  it('정적 orders/my 경로를 주문 ID로 오인하지 않는다', async () => {
    const app = await createApp();
    paymentService.getMyOrders.mockResolvedValue({
      orders: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    });

    await request(app.getHttpServer())
      .get('/payments/orders/my')
      .set('Authorization', 'Bearer session-1')
      .expect(200);

    expect(paymentService.getMyOrders).toHaveBeenCalledWith('user-1', 1, 20);
    expect(paymentService.getOrder).not.toHaveBeenCalled();
    await app.close();
  });

  it('결제 확인에 세션 사용자 ID를 전달한다', async () => {
    const app = await createApp();
    paymentService.confirmPayment.mockResolvedValue({ status: 'PAID' });

    await request(app.getHttpServer())
      .post('/payments/orders/42/confirm')
      .set('Authorization', 'Bearer session-1')
      .send({ portonePaymentId: 'pay_1234567890123456' })
      .expect(201);

    expect(paymentService.confirmPayment).toHaveBeenCalledWith(
      42,
      'pay_1234567890123456',
      'user-1',
    );
    await app.close();
  });

  it('개인회원은 기업용 주문을 생성할 수 없다', async () => {
    const app = await createApp();
    redisService.get.mockResolvedValue(
      JSON.stringify({ userId: 'individual-1', role: 'INDIVIDUAL' }),
    );

    await request(app.getHttpServer())
      .post('/payments/orders')
      .set('Authorization', 'Bearer session-1')
      .send({ productCode: 'VIEW_10' })
      .expect(403);

    expect(paymentService.createOrder).not.toHaveBeenCalled();
    await app.close();
  });
});
