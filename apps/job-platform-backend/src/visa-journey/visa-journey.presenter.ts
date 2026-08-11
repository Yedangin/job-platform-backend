import { VISA_LEGAL_NOTICE } from './visa-journey.constants';
import { VisaJourneyRecord } from './visa-journey.types';

/** API용 비자 여정 표현으로 변환 / Present a visa journey for API clients */
export function presentVisaJourney(journey: VisaJourneyRecord) {
  const latest = journey.assessments[0] ?? null;
  const item = (entry: VisaJourneyRecord['items'][number]) => ({
    id: entry.id,
    title: entry.title,
    description: entry.description,
    status: entry.status,
    assignee: entry.assignee,
    dueAt: entry.dueAt?.toISOString() ?? null,
    metadata: entry.metadata,
  });

  return {
    id: journey.id,
    currentVisaCode: journey.currentVisaCode,
    targetVisaCode: journey.targetVisaCode,
    targetPathwayName: journey.targetPathwayName,
    currentStage: journey.currentStage,
    targetApplicationDate: journey.targetApplicationDate?.toISOString() ?? null,
    locale: journey.locale,
    policy: {
      releaseId: latest?.policyReleaseId ?? journey.policyReleaseId,
      version: latest?.policyVersion ?? journey.policyRelease?.version ?? null,
      hash: latest?.policyHash ?? journey.policyRelease?.contentHash ?? null,
      asOf: latest?.policyAsOf.toISOString() ?? null,
      effectiveFrom:
        latest?.policyEffectiveFrom?.toISOString() ??
        journey.policyRelease?.effectiveFrom.toISOString() ??
        null,
      reviewedAt:
        latest?.policyReviewedAt?.toISOString() ??
        journey.policyRelease?.reviewedAt?.toISOString() ??
        null,
      freshness: journey.policyFreshness,
    },
    latestAssessment: latest
      ? {
          id: latest.id.toString(),
          outcome: latest.outcome,
          inputs: latest.inputSnapshot,
          requirements: latest.requirements,
          missingInputs: latest.missingInputs,
          evaluatedAt: latest.createdAt.toISOString(),
          engineVersion: latest.engineVersion,
        }
      : null,
    gapActions: journey.items
      .filter((entry) => entry.kind === 'GAP_ACTION')
      .map(item),
    evidenceItems: journey.items
      .filter((entry) => entry.kind === 'EVIDENCE')
      .map(item),
    procedureSteps: journey.items
      .filter((entry) => entry.kind === 'PROCEDURE')
      .map(item),
    expertCases: journey.expertCases.map((expertCase) => ({
      id: expertCase.id,
      serviceType: expertCase.serviceType,
      status: expertCase.status,
      question: expertCase.question,
      consentedAt: expertCase.consentedAt?.toISOString() ?? null,
      createdAt: expertCase.createdAt.toISOString(),
    })),
    legalNotice: VISA_LEGAL_NOTICE,
    createdAt: journey.createdAt.toISOString(),
    updatedAt: journey.updatedAt.toISOString(),
  };
}
