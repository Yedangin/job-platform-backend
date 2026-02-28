import { IsString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// 문의 등록 요청 DTO / Create support ticket request DTO
export class CreateSupportTicketDto {
  @ApiProperty({ example: '로그인 문제' })
  @IsString()
  @MinLength(2)
  title: string;

  @ApiProperty({ example: '로그인이 되지 않습니다.' })
  @IsString()
  @MinLength(5)
  content: string;

  @ApiPropertyOptional({ example: 'ACCOUNT' })
  @IsOptional()
  @IsString()
  category?: string;
}
