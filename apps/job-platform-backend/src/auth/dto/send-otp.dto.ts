import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// OTP 발송 요청 DTO / Send OTP request DTO
export class SendOtpDto {
  @ApiProperty({ example: 'user@example.com', description: '이메일 / Email' })
  @IsEmail(
    {},
    {
      message: '유효한 이메일 주소를 입력하세요 / Please enter a valid email',
    },
  )
  email: string;
}
