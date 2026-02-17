import {
  Controller,
  Post,
  Req,
  Res,
  Logger,
  RawBodyRequest,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { createHmac } from 'crypto';
import { PortoneService } from './portone.service';
import { PaymentService } from './payment.service';

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

  constructor(
    private readonly configService: ConfigService,
    private readonly portoneService: PortoneService,
    private readonly paymentService: PaymentService,
  ) {
    this.webhookSecret = this.configService.get<string>(
      'PORTONE_WEBHOOK_SECRET',
      '',
    );
    if (!this.webhookSecret) {
      this.logger.warn(
        '⚠️ PORTONE_WEBHOOK_SECRET not set — webhook verification will fail',
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
  @ApiOperation({ summary: '포트원 웹훅 수신 / PortOne webhook receiver' })
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
    @Headers('webhook-id') webhookId: string,
    @Headers('webhook-timestamp') webhookTimestamp: string,
    @Headers('webhook-signature') webhookSignature: string,
  ) {
    try {
      // 1. 서명 검증 / Verify signature
      const rawBody =
        req.rawBody?.toString('utf-8') ||
        JSON.stringify(req.body);

      if (!this.verifySignature(webhookId, webhookTimestamp, rawBody, webhookSignature)) {
        this.logger.warn('[Webhook] 서명 검증 실패 / Signature verification failed');
        return res.status(400).json({ error: 'Invalid signature' });
      }

      // 2. 타임스탬프 검증 (±5분) / Timestamp validation (±5 min)
      const ts = parseInt(webhookTimestamp, 10);
      const now = Math.floor(Date.now() / 1000);
      if (Math.abs(now - ts) > 300) {
        this.logger.warn('[Webhook] 타임스탬프 만료 / Timestamp expired');
        return res.status(400).json({ error: 'Timestamp expired' });
      }

      // 3. 이벤트 파싱 / Parse event
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const eventType = body.type;
      const paymentId = body.data?.paymentId;

      this.logger.log(
        `[Webhook] 이벤트 수신: type=${eventType}, paymentId=${paymentId}`,
      );

      if (!paymentId) {
        this.logger.warn('[Webhook] paymentId 없음');
        return res.status(200).json({ ok: true });
      }

      // 4. 포트원 API로 이중 확인 / Double-check via PortOne API
      let portonePayment;
      try {
        portonePayment = await this.portoneService.getPayment(paymentId);
      } catch (err) {
        this.logger.error(`[Webhook] 포트원 조회 실패: ${err.message}`);
        return res.status(500).json({ error: 'Failed to verify payment' });
      }

      // 5. 이벤트 처리 / Process event
      switch (eventType) {
        case 'Transaction.Paid':
          await this.paymentService.handleWebhookPaid(paymentId, {
            ...body.data,
            portoneVerified: portonePayment,
          });
          break;

        case 'Transaction.Cancelled':
          await this.paymentService.handleWebhookCancelled(paymentId, {
            ...body.data,
            portoneVerified: portonePayment,
          });
          break;

        case 'Transaction.Failed':
          await this.paymentService.handleWebhookFailed(paymentId, {
            ...body.data,
            reason: portonePayment?.status || 'FAILED',
          });
          break;

        default:
          this.logger.log(`[Webhook] 미처리 이벤트 유형: ${eventType}`);
      }

      return res.status(200).json({ ok: true });
    } catch (error) {
      this.logger.error(`[Webhook] 처리 에러: ${error.message}`, error.stack);
      // 500 반환 → 포트원이 재시도 / Return 500 → PortOne retries
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
    if (!this.webhookSecret || !webhookId || !webhookTimestamp || !signature) {
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
        .digest('base64');

      // signature 헤더는 "v1,{base64}" 형식 / Header format: "v1,{base64}"
      const signatures = signature.split(' ');
      for (const sig of signatures) {
        const [version, sigValue] = sig.split(',');
        if (version === 'v1' && sigValue === expectedSignature) {
          return true;
        }
      }

      return false;
    } catch (err) {
      this.logger.error(`[Webhook] 서명 검증 에러: ${err.message}`);
      return false;
    }
  }
}
