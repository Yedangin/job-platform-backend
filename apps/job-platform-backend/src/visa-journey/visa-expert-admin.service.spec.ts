jest.mock('libs/common/src', () => ({
  AuthPrismaService: class AuthPrismaService {},
}));

import { BadRequestException } from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';
import { VisaExpertAdminService } from './visa-expert-admin.service';

describe('VisaExpertAdminService', () => {
  it('blocks application-agency assignment without immigration registration', async () => {
    const prisma = {
      visaExpertCase: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'case-1',
          journeyId: 'journey-1',
          status: 'REQUESTED',
          serviceType: 'APPLICATION_AGENCY',
          assignedExpertId: null,
        }),
      },
      visaExpertCredential: {
        findUnique: jest.fn().mockResolvedValue({
          status: 'VERIFIED',
          businessFilingVerifiedAt: new Date(),
          immigrationAgencyRegistrationVerifiedAt: null,
          validUntil: null,
        }),
      },
    };
    const service = new VisaExpertAdminService(
      prisma as unknown as AuthPrismaService,
    );

    await expect(
      service.assign('admin-1', 'case-1', {
        expertId: 'expert-1',
        reason: '대행 요청 배정',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('assigns a verified consultation case and writes the journey audit atomically', async () => {
    const assignedCase = {
      id: 'case-2',
      status: 'ASSIGNED',
      assignedExpertId: 'expert-2',
      serviceType: 'CONSULTATION',
    };
    const caseUpdate = jest.fn().mockResolvedValue({ count: 1 });
    const auditCreate = jest.fn().mockResolvedValue({ id: 1n });
    const tx = {
      visaExpertCase: {
        updateMany: caseUpdate,
        findUniqueOrThrow: jest.fn().mockResolvedValue(assignedCase),
      },
      visaJourneyAuditEvent: { create: auditCreate },
    };
    const prisma = {
      visaExpertCase: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'case-2',
          journeyId: 'journey-2',
          status: 'REQUESTED',
          serviceType: 'CONSULTATION',
          assignedExpertId: null,
        }),
      },
      visaExpertCredential: {
        findUnique: jest.fn().mockResolvedValue({
          status: 'VERIFIED',
          businessFilingVerifiedAt: new Date(),
          immigrationAgencyRegistrationVerifiedAt: null,
          validUntil: null,
        }),
      },
      $transaction: jest.fn(
        (operation: (client: typeof tx) => Promise<unknown>) => operation(tx),
      ),
    };
    const service = new VisaExpertAdminService(
      prisma as unknown as AuthPrismaService,
    );

    const result = await service.assign('admin-2', 'case-2', {
      expertId: 'expert-2',
      reason: '상담 요청 배정',
    });

    expect(result).toEqual({
      id: 'case-2',
      status: 'ASSIGNED',
      assignedExpertId: 'expert-2',
    });
    expect(auditCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        journeyId: 'journey-2',
        eventType: 'EXPERT_CASE_ASSIGNED',
        actorId: 'admin-2',
      }) as unknown,
    });
  });
});
