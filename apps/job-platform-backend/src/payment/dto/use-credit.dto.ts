import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

/**
 * 열람권 사용 DTO / Use viewing credit DTO
 */
export class UseCreditDto {
  @ApiProperty({
    description: '열람할 이력서 ID / Resume ID to view',
    example: 1,
  })
  @IsNumber()
  resumeId: number;
}
