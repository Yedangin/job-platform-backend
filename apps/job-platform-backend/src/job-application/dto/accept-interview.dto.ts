import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AcceptInterviewDto {
  @ApiProperty({
    enum: ['FIRST', 'SECOND'],
    description: 'Which proposed time to accept',
  })
  @IsEnum(['FIRST', 'SECOND'])
  selectedChoice: 'FIRST' | 'SECOND';

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
}
