import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
} from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'User ID for the payment',
    example: 'user_123',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'User ID for the payment',
    example: '0',
  })
  @IsString()
  depositAmount: string;
}

export class ConfirmPaymentDto {
  @ApiProperty({
    description: 'Order ID from Toss Payments',
    example: 'payment_1234567890_user_123',
  })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({
    description: 'Payment key from Toss Payments',
    example: 'tgen_20241213123456_abc123',
  })
  @IsString()
  @IsNotEmpty()
  paymentKey: string;

  @ApiProperty({
    description: 'Payment amount as string',
    example: '10000',
  })
  @IsNumberString()
  @IsNotEmpty()
  amount: string;
}

export class FailPaymentDto {
  @ApiProperty({
    description: 'Error code from Toss Payments',
    example: 'INVALID_CARD_NUMBER',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Error message from Toss Payments',
    example: 'Invalid card number',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Order ID that failed',
    example: 'payment_1234567890_user_123',
  })
  @IsString()
  @IsNotEmpty()
  orderId: string;
}

export class GetWalletsQueryDto {
  @ApiProperty({
    description: 'Page number for pagination',
    example: '0',
    required: false,
    default: '0',
  })
  @IsOptional()
  @IsNumberString()
  page?: string = '0';

  @ApiProperty({
    description: 'Number of items per page',
    example: '10',
    required: false,
    default: '10',
  })
  @IsOptional()
  @IsNumberString()
  limit?: string = '10';
}
