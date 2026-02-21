import { Module } from '@nestjs/common';
import { PaymentPrismaModule, AuthPrismaModule } from 'libs/common/src';
import { PaymentController } from './payment.controller';
import { PortoneWebhookController } from './portone-webhook.controller';
import { AdminPaymentController } from './admin-payment.controller';
import { PaymentService } from './payment.service';
import { PortoneService } from './portone.service';
import { ProductService } from './product.service';
import { CouponService } from './coupon.service';
import { ViewingCreditService } from './viewing-credit.service';
import { AdminPaymentService } from './admin-payment.service';

/**
 * 결제 모듈 / Payment module
 *
 * - PaymentPrismaModule: 결제 DB (Product, Order, Payment, Coupon, ViewingCredit)
 * - AuthPrismaModule: 사용자 DB (JobPosting 업데이트 — 프리미엄 업그레이드, 공고 연장)
 * - AdminPaymentController: 관리자 결제 관리 엔드포인트
 */
@Module({
  imports: [PaymentPrismaModule, AuthPrismaModule],
  controllers: [
    PaymentController,
    PortoneWebhookController,
    AdminPaymentController,
  ],
  providers: [
    PaymentService,
    PortoneService,
    ProductService,
    CouponService,
    ViewingCreditService,
    AdminPaymentService,
  ],
  exports: [PaymentService, CouponService, ViewingCreditService],
})
export class PaymentModule {}
