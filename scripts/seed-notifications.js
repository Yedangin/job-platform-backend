/* eslint-disable no-console */
const { PrismaClient: UserPrisma } = require('../generated/prisma-user');
const { PrismaClient: NotificationPrisma } = require('../generated/prisma-notification');

function ensureDatabaseUrls() {
  // User DB
  if (!process.env.DATABASE_URL && process.env.USER_DATABASE_URL) {
    process.env.DATABASE_URL = process.env.USER_DATABASE_URL;
  }
}

function hoursAgo(h) {
  return new Date(Date.now() - h * 60 * 60 * 1000);
}

function daysAgo(d) {
  return new Date(Date.now() - d * 24 * 60 * 60 * 1000);
}

async function main() {
  ensureDatabaseUrls();

  const notificationDbUrl = process.env.NOTIFICATION_DATABASE_URL;
  const userDbUrl = process.env.DATABASE_URL || process.env.USER_DATABASE_URL;

  if (!userDbUrl) {
    throw new Error(
      'USER_DATABASE_URL must be set.\n' +
      'Example: USER_DATABASE_URL=postgres://postgres:password@localhost:5433/users ' +
      'NOTIFICATION_DATABASE_URL=postgres://postgres:password@localhost:5435/notifications ' +
      'node scripts/seed-notifications.js',
    );
  }

  if (!notificationDbUrl) {
    throw new Error('NOTIFICATION_DATABASE_URL must be set.');
  }

  const userPrisma = new UserPrisma({ datasourceUrl: userDbUrl });
  const notifPrisma = new NotificationPrisma({ datasourceUrl: notificationDbUrl });

  // Fetch seeded users
  const seedEmails = [
    'seeker1@jobplatform.com',
    'seeker2@jobplatform.com',
    'seeker3@jobplatform.com',
    'corp1@jobplatform.com',
    'corp2@jobplatform.com',
    'admin@jobplatform.com',
  ];

  const users = await userPrisma.user.findMany({
    where: { email: { in: seedEmails } },
    select: { id: true, email: true, role: true, fullName: true },
  });

  if (users.length === 0) {
    throw new Error('No seed users found. Run seed-all.js first.');
  }

  const byEmail = Object.fromEntries(users.map((u) => [u.email, u]));

  const seeker1 = byEmail['seeker1@jobplatform.com'];
  const seeker2 = byEmail['seeker2@jobplatform.com'];
  const seeker3 = byEmail['seeker3@jobplatform.com'];
  const corp1 = byEmail['corp1@jobplatform.com'];
  const corp2 = byEmail['corp2@jobplatform.com'];
  const admin = byEmail['admin@jobplatform.com'];

  const notifications = [
    // Seeker 1 notifications
    {
      userId: seeker1.id, email: seeker1.email,
      subject: 'Application Received', content: 'Your application for Frontend Developer at TechCorp has been received.',
      notificationType: 'APPLICATION_ALERT', channel: 'BOTH', status: 'SENT',
      isRead: true, readAt: hoursAgo(2), createdAt: daysAgo(2), sendedAt: daysAgo(2),
    },
    {
      userId: seeker1.id, email: seeker1.email,
      subject: 'Interview Scheduled', content: 'You have an interview for Frontend Developer on Monday at 2:00 PM.',
      notificationType: 'INTERVIEW_UPDATE', channel: 'BOTH', status: 'SENT',
      isRead: false, createdAt: hoursAgo(5), sendedAt: hoursAgo(5),
    },
    {
      userId: seeker1.id, email: seeker1.email,
      subject: 'Profile Reminder', content: 'Complete your profile to increase your chances of getting hired.',
      notificationType: 'REMINDER', channel: 'PUSH', status: 'SENT',
      isRead: false, createdAt: hoursAgo(1), sendedAt: hoursAgo(1),
    },
    {
      userId: seeker1.id, email: seeker1.email,
      subject: 'New Job Match', content: 'A new React Developer position matches your skills.',
      notificationType: 'PROMOTION', channel: 'PUSH', status: 'SENT',
      isRead: false, createdAt: hoursAgo(3), sendedAt: hoursAgo(3),
    },

    // Seeker 2 notifications
    {
      userId: seeker2.id, email: seeker2.email,
      subject: 'Application Update', content: 'Your application for Backend Engineer at GlobalHire has been reviewed.',
      notificationType: 'APPLICATION_ALERT', channel: 'BOTH', status: 'SENT',
      isRead: false, createdAt: hoursAgo(8), sendedAt: hoursAgo(8),
    },
    {
      userId: seeker2.id, email: seeker2.email,
      subject: 'Interview Confirmed', content: 'Your interview with GlobalHire Inc has been confirmed for Wednesday at 10 AM.',
      notificationType: 'INTERVIEW_UPDATE', channel: 'EMAIL', status: 'SENT',
      isRead: true, readAt: hoursAgo(6), createdAt: daysAgo(1), sendedAt: daysAgo(1),
    },

    // Seeker 3 notifications
    {
      userId: seeker3.id, email: seeker3.email,
      subject: 'Welcome to JobPlatform', content: 'Start exploring job opportunities tailored for you.',
      notificationType: 'STATUS_ALERT', channel: 'PUSH', status: 'SENT',
      isRead: true, readAt: daysAgo(3), createdAt: daysAgo(5), sendedAt: daysAgo(5),
    },

    // Corp 1 notifications
    {
      userId: corp1.id, email: corp1.email,
      subject: 'New Application', content: 'Alice Johnson applied for Frontend Developer position.',
      notificationType: 'APPLICATION_ALERT', channel: 'BOTH', status: 'SENT',
      isRead: false, createdAt: hoursAgo(2), sendedAt: hoursAgo(2),
    },
    {
      userId: corp1.id, email: corp1.email,
      subject: 'Interview Reminder', content: 'Interview with Alice Johnson is scheduled for Monday at 2:00 PM.',
      notificationType: 'INTERVIEW_UPDATE', channel: 'PUSH', status: 'SENT',
      isRead: false, createdAt: hoursAgo(4), sendedAt: hoursAgo(4),
    },
    {
      userId: corp1.id, email: corp1.email,
      subject: 'Payment Processed', content: 'Your premium job posting payment of $49.99 has been processed.',
      notificationType: 'FINANCIAL_ALERT', channel: 'EMAIL', status: 'SENT',
      isRead: true, readAt: daysAgo(1), createdAt: daysAgo(3), sendedAt: daysAgo(3),
    },

    // Corp 2 notifications
    {
      userId: corp2.id, email: corp2.email,
      subject: 'New Applicant', content: 'Bob Smith applied for the Backend Engineer role.',
      notificationType: 'APPLICATION_ALERT', channel: 'BOTH', status: 'SENT',
      isRead: false, createdAt: hoursAgo(6), sendedAt: hoursAgo(6),
    },
    {
      userId: corp2.id, email: corp2.email,
      subject: 'Subscription Expiring', content: 'Your premium subscription expires in 3 days.',
      notificationType: 'FINANCIAL_ALERT', channel: 'BOTH', status: 'SENT',
      isRead: false, createdAt: hoursAgo(12), sendedAt: hoursAgo(12),
    },

    // Admin notifications
    {
      userId: admin.id, email: admin.email,
      subject: 'System Status', content: 'All notification services are running normally.',
      notificationType: 'STATUS_ALERT', channel: 'PUSH', status: 'SENT',
      isRead: true, readAt: hoursAgo(1), createdAt: hoursAgo(3), sendedAt: hoursAgo(3),
    },
    {
      userId: admin.id, email: admin.email,
      subject: 'New Corporate Registration', content: 'StartupX Recruiting has submitted a corporate registration for review.',
      notificationType: 'STATUS_ALERT', channel: 'BOTH', status: 'SENT',
      isRead: false, createdAt: hoursAgo(1), sendedAt: hoursAgo(1),
    },
    {
      userId: admin.id, email: admin.email,
      subject: 'Daily Report', content: '15 new users, 8 job applications, 3 interviews scheduled today.',
      notificationType: 'REMINDER', channel: 'EMAIL', status: 'SENT',
      isRead: false, createdAt: hoursAgo(6), sendedAt: hoursAgo(6),
    },
  ].map((n) => ({
    ...n,
    maxAttempts: 3,
    attempts: 1,
    priority: 0,
  }));

  // Clear existing seed notifications (optional)
  const seedUserIds = users.map((u) => u.id);
  await notifPrisma.notification.deleteMany({
    where: { userId: { in: seedUserIds } },
  });

  const result = await notifPrisma.notification.createMany({
    data: notifications,
  });

  console.log(`\nSeeded ${result.count} notifications across ${users.length} users.\n`);

  // Summary per user
  for (const u of users) {
    const count = notifications.filter((n) => n.userId === u.id).length;
    const unread = notifications.filter((n) => n.userId === u.id && !n.isRead).length;
    console.log(`  ${u.role.padEnd(12)} ${u.email.padEnd(30)} ${count} notifications (${unread} unread)`);
  }

  await userPrisma.$disconnect();
  await notifPrisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
