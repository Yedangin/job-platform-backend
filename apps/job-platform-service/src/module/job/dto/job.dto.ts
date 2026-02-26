import {
  ArrayNotEmpty,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Min,
  IsDate,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'libs/common/src/common/decorator/get-pagination-data.decorator';
import { BoardType } from 'generated/prisma-job';

export class CreateJobDto {
  @ApiProperty({
    description: 'Title ',
    example: '',
  })
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Corporate Id ',
    example: '',
  })
  @IsNotEmpty()
  corporateId!: string;

  @IsString()
  @ApiProperty({
    description: 'Description ',
    example: '',
  })
  description!: string;

  @IsString()
  @ApiProperty({
    description: 'Board Type ENUM  PART_TIME FULL_TIME  ',
    example: 'PART_TIME',
  })
  boardType!: BoardType;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Display Address',
    example: '',
  })
  displayAddress!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Actual Address',
    example: '',
  })
  actualAddress!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Allow Visas  ',
    example: '',
  })
  allowedVisas!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Contact Name ',
    example: '',
  })
  contactName!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Contact phone ',
    example: '',
  })
  contactPhone!: string;

  @IsOptional()
  @ApiProperty({
    description: 'Close Date ',
    example: '',
  })
  @IsDateString()
  closingDate?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Uploaded file URL',
    example: '/uploads/67b3bd50-f265-4a84-9360-f61578ed6be2-Azerbaijan.png',
  })
  fileUrl?: string;
}

export class UpdateJobDto {
  @ApiProperty({
    description: 'Title ',
    example: '',
  })
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Corporate Id ',
    example: '',
  })
  @IsNotEmpty()
  @IsOptional()
  corporateId!: string;

  @IsString()
  @ApiProperty({
    description: 'Description ',
    example: '',
  })
  description!: string;

  @IsString()
  @ApiProperty({
    description: 'Board Type ENUM  PART_TIME FULL_TIME  ',
    example: 'PART_TIME',
  })
  boardType!: BoardType;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Display Address',
    example: '',
  })
  displayAddress!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Actual Address',
    example: '',
  })
  actualAddress!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Allow Visas  ',
    example: '',
  })
  allowedVisas!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Contact Name ',
    example: '',
  })
  contactName!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Contact phone ',
    example: '',
  })
  contactPhone!: string;

  @IsOptional()
  @ApiProperty({
    description: 'Close Date ',
    example: '',
  })
  @IsDateString()
  closingDate?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Uploaded file URL',
    example: '/uploads/67b3bd50-f265-4a84-9360-f61578ed6be2-Azerbaijan.png',
  })
  fileUrl?: string;
}

export class QueryCartDto extends Pagination {}
