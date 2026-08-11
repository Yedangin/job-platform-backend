import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';
import {
  CreateReleaseVisaRuleDto,
  CreateVisaPolicyReleaseDto,
  UpdateVisaPolicyReleaseDto,
  UpsertVisaPathwayDto,
  VerifyVisaExpertCredentialDto,
} from './dto';
import { VisaPolicyAuditService } from './visa-policy-audit.service';

@Injectable()
export class VisaPolicyDraftService {
  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly audit: VisaPolicyAuditService,
  ) {}

  async createRelease(actorId: string, dto: CreateVisaPolicyReleaseDto) {
    return this.prisma.$transaction(async (tx) => {
      const release = await tx.visaPolicyRelease.create({
        data: {
          name: dto.name,
          version: dto.version,
          contentHash: dto.contentHash,
          effectiveFrom: new Date(dto.effectiveFrom),
          effectiveTo: dto.effectiveTo ? new Date(dto.effectiveTo) : null,
          createdBy: actorId,
        },
      });
      await this.audit.create(
        'VisaPolicyRelease',
        release.id,
        'CREATED',
        null,
        this.audit.releaseSnapshot(release),
        dto.reason,
        actorId,
        release.id,
        undefined,
        tx,
      );
      return release;
    });
  }

  async updateRelease(
    actorId: string,
    id: string,
    dto: UpdateVisaPolicyReleaseDto,
  ) {
    const release = await this.getDraftRelease(id);
    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.visaPolicyRelease.update({
        where: { id },
        data: {
          name: dto.name,
          contentHash: dto.contentHash,
          effectiveFrom: dto.effectiveFrom
            ? new Date(dto.effectiveFrom)
            : undefined,
          effectiveTo: dto.effectiveTo ? new Date(dto.effectiveTo) : undefined,
        },
      });
      await this.audit.create(
        'VisaPolicyRelease',
        id,
        'UPDATED',
        this.audit.releaseSnapshot(release),
        this.audit.releaseSnapshot(updated),
        dto.reason,
        actorId,
        id,
        undefined,
        tx,
      );
      return updated;
    });
  }

  async createPathway(
    actorId: string,
    releaseId: string,
    dto: UpsertVisaPathwayDto,
  ) {
    await this.getDraftRelease(releaseId);
    return this.prisma.$transaction(async (tx) => {
      const pathway = await tx.visaPathwayDefinition.create({
        data: {
          policyReleaseId: releaseId,
          currentVisaCode: dto.currentVisaCode?.toUpperCase(),
          targetVisaCode: dto.targetVisaCode.toUpperCase(),
          name: dto.name,
          locale: dto.locale ?? 'ko',
          definition: this.audit.toJson(dto.definition),
          createdBy: actorId,
        },
      });
      await this.audit.create(
        'VisaPathwayDefinition',
        pathway.id,
        'CREATED',
        null,
        this.audit.pathwaySnapshot(pathway),
        dto.reason,
        actorId,
        releaseId,
        undefined,
        tx,
      );
      return pathway;
    });
  }

  async updatePathway(
    actorId: string,
    pathwayId: string,
    dto: UpsertVisaPathwayDto,
  ) {
    const pathway = await this.prisma.visaPathwayDefinition.findUnique({
      where: { id: pathwayId },
    });
    if (!pathway)
      throw new NotFoundException(
        '비자 경로를 찾을 수 없습니다. / Pathway not found.',
      );
    await this.getDraftRelease(pathway.policyReleaseId);
    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.visaPathwayDefinition.update({
        where: { id: pathwayId },
        data: {
          currentVisaCode: dto.currentVisaCode?.toUpperCase(),
          targetVisaCode: dto.targetVisaCode.toUpperCase(),
          name: dto.name,
          locale: dto.locale ?? 'ko',
          definition: this.audit.toJson(dto.definition),
          version: { increment: 1 },
          updatedBy: actorId,
        },
      });
      await this.audit.create(
        'VisaPathwayDefinition',
        pathwayId,
        'UPDATED',
        this.audit.pathwaySnapshot(pathway),
        this.audit.pathwaySnapshot(updated),
        dto.reason,
        actorId,
        pathway.policyReleaseId,
        undefined,
        tx,
      );
      return updated;
    });
  }

  async createRule(
    actorId: string,
    releaseId: string,
    dto: CreateReleaseVisaRuleDto,
  ) {
    const release = await this.getDraftRelease(releaseId);
    const visaType = await this.prisma.visaType.findUnique({
      where: { code: dto.visaTypeCode.toUpperCase() },
    });
    if (!visaType)
      throw new NotFoundException(
        '비자 유형을 찾을 수 없습니다. / Visa type not found.',
      );
    return this.prisma.$transaction(async (tx) => {
      const rule = await tx.visaRule.create({
        data: {
          policyReleaseId: releaseId,
          visaTypeId: visaType.id,
          ruleName: dto.ruleName,
          ruleDescription: dto.ruleDescription,
          priority: dto.priority ?? 100,
          ruleType: dto.ruleType,
          conditions: JSON.stringify(dto.conditions),
          actions: JSON.stringify(dto.actions),
          status: 'DRAFT',
          effectiveFrom: release.effectiveFrom,
          effectiveTo: release.effectiveTo,
          createdBy: actorId,
        },
      });
      await this.audit.create(
        'VisaRule',
        rule.id.toString(),
        'CREATED',
        null,
        {
          id: rule.id.toString(),
          visaTypeCode: visaType.code,
          version: rule.version,
          status: rule.status,
          policyReleaseId: releaseId,
        },
        dto.reason,
        actorId,
        releaseId,
        rule.id,
        tx,
      );
      return { id: rule.id.toString(), status: rule.status };
    });
  }

  async verifyCredential(actorId: string, dto: VerifyVisaExpertCredentialDto) {
    if (actorId === dto.expertId)
      throw new ForbiddenException(
        '본인의 행정사 자격을 직접 확인할 수 없습니다.',
      );
    return this.prisma.$transaction(async (tx) => {
      const data = {
        expertId: dto.expertId,
        qualificationType: dto.qualificationType,
        qualificationNumberMasked: dto.qualificationNumberMasked,
        businessFilingVerifiedAt: new Date(dto.businessFilingVerifiedAt),
        immigrationAgencyRegistrationVerifiedAt:
          dto.immigrationAgencyRegistrationVerifiedAt
            ? new Date(dto.immigrationAgencyRegistrationVerifiedAt)
            : null,
        validUntil: dto.validUntil ? new Date(dto.validUntil) : null,
        status: 'VERIFIED' as const,
        verifiedBy: actorId,
      };
      const credential = await tx.visaExpertCredential.upsert({
        where: { expertId: dto.expertId },
        create: data,
        update: data,
      });
      await this.audit.create(
        'VisaExpertCredential',
        credential.id,
        'APPROVED',
        null,
        {
          expertId: credential.expertId,
          status: credential.status,
          businessFilingVerifiedAt:
            credential.businessFilingVerifiedAt?.toISOString() ?? null,
          immigrationAgencyRegistrationVerifiedAt:
            credential.immigrationAgencyRegistrationVerifiedAt?.toISOString() ??
            null,
          validUntil: credential.validUntil?.toISOString() ?? null,
        },
        dto.reason,
        actorId,
        undefined,
        undefined,
        tx,
      );
      return {
        id: credential.id,
        expertId: credential.expertId,
        status: credential.status,
      };
    });
  }

  private async getDraftRelease(id: string) {
    const release = await this.prisma.visaPolicyRelease.findUnique({
      where: { id },
    });
    if (!release)
      throw new NotFoundException(
        '정책 릴리스를 찾을 수 없습니다. / Release not found.',
      );
    if (release.status !== 'DRAFT')
      throw new ForbiddenException('초안 릴리스만 수정할 수 있습니다.');
    return release;
  }
}
