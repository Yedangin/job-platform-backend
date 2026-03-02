/**
 * 비자 플래너 컨트롤러 / Visa planner controller
 * 프리미엄 결제, 정밀 진단, 재진단, 환불 엔드포인트
 * Premium payment, detailed diagnosis, rediagnosis, refund endpoints
 */
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Req,
  Res,
  Headers,
  RawBodyRequest,
  Logger,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthPrismaService, RedisService, SessionData } from 'libs/common/src';
import { StripeService } from './stripe.service';
import { PremiumEngineService, PremiumInput } from './premium-engine.service';
import {
  CareerAggregationService,
  CareerSlot,
} from './career-aggregation.service';
import { WhatIfSimulationService } from './what-if-simulation.service';
import { RediagnosisCouponService } from './rediagnosis-coupon.service';

@ApiTags('Visa Planner')
@Controller('visa-planner')
export class VisaPlannerController {
  private readonly logger = new Logger(VisaPlannerController.name);

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly redis: RedisService,
    private readonly stripe: StripeService,
    private readonly premiumEngine: PremiumEngineService,
    private readonly careerService: CareerAggregationService,
    private readonly whatIfService: WhatIfSimulationService,
    private readonly couponService: RediagnosisCouponService,
  ) {}

  // ──── 세션 헬퍼 / Session helper ────

  private async getUserIdFromSession(req: Request): Promise<string> {
    const sessionId = req.cookies?.['session_id'];
    if (!sessionId)
      throw new ForbiddenException('세션이 필요합니다 / Session required');

    const raw = await this.redis.get(`session:${sessionId}`);
    if (!raw)
      throw new ForbiddenException(
        '세션을 찾을 수 없습니다 / Session not found',
      );

    const session = JSON.parse(raw) as SessionData;
    if (!session.userId)
      throw new ForbiddenException('사용자 ID가 없습니다 / User ID not found');
    return session.userId;
  }

  // ──── 결제 / Payment ────

  @Post('checkout')
  @ApiOperation({
    summary: '프리미엄 결제 세션 생성 / Create premium checkout session',
  })
  @ApiResponse({
    status: 201,
    description: 'Stripe 체크아웃 URL 반환 / Returns Stripe checkout URL',
  })
  async createCheckout(
    @Req() req: Request,
    @Body()
    body: {
      diagnosisSessionId: string;
      successUrl: string;
      cancelUrl: string;
      refundPolicyAgreed: boolean;
    },
  ) {
    const userId = await this.getUserIdFromSession(req);

    if (!body.refundPolicyAgreed) {
      throw new BadRequestException(
        '환불 규정 동의가 필요합니다 / Refund policy agreement required',
      );
    }

    if (!this.stripe.isAvailable()) {
      throw new BadRequestException(
        '결제 시스템이 비활성화되어 있습니다 / Payment system is not available',
      );
    }

    // 진단 세션 확인 / Verify diagnosis session
    const session = await this.prisma.diagnosisSession.findUnique({
      where: { sessionId: BigInt(body.diagnosisSessionId) },
    });
    if (!session) {
      throw new NotFoundException(
        '진단 세션을 찾을 수 없습니다 / Diagnosis session not found',
      );
    }

    // 이미 결제된 경우 / Already paid
    if (session.isPremium && session.stripePaidAt) {
      throw new BadRequestException(
        '이미 결제된 세션입니다 / Session already paid',
      );
    }

    // 동의 기록 / Record consent
    await this.prisma.diagnosisSession.update({
      where: { sessionId: BigInt(body.diagnosisSessionId) },
      data: {
        refundPolicyAgreedAt: new Date(),
        digitalContentAgreedAt: new Date(),
        privacyAgreedAt: new Date(),
      },
    });

    const result = await this.stripe.createCheckoutSession(
      body.diagnosisSessionId,
      userId,
      body.successUrl,
      body.cancelUrl,
    );

    // Stripe 세션 ID 저장 / Save Stripe session ID
    await this.prisma.diagnosisSession.update({
      where: { sessionId: BigInt(body.diagnosisSessionId) },
      data: { stripeSessionId: result.stripeSessionId },
    });

    return result;
  }

  @Post('checkout/verify')
  @ApiOperation({ summary: '결제 완료 확인 / Verify payment completion' })
  async verifyCheckout(
    @Req() req: Request,
    @Body() body: { stripeSessionId: string },
  ) {
    const userId = await this.getUserIdFromSession(req);

    const stripeSession = await this.stripe.getCheckoutSession(
      body.stripeSessionId,
    );
    if (!stripeSession || stripeSession.payment_status !== 'paid') {
      throw new BadRequestException(
        '결제가 완료되지 않았습니다 / Payment not completed',
      );
    }

    const diagnosisSessionId = stripeSession.metadata?.diagnosisSessionId;
    if (!diagnosisSessionId) {
      throw new BadRequestException(
        '진단 세션 정보가 없습니다 / Diagnosis session info missing',
      );
    }

    // 결제 완료 기록 / Record payment
    const session = await this.prisma.diagnosisSession.update({
      where: { sessionId: BigInt(diagnosisSessionId) },
      data: {
        isPremium: true,
        stripePaidAt: new Date(),
        convertedToPaid: true,
      },
    });

    // 재진단 쿠폰 발급 / Issue rediagnosis coupon
    const coupon = await this.couponService.issueCoupon(
      userId,
      BigInt(diagnosisSessionId),
    );

    this.logger.log(
      `프리미엄 결제 완료: userId=${userId}, sessionId=${diagnosisSessionId} / Premium payment completed`,
    );

    return {
      diagnosisSessionId,
      isPremium: true,
      coupon,
    };
  }

  // ──── 프리미엄 진단 / Premium diagnosis ────

  @Post('premium-result/:sessionId')
  @ApiOperation({ summary: '프리미엄 결과 생성 / Generate premium result' })
  async generatePremiumResult(
    @Req() req: Request,
    @Param('sessionId') sessionIdParam: string,
    @Body()
    body: {
      careerSlots?: CareerSlot[];
      premiumInput?: Partial<PremiumInput>;
    },
  ) {
    const userId = await this.getUserIdFromSession(req);
    const sessionId = BigInt(sessionIdParam);

    // 세션 확인 / Verify session
    const session = await this.prisma.diagnosisSession.findUnique({
      where: { sessionId },
    });
    if (!session)
      throw new NotFoundException(
        '세션을 찾을 수 없습니다 / Session not found',
      );
    if (!session.isPremium)
      throw new ForbiddenException(
        '프리미엄 결제가 필요합니다 / Premium payment required',
      );

    // 이미 생성된 결과가 있으면 반환 / Return existing result if available
    if (session.premiumResultJson) {
      // 최초 조회 기록 / Record first view
      if (!session.isPremiumViewed) {
        await this.prisma.diagnosisSession.update({
          where: { sessionId },
          data: { isPremiumViewed: true, premiumViewedAt: new Date() },
        });
      }
      return session.premiumResultJson;
    }

    // 원본 입력에서 프리미엄 입력 구성 / Build premium input from original
    const originalInput = session.inputSnapshot as any;
    const premiumInput: PremiumInput = {
      ...originalInput,
      ...(body.premiumInput || {}),
    };

    // 경력 합산 / Aggregate career
    const careerAggregation = this.careerService.aggregate(
      body.careerSlots || [],
    );

    // 프리미엄 진단 실행 / Run premium diagnosis
    const premiumResult = await this.premiumEngine.diagnosePremium(
      premiumInput,
      careerAggregation,
      userId,
    );

    // What-If 시뮬레이션 / Run what-if simulation
    const simulations = await this.whatIfService.simulate(
      premiumResult,
      premiumInput,
      careerAggregation,
      userId,
    );

    const fullResult = { ...premiumResult, whatIfSimulations: simulations };

    // 결과 저장 / Save result
    await this.prisma.diagnosisSession.update({
      where: { sessionId },
      data: {
        premiumResultJson: fullResult as any,
        isPremiumViewed: true,
        premiumViewedAt: new Date(),
      },
    });

    this.logger.log(
      `프리미엄 결과 생성: userId=${userId}, sessionId=${sessionIdParam} / Premium result generated`,
    );

    return fullResult;
  }

  // ──── 재진단 / Rediagnosis ────

  @Get('coupon/status')
  @ApiOperation({
    summary: '재진단 쿠폰 상태 조회 / Get rediagnosis coupon status',
  })
  async getCouponStatus(@Req() req: Request) {
    const userId = await this.getUserIdFromSession(req);
    return this.couponService.getCouponStatus(userId);
  }

  @Post('rediagnosis')
  @ApiOperation({
    summary: '재진단 실행 (쿠폰 사용) / Run rediagnosis with coupon',
  })
  async runRediagnosis(
    @Req() req: Request,
    @Body()
    body: {
      couponCode: string;
      premiumInput: PremiumInput;
      careerSlots?: CareerSlot[];
    },
  ) {
    const userId = await this.getUserIdFromSession(req);

    // 경력 합산 / Aggregate career
    const careerAggregation = this.careerService.aggregate(
      body.careerSlots || [],
    );

    // 프리미엄 진단 실행 / Run premium diagnosis
    const premiumResult = await this.premiumEngine.diagnosePremium(
      body.premiumInput,
      careerAggregation,
      userId,
    );

    // What-If 시뮬레이션 / Run what-if simulation
    const simulations = await this.whatIfService.simulate(
      premiumResult,
      body.premiumInput,
      careerAggregation,
      userId,
    );

    const fullResult = { ...premiumResult, whatIfSimulations: simulations };

    // 새 세션 생성 / Create new session
    const newSession = await this.prisma.diagnosisSession.create({
      data: {
        userId,
        inputSnapshot: body.premiumInput as any,
        resultsSnapshot: fullResult as any,
        topPathwayId:
          premiumResult.trackResults[0]?.pathways[0]?.pathwayId ?? null,
        pathwayCount: premiumResult.trackResults.reduce(
          (s, t) => s + t.pathways.length,
          0,
        ),
        isPremium: true,
        isPremiumViewed: true,
        premiumViewedAt: new Date(),
        premiumResultJson: fullResult as any,
        stripePaidAt: new Date(), // 쿠폰으로 결제 대체 / Coupon replaces payment
      },
    });

    // 쿠폰 사용 / Use coupon
    const couponResult = await this.couponService.useCoupon(
      userId,
      body.couponCode,
      newSession.sessionId,
    );

    if (!couponResult.success) {
      throw new BadRequestException(couponResult.message);
    }

    this.logger.log(
      `재진단 완료: userId=${userId}, coupon=${body.couponCode} / Rediagnosis completed`,
    );

    return {
      sessionId: Number(newSession.sessionId),
      result: fullResult,
      couponUsed: true,
    };
  }

  // ──── 환불 / Refund ────

  @Post('refund/:sessionId')
  @ApiOperation({ summary: '환불 요청 / Request refund' })
  async requestRefund(
    @Req() req: Request,
    @Param('sessionId') sessionIdParam: string,
  ) {
    const userId = await this.getUserIdFromSession(req);
    const sessionId = BigInt(sessionIdParam);

    const session = await this.prisma.diagnosisSession.findUnique({
      where: { sessionId },
    });

    if (!session)
      throw new NotFoundException(
        '세션을 찾을 수 없습니다 / Session not found',
      );
    if (!session.isPremium)
      throw new BadRequestException(
        '유료 세션이 아닙니다 / Not a premium session',
      );

    // 결과 조회 여부 확인 / Check if result has been viewed
    if (session.isPremiumViewed) {
      // 환불 거부 / Refund denied
      await this.prisma.plannerRefund.create({
        data: {
          sessionId,
          userId,
          status: 'DENIED',
          reason: 'RESULT_VIEWED',
          message:
            '결과를 이미 조회하셨습니다. 환불 규정에 따라 환불이 불가합니다.',
        },
      });

      return {
        status: 'DENIED',
        reason: 'RESULT_VIEWED',
        message:
          '결과를 이미 조회하셨습니다. 환불이 불가합니다. / Result already viewed. Refund not available.',
      };
    }

    // 결과 미조회 → 환불 승인 / Result not viewed → approve refund
    let stripeRefundId: string | null = null;
    if (session.stripeSessionId && this.stripe.isAvailable()) {
      try {
        const stripeSession = await this.stripe.getCheckoutSession(
          session.stripeSessionId,
        );
        const paymentIntentId =
          typeof stripeSession?.payment_intent === 'string'
            ? stripeSession.payment_intent
            : (stripeSession?.payment_intent as any)?.id;

        if (paymentIntentId) {
          const refund = await this.stripe.refund(paymentIntentId);
          stripeRefundId = refund.refundId;
        }
      } catch (err) {
        this.logger.error(`Stripe 환불 실패 / Stripe refund failed: ${err}`);
      }
    }

    // DB 업데이트 / Update DB
    await this.prisma.diagnosisSession.update({
      where: { sessionId },
      data: { isPremium: false },
    });

    // 쿠폰 취소 / Cancel coupon
    await this.couponService.cancelCoupon(sessionId);

    // 환불 기록 / Record refund
    await this.prisma.plannerRefund.create({
      data: {
        sessionId,
        userId,
        status: 'APPROVED',
        reason: 'RESULT_NOT_VIEWED',
        stripeRefundId,
        refundAmountCents: 1000,
        currency: 'USD',
        message: '결과 미조회 상태 — 전액 환불',
      },
    });

    this.logger.log(
      `환불 승인: userId=${userId}, sessionId=${sessionIdParam} / Refund approved`,
    );

    return {
      status: 'APPROVED',
      reason: 'RESULT_NOT_VIEWED',
      stripeRefundId,
      refundAmount: '$10.00 USD',
    };
  }

  // ──── 진단 이력 / Diagnosis history ────

  @Get('history')
  @ApiOperation({ summary: '진단 이력 조회 / Get diagnosis history' })
  async getHistory(@Req() req: Request) {
    const userId = await this.getUserIdFromSession(req);

    const sessions = await this.prisma.diagnosisSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: {
        sessionId: true,
        topPathwayId: true,
        pathwayCount: true,
        isPremium: true,
        isPremiumViewed: true,
        createdAt: true,
        inputSnapshot: true,
      },
    });

    return {
      sessions: sessions.map((s) => ({
        sessionId: Number(s.sessionId),
        topPathwayId: s.topPathwayId,
        pathwayCount: s.pathwayCount,
        isPremium: s.isPremium,
        isPremiumViewed: s.isPremiumViewed,
        createdAt: s.createdAt,
        nationality: (s.inputSnapshot as any)?.nationality,
        finalGoal: (s.inputSnapshot as any)?.finalGoal,
      })),
    };
  }

  // ──── Stripe 웹훅 / Stripe webhook ────

  @Post('stripe-webhook')
  @ApiOperation({ summary: 'Stripe 웹훅 수신 / Receive Stripe webhook' })
  async handleStripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
    @Res() res: Response,
  ) {
    if (!signature) {
      res.status(400).json({ error: 'Missing signature' });
      return;
    }

    try {
      const rawBody = req.rawBody;
      if (!rawBody) {
        res.status(400).json({ error: 'Missing raw body' });
        return;
      }

      const event = this.stripe.constructWebhookEvent(rawBody, signature);

      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as any;
          const diagnosisSessionId = session.metadata?.diagnosisSessionId;
          if (diagnosisSessionId) {
            await this.prisma.diagnosisSession.update({
              where: { sessionId: BigInt(diagnosisSessionId) },
              data: {
                isPremium: true,
                stripePaidAt: new Date(),
                convertedToPaid: true,
              },
            });
            this.logger.log(
              `웹훅: 결제 완료 sessionId=${diagnosisSessionId} / Webhook: payment completed`,
            );
          }
          break;
        }

        case 'charge.refunded': {
          this.logger.log(`웹훅: 환불 처리됨 / Webhook: refund processed`);
          break;
        }
      }

      res.status(200).json({ received: true });
    } catch (err) {
      this.logger.error(
        `Stripe 웹훅 처리 실패 / Webhook handling failed: ${err}`,
      );
      res.status(400).json({ error: 'Webhook verification failed' });
    }
  }
}
