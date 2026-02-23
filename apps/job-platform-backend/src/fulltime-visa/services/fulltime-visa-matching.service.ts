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
import { E7CategoriesResponseDto } from '../dto/e7-categories-response.dto';
import {
  IFulltimeVisaEvaluator,
  FulltimeVisaEvalResult,
  FulltimeJobInput,
  ApplicantProfile,
} from '../evaluators/fulltime-evaluator.interface';

// Evaluators — 10종 비자 (법무부공고 2025-406호 기준)
// 제외: E-1~E-6 (교육/연구/면허직), E-7-4/E-9 (고용허가제), D-4, H-2
import { F5FulltimeEvaluator } from '../evaluators/f5-fulltime-evaluator';
import { F6FulltimeEvaluator } from '../evaluators/f6-fulltime-evaluator';
import { F2FulltimeEvaluator } from '../evaluators/f2-fulltime-evaluator';
import { F4FulltimeEvaluator } from '../evaluators/f4-fulltime-evaluator';
import { E71FulltimeEvaluator } from '../evaluators/e7-1-fulltime-evaluator';
import { E72FulltimeEvaluator } from '../evaluators/e7-2-fulltime-evaluator';
import { E73FulltimeEvaluator } from '../evaluators/e7-3-fulltime-evaluator';
import { E7SFulltimeEvaluator } from '../evaluators/e7-s-fulltime-evaluator';
import { D2FulltimeEvaluator } from '../evaluators/d2-fulltime-evaluator';
import { D10FulltimeEvaluator } from '../evaluators/d10-fulltime-evaluator';

// E-7 직종 카테고리 상수 / E-7 job category constants
import {
  getAllowedJobCodesByE7Type,
  E7_JOB_CATEGORIES,
  E7_STATS,
} from '../constants/e7-job-categories';

// GNI/연봉 기준 데이터 / GNI/salary threshold data
import { getCurrentE7MinSalary } from '../data/gni-table';

@Injectable()
export class FulltimeVisaMatchingService {
  private readonly logger = new Logger(FulltimeVisaMatchingService.name);
  private readonly evaluators: IFulltimeVisaEvaluator[];

  constructor() {
    // 플랫폼 비자 Evaluator 목록 (10종) / Platform visa evaluators (10 types)
    this.evaluators = [
      // IMMEDIATE: F비자 (즉시 채용 가능) / F visas (Immediate hiring)
      new F5FulltimeEvaluator(),
      new F6FulltimeEvaluator(),
      new F2FulltimeEvaluator(),
      new F4FulltimeEvaluator(),

      // SPONSOR + TRANSFER: E-7 비자 / E-7 visas
      new E71FulltimeEvaluator(),
      new E72FulltimeEvaluator(),
      new E73FulltimeEvaluator(),
      new E7SFulltimeEvaluator(),

      // TRANSITION: D비자 → E-7 전환 / D visas → E-7 transition
      new D2FulltimeEvaluator(),
      new D10FulltimeEvaluator(),
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
      companyInfo: dto.jobInput.companyInfo, // E-7-2, E-7-3 고용비율 확인용
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
      companyInfo: dto.jobInput.companyInfo, // E-7-2, E-7-3 고용비율 확인용
    };

    const profile: ApplicantProfile = {
      currentVisaType: dto.applicantProfile.currentVisaType,
      currentVisaSubtype: dto.applicantProfile.currentVisaSubtype,
      educationLevel: dto.applicantProfile.educationLevel,
      major: dto.applicantProfile.major,
      isDomesticUniversity: dto.applicantProfile.isDomesticUniversity,
      domesticDegreeLevel: dto.applicantProfile.domesticDegreeLevel,
      isGraduating: dto.applicantProfile.isGraduating,
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
   * E-7 직종 목록 조회 (프론트엔드 드롭다운용)
   * Get E-7 job categories (for frontend dropdown)
   *
   * 웹/앱 공통으로 사용하는 직종 선택 데이터.
   * Shared dropdown data for web and app.
   * 법무부 고시 기준 — 개정 시 백엔드 상수만 수정하면 됨.
   * Based on MOJ notice — only backend constant needs update when revised.
   */
  getE7Categories(): E7CategoriesResponseDto {
    this.logger.log(
      '[getE7Categories] E-7 직종 목록 조회 / Fetching E-7 job categories',
    );

    return {
      categories: E7_JOB_CATEGORIES.map((cat) => ({
        code: cat.code,
        nameKo: cat.nameKo,
        nameEn: cat.nameEn,
        e7Type: cat.e7Type,
        categoryGroup: cat.categoryGroup,
      })),
      e71Count: E7_STATS['E-7-1'],
      e72Count: E7_STATS['E-7-2'],
      e73Count: E7_STATS['E-7-3'],
      totalCount: E7_STATS.total,
      basedOn: '2026-01-01',
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
   * 정규직 비자 필터링 규칙 조회 (프론트엔드 참조용)
   * Get fulltime visa filter rules (for frontend reference)
   *
   * ⚠️ 이 데이터는 프론트엔드 표시용 참고 정보입니다.
   * 실제 비자 판단은 POST /fulltime-visa/evaluate API에서 수행합니다.
   *
   * 10종 비자, 12개 트랙 항목 (법무부공고 2025-406호 기준)
   * 9 visa types, 12 track items (per MOJ Notice 2025-406)
   *
   * @returns 비자 필터링 규칙 목록 (12개) / Visa filter rules list (12 items)
   */
  async getFilterRules(): Promise<FulltimeVisaFilterRulesResponseDto> {
    this.logger.log(
      '[getFilterRules] 비자 필터링 규칙 조회 / Fetching visa filter rules',
    );

    // 동적으로 최소 연봉 조회 / Dynamically fetch minimum salaries
    const e71Min = getCurrentE7MinSalary('E-7-1');
    const e72Min = getCurrentE7MinSalary('E-7-2');
    const e73Min = getCurrentE7MinSalary('E-7-3');

    // E-7 전체 허용 직종 (E-7-1 + E-7-2 + E-7-3)
    const allE7JobCodes = [
      ...getAllowedJobCodesByE7Type('E-7-1'),
      ...getAllowedJobCodesByE7Type('E-7-2'),
      ...getAllowedJobCodesByE7Type('E-7-3'),
    ];

    const visas: VisaFilterRuleDto[] = [
      // ========== IMMEDIATE: 즉시 채용 가능 (4개) ==========
      {
        visaCode: 'F-5',
        visaName: '영주',
        visaNameEn: 'Permanent Resident',
        hiringTrack: 'IMMEDIATE',
        minSalary: null,
        minEducation: null,
        requiresOverseasHire: false,
        allowedJobCategories: null,
        notes: 'F-5 영주 비자 — 취업 제한 없음',
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
        allowedJobCategories: null,
        notes: 'F-6 결혼이민 — 취업 제한 없음',
        requiresEntryLevel: false,
      },
      {
        visaCode: 'F-2',
        visaName: '거주',
        visaNameEn: 'Resident',
        hiringTrack: 'IMMEDIATE',
        minSalary: null,
        minEducation: null,
        requiresOverseasHire: false,
        allowedJobCategories: null,
        notes: 'F-2 거주 — 유흥업소/단순노무 제한 (인구감소지역 예외)',
        requiresEntryLevel: false,
      },
      {
        visaCode: 'F-4',
        visaName: '재외동포',
        visaNameEn: 'Overseas Korean',
        hiringTrack: 'IMMEDIATE',
        minSalary: null,
        minEducation: null,
        requiresOverseasHire: false,
        allowedJobCategories: null,
        notes:
          'F-4 재외동포 — 풍속/공공이익/단순노무 제한 (인구감소지역 예외). 2026.2.12 H-2/F-4 통합',
        requiresEntryLevel: false,
      },

      // ========== SPONSOR: E-7 해외초청 (3개) ==========
      {
        visaCode: 'E-7-1',
        visaName: 'E-7-1 신규',
        visaNameEn: 'E-7-1 New Sponsor',
        hiringTrack: 'SPONSOR',
        minSalary: e71Min,
        minEducation: 'BACHELOR',
        requiresOverseasHire: true,
        allowedJobCategories: getAllowedJobCodesByE7Type('E-7-1'),
        notes: `E-7-1 전문인력 신규 — 최소 연봉 ${e71Min.toLocaleString()}원 (법무부공고 2025-406호)`,
        requiresEntryLevel: false,
      },
      {
        visaCode: 'E-7-2',
        visaName: 'E-7-2 신규',
        visaNameEn: 'E-7-2 New Sponsor',
        hiringTrack: 'SPONSOR',
        minSalary: e72Min,
        minEducation: null,
        requiresOverseasHire: true,
        allowedJobCategories: getAllowedJobCodesByE7Type('E-7-2'),
        notes: `E-7-2 준전문인력 신규 — 최소 연봉 ${e72Min.toLocaleString()}원. 고용비율 20% 제한`,
        requiresEntryLevel: false,
      },
      {
        visaCode: 'E-7-3',
        visaName: 'E-7-3 신규',
        visaNameEn: 'E-7-3 New Sponsor',
        hiringTrack: 'SPONSOR',
        minSalary: e73Min,
        minEducation: null,
        requiresOverseasHire: true,
        allowedJobCategories: getAllowedJobCodesByE7Type('E-7-3'),
        notes: `E-7-3 일반기능인력 신규 — 최소 연봉 ${e73Min.toLocaleString()}원. 기업추천 방식 (점수제 아님)`,
        requiresEntryLevel: false,
      },

      // ========== TRANSFER: E-7 이직 (3개) ==========
      {
        visaCode: 'E-7-1',
        visaName: 'E-7-1 이직',
        visaNameEn: 'E-7-1 Transfer',
        hiringTrack: 'TRANSFER',
        minSalary: e71Min,
        minEducation: 'BACHELOR',
        requiresOverseasHire: false,
        allowedJobCategories: getAllowedJobCodesByE7Type('E-7-1'),
        notes: 'E-7-1 전문인력 이직 — 근무처 변경 신고 필요',
        requiresEntryLevel: false,
      },
      {
        visaCode: 'E-7-2',
        visaName: 'E-7-2 이직',
        visaNameEn: 'E-7-2 Transfer',
        hiringTrack: 'TRANSFER',
        minSalary: e72Min,
        minEducation: null,
        requiresOverseasHire: false,
        allowedJobCategories: getAllowedJobCodesByE7Type('E-7-2'),
        notes:
          'E-7-2 준전문인력 이직 — 근무처 변경 신고 필요. 고용비율 20% 제한',
        requiresEntryLevel: false,
      },
      {
        visaCode: 'E-7-3',
        visaName: 'E-7-3 이직',
        visaNameEn: 'E-7-3 Transfer',
        hiringTrack: 'TRANSFER',
        minSalary: e73Min,
        minEducation: null,
        requiresOverseasHire: false,
        allowedJobCategories: getAllowedJobCodesByE7Type('E-7-3'),
        notes: 'E-7-3 일반기능인력 이직 — 근무처 변경 신고 필요',
        requiresEntryLevel: false,
      },

      // ========== TRANSITION: E-7 전환 (2개) ==========
      {
        visaCode: 'D-2',
        visaName: '유학 → E-7',
        visaNameEn: 'Study → E-7 Transition',
        hiringTrack: 'TRANSITION',
        minSalary: e72Min, // 최소 기준 (E-7-2/3 수준)
        minEducation: 'ASSOCIATE',
        requiresOverseasHire: false,
        allowedJobCategories: allE7JobCodes,
        notes:
          'D-2 유학 → E-7 전환. 국내 대학 졸업(예정)자 특례 적용. D-2-7 고용비율 면제',
        requiresEntryLevel: true,
      },
      {
        visaCode: 'D-10',
        visaName: '구직 → E-7',
        visaNameEn: 'Job Seeking → E-7 Transition',
        hiringTrack: 'TRANSITION',
        minSalary: e72Min, // 최소 기준 (E-7-2/3 수준)
        minEducation: 'BACHELOR',
        requiresOverseasHire: false,
        allowedJobCategories: allE7JobCodes,
        notes: 'D-10 구직 → E-7 전환. 최대 2년 내 전환 필요',
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
