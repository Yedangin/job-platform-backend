import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { JobPostStatus } from 'generated/prisma-job';

export class CreateJobPostDto {
  @ApiProperty({
    example: 'Software Engineer',
    description: 'Job title',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Looking for a skilled software engineer...',
    description: 'Job description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'New York, NY',
    description: 'Job location',
    required: false,
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({
    example: '$80,000 - $120,000',
    description: 'Salary range',
    required: false,
  })
  @IsString()
  @IsOptional()
  salaryRange?: string;

  @ApiProperty({
    example: 'cat_123',
    description: 'Category ID',
    required: false,
  })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    example: 'FIXED',
    description: 'Fee type',
    required: false,
  })
  @IsString()
  @IsOptional()
  feeType?: string;

  @ApiProperty({
    example: 'PENDING',
    description: 'Job post status',
    enum: JobPostStatus,
    required: false,
  })
  @IsEnum(JobPostStatus)
  @IsOptional()
  status?: JobPostStatus;

  @ApiProperty({
    example: '2024-12-31T23:59:59.999Z',
    description: 'Expiration date',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  expiredAt?: string;

  @ApiProperty({
    example: 'corp_123',
    description: 'Corporate ID',
    required: true,
  })
  @IsString()
  corporateId: string;
}
