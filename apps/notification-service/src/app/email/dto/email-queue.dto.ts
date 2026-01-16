import { EmailPriority, EmailType } from '@in-job/common';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class EmailQueueDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsEnum(EmailType)
  type: EmailType;

  @IsOptional()
  @IsEnum(EmailPriority)
  priority?: EmailPriority;

  @IsOptional()
  metadata?: any;
}

export class EmailSendingResponseDto {
  id: string;
  status: 'queued' | 'sending' | 'sent' | 'failed' | 'error';
  message: string;
}
