import { PrismaClient } from '../../generated/prisma-user';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // ============================
  // 1. Admin 계정 생성
  // ============================
  const adminEmail = 'admin';
  const adminPassword = 'adminpage1!';

  const existing = await prisma.user.findFirst({
    where: { email: adminEmail },
  });

  if (!existing) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        userType: 'ADMIN',
        socialProvider: 'NONE',
        isActive: true,
      },
    });
    console.log('[Seed] Admin 계정 생성 완료:', admin.id);
  } else {
    console.log('[Seed] Admin 계정이 이미 존재합니다:', existing.id);
  }

  // ============================
  // 2. 리브소프트 샘플 공고 생성
  // ============================
  await seedLivesoftJobPostings();
}

async function seedLivesoftJobPostings() {
  // 리브소프트 기업 프로필 찾기
  const livesoftCorp = await prisma.corporateProfile.findFirst({
    where: { companyNameOfficial: { contains: '리브소프트' } },
  });

  if (!livesoftCorp) {
    console.log('[Seed] 리브소프트 기업 프로필이 없습니다. 공고 시드를 건너뜁니다.');
    return;
  }

  // 이미 공고가 있는지 확인
  const existingPostings = await prisma.jobPosting.findMany({
    where: { corporateId: livesoftCorp.companyId },
  });

  if (existingPostings.length > 0) {
    console.log(`[Seed] 리브소프트 공고가 이미 ${existingPostings.length}건 존재합니다.`);
    return;
  }

  // 알바 공고 생성
  const albaPosting = await prisma.jobPosting.create({
    data: {
      corporateId: livesoftCorp.companyId,
      boardType: 'PART_TIME',
      tierType: 'STANDARD',
      title: '[리브소프트] 사무보조 알바 모집',
      description: `주식회사 리브소프트에서 사무보조 아르바이트를 모집합니다.

[주요 업무]
- 데이터 입력 및 문서 정리
- 고객 전화 응대 보조
- 사무실 환경 관리 보조
- 기타 사무보조 업무

[근무 조건]
- 근무시간: 평일 09:00 ~ 18:00 (주 5일)
- 시급: 12,000원
- 근무지: 서울 강남구 테헤란로 123
- 근무기간: 3개월 이상 (연장 가능)

[지원 자격]
- F-2, F-4, F-5, F-6, H-2 비자 소지자
- 한국어 기본 소통 가능자
- 컴퓨터 기본 활용 가능자 (엑셀, 워드)

[우대사항]
- 사무보조 경험자
- 장기 근무 가능자

많은 지원 바랍니다!`,
      allowedVisas: 'F-2,F-4,F-5,F-6,H-2',
      minKoreanLevel: 2,
      displayAddress: '서울 강남구 테헤란로 123',
      actualAddress: '서울 강남구 테헤란로 123 리브소프트빌딩 5층',
      workIntensity: 'LOWER',
      benefits: JSON.stringify(['4대보험', '교통비 지원', '중식 제공', '근무복 제공']),
      contactName: '김채용',
      contactPhone: '02-1234-5678',
      contactEmail: 'recruit@livesoft.co.kr',
      applicationMethod: 'PLATFORM',
      interviewMethod: 'OFFLINE',
      interviewPlace: '서울 강남구 테헤란로 123 리브소프트빌딩 3층 회의실',
      status: 'ACTIVE',
      viewCount: 47,
      scrapCount: 12,
      applyCount: 5,
      albaAttributes: {
        create: {
          hourlyWage: 12000,
          workPeriod: '3개월 이상',
          workDaysMask: '1111100',
          workTimeStart: '09:00',
          workTimeEnd: '18:00',
        },
      },
    },
  });
  console.log('[Seed] 리브소프트 알바 공고 생성 완료:', albaPosting.id.toString());

  // 정규직 공고 생성
  const fulltimePosting = await prisma.jobPosting.create({
    data: {
      corporateId: livesoftCorp.companyId,
      boardType: 'FULL_TIME',
      tierType: 'PREMIUM',
      title: '[리브소프트] 프론트엔드 개발자 채용 (정규직)',
      description: `주식회사 리브소프트에서 프론트엔드 개발자를 정규직으로 채용합니다.

[회사 소개]
리브소프트는 외국인 근로자 채용 플랫폼을 운영하는 IT 기업입니다.
혁신적인 HR Tech 솔루션을 개발하며, 빠르게 성장하고 있습니다.

[주요 업무]
- React/Next.js 기반 웹 프론트엔드 개발
- 사용자 경험(UX) 개선 및 UI 컴포넌트 설계
- REST API 연동 및 상태 관리
- 코드 리뷰 및 기술 문서 작성

[자격 요건]
- E-7 비자 소지자 또는 F 계열 비자 소지자
- React, TypeScript 실무 경험 2년 이상
- HTML/CSS, 반응형 웹 개발 능력
- Git 기반 협업 경험
- 한국어 업무 소통 가능 (TOPIK 4급 이상)

[우대사항]
- Next.js, Tailwind CSS 경험
- CI/CD, Docker 경험
- Figma 등 디자인 툴 활용 가능

[근무 조건]
- 연봉: 3,600만원 ~ 5,000만원 (경력에 따라 협의)
- 근무시간: 10:00 ~ 19:00 (유연근무제)
- 근무지: 서울 강남구 테헤란로 123
- 수습기간: 3개월

[복리후생]
- 4대보험, 퇴직금
- 연차 15일 + 추가 특별휴가
- 점심식대 지원 (일 1만원)
- 자기개발비 연 100만원
- 재택근무 주 2회 가능`,
      allowedVisas: 'E-7,F-2,F-4,F-5,F-6',
      minKoreanLevel: 4,
      displayAddress: '서울 강남구 테헤란로 123',
      actualAddress: '서울 강남구 테헤란로 123 리브소프트빌딩 5층',
      workIntensity: 'MIDDLE',
      benefits: JSON.stringify(['4대보험', '퇴직금', '유연근무제', '재택근무', '점심식대', '자기개발비', '특별휴가']),
      contactName: '이인사',
      contactPhone: '02-1234-5679',
      contactEmail: 'hr@livesoft.co.kr',
      applicationMethod: 'PLATFORM',
      interviewMethod: 'ONLINE',
      interviewPlace: '1차 화상면접 (Zoom), 2차 대면면접',
      employmentSubType: 'PERMANENT',
      status: 'ACTIVE',
      viewCount: 128,
      scrapCount: 34,
      applyCount: 11,
      fulltimeAttributes: {
        create: {
          salaryMin: 36000000,
          salaryMax: 50000000,
          experienceLevel: 'JUNIOR',
          educationLevel: 'BACHELOR',
        },
      },
    },
  });
  console.log('[Seed] 리브소프트 정규직 공고 생성 완료:', fulltimePosting.id.toString());
}

main()
  .catch((e) => {
    console.error('[Seed] 에러:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
