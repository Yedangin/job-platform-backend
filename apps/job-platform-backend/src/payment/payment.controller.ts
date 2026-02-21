import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Session, RedisService, SessionData } from 'libs/common/src';
import { PaymentService } from './payment.service';
import { ProductService } from './product.service';
import { CouponService } from './coupon.service';
import { ViewingCreditService } from './viewing-credit.service';
import {
  CreateOrderDto,
  ConfirmPaymentDto,
  CancelOrderDto,
  UseCreditDto,
} from './dto';

/**
 * 결제 REST 컨트롤러 / Payment REST controller
 *
 * Base path: /payments
 */
@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly productService: ProductService,
    private readonly couponService: CouponService,
    private readonly viewingCreditService: ViewingCreditService,
    private readonly redisService: RedisService,
  ) {}

  /** 세션에서 userId 추출 / Extract userId from session */
  private async getUserId(sessionId: string): Promise<string> {
    if (!sessionId)
      throw new UnauthorizedException('로그인이 필요합니다 / Login required');
    const sd = await this.redisService.get(`session:${sessionId}`);
    if (!sd)
      throw new UnauthorizedException(
        '세션이 만료되었습니다 / Session expired',
      );
    const session: SessionData = JSON.parse(sd);
    return session.userId;
  }

  // ================================================
  // 상품 조회 / Product endpoints
  // ================================================

  @Get('products')
  @ApiOperation({ summary: '상품 목록 / List products (active only)' })
  async listProducts() {
    return this.productService.findAll();
  }

  @Get('products/:code')
  @ApiOperation({ summary: '상품 상세 / Product detail by code' })
  async getProduct(@Param('code') code: string) {
    return this.productService.findByCode(code);
  }

  // ================================================
  // 주문 생성 / Create order
  // ================================================

  @Post('orders')
  @ApiOperation({ summary: '주문 생성 / Create order' })
  @ApiResponse({ status: 201, description: '주문 생성 완료 / Order created' })
  @ApiResponse({
    status: 400,
    description: '쿠폰 유효성 실패 / Coupon validation failed',
  })
  @ApiResponse({ status: 401, description: '인증 필요 / Auth required' })
  @ApiResponse({ status: 404, description: '상품 없음 / Product not found' })
  async createOrder(@Session() sessionId: string, @Body() dto: CreateOrderDto) {
    const userId = await this.getUserId(sessionId);
    return this.paymentService.createOrder(
      userId,
      dto.productCode,
      dto.targetJobId,
      dto.couponCode,
    );
  }

  // ================================================
  // 결제 확인 / Confirm payment
  // ================================================

  @Post('orders/:id/confirm')
  @ApiOperation({
    summary: '결제 확인 / Confirm payment (after PortOne checkout)',
  })
  @ApiParam({ name: 'id', type: 'number', description: '주문 ID / Order ID' })
  @ApiResponse({
    status: 200,
    description: '결제 확인 완료 / Payment confirmed',
  })
  @ApiResponse({ status: 400, description: '금액 불일치 / Amount mismatch' })
  @ApiResponse({ status: 401, description: '인증 필요 / Auth required' })
  @ApiResponse({ status: 404, description: '주문 없음 / Order not found' })
  @ApiResponse({ status: 409, description: '이미 처리됨 / Already processed' })
  @ApiResponse({ status: 500, description: '포트원 오류 / PortOne error' })
  async confirmPayment(
    @Session() sessionId: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ConfirmPaymentDto,
  ) {
    await this.getUserId(sessionId); // 인증 확인 / Auth check
    return this.paymentService.confirmPayment(id, dto.portonePaymentId);
  }

  // ================================================
  // 주문 상세 / Order detail
  // ================================================

  @Get('orders/:id')
  @ApiOperation({ summary: '주문 상세 / Order detail' })
  async getOrder(
    @Session() sessionId: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.getUserId(sessionId);
    return this.paymentService.getOrder(id);
  }

  // ================================================
  // 내 주문 목록 / My orders
  // ================================================

  @Get('orders/my')
  @ApiOperation({ summary: '내 주문 목록 / My orders' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getMyOrders(
    @Session() sessionId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = await this.getUserId(sessionId);
    return this.paymentService.getMyOrders(
      userId,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
    );
  }

  // ================================================
  // 주문 취소 / Cancel order
  // ================================================

  @Post('orders/:id/cancel')
  @ApiOperation({ summary: '주문 취소 / Cancel order' })
  @ApiParam({ name: 'id', type: 'number', description: '주문 ID / Order ID' })
  @ApiResponse({ status: 200, description: '취소 완료 / Cancelled' })
  @ApiResponse({ status: 400, description: '취소 불가 / Cannot cancel' })
  @ApiResponse({ status: 401, description: '인증 필요 / Auth required' })
  @ApiResponse({ status: 404, description: '주문 없음 / Order not found' })
  async cancelOrder(
    @Session() sessionId: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CancelOrderDto,
  ) {
    const userId = await this.getUserId(sessionId);
    return this.paymentService.cancelPayment(id, userId, dto.reason);
  }

  // ================================================
  // 열람권 잔고 조회 / Viewing credit balance
  // ================================================

  // ================================================
  // 쿠폰 검증 / Coupon validation
  // ================================================

  @Get('coupons/validate')
  @ApiOperation({ summary: '쿠폰 검증 / Validate coupon' })
  @ApiQuery({ name: 'code', required: true, type: String })
  @ApiQuery({ name: 'product', required: false, type: String })
  async validateCoupon(
    @Session() sessionId: string,
    @Query('code') code: string,
    @Query('product') product?: string,
  ) {
    const userId = await this.getUserId(sessionId);
    return this.couponService.validateForProduct(code, userId, product);
  }

  // ================================================
  // 열람권 잔고 / Viewing credit balance
  // ================================================

  @Get('viewing-credits/balance')
  @ApiTags('Viewing Credits / 열람권')
  @ApiOperation({ summary: '열람권 잔고 조회 / Viewing credit balance' })
  @ApiResponse({ status: 200, description: '잔고 정보 / Balance info' })
  @ApiResponse({ status: 401, description: '인증 필요 / Auth required' })
  async getCreditBalance(@Session() sessionId: string) {
    const userId = await this.getUserId(sessionId);
    return this.viewingCreditService.getBalance(userId);
  }

  // ================================================
  // 열람권 사용 / Use viewing credit
  // ================================================

  @Post('viewing-credits/use')
  @ApiTags('Viewing Credits / 열람권')
  @ApiOperation({ summary: '열람권 사용 / Use viewing credit' })
  @ApiResponse({ status: 200, description: '열람 성공 / View success' })
  @ApiResponse({
    status: 400,
    description: '열람권 부족 / Insufficient credits',
  })
  @ApiResponse({ status: 401, description: '인증 필요 / Auth required' })
  async useCredit(@Session() sessionId: string, @Body() dto: UseCreditDto) {
    const userId = await this.getUserId(sessionId);
    return this.viewingCreditService.useCredit(userId, dto.resumeId);
  }

  // ================================================
  // 열람 기록 / Viewing history
  // ================================================

  @Get('viewing-credits/history')
  @ApiTags('Viewing Credits / 열람권')
  @ApiOperation({ summary: '열람 기록 / Viewing history' })
  @ApiResponse({
    status: 200,
    description: '열람 기록 목록 / Viewing history list',
  })
  @ApiResponse({ status: 401, description: '인증 필요 / Auth required' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getViewingHistory(
    @Session() sessionId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = await this.getUserId(sessionId);
    return this.viewingCreditService.getViewingHistory(
      userId,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
    );
  }
}
