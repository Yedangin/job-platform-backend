import { Injectable } from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';
import { sanitizeAssessmentInput } from '../visa-journey/visa-assessment-input';
import {
  VISA_JOURNEY_ENGINE_VERSION,
  VISA_LEGAL_NOTICE,
} from '../visa-journey/visa-journey.constants';
import {
  EvaluationResult,
  EvaluateVisaInput,
  RuleEngineService,
} from './rule-engine.service';

interface PolicyMetadata {
  releaseId: string;
  version: string;
  hash: string;
  asOf: string;
  effectiveFrom: string;
  reviewedAt: string;
  freshness: 'CURRENT' | 'UPCOMING_CHANGE';
}

export interface AuditedVisaEvaluation extends EvaluationResult {
  outcome: 'EVALUATED' | 'REVIEW_REQUIRED';
  policy: PolicyMetadata | null;
  disclaimer: string;
}

/**
 * 채용공고 판정도 회원 여정과 동일한 검토 완료 정책 릴리스로 제한한다.
 * Restricts job evaluations to the same reviewed policy release contract.
 */
@Injectable()
export class VisaPolicyEvaluationService {
  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly ruleEngine: RuleEngineService,
  ) {}

  async evaluate(input: EvaluateVisaInput): Promise<AuditedVisaEvaluation> {
    const startedAt = Date.now();
    const policyAsOf = new Date();
    const release = await this.prisma.visaPolicyRelease.findFirst({
      where: {
        domain: 'VISA_JOURNEY',
        status: 'ACTIVE',
        reviewedAt: { not: null },
        effectiveFrom: { lte: policyAsOf },
        OR: [{ effectiveTo: null }, { effectiveTo: { gte: policyAsOf } }],
      },
      orderBy: [{ effectiveFrom: 'desc' }, { createdAt: 'desc' }],
    });
    const [activeRules, activeVisaTypes, upcomingChanges] = await Promise.all([
      this.prisma.visaRule.findMany({
        where: {
          status: 'ACTIVE',
          effectiveFrom: { lte: policyAsOf },
          OR: [{ effectiveTo: null }, { effectiveTo: { gte: policyAsOf } }],
        },
        select: { id: true, visaTypeId: true, policyReleaseId: true },
        orderBy: { id: 'asc' },
      }),
      this.prisma.visaType.findMany({
        where: { isActive: true, parentCode: null },
        select: { id: true },
      }),
      this.prisma.visaPolicyRelease.count({
        where: {
          domain: 'VISA_JOURNEY',
          status: 'SCHEDULED',
          effectiveFrom: { gt: policyAsOf },
        },
      }),
    ]);
    const coveredVisaTypeIds = new Set(
      activeRules.map((rule) => rule.visaTypeId.toString()),
    );
    const releaseReady =
      Boolean(release) &&
      activeRules.length > 0 &&
      activeRules.every((rule) => rule.policyReleaseId === release?.id) &&
      activeVisaTypes.every((visaType) =>
        coveredVisaTypeIds.has(visaType.id.toString()),
      );

    if (!release || !releaseReady) {
      const result = this.reviewRequired(policyAsOf);
      await this.writeLog(input, result, [], startedAt);
      return result;
    }

    await this.ruleEngine.invalidateCache();
    const evaluated = await this.ruleEngine.evaluateVisaEligibility(
      input,
      false,
    );
    const expectedRuleIds = activeRules.map((rule) => rule.id.toString());
    if (!(await this.isRuleSetStable(expectedRuleIds, release.id))) {
      const result = this.reviewRequired(policyAsOf);
      await this.writeLog(input, result, [], startedAt);
      return result;
    }

    const result: AuditedVisaEvaluation = {
      ...evaluated,
      outcome: 'EVALUATED',
      policy: {
        releaseId: release.id,
        version: release.version,
        hash: release.contentHash,
        asOf: policyAsOf.toISOString(),
        effectiveFrom: release.effectiveFrom.toISOString(),
        reviewedAt: release.reviewedAt!.toISOString(),
        freshness: upcomingChanges > 0 ? 'UPCOMING_CHANGE' : 'CURRENT',
      },
      disclaimer: VISA_LEGAL_NOTICE.ko,
    };
    await this.writeLog(input, result, expectedRuleIds, startedAt);
    return result;
  }

  private reviewRequired(policyAsOf: Date): AuditedVisaEvaluation {
    return {
      eligibleVisas: [],
      blockedVisas: [],
      summary:
        '검토 완료된 정책 전체 규칙이 없어 확정 판정을 제공하지 않습니다. / Reviewed policy coverage is incomplete.',
      appliedRuleCount: 0,
      evaluatedAt: policyAsOf.toISOString(),
      outcome: 'REVIEW_REQUIRED',
      policy: null,
      disclaimer: VISA_LEGAL_NOTICE.ko,
    };
  }

  private async isRuleSetStable(
    expectedRuleIds: string[],
    expectedReleaseId: string,
  ) {
    const now = new Date();
    const current = await this.prisma.visaRule.findMany({
      where: {
        status: 'ACTIVE',
        effectiveFrom: { lte: now },
        OR: [{ effectiveTo: null }, { effectiveTo: { gte: now } }],
      },
      select: { id: true, policyReleaseId: true },
      orderBy: { id: 'asc' },
    });
    const actual = current.map((rule) => rule.id.toString()).sort();
    const expected = [...expectedRuleIds].sort();
    return (
      actual.length === expected.length &&
      actual.every((id, index) => id === expected[index]) &&
      current.every((rule) => rule.policyReleaseId === expectedReleaseId)
    );
  }

  private writeLog(
    input: EvaluateVisaInput,
    result: AuditedVisaEvaluation,
    appliedRuleIds: string[],
    startedAt: number,
  ) {
    return this.prisma.visaEvaluationLog.create({
      data: {
        requestData: JSON.stringify(sanitizeAssessmentInput(input)),
        eligibleVisas: JSON.stringify(result.eligibleVisas),
        blockedVisas: JSON.stringify(result.blockedVisas),
        appliedRuleIds: appliedRuleIds.join(','),
        durationMs: Date.now() - startedAt,
        outcome: result.outcome,
        engineVersion: VISA_JOURNEY_ENGINE_VERSION,
        policyReleaseId: result.policy?.releaseId,
        policyVersion: result.policy?.version,
        policyHash: result.policy?.hash,
        policyAsOf: result.policy
          ? new Date(result.policy.asOf)
          : new Date(result.evaluatedAt),
        policyEffectiveFrom: result.policy
          ? new Date(result.policy.effectiveFrom)
          : null,
        policyReviewedAt: result.policy
          ? new Date(result.policy.reviewedAt)
          : null,
      },
    });
  }
}
