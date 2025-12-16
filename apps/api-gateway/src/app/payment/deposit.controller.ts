// import {
//   Controller,
//   Post,
//   Body,
//   Inject,
//   HttpException,
//   UseGuards,
// } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { ClientGrpc } from '@nestjs/microservices';
// import { firstValueFrom } from 'rxjs';
// import {
//   grpcToHttpStatus,
//   Roles,
//   RolesGuard,
//   SessionAuthGuard,
// } from '@in-job/common';
// import {
//   PAYMENT_PACKAGE_NAME,
//   PaymentServiceClient,
// } from 'types/payment/payment';
// import {
//   CreatePaymentDto,
//   ConfirmPaymentDto,
//   FailPaymentDto,
// } from './dto/payment.dto';
// import {
//   CreatePaymentResponseDto,
//   ConfirmPaymentResponseDto,
//   FailPaymentResponseDto,
// } from './dto/payment-response.dto';

// @ApiTags('Deposit')
// @Controller('deposit')
// export class DepositController {
//   private paymentService: PaymentServiceClient;

//   constructor(
//     @Inject(PAYMENT_PACKAGE_NAME) private readonly client: ClientGrpc
//   ) {}

//   onModuleInit() {
//     this.paymentService =
//       this.client.getService<PaymentServiceClient>('PaymentService');
//   }

//   @UseGuards(SessionAuthGuard, RolesGuard)
//   @Roles('MEMBER', 'CORPORATE', 'ADMIN', 'SUPERADMIN')
//   @Post('create')
//   @ApiOperation({
//     summary: 'Create a new deposit payment',
//     description:
//       'Initiates a deposit payment process with Toss Payments. Returns a checkout URL where the user can complete the payment.',
//   })
//   @ApiResponse({
//     status: 201,
//     description:
//       'Deposit payment created successfully. Use the checkout URL to complete the payment.',
//     type: CreatePaymentResponseDto,
//   })
//   @ApiResponse({
//     status: 400,
//     description: 'Bad request - Invalid user ID or request data',
//   })
//   @ApiResponse({
//     status: 500,
//     description: 'Internal server error - Payment service unavailable',
//   })
//   async createDeposit(
//     @Body() createPaymentDto: CreatePaymentDto
//   ): Promise<CreatePaymentResponseDto> {
//     try {
//       const result = await firstValueFrom(
//         this.paymentService.createPayment({
//           userId: createPaymentDto.userId,
//         })
//       );
//       return result;
//     } catch (error: unknown) {
//       const grpcError = error as {
//         details?: string;
//         message?: string;
//         code?: number;
//       };
//       throw new HttpException(
//         grpcError.details ?? grpcError.message ?? 'Internal server error',
//         grpcToHttpStatus(grpcError.code ?? 2)
//       );
//     }
//   }

//   @UseGuards(SessionAuthGuard, RolesGuard)
//   @Roles('MEMBER', 'CORPORATE', 'ADMIN', 'SUPERADMIN')
//   @Post('confirm')
//   @ApiOperation({
//     summary: 'Confirm a deposit payment',
//     description:
//       'Confirms a payment with Toss Payments after successful payment. This updates the user wallet balance and creates a deposit record.',
//   })
//   @ApiResponse({
//     status: 200,
//     description:
//       'Deposit payment confirmed successfully. Wallet balance has been updated.',
//     type: ConfirmPaymentResponseDto,
//   })
//   @ApiResponse({
//     status: 404,
//     description: 'Transaction not found',
//   })
//   @ApiResponse({
//     status: 500,
//     description: 'Internal server error - Payment confirmation failed',
//   })
//   async confirmDeposit(
//     @Body() confirmPaymentDto: ConfirmPaymentDto
//   ): Promise<ConfirmPaymentResponseDto> {
//     try {
//       const result = await firstValueFrom(
//         this.paymentService.confirmPayment({
//           orderId: confirmPaymentDto.orderId,
//           paymentKey: confirmPaymentDto.paymentKey,
//           amount: confirmPaymentDto.amount,
//         })
//       );
//       return result as ConfirmPaymentResponseDto;
//     } catch (error: unknown) {
//       const grpcError = error as {
//         details?: string;
//         message?: string;
//         code?: number;
//       };
//       throw new HttpException(
//         grpcError.details ?? grpcError.message ?? 'Internal server error',
//         grpcToHttpStatus(grpcError.code ?? 2)
//       );
//     }
//   }

//   @UseGuards(SessionAuthGuard, RolesGuard)
//   @Roles('MEMBER', 'CORPORATE', 'ADMIN', 'SUPERADMIN')
//   @Post('fail')
//   @ApiOperation({
//     summary: 'Record a failed deposit payment',
//     description:
//       'Records a failed payment attempt for tracking and debugging purposes. This is typically called when Toss Payments redirects to the failure URL.',
//   })
//   @ApiResponse({
//     status: 200,
//     description: 'Deposit payment failure recorded successfully.',
//     type: FailPaymentResponseDto,
//   })
//   @ApiResponse({
//     status: 404,
//     description: 'Transaction not found',
//   })
//   @ApiResponse({
//     status: 500,
//     description: 'Internal server error - Failed to record payment failure',
//   })
//   async failDeposit(
//     @Body() failPaymentDto: FailPaymentDto
//   ): Promise<FailPaymentResponseDto> {
//     try {
//       const result = await firstValueFrom(
//         this.paymentService.failPayment({
//           code: failPaymentDto.code,
//           message: failPaymentDto.message,
//           orderId: failPaymentDto.orderId,
//         })
//       );
//       return result as FailPaymentResponseDto;
//     } catch (error: unknown) {
//       const grpcError = error as {
//         details?: string;
//         message?: string;
//         code?: number;
//       };
//       throw new HttpException(
//         grpcError.details ?? grpcError.message ?? 'Internal server error',
//         grpcToHttpStatus(grpcError.code ?? 2)
//       );
//     }
//   }
// }
