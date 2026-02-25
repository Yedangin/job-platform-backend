import { Injectable, Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { BaseScraper, ScrapedItem } from './base.scraper';

/**
 * 출입국외국인정책본부 (immigration.go.kr) 스크래퍼
 * 공지사항 게시판 스크래핑
 */
@Injectable()
export class ImmigrationGoKrScraper extends BaseScraper {
  readonly siteKey = 'immigration_go_kr';
  readonly siteUrl = 'https://www.immigration.go.kr';
  readonly siteName = '출입국외국인정책본부';

  // 비자 관련 키워드
  private readonly keywords = [
    '체류자격',
    '비자',
    '취업활동',
    '고용허가',
    '외국인',
    '체류',
    'E-7',
    'E-9',
    'H-2',
    'F-2',
    'F-4',
    'D-2',
  ];

  async scrape(): Promise<ScrapedItem[]> {
    const items: ScrapedItem[] = [];

    try {
      // 공지사항 목록 페이지
      const listUrl =
        'https://www.immigration.go.kr/immigration/1569/subview.do';
      const html = await this.fetchPage(listUrl);
      const $ = cheerio.load(html);

      // 게시판 항목 추출
      const rows = $(
        'table.board_list tbody tr, .bbs_list_wrap li, .list_item',
      );

      rows.each((_i, el) => {
        try {
          const titleEl = $(el).find('a, .title a, td.title a').first();
          const title = titleEl.text().trim();
          const href = titleEl.attr('href') || '';
          const dateEl = $(el).find(
            '.date, td.date, .writer_date, td:nth-child(4)',
          );
          const date = dateEl.text().trim();

          if (!title) return;

          // 비자 관련 키워드 필터링
          const isRelevant = this.keywords.some((kw) => title.includes(kw));

          if (isRelevant) {
            const fullUrl = href.startsWith('http')
              ? href
              : `${this.siteUrl}${href}`;

            items.push({
              title,
              url: fullUrl,
              content: `[출입국외국인정책본부 공지] ${title}`,
              publishedDate: this.parseKoreanDate(date),
              category: 'NOTICE',
            });
          }
        } catch {}
      });

      // 목록 파싱이 안될 경우 대비: 전체 텍스트에서 키워드 포함된 링크 추출
      if (items.length === 0) {
        $('a').each((_i, el) => {
          const text = $(el).text().trim();
          const href = $(el).attr('href') || '';
          if (
            text.length > 5 &&
            this.keywords.some((kw) => text.includes(kw))
          ) {
            items.push({
              title: text.substring(0, 200),
              url: href.startsWith('http') ? href : `${this.siteUrl}${href}`,
              content: `[출입국정책본부] ${text}`,
              category: 'NOTICE',
            });
          }
        });
      }
    } catch (error) {
      Logger.error(
        '[ImmigrationGoKr] 스크래핑 실패:',
        (error as Error).message,
      );
    }

    return items.slice(0, 20); // 최대 20건
  }

  private parseKoreanDate(dateStr: string): string | undefined {
    // "2026-02-12" 또는 "2026.02.12" 형식 처리
    const match = dateStr.match(/(\d{4})[.-](\d{2})[.-](\d{2})/);
    if (match) return `${match[1]}-${match[2]}-${match[3]}`;
    return undefined;
  }
}
