import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
export class CreateCorporateRegistrationDto {
  @ApiProperty({
    description: 'User ID associated with the corporate registration',
    example: 'clk1234567890',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({
    description: 'Company name',
    example: 'TechCorp Inc.',
    maxLength: 255,
  })
  @IsString()
  companyName: string;

  @ApiPropertyOptional({
    description: 'URL or path to the business license file',
    example: 'https://example.com/business-license.pdf',
    maxLength: 255,
  })
  @IsString()
  businessLicenseFile: string;
}
