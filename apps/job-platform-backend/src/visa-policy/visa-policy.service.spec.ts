import { BadRequestException, ConflictException } from '@nestjs/common';

jest.mock('libs/common/src', () => ({
  AuthPrismaService: class AuthPrismaService {},
}));

import { VisaPolicyService } from './visa-policy.service';

describe('VisaPolicyService approved evidence and transitions', () => {
  let prisma: any;
  let service: VisaPolicyService;

  beforeEach(() => {
    prisma = {
      visaRule: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
      policyChange: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        count: jest.fn(),
      },
      visaType: {
        findUnique: jest.fn(),
        count: jest.fn(),
      },
      $transaction: jest.fn(async (callback: (tx: any) => unknown) =>
        callback(prisma),
      ),
    };
    service = new VisaPolicyService(prisma);
  });

  it('returns only APPLIED evidence linked to a currently active rule', async () => {
    const asOf = new Date('2026-08-03T00:00:00.000Z');
    prisma.visaRule.findMany.mockResolvedValue([
      {
        id: 1n,
        version: 3,
        status: 'ACTIVE',
        effectiveFrom: new Date('2026-01-01T00:00:00.000Z'),
        effectiveTo: null,
        visaType: { code: 'E-7' },
      },
      {
        id: 2n,
        version: 1,
        status: 'ACTIVE',
        effectiveFrom: new Date('2025-01-01T00:00:00.000Z'),
        effectiveTo: new Date('2026-01-01T00:00:00.000Z'),
        visaType: { code: 'E-7' },
      },
    ]);
    prisma.policyChange.findMany.mockResolvedValue([
      {
        reviewStatus: 'APPLIED',
        draftRuleId: 1n,
        sourceSite: 'law_go_kr',
        sourceUrl: 'https://law.go.kr/applied',
        contentHash: 'a'.repeat(64),
        effectiveDate: new Date('2026-01-01T00:00:00.000Z'),
        reviewedAt: new Date('2026-07-01T00:00:00.000Z'),
        reviewedBy: 'admin-2',
      },
      {
        reviewStatus: 'APPLIED',
        draftRuleId: 1n,
        sourceSite: 'law_go_kr',
        sourceUrl: 'https://law.go.kr/future',
        contentHash: 'e'.repeat(64),
        effectiveDate: new Date('2026-09-01T00:00:00.000Z'),
        reviewedAt: new Date('2026-07-01T00:00:00.000Z'),
        reviewedBy: 'admin-2',
      },
      {
        reviewStatus: 'APPLIED',
        draftRuleId: 1n,
        sourceSite: 'law_go_kr',
        sourceUrl: 'https://law.go.kr/reviewed-later',
        contentHash: 'f'.repeat(64),
        effectiveDate: null,
        reviewedAt: new Date('2026-09-01T00:00:00.000Z'),
        reviewedBy: 'admin-2',
      },
      {
        reviewStatus: 'PENDING',
        draftRuleId: 1n,
        sourceSite: 'law_go_kr',
        sourceUrl: 'https://law.go.kr/pending',
        contentHash: 'b'.repeat(64),
        effectiveDate: null,
        reviewedAt: new Date('2026-07-01T00:00:00.000Z'),
        reviewedBy: 'admin-2',
      },
      {
        reviewStatus: 'APPLIED',
        draftRuleId: 1n,
        sourceSite: 'law_go_kr',
        sourceUrl: 'https://law.go.kr.evil.example/forged',
        contentHash: 'd'.repeat(64),
        effectiveDate: null,
        reviewedAt: new Date('2026-07-02T00:00:00.000Z'),
        reviewedBy: 'admin-2',
      },
      {
        reviewStatus: 'APPLIED',
        draftRuleId: 2n,
        sourceSite: 'law_go_kr',
        sourceUrl: 'https://law.go.kr/expired',
        contentHash: 'c'.repeat(64),
        effectiveDate: null,
        reviewedAt: new Date('2025-07-01T00:00:00.000Z'),
        reviewedBy: 'admin-2',
      },
    ]);

    const result = await service.getApprovedEvidence('e-7', asOf.toISOString());

    expect(result.evidence).toEqual([
      expect.objectContaining({
        visaCode: 'E-7',
        sourceUrl: 'https://law.go.kr/applied',
        ruleId: '1',
        version: 3,
      }),
    ]);
    expect(prisma.visaRule.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: 'ACTIVE',
          effectiveFrom: { lte: asOf },
        }),
      }),
    );
    expect(prisma.policyChange.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ reviewStatus: 'APPLIED' }),
      }),
    );
  });

  it('rejects non-allowlisted public visa codes', async () => {
    await expect(
      service.getApprovedEvidence('UNKNOWN-99'),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.visaRule.findMany).not.toHaveBeenCalled();
  });

  it.each(['1-or-1', '0', '9223372036854775808'])(
    'returns 400 for an invalid bigint id: %s',
    async (id) => {
      await expect(service.getPolicyChangeById(id)).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(prisma.policyChange.findUnique).not.toHaveBeenCalled();
    },
  );

  it('blocks transitions outside the server state machine', async () => {
    prisma.policyChange.findUnique.mockResolvedValue({
      id: 1n,
      reviewStatus: 'PENDING',
      affectedVisaTypes: 'E-7',
    });

    await expect(
      service.reviewPolicyChange('1', { reviewStatus: 'APPLIED' }, 'admin-2'),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(prisma.policyChange.update).not.toHaveBeenCalled();
  });

  it('prevents the rule author from approving the same rule', async () => {
    prisma.policyChange.findUnique.mockResolvedValue({
      id: 1n,
      reviewStatus: 'RULE_DRAFTED',
      affectedVisaTypes: 'E-7',
      draftRuleId: 9n,
      sourceSite: 'law_go_kr',
      sourceUrl: 'https://law.go.kr/rule',
      contentHash: 'a'.repeat(64),
      reviewedBy: 'admin-1',
      reviewedAt: new Date('2026-08-01T00:00:00.000Z'),
    });
    prisma.visaRule.findUnique.mockResolvedValue({
      id: 9n,
      status: 'ACTIVE',
      effectiveFrom: new Date('2026-01-01T00:00:00.000Z'),
      effectiveTo: null,
      createdBy: 'admin-author',
      visaType: { code: 'E-7' },
    });

    await expect(
      service.reviewPolicyChange(
        '1',
        { reviewStatus: 'APPLIED' },
        'admin-author',
      ),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it.each([
    'http://law.go.kr/rule',
    'https://user:password@law.go.kr/rule',
    'https://law.go.kr.evil.example/rule',
    'https://law.go.kr:8443/rule',
  ])('rejects a forged or non-HTTPS source URL: %s', async (sourceUrl) => {
    prisma.policyChange.findUnique.mockResolvedValue({
      id: 1n,
      reviewStatus: 'RULE_DRAFTED',
      affectedVisaTypes: 'E-7',
      draftRuleId: 9n,
      sourceSite: 'law_go_kr',
      sourceUrl,
      contentHash: 'a'.repeat(64),
      reviewedBy: 'admin-1',
      reviewedAt: new Date('2026-08-01T00:00:00.000Z'),
    });
    prisma.visaRule.findUnique.mockResolvedValue({
      id: 9n,
      status: 'ACTIVE',
      effectiveFrom: new Date('2026-01-01T00:00:00.000Z'),
      effectiveTo: null,
      createdBy: 'admin-author',
      visaType: { code: 'E-7' },
    });

    await expect(
      service.reviewPolicyChange(
        '1',
        { reviewStatus: 'APPLIED' },
        'admin-approver',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.policyChange.update).not.toHaveBeenCalled();
  });
});
