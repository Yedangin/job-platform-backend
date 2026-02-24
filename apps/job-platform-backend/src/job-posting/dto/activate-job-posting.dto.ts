import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ActivateJobPostingDto {
  @ApiPropertyOptional({ description: '주문 ID / Order ID' })
  @IsOptional()
  @IsString()
  orderId?: string;
}
