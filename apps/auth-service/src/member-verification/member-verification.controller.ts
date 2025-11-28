import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { MemberVerificationService } from './member-verification.service';
import { CreateMemberVerificationDto } from './dto/create-member-verification.dto';
import { UpdateMemberVerificationDto } from './dto/update-member-verification.dto';
import {
  DeleteMemberVerificationRequest,
  SuccessResponse,
  UpdateMemberVerificationRequest,
  UpsertMemberVerificationRequest,
} from 'types/auth/member-verification';

@Controller()
export class MemberVerificationController {
  constructor(
    private readonly memberVerificationService: MemberVerificationService,
  ) {}

  @GrpcMethod('MemberVerificationService', 'UpsertVerification')
  async create(
    request: UpsertMemberVerificationRequest,
  ): Promise<SuccessResponse> {
    const result = await this.memberVerificationService.create(request);
    return { message: 'successfully created.' };
  }

  @GrpcMethod('MemberVerificationService', 'UpdateVerification')
  async update(
    request: UpdateMemberVerificationRequest,
  ): Promise<SuccessResponse> {
    const result = await this.memberVerificationService.update(request);
    return { message: 'successfully updated.' };
  }

  @GrpcMethod('MemberVerificationService', 'DeleteVerification')
  async remove(
    request: DeleteMemberVerificationRequest,
  ): Promise<SuccessResponse> {
    const result = await this.memberVerificationService.remove(request.id);
    return { message: 'successfully deleted' };
  }
}
