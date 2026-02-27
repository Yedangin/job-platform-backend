import { Injectable, Logger } from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';
// 정적 JSON import (webpack 번들링 호환) / Static JSON import (webpack bundling compatible)
import * as diagnosisMatrixData from '../data/diagnosis-matrix.json';

// ============================================================
// 입력/출력 인터페이스 / Input/Output interfaces
// ============================================================

/** 진단 요청 입력 / Diagnosis request input */
export interface DiagnosisInput {
  // 필수 (무료 진단에서도 수집) / Required (collected even in free diagnosis)
  nationality: string; // ISO 3166-1 alpha-3 (VNM, USA, CHN)
  age: number; // 만 나이 / Age
  educationLevel: string; // none / middle / high_school / associate / bachelor / master / doctor
  availableAnnualFund: number; // 만원 단위 / Unit: 만원 (10,000 KRW)
  finalGoal: string; // employment / degree / permanent_residence / explore
  priorityPreference: string; // speed / stability / cost / income

  // 선택 (정밀 진단) / Optional (precision diagnosis)
  topikLevel?: number; // 0-6
  workExperienceYears?: number;
  major?: string;
  isEthnicKorean?: boolean;
  currentVisa?: string; // 이미 한국에 있는 경우 / If already in Korea
  koreaStayMonths?: number;
}

/** 마일스톤 / Milestone */
export interface Milestone {
  order: number;
  monthFromStart: number;
  type: string;
  nameKo: string;
  visaStatus: string;
  canWorkPartTime: boolean;
  weeklyHours: number;
  estimatedMonthlyIncome: number;
  requirements: string;
  platformAction: string;
}

/** 다음 액션 / Next step */
export interface NextStep {
  actionType: string; // connect_school / find_alba / apply_visa / take_topik
  nameKo: string;
  description: string;
  url?: string;
}

/** 추천 경로 / Recommended pathway */
export interface RecommendedPathway {
  pathwayId: string;
  nameKo: string;
  nameEn: string;
  finalScore: number;
  scoreBreakdown: {
    base: number;
    ageMultiplier: number;
    nationalityMultiplier: number;
    fundMultiplier: number;
    educationMultiplier: number;
    priorityWeight: number;
  };
  feasibilityLabel: string;
  estimatedMonths: number;
  estimatedCostWon: number;
  visaChain: string;
  platformSupport: string;
  milestones: Milestone[];
  nextSteps: NextStep[];
  note: string;
}

/** 진단 결과 / Diagnosis result */
export interface DiagnosisResult {
  pathways: RecommendedPathway[];
  meta: {
    totalPathwaysEvaluated: number;
    hardFilteredOut: number;
    timestamp: string;
  };
}

// ============================================================
// 내부 타입 / Internal types
// ============================================================

interface PathwayDef {
  pathwayId: string;
  nameKo: string;
  nameEn: string;
  pathwayType: string;
  ageMin: number;
  ageMax: number;
  minEducation: string;
  allowedNationalityType: string;
  topikMin: number;
  minFund: number;
  requiresEthnicKorean: boolean;
  visaChain: string;
  estimatedMonths: number;
  estimatedCostWon: number;
  platformSupport: string;
  baseScore: number;
  note: string;
}

interface NationalityInfo {
  tier: string;
  epsCountry: boolean;
  whCountry: boolean;
  dongpo: boolean;
  domesticE7: boolean;
}

// ============================================================
// 서비스 / Service
// ============================================================

@Injectable()
export class DiagnosisEngineService {
  private readonly logger = new Logger(DiagnosisEngineService.name);
  // 정적 import로 변경 (webpack 호환) / Changed to static import (webpack compatible)
  private readonly matrix: any = diagnosisMatrixData;

  constructor(private readonly prisma: AuthPrismaService) {}

  // ============================================================
  // 메인 진단 함수 / Main diagnosis function
  // ============================================================

  /**
   * 비자 경로 진단 실행 / Execute visa pathway diagnosis
   * 15개 경로를 하드필터 → 소프트스코어링 → 정렬하여 상위 5개 반환
   * Evaluates 15 pathways: hard filter → soft scoring → sort → return top 5
   */
  async diagnose(
    input: DiagnosisInput,
    userId?: string,
    anonymousId?: string,
  ): Promise<DiagnosisResult> {
    const pathways: PathwayDef[] = this.matrix.pathways;
    const natInfo = this.getNationalityInfo(input.nationality);
    const natTier = natInfo?.tier ?? 'B'; // 미등록 국적 기본 B등급 / Default B tier for unlisted

    let hardFilteredOut = 0;
    const scored: RecommendedPathway[] = [];

    for (const pw of pathways) {
      // (a) 하드필터 체크 / Hard filter check
      const hardResult = this.applyHardFilters(pw, input, natInfo);
      if (!hardResult.pass) {
        hardFilteredOut++;
        continue;
      }

      // (b) 소프트 스코어링 / Soft scoring
      const breakdown = this.calculateScore(pw, input, natTier);

      // 점수 0 이하 = 사실상 불가 / Score 0 or below = effectively impossible
      if (breakdown.finalScore <= 0) {
        hardFilteredOut++;
        continue;
      }

      // (c) feasibilityLabel 부여 / Assign feasibility label
      const label = this.getFeasibilityLabel(breakdown.finalScore);

      // (d) 마일스톤 + 다음 액션 / Milestones + next steps
      const milestones = this.getMilestones(pw.pathwayId);
      const nextSteps = this.generateNextSteps(pw, input);

      scored.push({
        pathwayId: pw.pathwayId,
        nameKo: pw.nameKo,
        nameEn: pw.nameEn,
        finalScore: breakdown.finalScore,
        scoreBreakdown: breakdown.scoreBreakdown,
        feasibilityLabel: label,
        estimatedMonths: pw.estimatedMonths,
        estimatedCostWon: pw.estimatedCostWon,
        visaChain: pw.visaChain,
        platformSupport: pw.platformSupport,
        milestones,
        nextSteps,
        note: pw.note,
      });
    }

    // (c) 점수 내림차순 정렬 / Sort by score descending
    scored.sort((a, b) => b.finalScore - a.finalScore);

    // (d) 상위 5개 경로 반환 / Return top 5 pathways
    const topPathways = scored.slice(0, 5);

    const result: DiagnosisResult = {
      pathways: topPathways,
      meta: {
        totalPathwaysEvaluated: pathways.length,
        hardFilteredOut,
        timestamp: new Date().toISOString(),
      },
    };

    // (e) DB에 진단 세션 저장 / Save diagnosis session to DB
    try {
      // userId FK는 IndividualProfile.authId를 참조하므로,
      // IndividualProfile이 없는 사용자(기업/관리자)는 userId를 null로 저장
      // userId FK references IndividualProfile.authId,
      // so save userId as null for users without IndividualProfile (corporate/admin)
      let validUserId: string | null = null;
      if (userId) {
        const profile = await this.prisma.individualProfile.findUnique({
          where: { authId: userId },
          select: { authId: true },
        });
        if (profile) {
          validUserId = userId;
        }
      }

      await this.prisma.diagnosisSession.create({
        data: {
          userId: validUserId,
          anonymousId: anonymousId ?? null,
          inputSnapshot: input as any,
          resultsSnapshot: result as any,
          topPathwayId: topPathways[0]?.pathwayId ?? null,
          pathwayCount: topPathways.length,
        },
      });
    } catch (err) {
      this.logger.warn(
        `진단 세션 저장 실패 / Failed to save diagnosis session: ${err}`,
      );
    }

    return result;
  }

  // ============================================================
  // 하드필터 / Hard filters
  // ============================================================

  private applyHardFilters(
    pw: PathwayDef,
    input: DiagnosisInput,
    natInfo: NationalityInfo | null,
  ): { pass: boolean; reason?: string } {
    // 1. 나이 범위 / Age range
    if (input.age < pw.ageMin || input.age > pw.ageMax) {
      return {
        pass: false,
        reason: `나이 ${input.age}세 범위 밖 (${pw.ageMin}-${pw.ageMax})`,
      };
    }

    // 2. 최소 학력 / Minimum education
    if (!this.meetsMinEducation(input.educationLevel, pw.minEducation)) {
      return {
        pass: false,
        reason: `학력 미달: ${input.educationLevel} < ${pw.minEducation}`,
      };
    }

    // 3. 국적 허용 타입 / Nationality type allowance
    if (
      !this.isNationalityAllowed(
        pw.allowedNationalityType,
        natInfo,
        input.isEthnicKorean,
      )
    ) {
      return {
        pass: false,
        reason: `국적 타입 불가: ${pw.allowedNationalityType}`,
      };
    }

    // 4. TOPIK 최소 등급 / Minimum TOPIK level
    if (pw.topikMin > 0 && (input.topikLevel ?? 0) < pw.topikMin) {
      return {
        pass: false,
        reason: `TOPIK ${input.topikLevel ?? 0}급 < ${pw.topikMin}급`,
      };
    }

    // 5. 동포 필수 여부 / Ethnic Korean requirement
    if (pw.requiresEthnicKorean && !input.isEthnicKorean) {
      return { pass: false, reason: '재외동포 전용 경로' };
    }

    return { pass: true };
  }

  // ============================================================
  // 소프트 스코어링 / Soft scoring
  // ============================================================

  private calculateScore(
    pw: PathwayDef,
    input: DiagnosisInput,
    natTier: string,
  ): {
    finalScore: number;
    scoreBreakdown: RecommendedPathway['scoreBreakdown'];
  } {
    const base = pw.baseScore;
    const ageBracket = this.getAgeBracket(input.age);
    const ageRaw = this.matrix.ageMatrix?.[pw.pathwayId]?.[ageBracket] ?? 0;
    const ageMultiplier = ageRaw / 100; // 0~1 범위로 변환 / Convert to 0-1 range

    const natMult =
      this.matrix.nationalityMultipliers?.[pw.pathwayId]?.[natTier] ?? 0;
    const fundBracket = this.getFundBracket(input.availableAnnualFund);
    const fundMult =
      this.matrix.fundMultipliers?.[pw.pathwayId]?.[fundBracket] ?? 0;
    const eduMult =
      this.matrix.educationMultipliers?.[pw.pathwayId]?.[
        input.educationLevel
      ] ?? 0;
    const priWeight =
      this.matrix.priorityWeights?.[pw.pathwayId]?.[input.priorityPreference] ??
      0.5;

    const raw = base * ageMultiplier * natMult * fundMult * eduMult * priWeight;
    const finalScore = Math.min(100, Math.round(raw));

    return {
      finalScore,
      scoreBreakdown: {
        base,
        ageMultiplier: Math.round(ageMultiplier * 100) / 100,
        nationalityMultiplier: natMult,
        fundMultiplier: fundMult,
        educationMultiplier: eduMult,
        priorityWeight: priWeight,
      },
    };
  }

  // ============================================================
  // 헬퍼 함수 / Helper functions
  // ============================================================

  /** 국적 정보 조회 / Get nationality info from matrix */
  private getNationalityInfo(nationality: string): NationalityInfo | null {
    return this.matrix.nationalityTiers?.[nationality] ?? null;
  }

  /** 나이 구간 결정 / Determine age bracket */
  private getAgeBracket(age: number): string {
    if (age <= 22) return '18-22';
    if (age <= 25) return '23-25';
    if (age <= 30) return '26-30';
    if (age <= 35) return '31-35';
    if (age <= 40) return '36-40';
    if (age <= 45) return '41-45';
    if (age <= 50) return '46-50';
    if (age <= 55) return '51-55';
    if (age <= 60) return '56-60';
    return '61+';
  }

  /** 자금 구간 결정 / Determine fund bracket */
  private getFundBracket(fund: number): string {
    if (fund < 300) return '0-300';
    if (fund < 500) return '300-500';
    if (fund < 1000) return '500-1000';
    if (fund < 2000) return '1000-2000';
    if (fund < 3000) return '2000-3000';
    return '3000+';
  }

  /** 학력 충족 확인 / Check education meets minimum */
  private meetsMinEducation(actual: string, min: string): boolean {
    const levels = [
      'none',
      'middle',
      'high_school',
      'associate',
      'bachelor',
      'master',
      'doctor',
    ];
    return levels.indexOf(actual) >= levels.indexOf(min);
  }

  /** 국적 허용 확인 / Check nationality type allowance */
  private isNationalityAllowed(
    allowedType: string,
    natInfo: NationalityInfo | null,
    isEthnicKorean?: boolean,
  ): boolean {
    if (allowedType === 'ALL') return true;
    if (!natInfo) return allowedType === 'ALL'; // 미등록 국적 / Unlisted nationality

    switch (allowedType) {
      case 'EPS_16':
        return natInfo.epsCountry === true;
      case 'WH_18':
        return natInfo.whCountry === true;
      case 'H2_ELIGIBLE':
        return natInfo.dongpo === true && isEthnicKorean === true;
      case 'DONGPO_ALL':
        return isEthnicKorean === true;
      case 'DOMESTIC_OK':
        return natInfo.domesticE7 === true;
      default:
        return true;
    }
  }

  /** 현실성 라벨 / Feasibility label */
  private getFeasibilityLabel(score: number): string {
    if (score >= 71) return '높음';
    if (score >= 51) return '보통';
    if (score >= 31) return '낮음';
    if (score >= 1) return '매우낮음';
    return '불가';
  }

  /** 마일스톤 조회 / Get milestones for a pathway */
  private getMilestones(pathwayId: string): Milestone[] {
    return this.matrix.milestones?.[pathwayId] ?? [];
  }

  /** 다음 액션 생성 / Generate next steps based on pathway and input */
  private generateNextSteps(pw: PathwayDef, input: DiagnosisInput): NextStep[] {
    const steps: NextStep[] = [];

    switch (pw.pathwayType) {
      case 'scholarship':
        steps.push({
          actionType: 'apply_scholarship',
          nameKo: 'GKS 장학금 지원',
          description: '국립국제교육원 GKS 장학금 모집 공고 확인',
        });
        break;
      case 'study_to_work':
      case 'study_direct':
        if ((input.topikLevel ?? 0) < 3) {
          steps.push({
            actionType: 'take_topik',
            nameKo: 'TOPIK 응시 준비',
            description: '어학당 입학 또는 대학 지원을 위해 TOPIK 준비 필요',
          });
        }
        steps.push({
          actionType: 'connect_school',
          nameKo: '어학당/대학 연결',
          description: '입학 가능한 어학당 및 대학 검색',
        });
        break;
      case 'government':
        steps.push({
          actionType: 'eps_test',
          nameKo: 'EPS-TOPIK 응시',
          description: '한국산업인력공단 EPS-TOPIK 시험 일정 확인',
        });
        break;
      case 'working_holiday':
        steps.push({
          actionType: 'apply_visa',
          nameKo: 'H-1 비자 신청',
          description: '주한 한국 대사관에서 워킹홀리데이 비자 신청',
        });
        break;
      case 'direct_employment':
        steps.push({
          actionType: 'find_job',
          nameKo: '채용 공고 검색',
          description: 'E-7 비자 지원 가능한 채용 공고 확인',
        });
        break;
      case 'ethnic_korean':
        steps.push({
          actionType: 'apply_visa',
          nameKo: '동포 비자 신청',
          description: '재외동포 자격 확인 후 비자 신청',
        });
        break;
      default:
        steps.push({
          actionType: 'consult',
          nameKo: '전문 상담',
          description: '전문 행정사 상담을 통해 진행 방법 확인',
        });
    }

    return steps;
  }

  // ============================================================
  // 세션 조회 / Session retrieval
  // ============================================================

  /** 이전 진단 결과 조회 / Get previous diagnosis result */
  async getSession(sessionId: bigint, userId?: string, anonymousId?: string) {
    const session = await this.prisma.diagnosisSession.findUnique({
      where: { sessionId },
    });
    if (!session) return null;

    // 권한 확인 / Authorization check
    if (userId && session.userId !== userId) return null;
    if (!userId && anonymousId && session.anonymousId !== anonymousId)
      return null;

    return session;
  }

  /** 회원 진단 이력 조회 / Get member diagnosis history */
  async getHistory(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.diagnosisSession.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          sessionId: true,
          topPathwayId: true,
          pathwayCount: true,
          createdAt: true,
          inputSnapshot: true,
        },
      }),
      this.prisma.diagnosisSession.count({ where: { userId } }),
    ]);
    return { items, total, page, limit };
  }

  /** 클릭 추적 저장 / Save pathway click tracking */
  async trackClick(
    sessionId: bigint,
    pathwayId: string,
    rankPosition: number,
    actionType: string,
  ) {
    return this.prisma.diagnosisPathwayClick.create({
      data: { sessionId, pathwayId, rankPosition, actionType },
    });
  }

  // ============================================================
  // 매트릭스 접근 (Admin용) / Matrix access (for Admin)
  // ============================================================

  /** 현재 매트릭스 반환 / Return current matrix */
  getMatrix() {
    return this.matrix;
  }

  /**
   * 매트릭스 점수 수정 + 캘리브레이션 로그 기록
   * Update matrix score + log calibration entry
   */
  async updateMatrixScore(
    pathwayId: string,
    dimension: string,
    dimensionValue: string,
    newScore: number,
    changedBy: string,
    changeReason: string,
  ): Promise<{ oldScore: number; newScore: number }> {
    // 차원별 매트릭스 접근 / Access matrix by dimension
    const matrixMap: Record<string, string> = {
      age: 'ageMatrix',
      nationality: 'nationalityMultipliers',
      fund: 'fundMultipliers',
      education: 'educationMultipliers',
      priority: 'priorityWeights',
    };

    const matrixKey = matrixMap[dimension];
    if (!matrixKey || !this.matrix[matrixKey]?.[pathwayId]) {
      throw new Error(
        `잘못된 차원 또는 경로 / Invalid dimension(${dimension}) or pathway(${pathwayId})`,
      );
    }

    const oldScore = this.matrix[matrixKey][pathwayId][dimensionValue];
    if (oldScore === undefined) {
      throw new Error(`잘못된 값 / Invalid dimension value: ${dimensionValue}`);
    }

    // 인메모리 매트릭스 업데이트 / Update in-memory matrix
    this.matrix[matrixKey][pathwayId][dimensionValue] = newScore;

    // 캘리브레이션 로그 기록 / Log calibration
    try {
      await this.prisma.scoreCalibrationLog.create({
        data: {
          pathwayId,
          dimension,
          dimensionValue,
          oldScore,
          newScore,
          changeReason,
          changedBy,
        },
      });
    } catch (err) {
      this.logger.warn(
        `캘리브레이션 로그 저장 실패 / Failed to save calibration log: ${err}`,
      );
    }

    this.logger.log(
      `매트릭스 수정 / Matrix updated: ${pathwayId}.${dimension}.${dimensionValue}: ${oldScore} → ${newScore} by ${changedBy}`,
    );

    return { oldScore, newScore };
  }

  /**
   * 진단 분석 통계 / Diagnosis analytics
   * 기간별 통계 집계 / Aggregate statistics by time range
   */
  async getAnalytics(
    from: Date,
    to: Date,
    groupBy: string,
  ): Promise<{
    totalSessions: number;
    periodFrom: string;
    periodTo: string;
    groupBy: string;
    breakdown: Array<{ key: string; count: number; conversionRate: number }>;
  }> {
    const sessions = await this.prisma.diagnosisSession.findMany({
      where: {
        createdAt: { gte: from, lte: to },
      },
      select: {
        sessionId: true,
        topPathwayId: true,
        inputSnapshot: true,
        convertedToSignup: true,
        convertedToPaid: true,
        createdAt: true,
      },
    });

    const totalSessions = sessions.length;

    // 그룹별 집계 / Group by aggregation
    const groups = new Map<string, { count: number; converted: number }>();

    for (const s of sessions) {
      let key: string;
      const input = s.inputSnapshot as any;

      switch (groupBy) {
        case 'pathway':
          key = s.topPathwayId ?? 'none';
          break;
        case 'nationality':
          key = input?.nationality ?? 'unknown';
          break;
        case 'age':
          key = this.getAgeBracket(input?.age ?? 0);
          break;
        default:
          key = s.topPathwayId ?? 'none';
      }

      const existing = groups.get(key) ?? { count: 0, converted: 0 };
      existing.count++;
      if (s.convertedToSignup || s.convertedToPaid) existing.converted++;
      groups.set(key, existing);
    }

    const breakdown = Array.from(groups.entries())
      .map(([key, val]) => ({
        key,
        count: val.count,
        conversionRate:
          val.count > 0
            ? Math.round((val.converted / val.count) * 100) / 100
            : 0,
      }))
      .sort((a, b) => b.count - a.count);

    return {
      totalSessions,
      periodFrom: from.toISOString(),
      periodTo: to.toISOString(),
      groupBy,
      breakdown,
    };
  }
}
