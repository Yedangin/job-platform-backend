/**
 * 프리미엄 진단 엔진 / Premium diagnosis engine
 * 무료 진단 결과에 대학 순위, 경력 트랙별, 자격증, 특수 직업, 학력-경력 매칭 보정 적용
 * Applies university ranking, career track, certification, role, alignment bonuses to free diagnosis
 */
import { Injectable, Logger } from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';
import {
  CareerAggregation,
  CareerAggregationService,
} from './career-aggregation.service';
import {
  DiagnosisEngineService,
  RecommendedPathway,
  DiagnosisInput,
} from '../diagnosis/diagnosis-engine.service';

/** 프리미엄 입력 (무료 입력 확장) / Premium input (extends free input) */
export interface PremiumInput extends DiagnosisInput {
  // 대학 정보 / University info
  universityName?: string;
  universityCountry?: string; // ISO alpha-3

  // 전공 카테고리 / Major category
  majorCategory?: string;

  // 현재 역할 / Current role
  currentRole?: string; // 교수/연구원/외국어강사/기술전문가/전문직/자영업/직장인/학생/무직/기타

  // 자격증 / Certifications
  topikLevel?: number; // 0-6
  kiipStage?: number; // 0-5
  nationalLicenseCount?: number; // 한국 국가기술자격증 수
  internationalCertCount?: number; // 국제 자격증 수

  // 한국 자격증 보유 (E-5용) / Korean professional license (for E-5)
  hasKoreanProfessionalLicense?: boolean;

  // 범죄경력 (E-2용) / Criminal record (for E-2)
  hasCriminalRecord?: boolean;

  // 모국어 (E-2용) / Native language (for E-2)
  nativeLanguage?: string; // ISO alpha-2 country code of native speaker country
}

/** 트랙별 분석 결과 / Per-track analysis result */
export interface TrackResult {
  trackCategory: string;
  trackMonths: number;
  trackKoreaMonths: number;
  isAligned: boolean; // 학력-경력 일치 / Major-career alignment
  alignmentBonus: number; // Δ_align

  pathways: PremiumPathway[];
}

/** 프리미엄 경로 결과 / Premium pathway result */
export interface PremiumPathway {
  pathwayId: string;
  nameKo: string;
  nameEn: string;
  finalScore: number;
  scoreBreakdown: {
    sFree: number;
    deltaUniv: number;
    deltaExp: number;
    deltaCert: number;
    deltaRole: number;
    deltaAlign: number;
    deltaKr: number;
    raw: number;
    normalized: number;
  };
  estimatedMonths: number;
  estimatedCostWon: number;
  visaChain: string;
  estimatedIncome: number | null; // 비자별 평균 연수입 / Average annual income by visa
  milestones: any[];
  nextSteps: any[];
  note: string;
}

/** 프리미엄 진단 전체 결과 / Full premium diagnosis result */
export interface PremiumDiagnosisResult {
  profileSummary: {
    universityName?: string;
    universityRankTier?: string;
    majorCategory?: string;
    currentRole?: string;
    trackCount: number;
    topikLevel: number;
  };
  trackResults: TrackResult[];
  overallRecommendation: string;
  meta: {
    totalPathwaysEvaluated: number;
    timestamp: string;
  };
}

// 채용형 경로 — Δ_kr 적용 대상 / Career paths where Δ_kr applies
const CAREER_PATH_IDS = new Set([
  'PW-009', // E-7-1
  'PW-010', // E-7-2
  'PW-011', // E-7-3
  'PW-012', // E-7-4
  'PW-015', // F-2-7
]);

// 원어민 7개국 / Native speaker countries for E-2
const E2_NATIVE_COUNTRIES = new Set(['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA']);

// 경로별 경력 가중치 / Career weight per pathway
const EXP_WEIGHTS: Record<string, number> = {
  'PW-009': 2.5, // E-7-1
  'PW-010': 2.0, // E-7-2
  'PW-011': 1.8, // E-7-3
  'PW-012': 1.5, // E-7-4
  'PW-001': 0.0, // D-2 유학
  'PW-002': 0.0, // D-4 어학
  'PW-003': 0.5, // E-9
  'PW-004': 0.0, // GKS 장학금
  'PW-005': 0.5, // H-2 방문취업
  'PW-006': 0.0, // H-1 워킹홀리데이
  'PW-007': 0.0, // D-2→D-10→E-7
  'PW-008': 0.0, // D-10 구직
  'PW-013': 1.0, // E-1 교수
  'PW-014': 2.0, // E-3 연구
  'PW-015': 1.5, // F-2-7
};

@Injectable()
export class PremiumEngineService {
  private readonly logger = new Logger(PremiumEngineService.name);

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly careerService: CareerAggregationService,
    private readonly diagnosisEngine: DiagnosisEngineService,
  ) {}

  /**
   * 프리미엄 진단 실행 / Execute premium diagnosis
   */
  async diagnosePremium(
    input: PremiumInput,
    careerAggregation: CareerAggregation,
    userId?: string,
  ): Promise<PremiumDiagnosisResult> {
    // 1. 무료 진단 결과 획득 / Get free diagnosis results
    const freeResult = await this.diagnosisEngine.diagnose(input, userId);

    // 2. 대학 순위 보정 조회 / Lookup university ranking bonus
    const univBonus = await this.getUniversityBonus(
      input.universityName,
      input.universityCountry,
    );

    // 3. 자격증/어학 보정 산출 / Calculate certification bonus
    const certBonus = this.calculateCertBonus(input);

    // 4. 비자 수입 참조 조회 / Lookup visa income references
    const incomeMap = await this.getIncomeMap();

    // 5. 인접 전공-직종 매핑 조회 / Lookup adjacent mappings
    const adjacentMap = await this.getAdjacentMap();

    // 6. 트랙별 분석 / Analyze per track
    const trackCategories = Object.keys(careerAggregation.tracks);
    if (trackCategories.length === 0) {
      // 경력 없음 → 단일 트랙 (학력 기반) / No career → single track (education-based)
      trackCategories.push('NONE');
    }

    const trackResults: TrackResult[] = [];

    for (const trackCat of trackCategories) {
      const trackData = careerAggregation.tracks[trackCat] || {
        months: 0,
        koreaMonths: 0,
        companies: 0,
      };

      // 학력-경력 매칭 판정 / Alignment check
      const { isAligned, alignmentBonus } = this.calculateAlignment(
        input.majorCategory,
        trackCat,
        adjacentMap,
      );

      // 각 무료 경로에 대해 프리미엄 보정 적용 / Apply premium adjustments to each pathway
      const premiumPathways: PremiumPathway[] = [];

      for (const freePw of freeResult.pathways) {
        // 경력 보정 / Career bonus
        const expYears = trackData.months / 12;
        const expWeight = EXP_WEIGHTS[freePw.pathwayId] ?? 1.0;
        const deltaExp = Math.min(12, expYears * expWeight);

        // 특수 직업 보정 / Role bonus
        const deltaRole = this.calculateRoleBonus(
          input.currentRole,
          freePw.pathwayId,
          input,
        );

        // 한국 근무 이력 보정 / Korea experience bonus
        const hasKoreaExp = careerAggregation.totalKoreaMonths > 0;
        const isCareerPath = CAREER_PATH_IDS.has(freePw.pathwayId);
        const deltaKr = hasKoreaExp && isCareerPath ? 2.0 : 0;

        // 최종 점수 / Final score
        const raw =
          freePw.finalScore +
          univBonus.bonus +
          deltaExp +
          certBonus +
          deltaRole +
          alignmentBonus +
          deltaKr;
        const normalized = Math.min(100, Math.round(raw));

        // 비자 코드 추출 (경로명에서) / Extract visa code from pathway
        const visaCode = this.extractVisaCode(freePw.nameKo);
        const estimatedIncome = incomeMap.get(visaCode) ?? null;

        // deltaRole -100 → 경로 차단 / Role -100 = pathway blocked
        if (deltaRole <= -100) continue;

        premiumPathways.push({
          pathwayId: freePw.pathwayId,
          nameKo: freePw.nameKo,
          nameEn: freePw.nameEn,
          finalScore: Math.max(0, normalized),
          scoreBreakdown: {
            sFree: freePw.finalScore,
            deltaUniv: univBonus.bonus,
            deltaExp: Math.round(deltaExp * 100) / 100,
            deltaCert: certBonus,
            deltaRole,
            deltaAlign: alignmentBonus,
            deltaKr,
            raw: Math.round(raw * 100) / 100,
            normalized: Math.max(0, normalized),
          },
          estimatedMonths: freePw.estimatedMonths,
          estimatedCostWon: freePw.estimatedCostWon,
          visaChain: freePw.visaChain,
          estimatedIncome,
          milestones: freePw.milestones,
          nextSteps: freePw.nextSteps,
          note: freePw.note,
        });
      }

      // 점수 내림차순 정렬 / Sort descending by score
      premiumPathways.sort((a, b) => b.finalScore - a.finalScore);

      trackResults.push({
        trackCategory: trackCat,
        trackMonths: trackData.months,
        trackKoreaMonths: trackData.koreaMonths,
        isAligned,
        alignmentBonus,
        pathways: premiumPathways.slice(0, 5),
      });
    }

    // 7. 종합 추천 생성 / Generate overall recommendation
    const overallRecommendation = this.generateRecommendation(
      trackResults,
      input,
    );

    return {
      profileSummary: {
        universityName: input.universityName,
        universityRankTier: univBonus.tier,
        majorCategory: input.majorCategory,
        currentRole: input.currentRole,
        trackCount: trackResults.length,
        topikLevel: input.topikLevel ?? 0,
      },
      trackResults,
      overallRecommendation,
      meta: {
        totalPathwaysEvaluated: freeResult.meta.totalPathwaysEvaluated,
        timestamp: new Date().toISOString(),
      },
    };
  }

  // ──── 보정 산출 / Bonus calculations ────

  /** 대학 순위 보정 / University ranking bonus */
  private async getUniversityBonus(
    name?: string,
    country?: string,
  ): Promise<{ bonus: number; tier: string }> {
    if (!name) return { bonus: 0, tier: 'UNRANKED' };

    try {
      const ranking = await this.prisma.universityRanking.findFirst({
        where: {
          OR: [
            { universityName: { contains: name, mode: 'insensitive' } },
            { universityNameEn: { contains: name, mode: 'insensitive' } },
          ],
        },
      });

      if (ranking) {
        return { bonus: ranking.bonusScore, tier: ranking.rankTier };
      }
    } catch (err) {
      this.logger.warn(
        `대학 순위 조회 실패 / University ranking lookup failed: ${err}`,
      );
    }

    return { bonus: 0, tier: 'UNRANKED' };
  }

  /** 자격증/어학 보정 / Certification bonus */
  private calculateCertBonus(input: PremiumInput): number {
    // TOPIK 보정 / TOPIK bonus
    const topikBonusMap: Record<number, number> = {
      0: 0,
      1: 0.5,
      2: 1.0,
      3: 2.0,
      4: 3.5,
      5: 5.0,
      6: 6.0,
    };
    const topikBonus = topikBonusMap[input.topikLevel ?? 0] ?? 0;

    // KIIP 보정 / KIIP bonus
    const kiipBonusMap: Record<number, number> = {
      0: 0,
      1: 1.0,
      2: 1.0,
      3: 2.5,
      4: 4.0,
      5: 6.0,
    };
    const kiipBonus = kiipBonusMap[input.kiipStage ?? 0] ?? 0;

    // TOPIK과 KIIP 중 높은 쪽 적용 / Higher of TOPIK or KIIP
    const langBonus = Math.max(topikBonus, kiipBonus);

    // 자격증 보정 / Certification bonus
    const nationalBonus = Math.min(2, input.nationalLicenseCount ?? 0) * 2.0;
    const intlBonus = Math.min(2, input.internationalCertCount ?? 0) * 1.0;

    return Math.min(8, langBonus + nationalBonus + intlBonus);
  }

  /** 학력-경력 매칭 보정 / Education-career alignment */
  private calculateAlignment(
    majorCategory?: string,
    trackCategory?: string,
    adjacentMap?: Map<string, number>,
  ): { isAligned: boolean; alignmentBonus: number } {
    if (!majorCategory || !trackCategory || trackCategory === 'NONE') {
      return { isAligned: false, alignmentBonus: 0 };
    }

    // 완전 일치 / Perfect match
    if (majorCategory === trackCategory) {
      return { isAligned: true, alignmentBonus: 5.0 };
    }

    // 인접 분야 일치 / Adjacent match
    const adjacentKey = `${majorCategory}_${trackCategory}`;
    const adjacentBonus = adjacentMap?.get(adjacentKey);
    if (adjacentBonus) {
      return { isAligned: false, alignmentBonus: adjacentBonus };
    }

    return { isAligned: false, alignmentBonus: 0 };
  }

  /** 특수 직업 보정 / Role-based bonus (E-1~E-5) */
  private calculateRoleBonus(
    currentRole?: string,
    pathwayId?: string,
    input?: PremiumInput,
  ): number {
    if (!currentRole || !pathwayId) return 0;

    const eduLevel = input?.educationLevel ?? 'none';
    const isMaster = ['master', 'doctor'].includes(eduLevel);
    const isBachelor = ['bachelor', 'master', 'doctor'].includes(eduLevel);

    switch (currentRole) {
      case '교수':
        if (pathwayId === 'PW-013' && isMaster) return 15.0; // E-1
        if (pathwayId === 'PW-014' && isMaster) return 10.0; // E-3
        if (pathwayId === 'PW-009') return 5.0; // E-7-1
        break;

      case '연구원':
        if (pathwayId === 'PW-014' && isBachelor) return 12.0; // E-3
        if (pathwayId === 'PW-010') return 10.0; // E-7-2
        if (pathwayId === 'PW-009') return 5.0; // E-7-1
        break;

      case '외국어강사': {
        const isNativeSpeaker = E2_NATIVE_COUNTRIES.has(
          input?.nativeLanguage ?? '',
        );
        const noCriminal = !input?.hasCriminalRecord;
        // E-2 경로가 있다면 (pathwayId 매칭) / If E-2 pathway exists
        if (pathwayId.includes('E-2') || pathwayId === 'PW-016') {
          if (isBachelor && isNativeSpeaker && noCriminal) return 15.0;
          if (!isNativeSpeaker) return -100; // 차단 / Block
        }
        break;
      }

      case '기술전문가':
        if (pathwayId === 'PW-017' && isBachelor) return 12.0; // E-4
        if (pathwayId === 'PW-009') return 8.0; // E-7-1
        if (pathwayId === 'PW-012') return 5.0; // E-7-4
        break;

      case '전문직':
        // E-5 조건 분기 / E-5 conditional
        if (pathwayId === 'PW-018' || pathwayId.includes('E-5')) {
          if (isBachelor && input?.hasKoreanProfessionalLicense) return 15.0;
          return -100; // 한국 자격증 미보유 → 차단 / No Korean license → block
        }
        break;

      case '직장인':
        if (pathwayId === 'PW-009') return 3.0; // E-7-1
        break;
    }

    return 0;
  }

  /** 비자 수입 참조 맵 생성 / Build visa income reference map */
  private async getIncomeMap(): Promise<Map<string, number>> {
    try {
      const refs = await this.prisma.visaIncomeReference.findMany();
      const map = new Map<string, number>();
      for (const ref of refs) {
        map.set(ref.visaCode, ref.avgAnnualIncome);
      }
      return map;
    } catch {
      return new Map();
    }
  }

  /** 인접 전공-직종 매핑 맵 생성 / Build adjacent mapping */
  private async getAdjacentMap(): Promise<Map<string, number>> {
    try {
      const mappings = await this.prisma.adjacentMajorOccupation.findMany();
      const map = new Map<string, number>();
      for (const m of mappings) {
        map.set(`${m.categoryA}_${m.categoryB}`, m.alignBonus);
      }
      return map;
    } catch {
      return new Map();
    }
  }

  /** 비자 코드 추출 (경로명에서) / Extract visa code from pathway name */
  private extractVisaCode(nameKo: string): string {
    // "E-7-1 해외직접채용" → "E-7-1"
    const match = nameKo.match(/([A-Z]-[\d](?:-\d)?)/);
    return match ? match[1] : '';
  }

  /** 종합 추천 생성 / Generate overall recommendation */
  private generateRecommendation(
    tracks: TrackResult[],
    input: PremiumInput,
  ): string {
    if (tracks.length === 0) {
      return '경력 정보가 없어 학력 기반으로 분석되었습니다.';
    }

    // 가장 높은 점수의 트랙 찾기 / Find highest scoring track
    let bestTrack = tracks[0];
    for (const t of tracks) {
      if (
        t.pathways.length > 0 &&
        t.pathways[0].finalScore > (bestTrack.pathways[0]?.finalScore ?? 0)
      ) {
        bestTrack = t;
      }
    }

    if (!bestTrack.pathways[0]) {
      return '현재 조건에서 적합한 비자 경로를 찾지 못했습니다.';
    }

    const bestPath = bestTrack.pathways[0];
    const trackLabel =
      bestTrack.trackCategory === 'NONE' ? '학력' : bestTrack.trackCategory;
    const alignLabel = bestTrack.isAligned ? '(전공 일치)' : '';

    return `${trackLabel} 경력${alignLabel}을 활용한 ${bestPath.nameKo} 경로의 적합도가 ${bestPath.finalScore}점으로 가장 높습니다.`;
  }
}
