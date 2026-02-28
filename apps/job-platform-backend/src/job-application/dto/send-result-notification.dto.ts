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
    example:
      'Unfortunately, we decided to move forward with another candidate.',
  })
  @IsOptional()
  @IsString()
  rejectionReason?: string;

  @ApiPropertyOptional({
    description:
      '합격 시 추가 안내 (출근일, 준비서류 등) / ' +
      'Additional info for accepted applicant (start date, required docs, etc.)',
    example: '3월 10일 오전 9시 출근, 여권·외국인등록증 사본 지참',
  })
  @IsOptional()
  @IsString()
  additionalInfo?: string;
}
