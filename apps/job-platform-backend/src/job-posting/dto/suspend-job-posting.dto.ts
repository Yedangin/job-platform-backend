import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SuspendJobPostingDto {
  @ApiProperty({ description: '중지 사유 / Suspension reason' })
  @IsString()
  reason: string;
}
