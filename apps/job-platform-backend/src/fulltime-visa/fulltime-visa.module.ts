/**
 * 정규직 비자 매칭 모듈
 * Fulltime visa matching module
 *
 * 정규직 채용을 위한 비자 매칭 시스템.
 * Visa matching system for fulltime recruitment.
 *
 * 포함 기능:
 * Features:
 * - Job-side 비자 매칭: 공고 조건만으로 전체 비자 평가
 *   Job-side visa matching: Evaluate all visas based on job requirements
 * - Applicant-side 비자 매칭: 지원자 프로필 기반 교차 검증
 *   Applicant-side visa matching: Cross-validation with applicant profile
 * - 4가지 채용 트랙 분류: IMMEDIATE, SPONSOR, TRANSITION, TRANSFER
 *   4 hiring track classification
 *
 * 지원 비자 (현재):
 * Supported visas (current):
 * - F-5, F-6, F-2, F-4 (F visa family)
 * - E-7-1, E-7-S (E-7 visa subtypes)
 *
 * 향후 추가 예정 (TASK 7):
 * To be added (TASK 7):
 * - E-7-2 (교수), E-7-4 (첨단기술)
 * - E-1, E-2, E-3, E-5
 * - D-10 (구직), D-2 (유학생 → 취업 전환)
 */

import { Module } from '@nestjs/common';
import { FulltimeVisaMatchingController } from './controllers/fulltime-visa-matching.controller';
import { FulltimeVisaMatchingService } from './services/fulltime-visa-matching.service';

@Module({
  controllers: [FulltimeVisaMatchingController],
  providers: [FulltimeVisaMatchingService],
  exports: [FulltimeVisaMatchingService],
})
export class FulltimeVisaModule {}
