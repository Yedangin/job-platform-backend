/**
 * Educational institutions verification script
 * 삽입된 교육기관 데이터 검증
 *
 * Verifies inserted educational institution data
 */

import { PrismaClient } from '../generated/prisma-user';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 교육기관 데이터 검증 시작 / Starting data verification...\n');

  // 총 개수 확인 / Total count check
  const totalCount = await prisma.educationalInstitution.count();
  console.log(`📊 총 교육기관 수 / Total institutions: ${totalCount}개\n`);

  // 타입별 통계 / Statistics by type
  const stats = await prisma.educationalInstitution.groupBy({
    by: ['type'],
    _count: {
      _all: true,
    },
  });

  console.log('📊 타입별 통계 / Statistics by type:');
  for (const stat of stats) {
    console.log(`  - ${stat.type}: ${stat._count._all}개`);
  }
  console.log();

  // 수도권/비수도권 통계 / Metro/non-metro statistics
  const metroStats = await prisma.educationalInstitution.groupBy({
    by: ['isMetroArea'],
    _count: {
      _all: true,
    },
  });

  console.log('📍 지역별 통계 / Regional statistics:');
  for (const stat of metroStats) {
    const label = stat.isMetroArea ? '수도권 / Metro area' : '비수도권 / Non-metro area';
    console.log(`  - ${label}: ${stat._count._all}개`);
  }
  console.log();

  // 샘플 데이터 확인 / Sample data check
  console.log('📝 샘플 데이터 / Sample data:\n');

  // 대학교 샘플 / University sample
  const universitySample = await prisma.educationalInstitution.findFirst({
    where: { type: 'UNIVERSITY' },
  });
  if (universitySample) {
    console.log('  [대학교 / UNIVERSITY]');
    console.log(`  - 이름: ${universitySample.name}`);
    console.log(`  - 영문명: ${universitySample.nameEn || 'N/A'}`);
    console.log(`  - 주소: ${universitySample.address}`);
    console.log(`  - 수도권: ${universitySample.isMetroArea ? '예' : '아니오'}`);
    console.log();
  }

  // 대학원 샘플 / Graduate school sample
  const gradSample = await prisma.educationalInstitution.findFirst({
    where: { type: 'GRADUATE_SCHOOL' },
  });
  if (gradSample) {
    console.log('  [대학원 / GRADUATE_SCHOOL]');
    console.log(`  - 이름: ${gradSample.name}`);
    console.log(`  - 소속 대학: ${gradSample.affiliatedUniversity || 'N/A'}`);
    console.log(`  - 주소: ${gradSample.address}`);
    console.log();
  }

  // 전문대학 샘플 / College sample
  const collegeSample = await prisma.educationalInstitution.findFirst({
    where: { type: 'COLLEGE' },
  });
  if (collegeSample) {
    console.log('  [전문대학 / COLLEGE]');
    console.log(`  - 이름: ${collegeSample.name}`);
    console.log(`  - 영문명: ${collegeSample.nameEn || 'N/A'}`);
    console.log(`  - 주소: ${collegeSample.address}`);
    console.log();
  }

  // 어학당 샘플 / Language institute sample
  const langSample = await prisma.educationalInstitution.findFirst({
    where: { type: 'LANGUAGE_INSTITUTE' },
  });
  if (langSample) {
    console.log('  [어학당 / LANGUAGE_INSTITUTE]');
    console.log(`  - 이름: ${langSample.name}`);
    console.log(`  - 소속 대학: ${langSample.affiliatedUniversity || 'N/A'}`);
    console.log(`  - 주소: ${langSample.address}`);
    console.log(`  - 검색 키워드: ${langSample.searchKeywords.join(', ')}`);
    console.log();
  }

  // 검색 테스트 / Search test
  console.log('🔎 검색 기능 테스트 / Search functionality test:\n');

  const searchTests = [
    { keyword: '서울대', expected: '서울대학교 관련' },
    { keyword: '연세', expected: '연세대학교 관련' },
    { keyword: '어학당', expected: '어학당' },
    { keyword: '한국어', expected: '한국어 관련' },
  ];

  for (const test of searchTests) {
    const results = await prisma.educationalInstitution.findMany({
      where: {
        OR: [
          { name: { contains: test.keyword } },
          { searchKeywords: { has: test.keyword } },
        ],
      },
      take: 3,
    });

    console.log(`  키워드 "${test.keyword}" 검색 결과: ${results.length}개`);
    if (results.length > 0) {
      results.forEach((r, i) => {
        console.log(`    ${i + 1}. ${r.name} (${r.type})`);
      });
    }
    console.log();
  }

  console.log('✅ 검증 완료 / Verification completed');
}

// 실행 / Execute
main()
  .catch((error) => {
    console.error('❌ 검증 실패 / Verification failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
