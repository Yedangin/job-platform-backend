import { ApiProperty } from '@nestjs/swagger';

export class UserInformationDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  userId: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  profileImage?: string;

  @ApiProperty({ example: 'Male', required: false })
  gender?: string;

  @ApiProperty({ example: '123 Main Street', required: false })
  address?: string;

  @ApiProperty({ example: 'United States', required: false })
  country?: string;

  @ApiProperty({ example: 'New York', required: false })
  city?: string;

  @ApiProperty({ example: 'https://example.com/cv.pdf', required: false })
  cvForm?: string;

  @ApiProperty({
    example: 'Additional information about the user',
    required: false,
  })
  additionalInformation?: string;

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

export class GetAllUserInformationsResponseDto {
  @ApiProperty({ type: [UserInformationDto] })
  data: UserInformationDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}

export class UserInformationResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({
    example: 'User information retrieved successfully',
    required: false,
  })
  message?: string;

  @ApiProperty({ type: UserInformationDto })
  userInformation: UserInformationDto;
}

export class DeleteUserInformationResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'User information deleted successfully' })
  message: string;
}
