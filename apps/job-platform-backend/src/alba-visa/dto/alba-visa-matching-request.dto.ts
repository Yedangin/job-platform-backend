/**
 * 알바 비자 매칭 요청 DTO
 * Alba Visa Matching Request DTO
 *
 * POST /api/alba/visa-matching 엔드포인트용 요청 DTO.
 * Request DTO for POST /api/alba/visa-matching endpoint.
 *
 * 공고 저장 시 자동 호출 또는 미리보기용 독립 호출 가능.
 * Auto-called on posting save or independently callable for preview.
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsInt,
  IsArray,
  IsEnum,
  IsOptional,
  Min,
  Max,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

/** 근무 요일 열거형 / Day of week enum */
export enum DayOfWeek {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}

/**
 * 스케줄 항목 DTO / Schedule Item DTO
 */
export class ScheduleItemDto {
  @ApiProperty({
    description: '근무 요일 / Day of week',
    enum: DayOfWeek,
    example: DayOfWeek.SAT,
  })
  @IsEnum(DayOfWeek, {
    message: '유효한 요일을 입력하세요 (MON~SUN) / Enter a valid day of week',
  })
  dayOfWeek: DayOfWeek;

  @ApiProperty({
    description: '근무 시작 시간 (HH:mm) / Work start time',
    example: '12:00',
  })
  @IsString()
  @Matches(/^\d{2}:\d{2}$/, {
    message: '시간 형식은 HH:mm이어야 합니다 / Time format must be HH:mm',
  })
  startTime: string;

  @ApiProperty({
    description: '근무 종료 시간 (HH:mm) / Work end time',
    example: '22:00',
  })
  @IsString()
  @Matches(/^\d{2}:\d{2}$/, {
    message: '시간 형식은 HH:mm이어야 합니다 / Time format must be HH:mm',
  })
  endTime: string;
}

/**
 * 주소 DTO / Address DTO
 */
export class AddressDto {
  @ApiProperty({
    description: '시/도 / Province/City',
    example: '서울특별시',
  })
  @IsString()
  sido: string;

  @ApiProperty({
    description: '시/군/구 / District',
    example: '강남구',
  })
  @IsString()
  sigungu: string;

  @ApiProperty({
    description: '상세주소 / Detailed address',
    example: '역삼동 123-45 2층',
  })
  @IsString()
  detail: string;

  @ApiProperty({
    description: '위도 / Latitude',
    example: 37.4979,
  })
  @IsNumber(
    {},
    { message: '위도는 숫자여야 합니다 / Latitude must be a number' },
  )
  lat: number;

  @ApiProperty({
    description: '경도 / Longitude',
    example: 127.0276,
  })
  @IsNumber(
    {},
    { message: '경도는 숫자여야 합니다 / Longitude must be a number' },
  )
  lng: number;
}

/**
 * 알바 비자 매칭 요청 DTO
 * Alba Visa Matching Request DTO
 *
 * 입력 데이터만으로 비자별 가능 여부 판별 (구직자 정보 불필요)
 * Determines visa eligibility from input data alone (no job seeker info needed)
 */
export class AlbaVisaMatchingRequestDto {
  @ApiProperty({
    description:
      '플랫폼 직종 코드 — 서버에서 KSIC 대분류 자동 매핑 / Platform job category code — auto-mapped to KSIC on server',
    example: 'REST_SERVING',
  })
  @IsString()
  jobCategoryCode: string;

  @ApiPropertyOptional({
    description:
      'KSIC 코드 직접 지정 (optional — jobCategoryCode 매핑 우선) / Direct KSIC code (optional)',
    example: 'I',
  })
  @IsOptional()
  @IsString()
  ksicCode?: string;

  @ApiProperty({
    description: '주당 총 근무시간 / Total weekly work hours',
    example: 20,
    minimum: 1,
    maximum: 80,
  })
  @IsNumber(
    {},
    {
      message:
        '주당 근무시간은 숫자여야 합니다 / Weekly hours must be a number',
    },
  )
  @Min(1, {
    message:
      '주당 근무시간은 1시간 이상이어야 합니다 / Weekly hours must be at least 1',
  })
  @Max(80, {
    message:
      '주당 근무시간은 80시간을 초과할 수 없습니다 / Weekly hours cannot exceed 80',
  })
  weeklyHours: number;

  @ApiProperty({
    description: '요일별 근무 스케줄 / Per-day work schedule',
    type: [ScheduleItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleItemDto)
  @ArrayMinSize(1, {
    message: '최소 1개 근무일 필요 / At least 1 work day required',
  })
  @ArrayMaxSize(7, { message: '최대 7개 근무일 / Maximum 7 work days' })
  schedule: ScheduleItemDto[];

  @ApiProperty({
    description: '근무지 주소 / Workplace address',
    type: AddressDto,
  })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiProperty({
    description: '시급 (원, 정수) / Hourly wage (KRW, integer)',
    example: 12000,
  })
  @IsInt({ message: '시급은 정수여야 합니다 / Hourly wage must be an integer' })
  @Min(1, {
    message: '시급은 1원 이상이어야 합니다 / Hourly wage must be at least 1',
  })
  hourlyWage: number;
}
