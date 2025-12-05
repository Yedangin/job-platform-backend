import { PartialType } from '@nestjs/swagger';
import { CreateJobPostDto } from './create-job-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateJobPostDto extends PartialType(CreateJobPostDto) {
  @ApiProperty({
    example: 'admin_123',
    description: 'Admin ID who approved the job post',
    required: false,
  })
  @IsString()
  @IsOptional()
  approvedBy?: string;

  @ApiProperty({
    example: 5,
    description: 'Number of applications',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  appliesCount?: number;
}
