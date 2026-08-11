jest.mock('libs/common/src', () => ({
  AuthPrismaService: class AuthPrismaService {},
}));

import { BadRequestException } from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';
import { VisaPolicyIntegrityService } from './visa-policy-integrity.service';

describe('VisaPolicyIntegrityService', () => {
  const rule = {
    id: 1n,
    visaTypeId: 7n,
    ruleName: 'age rule',
    priority: 10,
    ruleType: 'ELIGIBILITY',
    conditions:
      '{"operator":"AND","clauses":[{"value":18,"op":"GTE","field":"age"}]}',
    actions: '{"type":"ELIGIBLE"}',
    version: 1,
    effectiveFrom: new Date('2026-06-30T00:00:00.000Z'),
    effectiveTo: null,
  };

  it('produces a stable server-side hash for policy contents', async () => {
    const prismaMock = {
      visaRule: { findMany: jest.fn().mockResolvedValue([rule]) },
      visaPathwayDefinition: {
        findMany: jest.fn().mockResolvedValue([
          {
            id: 'path-1',
            currentVisaCode: 'D-10',
            targetVisaCode: 'E-7-1',
            locale: 'ko',
            version: 1,
            definition: { procedureSteps: [], remediationOptions: [] },
          },
        ]),
      },
    };
    const service = new VisaPolicyIntegrityService(
      prismaMock as unknown as AuthPrismaService,
    );

    const first = await service.computeReleaseHash('release-1');
    const second = await service.computeReleaseHash('release-1');

    expect(first).toMatch(/^[a-f0-9]{64}$/);
    expect(second).toBe(first);
  });

  it('blocks activation when the reviewed content hash changed', async () => {
    const prismaMock = {
      visaRule: { findMany: jest.fn().mockResolvedValue([rule]) },
      visaPathwayDefinition: { findMany: jest.fn().mockResolvedValue([]) },
    };
    const service = new VisaPolicyIntegrityService(
      prismaMock as unknown as AuthPrismaService,
    );

    await expect(
      service.assertReleaseHash('release-1', 'not-the-current-hash'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
