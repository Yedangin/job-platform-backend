/**
 * Debug script for studyinkorea.go.kr search results
 * 어학당 검색 후 결과 구조 분석
 */

import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

// Helper function to wait
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function debugSearch() {
  console.log('🌐 브라우저 실행 중...');

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('📄 페이지 로드 중...');
  await page.goto('https://www.studyinkorea.go.kr/ko/search_v1.do', {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });

  console.log('✅ 페이지 로드 완료');

  // 어학당 체크박스 클릭
  console.log('\n🔍 어학당 필터 적용 중...');
  const checkbox = await page.$('#language_center_tab1');
  if (checkbox) {
    await checkbox.click();
    console.log('✅ 어학당 필터 체크 완료');
    await wait(5000); // 검색 결과 로드 대기
  } else {
    console.error('❌ 체크박스를 찾을 수 없습니다.');
    await browser.close();
    return;
  }

  // 검색 결과 HTML 저장
  const html = await page.content();
  const htmlPath = path.join(__dirname, '..', 'data', 'studyinkorea-search-results.html');
  fs.writeFileSync(htmlPath, html, 'utf-8');
  console.log(`📄 검색 결과 HTML 저장: ${htmlPath}`);

  // 스크린샷 저장
  const screenshotPath = path.join(__dirname, '..', 'data', 'studyinkorea-search-screenshot.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`📸 스크린샷 저장: ${screenshotPath}`);

  // 검색 결과 분석
  console.log('\n📊 검색 결과 분석 중...');

  const results = await page.evaluate(() => {
    // 다양한 셀렉터로 시도
    const selectors = [
      '.search-result',
      '.result-item',
      '.result-list li',
      '.university-item',
      '.school-item',
      '[class*="result"]',
      '[class*="item"]',
      'li[class*="result"]',
      'div[class*="result"]',
    ];

    const found: any = {};

    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        found[selector] = {
          count: elements.length,
          firstElement: {
            html: elements[0].outerHTML.substring(0, 500),
            className: elements[0].className,
            text: elements[0].textContent?.trim().substring(0, 200),
          },
        };
      }
    }

    return found;
  });

  console.log('검색 결과 셀렉터 분석:');
  console.log(JSON.stringify(results, null, 2));

  // 페이지 내 텍스트 "언어교육원" 또는 "한국어" 검색
  console.log('\n🔎 "언어교육원" 또는 "한국어" 텍스트 검색...');
  const textSearch = await page.evaluate(() => {
    const bodyText = document.body.innerText;
    const matches = bodyText.match(/(.*언어교육원.*|.*한국어.*학당.*|.*한국어.*교육.*)/gi);
    return matches ? matches.slice(0, 10) : [];
  });

  console.log('발견된 텍스트:');
  textSearch.forEach((text, i) => {
    console.log(`  ${i + 1}. ${text.trim()}`);
  });

  console.log('\n⏸️  브라우저를 20초간 열어둡니다. 수동으로 확인하세요...');
  await wait(20000);

  await browser.close();
  console.log('✅ 디버그 완료');
}

debugSearch().catch(console.error);
