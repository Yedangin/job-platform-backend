import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';
import { VisaJourneyAuditQueryDto } from './dto';

@Injectable()
export class VisaJourneyAdminService {
  constructor(private readonly prisma: AuthPrismaService) {}

  async overview() {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [
      activeRelease,
      stages,
      outcomes,
      assessments24h,
      expertQueue,
      freshness,
    ] = await Promise.all([
      this.prisma.visaPolicyRelease.findFirst({
        where: { domain: 'VISA_JOURNEY', status: 'ACTIVE' },
        orderBy: { effectiveFrom: 'desc' },
      }),
      this.prisma.visaJourney.groupBy({
        by: ['currentStage'],
        _count: { _all: true },
      }),
      this.prisma.visaJourneyAssessment.groupBy({
        by: ['outcome'],
        _count: { _all: true },
      }),
      this.prisma.visaJourneyAssessment.count({
        where: { createdAt: { gte: since } },
      }),
      this.prisma.visaExpertCase.count({
        where: {
          status: {
            in: ['REQUESTED', 'ASSIGNED', 'IN_PROGRESS', 'WAITING_FOR_USER'],
          },
        },
      }),
      this.prisma.visaJourney.groupBy({
        by: ['policyFreshness'],
        _count: { _all: true },
      }),
    ]);
    return {
      generatedAt: new Date().toISOString(),
      activeRelease: activeRelease
        ? {
            id: activeRelease.id,
            version: activeRelease.version,
            hash: activeRelease.contentHash,
            effectiveFrom: activeRelease.effectiveFrom.toISOString(),
            reviewedAt: activeRelease.reviewedAt?.toISOString() ?? null,
          }
        : null,
      journeyStages: Object.fromEntries(
        stages.map((row) => [row.currentStage, row._count._all]),
      ),
      assessmentOutcomes: Object.fromEntries(
        outcomes.map((row) => [row.outcome, row._count._all]),
      ),
      assessmentsLast24Hours: assessments24h,
      openExpertCases: expertQueue,
      policyFreshness: Object.fromEntries(
        freshness.map((row) => [row.policyFreshness, row._count._all]),
      ),
    };
  }

  async decisionLogs(query: VisaJourneyAuditQueryDto) {
    const where = query.targetVisaCode
      ? { journey: { targetVisaCode: query.targetVisaCode.toUpperCase() } }
      : {};
    const [rows, total] = await Promise.all([
      this.prisma.visaJourneyAssessment.findMany({
        where,
        select: {
          id: true,
          journeyId: true,
          outcome: true,
          engineVersion: true,
          policyReleaseId: true,
          policyVersion: true,
          policyHash: true,
          policyAsOf: true,
          policyEffectiveFrom: true,
          policyReviewedAt: true,
          appliedRuleIds: true,
          appliedRuleVersions: true,
          createdAt: true,
          journey: { select: { targetVisaCode: true, currentStage: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.visaJourneyAssessment.count({ where }),
    ]);
    return {
      data: rows.map((row) => ({ ...row, id: row.id.toString() })),
      meta: { total, page: query.page, limit: query.limit },
      privacy:
        'Input snapshots and direct user identifiers are not exposed by this endpoint.',
    };
  }

  async ruleChanges(query: VisaJourneyAuditQueryDto) {
    const [rows, total] = await Promise.all([
      this.prisma.visaPolicyChangeAudit.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.visaPolicyChangeAudit.count(),
    ]);
    return {
      data: rows.map((row) => ({
        ...row,
        id: row.id.toString(),
        ruleId: row.ruleId?.toString() ?? null,
      })),
      meta: { total, page: query.page, limit: query.limit },
    };
  }

  async affectedJourneys() {
    const active = await this.prisma.visaPolicyRelease.findFirst({
      where: { domain: 'VISA_JOURNEY', status: 'ACTIVE' },
      select: { id: true },
    });
    const rows = await this.prisma.visaJourney.findMany({
      where: {
        OR: [
          {
            policyFreshness: {
              in: ['MISSING', 'UNDER_REVIEW', 'STALE', 'CONFLICT'],
            },
          },
          ...(active ? [{ policyReleaseId: { not: active.id } }] : []),
        ],
      },
      select: {
        id: true,
        targetVisaCode: true,
        currentStage: true,
        policyReleaseId: true,
        policyFreshness: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
      take: 500,
    });
    return { activeReleaseId: active?.id ?? null, data: rows };
  }

  async releaseGates() {
    const releases = await this.prisma.visaPolicyRelease.findMany({
      include: { _count: { select: { rules: true, pathways: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return releases.map((release) => {
      const blockers = [
        ...(release._count.rules === 0 ? ['NO_RULES'] : []),
        ...(release._count.pathways === 0 ? ['NO_PATHWAYS'] : []),
        ...(!release.reviewedBy || !release.reviewedAt
          ? ['EXPERT_REVIEW_MISSING']
          : []),
        ...(!release.approvedBy || !release.approvedAt
          ? ['RELEASE_APPROVAL_MISSING']
          : []),
      ];
      return {
        id: release.id,
        name: release.name,
        version: release.version,
        status: release.status,
        effectiveFrom: release.effectiveFrom.toISOString(),
        ruleCount: release._count.rules,
        pathwayCount: release._count.pathways,
        blockers,
        canActivate: release.status === 'SCHEDULED' && blockers.length === 0,
      };
    });
  }

  async pathways() {
    return this.prisma.visaPathwayDefinition.findMany({
      select: {
        id: true,
        policyReleaseId: true,
        currentVisaCode: true,
        targetVisaCode: true,
        name: true,
        locale: true,
        version: true,
        status: true,
        definition: true,
        updatedAt: true,
      },
      orderBy: [{ targetVisaCode: 'asc' }, { version: 'desc' }],
    });
  }
}
