import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserInformationDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User ID',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: 'Profile image URL',
    required: false,
  })
  @IsString()
  @IsOptional()
  profileImage?: string;

  @ApiProperty({
    example: 'Male',
    description: 'User gender',
    required: false,
  })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({
    example: '123 Main Street',
    description: 'User address',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    example: 'United States',
    description: 'User country',
    required: false,
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    example: 'New York',
    description: 'User city',
    required: false,
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    example: 'https://example.com/cv.pdf',
    description: 'CV form URL',
    required: false,
  })
  @IsString()
  @IsOptional()
  cvForm?: string;

  @ApiProperty({
    example: 'Additional information about the user',
    description: 'Additional information',
    required: false,
  })
  @IsString()
  @IsOptional()
  additionalInformation?: string;
}
