/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const { PrismaClient } = require('../generated/prisma-user');

const TOTAL = Number(process.env.SEED_TOTAL || 100);
const DEFAULT_PASSWORD = process.env.SEED_PASSWORD || 'Password123';

function ensureDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    if (process.env.USER_DATABASE_URL) {
      process.env.DATABASE_URL = process.env.USER_DATABASE_URL;
    }
  }
}

function roleForIndex(index) {
  return index % 2 === 0 ? 'MEMBER' : 'CORPORATE';
}

async function main() {
  ensureDatabaseUrl();

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL or USER_DATABASE_URL must be set.');
  }

  const prisma = new PrismaClient();
  const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);

  const users = [];
  for (let i = 1; i <= TOTAL; i += 1) {
    users.push({
      email: `seeduser${i}@seed.test`,
      password: hashedPassword,
      fullName: `Seed User ${i}`,
      role: roleForIndex(i),
      status: 'ACTIVE',
      isEmailedVerified: true,
      isPhoneVerified: false,
    });
  }

  const result = await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log(`Seeded ${result.count} users (requested ${TOTAL}).`);
  console.log(`Password for all users: ${DEFAULT_PASSWORD}`);

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
