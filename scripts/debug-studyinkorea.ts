/**
 * Debug script for studyinkorea.go.kr
 * 사이트 HTML 구조 분석용 디버그 스크립트
 */

import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

async function debugStudyInKorea() {
  console.log('🌐 브라우저 실행 중...');

  const browser = await puppeteer.launch({
    headless: false, // 브라우저 창 표시
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

  // 페이지 HTML 저장
  const html = await page.content();
  const htmlPath = path.join(__dirname, '..', 'data', 'studyinkorea-page.html');
  fs.writeFileSync(htmlPath, html, 'utf-8');
  console.log(`📄 HTML 저장: ${htmlPath}`);

  // 스크린샷 저장
  const screenshotPath = path.join(__dirname, '..', 'data', 'studyinkorea-screenshot.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`📸 스크린샷 저장: ${screenshotPath}`);

  // 체크박스 찾기
  console.log('\n🔍 체크박스 검색 중...');

  const checkboxSelectors = [
    '#koClassYn',
    'input[name="koClassYn"]',
    'input[type="checkbox"][value*="koClass"]',
    'input[type="checkbox"]',
    '.checkbox',
    'label:contains("어학당")',
  ];

  for (const selector of checkboxSelectors) {
    try {
      const elements = await page.$$(selector);
      if (elements.length > 0) {
        console.log(`  ✅ 찾음: "${selector}" - ${elements.length}개`);

        // 각 요소의 속성 확인
        for (let i = 0; i < Math.min(elements.length, 3); i++) {
          const element = elements[i];
          const attributes = await page.evaluate((el) => {
            const attrs: any = {};
            for (const attr of el.attributes) {
              attrs[attr.name] = attr.value;
            }
            return attrs;
          }, element);
          console.log(`    요소 ${i + 1}:`, JSON.stringify(attributes, null, 2));
        }
      } else {
        console.log(`  ❌ 못찾음: "${selector}"`);
      }
    } catch (error) {
      console.log(`  ⚠️  오류: "${selector}" -`, (error as Error).message);
    }
  }

  // 페이지의 모든 체크박스 목록 가져오기
  console.log('\n📋 페이지의 모든 체크박스:');
  const allCheckboxes = await page.evaluate(() => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    return Array.from(checkboxes).map((cb) => ({
      id: cb.id,
      name: (cb as HTMLInputElement).name,
      value: (cb as HTMLInputElement).value,
      checked: (cb as HTMLInputElement).checked,
      visible: (cb as HTMLElement).offsetParent !== null,
      label: cb.parentElement?.textContent?.trim() || '',
    }));
  });

  console.log(JSON.stringify(allCheckboxes, null, 2));

  console.log('\n⏸️  브라우저를 10초간 열어둡니다. 수동으로 페이지를 확인하세요...');
  await page.waitForTimeout(10000);

  await browser.close();
  console.log('✅ 디버그 완료');
}

debugStudyInKorea().catch(console.error);
