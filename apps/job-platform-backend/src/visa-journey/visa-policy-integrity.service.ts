import { BadRequestException, Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { Prisma } from 'generated/prisma-user';
import { AuthPrismaService } from 'libs/common/src';

type IntegrityClient = AuthPrismaService | Prisma.TransactionClient;

@Injectable()
export class VisaPolicyIntegrityService {
  constructor(private readonly prisma: AuthPrismaService) {}

  async computeReleaseHash(
    releaseId: string,
    client: IntegrityClient = this.prisma,
  ) {
    const [rules, pathways] = await Promise.all([
      client.visaRule.findMany({
        where: { policyReleaseId: releaseId },
        select: {
          id: true,
          visaTypeId: true,
          ruleName: true,
          priority: true,
          ruleType: true,
          conditions: true,
          actions: true,
          version: true,
          effectiveFrom: true,
          effectiveTo: true,
        },
        orderBy: { id: 'asc' },
      }),
      client.visaPathwayDefinition.findMany({
        where: { policyReleaseId: releaseId },
        select: {
          id: true,
          currentVisaCode: true,
          targetVisaCode: true,
          locale: true,
          version: true,
          definition: true,
        },
        orderBy: { id: 'asc' },
      }),
    ]);
    const snapshot = {
      rules: rules.map((rule) => ({
        ...rule,
        id: rule.id.toString(),
        visaTypeId: rule.visaTypeId.toString(),
        conditions: JSON.parse(rule.conditions) as unknown,
        actions: JSON.parse(rule.actions) as unknown,
        effectiveFrom: rule.effectiveFrom.toISOString(),
        effectiveTo: rule.effectiveTo?.toISOString() ?? null,
      })),
      pathways,
    };
    return createHash('sha256')
      .update(this.canonicalStringify(snapshot))
      .digest('hex');
  }

  async assertReleaseHash(
    releaseId: string,
    expectedHash: string,
    client: IntegrityClient = this.prisma,
  ) {
    const actualHash = await this.computeReleaseHash(releaseId, client);
    if (actualHash !== expectedHash) {
      throw new BadRequestException(
        '정책 내용이 검토 후 변경되었습니다. 다시 검토해야 합니다. / Policy content hash mismatch.',
      );
    }
  }

  private canonicalStringify(value: unknown): string {
    return JSON.stringify(this.sortValue(value));
  }

  private sortValue(value: unknown): unknown {
    if (Array.isArray(value)) return value.map((item) => this.sortValue(item));
    if (!value || typeof value !== 'object') return value;
    const record = value as Record<string, unknown>;
    return Object.fromEntries(
      Object.keys(record)
        .sort()
        .map((key) => [key, this.sortValue(record[key])]),
    );
  }
}
