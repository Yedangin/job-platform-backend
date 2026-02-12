import { PrismaClient } from '../../generated/prisma-user';

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      productCode: 'ALBA_PREMIUM',
      boardType: 'PART_TIME' as const,
      tierType: 'PREMIUM' as const,
      nameKo: '알바 프리미엄 공고',
      originalPrice: 130000,
      discountPrice: 50000,
      discountPercent: 62,
      durationDays: 30,
      features: JSON.stringify({
        highlights: [
          '메인 페이지 상단 노출',
          '프리미엄 배지 표시',
          '30일 게시 기간',
          '검색 결과 우선 노출',
        ],
      }),
    },
    {
      productCode: 'ALBA_STANDARD',
      boardType: 'PART_TIME' as const,
      tierType: 'STANDARD' as const,
      nameKo: '알바 일반 공고',
      originalPrice: 70000,
      discountPrice: 0,
      discountPercent: 100,
      durationDays: 14,
      features: JSON.stringify({
        highlights: [
          '일반 목록 노출',
          '14일 게시 기간',
          '기본 검색 노출',
        ],
      }),
    },
    {
      productCode: 'FT_PREMIUM',
      boardType: 'FULL_TIME' as const,
      tierType: 'PREMIUM' as const,
      nameKo: '정규직 프리미엄 공고',
      originalPrice: 130000,
      discountPrice: 50000,
      discountPercent: 62,
      durationDays: 30,
      features: JSON.stringify({
        highlights: [
          '메인 페이지 상단 노출',
          '프리미엄 배지 표시',
          '30일 게시 기간',
          '검색 결과 우선 노출',
        ],
      }),
    },
    {
      productCode: 'FT_STANDARD',
      boardType: 'FULL_TIME' as const,
      tierType: 'STANDARD' as const,
      nameKo: '정규직 일반 공고',
      originalPrice: 70000,
      discountPrice: 0,
      discountPercent: 100,
      durationDays: 14,
      features: JSON.stringify({
        highlights: [
          '일반 목록 노출',
          '14일 게시 기간',
          '기본 검색 노출',
        ],
      }),
    },
  ];

  for (const product of products) {
    const existing = await prisma.jobProduct.findUnique({
      where: { productCode: product.productCode },
    });

    if (existing) {
      console.log(`[Seed] 상품 "${product.productCode}" 이미 존재 — 업데이트합니다.`);
      await prisma.jobProduct.update({
        where: { productCode: product.productCode },
        data: product,
      });
    } else {
      await prisma.jobProduct.create({ data: product });
      console.log(`[Seed] 상품 "${product.productCode}" 생성 완료.`);
    }
  }

  const count = await prisma.jobProduct.count();
  console.log(`[Seed] 총 상품 수: ${count}`);
}

main()
  .catch((e) => {
    console.error('[Seed] 에러:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
