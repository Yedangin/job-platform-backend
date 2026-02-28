import { IsString, IsOptional, IsObject, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// 기업인증 승인/반려 요청 DTO / Corporate verification action DTO
export class CorporateActionDto {
  @ApiProperty({
    example: 'APPROVE',
    enum: ['APPROVE', 'REJECT'],
    description: '승인/거절 액션 / Approve or reject action',
  })
  @IsIn(['APPROVE', 'REJECT'], {
    message:
      'action은 APPROVE 또는 REJECT여야 합니다 / action must be APPROVE or REJECT',
  })
  action: 'APPROVE' | 'REJECT';

  @ApiPropertyOptional({
    example: '서류 미비',
    description:
      '거절 사유 (거절 시 필수) / Rejection reason (required when rejecting)',
  })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({
    example: { businessLicense: '서류가 불분명합니다' },
    description: '필드별 거절 상세 / Per-field rejection details',
  })
  @IsOptional()
  @IsObject()
  rejectionDetails?: Record<string, string>;
}
