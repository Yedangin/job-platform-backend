import { Injectable, Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { BaseScraper, ScrapedItem } from './base.scraper';

/**
 * 고용노동부 (moel.go.kr) 스크래퍼
 * 보도자료 및 정책 공지 모니터링
 */
@Injectable()
export class MoelGoKrScraper extends BaseScraper {
  readonly siteKey = 'moel_go_kr';
  readonly siteUrl = 'https://www.moel.go.kr';
  readonly siteName = '고용노동부';

  private readonly keywords = [
    '외국인',
    '고용허가',
    '비전문취업',
    'E-9',
    'E-7',
    '외국인근로자',
    '고용허가제',
    '쿼터',
    '도입규모',
    '숙련기능',
    '특정활동',
  ];

  async scrape(): Promise<ScrapedItem[]> {
    const items: ScrapedItem[] = [];

    try {
      // 보도자료 목록 페이지
      const listUrl = 'https://www.moel.go.kr/news/enews/report/enewsList.do';
      await this.delay(2000);
      const html = await this.fetchPage(listUrl);
      const $ = cheerio.load(html);

      // 게시판 항목 추출
      $(
        'table.board_list tbody tr, .news_list li, .bbs_list li, ul.board_list li',
      ).each((_i, el) => {
        try {
          const titleEl = $(el).find('a').first();
          const title = titleEl.text().trim();
          const href = titleEl.attr('href') || '';
          const dateText = $(el).find('.date, td.date, .info').text().trim();

          if (!title || title.length < 5) return;

          const isRelevant = this.keywords.some((kw) => title.includes(kw));

          if (isRelevant) {
            const fullUrl = href.startsWith('http')
              ? href
              : `${this.siteUrl}${href}`;

            items.push({
              title,
              url: fullUrl,
              content: `[고용노동부 보도자료] ${title}`,
              publishedDate: this.extractDate(dateText),
              category: 'MOEL_NEWS',
            });
          }
        } catch {}
      });
    } catch (error) {
      Logger.error('[MoelGoKr] 스크래핑 실패:', (error as Error).message);
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
