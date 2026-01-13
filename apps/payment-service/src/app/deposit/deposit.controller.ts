import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { httpToGrpcStatus } from '@in-job/common';
import {
  CreatePaymentRequest,
  CreatePaymentResponse,
  ConfirmPaymentRequest,
  FailPaymentRequest,
  GetAllWalletsRequest,
  AllWalletsWithMetaResponse,
  GetAllDepositsRequest,
  AllDepositsWithMetaResponse,
} from 'types/payment/payment';
import { DepositService } from './deposit.service';

@Controller()
export class DepositController {
  constructor(private readonly paymentService: DepositService) {}

  @GrpcMethod('PaymentService', 'GetAllWallets')
  async getAllWallets(
    request: GetAllWalletsRequest
  ): Promise<AllWalletsWithMetaResponse> {
    try {
      // console.log("the request : ", request)
      return await this.paymentService.getAllWallets(request);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Internal server error';
      const statusCode = (error as { status?: number })?.status ?? 500;
      throw new RpcException({
        code: httpToGrpcStatus(statusCode),
        message: errorMessage,
      });
    }
  }

  @GrpcMethod('PaymentService', 'GetAllDeposits')
  async getAllDeposits(
    request: GetAllDepositsRequest
  ): Promise<AllDepositsWithMetaResponse> {
    try {
      // console.log("the request : ", request)
      return await this.paymentService.getAllDeposits(request);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Internal server error';
      const statusCode = (error as { status?: number })?.status ?? 500;
      throw new RpcException({
        code: httpToGrpcStatus(statusCode),
        message: errorMessage,
      });
    }
  }

  @GrpcMethod('PaymentService', 'CreatePayment')
  async createPayment(
    request: CreatePaymentRequest
  ): Promise<CreatePaymentResponse> {
    try {
      return await this.paymentService.createPayment(request);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Internal server error';
      const statusCode = (error as { status?: number })?.status ?? 500;
      throw new RpcException({
        code: httpToGrpcStatus(statusCode),
        message: errorMessage,
      });
    }
  }

  @GrpcMethod('PaymentService', 'ConfirmPayment')
  async confirmPayment(
    request: ConfirmPaymentRequest
  ): Promise<{ success: boolean; message: string }> {
    try {
      return await this.paymentService.confirmPayment(request);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Internal server error';
      const statusCode = (error as { status?: number })?.status ?? 500;
      throw new RpcException({
        code: httpToGrpcStatus(statusCode),
        message: errorMessage,
      });
    }
  }

  @GrpcMethod('PaymentService', 'FailPayment')
  async failPayment(
    request: FailPaymentRequest
  ): Promise<{ success: boolean; message: string }> {
    try {
      return await this.paymentService.failPayment(request);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Internal server error';
      const statusCode = (error as { status?: number })?.status ?? 500;
      throw new RpcException({
        code: httpToGrpcStatus(statusCode),
        message: errorMessage,
      });
    }
  }
}
