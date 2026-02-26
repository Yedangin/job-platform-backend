import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

// 로그인 요청 DTO / Login request DTO
export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;

  @ApiPropertyOptional({
    example: 'seeker',
    description: 'seeker | company (탭 구분)',
  })
  @IsOptional()
  @IsString()
  memberType?: string;
}
