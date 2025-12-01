import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateCorporateRegistrationDto } from 'apps/job-platform-backend/src/corporate-registration/dto/create-corporate-registration.dto';
import {
  DeleteCorporateRegistrationRequest,
  UpdateCoporateRegistrationReqeust,
} from 'types/auth/corporate-registration';
import { SuccessResponse } from 'types/common/response';
import { CorporateRegistrationService } from './corporate-registration.service';

@Controller('corporate-registration')
export class CorporateRegistrationController {
  constructor(private corporateService: CorporateRegistrationService) {}
  @GrpcMethod('CorporateRegistration', 'CreateCorporateRegistration')
  async create(
    request: CreateCorporateRegistrationDto,
  ): Promise<SuccessResponse> {
    const result = await this.corporateService.create(request);
    return { message: 'Corporate registration created successfully' };
  }

  @GrpcMethod('CorporateRegistration', 'UpdateCorporateRegistration')
  async update(
    request: UpdateCoporateRegistrationReqeust,
  ): Promise<SuccessResponse> {
    const result = await this.corporateService.update(request);
    return { message: 'Corporate registration udpated successfully' };
  }

  @GrpcMethod('CorporateRegistration', 'DeleteCorporateRegistration')
  async remove(
    request: DeleteCorporateRegistrationRequest,
  ): Promise<SuccessResponse> {
    const result = this.corporateService.remove(request.id);
    return { message: 'Corporate registration deleted successfully' };
  }
}
