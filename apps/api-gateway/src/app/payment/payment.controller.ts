import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Inject,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  BasicQuery,
  grpcToHttpStatus,
  Roles,
  RolesGuard,
  SessionAuthGuard,
} from '@in-job/common';
import {
  AllDepositsWithMetaResponse,
  PAYMENT_PACKAGE_NAME,
  PaymentServiceClient,
} from 'types/payment/payment';
import {
  CreatePaymentDto,
  ConfirmPaymentDto,
  FailPaymentDto,
  GetWalletsQueryDto,
} from './dto/payment.dto';
import {
  CreatePaymentResponseDto,
  ConfirmPaymentResponseDto,
  FailPaymentResponseDto,
  GetWalletsResponseDto,
  DepositDto,
} from './dto/payment-response.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  private paymentService: PaymentServiceClient;

  constructor(
    @Inject(PAYMENT_PACKAGE_NAME) private readonly client: ClientGrpc
  ) {}

  onModuleInit() {
    this.paymentService =
      this.client.getService<PaymentServiceClient>('PaymentService');
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Get('wallets')
  @ApiOperation({ summary: 'Get all wallets with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Wallets retrieved successfully',
    type: GetWalletsResponseDto,
  })
  async getAllWallets(
    @Query() basicQuery: BasicQuery
  ): Promise<GetWalletsResponseDto> {
    try {
      const result = await firstValueFrom(
        this.paymentService.getAllWallets({
          basicQuery,
        })
      );
      return result as GetWalletsResponseDto;
    } catch (error: unknown) {
      const grpcError = error as {
        details?: string;
        message?: string;
        code?: number;
      };
      throw new HttpException(
        grpcError.details ?? grpcError.message ?? 'Internal server error',
        grpcToHttpStatus(grpcError.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Get('deposits')
  @ApiOperation({ summary: 'Get all deposits with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Deposits retrieved successfully',
    type: DepositDto,
  })
  async getAllDeposits(
    @Query() basicQuery: BasicQuery
  ): Promise<AllDepositsWithMetaResponse> {
    try {
      const result = await firstValueFrom(
        this.paymentService.getAllDeposits({
          basicQuery,
        })
      );
      return result;
    } catch (error: unknown) {
      const grpcError = error as {
        details?: string;
        message?: string;
        code?: number;
      };
      throw new HttpException(
        grpcError.details ?? grpcError.message ?? 'Internal server error',
        grpcToHttpStatus(grpcError.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('MEMBER', 'CORPORATE', 'ADMIN', 'SUPERADMIN')
  @Post('deposit/create')
  @ApiOperation({
    summary: 'Create a new deposit payment',
    description:
      'Initiates a deposit payment process with Toss Payments and returns a checkout URL',
  })
  @ApiResponse({
    status: 201,
    description: 'Payment created successfully',
    type: CreatePaymentResponseDto,
  })
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto
  ): Promise<CreatePaymentResponseDto> {
    try {
      const result = await firstValueFrom(
        this.paymentService.createPayment({
          userId: createPaymentDto.userId,
          depositedAmount: createPaymentDto.depositAmount,
        })
      );
      return result;
    } catch (error: unknown) {
      const grpcError = error as {
        details?: string;
        message?: string;
        code?: number;
      };
      throw new HttpException(
        grpcError.details ?? grpcError.message ?? 'Internal server error',
        grpcToHttpStatus(grpcError.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('MEMBER', 'CORPORATE', 'ADMIN', 'SUPERADMIN')
  @Post('deposit/confirm')
  @ApiOperation({
    summary: 'Confirm a deposit payment',
    description:
      'Confirms a payment with Toss Payments and updates the user wallet balance',
  })
  @ApiResponse({
    status: 200,
    description: 'Payment confirmed successfully',
    type: ConfirmPaymentResponseDto,
  })
  async confirmPayment(
    @Body() confirmPaymentDto: ConfirmPaymentDto
  ): Promise<ConfirmPaymentResponseDto> {
    try {
      const result = await firstValueFrom(
        this.paymentService.confirmPayment({
          orderId: confirmPaymentDto.orderId,
          paymentKey: confirmPaymentDto.paymentKey,
          amount: confirmPaymentDto.amount,
        })
      );
      return result as ConfirmPaymentResponseDto;
    } catch (error: unknown) {
      const grpcError = error as {
        details?: string;
        message?: string;
        code?: number;
      };
      throw new HttpException(
        grpcError.details ?? grpcError.message ?? 'Internal server error',
        grpcToHttpStatus(grpcError.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('MEMBER', 'CORPORATE', 'ADMIN', 'SUPERADMIN')
  @Post('deposit/fail')
  @ApiOperation({
    summary: 'Record a failed deposit payment',
    description:
      'Records a failed payment attempt for tracking and debugging purposes',
  })
  @ApiResponse({
    status: 200,
    description: 'Payment failure recorded successfully',
    type: FailPaymentResponseDto,
  })
  async failPayment(
    @Body() failPaymentDto: FailPaymentDto
  ): Promise<FailPaymentResponseDto> {
    try {
      const result = await firstValueFrom(
        this.paymentService.failPayment({
          code: failPaymentDto.code,
          message: failPaymentDto.message,
          orderId: failPaymentDto.orderId,
        })
      );
      return result as FailPaymentResponseDto;
    } catch (error: unknown) {
      const grpcError = error as {
        details?: string;
        message?: string;
        code?: number;
      };
      throw new HttpException(
        grpcError.details ?? grpcError.message ?? 'Internal server error',
        grpcToHttpStatus(grpcError.code ?? 2)
      );
    }
  }
}
