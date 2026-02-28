import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// 알림 설정 업데이트 DTO / Notification settings update DTO
export class UpdateNotificationSettingsDto {
  @ApiProperty({ description: 'SMS 알림 / SMS notification' })
  @IsBoolean()
  sms: boolean;

  @ApiProperty({ description: '이메일 알림 / Email notification' })
  @IsBoolean()
  email: boolean;

  @ApiProperty({ description: '카카오 알림 / Kakao notification' })
  @IsBoolean()
  kakao: boolean;

  @ApiPropertyOptional({ description: '마케팅 알림 / Marketing notification' })
  @IsOptional()
  @IsBoolean()
  marketing?: boolean;
}
