import { ApiProperty } from '@nestjs/swagger';
// import { InterviewStatus } from 'generated/prisma-job';

class JobPostDto {
  @ApiProperty({ example: 'job_123' })
  id: string;

  @ApiProperty({ example: 'Software Engineer' })
  title?: string;

  @ApiProperty({ example: 'corp_123' })
  corporateId: string;
}

class ReviewDto {
  @ApiProperty({ example: 'review_123' })
  id: string;

  @ApiProperty({ example: 'interview_123' })
  interviewId: string;

  @ApiProperty({ example: 'user_456' })
  reviewerId: string;

  @ApiProperty({ example: 5 })
  rating?: number;

  @ApiProperty({ example: 'Excellent candidate' })
  comment?: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: string;
}

export class InterviewDto {
  @ApiProperty({ example: 'interview_123' })
  id: string;

  @ApiProperty({ example: 'job_123' })
  jobPostId: string;

  @ApiProperty({ example: 'user_123' })
  memberId: string;

  @ApiProperty({ example: 'corp_123' })
  corporateId: string;

  @ApiProperty({ example: 'room_456' })
  roomId?: string;

  @ApiProperty({ example: '2024-12-25T10:00:00.000Z' })
  interviewDate?: string;

  @ApiProperty({ example: 'PENDING' })
  status: string;

  @ApiProperty({ example: 'Candidate unavailable' })
  failureReason?: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: string;

  @ApiProperty({ type: JobPostDto })
  jobPost?: JobPostDto;

  @ApiProperty({ type: [ReviewDto] })
  reviews?: ReviewDto[];
}

export class InterviewResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Interview created successfully' })
  message?: string;

  @ApiProperty({ type: InterviewDto })
  data?: InterviewDto;
}

export class GetAllInterviewsResponseDto {
  @ApiProperty({ type: [InterviewDto] })
  data: InterviewDto[];

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

export class DeleteInterviewResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Interview deleted successfully' })
  message: string;
}
