/**
 * 정규직 비자 매칭 서비스
 * Fulltime visa matching service
 *
 * 핵심 기능:
 * Core features:
 * - evaluateJob: 공고 기준 전체 비자 평가 (Job-side evaluation for all visa types)
 * - evaluateApplicant: 지원자 기준 교차 검증 (Applicant-side cross-validation)
 * - 4가지 채용 트랙 분류 (4 hiring track classification)
 */

import { Injectable, Logger } from '@nestjs/common';
import {
  FulltimeVisaMatchingRequestDto,
  FulltimeVisaMatchingWithApplicantRequestDto,
} from '../dto/fulltime-visa-matching-request.dto';
import {
  FulltimeVisaMatchingResponseDto,
  FulltimeVisaMatchingWithApplicantResponseDto,
  HiringTrackGroupDto,
  VisaEvalResultDto,
} from '../dto/fulltime-visa-matching-response.dto';
import {
  FulltimeVisaFilterRulesResponseDto,
  VisaFilterRuleDto,
} from '../dto/fulltime-visa-filter-rules-response.dto';
import {
  IFulltimeVisaEvaluator,
  FulltimeVisaEvalResult,
  FulltimeJobInput,
  ApplicantProfile,
} from '../evaluators/fulltime-evaluator.interface';

// Evaluators
import { F5FulltimeEvaluator } from '../evaluators/f5-fulltime-evaluator';
import { F6FulltimeEvaluator } from '../evaluators/f6-fulltime-evaluator';
import { F2FulltimeEvaluator } from '../evaluators/f2-fulltime-evaluator';
import { F4FulltimeEvaluator } from '../evaluators/f4-fulltime-evaluator';
import { E71FulltimeEvaluator } from '../evaluators/e7-1-fulltime-evaluator';
import { E72FulltimeEvaluator } from '../evaluators/e7-2-fulltime-evaluator';
import { E74FulltimeEvaluator } from '../evaluators/e7-4-fulltime-evaluator';
import { E7SFulltimeEvaluator } from '../evaluators/e7-s-fulltime-evaluator';
import { E1FulltimeEvaluator } from '../evaluators/e1-fulltime-evaluator';
import { E2FulltimeEvaluator } from '../evaluators/e2-fulltime-evaluator';
import { E3FulltimeEvaluator } from '../evaluators/e3-fulltime-evaluator';
import { E5FulltimeEvaluator } from '../evaluators/e5-fulltime-evaluator';

// E-7 직종 카테고리 상수 / E-7 job category constants
import { getAllowedJobCodesByE7Type } from '../constants/e7-job-categories';

@Injectable()
export class FulltimeVisaMatchingService {
  private readonly logger = new Logger(FulltimeVisaMatchingService.name);
  private readonly evaluators: IFulltimeVisaEvaluator[];

  constructor() {
    // 전체 비자 Evaluator 목록 / All visa evaluators list
    this.evaluators = [
      // F비자 (즉시 채용 가능) / F visas (Immediate hiring)
      new F5FulltimeEvaluator(),
      new F6FulltimeEvaluator(),
      new F2FulltimeEvaluator(),
      new F4FulltimeEvaluator(),

      // E-7 비자 (스폰서/이직 채용) / E-7 visas (Sponsor/Transfer hiring)
      new E71FulltimeEvaluator(),
      new E72FulltimeEvaluator(),
      new E74FulltimeEvaluator(),
      new E7SFulltimeEvaluator(),

      // E-1~E-6 비자 (스폰서 채용) / E-1~E-6 visas (Sponsor hiring)
      new E1FulltimeEvaluator(),
      new E2FulltimeEvaluator(),
      new E3FulltimeEvaluator(),
      new E5FulltimeEvaluator(),

      // TODO: D-10, D-2 Evaluator 추가 예정
      // TODO: Add D-10, D-2 Evaluators later
    ];
  }

  /**
   * Job-side 비자 매칭: 공고 조건만으로 전체 비자 평가
   * Job-side visa matching: Evaluate all visas based on job requirements only
   *
   * @param dto 정규직 공고 입력 DTO / Fulltime job input DTO
   * @returns 4가지 트랙별 비자 매칭 결과 / Visa matching results by 4 tracks
   */
  async evaluateJob(
    dto: FulltimeVisaMatchingRequestDto,
  ): Promise<FulltimeVisaMatchingResponseDto> {
    const startTime = Date.now();
    this.logger.log(
      `[evaluateJob] 공고 기준 비자 매칭 시작 / Starting job-side visa matching`,
    );

    const input: FulltimeJobInput = {
      occupationCode: dto.jobInput.occupationCode,
      salaryMin: dto.jobInput.salaryMin,
      salaryMax: dto.jobInput.salaryMax,
      experienceLevel: dto.jobInput.experienceLevel,
      educationLevel: dto.jobInput.educationLevel,
      weeklyWorkHours: dto.jobInput.weeklyWorkHours ?? 40, // 기본값 40시간 / Default 40 hours
      preferredMajors: dto.jobInput.preferredMajors,
      overseasHireWilling: dto.jobInput.overseasHireWilling,
      workAddress: {
        sido: dto.jobInput.workAddress.sido,
        sigungu: dto.jobInput.workAddress.sigungu,
        isDepopulationArea: dto.jobInput.workAddress.isDepopulationArea,
      },
      companyInfo: dto.jobInput.companyInfo, // E-1, E-2, E-3, E-7-2 고용비율 확인용
    };

    // 전체 비자 평가 / Evaluate all visas
    const allResults: FulltimeVisaEvalResult[] = this.evaluators.map(
      (evaluator) => {
        try {
          return evaluator.evaluateJob(input);
        } catch (error) {
          this.logger.error(
            `[evaluateJob] ${evaluator.visaCode} 평가 실패 / Evaluation failed: ${error.message}`,
          );
          throw error;
        }
      },
    );

    // 4가지 트랙별로 분류 / Classify into 4 tracks
    const immediate = this.groupByTrack(allResults, 'IMMEDIATE');
    const sponsor = this.groupByTrack(allResults, 'SPONSOR');
    const transition = this.groupByTrack(allResults, 'TRANSITION');
    const transfer = this.groupByTrack(allResults, 'TRANSFER');

    // 전체 집계 / Overall summary
    const overallSummary = {
      totalEligible:
        immediate.summary.totalEligible +
        sponsor.summary.totalEligible +
        transition.summary.totalEligible +
        transfer.summary.totalEligible,
      totalConditional:
        immediate.summary.totalConditional +
        sponsor.summary.totalConditional +
        transition.summary.totalConditional +
        transfer.summary.totalConditional,
      totalBlocked:
        immediate.summary.totalBlocked +
        sponsor.summary.totalBlocked +
        transition.summary.totalBlocked +
        transfer.summary.totalBlocked,
      totalVisasEvaluated: allResults.length,
    };

    const durationMs = Date.now() - startTime;
    this.logger.log(
      `[evaluateJob] 비자 매칭 완료 / Matching completed: ` +
        `${overallSummary.totalEligible} eligible, ` +
        `${overallSummary.totalConditional} conditional, ` +
        `${overallSummary.totalBlocked} blocked (${durationMs}ms)`,
    );

    return {
      immediate,
      sponsor,
      transition,
      transfer,
      overallSummary,
      matchedAt: new Date().toISOString(),
      inputSummary: {
        occupationCode: input.occupationCode,
        salaryMin: input.salaryMin,
        salaryMax: input.salaryMax,
        experienceLevel: input.experienceLevel,
        educationLevel: input.educationLevel,
        overseasHireWilling: input.overseasHireWilling,
        isDepopulationArea: input.workAddress.isDepopulationArea,
      },
    };
  }

  /**
   * Applicant-side 비자 매칭: 지원자 프로필 기반 교차 검증
   * Applicant-side visa matching: Cross-validation with applicant profile
   *
   * @param dto 공고 + 지원자 프로필 DTO / Job + applicant profile DTO
   * @returns 지원자의 해당 공고 지원 가능 여부 / Applicant's eligibility for the job
   */
  async evaluateApplicant(
    dto: FulltimeVisaMatchingWithApplicantRequestDto,
  ): Promise<FulltimeVisaMatchingWithApplicantResponseDto> {
    const startTime = Date.now();
    this.logger.log(
      `[evaluateApplicant] 지원자 기준 비자 매칭 시작 / Starting applicant-side visa matching`,
    );

    const input: FulltimeJobInput = {
      occupationCode: dto.jobInput.occupationCode,
      salaryMin: dto.jobInput.salaryMin,
      salaryMax: dto.jobInput.salaryMax,
      experienceLevel: dto.jobInput.experienceLevel,
      educationLevel: dto.jobInput.educationLevel,
      weeklyWorkHours: dto.jobInput.weeklyWorkHours ?? 40, // 기본값 40시간 / Default 40 hours
      preferredMajors: dto.jobInput.preferredMajors,
      overseasHireWilling: dto.jobInput.overseasHireWilling,
      workAddress: {
        sido: dto.jobInput.workAddress.sido,
        sigungu: dto.jobInput.workAddress.sigungu,
        isDepopulationArea: dto.jobInput.workAddress.isDepopulationArea,
      },
      companyInfo: dto.jobInput.companyInfo, // E-1, E-2, E-3, E-7-2 고용비율 확인용
    };

    const profile: ApplicantProfile = {
      currentVisaType: dto.applicantProfile.currentVisaType,
      currentVisaSubtype: dto.applicantProfile.currentVisaSubtype,
      educationLevel: dto.applicantProfile.educationLevel,
      major: dto.applicantProfile.major,
      experienceYears: dto.applicantProfile.experienceYears,
      topikLevel: dto.applicantProfile.topikLevel,
      nativeSpeakerOf: dto.applicantProfile.nativeSpeakerOf,
      professionalLicense: dto.applicantProfile.professionalLicense,
      legalStayYears: dto.applicantProfile.legalStayYears,
      koreaExperienceYears: dto.applicantProfile.koreaExperienceYears,
    };

    // 지원자의 현재 비자 타입에 해당하는 Evaluator 찾기
    // Find evaluator for applicant's current visa type
    const evaluator = this.evaluators.find(
      (e) => e.visaCode === profile.currentVisaType,
    );

    if (!evaluator) {
      // 현재 비자 타입이 목록에 없는 경우
      // If current visa type is not in the list
      this.logger.warn(
        `[evaluateApplicant] 지원자 비자 타입 미지원 / Unsupported visa type: ${profile.currentVisaType}`,
      );

      return {
        canApply: false,
        currentVisaType: profile.currentVisaType,
        evaluationResult: {
          visaCode: profile.currentVisaType,
          visaName: '미지원 비자',
          visaNameEn: 'Unsupported visa',
          hiringTrack: 'IMMEDIATE',
          status: 'blocked',
          conditions: [],
          blockReasons: [
            '해당 비자 타입은 현재 지원되지 않습니다 ' +
              '(This visa type is currently not supported)',
          ],
          requiredPermit: null,
          notes: null,
          estimatedDays: null,
          requiredDocuments: [],
        },
        recommendations: [],
        matchedAt: new Date().toISOString(),
      };
    }

    // 지원자 프로필 기반 평가 / Evaluate with applicant profile
    const result = evaluator.evaluateApplicant(input, profile);

    const durationMs = Date.now() - startTime;
    this.logger.log(
      `[evaluateApplicant] 지원자 매칭 완료 / Applicant matching completed: ` +
        `${result.status} (${durationMs}ms)`,
    );

    // DTO 변환 / Convert to DTO
    const evaluationResult: VisaEvalResultDto = {
      visaCode: result.visaCode,
      visaName: result.visaName,
      visaNameEn: result.visaNameEn,
      hiringTrack: result.hiringTrack,
      status: result.status,
      conditions: result.conditions,
      blockReasons: result.blockReasons,
      requiredPermit: result.requiredPermit,
      notes: result.notes,
      estimatedDays: result.estimatedDays,
      requiredDocuments: result.requiredDocuments,
    };

    // 추천사항 생성 / Generate recommendations
    const recommendations: string[] = [];
    if (result.status === 'eligible') {
      recommendations.push(
        '해당 공고에 지원 가능합니다 (You can apply to this job posting)',
      );
    } else if (result.status === 'conditional') {
      recommendations.push(
        '조건부 지원 가능합니다. 조건을 확인하세요 ' +
          '(Conditional application. Please check the conditions)',
      );
      recommendations.push(...result.conditions);
    } else {
      recommendations.push(
        '해당 공고에 지원할 수 없습니다 (You cannot apply to this job posting)',
      );
      recommendations.push(...result.blockReasons);
    }

    return {
      canApply: result.status === 'eligible' || result.status === 'conditional',
      currentVisaType: profile.currentVisaType,
      evaluationResult,
      recommendations,
      matchedAt: new Date().toISOString(),
    };
  }

  /**
   * 트랙별 결과 그룹핑 유틸리티
   * Utility to group results by hiring track
   */
  private groupByTrack(
    results: FulltimeVisaEvalResult[],
    track: 'IMMEDIATE' | 'SPONSOR' | 'TRANSITION' | 'TRANSFER',
  ): HiringTrackGroupDto {
    const trackResults = results.filter((r) => r.hiringTrack === track);

    const eligible = trackResults.filter((r) => r.status === 'eligible');
    const conditional = trackResults.filter((r) => r.status === 'conditional');
    const blocked = trackResults.filter((r) => r.status === 'blocked');

    const trackNames = {
      IMMEDIATE: { ko: '즉시 채용 가능', en: 'Immediate Hiring' },
      SPONSOR: { ko: '해외 인재 스폰서', en: 'Overseas Sponsor' },
      TRANSITION: { ko: '체류자격 전환', en: 'Status Transition' },
      TRANSFER: { ko: '비자 보유자 이직', en: 'Visa Holder Transfer' },
    };

    return {
      track,
      trackName: trackNames[track].ko,
      trackNameEn: trackNames[track].en,
      eligible: eligible.map(this.toDto),
      conditional: conditional.map(this.toDto),
      blocked: blocked.map(this.toDto),
      summary: {
        totalEligible: eligible.length,
        totalConditional: conditional.length,
        totalBlocked: blocked.length,
      },
    };
  }

  /**
   * FulltimeVisaEvalResult → VisaEvalResultDto 변환
   * Convert FulltimeVisaEvalResult to VisaEvalResultDto
   */
  private toDto(result: FulltimeVisaEvalResult): VisaEvalResultDto {
    return {
      visaCode: result.visaCode,
      visaName: result.visaName,
      visaNameEn: result.visaNameEn,
      hiringTrack: result.hiringTrack,
      status: result.status,
      conditions: result.conditions,
      blockReasons: result.blockReasons,
      requiredPermit: result.requiredPermit,
      notes: result.notes,
      estimatedDays: result.estimatedDays,
      requiredDocuments: result.requiredDocuments,
    };
  }

  /**
   * 정규직 비자 필터링 규칙 조회 (프론트엔드 실시간 필터링용)
   * Get fulltime visa filter rules (for frontend real-time filtering)
   *
   * 플랫폼 채용 가능 비자만 포함 (고용허가제 E-9, H-2, E-7-4 제외)
   * Only includes platform-hireable visas (excludes employment permit system)
   *
   * 4가지 채용 경로 / 4 hiring tracks:
   * - IMMEDIATE: 즉시채용 (비자절차 불필요)
   * - TRANSITION: E-7 전환 (체류자격 변경)
   * - TRANSFER: E-7 이직 (근무처 변경)
   * - SPONSOR: E-7 해외초청 (신규발급)
   *
   * @returns 비자 필터링 규칙 목록 (12개) / Visa filter rules list (12 visas)
   */
  async getFilterRules(): Promise<FulltimeVisaFilterRulesResponseDto> {
    this.logger.log(
      '[getFilterRules] 비자 필터링 규칙 조회 / Fetching visa filter rules',
    );

    // 플랫폼 채용 가능 비자 규칙 (12개)
    // Platform-hireable visa rules (12 visas)
    const visas: VisaFilterRuleDto[] = [
      // ========== IMMEDIATE: 즉시 채용 가능 (3개) ==========
      {
        visaCode: 'F-2',
        visaName: '거주',
        visaNameEn: 'Resident',
        hiringTrack: 'IMMEDIATE',
        minSalary: null, // 제한 없음 / No limit
        minEducation: null, // 제한 없음 / No limit
        requiresOverseasHire: false,
        allowedJobCategories: null, // 모든 직종 가능 / All jobs allowed
        notes: 'F-2 비자 소지자는 별도 제한 없이 자유롭게 취업 가능',
        requiresEntryLevel: false,
      },
      {
        visaCode: 'F-5',
        visaName: '영주',
        visaNameEn: 'Permanent Resident',
        hiringTrack: 'IMMEDIATE',
        minSalary: null,
        minEducation: null,
        requiresOverseasHire: false,
        allowedJobCategories: null, // 모든 직종 가능
        notes: 'F-5 영주 비자는 취업 제한 없음',
        requiresEntryLevel: false,
      },
      {
        visaCode: 'F-6',
        visaName: '결혼이민',
        visaNameEn: 'Marriage Migrant',
        hiringTrack: 'IMMEDIATE',
        minSalary: null,
        minEducation: null,
        requiresOverseasHire: false,
        allowedJobCategories: null, // 모든 직종 가능
        notes: 'F-6 결혼이민 비자는 취업 제한 없음',
        requiresEntryLevel: false,
      },

      // ========== TRANSITION: E-7 전환 (3개) ==========
      {
        visaCode: 'D-2',
        visaName: '유학',
        visaNameEn: 'Study',
        hiringTrack: 'TRANSITION',
        minSalary: 28000000, // E-7 전환 기준
        minEducation: 'BACHELOR', // 학사 이상 (졸업 필요)
        requiresOverseasHire: false, // 국내 체류 중
        allowedJobCategories: [
          ...getAllowedJobCodesByE7Type('E-7-1'),
          ...getAllowedJobCodesByE7Type('E-7-2'),
          ...getAllowedJobCodesByE7Type('E-7-3'),
        ], // 전체 E-7 허용 직종 (87개)
        notes:
          'D-2 유학 비자 보유자가 졸업예정(최종학기) 또는 졸업 후 E-7로 전환 시 채용 가능. 신입 채용만 해당.',
        requiresEntryLevel: true, // 졸업예정자/졸업자는 신입만
      },
      {
        visaCode: 'D-4',
        visaName: '어학연수',
        visaNameEn: 'Language Training',
        hiringTrack: 'TRANSITION',
        minSalary: 28000000, // E-7 전환 기준
        minEducation: null, // 학력 제한 없음 (조건은 추후 조정)
        requiresOverseasHire: false, // 국내 체류 중
        allowedJobCategories: [
          ...getAllowedJobCodesByE7Type('E-7-1'),
          ...getAllowedJobCodesByE7Type('E-7-2'),
          ...getAllowedJobCodesByE7Type('E-7-3'),
        ], // 전체 E-7 허용 직종 (87개)
        notes:
          'D-4 어학연수 비자 보유자가 E-7로 전환 시 채용 가능. 조건은 추후 설정 예정.',
        requiresEntryLevel: true, // 신입 채용만
      },
      {
        visaCode: 'D-10',
        visaName: '구직',
        visaNameEn: 'Job Seeking',
        hiringTrack: 'TRANSITION',
        minSalary: 28000000, // E-7 전환 기준
        minEducation: 'BACHELOR', // 학사 이상
        requiresOverseasHire: false, // 국내 체류 중
        allowedJobCategories: [
          ...getAllowedJobCodesByE7Type('E-7-1'),
          ...getAllowedJobCodesByE7Type('E-7-2'),
          ...getAllowedJobCodesByE7Type('E-7-3'),
        ], // 전체 E-7 허용 직종 (87개)
        notes:
          'D-10 구직 비자 보유자가 E-7로 전환 시 채용 가능. 신입/경력 모두 가능.',
        requiresEntryLevel: false, // 경력자도 가능 (퇴사 후 구직)
      },

      // ========== TRANSFER: E-7 이직 (3개) ==========
      {
        visaCode: 'E-7-1',
        visaName: 'E-7-1 이직',
        visaNameEn: 'E-7-1 Transfer',
        hiringTrack: 'TRANSFER',
        minSalary: 34400000, // GNI 80% (2025년 기준 약 4,300만원의 80%)
        minEducation: 'BACHELOR', // 학사 이상
        requiresOverseasHire: false, // 국내 체류 중
        allowedJobCategories: getAllowedJobCodesByE7Type('E-7-1'), // E-7-1 허용 직종 67개
        notes:
          'E-7-1 비자 보유자가 직장 변경 시 채용 가능. 근무처 변경 신고 필요.',
        requiresEntryLevel: false,
      },
      {
        visaCode: 'E-7-2',
        visaName: 'E-7-2 이직',
        visaNameEn: 'E-7-2 Transfer',
        hiringTrack: 'TRANSFER',
        minSalary: 25200000, // 최저임금 이상 (2025년 기준 월 약 210만원 * 12개월)
        minEducation: 'ASSOCIATE', // 전문학사 이상
        requiresOverseasHire: false, // 국내 체류 중
        allowedJobCategories: getAllowedJobCodesByE7Type('E-7-2'), // E-7-2 허용 직종 10개
        notes:
          'E-7-2 비자 보유자가 직장 변경 시 채용 가능. 근무처 변경 신고 필요.',
        requiresEntryLevel: false,
      },
      {
        visaCode: 'E-7-3',
        visaName: 'E-7-3 이직',
        visaNameEn: 'E-7-3 Transfer',
        hiringTrack: 'TRANSFER',
        minSalary: 25200000, // 최저임금 이상 (2025년 기준)
        minEducation: null, // 학력 제한 없음 (일반기능인력)
        requiresOverseasHire: false, // 국내 체류 중
        allowedJobCategories: getAllowedJobCodesByE7Type('E-7-3'), // E-7-3 허용 직종 13개
        notes:
          'E-7-3 비자 보유자가 직장 변경 시 채용 가능. 근무처 변경 신고 필요.',
        requiresEntryLevel: false,
      },

      // ========== SPONSOR: E-7 해외초청 (3개) ==========
      {
        visaCode: 'E-7-1',
        visaName: 'E-7-1 신규',
        visaNameEn: 'E-7-1 New',
        hiringTrack: 'SPONSOR',
        minSalary: 34400000, // GNI 80% (2025년 기준)
        minEducation: 'BACHELOR', // 학사 이상
        requiresOverseasHire: true, // 해외 초청
        allowedJobCategories: getAllowedJobCodesByE7Type('E-7-1'), // E-7-1 허용 직종 67개
        notes:
          'E-7-1 비자 신규 발급. 전문 직종 취업 가능. 법무부 지정 직종 한정.',
        requiresEntryLevel: false,
      },
      {
        visaCode: 'E-7-2',
        visaName: 'E-7-2 신규',
        visaNameEn: 'E-7-2 New',
        hiringTrack: 'SPONSOR',
        minSalary: 25200000, // 최저임금 이상 (2025년 기준)
        minEducation: 'ASSOCIATE', // 전문학사 이상
        requiresOverseasHire: true, // 해외 초청
        allowedJobCategories: getAllowedJobCodesByE7Type('E-7-2'), // E-7-2 허용 직종 10개
        notes:
          'E-7-2 비자 신규 발급. 준전문 직종 취업 가능. 외국인 고용비율 20% 이하 유지 필요.',
        requiresEntryLevel: false,
      },
      {
        visaCode: 'E-7-3',
        visaName: 'E-7-3 신규',
        visaNameEn: 'E-7-3 New',
        hiringTrack: 'SPONSOR',
        minSalary: 25200000, // 최저임금 이상 (2025년 기준)
        minEducation: null, // 학력 제한 없음 (일반기능인력)
        requiresOverseasHire: true, // 해외 초청
        allowedJobCategories: getAllowedJobCodesByE7Type('E-7-3'), // E-7-3 허용 직종 13개
        notes:
          'E-7-3 비자 신규 발급. 점수제 기준 충족 시 발급. 학력/경력/한국어능력 종합 평가.',
        requiresEntryLevel: false,
      },
    ];

    return {
      visas,
      totalCount: visas.length,
      retrievedAt: new Date().toISOString(),
    };
  }
}
