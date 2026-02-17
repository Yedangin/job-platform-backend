/**
 * 결제 시스템 시드 데이터 — 상품 + 쿠폰
 * Payment system seed data — products + coupons
 */
import { PrismaClient } from '../../generated/prisma-payment';

const prisma = new PrismaClient();

async function main() {
  // ==========================================================
  // 1. 상품 시드 / Product seed
  // ==========================================================
  const products = [
    // 공고 관련 상품 / Job posting products
    {
      code: 'JOB_PREMIUM',
      name: '프리미엄 공고',
      nameEn: 'Premium Job Posting',
      category: 'JOB_POSTING' as const,
      price: 50000,
      description: '상단 노출 + 추천 배지 + 노출 기간 2배',
      isActive: true,
      metadata: JSON.stringify({
        standardDays: { partTime: 14, fullTime: 30 },
        premiumDays: { partTime: 30, fullTime: 60 },
      }),
    },
    {
      code: 'JOB_EXTENSION',
      name: '공고 연장',
      nameEn: 'Job Posting Extension',
      category: 'JOB_POSTING' as const,
      price: 25000,
      description: '공고 노출 기간 연장 (일반 14/30일, 프리미엄 30/60일)',
      isActive: true,
      metadata: JSON.stringify({
        extensionDays: { standard: { partTime: 14, fullTime: 30 }, premium: { partTime: 30, fullTime: 60 } },
      }),
    },

    // 인재 열람 상품 / Talent viewing products
    {
      code: 'VIEW_1',
      name: '인재 열람 단건',
      nameEn: 'Single Talent View',
      category: 'TALENT_VIEW' as const,
      price: 3000,
      description: '인재 이력서 1건 열람',
      isActive: true,
      metadata: JSON.stringify({ credits: 1, validDays: 30 }),
    },
    {
      code: 'VIEW_10',
      name: '인재 열람 라이트',
      nameEn: 'Light Talent View',
      category: 'TALENT_VIEW' as const,
      price: 25000,
      description: '인재 이력서 10건 열람 (17% 할인)',
      isActive: true,
      metadata: JSON.stringify({ credits: 10, validDays: 60 }),
    },
    {
      code: 'VIEW_30',
      name: '인재 열람 스탠다드',
      nameEn: 'Standard Talent View',
      category: 'TALENT_VIEW' as const,
      price: 60000,
      description: '인재 이력서 30건 열람 (33% 할인)',
      isActive: true,
      metadata: JSON.stringify({ credits: 30, validDays: 90 }),
    },
    {
      code: 'VIEW_100',
      name: '인재 열람 프로',
      nameEn: 'Pro Talent View',
      category: 'TALENT_VIEW' as const,
      price: 150000,
      description: '인재 이력서 100건 열람 (50% 할인)',
      isActive: true,
      metadata: JSON.stringify({ credits: 100, validDays: 120 }),
    },

    // 부가 노출 상품 (Phase 2 — 비활성) / Addon products (Phase 2 — inactive)
    {
      code: 'BUMP_UP',
      name: '끌어올리기',
      nameEn: 'Bump Up',
      category: 'ADDON' as const,
      price: 10000,
      description: '공고 목록 최상단 재노출',
      isActive: false,
      metadata: null,
    },
    {
      code: 'URGENT_BADGE',
      name: '긴급 채용 배지',
      nameEn: 'Urgent Badge',
      category: 'ADDON' as const,
      price: 20000,
      description: '긴급 채용 아이콘 표시',
      isActive: false,
      metadata: null,
    },
    {
      code: 'FEATURED',
      name: '홈 추천',
      nameEn: 'Featured Posting',
      category: 'ADDON' as const,
      price: 50000,
      description: '메인 페이지 추천 영역 7일 노출',
      isActive: false,
      metadata: JSON.stringify({ durationDays: 7 }),
    },
  ];

  for (const product of products) {
    const existing = await prisma.product.findUnique({
      where: { code: product.code },
    });

    if (existing) {
      await prisma.product.update({
        where: { code: product.code },
        data: product,
      });
      console.log(`[Seed] 상품 "${product.code}" 업데이트 완료`);
    } else {
      await prisma.product.create({ data: product });
      console.log(`[Seed] 상품 "${product.code}" 생성 완료`);
    }
  }

  const productCount = await prisma.product.count();
  console.log(`[Seed] 총 상품 수: ${productCount}`);

  // ==========================================================
  // 2. 쿠폰 시드 / Coupon seed
  // ==========================================================
  const now = new Date();
  const ninetyDaysLater = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  const oneYearLater = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

  const coupons = [
    {
      code: 'WELCOME_VIEW_5',
      name: '회원가입 축하 열람 5건',
      type: 'FREE_ITEM' as const,
      value: 5,
      targetProduct: 'TALENT_VIEW' as const,
      minOrderAmount: null,
      maxUses: null,
      maxUsesPerUser: 1,
      startsAt: now,
      expiresAt: oneYearLater,
      isActive: true,
    },
    {
      code: 'FIRST_POST_VIEW_5',
      name: '첫 공고 등록 열람 5건',
      type: 'FREE_ITEM' as const,
      value: 5,
      targetProduct: 'TALENT_VIEW' as const,
      minOrderAmount: null,
      maxUses: null,
      maxUsesPerUser: 1,
      startsAt: now,
      expiresAt: oneYearLater,
      isActive: true,
    },
  ];

  for (const coupon of coupons) {
    const existing = await prisma.coupon.findUnique({
      where: { code: coupon.code },
    });

    if (existing) {
      await prisma.coupon.update({
        where: { code: coupon.code },
        data: coupon,
      });
      console.log(`[Seed] 쿠폰 "${coupon.code}" 업데이트 완료`);
    } else {
      await prisma.coupon.create({ data: coupon });
      console.log(`[Seed] 쿠폰 "${coupon.code}" 생성 완료`);
    }
  }

  const couponCount = await prisma.coupon.count();
  console.log(`[Seed] 총 쿠폰 수: ${couponCount}`);
}

main()
  .catch((e) => {
    console.error('[Seed] 에러:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
