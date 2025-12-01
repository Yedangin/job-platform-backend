import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCorporateRegistrationDto } from './create-corporate-registration.dto';
import { VerificationStatus } from 'generated/prisma-user';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateCorporateRegistrationDto extends PartialType(
  CreateCorporateRegistrationDto,
) {
  @ApiPropertyOptional({
    description: 'Initial verification status',
    enum: VerificationStatus,
    default: VerificationStatus.PENDING,
  })
  @IsEnum(VerificationStatus)
  @IsOptional()
  verificationStatus?: VerificationStatus;
}
