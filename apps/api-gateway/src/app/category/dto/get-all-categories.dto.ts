import { ApiProperty } from '@nestjs/swagger';
import { BasicQuery } from '@in-job/common';

export class GetAllCategoriesDto extends BasicQuery {
  @ApiProperty({
    example: 1,
    description: 'Page number',
    default: 1,
    required: false,
  })
  page?: string = '1';

  @ApiProperty({
    example: 10,
    description: 'Items per page',
    default: 10,
    required: false,
  })
  limit?: string = '10';

  @ApiProperty({
    example: '',
    description: 'Search keyword',
    required: false,
  })
  searchKeyword?: string = '';

  @ApiProperty({
    example: 'createdAt',
    description: 'Field to sort by',
    required: false,
  })
  sortField?: string = 'createdAt';

  @ApiProperty({
    example: 'desc',
    description: 'Sort direction',
    required: false,
  })
  sortType?: string = 'desc';

  @ApiProperty({
    example: '',
    description: 'Filter model',
    required: false,
  })
  filterModel?: string = '';

  @ApiProperty({
    example: '',
    description: 'Filter keyword',
    required: false,
  })
  filterKeyword?: string = '';
}
