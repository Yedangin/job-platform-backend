import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  VisaJourneyItemKind,
  VisaJourneyStage,
} from 'generated/prisma-user';
import { AuthPrismaService } from 'libs/common/src';
import {
  CreateVisaExpertCaseDto,
  CreateVisaJourneyDto,
  UpdateVisaJourneyItemDto,
} from './dto';
import { presentVisaJourney } from './visa-journey.presenter';
import { VISA_JOURNEY_INCLUDE } from './visa-journey.types';

@Injectable()
export class VisaJourneyService {
  constructor(private readonly prisma: AuthPrismaService) {}

  async create(userId: string, dto: CreateVisaJourneyDto) {
    const now = new Date();
    const release = await this.prisma.visaPolicyRelease.findFirst({
      where: {
        domain: 'VISA_JOURNEY',
        status: 'ACTIVE',
        reviewedAt: { not: null },
        effectiveFrom: { lte: now },
        OR: [{ effectiveTo: null }, { effectiveTo: { gte: now } }],
      },
      orderBy: { effectiveFrom: 'desc' },
    });
    const upcoming = release
      ? await this.prisma.visaPolicyRelease.count({
          where: {
            domain: 'VISA_JOURNEY',
            status: 'SCHEDULED',
            effectiveFrom: { gt: now },
          },
        })
      : 0;
    const journey = await this.prisma.$transaction(async (tx) => {
      const created = await tx.visaJourney.create({
        data: {
          userId,
          targetVisaCode: dto.targetVisaCode.toUpperCase(),
          targetPathwayName: dto.targetPathwayName,
          currentVisaCode: dto.currentVisaCode?.toUpperCase(),
          targetApplicationDate: dto.targetApplicationDate
            ? new Date(dto.targetApplicationDate)
            : undefined,
          locale: dto.locale ?? 'ko',
          policyReleaseId: release?.id,
          policyFreshness: release
            ? upcoming > 0
              ? 'UPCOMING_CHANGE'
              : 'CURRENT'
            : 'MISSING',
        },
      });
      await tx.visaJourneyAuditEvent.create({
        data: {
          journeyId: created.id,
          eventType: 'JOURNEY_CREATED',
          entityType: 'VisaJourney',
          entityId: created.id,
          afterSnapshot: {
            targetVisaCode: created.targetVisaCode,
            currentVisaCode: created.currentVisaCode,
            policyReleaseId: created.policyReleaseId,
          },
          actorId: userId,
        },
      });
      return created;
    });
    return this.getMineById(userId, journey.id);
  }

  async listMine(userId: string) {
    const journeys = await this.prisma.visaJourney.findMany({
      where: { userId },
      include: VISA_JOURNEY_INCLUDE,
      orderBy: { updatedAt: 'desc' },
    });
    return journeys.map(presentVisaJourney);
  }

  async getMineById(userId: string, journeyId: string) {
    const journey = await this.prisma.visaJourney.findFirst({
      where: { id: journeyId, userId },
      include: VISA_JOURNEY_INCLUDE,
    });
    if (!journey) {
      throw new NotFoundException(
        '비자 여정을 찾을 수 없습니다. / Visa journey not found.',
      );
    }
    return presentVisaJourney(journey);
  }

  async updateItem(
    userId: string,
    journeyId: string,
    itemId: string,
    dto: UpdateVisaJourneyItemDto,
  ) {
    const item = await this.prisma.visaJourneyItem.findFirst({
      where: { id: itemId, journeyId, journey: { userId } },
    });
    if (!item)
      throw new NotFoundException(
        '여정 작업을 찾을 수 없습니다. / Journey item not found.',
      );

    await this.prisma.$transaction(async (tx) => {
      await tx.visaJourneyItem.update({
        where: { id: itemId },
        data: { status: dto.status },
      });
      const nextStage = await this.resolveNextStage(tx, journeyId, item.kind);
      if (nextStage) {
        await tx.visaJourney.update({
          where: { id: journeyId },
          data: { currentStage: nextStage },
        });
      }
      await tx.visaJourneyAuditEvent.create({
        data: {
          journeyId,
          eventType: 'ITEM_STATUS_CHANGED',
          entityType: 'VisaJourneyItem',
          entityId: itemId,
          beforeSnapshot: { status: item.status },
          afterSnapshot: { status: dto.status, nextStage: nextStage ?? null },
          actorId: userId,
        },
      });
    });
    return this.getMineById(userId, journeyId);
  }

  async createExpertCase(
    userId: string,
    journeyId: string,
    dto: CreateVisaExpertCaseDto,
  ) {
    if (!dto.consentToShare) {
      throw new BadRequestException(
        '자료 제공 동의 후 행정사 연결을 요청할 수 있습니다. / Consent is required.',
      );
    }
    await this.assertOwned(userId, journeyId);
    await this.prisma.$transaction(async (tx) => {
      const expertCase = await tx.visaExpertCase.create({
        data: {
          journeyId,
          serviceType: dto.serviceType,
          question: dto.question,
          consentToShare: true,
          consentedAt: new Date(),
          createdBy: userId,
        },
      });
      await tx.visaJourneyAuditEvent.create({
        data: {
          journeyId,
          eventType: 'EXPERT_CASE_REQUESTED',
          entityType: 'VisaExpertCase',
          entityId: expertCase.id,
          afterSnapshot: {
            serviceType: expertCase.serviceType,
            status: expertCase.status,
          },
          actorId: userId,
        },
      });
    });
    return this.getMineById(userId, journeyId);
  }

  /** 대행 배정 전에 호출하는 자격 게이트 / Credential gate before agency assignment */
  async assertCanReceiveAgencyCase(expertId: string): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const credential = await this.prisma.visaExpertCredential.findFirst({
      where: {
        expertId,
        status: 'VERIFIED',
        businessFilingVerifiedAt: { not: null },
        immigrationAgencyRegistrationVerifiedAt: { not: null },
        OR: [{ validUntil: null }, { validUntil: { gte: today } }],
      },
      select: { id: true },
    });
    if (!credential) {
      throw new BadRequestException(
        '유효한 행정사·출입국민원 대행 등록 확인이 필요합니다. / Valid agency credentials are required.',
      );
    }
  }

  private async assertOwned(userId: string, journeyId: string) {
    const journey = await this.prisma.visaJourney.findFirst({
      where: { id: journeyId, userId },
      select: { id: true },
    });
    if (!journey)
      throw new NotFoundException(
        '비자 여정을 찾을 수 없습니다. / Visa journey not found.',
      );
  }

  private async resolveNextStage(
    tx: Prisma.TransactionClient,
    journeyId: string,
    kind: VisaJourneyItemKind,
  ): Promise<VisaJourneyStage | null> {
    const remaining = await tx.visaJourneyItem.count({
      where: {
        journeyId,
        kind,
        status: { notIn: ['COMPLETED', 'NOT_APPLICABLE'] },
      },
    });
    if (remaining > 0) return null;
    const stages: Record<VisaJourneyItemKind, VisaJourneyStage> = {
      GAP_ACTION: 'EVIDENCE_PREPARATION',
      EVIDENCE: 'SELF_PROCEDURE',
      PROCEDURE: 'COMPLETED',
    };
    return stages[kind];
  }
}
