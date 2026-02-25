import { Injectable, Logger } from '@nestjs/common';
import { BaseScraper, ScrapedItem } from './base.scraper';

/**
 * 국가법령정보센터 (law.go.kr) 스크래퍼
 * Open API 활용: www.law.go.kr/DRF/lawSearch.do
 * 대상 법령: 출입국관리법, 외국인근로자의 고용 등에 관한 법률
 */
@Injectable()
export class LawGoKrScraper extends BaseScraper {
  readonly siteKey = 'law_go_kr';
  readonly siteUrl = 'https://www.law.go.kr';
  readonly siteName = '국가법령정보센터';

  private readonly targetLaws = [
    '출입국관리법',
    '출입국관리법 시행령',
    '출입국관리법 시행규칙',
    '외국인근로자의 고용 등에 관한 법률',
    '외국인근로자의 고용 등에 관한 법률 시행령',
  ];

  async scrape(): Promise<ScrapedItem[]> {
    const items: ScrapedItem[] = [];

    for (const lawName of this.targetLaws) {
      try {
        await this.delay(2000); // 2초 간격

        const url = `https://www.law.go.kr/DRF/lawSearch.do?OC=test&target=law&type=XML&query=${encodeURIComponent(lawName)}`;
        const xml = await this.fetchPage(url);

        // XML에서 법령 정보 추출 (간단 파싱)
        const lawItems = this.parseXmlResponse(xml, lawName);
        items.push(...lawItems);
      } catch (error) {
        Logger.error(
          `[LawGoKr] '${lawName}' 스크래핑 실패:`,
          (error as Error).message,
        );
      }
    }

    return items;
  }

  private parseXmlResponse(xml: string, queryLaw: string): ScrapedItem[] {
    const items: ScrapedItem[] = [];

    // 간단 XML 파싱 (정규표현식 기반)
    const lawRegex =
      /<법령명_한글>(.*?)<\/법령명_한글>[\s\S]*?<시행일자>(.*?)<\/시행일자>[\s\S]*?<제개정구분>(.*?)<\/제개정구분>[\s\S]*?<법령상세링크>(.*?)<\/법령상세링크>/g;

    let match;
    while ((match = lawRegex.exec(xml)) !== null) {
      const [, lawName, effectiveDate, amendType, detailLink] = match;

      if (lawName && lawName.includes(queryLaw.replace(/ 시행[령규]/, ''))) {
        items.push({
          title: `[${amendType || '변경'}] ${lawName}`,
          url: detailLink
            ? `https://www.law.go.kr${detailLink}`
            : `https://www.law.go.kr/법령/${encodeURIComponent(lawName)}`,
          content: `법령: ${lawName}\n시행일자: ${effectiveDate}\n제개정구분: ${amendType}`,
          publishedDate: effectiveDate
            ? `${effectiveDate.substring(0, 4)}-${effectiveDate.substring(4, 6)}-${effectiveDate.substring(6, 8)}`
            : undefined,
          category: 'LAW',
        });
      }
    }

    // XML 파싱 실패 시 전체 텍스트로 항목 생성
    if (items.length === 0 && xml.includes(queryLaw)) {
      items.push({
        title: `[법령 검색] ${queryLaw}`,
        url: `https://www.law.go.kr/법령/${encodeURIComponent(queryLaw)}`,
        content: xml.substring(0, 2000),
        category: 'LAW',
      });
    }

    return items;
  }
}
