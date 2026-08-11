import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

jest.mock('libs/common/src', () => ({
  AuthPrismaService: class AuthPrismaService {},
  RedisService: class RedisService {},
}));

import { JobPostingService } from './job-posting.service';

const approvedCorporate = {
  companyId: BigInt(10),
  authId: 'company-user',
  verificationStatus: 'APPROVED',
  employeeCountKorean: 10,
  employeeCountForeign: 0,
};

function makeJob(overrides: Record<string, unknown> = {}) {
  return {
    id: BigInt(1),
    corporateId: BigInt(10),
    status: 'DRAFT',
    boardType: 'PART_TIME',
    title: 'Kitchen assistant',
    description: 'Prepare ingredients and assist the kitchen team.',
    allowedVisas: 'F-4',
    displayAddress: 'Seoul Gangnam',
    actualAddress: 'Seoul Gangnam 1',
    contactName: 'Manager',
    contactPhone: '01012345678',
    closingDate: new Date('2026-12-31T00:00:00.000Z'),
    expiresAt: new Date('2026-12-31T00:00:00.000Z'),
    albaAttributes: { hourlyWage: 12000, workDaysMask: '1111100' },
    fulltimeAttributes: null,
    ...overrides,
  };
}

describe('JobPostingService review workflow', () => {
  let db: any;
  let service: JobPostingService;

  beforeEach(() => {
    db = {
      jobPosting: {
        findUnique: jest.fn().mockResolvedValue(makeJob()),
        findFirst: jest.fn().mockResolvedValue(makeJob({ status: 'ACTIVE' })),
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
        update: jest.fn().mockResolvedValue(makeJob()),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      jobAttributesAlba: { upsert: jest.fn() },
      jobAttributesFulltime: { upsert: jest.fn() },
      corporateProfile: {
        findUnique: jest.fn().mockResolvedValue(approvedCorporate),
        findMany: jest.fn().mockResolvedValue([]),
      },
      adminJobAction: { create: jest.fn() },
    };
    db.$transaction = jest.fn(async (callback: (tx: typeof db) => unknown) => callback(db));
    service = new JobPostingService(
      db,
      { keys: jest.fn().mockResolvedValue([]) } as any,
      { grantFirstPostCoupons: jest.fn() } as any,
      { get: jest.fn(), set: jest.fn(), del: jest.fn() } as any,
      { evaluateJob: jest.fn() } as any,
    );
  });

  it('denies submit for an unapproved company', async () => {
    db.corporateProfile.findUnique.mockResolvedValueOnce({
      ...approvedCorporate,
      verificationStatus: 'PENDING',
    });

    await expect(service.submitJobPosting('company-user', '1')).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('denies an owner action for another company posting', async () => {
    db.jobPosting.findUnique.mockResolvedValueOnce(
      makeJob({ corporateId: BigInt(99) }),
    );

    await expect(service.submitJobPosting('company-user', '1')).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('submits only a draft or a rejected posting', async () => {
    db.jobPosting.findUnique.mockResolvedValueOnce(makeJob({ status: 'ACTIVE' }));

    await expect(service.submitJobPosting('company-user', '1')).rejects.toBeInstanceOf(
      ConflictException,
    );
  });

  it('moves a changed active posting back to review', async () => {
    db.jobPosting.findUnique.mockResolvedValueOnce(makeJob({ status: 'ACTIVE' }));

    await service.updateJobPosting('company-user', '1', { title: 'Updated title' });

    expect(db.jobPosting.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'SUBMITTED_REVIEW' }),
      }),
    );
  });

  it('does not expose a non-active posting through the public detail lookup', async () => {
    db.jobPosting.findFirst.mockResolvedValueOnce(null);

    await expect(service.getJobDetail('1')).rejects.toBeInstanceOf(NotFoundException);
    expect(db.jobPosting.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ status: 'ACTIVE' }) }),
    );
  });

  it('filters public lists to currently active postings', async () => {
    await service.getJobListings({});

    expect(db.jobPosting.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ status: 'ACTIVE' }) }),
    );
  });

  it('does not restore a suspended posting to active when its company is no longer approved', async () => {
    db.jobPosting.findUnique.mockResolvedValueOnce(
      makeJob({ status: 'SUSPENDED', preSuspensionStatus: 'ACTIVE' }),
    );
    db.corporateProfile.findUnique.mockResolvedValueOnce({
      ...approvedCorporate,
      verificationStatus: 'REJECTED',
    });

    await expect(service.unsuspendJobPosting('admin-user', '1')).rejects.toBeInstanceOf(
      ForbiddenException,
    );
    expect(db.jobPosting.update).not.toHaveBeenCalled();
  });

  it('restores a suspended review item back to review after revalidation', async () => {
    db.jobPosting.findUnique.mockResolvedValueOnce(
      makeJob({ status: 'SUSPENDED', preSuspensionStatus: 'SUBMITTED_REVIEW' }),
    );

    await expect(service.unsuspendJobPosting('admin-user', '1')).resolves.toMatchObject({
      status: 'SUBMITTED_REVIEW',
    });
    expect(db.jobPosting.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'SUBMITTED_REVIEW' }),
      }),
    );
  });

  it('approves a submitted posting with a conditional update and audit record', async () => {
    db.jobPosting.findUnique.mockResolvedValueOnce(makeJob({ status: 'SUBMITTED_REVIEW' }));

    await expect(service.approveJobPosting('admin-user', '1')).resolves.toMatchObject({
      status: 'ACTIVE',
    });

    expect(db.jobPosting.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: BigInt(1), status: 'SUBMITTED_REVIEW' },
        data: expect.objectContaining({ status: 'ACTIVE', reviewedBy: 'admin-user' }),
      }),
    );
    expect(db.adminJobAction.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ actionType: 'APPROVE', reason: 'Approved after review' }),
      }),
    );
  });

  it('rejects a submitted posting and records the rejection reason', async () => {
    db.jobPosting.findUnique.mockResolvedValueOnce(makeJob({ status: 'SUBMITTED_REVIEW' }));

    await expect(service.rejectJobPosting('admin-user', '1', 'Missing required details')).resolves.toMatchObject({
      status: 'REJECTED',
      rejectionReason: 'Missing required details',
    });
    expect(db.adminJobAction.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ actionType: 'REJECT', reason: 'Missing required details' }),
      }),
    );
  });

  it('rejects an empty rejection reason before changing status', async () => {
    db.jobPosting.findUnique.mockResolvedValueOnce(makeJob({ status: 'SUBMITTED_REVIEW' }));

    await expect(service.rejectJobPosting('admin-user', '1', '   ')).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(db.jobPosting.updateMany).not.toHaveBeenCalled();
  });

  it('does not approve a posting outside submitted review', async () => {
    db.jobPosting.findUnique.mockResolvedValueOnce(makeJob({ status: 'DRAFT' }));

    await expect(service.approveJobPosting('admin-user', '1')).rejects.toBeInstanceOf(
      ConflictException,
    );
  });

  it('returns a conflict when a concurrent review decision wins the CAS update', async () => {
    db.jobPosting.findUnique.mockResolvedValueOnce(makeJob({ status: 'SUBMITTED_REVIEW' }));
    db.jobPosting.updateMany.mockResolvedValueOnce({ count: 0 });

    await expect(service.approveJobPosting('admin-user', '1')).rejects.toBeInstanceOf(
      ConflictException,
    );
    expect(db.adminJobAction.create).not.toHaveBeenCalled();
  });

  it.each([
    ['getJobDetail', () => service.getJobDetail('not-a-number')],
    ['submitJobPosting', () => service.submitJobPosting('company-user', '0')],
    ['approveJobPosting', () => service.approveJobPosting('admin-user', '9223372036854775808')],
  ])('%s returns bad request for an invalid job id', async (_method, execute) => {
    await expect(execute()).rejects.toBeInstanceOf(BadRequestException);
  });
});
