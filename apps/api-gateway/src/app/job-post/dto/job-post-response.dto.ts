import { ApiProperty } from '@nestjs/swagger';
import { JobPostStatus } from 'generated/prisma-job';

class CategoryDto {
  @ApiProperty({ example: 'cat_123' })
  id: string;

  @ApiProperty({ example: 'Technology' })
  name?: string;

  @ApiProperty({ example: 'Tech related jobs' })
  description?: string;
}

class ApplyDto {
  @ApiProperty({ example: 'apply_123' })
  id: string;

  @ApiProperty({ example: 'job_123' })
  jobPostId: string;

  @ApiProperty({ example: 'user_123' })
  userId: string;

  @ApiProperty({ example: 'PENDING' })
  status: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  appliedAt: string;
}

export class JobPostDto {
  @ApiProperty({ example: 'job_123' })
  id: string;

  @ApiProperty({ example: 'corp_123' })
  corporateId: string;

  @ApiProperty({ example: 'Software Engineer' })
  title?: string;

  @ApiProperty({ example: 'Looking for a skilled software engineer...' })
  description?: string;

  @ApiProperty({ example: 'New York, NY' })
  location?: string;

  @ApiProperty({ example: '$80,000 - $120,000' })
  salaryRange?: string;

  @ApiProperty({ example: 'cat_123' })
  categoryId?: string;

  @ApiProperty({ example: 'FIXED' })
  feeType?: string;

  @ApiProperty({ example: 'PENDING' })
  status: JobPostStatus | string;

  @ApiProperty({ example: 'admin_123' })
  approvedBy?: string;

  @ApiProperty({ example: 5 })
  appliesCount?: number;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: string;

  @ApiProperty({ example: '2024-12-31T23:59:59.999Z' })
  expiredAt?: string;

  @ApiProperty({ type: CategoryDto })
  category?: CategoryDto;

  @ApiProperty({ type: [ApplyDto] })
  applies?: ApplyDto[];
}

export class JobPostResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Job post created successfully' })
  message?: string;

  @ApiProperty({ type: JobPostDto })
  data?: JobPostDto;
}

export class GetAllJobPostsResponseDto {
  @ApiProperty({ type: [JobPostDto] })
  data: JobPostDto[];

  @ApiProperty({
    example: {
      total: 100,
      page: 1,
      limit: 10,
      totalPages: 10,
    },
  })
  meta: any;
}

export class DeleteJobPostResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Job post deleted successfully' })
  message: string;
}
