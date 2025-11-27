import { Injectable } from '@nestjs/common';
import { CreateMemberVerificationDto } from './dto/create-member-verification.dto';
import { UpdateMemberVerificationDto } from './dto/update-member-verification.dto';

@Injectable()
export class MemberVerificationService {
  create(createMemberVerificationDto: CreateMemberVerificationDto) {
    return 'This action adds a new memberVerification';
  }

  findAll() {
    return `This action returns all memberVerification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} memberVerification`;
  }

  update(id: number, updateMemberVerificationDto: UpdateMemberVerificationDto) {
    return `This action updates a #${id} memberVerification`;
  }

  remove(id: number) {
    return `This action removes a #${id} memberVerification`;
  }
}
