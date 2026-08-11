import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class RejectJobPostingDto {
  @ApiProperty({ description: 'Reason the posting could not be approved' })
  @IsString()
  @MinLength(3)
  @MaxLength(2000)
  reason: string;
}
