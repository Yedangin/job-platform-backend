import * as crypto from 'crypto';

export interface ScrapedItem {
  title: string;
  url: string;
  content: string;
  publishedDate?: string;
  category?: string;
}

export abstract class BaseScraper {
  abstract readonly siteKey: string;
  abstract readonly siteUrl: string;
  abstract readonly siteName: string;

  abstract scrape(): Promise<ScrapedItem[]>;

  /**
   * HTTP 페이지 가져오기 (rate limit, timeout 포함)
   */
  protected async fetchPage(url: string): Promise<string> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent':
            'JobChaja-PolicyBot/1.0 (https://jobchaja.com; policy-monitoring)',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.text();
    } finally {
      clearTimeout(timeout);
    }
  }

  /**
   * 콘텐츠 해시 생성 (변경 감지용)
   */
  protected hashContent(content: string): string {
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  /**
   * Rate limit: 요청 사이에 대기
   */
  protected async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
