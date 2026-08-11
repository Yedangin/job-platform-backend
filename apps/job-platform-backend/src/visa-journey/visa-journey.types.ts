import { Prisma } from 'generated/prisma-user';

export const VISA_JOURNEY_INCLUDE = {
  policyRelease: true,
  assessments: { orderBy: { createdAt: 'desc' as const }, take: 1 },
  items: { orderBy: [{ kind: 'asc' as const }, { sortOrder: 'asc' as const }] },
  expertCases: { orderBy: { createdAt: 'desc' as const } },
} satisfies Prisma.VisaJourneyInclude;

export type VisaJourneyRecord = Prisma.VisaJourneyGetPayload<{
  include: typeof VISA_JOURNEY_INCLUDE;
}>;

export interface JourneyRequirement {
  code: string;
  status: 'SATISFIED' | 'CONDITIONAL' | 'NOT_SATISFIED' | 'REVIEW_REQUIRED';
  message: string;
}

export interface SanitizedDecisionInput {
  [key: string]: string | number | boolean;
}
