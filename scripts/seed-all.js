/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const { PrismaClient } = require('../generated/prisma-user');

const DEFAULT_PASSWORD = process.env.SEED_PASSWORD || 'Password123';

function ensureDatabaseUrl() {
  if (!process.env.DATABASE_URL && process.env.USER_DATABASE_URL) {
    process.env.DATABASE_URL = process.env.USER_DATABASE_URL;
  }
}

const SEED_USERS = [
  // Admin accounts
  { email: 'admin@jobplatform.com', fullName: 'Platform Admin', role: 'SUPERADMIN' },
  { email: 'moderator@jobplatform.com', fullName: 'Platform Moderator', role: 'ADMIN' },

  // Corporate accounts (employers)
  { email: 'corp1@jobplatform.com', fullName: 'TechCorp HR', role: 'CORPORATE' },
  { email: 'corp2@jobplatform.com', fullName: 'GlobalHire Inc', role: 'CORPORATE' },
  { email: 'corp3@jobplatform.com', fullName: 'StartupX Recruiting', role: 'CORPORATE' },

  // Job seeker accounts (members)
  { email: 'seeker1@jobplatform.com', fullName: 'Alice Johnson', role: 'MEMBER' },
  { email: 'seeker2@jobplatform.com', fullName: 'Bob Smith', role: 'MEMBER' },
  { email: 'seeker3@jobplatform.com', fullName: 'Carol Williams', role: 'MEMBER' },
  { email: 'seeker4@jobplatform.com', fullName: 'David Lee', role: 'MEMBER' },
  { email: 'seeker5@jobplatform.com', fullName: 'Emma Davis', role: 'MEMBER' },
];

async function main() {
  ensureDatabaseUrl();

  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL or USER_DATABASE_URL must be set.\n' +
      'Example: USER_DATABASE_URL=postgres://postgres:password@localhost:5433/users node scripts/seed-all.js',
    );
  }

  const prisma = new PrismaClient();
  const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);

  const users = SEED_USERS.map((u) => ({
    ...u,
    password: hashedPassword,
    status: 'ACTIVE',
    isEmailedVerified: true,
    isPhoneVerified: false,
  }));

  const result = await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log(`\nSeeded ${result.count} users (${SEED_USERS.length} defined, duplicates skipped).`);
  console.log(`Password for all: ${DEFAULT_PASSWORD}\n`);

  // Print created users with IDs for reference
  const created = await prisma.user.findMany({
    where: { email: { in: SEED_USERS.map((u) => u.email) } },
    select: { id: true, email: true, role: true, fullName: true },
    orderBy: { email: 'asc' },
  });

  console.log('Seeded accounts:');
  console.log('─'.repeat(80));
  for (const u of created) {
    console.log(`  ${u.role.padEnd(12)} ${u.email.padEnd(30)} ${u.fullName.padEnd(20)} ID: ${u.id}`);
  }
  console.log('─'.repeat(80));

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
