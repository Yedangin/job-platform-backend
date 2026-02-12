import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AuthPrismaService } from 'libs/common/src';
import { BaseScraper, ScrapedItem } from './scrapers/base.scraper';
import { LawGoKrScraper } from './scrapers/law-go-kr.scraper';
import { ImmigrationGoKrScraper } from './scrapers/immigration-go-kr.scraper';
import { EpsGoKrScraper } from './scrapers/eps-go-kr.scraper';
import { MoelGoKrScraper } from './scrapers/moel-go-kr.scraper';
import { HikoreaGoKrScraper } from './scrapers/hikorea-go-kr.scraper';

@Injectable()
export class ScrapingService implements OnModuleInit {
  private scrapers: BaseScraper[];

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly lawScraper: LawGoKrScraper,
    private readonly immigrationScraper: ImmigrationGoKrScraper,
    private readonly epsScraper: EpsGoKrScraper,
    private readonly moelScraper: MoelGoKrScraper,
    private readonly hikoreaScraper: HikoreaGoKrScraper,
  ) {
    this.scrapers = [
      this.lawScraper,
      this.immigrationScraper,
      this.epsScraper,
      this.moelScraper,
      this.hikoreaScraper,
    ];
  }

  /**
   * 서버 시작 시 스크래핑 상태 초기화
   */
  async onModuleInit() {
    for (const scraper of this.scrapers) {
      const existing = await this.prisma.scrapingState.findUnique({
        where: { siteKey: scraper.siteKey },
      });
      if (!existing) {
        await this.prisma.scrapingState.create({
          data: {
            siteKey: scraper.siteKey,
            siteUrl: scraper.siteUrl,
            lastStatus: 'IDLE',
          },
        });
      }
    }
    console.log(
      `[ScrapingService] ✅ ${this.scrapers.length}개 스크래퍼 초기화 완료`,
    );
  }

  /**
   * 스케줄: 매일 06:00, 18:00 KST
   */
  @Cron('0 6,18 * * *', { timeZone: 'Asia/Seoul' })
  async runScheduledScraping(): Promise<void> {
    console.log('[ScrapingService] ⏰ 스케줄 스크래핑 시작...');
    await this.runAllScrapers();
  }

  /**
   * 수동 트리거 (특정 사이트 또는 전체)
   */
  async triggerScraping(siteKey?: string) {
    if (siteKey) {
      const scraper = this.scrapers.find((s) => s.siteKey === siteKey);
      if (!scraper) {
        return { error: `사이트 '${siteKey}'를 찾을 수 없습니다.` };
      }
      const count = await this.scrapeSite(scraper);
      return { started: [siteKey], newChanges: count };
    }

    const result = await this.runAllScrapers();
    return { started: this.scrapers.map((s) => s.siteKey), ...result };
  }

  /**
   * 전체 스크래퍼 실행
   */
  private async runAllScrapers() {
    let totalNew = 0;
    const results: { siteKey: string; newChanges: number; error?: string }[] =
      [];

    for (const scraper of this.scrapers) {
      try {
        const count = await this.scrapeSite(scraper);
        totalNew += count;
        results.push({ siteKey: scraper.siteKey, newChanges: count });
      } catch (error) {
        results.push({
          siteKey: scraper.siteKey,
          newChanges: 0,
          error: (error as Error).message,
        });
      }
    }

    console.log(
      `[ScrapingService] ✅ 스크래핑 완료. 총 ${totalNew}건 신규 감지`,
    );
    return { totalNewChanges: totalNew, results };
  }

  /**
   * 개별 사이트 스크래핑
   */
  private async scrapeSite(scraper: BaseScraper): Promise<number> {
    const siteKey = scraper.siteKey;

    // 상태 업데이트: RUNNING
    await this.prisma.scrapingState.update({
      where: { siteKey },
      data: { lastStatus: 'RUNNING', lastError: null },
    });

    try {
      // 스크래핑 실행
      const items: ScrapedItem[] = await scraper.scrape();
      let newCount = 0;

      for (const item of items) {
        // 중복 확인 (contentHash)
        const hash = (scraper as any).hashContent(
          `${item.title}|${item.url}`,
        );
        const existing = await this.prisma.policyChange.findFirst({
          where: { contentHash: hash },
        });

        if (!existing) {
          await this.prisma.policyChange.create({
            data: {
              sourceSite: siteKey,
              sourceUrl: item.url,
              pageTitle: item.title,
              summary: item.content,
              currentContent: item.content,
              changeType: this.classifyChangeType(item.category),
              contentHash: hash,
              effectiveDate: item.publishedDate
                ? new Date(item.publishedDate)
                : null,
            },
          });
          newCount++;
        }
      }

      // 상태 업데이트: SUCCESS
      await this.prisma.scrapingState.update({
        where: { siteKey },
        data: {
          lastStatus: 'SUCCESS',
          lastScrapedAt: new Date(),
          totalChangesFound: { increment: newCount },
        },
      });

      console.log(
        `[ScrapingService] ${scraper.siteName}: ${items.length}건 수집, ${newCount}건 신규`,
      );
      return newCount;
    } catch (error) {
      // 상태 업데이트: FAILED
      await this.prisma.scrapingState.update({
        where: { siteKey },
        data: {
          lastStatus: 'FAILED',
          lastScrapedAt: new Date(),
          lastError: (error as Error).message,
        },
      });

      console.error(
        `[ScrapingService] ${scraper.siteName} 실패:`,
        (error as Error).message,
      );
      return 0;
    }
  }

  /**
   * 스크래핑 상태 조회
   */
  async getScrapingStatus() {
    const states = await this.prisma.scrapingState.findMany({
      orderBy: { siteKey: 'asc' },
    });

    return states.map((s) => ({
      id: s.id.toString(),
      siteKey: s.siteKey,
      siteUrl: s.siteUrl,
      siteName:
        this.scrapers.find((sc) => sc.siteKey === s.siteKey)?.siteName ||
        s.siteKey,
      lastScrapedAt: s.lastScrapedAt?.toISOString() || null,
      lastStatus: s.lastStatus,
      lastError: s.lastError,
      totalChangesFound: s.totalChangesFound,
    }));
  }

  private classifyChangeType(category?: string): any {
    switch (category) {
      case 'LAW':
        return 'AMENDMENT';
      case 'NOTICE':
      case 'EPS_NOTICE':
      case 'MOEL_NEWS':
      case 'HIKOREA_NOTICE':
        return 'NOTICE';
      default:
        return 'UNKNOWN';
    }
  }
}
