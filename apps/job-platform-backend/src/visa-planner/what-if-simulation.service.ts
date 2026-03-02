/**
 * 조건 변경 시뮬레이션 서비스 / What-If simulation service
 * 자격증 취득, TOPIK 상승, 경력 추가 등 조건 변경 시 점수 변화 분석
 * Analyzes score changes when conditions change (certifications, TOPIK, career, etc.)
 */
import { Injectable, Logger } from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';
import {
  PremiumEngineService,
  PremiumInput,
  PremiumDiagnosisResult,
  TrackResult,
} from './premium-engine.service';
import { CareerAggregation } from './career-aggregation.service';

/** 시뮬레이션 결과 / Simulation result */
export interface WhatIfSimulation {
  scenario: string;
  scenarioKo: string;
  condition: string;
  results: WhatIfPathwayChange[];
  activatesNewPath: boolean;
  incomeDelta: number | null; // 수입 변화 / Income change
}

/** 경로별 점수 변화 / Per-pathway score change */
export interface WhatIfPathwayChange {
  pathwayId: string;
  nameKo: string;
  currentScore: number;
  simulatedScore: number;
  delta: number;
  isNewlyActivated: boolean; // 신규 활성화 / Newly activated
  currentIncome: number | null;
  simulatedIncome: number | null;
}

@Injectable()
export class WhatIfSimulationService {
  private readonly logger = new Logger(WhatIfSimulationService.name);

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly premiumEngine: PremiumEngineService,
  ) {}

  /**
   * 시뮬레이션 실행 / Run what-if simulations
   * 최대 3개의 의미 있는 시뮬레이션만 반환 / Returns max 3 meaningful simulations
   */
  async simulate(
    currentResult: PremiumDiagnosisResult,
    input: PremiumInput,
    careerAggregation: CareerAggregation,
    userId?: string,
  ): Promise<WhatIfSimulation[]> {
    const simulations: WhatIfSimulation[] = [];

    // 1. TOPIK 급수 상승 시뮬레이션 / TOPIK level increase
    const currentTopik = input.topikLevel ?? 0;
    if (currentTopik < 6) {
      const topikSim = await this.simulateTopikIncrease(
        currentResult,
        input,
        careerAggregation,
        userId,
      );
      if (topikSim) simulations.push(topikSim);
    }

    // 2. 한국 자격증 취득 시뮬레이션 / Korean professional license
    if (!input.hasKoreanProfessionalLicense && this.isLicenseRelevant(input)) {
      const licenseSim = await this.simulateKoreanLicense(
        currentResult,
        input,
        careerAggregation,
        userId,
      );
      if (licenseSim) simulations.push(licenseSim);
    }

    // 3. 경력 1년 추가 시뮬레이션 / Add 1 year career
    const careerSim = await this.simulateCareerAddition(
      currentResult,
      input,
      careerAggregation,
      userId,
    );
    if (careerSim) simulations.push(careerSim);

    // 4. 한국 경력 신규 (기존에 없는 경우) / New Korea experience
    if (careerAggregation.totalKoreaMonths === 0) {
      const koreaSim = await this.simulateKoreaExperience(
        currentResult,
        input,
        careerAggregation,
        userId,
      );
      if (koreaSim) simulations.push(koreaSim);
    }

    // 5. 한국 국가기술자격증 추가 / Add national technical certification
    if ((input.nationalLicenseCount ?? 0) < 2) {
      const certSim = await this.simulateNationalCert(
        currentResult,
        input,
        careerAggregation,
        userId,
      );
      if (certSim) simulations.push(certSim);
    }

    // 우선순위 정렬: 새 경로 활성화 > 최고 점수 변화 > 기타
    // Priority: new path activation > highest score delta > other
    simulations.sort((a, b) => {
      if (a.activatesNewPath && !b.activatesNewPath) return -1;
      if (!a.activatesNewPath && b.activatesNewPath) return 1;
      const maxDeltaA = Math.max(...a.results.map((r) => r.delta));
      const maxDeltaB = Math.max(...b.results.map((r) => r.delta));
      return maxDeltaB - maxDeltaA;
    });

    return simulations.slice(0, 3);
  }

  /** TOPIK 급수 상승 시뮬레이션 / Simulate TOPIK level increase */
  private async simulateTopikIncrease(
    current: PremiumDiagnosisResult,
    input: PremiumInput,
    career: CareerAggregation,
    userId?: string,
  ): Promise<WhatIfSimulation | null> {
    const newLevel = Math.min(6, (input.topikLevel ?? 0) + 2);
    const simInput = { ...input, topikLevel: newLevel };
    const simResult = await this.premiumEngine.diagnosePremium(
      simInput,
      career,
      userId,
    );

    const changes = this.compareResults(current, simResult);
    const meaningful = changes.filter((c) => c.delta >= 3);
    if (meaningful.length === 0) return null;

    return {
      scenario: `TOPIK level ${newLevel}`,
      scenarioKo: `TOPIK ${newLevel}급 취득 시`,
      condition: `topikLevel=${newLevel}`,
      results: meaningful,
      activatesNewPath: meaningful.some((c) => c.isNewlyActivated),
      incomeDelta: this.calculateIncomeDelta(meaningful),
    };
  }

  /** 한국 자격증 시뮬레이션 / Simulate Korean professional license */
  private async simulateKoreanLicense(
    current: PremiumDiagnosisResult,
    input: PremiumInput,
    career: CareerAggregation,
    userId?: string,
  ): Promise<WhatIfSimulation | null> {
    const simInput = { ...input, hasKoreanProfessionalLicense: true };
    const simResult = await this.premiumEngine.diagnosePremium(
      simInput,
      career,
      userId,
    );

    const changes = this.compareResults(current, simResult);
    const meaningful = changes.filter(
      (c) => c.delta >= 3 || c.isNewlyActivated,
    );
    if (meaningful.length === 0) return null;

    return {
      scenario: 'Korean professional license',
      scenarioKo: '한국 전문 자격증 취득 시',
      condition: 'hasKoreanProfessionalLicense=true',
      results: meaningful,
      activatesNewPath: meaningful.some((c) => c.isNewlyActivated),
      incomeDelta: this.calculateIncomeDelta(meaningful),
    };
  }

  /** 경력 1년 추가 시뮬레이션 / Simulate adding 1 year career */
  private async simulateCareerAddition(
    current: PremiumDiagnosisResult,
    input: PremiumInput,
    career: CareerAggregation,
    userId?: string,
  ): Promise<WhatIfSimulation | null> {
    // 각 트랙에 12개월 추가 / Add 12 months to each track
    const augmentedCareer: CareerAggregation = {
      ...career,
      tracks: { ...career.tracks },
      totalMonths: career.totalMonths + 12,
    };

    const firstTrack = Object.keys(augmentedCareer.tracks)[0];
    if (firstTrack) {
      augmentedCareer.tracks[firstTrack] = {
        ...augmentedCareer.tracks[firstTrack],
        months: augmentedCareer.tracks[firstTrack].months + 12,
      };
    }

    const simResult = await this.premiumEngine.diagnosePremium(
      input,
      augmentedCareer,
      userId,
    );
    const changes = this.compareResults(current, simResult);
    const meaningful = changes.filter((c) => c.delta >= 3);
    if (meaningful.length === 0) return null;

    return {
      scenario: 'Add 1 year career',
      scenarioKo: '경력 1년 추가 시',
      condition: 'careerMonths+12',
      results: meaningful,
      activatesNewPath: meaningful.some((c) => c.isNewlyActivated),
      incomeDelta: this.calculateIncomeDelta(meaningful),
    };
  }

  /** 한국 경력 신규 시뮬레이션 / Simulate new Korea work experience */
  private async simulateKoreaExperience(
    current: PremiumDiagnosisResult,
    input: PremiumInput,
    career: CareerAggregation,
    userId?: string,
  ): Promise<WhatIfSimulation | null> {
    const augmentedCareer: CareerAggregation = {
      ...career,
      totalKoreaMonths: 12,
    };

    const simResult = await this.premiumEngine.diagnosePremium(
      input,
      augmentedCareer,
      userId,
    );
    const changes = this.compareResults(current, simResult);
    const meaningful = changes.filter((c) => c.delta >= 3);
    if (meaningful.length === 0) return null;

    return {
      scenario: 'Korea work experience',
      scenarioKo: '한국 근무 경력 신규 시',
      condition: 'koreaCareerMonths>0',
      results: meaningful,
      activatesNewPath: meaningful.some((c) => c.isNewlyActivated),
      incomeDelta: this.calculateIncomeDelta(meaningful),
    };
  }

  /** 국가기술자격증 추가 시뮬레이션 / Simulate national certification */
  private async simulateNationalCert(
    current: PremiumDiagnosisResult,
    input: PremiumInput,
    career: CareerAggregation,
    userId?: string,
  ): Promise<WhatIfSimulation | null> {
    const simInput = {
      ...input,
      nationalLicenseCount: (input.nationalLicenseCount ?? 0) + 1,
    };
    const simResult = await this.premiumEngine.diagnosePremium(
      simInput,
      career,
      userId,
    );

    const changes = this.compareResults(current, simResult);
    const meaningful = changes.filter((c) => c.delta >= 3);
    if (meaningful.length === 0) return null;

    return {
      scenario: 'Korean national technical certification',
      scenarioKo: '한국 국가기술자격증 취득 시',
      condition: 'nationalLicenseCount+1',
      results: meaningful,
      activatesNewPath: meaningful.some((c) => c.isNewlyActivated),
      incomeDelta: this.calculateIncomeDelta(meaningful),
    };
  }

  // ──── 헬퍼 / Helpers ────

  /** 경력-자격증 연관성 확인 / Check career-license relevance */
  private isLicenseRelevant(input: PremiumInput): boolean {
    const role = input.currentRole;
    // 전문직만 한국 자격증 시뮬레이션 대상 / Only professionals
    return role === '전문직' || role === '기술전문가';
  }

  /** 현재 vs 시뮬레이션 결과 비교 / Compare current vs simulated results */
  private compareResults(
    current: PremiumDiagnosisResult,
    simulated: PremiumDiagnosisResult,
  ): WhatIfPathwayChange[] {
    const changes: WhatIfPathwayChange[] = [];

    // 현재 결과 맵 (모든 트랙) / Build current scores map across all tracks
    const currentScores = new Map<
      string,
      { score: number; income: number | null; nameKo: string }
    >();
    for (const track of current.trackResults) {
      for (const pw of track.pathways) {
        const existing = currentScores.get(pw.pathwayId);
        if (!existing || pw.finalScore > existing.score) {
          currentScores.set(pw.pathwayId, {
            score: pw.finalScore,
            income: pw.estimatedIncome,
            nameKo: pw.nameKo,
          });
        }
      }
    }

    // 시뮬레이션 결과 비교 / Compare with simulated
    for (const track of simulated.trackResults) {
      for (const pw of track.pathways) {
        const cur = currentScores.get(pw.pathwayId);
        const currentScore = cur?.score ?? 0;
        const delta = pw.finalScore - currentScore;

        changes.push({
          pathwayId: pw.pathwayId,
          nameKo: pw.nameKo,
          currentScore,
          simulatedScore: pw.finalScore,
          delta,
          isNewlyActivated: currentScore === 0 && pw.finalScore > 0,
          currentIncome: cur?.income ?? null,
          simulatedIncome: pw.estimatedIncome,
        });
      }
    }

    // 중복 제거 (pathwayId 기준 최고 delta) / Deduplicate by pathwayId (keep highest delta)
    const deduped = new Map<string, WhatIfPathwayChange>();
    for (const c of changes) {
      const existing = deduped.get(c.pathwayId);
      if (!existing || c.delta > existing.delta) {
        deduped.set(c.pathwayId, c);
      }
    }

    return Array.from(deduped.values()).sort((a, b) => b.delta - a.delta);
  }

  /** 수입 변화 계산 / Calculate income delta */
  private calculateIncomeDelta(changes: WhatIfPathwayChange[]): number | null {
    const bestChange = changes.find(
      (c) => c.isNewlyActivated && c.simulatedIncome,
    );
    if (bestChange && bestChange.simulatedIncome && bestChange.currentIncome) {
      return bestChange.simulatedIncome - bestChange.currentIncome;
    }
    return null;
  }
}
