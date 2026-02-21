/**
 * Educational institutions seed script
 * CSV 파일에서 대학, 대학원, 전문대학 데이터를 읽어 DB에 삽입
 *
 * Reads university, graduate school, and college data from CSV and inserts into DB
 */

import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { PrismaClient } from '../generated/prisma-user';

// Prisma client 초기화 / Initialize Prisma client
const prisma = new PrismaClient();

// 시도코드 → 수도권 여부 매핑 / Province code to metro area mapping
const METRO_AREA_CODES = ['11', '41', '28']; // 서울, 경기, 인천 / Seoul, Gyeonggi, Incheon

/**
 * CSV 행 인터페이스 / CSV row interface
 */
interface CsvRow {
  '학교명': string;
  '학교 영문명': string;
  '본분교구분명': string;
  '대학구분명': string;
  '학교구분명': string;
  '설립형태구분명': string;
  '시도코드': string;
  '시도명': string;
  '소재지도로명주소': string;
  '소재지지번주소': string;
  '도로명우편번호': string;
  '소재지우편번호': string;
  '홈페이지주소': string;
  '대표전화번호': string;
  '대표팩스번호': string;
  '설립일자': string;
  '기준연도': string;
  '데이터기준일자': string;
  '제공기관코드': string;
  '제공기관명': string;
}

/**
 * 대학구분명 + 학교구분명 → InstitutionType 매핑
 * Maps CSV categories to InstitutionType enum
 */
function mapToInstitutionType(대학구분명: string, 학교구분명: string): string | null {
  // 대학원 관련 / Graduate schools
  if (대학구분명 === '대학원') {
    return 'GRADUATE_SCHOOL';
  }

  // 4년제 대학교 / 4-year universities
  if (학교구분명 === '대학교' || 학교구분명 === '산업대학' || 학교구분명 === '교육대학' || 학교구분명 === '기술대학') {
    return 'UNIVERSITY';
  }

  // 전문대학 / Junior colleges
  if (학교구분명 === '전문대학' || 대학구분명 === '전문대학') {
    return 'COLLEGE';
  }

  // 사이버대학 / Cyber universities
  if (학교구분명.includes('사이버대학')) {
    return 'UNIVERSITY';
  }

  // 기능대학 / Vocational schools
  if (학교구분명 === '기능대학') {
    return 'VOCATIONAL_SCHOOL';
  }

  return null;
}

/**
 * 검색 키워드 생성 / Generate search keywords
 */
function generateSearchKeywords(nameKo: string, nameEn: string | null): string[] {
  const keywords: string[] = [];

  // 한글 이름 / Korean name
  keywords.push(nameKo);

  // 영문 이름 / English name
  if (nameEn && nameEn.trim()) {
    keywords.push(nameEn);
  }

  // 약칭 생성 (예: 서울대학교 → 서울대) / Generate abbreviations
  const shortName = nameKo.replace(/(대학교|대학원|전문대학)$/, '').trim();
  if (shortName !== nameKo && shortName.length > 0) {
    keywords.push(shortName);
  }

  return keywords;
}

/**
 * 소속 대학 추출 (대학원의 경우) / Extract affiliated university (for graduate schools)
 */
function extractAffiliatedUniversity(schoolName: string, institutionType: string): string | null {
  if (institutionType !== 'GRADUATE_SCHOOL') {
    return null;
  }

  // "서울대학교 일반대학원" → "서울대학교"
  const match = schoolName.match(/^(.+?)(대학교|대학)\s+/);
  if (match) {
    return match[1] + match[2];
  }

  return null;
}

/**
 * 좌표 더미 값 생성 (향후 Geocoding API로 대체 필요)
 * Generate dummy coordinates (should be replaced with Geocoding API)
 */
function generateDummyCoordinates(): { latitude: number; longitude: number } {
  // 한국 중심 좌표 범위 / Korea center coordinates range
  const latitude = 37.5 + (Math.random() - 0.5) * 2;
  const longitude = 127.0 + (Math.random() - 0.5) * 2;

  return { latitude, longitude };
}

/**
 * 메인 실행 함수 / Main execution function
 */
async function main() {
  console.log('🏫 교육기관 데이터 시드 시작 / Starting educational institutions seed...\n');

  const csvFilePath = path.join(__dirname, '..', '..', 'docs', 'universities_utf8.csv');

  if (!fs.existsSync(csvFilePath)) {
    console.error(`❌ CSV 파일을 찾을 수 없습니다: ${csvFilePath}`);
    console.error(`❌ CSV file not found: ${csvFilePath}`);
    process.exit(1);
  }

  const rows: CsvRow[] = [];

  // CSV 파일 읽기 / Read CSV file
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row: CsvRow) => {
        rows.push(row);
      })
      .on('end', () => {
        console.log(`✅ CSV 파일 로드 완료: ${rows.length}개 행 / CSV file loaded: ${rows.length} rows\n`);
        resolve();
      })
      .on('error', reject);
  });

  let insertedCount = 0;
  let skippedCount = 0;

  const typeStats: Record<string, number> = {
    UNIVERSITY: 0,
    COLLEGE: 0,
    GRADUATE_SCHOOL: 0,
    VOCATIONAL_SCHOOL: 0,
  };

  // 각 행 처리 / Process each row
  for (const row of rows) {
    const institutionType = mapToInstitutionType(row['대학구분명'], row['학교구분명']);

    // 매핑되지 않는 타입은 스킵 / Skip unmapped types
    if (!institutionType) {
      skippedCount++;
      continue;
    }

    const nameKo = row['학교명']?.trim();
    const nameEn = row['학교 영문명']?.trim() || null;
    const address = row['소재지도로명주소']?.trim() || row['소재지지번주소']?.trim();

    // 필수 필드 검증 / Validate required fields
    if (!nameKo || !address) {
      skippedCount++;
      continue;
    }

    const isMetroArea = METRO_AREA_CODES.includes(row['시도코드']);
    const searchKeywords = generateSearchKeywords(nameKo, nameEn);
    const affiliatedUniversity = extractAffiliatedUniversity(nameKo, institutionType);
    const { latitude, longitude } = generateDummyCoordinates();

    try {
      // DB 삽입 / Insert into DB
      await prisma.educationalInstitution.create({
        data: {
          name: nameKo,
          nameEn: nameEn,
          type: institutionType as any,
          address: address,
          addressDetail: null,
          latitude: latitude,
          longitude: longitude,
          isMetroArea: isMetroArea,
          affiliatedUniversity: affiliatedUniversity,
          searchKeywords: searchKeywords,
          isActive: true,
        },
      });

      insertedCount++;
      typeStats[institutionType]++;

      if (insertedCount % 100 === 0) {
        console.log(`  진행 중... ${insertedCount}개 삽입됨 / Progress... ${insertedCount} inserted`);
      }
    } catch (error) {
      console.error(`⚠️  삽입 실패 - ${nameKo}:`, error);
      skippedCount++;
    }
  }

  console.log('\n✅ 시드 완료 / Seed completed');
  console.log(`  총 삽입: ${insertedCount}개 / Total inserted: ${insertedCount}`);
  console.log(`  스킵: ${skippedCount}개 / Skipped: ${skippedCount}`);
  console.log('\n📊 타입별 통계 / Statistics by type:');
  console.log(`  - 4년제 대학교 (UNIVERSITY): ${typeStats.UNIVERSITY}개`);
  console.log(`  - 전문대학 (COLLEGE): ${typeStats.COLLEGE}개`);
  console.log(`  - 대학원 (GRADUATE_SCHOOL): ${typeStats.GRADUATE_SCHOOL}개`);
  console.log(`  - 기능대학 (VOCATIONAL_SCHOOL): ${typeStats.VOCATIONAL_SCHOOL}개`);
}

// 실행 / Execute
main()
  .catch((error) => {
    console.error('❌ 시드 실패 / Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
