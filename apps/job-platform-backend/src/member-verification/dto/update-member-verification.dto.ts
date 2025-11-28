import { PartialType } from '@nestjs/swagger';
import { CreateMemberVerificationDto } from './create-member-verification.dto';

export class UpdateMemberVerificationDto extends PartialType(
  CreateMemberVerificationDto,
) {}
