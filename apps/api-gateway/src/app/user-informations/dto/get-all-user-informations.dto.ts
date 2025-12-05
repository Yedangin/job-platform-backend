import { ApiProperty } from '@nestjs/swagger';
import { BasicQuery } from 'libs/common/src';

export class GetAllUserInformationsDto extends BasicQuery {
  @ApiProperty({
    example: 1,
    description: 'Page number',
    required: false,
    default: 1,
  })
  page?: string = '1';

  @ApiProperty({
    example: 10,
    description: 'Items per page',
    required: false,
    default: 10,
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
    description: 'Sort direction (asc or desc)',
    required: false,
  })
  sortType?: string = 'desc';

  @ApiProperty({
    example: '',
    description: 'Filter field name',
    required: false,
  })
  filterModel?: string = '';

  @ApiProperty({
    example: '',
    description: 'Filter value',
    required: false,
  })
  filterKeyword?: string = '';
}
