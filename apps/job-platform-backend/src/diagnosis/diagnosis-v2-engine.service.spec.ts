import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

jest.mock('libs/common/src/common/prisma/auth/auth-prisma.service', () => ({
  AuthPrismaService: class AuthPrismaService {},
}));
jest.mock('../translation/translation.service', () => ({
  TranslationService: class TranslationService {},
}));
jest.mock('../visa-policy/visa-policy.service', () => ({
  VisaPolicyService: class VisaPolicyService {},
}));

import { DiagnosisV2EngineService } from './diagnosis-v2-engine.service';

describe('DiagnosisV2EngineService ownership and policy safety', () => {
  let service: DiagnosisV2EngineService;
  let prisma: any;
  let visaPolicy: any;
  const guestOwner = 'guest-owner-token-1234';

  beforeEach(() => {
    prisma = {
      diagnosisSession: {
        create: jest.fn().mockResolvedValue({ sessionId: 1n }),
        findUnique: jest.fn(),
        update: jest.fn().mockResolvedValue({}),
        findMany: jest.fn(),
        count: jest.fn(),
      },
      individualProfile: {
        findUnique: jest.fn(),
        update: jest.fn().mockResolvedValue({}),
      },
      diagnosisPathwayClick: {
        create: jest.fn(),
      },
    };

    const translation = {
      translateTexts: jest.fn(async (values: string[]) => values),
    };
    visaPolicy = {
      getApprovedEvidenceForVisaCodes: jest.fn().mockResolvedValue(new Map()),
    };

    service = new DiagnosisV2EngineService(
      prisma,
      translation as any,
      visaPolicy,
    );
  });

  describe('getSession', () => {
    const guestSession = {
      sessionId: 1n,
      userId: null,
      anonymousId: guestOwner,
    };

    it('rejects a lookup without a user or anonymous owner', async () => {
      await expect(service.getSession(1n)).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
      expect(prisma.diagnosisSession.findUnique).not.toHaveBeenCalled();
    });

    it('rejects a different anonymous owner', async () => {
      prisma.diagnosisSession.findUnique.mockResolvedValue(guestSession);

      await expect(
        service.getSession(1n, undefined, 'other-guest-token-1234'),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('allows only the matching anonymous owner', async () => {
      prisma.diagnosisSession.findUnique.mockResolvedValue(guestSession);

      const result = await service.getSession(1n, undefined, guestOwner);

      expect(result).toMatchObject({
        sessionId: 1,
        anonymousId: guestOwner,
      });
    });

    it('rejects a different signed-in user', async () => {
      prisma.diagnosisSession.findUnique.mockResolvedValue({
        ...guestSession,
        userId: 'user-owner',
        anonymousId: null,
      });

      await expect(service.getSession(1n, 'other-user')).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });
  });

  describe('claimSession', () => {
    it('rejects accounts without an individual profile', async () => {
      prisma.diagnosisSession.findUnique.mockResolvedValue({
        sessionId: 1n,
        userId: null,
        anonymousId: 'guest-owner',
      });
      prisma.individualProfile.findUnique.mockResolvedValue(null);

      await expect(
        service.claimSession(1n, 'corporate-user', guestOwner),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('rejects a claim without the original anonymous owner token', async () => {
      prisma.diagnosisSession.findUnique.mockResolvedValue({
        sessionId: 1n,
        userId: null,
        anonymousId: guestOwner,
      });
      prisma.individualProfile.findUnique.mockResolvedValue({
        authId: 'user-1',
      });

      await expect(service.claimSession(1n, 'user-1')).rejects.toBeInstanceOf(
        ConflictException,
      );
    });

    it('rejects a different anonymous owner token', async () => {
      prisma.diagnosisSession.findUnique.mockResolvedValue({
        sessionId: 1n,
        userId: null,
        anonymousId: guestOwner,
      });
      prisma.individualProfile.findUnique.mockResolvedValue({
        authId: 'user-1',
      });

      await expect(
        service.claimSession(1n, 'user-1', 'other-guest-token-1234'),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('returns an explicit idempotent result for the existing owner', async () => {
      prisma.diagnosisSession.findUnique.mockResolvedValue({
        sessionId: 1n,
        userId: 'user-1',
        anonymousId: guestOwner,
      });
      prisma.individualProfile.findUnique.mockResolvedValue({
        authId: 'user-1',
      });

      await expect(
        service.claimSession(1n, 'user-1', guestOwner),
      ).resolves.toEqual({
        sessionId: 1,
        saved: true,
        profileUpdated: false,
        reason: 'ALREADY_OWNED',
      });
      expect(prisma.diagnosisSession.update).not.toHaveBeenCalled();
    });
  });

  describe('diagnosis owner and evidence safety', () => {
    const input = {
      nationality: 'VNM',
      residenceCountry: 'VNM',
      age: 24,
      educationLevel: 'high_school',
      availableAnnualFund: 500,
      finalGoal: 'employment',
      priorityPreference: 'stability',
      language: 'en',
    };

    it('does not create an orphan guest session without an owner token', async () => {
      await expect(service.diagnose(input)).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
      expect(prisma.diagnosisSession.create).not.toHaveBeenCalled();
    });

    it('rejects a malformed anonymous owner token', async () => {
      await expect(
        service.diagnose(input, undefined, 'short'),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(prisma.diagnosisSession.create).not.toHaveBeenCalled();
    });

    it('keeps nationality scoring neutral and downgrades missing evidence', async () => {
      const result = await service.diagnose(
        {
          ...input,
        },
        undefined,
        guestOwner,
      );

      expect(result.pathways.length).toBeGreaterThan(0);
      expect(
        result.pathways.every(
          (pathway) => pathway.scoreBreakdown.nationalityMultiplier === 1,
        ),
      ).toBe(true);
      expect(result.meta).toMatchObject({
        policyStatus: 'REVIEW_REQUIRED',
        informationOnly: true,
        policyConfidence: {
          score: null,
          level: 'REVIEW_REQUIRED',
        },
      });
      expect(
        result.pathways.every(
          (pathway) =>
            pathway.policyStatus === 'REVIEW_REQUIRED' &&
            pathway.needsHumanReview &&
            pathway.policyEvidence.length === 0,
        ),
      ).toBe(true);
    });

    it('links only service-approved evidence without claiming legal eligibility', async () => {
      visaPolicy.getApprovedEvidenceForVisaCodes.mockImplementation(
        async (codes: string[]) =>
          new Map(
            codes.map((visaCode) => [
              visaCode,
              [
                {
                  visaCode,
                  sourceSite: 'law_go_kr',
                  sourceUrl: 'https://law.go.kr/example',
                  contentHash: 'a'.repeat(64),
                  effectiveDate: '2026-01-01T00:00:00.000Z',
                  reviewedAt: '2026-08-01T00:00:00.000Z',
                  ruleId: '10',
                  version: 2,
                },
              ],
            ]),
          ),
      );

      const result = await service.diagnose(input, undefined, guestOwner);

      expect(result.pathways.length).toBeGreaterThan(0);
      expect(
        result.pathways.every(
          (pathway) =>
            pathway.policyStatus === 'EVIDENCE_AVAILABLE' &&
            pathway.policyEvidence.length > 0 &&
            pathway.policyVersion,
        ),
      ).toBe(true);
      expect(result.meta.informationOnly).toBe(true);
      expect(result.meta.policyStatus).toBe('REVIEW_REQUIRED');
    });

    it('does not label high school, TOPIK 0, or H-1 minimum funds as strengths', async () => {
      const result = await service.diagnose(
        {
          ...input,
          nationality: 'JPN',
          residenceCountry: 'JPN',
          age: 24,
          educationLevel: 'high_school',
          availableAnnualFund: 300,
          topikLevel: 0,
          priorityPreference: 'speed',
          language: 'ko',
        },
        undefined,
        guestOwner,
      );

      const workingHoliday = result.pathways.find(
        (pathway) => pathway.pathwayId === 'PW-008',
      );
      expect(workingHoliday).toBeDefined();
      expect(workingHoliday?.strengths).not.toEqual(
        expect.arrayContaining([
          'education_match',
          'language_ready',
          'fund_ready',
        ]),
      );
      expect(
        workingHoliday?.requirementAssessments.find(
          (item) => item.id === 'h1_fund',
        ),
      ).toMatchObject({ status: 'minimum_met' });
      expect(workingHoliday?.requirementSummary.unknown).toBeGreaterThan(0);
      expect(workingHoliday).toMatchObject({
        readinessScore: 30,
        dataCompletenessScore: 30,
        requirementStatus: 'EVIDENCE_REQUIRED',
        scoreBreakdown: {
          requirementScore: 30,
          dataCompletenessScore: 30,
        },
      });
    });
  });

  describe('trackClick ownership', () => {
    it('rejects a guest click without the owner token before lookup', async () => {
      await expect(
        service.trackClick(1n, 'PW-003', 1, 'detail_view'),
      ).rejects.toBeInstanceOf(UnauthorizedException);
      expect(prisma.diagnosisSession.findUnique).not.toHaveBeenCalled();
      expect(prisma.diagnosisPathwayClick.create).not.toHaveBeenCalled();
    });

    it('rejects a click from a different anonymous owner', async () => {
      prisma.diagnosisSession.findUnique.mockResolvedValue({
        sessionId: 1n,
        userId: null,
        anonymousId: guestOwner,
      });

      await expect(
        service.trackClick(
          1n,
          'PW-003',
          1,
          'detail_view',
          undefined,
          'different-owner-token-1234',
        ),
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(prisma.diagnosisPathwayClick.create).not.toHaveBeenCalled();
    });

    it('records a click only for the matching anonymous owner', async () => {
      prisma.diagnosisSession.findUnique.mockResolvedValue({
        sessionId: 1n,
        userId: null,
        anonymousId: guestOwner,
      });
      prisma.diagnosisPathwayClick.create.mockResolvedValue({ clickId: 1n });

      await service.trackClick(
        1n,
        'PW-003',
        1,
        'detail_view',
        undefined,
        guestOwner,
      );

      expect(prisma.diagnosisPathwayClick.create).toHaveBeenCalledWith({
        data: {
          sessionId: 1n,
          pathwayId: 'PW-003',
          rankPosition: 1,
          actionType: 'detail_view',
        },
      });
    });
  });
});
