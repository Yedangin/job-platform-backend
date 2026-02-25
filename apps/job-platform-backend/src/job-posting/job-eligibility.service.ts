/**
 * 공고 적격성 서비스 — 구직자 비자 기반 공고 필터링 (Goal B)
 * Job eligibility service — filter job postings based on job seeker's visa
 *
 * 동작 흐름:
 * 1. 사용자의 비자 인증(VisaVerification) + 이력서(Resume) 로드
 * 2. 공고의 기업 프로필(CorporateProfile) 데이터로 평가 입력 구성
 * 3. 비자 매칭 엔진으로 단일 비자 평가 실행
 * 4. 적격 공고만 반환 (상세 사유 포함)
 */
import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';
import { RuleEngineService } from '../visa-rules/rule-engine.service';
import { EvaluateVisaInput } from '../visa-rules/evaluators/evaluator.interface';

/**
 * 공고 적격성 결과
 * Job eligibility result per posting
 */
export interface JobEligibilityResult {
  eligible: boolean;
  visaCode: string;
  documents: string[];
  restrictions: string[];
  notes: string[];
  blockedReasons: string[];
  suggestions: string[];
  score?: number;
  requiredScore?: number;
}

/**
 * 사용자 비자 프로필 (Resume + VisaVerification 합산)
 * User visa profile (combined from Resume + VisaVerification)
 */
interface UserVisaProfile {
  visaCode: string;
  visaSubType?: string;
  nationality?: string;
  age?: number;
  educationLevel?: string;
  koreanLevel?: string;
  workExperienceYears?: number;
  isEthnicKorean?: boolean;
  targetOccupationCode?: string;
}

@Injectable()
export class JobEligibilityService {
  private readonly logger = new Logger(JobEligibilityService.name);

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly ruleEngine: RuleEngineService,
  ) {}

  /**
   * 사용자 비자 프로필 로드 (VisaVerification + Resume)
   * Load user's visa profile from VisaVerification + Resume
   */
  async getUserVisaProfile(userId: string): Promise<UserVisaProfile | null> {
    // 1. 비자 인증 데이터 로드
    // 1. Load visa verification data
    const verification = await this.prisma.visaVerification.findUnique({
      where: { userId },
    });

    if (!verification || !verification.visaCode) {
      return null;
    }

    // 2. 이력서 데이터 로드
    // 2. Load resume data
    const resume = await this.prisma.resume.findUnique({
      where: { userId },
    });

    // 3. 프로필 구성
    // 3. Build profile
    const profile: UserVisaProfile = {
      visaCode: verification.visaCode,
      visaSubType: verification.visaSubType ?? undefined,
      nationality: resume?.nationality ?? undefined,
    };

    // 나이 계산 (생년월일 기준)
    // Calculate age from birth date
    if (resume?.birthDate) {
      const today = new Date();
      const birth = new Date(resume.birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
      ) {
        age--;
      }
      profile.age = age;
    }

    // 학력 수준 추출 (최고 학력)
    // Extract education level (highest degree)
    if (resume?.educations) {
      const educations = resume.educations as any[];
      if (Array.isArray(educations) && educations.length > 0) {
        const degreeOrder = [
          'HIGH_SCHOOL',
          'COLLEGE',
          'ASSOCIATE',
          'BACHELOR',
          'MASTER',
          'DOCTORATE',
          'DOCTOR',
        ];
        let highest = 'HIGH_SCHOOL';
        for (const edu of educations) {
          const degree = edu.degree || edu.educationLevel || '';
          const idx = degreeOrder.indexOf(degree.toUpperCase());
          if (idx > degreeOrder.indexOf(highest)) {
            highest = degree.toUpperCase();
          }
        }
        profile.educationLevel = highest;
      }
    }

    // 한국어 수준 (TOPIK > KIIP)
    // Korean level (TOPIK takes priority)
    if (resume?.topikLevel && resume.topikLevel > 0) {
      profile.koreanLevel = `TOPIK${resume.topikLevel}`;
    } else if (resume?.kiipLevel && resume.kiipLevel > 0) {
      profile.koreanLevel = `KIIP_LEVEL_${resume.kiipLevel}`;
    }

    // 경력 연수 계산
    // Calculate work experience years
    if (resume?.workExperiences) {
      const experiences = resume.workExperiences as any[];
      if (Array.isArray(experiences) && experiences.length > 0) {
        let totalMonths = 0;
        for (const exp of experiences) {
          if (exp.startDate) {
            const start = new Date(exp.startDate);
            const end = exp.endDate ? new Date(exp.endDate) : new Date();
            const months =
              (end.getFullYear() - start.getFullYear()) * 12 +
              (end.getMonth() - start.getMonth());
            totalMonths += Math.max(0, months);
          }
        }
        profile.workExperienceYears = Math.floor(totalMonths / 12);
      }
    }

    return profile;
  }

  /**
   * 기업 프로필 + 공고로 EvaluateVisaInput 구성
   * Build EvaluateVisaInput from CorporateProfile + JobPosting + UserProfile
   */
  private buildEvaluationInput(
    corp: any,
    job: any,
    userProfile: UserVisaProfile,
  ): EvaluateVisaInput {
    // 급여 계산 (만원/월)
    // Calculate salary (만원/month)
    let offeredSalary = 0;
    if (job.albaAttributes?.hourlyWage) {
      // 시급 (원) → 월급 (만원): 시급 × 160시간 ÷ 10000
      // Hourly wage (won) → monthly salary (만원): hourlyWage × 160hr / 10000
      offeredSalary = Math.round((job.albaAttributes.hourlyWage * 160) / 10000);
    } else if (job.fulltimeAttributes?.salaryMin) {
      offeredSalary = job.fulltimeAttributes.salaryMin;
    }

    return {
      // 기업측 / Company-side
      ksicCode: corp?.ksicCode || '',
      companySizeType: corp?.companySizeType || 'SME',
      employeeCountKorean: corp?.employeeCountKorean || 0,
      employeeCountForeign: corp?.employeeCountForeign || 0,
      annualRevenue: corp?.annualRevenue ? Number(corp.annualRevenue) : 0,
      addressRoad: corp?.addressRoad || '',
      jobType: job.boardType === 'PART_TIME' ? 'PART_TIME' : 'FULL_TIME',
      offeredSalary,
      // 개인측 / Individual-side
      nationality: userProfile.nationality,
      age: userProfile.age,
      educationLevel: userProfile.educationLevel,
      koreanLevel: userProfile.koreanLevel,
      workExperienceYears: userProfile.workExperienceYears,
      currentVisaCode: userProfile.visaCode,
      targetOccupationCode: userProfile.targetOccupationCode,
      isEthnicKorean: userProfile.isEthnicKorean,
    };
  }

  /**
   * 비자 필터링된 공고 목록 조회
   * Get job listings filtered by user's visa eligibility
   */
  async getVisaFilteredListings(
    userId: string,
    query: {
      boardType?: string;
      keyword?: string;
      employmentSubType?: string;
      page?: number;
      limit?: number;
    },
  ) {
    // 1. 사용자 비자 프로필 로드
    // 1. Load user's visa profile
    const userProfile = await this.getUserVisaProfile(userId);
    if (!userProfile) {
      throw new BadRequestException(
        '비자 인증이 필요합니다. 먼저 비자 인증을 완료해주세요. / Visa verification required. Please complete visa verification first.',
      );
    }

    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    // 2. 1차 필터: allowedVisas에 사용자 비자코드 포함 + ACTIVE 상태
    // 2. Pre-filter: allowedVisas contains user's visa code + ACTIVE status
    const visaCode = userProfile.visaCode;
    const where: any = {
      status: 'ACTIVE',
      allowedVisas: { contains: visaCode },
    };

    if (query.boardType) {
      where.boardType = query.boardType;
    }
    if (query.keyword) {
      where.OR = [
        { title: { contains: query.keyword, mode: 'insensitive' } },
        { description: { contains: query.keyword, mode: 'insensitive' } },
      ];
    }
    if (query.employmentSubType) {
      where.employmentSubType = query.employmentSubType;
    }

    const [preFilteredItems, preFilteredTotal] = await Promise.all([
      this.prisma.jobPosting.findMany({
        where,
        include: {
          albaAttributes: true,
          fulltimeAttributes: true,
        },
        orderBy: [{ tierType: 'asc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      this.prisma.jobPosting.count({ where }),
    ]);

    // 3. 기업 프로필 일괄 로드
    // 3. Batch load corporate profiles
    const corporateIds = [
      ...new Set(preFilteredItems.map((i) => i.corporateId)),
    ];
    const corporates = await this.prisma.corporateProfile.findMany({
      where: { companyId: { in: corporateIds } },
    });
    const corpMap = new Map(corporates.map((c) => [c.companyId.toString(), c]));

    // 4. 2차 필터: 개인 조건 기반 상세 평가
    // 4. Deep filter: individual-specific evaluation
    const results: Array<{
      job: any;
      corp: any;
      eligibility: JobEligibilityResult;
    }> = [];

    for (const job of preFilteredItems) {
      const corp = corpMap.get(job.corporateId.toString());
      const input = this.buildEvaluationInput(corp, job, userProfile);

      try {
        const evalResult = await this.ruleEngine.evaluateSingleVisa(
          input,
          visaCode,
        );

        results.push({
          job,
          corp,
          eligibility: {
            eligible: evalResult.eligible,
            visaCode,
            documents: evalResult.documents,
            restrictions: evalResult.restrictions,
            notes: evalResult.notes,
            blockedReasons: evalResult.blockedReasons,
            suggestions: evalResult.suggestions,
            score: evalResult.score,
            requiredScore: evalResult.requiredScore,
          },
        });
      } catch (error) {
        this.logger.warn(
          `공고 ${job.id} 평가 실패 (무시): ${error.message} / Job ${job.id} evaluation failed (ignored)`,
        );
        // 평가 실패 시 기본 적격으로 포함 (pre-filter 통과했으므로)
        // If evaluation fails, include as eligible (passed pre-filter)
        results.push({
          job,
          corp,
          eligibility: {
            eligible: true,
            visaCode,
            documents: [],
            restrictions: [],
            notes: [
              '상세 평가 불가 — 기본 비자 필터만 적용됨 / Detailed evaluation unavailable — basic visa filter applied',
            ],
            blockedReasons: [],
            suggestions: [],
          },
        });
      }
    }

    // 5. 적격 공고만 필터 (부적격 공고 수 추적)
    // 5. Filter to eligible only (track ineligible count)
    const eligibleResults = results.filter((r) => r.eligibility.eligible);
    const ineligibleCount = results.length - eligibleResults.length;

    return {
      items: eligibleResults.map((r) =>
        this.formatJobWithEligibility(r.job, r.corp, r.eligibility),
      ),
      total: preFilteredTotal - ineligibleCount,
      page,
      limit,
      totalPages: Math.ceil((preFilteredTotal - ineligibleCount) / limit),
      visaFilter: {
        appliedVisaCode: visaCode,
        preFilteredCount: preFilteredTotal,
        deepFilteredOut: ineligibleCount,
      },
    };
  }

  /**
   * 특정 공고에 대한 상세 적격성 확인
   * Check detailed eligibility for a specific job posting
   */
  async checkJobEligibility(
    userId: string,
    jobId: string,
  ): Promise<{
    eligible: boolean;
    visaCode: string;
    jobId: string;
    jobTitle: string;
    companyName: string;
    documents: string[];
    restrictions: string[];
    notes: string[];
    blockedReasons: string[];
    suggestions: string[];
    score?: number;
    requiredScore?: number;
    scoreBreakdown?: any[];
  }> {
    // 1. 사용자 비자 프로필 로드
    // 1. Load user's visa profile
    const userProfile = await this.getUserVisaProfile(userId);
    if (!userProfile) {
      throw new BadRequestException(
        '비자 인증이 필요합니다 / Visa verification required',
      );
    }

    // 2. 공고 ID 유효성 검사 + 로드
    // 2. Validate job ID format + load job posting
    if (!jobId || !/^\d+$/.test(jobId)) {
      throw new NotFoundException(
        '공고를 찾을 수 없습니다 / Job posting not found',
      );
    }
    const job = await this.prisma.jobPosting.findUnique({
      where: { id: BigInt(jobId) },
      include: {
        albaAttributes: true,
        fulltimeAttributes: true,
      },
    });

    if (!job || job.status === 'DRAFT') {
      throw new NotFoundException(
        '공고를 찾을 수 없습니다 / Job posting not found',
      );
    }

    const corp = await this.prisma.corporateProfile.findUnique({
      where: { companyId: job.corporateId },
    });

    // 3. 평가 실행
    // 3. Run evaluation
    const input = this.buildEvaluationInput(corp, job, userProfile);
    const evalResult = await this.ruleEngine.evaluateSingleVisa(
      input,
      userProfile.visaCode,
    );

    return {
      eligible: evalResult.eligible,
      visaCode: userProfile.visaCode,
      jobId: job.id.toString(),
      jobTitle: job.title,
      companyName: corp?.companyNameOfficial || '회사명 미등록',
      documents: evalResult.documents,
      restrictions: evalResult.restrictions,
      notes: evalResult.notes,
      blockedReasons: evalResult.blockedReasons,
      suggestions: evalResult.suggestions,
      score: evalResult.score,
      requiredScore: evalResult.requiredScore,
      scoreBreakdown: evalResult.scoreBreakdown,
    };
  }

  /**
   * 공고 + 적격성 정보 포맷
   * Format job posting with eligibility info
   */
  private formatJobWithEligibility(
    item: any,
    corp: any,
    eligibility: JobEligibilityResult,
  ) {
    return {
      id: item.id.toString(),
      corporateId: item.corporateId.toString(),
      boardType: item.boardType,
      tierType: item.tierType,
      title: item.title,
      description: item.description,
      status: item.status,
      closingDate: item.closingDate,
      allowedVisas: item.allowedVisas,
      minKoreanLevel: item.minKoreanLevel,
      displayAddress: item.displayAddress,
      workIntensity: item.workIntensity,
      employmentSubType: item.employmentSubType,
      viewCount: item.viewCount,
      createdAt: item.createdAt,
      // 알바/정규직 속성 / Alba/Fulltime attributes
      albaAttributes: item.albaAttributes
        ? {
            hourlyWage: item.albaAttributes.hourlyWage,
            workPeriod: item.albaAttributes.workPeriod,
            workDaysMask: item.albaAttributes.workDaysMask,
            workTimeStart: item.albaAttributes.workTimeStart,
            workTimeEnd: item.albaAttributes.workTimeEnd,
          }
        : null,
      fulltimeAttributes: item.fulltimeAttributes
        ? {
            salaryMin: item.fulltimeAttributes.salaryMin,
            salaryMax: item.fulltimeAttributes.salaryMax,
            experienceLevel: item.fulltimeAttributes.experienceLevel,
            educationLevel: item.fulltimeAttributes.educationLevel,
          }
        : null,
      // 기업 정보 / Company info
      company: corp
        ? {
            companyId: corp.companyId.toString(),
            companyName: corp.companyNameOfficial,
            brandName: corp.brandName,
            logoImageUrl: corp.logoImageUrl,
            ksicCode: corp.ksicCode,
            addressRoad: corp.addressRoad,
          }
        : null,
      // 적격성 정보 (Goal B) / Eligibility info (Goal B)
      eligibility: {
        eligible: eligibility.eligible,
        visaCode: eligibility.visaCode,
        restrictions: eligibility.restrictions,
        notes: eligibility.notes,
        documentsRequired: eligibility.documents,
      },
    };
  }
}
