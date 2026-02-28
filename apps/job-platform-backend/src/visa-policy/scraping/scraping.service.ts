import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AuthPrismaService, RedisLockService } from 'libs/common/src';
import { BaseScraper, ScrapedItem } from './scrapers/base.scraper';
import { LawGoKrScraper } from './scrapers/law-go-kr.scraper';
import { ImmigrationGoKrScraper } from './scrapers/immigration-go-kr.scraper';
import { EpsGoKrScraper } from './scrapers/eps-go-kr.scraper';
import { MoelGoKrScraper } from './scrapers/moel-go-kr.scraper';
import { HikoreaGoKrScraper } from './scrapers/hikorea-go-kr.scraper';
import { LawAmendmentService } from '../../law-amendment/law-amendment.service';

/**
 * 비자 코드 키워드 매핑 — 스크래핑 결과에서 영향 비자 자동 추출
 * Visa code keyword mapping — auto-detect affected visas from scraped content
 */
const VISA_KEYWORDS: Record<string, string[]> = {
  'E-7': ['E-7', 'E7', '특정활동', '전문인력'],
  'E-9': ['E-9', 'E9', '비전문취업', '고용허가', 'EPS'],
  'E-2': ['E-2', 'E2', '회화지도', '원어민'],
  'E-6': ['E-6', 'E6', '예술흥행'],
  'H-1': ['H-1', 'H1', '관광취업', '워킹홀리데이'],
  'H-2': ['H-2', 'H2', '방문취업'],
  'D-2': ['D-2', 'D2', '유학', '유학생'],
  'D-4': ['D-4', 'D4', '일반연수'],
  'D-10': ['D-10', 'D10', '구직'],
  'F-2': ['F-2', 'F2', '거주', '점수제'],
  'F-4': ['F-4', 'F4', '재외동포'],
  'F-5': ['F-5', 'F5', '영주'],
  'F-6': ['F-6', 'F6', '결혼이민'],
};

@Injectable()
export class ScrapingService implements OnModuleInit {
  private readonly logger = new Logger(ScrapingService.name);
  private scrapers: BaseScraper[];

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly lawScraper: LawGoKrScraper,
    private readonly immigrationScraper: ImmigrationGoKrScraper,
    private readonly epsScraper: EpsGoKrScraper,
    private readonly moelScraper: MoelGoKrScraper,
    private readonly hikoreaScraper: HikoreaGoKrScraper,
    private readonly lawAmendmentService: LawAmendmentService,
    private readonly lock: RedisLockService,
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
   * Initialize scraping state on server start
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
    this.logger.log(`${this.scrapers.length} scrapers initialized`);
  }

  /**
   * 스케줄: 매일 03:00, 06:00, 18:00 KST
   * Schedule: daily at 03:00, 06:00, 18:00 KST
   */
  @Cron('0 3,6,18 * * *', { timeZone: 'Asia/Seoul' })
  async runScheduledScraping(): Promise<void> {
    // 분산 락: 다중 인스턴스 중복 실행 방지 / Distributed lock: prevent duplicate execution
    const executed = await this.lock.withLock(
      'cron:visa-scraping',
      600,
      async () => {
        this.logger.log('Scheduled scraping started...');
        await this.runAllScrapers();
      },
    );

    if (!executed) {
      this.logger.debug(
        '[Cron:VisaScraping] 다른 인스턴스에서 실행 중 — 스킵 / Another instance running — skipped',
      );
    }
  }

  /**
   * 수동 트리거 (특정 사이트 또는 전체)
   * Manual trigger (specific site or all)
   */
  async triggerScraping(siteKey?: string) {
    if (siteKey) {
      const scraper = this.scrapers.find((s) => s.siteKey === siteKey);
      if (!scraper) {
        return { error: `Site '${siteKey}' not found` };
      }
      const count = await this.scrapeSite(scraper);
      return { started: [siteKey], newChanges: count };
    }

    const result = await this.runAllScrapers();
    return { started: this.scrapers.map((s) => s.siteKey), ...result };
  }

  /**
   * 전체 스크래퍼 실행
   * Run all scrapers
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

    this.logger.log(`Scraping complete. ${totalNew} new changes detected`);
    return { totalNewChanges: totalNew, results };
  }

  /**
   * 개별 사이트 스크래핑
   * Scrape individual site
   */
  private async scrapeSite(scraper: BaseScraper): Promise<number> {
    const siteKey = scraper.siteKey;

    // 상태 업데이트: RUNNING / Update state: RUNNING
    await this.prisma.scrapingState.update({
      where: { siteKey },
      data: { lastStatus: 'RUNNING', lastError: null },
    });

    try {
      // 스크래핑 실행 / Execute scraping
      const items: ScrapedItem[] = await scraper.scrape();
      let newCount = 0;

      for (const item of items) {
        // 중복 확인 (contentHash) / Duplicate check
        const hash = (scraper as any).hashContent(`${item.title}|${item.url}`);
        const existing = await this.prisma.policyChange.findFirst({
          where: { contentHash: hash },
        });

        if (!existing) {
          const changeType = this.classifyChangeType(item.category);

          // PolicyChange 생성 (PostgreSQL) / Create PolicyChange
          await this.prisma.policyChange.create({
            data: {
              sourceSite: siteKey,
              sourceUrl: item.url,
              pageTitle: item.title,
              summary: item.content,
              currentContent: item.content,
              changeType,
              contentHash: hash,
              effectiveDate: item.publishedDate
                ? new Date(item.publishedDate)
                : null,
            },
          });

          // LawAmendment 자동 생성 (MongoDB) — 법령 변경 건만
          // Auto-create LawAmendment for AMENDMENT type changes
          if (changeType === 'AMENDMENT') {
            await this.createLawAmendmentFromScraped(item, siteKey);
          }

          newCount++;
        }
      }

      // 상태 업데이트: SUCCESS / Update state: SUCCESS
      await this.prisma.scrapingState.update({
        where: { siteKey },
        data: {
          lastStatus: 'SUCCESS',
          lastScrapedAt: new Date(),
          totalChangesFound: { increment: newCount },
        },
      });

      this.logger.log(
        `${scraper.siteName}: ${items.length} collected, ${newCount} new`,
      );
      return newCount;
    } catch (error) {
      // 상태 업데이트: FAILED / Update state: FAILED
      await this.prisma.scrapingState.update({
        where: { siteKey },
        data: {
          lastStatus: 'FAILED',
          lastScrapedAt: new Date(),
          lastError: (error as Error).message,
        },
      });

      this.logger.error(
        `${scraper.siteName} failed: ${(error as Error).message}`,
      );
      return 0;
    }
  }

  /**
   * 스크래핑 결과로 LawAmendment 자동 생성
   * Auto-create LawAmendment from scraped item
   */
  private async createLawAmendmentFromScraped(
    item: ScrapedItem,
    siteKey: string,
  ): Promise<void> {
    try {
      const text = `${item.title} ${item.content}`;
      const affectedVisaCodes = this.extractVisaCodes(text);

      // 시행일 추정: publishedDate 또는 3개월 후 / Estimate effectiveDate
      const effectiveDate = item.publishedDate
        ? new Date(item.publishedDate)
        : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

      await this.lawAmendmentService.create('SYSTEM_SCRAPER', {
        title: item.title,
        source: siteKey,
        sourceUrl: item.url,
        effectiveDate: effectiveDate.toISOString(),
        affectedVisaCodes:
          affectedVisaCodes.length > 0 ? affectedVisaCodes : ['UNKNOWN'],
        changeSummary: {
          autoDetected: true,
          source: siteKey,
          category: item.category || 'LAW',
          contentPreview: item.content?.substring(0, 200) || '',
        },
        changeDetails: {
          fullContent: item.content || '',
          publishedDate: item.publishedDate || null,
          detectionMethod: 'SCRAPING',
        },
      });

      this.logger.log(
        `LawAmendment auto-created: ${item.title} (visas: ${affectedVisaCodes.join(',')})`,
      );
    } catch (e) {
      this.logger.warn(
        `Failed to create LawAmendment for "${item.title}": ${(e as Error).message}`,
      );
    }
  }

  /**
   * 텍스트에서 영향 비자 코드 추출 (키워드 기반)
   * Extract affected visa codes from text by keyword matching
   */
  private extractVisaCodes(text: string): string[] {
    const codes: string[] = [];
    for (const [code, keywords] of Object.entries(VISA_KEYWORDS)) {
      if (keywords.some((kw) => text.includes(kw))) {
        codes.push(code);
      }
    }
    return codes;
  }

  /**
   * 스크래핑 상태 조회
   * Get scraping status
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
