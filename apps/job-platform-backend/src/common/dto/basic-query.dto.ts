import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class BasicQuery {
  @ApiProperty({
    example: 1,
    description: 'page number',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  page?: string = '1';

  @ApiProperty({
    example: 10,
    description: 'limit',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  limit?: string = '10';

  @ApiProperty({
    example: '',
    description: 'search keyword',
    required: false,
  })
  @IsString()
  @IsOptional()
  searchKeyword?: string = '';

  @ApiProperty({
    example: 'id',
    description: 'sorting field',
    required: false,
  })
  @IsString()
  @IsOptional()
  sortField?: string = 'id';

  @ApiProperty({
    example: 'desc',
    description: 'asc or desc',
    required: false,
  })
  @IsString()
  @IsIn(['asc', 'desc'])
  @IsOptional()
  sortType?: string = 'desc';

  @ApiProperty({
    example: '',
    description: 'filter model',
    required: false,
  })
  @IsString()
  @IsOptional()
  filterModel?: string = '';

  @ApiProperty({
    example: '',
    description: 'filter keyword',
    required: false,
  })
  @IsString()
  @IsOptional()
  filterKeyword?: string = '';
}
