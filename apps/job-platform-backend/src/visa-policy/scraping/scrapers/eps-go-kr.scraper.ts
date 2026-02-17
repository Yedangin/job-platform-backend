import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { BaseScraper, ScrapedItem } from './base.scraper';

/**
 * 외국인고용관리시스템 EPS (eps.go.kr) 스크래퍼
 * E-9 비전문취업 허용업종 및 정책 변경 모니터링
 */
@Injectable()
export class EpsGoKrScraper extends BaseScraper {
  readonly siteKey = 'eps_go_kr';
  readonly siteUrl = 'https://www.eps.go.kr';
  readonly siteName = '외국인고용관리시스템(EPS)';

  private readonly keywords = [
    '허용업종',
    '고용허가',
    'E-9',
    '비전문취업',
    '쿼터',
    '도입계획',
    '업종',
    '외국인근로자',
    '고용변동',
  ];

  async scrape(): Promise<ScrapedItem[]> {
    const items: ScrapedItem[] = [];

    try {
      // EPS 공지사항 페이지
      const urls = [
        'https://www.eps.go.kr/eo/EmployNotice.eo',
        'https://www.eps.go.kr/eo/NoticeMain.eo',
      ];

      for (const listUrl of urls) {
        try {
          await this.delay(2000);
          const html = await this.fetchPage(listUrl);
          const $ = cheerio.load(html);

          // 게시판 항목 추출
          $('table tbody tr, .board_list tr, .list_wrap li').each((_i, el) => {
            try {
              const titleEl = $(el).find('a').first();
              const title = titleEl.text().trim();
              const href = titleEl.attr('href') || '';
              const dateText = $(el).find('td:last-child, .date').text().trim();

              if (!title || title.length < 3) return;

              const isRelevant = this.keywords.some((kw) => title.includes(kw));

              if (isRelevant) {
                const fullUrl = href.startsWith('http')
                  ? href
                  : `${this.siteUrl}${href}`;

                items.push({
                  title,
                  url: fullUrl,
                  content: `[EPS 공지] ${title}`,
                  publishedDate: this.extractDate(dateText),
                  category: 'EPS_NOTICE',
                });
              }
            } catch {}
          });
        } catch (error) {
          console.error(
            `[EpsGoKr] ${listUrl} 스크래핑 실패:`,
            (error as Error).message,
          );
        }
      }
    } catch (error) {
      console.error('[EpsGoKr] 스크래핑 실패:', (error as Error).message);
    }

    return items.slice(0, 20);
  }

  private extractDate(text: string): string | undefined {
    const match = text.match(/(\d{4})[.-/](\d{1,2})[.-/](\d{1,2})/);
    if (match) {
      return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
    }
    return undefined;
  }
}
