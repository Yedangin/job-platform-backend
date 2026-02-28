/**
 * 면접 취소 DTO / Cancel Interview DTO
 *
 * 기업·구직자 모두 사용 가능, 취소 사유 드롭다운 기반.
 * Both employer and applicant can cancel; reason is dropdown-based.
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

/** 기업 측 취소 사유 / Employer cancellation reasons */
export enum EmployerCancelReason {
  RECRUITMENT_CANCELLED = 'RECRUITMENT_CANCELLED', // 채용 취소
  SCHEDULE_UNAVAILABLE = 'SCHEDULE_UNAVAILABLE', // 일정 변경 불가
  OTHER_CANDIDATE_HIRED = 'OTHER_CANDIDATE_HIRED', // 다른 후보 채용
  OTHER = 'OTHER', // 기타
}

/** 구직자 측 취소 사유 / Applicant cancellation reasons */
export enum ApplicantCancelReason {
  PERSONAL_REASON = 'PERSONAL_REASON', // 개인 사정
  OTHER_JOB_ACCEPTED = 'OTHER_JOB_ACCEPTED', // 다른 회사 취업
  SCHEDULE_CONFLICT = 'SCHEDULE_CONFLICT', // 일정 불가
  OTHER = 'OTHER', // 기타
}

export class CancelInterviewDto {
  @ApiProperty({
    description: '취소 사유 코드 / Cancel reason code (enum depends on role)',
    example: 'PERSONAL_REASON',
  })
  @IsString()
  reason: string;

  @ApiPropertyOptional({
    description:
      '기타 사유 상세 (reason=OTHER일 때 필수) / Detail when reason is OTHER',
    example: '비자 연장 심사 중이라 일정 참석이 어렵습니다.',
  })
  @IsOptional()
  @IsString()
  reasonDetail?: string;
}
