import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum UserRole {
  USER_ROLE_UNSPECIFIED = 0,
  GUEST = 1,
  MEMBER = 2,
  CORPORATE = 3,
  ADMIN = 4,
  SUPERADMIN = 5,
}

export enum UserStatus {
  USER_STATUS_UNSPECIFIED = 0,
  PENDING = 1,
  ACTIVE = 2,
  SUSPENDED = 3,
  REJECTED = 4,
  INACTIVE = 5,
}

export class CreateUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'User phone number',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
    required: false,
  })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    example: 'MEMBER',
    description: 'User role',
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({
    example: 'ACTIVE',
    description: 'User status',
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;

  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'User password',
    required: false,
  })
  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;
}
