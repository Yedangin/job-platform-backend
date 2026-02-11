import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';

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

  @ApiProperty({
    example: 'INDIVIDUAL',
    enum: ['INDIVIDUAL', 'CORPORATE'],
    description: 'User type: INDIVIDUAL (개인 회원) or CORPORATE (기업 회원)',
  })
  @IsEnum(['INDIVIDUAL', 'CORPORATE'])
  role: 'INDIVIDUAL' | 'CORPORATE';
}
