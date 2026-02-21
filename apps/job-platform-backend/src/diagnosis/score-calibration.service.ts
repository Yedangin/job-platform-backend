import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AuthPrismaService } from 'libs/common/src';

/**
 * 점수 자동 캘리브레이션 배치 서비스 / Score auto-calibration batch service
 * Phase 2에서 데이터 축적 후 활성화 예정
 * Will be activated in Phase 2 after data accumulation
 *
 * 동작 원리 / How it works:
 * 1. diagnosis_pathway_clicks에서 경로별 CTR 계산 / Calculate CTR per pathway
 * 2. diagnosis_sessions에서 경로별 전환율 계산 / Calculate conversion rate per pathway
 * 3. 현재 점수와 실제 성과 간 괴리 탐지 / Detect discrepancies between score and performance
 *    - CTR이 평균의 2배 이상 + 점수 50 이하 → 점수 상향 후보
 *    - CTR이 평균의 0.5배 이하 + 점수 70 이상 → 점수 하향 후보
 * 4. 후보를 score_calibration_log에 기록 (자동 적용 안 함, 관리자 수동 승인)
 *    Log candidates to score_calibration_log (no auto-apply, admin manual approval)
 */

/** 캘리브레이션 설정 / Calibration config */
interface CalibrationConfig {
  /** CTR 상향 임계값 배수 / CTR upward threshold multiplier */
  ctrHighThreshold: number;
  /** CTR 하향 임계값 배수 / CTR downward threshold multiplier */
  ctrLowThreshold: number;
  /** 상향 후보 최대 점수 / Max score for upward candidate */
  upwardMaxScore: number;
  /** 하향 후보 최소 점수 / Min score for downward candidate */
  downwardMinScore: number;
  /** 최소 분석 데이터 수 / Minimum data count for analysis */
  minDataCount: number;
}

const DEFAULT_CONFIG: CalibrationConfig = {
  ctrHighThreshold: 2.0,
  ctrLowThreshold: 0.5,
  upwardMaxScore: 50,
  downwardMinScore: 70,
  minDataCount: 50,
};

@Injectable()
export class ScoreCalibrationService {
  private readonly logger = new Logger(ScoreCalibrationService.name);
  private readonly config: CalibrationConfig = DEFAULT_CONFIG;

  constructor(private readonly prisma: AuthPrismaService) {}

  /**
   * 매주 월요일 04:00 KST 실행 / Run every Monday at 04:00 KST
   * 현재는 비활성화 상태 (데이터 축적 필요) / Currently disabled (needs data accumulation)
   */
  @Cron(CronExpression.EVERY_WEEK, { disabled: true })
  async runCalibration() {
    this.logger.log('캘리브레이션 배치 시작 / Starting calibration batch');

    try {
      // 최근 30일 데이터 분석 / Analyze last 30 days
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      // 1. 경로별 CTR 계산 / Calculate CTR per pathway
      const pathwayStats = await this.calculatePathwayStats(thirtyDaysAgo);

      if (pathwayStats.size === 0) {
        this.logger.log('분석할 데이터 부족 / Insufficient data for analysis');
        return;
      }

      // 2. 평균 CTR 계산 / Calculate average CTR
      const avgCtr = this.calculateAverageCtr(pathwayStats);

      // 3. 이상치 탐지 / Detect outliers
      const candidates = this.detectOutliers(pathwayStats, avgCtr);

      // 4. 후보를 캘리브레이션 로그에 기록 / Log candidates
      for (const candidate of candidates) {
        await this.logCalibrationSuggestion(candidate);
      }

      this.logger.log(
        `캘리브레이션 완료: ${candidates.length}개 조정 후보 발견 / Calibration done: ${candidates.length} adjustment candidates`,
      );
    } catch (err) {
      this.logger.error(`캘리브레이션 실패 / Calibration failed: ${err}`);
    }
  }

  /**
   * 경로별 통계 계산 / Calculate per-pathway statistics
   */
  private async calculatePathwayStats(
    since: Date,
  ): Promise<
    Map<
      string,
      { impressions: number; clicks: number; conversions: number; ctr: number }
    >
  > {
    const stats = new Map<
      string,
      { impressions: number; clicks: number; conversions: number; ctr: number }
    >();

    // 세션에서 경로별 추천 횟수 (impression) / Count pathway impressions from sessions
    const sessions = await this.prisma.diagnosisSession.findMany({
      where: { createdAt: { gte: since } },
      select: {
        resultsSnapshot: true,
        convertedToSignup: true,
        convertedToPaid: true,
      },
    });

    for (const s of sessions) {
      const snapshot = s.resultsSnapshot as any;
      const pathways = snapshot?.pathways ?? [];
      for (const pw of pathways) {
        const existing = stats.get(pw.pathwayId) ?? {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          ctr: 0,
        };
        existing.impressions++;
        if (s.convertedToSignup || s.convertedToPaid) existing.conversions++;
        stats.set(pw.pathwayId, existing);
      }
    }

    // 클릭 수 집계 / Count clicks
    const clicks = await this.prisma.diagnosisPathwayClick.findMany({
      where: { createdAt: { gte: since } },
      select: { pathwayId: true },
    });

    for (const c of clicks) {
      const existing = stats.get(c.pathwayId);
      if (existing) existing.clicks++;
    }

    // CTR 계산 / Calculate CTR
    for (const [, val] of stats) {
      val.ctr = val.impressions > 0 ? val.clicks / val.impressions : 0;
    }

    return stats;
  }

  /** 평균 CTR 계산 / Calculate average CTR */
  private calculateAverageCtr(
    stats: Map<
      string,
      { impressions: number; clicks: number; conversions: number; ctr: number }
    >,
  ): number {
    let totalCtr = 0;
    let count = 0;
    for (const [, val] of stats) {
      if (val.impressions >= this.config.minDataCount) {
        totalCtr += val.ctr;
        count++;
      }
    }
    return count > 0 ? totalCtr / count : 0;
  }

  /** 이상치 탐지 / Detect outliers */
  private detectOutliers(
    stats: Map<
      string,
      { impressions: number; clicks: number; conversions: number; ctr: number }
    >,
    avgCtr: number,
  ): Array<{
    pathwayId: string;
    direction: string;
    currentCtr: number;
    avgCtr: number;
    reason: string;
  }> {
    const candidates: Array<{
      pathwayId: string;
      direction: string;
      currentCtr: number;
      avgCtr: number;
      reason: string;
    }> = [];

    for (const [pathwayId, val] of stats) {
      if (val.impressions < this.config.minDataCount) continue;

      // 상향 후보: CTR이 평균의 2배 이상 + 현재 점수가 50 이하
      // Upward candidate: CTR >= 2x average + current score <= 50
      if (val.ctr >= avgCtr * this.config.ctrHighThreshold) {
        candidates.push({
          pathwayId,
          direction: 'UP',
          currentCtr: Math.round(val.ctr * 1000) / 1000,
          avgCtr: Math.round(avgCtr * 1000) / 1000,
          reason: `CTR(${(val.ctr * 100).toFixed(1)}%)이 평균(${(avgCtr * 100).toFixed(1)}%)의 ${(val.ctr / avgCtr).toFixed(1)}배 — 점수 상향 검토 필요`,
        });
      }

      // 하향 후보: CTR이 평균의 0.5배 이하 + 현재 점수가 70 이상
      // Downward candidate: CTR <= 0.5x average + current score >= 70
      if (avgCtr > 0 && val.ctr <= avgCtr * this.config.ctrLowThreshold) {
        candidates.push({
          pathwayId,
          direction: 'DOWN',
          currentCtr: Math.round(val.ctr * 1000) / 1000,
          avgCtr: Math.round(avgCtr * 1000) / 1000,
          reason: `CTR(${(val.ctr * 100).toFixed(1)}%)이 평균(${(avgCtr * 100).toFixed(1)}%)의 ${(val.ctr / avgCtr).toFixed(1)}배 — 점수 하향 검토 필요`,
        });
      }
    }

    return candidates;
  }

  /** 캘리브레이션 제안 로그 기록 / Log calibration suggestion */
  private async logCalibrationSuggestion(candidate: {
    pathwayId: string;
    direction: string;
    currentCtr: number;
    avgCtr: number;
    reason: string;
  }) {
    await this.prisma.scoreCalibrationLog.create({
      data: {
        pathwayId: candidate.pathwayId,
        dimension: 'auto_calibration',
        dimensionValue: candidate.direction,
        oldScore: candidate.currentCtr,
        newScore: candidate.avgCtr,
        changeReason: `auto_suggestion: ${candidate.reason}`,
        evidence: {
          direction: candidate.direction,
          currentCtr: candidate.currentCtr,
          avgCtr: candidate.avgCtr,
        },
        changedBy: 'system_calibration',
      },
    });
  }
}
