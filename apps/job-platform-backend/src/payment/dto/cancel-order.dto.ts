import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

/**
 * 주문 취소 DTO / Cancel order DTO
 */
export class CancelOrderDto {
  @ApiProperty({
    description: '취소 사유 / Cancellation reason',
    example: '단순 변심',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  reason: string;
}
