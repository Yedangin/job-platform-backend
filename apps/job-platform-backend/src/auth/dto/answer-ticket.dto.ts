import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// 문의 답변 요청 DTO / Answer support ticket request DTO
export class AnswerTicketDto {
  @ApiProperty({ example: '확인 후 처리해드리겠습니다.' })
  @IsString()
  @MinLength(1)
  answer: string;
}
