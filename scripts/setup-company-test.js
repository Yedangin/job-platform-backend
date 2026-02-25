/**
 * 테스트 기업 계정 + 공고 생성 스크립트
 * Creates test company account + job posting for development
 *
 * Prisma field names (mapped via @map):
 *   User: password(@map password_hash), userType(@map user_type)
 *   CorporateProfile: authId, bizRegNumber, companyNameOfficial, ceoName, etc.
 *   JobPosting: corporateId (BigInt FK → CorporateProfile.companyId)
 */
const { PrismaClient } = require('../generated/prisma-user');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const email = 'company@jobchaja.com';
  const pw = 'company1!';
  const hash = await bcrypt.hash(pw, 10);

  // 1. 기업 유저 upsert / Upsert corporate user
  let user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        password: hash,
        userType: 'CORPORATE',
        isActive: true,
      },
    });
    console.log('[Setup] 유저 생성:', user.id);
  } else {
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hash, userType: 'CORPORATE', isActive: true },
    });
    console.log('[Setup] 유저 업데이트:', user.id);
  }

  // 2. 기업 프로필 upsert / Upsert corporate profile
  let profile = await prisma.corporateProfile.findFirst({
    where: { authId: user.id },
  });
  if (!profile) {
    profile = await prisma.corporateProfile.create({
      data: {
        authId: user.id,
        companyNameOfficial: '(주)잡차자테스트',
        bizRegNumber: '485-86-03274',
        ceoName: '박찬호',
        managerName: '김테스트',
        managerPhone: '010-1234-5678',
        managerEmail: email,
        brandName: '잡차자 테스트기업',
        addressRoad: '서울특별시 강남구 테헤란로 123',
        verificationStatus: 'APPROVED',
      },
    });
    console.log('[Setup] 프로필 생성:', profile.companyId.toString());
  } else {
    await prisma.corporateProfile.update({
      where: { companyId: profile.companyId },
      data: { verificationStatus: 'APPROVED' },
    });
    console.log('[Setup] 프로필 업데이트:', profile.companyId.toString());
  }

  // 3. 테스트 공고 생성 / Create test job postings
  const now = new Date();
  const d30 = new Date(now.getTime() + 30 * 86400000);
  const d14 = new Date(now.getTime() + 14 * 86400000);

  const jobs = [
    {
      corporateId: profile.companyId,
      boardType: 'FULL_TIME',
      tierType: 'STANDARD',
      title: '[정규직] 외국인 전문 백엔드 개발자 모집',
      description: '외국인 전문 인력을 채용합니다. NestJS, TypeScript 경험자 우대.',
      displayAddress: '서울 강남구 테헤란로 123',
      actualAddress: '서울특별시 강남구 테헤란로 123',
      contactName: '김채용',
      contactPhone: '010-1234-5678',
      contactEmail: email,
      allowedVisas: 'E-7,D-10,F-2,F-5,F-6',
      minKoreanLevel: 3,
      workIntensity: 'MIDDLE',
      applicationMethod: 'PLATFORM',
      interviewMethod: 'ONLINE',
      status: 'ACTIVE',
      expiresAt: d30,
      closingDate: d30,
    },
    {
      corporateId: profile.companyId,
      boardType: 'PART_TIME',
      tierType: 'STANDARD',
      title: '[알바] 강남 카페 바리스타 모집',
      description: '강남역 인근 카페에서 외국인 바리스타를 모집합니다.',
      displayAddress: '서울 강남구 강남역 인근',
      actualAddress: '서울특별시 강남구 역삼동 123-45',
      contactName: '이매니저',
      contactPhone: '010-9876-5432',
      allowedVisas: 'E-9,H-2,F-4,D-10',
      minKoreanLevel: 2,
      workIntensity: 'MIDDLE',
      applicationMethod: 'PLATFORM',
      interviewMethod: 'OFFLINE',
      interviewPlace: '강남역 3번출구 카페',
      status: 'ACTIVE',
      expiresAt: d14,
      closingDate: d14,
    },
    {
      corporateId: profile.companyId,
      boardType: 'FULL_TIME',
      tierType: 'PREMIUM',
      title: '[프리미엄] 물류센터 관리 매니저 모집',
      description: '대규모 물류센터에서 외국인 관리 매니저를 모집합니다.',
      displayAddress: '경기도 이천시 마장면',
      actualAddress: '경기도 이천시 마장면 산업로 456',
      contactName: '박물류',
      contactPhone: '031-123-4567',
      contactEmail: 'hr@logistics.test',
      allowedVisas: 'E-7,E-9,F-2,F-5',
      minKoreanLevel: 4,
      workIntensity: 'UPPER',
      applicationMethod: 'PLATFORM',
      interviewMethod: 'OFFLINE',
      interviewPlace: '이천 물류센터 1층 회의실',
      status: 'ACTIVE',
      expiresAt: d30,
      closingDate: d30,
      premiumStartAt: now,
      premiumEndAt: d30,
      upgradedAt: now,
    },
  ];

  for (const jobData of jobs) {
    const existing = await prisma.jobPosting.findFirst({
      where: { title: jobData.title, corporateId: jobData.corporateId },
    });
    if (existing) {
      console.log('[Setup] 이미 존재:', existing.title);
      continue;
    }
    const job = await prisma.jobPosting.create({ data: jobData });
    console.log('[Setup] 공고 생성:', job.id.toString(), job.title);
  }

  const total = await prisma.jobPosting.count({
    where: { corporateId: profile.companyId },
  });
  console.log(`\n[Setup] 완료! 기업 공고 총 ${total}개`);
  console.log(`[Setup] 로그인: email=${email}, password=${pw}`);
}

main()
  .catch((e) => { console.error('[Setup] Error:', e.message || e); process.exit(1); })
  .finally(() => prisma.$disconnect());
