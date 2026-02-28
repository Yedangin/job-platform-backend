import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// 비밀번호 확인 요청 DTO / Verify password request DTO
export class VerifyPasswordDto {
  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}
