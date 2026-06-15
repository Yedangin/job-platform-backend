import { ApiProperty } from '@nestjs/swagger';
import {
  Equals,
  IsBoolean,
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsString()
  fullName: string;

  @ApiProperty({ example: '1995-01-20' })
  @IsDateString()
  birthDate: string;

  @ApiProperty({
    example: 'INDIVIDUAL',
    enum: ['INDIVIDUAL', 'CORPORATE'],
    description: 'User type: INDIVIDUAL (개인 회원) or CORPORATE (기업 회원)',
  })
  @IsEnum(['INDIVIDUAL', 'CORPORATE'])
  role: 'INDIVIDUAL' | 'CORPORATE';

  @IsBoolean()
  @Equals(true)
  termsConsent: true;

  @IsBoolean()
  @Equals(true)
  privacyConsent: true;

  @IsBoolean()
  @Equals(true)
  internationalTransferConsent: true;

  @IsBoolean()
  @IsOptional()
  marketingConsent?: boolean;

  @IsBoolean()
  @Equals(true)
  ageConfirmed: true;

  @IsString()
  policyVersion: string;

  @IsString()
  @IsOptional()
  consentChannel?: string;
}
