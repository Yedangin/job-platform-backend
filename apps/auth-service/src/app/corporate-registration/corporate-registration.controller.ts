import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  CreateCorporateRegistrationRequest,
  DeleteCorporateRegistrationRequest,
  UpdateCoporateRegistrationReqeust,
} from 'types/auth/corporate-registration';
import { SuccessResponse } from 'types/common/response';
import { CorporateRegistrationService } from './corporate-registration.service';
import { httpToGrpcStatus } from '@in-job/common';

@Controller('corporate-registration')
export class CorporateRegistrationController {
  constructor(private corporateService: CorporateRegistrationService) {}
  @GrpcMethod('CorporateRegistration', 'CreateCorporateRegistration')
  async create(
    request: CreateCorporateRegistrationRequest
  ): Promise<SuccessResponse> {
    try {
      const result = await this.corporateService.create(request);
      return { message: 'Corporate registration created successfully' };
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('CorporateRegistration', 'UpdateCorporateRegistration')
  async update(
    request: UpdateCoporateRegistrationReqeust
  ): Promise<SuccessResponse> {
    try {
      const result = await this.corporateService.update(request);
      return { message: 'Corporate registration udpated successfully' };
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('CorporateRegistration', 'DeleteCorporateRegistration')
  async remove(
    request: DeleteCorporateRegistrationRequest
  ): Promise<SuccessResponse> {
    try {
      const result = this.corporateService.remove(request.id);
      return { message: 'Corporate registration deleted successfully' };
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }
}
