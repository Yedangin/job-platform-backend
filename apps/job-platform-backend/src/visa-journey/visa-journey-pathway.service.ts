import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma-user';
import { AuthPrismaService } from 'libs/common/src';

interface PathwayItem {
  code: string;
  title: string;
  description?: string;
  sortOrder?: number;
  sourceCitation: unknown;
  metadata?: unknown;
}

interface PathwayDefinition {
  remediationOptions: PathwayItem[];
  evidenceRequirements: PathwayItem[];
  procedureSteps: PathwayItem[];
}

interface PathwaySnapshot {
  releaseId: string;
  pathwayId: string;
  pathwayVersion: number;
}

@Injectable()
export class VisaJourneyPathwayService {
  constructor(private readonly prisma: AuthPrismaService) {}

  async findActive(
    policyReleaseId: string,
    currentVisaCode: string | null,
    targetVisaCode: string,
    locale: string,
  ) {
    if (currentVisaCode) {
      const exact = await this.prisma.visaPathwayDefinition.findFirst({
        where: {
          policyReleaseId,
          currentVisaCode,
          targetVisaCode,
          locale,
          status: 'ACTIVE',
        },
        orderBy: { version: 'desc' },
      });
      if (exact) return exact;
    }
    return this.prisma.visaPathwayDefinition.findFirst({
      where: {
        policyReleaseId,
        targetVisaCode,
        locale,
        status: 'ACTIVE',
        currentVisaCode: null,
      },
      orderBy: { version: 'desc' },
    });
  }

  async seedItems(
    tx: Prisma.TransactionClient,
    journeyId: string,
    definitionValue: Prisma.JsonValue,
    outcome: string,
    snapshot: PathwaySnapshot,
  ) {
    const definition = this.parseDefinition(definitionValue);
    if (!definition) return;
    const rows = [
      ...(outcome === 'ELIGIBLE'
        ? []
        : this.toRows(
            journeyId,
            'GAP_ACTION',
            definition.remediationOptions,
            snapshot,
          )),
      ...this.toRows(
        journeyId,
        'EVIDENCE',
        definition.evidenceRequirements,
        snapshot,
      ),
      ...this.toRows(
        journeyId,
        'PROCEDURE',
        definition.procedureSteps,
        snapshot,
      ),
    ];

    const currentItems = await tx.visaJourneyItem.findMany({
      where: { journeyId },
      select: { id: true, kind: true, sourceKey: true, status: true },
    });
    const currentKeys = new Set(
      rows.map((row) => `${row.kind}:${row.sourceKey}`),
    );

    for (const row of rows) {
      const existing = currentItems.find(
        (item) => item.kind === row.kind && item.sourceKey === row.sourceKey,
      );
      if (existing) {
        await tx.visaJourneyItem.update({
          where: { id: existing.id },
          data: {
            title: row.title,
            description: row.description,
            sortOrder: row.sortOrder,
            metadata: row.metadata,
            status: existing.status === 'NOT_APPLICABLE' ? 'TODO' : undefined,
          },
        });
      } else {
        await tx.visaJourneyItem.create({ data: row });
      }
    }

    const obsoleteIds = currentItems
      .filter((item) => !currentKeys.has(`${item.kind}:${item.sourceKey}`))
      .map((item) => item.id);
    if (obsoleteIds.length > 0) {
      await tx.visaJourneyItem.updateMany({
        where: { id: { in: obsoleteIds } },
        data: { status: 'NOT_APPLICABLE' },
      });
    }
  }

  private toRows(
    journeyId: string,
    kind: 'GAP_ACTION' | 'EVIDENCE' | 'PROCEDURE',
    items: PathwayItem[],
    snapshot: PathwaySnapshot,
  ) {
    return items.map((item, index) => ({
      journeyId,
      kind,
      sourceKey: item.code,
      title: item.title,
      description: item.description,
      sortOrder: item.sortOrder ?? index,
      metadata: this.toJson({
        requirementCode: item.code,
        requirementId: item.code,
        citations: [item.sourceCitation],
        generalGuidance: kind === 'GAP_ACTION',
        policyReleaseId: snapshot.releaseId,
        pathwayId: snapshot.pathwayId,
        pathwayVersion: snapshot.pathwayVersion,
        details: item.metadata ?? null,
      }),
    }));
  }

  private parseDefinition(value: Prisma.JsonValue): PathwayDefinition | null {
    if (!value || Array.isArray(value) || typeof value !== 'object')
      return null;
    const record = value as Record<string, unknown>;
    const remediationOptions = this.parseItems(record.remediationOptions);
    const evidenceRequirements = this.parseItems(record.evidenceRequirements);
    const procedureSteps = this.parseItems(record.procedureSteps);
    if (!remediationOptions || !evidenceRequirements || !procedureSteps)
      return null;
    return { remediationOptions, evidenceRequirements, procedureSteps };
  }

  private parseItems(value: unknown): PathwayItem[] | null {
    if (!Array.isArray(value)) return null;
    const items: PathwayItem[] = [];
    for (const candidate of value) {
      if (
        !candidate ||
        Array.isArray(candidate) ||
        typeof candidate !== 'object'
      )
        return null;
      const item = candidate as Record<string, unknown>;
      if (typeof item.code !== 'string' || typeof item.title !== 'string')
        return null;
      items.push({
        code: item.code,
        title: item.title,
        description:
          typeof item.description === 'string' ? item.description : undefined,
        sortOrder:
          typeof item.sortOrder === 'number' ? item.sortOrder : undefined,
        sourceCitation: item.sourceCitation ?? null,
        metadata: item.metadata,
      });
    }
    return items;
  }

  private toJson(value: unknown) {
    return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
  }
}
