import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PaymentPrismaService } from '@in-job/common';
// import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {
  CreatePaymentRequest,
  CreatePaymentResponse,
  ConfirmPaymentRequest,
  FailPaymentRequest,
  GetAllWalletsRequest,
  AllWalletsWithMetaResponse,
  DepositStatus,
} from 'types/payment/payment';
import { ConfigService } from '@nestjs/config';

interface TossPaymentResponse {
  orderId: string;
  paymentKey: string;
  totalAmount: number;
  currency: string;
  status: string;
  checkout?: {
    url: string;
  };
  // Legacy fields (might not be present in newer API versions)
  checkoutUrl?: string;
  nextRedirectPcUrl?: string;
  nextRedirectMobileUrl?: string;
  nextRedirectAppUrl?: string;
}

interface ConfirmPaymentResponse {
  orderId: string;
  paymentKey: string;
  totalAmount: number;
  status: string;
}

@Injectable()
export class DepositService {
  private readonly logger = new Logger(DepositService.name);
  private readonly secretKey: string =
    process.env.PAYMENT_SECRET_KEY || 'default_secret_key';
  private readonly baseURL: string =
    process.env.PAYMENT_BASE_URL || 'https://api.tosspayments.com/v1';

  constructor(
    private readonly prisma: PaymentPrismaService,
    private readonly configService: ConfigService
  ) {}

  private get authHeaders() {
    // const token = Buffer.from(this.secretKey + ':').toString('base64');
    const token = 'dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==';
    return `Basic ${token}`;
  }

  async getAllWallets(
    request: GetAllWalletsRequest
  ): Promise<AllWalletsWithMetaResponse> {
    try {
      const page = Number(request.basicQuery?.page) || 0;
      const limit = Number(request.basicQuery?.limit) || 10;
      const skip = page * limit;

      const [wallets, total] = await Promise.all([
        this.prisma.wallet.findMany({
          include: {
            deposits: {
              orderBy: { createdAt: 'desc' },
              take: 5,
            },
          },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.wallet.count(),
      ]);

      return {
        data: wallets.map((wallet) => ({
          id: wallet.id,
          userId: wallet.userId,
          balance: wallet.balance || '0',
          createdAt: wallet.createdAt.toISOString(),
          updatedAt: wallet.updatedAt.toISOString(),
          deposits: wallet.deposits.map((deposit) => ({
            id: deposit.id,
            userId: deposit.userId,
            walletId: deposit.walletId,
            depositedAmount: deposit.depositedAmount?.toString() || '0',
            beforeAmount: deposit.beforeAmount?.toString() || '0',
            status: this.mapDepositStatusToProto(deposit.status),
            createdAt: deposit.createdAt.toISOString(),
            updatedAt: deposit.updatedAt.toISOString(),
          })),
        })),
        meta: {
          count: total,
          page,
          pageCount: Math.ceil(total / limit),
          limit,
        },
      };
    } catch (error) {
      this.logger.error('Error fetching wallets:', error);
      throw error;
    }
  }

  async createPayment(
    request: CreatePaymentRequest
  ): Promise<CreatePaymentResponse> {
    try {
      // 1. First, find or create wallet for the user
      let wallet = await this.prisma.wallet.findUnique({
        where: { userId: request.userId },
      });

      if (!wallet) {
        wallet = await this.prisma.wallet.create({
          data: {
            userId: request.userId,
            balance: '0',
          },
        });
        this.logger.log(`Created new wallet for userId: ${request.userId}`);
      } else {
        this.logger.log(`Found existing wallet for userId: ${request.userId}`);
      }

      // 2. Generate unique order ID for the payment (keep it short to avoid column length issues)
      const orderId = `payment_${Date.now()}_${request.userId}`;
      const orderName = `Wallet Deposit for ${request.userId}`;
      // const amount = 10000;

      // 3. Prepare payment URLs
      const successURL =
        process.env.PAYMENT_SUCCESS_URL ||
        'http://localhost:8005/payment/success';
      const failURL =
        process.env.PAYMENT_FAIL_URL || 'http://localhost:8005/payment/fail';

      // 4. Prepare Toss Payments request body for checkout
      const body = {
        amount: request?.depositedAmount,
        orderId: orderId,
        orderName: orderName,
        method: 'CARD',
        customerKey: request.userId,
        successUrl: successURL,
        failUrl: failURL,
      };

      // Validate required fields
      if (
        !body.amount ||
        // !body.orderId ||
        // !body.orderName ||
        !body.customerKey
      ) {
        throw new Error('Missing required fields for Toss Payments API');
      }

      const headers = {
        Authorization: this.authHeaders,
        'Content-Type': 'application/json',
      };

      this.logger.log(`Initiating payment for userId: ${request.userId}`);

      // 5. Call Toss Payments API
      this.logger.log(
        'Calling Toss Payments API with body:',
        JSON.stringify(body)
      );
      this.logger.log(
        'Using headers:',
        JSON.stringify({ ...headers, Authorization: '[HIDDEN]' })
      );

      // Create payment with Toss Payments
      let response: AxiosResponse<TossPaymentResponse>;
      try {
        response = await axios.post(`${this.baseURL}/payments`, body, {
          headers,
        });
      } catch (axiosError: unknown) {
        const error = axiosError as AxiosError;
        this.logger.error('Toss Payments API Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message,
        });
        throw new Error(
          `Toss Payments API failed: ${
            error.response?.status
          } - ${JSON.stringify(error.response?.data)}`
        );
      }

      const tossData = response.data;
      this.logger.log(
        `Toss Payments response received for orderId:`,
        JSON.stringify(tossData)
      );

      console.log('The data : ', tossData);

      // 6. Save transaction in DB (without the problematic deposit relationship)
      const transaction = await this.prisma.transaction.create({
        data: {
          // Don't set tossOrderId here due to foreign key constraint issue
          tossPaymentKey: tossData.paymentKey,
          amount: tossData.totalAmount,
          currency: tossData.currency || 'KRW',
          method: 'CARD',
          status: 'READY',
          userId:
            request.userId.length > 50
              ? request.userId.slice(0, 50)
              : request.userId,
        },
      });

      // Store the toss order ID separately for reference
      const tossOrderIdForReference = tossData.orderId;

      // Store order ID mapping in a separate log entry for easy lookup
      await this.prisma.transactionLog.create({
        data: {
          transactionId: transaction.id,
          status: 'READY',
          message: `ORDER_ID_MAPPING:${tossOrderIdForReference}`,
          source: 'system',
        },
      });

      this.logger.log(
        `Created order ID mapping: ${tossOrderIdForReference} -> ${transaction.id}`
      );

      await this.prisma.transactionLog.create({
        data: {
          transactionId: transaction.id,
          status: 'READY',
          message: `Payment created successfully. Toss Order ID: ${tossOrderIdForReference}`,
          requestData: JSON.stringify(body),
          responseData: JSON.stringify(tossData),
          source: 'api',
        },
      });

      return {
        message: 'Payment created successfully',
        checkoutUrl: `${tossData?.checkout?.url}`,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Payment creation failed for userId ${request.userId}:`,
        errorMessage
      );

      // Save failed transaction record
      try {
        const failedTransaction = await this.prisma.transaction.create({
          data: {
            // Don't set tossOrderId due to foreign key constraint
            amount: 10000, // Default amount
            currency: 'KRW',
            method: 'CARD',
            status: 'FAILED',
            userId:
              request.userId.length > 50
                ? request.userId.slice(0, 50)
                : request.userId,
            failureReason:
              errorMessage.length > 255
                ? errorMessage.slice(0, 255)
                : errorMessage,
          },
        });

        await this.prisma.transactionLog.create({
          data: {
            transactionId: failedTransaction.id,
            status: 'FAILED',
            message: 'Payment creation failed',
            errorData: JSON.stringify(errorMessage),
            source: 'api',
          },
        });
      } catch (dbError) {
        this.logger.error('Failed to save failed transaction:', dbError);
      }

      throw error;
    }
  }

  async confirmPayment(
    request: ConfirmPaymentRequest
  ): Promise<{ success: boolean; message: string }> {
    try {
      this.logger.log(`Confirming payment for orderId: ${request.orderId}`);

      const headers = {
        Authorization: this.authHeaders,
        'Content-Type': 'application/json',
      };

      const confirmBody = {
        paymentKey: request.paymentKey,
        orderId: request.orderId,
        amount: parseInt(request.amount),
      };

      // 1. Confirm payment with Toss
      const response: AxiosResponse<ConfirmPaymentResponse> = await axios.post(
        `${this.baseURL}/payments/confirm`,
        confirmBody,
        { headers }
      );

      const tossData = response.data;
      this.logger.log(
        `Payment confirmed with Toss for orderId: ${request.orderId}`
      );

      // 2. Find the transaction by order ID mapping in logs
      const orderMapping = await this.prisma.transactionLog.findFirst({
        where: {
          message: `ORDER_ID_MAPPING:${request.orderId}`,
        },
        include: {
          transactionRef: true,
        },
      });

      if (!orderMapping?.transactionRef) {
        throw new NotFoundException('Transaction not found');
      }

      const transaction = orderMapping.transactionRef;

      if (!transaction) {
        this.logger.error(
          `Transaction not found for orderId: ${request.orderId}`
        );
        throw new NotFoundException('Transaction not found');
      }

      // 3. Update transaction status
      const updatedTransaction = await this.prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: 'DONE',
          tossPaymentKey: request.paymentKey,
          paidAt: new Date(),
        },
      });

      await this.prisma.transactionLog.create({
        data: {
          transactionId: updatedTransaction.id,
          status: 'DONE',
          message: 'Payment confirmed successfully',
          requestData: JSON.stringify(confirmBody),
          responseData: JSON.stringify(tossData),
          source: 'api',
        },
      });

      // 4. Get the wallet
      const wallet = await this.prisma.wallet.findUnique({
        where: { userId: transaction.userId },
      });

      if (!wallet) {
        throw new NotFoundException('Wallet not found');
      }

      // 5. Update wallet balance and create deposit record
      const currentBalance = BigInt(wallet.balance || '0');
      const addedAmount = BigInt(parseInt(request.amount));
      const newBalance = (currentBalance + addedAmount).toString();

      // Update wallet balance
      await this.prisma.wallet.update({
        where: { id: wallet.id },
        data: { balance: newBalance },
      });

      // Create deposit record with beforeAmount
      const deposit = await this.prisma.deposit.create({
        data: {
          userId: transaction.userId || '',
          walletId: wallet.id,
          depositedAmount: request?.amount,
          beforeAmount: wallet.balance || '0', // Store the balance before this deposit
          status: 'APPROVED',
        },
      });

      // 6. Note: The relation between transaction and deposit is handled via tossOrderId
      // No need to explicitly link them as the schema shows deposit -> transaction relation

      this.logger.log(
        `Payment completed successfully for orderId: ${request.orderId}, depositId: ${deposit.id}`
      );

      return {
        success: true,
        message: 'Payment confirmed successfully',
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Payment confirmation failed for orderId ${request.orderId}:`,
        errorMessage
      );

      // Update transaction status to failed
      try {
        const orderMapping = await this.prisma.transactionLog.findFirst({
          where: {
            message: `ORDER_ID_MAPPING:${request.orderId}`,
          },
          include: {
            transactionRef: true,
          },
        });

        if (orderMapping?.transactionRef) {
          await this.prisma.transaction.update({
            where: { id: orderMapping.transactionRef.id },
            data: {
              status: 'FAILED',
              failureReason:
                errorMessage.length > 255
                  ? errorMessage.slice(0, 255)
                  : errorMessage,
            },
          });

          await this.prisma.transactionLog.create({
            data: {
              transactionId: orderMapping.transactionRef.id,
              status: 'FAILED',
              message: 'Payment confirmation failed',
              errorData: JSON.stringify(errorMessage),
              source: 'api',
            },
          });
        }
      } catch (dbError) {
        this.logger.error('Failed to update transaction status:', dbError);
      }

      throw error;
    }
  }

  async failPayment(
    request: FailPaymentRequest
  ): Promise<{ success: boolean; message: string }> {
    try {
      this.logger.log(
        `Processing payment failure for orderId: ${request.orderId}`
      );

      // Update transaction status - find by order ID mapping
      const orderMapping = await this.prisma.transactionLog.findFirst({
        where: {
          message: `ORDER_ID_MAPPING:${request.orderId}`,
        },
        include: {
          transactionRef: true,
        },
      });

      if (!orderMapping?.transactionRef) {
        throw new NotFoundException('Transaction not found');
      }

      const transaction = await this.prisma.transaction.update({
        where: { id: orderMapping.transactionRef.id },
        data: {
          status: 'FAILED',
          failureReason:
            request.message.length > 255
              ? request.message.slice(0, 255)
              : request.message,
        },
      });

      await this.prisma.transactionLog.create({
        data: {
          transactionId: transaction.id,
          status: 'FAILED',
          message: request.message,
          errorData: JSON.stringify({
            code: request.code,
            message: request.message,
          }),
          source: 'api',
        },
      });

      return {
        success: true,
        message: 'Payment failure recorded successfully',
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Failed to process payment failure for orderId ${request.orderId}:`,
        errorMessage
      );
      throw error;
    }
  }

  private mapDepositStatusToProto(status: string): DepositStatus {
    switch (status) {
      case 'PENDING':
        return DepositStatus.PENDING;
      case 'APPROVED':
        return DepositStatus.APPROVED;
      case 'REJECTED':
        return DepositStatus.REJECTED;
      default:
        return DepositStatus.APPLIED_STATUS_UNSPECIFIED;
    }
  }
}
