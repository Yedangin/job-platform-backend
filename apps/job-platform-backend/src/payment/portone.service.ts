import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * 포트원 V2 결제 응답 타입
 * PortOne V2 payment response type
 */
export interface PortonePaymentResponse {
  status: string; // PAID, CANCELLED, FAILED, etc.
  id: string;
  amount: {
    total: number;
    taxFree: number;
  };
  method?: {
    type: string; // Card, VirtualAccount, EasyPay, Transfer
    card?: {
      name: string;
      number: string;
      approvalNumber: string;
    };
  };
  paidAt?: string;
  receiptUrl?: string;
  cancelledAt?: string;
}

/**
 * 포트원 V2 API 래퍼 서비스
 * PortOne V2 API wrapper service
 *
 * - SDK 미사용, fetch 직접 호출 (SDK 버전 의존성 문제 회피)
 * - No SDK, direct fetch calls (avoids SDK version dependency issues)
 */
@Injectable()
export class PortoneService {
  private readonly logger = new Logger(PortoneService.name);
  private readonly baseUrl = 'https://api.portone.io';
  private readonly apiSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.apiSecret = this.configService.get<string>(
      'PORTONE_V2_API_SECRET',
      '',
    );
    if (!this.apiSecret) {
      this.logger.warn(
        '⚠️ PORTONE_V2_API_SECRET not set — payment verification will fail',
      );
    }
  }

  /**
   * 결제 조회 / Get payment details
   * GET /payments/{paymentId}
   */
  async getPayment(paymentId: string): Promise<PortonePaymentResponse> {
    const url = `${this.baseUrl}/payments/${encodeURIComponent(paymentId)}`;
    this.logger.log(`[PortOne] GET ${url}`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60_000); // 60초 타임아웃

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `PortOne ${this.apiSecret}`,
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        this.logger.error(
          `[PortOne] GET failed: ${response.status} — ${errorBody}`,
        );
        throw new InternalServerErrorException(
          `포트원 결제 조회 실패 / PortOne payment query failed: ${response.status}`,
        );
      }

      const data = await response.json();
      return data as PortonePaymentResponse;
    } catch (error) {
      if (error instanceof InternalServerErrorException) throw error;
      if (error.name === 'AbortError') {
        throw new InternalServerErrorException(
          '포트원 API 타임아웃 / PortOne API timeout (60s)',
        );
      }
      this.logger.error(`[PortOne] GET error: ${error.message}`);
      throw new InternalServerErrorException(
        `포트원 API 호출 실패 / PortOne API call failed: ${error.message}`,
      );
    } finally {
      clearTimeout(timeout);
    }
  }

  /**
   * 결제 검증 / Verify payment
   * - status === 'PAID' 확인
   * - amount.total === expectedAmount 확인 (불일치 = 위변조)
   */
  async verifyPayment(
    paymentId: string,
    expectedAmount: number,
  ): Promise<PortonePaymentResponse> {
    const payment = await this.getPayment(paymentId);

    if (payment.status !== 'PAID') {
      this.logger.warn(
        `[PortOne] 결제 상태 불일치: expected=PAID, got=${payment.status}`,
      );
      throw new BadRequestException(
        `결제가 완료되지 않았습니다 / Payment not completed: status=${payment.status}`,
      );
    }

    if (payment.amount.total !== expectedAmount) {
      this.logger.error(
        `[PortOne] 금액 위변조 감지! expected=${expectedAmount}, got=${payment.amount.total}`,
      );
      throw new BadRequestException(
        `결제 금액 불일치 (위변조 의심) / Payment amount mismatch (suspected tampering): expected=${expectedAmount}, got=${payment.amount.total}`,
      );
    }

    this.logger.log(
      `[PortOne] 결제 검증 성공: ${paymentId}, amount=${expectedAmount}`,
    );
    return payment;
  }

  /**
   * 결제 취소 / Cancel payment
   * POST /payments/{paymentId}/cancel
   */
  async cancelPayment(
    paymentId: string,
    reason: string,
  ): Promise<{ status: string; cancelledAmount: number }> {
    const url = `${this.baseUrl}/payments/${encodeURIComponent(paymentId)}/cancel`;
    this.logger.log(`[PortOne] POST ${url} — reason: ${reason}`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60_000);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `PortOne ${this.apiSecret}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        this.logger.error(
          `[PortOne] Cancel failed: ${response.status} — ${errorBody}`,
        );
        throw new InternalServerErrorException(
          `포트원 결제 취소 실패 / PortOne cancel failed: ${response.status}`,
        );
      }

      const data = await response.json();
      this.logger.log(`[PortOne] 결제 취소 성공: ${paymentId}`);
      return {
        status: data.cancellation?.status || 'CANCELLED',
        cancelledAmount: data.cancellation?.totalAmount || 0,
      };
    } catch (error) {
      if (error instanceof InternalServerErrorException) throw error;
      this.logger.error(`[PortOne] Cancel error: ${error.message}`);
      throw new InternalServerErrorException(
        `포트원 취소 API 호출 실패 / PortOne cancel API failed: ${error.message}`,
      );
    } finally {
      clearTimeout(timeout);
    }
  }
}
