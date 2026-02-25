import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class SendResultNotificationDto {
  @ApiProperty({
    description: '결과 유형 / Result type',
    enum: ['ACCEPTED', 'REJECTED'],
    example: 'ACCEPTED',
  })
  @IsIn(['ACCEPTED', 'REJECTED'])
  result: 'ACCEPTED' | 'REJECTED';

  @ApiPropertyOptional({
    description: '추가 메시지 / Additional message to the applicant',
    example: 'Congratulations! Please check your email for next steps.',
  })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional({
    description: '불합격 사유 / Rejection reason (when result is REJECTED)',
    example: 'Unfortunately, we decided to move forward with another candidate.',
  })
  @IsOptional()
  @IsString()
  rejectionReason?: string;
}
