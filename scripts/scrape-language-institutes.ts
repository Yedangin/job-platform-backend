/**
 * Language institutes scraping script
 * studyinkorea.go.kr에서 어학당 229개 데이터 스크래핑
 *
 * Scrapes 229 language institutes from studyinkorea.go.kr
 */

import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

interface LanguageInstituteData {
  name: string;
  nameEn: string;
  address: string;
  affiliatedUniversity: string;
  website?: string;
  phone?: string;
}

/**
 * studyinkorea.go.kr에서 어학당 목록 스크래핑
 * Scrape language institutes from studyinkorea.go.kr
 */
async function scrapeLanguageInstitutes(): Promise<LanguageInstituteData[]> {
  console.log('🌐 브라우저 실행 중 / Launching browser...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // 페이지 타임아웃 설정 / Set page timeout
  page.setDefaultTimeout(60000);

  console.log('📄 페이지 로드 중 / Loading page...');
  await page.goto('https://www.studyinkorea.go.kr/ko/search_v1.do', {
    waitUntil: 'networkidle2',
  });

  // 어학당 필터 체크 / Check language institute filter
  console.log('🔍 어학당 필터 적용 중 / Applying language institute filter...');

  // 올바른 체크박스 찾기 및 클릭
  const checkbox = await page.$('#language_center_tab1');
  if (checkbox) {
    await checkbox.click();
    console.log('✅ 어학당 필터 체크 완료');

    // 페이지가 갱신될 때까지 대기
    await page.waitForTimeout(3000);
  } else {
    console.error('❌ 어학당 필터를 찾을 수 없습니다.');
    await browser.close();
    return [];
  }

  // 검색 버튼 찾기 및 클릭
  console.log('🔎 검색 실행 중...');
  const searchButton = await page.$('.btn-search, button[type="submit"], input[type="submit"]');
  if (searchButton) {
    await searchButton.click();
    await page.waitForTimeout(3000);
    console.log('✅ 검색 완료');
  } else {
    console.log('⚠️  검색 버튼을 찾을 수 없습니다. 자동 검색이 실행되었을 수 있습니다.');
  }

  // 검색 결과 대기
  await page.waitForSelector('.search-result-item', { timeout: 10000 });

  console.log('📊 데이터 추출 중 / Extracting data...');

  // 모든 결과를 가져오기 위해 페이지네이션 처리
  const institutes: LanguageInstituteData[] = [];
  let hasNextPage = true;
  let pageNum = 1;

  while (hasNextPage) {
    console.log(`  페이지 ${pageNum} 처리 중...`);

    // 현재 페이지의 데이터 추출
    const pageData = await page.evaluate(() => {
      const items = document.querySelectorAll('.search-result-item');
      const results: any[] = [];

      items.forEach((item) => {
        const nameEl = item.querySelector('.school-name');
        const nameEnEl = item.querySelector('.school-name-en');
        const addressEl = item.querySelector('.address');
        const websiteEl = item.querySelector('.website');
        const phoneEl = item.querySelector('.phone');

        if (nameEl) {
          results.push({
            name: nameEl.textContent?.trim() || '',
            nameEn: nameEnEl?.textContent?.trim() || '',
            address: addressEl?.textContent?.trim() || '',
            website: websiteEl?.textContent?.trim() || '',
            phone: phoneEl?.textContent?.trim() || '',
          });
        }
      });

      return results;
    });

    institutes.push(...pageData);
    console.log(`    → ${pageData.length}개 추출됨`);

    // 다음 페이지 버튼 확인
    const nextButton = await page.$('.pagination .next:not(.disabled)');
    if (nextButton) {
      await nextButton.click();
      await page.waitForTimeout(2000);
      pageNum++;
    } else {
      hasNextPage = false;
    }
  }

  console.log(`✅ 총 ${institutes.length}개 어학당 추출 완료`);

  await browser.close();

  // affiliatedUniversity 추출
  const processedInstitutes = institutes.map((inst) => ({
    ...inst,
    affiliatedUniversity: extractAffiliatedUniversity(inst.name),
  }));

  return processedInstitutes;
}

/**
 * 어학당 이름에서 소속 대학 추출
 * Extract affiliated university from institute name
 */
function extractAffiliatedUniversity(name: string): string {
  // "서울대학교 언어교육원" → "서울대학교"
  const match = name.match(/^(.+?)(대학교|대학)\s+/);
  if (match) {
    return match[1] + match[2];
  }

  // "서울대 언어교육원" → "서울대학교"
  const match2 = name.match(/^(.+?대)\s+/);
  if (match2) {
    return match2[1] + '학교';
  }

  return name.split(/\s+/)[0];
}

/**
 * 메인 실행 함수 / Main execution function
 */
async function main() {
  console.log('🏫 studyinkorea.go.kr 어학당 데이터 스크래핑 시작\n');

  try {
    const institutes = await scrapeLanguageInstitutes();

    // JSON 파일로 저장
    const outputPath = path.join(__dirname, '..', 'data', 'language-institutes-scraped.json');

    // data 폴더가 없으면 생성
    const dataDir = path.dirname(outputPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(institutes, null, 2), 'utf-8');

    console.log(`\n✅ 스크래핑 완료 / Scraping completed`);
    console.log(`  저장 위치: ${outputPath}`);
    console.log(`  총 개수: ${institutes.length}개`);
  } catch (error) {
    console.error('❌ 스크래핑 실패 / Scraping failed:', error);
    process.exit(1);
  }
}

// 실행 / Execute
main();
