import { ForbiddenException, NotFoundException } from '@nestjs/common';

jest.mock('libs/common/src', () => {
  class AuthPrismaService {}
  class RedisService {}
  return { AuthPrismaService, RedisService };
});

jest.mock('../payment/viewing-credit.service', () => ({
  ViewingCreditService: class ViewingCreditService {},
}));

import { ResumeService } from './resume.service';

describe('ResumeService talent-pool privacy', () => {
  const sessionId = 'session-1';
  const userId = 'user-1';
  let service: ResumeService;
  let prisma: any;
  let redis: any;
  let credits: any;

  const approvedCorporate = {
    id: userId,
    userType: 'CORPORATE',
    isActive: true,
    deletedAt: null,
    corporate: { verificationStatus: 'APPROVED' },
  };

  beforeEach(() => {
    prisma = {
      user: { findUnique: jest.fn() },
      resume: {
        findMany: jest.fn(),
        count: jest.fn(),
        findFirst: jest.fn(),
      },
      individualProfile: { update: jest.fn() },
      consentRecord: { updateMany: jest.fn(), create: jest.fn() },
      $queryRaw: jest.fn().mockResolvedValue([{ auth_id: 'resume-owner' }]),
      talentBookmark: {
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        deleteMany: jest.fn(),
      },
      $transaction: jest.fn(async (callback: (tx: any) => unknown) =>
        callback(prisma),
      ),
    };
    redis = {
      get: jest.fn().mockResolvedValue(JSON.stringify({ userId })),
    };
    credits = {
      useCredit: jest.fn(),
      getRemainingCredits: jest.fn(),
      getViewingHistory: jest.fn(),
    };
    service = new ResumeService(prisma, redis, credits);
  });

  it('returns 403 for an individual using corporate search', async () => {
    prisma.user.findUnique.mockResolvedValue({
      ...approvedCorporate,
      userType: 'INDIVIDUAL',
      corporate: null,
    });

    await expect(service.search(sessionId, {})).rejects.toBeInstanceOf(
      ForbiddenException,
    );
    expect(prisma.resume.findMany).not.toHaveBeenCalled();
  });

  it('returns 403 for an unapproved corporate account', async () => {
    prisma.user.findUnique.mockResolvedValue({
      ...approvedCorporate,
      corporate: { verificationStatus: 'PENDING' },
    });

    await expect(service.search(sessionId, {})).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('requires both the profile flag and active explicit consent in search', async () => {
    prisma.user.findUnique.mockResolvedValue(approvedCorporate);
    prisma.resume.findMany.mockResolvedValue([]);
    prisma.resume.count.mockResolvedValue(0);

    const result = await service.search(sessionId, {});

    expect(result.talents).toEqual([]);
    expect(prisma.resume.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          isComplete: true,
          user: {
            is: expect.objectContaining({
              individual: { is: { isOpenToScout: true } },
              consentRecords: {
                some: {
                  consentType: 'TALENT_POOL_DISCLOSURE',
                  granted: true,
                  withdrawnAt: null,
                },
              },
            }),
          },
        }),
      }),
    );
  });

  it('returns 404 and does not charge after disclosure is withdrawn', async () => {
    prisma.user.findUnique.mockResolvedValue(approvedCorporate);
    prisma.resume.findFirst.mockResolvedValue(null);

    await expect(service.viewDetail(sessionId, 42)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(credits.useCredit).not.toHaveBeenCalled();
  });

  it('fails closed when disclosure disappears after credit use', async () => {
    const publicResume = {
      id: BigInt(42),
      userId: 'resume-owner',
      nationality: 'VN',
      birthDate: null,
      educations: [{ school: 'Test University' }],
      workExperiences: [],
      topikLevel: 3,
      kiipLevel: null,
      certificates: [],
      preferredJobTypes: [],
      preferredRegions: [],
      preferredSalary: null,
      preferredEmploymentTypes: [],
      isComplete: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    prisma.user.findUnique.mockResolvedValue(approvedCorporate);
    prisma.resume.findFirst
      .mockResolvedValueOnce(publicResume)
      .mockResolvedValueOnce(publicResume)
      .mockResolvedValueOnce(null);
    credits.useCredit.mockResolvedValue({
      success: true,
      remainingCredits: 9,
    });

    await expect(service.viewDetail(sessionId, 42)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
    expect(credits.useCredit).toHaveBeenCalledWith(userId, 42);
  });

  it('normalizes an invalid page and ignores an invalid TOPIK filter', async () => {
    prisma.user.findUnique.mockResolvedValue(approvedCorporate);
    prisma.resume.findMany.mockResolvedValue([]);
    prisma.resume.count.mockResolvedValue(0);

    await service.search(sessionId, { page: -3, topikLevel: Number.NaN });

    expect(prisma.resume.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 0,
        where: expect.not.objectContaining({ topikLevel: expect.anything() }),
      }),
    );
  });

  it('stores a versioned visibility consent and profile flag atomically', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: userId,
      userType: 'INDIVIDUAL',
      individual: { authId: userId, isOpenToScout: false },
    });
    prisma.individualProfile.update.mockResolvedValue({});
    prisma.consentRecord.updateMany.mockResolvedValue({ count: 1 });
    prisma.consentRecord.create.mockResolvedValue({});

    const result = await service.updateScoutVisibility(sessionId, {
      isOpenToScout: true,
      consentVersion: 'talent-disclosure-2026-08-03',
    });

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    expect(prisma.individualProfile.update).toHaveBeenCalledWith({
      where: { authId: userId },
      data: { isOpenToScout: true },
    });
    expect(prisma.consentRecord.updateMany).toHaveBeenCalledWith({
      where: {
        authId: userId,
        consentType: 'TALENT_POOL_DISCLOSURE',
        withdrawnAt: null,
      },
      data: { withdrawnAt: expect.any(Date) },
    });
    expect(prisma.consentRecord.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        authId: userId,
        consentType: 'TALENT_POOL_DISCLOSURE',
        policyVersion: 'talent-disclosure-2026-08-03',
        granted: true,
        withdrawnAt: null,
      }),
    });
    expect(result.isOpenToScout).toBe(true);
  });
});
