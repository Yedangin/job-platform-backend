/**
 * 경력 합산 서비스 / Career aggregation service
 * 직종 카테고리별 경력 그룹핑 및 합산
 * Groups and aggregates career entries by occupation category
 */
import { Injectable, Logger } from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';

/** 직종별 경력 합산 결과 / Per-category career summary */
export interface CareerTrackSummary {
  months: number;
  koreaMonths: number;
  companies: number;
}

/** 전체 경력 합산 결과 / Overall career aggregation result */
export interface CareerAggregation {
  tracks: Record<string, CareerTrackSummary>;
  totalMonths: number;
  totalKoreaMonths: number;
}

/** 경력 슬롯 입력 타입 / Career slot input type */
export interface CareerSlot {
  companyName: string;
  jobTitle?: string;
  occupationCategory: string;
  startDate: string; // YYYY-MM
  endDate?: string | null; // YYYY-MM or null (isCurrent)
  isCurrent?: boolean;
  country: string; // ISO alpha-2 (KR, VN, US)
}

@Injectable()
export class CareerAggregationService {
  private readonly logger = new Logger(CareerAggregationService.name);

  constructor(private readonly prisma: AuthPrismaService) {}

  /**
   * 경력 슬롯 배열에서 직종별 합산 / Aggregate career slots by occupation category
   */
  aggregate(slots: CareerSlot[]): CareerAggregation {
    if (!slots || slots.length === 0) {
      return { tracks: {}, totalMonths: 0, totalKoreaMonths: 0 };
    }

    // 직종별 기간 그룹핑 / Group intervals by category
    const categoryIntervals = new Map<
      string,
      { start: Date; end: Date; country: string; company: string }[]
    >();

    for (const slot of slots) {
      const cat = slot.occupationCategory || 'OTHER';
      const start = this.parseMonth(slot.startDate);
      const end =
        slot.isCurrent || !slot.endDate
          ? new Date()
          : this.parseMonth(slot.endDate);

      if (!start || !end || start > end) continue;

      if (!categoryIntervals.has(cat)) categoryIntervals.set(cat, []);
      categoryIntervals
        .get(cat)!
        .push({ start, end, country: slot.country, company: slot.companyName });
    }

    const tracks: Record<string, CareerTrackSummary> = {};
    let totalMonths = 0;
    let totalKoreaMonths = 0;

    for (const [cat, intervals] of categoryIntervals) {
      // 기간 중복 제거 후 합산 / Merge overlapping intervals then sum
      const merged = this.mergeIntervals(
        intervals.map((i) => ({ start: i.start, end: i.end })),
      );
      const months = merged.reduce(
        (sum, m) => sum + this.monthDiff(m.start, m.end),
        0,
      );

      // 한국 경력만 필터 / Filter Korea-only intervals
      const koreaIntervals = intervals.filter((i) => i.country === 'KR');
      const koreaMonths =
        koreaIntervals.length > 0
          ? this.mergeIntervals(
              koreaIntervals.map((i) => ({ start: i.start, end: i.end })),
            ).reduce((sum, m) => sum + this.monthDiff(m.start, m.end), 0)
          : 0;

      const companies = new Set(intervals.map((i) => i.company)).size;

      tracks[cat] = { months, koreaMonths, companies };
      totalMonths += months;
      totalKoreaMonths += koreaMonths;
    }

    return { tracks, totalMonths, totalKoreaMonths };
  }

  /**
   * 사용자 프로필 경력에서 합산 후 캐시 업데이트
   * Aggregate from DB career records and update cache
   */
  async aggregateAndCache(individualId: bigint): Promise<CareerAggregation> {
    const careers = await this.prisma.profileCareer.findMany({
      where: { individualId },
    });

    const slots: CareerSlot[] = careers.map((c) => ({
      companyName: c.companyName,
      jobTitle: c.dutyRole,
      occupationCategory: c.occupationCategory || 'OTHER',
      startDate: c.startDate.toISOString().slice(0, 7),
      endDate: c.endDate ? c.endDate.toISOString().slice(0, 7) : null,
      isCurrent: c.isCurrent,
      country: c.country,
    }));

    const result = this.aggregate(slots);

    // 캐시 업데이트 / Update cache
    await this.prisma.individualProfile.update({
      where: { individualId },
      data: {
        careerSummaryJson: result.tracks as any,
        totalCareerMonths: result.totalMonths,
        koreaCareerMonths: result.totalKoreaMonths,
      },
    });

    this.logger.log(
      `경력 합산 캐시 업데이트: individualId=${individualId}, tracks=${Object.keys(result.tracks).length} / Career cache updated`,
    );

    return result;
  }

  // ──── 헬퍼 / Helpers ────

  /** YYYY-MM → Date / Parse month string to Date */
  private parseMonth(s: string): Date | null {
    const parts = s.split('-');
    if (parts.length < 2) return null;
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, 1);
  }

  /** 두 날짜 사이 월 수 / Month difference between two dates */
  private monthDiff(start: Date, end: Date): number {
    return Math.max(
      0,
      (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth()) +
        1, // 시작 월 포함 / Include start month
    );
  }

  /** 겹치는 기간 병합 / Merge overlapping intervals */
  private mergeIntervals(
    intervals: { start: Date; end: Date }[],
  ): { start: Date; end: Date }[] {
    if (intervals.length === 0) return [];

    const sorted = [...intervals].sort(
      (a, b) => a.start.getTime() - b.start.getTime(),
    );
    const merged: { start: Date; end: Date }[] = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
      const last = merged[merged.length - 1];
      if (sorted[i].start <= last.end) {
        // 겹침 → 끝 날짜 확장 / Overlap → extend end
        last.end = new Date(
          Math.max(last.end.getTime(), sorted[i].end.getTime()),
        );
      } else {
        merged.push(sorted[i]);
      }
    }

    return merged;
  }
}
