export interface ApprovedPolicyEvidence {
  visaCode: string;
  sourceSite: string;
  sourceUrl: string;
  contentHash: string;
  effectiveDate: string | null;
  reviewedAt: string;
  ruleId: string;
  version: number;
}

export interface ApprovedPolicyEvidenceResult {
  visaCode: string;
  asOf: string;
  evidence: ApprovedPolicyEvidence[];
}
