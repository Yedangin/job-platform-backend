import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// OTP 검증 요청 DTO / Verify OTP request DTO
export class VerifyOtpDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'OTP 코드 / OTP code' })
  @IsString()
  @Length(4, 8)
  code: string;
}
