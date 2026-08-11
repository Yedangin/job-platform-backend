import * as matrixData from '../data/diagnosis-matrix.json';
import * as catalogData from '../data/diagnosis-requirements.json';
import { getRequirementCatalogAudit } from './diagnosis-requirement-evaluator';

const officialHosts = [
  'studyinkorea.go.kr',
  'visa.go.kr',
  'hrdkorea.or.kr',
  'eps.go.kr',
  'moj.go.kr',
  'moel.go.kr',
  'immigration.go.kr',
  'hikorea.go.kr',
  'law.go.kr',
  'investkorea.org',
  'oasisvisa.com',
  'mofa.go.kr',
];

describe('diagnosis requirement catalog integrity', () => {
  const catalog = catalogData as unknown as {
    version: string;
    reviewedAt: string;
    pathways: Record<
      string,
      Array<{
        id: string;
        stage: string;
        severity: string;
        sourceName: string;
        sourceUrl: string;
        evaluation: { type: string };
      }>
    >;
  };
  const matrix = matrixData as unknown as {
    pathways: Array<{ pathwayId: string }>;
  };

  it('covers every planner pathway with at least one rule', () => {
    for (const pathway of matrix.pathways) {
      expect(catalog.pathways[pathway.pathwayId]?.length).toBeGreaterThan(0);
    }
  });

  it('uses unique rule ids inside each pathway', () => {
    for (const rules of Object.values(catalog.pathways)) {
      expect(new Set(rules.map((rule) => rule.id)).size).toBe(rules.length);
    }
  });

  it('keeps D-8-1 investment and D-8-4 technology-startup rules separate', () => {
    expect(
      catalog.pathways['PW-011'].every((rule) => rule.stage === 'D-8-1'),
    ).toBe(true);
    expect(
      catalog.pathways['PW-016'].every((rule) => rule.stage === 'D-8-4'),
    ).toBe(true);
  });

  it('links every rule to an HTTPS official-source host', () => {
    for (const rules of Object.values(catalog.pathways)) {
      for (const rule of rules) {
        const url = new URL(rule.sourceUrl);
        expect(url.protocol).toBe('https:');
        expect(
          officialHosts.some(
            (host) =>
              url.hostname === host || url.hostname.endsWith(`.${host}`),
          ),
        ).toBe(true);
      }
    }
  });

  it('publishes an explicit automation audit instead of implying full coverage', () => {
    expect(getRequirementCatalogAudit()).toMatchObject({
      version: catalog.version,
      reviewedAt: catalog.reviewedAt,
      pathwayCount: 16,
      ruleCount: 82,
      automaticCount: 24,
      assistedCount: 6,
      manualCount: 52,
      automaticCoveragePercent: 29,
    });
  });
});
