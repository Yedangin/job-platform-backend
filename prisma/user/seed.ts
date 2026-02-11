import { PrismaClient } from '../../generated/prisma-user';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin';
  const adminPassword = 'adminpage1!';

  // 기존 admin 계정 확인
  const existing = await prisma.user.findFirst({
    where: { email: adminEmail },
  });

  if (existing) {
    console.log('[Seed] Admin 계정이 이미 존재합니다:', existing.id);
    return;
  }

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Admin 계정 생성
  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      userType: 'ADMIN',
      socialProvider: 'NONE',
      isActive: true,
    },
  });

  console.log('[Seed] Admin 계정 생성 완료:', {
    id: admin.id,
    email: admin.email,
    userType: admin.userType,
  });
}

main()
  .catch((e) => {
    console.error('[Seed] 에러:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
