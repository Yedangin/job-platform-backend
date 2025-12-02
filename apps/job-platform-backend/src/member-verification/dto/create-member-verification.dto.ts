import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { VerificationStatus } from 'generated/prisma-user';

export class CreateMemberVerificationDto {
  @ApiProperty({
    description: 'User ID associated with the verification',
    example: 'clk1234567890',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({
    description: 'URL or path to the passport photo',
    example: 'https://example.com/passport.jpg',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  passportPhoto?: string;

  @ApiPropertyOptional({
    description: 'URL or path to the selfie photo',
    example: 'https://example.com/selfie.jpg',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  selfiePhoto?: string;

  @ApiPropertyOptional({
    description: 'Initial verification status',
    enum: VerificationStatus,
    default: VerificationStatus.PENDING,
  })
  @IsEnum(VerificationStatus)
  @IsOptional()
  verificationStatus?: VerificationStatus;
}
