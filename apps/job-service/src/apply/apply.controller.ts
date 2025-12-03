import { Controller } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  AllAppliesWithMetaResponse,
  ApplyResponse,
  CreateApplyRequest,
  DeleteApplyRequest,
  DeleteApplyResponse,
  GetAllAppliesRequest,
  GetApplyRequest,
  SingleApplyResponse,
  UpdateApplyRequest,
} from 'types/job/apply';
import { httpToGrpcStatus } from 'libs/common/src';

@Controller('apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @GrpcMethod('ApplyService', 'CreateApply')
  async CreateApply(request: CreateApplyRequest): Promise<ApplyResponse> {
    try {
      return await this.applyService.create(request);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('ApplyService', 'GetAllApplies')
  async GetAllApplies(
    request: GetAllAppliesRequest,
  ): Promise<AllAppliesWithMetaResponse> {
    try {
      const applies = await this.applyService.findAll(request.basicQuery);
      return applies;
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('ApplyService', 'GetApply')
  async GetApply(request: GetApplyRequest): Promise<SingleApplyResponse> {
    try {
      return await this.applyService.findOne(request.applyId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('ApplyService', 'UpdateApply')
  async UpdateApply(request: UpdateApplyRequest): Promise<ApplyResponse> {
    try {
      return this.applyService.update({
        applyId: request.applyId,
        isReviewed: request.isReviewed,
        status: request.status as any,
        userInfoId: request.userInfoId,
      });
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('ApplyService', 'DeleteApply')
  async DeleteApply(request: DeleteApplyRequest): Promise<DeleteApplyResponse> {
    try {
      return await this.applyService.remove(request.applyId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }
}
