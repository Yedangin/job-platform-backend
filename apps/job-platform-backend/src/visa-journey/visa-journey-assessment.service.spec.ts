jest.mock('libs/common/src', () => ({
  AuthPrismaService: class AuthPrismaService {},
}));
jest.mock('../visa-rules/rule-engine.service', () => ({
  RuleEngineService: class RuleEngineService {},
}));

import { AuthPrismaService } from 'libs/common/src';
import { RuleEngineService } from '../visa-rules/rule-engine.service';
import { CreateVisaAssessmentDto } from './dto';
import { VisaJourneyAssessmentService } from './visa-journey-assessment.service';
import { VisaJourneyPathwayService } from './visa-journey-pathway.service';

describe('VisaJourneyAssessmentService', () => {
  it('fails closed and stores only allowlisted inputs when no reviewed release exists', async () => {
    const assessmentCreate = jest
      .fn()
      .mockResolvedValue({ id: 11n, outcome: 'REVIEW_REQUIRED' });
    const transactionClient = {
      visaJourneyAssessment: { create: assessmentCreate },
      visaJourneyItem: { createMany: jest.fn() },
      visaJourney: { update: jest.fn() },
      visaJourneyAuditEvent: { create: jest.fn() },
    };
    const prismaMock = {
      visaJourney: {
        findFirstOrThrow: jest.fn().mockResolvedValue({
          id: 'journey-1',
          userId: 'user-1',
          targetVisaCode: 'E-7-1',
        }),
      },
      visaPolicyRelease: { findFirst: jest.fn().mockResolvedValue(null) },
      visaRule: { findMany: jest.fn() },
      $transaction: jest.fn(
        (operation: (tx: typeof transactionClient) => Promise<unknown>) =>
          operation(transactionClient),
      ),
    };
    const engineMock = {
      evaluateSingleVisa: jest.fn(),
      invalidateCache: jest.fn(),
    };
    const pathwayMock = { findActive: jest.fn(), seedItems: jest.fn() };
    const service = new VisaJourneyAssessmentService(
      prismaMock as unknown as AuthPrismaService,
      engineMock as unknown as RuleEngineService,
      pathwayMock as unknown as VisaJourneyPathwayService,
    );
    const dto = Object.assign(new CreateVisaAssessmentDto(), {
      nationality: 'VN',
      age: 28,
      passportNumber: 'M12345678',
      foreignRegistrationNumber: '900101-5123456',
      ocrRawText: 'sensitive OCR text',
    });

    const result = await service.assess('journey-1', 'user-1', dto);

    expect(result.outcome).toBe('REVIEW_REQUIRED');
    expect(engineMock.evaluateSingleVisa).not.toHaveBeenCalled();
    const createCall = assessmentCreate.mock.calls[0] as unknown as [
      {
        data: {
          inputSnapshot: Record<string, unknown>;
          appliedRuleIds: string[];
        };
      },
    ];
    const createInput = createCall[0].data;
    expect(createInput.inputSnapshot).toEqual({ nationality: 'VN', age: 28 });
    expect(createInput.inputSnapshot).not.toHaveProperty('passportNumber');
    expect(createInput.inputSnapshot).not.toHaveProperty(
      'foreignRegistrationNumber',
    );
    expect(createInput.inputSnapshot).not.toHaveProperty('ocrRawText');
    expect(createInput.appliedRuleIds).toEqual([]);
  });

  it('does not call the engine when active rules are outside the selected release', async () => {
    const transactionClient = {
      visaJourneyAssessment: {
        create: jest
          .fn()
          .mockResolvedValue({ id: 12n, outcome: 'REVIEW_REQUIRED' }),
      },
      visaJourneyItem: { createMany: jest.fn() },
      visaJourney: { update: jest.fn() },
      visaJourneyAuditEvent: { create: jest.fn() },
    };
    const prismaMock = {
      visaJourney: {
        findFirstOrThrow: jest.fn().mockResolvedValue({
          id: 'journey-1',
          userId: 'user-1',
          targetVisaCode: 'E-7-1',
        }),
      },
      visaPolicyRelease: {
        findFirst: jest.fn().mockResolvedValue({
          id: 'release-1',
          version: '1',
          contentHash: 'hash',
          status: 'ACTIVE',
          reviewedAt: new Date(),
          effectiveFrom: new Date(),
        }),
        count: jest.fn().mockResolvedValue(0),
      },
      visaRule: {
        findMany: jest
          .fn()
          .mockResolvedValue([
            { id: 1n, version: 1, policyReleaseId: 'legacy-release' },
          ]),
      },
      $transaction: jest.fn(
        (operation: (tx: typeof transactionClient) => Promise<unknown>) =>
          operation(transactionClient),
      ),
    };
    const engineMock = {
      evaluateSingleVisa: jest.fn(),
      invalidateCache: jest.fn(),
    };
    const pathwayMock = { findActive: jest.fn(), seedItems: jest.fn() };
    const service = new VisaJourneyAssessmentService(
      prismaMock as unknown as AuthPrismaService,
      engineMock as unknown as RuleEngineService,
      pathwayMock as unknown as VisaJourneyPathwayService,
    );

    const result = await service.assess(
      'journey-1',
      'user-1',
      new CreateVisaAssessmentDto(),
    );

    expect(result.outcome).toBe('REVIEW_REQUIRED');
    expect(engineMock.evaluateSingleVisa).not.toHaveBeenCalled();
  });
});
