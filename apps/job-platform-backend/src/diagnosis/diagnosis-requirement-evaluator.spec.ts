import {
  assessPathwayRequirements,
  getH1AgeLimit,
  scoreRequirements,
  summarizeRequirements,
} from './diagnosis-requirement-evaluator';

const baseInput = {
  nationality: 'JPN',
  residenceCountry: 'JPN',
  age: 24,
  educationLevel: 'high_school',
  availableAnnualFund: 300,
  topikLevel: 0,
  kiipStage: 0,
  workExperienceYears: 0,
};

describe('diagnosis requirement evaluator', () => {
  it('treats H-1 KRW 3M as a minimum boundary, not an advantage', () => {
    const assessments = assessPathwayRequirements(
      'PW-008',
      baseInput,
      { epsCountry: false, whCountry: true },
      'ko',
    );

    expect(assessments.find((item) => item.id === 'h1_fund')).toMatchObject({
      status: 'minimum_met',
      currentValue: '3,000,000원',
    });
    expect(assessments.find((item) => item.id === 'h1_language')).toMatchObject(
      {
        status: 'not_applicable',
        currentValue: 'TOPIK 0급 - 공통 필수 커트라인 아님',
      },
    );
    expect(
      assessments.find((item) => item.id === 'h1_insurance'),
    ).toMatchObject({ status: 'unknown' });
    expect(
      assessments.find((item) => item.id === 'h1_return_ticket'),
    ).toMatchObject({ status: 'unknown' });

    const summary = summarizeRequirements(assessments);
    expect(summary).toMatchObject({
      minimumMet: 1,
      unknown: 5,
      notApplicable: 1,
    });
  });

  it('uses the 2026/27 nationality-specific H-1 age table', () => {
    expect(getH1AgeLimit('JPN')).toEqual({ min: 18, max: 25 });
    expect(getH1AgeLimit('CAN')).toEqual({ min: 18, max: 35 });
    expect(getH1AgeLimit('USA')).toEqual({ min: 18, max: 30 });
  });

  it('does not confuse general TOPIK with EPS-TOPIK', () => {
    const assessments = assessPathwayRequirements(
      'PW-006',
      { ...baseInput, nationality: 'VNM' },
      { epsCountry: true, whCountry: false },
      'ko',
    );

    expect(
      assessments.find((item) => item.id === 'e9_eps_topik'),
    ).toMatchObject({ status: 'unknown' });
  });

  it('applies the official EPS-TOPIK age ceiling of 39 to Philippine applicants', () => {
    const assessments = assessPathwayRequirements(
      'PW-006',
      { ...baseInput, nationality: 'PHL', age: 39 },
      { epsCountry: true, whCountry: false },
      'ko',
    );

    expect(
      assessments.find((item) => item.id === 'e9_eligibility'),
    ).toMatchObject({ status: 'met' });
  });

  it('shows exact TOPIK and investment shortfalls when the input is below a cutline', () => {
    const regional = assessPathwayRequirements('PW-013', baseInput, null, 'ko');
    expect(regional.find((item) => item.id === 'f2r_language')).toMatchObject({
      status: 'unmet',
      shortfall: 'TOPIK 4급까지 4단계 또는 KIIP 4단계까지 4단계 부족',
    });

    const investment = assessPathwayRequirements(
      'PW-011',
      baseInput,
      null,
      'ko',
    );
    expect(
      investment.find((item) => item.id === 'd81_investment'),
    ).toMatchObject({ status: 'unmet', shortfall: '97,000,000원 부족' });
  });

  it('marks high school with no related experience below the direct E-7 qualification paths', () => {
    const assessments = assessPathwayRequirements(
      'PW-009',
      baseInput,
      null,
      'ko',
    );
    expect(
      assessments.find((item) => item.id === 'e71_qualification'),
    ).toMatchObject({
      status: 'unmet',
      shortfall: '관련 경력 5년 경로 기준 5년 부족',
    });
  });

  it('shows direct-study TOPIK and finance shortfalls instead of a generic match', () => {
    const assessments = assessPathwayRequirements(
      'PW-005',
      baseInput,
      null,
      'ko',
    );

    expect(
      assessments.find((item) => item.id === 'd2_education'),
    ).toMatchObject({ status: 'minimum_met' });
    expect(assessments.find((item) => item.id === 'd2_language')).toMatchObject(
      {
        status: 'unmet',
        shortfall: '최소 TOPIK 3급까지 3단계 부족',
      },
    );
    expect(assessments.find((item) => item.id === 'd2_funds')).toMatchObject({
      status: 'unmet',
      shortfall: '비수도권 공개 기본선까지 13,000,000원 부족',
    });
  });

  it('scores only requirements confirmed by the entered profile', () => {
    const assessments = assessPathwayRequirements(
      'PW-008',
      baseInput,
      { epsCountry: false, whCountry: true },
      'ko',
    );

    expect(scoreRequirements(assessments)).toEqual({
      score: 30,
      completenessScore: 30,
      status: 'EVIDENCE_REQUIRED',
      requiredMet: 2,
      requiredUnmet: 0,
      requiredUnknown: 4,
      applicableRuleCount: 7,
    });
  });

  it('does not award points for unmet or unknown D-2 requirements', () => {
    const assessments = assessPathwayRequirements(
      'PW-005',
      baseInput,
      null,
      'ko',
    );

    expect(scoreRequirements(assessments)).toMatchObject({
      score: 19,
      completenessScore: 44,
      status: 'PREPARATION_REQUIRED',
      requiredMet: 1,
      requiredUnknown: 3,
    });
  });
});
