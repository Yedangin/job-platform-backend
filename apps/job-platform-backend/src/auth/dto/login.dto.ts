import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'password' })
  password: string;

  @ApiPropertyOptional({
    example: 'seeker',
    description: 'seeker | company (탭 구분)',
  })
  memberType?: string;
}
