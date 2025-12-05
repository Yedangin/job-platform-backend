import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { InterviewStatus } from 'generated/prisma-job';

export class CreateInterviewDto {
  @ApiProperty({
    example: 'job_123',
    description: 'Job post ID',
    required: true,
  })
  @IsString()
  jobPostId: string;

  @ApiProperty({
    example: 'user_123',
    description: 'Member ID',
    required: true,
  })
  @IsString()
  memberId: string;

  @ApiProperty({
    example: 'corp_123',
    description: 'Corporate ID',
    required: true,
  })
  @IsString()
  corporateId: string;

  @ApiProperty({
    example: 'room_456',
    description: 'Room ID for video call',
    required: false,
  })
  @IsString()
  @IsOptional()
  roomId?: string;

  @ApiProperty({
    example: '2024-12-25T10:00:00.000Z',
    description: 'Interview date and time',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  interviewDate?: string;

  @ApiProperty({
    example: 'PENDING',
    description: 'Interview status',
    enum: InterviewStatus,
    required: false,
  })
  @IsEnum(InterviewStatus)
  @IsOptional()
  status?: InterviewStatus;

  @ApiProperty({
    example: 'Candidate unavailable',
    description: 'Failure reason if interview failed',
    required: false,
  })
  @IsString()
  @IsOptional()
  failureReason?: string;
}
