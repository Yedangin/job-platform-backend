import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { MemberVerificationService } from './member-verification.service';
import {
  DeleteMemberVerificationRequest,
  SuccessResponse,
  UpdateMemberVerificationRequest,
  UpsertMemberVerificationRequest,
} from 'types/auth/member-verification';
import { httpToGrpcStatus } from 'libs/common/src/common/helper/htto-to-grpc.helper';

@Controller()
export class MemberVerificationController {
  constructor(
    private readonly memberVerificationService: MemberVerificationService,
  ) {}

  @GrpcMethod('MemberVerificationService', 'UpsertVerification')
  async create(
    request: UpsertMemberVerificationRequest,
  ): Promise<SuccessResponse> {
    try {
      const result = await this.memberVerificationService.create(request);
      return { message: 'successfully created.' };
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('MemberVerificationService', 'UpdateVerification')
  async update(
    request: UpdateMemberVerificationRequest,
  ): Promise<SuccessResponse> {
    try {
      const result = await this.memberVerificationService.update(request);
      return { message: 'successfully updated.' };
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('MemberVerificationService', 'DeleteVerification')
  async remove(
    request: DeleteMemberVerificationRequest,
  ): Promise<SuccessResponse> {
    try {
      const result = await this.memberVerificationService.remove(request.id);
      return { message: 'successfully deleted' };
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }
}
