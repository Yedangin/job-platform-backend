import { Injectable } from '@nestjs/common';
import {
  Prisma,
  VisaAssessmentOutcome,
  VisaPolicyFreshness,
} from 'generated/prisma-user';
import { AuthPrismaService } from 'libs/common/src';
import { RuleEngineService } from '../visa-rules/rule-engine.service';
import { CreateVisaAssessmentDto } from './dto';
import {
  findMissingAssessmentInputs,
  sanitizeAssessmentInput,
  toJourneyRequirements,
  toLegacyEngineInput,
} from './visa-assessment-input';
import { VISA_JOURNEY_ENGINE_VERSION } from './visa-journey.constants';
import { VisaJourneyPathwayService } from './visa-journey-pathway.service';
import { JourneyRequirement } from './visa-journey.types';

interface AssessmentContext {
  outcome: VisaAssessmentOutcome;
  requirements: JourneyRequirement[];
  output: Prisma.InputJsonValue;
  missingInputs: string[];
}

@Injectable()
export class VisaJourneyAssessmentService {
  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly ruleEngine: RuleEngineService,
    private readonly pathwayService: VisaJourneyPathwayService,
  ) {}

  async assess(
    journeyId: string,
    userId: string,
    dto: CreateVisaAssessmentDto,
  ) {
    const journey = await this.prisma.visaJourney.findFirstOrThrow({
      where: { id: journeyId, userId },
    });
    // 일반 회원은 서버 현재시각의 ACTIVE 정책으로만 판정한다.
    // Member assessments only use the ACTIVE policy at server time.
    const policyAsOf = new Date();
    const release = await this.findApplicableRelease(policyAsOf);
    const activeTargetRules = release
      ? await this.prisma.visaRule.findMany({
          where: {
            status: 'ACTIVE',
            effectiveFrom: { lte: policyAsOf },
            OR: [{ effectiveTo: null }, { effectiveTo: { gte: policyAsOf } }],
            visaType: { code: journey.targetVisaCode },
          },
          select: { id: true, version: true, policyReleaseId: true },
          orderBy: [{ priority: 'asc' }, { id: 'asc' }],
        })
      : [];
    const isReleaseScoped =
      Boolean(release) &&
      activeTargetRules.length > 0 &&
      activeTargetRules.every((rule) => rule.policyReleaseId === release?.id);
    const pathway = release
      ? await this.pathwayService.findActive(
          release.id,
          journey.currentVisaCode,
          journey.targetVisaCode,
          journey.locale,
        )
      : null;
    const isJourneyDefinitionReady = isReleaseScoped && Boolean(pathway);
    const rules = isJourneyDefinitionReady ? activeTargetRules : [];
    const missingInputs = findMissingAssessmentInputs(dto);
    const resolvedFreshness = await this.resolveFreshness(release, policyAsOf);
    const freshness: VisaPolicyFreshness = !release
      ? 'MISSING'
      : !release.reviewedAt
        ? 'UNDER_REVIEW'
        : !isJourneyDefinitionReady
          ? 'CONFLICT'
          : resolvedFreshness;
    const result = await this.evaluateSafely(
      journey.targetVisaCode,
      dto,
      Boolean(release?.reviewedAt),
      isJourneyDefinitionReady,
      missingInputs,
      rules.map((rule) => rule.id.toString()),
    );
    const inputSnapshot = sanitizeAssessmentInput(dto);

    const assessment = await this.prisma.$transaction(async (tx) => {
      const created = await tx.visaJourneyAssessment.create({
        data: {
          journeyId,
          outcome: result.outcome,
          inputSnapshot,
          outputSnapshot: result.output,
          requirements: result.requirements as unknown as Prisma.InputJsonValue,
          missingInputs,
          appliedRuleIds: rules.map((rule) => rule.id.toString()),
          appliedRuleVersions: [
            ...rules.map((rule) => ({
              ruleId: rule.id.toString(),
              version: rule.version,
            })),
            ...(release
              ? [
                  {
                    component: 'STRATEGY_EVALUATOR_AND_MASTER_DATA',
                    version: VISA_JOURNEY_ENGINE_VERSION,
                    policyHash: release.contentHash,
                  },
                ]
              : []),
          ],
          engineVersion: VISA_JOURNEY_ENGINE_VERSION,
          policyReleaseId: release?.id,
          policyVersion: release?.version,
          policyHash: release?.contentHash,
          policyAsOf,
          policyEffectiveFrom: release?.effectiveFrom,
          policyReviewedAt: release?.reviewedAt,
          createdBy: userId,
        },
      });
      if (
        pathway &&
        ['ELIGIBLE', 'CONDITIONAL', 'INELIGIBLE'].includes(result.outcome)
      ) {
        await this.pathwayService.seedItems(
          tx,
          journeyId,
          pathway.definition,
          result.outcome,
          {
            releaseId: release!.id,
            pathwayId: pathway.id,
            pathwayVersion: pathway.version,
          },
        );
      }
      await tx.visaJourney.update({
        where: { id: journeyId },
        data: {
          policyReleaseId: release?.id ?? null,
          policyFreshness: freshness,
          currentStage: this.nextStage(result.outcome),
        },
      });
      await tx.visaJourneyAuditEvent.create({
        data: {
          journeyId,
          eventType: 'ASSESSMENT_CREATED',
          entityType: 'VisaJourneyAssessment',
          entityId: created.id.toString(),
          afterSnapshot: {
            outcome: result.outcome,
            policyReleaseId: release?.id ?? null,
            policyAsOf: policyAsOf.toISOString(),
            engineVersion: VISA_JOURNEY_ENGINE_VERSION,
          },
          actorId: userId,
        },
      });
      return created;
    });
    return { id: assessment.id.toString(), outcome: assessment.outcome };
  }

  private async findApplicableRelease(asOf: Date) {
    return this.prisma.visaPolicyRelease.findFirst({
      where: {
        domain: 'VISA_JOURNEY',
        status: 'ACTIVE',
        effectiveFrom: { lte: asOf },
        OR: [{ effectiveTo: null }, { effectiveTo: { gte: asOf } }],
      },
      orderBy: [{ effectiveFrom: 'desc' }, { createdAt: 'desc' }],
    });
  }

  private async resolveFreshness(
    release: Awaited<
      ReturnType<VisaJourneyAssessmentService['findApplicableRelease']>
    >,
    asOf: Date,
  ): Promise<VisaPolicyFreshness> {
    if (!release) return 'MISSING';
    if (!release.reviewedAt) return 'UNDER_REVIEW';
    const upcoming = await this.prisma.visaPolicyRelease.count({
      where: {
        domain: 'VISA_JOURNEY',
        status: 'SCHEDULED',
        effectiveFrom: { gt: asOf },
      },
    });
    return upcoming > 0 ? 'UPCOMING_CHANGE' : 'CURRENT';
  }

  private async evaluateSafely(
    targetVisaCode: string,
    dto: CreateVisaAssessmentDto,
    isReviewed: boolean,
    isReleaseScoped: boolean,
    missingInputs: string[],
    expectedRuleIds: string[],
  ): Promise<AssessmentContext> {
    if (!isReviewed || !isReleaseScoped) return this.reviewRequired();
    if (missingInputs.length > 0) {
      return {
        outcome: 'INSUFFICIENT_DATA',
        requirements: [],
        output: { message: 'Required assessment inputs are missing.' },
        missingInputs,
      };
    }
    // 전역 캐시를 비워 검증한 ACTIVE 규칙 집합과 엔진 입력을 일치시킨다.
    // Clear the cache so the engine reads the validated ACTIVE rule set.
    await this.ruleEngine.invalidateCache();
    const evaluated = await this.ruleEngine.evaluateSingleVisa(
      toLegacyEngineInput(dto),
      targetVisaCode,
    );
    if (!(await this.isRuleSetStable(targetVisaCode, expectedRuleIds))) {
      return this.reviewRequired();
    }
    const requirements = toJourneyRequirements(evaluated);
    const outcome: VisaAssessmentOutcome = !evaluated.eligible
      ? 'INELIGIBLE'
      : evaluated.restrictions.length > 0
        ? 'CONDITIONAL'
        : 'ELIGIBLE';
    return {
      outcome,
      requirements,
      output: JSON.parse(JSON.stringify(evaluated)) as Prisma.InputJsonValue,
      missingInputs: [],
    };
  }

  private reviewRequired(): AssessmentContext {
    return {
      outcome: 'REVIEW_REQUIRED',
      requirements: [
        {
          code: 'POLICY_NOT_VERIFIED',
          status: 'REVIEW_REQUIRED',
          message:
            '적용 가능한 검토 완료 정책 또는 규칙이 없습니다. / No reviewed policy rule is available.',
        },
      ],
      output: {
        message: 'Policy verification is required before a definitive result.',
      },
      missingInputs: [],
    };
  }

  /** 검증-실행 사이 규칙 변경을 탐지 / Detect rule changes between validation and execution */
  private async isRuleSetStable(
    targetVisaCode: string,
    expectedRuleIds: string[],
  ) {
    const now = new Date();
    const current = await this.prisma.visaRule.findMany({
      where: {
        status: 'ACTIVE',
        effectiveFrom: { lte: now },
        OR: [{ effectiveTo: null }, { effectiveTo: { gte: now } }],
        visaType: { code: targetVisaCode },
      },
      select: { id: true },
      orderBy: { id: 'asc' },
    });
    const actual = current.map((rule) => rule.id.toString()).sort();
    return (
      actual.length === expectedRuleIds.length &&
      actual.every((id, index) => id === [...expectedRuleIds].sort()[index])
    );
  }

  private nextStage(outcome: VisaAssessmentOutcome) {
    if (outcome === 'ELIGIBLE' || outcome === 'CONDITIONAL')
      return 'EVIDENCE_PREPARATION' as const;
    if (outcome === 'INELIGIBLE') return 'CONDITION_ROADMAP' as const;
    return 'ASSESSMENT' as const;
  }
}
