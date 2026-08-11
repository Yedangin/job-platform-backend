import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsInt, Min } from 'class-validator';
import { CreateInfoBoardDto } from './create-info-board.dto';

export class UpdateInfoBoardDto extends PartialType(CreateInfoBoardDto) {
  @ApiProperty({
    minimum: 1,
    description: 'Version returned by the latest admin detail response',
  })
  @Type(() => Number)
  @IsDefined()
  @IsInt()
  @Min(1)
  expectedVersion: number;
}
