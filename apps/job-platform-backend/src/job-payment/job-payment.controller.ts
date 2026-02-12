import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { Public } from 'libs/common/src/common/decorator/public.decorator';
import { Session } from 'libs/common/src/common/decorator/session.decorator';
import { RedisService } from 'libs/common/src';
import { JobPaymentService } from './job-payment.service';

interface SessionData {
  userId: string;
  role: string;
}

@Controller('payment')
export class JobPaymentController {
  constructor(
    private readonly jobPaymentService: JobPaymentService,
    private readonly redisService: RedisService,
  ) {}

  private async requireAuth(sessionId: string): Promise<SessionData> {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    const sd = await this.redisService.get(`session:${sessionId}`);
    if (!sd) throw new UnauthorizedException('Invalid session');
    return JSON.parse(sd);
  }

  private async requireCorporate(sessionId: string): Promise<string> {
    const session = await this.requireAuth(sessionId);
    if (session.role !== 'CORPORATE' && session.role !== 'ADMIN') {
      throw new UnauthorizedException('Corporate access required');
    }
    return session.userId;
  }

  private async requireAdmin(sessionId: string): Promise<string> {
    const session = await this.requireAuth(sessionId);
    if (session.role !== 'ADMIN') {
      throw new UnauthorizedException('Admin access required');
    }
    return session.userId;
  }

  // ========================================
  // Public
  // ========================================
  @Public()
  @Get('products')
  async getProducts(@Query('boardType') boardType?: string) {
    return this.jobPaymentService.getProducts(boardType);
  }

  @Public()
  @Get('products/:code')
  async getProductByCode(@Param('code') code: string) {
    return this.jobPaymentService.getProductByCode(code);
  }

  // ========================================
  // Corporate
  // ========================================
  @Post('orders')
  async createOrder(
    @Session() sessionId: string,
    @Body() body: { productCode: string; jobPostingId?: string },
  ) {
    const userId = await this.requireCorporate(sessionId);
    return this.jobPaymentService.createOrder(userId, body);
  }

  @Post('orders/:orderNo/verify')
  async verifyPayment(
    @Session() sessionId: string,
    @Param('orderNo') orderNo: string,
    @Body() body: { impUid: string },
  ) {
    const userId = await this.requireCorporate(sessionId);
    return this.jobPaymentService.verifyPayment(userId, orderNo, body);
  }

  @Post('orders/:orderNo/cancel')
  async cancelOrder(
    @Session() sessionId: string,
    @Param('orderNo') orderNo: string,
    @Body() body: { reason?: string },
  ) {
    const userId = await this.requireCorporate(sessionId);
    return this.jobPaymentService.cancelOrder(userId, orderNo, body?.reason);
  }

  @Get('orders/my')
  async getMyOrders(
    @Session() sessionId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = await this.requireCorporate(sessionId);
    return this.jobPaymentService.getMyOrders(userId, {
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  // ========================================
  // Admin
  // ========================================
  @Get('orders')
  async getAllOrders(
    @Session() sessionId: string,
    @Query('paymentStatus') paymentStatus?: string,
    @Query('productCode') productCode?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    await this.requireAdmin(sessionId);
    return this.jobPaymentService.getAllOrders({
      paymentStatus,
      productCode,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get('stats')
  async getPaymentStats(@Session() sessionId: string) {
    await this.requireAdmin(sessionId);
    return this.jobPaymentService.getPaymentStats();
  }
}
