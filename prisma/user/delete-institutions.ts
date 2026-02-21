import { PrismaClient } from '../../generated/prisma-user';

const prisma = new PrismaClient();

async function main() {
  console.log('교육기관 데이터 삭제 중...');
  const result = await prisma.educationalInstitution.deleteMany({});
  console.log(`삭제 완료: ${result.count}건`);
}

main()
  .catch((e) => {
    console.error('에러:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
