import { Injectable } from '@nestjs/common';
import { Prisma, VisaPolicyAuditAction } from 'generated/prisma-user';
import { AuthPrismaService } from 'libs/common/src';

type PolicyAuditClient = AuthPrismaService | Prisma.TransactionClient;

@Injectable()
export class VisaPolicyAuditService {
  constructor(private readonly prisma: AuthPrismaService) {}

  create(
    entityType: string,
    entityId: string,
    action: VisaPolicyAuditAction,
    beforeSnapshot: Prisma.InputJsonValue | null,
    afterSnapshot: Prisma.InputJsonValue | null,
    changeReason: string,
    actorId: string,
    policyReleaseId?: string,
    ruleId?: bigint,
    client: PolicyAuditClient = this.prisma,
  ) {
    return client.visaPolicyChangeAudit.create({
      data: {
        entityType,
        entityId,
        action,
        beforeSnapshot: beforeSnapshot ?? Prisma.JsonNull,
        afterSnapshot: afterSnapshot ?? Prisma.JsonNull,
        changeReason,
        actorId,
        policyReleaseId,
        ruleId,
      },
    });
  }

  releaseSnapshot(release: {
    id: string;
    version: string;
    status: string;
    contentHash: string;
    effectiveFrom: Date;
    effectiveTo: Date | null;
    reviewedBy: string | null;
    approvedBy: string | null;
  }) {
    return {
      id: release.id,
      version: release.version,
      status: release.status,
      contentHash: release.contentHash,
      effectiveFrom: release.effectiveFrom.toISOString(),
      effectiveTo: release.effectiveTo?.toISOString() ?? null,
      reviewedBy: release.reviewedBy,
      approvedBy: release.approvedBy,
    };
  }

  pathwaySnapshot(pathway: {
    id: string;
    version: number;
    status: string;
    currentVisaCode: string | null;
    targetVisaCode: string;
    definition: Prisma.JsonValue;
  }) {
    return {
      id: pathway.id,
      version: pathway.version,
      status: pathway.status,
      currentVisaCode: pathway.currentVisaCode,
      targetVisaCode: pathway.targetVisaCode,
      definition: pathway.definition,
    } as Prisma.InputJsonObject;
  }

  toJson(value: unknown) {
    return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
  }
}
