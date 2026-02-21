import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

/**
 * 주문 생성 DTO / Create order DTO
 */
export class CreateOrderDto {
  @ApiProperty({
    description: '상품 코드 / Product code',
    example: 'JOB_PREMIUM',
  })
  @IsString()
  productCode: string;

  @ApiPropertyOptional({
    description:
      '대상 공고 ID (공고 관련 상품) / Target job ID (for job posting products)',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  targetJobId?: number;

  @ApiPropertyOptional({
    description: '쿠폰 코드 / Coupon code',
    example: 'WELCOME_VIEW_5',
  })
  @IsOptional()
  @IsString()
  couponCode?: string;
}
