import { Injectable, Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { BaseScraper, ScrapedItem } from './base.scraper';

/**
 * 하이코리아 (hikorea.go.kr) 스크래퍼
 * 체류/비자 관련 공지사항 모니터링
 */
@Injectable()
export class HikoreaGoKrScraper extends BaseScraper {
  readonly siteKey = 'hikorea_go_kr';
  readonly siteUrl = 'https://www.hikorea.go.kr';
  readonly siteName = '하이코리아';

  private readonly keywords = [
    '체류자격',
    '비자',
    '취업활동',
    '고용허가',
    '외국인등록',
    '체류',
    '출입국',
    '사증',
    'E-7',
    'E-9',
    'H-2',
    'F-4',
    'D-2',
  ];

  async scrape(): Promise<ScrapedItem[]> {
    const items: ScrapedItem[] = [];

    try {
      // 하이코리아 공지사항
      const listUrl = 'https://www.hikorea.go.kr/info/InfoNotice.do';
      await this.delay(2000);
      const html = await this.fetchPage(listUrl);
      const $ = cheerio.load(html);

      // 게시판 항목 추출
      $('table tbody tr, .board_list tr, .notice_list li').each((_i, el) => {
        try {
          const titleEl = $(el).find('a').first();
          const title = titleEl.text().trim();
          const href = titleEl.attr('href') || '';
          const dateText = $(el)
            .find('td:nth-child(3), .date, td.date')
            .text()
            .trim();

          if (!title || title.length < 3) return;

          const isRelevant = this.keywords.some((kw) => title.includes(kw));

          if (isRelevant) {
            const fullUrl = href.startsWith('http')
              ? href
              : `${this.siteUrl}${href}`;

            items.push({
              title,
              url: fullUrl,
              content: `[하이코리아 공지] ${title}`,
              publishedDate: this.extractDate(dateText),
              category: 'HIKOREA_NOTICE',
            });
          }
        } catch {}
      });
    } catch (error) {
      Logger.error('[HikoreaGoKr] 스크래핑 실패:', (error as Error).message);
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
