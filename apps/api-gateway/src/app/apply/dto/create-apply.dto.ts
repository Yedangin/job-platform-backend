import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';

export enum AppliedStatus {
  APPLIED_STATUS_UNSPECIFIED = 0,
  PENDING = 1,
  INTERVIEW = 2,
  CONFIRMED = 3,
  REJECTED = 4,
  SUCCESS = 5,
}

export class CreateApplyDto {
  @ApiProperty({
    example: 'job_123',
    description: 'ID of the job post',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  jobPostId: string;

  @ApiProperty({
    example: 'user_123',
    description: 'ID of the user applying',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'user_info_456',
    description: 'ID of the user info',
    required: false,
  })
  @IsString()
  @IsOptional()
  userInfoId?: string;

  @ApiProperty({
    example: false,
    description: 'Whether the application has been reviewed',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isReviewed?: boolean;

  @ApiProperty({
    example: 'PENDING',
    description: 'Application status',
    enum: AppliedStatus,
    default: AppliedStatus.PENDING,
  })
  @IsEnum(AppliedStatus)
  @IsOptional()
  status?: AppliedStatus;
}
