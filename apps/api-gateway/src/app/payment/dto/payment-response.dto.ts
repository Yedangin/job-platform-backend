import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Payment created successfully',
  })
  message?: string;

  @ApiProperty({
    description: 'Checkout URL for payment',
    example: 'https://api.tosspayments.com/v1/payments/checkout/...',
  })
  checkoutUrl: string;
}

export class ConfirmPaymentResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Payment confirmed successfully',
  })
  message: string;
}

export class FailPaymentResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Payment failure recorded successfully',
  })
  message: string;
}

export class DepositDto {
  @ApiProperty({
    description: 'Deposit ID',
    example: 'dep_123',
  })
  id: string;

  @ApiProperty({
    description: 'User ID',
    example: 'user_123',
  })
  userId: string;

  @ApiProperty({
    description: 'Wallet ID',
    example: 'wallet_123',
  })
  walletId: string;

  @ApiProperty({
    description: 'Deposited amount',
    example: '10000',
    required: false,
  })
  depositedAmount?: string;

  @ApiProperty({
    description: 'Balance before deposit',
    example: '5000',
    required: false,
  })
  beforeAmount?: string;

  @ApiProperty({
    description: 'Deposit status',
    enum: [0, 1, 2, 3],
    example: 2,
  })
  status: number;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-12-13T10:30:00Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Update timestamp',
    example: '2024-12-13T10:30:00Z',
  })
  updatedAt: string;
}

export class WalletDto {
  @ApiProperty({
    description: 'Wallet ID',
    example: 'wallet_123',
  })
  id: string;

  @ApiProperty({
    description: 'User ID',
    example: 'user_123',
  })
  userId: string;

  @ApiProperty({
    description: 'Current balance',
    example: '15000',
  })
  balance: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-12-13T10:30:00Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Update timestamp',
    example: '2024-12-13T10:30:00Z',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Recent deposits',
    type: [DepositDto],
  })
  deposits: DepositDto[];
}

export class PaginationMetaDto {
  @ApiProperty({
    description: 'Total count of items',
    example: 100,
  })
  count: number;

  @ApiProperty({
    description: 'Current page number',
    example: 0,
  })
  page: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
  })
  pageCount: number;

  @ApiProperty({
    description: 'Items per page',
    example: 10,
  })
  limit: number;
}

export class GetWalletsResponseDto {
  @ApiProperty({
    description: 'List of wallets',
    type: [WalletDto],
  })
  data: WalletDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}
