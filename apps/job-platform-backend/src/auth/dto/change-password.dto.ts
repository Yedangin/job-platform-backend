import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// 비밀번호 변경 요청 DTO / Change password request DTO
export class ChangePasswordDto {
  @ApiProperty({ example: 'currentPassword123' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: 'newPassword456' })
  @IsString()
  @MinLength(8, {
    message:
      '비밀번호는 8자 이상이어야 합니다 / Password must be at least 8 characters',
  })
  newPassword: string;
}
