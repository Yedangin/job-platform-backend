import { Controller } from '@nestjs/common';
import { SanctionService } from './sanction.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  AllSanctionsWithMetaResponse,
  SanctionResponse,
  CreateSanctionRequest,
  DeleteSanctionRequest,
  DeleteSanctionResponse,
  GetAllSanctionsRequest,
  GetSanctionRequest,
  SingleSanctionResponse,
  UpdateSanctionRequest,
} from 'types/auth/sanction';
import { httpToGrpcStatus } from '@in-job/common';

@Controller('sanction')
export class SanctionController {
  constructor(private readonly sanctionService: SanctionService) {}

  @GrpcMethod('SanctionService', 'CreateSanction')
  async CreateSanction(request: CreateSanctionRequest): Promise<SanctionResponse> {
    try {
      return await this.sanctionService.create(request);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('SanctionService', 'GetAllSanctions')
  async GetAllSanctions(
    request: GetAllSanctionsRequest
  ): Promise<AllSanctionsWithMetaResponse> {
    try {
      const sanctions = await this.sanctionService.findAll(request.basicQuery);
      return sanctions;
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('SanctionService', 'GetSanction')
  async GetSanction(request: GetSanctionRequest): Promise<SingleSanctionResponse> {
    try {
      return await this.sanctionService.findOne(request.sanctionId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('SanctionService', 'UpdateSanction')
  async UpdateSanction(request: UpdateSanctionRequest): Promise<SanctionResponse> {
    try {
      return this.sanctionService.update({
        sanctionId: request.sanctionId,
        sanctionType: request.sanctionType as any,
        reason: request.reason,
        startDate: request.startDate,
        endDate: request.endDate,
      });
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('SanctionService', 'DeleteSanction')
  async DeleteSanction(request: DeleteSanctionRequest): Promise<DeleteSanctionResponse> {
    try {
      return await this.sanctionService.remove(request.sanctionId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }
}
