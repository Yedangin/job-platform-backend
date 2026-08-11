import {
  Injectable,
  Logger,
  BadRequestException,
  BadGatewayException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const PORTONE_API_BASE_URL = 'https://api.portone.io';
const PORTONE_TIMEOUT_MS = 10_000;
const PORTONE_MAX_ATTEMPTS = 3;

/**
 * 포트원 V2 결제 응답 타입
 * PortOne V2 payment response type
 */
export interface PortonePaymentResponse {
  status: string; // PAID, CANCELLED, FAILED, etc.
  id: string;
  storeId: string;
  transactionId?: string;
  currency: string;
  amount: {
    total: number;
    paid?: number;
    cancelled?: number;
    taxFree?: number;
  };
  method?: {
    type: string;
    provider?: string;
    card?: {
      publisher?: string;
      issuer?: string;
      brand?: string;
      type?: string;
    };
  };
  paidAt?: string;
  receiptUrl?: string;
  cancelledAt?: string;
  cancellations?: Array<{
    id: string;
    status: string;
    totalAmount: number;
    cancelledAt?: string;
  }>;
}

export interface PortonePaymentExpectation {
  paymentId: string;
  amount: number;
  currency?: string;
  requirePaid?: boolean;
}

export interface PortoneCancellationResult {
  id: string;
  status: 'SUCCEEDED' | 'REQUESTED' | 'FAILED' | string;
  cancelledAmount: number;
  cancelledAt?: string;
}

class PortoneHttpError extends Error {
  constructor(
    readonly status: number,
    readonly retryable: boolean,
    readonly errorType?: string,
  ) {
    super(`PortOne request failed with status ${status}`);
  }
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
  private readonly apiSecret: string;
  private readonly storeId: string;
  private readonly channelKey: string;
  private readonly isProduction: boolean;

  constructor(private readonly configService: ConfigService) {
    this.apiSecret = this.readConfig('PORTONE_V2_API_SECRET');
    this.storeId = this.readConfig('PORTONE_STORE_ID');
    this.channelKey = this.readConfig('PORTONE_CHANNEL_KEY');
    this.isProduction = this.readConfig('NODE_ENV') === 'production';

    const invalid = this.invalidConfigurationKeys();
    if (invalid.length > 0 && this.isProduction) {
      throw new Error(
        `Invalid production PortOne configuration: ${invalid.join(', ')}`,
      );
    }
    if (invalid.length > 0) {
      this.logger.warn(
        `PortOne is not ready (${invalid.join(', ')}). Payment endpoints remain disabled until valid values are provided.`,
      );
    }
  }

  getStoreId(): string {
    this.assertConfigured(['PORTONE_STORE_ID']);
    return this.storeId;
  }

  getCheckoutConfig(
    paymentId: string,
    orderName: string,
    totalAmount: number,
    currency = 'KRW',
  ) {
    this.assertConfigured(['PORTONE_STORE_ID', 'PORTONE_CHANNEL_KEY']);
    if (!/^[A-Za-z0-9_-]{16,64}$/.test(paymentId)) {
      throw new BadRequestException('유효하지 않은 결제 ID입니다');
    }
    if (!Number.isSafeInteger(totalAmount) || totalAmount <= 0) {
      throw new BadRequestException('결제 금액은 0보다 큰 정수여야 합니다');
    }
    return {
      storeId: this.storeId,
      channelKey: this.channelKey,
      paymentId,
      orderName,
      totalAmount,
      currency,
    };
  }

  async getPayment(paymentId: string): Promise<PortonePaymentResponse> {
    this.assertConfigured(['PORTONE_V2_API_SECRET']);
    if (!/^[A-Za-z0-9_-]{1,128}$/.test(paymentId)) {
      throw new BadRequestException('유효하지 않은 결제 ID입니다');
    }
    return this.requestJson<PortonePaymentResponse>(
      'GET',
      `/payments/${encodeURIComponent(paymentId)}`,
      undefined,
      `payment lookup ${this.maskId(paymentId)}`,
    );
  }

  async verifyPayment(
    paymentId: string,
    expected: number | Omit<PortonePaymentExpectation, 'paymentId'>,
  ): Promise<PortonePaymentResponse> {
    const expectation: PortonePaymentExpectation =
      typeof expected === 'number'
        ? { paymentId, amount: expected, currency: 'KRW', requirePaid: true }
        : {
            ...expected,
            paymentId,
            currency: expected.currency ?? 'KRW',
            requirePaid: expected.requirePaid ?? true,
          };
    const payment = await this.getPayment(paymentId);
    this.validatePayment(payment, expectation);
    return payment;
  }

  validatePayment(
    payment: PortonePaymentResponse,
    expected: PortonePaymentExpectation,
  ): void {
    if (payment.id !== expected.paymentId) {
      this.logger.error('PortOne returned a mismatched payment identifier');
      throw new BadRequestException('결제 식별자가 주문과 일치하지 않습니다');
    }
    if (payment.storeId !== this.getStoreId()) {
      this.logger.error('PortOne payment belongs to a different store');
      throw new BadRequestException('결제 상점 정보가 일치하지 않습니다');
    }
    if (payment.currency !== (expected.currency ?? 'KRW')) {
      this.logger.error('PortOne payment currency mismatch');
      throw new BadRequestException('결제 통화가 주문과 일치하지 않습니다');
    }
    if (
      !payment.amount ||
      !Number.isSafeInteger(payment.amount.total) ||
      payment.amount.total !== expected.amount
    ) {
      this.logger.error('PortOne payment amount mismatch');
      throw new BadRequestException(
        '결제 금액이 주문 금액과 일치하지 않습니다',
      );
    }
    if (expected.requirePaid !== false && payment.status !== 'PAID') {
      throw new BadRequestException(
        `결제가 완료되지 않았습니다 (status=${payment.status})`,
      );
    }
    if (
      expected.requirePaid !== false &&
      (!payment.paidAt || !Number.isFinite(Date.parse(payment.paidAt)))
    ) {
      throw new BadRequestException('결제 완료 시각이 올바르지 않습니다');
    }
  }

  /**
   * 결제 취소 / Cancel payment
   * POST /payments/{paymentId}/cancel
   *
   * @param paymentId 포트원 결제 ID / PortOne payment ID
   * @param reason 취소 사유 / Cancellation reason
   * @param amount 부분 취소 금액 (undefined = 전액 취소) / Partial cancel amount (undefined = full cancel)
   */
  async cancelPayment(
    paymentId: string,
    reason: string,
    amount: number | undefined,
    idempotencyKey: string,
    currentCancellableAmount: number,
  ): Promise<PortoneCancellationResult> {
    this.assertConfigured(['PORTONE_V2_API_SECRET', 'PORTONE_STORE_ID']);
    if (!/^[A-Za-z0-9_-]{1,128}$/.test(paymentId)) {
      throw new BadRequestException('유효하지 않은 결제 ID입니다');
    }
    const normalizedReason = reason.trim();
    if (normalizedReason.length < 2 || normalizedReason.length > 200) {
      throw new BadRequestException('취소 사유는 2~200자로 입력해주세요');
    }
    if (
      amount !== undefined &&
      (!Number.isSafeInteger(amount) || amount <= 0)
    ) {
      throw new BadRequestException('취소 금액이 올바르지 않습니다');
    }
    if (
      !Number.isSafeInteger(currentCancellableAmount) ||
      currentCancellableAmount <= 0 ||
      (amount !== undefined && amount > currentCancellableAmount)
    ) {
      throw new BadRequestException('취소 가능 잔액이 올바르지 않습니다');
    }
    if (!/^[A-Za-z0-9_-]{16,128}$/.test(idempotencyKey)) {
      throw new BadRequestException('취소 멱등 키가 올바르지 않습니다');
    }

    const requestBody: {
      storeId: string;
      reason: string;
      amount?: number;
      currentCancellableAmount: number;
    } = {
      storeId: this.storeId,
      reason: normalizedReason,
      currentCancellableAmount,
    };
    if (amount !== undefined) requestBody.amount = amount;

    const response = await this.requestJson<{
      cancellation?: {
        id?: string;
        status?: string;
        totalAmount?: number;
        cancelledAt?: string;
      };
    }>(
      'POST',
      `/payments/${encodeURIComponent(paymentId)}/cancel`,
      requestBody,
      `payment cancellation ${this.maskId(paymentId)}`,
      idempotencyKey,
    );

    const cancellation = response.cancellation;
    if (
      !cancellation?.id ||
      !cancellation.status ||
      !Number.isSafeInteger(cancellation.totalAmount)
    ) {
      throw new BadGatewayException('결제사 취소 응답이 올바르지 않습니다');
    }
    return {
      id: cancellation.id,
      status: cancellation.status,
      cancelledAmount: cancellation.totalAmount!,
      cancelledAt: cancellation.cancelledAt,
    };
  }

  private async requestJson<T>(
    method: 'GET' | 'POST',
    path: string,
    body: unknown,
    operation: string,
    idempotencyKey?: string,
  ): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= PORTONE_MAX_ATTEMPTS; attempt += 1) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), PORTONE_TIMEOUT_MS);
      try {
        const headers: Record<string, string> = {
          Authorization: `PortOne ${this.apiSecret}`,
          Accept: 'application/json',
        };
        if (body !== undefined) headers['Content-Type'] = 'application/json';
        if (idempotencyKey) {
          headers['Idempotency-Key'] = `"${idempotencyKey}"`;
        }

        const response = await fetch(`${PORTONE_API_BASE_URL}${path}`, {
          method,
          headers,
          body: body === undefined ? undefined : JSON.stringify(body),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorBody = await this.readErrorBody(response);
          const retryable =
            response.status === 408 ||
            response.status === 425 ||
            response.status === 429 ||
            response.status >= 500;
          throw new PortoneHttpError(
            response.status,
            retryable,
            errorBody?.type,
          );
        }
        return (await response.json()) as T;
      } catch (error) {
        lastError = error;
        const aborted = (error as Error)?.name === 'AbortError';
        const retryable =
          aborted || !(error instanceof PortoneHttpError) || error.retryable;
        if (!retryable || attempt >= PORTONE_MAX_ATTEMPTS) break;

        const delayMs =
          250 * 2 ** (attempt - 1) + Math.floor(Math.random() * 100);
        this.logger.warn(
          `PortOne ${operation} transient failure; retry ${attempt}/${PORTONE_MAX_ATTEMPTS}`,
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } finally {
        clearTimeout(timeout);
      }
    }

    if (lastError instanceof PortoneHttpError) {
      this.logger.error(
        `PortOne ${operation} failed (status=${lastError.status}, type=${lastError.errorType ?? 'unknown'})`,
      );
    } else {
      this.logger.error(`PortOne ${operation} failed due to a network error`);
    }
    throw new BadGatewayException(
      '결제사 통신에 실패했습니다. 잠시 후 다시 시도해주세요',
    );
  }

  private async readErrorBody(
    response: Response,
  ): Promise<{ type?: string } | null> {
    try {
      return (await response.json()) as { type?: string };
    } catch {
      return null;
    }
  }

  private invalidConfigurationKeys(): string[] {
    const invalid: string[] = [];
    if (
      this.apiSecret.length < 20 ||
      this.looksLikePlaceholder(this.apiSecret)
    ) {
      invalid.push('PORTONE_V2_API_SECRET');
    }
    if (!/^store-[A-Za-z0-9-]{10,}$/.test(this.storeId)) {
      invalid.push('PORTONE_STORE_ID');
    }
    if (!/^channel-key-[A-Za-z0-9-]{10,}$/.test(this.channelKey)) {
      invalid.push('PORTONE_CHANNEL_KEY');
    }
    return invalid;
  }

  private assertConfigured(keys: string[]): void {
    const invalid = this.invalidConfigurationKeys();
    const unavailable = keys.filter((key) => invalid.includes(key));
    if (unavailable.length > 0) {
      throw new BadGatewayException(
        `결제 연동 설정이 완료되지 않았습니다 (${unavailable.join(', ')})`,
      );
    }
  }

  private readConfig(key: string): string {
    return this.configService.get<string>(key, '').trim();
  }

  private looksLikePlaceholder(value: string): boolean {
    return /(test|example|dummy|placeholder|replace|change|your|xxx|발급)/i.test(
      value,
    );
  }

  private maskId(value: string): string {
    if (value.length <= 8) return '***';
    return `${value.slice(0, 4)}...${value.slice(-4)}`;
  }
}
