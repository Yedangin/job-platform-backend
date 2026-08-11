import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, BadGatewayException } from '@nestjs/common';
import { PortoneService } from './portone.service';

// fetch 목킹 / Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch as any;

describe('PortoneService', () => {
  let service: PortoneService;
  const storeId = 'store-1234567890abcdef';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortoneService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string, fallback?: string) => {
              if (key === 'PORTONE_V2_API_SECRET')
                return 'live_secret_12345678901234567890';
              if (key === 'PORTONE_STORE_ID') return storeId;
              if (key === 'PORTONE_CHANNEL_KEY')
                return 'channel-key-1234567890abcdef';
              if (key === 'NODE_ENV') return 'test';
              return fallback;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<PortoneService>(PortoneService);
    mockFetch.mockReset();
  });

  // ================================================
  // getPayment
  // ================================================
  describe('getPayment', () => {
    it('결제 정보를 정상 반환해야 한다 / should return payment data', async () => {
      const mockResponse = {
        id: 'payment_123',
        storeId,
        currency: 'KRW',
        status: 'PAID',
        amount: { total: 50000, taxFree: 0 },
        method: { type: 'Card', card: { name: '신한카드' } },
        paidAt: '2026-01-01T00:00:00Z',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await service.getPayment('payment_123');
      expect(result.status).toBe('PAID');
      expect(result.amount.total).toBe(50000);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('포트원 API 오류 시 BadGateway / should throw on API error', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ type: 'INTERNAL_ERROR' }),
      });

      await expect(service.getPayment('payment_123')).rejects.toThrow(
        BadGatewayException,
      );
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it('타임아웃 시 재시도 후 BadGateway / should retry timeout', async () => {
      const abortError = new Error('The operation was aborted');
      abortError.name = 'AbortError';
      mockFetch.mockRejectedValue(abortError);

      await expect(service.getPayment('payment_123')).rejects.toThrow(
        BadGatewayException,
      );
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });
  });

  // ================================================
  // verifyPayment
  // ================================================
  describe('verifyPayment', () => {
    it('결제 성공 검증 / should verify successful payment', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'payment_123',
            storeId,
            currency: 'KRW',
            status: 'PAID',
            amount: { total: 50000, taxFree: 0 },
            paidAt: '2026-01-01T00:00:00Z',
          }),
      });

      const result = await service.verifyPayment('payment_123', 50000);
      expect(result.status).toBe('PAID');
      expect(result.amount.total).toBe(50000);
    });

    it('금액 불일치 시 BadRequest (위변조) / should reject mismatched amount (tampering)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'payment_123',
            storeId,
            currency: 'KRW',
            status: 'PAID',
            amount: { total: 10000, taxFree: 0 },
          }),
      });

      await expect(service.verifyPayment('payment_123', 50000)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('결제 미완료 상태 시 BadRequest / should reject non-PAID status', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'payment_123',
            storeId,
            currency: 'KRW',
            status: 'FAILED',
            amount: { total: 50000, taxFree: 0 },
          }),
      });

      await expect(service.verifyPayment('payment_123', 50000)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('다른 상점 결제를 거부 / should reject another store payment', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'payment_123',
            storeId: 'store-other1234567890',
            currency: 'KRW',
            status: 'PAID',
            amount: { total: 50000 },
            paidAt: '2026-01-01T00:00:00Z',
          }),
      });

      await expect(service.verifyPayment('payment_123', 50000)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('PAID 응답의 완료 시각 누락을 거부 / should reject PAID without paidAt', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'payment_123',
            storeId,
            currency: 'KRW',
            status: 'PAID',
            amount: { total: 50000 },
          }),
      });

      await expect(service.verifyPayment('payment_123', 50000)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // ================================================
  // cancelPayment
  // ================================================
  describe('cancelPayment', () => {
    it('결제 취소 성공 / should cancel payment successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            cancellation: {
              id: 'cancel_123',
              status: 'SUCCEEDED',
              totalAmount: 50000,
            },
          }),
      });

      const result = await service.cancelPayment(
        'payment_123',
        '단순 변심',
        undefined,
        'cancel_1234567890abcdef',
        50000,
      );
      expect(result.status).toBe('SUCCEEDED');
      expect(result.cancelledAmount).toBe(50000);
      const [, request] = mockFetch.mock.calls[0];
      expect(request.headers['Idempotency-Key']).toBe(
        '"cancel_1234567890abcdef"',
      );
      expect(JSON.parse(request.body)).toEqual(
        expect.objectContaining({
          storeId,
          reason: '단순 변심',
          currentCancellableAmount: 50000,
        }),
      );
    });

    it('취소 API 4xx는 재시도하지 않는다', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ type: 'PAYMENT_ALREADY_CANCELLED' }),
      });

      await expect(
        service.cancelPayment(
          'payment_123',
          '단순 변심',
          undefined,
          'cancel_1234567890abcdef',
          50000,
        ),
      ).rejects.toThrow(BadGatewayException);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('취소 재시도에도 같은 멱등 키를 유지 / should keep the idempotency key on retry', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          json: () => Promise.resolve({ type: 'INTERNAL_ERROR' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () =>
            Promise.resolve({
              cancellation: {
                id: 'cancel_retry',
                status: 'SUCCEEDED',
                totalAmount: 50000,
              },
            }),
        });

      await service.cancelPayment(
        'payment_123',
        '재시도 검증',
        undefined,
        'cancel_retry_1234567890',
        50000,
      );

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(mockFetch.mock.calls[0][1].headers['Idempotency-Key']).toBe(
        '"cancel_retry_1234567890"',
      );
      expect(mockFetch.mock.calls[1][1].headers['Idempotency-Key']).toBe(
        '"cancel_retry_1234567890"',
      );
    });
  });

  it('운영 환경의 플레이스홀더 키는 시작 즉시 거부 / should fail fast for production placeholders', () => {
    const config = {
      get: jest.fn((key: string, fallback?: string) => {
        if (key === 'NODE_ENV') return 'production';
        if (key === 'PORTONE_V2_API_SECRET') return 'replace_with_secret';
        if (key === 'PORTONE_STORE_ID') return 'store-placeholder-value';
        if (key === 'PORTONE_CHANNEL_KEY')
          return 'channel-key-placeholder-value';
        return fallback;
      }),
    };

    expect(() => new PortoneService(config as any)).toThrow(
      'Invalid production PortOne configuration',
    );
  });
});
