import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * 주문 취소 DTO / Cancel order DTO
 */
export class CancelOrderDto {
  @ApiProperty({
    description: '취소 사유 / Cancellation reason',
    example: '단순 변심',
  })
  @IsString()
  reason: string;
}
