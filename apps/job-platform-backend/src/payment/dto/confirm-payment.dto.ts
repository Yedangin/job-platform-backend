import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * 결제 확인 DTO / Confirm payment DTO
 * 프론트에서 포트원 결제 완료 후 호출
 * Called from frontend after PortOne payment completion
 */
export class ConfirmPaymentDto {
  @ApiProperty({
    description: '포트원 결제 ID / PortOne payment ID',
    example: 'payment_1234567890',
  })
  @IsString()
  portonePaymentId: string;
}
