import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { MemberVerificationService } from './member-verification.service';
import { CreateMemberVerificationDto } from './dto/create-member-verification.dto';
import { UpdateMemberVerificationDto } from './dto/update-member-verification.dto';
import {
  DeleteMemberVerificationRequest,
  SuccessResponse,
} from 'types/auth/member-verification';

@Controller()
export class MemberVerificationController {
  constructor(
    private readonly memberVerificationService: MemberVerificationService,
  ) {}

  @MessagePattern('createMemberVerification')
  create(@Payload() createMemberVerificationDto: CreateMemberVerificationDto) {
    return this.memberVerificationService.create(createMemberVerificationDto);
  }

  @MessagePattern('findAllMemberVerification')
  findAll() {
    return this.memberVerificationService.findAll();
  }

  @MessagePattern('findOneMemberVerification')
  findOne(@Payload() id: number) {
    return this.memberVerificationService.findOne(id);
  }

  @MessagePattern('updateMemberVerification')
  update(@Payload() updateMemberVerificationDto: UpdateMemberVerificationDto) {
    return this.memberVerificationService.update(
      updateMemberVerificationDto.id,
      updateMemberVerificationDto,
    );
  }

  @GrpcMethod('MemberVerificationService', 'DeleteVerification')
  async remove(
    request: DeleteMemberVerificationRequest,
  ): Promise<SuccessResponse> {
    console.log('the request from member verification: ', request);
    return { message: 'successfully deleted' };
  }
}
