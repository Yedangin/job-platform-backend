/**
 * Stripe 결제 서비스 / Stripe payment service
 * 비자 플래너 프리미엄 $10 USD 결제 처리
 * Handles $10 USD visa planner premium payments
 */
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private stripe: Stripe | null = null;

  constructor() {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (secretKey) {
      this.stripe = new Stripe(secretKey, {
        apiVersion: '2025-02-24.acacia' as any,
      });
      this.logger.log('Stripe 초기화 완료 / Stripe initialized');
    } else {
      this.logger.warn(
        'STRIPE_SECRET_KEY 미설정 — Stripe 결제 비활성화 / STRIPE_SECRET_KEY not set — Stripe disabled',
      );
    }
  }

  /** Stripe 사용 가능 여부 / Check if Stripe is available */
  isAvailable(): boolean {
    return this.stripe !== null;
  }

  /**
   * 체크아웃 세션 생성 / Create checkout session
   * @param diagnosisSessionId 진단 세션 ID / Diagnosis session ID
   * @param userId 사용자 ID / User ID
   * @param successUrl 성공 URL / Success redirect URL
   * @param cancelUrl 취소 URL / Cancel redirect URL
   */
  async createCheckoutSession(
    diagnosisSessionId: string,
    userId: string,
    successUrl: string,
    cancelUrl: string,
  ): Promise<{ checkoutUrl: string; stripeSessionId: string }> {
    if (!this.stripe) {
      throw new BadRequestException(
        'Stripe가 설정되지 않았습니다 / Stripe is not configured',
      );
    }

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Visa Planner Premium Analysis',
              description:
                'Detailed visa pathway analysis + 6-month free re-diagnosis',
            },
            unit_amount: 1000, // $10.00 in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${successUrl}?stripe_session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      metadata: {
        diagnosisSessionId,
        userId,
        product: 'VISA_PLANNER_PREMIUM',
      },
      payment_intent_data: {
        metadata: {
          diagnosisSessionId,
          userId,
        },
      },
    });

    this.logger.log(
      `Stripe 체크아웃 세션 생성: userId=${userId}, diagnosisSessionId=${diagnosisSessionId} / Checkout session created`,
    );

    return {
      checkoutUrl: session.url!,
      stripeSessionId: session.id,
    };
  }

  /**
   * 웹훅 이벤트 검증 / Verify webhook event
   */
  constructWebhookEvent(payload: Buffer, signature: string): Stripe.Event {
    if (!this.stripe) {
      throw new BadRequestException('Stripe is not configured');
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new BadRequestException('STRIPE_WEBHOOK_SECRET is not set');
    }

    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );
  }

  /**
   * 환불 처리 / Process refund
   */
  async refund(
    paymentIntentId: string,
  ): Promise<{ refundId: string; status: string }> {
    if (!this.stripe) {
      throw new BadRequestException('Stripe is not configured');
    }

    const refund = await this.stripe.refunds.create({
      payment_intent: paymentIntentId,
    });

    this.logger.log(
      `Stripe 환불 처리: paymentIntentId=${paymentIntentId}, refundId=${refund.id} / Refund processed`,
    );

    return { refundId: refund.id, status: refund.status ?? 'unknown' };
  }

  /**
   * 체크아웃 세션 조회 / Retrieve checkout session
   */
  async getCheckoutSession(
    sessionId: string,
  ): Promise<Stripe.Checkout.Session | null> {
    if (!this.stripe) return null;

    try {
      return await this.stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent'],
      });
    } catch {
      return null;
    }
  }
}
