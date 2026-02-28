import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import {
  Public,
  CurrentSession,
  Roles,
  SessionAuthGuard,
  RolesGuard,
  SessionData,
} from 'libs/common/src';
import { JobPaymentService } from './job-payment.service';
import {
  CreateOrderDto,
  VerifyPaymentDto,
  CancelOrderDto,
  GetMyOrdersQueryDto,
  UpgradeToPremiumDto,
  ConfirmPremiumUpgradeDto,
  GetAllOrdersQueryDto,
  AdminGrantPremiumDto,
  AdminRevokePremiumDto,
} from './dto';

@ApiTags('Job Payments')
@ApiBearerAuth()
@UseGuards(SessionAuthGuard, RolesGuard)
@Controller('payment')
export class JobPaymentController {
  constructor(private readonly jobPaymentService: JobPaymentService) {}

  // ========================================
  // Public endpoints (specific routes FIRST)
  // ========================================

  @Public()
  @Get('products')
  @ApiOperation({
    summary:
      '상품 목록 조회 / List payment products (Standard 0원, Premium 50,000원)',
  })
  @ApiResponse({ status: 200, description: 'List of available products' })
  async getProducts(@Query('boardType') boardType?: string) {
    return this.jobPaymentService.getProducts(boardType);
  }

  @Public()
  @Get('products/:code')
  @ApiOperation({ summary: '상품 상세 조회 / Product detail by code' })
  @ApiParam({ name: 'code', description: 'Product code (e.g. STANDARD_ALBA)' })
  @ApiResponse({ status: 200, description: 'Product detail' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async getProductByCode(@Param('code') code: string) {
    return this.jobPaymentService.getProductByCode(code);
  }

  // ========================================
  // Corporate endpoints (specific routes before :param)
  // ========================================

  @Get('orders/my')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({ summary: '내 주문 내역 / My order history' })
  @ApiResponse({ status: 200, description: 'Paginated order history' })
  async getMyOrders(
    @CurrentSession() session: SessionData,
    @Query() query: GetMyOrdersQueryDto,
  ) {
    return this.jobPaymentService.getMyOrders(session.userId, {
      page: query.page || 1,
      limit: query.limit || 20,
    });
  }

  @Post('orders')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({
    summary: '주문 생성 / Create order (price snapshot captured)',
  })
  @ApiResponse({
    status: 201,
    description: 'Order created with price snapshot',
  })
  @ApiResponse({ status: 403, description: 'Corporate profile required' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async createOrder(
    @CurrentSession() session: SessionData,
    @Body() dto: CreateOrderDto,
  ) {
    return this.jobPaymentService.createOrder(session.userId, {
      productCode: dto.productCode,
      jobPostingId: dto.jobPostingId,
    });
  }

  @Post('orders/:orderNo/verify')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({
    summary: '결제 검증 / Verify payment via PortOne callback',
  })
  @ApiParam({
    name: 'orderNo',
    description: 'Order number (e.g. ORD-20260225-00001)',
  })
  @ApiResponse({
    status: 200,
    description: 'Payment verified and order marked PAID',
  })
  @ApiResponse({
    status: 400,
    description: 'Payment verification failed or amount mismatch',
  })
  @ApiResponse({ status: 403, description: 'Not the owner of this order' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async verifyPayment(
    @CurrentSession() session: SessionData,
    @Param('orderNo') orderNo: string,
    @Body() dto: VerifyPaymentDto,
  ) {
    return this.jobPaymentService.verifyPayment(session.userId, orderNo, {
      impUid: dto.impUid,
    });
  }

  @Post('orders/:orderNo/cancel')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({ summary: '주문 취소 / Cancel order' })
  @ApiParam({ name: 'orderNo', description: 'Order number' })
  @ApiResponse({ status: 200, description: 'Order cancelled' })
  @ApiResponse({ status: 403, description: 'Not the owner of this order' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async cancelOrder(
    @CurrentSession() session: SessionData,
    @Param('orderNo') orderNo: string,
    @Body() dto: CancelOrderDto,
  ) {
    return this.jobPaymentService.cancelOrder(
      session.userId,
      orderNo,
      dto.reason,
    );
  }

  @Post('upgrade-to-premium')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({
    summary: '프리미엄 업그레이드 시작 / Start premium upgrade for a posting',
  })
  @ApiResponse({
    status: 201,
    description: 'Premium upgrade order created (PENDING payment)',
  })
  @ApiResponse({
    status: 400,
    description: 'Posting not ACTIVE or already PREMIUM',
  })
  @ApiResponse({
    status: 403,
    description: 'Corporate profile required or not the owner',
  })
  @ApiResponse({
    status: 404,
    description: 'Job posting or premium product not found',
  })
  async upgradeToPremium(
    @CurrentSession() session: SessionData,
    @Body() dto: UpgradeToPremiumDto,
  ) {
    return this.jobPaymentService.upgradeToPremium(session.userId, {
      jobPostingId: dto.jobPostingId,
    });
  }

  @Post('upgrade-to-premium/:orderNo/confirm')
  @Roles('CORPORATE', 'ADMIN')
  @ApiOperation({
    summary: '프리미엄 업그레이드 확정 / Confirm premium upgrade after payment',
  })
  @ApiParam({
    name: 'orderNo',
    description: 'Order number from upgrade-to-premium',
  })
  @ApiResponse({
    status: 200,
    description: 'Premium upgrade confirmed, posting tier upgraded',
  })
  @ApiResponse({
    status: 400,
    description: 'Order not paid, not a premium order, or amount mismatch',
  })
  @ApiResponse({ status: 403, description: 'Not the owner of this order' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async confirmPremiumUpgrade(
    @CurrentSession() session: SessionData,
    @Param('orderNo') orderNo: string,
    @Body() dto: ConfirmPremiumUpgradeDto,
  ) {
    return this.jobPaymentService.confirmPremiumUpgrade(
      session.userId,
      orderNo,
      { impUid: dto.impUid },
    );
  }

  // ========================================
  // Admin endpoints
  // ========================================

  @Get('admin/orders')
  @Roles('ADMIN')
  @ApiOperation({ summary: '전체 주문 관리 / Admin: all orders (filterable)' })
  @ApiResponse({ status: 200, description: 'Paginated admin order list' })
  async getAllOrders(@Query() query: GetAllOrdersQueryDto) {
    return this.jobPaymentService.getAllOrders({
      paymentStatus: query.paymentStatus,
      productCode: query.productCode,
      page: query.page || 1,
      limit: query.limit || 20,
    });
  }

  @Get('admin/stats')
  @Roles('ADMIN')
  @ApiOperation({ summary: '매출 통계 / Admin: revenue statistics' })
  @ApiResponse({
    status: 200,
    description: 'Revenue stats (total, by product, by month)',
  })
  async getPaymentStats() {
    return this.jobPaymentService.getPaymentStats();
  }

  @Post('admin/grant-premium/:jobId')
  @Roles('ADMIN')
  @ApiOperation({
    summary:
      '프리미엄 수동 부여 (이중확인 후) / Admin: manually grant premium (after double confirmation)',
  })
  @ApiParam({ name: 'jobId', description: 'Job posting ID' })
  @ApiResponse({ status: 200, description: 'Premium granted to posting' })
  @ApiResponse({ status: 404, description: 'Job posting not found' })
  async grantPremium(
    @CurrentSession() session: SessionData,
    @Param('jobId') jobId: string,
    @Body() dto: AdminGrantPremiumDto,
  ) {
    return this.jobPaymentService.adminGrantPremium(
      session.userId,
      jobId,
      dto.days,
      {
        reason: dto.reason,
        memo: dto.memo,
        grantFeatured: dto.grantFeatured,
      },
    );
  }

  @Post('admin/revoke-premium/:jobId')
  @Roles('ADMIN')
  @ApiOperation({
    summary:
      '프리미엄 해제 (이중확인 후) / Admin: revoke premium (after double confirmation)',
  })
  @ApiParam({ name: 'jobId', description: 'Job posting ID' })
  @ApiResponse({ status: 200, description: 'Premium revoked from posting' })
  @ApiResponse({
    status: 400,
    description: 'Already standard posting',
  })
  @ApiResponse({ status: 404, description: 'Job posting not found' })
  async revokePremium(
    @CurrentSession() session: SessionData,
    @Param('jobId') jobId: string,
    @Body() dto: AdminRevokePremiumDto,
  ) {
    return this.jobPaymentService.adminRevokePremium(session.userId, jobId, {
      reason: dto.reason,
      memo: dto.memo,
      forceNoRefund: dto.forceNoRefund,
    });
  }

  @Get('admin/premium-history/:jobId')
  @Roles('ADMIN')
  @ApiOperation({
    summary:
      '프리미엄 이력 조회 / Admin: premium action + payment history for a posting',
  })
  @ApiParam({ name: 'jobId', description: 'Job posting ID' })
  @ApiResponse({
    status: 200,
    description: 'Premium history with admin actions and payment records',
  })
  @ApiResponse({ status: 404, description: 'Job posting not found' })
  async getPremiumHistory(@Param('jobId') jobId: string) {
    return this.jobPaymentService.getPremiumHistory(jobId);
  }
}
