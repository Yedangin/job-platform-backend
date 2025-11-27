import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MemberVerificationService } from './member-verification.service';
import { CreateMemberVerificationDto } from './dto/create-member-verification.dto';
import { UpdateMemberVerificationDto } from './dto/update-member-verification.dto';

@Controller()
export class MemberVerificationController {
  constructor(private readonly memberVerificationService: MemberVerificationService) {}

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
    return this.memberVerificationService.update(updateMemberVerificationDto.id, updateMemberVerificationDto);
  }

  @MessagePattern('removeMemberVerification')
  remove(@Payload() id: number) {
    return this.memberVerificationService.remove(id);
  }
}
