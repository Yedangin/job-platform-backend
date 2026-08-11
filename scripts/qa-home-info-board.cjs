const fs = require('node:fs/promises');
const path = require('node:path');
const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:3000';
const ARTIFACT_DIR = path.resolve(
  __dirname,
  '../../job-chaja-website/.codex-artifacts/home-info-board',
);

const expectedTitles = {
  ko: '외국인등록증(ARC) 신청 가이드',
  en: 'Alien Registration Card (ARC) application guide',
  vi: 'Hướng dẫn đăng ký thẻ cư trú người nước ngoài (ARC)',
  th: 'คู่มือสมัครบัตรประจำตัวคนต่างชาติ (ARC)',
  fil: 'Gabay sa pag-apply ng Alien Registration Card (ARC)',
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function setLocale(page, locale) {
  await page.evaluate((value) => localStorage.setItem('lang', value), locale);
  await page.reload({ waitUntil: 'networkidle2' });
  await page.waitForFunction(
    (title) => document.querySelector('[aria-roledescription="carousel"] h2')?.textContent?.includes(title),
    { timeout: 15_000 },
    expectedTitles[locale],
  );
}

async function main() {
  await fs.mkdir(ARTIFACT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const report = {
    languages: {},
    autoplay: {},
    miniBoard: {},
    guestDetail: {},
    footer: {},
    mobile: {},
    bannerImages: [],
    consoleErrors: [],
  };

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
    page.on('console', (message) => {
      if (message.type() === 'error') report.consoleErrors.push(message.text());
    });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

    for (const [locale, title] of Object.entries(expectedTitles)) {
      await setLocale(page, locale);
      const renderedTitle = await page.$eval(
        '[aria-roledescription="carousel"] h2',
        (node) => node.textContent.trim(),
      );
      const counter = await page.$eval(
        '[aria-roledescription="carousel"]',
        (node) => [...node.querySelectorAll('span')]
          .map((span) => span.textContent.trim())
          .find((value) => /^\d+\/\d+$/.test(value)),
      );
      assert(renderedTitle === title, `${locale} slider title did not change`);
      assert(counter === '1/8', `${locale} slider did not expose 8 posts`);
      report.languages[locale] = { title: renderedTitle, counter };
    }

    await setLocale(page, 'en');
    const firstTitle = await page.$eval(
      '[aria-roledescription="carousel"] h2',
      (node) => node.textContent.trim(),
    );
    await new Promise((resolve) => setTimeout(resolve, 6_500));
    const secondTitle = await page.$eval(
      '[aria-roledescription="carousel"] h2',
      (node) => node.textContent.trim(),
    );
    const secondCounter = await page.$eval(
      '[aria-roledescription="carousel"]',
      (node) => [...node.querySelectorAll('span')]
        .map((span) => span.textContent.trim())
        .find((value) => /^\d+\/\d+$/.test(value)),
    );
    assert(firstTitle !== secondTitle, 'slider did not autoplay after 6 seconds');
    assert(secondCounter === '2/8', 'slider autoplay did not advance to item 2');
    report.autoplay = { from: firstTitle, to: secondTitle, counter: secondCounter };

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'home-desktop-en.png'),
      fullPage: true,
    });

    const sliderData = await page.evaluate(async () => {
      const response = await fetch('/api/info-board/featured?locale=en&limit=8');
      const body = await response.json();
      return body.data ?? body;
    });
    assert(sliderData.items.length === 8, 'featured API did not return 8 items');
    for (const item of sliderData.items) {
      const status = await page.evaluate(async (url) => (await fetch(url)).status, item.bannerImage);
      report.bannerImages.push({ id: item.id, status, url: item.bannerImage });
      assert(status === 200, `banner image failed for post ${item.id}`);
    }

    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await setLocale(page, 'en');
    const examResponse = page.waitForResponse(
      (response) => response.url().includes('/api/info-board?')
        && response.url().includes('category=EXAM'),
      { timeout: 10_000 },
    );
    await page.click('#home-info-tab-exam');
    const response = await examResponse;
    await page.waitForFunction(
      () => document.querySelector('#home-info-tabpanel')?.textContent?.includes('TOPIK'),
      { timeout: 10_000 },
    );
    const panelText = await page.$eval('#home-info-tabpanel', (node) => node.textContent.trim());
    assert(response.status() === 200, 'EXAM tab API request failed');
    assert(panelText.includes('TOPIK'), 'EXAM tab did not render the real exam post');
    report.miniBoard = { examApiStatus: response.status(), containsTopik: true };
    const board = await page.$('#home-info-board-title');
    await board.evaluate((node) => node.closest('section').scrollIntoView({ block: 'center' }));
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'home-mini-board-exam-en.png'),
    });

    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await setLocale(page, 'en');
    const href = await page.$eval(
      '[aria-roledescription="carousel"] > a',
      (node) => node.getAttribute('href'),
    );
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('[aria-roledescription="carousel"] > a'),
    ]);
    assert(!page.url().includes('/login'), 'guest slider click redirected to login');
    assert(page.url().includes(href), 'guest slider click did not open its post');
    report.guestDetail = { href, finalUrl: page.url(), redirectedToLogin: false };

    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await setLocale(page, 'ko');
    const footerText = await page.$eval('footer', (node) => node.textContent.replace(/\s+/g, ' ').trim());
    const address = '경기도 안산시 상록구 조구나리1길 58, 201-1호(이동)';
    assert(footerText.includes(address), 'new corporate address is missing from the footer');
    assert(!footerText.includes('퇴계로 15'), 'old corporate address remains in the footer');
    report.footer = { address, oldAddressAbsent: true };

    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    await page.reload({ waitUntil: 'networkidle2' });
    const mobileMetrics = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      sliderCounter: [...document.querySelectorAll('[aria-roledescription="carousel"] span')]
        .map((span) => span.textContent.trim())
        .find((value) => /^\d+\/\d+$/.test(value)),
    }));
    assert(mobileMetrics.scrollWidth <= mobileMetrics.innerWidth, 'mobile page has horizontal overflow');
    assert(mobileMetrics.sliderCounter === '1/8', 'mobile slider did not render all 8 entries');
    report.mobile = mobileMetrics;
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'home-mobile-ko.png'),
      fullPage: true,
    });

    const guestTranslationStatus = await page.evaluate(async () => {
      const response = await fetch('/api/info-board/admin/translate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          sourceLocale: 'ko',
          targetLocales: ['en'],
          title: '제목',
          summary: '요약',
          content: '본문',
        }),
      });
      return response.status;
    });
    assert([401, 403].includes(guestTranslationStatus), 'guest reached the admin translation endpoint');
    report.guestTranslationStatus = guestTranslationStatus;

    console.log(JSON.stringify(report, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
