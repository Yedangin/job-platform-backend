import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from 'libs/common/src/common/decorator/get-pagination-data.decorator';
import { ApplyActionType, ApplyType } from 'generated/prisma-job';

export class CreateApplyDto {
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
  userId!: string;

  @IsString()
  @ApiProperty({
    description: 'Description ',
    example: '',
  })
  description!: string;

  @ApiProperty({
    description: 'Job Id ',
    example: '',
  })
  @IsNotEmpty()
  jobId!: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: 'Interview Date',
    example: '',
  })
  interviewDate!: string;

  @IsOptional()
  @ApiProperty({
    description: 'Uploaded file URL',
    example: '/uploads/67b3bd50-f265-4a84-9360-f61578ed6be2-Azerbaijan.png',
  })
  resumeFile?: string;
}

export class CorporateUpdateApplyDto {
  @IsString()
  @ApiProperty({
    description: 'Apply Type ENUM  APPROVED, REJECTED  ',
    example: 'APPROVED',
  })
  applyType!: ApplyType;

  @IsString()
  @ApiProperty({
    description: 'Apply Action Type ENUM  SUCCESSFUL, PENDING, CANCEL  ',
    example: 'SUCCESSFUL',
  })
  applyActionType!: ApplyActionType;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: 'Interview Date',
    example: '',
  })
  interviewDate!: string;
}

export class QueryCartDto extends Pagination {}
