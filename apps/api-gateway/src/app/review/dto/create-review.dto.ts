import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: 'interview_123',
    description: 'ID of the interview',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  interviewId: string;

  @ApiProperty({
    example: 'reviewer_123',
    description: 'ID of the reviewer',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  reviewerId: string;

  @ApiProperty({
    example: 5,
    description: 'Rating from 1 to 5',
    minimum: 1,
    maximum: 5,
    required: false,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiProperty({
    example: 'Great candidate with excellent communication skills',
    description: 'Review comment',
    required: false,
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
