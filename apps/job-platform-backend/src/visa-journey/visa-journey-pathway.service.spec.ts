jest.mock('libs/common/src', () => ({
  AuthPrismaService: class AuthPrismaService {},
}));

import { Prisma } from 'generated/prisma-user';
import { AuthPrismaService } from 'libs/common/src';
import { VisaJourneyPathwayService } from './visa-journey-pathway.service';

describe('VisaJourneyPathwayService', () => {
  it('updates current items and deactivates items removed by a new policy snapshot', async () => {
    const service = new VisaJourneyPathwayService(
      {} as unknown as AuthPrismaService,
    );
    const tx = {
      visaJourneyItem: {
        findMany: jest.fn().mockResolvedValue([
          {
            id: 'current-gap',
            kind: 'GAP_ACTION',
            sourceKey: 'GAP-1',
            status: 'NOT_APPLICABLE',
          },
          {
            id: 'obsolete-step',
            kind: 'PROCEDURE',
            sourceKey: 'OLD-STEP',
            status: 'TODO',
          },
        ]),
        update: jest.fn().mockResolvedValue({}),
        create: jest.fn().mockResolvedValue({}),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
    };
    const citation = {
      title: 'Official source',
      url: 'https://example.go.kr/policy',
      clause: 'Article 1',
      effectiveFrom: '2026-08-01',
    };

    await service.seedItems(
      tx as unknown as Prisma.TransactionClient,
      'journey-1',
      {
        remediationOptions: [
          { code: 'GAP-1', title: 'Updated action', sourceCitation: citation },
        ],
        evidenceRequirements: [
          { code: 'DOC-1', title: 'Evidence', sourceCitation: citation },
        ],
        procedureSteps: [
          { code: 'STEP-1', title: 'Procedure', sourceCitation: citation },
        ],
      },
      'CONDITIONAL',
      { releaseId: 'release-2', pathwayId: 'pathway-2', pathwayVersion: 2 },
    );

    expect(tx.visaJourneyItem.update).toHaveBeenCalledWith({
      where: { id: 'current-gap' },
      data: {
        title: 'Updated action',
        description: undefined,
        sortOrder: 0,
        metadata: {
          requirementCode: 'GAP-1',
          requirementId: 'GAP-1',
          citations: [citation],
          generalGuidance: true,
          policyReleaseId: 'release-2',
          pathwayId: 'pathway-2',
          pathwayVersion: 2,
          details: null,
        },
        status: 'TODO',
      },
    });
    expect(tx.visaJourneyItem.updateMany).toHaveBeenCalledWith({
      where: { id: { in: ['obsolete-step'] } },
      data: { status: 'NOT_APPLICABLE' },
    });
    expect(tx.visaJourneyItem.create).toHaveBeenCalledTimes(2);
  });
});
