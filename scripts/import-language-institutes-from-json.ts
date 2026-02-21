/**
 * Import language institutes from JSON file
 * JSON 파일에서 어학당 데이터를 읽어 DB에 삽입
 *
 * Reads language institute data from JSON and inserts into DB
 */

import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient } from '../generated/prisma-user';

const prisma = new PrismaClient();

// 시도명 → 수도권 여부 매핑
const METRO_AREA_PROVINCES = ['서울특별시', '경기도', '인천광역시'];

interface LanguageInstituteJson {
  name: string;
  nameEn?: string;
  address: string;
  affiliatedUniversity?: string;
  website?: string;
  phone?: string;
}

/**
 * 주소에서 시도명 추출
 */
function extractProvince(address: string): string {
  const match = address.match(/^(서울특별시|부산광역시|대구광역시|인천광역시|광주광역시|대전광역시|울산광역시|세종특별자치시|경기도|강원특별자치도|충청북도|충청남도|전북특별자치도|전라남도|경상북도|경상남도|제주특별자치도)/);
  return match ? match[1] : '';
}

/**
 * 수도권 여부 판단
 */
function isMetroArea(address: string): boolean {
  const province = extractProvince(address);
  return METRO_AREA_PROVINCES.includes(province);
}

/**
 * 소속 대학 추출 (이름에서)
 */
function extractAffiliatedUniversity(name: string): string | null {
  // "서울대학교 언어교육원" → "서울대학교"
  const match = name.match(/^(.+?)(대학교|대학)\s+/);
  if (match) {
    return match[1] + match[2];
  }
  return null;
}

/**
 * 검색 키워드 생성
 */
function generateSearchKeywords(name: string, nameEn: string | undefined, affiliatedUniversity: string | null): string[] {
  const keywords: string[] = [name];

  if (nameEn) {
    keywords.push(nameEn);
  }

  if (affiliatedUniversity) {
    keywords.push(affiliatedUniversity);
    keywords.push(`${affiliatedUniversity} 어학당`);
    keywords.push(`${affiliatedUniversity} 한국어`);
  }

  // 약칭 생성
  const shortName = name.replace(/(언어교육원|한국어학당|한국어교육원|한국어교육센터|국제교육원)$/, '').trim();
  if (shortName !== name && shortName.length > 0) {
    keywords.push(shortName);
  }

  return keywords;
}

/**
 * 더미 좌표 생성 (향후 Geocoding API로 대체)
 */
function generateDummyCoordinates(): { latitude: number; longitude: number } {
  const latitude = 37.5 + (Math.random() - 0.5) * 2;
  const longitude = 127.0 + (Math.random() - 0.5) * 2;
  return { latitude, longitude };
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log('🏫 JSON 파일에서 어학당 데이터 가져오기 시작\n');

  const jsonFilePath = path.join(__dirname, '..', 'data', 'language-institutes.json');

  if (!fs.existsSync(jsonFilePath)) {
    console.error(`❌ JSON 파일을 찾을 수 없습니다: ${jsonFilePath}`);
    console.error('\n📝 다음 형식의 JSON 파일을 생성해주세요:');
    console.error(`
[
  {
    "name": "서울대학교 언어교육원",
    "nameEn": "Seoul National University Language Education Institute",
    "address": "서울특별시 관악구 관악로 1",
    "affiliatedUniversity": "서울대학교",
    "website": "https://lei.snu.ac.kr",
    "phone": "02-880-5000"
  }
]
    `);
    process.exit(1);
  }

  const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8');
  const institutes: LanguageInstituteJson[] = JSON.parse(jsonContent);

  console.log(`✅ JSON 파일 로드 완료: ${institutes.length}개 어학당\n`);

  let insertedCount = 0;
  let skippedCount = 0;
  let updatedCount = 0;

  for (const inst of institutes) {
    const affiliatedUniv = inst.affiliatedUniversity || extractAffiliatedUniversity(inst.name);
    const metro = isMetroArea(inst.address);
    const searchKeywords = generateSearchKeywords(inst.name, inst.nameEn, affiliatedUniv);
    const { latitude, longitude } = generateDummyCoordinates();

    try {
      // 중복 확인
      const existing = await prisma.educationalInstitution.findFirst({
        where: {
          name: inst.name,
        },
      });

      if (existing) {
        // 이미 존재하면 업데이트
        await prisma.educationalInstitution.update({
          where: { id: existing.id },
          data: {
            nameEn: inst.nameEn || existing.nameEn,
            address: inst.address,
            isMetroArea: metro,
            affiliatedUniversity: affiliatedUniv,
            searchKeywords: searchKeywords,
          },
        });
        updatedCount++;
        console.log(`  🔄 업데이트: ${inst.name}`);
      } else {
        // 새로 삽입
        await prisma.educationalInstitution.create({
          data: {
            name: inst.name,
            nameEn: inst.nameEn || null,
            type: 'LANGUAGE_INSTITUTE',
            address: inst.address,
            addressDetail: null,
            latitude: latitude,
            longitude: longitude,
            isMetroArea: metro,
            affiliatedUniversity: affiliatedUniv,
            searchKeywords: searchKeywords,
            isActive: true,
          },
        });
        insertedCount++;

        if (insertedCount % 20 === 0) {
          console.log(`  진행 중... ${insertedCount}개 삽입됨`);
        }
      }
    } catch (error: any) {
      console.error(`  ⚠️  실패 - ${inst.name}:`, error.message);
      skippedCount++;
    }
  }

  console.log('\n✅ 가져오기 완료 / Import completed');
  console.log(`  새로 삽입: ${insertedCount}개 / Newly inserted: ${insertedCount}`);
  console.log(`  업데이트: ${updatedCount}개 / Updated: ${updatedCount}`);
  console.log(`  스킵: ${skippedCount}개 / Skipped: ${skippedCount}`);
}

// 실행
main()
  .catch((error) => {
    console.error('❌ 가져오기 실패 / Import failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
