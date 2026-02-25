import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SelectInterviewSlotDto {
  @ApiProperty({
    description: '선택한 면접 슬롯 ID / Selected interview slot ID',
    example: '42',
  })
  @IsString()
  slotId: string;
}
