import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';

// Prisma 서비스 목킹 / Mock Prisma services (avoid generated module resolution)
jest.mock('libs/common/src', () => {
  class _PaymentPrismaService {}
  class _AuthPrismaService {}
  return {
    PaymentPrismaService: _PaymentPrismaService,
    AuthPrismaService: _AuthPrismaService,
    SkipCsrf: () => () => undefined,
  };
});

import { PortoneWebhookController } from './portone-webhook.controller';
import { PortoneService } from './portone.service';
import { PaymentService } from './payment.service';

describe('PortoneWebhookController', () => {
  let controller: PortoneWebhookController;
  let mockPortoneService: any;
  let mockPaymentService: any;

  // 테스트용 웹훅 시크릿 (base64) / Test webhook secret
  const rawSecret = Buffer.from('test-webhook-secret-key-1234');
  const webhookSecret = `whsec_${rawSecret.toString('base64')}`;
  const storeId = 'store-1234567890abcdef';

  /**
   * 유효한 서명 생성 헬퍼 / Generate valid signature helper
   */
  function generateValidSignature(
    webhookId: string,
    timestamp: string,
    body: string,
  ): string {
    const secretBytes = Buffer.from(
      webhookSecret.replace(/^whsec_/, ''),
      'base64',
    );
    const signedContent = `${webhookId}.${timestamp}.${body}`;
    const sig = createHmac('sha256', secretBytes)
      .update(signedContent)
      .digest('base64');
    return `v1,${sig}`;
  }

  /**
   * Mock Response 객체 생성 / Create mock Response
   */
  function createMockRes() {
    const res: any = {
      statusCode: 200,
      body: null,
      status: jest.fn().mockImplementation((code: number) => {
        res.statusCode = code;
        return res;
      }),
      json: jest.fn().mockImplementation((data: any) => {
        res.body = data;
        return res;
      }),
    };
    return res;
  }

  beforeEach(async () => {
    mockPortoneService = {
      getPayment: jest.fn(),
      getStoreId: jest.fn().mockReturnValue(storeId),
    };

    mockPaymentService = {
      beginWebhookEvent: jest.fn().mockResolvedValue('PROCESS'),
      completeWebhookEvent: jest.fn().mockResolvedValue(undefined),
      failWebhookEvent: jest.fn().mockResolvedValue(undefined),
      synchronizePaymentFromWebhook: jest.fn().mockResolvedValue('SYNCED'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortoneWebhookController],
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string, fallback?: string) => {
              if (key === 'PORTONE_WEBHOOK_SECRET') return webhookSecret;
              if (key === 'NODE_ENV') return 'test';
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

  // ================================================
  // 서명 검증 / Signature verification
  // ================================================
  describe('Signature verification', () => {
    it('유효한 서명 → 200 / should accept valid signature', async () => {
      const body = JSON.stringify({
        type: 'Transaction.Paid',
        data: { paymentId: 'pay_123', storeId },
      });
      const webhookId = 'msg_test123';
      const timestamp = String(Math.floor(Date.now() / 1000));
      const signature = generateValidSignature(webhookId, timestamp, body);

      mockPortoneService.getPayment.mockResolvedValue({
        status: 'PAID',
        amount: { total: 50000 },
      });

      const req: any = {
        rawBody: Buffer.from(body),
        body: JSON.parse(body),
      };
      const res = createMockRes();

      await controller.handleWebhook(req, res, webhookId, timestamp, signature);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ ok: true });
    });

    it('잘못된 서명 → 400 / should reject invalid signature', async () => {
      const body = JSON.stringify({
        type: 'Transaction.Paid',
        data: { paymentId: 'pay_123', storeId },
      });
      const webhookId = 'msg_test123';
      const timestamp = String(Math.floor(Date.now() / 1000));

      const req: any = {
        rawBody: Buffer.from(body),
        body: JSON.parse(body),
      };
      const res = createMockRes();

      await controller.handleWebhook(
        req,
        res,
        webhookId,
        timestamp,
        'v1,invalid_signature_base64',
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid signature' });
    });

    it('만료된 타임스탬프 → 400 / should reject expired timestamp', async () => {
      const body = JSON.stringify({
        type: 'Transaction.Paid',
        data: { paymentId: 'pay_123', storeId },
      });
      const webhookId = 'msg_test456';
      // 10분 전 타임스탬프 (5분 허용 초과)
      const oldTimestamp = String(Math.floor(Date.now() / 1000) - 600);
      const signature = generateValidSignature(webhookId, oldTimestamp, body);

      const req: any = {
        rawBody: Buffer.from(body),
        body: JSON.parse(body),
      };
      const res = createMockRes();

      await controller.handleWebhook(
        req,
        res,
        webhookId,
        oldTimestamp,
        signature,
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid timestamp' });
    });
  });

  // ================================================
  // Transaction.Paid 이벤트 / Transaction.Paid event
  // ================================================
  describe('Transaction.Paid', () => {
    it('정상 결제 웹훅 처리 / should handle paid webhook', async () => {
      const body = JSON.stringify({
        type: 'Transaction.Paid',
        data: { paymentId: 'pay_123', storeId },
      });
      const webhookId = 'msg_paid1';
      const timestamp = String(Math.floor(Date.now() / 1000));
      const signature = generateValidSignature(webhookId, timestamp, body);

      mockPortoneService.getPayment.mockResolvedValue({
        status: 'PAID',
        amount: { total: 50000 },
      });

      const req: any = {
        rawBody: Buffer.from(body),
        body: JSON.parse(body),
      };
      const res = createMockRes();

      await controller.handleWebhook(req, res, webhookId, timestamp, signature);
      expect(
        mockPaymentService.synchronizePaymentFromWebhook,
      ).toHaveBeenCalledWith(expect.objectContaining({ status: 'PAID' }), {
        webhookId,
        eventType: 'Transaction.Paid',
      });
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // ================================================
  // Transaction.Cancelled 이벤트 / Transaction.Cancelled event
  // ================================================
  describe('Transaction.Cancelled', () => {
    it('취소 웹훅 처리 / should handle cancelled webhook', async () => {
      const body = JSON.stringify({
        type: 'Transaction.Cancelled',
        data: { paymentId: 'pay_789', storeId },
      });
      const webhookId = 'msg_cancel1';
      const timestamp = String(Math.floor(Date.now() / 1000));
      const signature = generateValidSignature(webhookId, timestamp, body);

      mockPortoneService.getPayment.mockResolvedValue({
        status: 'CANCELLED',
      });

      const req: any = {
        rawBody: Buffer.from(body),
        body: JSON.parse(body),
      };
      const res = createMockRes();

      await controller.handleWebhook(req, res, webhookId, timestamp, signature);
      expect(
        mockPaymentService.synchronizePaymentFromWebhook,
      ).toHaveBeenCalledWith(expect.objectContaining({ status: 'CANCELLED' }), {
        webhookId,
        eventType: 'Transaction.Cancelled',
      });
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // ================================================
  // Transaction.Failed 이벤트 / Transaction.Failed event
  // ================================================
  describe('Transaction.Failed', () => {
    it('실패 웹훅 처리 / should handle failed webhook', async () => {
      const body = JSON.stringify({
        type: 'Transaction.Failed',
        data: { paymentId: 'pay_fail1', storeId },
      });
      const webhookId = 'msg_fail1';
      const timestamp = String(Math.floor(Date.now() / 1000));
      const signature = generateValidSignature(webhookId, timestamp, body);

      mockPortoneService.getPayment.mockResolvedValue({
        status: 'FAILED',
      });

      const req: any = {
        rawBody: Buffer.from(body),
        body: JSON.parse(body),
      };
      const res = createMockRes();

      await controller.handleWebhook(req, res, webhookId, timestamp, signature);
      expect(
        mockPaymentService.synchronizePaymentFromWebhook,
      ).toHaveBeenCalledWith(expect.objectContaining({ status: 'FAILED' }), {
        webhookId,
        eventType: 'Transaction.Failed',
      });
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // ================================================
  // 엣지 케이스 / Edge cases
  // ================================================
  describe('Edge cases', () => {
    it('raw body가 없으면 서명 검증을 거부한다', async () => {
      const res = createMockRes();
      await controller.handleWebhook(
        { body: {} } as any,
        res,
        'msg_no_raw',
        String(Math.floor(Date.now() / 1000)),
        'v1,unused',
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(mockPaymentService.beginWebhookEvent).not.toHaveBeenCalled();
    });

    it('서명된 잘못된 JSON은 400으로 종료 / should reject signed malformed JSON', async () => {
      const body = '{"type":"Transaction.Paid"';
      const webhookId = 'msg_bad_json';
      const timestamp = String(Math.floor(Date.now() / 1000));
      const res = createMockRes();

      await controller.handleWebhook(
        { rawBody: Buffer.from(body) } as any,
        res,
        webhookId,
        timestamp,
        generateValidSignature(webhookId, timestamp, body),
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid JSON payload' });
      expect(mockPaymentService.beginWebhookEvent).not.toHaveBeenCalled();
    });

    it('영속 처리 완료된 웹훅은 API 재조회 없이 200 처리한다', async () => {
      const body = JSON.stringify({
        type: 'Transaction.Paid',
        data: { paymentId: 'pay_duplicate', storeId },
      });
      const webhookId = 'msg_duplicate';
      const timestamp = String(Math.floor(Date.now() / 1000));
      mockPaymentService.beginWebhookEvent.mockResolvedValue('DUPLICATE');
      const res = createMockRes();

      await controller.handleWebhook(
        { rawBody: Buffer.from(body), body: JSON.parse(body) } as any,
        res,
        webhookId,
        timestamp,
        generateValidSignature(webhookId, timestamp, body),
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(mockPortoneService.getPayment).not.toHaveBeenCalled();
    });

    it('다른 Store의 서명된 웹훅도 거부한다', async () => {
      const body = JSON.stringify({
        type: 'Transaction.Paid',
        data: { paymentId: 'pay_wrong_store', storeId: 'store-attacker' },
      });
      const webhookId = 'msg_wrong_store';
      const timestamp = String(Math.floor(Date.now() / 1000));
      const res = createMockRes();

      await controller.handleWebhook(
        { rawBody: Buffer.from(body), body: JSON.parse(body) } as any,
        res,
        webhookId,
        timestamp,
        generateValidSignature(webhookId, timestamp, body),
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(mockPaymentService.beginWebhookEvent).not.toHaveBeenCalled();
    });

    it('Transaction paymentId가 없으면 400 / should reject missing paymentId', async () => {
      const body = JSON.stringify({
        type: 'Transaction.Paid',
        data: { storeId },
      });
      const webhookId = 'msg_noid';
      const timestamp = String(Math.floor(Date.now() / 1000));
      const signature = generateValidSignature(webhookId, timestamp, body);

      const req: any = {
        rawBody: Buffer.from(body),
        body: JSON.parse(body),
      };
      const res = createMockRes();

      await controller.handleWebhook(req, res, webhookId, timestamp, signature);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(
        mockPaymentService.synchronizePaymentFromWebhook,
      ).not.toHaveBeenCalled();
    });

    it('포트원 조회 실패 → 500 / should return 500 on PortOne lookup failure', async () => {
      const body = JSON.stringify({
        type: 'Transaction.Paid',
        data: { paymentId: 'pay_err', storeId },
      });
      const webhookId = 'msg_err';
      const timestamp = String(Math.floor(Date.now() / 1000));
      const signature = generateValidSignature(webhookId, timestamp, body);

      mockPortoneService.getPayment.mockRejectedValue(
        new Error('PortOne API error'),
      );

      const req: any = {
        rawBody: Buffer.from(body),
        body: JSON.parse(body),
      };
      const res = createMockRes();

      await controller.handleWebhook(req, res, webhookId, timestamp, signature);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Internal error',
      });
      expect(mockPaymentService.failWebhookEvent).toHaveBeenCalledWith(
        webhookId,
      );
    });
  });

  it('운영 환경에서 잘못된 웹훅 키는 시작 즉시 거부 / should fail fast for an invalid production webhook secret', () => {
    const config = {
      get: jest.fn((key: string, fallback?: string) => {
        if (key === 'NODE_ENV') return 'production';
        if (key === 'PORTONE_WEBHOOK_SECRET') return 'replace-me';
        return fallback;
      }),
    };

    expect(
      () =>
        new PortoneWebhookController(
          config as any,
          mockPortoneService,
          mockPaymentService,
        ),
    ).toThrow('Invalid production PORTONE_WEBHOOK_SECRET');
  });
});
