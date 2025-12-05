import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ example: 'cat_123', description: 'Category ID' })
  id: string;

  @ApiProperty({ example: 'Technology', description: 'Category name' })
  name?: string;

  @ApiProperty({
    example: 'Tech related topics',
    description: 'Category description',
  })
  description?: string;

  @ApiProperty({ example: 'cat_parent_123', description: 'Parent category ID' })
  parentCategoryId?: string;

  @ApiProperty({ description: 'Parent category', type: () => CategoryDto })
  parent?: CategoryDto;

  @ApiProperty({ description: 'Child categories', type: () => [CategoryDto] })
  children?: CategoryDto[];

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Creation date',
  })
  createdAt: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Update date',
  })
  updatedAt: string;
}

export class CategoryResponseDto {
  @ApiProperty({ example: true, description: 'Success status' })
  success: boolean;

  @ApiProperty({
    example: 'Category created successfully',
    description: 'Response message',
  })
  message?: string;

  @ApiProperty({ type: CategoryDto })
  category: CategoryDto;
}

export class GetAllCategoriesResponseDto {
  @ApiProperty({ type: [CategoryDto] })
  data: CategoryDto[];

  @ApiProperty({
    type: 'object',
    properties: {
      total: { type: 'number', example: 100 },
      page: { type: 'number', example: 1 },
      limit: { type: 'number', example: 10 },
      totalPages: { type: 'number', example: 10 },
    },
  })
  meta: any;
}

export class DeleteCategoryResponseDto {
  @ApiProperty({ example: true, description: 'Success status' })
  success: boolean;

  @ApiProperty({
    example: 'Category deleted successfully',
    description: 'Response message',
  })
  message: string;
}
