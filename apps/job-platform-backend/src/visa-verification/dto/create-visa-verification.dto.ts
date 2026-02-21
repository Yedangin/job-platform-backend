/**
 * 비자 인증 생성/제출 DTO
 * Visa verification submission DTO
 */
import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum VerifyMethodInput {
  OCR = 'OCR',
  MANUAL = 'MANUAL',
}

export class CreateVisaVerificationDto {
  @ApiProperty({
    description: '비자 코드 / Visa code (e.g., E-7, D-2, F-4)',
    example: 'E-7',
  })
  @IsString()
  visaCode: string;

  @ApiPropertyOptional({
    description: '비자 세부유형 / Visa sub-type (e.g., E-7-1, H-2-5)',
    example: 'E-7-1',
  })
  @IsOptional()
  @IsString()
  visaSubType?: string;

  @ApiProperty({
    description: '비자 만료일 / Visa expiry date (YYYY-MM-DD)',
    example: '2027-06-30',
  })
  @IsDateString()
  visaExpiryDate: string;

  @ApiPropertyOptional({
    description:
      '외국인등록번호 / Foreign registration number (13 digits with hyphen)',
    example: '123456-1234567',
  })
  @IsOptional()
  @IsString()
  foreignRegistrationNumber?: string;

  @ApiProperty({
    description: '인증 방식 / Verification method',
    enum: VerifyMethodInput,
    example: 'MANUAL',
  })
  @IsEnum(VerifyMethodInput)
  verificationMethod: VerifyMethodInput;
}
