/**
 * 정규직 비자 매칭 요청 DTO
 * Fulltime visa matching request DTO
 */

import {
  IsString,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  Min,
  Max,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 경력 수준 열거형 / Experience level enum
 */
export enum ExperienceLevelEnum {
  ENTRY = 'ENTRY',
  JUNIOR = 'JUNIOR',
  SENIOR = 'SENIOR',
  EXPERT = 'EXPERT',
}

/**
 * 학력 수준 열거형 / Education level enum
 */
export enum EducationLevelEnum {
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  ASSOCIATE = 'ASSOCIATE',
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
  DOCTORATE = 'DOCTORATE',
}

/**
 * TOPIK 수준 열거형 / TOPIK level enum
 */
export enum TopikLevelEnum {
  TOPIK_1 = 'TOPIK_1',
  TOPIK_2 = 'TOPIK_2',
  TOPIK_3 = 'TOPIK_3',
  TOPIK_4 = 'TOPIK_4',
  TOPIK_5 = 'TOPIK_5',
  TOPIK_6 = 'TOPIK_6',
}

/**
 * 근무지 주소 DTO / Work address DTO
 */
export class WorkAddressDto {
  @ApiProperty({
    description: '시/도 (예: 서울특별시, 경기도) / Province/City',
    example: '서울특별시',
  })
  @IsString()
  @Length(2, 20)
  sido: string;

  @ApiProperty({
    description: '시/군/구 (예: 강남구, 수원시) / District',
    example: '강남구',
  })
  @IsString()
  @Length(2, 20)
  sigungu: string;

  @ApiProperty({
    description: '인구감소지역 여부 / Is depopulation area',
    example: false,
  })
  @IsBoolean()
  isDepopulationArea: boolean;
}

/**
 * 기관 유형 열거형 / Institution type enum
 */
export enum InstitutionTypeEnum {
  GENERAL = 'GENERAL',
  EDUCATION = 'EDUCATION',
  RESEARCH = 'RESEARCH',
  MEDICAL = 'MEDICAL',
}

/**
 * 회사 정보 DTO / Company information DTO
 */
export class CompanyInfoDto {
  @ApiProperty({
    description: '전체 직원 수 / Total employees',
    example: 100,
  })
  @IsNumber()
  @Min(1)
  totalEmployees: number;

  @ApiProperty({
    description: '외국인 직원 수 / Foreign employee count',
    example: 10,
  })
  @IsNumber()
  @Min(0)
  foreignEmployeeCount: number;

  @ApiPropertyOptional({
    description: '기관 유형 (교육기관, 연구기관 등) / Institution type',
    enum: InstitutionTypeEnum,
    example: InstitutionTypeEnum.GENERAL,
  })
  @IsOptional()
  @IsEnum(InstitutionTypeEnum)
  institutionType?: InstitutionTypeEnum;
}

/**
 * 정규직 채용 공고 입력 DTO / Fulltime job input DTO
 */
export class FulltimeJobInputDto {
  @ApiProperty({
    description:
      '직종 코드 (한국표준직업분류 4자리, 예: 2211 = 컴퓨터시스템 설계 및 분석가) / Occupation code (KSCO 4-digit)',
    example: '2211',
  })
  @IsString()
  @Length(4, 4)
  occupationCode: string;

  @ApiProperty({
    description: '최소 연봉 (원) / Minimum annual salary (KRW)',
    example: 35_000_000,
  })
  @IsNumber()
  @Min(20_000_000)
  salaryMin: number;

  @ApiProperty({
    description: '최대 연봉 (원) / Maximum annual salary (KRW)',
    example: 50_000_000,
  })
  @IsNumber()
  @Min(20_000_000)
  salaryMax: number;

  @ApiProperty({
    description: '경력 수준 / Experience level',
    enum: ExperienceLevelEnum,
    example: ExperienceLevelEnum.JUNIOR,
  })
  @IsEnum(ExperienceLevelEnum)
  experienceLevel: ExperienceLevelEnum;

  @ApiProperty({
    description: '학력 요구사항 / Education requirement',
    enum: EducationLevelEnum,
    example: EducationLevelEnum.BACHELOR,
  })
  @IsEnum(EducationLevelEnum)
  educationLevel: EducationLevelEnum;

  @ApiPropertyOptional({
    description:
      '주 근무시간 (E-7-2/3 최저임금 계산용) / Weekly work hours (for E-7-2/3 minimum wage calculation)',
    example: 40,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(68)
  weeklyWorkHours?: number;

  @ApiPropertyOptional({
    description: '우대 전공 목록 (선택) / Preferred majors (optional)',
    type: [String],
    example: ['컴퓨터공학', '소프트웨어공학', '정보통신공학'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredMajors?: string[];

  @ApiProperty({
    description:
      '해외 인재 채용 의사 (true = 해외 거주자 스폰서 가능) / Overseas hire willingness',
    example: true,
  })
  @IsBoolean()
  overseasHireWilling: boolean;

  @ApiProperty({
    description: '근무지 주소 / Work address',
    type: WorkAddressDto,
  })
  @ValidateNested()
  @Type(() => WorkAddressDto)
  workAddress: WorkAddressDto;

  @ApiPropertyOptional({
    description:
      '회사 정보 (E-7-2/E-7-3 고용비율 체크용) / Company information (for E-7-2/3 employment ratio)',
    type: CompanyInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CompanyInfoDto)
  companyInfo?: CompanyInfoDto;
}

/**
 * 지원자 프로필 DTO (교차 검증용) / Applicant profile DTO (for cross-validation)
 */
export class ApplicantProfileDto {
  @ApiProperty({
    description: '현재 비자 타입 (예: F-4, D-10, E-7-1) / Current visa type',
    example: 'D-10',
  })
  @IsString()
  @Length(1, 10)
  currentVisaType: string;

  @ApiPropertyOptional({
    description: '현재 비자 세부 타입 (E-7-1, E-7-4 등) / Current visa subtype',
    example: 'E-7-1',
  })
  @IsOptional()
  @IsString()
  @Length(1, 10)
  currentVisaSubtype?: string;

  @ApiProperty({
    description: '학력 수준 / Education level',
    enum: EducationLevelEnum,
    example: EducationLevelEnum.BACHELOR,
  })
  @IsEnum(EducationLevelEnum)
  educationLevel: EducationLevelEnum;

  @ApiPropertyOptional({
    description: '전공 (예: 컴퓨터공학, 경영학) / Major',
    example: '컴퓨터공학',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  major?: string;

  @ApiPropertyOptional({
    description:
      '국내 대학 졸업 여부 (고등교육법 제2조 기준) / Domestic university graduate (Higher Education Act Art.2)',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isDomesticUniversity?: boolean;

  @ApiPropertyOptional({
    description:
      '국내 대학 학위 수준 (isDomesticUniversity=true일 때) / Domestic university degree level',
    enum: EducationLevelEnum,
    example: EducationLevelEnum.BACHELOR,
  })
  @IsOptional()
  @IsEnum(EducationLevelEnum)
  domesticDegreeLevel?: EducationLevelEnum;

  @ApiPropertyOptional({
    description:
      '졸업예정 여부 (D-2 전환 시 최종학기) / Graduating status (D-2 final semester)',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isGraduating?: boolean;

  @ApiProperty({
    description: '경력 연수 (년) / Experience years',
    example: 3,
  })
  @IsNumber()
  @Min(0)
  @Max(50)
  experienceYears: number;

  @ApiPropertyOptional({
    description: '한국어 수준 (TOPIK) / Korean level (TOPIK)',
    enum: TopikLevelEnum,
    example: TopikLevelEnum.TOPIK_4,
  })
  @IsOptional()
  @IsEnum(TopikLevelEnum)
  topikLevel?: TopikLevelEnum;

  @ApiPropertyOptional({
    description: '모국어 (ISO 639-1 코드, 예: en, zh, vi) / Native language',
    example: 'en',
  })
  @IsOptional()
  @IsString()
  @Length(2, 3)
  nativeSpeakerOf?: string;

  @ApiPropertyOptional({
    description: '전문 자격증 목록 / Professional licenses',
    type: [String],
    example: ['정보처리기사', 'AWS Solutions Architect'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  professionalLicense?: string[];

  @ApiPropertyOptional({
    description: '합법 체류 기간 (년) / Legal stay duration (years)',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(50)
  legalStayYears?: number;

  @ApiPropertyOptional({
    description: '한국 경력 기간 (년) / Korea experience years',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(50)
  koreaExperienceYears?: number;
}

/**
 * Job-side 비자 매칭 요청 DTO / Job-side visa matching request DTO
 */
export class FulltimeVisaMatchingRequestDto {
  @ApiProperty({
    description: '정규직 채용 공고 입력 데이터 / Fulltime job input data',
    type: FulltimeJobInputDto,
  })
  @ValidateNested()
  @Type(() => FulltimeJobInputDto)
  jobInput: FulltimeJobInputDto;
}

/**
 * Applicant-side 비자 매칭 요청 DTO (교차 검증)
 * Applicant-side visa matching request DTO (cross-validation)
 */
export class FulltimeVisaMatchingWithApplicantRequestDto {
  @ApiProperty({
    description: '정규직 채용 공고 입력 데이터 / Fulltime job input data',
    type: FulltimeJobInputDto,
  })
  @ValidateNested()
  @Type(() => FulltimeJobInputDto)
  jobInput: FulltimeJobInputDto;

  @ApiProperty({
    description:
      '지원자 프로필 (교차 검증용) / Applicant profile (for cross-validation)',
    type: ApplicantProfileDto,
  })
  @ValidateNested()
  @Type(() => ApplicantProfileDto)
  applicantProfile: ApplicantProfileDto;
}
