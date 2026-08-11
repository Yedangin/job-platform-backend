import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { VisaExpertCredential } from 'generated/prisma-user';
import { AuthPrismaService } from 'libs/common/src';
import { AssignVisaExpertCaseDto } from './dto';

@Injectable()
export class VisaExpertAdminService {
  constructor(private readonly prisma: AuthPrismaService) {}

  async listCases() {
    const rows = await this.prisma.visaExpertCase.findMany({
      include: {
        journey: {
          select: {
            targetVisaCode: true,
            currentVisaCode: true,
            currentStage: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return rows.map((row) => ({
      id: row.id,
      journeyId: row.journeyId,
      serviceType: row.serviceType,
      status: row.status,
      question: row.question,
      assignedExpertId: row.assignedExpertId,
      consentedAt: row.consentedAt?.toISOString() ?? null,
      createdAt: row.createdAt.toISOString(),
      journey: row.journey,
    }));
  }

  async listCredentials() {
    const rows = await this.prisma.visaExpertCredential.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 200,
    });
    return rows.map((row) => ({
      id: row.id,
      expertId: row.expertId,
      qualificationType: row.qualificationType,
      qualificationNumberMasked: row.qualificationNumberMasked,
      status: row.status,
      businessFilingVerifiedAt:
        row.businessFilingVerifiedAt?.toISOString() ?? null,
      immigrationAgencyRegistrationVerifiedAt:
        row.immigrationAgencyRegistrationVerifiedAt?.toISOString() ?? null,
      validUntil: row.validUntil?.toISOString() ?? null,
      verifiedBy: row.verifiedBy,
      updatedAt: row.updatedAt.toISOString(),
    }));
  }

  async assign(actorId: string, caseId: string, dto: AssignVisaExpertCaseDto) {
    const expertCase = await this.prisma.visaExpertCase.findUnique({
      where: { id: caseId },
    });
    if (!expertCase)
      throw new NotFoundException(
        '행정사 연결 요청을 찾을 수 없습니다. / Expert case not found.',
      );
    if (expertCase.status !== 'REQUESTED')
      throw new BadRequestException(
        '요청 상태의 사건만 배정할 수 있습니다. / Only requested cases can be assigned.',
      );

    const credential = await this.prisma.visaExpertCredential.findUnique({
      where: { expertId: dto.expertId },
    });
    this.assertCredential(credential, expertCase.serviceType);

    const updated = await this.prisma.$transaction(async (tx) => {
      const claimed = await tx.visaExpertCase.updateMany({
        where: { id: caseId, status: 'REQUESTED', assignedExpertId: null },
        data: { assignedExpertId: dto.expertId, status: 'ASSIGNED' },
      });
      if (claimed.count !== 1)
        throw new BadRequestException(
          '다른 관리자가 이미 사건을 배정했습니다. 현황을 새로고침하세요.',
        );
      const assigned = await tx.visaExpertCase.findUniqueOrThrow({
        where: { id: caseId },
      });
      await tx.visaJourneyAuditEvent.create({
        data: {
          journeyId: expertCase.journeyId,
          eventType: 'EXPERT_CASE_ASSIGNED',
          entityType: 'VisaExpertCase',
          entityId: caseId,
          beforeSnapshot: {
            status: expertCase.status,
            assignedExpertId: expertCase.assignedExpertId,
          },
          afterSnapshot: {
            status: assigned.status,
            assignedExpertId: assigned.assignedExpertId,
            serviceType: assigned.serviceType,
            assignmentReason: dto.reason,
          },
          actorId,
        },
      });
      return assigned;
    });
    return {
      id: updated.id,
      status: updated.status,
      assignedExpertId: updated.assignedExpertId,
    };
  }

  private assertCredential(
    credential: VisaExpertCredential | null,
    serviceType: string,
  ) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const baseValid =
      credential?.status === 'VERIFIED' &&
      Boolean(credential.businessFilingVerifiedAt) &&
      (!credential.validUntil || credential.validUntil >= today);
    if (!baseValid)
      throw new BadRequestException(
        '유효한 행정사 자격과 업무신고 확인이 필요합니다.',
      );
    if (
      serviceType === 'APPLICATION_AGENCY' &&
      !credential.immigrationAgencyRegistrationVerifiedAt
    )
      throw new BadRequestException(
        '신청 대행에는 출입국민원 대행등록 확인이 필요합니다.',
      );
  }
}
