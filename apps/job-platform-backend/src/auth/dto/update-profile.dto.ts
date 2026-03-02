import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

// 프로필 업데이트 요청 DTO / Update profile request DTO
export class UpdateProfileDto {
  @ApiPropertyOptional({ example: '홍길동' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ example: 'https://example.com/photo.jpg' })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  // 비자 정보 (위저드 Step 2에서 입력) / Visa info (from wizard Step 2)
  @ApiPropertyOptional({ description: '비자 유형 / Visa type', example: 'E-9' })
  @IsOptional()
  @IsString()
  visaType?: string;

  @ApiPropertyOptional({
    description: '비자 세부유형 / Visa sub-type',
    example: 'E-9-1',
  })
  @IsOptional()
  @IsString()
  visaSubType?: string;

  @ApiPropertyOptional({
    description: '비자 만료일 / Visa expiry date',
    example: '2026-12-31',
  })
  @IsOptional()
  @IsDateString()
  visaExpiryDate?: string;

  // 기본 인적사항 (위저드 Step 1) / Basic identity (from wizard Step 1)
  @ApiPropertyOptional({
    description: '국적 / Nationality (ISO 3166-1 alpha-2)',
    example: 'VN',
  })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiPropertyOptional({ description: '성별 / Gender (M or F)', example: 'M' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({
    description: '생년월일 / Birth date',
    example: '1995-03-15',
  })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @ApiPropertyOptional({
    description: '도로명 주소 / Road address',
    example: '서울 강남구 ...',
  })
  @IsOptional()
  @IsString()
  addressRoad?: string;
}
