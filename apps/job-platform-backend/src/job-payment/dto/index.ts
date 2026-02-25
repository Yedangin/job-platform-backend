import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

// ========================================
// CreateOrderDto
// ========================================
export class CreateOrderDto {
  @ApiProperty({
    description:
      '상품 코드 / Product code (e.g. STANDARD_ALBA, PREMIUM_FULLTIME)',
    example: 'PREMIUM_FULLTIME',
  })
  @IsString()
  @IsNotEmpty()
  productCode: string;

  @ApiPropertyOptional({
    description: '연결할 공고 ID / Job posting ID to link',
    example: '12345',
  })
  @IsOptional()
  @IsString()
  jobPostingId?: string;
}

// ========================================
// VerifyPaymentDto
// ========================================
export class VerifyPaymentDto {
  @ApiProperty({
    description: 'PortOne(아임포트) 결제 고유번호 / PortOne payment UID',
    example: 'imp_123456789',
  })
  @IsString()
  @IsNotEmpty()
  impUid: string;
}

// ========================================
// CancelOrderDto
// ========================================
export class CancelOrderDto {
  @ApiPropertyOptional({
    description: '취소 사유 / Cancellation reason',
    example: '단순 변심',
  })
  @IsOptional()
  @IsString()
  reason?: string;
}

// ========================================
// GetMyOrdersQueryDto
// ========================================
export class GetMyOrdersQueryDto {
  @ApiPropertyOptional({ description: '페이지 번호 / Page number', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    description: '페이지 크기 / Items per page',
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}

// ========================================
// UpgradeToPremiumDto
// ========================================
export class UpgradeToPremiumDto {
  @ApiProperty({
    description: '프리미엄 업그레이드할 공고 ID / Job posting ID to upgrade',
    example: '12345',
  })
  @IsString()
  @IsNotEmpty()
  jobPostingId: string;
}

// ========================================
// ConfirmPremiumUpgradeDto
// ========================================
export class ConfirmPremiumUpgradeDto {
  @ApiProperty({
    description: 'PortOne(아임포트) 결제 고유번호 / PortOne payment UID',
    example: 'imp_123456789',
  })
  @IsString()
  @IsNotEmpty()
  impUid: string;
}

// ========================================
// GetAllOrdersQueryDto (Admin)
// ========================================
export class GetAllOrdersQueryDto {
  @ApiPropertyOptional({
    description:
      '결제 상태 필터 / Payment status filter (PENDING, PAID, FAILED, CANCELLED)',
    example: 'PAID',
  })
  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @ApiPropertyOptional({
    description: '상품 코드 필터 / Product code filter',
    example: 'PREMIUM_FULLTIME',
  })
  @IsOptional()
  @IsString()
  productCode?: string;

  @ApiPropertyOptional({ description: '페이지 번호 / Page number', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    description: '페이지 크기 / Items per page',
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}

// ========================================
// AdminGrantPremiumDto
// ========================================
export class AdminGrantPremiumDto {
  @ApiProperty({
    description: '프리미엄 부여 일수 / Number of days to grant premium',
    example: 30,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  days: number;
}
