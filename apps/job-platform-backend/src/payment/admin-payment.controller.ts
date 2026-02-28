/**
 * 결제 어드민 컨트롤러 / Payment admin controller
 *
 * 관리자 전용 결제/상품/쿠폰 관리 엔드포인트
 * Admin-only endpoints for payment/product/coupon management
 *
 * Guard + Decorator 패턴으로 어드민 인증 통일
 * Unified admin auth via Guard + Decorator pattern
 */
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { SessionAuthGuard, RolesGuard, Roles } from 'libs/common/src';
import { AdminPaymentService } from './admin-payment.service';

@ApiTags('Admin Payments / 결제 관리')
@Controller('admin/payments')
@UseGuards(SessionAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPERADMIN')
export class AdminPaymentController {
  constructor(private readonly adminPaymentService: AdminPaymentService) {}

  // ──── 주문 관리 / Order management ────

  @Get('orders')
  @ApiOperation({ summary: '전체 주문 목록 / All orders' })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'from', required: false })
  @ApiQuery({ name: 'to', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiResponse({ status: 200, description: '주문 목록 / Order list' })
  async getOrders(
    @Query('status') status?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('page') page?: string,
  ) {
    return this.adminPaymentService.getOrders({
      status,
      from,
      to,
      page: page ? parseInt(page) : 1,
    });
  }

  @Get('orders/:id')
  @ApiOperation({ summary: '주문 상세 / Order detail' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: '주문 상세 / Order detail' })
  async getOrderDetail(@Param('id') id: string) {
    return this.adminPaymentService.getOrderDetail(parseInt(id));
  }

  @Post('orders/:id/cancel')
  @ApiOperation({ summary: '어드민 환불 / Admin refund' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: '환불 완료 / Refund complete' })
  async cancelOrder(@Param('id') id: string, @Body() body: { reason: string }) {
    return this.adminPaymentService.cancelOrder(parseInt(id), body.reason);
  }

  // ──── 통계 / Statistics ────

  @Get('stats')
  @ApiOperation({ summary: '결제 통계 / Payment statistics' })
  @ApiResponse({ status: 200, description: '통계 데이터 / Stats data' })
  async getStats() {
    return this.adminPaymentService.getStats();
  }

  // ──── 상품 관리 / Product management ────

  @Get('products')
  @ApiOperation({ summary: '상품 관리 목록 / Product management list' })
  @ApiResponse({ status: 200, description: '상품 목록 / Product list' })
  async getProducts() {
    return this.adminPaymentService.getProducts();
  }

  @Patch('products/:id')
  @ApiOperation({ summary: '상품 수정 / Update product' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: '상품 수정 완료 / Product updated' })
  async updateProduct(
    @Param('id') id: string,
    @Body()
    body: { name?: string; price?: number; isActive?: boolean; metadata?: any },
  ) {
    return this.adminPaymentService.updateProduct(parseInt(id), body);
  }

  // ──── 쿠폰 관리 / Coupon management ────

  @Get('coupons')
  @ApiOperation({ summary: '쿠폰 관리 목록 / Coupon management list' })
  @ApiResponse({ status: 200, description: '쿠폰 목록 / Coupon list' })
  async getCoupons() {
    return this.adminPaymentService.getCoupons();
  }

  @Post('coupons')
  @ApiOperation({ summary: '쿠폰 생성 / Create coupon' })
  @ApiResponse({ status: 201, description: '쿠폰 생성 완료 / Coupon created' })
  async createCoupon(
    @Body()
    body: {
      code: string;
      name: string;
      type: string;
      value: number;
      targetProduct?: string;
      maxUses?: number;
      maxUsesPerUser?: number;
      startsAt?: string;
      expiresAt?: string;
    },
  ) {
    return this.adminPaymentService.createCoupon(body);
  }

  @Patch('coupons/:id')
  @ApiOperation({ summary: '쿠폰 수정 / Update coupon' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: '쿠폰 수정 완료 / Coupon updated' })
  async updateCoupon(
    @Param('id') id: string,
    @Body() body: { isActive?: boolean; maxUses?: number; expiresAt?: string },
  ) {
    return this.adminPaymentService.updateCoupon(parseInt(id), body);
  }
}
