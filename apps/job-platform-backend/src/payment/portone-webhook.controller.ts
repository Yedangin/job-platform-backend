import {
  Controller,
  Post,
  Req,
  Res,
  Logger,
  RawBodyRequest,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { createHmac, timingSafeEqual } from 'crypto';
import { PortoneService } from './portone.service';
import { PaymentService } from './payment.service';
import { SkipCsrf } from 'libs/common/src';

/**
 * 포트원 웹훅 수신 전용 컨트롤러
 * PortOne webhook receiver controller
 *
 * - Standard Webhooks 기반 HMAC-SHA256 서명 검증
 * - 타임스탬프 허용 범위: ±5분
 * - 웹훅 수신 후 getPayment()로 이중 확인
 */
@ApiTags('Payments')
@Controller('payments')
export class PortoneWebhookController {
  private readonly logger = new Logger(PortoneWebhookController.name);
  private readonly webhookSecret: string;
  private readonly isProduction: boolean;

  constructor(
    private readonly configService: ConfigService,
    private readonly portoneService: PortoneService,
    private readonly paymentService: PaymentService,
  ) {
    this.webhookSecret = this.configService
      .get<string>('PORTONE_WEBHOOK_SECRET', '')
      .trim();
    this.isProduction =
      this.configService.get<string>('NODE_ENV', '') === 'production';
    if (!this.isWebhookSecretValid() && this.isProduction) {
      throw new Error('Invalid production PORTONE_WEBHOOK_SECRET');
    }
    if (!this.isWebhookSecretValid()) {
      this.logger.warn(
        'PortOne webhook is disabled until a valid PORTONE_WEBHOOK_SECRET is provided',
      );
    }
  }

  /**
   * POST /payments/webhook — 포트원 웹훅 수신
   * PortOne webhook receiver
   *
   * 인증 없음 (서명 검증으로 대체)
   * No auth (signature verification instead)
   */
  @Post('webhook')
  @SkipCsrf()
  @ApiOperation({ summary: '포트원 웹훅 수신 / PortOne webhook receiver' })
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
    @Headers('webhook-id') webhookId: string,
    @Headers('webhook-timestamp') webhookTimestamp: string,
    @Headers('webhook-signature') webhookSignature: string,
  ) {
    let claimedWebhookId: string | null = null;
    try {
      if (!req.rawBody) {
        return res.status(400).json({ error: 'Raw body required' });
      }
      const rawBody = req.rawBody.toString('utf-8');
      if (!this.isTimestampValid(webhookTimestamp)) {
        return res.status(400).json({ error: 'Invalid timestamp' });
      }

      if (
        !this.verifySignature(
          webhookId,
          webhookTimestamp,
          rawBody,
          webhookSignature,
        )
      ) {
        this.logger.warn(
          '[Webhook] 서명 검증 실패 / Signature verification failed',
        );
        return res.status(400).json({ error: 'Invalid signature' });
      }

      let body: {
        type?: unknown;
        data?: { paymentId?: unknown; storeId?: unknown };
      };
      try {
        body = JSON.parse(rawBody) as typeof body;
      } catch {
        return res.status(400).json({ error: 'Invalid JSON payload' });
      }
      if (!body || typeof body !== 'object') {
        return res.status(400).json({ error: 'Invalid JSON payload' });
      }
      const eventType = typeof body.type === 'string' ? body.type : '';
      const paymentId =
        typeof body.data?.paymentId === 'string'
          ? body.data.paymentId
          : undefined;
      const storeId =
        typeof body.data?.storeId === 'string' ? body.data.storeId : undefined;
      if (!/^[A-Za-z][A-Za-z0-9.]{1,99}$/.test(eventType)) {
        return res.status(400).json({ error: 'Invalid event type' });
      }
      if (storeId !== this.portoneService.getStoreId()) {
        return res.status(400).json({ error: 'Invalid store' });
      }
      if (
        eventType.startsWith('Transaction.') &&
        (!paymentId || !/^[A-Za-z0-9_-]{1,128}$/.test(paymentId))
      ) {
        return res.status(400).json({ error: 'Invalid payment ID' });
      }

      const claim = await this.paymentService.beginWebhookEvent({
        webhookId,
        eventType,
        paymentId,
        rawBody,
      });
      if (claim === 'DUPLICATE') {
        return res.status(200).json({ ok: true, duplicate: true });
      }
      if (claim === 'BUSY') {
        return res.status(503).json({ error: 'Webhook already processing' });
      }
      claimedWebhookId = webhookId;

      if (eventType.startsWith('Transaction.') && paymentId) {
        const portonePayment = await this.portoneService.getPayment(paymentId);
        await this.paymentService.synchronizePaymentFromWebhook(
          portonePayment,
          { webhookId, eventType },
        );
      }

      await this.paymentService.completeWebhookEvent(webhookId);
      claimedWebhookId = null;
      return res.status(200).json({ ok: true });
    } catch (error) {
      if (claimedWebhookId) {
        await this.paymentService
          .failWebhookEvent(claimedWebhookId)
          .catch(() => undefined);
      }
      this.logger.error('PortOne webhook processing failed');
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  /**
   * HMAC-SHA256 서명 검증 / Verify HMAC-SHA256 signature
   * Standard Webhooks spec
   */
  private verifySignature(
    webhookId: string,
    webhookTimestamp: string,
    body: string,
    signature: string,
  ): boolean {
    if (
      !this.isWebhookSecretValid() ||
      !/^[A-Za-z0-9_-]{1,255}$/.test(webhookId ?? '') ||
      !webhookTimestamp ||
      !signature
    ) {
      return false;
    }

    try {
      // Standard Webhooks: secret is base64-encoded, prefixed with "whsec_"
      const secretBytes = Buffer.from(
        this.webhookSecret.replace(/^whsec_/, ''),
        'base64',
      );

      // Signed content = "{webhookId}.{timestamp}.{body}"
      const signedContent = `${webhookId}.${webhookTimestamp}.${body}`;
      const expectedSignature = createHmac('sha256', secretBytes)
        .update(signedContent)
        .digest();

      // signature 헤더는 "v1,{base64}" 형식 / Header format: "v1,{base64}"
      const signatures = signature.split(' ');
      for (const sig of signatures) {
        const [version, sigValue] = sig.split(',');
        if (version !== 'v1' || !sigValue) continue;
        const received = Buffer.from(sigValue, 'base64');
        if (
          received.length === expectedSignature.length &&
          timingSafeEqual(received, expectedSignature)
        ) {
          return true;
        }
      }

      return false;
    } catch {
      return false;
    }
  }

  private isTimestampValid(value: string): boolean {
    if (!/^\d{10}$/.test(value ?? '')) return false;
    const timestamp = Number(value);
    const now = Math.floor(Date.now() / 1000);
    return Number.isSafeInteger(timestamp) && Math.abs(now - timestamp) <= 300;
  }

  private isWebhookSecretValid(): boolean {
    if (!/^whsec_[A-Za-z0-9+/=_-]+$/.test(this.webhookSecret)) return false;
    try {
      return Buffer.from(this.webhookSecret.slice(6), 'base64').length >= 16;
    } catch {
      return false;
    }
  }
}
