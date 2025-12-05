import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from './create-user.dto';

export class UserDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: UserRole.MEMBER, enum: UserRole })
  role: UserRole;

  @ApiProperty({ example: 'john.doe@example.com', required: false })
  email?: string;

  @ApiProperty({ example: '+1234567890', required: false })
  phone?: string;

  @ApiProperty({ example: 'John Doe', required: false })
  fullName?: string;

  @ApiProperty({ example: UserStatus.ACTIVE, enum: UserStatus })
  status: UserStatus;

  @ApiProperty({ example: true })
  isEmailedVerified: boolean;

  @ApiProperty({ example: true })
  isPhoneVerified: boolean;

  @ApiProperty({ example: 'wallet-123', required: false })
  walletId?: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: string;
}

export class PaginationMetaDto {
  @ApiProperty({ example: 100, description: 'Total count of items' })
  count: number;

  @ApiProperty({ example: 1, description: 'Current page number' })
  page: number;

  @ApiProperty({ example: 10, description: 'Total number of pages' })
  pageCount: number;

  @ApiProperty({ example: 10, description: 'Items per page' })
  limit: number;
}

export class GetAllUsersResponseDto {
  @ApiProperty({ type: [UserDto] })
  data: UserDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}

export class UserResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'User retrieved successfully', required: false })
  message?: string;

  @ApiProperty({ type: UserDto })
  user: UserDto;
}

export class DeleteUserResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'User deleted successfully' })
  message: string;
}
