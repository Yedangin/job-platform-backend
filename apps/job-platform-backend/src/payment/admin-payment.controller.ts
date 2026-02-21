/**
 * 결제 어드민 컨트롤러 / Payment admin controller
 *
 * 관리자 전용 결제/상품/쿠폰 관리 엔드포인트
 * Admin-only endpoints for payment/product/coupon management
 */
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { Session, RedisService, SessionData } from 'libs/common/src';
import { AdminPaymentService } from './admin-payment.service';

@ApiTags('Admin Payments / 결제 관리')
@Controller('admin/payments')
export class AdminPaymentController {
  constructor(
    private readonly adminPaymentService: AdminPaymentService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * 어드민 권한 확인 / Verify admin access
   */
  private async verifyAdmin(sessionId: string): Promise<void> {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    const raw = await this.redisService.get(`session:${sessionId}`);
    if (!raw) throw new UnauthorizedException('세션 만료 / Session expired');
    const session = JSON.parse(raw) as SessionData;
    if (String(session.role) !== '5') {
      throw new UnauthorizedException(
        '관리자 권한 필요 / Admin access required',
      );
    }
  }

  // ──── 주문 관리 / Order management ────

  @Get('orders')
  @ApiOperation({ summary: '전체 주문 목록 / All orders' })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'from', required: false })
  @ApiQuery({ name: 'to', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiResponse({ status: 200, description: '주문 목록 / Order list' })
  async getOrders(
    @Session() sessionId: string,
    @Query('status') status?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('page') page?: string,
  ) {
    await this.verifyAdmin(sessionId);
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
  async getOrderDetail(@Session() sessionId: string, @Param('id') id: string) {
    await this.verifyAdmin(sessionId);
    return this.adminPaymentService.getOrderDetail(parseInt(id));
  }

  @Post('orders/:id/cancel')
  @ApiOperation({ summary: '어드민 환불 / Admin refund' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: '환불 완료 / Refund complete' })
  async cancelOrder(
    @Session() sessionId: string,
    @Param('id') id: string,
    @Body() body: { reason: string },
  ) {
    await this.verifyAdmin(sessionId);
    return this.adminPaymentService.cancelOrder(parseInt(id), body.reason);
  }

  // ──── 통계 / Statistics ────

  @Get('stats')
  @ApiOperation({ summary: '결제 통계 / Payment statistics' })
  @ApiResponse({ status: 200, description: '통계 데이터 / Stats data' })
  async getStats(@Session() sessionId: string) {
    await this.verifyAdmin(sessionId);
    return this.adminPaymentService.getStats();
  }

  // ──── 상품 관리 / Product management ────

  @Get('products')
  @ApiOperation({ summary: '상품 관리 목록 / Product management list' })
  @ApiResponse({ status: 200, description: '상품 목록 / Product list' })
  async getProducts(@Session() sessionId: string) {
    await this.verifyAdmin(sessionId);
    return this.adminPaymentService.getProducts();
  }

  @Patch('products/:id')
  @ApiOperation({ summary: '상품 수정 / Update product' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: '상품 수정 완료 / Product updated' })
  async updateProduct(
    @Session() sessionId: string,
    @Param('id') id: string,
    @Body()
    body: { name?: string; price?: number; isActive?: boolean; metadata?: any },
  ) {
    await this.verifyAdmin(sessionId);
    return this.adminPaymentService.updateProduct(parseInt(id), body);
  }

  // ──── 쿠폰 관리 / Coupon management ────

  @Get('coupons')
  @ApiOperation({ summary: '쿠폰 관리 목록 / Coupon management list' })
  @ApiResponse({ status: 200, description: '쿠폰 목록 / Coupon list' })
  async getCoupons(@Session() sessionId: string) {
    await this.verifyAdmin(sessionId);
    return this.adminPaymentService.getCoupons();
  }

  @Post('coupons')
  @ApiOperation({ summary: '쿠폰 생성 / Create coupon' })
  @ApiResponse({ status: 201, description: '쿠폰 생성 완료 / Coupon created' })
  async createCoupon(
    @Session() sessionId: string,
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
    await this.verifyAdmin(sessionId);
    return this.adminPaymentService.createCoupon(body);
  }

  @Patch('coupons/:id')
  @ApiOperation({ summary: '쿠폰 수정 / Update coupon' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: '쿠폰 수정 완료 / Coupon updated' })
  async updateCoupon(
    @Session() sessionId: string,
    @Param('id') id: string,
    @Body() body: { isActive?: boolean; maxUses?: number; expiresAt?: string },
  ) {
    await this.verifyAdmin(sessionId);
    return this.adminPaymentService.updateCoupon(parseInt(id), body);
  }
}
