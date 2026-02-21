import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PortoneService } from './portone.service';

// fetch 목킹 / Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch as any;

describe('PortoneService', () => {
  let service: PortoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortoneService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string, fallback?: string) => {
              if (key === 'PORTONE_V2_API_SECRET') return 'test-api-secret';
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

    it('포트원 API 오류 시 InternalServerError / should throw on API error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: () => Promise.resolve('Server Error'),
      });

      await expect(service.getPayment('payment_123')).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('타임아웃 시 InternalServerError / should throw on timeout (AbortError)', async () => {
      const abortError = new Error('The operation was aborted');
      abortError.name = 'AbortError';
      mockFetch.mockRejectedValueOnce(abortError);

      try {
        await service.getPayment('payment_123');
        fail('Should have thrown');
      } catch (err) {
        expect(err).toBeInstanceOf(InternalServerErrorException);
        expect(err.message).toMatch(/타임아웃|timeout/i);
      }
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
            status: 'PAID',
            amount: { total: 50000, taxFree: 0 },
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
            status: 'FAILED',
            amount: { total: 50000, taxFree: 0 },
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
            cancellation: { status: 'CANCELLED', totalAmount: 50000 },
          }),
      });

      const result = await service.cancelPayment('payment_123', '단순 변심');
      expect(result.status).toBe('CANCELLED');
      expect(result.cancelledAmount).toBe(50000);
    });

    it('취소 API 오류 시 InternalServerError / should throw on cancel API error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: () => Promise.resolve('Already cancelled'),
      });

      await expect(
        service.cancelPayment('payment_123', '단순 변심'),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
