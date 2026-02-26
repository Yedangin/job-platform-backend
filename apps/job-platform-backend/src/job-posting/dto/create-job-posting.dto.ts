import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
  IsDateString,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  BoardType,
  TierType,
  Intensity,
  ApplicationMethod,
  InterviewType,
  EmploymentSubType,
} from '../enums';
import { AlbaAttributesDto } from './alba-attributes.dto';
import { FulltimeAttributesDto } from './fulltime-attributes.dto';

export class CreateJobPostingDto {
  @ApiProperty({ enum: BoardType, description: '게시판 유형 / Board type' })
  @IsEnum(BoardType)
  boardType: BoardType;

  @ApiPropertyOptional({
    enum: TierType,
    description: '등급 / Tier type',
    default: TierType.STANDARD,
  })
  @IsOptional()
  @IsEnum(TierType)
  tierType?: TierType;

  @ApiProperty({
    description: '공고 제목 / Job title',
    example: '주방보조 구합니다',
  })
  @IsString()
  title: string;

  @ApiProperty({ description: '공고 설명 / Job description' })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: '업무 내용 이미지 URL / Work content image URL',
  })
  @IsOptional()
  @IsString()
  workContentImg?: string;

  @ApiProperty({
    description: '허용 비자 (쉼표 구분) / Allowed visas (comma-separated)',
    example: 'E-9,H-2,F-4',
  })
  @IsString()
  allowedVisas: string;

  @ApiPropertyOptional({
    description: '최소 한국어 수준 (TOPIK level) / Min Korean level',
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  minKoreanLevel?: number;

  @ApiProperty({ description: '표시 주소 / Display address' })
  @IsString()
  displayAddress: string;

  @ApiProperty({ description: '실제 주소 / Actual address' })
  @IsString()
  actualAddress: string;

  @ApiPropertyOptional({
    enum: Intensity,
    description: '근무 강도 / Work intensity',
    default: Intensity.MIDDLE,
  })
  @IsOptional()
  @IsEnum(Intensity)
  workIntensity?: Intensity;

  @ApiPropertyOptional({
    description: '복리후생 (배열) / Benefits (array)',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  benefits?: string[];

  @ApiProperty({ description: '담당자 이름 / Contact name' })
  @IsString()
  contactName: string;

  @ApiProperty({ description: '담당자 전화번호 / Contact phone' })
  @IsString()
  contactPhone: string;

  @ApiPropertyOptional({ description: '담당자 이메일 / Contact email' })
  @IsOptional()
  @IsString()
  contactEmail?: string;

  @ApiPropertyOptional({
    enum: ApplicationMethod,
    description: '지원 방법 / Application method',
    default: ApplicationMethod.PLATFORM,
  })
  @IsOptional()
  @IsEnum(ApplicationMethod)
  applicationMethod?: ApplicationMethod;

  @ApiPropertyOptional({ description: '외부 지원 URL / External URL' })
  @IsOptional()
  @IsString()
  externalUrl?: string;

  @ApiPropertyOptional({ description: '외부 지원 이메일 / External email' })
  @IsOptional()
  @IsString()
  externalEmail?: string;

  @ApiPropertyOptional({
    enum: InterviewType,
    description: '면접 유형 / Interview type',
    default: InterviewType.OFFLINE,
  })
  @IsOptional()
  @IsEnum(InterviewType)
  interviewMethod?: InterviewType;

  @ApiPropertyOptional({ description: '면접 장소 / Interview place' })
  @IsOptional()
  @IsString()
  interviewPlace?: string;

  @ApiPropertyOptional({
    enum: EmploymentSubType,
    description: '고용 형태 / Employment sub type',
  })
  @IsOptional()
  @IsEnum(EmploymentSubType)
  employmentSubType?: EmploymentSubType;

  @ApiPropertyOptional({
    description: '마감일 / Closing date',
    example: '2026-03-31',
  })
  @IsOptional()
  @IsDateString()
  closingDate?: string;

  @ApiPropertyOptional({
    description:
      '알바 속성 (PART_TIME일 때) / Alba attributes (when PART_TIME)',
    type: AlbaAttributesDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AlbaAttributesDto)
  albaAttributes?: AlbaAttributesDto;

  @ApiPropertyOptional({
    description:
      '정규직 속성 (FULL_TIME일 때) / Fulltime attributes (when FULL_TIME)',
    type: FulltimeAttributesDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => FulltimeAttributesDto)
  fulltimeAttributes?: FulltimeAttributesDto;

  @ApiPropertyOptional({
    description:
      '정규직 비자 매칭 결과 (JSON) / Fulltime visa matching result (JSON)',
  })
  @IsOptional()
  fulltimeVisaResult?: Record<string, unknown>;

  @ApiPropertyOptional({
    description: '모집 인원 / Headcount',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  headcount?: number;
}
