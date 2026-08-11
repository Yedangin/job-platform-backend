jest.mock('libs/common/src', () => ({
  AuthPrismaService: class AuthPrismaService {},
}));
jest.mock('./rule-engine.service', () => ({
  RuleEngineService: class RuleEngineService {},
}));

import { AuthPrismaService } from 'libs/common/src';
import { EvaluateVisaInput, RuleEngineService } from './rule-engine.service';
import { VisaPolicyEvaluationService } from './visa-policy-evaluation.service';

const INPUT: EvaluateVisaInput = {
  ksicCode: '10',
  companySizeType: 'SME',
  employeeCountKorean: 10,
  employeeCountForeign: 2,
  annualRevenue: 1000,
  addressRoad: '서울특별시 중구',
  jobType: 'FULL_TIME',
  offeredSalary: 300,
};

describe('VisaPolicyEvaluationService', () => {
  it('fails closed and writes an audit record when reviewed coverage is absent', async () => {
    const logCreate = jest.fn().mockResolvedValue({ id: 1n });
    const prisma = {
      visaPolicyRelease: {
        findFirst: jest.fn().mockResolvedValue(null),
        count: jest.fn().mockResolvedValue(0),
      },
      visaRule: { findMany: jest.fn().mockResolvedValue([]) },
      visaType: { findMany: jest.fn().mockResolvedValue([{ id: 10n }]) },
      visaEvaluationLog: { create: logCreate },
    };
    const engine = {
      invalidateCache: jest.fn(),
      evaluateVisaEligibility: jest.fn(),
    };
    const service = new VisaPolicyEvaluationService(
      prisma as unknown as AuthPrismaService,
      engine as unknown as RuleEngineService,
    );

    const result = await service.evaluate(INPUT);

    expect(result.outcome).toBe('REVIEW_REQUIRED');
    expect(result.eligibleVisas).toEqual([]);
    expect(engine.evaluateVisaEligibility).not.toHaveBeenCalled();
    expect(logCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        outcome: 'REVIEW_REQUIRED',
        policyReleaseId: undefined,
        requestData: JSON.stringify(INPUT),
      }) as unknown,
    });
  });

  it('returns and logs the reviewed release metadata for a stable complete rule set', async () => {
    const reviewedAt = new Date('2026-08-01T00:00:00.000Z');
    const effectiveFrom = new Date('2026-07-01T00:00:00.000Z');
    const rule = { id: 7n, visaTypeId: 10n, policyReleaseId: 'release-1' };
    const logCreate = jest.fn().mockResolvedValue({ id: 2n });
    const prisma = {
      visaPolicyRelease: {
        findFirst: jest.fn().mockResolvedValue({
          id: 'release-1',
          version: '2026.08.1',
          contentHash: 'hash',
          effectiveFrom,
          reviewedAt,
        }),
        count: jest.fn().mockResolvedValue(0),
      },
      visaRule: {
        findMany: jest
          .fn()
          .mockResolvedValueOnce([rule])
          .mockResolvedValueOnce([{ id: 7n, policyReleaseId: 'release-1' }]),
      },
      visaType: { findMany: jest.fn().mockResolvedValue([{ id: 10n }]) },
      visaEvaluationLog: { create: logCreate },
    };
    const engineResult = {
      eligibleVisas: [],
      blockedVisas: [],
      summary: 'complete',
      appliedRuleCount: 1,
      evaluatedAt: '2026-08-04T00:00:00.000Z',
    };
    const engine = {
      invalidateCache: jest.fn().mockResolvedValue(undefined),
      evaluateVisaEligibility: jest.fn().mockResolvedValue(engineResult),
    };
    const service = new VisaPolicyEvaluationService(
      prisma as unknown as AuthPrismaService,
      engine as unknown as RuleEngineService,
    );

    const result = await service.evaluate(INPUT);

    expect(result.outcome).toBe('EVALUATED');
    expect(result.policy?.version).toBe('2026.08.1');
    expect(engine.evaluateVisaEligibility).toHaveBeenCalledWith(INPUT, false);
    expect(logCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        outcome: 'EVALUATED',
        policyReleaseId: 'release-1',
        policyVersion: '2026.08.1',
        appliedRuleIds: '7',
      }) as unknown,
    });
  });
});
