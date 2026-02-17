/**
 * 이력서 생성 DTO
 * Resume creation DTO
 */
import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsArray,
  Min,
  Max,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateResumeDto {
  @ApiProperty({
    description: '국적 (ISO 3166-1 alpha-2) / Nationality',
    example: 'VN',
  })
  @IsString()
  nationality: string;

  @ApiPropertyOptional({
    description: '생년월일 / Date of birth',
    example: '1995-03-15',
  })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @ApiPropertyOptional({
    description:
      '학력 목록 (JSON) / Education history',
    example: [
      {
        school: '하노이 대학교',
        major: '컴퓨터공학',
        degree: 'BACHELOR',
        graduationYear: 2018,
        country: 'VN',
      },
    ],
  })
  @IsOptional()
  educations?: any;

  @ApiPropertyOptional({
    description:
      '경력 목록 (JSON) / Work experience',
    example: [
      {
        company: 'ABC Corp',
        role: '소프트웨어 개발자',
        startDate: '2018-07',
        endDate: '2023-06',
        description: 'Backend development',
      },
    ],
  })
  @IsOptional()
  workExperiences?: any;

  @ApiPropertyOptional({
    description: 'TOPIK 등급 (0~6) / TOPIK level',
    example: 4,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(6)
  topikLevel?: number;

  @ApiPropertyOptional({
    description: 'KIIP 단계 (0~5) / KIIP level',
    example: 3,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  kiipLevel?: number;

  @ApiPropertyOptional({
    description:
      '자격증 목록 (JSON) / Certificates',
    example: [{ name: '정보처리기사', issuer: '한국산업인력공단', obtainedDate: '2020-05' }],
  })
  @IsOptional()
  certificates?: any;

  @ApiPropertyOptional({
    description:
      '희망 고용 형태 / Preferred job types',
    example: ['FULL_TIME', 'PART_TIME'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredJobTypes?: string[];

  @ApiPropertyOptional({
    description: '희망 근무 지역 / Preferred regions',
    example: ['서울', '경기'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredRegions?: string[];

  @ApiPropertyOptional({
    description: '희망 급여 (만원 단위) / Preferred salary',
    example: 250,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  preferredSalary?: number;

  @ApiPropertyOptional({
    description:
      '희망 계약 형태 / Preferred employment types',
    example: ['REGULAR', 'CONTRACT'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredEmploymentTypes?: string[];
}
