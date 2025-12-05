import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserInformationDto } from './create-user-information.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserInformationDto extends PartialType(
  CreateUserInformationDto,
) {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User ID',
    required: false,
  })
  @IsString()
  @IsOptional()
  userId?: string;
}
