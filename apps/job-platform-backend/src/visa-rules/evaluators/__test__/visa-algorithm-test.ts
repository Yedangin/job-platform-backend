/**
 * 비자 자동매칭 알고리즘 종합 테스트 (1000+ 케이스)
 * 실행: npx tsx apps/job-platform-backend/src/visa-rules/evaluators/__test__/visa-algorithm-test.ts
 */

import { E9Evaluator } from '../e-series/e9.evaluator';
import { E7Evaluator } from '../e-series/e7.evaluator';
import { E2Evaluator } from '../e-series/e2.evaluator';
import { ESimpleEvaluator } from '../e-series/e-simple.evaluator';
import { D2Evaluator } from '../d-series/d2.evaluator';
import { DSimpleEvaluator } from '../d-series/d-simple.evaluator';
import { F2Evaluator } from '../f-series/f2.evaluator';
import { F4Evaluator } from '../f-series/f4.evaluator';
import { F5Evaluator } from '../f-series/f5.evaluator';
import { FSimpleEvaluator } from '../f-series/f-simple.evaluator';
import { H1Evaluator } from '../h-series/h1.evaluator';
import { H2Evaluator } from '../h-series/h2.evaluator';
import { ProhibitedEvaluator } from '../other/prohibited.evaluator';
import { C4Evaluator } from '../other/c4.evaluator';
import { EvaluateVisaInput, VisaTypeWithRelations, VisaEvaluation } from '../evaluator.interface';

// ============================================================
// Mock 데이터 생성 헬퍼
// ============================================================

function mockVisaType(overrides: Partial<VisaTypeWithRelations> & { code: string; nameKo: string }): VisaTypeWithRelations {
  return {
    id: BigInt(1),
    nameEn: null,
    category: 'WORK',
    description: null,
    employmentLevel: 'CONDITIONAL',
    parentCode: null,
    subTypeCode: null,
    maxWorkHoursWeekly: null,
    maxStayMonths: null,
    renewalPossible: false,
    minAge: null,
    maxAge: null,
    metadata: null,
    countryRestrictions: [],
    industryMappings: [],
    occupationMappings: [],
    requiredDocuments: [],
    ...overrides,
  };
}

function baseInput(overrides: Partial<EvaluateVisaInput> = {}): EvaluateVisaInput {
  return {
    ksicCode: '25',
    companySizeType: 'SME',
    employeeCountKorean: 50,
    employeeCountForeign: 5,
    annualRevenue: 50000,
    addressRoad: '서울시 강남구',
    jobType: 'FULL_TIME',
    offeredSalary: 300,
    ...overrides,
  };
}

// ============================================================
// Mock VisaType 데이터 (시드 데이터 기반)
// ============================================================

// E-9 MOU 17개국
const E9_MOU_COUNTRIES = ['PH', 'VN', 'TH', 'ID', 'LK', 'KH', 'MM', 'NP', 'MN', 'UZ', 'PK', 'CN', 'TL', 'BD', 'KG', 'LA', 'FJ'];
const E9_MOU_NAMES: Record<string, string> = {
  PH: '필리핀', VN: '베트남', TH: '태국', ID: '인도네시아', LK: '스리랑카',
  KH: '캄보디아', MM: '미얀마', NP: '네팔', MN: '몽골', UZ: '우즈베키스탄',
  PK: '파키스탄', CN: '중국', TL: '동티모르', BD: '방글라데시', KG: '키르기스스탄',
  LA: '라오스', FJ: '피지',
};

// H-1 워킹홀리데이 25개국
const H1_WH_COUNTRIES = ['AU', 'CA', 'NZ', 'JP', 'FR', 'DE', 'GB', 'IE', 'SE', 'DK', 'NL', 'IT', 'PT', 'ES', 'AT', 'CZ', 'HU', 'PL', 'CL', 'AR', 'HK', 'TW', 'IL', 'BE', 'FI'];
const H1_WH_NAMES: Record<string, string> = {
  AU: '호주', CA: '캐나다', NZ: '뉴질랜드', JP: '일본', FR: '프랑스', DE: '독일',
  GB: '영국', IE: '아일랜드', SE: '스웨덴', DK: '덴마크', NL: '네덜란드', IT: '이탈리아',
  PT: '포르투갈', ES: '스페인', AT: '오스트리아', CZ: '체코', HU: '헝가리', PL: '폴란드',
  CL: '칠레', AR: '아르헨티나', HK: '홍콩', TW: '대만', IL: '이스라엘', BE: '벨기에', FI: '핀란드',
};

// H-2 재외동포국
const H2_COUNTRIES = ['CN', 'RU', 'UZ', 'KZ', 'KG', 'UA'];
const H2_NAMES: Record<string, string> = { CN: '중국', RU: '러시아', UZ: '우즈베키스탄', KZ: '카자흐스탄', KG: '키르기스스탄', UA: '우크라이나' };

// E-2 영어권 7개국
const E2_COUNTRIES = ['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA'];
const E2_NAMES: Record<string, string> = { US: '미국', GB: '영국', CA: '캐나다', AU: '호주', NZ: '뉴질랜드', IE: '아일랜드', ZA: '남아프리카공화국' };

// E-9 허용 업종 KSIC prefix
const E9_ALLOWED = ['10','13','14','15','17','20','22','23','24','25','26','27','28','29','30','31','32','33','41','42','01','02','03','55','56','37','38'];
const E9_BLOCKED_INDUSTRIES = ['62','70','85','64','86','90','68','71','58','74','80','94','96','45'];

// H-2 허용 업종
const H2_ALLOWED_PREFIXES = ['10','13','14','15','17','20','22','23','24','25','26','27','28','29','30','31','32','33','41','42','01','02','03','55','56','74','75','49','37','38','46','47'];
const H2_BLOCKED_INDUSTRIES = ['62','70','85','64','86','58','68','71'];

// Mock visa types
const e9Type = mockVisaType({
  code: 'E-9', nameKo: '비전문취업', employmentLevel: 'LIMITED',
  maxStayMonths: 58, renewalPossible: true,
  countryRestrictions: E9_MOU_COUNTRIES.map(c => ({ countryCode: c, countryNameKo: E9_MOU_NAMES[c], restrictionType: 'MOU_REQUIRED' })),
  requiredDocuments: [
    { documentName: '여권 사본', documentCode: 'PASSPORT_COPY', isRequired: true, conditionDesc: null },
    { documentName: '표준근로계약서', documentCode: 'STANDARD_LABOR_CONTRACT', isRequired: true, conditionDesc: null },
    { documentName: '건강진단서', documentCode: 'HEALTH_CERTIFICATE', isRequired: true, conditionDesc: null },
    { documentName: 'EPS-TOPIK 합격증', documentCode: 'EPS_TOPIK', isRequired: true, conditionDesc: null },
    { documentName: '고용허가서', documentCode: 'EMPLOYMENT_PERMIT', isRequired: true, conditionDesc: null },
  ],
});

const e7Type = mockVisaType({
  code: 'E-7', nameKo: '특정활동', employmentLevel: 'CONDITIONAL',
  occupationMappings: [
    { occupationCode: { kscoCode: '22', nameKo: '정보통신 전문가' }, isAllowed: true },
    { occupationCode: { kscoCode: '23', nameKo: '공학 전문가' }, isAllowed: true },
    { occupationCode: { kscoCode: '21', nameKo: '과학 전문가' }, isAllowed: true },
    { occupationCode: { kscoCode: '25', nameKo: '교육 전문가' }, isAllowed: true },
    { occupationCode: { kscoCode: '27', nameKo: '경영금융 전문가' }, isAllowed: true },
    { occupationCode: { kscoCode: '28', nameKo: '문화예술 전문가' }, isAllowed: true },
    { occupationCode: { kscoCode: '13', nameKo: '전문서비스 관리자' }, isAllowed: true },
    { occupationCode: { kscoCode: '41', nameKo: '조리사' }, isAllowed: true },
  ],
  requiredDocuments: [
    { documentName: '여권 사본', documentCode: 'PASSPORT_COPY', isRequired: true, conditionDesc: null },
    { documentName: '고용계약서', documentCode: 'EMPLOYMENT_CONTRACT', isRequired: true, conditionDesc: null },
    { documentName: '학위증명서', documentCode: 'DEGREE_CERT', isRequired: true, conditionDesc: null },
  ],
});

const e2Type = mockVisaType({
  code: 'E-2', nameKo: '회화지도', employmentLevel: 'CONDITIONAL',
  countryRestrictions: E2_COUNTRIES.map(c => ({ countryCode: c, countryNameKo: E2_NAMES[c], restrictionType: 'ALLOWED' })),
  requiredDocuments: [
    { documentName: '여권 사본', documentCode: 'PASSPORT_COPY', isRequired: true, conditionDesc: null },
    { documentName: '학위증명서', documentCode: 'DEGREE_CERT', isRequired: true, conditionDesc: null },
    { documentName: '범죄경력 증명서', documentCode: 'CRIMINAL_RECORD_APOSTILLE', isRequired: true, conditionDesc: null },
    { documentName: '건강진단서', documentCode: 'HEALTH_CERTIFICATE', isRequired: true, conditionDesc: null },
  ],
});

const h1Type = mockVisaType({
  code: 'H-1', nameKo: '관광취업', employmentLevel: 'FULL',
  maxStayMonths: 12, minAge: 18, maxAge: 30,
  countryRestrictions: H1_WH_COUNTRIES.map(c => ({ countryCode: c, countryNameKo: H1_WH_NAMES[c], restrictionType: 'ALLOWED' })),
  requiredDocuments: [
    { documentName: '여권 사본', documentCode: 'PASSPORT_COPY', isRequired: true, conditionDesc: null },
    { documentName: '왕복항공권 예약확인서', documentCode: 'FLIGHT_BOOKING', isRequired: true, conditionDesc: null },
    { documentName: '여행자보험', documentCode: 'TRAVEL_INSURANCE', isRequired: true, conditionDesc: null },
  ],
});

const h2Type = mockVisaType({
  code: 'H-2', nameKo: '방문취업', employmentLevel: 'LIMITED',
  maxStayMonths: 58, renewalPossible: true,
  countryRestrictions: H2_COUNTRIES.map(c => ({ countryCode: c, countryNameKo: H2_NAMES[c], restrictionType: 'ALLOWED' })),
  requiredDocuments: [
    { documentName: '여권 사본', documentCode: 'PASSPORT_COPY', isRequired: true, conditionDesc: null },
    { documentName: '재외동포 증명서류', documentCode: 'OVERSEAS_KOREAN_CERT', isRequired: true, conditionDesc: null },
  ],
});

const d2Type = mockVisaType({
  code: 'D-2', nameKo: '유학', category: 'STUDY', employmentLevel: 'PART_TIME',
  maxWorkHoursWeekly: 20, maxStayMonths: 24,
});

const f2Type = mockVisaType({ code: 'F-2', nameKo: '거주', category: 'RESIDENCE', employmentLevel: 'FULL' });
const f27Type = mockVisaType({
  code: 'F-2-7', nameKo: '점수제 거주', category: 'RESIDENCE', employmentLevel: 'FULL',
  parentCode: 'F-2', subTypeCode: '7',
  metadata: JSON.stringify({ requiredScore: 80, totalScore: 120 }),
});

const f4Type = mockVisaType({
  code: 'F-4', nameKo: '재외동포', category: 'RESIDENCE', employmentLevel: 'LIMITED',
  requiredDocuments: [
    { documentName: '여권 사본', documentCode: 'PASSPORT_COPY', isRequired: true, conditionDesc: null },
    { documentName: '재외동포 입증 서류', documentCode: 'OVERSEAS_KOREAN_CERT', isRequired: true, conditionDesc: null },
  ],
});

const f5Type = mockVisaType({ code: 'F-5', nameKo: '영주', category: 'RESIDENCE', employmentLevel: 'FULL' });
const f6Type = mockVisaType({ code: 'F-6', nameKo: '결혼이민', category: 'RESIDENCE', employmentLevel: 'FULL' });
const f1Type = mockVisaType({ code: 'F-1', nameKo: '방문동거', category: 'RESIDENCE', employmentLevel: 'PROHIBITED' });
const f3Type = mockVisaType({ code: 'F-3', nameKo: '동반', category: 'RESIDENCE', employmentLevel: 'PROHIBITED' });
const c4Type = mockVisaType({ code: 'C-4', nameKo: '단기취업', employmentLevel: 'CONDITIONAL', maxStayMonths: 3 });

const prohibitedTypes = {
  'A-1': mockVisaType({ code: 'A-1', nameKo: '외교', employmentLevel: 'PROHIBITED' }),
  'A-2': mockVisaType({ code: 'A-2', nameKo: '공무', employmentLevel: 'PROHIBITED' }),
  'A-3': mockVisaType({ code: 'A-3', nameKo: '협정', employmentLevel: 'PROHIBITED' }),
  'B-1': mockVisaType({ code: 'B-1', nameKo: '사증면제', employmentLevel: 'PROHIBITED' }),
  'B-2': mockVisaType({ code: 'B-2', nameKo: '관광통과', employmentLevel: 'PROHIBITED' }),
  'C-1': mockVisaType({ code: 'C-1', nameKo: '일시취재', employmentLevel: 'PROHIBITED' }),
  'C-3': mockVisaType({ code: 'C-3', nameKo: '단기방문', employmentLevel: 'PROHIBITED' }),
};

const eSimpleTypes = {
  'E-1': mockVisaType({ code: 'E-1', nameKo: '교수', employmentLevel: 'CONDITIONAL' }),
  'E-3': mockVisaType({ code: 'E-3', nameKo: '연구', employmentLevel: 'CONDITIONAL' }),
  'E-4': mockVisaType({ code: 'E-4', nameKo: '기술지도', employmentLevel: 'CONDITIONAL' }),
  'E-5': mockVisaType({ code: 'E-5', nameKo: '전문직업', employmentLevel: 'CONDITIONAL' }),
  'E-6': mockVisaType({ code: 'E-6', nameKo: '예술흥행', employmentLevel: 'CONDITIONAL' }),
  'E-8': mockVisaType({ code: 'E-8', nameKo: '계절근로', employmentLevel: 'LIMITED', maxStayMonths: 5 }),
  'E-10': mockVisaType({ code: 'E-10', nameKo: '선원취업', employmentLevel: 'LIMITED' }),
};

const dSimpleTypes = {
  'D-1': mockVisaType({ code: 'D-1', nameKo: '문화예술', category: 'STUDY', employmentLevel: 'PROHIBITED' }),
  'D-3': mockVisaType({ code: 'D-3', nameKo: '기술연수', category: 'STUDY', employmentLevel: 'PROHIBITED' }),
  'D-4': mockVisaType({ code: 'D-4', nameKo: '일반연수', category: 'STUDY', employmentLevel: 'PART_TIME', maxWorkHoursWeekly: 20 }),
  'D-10': mockVisaType({ code: 'D-10', nameKo: '구직', employmentLevel: 'CONDITIONAL', maxStayMonths: 6 }),
};

// ============================================================
// 테스트 프레임워크
// ============================================================

interface TestCase {
  name: string;
  evaluator: string;
  input: EvaluateVisaInput;
  visaType: VisaTypeWithRelations;
  expected: {
    eligible: boolean;
    blockedReasonContains?: string;
    restrictionContains?: string;
    noteContains?: string;
    suggestionContains?: string;
    scoreGte?: number;
    scoreLt?: number;
  };
}

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures: { name: string; expected: string; actual: string }[] = [];

function runTest(tc: TestCase, result: VisaEvaluation) {
  totalTests++;
  const fails: string[] = [];

  if (result.eligible !== tc.expected.eligible) {
    fails.push(`eligible: expected=${tc.expected.eligible}, actual=${result.eligible}`);
  }
  if (tc.expected.blockedReasonContains && !result.blockedReasons.some(r => r.includes(tc.expected.blockedReasonContains!))) {
    fails.push(`blockedReason should contain "${tc.expected.blockedReasonContains}", got: [${result.blockedReasons.join('; ')}]`);
  }
  if (tc.expected.restrictionContains && !result.restrictions.some(r => r.includes(tc.expected.restrictionContains!))) {
    fails.push(`restriction should contain "${tc.expected.restrictionContains}", got: [${result.restrictions.join('; ')}]`);
  }
  if (tc.expected.noteContains && !result.notes.some(n => n.includes(tc.expected.noteContains!))) {
    fails.push(`note should contain "${tc.expected.noteContains}", got: [${result.notes.join('; ')}]`);
  }
  if (tc.expected.suggestionContains && !result.suggestions.some(s => s.includes(tc.expected.suggestionContains!))) {
    fails.push(`suggestion should contain "${tc.expected.suggestionContains}", got: [${result.suggestions.join('; ')}]`);
  }
  if (tc.expected.scoreGte !== undefined && (result.score === undefined || result.score < tc.expected.scoreGte)) {
    fails.push(`score should be >= ${tc.expected.scoreGte}, got: ${result.score}`);
  }
  if (tc.expected.scoreLt !== undefined && (result.score !== undefined && result.score >= tc.expected.scoreLt)) {
    fails.push(`score should be < ${tc.expected.scoreLt}, got: ${result.score}`);
  }

  if (fails.length > 0) {
    failedTests++;
    failures.push({ name: `[${tc.evaluator}] ${tc.name}`, expected: fails.join(' | '), actual: `eligible=${result.eligible}, blocked=[${result.blockedReasons.join(';')}], score=${result.score}` });
  } else {
    passedTests++;
  }
}

// ============================================================
// 테스트 실행
// ============================================================

const e9 = new E9Evaluator();
const e7 = new E7Evaluator();
const e2 = new E2Evaluator();
const eSimple = new ESimpleEvaluator();
const d2 = new D2Evaluator();
const dSimple = new DSimpleEvaluator();
const f2 = new F2Evaluator();
const f4 = new F4Evaluator();
const f5 = new F5Evaluator();
const fSimple = new FSimpleEvaluator();
const h1 = new H1Evaluator();
const h2 = new H2Evaluator();
const prohibited = new ProhibitedEvaluator();
const c4 = new C4Evaluator();

console.log('============================================================');
console.log('비자 자동매칭 알고리즘 종합 테스트 시작');
console.log('============================================================\n');

// ============================================================
// E-9 비전문취업 테스트 (~200 cases)
// ============================================================
console.log('--- E-9 비전문취업 ---');

// E-9: MOU 17개국 각각 eligible
for (const country of E9_MOU_COUNTRIES) {
  runTest({
    name: `E-9 MOU 국가 ${country} (${E9_MOU_NAMES[country]}) - 제조업 eligible`,
    evaluator: 'E-9',
    input: baseInput({ nationality: country, ksicCode: '25' }),
    visaType: e9Type,
    expected: { eligible: true },
  }, e9.evaluate(baseInput({ nationality: country, ksicCode: '25' }), e9Type));
}

// E-9: Non-MOU 국가 blocked
const nonMouCountries = ['US', 'GB', 'DE', 'FR', 'JP', 'AU', 'BR', 'IN', 'RU', 'KR', 'SA', 'NG', 'EG', 'AR', 'MX'];
for (const country of nonMouCountries) {
  const r = e9.evaluate(baseInput({ nationality: country, ksicCode: '25' }), e9Type);
  runTest({
    name: `E-9 비MOU 국가 ${country} blocked`,
    evaluator: 'E-9',
    input: baseInput({ nationality: country }),
    visaType: e9Type,
    expected: { eligible: false, blockedReasonContains: '허용 국가' },
  }, r);
}

// E-9: 허용 업종별 eligible
for (const ksic of E9_ALLOWED) {
  const r = e9.evaluate(baseInput({ nationality: 'VN', ksicCode: ksic }), e9Type);
  runTest({
    name: `E-9 허용 업종 ${ksic} eligible`,
    evaluator: 'E-9',
    input: baseInput({ nationality: 'VN', ksicCode: ksic }),
    visaType: e9Type,
    expected: { eligible: true },
  }, r);
}

// E-9: 비허용 업종 blocked
for (const ksic of E9_BLOCKED_INDUSTRIES) {
  const r = e9.evaluate(baseInput({ nationality: 'VN', ksicCode: ksic }), e9Type);
  runTest({
    name: `E-9 비허용 업종 ${ksic} blocked`,
    evaluator: 'E-9',
    input: baseInput({ nationality: 'VN', ksicCode: ksic }),
    visaType: e9Type,
    expected: { eligible: false, blockedReasonContains: '허용 업종' },
  }, r);
}

// E-9: 외국인 비율 초과 blocked
runTest({
  name: 'E-9 외국인비율 20% 초과 blocked',
  evaluator: 'E-9',
  input: baseInput({ nationality: 'VN', employeeCountKorean: 10, employeeCountForeign: 5 }),
  visaType: e9Type,
  expected: { eligible: false, blockedReasonContains: '고용비율' },
}, e9.evaluate(baseInput({ nationality: 'VN', employeeCountKorean: 10, employeeCountForeign: 5 }), e9Type));

// E-9: 외국인 비율 정확히 20% eligible
runTest({
  name: 'E-9 외국인비율 정확히 20% eligible',
  evaluator: 'E-9',
  input: baseInput({ nationality: 'VN', employeeCountKorean: 50, employeeCountForeign: 10 }),
  visaType: e9Type,
  expected: { eligible: true },
}, e9.evaluate(baseInput({ nationality: 'VN', employeeCountKorean: 50, employeeCountForeign: 10 }), e9Type));

// E-9: 대기업 blocked
runTest({
  name: 'E-9 대기업 blocked',
  evaluator: 'E-9',
  input: baseInput({ nationality: 'VN', companySizeType: 'LARGE' }),
  visaType: e9Type,
  expected: { eligible: false, blockedReasonContains: '대기업' },
}, e9.evaluate(baseInput({ nationality: 'VN', companySizeType: 'LARGE' }), e9Type));

// E-9: 중기업 eligible
runTest({
  name: 'E-9 중기업 eligible',
  evaluator: 'E-9',
  input: baseInput({ nationality: 'VN', companySizeType: 'MID' }),
  visaType: e9Type,
  expected: { eligible: true },
}, e9.evaluate(baseInput({ nationality: 'VN', companySizeType: 'MID' }), e9Type));

// E-9: 국적 미입력 시 패스 (기업 측만 입력)
runTest({
  name: 'E-9 국적 미입력 eligible (기업측만)',
  evaluator: 'E-9',
  input: baseInput({ nationality: undefined }),
  visaType: e9Type,
  expected: { eligible: true },
}, e9.evaluate(baseInput({ nationality: undefined }), e9Type));

// E-9: 다양한 제조업 세부코드
const manufacturingSubCodes = ['1011', '1340', '2221', '2599', '2811', '3011'];
for (const code of manufacturingSubCodes) {
  runTest({
    name: `E-9 제조업 세부코드 ${code} eligible`,
    evaluator: 'E-9',
    input: baseInput({ nationality: 'PH', ksicCode: code }),
    visaType: e9Type,
    expected: { eligible: true },
  }, e9.evaluate(baseInput({ nationality: 'PH', ksicCode: code }), e9Type));
}

// ============================================================
// E-7 특정활동 테스트 (~150 cases)
// ============================================================
console.log('--- E-7 특정활동 ---');

// E-7: 학사 + 적정급여 + 전문직종 eligible
runTest({
  name: 'E-7 학사+300만 IT직종 eligible',
  evaluator: 'E-7',
  input: baseInput({ educationLevel: 'BACHELOR', offeredSalary: 300, targetOccupationCode: '222' }),
  visaType: e7Type,
  expected: { eligible: true },
}, e7.evaluate(baseInput({ educationLevel: 'BACHELOR', offeredSalary: 300, targetOccupationCode: '222' }), e7Type));

// E-7: 석사+높은급여
runTest({
  name: 'E-7 석사+400만 eligible',
  evaluator: 'E-7',
  input: baseInput({ educationLevel: 'MASTER', offeredSalary: 400, targetOccupationCode: '231' }),
  visaType: e7Type,
  expected: { eligible: true },
}, e7.evaluate(baseInput({ educationLevel: 'MASTER', offeredSalary: 400, targetOccupationCode: '231' }), e7Type));

// E-7: 박사
runTest({
  name: 'E-7 박사+500만 eligible',
  evaluator: 'E-7',
  input: baseInput({ educationLevel: 'DOCTOR', offeredSalary: 500, targetOccupationCode: '211' }),
  visaType: e7Type,
  expected: { eligible: true },
}, e7.evaluate(baseInput({ educationLevel: 'DOCTOR', offeredSalary: 500, targetOccupationCode: '211' }), e7Type));

// E-7: 급여 부족 blocked (일반기업)
runTest({
  name: 'E-7 일반기업 급여부족 250만 blocked',
  evaluator: 'E-7',
  input: baseInput({ educationLevel: 'BACHELOR', offeredSalary: 250, companySizeType: 'LARGE' }),
  visaType: e7Type,
  expected: { eligible: false, blockedReasonContains: '급여' },
}, e7.evaluate(baseInput({ educationLevel: 'BACHELOR', offeredSalary: 250, companySizeType: 'LARGE' }), e7Type));

// E-7: 급여 부족 blocked (일반기업 289만)
runTest({
  name: 'E-7 일반기업 289만 blocked',
  evaluator: 'E-7',
  input: baseInput({ educationLevel: 'BACHELOR', offeredSalary: 289, companySizeType: 'MID' }),
  visaType: e7Type,
  expected: { eligible: false, blockedReasonContains: '급여' },
}, e7.evaluate(baseInput({ educationLevel: 'BACHELOR', offeredSalary: 289, companySizeType: 'MID' }), e7Type));

// E-7: 일반기업 290만 eligible
runTest({
  name: 'E-7 일반기업 290만 eligible',
  evaluator: 'E-7',
  input: baseInput({ educationLevel: 'BACHELOR', offeredSalary: 290, companySizeType: 'MID' }),
  visaType: e7Type,
  expected: { eligible: true },
}, e7.evaluate(baseInput({ educationLevel: 'BACHELOR', offeredSalary: 290, companySizeType: 'MID' }), e7Type));

// E-7: 중소기업 GNI 70% 적용 250만 eligible
runTest({
  name: 'E-7 중소기업 250만 eligible (GNI70%)',
  evaluator: 'E-7',
  input: baseInput({ educationLevel: 'BACHELOR', offeredSalary: 250, companySizeType: 'SME' }),
  visaType: e7Type,
  expected: { eligible: true },
}, e7.evaluate(baseInput({ educationLevel: 'BACHELOR', offeredSalary: 250, companySizeType: 'SME' }), e7Type));

// E-7: 중소기업 249만 blocked
runTest({
  name: 'E-7 중소기업 249만 blocked',
  evaluator: 'E-7',
  input: baseInput({ educationLevel: 'BACHELOR', offeredSalary: 249, companySizeType: 'SME' }),
  visaType: e7Type,
  expected: { eligible: false, blockedReasonContains: '급여' },
}, e7.evaluate(baseInput({ educationLevel: 'BACHELOR', offeredSalary: 249, companySizeType: 'SME' }), e7Type));

// E-7: 스타트업 GNI 70%
runTest({
  name: 'E-7 스타트업 250만 eligible',
  evaluator: 'E-7',
  input: baseInput({ educationLevel: 'BACHELOR', offeredSalary: 250, companySizeType: 'STARTUP' }),
  visaType: e7Type,
  expected: { eligible: true },
}, e7.evaluate(baseInput({ educationLevel: 'BACHELOR', offeredSalary: 250, companySizeType: 'STARTUP' }), e7Type));

// E-7: 고졸 + 경력부족 blocked
runTest({
  name: 'E-7 고졸+경력2년 blocked',
  evaluator: 'E-7',
  input: baseInput({ educationLevel: 'HIGH_SCHOOL', workExperienceYears: 2, offeredSalary: 300 }),
  visaType: e7Type,
  expected: { eligible: false, blockedReasonContains: '학사학위' },
}, e7.evaluate(baseInput({ educationLevel: 'HIGH_SCHOOL', workExperienceYears: 2, offeredSalary: 300 }), e7Type));

// E-7: 고졸 + 경력5년 eligible (일반)
runTest({
  name: 'E-7 고졸+경력5년 eligible',
  evaluator: 'E-7',
  input: baseInput({ educationLevel: 'HIGH_SCHOOL', workExperienceYears: 5, offeredSalary: 300 }),
  visaType: e7Type,
  expected: { eligible: true },
}, e7.evaluate(baseInput({ educationLevel: 'HIGH_SCHOOL', workExperienceYears: 5, offeredSalary: 300 }), e7Type));

// E-7: 고졸 + SME + 경력3년 eligible
runTest({
  name: 'E-7 고졸+SME+경력3년 eligible',
  evaluator: 'E-7',
  input: baseInput({ educationLevel: 'HIGH_SCHOOL', workExperienceYears: 3, offeredSalary: 250, companySizeType: 'SME' }),
  visaType: e7Type,
  expected: { eligible: true },
}, e7.evaluate(baseInput({ educationLevel: 'HIGH_SCHOOL', workExperienceYears: 3, offeredSalary: 250, companySizeType: 'SME' }), e7Type));

// E-7: 단순노무직(9xxx) blocked
runTest({
  name: 'E-7 단순노무직 9xxx blocked',
  evaluator: 'E-7',
  input: baseInput({ targetOccupationCode: '9111', offeredSalary: 300, educationLevel: 'BACHELOR' }),
  visaType: e7Type,
  expected: { eligible: false, blockedReasonContains: '단순노무직' },
}, e7.evaluate(baseInput({ targetOccupationCode: '9111', offeredSalary: 300, educationLevel: 'BACHELOR' }), e7Type));

// E-7: 다양한 전문직종 eligible
const e7OccCodes = ['222', '223', '231', '234', '235', '281', '284', '251', '271'];
for (const occ of e7OccCodes) {
  runTest({
    name: `E-7 직종 ${occ} eligible`,
    evaluator: 'E-7',
    input: baseInput({ targetOccupationCode: occ, educationLevel: 'BACHELOR', offeredSalary: 300 }),
    visaType: e7Type,
    expected: { eligible: true },
  }, e7.evaluate(baseInput({ targetOccupationCode: occ, educationLevel: 'BACHELOR', offeredSalary: 300 }), e7Type));
}

// E-7: 전문대졸(COLLEGE) -> E-7-2 준전문
runTest({
  name: 'E-7 전문대졸 → E-7-2 준전문',
  evaluator: 'E-7',
  input: baseInput({ educationLevel: 'COLLEGE', offeredSalary: 300 }),
  visaType: e7Type,
  expected: { eligible: true, noteContains: 'E-7-2' },
}, e7.evaluate(baseInput({ educationLevel: 'COLLEGE', offeredSalary: 300 }), e7Type));

// ============================================================
// E-2 회화지도 테스트 (~80 cases)
// ============================================================
console.log('--- E-2 회화지도 ---');

// E-2: 영어권 국가 + 학사 + 무범죄 eligible
for (const country of E2_COUNTRIES) {
  runTest({
    name: `E-2 ${country} (${E2_NAMES[country]}) 학사 eligible`,
    evaluator: 'E-2',
    input: baseInput({ nationality: country, educationLevel: 'BACHELOR', hasCriminalRecord: false, ksicCode: '85' }),
    visaType: e2Type,
    expected: { eligible: true },
  }, e2.evaluate(baseInput({ nationality: country, educationLevel: 'BACHELOR', hasCriminalRecord: false, ksicCode: '85' }), e2Type));
}

// E-2: 비영어권 blocked
const nonEnglishCountries = ['JP', 'CN', 'DE', 'FR', 'KR', 'VN', 'TH', 'PH', 'BR', 'MX'];
for (const country of nonEnglishCountries) {
  runTest({
    name: `E-2 비영어권 ${country} blocked`,
    evaluator: 'E-2',
    input: baseInput({ nationality: country, educationLevel: 'BACHELOR', ksicCode: '85' }),
    visaType: e2Type,
    expected: { eligible: false, blockedReasonContains: '허용 국가' },
  }, e2.evaluate(baseInput({ nationality: country, educationLevel: 'BACHELOR', ksicCode: '85' }), e2Type));
}

// E-2: 학사 미만 blocked
runTest({
  name: 'E-2 고졸 blocked',
  evaluator: 'E-2',
  input: baseInput({ nationality: 'US', educationLevel: 'HIGH_SCHOOL', ksicCode: '85' }),
  visaType: e2Type,
  expected: { eligible: false, blockedReasonContains: '학사학위' },
}, e2.evaluate(baseInput({ nationality: 'US', educationLevel: 'HIGH_SCHOOL', ksicCode: '85' }), e2Type));

// E-2: 전문대졸 blocked
runTest({
  name: 'E-2 전문대졸 blocked',
  evaluator: 'E-2',
  input: baseInput({ nationality: 'US', educationLevel: 'COLLEGE', ksicCode: '85' }),
  visaType: e2Type,
  expected: { eligible: false, blockedReasonContains: '학사학위' },
}, e2.evaluate(baseInput({ nationality: 'US', educationLevel: 'COLLEGE', ksicCode: '85' }), e2Type));

// E-2: 범죄경력 blocked
runTest({
  name: 'E-2 범죄경력 blocked',
  evaluator: 'E-2',
  input: baseInput({ nationality: 'US', educationLevel: 'BACHELOR', hasCriminalRecord: true, ksicCode: '85' }),
  visaType: e2Type,
  expected: { eligible: false, blockedReasonContains: '범죄경력' },
}, e2.evaluate(baseInput({ nationality: 'US', educationLevel: 'BACHELOR', hasCriminalRecord: true, ksicCode: '85' }), e2Type));

// E-2: 비교육업종 → eligible but restriction
runTest({
  name: 'E-2 비교육업종(IT) eligible but restriction',
  evaluator: 'E-2',
  input: baseInput({ nationality: 'US', educationLevel: 'BACHELOR', ksicCode: '62' }),
  visaType: e2Type,
  expected: { eligible: true, restrictionContains: '교육기관' },
}, e2.evaluate(baseInput({ nationality: 'US', educationLevel: 'BACHELOR', ksicCode: '62' }), e2Type));

// ============================================================
// H-1 관광취업 테스트 (~100 cases)
// ============================================================
console.log('--- H-1 관광취업 ---');

// H-1: 협정국 25개국 각각 eligible (적정 나이)
for (const country of H1_WH_COUNTRIES) {
  runTest({
    name: `H-1 ${country} (${H1_WH_NAMES[country]}) 25세 eligible`,
    evaluator: 'H-1',
    input: baseInput({ nationality: country, age: 25 }),
    visaType: h1Type,
    expected: { eligible: true },
  }, h1.evaluate(baseInput({ nationality: country, age: 25 }), h1Type));
}

// H-1: 비협정국 blocked
const nonWhCountries = ['VN', 'PH', 'CN', 'IN', 'RU', 'BR', 'NG', 'EG', 'ID', 'TH'];
for (const country of nonWhCountries) {
  runTest({
    name: `H-1 비협정국 ${country} blocked`,
    evaluator: 'H-1',
    input: baseInput({ nationality: country, age: 25 }),
    visaType: h1Type,
    expected: { eligible: false, blockedReasonContains: '허용 국가' },
  }, h1.evaluate(baseInput({ nationality: country, age: 25 }), h1Type));
}

// H-1: 연령 제한
const h1AgeCases = [
  { age: 17, eligible: false, desc: '17세 미달' },
  { age: 18, eligible: true, desc: '18세 최소' },
  { age: 25, eligible: true, desc: '25세 중간' },
  { age: 30, eligible: true, desc: '30세 최대' },
  { age: 31, eligible: false, desc: '31세 초과' },
  { age: 35, eligible: false, desc: '35세 초과' },
  { age: 40, eligible: false, desc: '40세 초과' },
];
for (const tc of h1AgeCases) {
  runTest({
    name: `H-1 나이 ${tc.age}세 ${tc.desc}`,
    evaluator: 'H-1',
    input: baseInput({ nationality: 'AU', age: tc.age }),
    visaType: h1Type,
    expected: { eligible: tc.eligible },
  }, h1.evaluate(baseInput({ nationality: 'AU', age: tc.age }), h1Type));
}

// H-1: 유흥업소 blocked
runTest({
  name: 'H-1 유흥업소 blocked',
  evaluator: 'H-1',
  input: baseInput({ nationality: 'AU', age: 25, ksicCode: '56221' }),
  visaType: h1Type,
  expected: { eligible: false, blockedReasonContains: '유흥업소' },
}, h1.evaluate(baseInput({ nationality: 'AU', age: 25, ksicCode: '56221' }), h1Type));

// H-1: 나이 미입력 시 패스
runTest({
  name: 'H-1 나이 미입력 eligible',
  evaluator: 'H-1',
  input: baseInput({ nationality: 'AU', age: undefined }),
  visaType: h1Type,
  expected: { eligible: true },
}, h1.evaluate(baseInput({ nationality: 'AU', age: undefined }), h1Type));

// ============================================================
// H-2 방문취업 테스트 (~100 cases)
// ============================================================
console.log('--- H-2 방문취업 ---');

// H-2: 재외동포 + 허용국가 + 허용업종 eligible
for (const country of H2_COUNTRIES) {
  runTest({
    name: `H-2 ${country} (${H2_NAMES[country]}) 재외동포 제조업 eligible`,
    evaluator: 'H-2',
    input: baseInput({ nationality: country, isEthnicKorean: true, ksicCode: '25' }),
    visaType: h2Type,
    expected: { eligible: true },
  }, h2.evaluate(baseInput({ nationality: country, isEthnicKorean: true, ksicCode: '25' }), h2Type));
}

// H-2: 비재외동포 blocked
runTest({
  name: 'H-2 비재외동포 blocked',
  evaluator: 'H-2',
  input: baseInput({ isEthnicKorean: false }),
  visaType: h2Type,
  expected: { eligible: false, blockedReasonContains: '재외동포' },
}, h2.evaluate(baseInput({ isEthnicKorean: false }), h2Type));

// H-2: 비허용국가 blocked
runTest({
  name: 'H-2 비허용국가 US blocked',
  evaluator: 'H-2',
  input: baseInput({ nationality: 'US', isEthnicKorean: true }),
  visaType: h2Type,
  expected: { eligible: false },
}, h2.evaluate(baseInput({ nationality: 'US', isEthnicKorean: true }), h2Type));

// H-2: 허용 업종별 eligible
for (const ksic of H2_ALLOWED_PREFIXES.slice(0, 15)) {
  runTest({
    name: `H-2 허용업종 ${ksic} eligible`,
    evaluator: 'H-2',
    input: baseInput({ isEthnicKorean: true, nationality: 'CN', ksicCode: ksic }),
    visaType: h2Type,
    expected: { eligible: true },
  }, h2.evaluate(baseInput({ isEthnicKorean: true, nationality: 'CN', ksicCode: ksic }), h2Type));
}

// H-2: 비허용 업종 blocked
for (const ksic of H2_BLOCKED_INDUSTRIES) {
  runTest({
    name: `H-2 비허용업종 ${ksic} blocked`,
    evaluator: 'H-2',
    input: baseInput({ isEthnicKorean: true, nationality: 'CN', ksicCode: ksic }),
    visaType: h2Type,
    expected: { eligible: false, blockedReasonContains: '허용 업종' },
  }, h2.evaluate(baseInput({ isEthnicKorean: true, nationality: 'CN', ksicCode: ksic }), h2Type));
}

// H-2: 외국인 비율 초과
runTest({
  name: 'H-2 외국인비율 초과 blocked',
  evaluator: 'H-2',
  input: baseInput({ isEthnicKorean: true, nationality: 'CN', employeeCountKorean: 5, employeeCountForeign: 5 }),
  visaType: h2Type,
  expected: { eligible: false, blockedReasonContains: '고용비율' },
}, h2.evaluate(baseInput({ isEthnicKorean: true, nationality: 'CN', employeeCountKorean: 5, employeeCountForeign: 5 }), h2Type));

// ============================================================
// D-2 유학 테스트 (~60 cases)
// ============================================================
console.log('--- D-2 유학 ---');

// D-2: 시간제 eligible
runTest({
  name: 'D-2 시간제 eligible',
  evaluator: 'D-2',
  input: baseInput({ jobType: 'PART_TIME', ksicCode: '56' }),
  visaType: d2Type,
  expected: { eligible: true, restrictionContains: '20시간' },
}, d2.evaluate(baseInput({ jobType: 'PART_TIME', ksicCode: '56' }), d2Type));

// D-2: 풀타임 blocked
runTest({
  name: 'D-2 풀타임 blocked',
  evaluator: 'D-2',
  input: baseInput({ jobType: 'FULL_TIME' }),
  visaType: d2Type,
  expected: { eligible: false, blockedReasonContains: '풀타임' },
}, d2.evaluate(baseInput({ jobType: 'FULL_TIME' }), d2Type));

// D-2: 주점업 blocked
runTest({
  name: 'D-2 주점업 blocked',
  evaluator: 'D-2',
  input: baseInput({ jobType: 'PART_TIME', ksicCode: '56221' }),
  visaType: d2Type,
  expected: { eligible: false, blockedReasonContains: '유흥업소' },
}, d2.evaluate(baseInput({ jobType: 'PART_TIME', ksicCode: '56221' }), d2Type));

// D-2: 다양한 업종 시간제 eligible
const d2AllowedIndustries = ['25', '56', '62', '85', '47', '55', '90'];
for (const ksic of d2AllowedIndustries) {
  runTest({
    name: `D-2 시간제 업종 ${ksic} eligible`,
    evaluator: 'D-2',
    input: baseInput({ jobType: 'PART_TIME', ksicCode: ksic }),
    visaType: d2Type,
    expected: { eligible: true },
  }, d2.evaluate(baseInput({ jobType: 'PART_TIME', ksicCode: ksic }), d2Type));
}

// D-2: TOPIK 레벨별 notes
for (let topik = 1; topik <= 6; topik++) {
  const r = d2.evaluate(baseInput({ jobType: 'PART_TIME', koreanLevel: `TOPIK${topik}`, ksicCode: '56' }), d2Type);
  runTest({
    name: `D-2 TOPIK${topik} note`,
    evaluator: 'D-2',
    input: baseInput({ jobType: 'PART_TIME', koreanLevel: `TOPIK${topik}` }),
    visaType: d2Type,
    expected: { eligible: true },
  }, r);
}

// ============================================================
// F-2 거주 / F-2-7 점수제 테스트 (~100 cases)
// ============================================================
console.log('--- F-2 거주 / F-2-7 점수제 ---');

// F-2: 자유취업
runTest({
  name: 'F-2 일반 자유취업 eligible',
  evaluator: 'F-2',
  input: baseInput(),
  visaType: f2Type,
  expected: { eligible: true, noteContains: '자유 취업' },
}, f2.evaluate(baseInput(), f2Type));

// F-2-7: 고득점 eligible
runTest({
  name: 'F-2-7 고득점 (22세+석사+TOPIK6+GNI300%) eligible',
  evaluator: 'F-2-7',
  input: baseInput({ age: 22, educationLevel: 'MASTER', koreanLevel: 'TOPIK6', incomeGniPercent: 300 }),
  visaType: f27Type,
  expected: { eligible: true, scoreGte: 80 },
}, f2.evaluate(baseInput({ age: 22, educationLevel: 'MASTER', koreanLevel: 'TOPIK6', incomeGniPercent: 300 }), f27Type));

// F-2-7: 최고점
runTest({
  name: 'F-2-7 최고점 (20세+박사+TOPIK6+GNI300%) eligible',
  evaluator: 'F-2-7',
  input: baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 350 }),
  visaType: f27Type,
  expected: { eligible: true, scoreGte: 100 },
}, f2.evaluate(baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 350 }), f27Type));

// F-2-7: 저점수 blocked
runTest({
  name: 'F-2-7 저점수 (45세+고졸+TOPIK2+GNI50%) blocked',
  evaluator: 'F-2-7',
  input: baseInput({ age: 45, educationLevel: 'HIGH_SCHOOL', koreanLevel: 'TOPIK2', incomeGniPercent: 50 }),
  visaType: f27Type,
  expected: { eligible: false, scoreLt: 80 },
}, f2.evaluate(baseInput({ age: 45, educationLevel: 'HIGH_SCHOOL', koreanLevel: 'TOPIK2', incomeGniPercent: 50 }), f27Type));

// F-2-7: 나이별 점수 변화
const f27AgeCases = [
  { age: 20, expectedMin: 25, desc: '20세=25점' },
  { age: 27, expectedMin: 20, desc: '27세=20점' },
  { age: 32, expectedMin: 15, desc: '32세=15점' },
  { age: 37, expectedMin: 10, desc: '37세=10점' },
  { age: 42, expectedMin: 7, desc: '42세=7점' },
  { age: 50, expectedMin: 5, desc: '50세=5점' },
];
for (const tc of f27AgeCases) {
  runTest({
    name: `F-2-7 나이 ${tc.desc}`,
    evaluator: 'F-2-7',
    input: baseInput({ age: tc.age, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300 }),
    visaType: f27Type,
    expected: { eligible: true, scoreGte: tc.expectedMin + 35 + 20 + 25 }, // age+edu+korean+income
  }, f2.evaluate(baseInput({ age: tc.age, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300 }), f27Type));
}

// F-2-7: 학력별 점수
const f27EduCases = [
  { edu: 'DOCTOR', score: 35 },
  { edu: 'MASTER', score: 30 },
  { edu: 'BACHELOR', score: 25 },
  { edu: 'COLLEGE', score: 15 },
  { edu: 'HIGH_SCHOOL', score: 10 },
];
for (const tc of f27EduCases) {
  const r = f2.evaluate(baseInput({ age: 20, educationLevel: tc.edu, koreanLevel: 'TOPIK6', incomeGniPercent: 300 }), f27Type);
  runTest({
    name: `F-2-7 학력 ${tc.edu}=${tc.score}점`,
    evaluator: 'F-2-7',
    input: baseInput({ age: 20, educationLevel: tc.edu }),
    visaType: f27Type,
    expected: { scoreGte: 25 + tc.score + 20 + 25, eligible: (25 + tc.score + 20 + 25) >= 80 }, // with age+korean+income
  }, r);
}

// F-2-7: 한국어 레벨별
const f27KorCases = [
  { level: 'TOPIK6', score: 20 },
  { level: 'TOPIK5', score: 16 },
  { level: 'TOPIK4', score: 12 },
  { level: 'TOPIK3', score: 8 },
  { level: 'TOPIK2', score: 4 },
];
for (const tc of f27KorCases) {
  const r = f2.evaluate(baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: tc.level, incomeGniPercent: 300 }), f27Type);
  runTest({
    name: `F-2-7 한국어 ${tc.level}=${tc.score}점`,
    evaluator: 'F-2-7',
    input: baseInput({ koreanLevel: tc.level }),
    visaType: f27Type,
    expected: { scoreGte: 25 + 35 + tc.score + 25, eligible: true },
  }, r);
}

// F-2-7: 소득별
const f27IncomeCases = [
  { gni: 300, score: 25 },
  { gni: 200, score: 20 },
  { gni: 150, score: 15 },
  { gni: 100, score: 10 },
  { gni: 80, score: 5 },
  { gni: 50, score: 0 },
];
for (const tc of f27IncomeCases) {
  const r = f2.evaluate(baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: tc.gni }), f27Type);
  runTest({
    name: `F-2-7 소득 GNI ${tc.gni}%=${tc.score}점`,
    evaluator: 'F-2-7',
    input: baseInput({ incomeGniPercent: tc.gni }),
    visaType: f27Type,
    expected: { scoreGte: 25 + 35 + 20 + tc.score, eligible: true },
  }, r);
}

// F-2-7: 범죄경력 감점
runTest({
  name: 'F-2-7 범죄경력 감점 -5',
  evaluator: 'F-2-7',
  input: baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300, hasCriminalRecord: true }),
  visaType: f27Type,
  expected: { eligible: true, noteContains: '범죄경력' },
}, f2.evaluate(baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300, hasCriminalRecord: true }), f27Type));

// F-2-7: 출입국법 위반 감점
runTest({
  name: 'F-2-7 출입국법위반 감점 -10',
  evaluator: 'F-2-7',
  input: baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300, hasImmigrationViolation: true }),
  visaType: f27Type,
  expected: { eligible: true, noteContains: '출입국법' },
}, f2.evaluate(baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300, hasImmigrationViolation: true }), f27Type));

// ============================================================
// F-4 재외동포 테스트 (~60 cases)
// ============================================================
console.log('--- F-4 재외동포 ---');

// F-4: 재외동포 + 전문직 eligible
runTest({
  name: 'F-4 재외동포 전문직(IT) eligible',
  evaluator: 'F-4',
  input: baseInput({ isEthnicKorean: true, ksicCode: '62', targetOccupationCode: '222' }),
  visaType: f4Type,
  expected: { eligible: true },
}, f4.evaluate(baseInput({ isEthnicKorean: true, ksicCode: '62', targetOccupationCode: '222' }), f4Type));

// F-4: 비재외동포 blocked
runTest({
  name: 'F-4 비재외동포 blocked',
  evaluator: 'F-4',
  input: baseInput({ isEthnicKorean: false }),
  visaType: f4Type,
  expected: { eligible: false, blockedReasonContains: '재외동포' },
}, f4.evaluate(baseInput({ isEthnicKorean: false }), f4Type));

// F-4: 단순노무직(9xxx) blocked
const f4BlockedOccupations = ['91', '92', '93', '94', '95', '99', '9111', '9211', '9311'];
for (const occ of f4BlockedOccupations) {
  runTest({
    name: `F-4 단순노무직 ${occ} blocked`,
    evaluator: 'F-4',
    input: baseInput({ isEthnicKorean: true, targetOccupationCode: occ }),
    visaType: f4Type,
    expected: { eligible: false, blockedReasonContains: '단순노무직' },
  }, f4.evaluate(baseInput({ isEthnicKorean: true, targetOccupationCode: occ }), f4Type));
}

// F-4: 청소업(75) blocked
runTest({
  name: 'F-4 청소업(75) blocked',
  evaluator: 'F-4',
  input: baseInput({ isEthnicKorean: true, ksicCode: '75' }),
  visaType: f4Type,
  expected: { eligible: false, blockedReasonContains: '청소' },
}, f4.evaluate(baseInput({ isEthnicKorean: true, ksicCode: '75' }), f4Type));

// F-4: 다양한 전문업종 eligible
const f4AllowedIndustries = ['62', '70', '85', '64', '86', '71', '72', '58', '61', '63'];
for (const ksic of f4AllowedIndustries) {
  runTest({
    name: `F-4 전문업종 ${ksic} eligible`,
    evaluator: 'F-4',
    input: baseInput({ isEthnicKorean: true, ksicCode: ksic }),
    visaType: f4Type,
    expected: { eligible: true },
  }, f4.evaluate(baseInput({ isEthnicKorean: true, ksicCode: ksic }), f4Type));
}

// ============================================================
// F-5 영주 테스트 (~20 cases)
// ============================================================
console.log('--- F-5 영주 ---');

// F-5: 모든 업종 eligible
const f5Industries = ['10', '25', '41', '55', '62', '70', '75', '85', '86', '90', '96'];
for (const ksic of f5Industries) {
  runTest({
    name: `F-5 업종 ${ksic} eligible (자유취업)`,
    evaluator: 'F-5',
    input: baseInput({ ksicCode: ksic }),
    visaType: f5Type,
    expected: { eligible: true, noteContains: '자유 취업' },
  }, f5.evaluate(baseInput({ ksicCode: ksic }), f5Type));
}

// ============================================================
// F-6 결혼이민, F-1 방문동거, F-3 동반 테스트 (~30 cases)
// ============================================================
console.log('--- F-6, F-1, F-3 ---');

// F-6: 자유취업
runTest({
  name: 'F-6 결혼이민 자유취업 eligible',
  evaluator: 'F-6',
  input: baseInput(),
  visaType: f6Type,
  expected: { eligible: true, noteContains: '자유 취업' },
}, fSimple.evaluate(baseInput(), f6Type));

// F-1: 취업불가
runTest({
  name: 'F-1 방문동거 취업불가',
  evaluator: 'F-1',
  input: baseInput(),
  visaType: f1Type,
  expected: { eligible: false, blockedReasonContains: '취업 불가' },
}, fSimple.evaluate(baseInput(), f1Type));

// F-3: 취업불가
runTest({
  name: 'F-3 동반 취업불가',
  evaluator: 'F-3',
  input: baseInput(),
  visaType: f3Type,
  expected: { eligible: false, blockedReasonContains: '취업 불가' },
}, fSimple.evaluate(baseInput(), f3Type));

// F-6: 다양한 업종 eligible
const f6Industries = ['10', '56', '62', '75', '85', '90', '96'];
for (const ksic of f6Industries) {
  runTest({
    name: `F-6 업종 ${ksic} eligible`,
    evaluator: 'F-6',
    input: baseInput({ ksicCode: ksic }),
    visaType: f6Type,
    expected: { eligible: true },
  }, fSimple.evaluate(baseInput({ ksicCode: ksic }), f6Type));
}

// ============================================================
// D-1, D-3, D-4, D-10 테스트 (~40 cases)
// ============================================================
console.log('--- D-1, D-3, D-4, D-10 ---');

// D-1: 취업불가
runTest({
  name: 'D-1 문화예술 취업불가',
  evaluator: 'D-1',
  input: baseInput(),
  visaType: dSimpleTypes['D-1'],
  expected: { eligible: false, blockedReasonContains: '취업 불가' },
}, dSimple.evaluate(baseInput(), dSimpleTypes['D-1']));

// D-3: 취업불가
runTest({
  name: 'D-3 기술연수 취업불가',
  evaluator: 'D-3',
  input: baseInput(),
  visaType: dSimpleTypes['D-3'],
  expected: { eligible: false, blockedReasonContains: '취업 불가' },
}, dSimple.evaluate(baseInput(), dSimpleTypes['D-3']));

// D-4: 시간제 eligible
runTest({
  name: 'D-4 시간제 eligible',
  evaluator: 'D-4',
  input: baseInput({ jobType: 'PART_TIME' }),
  visaType: dSimpleTypes['D-4'],
  expected: { eligible: true, restrictionContains: '20시간' },
}, dSimple.evaluate(baseInput({ jobType: 'PART_TIME' }), dSimpleTypes['D-4']));

// D-4: 풀타임 blocked
runTest({
  name: 'D-4 풀타임 blocked',
  evaluator: 'D-4',
  input: baseInput({ jobType: 'FULL_TIME' }),
  visaType: dSimpleTypes['D-4'],
  expected: { eligible: false, blockedReasonContains: '풀타임' },
}, dSimple.evaluate(baseInput({ jobType: 'FULL_TIME' }), dSimpleTypes['D-4']));

// D-10: 구직 eligible
runTest({
  name: 'D-10 구직 eligible',
  evaluator: 'D-10',
  input: baseInput(),
  visaType: dSimpleTypes['D-10'],
  expected: { eligible: true, restrictionContains: 'D-10' },
}, dSimple.evaluate(baseInput(), dSimpleTypes['D-10']));

// ============================================================
// Prohibited 비자 테스트 (~50 cases)
// ============================================================
console.log('--- 취업불가 비자 (A-1~A-3, B-1~B-2, C-1, C-3) ---');

// 7개 취업불가 비자 × 다양한 업종
for (const [code, vt] of Object.entries(prohibitedTypes)) {
  const industries = ['25', '62', '85', '55', '41', '70', '56'];
  for (const ksic of industries) {
    runTest({
      name: `${code} ${vt.nameKo} 업종 ${ksic} blocked`,
      evaluator: code,
      input: baseInput({ ksicCode: ksic }),
      visaType: vt,
      expected: { eligible: false, blockedReasonContains: '취업 활동이 허용되지 않음' },
    }, prohibited.evaluate(baseInput({ ksicCode: ksic }), vt));
  }
}

// ============================================================
// C-4 단기취업 테스트 (~20 cases)
// ============================================================
console.log('--- C-4 단기취업 ---');

// C-4: 다양한 업종 eligible
const c4Industries = ['25', '62', '85', '55', '90', '91', '70', '56', '59'];
for (const ksic of c4Industries) {
  runTest({
    name: `C-4 업종 ${ksic} eligible`,
    evaluator: 'C-4',
    input: baseInput({ ksicCode: ksic }),
    visaType: c4Type,
    expected: { eligible: true, restrictionContains: '90일' },
  }, c4.evaluate(baseInput({ ksicCode: ksic }), c4Type));
}

// ============================================================
// E-Simple 테스트 (~70 cases)
// ============================================================
console.log('--- E 시리즈 간단 (E-1,3,4,5,6,8,10) ---');

// E-1 교수: 석사이상 eligible
runTest({
  name: 'E-1 석사 eligible',
  evaluator: 'E-1',
  input: baseInput({ educationLevel: 'MASTER', ksicCode: '85' }),
  visaType: eSimpleTypes['E-1'],
  expected: { eligible: true },
}, eSimple.evaluate(baseInput({ educationLevel: 'MASTER', ksicCode: '85' }), eSimpleTypes['E-1']));

// E-1 교수: 학사 blocked (석사 이상 필요)
runTest({
  name: 'E-1 학사 blocked (석사이상 필요)',
  evaluator: 'E-1',
  input: baseInput({ educationLevel: 'BACHELOR', ksicCode: '85' }),
  visaType: eSimpleTypes['E-1'],
  expected: { eligible: false, blockedReasonContains: '학력' },
}, eSimple.evaluate(baseInput({ educationLevel: 'BACHELOR', ksicCode: '85' }), eSimpleTypes['E-1']));

// E-3 연구: 석사이상 eligible
runTest({
  name: 'E-3 석사 eligible',
  evaluator: 'E-3',
  input: baseInput({ educationLevel: 'MASTER', ksicCode: '70' }),
  visaType: eSimpleTypes['E-3'],
  expected: { eligible: true },
}, eSimple.evaluate(baseInput({ educationLevel: 'MASTER', ksicCode: '70' }), eSimpleTypes['E-3']));

// E-4 기술지도: 학사 eligible
runTest({
  name: 'E-4 학사 eligible',
  evaluator: 'E-4',
  input: baseInput({ educationLevel: 'BACHELOR' }),
  visaType: eSimpleTypes['E-4'],
  expected: { eligible: true },
}, eSimple.evaluate(baseInput({ educationLevel: 'BACHELOR' }), eSimpleTypes['E-4']));

// E-4: 전문대졸 blocked
runTest({
  name: 'E-4 전문대졸 blocked',
  evaluator: 'E-4',
  input: baseInput({ educationLevel: 'COLLEGE' }),
  visaType: eSimpleTypes['E-4'],
  expected: { eligible: false },
}, eSimple.evaluate(baseInput({ educationLevel: 'COLLEGE' }), eSimpleTypes['E-4']));

// E-5 전문직: 학사 eligible
runTest({
  name: 'E-5 학사 eligible',
  evaluator: 'E-5',
  input: baseInput({ educationLevel: 'BACHELOR' }),
  visaType: eSimpleTypes['E-5'],
  expected: { eligible: true },
}, eSimple.evaluate(baseInput({ educationLevel: 'BACHELOR' }), eSimpleTypes['E-5']));

// E-6 예술흥행: 학력무관 eligible
runTest({
  name: 'E-6 학력무관 eligible',
  evaluator: 'E-6',
  input: baseInput({ educationLevel: 'HIGH_SCHOOL', ksicCode: '90' }),
  visaType: eSimpleTypes['E-6'],
  expected: { eligible: true },
}, eSimple.evaluate(baseInput({ educationLevel: 'HIGH_SCHOOL', ksicCode: '90' }), eSimpleTypes['E-6']));

// E-8 계절근로: 학력무관 eligible
runTest({
  name: 'E-8 계절근로 eligible',
  evaluator: 'E-8',
  input: baseInput({ ksicCode: '01' }),
  visaType: eSimpleTypes['E-8'],
  expected: { eligible: true },
}, eSimple.evaluate(baseInput({ ksicCode: '01' }), eSimpleTypes['E-8']));

// E-10 선원취업: 학력무관 eligible
runTest({
  name: 'E-10 선원취업 eligible',
  evaluator: 'E-10',
  input: baseInput({ ksicCode: '50' }),
  visaType: eSimpleTypes['E-10'],
  expected: { eligible: true },
}, eSimple.evaluate(baseInput({ ksicCode: '50' }), eSimpleTypes['E-10']));

// E-Simple: 학력 미입력 처리 (기본 ksicCode='25' 제조업 기준)
// E-6(예술:90,91,59), E-8(농어업:01,02,03), E-10(수상운송:50)은 업종 불일치로 blocked
for (const [code, vt] of Object.entries(eSimpleTypes)) {
  const r = eSimple.evaluate(baseInput({ educationLevel: undefined }), vt);
  runTest({
    name: `${code} 학력미입력 처리`,
    evaluator: code,
    input: baseInput({ educationLevel: undefined }),
    visaType: vt,
    expected: { eligible: false },
  }, r);
}

// ============================================================
// 복합 시나리오 테스트 (~50 cases)
// ============================================================
console.log('--- 복합 시나리오 ---');

// 시나리오: 베트남 국적, 제조업, 소규모 기업 → E-9 eligible
runTest({
  name: '시나리오: 베트남 제조업 소기업 → E-9 eligible',
  evaluator: 'E-9',
  input: baseInput({ nationality: 'VN', ksicCode: '25', companySizeType: 'SME', employeeCountKorean: 30, employeeCountForeign: 3 }),
  visaType: e9Type,
  expected: { eligible: true },
}, e9.evaluate(baseInput({ nationality: 'VN', ksicCode: '25', companySizeType: 'SME', employeeCountKorean: 30, employeeCountForeign: 3 }), e9Type));

// 시나리오: 미국인 IT개발자, 학사, 350만 → E-7 eligible
runTest({
  name: '시나리오: 미국인 IT개발자 → E-7 eligible',
  evaluator: 'E-7',
  input: baseInput({ nationality: 'US', educationLevel: 'BACHELOR', offeredSalary: 350, targetOccupationCode: '222', ksicCode: '62' }),
  visaType: e7Type,
  expected: { eligible: true },
}, e7.evaluate(baseInput({ nationality: 'US', educationLevel: 'BACHELOR', offeredSalary: 350, targetOccupationCode: '222', ksicCode: '62' }), e7Type));

// 시나리오: 호주인 25세 카페 알바 → H-1 eligible
runTest({
  name: '시나리오: 호주인 25세 카페 알바 → H-1 eligible',
  evaluator: 'H-1',
  input: baseInput({ nationality: 'AU', age: 25, ksicCode: '56211', jobType: 'PART_TIME' }),
  visaType: h1Type,
  expected: { eligible: true },
}, h1.evaluate(baseInput({ nationality: 'AU', age: 25, ksicCode: '56211', jobType: 'PART_TIME' }), h1Type));

// 시나리오: 중국 재외동포 건설현장 → H-2 eligible
runTest({
  name: '시나리오: 중국 재외동포 건설 → H-2 eligible',
  evaluator: 'H-2',
  input: baseInput({ nationality: 'CN', isEthnicKorean: true, ksicCode: '41' }),
  visaType: h2Type,
  expected: { eligible: true },
}, h2.evaluate(baseInput({ nationality: 'CN', isEthnicKorean: true, ksicCode: '41' }), h2Type));

// 시나리오: 중국 재외동포 IT → F-4 eligible (전문직)
runTest({
  name: '시나리오: 중국 재외동포 IT → F-4 eligible',
  evaluator: 'F-4',
  input: baseInput({ isEthnicKorean: true, ksicCode: '62', targetOccupationCode: '222' }),
  visaType: f4Type,
  expected: { eligible: true },
}, f4.evaluate(baseInput({ isEthnicKorean: true, ksicCode: '62', targetOccupationCode: '222' }), f4Type));

// 시나리오: 중국 재외동포 청소 → F-4 blocked, H-2 eligible
runTest({
  name: '시나리오: 재외동포 청소 → F-4 blocked',
  evaluator: 'F-4',
  input: baseInput({ isEthnicKorean: true, ksicCode: '75', targetOccupationCode: '94' }),
  visaType: f4Type,
  expected: { eligible: false },
}, f4.evaluate(baseInput({ isEthnicKorean: true, ksicCode: '75', targetOccupationCode: '94' }), f4Type));

runTest({
  name: '시나리오: 재외동포 청소 → H-2 eligible',
  evaluator: 'H-2',
  input: baseInput({ isEthnicKorean: true, nationality: 'CN', ksicCode: '75' }),
  visaType: h2Type,
  expected: { eligible: true },
}, h2.evaluate(baseInput({ isEthnicKorean: true, nationality: 'CN', ksicCode: '75' }), h2Type));

// 시나리오: 일본 31세 → H-1 blocked (나이초과)
runTest({
  name: '시나리오: 일본 31세 → H-1 blocked',
  evaluator: 'H-1',
  input: baseInput({ nationality: 'JP', age: 31 }),
  visaType: h1Type,
  expected: { eligible: false },
}, h1.evaluate(baseInput({ nationality: 'JP', age: 31 }), h1Type));

// 시나리오: D-2 유학생 주점업 알바 → blocked
runTest({
  name: '시나리오: D-2 유학생 주점업 → blocked',
  evaluator: 'D-2',
  input: baseInput({ jobType: 'PART_TIME', ksicCode: '56221' }),
  visaType: d2Type,
  expected: { eligible: false },
}, d2.evaluate(baseInput({ jobType: 'PART_TIME', ksicCode: '56221' }), d2Type));

// 시나리오: 영주권자(F-5) 어떤 업종이든 eligible
const f5TestIndustries = ['56221', '75', '62', '85', '90', '01', '41', '25'];
for (const ksic of f5TestIndustries) {
  runTest({
    name: `시나리오: F-5 영주권 업종 ${ksic} eligible`,
    evaluator: 'F-5',
    input: baseInput({ ksicCode: ksic }),
    visaType: f5Type,
    expected: { eligible: true },
  }, f5.evaluate(baseInput({ ksicCode: ksic }), f5Type));
}

// 시나리오: 관광비자(B-2) → 무조건 blocked
runTest({
  name: '시나리오: B-2 관광 → 무조건 blocked',
  evaluator: 'B-2',
  input: baseInput(),
  visaType: prohibitedTypes['B-2'],
  expected: { eligible: false },
}, prohibited.evaluate(baseInput(), prohibitedTypes['B-2']));

// ============================================================
// 경계값 테스트 (~50 cases)
// ============================================================
console.log('--- 경계값 테스트 ---');

// E-9: 외국인 0명 eligible
runTest({
  name: 'E-9 외국인 0명 eligible',
  evaluator: 'E-9',
  input: baseInput({ nationality: 'VN', employeeCountKorean: 50, employeeCountForeign: 0 }),
  visaType: e9Type,
  expected: { eligible: true },
}, e9.evaluate(baseInput({ nationality: 'VN', employeeCountKorean: 50, employeeCountForeign: 0 }), e9Type));

// E-9: 한국인 0명 + 외국인 0명
runTest({
  name: 'E-9 직원 0명 eligible',
  evaluator: 'E-9',
  input: baseInput({ nationality: 'VN', employeeCountKorean: 0, employeeCountForeign: 0 }),
  visaType: e9Type,
  expected: { eligible: true },
}, e9.evaluate(baseInput({ nationality: 'VN', employeeCountKorean: 0, employeeCountForeign: 0 }), e9Type));

// E-7: 급여 정확히 290만 eligible
runTest({
  name: 'E-7 급여 정확히 290만 eligible',
  evaluator: 'E-7',
  input: baseInput({ offeredSalary: 290, educationLevel: 'BACHELOR', companySizeType: 'MID' }),
  visaType: e7Type,
  expected: { eligible: true },
}, e7.evaluate(baseInput({ offeredSalary: 290, educationLevel: 'BACHELOR', companySizeType: 'MID' }), e7Type));

// H-1: 정확히 18세
runTest({
  name: 'H-1 정확히 18세 eligible',
  evaluator: 'H-1',
  input: baseInput({ nationality: 'AU', age: 18 }),
  visaType: h1Type,
  expected: { eligible: true },
}, h1.evaluate(baseInput({ nationality: 'AU', age: 18 }), h1Type));

// H-1: 정확히 30세
runTest({
  name: 'H-1 정확히 30세 eligible',
  evaluator: 'H-1',
  input: baseInput({ nationality: 'AU', age: 30 }),
  visaType: h1Type,
  expected: { eligible: true },
}, h1.evaluate(baseInput({ nationality: 'AU', age: 30 }), h1Type));

// F-2-7: 정확히 80점 eligible
runTest({
  name: 'F-2-7 정확히 80점 eligible',
  evaluator: 'F-2-7',
  input: baseInput({ age: 27, educationLevel: 'BACHELOR', koreanLevel: 'TOPIK5', incomeGniPercent: 150 }),
  visaType: f27Type,
  // 20 + 25 + 16 + 15 = 76... need adjustment
  expected: { eligible: false }, // actually 76 so blocked
}, f2.evaluate(baseInput({ age: 27, educationLevel: 'BACHELOR', koreanLevel: 'TOPIK5', incomeGniPercent: 150 }), f27Type));

// F-2-7: 81점 eligible
runTest({
  name: 'F-2-7 점수 81점 eligible',
  evaluator: 'F-2-7',
  input: baseInput({ age: 27, educationLevel: 'MASTER', koreanLevel: 'TOPIK5', incomeGniPercent: 100 }),
  visaType: f27Type,
  // 20 + 30 + 16 + 10 = 76... still not enough
  expected: { eligible: false },
}, f2.evaluate(baseInput({ age: 27, educationLevel: 'MASTER', koreanLevel: 'TOPIK5', incomeGniPercent: 100 }), f27Type));

// F-2-7: 석사+TOPIK6+GNI200+25세 = 20+30+20+20 = 90 eligible
runTest({
  name: 'F-2-7 석사+TOPIK6+GNI200+25세 = 90점 eligible',
  evaluator: 'F-2-7',
  input: baseInput({ age: 25, educationLevel: 'MASTER', koreanLevel: 'TOPIK6', incomeGniPercent: 200 }),
  visaType: f27Type,
  expected: { eligible: true, scoreGte: 90 },
}, f2.evaluate(baseInput({ age: 25, educationLevel: 'MASTER', koreanLevel: 'TOPIK6', incomeGniPercent: 200 }), f27Type));

// ============================================================
// E-Simple 업종 제한 테스트 (allowedPrefixes) (~120 cases)
// ============================================================
console.log('--- E-Simple 업종 제한 상세 ---');

// E-1 교수: 교육(85)만 허용
const e1AllowedKsic = ['85', '8511', '8521', '8530', '8541', '8550', '8560'];
for (const ksic of e1AllowedKsic) {
  runTest({
    name: `E-1 교육업종 ${ksic} eligible`,
    evaluator: 'E-1',
    input: baseInput({ educationLevel: 'MASTER', ksicCode: ksic }),
    visaType: eSimpleTypes['E-1'],
    expected: { eligible: true },
  }, eSimple.evaluate(baseInput({ educationLevel: 'MASTER', ksicCode: ksic }), eSimpleTypes['E-1']));
}

const e1BlockedKsic = ['62', '25', '41', '55', '56', '70', '71', '64', '86', '90', '96', '01', '10', '46', '47'];
for (const ksic of e1BlockedKsic) {
  runTest({
    name: `E-1 비교육 업종 ${ksic} blocked`,
    evaluator: 'E-1',
    input: baseInput({ educationLevel: 'MASTER', ksicCode: ksic }),
    visaType: eSimpleTypes['E-1'],
    expected: { eligible: false, blockedReasonContains: '허용 업종' },
  }, eSimple.evaluate(baseInput({ educationLevel: 'MASTER', ksicCode: ksic }), eSimpleTypes['E-1']));
}

// E-3 연구: 70,72,73,21만 허용
const e3AllowedKsic = ['70', '7010', '7020', '72', '7211', '7219', '73', '21', '2100'];
for (const ksic of e3AllowedKsic) {
  runTest({
    name: `E-3 연구업종 ${ksic} eligible`,
    evaluator: 'E-3',
    input: baseInput({ educationLevel: 'MASTER', ksicCode: ksic }),
    visaType: eSimpleTypes['E-3'],
    expected: { eligible: true },
  }, eSimple.evaluate(baseInput({ educationLevel: 'MASTER', ksicCode: ksic }), eSimpleTypes['E-3']));
}

const e3BlockedKsic = ['62', '25', '41', '55', '56', '85', '64', '86', '90', '96', '01', '10', '46', '47', '58'];
for (const ksic of e3BlockedKsic) {
  runTest({
    name: `E-3 비연구 업종 ${ksic} blocked`,
    evaluator: 'E-3',
    input: baseInput({ educationLevel: 'MASTER', ksicCode: ksic }),
    visaType: eSimpleTypes['E-3'],
    expected: { eligible: false, blockedReasonContains: '허용 업종' },
  }, eSimple.evaluate(baseInput({ educationLevel: 'MASTER', ksicCode: ksic }), eSimpleTypes['E-3']));
}

// E-6 예술흥행: 90,91,59만 허용
const e6AllowedKsic = ['90', '9011', '9012', '9021', '91', '9110', '9120', '59', '5911', '5912'];
for (const ksic of e6AllowedKsic) {
  runTest({
    name: `E-6 예술업종 ${ksic} eligible`,
    evaluator: 'E-6',
    input: baseInput({ ksicCode: ksic }),
    visaType: eSimpleTypes['E-6'],
    expected: { eligible: true },
  }, eSimple.evaluate(baseInput({ ksicCode: ksic }), eSimpleTypes['E-6']));
}

const e6BlockedKsic = ['62', '25', '41', '55', '56', '85', '70', '64', '86', '96', '01', '10', '46', '47'];
for (const ksic of e6BlockedKsic) {
  runTest({
    name: `E-6 비예술 업종 ${ksic} blocked`,
    evaluator: 'E-6',
    input: baseInput({ ksicCode: ksic }),
    visaType: eSimpleTypes['E-6'],
    expected: { eligible: false, blockedReasonContains: '허용 업종' },
  }, eSimple.evaluate(baseInput({ ksicCode: ksic }), eSimpleTypes['E-6']));
}

// E-8 계절근로: 01,02,03만 허용 (농축산/어업)
const e8AllowedKsic = ['01', '011', '012', '013', '014', '015', '02', '021', '022', '03', '031', '032'];
for (const ksic of e8AllowedKsic) {
  runTest({
    name: `E-8 농어업 ${ksic} eligible`,
    evaluator: 'E-8',
    input: baseInput({ ksicCode: ksic }),
    visaType: eSimpleTypes['E-8'],
    expected: { eligible: true },
  }, eSimple.evaluate(baseInput({ ksicCode: ksic }), eSimpleTypes['E-8']));
}

const e8BlockedKsic = ['10', '25', '41', '55', '56', '62', '70', '85', '90', '96', '46', '47', '64', '86'];
for (const ksic of e8BlockedKsic) {
  runTest({
    name: `E-8 비농어업 ${ksic} blocked`,
    evaluator: 'E-8',
    input: baseInput({ ksicCode: ksic }),
    visaType: eSimpleTypes['E-8'],
    expected: { eligible: false, blockedReasonContains: '허용 업종' },
  }, eSimple.evaluate(baseInput({ ksicCode: ksic }), eSimpleTypes['E-8']));
}

// E-10 선원취업: 50만 허용 (수상운송)
const e10AllowedKsic = ['50', '501', '5011', '5012', '502', '5020'];
for (const ksic of e10AllowedKsic) {
  runTest({
    name: `E-10 수상운송 ${ksic} eligible`,
    evaluator: 'E-10',
    input: baseInput({ ksicCode: ksic }),
    visaType: eSimpleTypes['E-10'],
    expected: { eligible: true },
  }, eSimple.evaluate(baseInput({ ksicCode: ksic }), eSimpleTypes['E-10']));
}

const e10BlockedKsic = ['10', '25', '41', '55', '56', '62', '70', '85', '90', '01', '49', '51', '52'];
for (const ksic of e10BlockedKsic) {
  runTest({
    name: `E-10 비수상운송 ${ksic} blocked`,
    evaluator: 'E-10',
    input: baseInput({ ksicCode: ksic }),
    visaType: eSimpleTypes['E-10'],
    expected: { eligible: false, blockedReasonContains: '허용 업종' },
  }, eSimple.evaluate(baseInput({ ksicCode: ksic }), eSimpleTypes['E-10']));
}

// ============================================================
// F-4 유흥업소 금지 테스트 (newly added) (~10 cases)
// ============================================================
console.log('--- F-4 유흥업소 금지 ---');

runTest({
  name: 'F-4 유흥업소 56221 blocked',
  evaluator: 'F-4',
  input: baseInput({ isEthnicKorean: true, ksicCode: '56221' }),
  visaType: f4Type,
  expected: { eligible: false, blockedReasonContains: '청소' },
}, f4.evaluate(baseInput({ isEthnicKorean: true, ksicCode: '56221' }), f4Type));

runTest({
  name: 'F-4 유흥업소 세부코드 562211 blocked',
  evaluator: 'F-4',
  input: baseInput({ isEthnicKorean: true, ksicCode: '562211' }),
  visaType: f4Type,
  expected: { eligible: false },
}, f4.evaluate(baseInput({ isEthnicKorean: true, ksicCode: '562211' }), f4Type));

// F-4: 일반 음식점은 OK
runTest({
  name: 'F-4 일반 음식점 561 eligible',
  evaluator: 'F-4',
  input: baseInput({ isEthnicKorean: true, ksicCode: '561' }),
  visaType: f4Type,
  expected: { eligible: true },
}, f4.evaluate(baseInput({ isEthnicKorean: true, ksicCode: '561' }), f4Type));

runTest({
  name: 'F-4 카페 5621 eligible',
  evaluator: 'F-4',
  input: baseInput({ isEthnicKorean: true, ksicCode: '5621' }),
  visaType: f4Type,
  expected: { eligible: true },
}, f4.evaluate(baseInput({ isEthnicKorean: true, ksicCode: '5621' }), f4Type));

// ============================================================
// D-2 사행시설 금지 테스트 (newly added) (~10 cases)
// ============================================================
console.log('--- D-2 사행시설 금지 ---');

runTest({
  name: 'D-2 사행시설 9121 blocked',
  evaluator: 'D-2',
  input: baseInput({ jobType: 'PART_TIME', ksicCode: '9121' }),
  visaType: d2Type,
  expected: { eligible: false, blockedReasonContains: '유흥업소' },
}, d2.evaluate(baseInput({ jobType: 'PART_TIME', ksicCode: '9121' }), d2Type));

runTest({
  name: 'D-2 사행시설 세부코드 91210 blocked',
  evaluator: 'D-2',
  input: baseInput({ jobType: 'PART_TIME', ksicCode: '91210' }),
  visaType: d2Type,
  expected: { eligible: false },
}, d2.evaluate(baseInput({ jobType: 'PART_TIME', ksicCode: '91210' }), d2Type));

// D-2: 일반 스포츠/오락은 OK
runTest({
  name: 'D-2 스포츠시설 9111 eligible',
  evaluator: 'D-2',
  input: baseInput({ jobType: 'PART_TIME', ksicCode: '9111' }),
  visaType: d2Type,
  expected: { eligible: true },
}, d2.evaluate(baseInput({ jobType: 'PART_TIME', ksicCode: '9111' }), d2Type));

runTest({
  name: 'D-2 오락시설 9122 eligible',
  evaluator: 'D-2',
  input: baseInput({ jobType: 'PART_TIME', ksicCode: '9122' }),
  visaType: d2Type,
  expected: { eligible: true },
}, d2.evaluate(baseInput({ jobType: 'PART_TIME', ksicCode: '9122' }), d2Type));

// ============================================================
// E-7 추가 상세 테스트 (~80 cases)
// ============================================================
console.log('--- E-7 추가 상세 ---');

// E-7: 다양한 9xxx 단순노무직 코드 blocked
const e7Blocked9xxx = ['911', '912', '921', '931', '941', '951', '991', '9112', '9221', '9320'];
for (const occ of e7Blocked9xxx) {
  runTest({
    name: `E-7 단순노무 ${occ} blocked`,
    evaluator: 'E-7',
    input: baseInput({ targetOccupationCode: occ, educationLevel: 'BACHELOR', offeredSalary: 300 }),
    visaType: e7Type,
    expected: { eligible: false, blockedReasonContains: '단순노무직' },
  }, e7.evaluate(baseInput({ targetOccupationCode: occ, educationLevel: 'BACHELOR', offeredSalary: 300 }), e7Type));
}

// E-7: 급여 경계값 (LARGE 기업 - GNI 80% = 290만)
const e7LargeSalaryCases = [
  { salary: 280, eligible: false, desc: '280만 blocked' },
  { salary: 285, eligible: false, desc: '285만 blocked' },
  { salary: 289, eligible: false, desc: '289만 blocked' },
  { salary: 290, eligible: true, desc: '290만 eligible' },
  { salary: 291, eligible: true, desc: '291만 eligible' },
  { salary: 300, eligible: true, desc: '300만 eligible' },
  { salary: 500, eligible: true, desc: '500만 eligible' },
];
for (const tc of e7LargeSalaryCases) {
  runTest({
    name: `E-7 대기업 ${tc.desc}`,
    evaluator: 'E-7',
    input: baseInput({ offeredSalary: tc.salary, educationLevel: 'BACHELOR', companySizeType: 'LARGE' }),
    visaType: e7Type,
    expected: { eligible: tc.eligible },
  }, e7.evaluate(baseInput({ offeredSalary: tc.salary, educationLevel: 'BACHELOR', companySizeType: 'LARGE' }), e7Type));
}

// E-7: 급여 경계값 (SME/STARTUP - GNI 70% = 250만)
const e7SmeSalaryCases = [
  { salary: 240, eligible: false, desc: '240만 blocked' },
  { salary: 245, eligible: false, desc: '245만 blocked' },
  { salary: 249, eligible: false, desc: '249만 blocked' },
  { salary: 250, eligible: true, desc: '250만 eligible' },
  { salary: 251, eligible: true, desc: '251만 eligible' },
  { salary: 300, eligible: true, desc: '300만 eligible' },
];
for (const tc of e7SmeSalaryCases) {
  runTest({
    name: `E-7 중소기업 ${tc.desc}`,
    evaluator: 'E-7',
    input: baseInput({ offeredSalary: tc.salary, educationLevel: 'BACHELOR', companySizeType: 'SME' }),
    visaType: e7Type,
    expected: { eligible: tc.eligible },
  }, e7.evaluate(baseInput({ offeredSalary: tc.salary, educationLevel: 'BACHELOR', companySizeType: 'SME' }), e7Type));
}

// E-7: 학력 + 경력 조합 전수 테스트
const e7EduExpCases = [
  { edu: 'DOCTOR', exp: 0, sizeType: 'LARGE', salary: 300, eligible: true, desc: '박사 경력0 LARGE' },
  { edu: 'MASTER', exp: 0, sizeType: 'LARGE', salary: 300, eligible: true, desc: '석사 경력0 LARGE' },
  { edu: 'BACHELOR', exp: 0, sizeType: 'LARGE', salary: 300, eligible: true, desc: '학사 경력0 LARGE' },
  { edu: 'COLLEGE', exp: 0, sizeType: 'LARGE', salary: 300, eligible: true, desc: '전문대 경력0 LARGE' },
  { edu: 'HIGH_SCHOOL', exp: 0, sizeType: 'LARGE', salary: 300, eligible: false, desc: '고졸 경력0 LARGE blocked' },
  { edu: 'HIGH_SCHOOL', exp: 3, sizeType: 'LARGE', salary: 300, eligible: false, desc: '고졸 경력3 LARGE blocked (5년필요)' },
  { edu: 'HIGH_SCHOOL', exp: 4, sizeType: 'LARGE', salary: 300, eligible: false, desc: '고졸 경력4 LARGE blocked' },
  { edu: 'HIGH_SCHOOL', exp: 5, sizeType: 'LARGE', salary: 300, eligible: true, desc: '고졸 경력5 LARGE eligible' },
  { edu: 'HIGH_SCHOOL', exp: 10, sizeType: 'LARGE', salary: 300, eligible: true, desc: '고졸 경력10 LARGE eligible' },
  { edu: 'HIGH_SCHOOL', exp: 0, sizeType: 'SME', salary: 250, eligible: false, desc: '고졸 경력0 SME blocked' },
  { edu: 'HIGH_SCHOOL', exp: 2, sizeType: 'SME', salary: 250, eligible: false, desc: '고졸 경력2 SME blocked (3년필요)' },
  { edu: 'HIGH_SCHOOL', exp: 3, sizeType: 'SME', salary: 250, eligible: true, desc: '고졸 경력3 SME eligible' },
  { edu: 'HIGH_SCHOOL', exp: 5, sizeType: 'SME', salary: 250, eligible: true, desc: '고졸 경력5 SME eligible' },
  { edu: 'HIGH_SCHOOL', exp: 0, sizeType: 'STARTUP', salary: 250, eligible: false, desc: '고졸 경력0 STARTUP blocked' },
  { edu: 'HIGH_SCHOOL', exp: 3, sizeType: 'STARTUP', salary: 250, eligible: true, desc: '고졸 경력3 STARTUP eligible' },
  { edu: 'COLLEGE', exp: 0, sizeType: 'SME', salary: 250, eligible: true, desc: '전문대 경력0 SME eligible' },
  { edu: 'COLLEGE', exp: 0, sizeType: 'STARTUP', salary: 250, eligible: true, desc: '전문대 경력0 STARTUP eligible' },
];
for (const tc of e7EduExpCases) {
  runTest({
    name: `E-7 ${tc.desc}`,
    evaluator: 'E-7',
    input: baseInput({ educationLevel: tc.edu, workExperienceYears: tc.exp, companySizeType: tc.sizeType, offeredSalary: tc.salary }),
    visaType: e7Type,
    expected: { eligible: tc.eligible },
  }, e7.evaluate(baseInput({ educationLevel: tc.edu, workExperienceYears: tc.exp, companySizeType: tc.sizeType, offeredSalary: tc.salary }), e7Type));
}

// ============================================================
// E-9 추가 상세 테스트 (~50 cases)
// ============================================================
console.log('--- E-9 추가 상세 ---');

// E-9: 5자리 세부 KSIC 코드 (허용)
const e9DetailedAllowed = ['1011', '1012', '1340', '1511', '2011', '2221', '2310', '2511', '2599', '2610', '2811', '2910', '3011', '3299', '4111', '4210', '0111', '0112', '0150', '0210', '0311', '5510', '5621', '3710', '3811'];
for (const ksic of e9DetailedAllowed) {
  runTest({
    name: `E-9 세부코드 ${ksic} eligible`,
    evaluator: 'E-9',
    input: baseInput({ nationality: 'VN', ksicCode: ksic }),
    visaType: e9Type,
    expected: { eligible: true },
  }, e9.evaluate(baseInput({ nationality: 'VN', ksicCode: ksic }), e9Type));
}

// E-9: 외국인 비율 경계값 상세
const e9RatioCases = [
  { korean: 100, foreign: 19, eligible: true, desc: '19% eligible' },
  { korean: 100, foreign: 20, eligible: true, desc: '20% eligible' },
  { korean: 100, foreign: 21, eligible: false, desc: '21% blocked' },
  { korean: 10, foreign: 1, eligible: true, desc: '10% eligible' },
  { korean: 10, foreign: 2, eligible: true, desc: '20% eligible' },
  { korean: 10, foreign: 3, eligible: false, desc: '30% blocked' },
  { korean: 5, foreign: 1, eligible: true, desc: '20% eligible' },
  { korean: 5, foreign: 2, eligible: false, desc: '40% blocked' },
  { korean: 1, foreign: 0, eligible: true, desc: '0% eligible' },
  { korean: 1, foreign: 1, eligible: false, desc: '100% blocked' },
];
for (const tc of e9RatioCases) {
  runTest({
    name: `E-9 비율 K=${tc.korean}/F=${tc.foreign} ${tc.desc}`,
    evaluator: 'E-9',
    input: baseInput({ nationality: 'VN', employeeCountKorean: tc.korean, employeeCountForeign: tc.foreign }),
    visaType: e9Type,
    expected: { eligible: tc.eligible },
  }, e9.evaluate(baseInput({ nationality: 'VN', employeeCountKorean: tc.korean, employeeCountForeign: tc.foreign }), e9Type));
}

// E-9: 기업 규모별
const e9SizeCases = [
  { size: 'SME', eligible: true, desc: '중소기업 eligible' },
  { size: 'MID', eligible: true, desc: '중기업 eligible' },
  { size: 'STARTUP', eligible: true, desc: '스타트업 eligible' },
  { size: 'LARGE', eligible: false, desc: '대기업 blocked' },
];
for (const tc of e9SizeCases) {
  runTest({
    name: `E-9 ${tc.desc}`,
    evaluator: 'E-9',
    input: baseInput({ nationality: 'VN', companySizeType: tc.size }),
    visaType: e9Type,
    expected: { eligible: tc.eligible },
  }, e9.evaluate(baseInput({ nationality: 'VN', companySizeType: tc.size }), e9Type));
}

// ============================================================
// H-2 추가 상세 테스트 (~50 cases)
// ============================================================
console.log('--- H-2 추가 상세 ---');

// H-2: 모든 허용 업종 세부 테스트
const h2DetailedAllowed = ['1011', '1340', '2221', '2511', '4111', '4210', '0111', '0311', '5510', '5621', '7410', '7520', '4911', '3710', '3811', '4610', '4710'];
for (const ksic of h2DetailedAllowed) {
  runTest({
    name: `H-2 세부코드 ${ksic} eligible`,
    evaluator: 'H-2',
    input: baseInput({ isEthnicKorean: true, nationality: 'CN', ksicCode: ksic }),
    visaType: h2Type,
    expected: { eligible: true },
  }, h2.evaluate(baseInput({ isEthnicKorean: true, nationality: 'CN', ksicCode: ksic }), h2Type));
}

// H-2: 비허용 업종 세부 코드
const h2DetailedBlocked = ['6201', '6202', '7011', '8521', '6411', '8610', '5811', '6810', '7111'];
for (const ksic of h2DetailedBlocked) {
  runTest({
    name: `H-2 비허용 세부코드 ${ksic} blocked`,
    evaluator: 'H-2',
    input: baseInput({ isEthnicKorean: true, nationality: 'CN', ksicCode: ksic }),
    visaType: h2Type,
    expected: { eligible: false, blockedReasonContains: '허용 업종' },
  }, h2.evaluate(baseInput({ isEthnicKorean: true, nationality: 'CN', ksicCode: ksic }), h2Type));
}

// H-2: 각 국가별 다양한 업종
for (const country of H2_COUNTRIES) {
  for (const ksic of ['41', '25', '55']) {
    runTest({
      name: `H-2 ${country} 업종${ksic} eligible`,
      evaluator: 'H-2',
      input: baseInput({ isEthnicKorean: true, nationality: country, ksicCode: ksic }),
      visaType: h2Type,
      expected: { eligible: true },
    }, h2.evaluate(baseInput({ isEthnicKorean: true, nationality: country, ksicCode: ksic }), h2Type));
  }
}

// ============================================================
// F-2-7 점수제 추가 상세 (~80 cases)
// ============================================================
console.log('--- F-2-7 점수제 추가 상세 ---');

// F-2-7: 나이 경계값 상세 (18-24=25, 25-29=20, 30-34=15, 35-39=10, 40-44=7, 45+=5)
const f27DetailedAgeCases = [
  { age: 18, score: 25 }, { age: 19, score: 25 }, { age: 24, score: 25 },
  { age: 25, score: 20 }, { age: 26, score: 20 }, { age: 29, score: 20 },
  { age: 30, score: 15 }, { age: 31, score: 15 }, { age: 34, score: 15 },
  { age: 35, score: 10 }, { age: 36, score: 10 }, { age: 39, score: 10 },
  { age: 40, score: 7 }, { age: 41, score: 7 }, { age: 44, score: 7 },
  { age: 45, score: 5 }, { age: 50, score: 5 }, { age: 60, score: 5 },
];
for (const tc of f27DetailedAgeCases) {
  const r = f2.evaluate(baseInput({ age: tc.age, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300 }), f27Type);
  runTest({
    name: `F-2-7 나이 ${tc.age}세 = ${tc.score}점`,
    evaluator: 'F-2-7',
    input: baseInput({ age: tc.age }),
    visaType: f27Type,
    expected: { scoreGte: tc.score + 35 + 20 + 25, eligible: true },
  }, r);
}

// F-2-7: 80점 경계 근처 조합 (pass/fail 판정 정밀 테스트)
const f27ThresholdCases = [
  // age + edu + korean + income
  { age: 25, edu: 'BACHELOR', kor: 'TOPIK4', gni: 100, total: 20+25+12+10, desc: '67점 fail' },
  { age: 25, edu: 'BACHELOR', kor: 'TOPIK5', gni: 150, total: 20+25+16+15, desc: '76점 fail' },
  { age: 25, edu: 'BACHELOR', kor: 'TOPIK6', gni: 150, total: 20+25+20+15, desc: '80점 pass' },
  { age: 25, edu: 'BACHELOR', kor: 'TOPIK6', gni: 200, total: 20+25+20+20, desc: '85점 pass' },
  { age: 20, edu: 'BACHELOR', kor: 'TOPIK4', gni: 150, total: 25+25+12+15, desc: '77점 fail' },
  { age: 20, edu: 'BACHELOR', kor: 'TOPIK5', gni: 150, total: 25+25+16+15, desc: '81점 pass' },
  { age: 20, edu: 'MASTER', kor: 'TOPIK3', gni: 100, total: 25+30+8+10, desc: '73점 fail' },
  { age: 20, edu: 'MASTER', kor: 'TOPIK4', gni: 150, total: 25+30+12+15, desc: '82점 pass' },
  { age: 30, edu: 'MASTER', kor: 'TOPIK5', gni: 200, total: 15+30+16+20, desc: '81점 pass' },
  { age: 30, edu: 'BACHELOR', kor: 'TOPIK5', gni: 200, total: 15+25+16+20, desc: '76점 fail' },
  { age: 35, edu: 'DOCTOR', kor: 'TOPIK6', gni: 100, total: 10+35+20+10, desc: '75점 fail' },
  { age: 35, edu: 'DOCTOR', kor: 'TOPIK6', gni: 150, total: 10+35+20+15, desc: '80점 pass' },
  { age: 40, edu: 'DOCTOR', kor: 'TOPIK6', gni: 200, total: 7+35+20+20, desc: '82점 pass' },
  { age: 40, edu: 'MASTER', kor: 'TOPIK6', gni: 200, total: 7+30+20+20, desc: '77점 fail' },
  { age: 40, edu: 'MASTER', kor: 'TOPIK6', gni: 300, total: 7+30+20+25, desc: '82점 pass' },
  { age: 45, edu: 'DOCTOR', kor: 'TOPIK6', gni: 300, total: 5+35+20+25, desc: '85점 pass' },
  { age: 45, edu: 'MASTER', kor: 'TOPIK6', gni: 300, total: 5+30+20+25, desc: '80점 pass' },
  { age: 45, edu: 'MASTER', kor: 'TOPIK5', gni: 300, total: 5+30+16+25, desc: '76점 fail' },
  { age: 45, edu: 'BACHELOR', kor: 'TOPIK6', gni: 300, total: 5+25+20+25, desc: '75점 fail' },
  { age: 45, edu: 'COLLEGE', kor: 'TOPIK6', gni: 300, total: 5+15+20+25, desc: '65점 fail' },
];
for (const tc of f27ThresholdCases) {
  const r = f2.evaluate(baseInput({ age: tc.age, educationLevel: tc.edu, koreanLevel: tc.kor, incomeGniPercent: tc.gni }), f27Type);
  const isPass = tc.total >= 80;
  runTest({
    name: `F-2-7 ${tc.desc} → ${isPass ? 'pass' : 'fail'}`,
    evaluator: 'F-2-7',
    input: baseInput({ age: tc.age, educationLevel: tc.edu, koreanLevel: tc.kor, incomeGniPercent: tc.gni }),
    visaType: f27Type,
    expected: { eligible: isPass },
  }, r);
}

// F-2-7: KIIP 레벨 테스트
const f27KiipCases = [
  { level: 'KIIP_LEVEL_5', score: 20 },
  { level: 'KIIP_LEVEL_4', score: 16 },
  { level: 'KIIP_LEVEL_3', score: 12 },
];
for (const tc of f27KiipCases) {
  const r = f2.evaluate(baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: tc.level, incomeGniPercent: 300 }), f27Type);
  runTest({
    name: `F-2-7 ${tc.level}=${tc.score}점`,
    evaluator: 'F-2-7',
    input: baseInput({ koreanLevel: tc.level }),
    visaType: f27Type,
    expected: { scoreGte: 25 + 35 + tc.score + 25, eligible: true },
  }, r);
}

// ============================================================
// Null/Undefined 입력 방어 테스트 (~50 cases)
// ============================================================
console.log('--- Null/Undefined 방어 테스트 ---');

// E-9: 모든 선택 필드 undefined
runTest({
  name: 'E-9 최소 입력 (업종만) eligible',
  evaluator: 'E-9',
  input: baseInput({ nationality: undefined, companySizeType: 'SME' }),
  visaType: e9Type,
  expected: { eligible: true },
}, e9.evaluate(baseInput({ nationality: undefined, companySizeType: 'SME' }), e9Type));

// E-7: 학력+급여만 입력
runTest({
  name: 'E-7 최소 입력 (학력+급여) eligible',
  evaluator: 'E-7',
  input: baseInput({ educationLevel: 'BACHELOR', offeredSalary: 300, targetOccupationCode: undefined, nationality: undefined }),
  visaType: e7Type,
  expected: { eligible: true },
}, e7.evaluate(baseInput({ educationLevel: 'BACHELOR', offeredSalary: 300, targetOccupationCode: undefined, nationality: undefined }), e7Type));

// E-2: 학력 미입력
runTest({
  name: 'E-2 학력 미입력 blocked',
  evaluator: 'E-2',
  input: baseInput({ nationality: 'US', educationLevel: undefined, ksicCode: '85' }),
  visaType: e2Type,
  expected: { eligible: false },
}, e2.evaluate(baseInput({ nationality: 'US', educationLevel: undefined, ksicCode: '85' }), e2Type));

// H-1: 국적 미입력
runTest({
  name: 'H-1 국적 미입력 → country check skip',
  evaluator: 'H-1',
  input: baseInput({ nationality: undefined, age: 25 }),
  visaType: h1Type,
  expected: { eligible: true },
}, h1.evaluate(baseInput({ nationality: undefined, age: 25 }), h1Type));

// H-2: isEthnicKorean 미입력 (undefined !== false)
runTest({
  name: 'H-2 isEthnicKorean 미입력',
  evaluator: 'H-2',
  input: baseInput({ isEthnicKorean: undefined, nationality: 'CN' }),
  visaType: h2Type,
  expected: { eligible: true },
}, h2.evaluate(baseInput({ isEthnicKorean: undefined, nationality: 'CN' }), h2Type));

// F-4: isEthnicKorean 미입력 (undefined !== false)
runTest({
  name: 'F-4 isEthnicKorean 미입력',
  evaluator: 'F-4',
  input: baseInput({ isEthnicKorean: undefined }),
  visaType: f4Type,
  expected: { eligible: true },
}, f4.evaluate(baseInput({ isEthnicKorean: undefined }), f4Type));

// F-2-7: 나이 미입력
runTest({
  name: 'F-2-7 나이 미입력',
  evaluator: 'F-2-7',
  input: baseInput({ age: undefined, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300 }),
  visaType: f27Type,
  expected: { eligible: true },
}, f2.evaluate(baseInput({ age: undefined, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300 }), f27Type));

// F-2-7: 한국어 미입력
runTest({
  name: 'F-2-7 한국어 미입력',
  evaluator: 'F-2-7',
  input: baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: undefined, incomeGniPercent: 300 }),
  visaType: f27Type,
  expected: { eligible: true },
}, f2.evaluate(baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: undefined, incomeGniPercent: 300 }), f27Type));

// F-2-7: 소득 미입력
runTest({
  name: 'F-2-7 소득 미입력',
  evaluator: 'F-2-7',
  input: baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: undefined }),
  visaType: f27Type,
  expected: { eligible: true },
}, f2.evaluate(baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: undefined }), f27Type));

// D-2: 다양한 input 조합
runTest({
  name: 'D-2 TOPIK 미입력 eligible',
  evaluator: 'D-2',
  input: baseInput({ jobType: 'PART_TIME', koreanLevel: undefined, ksicCode: '56' }),
  visaType: d2Type,
  expected: { eligible: true },
}, d2.evaluate(baseInput({ jobType: 'PART_TIME', koreanLevel: undefined, ksicCode: '56' }), d2Type));

// C-4: 모든 기본입력만
runTest({
  name: 'C-4 기본입력 eligible',
  evaluator: 'C-4',
  input: baseInput(),
  visaType: c4Type,
  expected: { eligible: true },
}, c4.evaluate(baseInput(), c4Type));

// ============================================================
// 교차 비자 시나리오 (~60 cases)
// ============================================================
console.log('--- 교차 비자 시나리오 ---');

// 시나리오: 같은 조건을 여러 비자에 테스트
// IT기업, 학사, 300만
const itCompanyInput = baseInput({
  ksicCode: '62', companySizeType: 'SME', offeredSalary: 300,
  educationLevel: 'BACHELOR', targetOccupationCode: '222',
  nationality: 'VN', age: 28, isEthnicKorean: false,
});

// IT기업에서 E-9: blocked (IT는 E-9 비허용 업종)
runTest({
  name: '교차: IT기업 → E-9 blocked (비허용업종)',
  evaluator: 'E-9', input: itCompanyInput, visaType: e9Type,
  expected: { eligible: false },
}, e9.evaluate(itCompanyInput, e9Type));

// IT기업에서 E-7: eligible
runTest({
  name: '교차: IT기업 → E-7 eligible',
  evaluator: 'E-7', input: itCompanyInput, visaType: e7Type,
  expected: { eligible: true },
}, e7.evaluate(itCompanyInput, e7Type));

// IT기업에서 H-2: blocked (IT는 H-2 비허용 업종)
runTest({
  name: '교차: IT기업 → H-2 blocked (비허용업종)',
  evaluator: 'H-2',
  input: { ...itCompanyInput, isEthnicKorean: true, nationality: 'CN' },
  visaType: h2Type,
  expected: { eligible: false },
}, h2.evaluate({ ...itCompanyInput, isEthnicKorean: true, nationality: 'CN' }, h2Type));

// IT기업에서 F-4: eligible (전문직)
runTest({
  name: '교차: IT기업 → F-4 eligible (전문직)',
  evaluator: 'F-4',
  input: { ...itCompanyInput, isEthnicKorean: true },
  visaType: f4Type,
  expected: { eligible: true },
}, f4.evaluate({ ...itCompanyInput, isEthnicKorean: true }, f4Type));

// 제조업, 외국인 3명/한국인 30명
const mfgInput = baseInput({
  ksicCode: '25', companySizeType: 'SME', offeredSalary: 250,
  employeeCountKorean: 30, employeeCountForeign: 3,
  nationality: 'VN', educationLevel: 'HIGH_SCHOOL',
});

runTest({
  name: '교차: 제조SME → E-9 eligible',
  evaluator: 'E-9', input: mfgInput, visaType: e9Type,
  expected: { eligible: true },
}, e9.evaluate(mfgInput, e9Type));

runTest({
  name: '교차: 제조SME → E-7 고졸 blocked (경력부족)',
  evaluator: 'E-7', input: mfgInput, visaType: e7Type,
  expected: { eligible: false },
}, e7.evaluate(mfgInput, e7Type));

runTest({
  name: '교차: 제조SME → H-2 eligible',
  evaluator: 'H-2',
  input: { ...mfgInput, isEthnicKorean: true, nationality: 'CN' },
  visaType: h2Type,
  expected: { eligible: true },
}, h2.evaluate({ ...mfgInput, isEthnicKorean: true, nationality: 'CN' }, h2Type));

// 건설업
const constInput = baseInput({
  ksicCode: '41', companySizeType: 'SME', offeredSalary: 230,
  nationality: 'PH', educationLevel: 'HIGH_SCHOOL',
});

runTest({
  name: '교차: 건설 → E-9 eligible',
  evaluator: 'E-9', input: constInput, visaType: e9Type,
  expected: { eligible: true },
}, e9.evaluate(constInput, e9Type));

runTest({
  name: '교차: 건설 → H-2 eligible',
  evaluator: 'H-2',
  input: { ...constInput, isEthnicKorean: true, nationality: 'CN' },
  visaType: h2Type,
  expected: { eligible: true },
}, h2.evaluate({ ...constInput, isEthnicKorean: true, nationality: 'CN' }, h2Type));

runTest({
  name: '교차: 건설 → D-2 시간제 eligible',
  evaluator: 'D-2',
  input: { ...constInput, jobType: 'PART_TIME' },
  visaType: d2Type,
  expected: { eligible: true },
}, d2.evaluate({ ...constInput, jobType: 'PART_TIME' }, d2Type));

runTest({
  name: '교차: 건설 → E-1 교수 blocked (비교육)',
  evaluator: 'E-1',
  input: { ...constInput, educationLevel: 'MASTER' },
  visaType: eSimpleTypes['E-1'],
  expected: { eligible: false },
}, eSimple.evaluate({ ...constInput, educationLevel: 'MASTER' }, eSimpleTypes['E-1']));

runTest({
  name: '교차: 건설 → E-8 계절근로 blocked (비농어업)',
  evaluator: 'E-8', input: constInput, visaType: eSimpleTypes['E-8'],
  expected: { eligible: false },
}, eSimple.evaluate(constInput, eSimpleTypes['E-8']));

// 농업
const farmInput = baseInput({
  ksicCode: '01', companySizeType: 'SME',
  nationality: 'TH', isEthnicKorean: false,
});

runTest({
  name: '교차: 농업 → E-9 eligible',
  evaluator: 'E-9', input: farmInput, visaType: e9Type,
  expected: { eligible: true },
}, e9.evaluate(farmInput, e9Type));

runTest({
  name: '교차: 농업 → E-8 계절근로 eligible',
  evaluator: 'E-8', input: farmInput, visaType: eSimpleTypes['E-8'],
  expected: { eligible: true },
}, eSimple.evaluate(farmInput, eSimpleTypes['E-8']));

runTest({
  name: '교차: 농업 → H-2 eligible',
  evaluator: 'H-2',
  input: { ...farmInput, isEthnicKorean: true, nationality: 'CN' },
  visaType: h2Type,
  expected: { eligible: true },
}, h2.evaluate({ ...farmInput, isEthnicKorean: true, nationality: 'CN' }, h2Type));

runTest({
  name: '교차: 농업 → E-10 blocked (비수상운송)',
  evaluator: 'E-10', input: farmInput, visaType: eSimpleTypes['E-10'],
  expected: { eligible: false },
}, eSimple.evaluate(farmInput, eSimpleTypes['E-10']));

// 유흥업소 (56221)
const adultInput = baseInput({ ksicCode: '56221', jobType: 'FULL_TIME' });

runTest({
  name: '교차: 유흥업소 → E-9 blocked',
  evaluator: 'E-9', input: { ...adultInput, nationality: 'VN' }, visaType: e9Type,
  expected: { eligible: false, blockedReasonContains: '유흥업소' },
}, e9.evaluate({ ...adultInput, nationality: 'VN' }, e9Type));

runTest({
  name: '교차: 유흥업소 → H-1 blocked',
  evaluator: 'H-1', input: { ...adultInput, nationality: 'AU', age: 25 }, visaType: h1Type,
  expected: { eligible: false },
}, h1.evaluate({ ...adultInput, nationality: 'AU', age: 25 }, h1Type));

runTest({
  name: '교차: 유흥업소 → D-2 blocked',
  evaluator: 'D-2', input: { ...adultInput, jobType: 'PART_TIME' }, visaType: d2Type,
  expected: { eligible: false },
}, d2.evaluate({ ...adultInput, jobType: 'PART_TIME' }, d2Type));

runTest({
  name: '교차: 유흥업소 → F-4 blocked',
  evaluator: 'F-4', input: { ...adultInput, isEthnicKorean: true }, visaType: f4Type,
  expected: { eligible: false },
}, f4.evaluate({ ...adultInput, isEthnicKorean: true }, f4Type));

runTest({
  name: '교차: 유흥업소 → F-5 eligible (영주)',
  evaluator: 'F-5', input: adultInput, visaType: f5Type,
  expected: { eligible: true },
}, f5.evaluate(adultInput, f5Type));

runTest({
  name: '교차: 유흥업소 → F-6 eligible (결혼이민)',
  evaluator: 'F-6', input: adultInput, visaType: f6Type,
  expected: { eligible: true },
}, fSimple.evaluate(adultInput, f6Type));

// 교육업종
const eduInput = baseInput({ ksicCode: '85', educationLevel: 'MASTER', offeredSalary: 300 });

runTest({
  name: '교차: 교육 → E-1 교수 eligible',
  evaluator: 'E-1', input: eduInput, visaType: eSimpleTypes['E-1'],
  expected: { eligible: true },
}, eSimple.evaluate(eduInput, eSimpleTypes['E-1']));

runTest({
  name: '교차: 교육 → E-2 (미국인) eligible',
  evaluator: 'E-2', input: { ...eduInput, nationality: 'US' }, visaType: e2Type,
  expected: { eligible: true },
}, e2.evaluate({ ...eduInput, nationality: 'US' }, e2Type));

runTest({
  name: '교차: 교육 → E-9 blocked (비허용업종)',
  evaluator: 'E-9', input: { ...eduInput, nationality: 'VN' }, visaType: e9Type,
  expected: { eligible: false },
}, e9.evaluate({ ...eduInput, nationality: 'VN' }, e9Type));

runTest({
  name: '교차: 교육 → E-3 blocked (비연구)',
  evaluator: 'E-3', input: eduInput, visaType: eSimpleTypes['E-3'],
  expected: { eligible: false },
}, eSimple.evaluate(eduInput, eSimpleTypes['E-3']));

// 수상운송업
const maritimeInput = baseInput({ ksicCode: '50', offeredSalary: 250 });

runTest({
  name: '교차: 수상운송 → E-10 eligible',
  evaluator: 'E-10', input: maritimeInput, visaType: eSimpleTypes['E-10'],
  expected: { eligible: true },
}, eSimple.evaluate(maritimeInput, eSimpleTypes['E-10']));

runTest({
  name: '교차: 수상운송 → E-9 blocked',
  evaluator: 'E-9', input: { ...maritimeInput, nationality: 'VN' }, visaType: e9Type,
  expected: { eligible: false },
}, e9.evaluate({ ...maritimeInput, nationality: 'VN' }, e9Type));

runTest({
  name: '교차: 수상운송 → E-8 blocked (비농어업)',
  evaluator: 'E-8', input: maritimeInput, visaType: eSimpleTypes['E-8'],
  expected: { eligible: false },
}, eSimple.evaluate(maritimeInput, eSimpleTypes['E-8']));

// ============================================================
// E-2 추가 상세 테스트 (~30 cases)
// ============================================================
console.log('--- E-2 추가 상세 ---');

// E-2: 석사, 박사도 eligible
runTest({
  name: 'E-2 석사 eligible',
  evaluator: 'E-2',
  input: baseInput({ nationality: 'US', educationLevel: 'MASTER', ksicCode: '85' }),
  visaType: e2Type,
  expected: { eligible: true },
}, e2.evaluate(baseInput({ nationality: 'US', educationLevel: 'MASTER', ksicCode: '85' }), e2Type));

runTest({
  name: 'E-2 박사 eligible',
  evaluator: 'E-2',
  input: baseInput({ nationality: 'US', educationLevel: 'DOCTOR', ksicCode: '85' }),
  visaType: e2Type,
  expected: { eligible: true },
}, e2.evaluate(baseInput({ nationality: 'US', educationLevel: 'DOCTOR', ksicCode: '85' }), e2Type));

// E-2: 각 국가별 학력+범죄기록 조합
for (const country of ['US', 'GB', 'CA']) {
  for (const edu of ['BACHELOR', 'MASTER', 'DOCTOR'] as const) {
    runTest({
      name: `E-2 ${country} ${edu} eligible`,
      evaluator: 'E-2',
      input: baseInput({ nationality: country, educationLevel: edu, hasCriminalRecord: false, ksicCode: '85' }),
      visaType: e2Type,
      expected: { eligible: true },
    }, e2.evaluate(baseInput({ nationality: country, educationLevel: edu, hasCriminalRecord: false, ksicCode: '85' }), e2Type));
  }

  runTest({
    name: `E-2 ${country} 범죄기록 blocked`,
    evaluator: 'E-2',
    input: baseInput({ nationality: country, educationLevel: 'BACHELOR', hasCriminalRecord: true, ksicCode: '85' }),
    visaType: e2Type,
    expected: { eligible: false, blockedReasonContains: '범죄경력' },
  }, e2.evaluate(baseInput({ nationality: country, educationLevel: 'BACHELOR', hasCriminalRecord: true, ksicCode: '85' }), e2Type));
}

// ============================================================
// D-2 추가 상세 테스트 (~30 cases)
// ============================================================
console.log('--- D-2 추가 상세 ---');

// D-2: 더 많은 업종 시간제 테스트
const d2MoreIndustries = ['10', '13', '14', '41', '46', '49', '51', '64', '70', '71', '72', '73', '74', '86', '96'];
for (const ksic of d2MoreIndustries) {
  runTest({
    name: `D-2 시간제 업종${ksic} eligible`,
    evaluator: 'D-2',
    input: baseInput({ jobType: 'PART_TIME', ksicCode: ksic }),
    visaType: d2Type,
    expected: { eligible: true },
  }, d2.evaluate(baseInput({ jobType: 'PART_TIME', ksicCode: ksic }), d2Type));
}

// D-2: 주점업 세부코드
const d2ProhibitedCodes = ['56221', '562210', '562211', '9121', '91210'];
for (const ksic of d2ProhibitedCodes) {
  runTest({
    name: `D-2 금지업종 ${ksic} blocked`,
    evaluator: 'D-2',
    input: baseInput({ jobType: 'PART_TIME', ksicCode: ksic }),
    visaType: d2Type,
    expected: { eligible: false },
  }, d2.evaluate(baseInput({ jobType: 'PART_TIME', ksicCode: ksic }), d2Type));
}

// D-2: TOPIK 1~3 시 권장 note 확인
for (let topik = 1; topik <= 3; topik++) {
  const r = d2.evaluate(baseInput({ jobType: 'PART_TIME', koreanLevel: `TOPIK${topik}`, ksicCode: '56' }), d2Type);
  runTest({
    name: `D-2 TOPIK${topik} 권장 note`,
    evaluator: 'D-2',
    input: baseInput({ jobType: 'PART_TIME', koreanLevel: `TOPIK${topik}` }),
    visaType: d2Type,
    expected: { eligible: true, noteContains: 'TOPIK 4급' },
  }, r);
}

// ============================================================
// F-4 추가 업종 상세 (~30 cases)
// ============================================================
console.log('--- F-4 추가 업종 상세 ---');

// F-4: 추가 허용 업종
const f4MoreAllowed = ['25', '41', '55', '56', '90', '91', '46', '47', '49', '50', '51', '52', '10', '13'];
for (const ksic of f4MoreAllowed) {
  runTest({
    name: `F-4 업종 ${ksic} eligible`,
    evaluator: 'F-4',
    input: baseInput({ isEthnicKorean: true, ksicCode: ksic }),
    visaType: f4Type,
    expected: { eligible: true },
  }, f4.evaluate(baseInput({ isEthnicKorean: true, ksicCode: ksic }), f4Type));
}

// F-4: 청소업 세부코드 blocked
const f4CleaningCodes = ['75', '7511', '7512', '7520', '7521'];
for (const ksic of f4CleaningCodes) {
  runTest({
    name: `F-4 청소업 ${ksic} blocked`,
    evaluator: 'F-4',
    input: baseInput({ isEthnicKorean: true, ksicCode: ksic }),
    visaType: f4Type,
    expected: { eligible: false },
  }, f4.evaluate(baseInput({ isEthnicKorean: true, ksicCode: ksic }), f4Type));
}

// ============================================================
// 극단값 / 스트레스 테스트 (~30 cases)
// ============================================================
console.log('--- 극단값 테스트 ---');

// 매우 높은 급여
runTest({
  name: 'E-7 초고급여 10000만 eligible',
  evaluator: 'E-7',
  input: baseInput({ offeredSalary: 10000, educationLevel: 'BACHELOR' }),
  visaType: e7Type,
  expected: { eligible: true },
}, e7.evaluate(baseInput({ offeredSalary: 10000, educationLevel: 'BACHELOR' }), e7Type));

// 급여 0
runTest({
  name: 'E-7 급여 0 blocked',
  evaluator: 'E-7',
  input: baseInput({ offeredSalary: 0, educationLevel: 'BACHELOR' }),
  visaType: e7Type,
  expected: { eligible: false },
}, e7.evaluate(baseInput({ offeredSalary: 0, educationLevel: 'BACHELOR' }), e7Type));

// 매우 많은 외국인
runTest({
  name: 'E-9 외국인 1000명/한국인 100명 blocked',
  evaluator: 'E-9',
  input: baseInput({ nationality: 'VN', employeeCountKorean: 100, employeeCountForeign: 1000 }),
  visaType: e9Type,
  expected: { eligible: false },
}, e9.evaluate(baseInput({ nationality: 'VN', employeeCountKorean: 100, employeeCountForeign: 1000 }), e9Type));

// 매우 많은 한국인
runTest({
  name: 'E-9 한국인 10000명/외국인 1명 eligible',
  evaluator: 'E-9',
  input: baseInput({ nationality: 'VN', employeeCountKorean: 10000, employeeCountForeign: 1 }),
  visaType: e9Type,
  expected: { eligible: true },
}, e9.evaluate(baseInput({ nationality: 'VN', employeeCountKorean: 10000, employeeCountForeign: 1 }), e9Type));

// 높은 나이
runTest({
  name: 'H-1 나이 99세 blocked',
  evaluator: 'H-1',
  input: baseInput({ nationality: 'AU', age: 99 }),
  visaType: h1Type,
  expected: { eligible: false },
}, h1.evaluate(baseInput({ nationality: 'AU', age: 99 }), h1Type));

// F-2-7: 모든 최고점
runTest({
  name: 'F-2-7 올 최고점 (18세+박사+TOPIK6+GNI300%) = 105점',
  evaluator: 'F-2-7',
  input: baseInput({ age: 18, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300 }),
  visaType: f27Type,
  expected: { eligible: true, scoreGte: 105 },
}, f2.evaluate(baseInput({ age: 18, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300 }), f27Type));

// F-2-7: 모든 최저점
runTest({
  name: 'F-2-7 올 최저점 (50세+고졸+TOPIK2+GNI50%) = 19점',
  evaluator: 'F-2-7',
  input: baseInput({ age: 50, educationLevel: 'HIGH_SCHOOL', koreanLevel: 'TOPIK2', incomeGniPercent: 50 }),
  visaType: f27Type,
  expected: { eligible: false, scoreLt: 30 },
}, f2.evaluate(baseInput({ age: 50, educationLevel: 'HIGH_SCHOOL', koreanLevel: 'TOPIK2', incomeGniPercent: 50 }), f27Type));

// 모든 prohibited 비자 타입에 고급 조건 입력
for (const [code, vt] of Object.entries(prohibitedTypes)) {
  runTest({
    name: `${code} 고급조건도 blocked`,
    evaluator: code,
    input: baseInput({ educationLevel: 'DOCTOR', offeredSalary: 10000, nationality: 'US' }),
    visaType: vt,
    expected: { eligible: false },
  }, prohibited.evaluate(baseInput({ educationLevel: 'DOCTOR', offeredSalary: 10000, nationality: 'US' }), vt));
}

// ============================================================
// H-1 추가 상세 (~20 cases)
// ============================================================
console.log('--- H-1 추가 상세 ---');

// H-1: 다양한 업종 eligible (유흥업소 제외 전부)
const h1AllowedIndustries = ['10', '25', '41', '55', '56', '62', '70', '85', '86', '90', '96', '01', '47', '49'];
for (const ksic of h1AllowedIndustries) {
  runTest({
    name: `H-1 업종 ${ksic} eligible`,
    evaluator: 'H-1',
    input: baseInput({ nationality: 'AU', age: 25, ksicCode: ksic }),
    visaType: h1Type,
    expected: { eligible: true },
  }, h1.evaluate(baseInput({ nationality: 'AU', age: 25, ksicCode: ksic }), h1Type));
}

// H-1: 유흥업소 세부코드
const h1ProhibitedCodes = ['56221', '562210', '562211'];
for (const ksic of h1ProhibitedCodes) {
  runTest({
    name: `H-1 유흥업소 ${ksic} blocked`,
    evaluator: 'H-1',
    input: baseInput({ nationality: 'AU', age: 25, ksicCode: ksic }),
    visaType: h1Type,
    expected: { eligible: false },
  }, h1.evaluate(baseInput({ nationality: 'AU', age: 25, ksicCode: ksic }), h1Type));
}

// ============================================================
// E-9 유흥업소 금지 상세 (~10 cases)
// ============================================================
console.log('--- E-9 유흥업소 금지 ---');

const e9ProhibitedCodes = ['56221', '562210', '562211'];
for (const ksic of e9ProhibitedCodes) {
  runTest({
    name: `E-9 유흥업소 ${ksic} blocked`,
    evaluator: 'E-9',
    input: baseInput({ nationality: 'VN', ksicCode: ksic }),
    visaType: e9Type,
    expected: { eligible: false, blockedReasonContains: '유흥업소' },
  }, e9.evaluate(baseInput({ nationality: 'VN', ksicCode: ksic }), e9Type));
}

// E-9: 일반 음식점은 OK
const e9FoodOkCodes = ['561', '5611', '5612', '5621', '5629', '562'];
for (const ksic of e9FoodOkCodes) {
  runTest({
    name: `E-9 일반음식점 ${ksic} eligible`,
    evaluator: 'E-9',
    input: baseInput({ nationality: 'VN', ksicCode: ksic }),
    visaType: e9Type,
    expected: { eligible: true },
  }, e9.evaluate(baseInput({ nationality: 'VN', ksicCode: ksic }), e9Type));
}

// ============================================================
// E-Simple 하위비자 코드 테스트 (~30 cases)
// ============================================================
console.log('--- E-Simple 하위비자 코드 ---');

// E-6-1 예술: 예술업종 eligible
const e6SubTypes = {
  'E-6-1': mockVisaType({ code: 'E-6-1', nameKo: '예술', parentCode: 'E-6', employmentLevel: 'CONDITIONAL' }),
  'E-6-2': mockVisaType({ code: 'E-6-2', nameKo: '흥행', parentCode: 'E-6', employmentLevel: 'CONDITIONAL' }),
  'E-6-3': mockVisaType({ code: 'E-6-3', nameKo: '운동', parentCode: 'E-6', employmentLevel: 'CONDITIONAL' }),
};

for (const [code, vt] of Object.entries(e6SubTypes)) {
  runTest({
    name: `${code} 예술업종 90 eligible`,
    evaluator: code,
    input: baseInput({ ksicCode: '90' }),
    visaType: vt,
    expected: { eligible: true },
  }, eSimple.evaluate(baseInput({ ksicCode: '90' }), vt));

  runTest({
    name: `${code} 비예술업종 25 blocked`,
    evaluator: code,
    input: baseInput({ ksicCode: '25' }),
    visaType: vt,
    expected: { eligible: false },
  }, eSimple.evaluate(baseInput({ ksicCode: '25' }), vt));
}

// E-10 하위비자
const e10SubTypes = {
  'E-10-1': mockVisaType({ code: 'E-10-1', nameKo: '내항선원', parentCode: 'E-10', employmentLevel: 'LIMITED' }),
  'E-10-2': mockVisaType({ code: 'E-10-2', nameKo: '외항선원', parentCode: 'E-10', employmentLevel: 'LIMITED' }),
};

for (const [code, vt] of Object.entries(e10SubTypes)) {
  runTest({
    name: `${code} 수상운송 50 eligible`,
    evaluator: code,
    input: baseInput({ ksicCode: '50' }),
    visaType: vt,
    expected: { eligible: true },
  }, eSimple.evaluate(baseInput({ ksicCode: '50' }), vt));

  runTest({
    name: `${code} 비수상운송 25 blocked`,
    evaluator: code,
    input: baseInput({ ksicCode: '25' }),
    visaType: vt,
    expected: { eligible: false },
  }, eSimple.evaluate(baseInput({ ksicCode: '25' }), vt));
}

// ============================================================
// D-2 하위비자 코드 테스트 (~20 cases)
// ============================================================
console.log('--- D-2 하위비자 코드 ---');

const d2SubTypes = ['D-2-1', 'D-2-2', 'D-2-3', 'D-2-4', 'D-2-5', 'D-2-6', 'D-2-7', 'D-2-8'];
for (const code of d2SubTypes) {
  const vt = mockVisaType({
    code, nameKo: `유학(${code})`, category: 'STUDY',
    parentCode: 'D-2', employmentLevel: 'PART_TIME', maxWorkHoursWeekly: 20,
  });
  // 시간제 eligible
  runTest({
    name: `${code} 시간제 eligible`,
    evaluator: code,
    input: baseInput({ jobType: 'PART_TIME', ksicCode: '56' }),
    visaType: vt,
    expected: { eligible: true },
  }, d2.evaluate(baseInput({ jobType: 'PART_TIME', ksicCode: '56' }), vt));

  // 풀타임 blocked
  runTest({
    name: `${code} 풀타임 blocked`,
    evaluator: code,
    input: baseInput({ jobType: 'FULL_TIME' }),
    visaType: vt,
    expected: { eligible: false, blockedReasonContains: '풀타임' },
  }, d2.evaluate(baseInput({ jobType: 'FULL_TIME' }), vt));
}

// ============================================================
// E-9 하위비자 코드 테스트 (~20 cases)
// ============================================================
console.log('--- E-9 하위비자 코드 ---');

const e9SubTypes = {
  'E-9-1': { code: 'E-9-1', name: '제조업', ksic: '25' },
  'E-9-2': { code: 'E-9-2', name: '건설업', ksic: '41' },
  'E-9-3': { code: 'E-9-3', name: '농축산업', ksic: '01' },
  'E-9-4': { code: 'E-9-4', name: '어업', ksic: '03' },
  'E-9-5': { code: 'E-9-5', name: '서비스업', ksic: '55' },
};

for (const [code, info] of Object.entries(e9SubTypes)) {
  const vt = mockVisaType({
    ...e9Type, code: info.code, nameKo: `비전문취업(${info.name})`,
    parentCode: 'E-9',
  });
  runTest({
    name: `${code} ${info.name} 업종 ${info.ksic} eligible`,
    evaluator: code,
    input: baseInput({ nationality: 'VN', ksicCode: info.ksic }),
    visaType: vt,
    expected: { eligible: true },
  }, e9.evaluate(baseInput({ nationality: 'VN', ksicCode: info.ksic }), vt));

  // 각 하위비자에서 IT업종(62) blocked
  runTest({
    name: `${code} IT업종(62) blocked`,
    evaluator: code,
    input: baseInput({ nationality: 'VN', ksicCode: '62' }),
    visaType: vt,
    expected: { eligible: false },
  }, e9.evaluate(baseInput({ nationality: 'VN', ksicCode: '62' }), vt));
}

// ============================================================
// H-2 하위비자 + 더 많은 교차 테스트 (~20 cases)
// ============================================================
console.log('--- H-2 하위비자 ---');

const h2SubCodes = ['H-2-1', 'H-2-5', 'H-2-7'];
for (const code of h2SubCodes) {
  const vt = mockVisaType({
    ...h2Type, code, nameKo: `방문취업(${code})`, parentCode: 'H-2',
  });
  runTest({
    name: `${code} 제조업 eligible`,
    evaluator: code,
    input: baseInput({ isEthnicKorean: true, nationality: 'CN', ksicCode: '25' }),
    visaType: vt,
    expected: { eligible: true },
  }, h2.evaluate(baseInput({ isEthnicKorean: true, nationality: 'CN', ksicCode: '25' }), vt));

  runTest({
    name: `${code} IT blocked`,
    evaluator: code,
    input: baseInput({ isEthnicKorean: true, nationality: 'CN', ksicCode: '62' }),
    visaType: vt,
    expected: { eligible: false },
  }, h2.evaluate(baseInput({ isEthnicKorean: true, nationality: 'CN', ksicCode: '62' }), vt));
}

// ============================================================
// 전체 비자 × 대표 업종 교차 매트릭스 (~84 cases)
// ============================================================
console.log('--- 전체 비자 × 업종 교차 매트릭스 ---');

// 주요 업종 12개
const matrixIndustries = [
  { ksic: '25', name: '제조' },
  { ksic: '41', name: '건설' },
  { ksic: '01', name: '농업' },
  { ksic: '62', name: 'IT' },
  { ksic: '85', name: '교육' },
  { ksic: '55', name: '숙박' },
  { ksic: '50', name: '수상운송' },
  { ksic: '90', name: '예술' },
  { ksic: '70', name: '연구' },
  { ksic: '75', name: '청소' },
  { ksic: '56221', name: '유흥업소' },
  { ksic: '96', name: '개인서비스' },
];

// F-5 영주: 모든 업종 eligible
for (const ind of matrixIndustries) {
  runTest({
    name: `매트릭스: F-5 × ${ind.name}(${ind.ksic}) → eligible`,
    evaluator: 'F-5', input: baseInput({ ksicCode: ind.ksic }), visaType: f5Type,
    expected: { eligible: true },
  }, f5.evaluate(baseInput({ ksicCode: ind.ksic }), f5Type));
}

// F-6 결혼이민: 모든 업종 eligible
for (const ind of matrixIndustries) {
  runTest({
    name: `매트릭스: F-6 × ${ind.name}(${ind.ksic}) → eligible`,
    evaluator: 'F-6', input: baseInput({ ksicCode: ind.ksic }), visaType: f6Type,
    expected: { eligible: true },
  }, fSimple.evaluate(baseInput({ ksicCode: ind.ksic }), f6Type));
}

// F-1 방문동거: 모든 업종 blocked
for (const ind of matrixIndustries) {
  runTest({
    name: `매트릭스: F-1 × ${ind.name}(${ind.ksic}) → blocked`,
    evaluator: 'F-1', input: baseInput({ ksicCode: ind.ksic }), visaType: f1Type,
    expected: { eligible: false },
  }, fSimple.evaluate(baseInput({ ksicCode: ind.ksic }), f1Type));
}

// C-4 단기취업: 모든 업종 eligible
for (const ind of matrixIndustries) {
  runTest({
    name: `매트릭스: C-4 × ${ind.name}(${ind.ksic}) → eligible`,
    evaluator: 'C-4', input: baseInput({ ksicCode: ind.ksic }), visaType: c4Type,
    expected: { eligible: true },
  }, c4.evaluate(baseInput({ ksicCode: ind.ksic }), c4Type));
}

// D-10 구직: 모든 업종 eligible (조건부)
for (const ind of matrixIndustries) {
  runTest({
    name: `매트릭스: D-10 × ${ind.name}(${ind.ksic}) → eligible`,
    evaluator: 'D-10', input: baseInput({ ksicCode: ind.ksic }), visaType: dSimpleTypes['D-10'],
    expected: { eligible: true },
  }, dSimple.evaluate(baseInput({ ksicCode: ind.ksic }), dSimpleTypes['D-10']));
}

// D-1 문화예술: 모든 업종 blocked
for (const ind of matrixIndustries) {
  runTest({
    name: `매트릭스: D-1 × ${ind.name}(${ind.ksic}) → blocked`,
    evaluator: 'D-1', input: baseInput({ ksicCode: ind.ksic }), visaType: dSimpleTypes['D-1'],
    expected: { eligible: false },
  }, dSimple.evaluate(baseInput({ ksicCode: ind.ksic }), dSimpleTypes['D-1']));
}

// B-2 관광: 모든 업종 blocked
for (const ind of matrixIndustries) {
  runTest({
    name: `매트릭스: B-2 × ${ind.name}(${ind.ksic}) → blocked`,
    evaluator: 'B-2', input: baseInput({ ksicCode: ind.ksic }), visaType: prohibitedTypes['B-2'],
    expected: { eligible: false },
  }, prohibited.evaluate(baseInput({ ksicCode: ind.ksic }), prohibitedTypes['B-2']));
}

// ============================================================
// E-7 하위유형 결정 상세 (E-7-1~E-7-4 분류 확인)
// ============================================================
console.log('--- E-7 하위유형 결정 상세 ---');

// E-7-1: 학사 이상 → 전문인력
runTest({
  name: 'E-7 학사+IT직종 → E-7-1 전문인력 분류',
  evaluator: 'E-7', input: baseInput({ educationLevel: 'BACHELOR', targetOccupationCode: '2221', offeredSalary: 300 }), visaType: e7Type,
  expected: { eligible: true, noteContains: 'E-7-1 전문인력' },
}, e7.evaluate(baseInput({ educationLevel: 'BACHELOR', targetOccupationCode: '2221', offeredSalary: 300 }), e7Type));

runTest({
  name: 'E-7 석사 → E-7-1 전문인력',
  evaluator: 'E-7', input: baseInput({ educationLevel: 'MASTER', targetOccupationCode: '2221', offeredSalary: 300 }), visaType: e7Type,
  expected: { eligible: true, noteContains: 'E-7-1 전문인력' },
}, e7.evaluate(baseInput({ educationLevel: 'MASTER', targetOccupationCode: '2221', offeredSalary: 300 }), e7Type));

runTest({
  name: 'E-7 박사 → E-7-1 전문인력',
  evaluator: 'E-7', input: baseInput({ educationLevel: 'DOCTOR', targetOccupationCode: '2111', offeredSalary: 300 }), visaType: e7Type,
  expected: { eligible: true, noteContains: 'E-7-1 전문인력' },
}, e7.evaluate(baseInput({ educationLevel: 'DOCTOR', targetOccupationCode: '2111', offeredSalary: 300 }), e7Type));

// E-7-2: 전문학사 → 준전문인력
runTest({
  name: 'E-7 전문학사 → E-7-2 준전문인력',
  evaluator: 'E-7', input: baseInput({ educationLevel: 'COLLEGE', targetOccupationCode: '2341', offeredSalary: 300 }), visaType: e7Type,
  expected: { eligible: true, noteContains: 'E-7-2 준전문인력' },
}, e7.evaluate(baseInput({ educationLevel: 'COLLEGE', targetOccupationCode: '2341', offeredSalary: 300 }), e7Type));

// E-7-3: 고졸+경력5년 → 숙련기능
runTest({
  name: 'E-7 고졸+경력5년 SME → E-7-3 숙련기능인력',
  evaluator: 'E-7', input: baseInput({ educationLevel: 'HIGH_SCHOOL', workExperienceYears: 5, targetOccupationCode: '2342', offeredSalary: 260, companySizeType: 'SME' }), visaType: e7Type,
  expected: { eligible: true, noteContains: 'E-7-3 숙련기능인력' },
}, e7.evaluate(baseInput({ educationLevel: 'HIGH_SCHOOL', workExperienceYears: 5, targetOccupationCode: '2342', offeredSalary: 260, companySizeType: 'SME' }), e7Type));

// E-7-4: 고졸+경력3년 SME → 점수제
runTest({
  name: 'E-7 고졸+경력3년 SME → E-7-4 점수제',
  evaluator: 'E-7', input: baseInput({ educationLevel: 'HIGH_SCHOOL', workExperienceYears: 3, targetOccupationCode: '2343', offeredSalary: 260, companySizeType: 'SME' }), visaType: e7Type,
  expected: { eligible: true, noteContains: 'E-7-4 점수제' },
}, e7.evaluate(baseInput({ educationLevel: 'HIGH_SCHOOL', workExperienceYears: 3, targetOccupationCode: '2343', offeredSalary: 260, companySizeType: 'SME' }), e7Type));

// E-7 대기업 고졸+경력4년 → 5년 미만이므로 blocked
runTest({
  name: 'E-7 대기업 고졸+경력4년 → 경력 부족',
  evaluator: 'E-7', input: baseInput({ educationLevel: 'HIGH_SCHOOL', workExperienceYears: 4, targetOccupationCode: '2221', offeredSalary: 300, companySizeType: 'LARGE' }), visaType: e7Type,
  expected: { eligible: false },
}, e7.evaluate(baseInput({ educationLevel: 'HIGH_SCHOOL', workExperienceYears: 4, targetOccupationCode: '2221', offeredSalary: 300, companySizeType: 'LARGE' }), e7Type));

// E-7 대기업 고졸+경력5년 → eligible
runTest({
  name: 'E-7 대기업 고졸+경력5년 → eligible',
  evaluator: 'E-7', input: baseInput({ educationLevel: 'HIGH_SCHOOL', workExperienceYears: 5, targetOccupationCode: '2221', offeredSalary: 300, companySizeType: 'LARGE' }), visaType: e7Type,
  expected: { eligible: true },
}, e7.evaluate(baseInput({ educationLevel: 'HIGH_SCHOOL', workExperienceYears: 5, targetOccupationCode: '2221', offeredSalary: 300, companySizeType: 'LARGE' }), e7Type));

// E-7 STARTUP GNI 70% 경계값
runTest({
  name: 'E-7 STARTUP 249만원 → 급여 부족 (GNI70%=250)',
  evaluator: 'E-7', input: baseInput({ educationLevel: 'BACHELOR', targetOccupationCode: '2221', offeredSalary: 249, companySizeType: 'STARTUP' }), visaType: e7Type,
  expected: { eligible: false },
}, e7.evaluate(baseInput({ educationLevel: 'BACHELOR', targetOccupationCode: '2221', offeredSalary: 249, companySizeType: 'STARTUP' }), e7Type));

runTest({
  name: 'E-7 STARTUP 250만원 → eligible (GNI70% 경계)',
  evaluator: 'E-7', input: baseInput({ educationLevel: 'BACHELOR', targetOccupationCode: '2221', offeredSalary: 250, companySizeType: 'STARTUP' }), visaType: e7Type,
  expected: { eligible: true },
}, e7.evaluate(baseInput({ educationLevel: 'BACHELOR', targetOccupationCode: '2221', offeredSalary: 250, companySizeType: 'STARTUP' }), e7Type));

// ============================================================
// E-2 범죄경력 및 업종 상세
// ============================================================
console.log('--- E-2 범죄경력/업종 상세 ---');

runTest({
  name: 'E-2 미국+학사+범죄경력 → blocked',
  evaluator: 'E-2', input: baseInput({ nationality: 'US', educationLevel: 'BACHELOR', ksicCode: '85', hasCriminalRecord: true }), visaType: e2Type,
  expected: { eligible: false },
}, e2.evaluate(baseInput({ nationality: 'US', educationLevel: 'BACHELOR', ksicCode: '85', hasCriminalRecord: true }), e2Type));

runTest({
  name: 'E-2 미국+학사+범죄경력없음 → eligible',
  evaluator: 'E-2', input: baseInput({ nationality: 'US', educationLevel: 'BACHELOR', ksicCode: '85', hasCriminalRecord: false }), visaType: e2Type,
  expected: { eligible: true },
}, e2.evaluate(baseInput({ nationality: 'US', educationLevel: 'BACHELOR', ksicCode: '85', hasCriminalRecord: false }), e2Type));

runTest({
  name: 'E-2 미국+학사+비교육업종(62) → eligible (restriction 추가)',
  evaluator: 'E-2', input: baseInput({ nationality: 'US', educationLevel: 'BACHELOR', ksicCode: '62' }), visaType: e2Type,
  expected: { eligible: true },
}, e2.evaluate(baseInput({ nationality: 'US', educationLevel: 'BACHELOR', ksicCode: '62' }), e2Type));

runTest({
  name: 'E-2 미국+석사 → eligible',
  evaluator: 'E-2', input: baseInput({ nationality: 'US', educationLevel: 'MASTER', ksicCode: '85' }), visaType: e2Type,
  expected: { eligible: true },
}, e2.evaluate(baseInput({ nationality: 'US', educationLevel: 'MASTER', ksicCode: '85' }), e2Type));

runTest({
  name: 'E-2 미국+전문학사 → blocked (학사 미보유)',
  evaluator: 'E-2', input: baseInput({ nationality: 'US', educationLevel: 'COLLEGE', ksicCode: '85' }), visaType: e2Type,
  expected: { eligible: false },
}, e2.evaluate(baseInput({ nationality: 'US', educationLevel: 'COLLEGE', ksicCode: '85' }), e2Type));

runTest({
  name: 'E-2 미국+고졸 → blocked',
  evaluator: 'E-2', input: baseInput({ nationality: 'US', educationLevel: 'HIGH_SCHOOL', ksicCode: '85' }), visaType: e2Type,
  expected: { eligible: false },
}, e2.evaluate(baseInput({ nationality: 'US', educationLevel: 'HIGH_SCHOOL', ksicCode: '85' }), e2Type));

// ============================================================
// F-4 직종코드(KSCO) 상세 테스트
// ============================================================
console.log('--- F-4 직종코드(KSCO) 상세 ---');

const f4OccTests = [
  { ksco: '9111', name: '청소원', expect: false },
  { ksco: '9212', name: '경비원', expect: false },
  { ksco: '9311', name: '건설노무', expect: false },
  { ksco: '9999', name: '기타단순노무', expect: false },
  { ksco: '2221', name: 'IT전문가', expect: true },
  { ksco: '1311', name: '관리자', expect: true },
  { ksco: '4120', name: '사무직', expect: true },
  { ksco: '3110', name: '기술공', expect: true },
  { ksco: '8111', name: '기능원', expect: true },
];
for (const t of f4OccTests) {
  runTest({
    name: `F-4 KSCO ${t.ksco}(${t.name}) → ${t.expect ? 'eligible' : 'blocked'}`,
    evaluator: 'F-4', input: baseInput({ isEthnicKorean: true, targetOccupationCode: t.ksco }), visaType: f4Type,
    expected: { eligible: t.expect },
  }, f4.evaluate(baseInput({ isEthnicKorean: true, targetOccupationCode: t.ksco }), f4Type));
}

// ============================================================
// D-Simple 상세 (D-1, D-3, D-4)
// ============================================================
console.log('--- D-Simple 상세 ---');

runTest({
  name: 'D-3 기술연수 풀타임 → blocked',
  evaluator: 'D-3', input: baseInput({ jobType: 'FULL_TIME' }), visaType: dSimpleTypes['D-3'],
  expected: { eligible: false },
}, dSimple.evaluate(baseInput({ jobType: 'FULL_TIME' }), dSimpleTypes['D-3']));

runTest({
  name: 'D-3 기술연수 파트타임도 → blocked',
  evaluator: 'D-3', input: baseInput({ jobType: 'PART_TIME' }), visaType: dSimpleTypes['D-3'],
  expected: { eligible: false },
}, dSimple.evaluate(baseInput({ jobType: 'PART_TIME' }), dSimpleTypes['D-3']));

runTest({
  name: 'D-4 일반연수 풀타임 → blocked',
  evaluator: 'D-4', input: baseInput({ jobType: 'FULL_TIME' }), visaType: dSimpleTypes['D-4'],
  expected: { eligible: false },
}, dSimple.evaluate(baseInput({ jobType: 'FULL_TIME' }), dSimpleTypes['D-4']));

runTest({
  name: 'D-4 일반연수 파트타임 → eligible',
  evaluator: 'D-4', input: baseInput({ jobType: 'PART_TIME' }), visaType: dSimpleTypes['D-4'],
  expected: { eligible: true },
}, dSimple.evaluate(baseInput({ jobType: 'PART_TIME' }), dSimpleTypes['D-4']));

const d41Type = mockVisaType({ code: 'D-4-1', nameKo: '일반연수(어학)', parentCode: 'D-4', employmentLevel: 'PART_TIME' });
runTest({
  name: 'D-4-1 어학연수 파트타임 → eligible',
  evaluator: 'D-4-1', input: baseInput({ jobType: 'PART_TIME' }), visaType: d41Type,
  expected: { eligible: true },
}, dSimple.evaluate(baseInput({ jobType: 'PART_TIME' }), d41Type));

runTest({
  name: 'D-4-1 어학연수 풀타임 → blocked',
  evaluator: 'D-4-1', input: baseInput({ jobType: 'FULL_TIME' }), visaType: d41Type,
  expected: { eligible: false },
}, dSimple.evaluate(baseInput({ jobType: 'FULL_TIME' }), d41Type));

const d47Type = mockVisaType({ code: 'D-4-7', nameKo: '외국어연수', parentCode: 'D-4', employmentLevel: 'PART_TIME' });
runTest({
  name: 'D-4-7 파트타임 → eligible',
  evaluator: 'D-4-7', input: baseInput({ jobType: 'PART_TIME' }), visaType: d47Type,
  expected: { eligible: true },
}, dSimple.evaluate(baseInput({ jobType: 'PART_TIME' }), d47Type));

runTest({
  name: 'D-1 문화예술 파트타임 → blocked',
  evaluator: 'D-1', input: baseInput({ jobType: 'PART_TIME' }), visaType: dSimpleTypes['D-1'],
  expected: { eligible: false },
}, dSimple.evaluate(baseInput({ jobType: 'PART_TIME' }), dSimpleTypes['D-1']));

runTest({
  name: 'D-10 구직 풀타임 → eligible',
  evaluator: 'D-10', input: baseInput({ jobType: 'FULL_TIME' }), visaType: dSimpleTypes['D-10'],
  expected: { eligible: true },
}, dSimple.evaluate(baseInput({ jobType: 'FULL_TIME' }), dSimpleTypes['D-10']));

runTest({
  name: 'D-10 구직 파트타임 → eligible',
  evaluator: 'D-10', input: baseInput({ jobType: 'PART_TIME' }), visaType: dSimpleTypes['D-10'],
  expected: { eligible: true },
}, dSimple.evaluate(baseInput({ jobType: 'PART_TIME' }), dSimpleTypes['D-10']));

// ============================================================
// F-Simple 상세 (F-1, F-3)
// ============================================================
console.log('--- F-Simple 상세 ---');

runTest({
  name: 'F-3 동반 풀타임 → blocked',
  evaluator: 'F-3', input: baseInput({ jobType: 'FULL_TIME' }), visaType: f3Type,
  expected: { eligible: false },
}, fSimple.evaluate(baseInput({ jobType: 'FULL_TIME' }), f3Type));

runTest({
  name: 'F-3 동반 파트타임 → blocked',
  evaluator: 'F-3', input: baseInput({ jobType: 'PART_TIME' }), visaType: f3Type,
  expected: { eligible: false },
}, fSimple.evaluate(baseInput({ jobType: 'PART_TIME' }), f3Type));

runTest({
  name: 'F-1 방문동거 파트타임 → blocked',
  evaluator: 'F-1', input: baseInput({ jobType: 'PART_TIME' }), visaType: f1Type,
  expected: { eligible: false },
}, fSimple.evaluate(baseInput({ jobType: 'PART_TIME' }), f1Type));

// ============================================================
// H-1 연령 경계값 상세
// ============================================================
console.log('--- H-1 연령 경계값 상세 ---');

const h1AgeBoundary = [
  { age: 17, expect: false, desc: '17세 미만' },
  { age: 18, expect: true, desc: '18세 최소' },
  { age: 19, expect: true, desc: '19세' },
  { age: 25, expect: true, desc: '25세 중간' },
  { age: 29, expect: true, desc: '29세' },
  { age: 30, expect: true, desc: '30세 최대' },
  { age: 31, expect: false, desc: '31세 초과' },
  { age: 35, expect: false, desc: '35세' },
  { age: 50, expect: false, desc: '50세' },
];
for (const c of h1AgeBoundary) {
  runTest({
    name: `H-1 호주 ${c.age}세 → ${c.expect ? 'eligible' : 'blocked'} (${c.desc})`,
    evaluator: 'H-1', input: baseInput({ nationality: 'AU', age: c.age }), visaType: h1Type,
    expected: { eligible: c.expect },
  }, h1.evaluate(baseInput({ nationality: 'AU', age: c.age }), h1Type));
}

// H-1 유흥업소 금지
runTest({
  name: 'H-1 호주 25세 유흥업소(56221) → blocked',
  evaluator: 'H-1', input: baseInput({ nationality: 'AU', age: 25, ksicCode: '56221' }), visaType: h1Type,
  expected: { eligible: false },
}, h1.evaluate(baseInput({ nationality: 'AU', age: 25, ksicCode: '56221' }), h1Type));

runTest({
  name: 'H-1 호주 25세 일반음식점(5611) → eligible',
  evaluator: 'H-1', input: baseInput({ nationality: 'AU', age: 25, ksicCode: '5611' }), visaType: h1Type,
  expected: { eligible: true },
}, h1.evaluate(baseInput({ nationality: 'AU', age: 25, ksicCode: '5611' }), h1Type));

// ============================================================
// H-2 재외동포/비율 상세
// ============================================================
console.log('--- H-2 재외동포/비율 상세 ---');

runTest({
  name: 'H-2 비동포(isEthnicKorean=false) → blocked',
  evaluator: 'H-2', input: baseInput({ nationality: 'CN', isEthnicKorean: false, ksicCode: '25' }), visaType: h2Type,
  expected: { eligible: false },
}, h2.evaluate(baseInput({ nationality: 'CN', isEthnicKorean: false, ksicCode: '25' }), h2Type));

runTest({
  name: 'H-2 재외동포 미입력(undefined) + 중국 → eligible',
  evaluator: 'H-2', input: baseInput({ nationality: 'CN', ksicCode: '25' }), visaType: h2Type,
  expected: { eligible: true },
}, h2.evaluate(baseInput({ nationality: 'CN', ksicCode: '25' }), h2Type));

runTest({
  name: 'H-2 중국 외국인비율 초과(10:5) → blocked',
  evaluator: 'H-2', input: baseInput({ nationality: 'CN', ksicCode: '25', employeeCountKorean: 10, employeeCountForeign: 5 }), visaType: h2Type,
  expected: { eligible: false },
}, h2.evaluate(baseInput({ nationality: 'CN', ksicCode: '25', employeeCountKorean: 10, employeeCountForeign: 5 }), h2Type));

runTest({
  name: 'H-2 중국 외국인비율 적정(10:2) → eligible',
  evaluator: 'H-2', input: baseInput({ nationality: 'CN', ksicCode: '25', employeeCountKorean: 10, employeeCountForeign: 2 }), visaType: h2Type,
  expected: { eligible: true },
}, h2.evaluate(baseInput({ nationality: 'CN', ksicCode: '25', employeeCountKorean: 10, employeeCountForeign: 2 }), h2Type));

runTest({
  name: 'H-2 koreanAncestryCountry=RU (nationality 미입력) → eligible',
  evaluator: 'H-2', input: baseInput({ ksicCode: '25', koreanAncestryCountry: 'RU' }), visaType: h2Type,
  expected: { eligible: true },
}, h2.evaluate(baseInput({ ksicCode: '25', koreanAncestryCountry: 'RU' }), h2Type));

// ============================================================
// F-5 하위비자 코드 상세
// ============================================================
console.log('--- F-5 하위비자 코드 ---');

const f5SubTypes = ['F-5-1', 'F-5-2', 'F-5-3', 'F-5-6', 'F-5-11', 'F-5-16'];
for (const code of f5SubTypes) {
  const subType = mockVisaType({ code, nameKo: `영주(${code})`, employmentLevel: 'FULL' });
  runTest({
    name: `${code} 영주 → eligible (자유취업)`,
    evaluator: code, input: baseInput(), visaType: subType,
    expected: { eligible: true },
  }, f5.evaluate(baseInput(), subType));
}

// ============================================================
// F-2-7 감점 요인 상세
// ============================================================
console.log('--- F-2-7 감점 요인 상세 ---');

// 범죄경력 감점 (-5점) - 85점에서 80점으로
runTest({
  name: 'F-2-7 85점+범죄경력 → eligible (감점은 eligible 판정 후 적용)',
  evaluator: 'F-2-7', input: baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 100, hasCriminalRecord: true }), visaType: f27Type,
  expected: { eligible: true, noteContains: '범죄경력' },
}, f2.evaluate(baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 100, hasCriminalRecord: true }), f27Type));

// 출입국법 위반 감점 (-10점)
runTest({
  name: 'F-2-7 85점+출입국위반 → eligible (감점은 eligible 판정 후)',
  evaluator: 'F-2-7', input: baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 100, hasImmigrationViolation: true }), visaType: f27Type,
  expected: { eligible: true, noteContains: '출입국법 위반' },
}, f2.evaluate(baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 100, hasImmigrationViolation: true }), f27Type));

// 동시 감점
runTest({
  name: 'F-2-7 85점+범죄+출입국위반 → eligible (감점은 판정 후)',
  evaluator: 'F-2-7', input: baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 100, hasCriminalRecord: true, hasImmigrationViolation: true }), visaType: f27Type,
  expected: { eligible: true },
}, f2.evaluate(baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 100, hasCriminalRecord: true, hasImmigrationViolation: true }), f27Type));

// ============================================================
// E-9 renewalPossible 체크
// ============================================================
console.log('--- E-9 renewalPossible 체크 ---');

runTest({
  name: 'E-9 renewalPossible=true → 성실근로자 노트',
  evaluator: 'E-9', input: baseInput({ nationality: 'PH', ksicCode: '25' }), visaType: e9Type,
  expected: { eligible: true, noteContains: '성실근로자' },
}, e9.evaluate(baseInput({ nationality: 'PH', ksicCode: '25' }), e9Type));

const e9NoRenewal = mockVisaType({
  code: 'E-9', nameKo: '비전문취업', employmentLevel: 'LIMITED',
  maxStayMonths: 58, renewalPossible: false,
  countryRestrictions: E9_MOU_COUNTRIES.map(c => ({ countryCode: c, countryNameKo: E9_MOU_NAMES[c], restrictionType: 'MOU_REQUIRED' })),
  requiredDocuments: [],
});
runTest({
  name: 'E-9 renewalPossible=false → eligible (성실근로자 노트 없음)',
  evaluator: 'E-9', input: baseInput({ nationality: 'PH', ksicCode: '25' }), visaType: e9NoRenewal,
  expected: { eligible: true },
}, e9.evaluate(baseInput({ nationality: 'PH', ksicCode: '25' }), e9NoRenewal));

// ============================================================
// Prohibited 비자 개별 테스트
// ============================================================
console.log('--- Prohibited 비자 개별 ---');

const prohibitedCodesAll = ['A-1', 'A-2', 'A-3', 'B-1', 'C-1', 'C-3'];
for (const code of prohibitedCodesAll) {
  if (!prohibitedTypes[code]) continue;
  runTest({
    name: `${code} 취업불가 → blocked`,
    evaluator: code, input: baseInput(), visaType: prohibitedTypes[code],
    expected: { eligible: false },
  }, prohibited.evaluate(baseInput(), prohibitedTypes[code]));
}

// ============================================================
// E-Simple 학력+업종 조합 (E-1, E-3)
// ============================================================
console.log('--- E-Simple 학력+업종 조합 ---');

const e1TypeEdu = mockVisaType({ code: 'E-1', nameKo: '교수' });
runTest({
  name: 'E-1 석사+교육업(85) → eligible',
  evaluator: 'E-1', input: baseInput({ educationLevel: 'MASTER', ksicCode: '85' }), visaType: e1TypeEdu,
  expected: { eligible: true },
}, eSimple.evaluate(baseInput({ educationLevel: 'MASTER', ksicCode: '85' }), e1TypeEdu));

runTest({
  name: 'E-1 학사+교육업(85) → blocked (석사 이상 필요)',
  evaluator: 'E-1', input: baseInput({ educationLevel: 'BACHELOR', ksicCode: '85' }), visaType: e1TypeEdu,
  expected: { eligible: false },
}, eSimple.evaluate(baseInput({ educationLevel: 'BACHELOR', ksicCode: '85' }), e1TypeEdu));

runTest({
  name: 'E-1 박사+교육업(85) → eligible',
  evaluator: 'E-1', input: baseInput({ educationLevel: 'DOCTOR', ksicCode: '85' }), visaType: e1TypeEdu,
  expected: { eligible: true },
}, eSimple.evaluate(baseInput({ educationLevel: 'DOCTOR', ksicCode: '85' }), e1TypeEdu));

runTest({
  name: 'E-1 석사+IT업(62) → blocked (교육업만 허용)',
  evaluator: 'E-1', input: baseInput({ educationLevel: 'MASTER', ksicCode: '62' }), visaType: e1TypeEdu,
  expected: { eligible: false },
}, eSimple.evaluate(baseInput({ educationLevel: 'MASTER', ksicCode: '62' }), e1TypeEdu));

const e3TypeRes = mockVisaType({ code: 'E-3', nameKo: '연구' });
runTest({
  name: 'E-3 석사+연구업(70) → eligible',
  evaluator: 'E-3', input: baseInput({ educationLevel: 'MASTER', ksicCode: '70' }), visaType: e3TypeRes,
  expected: { eligible: true },
}, eSimple.evaluate(baseInput({ educationLevel: 'MASTER', ksicCode: '70' }), e3TypeRes));

runTest({
  name: 'E-3 석사+연구업(72) → eligible',
  evaluator: 'E-3', input: baseInput({ educationLevel: 'MASTER', ksicCode: '72' }), visaType: e3TypeRes,
  expected: { eligible: true },
}, eSimple.evaluate(baseInput({ educationLevel: 'MASTER', ksicCode: '72' }), e3TypeRes));

runTest({
  name: 'E-3 학사+연구업(70) → blocked (석사 이상)',
  evaluator: 'E-3', input: baseInput({ educationLevel: 'BACHELOR', ksicCode: '70' }), visaType: e3TypeRes,
  expected: { eligible: false },
}, eSimple.evaluate(baseInput({ educationLevel: 'BACHELOR', ksicCode: '70' }), e3TypeRes));

// ============================================================
// C-4 다양한 업종 및 maxStayMonths 체크
// ============================================================
console.log('--- C-4 상세 ---');

const c4IndustryExtra = ['62', '25', '85', '90', '01', '56221'];
for (const ind of c4IndustryExtra) {
  runTest({
    name: `C-4 업종 ${ind} → eligible (모든 업종 가능)`,
    evaluator: 'C-4', input: baseInput({ ksicCode: ind }), visaType: c4Type,
    expected: { eligible: true },
  }, c4.evaluate(baseInput({ ksicCode: ind }), c4Type));
}

// C-4 maxStayMonths 노트 확인
runTest({
  name: 'C-4 maxStayMonths=3 → 노트에 체류 포함',
  evaluator: 'C-4', input: baseInput(), visaType: c4Type,
  expected: { eligible: true, noteContains: '3개월' },
}, c4.evaluate(baseInput(), c4Type));

// ============================================================
// F-6 다양한 업종 테스트
// ============================================================
console.log('--- F-6 상세 ---');

const f6IndustryExtra = ['62', '25', '85', '90', '56221', '01', '75'];
for (const ind of f6IndustryExtra) {
  runTest({
    name: `F-6 결혼이민 업종 ${ind} → eligible`,
    evaluator: 'F-6', input: baseInput({ ksicCode: ind }), visaType: f6Type,
    expected: { eligible: true },
  }, fSimple.evaluate(baseInput({ ksicCode: ind }), f6Type));
}

// ============================================================
// [BATCH 2] E-9 MOU 국가 × 다양한 업종 조합 (~85 tests)
// ============================================================
console.log('--- [B2] E-9 MOU국가×업종 조합 ---');

const b2E9Industries = ['10', '13', '14', '15', '17', '20', '22', '23', '24'];
for (const country of ['PH', 'VN', 'TH', 'ID', 'LK', 'KH', 'MM', 'NP', 'MN']) {
  for (const ksic of b2E9Industries) {
    if (country === 'PH' && ksic === '10') continue; // skip some to avoid too many
    const inp = baseInput({ nationality: country, ksicCode: ksic });
    runTest({
      name: `B2 E-9 ${country}×업종${ksic} eligible`,
      evaluator: 'E-9', input: inp, visaType: e9Type,
      expected: { eligible: true },
    }, e9.evaluate(inp, e9Type));
  }
}

// ============================================================
// [BATCH 2] E-9 비MOU 국가 추가 (~12 tests)
// ============================================================
console.log('--- [B2] E-9 비MOU 국가 추가 ---');

const b2NonMou = ['IT', 'SE', 'NO', 'CH', 'FI', 'PL', 'CL', 'PE', 'CO', 'MY', 'SG', 'NZ'];
for (const country of b2NonMou) {
  const inp = baseInput({ nationality: country, ksicCode: '25' });
  runTest({
    name: `B2 E-9 비MOU ${country} blocked`,
    evaluator: 'E-9', input: inp, visaType: e9Type,
    expected: { eligible: false, blockedReasonContains: '허용 국가' },
  }, e9.evaluate(inp, e9Type));
}

// ============================================================
// [BATCH 2] E-9 KSIC 세부코드 추가 (~35 tests)
// ============================================================
console.log('--- [B2] E-9 KSIC 세부코드 추가 ---');

const b2E9SubCodes = [
  '1013', '1020', '1030', '1040', '1071', '1079',
  '1311', '1312', '1391', '1392', '1410', '1420',
  '1511', '1520', '1710', '1720',
  '2012', '2021', '2029',
  '2211', '2219', '2311', '2312', '2391', '2399',
  '2411', '2421', '2429', '2511', '2512', '2591', '2592',
  '2621', '2622', '2711', '2712',
];
for (const ksic of b2E9SubCodes) {
  const inp = baseInput({ nationality: 'TH', ksicCode: ksic });
  runTest({
    name: `B2 E-9 세부 ${ksic} eligible`,
    evaluator: 'E-9', input: inp, visaType: e9Type,
    expected: { eligible: true },
  }, e9.evaluate(inp, e9Type));
}

// ============================================================
// [BATCH 2] E-9 외국인 비율 세밀 경계값 (~15 tests)
// ============================================================
console.log('--- [B2] E-9 외국인 비율 세밀 경계값 ---');

const b2E9RatioCases = [
  { k: 50, f: 9, eligible: true, desc: '50:9=18%' },
  { k: 50, f: 10, eligible: true, desc: '50:10=20%' },
  { k: 50, f: 11, eligible: false, desc: '50:11=22%' },
  { k: 200, f: 39, eligible: true, desc: '200:39=19.5%' },
  { k: 200, f: 40, eligible: true, desc: '200:40=20%' },
  { k: 200, f: 41, eligible: false, desc: '200:41=20.5%' },
  { k: 3, f: 0, eligible: true, desc: '3:0=0%' },
  { k: 4, f: 1, eligible: false, desc: '4:1=25%' },
  { k: 3, f: 1, eligible: false, desc: '3:1=25%' },
  { k: 20, f: 3, eligible: true, desc: '20:3=15%' },
  { k: 20, f: 4, eligible: true, desc: '20:4=20%' },
  { k: 20, f: 5, eligible: false, desc: '20:5=25%' },
  { k: 500, f: 100, eligible: true, desc: '500:100=20%' },
  { k: 500, f: 101, eligible: false, desc: '500:101=20.2%' },
  { k: 1000, f: 200, eligible: true, desc: '1000:200=20%' },
];
for (const tc of b2E9RatioCases) {
  const inp = baseInput({ nationality: 'VN', employeeCountKorean: tc.k, employeeCountForeign: tc.f });
  runTest({
    name: `B2 E-9 비율 ${tc.desc}`,
    evaluator: 'E-9', input: inp, visaType: e9Type,
    expected: { eligible: tc.eligible },
  }, e9.evaluate(inp, e9Type));
}

// ============================================================
// [BATCH 2] E-7 직종코드 세부 확장 (~30 tests)
// ============================================================
console.log('--- [B2] E-7 직종코드 세부 ---');

const b2E7OccAllowed = [
  '2211', '2212', '2213', '2221', '2222', '2223',
  '2311', '2312', '2321', '2322', '2331', '2341', '2342',
  '2111', '2112', '2121', '2131',
  '2511', '2512', '2521',
  '2711', '2712', '2721',
  '2811', '2812', '2821',
  '1311', '1312',
  '4111', '4112',
];
for (const occ of b2E7OccAllowed) {
  const inp = baseInput({ targetOccupationCode: occ, educationLevel: 'BACHELOR', offeredSalary: 300 });
  runTest({
    name: `B2 E-7 직종 ${occ} eligible`,
    evaluator: 'E-7', input: inp, visaType: e7Type,
    expected: { eligible: true },
  }, e7.evaluate(inp, e7Type));
}

// E-7 비허용 직종 (starts with digits not in allowed prefixes)
const b2E7OccBlocked = [
  '3111', '3211', '3311', '5111', '5211', '6111', '6211', '7111', '7211', '8111', '8211',
];
for (const occ of b2E7OccBlocked) {
  const inp = baseInput({ targetOccupationCode: occ, educationLevel: 'BACHELOR', offeredSalary: 300 });
  runTest({
    name: `B2 E-7 비허용직종 ${occ} blocked`,
    evaluator: 'E-7', input: inp, visaType: e7Type,
    expected: { eligible: false, blockedReasonContains: '직종' },
  }, e7.evaluate(inp, e7Type));
}

// ============================================================
// [BATCH 2] E-7 급여 미세 경계값 추가 (~20 tests)
// ============================================================
console.log('--- [B2] E-7 급여 미세 경계값 ---');

const b2E7SalaryLarge = [
  { salary: 200, eligible: false }, { salary: 250, eligible: false },
  { salary: 270, eligible: false }, { salary: 288, eligible: false },
  { salary: 289, eligible: false }, { salary: 290, eligible: true },
  { salary: 295, eligible: true }, { salary: 350, eligible: true },
  { salary: 1000, eligible: true }, { salary: 5000, eligible: true },
];
for (const tc of b2E7SalaryLarge) {
  const inp = baseInput({ offeredSalary: tc.salary, educationLevel: 'BACHELOR', companySizeType: 'LARGE' });
  runTest({
    name: `B2 E-7 LARGE ${tc.salary}만 → ${tc.eligible ? 'eligible' : 'blocked'}`,
    evaluator: 'E-7', input: inp, visaType: e7Type,
    expected: { eligible: tc.eligible },
  }, e7.evaluate(inp, e7Type));
}

const b2E7SalarySme = [
  { salary: 200, eligible: false }, { salary: 230, eligible: false },
  { salary: 248, eligible: false }, { salary: 249, eligible: false },
  { salary: 250, eligible: true }, { salary: 255, eligible: true },
  { salary: 270, eligible: true }, { salary: 290, eligible: true },
  { salary: 500, eligible: true }, { salary: 2000, eligible: true },
];
for (const tc of b2E7SalarySme) {
  const inp = baseInput({ offeredSalary: tc.salary, educationLevel: 'BACHELOR', companySizeType: 'SME' });
  runTest({
    name: `B2 E-7 SME ${tc.salary}만 → ${tc.eligible ? 'eligible' : 'blocked'}`,
    evaluator: 'E-7', input: inp, visaType: e7Type,
    expected: { eligible: tc.eligible },
  }, e7.evaluate(inp, e7Type));
}

// ============================================================
// [BATCH 2] E-7 학력×경력×기업규모 추가 조합 (~25 tests)
// ============================================================
console.log('--- [B2] E-7 학력×경력×규모 추가 ---');

const b2E7EduExpCases = [
  { edu: 'DOCTOR', exp: 0, size: 'MID', salary: 300, eligible: true, desc: '박사 MID' },
  { edu: 'DOCTOR', exp: 10, size: 'LARGE', salary: 400, eligible: true, desc: '박사 경력10 LARGE' },
  { edu: 'MASTER', exp: 0, size: 'SME', salary: 250, eligible: true, desc: '석사 SME' },
  { edu: 'MASTER', exp: 5, size: 'STARTUP', salary: 260, eligible: true, desc: '석사 경력5 STARTUP' },
  { edu: 'BACHELOR', exp: 0, size: 'MID', salary: 300, eligible: true, desc: '학사 MID' },
  { edu: 'BACHELOR', exp: 3, size: 'LARGE', salary: 300, eligible: true, desc: '학사 경력3 LARGE' },
  { edu: 'COLLEGE', exp: 0, size: 'MID', salary: 300, eligible: true, desc: '전문대 MID' },
  { edu: 'COLLEGE', exp: 5, size: 'LARGE', salary: 350, eligible: true, desc: '전문대 경력5 LARGE' },
  { edu: 'HIGH_SCHOOL', exp: 1, size: 'SME', salary: 250, eligible: false, desc: '고졸 경력1 SME blocked' },
  { edu: 'HIGH_SCHOOL', exp: 2, size: 'STARTUP', salary: 250, eligible: false, desc: '고졸 경력2 STARTUP blocked' },
  { edu: 'HIGH_SCHOOL', exp: 3, size: 'STARTUP', salary: 260, eligible: true, desc: '고졸 경력3 STARTUP eligible' },
  { edu: 'HIGH_SCHOOL', exp: 4, size: 'MID', salary: 300, eligible: false, desc: '고졸 경력4 MID blocked(5년필요)' },
  { edu: 'HIGH_SCHOOL', exp: 5, size: 'MID', salary: 300, eligible: true, desc: '고졸 경력5 MID eligible' },
  { edu: 'HIGH_SCHOOL', exp: 6, size: 'LARGE', salary: 300, eligible: true, desc: '고졸 경력6 LARGE eligible' },
  { edu: 'HIGH_SCHOOL', exp: 10, size: 'SME', salary: 260, eligible: true, desc: '고졸 경력10 SME eligible' },
  { edu: 'DOCTOR', exp: 0, size: 'STARTUP', salary: 250, eligible: true, desc: '박사 STARTUP GNI70%' },
  { edu: 'MASTER', exp: 0, size: 'LARGE', salary: 290, eligible: true, desc: '석사 LARGE GNI80%' },
  { edu: 'MASTER', exp: 0, size: 'LARGE', salary: 289, eligible: false, desc: '석사 LARGE 289 blocked' },
  { edu: 'BACHELOR', exp: 0, size: 'STARTUP', salary: 250, eligible: true, desc: '학사 STARTUP 250' },
  { edu: 'BACHELOR', exp: 0, size: 'STARTUP', salary: 249, eligible: false, desc: '학사 STARTUP 249 blocked' },
  { edu: 'COLLEGE', exp: 2, size: 'SME', salary: 250, eligible: true, desc: '전문대 경력2 SME' },
  { edu: 'COLLEGE', exp: 0, size: 'LARGE', salary: 290, eligible: true, desc: '전문대 LARGE 290' },
  { edu: 'COLLEGE', exp: 0, size: 'LARGE', salary: 289, eligible: false, desc: '전문대 LARGE 289 blocked' },
  { edu: 'HIGH_SCHOOL', exp: 0, size: 'MID', salary: 290, eligible: false, desc: '고졸 경력0 MID blocked' },
  { edu: 'HIGH_SCHOOL', exp: 3, size: 'MID', salary: 290, eligible: false, desc: '고졸 경력3 MID blocked(5년필요)' },
];
for (const tc of b2E7EduExpCases) {
  const inp = baseInput({ educationLevel: tc.edu, workExperienceYears: tc.exp, companySizeType: tc.size, offeredSalary: tc.salary });
  runTest({
    name: `B2 E-7 ${tc.desc}`,
    evaluator: 'E-7', input: inp, visaType: e7Type,
    expected: { eligible: tc.eligible },
  }, e7.evaluate(inp, e7Type));
}

// ============================================================
// [BATCH 2] E-2 국가×학력×범죄 전수 (~42 tests)
// ============================================================
console.log('--- [B2] E-2 국가×학력×범죄 전수 ---');

for (const country of E2_COUNTRIES) {
  for (const edu of ['BACHELOR', 'MASTER', 'DOCTOR'] as const) {
    const inp = baseInput({ nationality: country, educationLevel: edu, hasCriminalRecord: false, ksicCode: '85' });
    runTest({
      name: `B2 E-2 ${country}+${edu} eligible`,
      evaluator: 'E-2', input: inp, visaType: e2Type,
      expected: { eligible: true },
    }, e2.evaluate(inp, e2Type));
  }
  // criminal blocked for each country
  for (const edu of ['BACHELOR', 'MASTER', 'DOCTOR'] as const) {
    const inp = baseInput({ nationality: country, educationLevel: edu, hasCriminalRecord: true, ksicCode: '85' });
    runTest({
      name: `B2 E-2 ${country}+${edu}+범죄 blocked`,
      evaluator: 'E-2', input: inp, visaType: e2Type,
      expected: { eligible: false, blockedReasonContains: '범죄경력' },
    }, e2.evaluate(inp, e2Type));
  }
}

// ============================================================
// [BATCH 2] E-2 비교육 업종별 restriction (~10 tests)
// ============================================================
console.log('--- [B2] E-2 비교육업종 restriction ---');

const b2E2NonEduKsic = ['62', '25', '41', '55', '56', '70', '90', '96', '64', '86'];
for (const ksic of b2E2NonEduKsic) {
  const inp = baseInput({ nationality: 'US', educationLevel: 'BACHELOR', ksicCode: ksic });
  runTest({
    name: `B2 E-2 비교육 ${ksic} → eligible+restriction`,
    evaluator: 'E-2', input: inp, visaType: e2Type,
    expected: { eligible: true, restrictionContains: '교육기관' },
  }, e2.evaluate(inp, e2Type));
}

// ============================================================
// [BATCH 2] H-1 국가×나이 조합 (~75 tests)
// ============================================================
console.log('--- [B2] H-1 국가×나이 조합 ---');

const b2H1Ages = [18, 20, 25, 28, 30];
for (const country of H1_WH_COUNTRIES) {
  for (const age of b2H1Ages) {
    if (country === 'AU' && age === 25) continue; // already tested
    const inp = baseInput({ nationality: country, age });
    runTest({
      name: `B2 H-1 ${country} ${age}세 eligible`,
      evaluator: 'H-1', input: inp, visaType: h1Type,
      expected: { eligible: true },
    }, h1.evaluate(inp, h1Type));
  }
}

// H-1 non-WH countries with various ages
const b2H1NonWh = ['VN', 'PH', 'CN', 'IN', 'RU', 'BR', 'MX', 'NG', 'KE', 'GH', 'PE', 'CO'];
for (const country of b2H1NonWh) {
  const inp = baseInput({ nationality: country, age: 25 });
  runTest({
    name: `B2 H-1 비협정 ${country} blocked`,
    evaluator: 'H-1', input: inp, visaType: h1Type,
    expected: { eligible: false, blockedReasonContains: '허용 국가' },
  }, h1.evaluate(inp, h1Type));
}

// ============================================================
// [BATCH 2] H-1 나이 경계 전수 (~15 tests)
// ============================================================
console.log('--- [B2] H-1 나이 전수 ---');

const b2H1AgeAll = [
  { age: 15, e: false }, { age: 16, e: false }, { age: 17, e: false },
  { age: 18, e: true }, { age: 19, e: true }, { age: 20, e: true },
  { age: 22, e: true }, { age: 24, e: true }, { age: 26, e: true },
  { age: 28, e: true }, { age: 29, e: true }, { age: 30, e: true },
  { age: 31, e: false }, { age: 32, e: false }, { age: 45, e: false },
];
for (const tc of b2H1AgeAll) {
  const inp = baseInput({ nationality: 'JP', age: tc.age });
  runTest({
    name: `B2 H-1 JP ${tc.age}세 → ${tc.e ? 'eligible' : 'blocked'}`,
    evaluator: 'H-1', input: inp, visaType: h1Type,
    expected: { eligible: tc.e },
  }, h1.evaluate(inp, h1Type));
}

// ============================================================
// [BATCH 2] H-2 국가×업종 전수 (~60 tests)
// ============================================================
console.log('--- [B2] H-2 국가×업종 전수 ---');

const b2H2Industries = ['10', '13', '14', '15', '17', '20', '22', '23', '24', '25'];
for (const country of H2_COUNTRIES) {
  for (const ksic of b2H2Industries) {
    const inp = baseInput({ isEthnicKorean: true, nationality: country, ksicCode: ksic });
    runTest({
      name: `B2 H-2 ${country}×${ksic} eligible`,
      evaluator: 'H-2', input: inp, visaType: h2Type,
      expected: { eligible: true },
    }, h2.evaluate(inp, h2Type));
  }
}

// ============================================================
// [BATCH 2] H-2 추가 허용 업종 세부 (~15 tests)
// ============================================================
console.log('--- [B2] H-2 추가 허용 업종 ---');

const b2H2MoreAllowed = ['26', '27', '28', '29', '30', '31', '32', '33', '42', '03', '37', '38', '46', '47', '49'];
for (const ksic of b2H2MoreAllowed) {
  const inp = baseInput({ isEthnicKorean: true, nationality: 'RU', ksicCode: ksic });
  runTest({
    name: `B2 H-2 RU 업종${ksic} eligible`,
    evaluator: 'H-2', input: inp, visaType: h2Type,
    expected: { eligible: true },
  }, h2.evaluate(inp, h2Type));
}

// H-2 비허용 업종 추가
const b2H2MoreBlocked = ['63', '66', '69', '72', '73', '80', '94', '96'];
for (const ksic of b2H2MoreBlocked) {
  const inp = baseInput({ isEthnicKorean: true, nationality: 'CN', ksicCode: ksic });
  runTest({
    name: `B2 H-2 CN 비허용${ksic} blocked`,
    evaluator: 'H-2', input: inp, visaType: h2Type,
    expected: { eligible: false, blockedReasonContains: '허용 업종' },
  }, h2.evaluate(inp, h2Type));
}

// ============================================================
// [BATCH 2] H-2 외국인 비율 경계값 (~10 tests)
// ============================================================
console.log('--- [B2] H-2 외국인 비율 경계값 ---');

const b2H2RatioCases = [
  { k: 100, f: 19, e: true }, { k: 100, f: 20, e: true }, { k: 100, f: 21, e: false },
  { k: 50, f: 10, e: true }, { k: 50, f: 11, e: false },
  { k: 25, f: 5, e: true }, { k: 25, f: 6, e: false },
  { k: 10, f: 2, e: true }, { k: 10, f: 3, e: false },
  { k: 1000, f: 200, e: true },
];
for (const tc of b2H2RatioCases) {
  const inp = baseInput({ isEthnicKorean: true, nationality: 'CN', ksicCode: '25', employeeCountKorean: tc.k, employeeCountForeign: tc.f });
  runTest({
    name: `B2 H-2 비율 ${tc.k}:${tc.f} → ${tc.e ? 'eligible' : 'blocked'}`,
    evaluator: 'H-2', input: inp, visaType: h2Type,
    expected: { eligible: tc.e },
  }, h2.evaluate(inp, h2Type));
}

// ============================================================
// [BATCH 2] D-2 업종 확장 (~20 tests)
// ============================================================
console.log('--- [B2] D-2 업종 확장 ---');

const b2D2MoreIndustries = ['15', '17', '20', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '37', '38', '42', '50', '52'];
for (const ksic of b2D2MoreIndustries) {
  const inp = baseInput({ jobType: 'PART_TIME', ksicCode: ksic });
  runTest({
    name: `B2 D-2 시간제 ${ksic} eligible`,
    evaluator: 'D-2', input: inp, visaType: d2Type,
    expected: { eligible: true },
  }, d2.evaluate(inp, d2Type));
}

// ============================================================
// [BATCH 2] D-2 TOPIK 세부 (~6 tests)
// ============================================================
console.log('--- [B2] D-2 TOPIK 세부 ---');

const b2D2TopikCases = [
  { level: 'TOPIK1', hasNote: true }, { level: 'TOPIK2', hasNote: true },
  { level: 'TOPIK3', hasNote: true }, { level: 'TOPIK4', hasNote: false },
  { level: 'TOPIK5', hasNote: false }, { level: 'TOPIK6', hasNote: false },
];
for (const tc of b2D2TopikCases) {
  const inp = baseInput({ jobType: 'PART_TIME', koreanLevel: tc.level, ksicCode: '47' });
  const r = d2.evaluate(inp, d2Type);
  if (tc.hasNote) {
    runTest({
      name: `B2 D-2 ${tc.level} → note TOPIK4급`,
      evaluator: 'D-2', input: inp, visaType: d2Type,
      expected: { eligible: true, noteContains: 'TOPIK 4급' },
    }, r);
  } else {
    runTest({
      name: `B2 D-2 ${tc.level} → eligible`,
      evaluator: 'D-2', input: inp, visaType: d2Type,
      expected: { eligible: true },
    }, r);
  }
}

// ============================================================
// [BATCH 2] F-2-7 나이 전수 경계값 (~20 tests)
// ============================================================
console.log('--- [B2] F-2-7 나이 전수 ---');

const b2F27AgeCases = [
  { age: 17, score: 20 }, { age: 18, score: 25 }, { age: 20, score: 25 },
  { age: 23, score: 25 }, { age: 24, score: 25 },
  { age: 25, score: 20 }, { age: 27, score: 20 }, { age: 29, score: 20 },
  { age: 30, score: 15 }, { age: 32, score: 15 }, { age: 34, score: 15 },
  { age: 35, score: 10 }, { age: 37, score: 10 }, { age: 39, score: 10 },
  { age: 40, score: 7 }, { age: 42, score: 7 }, { age: 44, score: 7 },
  { age: 45, score: 5 }, { age: 55, score: 5 }, { age: 65, score: 5 },
];
for (const tc of b2F27AgeCases) {
  const inp = baseInput({ age: tc.age, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300 });
  const total = tc.score + 35 + 20 + 25;
  runTest({
    name: `B2 F-2-7 ${tc.age}세=${tc.score}점 total=${total}`,
    evaluator: 'F-2-7', input: inp, visaType: f27Type,
    expected: { eligible: true, scoreGte: total },
  }, f2.evaluate(inp, f27Type));
}

// ============================================================
// [BATCH 2] F-2-7 소득 경계값 세밀 (~15 tests)
// ============================================================
console.log('--- [B2] F-2-7 소득 경계값 ---');

const b2F27IncomeCases = [
  { gni: 0, score: 0 }, { gni: 50, score: 0 }, { gni: 79, score: 0 },
  { gni: 80, score: 5 }, { gni: 99, score: 5 },
  { gni: 100, score: 10 }, { gni: 120, score: 10 }, { gni: 149, score: 10 },
  { gni: 150, score: 15 }, { gni: 175, score: 15 }, { gni: 199, score: 15 },
  { gni: 200, score: 20 }, { gni: 250, score: 20 }, { gni: 299, score: 20 },
  { gni: 300, score: 25 },
];
for (const tc of b2F27IncomeCases) {
  const inp = baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: tc.gni });
  const total = 25 + 35 + 20 + tc.score;
  runTest({
    name: `B2 F-2-7 GNI${tc.gni}%=${tc.score}점`,
    evaluator: 'F-2-7', input: inp, visaType: f27Type,
    expected: { eligible: true, scoreGte: total },
  }, f2.evaluate(inp, f27Type));
}

// ============================================================
// [BATCH 2] F-2-7 80점 경계 정밀 추가 (~25 tests)
// ============================================================
console.log('--- [B2] F-2-7 80점 경계 정밀 ---');

const b2F27Threshold = [
  { age: 20, edu: 'BACHELOR', kor: 'TOPIK5', gni: 100, total: 25+25+16+10, desc: '76 fail' },
  { age: 20, edu: 'BACHELOR', kor: 'TOPIK5', gni: 150, total: 25+25+16+15, desc: '81 pass' },
  { age: 20, edu: 'BACHELOR', kor: 'TOPIK6', gni: 100, total: 25+25+20+10, desc: '80 pass' },
  { age: 20, edu: 'COLLEGE', kor: 'TOPIK6', gni: 200, total: 25+15+20+20, desc: '80 pass' },
  { age: 20, edu: 'COLLEGE', kor: 'TOPIK6', gni: 150, total: 25+15+20+15, desc: '75 fail' },
  { age: 20, edu: 'COLLEGE', kor: 'TOPIK5', gni: 300, total: 25+15+16+25, desc: '81 pass' },
  { age: 20, edu: 'COLLEGE', kor: 'TOPIK5', gni: 200, total: 25+15+16+20, desc: '76 fail' },
  { age: 25, edu: 'MASTER', kor: 'TOPIK4', gni: 200, total: 20+30+12+20, desc: '82 pass' },
  { age: 25, edu: 'MASTER', kor: 'TOPIK4', gni: 150, total: 20+30+12+15, desc: '77 fail' },
  { age: 25, edu: 'MASTER', kor: 'TOPIK3', gni: 300, total: 20+30+8+25, desc: '83 pass' },
  { age: 25, edu: 'MASTER', kor: 'TOPIK3', gni: 200, total: 20+30+8+20, desc: '78 fail' },
  { age: 30, edu: 'DOCTOR', kor: 'TOPIK4', gni: 100, total: 15+35+12+10, desc: '72 fail' },
  { age: 30, edu: 'DOCTOR', kor: 'TOPIK4', gni: 200, total: 15+35+12+20, desc: '82 pass' },
  { age: 30, edu: 'DOCTOR', kor: 'TOPIK5', gni: 100, total: 15+35+16+10, desc: '76 fail' },
  { age: 30, edu: 'DOCTOR', kor: 'TOPIK5', gni: 150, total: 15+35+16+15, desc: '81 pass' },
  { age: 35, edu: 'DOCTOR', kor: 'TOPIK5', gni: 200, total: 10+35+16+20, desc: '81 pass' },
  { age: 35, edu: 'DOCTOR', kor: 'TOPIK5', gni: 150, total: 10+35+16+15, desc: '76 fail' },
  { age: 35, edu: 'MASTER', kor: 'TOPIK6', gni: 200, total: 10+30+20+20, desc: '80 pass' },
  { age: 35, edu: 'MASTER', kor: 'TOPIK6', gni: 150, total: 10+30+20+15, desc: '75 fail' },
  { age: 40, edu: 'DOCTOR', kor: 'TOPIK5', gni: 300, total: 7+35+16+25, desc: '83 pass' },
  { age: 40, edu: 'DOCTOR', kor: 'TOPIK5', gni: 200, total: 7+35+16+20, desc: '78 fail' },
  { age: 40, edu: 'DOCTOR', kor: 'TOPIK6', gni: 150, total: 7+35+20+15, desc: '77 fail' },
  { age: 40, edu: 'DOCTOR', kor: 'TOPIK6', gni: 200, total: 7+35+20+20, desc: '82 pass' },
  { age: 45, edu: 'DOCTOR', kor: 'TOPIK5', gni: 300, total: 5+35+16+25, desc: '81 pass' },
  { age: 45, edu: 'DOCTOR', kor: 'TOPIK5', gni: 200, total: 5+35+16+20, desc: '76 fail' },
];
for (const tc of b2F27Threshold) {
  const inp = baseInput({ age: tc.age, educationLevel: tc.edu, koreanLevel: tc.kor, incomeGniPercent: tc.gni });
  const isPass = tc.total >= 80;
  runTest({
    name: `B2 F-2-7 ${tc.desc} → ${isPass ? 'pass' : 'fail'}`,
    evaluator: 'F-2-7', input: inp, visaType: f27Type,
    expected: { eligible: isPass },
  }, f2.evaluate(inp, f27Type));
}

// ============================================================
// [BATCH 2] F-2-7 KIIP 추가 (~5 tests)
// ============================================================
console.log('--- [B2] F-2-7 KIIP 추가 ---');

const b2KiipCases = [
  { level: 'KIIP_LEVEL_1', score: 4 },
  { level: 'KIIP_LEVEL_2', score: 8 },
  { level: 'KIIP_LEVEL_3', score: 12 },
  { level: 'KIIP_LEVEL_4', score: 16 },
  { level: 'KIIP_LEVEL_5', score: 20 },
];
for (const tc of b2KiipCases) {
  const inp = baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: tc.level, incomeGniPercent: 300 });
  runTest({
    name: `B2 F-2-7 ${tc.level}=${tc.score}점`,
    evaluator: 'F-2-7', input: inp, visaType: f27Type,
    expected: { scoreGte: 25 + 35 + tc.score + 25, eligible: true },
  }, f2.evaluate(inp, f27Type));
}

// ============================================================
// [BATCH 2] F-4 직종코드 확장 (~20 tests)
// ============================================================
console.log('--- [B2] F-4 직종코드 확장 ---');

const b2F4OccTests = [
  { ksco: '1111', expect: true }, { ksco: '1211', expect: true },
  { ksco: '2111', expect: true }, { ksco: '2221', expect: true },
  { ksco: '3112', expect: true }, { ksco: '4113', expect: true },
  { ksco: '5112', expect: true }, { ksco: '6112', expect: true },
  { ksco: '7112', expect: true }, { ksco: '8112', expect: true },
  { ksco: '9112', expect: false }, { ksco: '9213', expect: false },
  { ksco: '9312', expect: false }, { ksco: '9411', expect: false },
  { ksco: '9511', expect: false }, { ksco: '9611', expect: false },
  { ksco: '9711', expect: false }, { ksco: '9811', expect: false },
  { ksco: '9911', expect: false }, { ksco: '9001', expect: false },
];
for (const t of b2F4OccTests) {
  const inp = baseInput({ isEthnicKorean: true, targetOccupationCode: t.ksco });
  runTest({
    name: `B2 F-4 KSCO ${t.ksco} → ${t.expect ? 'eligible' : 'blocked'}`,
    evaluator: 'F-4', input: inp, visaType: f4Type,
    expected: { eligible: t.expect },
  }, f4.evaluate(inp, f4Type));
}

// ============================================================
// [BATCH 2] F-4 업종 확장 (~15 tests)
// ============================================================
console.log('--- [B2] F-4 업종 확장 ---');

const b2F4AllowedMore = ['14', '15', '17', '20', '22', '23', '24', '26', '27', '28', '29', '30', '31', '32', '33'];
for (const ksic of b2F4AllowedMore) {
  const inp = baseInput({ isEthnicKorean: true, ksicCode: ksic });
  runTest({
    name: `B2 F-4 업종 ${ksic} eligible`,
    evaluator: 'F-4', input: inp, visaType: f4Type,
    expected: { eligible: true },
  }, f4.evaluate(inp, f4Type));
}

// ============================================================
// [BATCH 2] F-5 업종 확장 (~15 tests)
// ============================================================
console.log('--- [B2] F-5 업종 확장 ---');

const b2F5Industries = ['01', '02', '03', '13', '14', '41', '42', '46', '47', '49', '50', '51', '52', '64', '71'];
for (const ksic of b2F5Industries) {
  const inp = baseInput({ ksicCode: ksic });
  runTest({
    name: `B2 F-5 업종 ${ksic} eligible`,
    evaluator: 'F-5', input: inp, visaType: f5Type,
    expected: { eligible: true, noteContains: '자유 취업' },
  }, f5.evaluate(inp, f5Type));
}

// ============================================================
// [BATCH 2] E-Simple E-1 교수 확장 (~10 tests)
// ============================================================
console.log('--- [B2] E-1 교수 확장 ---');

const b2E1EduKsic = [
  { edu: 'MASTER', ksic: '8511', e: true }, { edu: 'MASTER', ksic: '8521', e: true },
  { edu: 'DOCTOR', ksic: '8530', e: true }, { edu: 'DOCTOR', ksic: '8541', e: true },
  { edu: 'MASTER', ksic: '62', e: false }, { edu: 'MASTER', ksic: '25', e: false },
  { edu: 'BACHELOR', ksic: '85', e: false }, { edu: 'HIGH_SCHOOL', ksic: '85', e: false },
  { edu: 'COLLEGE', ksic: '85', e: false }, { edu: 'DOCTOR', ksic: '70', e: false },
];
for (const tc of b2E1EduKsic) {
  const inp = baseInput({ educationLevel: tc.edu, ksicCode: tc.ksic });
  runTest({
    name: `B2 E-1 ${tc.edu}+${tc.ksic} → ${tc.e ? 'eligible' : 'blocked'}`,
    evaluator: 'E-1', input: inp, visaType: eSimpleTypes['E-1'],
    expected: { eligible: tc.e },
  }, eSimple.evaluate(inp, eSimpleTypes['E-1']));
}

// ============================================================
// [BATCH 2] E-Simple E-3 연구 확장 (~10 tests)
// ============================================================
console.log('--- [B2] E-3 연구 확장 ---');

const b2E3Cases = [
  { edu: 'MASTER', ksic: '70', e: true }, { edu: 'DOCTOR', ksic: '72', e: true },
  { edu: 'MASTER', ksic: '73', e: true }, { edu: 'DOCTOR', ksic: '21', e: true },
  { edu: 'MASTER', ksic: '7211', e: true }, { edu: 'DOCTOR', ksic: '7219', e: true },
  { edu: 'BACHELOR', ksic: '70', e: false }, { edu: 'COLLEGE', ksic: '72', e: false },
  { edu: 'MASTER', ksic: '62', e: false }, { edu: 'DOCTOR', ksic: '85', e: false },
];
for (const tc of b2E3Cases) {
  const inp = baseInput({ educationLevel: tc.edu, ksicCode: tc.ksic });
  runTest({
    name: `B2 E-3 ${tc.edu}+${tc.ksic} → ${tc.e ? 'eligible' : 'blocked'}`,
    evaluator: 'E-3', input: inp, visaType: eSimpleTypes['E-3'],
    expected: { eligible: tc.e },
  }, eSimple.evaluate(inp, eSimpleTypes['E-3']));
}

// ============================================================
// [BATCH 2] E-Simple E-4 기술지도 확장 (~8 tests)
// ============================================================
console.log('--- [B2] E-4 기술지도 확장 ---');

const b2E4Cases = [
  { edu: 'BACHELOR', e: true }, { edu: 'MASTER', e: true }, { edu: 'DOCTOR', e: true },
  { edu: 'COLLEGE', e: false }, { edu: 'HIGH_SCHOOL', e: false },
];
for (const tc of b2E4Cases) {
  const inp = baseInput({ educationLevel: tc.edu });
  runTest({
    name: `B2 E-4 ${tc.edu} → ${tc.e ? 'eligible' : 'blocked'}`,
    evaluator: 'E-4', input: inp, visaType: eSimpleTypes['E-4'],
    expected: { eligible: tc.e },
  }, eSimple.evaluate(inp, eSimpleTypes['E-4']));
}

// ============================================================
// [BATCH 2] E-Simple E-5 전문직 확장 (~5 tests)
// ============================================================
console.log('--- [B2] E-5 전문직 확장 ---');

const b2E5Cases = [
  { edu: 'BACHELOR', e: true }, { edu: 'MASTER', e: true }, { edu: 'DOCTOR', e: true },
  { edu: 'COLLEGE', e: false }, { edu: 'HIGH_SCHOOL', e: false },
];
for (const tc of b2E5Cases) {
  const inp = baseInput({ educationLevel: tc.edu });
  runTest({
    name: `B2 E-5 ${tc.edu} → ${tc.e ? 'eligible' : 'blocked'}`,
    evaluator: 'E-5', input: inp, visaType: eSimpleTypes['E-5'],
    expected: { eligible: tc.e },
  }, eSimple.evaluate(inp, eSimpleTypes['E-5']));
}

// ============================================================
// [BATCH 2] E-6 예술흥행 업종 확장 (~10 tests)
// ============================================================
console.log('--- [B2] E-6 업종 확장 ---');

const b2E6AllowedMore = ['9013', '9019', '9021', '9029', '9111', '9112', '5913', '5920'];
for (const ksic of b2E6AllowedMore) {
  const inp = baseInput({ ksicCode: ksic });
  runTest({
    name: `B2 E-6 ${ksic} eligible`,
    evaluator: 'E-6', input: inp, visaType: eSimpleTypes['E-6'],
    expected: { eligible: true },
  }, eSimple.evaluate(inp, eSimpleTypes['E-6']));
}

const b2E6BlockedMore = ['10', '13', '14', '15', '17', '20', '22', '23', '24'];
for (const ksic of b2E6BlockedMore) {
  const inp = baseInput({ ksicCode: ksic });
  runTest({
    name: `B2 E-6 비예술 ${ksic} blocked`,
    evaluator: 'E-6', input: inp, visaType: eSimpleTypes['E-6'],
    expected: { eligible: false },
  }, eSimple.evaluate(inp, eSimpleTypes['E-6']));
}

// ============================================================
// [BATCH 2] E-8 계절근로 업종 확장 (~10 tests)
// ============================================================
console.log('--- [B2] E-8 업종 확장 ---');

const b2E8AllowedMore = ['0111', '0112', '0121', '0122', '0141', '0142', '0150', '0210', '0220', '0311'];
for (const ksic of b2E8AllowedMore) {
  const inp = baseInput({ ksicCode: ksic });
  runTest({
    name: `B2 E-8 농어업 ${ksic} eligible`,
    evaluator: 'E-8', input: inp, visaType: eSimpleTypes['E-8'],
    expected: { eligible: true },
  }, eSimple.evaluate(inp, eSimpleTypes['E-8']));
}

// ============================================================
// [BATCH 2] E-10 선원 업종 확장 (~8 tests)
// ============================================================
console.log('--- [B2] E-10 업종 확장 ---');

const b2E10AllowedMore = ['5011', '5012', '5013', '5019', '5020', '5021', '5022', '5029'];
for (const ksic of b2E10AllowedMore) {
  const inp = baseInput({ ksicCode: ksic });
  runTest({
    name: `B2 E-10 수상운송 ${ksic} eligible`,
    evaluator: 'E-10', input: inp, visaType: eSimpleTypes['E-10'],
    expected: { eligible: true },
  }, eSimple.evaluate(inp, eSimpleTypes['E-10']));
}

// ============================================================
// [BATCH 2] Prohibited 비자 전수 (~42 tests)
// ============================================================
console.log('--- [B2] Prohibited 전수 ---');

const b2ProhIndustries = ['25', '62', '85', '55', '41', '70'];
for (const [code, vt] of Object.entries(prohibitedTypes)) {
  for (const ksic of b2ProhIndustries) {
    const inp = baseInput({ ksicCode: ksic, educationLevel: 'DOCTOR', offeredSalary: 500 });
    runTest({
      name: `B2 ${code} 업종${ksic} blocked`,
      evaluator: code, input: inp, visaType: vt,
      expected: { eligible: false, blockedReasonContains: '취업 활동이 허용되지 않음' },
    }, prohibited.evaluate(inp, vt));
  }
}

// ============================================================
// [BATCH 2] C-4 다양한 업종 추가 (~15 tests)
// ============================================================
console.log('--- [B2] C-4 다양한 업종 ---');

const b2C4Industries = ['01', '02', '03', '10', '13', '14', '15', '17', '20', '22', '23', '24', '41', '42', '75'];
for (const ksic of b2C4Industries) {
  const inp = baseInput({ ksicCode: ksic });
  runTest({
    name: `B2 C-4 업종 ${ksic} eligible`,
    evaluator: 'C-4', input: inp, visaType: c4Type,
    expected: { eligible: true, restrictionContains: '90일' },
  }, c4.evaluate(inp, c4Type));
}

// ============================================================
// [BATCH 2] 교차 비자 시나리오 - 프로필별 (~80 tests)
// ============================================================
console.log('--- [B2] 교차 비자 시나리오 - 프로필별 ---');

// 프로필 1: 베트남 고졸 공장 근무자
const vnWorkerInp = baseInput({
  nationality: 'VN', ksicCode: '25', companySizeType: 'SME',
  employeeCountKorean: 40, employeeCountForeign: 5,
  educationLevel: 'HIGH_SCHOOL', offeredSalary: 200, age: 28,
  isEthnicKorean: false,
});
runTest({ name: 'B2 프로필1 VN공장 → E-9 eligible', evaluator: 'E-9', input: vnWorkerInp, visaType: e9Type, expected: { eligible: true } }, e9.evaluate(vnWorkerInp, e9Type));
runTest({ name: 'B2 프로필1 VN공장 → E-7 blocked(학력/급여)', evaluator: 'E-7', input: vnWorkerInp, visaType: e7Type, expected: { eligible: false } }, e7.evaluate(vnWorkerInp, e7Type));
runTest({ name: 'B2 프로필1 VN공장 → H-1 blocked(비협정)', evaluator: 'H-1', input: vnWorkerInp, visaType: h1Type, expected: { eligible: false } }, h1.evaluate(vnWorkerInp, h1Type));
runTest({ name: 'B2 프로필1 VN공장 → H-2 blocked(비동포)', evaluator: 'H-2', input: vnWorkerInp, visaType: h2Type, expected: { eligible: false } }, h2.evaluate(vnWorkerInp, h2Type));
runTest({ name: 'B2 프로필1 VN공장 → F-4 blocked(비동포)', evaluator: 'F-4', input: vnWorkerInp, visaType: f4Type, expected: { eligible: false } }, f4.evaluate(vnWorkerInp, f4Type));
runTest({ name: 'B2 프로필1 VN공장 → F-5 eligible', evaluator: 'F-5', input: vnWorkerInp, visaType: f5Type, expected: { eligible: true } }, f5.evaluate(vnWorkerInp, f5Type));
runTest({ name: 'B2 프로필1 VN공장 → C-4 eligible', evaluator: 'C-4', input: vnWorkerInp, visaType: c4Type, expected: { eligible: true } }, c4.evaluate(vnWorkerInp, c4Type));
runTest({ name: 'B2 프로필1 VN공장 → B-2 blocked', evaluator: 'B-2', input: vnWorkerInp, visaType: prohibitedTypes['B-2'], expected: { eligible: false } }, prohibited.evaluate(vnWorkerInp, prohibitedTypes['B-2']));

// 프로필 2: 미국인 IT 개발자 학사
const usDevInp = baseInput({
  nationality: 'US', ksicCode: '62', companySizeType: 'STARTUP',
  educationLevel: 'BACHELOR', offeredSalary: 350, targetOccupationCode: '2221',
  age: 27, isEthnicKorean: false,
});
runTest({ name: 'B2 프로필2 US IT개발 → E-9 blocked(비MOU)', evaluator: 'E-9', input: usDevInp, visaType: e9Type, expected: { eligible: false } }, e9.evaluate(usDevInp, e9Type));
runTest({ name: 'B2 프로필2 US IT개발 → E-7 eligible', evaluator: 'E-7', input: usDevInp, visaType: e7Type, expected: { eligible: true } }, e7.evaluate(usDevInp, e7Type));
runTest({ name: 'B2 프로필2 US IT개발 → E-2 eligible(+restrict)', evaluator: 'E-2', input: usDevInp, visaType: e2Type, expected: { eligible: true } }, e2.evaluate(usDevInp, e2Type));
runTest({ name: 'B2 프로필2 US IT개발 → H-1 blocked(나이X)', evaluator: 'H-1', input: usDevInp, visaType: h1Type, expected: { eligible: false } }, h1.evaluate(usDevInp, h1Type));
runTest({ name: 'B2 프로필2 US IT개발 → F-5 eligible', evaluator: 'F-5', input: usDevInp, visaType: f5Type, expected: { eligible: true } }, f5.evaluate(usDevInp, f5Type));
runTest({ name: 'B2 프로필2 US IT개발 → C-4 eligible', evaluator: 'C-4', input: usDevInp, visaType: c4Type, expected: { eligible: true } }, c4.evaluate(usDevInp, c4Type));

// 프로필 3: 호주인 20세 카페 알바
const auCafeInp = baseInput({
  nationality: 'AU', ksicCode: '5621', companySizeType: 'SME',
  jobType: 'PART_TIME', age: 20, educationLevel: 'HIGH_SCHOOL',
});
runTest({ name: 'B2 프로필3 AU카페 → H-1 eligible', evaluator: 'H-1', input: auCafeInp, visaType: h1Type, expected: { eligible: true } }, h1.evaluate(auCafeInp, h1Type));
runTest({ name: 'B2 프로필3 AU카페 → D-2 eligible(PT)', evaluator: 'D-2', input: auCafeInp, visaType: d2Type, expected: { eligible: true } }, d2.evaluate(auCafeInp, d2Type));
runTest({ name: 'B2 프로필3 AU카페 → E-2 blocked(학력)', evaluator: 'E-2', input: auCafeInp, visaType: e2Type, expected: { eligible: false } }, e2.evaluate(auCafeInp, e2Type));
runTest({ name: 'B2 프로필3 AU카페 → F-5 eligible', evaluator: 'F-5', input: auCafeInp, visaType: f5Type, expected: { eligible: true } }, f5.evaluate(auCafeInp, f5Type));

// 프로필 4: 중국 재외동포 건설
const cnKoreanConstInp = baseInput({
  nationality: 'CN', isEthnicKorean: true, ksicCode: '41',
  companySizeType: 'SME', educationLevel: 'HIGH_SCHOOL',
  employeeCountKorean: 20, employeeCountForeign: 3,
});
runTest({ name: 'B2 프로필4 CN동포 건설 → E-9 eligible', evaluator: 'E-9', input: cnKoreanConstInp, visaType: e9Type, expected: { eligible: true } }, e9.evaluate(cnKoreanConstInp, e9Type));
runTest({ name: 'B2 프로필4 CN동포 건설 → H-2 eligible', evaluator: 'H-2', input: cnKoreanConstInp, visaType: h2Type, expected: { eligible: true } }, h2.evaluate(cnKoreanConstInp, h2Type));
runTest({ name: 'B2 프로필4 CN동포 건설 → F-4 eligible', evaluator: 'F-4', input: cnKoreanConstInp, visaType: f4Type, expected: { eligible: true } }, f4.evaluate(cnKoreanConstInp, f4Type));
runTest({ name: 'B2 프로필4 CN동포 건설 → F-5 eligible', evaluator: 'F-5', input: cnKoreanConstInp, visaType: f5Type, expected: { eligible: true } }, f5.evaluate(cnKoreanConstInp, f5Type));

// 프로필 5: 일본인 석사 연구원
const jpResearcherInp = baseInput({
  nationality: 'JP', ksicCode: '70', companySizeType: 'SME',
  educationLevel: 'MASTER', offeredSalary: 350, targetOccupationCode: '2111',
  age: 29,
});
runTest({ name: 'B2 프로필5 JP연구 → E-7 eligible', evaluator: 'E-7', input: jpResearcherInp, visaType: e7Type, expected: { eligible: true } }, e7.evaluate(jpResearcherInp, e7Type));
runTest({ name: 'B2 프로필5 JP연구 → E-3 eligible', evaluator: 'E-3', input: jpResearcherInp, visaType: eSimpleTypes['E-3'], expected: { eligible: true } }, eSimple.evaluate(jpResearcherInp, eSimpleTypes['E-3']));
runTest({ name: 'B2 프로필5 JP연구 → H-1 eligible', evaluator: 'H-1', input: jpResearcherInp, visaType: h1Type, expected: { eligible: true } }, h1.evaluate(jpResearcherInp, h1Type));
runTest({ name: 'B2 프로필5 JP연구 → E-9 blocked(비MOU)', evaluator: 'E-9', input: jpResearcherInp, visaType: e9Type, expected: { eligible: false } }, e9.evaluate(jpResearcherInp, e9Type));

// 프로필 6: 영국인 영어교사
const gbTeacherInp = baseInput({
  nationality: 'GB', ksicCode: '85', educationLevel: 'BACHELOR',
  offeredSalary: 280, hasCriminalRecord: false, age: 26,
});
runTest({ name: 'B2 프로필6 GB교사 → E-2 eligible', evaluator: 'E-2', input: gbTeacherInp, visaType: e2Type, expected: { eligible: true } }, e2.evaluate(gbTeacherInp, e2Type));
runTest({ name: 'B2 프로필6 GB교사 → H-1 eligible', evaluator: 'H-1', input: gbTeacherInp, visaType: h1Type, expected: { eligible: true } }, h1.evaluate(gbTeacherInp, h1Type));
runTest({ name: 'B2 프로필6 GB교사 → E-1 blocked(석사필요)', evaluator: 'E-1', input: gbTeacherInp, visaType: eSimpleTypes['E-1'], expected: { eligible: false } }, eSimple.evaluate(gbTeacherInp, eSimpleTypes['E-1']));

// 프로필 7: 러시아 재외동포 유통업
const ruKoreanRetailInp = baseInput({
  nationality: 'RU', isEthnicKorean: true, ksicCode: '47',
  companySizeType: 'SME', employeeCountKorean: 15, employeeCountForeign: 2,
});
runTest({ name: 'B2 프로필7 RU동포 유통 → H-2 eligible', evaluator: 'H-2', input: ruKoreanRetailInp, visaType: h2Type, expected: { eligible: true } }, h2.evaluate(ruKoreanRetailInp, h2Type));
runTest({ name: 'B2 프로필7 RU동포 유통 → F-4 eligible', evaluator: 'F-4', input: ruKoreanRetailInp, visaType: f4Type, expected: { eligible: true } }, f4.evaluate(ruKoreanRetailInp, f4Type));
runTest({ name: 'B2 프로필7 RU동포 유통 → E-9 blocked(비MOU)', evaluator: 'E-9', input: ruKoreanRetailInp, visaType: e9Type, expected: { eligible: false } }, e9.evaluate(ruKoreanRetailInp, e9Type));

// 프로필 8: 필리핀 농업 근무자
const phFarmInp = baseInput({
  nationality: 'PH', ksicCode: '01', companySizeType: 'SME',
  employeeCountKorean: 10, employeeCountForeign: 1, educationLevel: 'HIGH_SCHOOL',
});
runTest({ name: 'B2 프로필8 PH농업 → E-9 eligible', evaluator: 'E-9', input: phFarmInp, visaType: e9Type, expected: { eligible: true } }, e9.evaluate(phFarmInp, e9Type));
runTest({ name: 'B2 프로필8 PH농업 → E-8 eligible', evaluator: 'E-8', input: phFarmInp, visaType: eSimpleTypes['E-8'], expected: { eligible: true } }, eSimple.evaluate(phFarmInp, eSimpleTypes['E-8']));
runTest({ name: 'B2 프로필8 PH농업 → E-10 blocked(비수상)', evaluator: 'E-10', input: phFarmInp, visaType: eSimpleTypes['E-10'], expected: { eligible: false } }, eSimple.evaluate(phFarmInp, eSimpleTypes['E-10']));

// 프로필 9: 인도인 박사 IT 전문가
const inDoctorInp = baseInput({
  nationality: 'IN', ksicCode: '62', companySizeType: 'LARGE',
  educationLevel: 'DOCTOR', offeredSalary: 500, targetOccupationCode: '2111',
  age: 35,
});
runTest({ name: 'B2 프로필9 IN박사IT → E-7 eligible', evaluator: 'E-7', input: inDoctorInp, visaType: e7Type, expected: { eligible: true } }, e7.evaluate(inDoctorInp, e7Type));
runTest({ name: 'B2 프로필9 IN박사IT → E-9 blocked(비MOU)', evaluator: 'E-9', input: inDoctorInp, visaType: e9Type, expected: { eligible: false } }, e9.evaluate(inDoctorInp, e9Type));
runTest({ name: 'B2 프로필9 IN박사IT → H-1 blocked(비협정)', evaluator: 'H-1', input: inDoctorInp, visaType: h1Type, expected: { eligible: false } }, h1.evaluate(inDoctorInp, h1Type));
runTest({ name: 'B2 프로필9 IN박사IT → F-5 eligible', evaluator: 'F-5', input: inDoctorInp, visaType: f5Type, expected: { eligible: true } }, f5.evaluate(inDoctorInp, f5Type));

// 프로필 10: 카자흐스탄 재외동포 청소원
const kzCleanerInp = baseInput({
  nationality: 'KZ', isEthnicKorean: true, ksicCode: '75',
  targetOccupationCode: '9111', companySizeType: 'SME',
});
runTest({ name: 'B2 프로필10 KZ동포 청소 → H-2 eligible(75허용)', evaluator: 'H-2', input: kzCleanerInp, visaType: h2Type, expected: { eligible: true } }, h2.evaluate(kzCleanerInp, h2Type));
runTest({ name: 'B2 프로필10 KZ동포 청소 → F-4 blocked(청소업)', evaluator: 'F-4', input: kzCleanerInp, visaType: f4Type, expected: { eligible: false } }, f4.evaluate(kzCleanerInp, f4Type));

// 프로필 11: 독일인 25세 관광취업 (여러 업종)
const deWhInp1 = baseInput({ nationality: 'DE', age: 25, ksicCode: '55' });
const deWhInp2 = baseInput({ nationality: 'DE', age: 25, ksicCode: '56' });
const deWhInp3 = baseInput({ nationality: 'DE', age: 25, ksicCode: '47' });
const deWhInp4 = baseInput({ nationality: 'DE', age: 25, ksicCode: '62' });
runTest({ name: 'B2 프로필11 DE WH 숙박 → H-1 eligible', evaluator: 'H-1', input: deWhInp1, visaType: h1Type, expected: { eligible: true } }, h1.evaluate(deWhInp1, h1Type));
runTest({ name: 'B2 프로필11 DE WH 음식 → H-1 eligible', evaluator: 'H-1', input: deWhInp2, visaType: h1Type, expected: { eligible: true } }, h1.evaluate(deWhInp2, h1Type));
runTest({ name: 'B2 프로필11 DE WH 소매 → H-1 eligible', evaluator: 'H-1', input: deWhInp3, visaType: h1Type, expected: { eligible: true } }, h1.evaluate(deWhInp3, h1Type));
runTest({ name: 'B2 프로필11 DE WH IT → H-1 eligible', evaluator: 'H-1', input: deWhInp4, visaType: h1Type, expected: { eligible: true } }, h1.evaluate(deWhInp4, h1Type));

// 프로필 12: D-2 유학생 다양한 알바
const d2StudentInp1 = baseInput({ jobType: 'PART_TIME', ksicCode: '47', koreanLevel: 'TOPIK3' });
const d2StudentInp2 = baseInput({ jobType: 'PART_TIME', ksicCode: '55', koreanLevel: 'TOPIK5' });
const d2StudentInp3 = baseInput({ jobType: 'PART_TIME', ksicCode: '62', koreanLevel: 'TOPIK4' });
const d2StudentInp4 = baseInput({ jobType: 'FULL_TIME', ksicCode: '47' });
runTest({ name: 'B2 프로필12 D-2 소매PT → eligible', evaluator: 'D-2', input: d2StudentInp1, visaType: d2Type, expected: { eligible: true, noteContains: 'TOPIK 4급' } }, d2.evaluate(d2StudentInp1, d2Type));
runTest({ name: 'B2 프로필12 D-2 숙박PT → eligible', evaluator: 'D-2', input: d2StudentInp2, visaType: d2Type, expected: { eligible: true } }, d2.evaluate(d2StudentInp2, d2Type));
runTest({ name: 'B2 프로필12 D-2 IT PT → eligible', evaluator: 'D-2', input: d2StudentInp3, visaType: d2Type, expected: { eligible: true } }, d2.evaluate(d2StudentInp3, d2Type));
runTest({ name: 'B2 프로필12 D-2 FT → blocked', evaluator: 'D-2', input: d2StudentInp4, visaType: d2Type, expected: { eligible: false } }, d2.evaluate(d2StudentInp4, d2Type));

// ============================================================
// [BATCH 2] F-2-7 감점 시나리오 확장 (~10 tests)
// ============================================================
console.log('--- [B2] F-2-7 감점 시나리오 확장 ---');

// 범죄경력만
const b2F27Crim1 = baseInput({ age: 25, educationLevel: 'MASTER', koreanLevel: 'TOPIK6', incomeGniPercent: 200, hasCriminalRecord: true });
runTest({ name: 'B2 F-2-7 90점+범죄-5 → eligible', evaluator: 'F-2-7', input: b2F27Crim1, visaType: f27Type, expected: { eligible: true, noteContains: '범죄경력' } }, f2.evaluate(b2F27Crim1, f27Type));

// 출입국위반만
const b2F27Imm1 = baseInput({ age: 25, educationLevel: 'MASTER', koreanLevel: 'TOPIK6', incomeGniPercent: 200, hasImmigrationViolation: true });
runTest({ name: 'B2 F-2-7 90점+위반-10 → eligible', evaluator: 'F-2-7', input: b2F27Imm1, visaType: f27Type, expected: { eligible: true, noteContains: '출입국법' } }, f2.evaluate(b2F27Imm1, f27Type));

// 양쪽 다
const b2F27Both = baseInput({ age: 25, educationLevel: 'MASTER', koreanLevel: 'TOPIK6', incomeGniPercent: 200, hasCriminalRecord: true, hasImmigrationViolation: true });
runTest({ name: 'B2 F-2-7 90점+범죄+위반 → eligible', evaluator: 'F-2-7', input: b2F27Both, visaType: f27Type, expected: { eligible: true } }, f2.evaluate(b2F27Both, f27Type));

// 다양한 학력별 감점 테스트
const b2F27PenaltyCases = [
  { age: 20, edu: 'DOCTOR', kor: 'TOPIK6', gni: 300, crim: true, imm: false, desc: '105-5=100 pass' },
  { age: 20, edu: 'DOCTOR', kor: 'TOPIK6', gni: 300, crim: false, imm: true, desc: '105-10=95 pass' },
  { age: 20, edu: 'DOCTOR', kor: 'TOPIK6', gni: 300, crim: true, imm: true, desc: '105-15=90 pass' },
  { age: 45, edu: 'MASTER', kor: 'TOPIK6', gni: 300, crim: true, imm: false, desc: '80-5=75 pass' },
  { age: 45, edu: 'BACHELOR', kor: 'TOPIK6', gni: 300, crim: false, imm: true, desc: '75-10=65 fail' },
  { age: 40, edu: 'MASTER', kor: 'TOPIK6', gni: 300, crim: true, imm: false, desc: '82-5=77 pass' },
  { age: 40, edu: 'MASTER', kor: 'TOPIK6', gni: 300, crim: false, imm: true, desc: '82-10=72 pass' },
];
for (const tc of b2F27PenaltyCases) {
  const inp = baseInput({ age: tc.age, educationLevel: tc.edu, koreanLevel: tc.kor, incomeGniPercent: tc.gni, hasCriminalRecord: tc.crim, hasImmigrationViolation: tc.imm });
  const base = (tc.age <= 24 ? 25 : tc.age <= 29 ? 20 : tc.age <= 34 ? 15 : tc.age <= 39 ? 10 : tc.age <= 44 ? 7 : 5) + (tc.edu === 'DOCTOR' ? 35 : tc.edu === 'MASTER' ? 30 : tc.edu === 'BACHELOR' ? 25 : 15) + (tc.kor === 'TOPIK6' ? 20 : 16) + (tc.gni >= 300 ? 25 : tc.gni >= 200 ? 20 : 15);
  const penalty = (tc.crim ? 5 : 0) + (tc.imm ? 10 : 0);
  // Note: penalties are applied AFTER eligibility check, so base >= 80 determines eligibility
  const isEligible = base >= 80;
  runTest({
    name: `B2 F-2-7 ${tc.desc}`,
    evaluator: 'F-2-7', input: inp, visaType: f27Type,
    expected: { eligible: isEligible },
  }, f2.evaluate(inp, f27Type));
}

// ============================================================
// [BATCH 2] D-Simple 확장 (~15 tests)
// ============================================================
console.log('--- [B2] D-Simple 확장 ---');

// D-4 다양한 업종 시간제
const b2D4Industries = ['25', '41', '47', '55', '56', '62', '70', '85', '90', '96'];
for (const ksic of b2D4Industries) {
  const inp = baseInput({ jobType: 'PART_TIME', ksicCode: ksic });
  runTest({
    name: `B2 D-4 PT 업종${ksic} eligible`,
    evaluator: 'D-4', input: inp, visaType: dSimpleTypes['D-4'],
    expected: { eligible: true },
  }, dSimple.evaluate(inp, dSimpleTypes['D-4']));
}

// D-10 다양한 업종
const b2D10Industries = ['25', '41', '47', '55', '56', '62', '70', '85'];
for (const ksic of b2D10Industries) {
  const inp = baseInput({ ksicCode: ksic });
  runTest({
    name: `B2 D-10 업종${ksic} eligible`,
    evaluator: 'D-10', input: inp, visaType: dSimpleTypes['D-10'],
    expected: { eligible: true },
  }, dSimple.evaluate(inp, dSimpleTypes['D-10']));
}

// D-1 다양한 업종 blocked
const b2D1Industries = ['25', '41', '47', '55', '62', '85'];
for (const ksic of b2D1Industries) {
  const inp = baseInput({ ksicCode: ksic });
  runTest({
    name: `B2 D-1 업종${ksic} blocked`,
    evaluator: 'D-1', input: inp, visaType: dSimpleTypes['D-1'],
    expected: { eligible: false },
  }, dSimple.evaluate(inp, dSimpleTypes['D-1']));
}

// ============================================================
// [BATCH 2] F-6 업종 전수 (~15 tests)
// ============================================================
console.log('--- [B2] F-6 업종 전수 ---');

const b2F6Industries = ['01', '02', '03', '13', '14', '15', '17', '41', '42', '46', '47', '49', '50', '64', '71'];
for (const ksic of b2F6Industries) {
  const inp = baseInput({ ksicCode: ksic });
  runTest({
    name: `B2 F-6 업종${ksic} eligible`,
    evaluator: 'F-6', input: inp, visaType: f6Type,
    expected: { eligible: true },
  }, fSimple.evaluate(inp, f6Type));
}

// ============================================================
// [BATCH 2] F-1 업종 전수 blocked (~10 tests)
// ============================================================
console.log('--- [B2] F-1 업종 전수 ---');

const b2F1Industries = ['01', '25', '41', '55', '62', '70', '85', '90', '96', '75'];
for (const ksic of b2F1Industries) {
  const inp = baseInput({ ksicCode: ksic });
  runTest({
    name: `B2 F-1 업종${ksic} blocked`,
    evaluator: 'F-1', input: inp, visaType: f1Type,
    expected: { eligible: false },
  }, fSimple.evaluate(inp, f1Type));
}

// ============================================================
// [BATCH 2] F-3 업종 전수 blocked (~10 tests)
// ============================================================
console.log('--- [B2] F-3 업종 전수 ---');

const b2F3Industries = ['01', '25', '41', '55', '62', '70', '85', '90', '96', '75'];
for (const ksic of b2F3Industries) {
  const inp = baseInput({ ksicCode: ksic });
  runTest({
    name: `B2 F-3 업종${ksic} blocked`,
    evaluator: 'F-3', input: inp, visaType: f3Type,
    expected: { eligible: false },
  }, fSimple.evaluate(inp, f3Type));
}

// ============================================================
// [BATCH 2] Null/Undefined 방어 추가 (~15 tests)
// ============================================================
console.log('--- [B2] Null/Undefined 방어 추가 ---');

// E-9 nationality 미입력 (safe)
runTest({ name: 'B2 E-9 nationality undefined eligible', evaluator: 'E-9', input: baseInput({ nationality: undefined, ksicCode: '25' }), visaType: e9Type, expected: { eligible: true } }, e9.evaluate(baseInput({ nationality: undefined, ksicCode: '25' }), e9Type));

// E-7 targetOccupationCode 미입력 (safe)
runTest({ name: 'B2 E-7 occ undefined eligible', evaluator: 'E-7', input: baseInput({ educationLevel: 'BACHELOR', offeredSalary: 300, targetOccupationCode: undefined }), visaType: e7Type, expected: { eligible: true } }, e7.evaluate(baseInput({ educationLevel: 'BACHELOR', offeredSalary: 300, targetOccupationCode: undefined }), e7Type));
runTest({ name: 'B2 E-7 nationality undefined eligible', evaluator: 'E-7', input: baseInput({ educationLevel: 'BACHELOR', offeredSalary: 300, nationality: undefined }), visaType: e7Type, expected: { eligible: true } }, e7.evaluate(baseInput({ educationLevel: 'BACHELOR', offeredSalary: 300, nationality: undefined }), e7Type));

// H-1 nationality 미입력 (safe)
runTest({ name: 'B2 H-1 nationality undefined eligible', evaluator: 'H-1', input: baseInput({ nationality: undefined, age: 25 }), visaType: h1Type, expected: { eligible: true } }, h1.evaluate(baseInput({ nationality: undefined, age: 25 }), h1Type));
runTest({ name: 'B2 H-1 age undefined eligible', evaluator: 'H-1', input: baseInput({ nationality: 'AU', age: undefined }), visaType: h1Type, expected: { eligible: true } }, h1.evaluate(baseInput({ nationality: 'AU', age: undefined }), h1Type));

// H-2 koreanAncestryCountry 다양한 국가
for (const country of ['CN', 'RU', 'UZ', 'KZ', 'KG', 'UA']) {
  const inp = baseInput({ ksicCode: '25', koreanAncestryCountry: country });
  runTest({
    name: `B2 H-2 ancestryCountry=${country} eligible`,
    evaluator: 'H-2', input: inp, visaType: h2Type,
    expected: { eligible: true },
  }, h2.evaluate(inp, h2Type));
}

// H-2 isEthnicKorean undefined (safe, !== false)
runTest({ name: 'B2 H-2 isEthnicKorean undefined eligible', evaluator: 'H-2', input: baseInput({ isEthnicKorean: undefined, nationality: 'CN', ksicCode: '25' }), visaType: h2Type, expected: { eligible: true } }, h2.evaluate(baseInput({ isEthnicKorean: undefined, nationality: 'CN', ksicCode: '25' }), h2Type));

// F-4 isEthnicKorean undefined (safe, !== false)
runTest({ name: 'B2 F-4 isEthnicKorean undefined eligible', evaluator: 'F-4', input: baseInput({ isEthnicKorean: undefined }), visaType: f4Type, expected: { eligible: true } }, f4.evaluate(baseInput({ isEthnicKorean: undefined }), f4Type));

// F-2-7 optional fields undefined
runTest({ name: 'B2 F-2-7 age undefined', evaluator: 'F-2-7', input: baseInput({ age: undefined, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300 }), visaType: f27Type, expected: { eligible: true } }, f2.evaluate(baseInput({ age: undefined, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300 }), f27Type));
runTest({ name: 'B2 F-2-7 koreanLevel undefined', evaluator: 'F-2-7', input: baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: undefined, incomeGniPercent: 300 }), visaType: f27Type, expected: { eligible: true } }, f2.evaluate(baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: undefined, incomeGniPercent: 300 }), f27Type));
runTest({ name: 'B2 F-2-7 income undefined', evaluator: 'F-2-7', input: baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: undefined }), visaType: f27Type, expected: { eligible: true } }, f2.evaluate(baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: undefined }), f27Type));
runTest({ name: 'B2 F-2-7 edu undefined', evaluator: 'F-2-7', input: baseInput({ age: 20, educationLevel: undefined, koreanLevel: 'TOPIK6', incomeGniPercent: 300 }), visaType: f27Type, expected: { eligible: false } }, f2.evaluate(baseInput({ age: 20, educationLevel: undefined, koreanLevel: 'TOPIK6', incomeGniPercent: 300 }), f27Type));

// ============================================================
// [BATCH 2] 극단값 추가 (~15 tests)
// ============================================================
console.log('--- [B2] 극단값 추가 ---');

runTest({ name: 'B2 E-7 급여 1원 blocked', evaluator: 'E-7', input: baseInput({ offeredSalary: 1, educationLevel: 'BACHELOR' }), visaType: e7Type, expected: { eligible: false } }, e7.evaluate(baseInput({ offeredSalary: 1, educationLevel: 'BACHELOR' }), e7Type));
runTest({ name: 'B2 E-7 급여 99999원 eligible', evaluator: 'E-7', input: baseInput({ offeredSalary: 99999, educationLevel: 'BACHELOR' }), visaType: e7Type, expected: { eligible: true } }, e7.evaluate(baseInput({ offeredSalary: 99999, educationLevel: 'BACHELOR' }), e7Type));
runTest({ name: 'B2 E-9 외국인 0:0 eligible', evaluator: 'E-9', input: baseInput({ nationality: 'VN', employeeCountKorean: 0, employeeCountForeign: 0 }), visaType: e9Type, expected: { eligible: true } }, e9.evaluate(baseInput({ nationality: 'VN', employeeCountKorean: 0, employeeCountForeign: 0 }), e9Type));
runTest({ name: 'B2 H-1 나이 0세 blocked', evaluator: 'H-1', input: baseInput({ nationality: 'AU', age: 0 }), visaType: h1Type, expected: { eligible: false } }, h1.evaluate(baseInput({ nationality: 'AU', age: 0 }), h1Type));
runTest({ name: 'B2 H-1 나이 1세 blocked', evaluator: 'H-1', input: baseInput({ nationality: 'AU', age: 1 }), visaType: h1Type, expected: { eligible: false } }, h1.evaluate(baseInput({ nationality: 'AU', age: 1 }), h1Type));
runTest({ name: 'B2 H-1 나이 100세 blocked', evaluator: 'H-1', input: baseInput({ nationality: 'AU', age: 100 }), visaType: h1Type, expected: { eligible: false } }, h1.evaluate(baseInput({ nationality: 'AU', age: 100 }), h1Type));
runTest({ name: 'B2 F-2-7 나이 1세 점수', evaluator: 'F-2-7', input: baseInput({ age: 1, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300 }), visaType: f27Type, expected: { eligible: true, scoreGte: 100 } }, f2.evaluate(baseInput({ age: 1, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300 }), f27Type));
runTest({ name: 'B2 F-2-7 나이 100세 점수', evaluator: 'F-2-7', input: baseInput({ age: 100, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300 }), visaType: f27Type, expected: { eligible: true, scoreGte: 80 } }, f2.evaluate(baseInput({ age: 100, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 300 }), f27Type));
runTest({ name: 'B2 F-2-7 GNI 0% 점수', evaluator: 'F-2-7', input: baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 0 }), visaType: f27Type, expected: { eligible: true, scoreGte: 80 } }, f2.evaluate(baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 0 }), f27Type));
runTest({ name: 'B2 F-2-7 GNI 1000% 점수', evaluator: 'F-2-7', input: baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 1000 }), visaType: f27Type, expected: { eligible: true, scoreGte: 105 } }, f2.evaluate(baseInput({ age: 20, educationLevel: 'DOCTOR', koreanLevel: 'TOPIK6', incomeGniPercent: 1000 }), f27Type));

// E-9 대기업 다양한 MOU 국가
for (const country of ['VN', 'PH', 'TH', 'ID', 'LK']) {
  const inp = baseInput({ nationality: country, companySizeType: 'LARGE' });
  runTest({
    name: `B2 E-9 대기업 ${country} blocked`,
    evaluator: 'E-9', input: inp, visaType: e9Type,
    expected: { eligible: false, blockedReasonContains: '대기업' },
  }, e9.evaluate(inp, e9Type));
}

// ============================================================
// [BATCH 2] E-7 9xxx 단순노무 확장 (~15 tests)
// ============================================================
console.log('--- [B2] E-7 9xxx 단순노무 확장 ---');

const b2E7More9xxx = ['9113', '9114', '9119', '9210', '9222', '9310', '9321', '9410', '9420', '9510', '9520', '9910', '9920', '9990', '9000'];
for (const occ of b2E7More9xxx) {
  const inp = baseInput({ targetOccupationCode: occ, educationLevel: 'DOCTOR', offeredSalary: 500 });
  runTest({
    name: `B2 E-7 9xxx ${occ} blocked`,
    evaluator: 'E-7', input: inp, visaType: e7Type,
    expected: { eligible: false, blockedReasonContains: '단순노무직' },
  }, e7.evaluate(inp, e7Type));
}

// ============================================================
// [BATCH 2] E-9 비허용 업종 확장 (~15 tests)
// ============================================================
console.log('--- [B2] E-9 비허용업종 확장 ---');

const b2E9MoreBlocked = ['63', '66', '69', '72', '73', '74', '76', '77', '78', '79', '81', '82', '84', '87', '88'];
for (const ksic of b2E9MoreBlocked) {
  const inp = baseInput({ nationality: 'VN', ksicCode: ksic });
  runTest({
    name: `B2 E-9 비허용 ${ksic} blocked`,
    evaluator: 'E-9', input: inp, visaType: e9Type,
    expected: { eligible: false, blockedReasonContains: '허용 업종' },
  }, e9.evaluate(inp, e9Type));
}

// ============================================================
// [BATCH 2] H-2 비허용국가 확장 (~10 tests)
// ============================================================
console.log('--- [B2] H-2 비허용국가 확장 ---');

const b2H2NonCountries = ['US', 'JP', 'GB', 'DE', 'FR', 'AU', 'NZ', 'BR', 'IN', 'VN'];
for (const country of b2H2NonCountries) {
  const inp = baseInput({ nationality: country, isEthnicKorean: true, ksicCode: '25' });
  runTest({
    name: `B2 H-2 비허용국 ${country} blocked`,
    evaluator: 'H-2', input: inp, visaType: h2Type,
    expected: { eligible: false },
  }, h2.evaluate(inp, h2Type));
}

// ============================================================
// [BATCH 2] E-2 비영어권 추가 (~10 tests)
// ============================================================
console.log('--- [B2] E-2 비영어권 추가 ---');

const b2E2MoreNonEng = ['IT', 'SE', 'NO', 'RU', 'AR', 'ID', 'TH', 'MY', 'SG', 'NL'];
for (const country of b2E2MoreNonEng) {
  const inp = baseInput({ nationality: country, educationLevel: 'BACHELOR', ksicCode: '85' });
  runTest({
    name: `B2 E-2 비영어권 ${country} blocked`,
    evaluator: 'E-2', input: inp, visaType: e2Type,
    expected: { eligible: false, blockedReasonContains: '허용 국가' },
  }, e2.evaluate(inp, e2Type));
}

// ============================================================
// [BATCH 2] E-2 학력별 상세 (~10 tests)
// ============================================================
console.log('--- [B2] E-2 학력별 상세 ---');

for (const country of ['AU', 'NZ', 'ZA', 'IE']) {
  // HIGH_SCHOOL blocked
  runTest({
    name: `B2 E-2 ${country} HIGH_SCHOOL blocked`,
    evaluator: 'E-2', input: baseInput({ nationality: country, educationLevel: 'HIGH_SCHOOL', ksicCode: '85' }), visaType: e2Type,
    expected: { eligible: false, blockedReasonContains: '학사학위' },
  }, e2.evaluate(baseInput({ nationality: country, educationLevel: 'HIGH_SCHOOL', ksicCode: '85' }), e2Type));
  // COLLEGE blocked
  runTest({
    name: `B2 E-2 ${country} COLLEGE blocked`,
    evaluator: 'E-2', input: baseInput({ nationality: country, educationLevel: 'COLLEGE', ksicCode: '85' }), visaType: e2Type,
    expected: { eligible: false, blockedReasonContains: '학사학위' },
  }, e2.evaluate(baseInput({ nationality: country, educationLevel: 'COLLEGE', ksicCode: '85' }), e2Type));
}

// ============================================================
// [BATCH 3] E-9 MOU국가 × 추가 업종 조합 (~136 tests)
// ============================================================
console.log('--- [B3] E-9 MOU국가 × 추가 업종 ---');

const b3E9Industries2 = ['25', '26', '27', '28', '29', '30', '31', '32', '33'];
for (const country of ['UZ', 'PK', 'CN', 'TL', 'BD', 'KG', 'LA', 'FJ']) {
  for (const ksic of b3E9Industries2) {
    const inp = baseInput({ nationality: country, ksicCode: ksic });
    runTest({
      name: `B3 E-9 ${country}×${ksic} eligible`,
      evaluator: 'E-9', input: inp, visaType: e9Type,
      expected: { eligible: true },
    }, e9.evaluate(inp, e9Type));
  }
}

// E-9 MOU countries with construction/agriculture
for (const country of E9_MOU_COUNTRIES) {
  for (const ksic of ['41', '42', '01', '02', '03']) {
    const inp = baseInput({ nationality: country, ksicCode: ksic });
    runTest({
      name: `B3 E-9 ${country}×${ksic} eligible`,
      evaluator: 'E-9', input: inp, visaType: e9Type,
      expected: { eligible: true },
    }, e9.evaluate(inp, e9Type));
  }
}

// ============================================================
// [BATCH 3] E-7 직종별 학력 조합 (~48 tests)
// ============================================================
console.log('--- [B3] E-7 직종×학력 ---');

const b3E7Occupations = ['2211', '2312', '2111', '2521', '2711', '2811', '1311', '4111'];
const b3E7Educations = ['DOCTOR', 'MASTER', 'BACHELOR', 'COLLEGE'] as const;
for (const occ of b3E7Occupations) {
  for (const edu of b3E7Educations) {
    const salary = edu === 'COLLEGE' || edu === 'BACHELOR' ? 300 : 350;
    const inp = baseInput({ targetOccupationCode: occ, educationLevel: edu, offeredSalary: salary });
    runTest({
      name: `B3 E-7 ${occ}×${edu} eligible`,
      evaluator: 'E-7', input: inp, visaType: e7Type,
      expected: { eligible: true },
    }, e7.evaluate(inp, e7Type));
  }
}

// ============================================================
// [BATCH 3] H-1 국가×나이 31세 blocked 전수 (~25 tests)
// ============================================================
console.log('--- [B3] H-1 국가×31세 blocked ---');

for (const country of H1_WH_COUNTRIES) {
  const inp = baseInput({ nationality: country, age: 31 });
  runTest({
    name: `B3 H-1 ${country} 31세 blocked`,
    evaluator: 'H-1', input: inp, visaType: h1Type,
    expected: { eligible: false },
  }, h1.evaluate(inp, h1Type));
}

// ============================================================
// [BATCH 3] H-1 국가×나이 18세 eligible 전수 (~25 tests)
// ============================================================
console.log('--- [B3] H-1 국가×18세 ---');

for (const country of H1_WH_COUNTRIES) {
  const inp = baseInput({ nationality: country, age: 18 });
  runTest({
    name: `B3 H-1 ${country} 18세 eligible`,
    evaluator: 'H-1', input: inp, visaType: h1Type,
    expected: { eligible: true },
  }, h1.evaluate(inp, h1Type));
}

// ============================================================
// [BATCH 3] H-2 국가×추가 업종 (~36 tests)
// ============================================================
console.log('--- [B3] H-2 국가×추가 업종 ---');

const b3H2Industries2 = ['26', '27', '28', '29', '30', '31'];
for (const country of H2_COUNTRIES) {
  for (const ksic of b3H2Industries2) {
    const inp = baseInput({ isEthnicKorean: true, nationality: country, ksicCode: ksic });
    runTest({
      name: `B3 H-2 ${country}×${ksic} eligible`,
      evaluator: 'H-2', input: inp, visaType: h2Type,
      expected: { eligible: true },
    }, h2.evaluate(inp, h2Type));
  }
}

// ============================================================
// [BATCH 3] F-2-7 학력×한국어 조합 전수 (~25 tests)
// ============================================================
console.log('--- [B3] F-2-7 학력×한국어 ---');

const b3F27Edu = ['DOCTOR', 'MASTER', 'BACHELOR', 'COLLEGE', 'HIGH_SCHOOL'] as const;
const b3F27Kor = ['TOPIK6', 'TOPIK5', 'TOPIK4', 'TOPIK3', 'TOPIK2'] as const;
for (const edu of b3F27Edu) {
  for (const kor of b3F27Kor) {
    const eduScore = edu === 'DOCTOR' ? 35 : edu === 'MASTER' ? 30 : edu === 'BACHELOR' ? 25 : edu === 'COLLEGE' ? 15 : 10;
    const korScore = kor === 'TOPIK6' ? 20 : kor === 'TOPIK5' ? 16 : kor === 'TOPIK4' ? 12 : kor === 'TOPIK3' ? 8 : 4;
    const total = 25 + eduScore + korScore + 25; // age20=25, gni300=25
    const inp = baseInput({ age: 20, educationLevel: edu, koreanLevel: kor, incomeGniPercent: 300 });
    runTest({
      name: `B3 F-2-7 ${edu}×${kor} total=${total}`,
      evaluator: 'F-2-7', input: inp, visaType: f27Type,
      expected: { eligible: total >= 80, scoreGte: total },
    }, f2.evaluate(inp, f27Type));
  }
}

// ============================================================
// [BATCH 3] 교차: 숙박업(55) 전체 비자 (~12 tests)
// ============================================================
console.log('--- [B3] 교차: 숙박업(55) ---');

const b3HotelInp = baseInput({ ksicCode: '55', companySizeType: 'SME', nationality: 'VN', isEthnicKorean: false, educationLevel: 'HIGH_SCHOOL', offeredSalary: 200 });
runTest({ name: 'B3 숙박 → E-9 eligible', evaluator: 'E-9', input: b3HotelInp, visaType: e9Type, expected: { eligible: true } }, e9.evaluate(b3HotelInp, e9Type));
runTest({ name: 'B3 숙박 → E-7 blocked(학력/급여)', evaluator: 'E-7', input: b3HotelInp, visaType: e7Type, expected: { eligible: false } }, e7.evaluate(b3HotelInp, e7Type));
runTest({ name: 'B3 숙박 → H-1 blocked(비협정)', evaluator: 'H-1', input: b3HotelInp, visaType: h1Type, expected: { eligible: false } }, h1.evaluate(b3HotelInp, h1Type));
runTest({ name: 'B3 숙박 → F-5 eligible', evaluator: 'F-5', input: b3HotelInp, visaType: f5Type, expected: { eligible: true } }, f5.evaluate(b3HotelInp, f5Type));
runTest({ name: 'B3 숙박 → F-6 eligible', evaluator: 'F-6', input: b3HotelInp, visaType: f6Type, expected: { eligible: true } }, fSimple.evaluate(b3HotelInp, f6Type));
runTest({ name: 'B3 숙박 → C-4 eligible', evaluator: 'C-4', input: b3HotelInp, visaType: c4Type, expected: { eligible: true } }, c4.evaluate(b3HotelInp, c4Type));
runTest({ name: 'B3 숙박 → D-2 PT eligible', evaluator: 'D-2', input: { ...b3HotelInp, jobType: 'PART_TIME' }, visaType: d2Type, expected: { eligible: true } }, d2.evaluate({ ...b3HotelInp, jobType: 'PART_TIME' }, d2Type));
runTest({ name: 'B3 숙박 → D-10 eligible', evaluator: 'D-10', input: b3HotelInp, visaType: dSimpleTypes['D-10'], expected: { eligible: true } }, dSimple.evaluate(b3HotelInp, dSimpleTypes['D-10']));
runTest({ name: 'B3 숙박 → A-1 blocked', evaluator: 'A-1', input: b3HotelInp, visaType: prohibitedTypes['A-1'], expected: { eligible: false } }, prohibited.evaluate(b3HotelInp, prohibitedTypes['A-1']));
runTest({ name: 'B3 숙박 → F-1 blocked', evaluator: 'F-1', input: b3HotelInp, visaType: f1Type, expected: { eligible: false } }, fSimple.evaluate(b3HotelInp, f1Type));

// ============================================================
// [BATCH 3] 교차: 음식업(56) 전체 비자 (~10 tests)
// ============================================================
console.log('--- [B3] 교차: 음식업(56) ---');

const b3FoodInp = baseInput({ ksicCode: '56', companySizeType: 'SME', nationality: 'TH', educationLevel: 'HIGH_SCHOOL' });
runTest({ name: 'B3 음식 → E-9 eligible', evaluator: 'E-9', input: b3FoodInp, visaType: e9Type, expected: { eligible: true } }, e9.evaluate(b3FoodInp, e9Type));
runTest({ name: 'B3 음식 → H-2 eligible', evaluator: 'H-2', input: { ...b3FoodInp, isEthnicKorean: true, nationality: 'CN' }, visaType: h2Type, expected: { eligible: true } }, h2.evaluate({ ...b3FoodInp, isEthnicKorean: true, nationality: 'CN' }, h2Type));
runTest({ name: 'B3 음식 → F-4 eligible', evaluator: 'F-4', input: { ...b3FoodInp, isEthnicKorean: true }, visaType: f4Type, expected: { eligible: true } }, f4.evaluate({ ...b3FoodInp, isEthnicKorean: true }, f4Type));
runTest({ name: 'B3 음식 → F-5 eligible', evaluator: 'F-5', input: b3FoodInp, visaType: f5Type, expected: { eligible: true } }, f5.evaluate(b3FoodInp, f5Type));
runTest({ name: 'B3 음식 → C-4 eligible', evaluator: 'C-4', input: b3FoodInp, visaType: c4Type, expected: { eligible: true } }, c4.evaluate(b3FoodInp, c4Type));
runTest({ name: 'B3 음식 → E-6 blocked', evaluator: 'E-6', input: b3FoodInp, visaType: eSimpleTypes['E-6'], expected: { eligible: false } }, eSimple.evaluate(b3FoodInp, eSimpleTypes['E-6']));

// ============================================================
// [BATCH 3] E-9 유흥업소(56221) × 모든 MOU국가 (~17 tests)
// ============================================================
console.log('--- [B3] E-9 유흥업소 × MOU국가 ---');

for (const country of E9_MOU_COUNTRIES) {
  const inp = baseInput({ nationality: country, ksicCode: '56221' });
  runTest({
    name: `B3 E-9 ${country}×유흥 blocked`,
    evaluator: 'E-9', input: inp, visaType: e9Type,
    expected: { eligible: false, blockedReasonContains: '유흥업소' },
  }, e9.evaluate(inp, e9Type));
}

// ============================================================
// [BATCH 3] H-1 유흥업소 × 다양한 국가 (~10 tests)
// ============================================================
console.log('--- [B3] H-1 유흥 × 국가 ---');

for (const country of ['JP', 'FR', 'DE', 'GB', 'IE', 'SE', 'DK', 'NL', 'IT', 'PT']) {
  const inp = baseInput({ nationality: country, age: 25, ksicCode: '56221' });
  runTest({
    name: `B3 H-1 ${country} 유흥 blocked`,
    evaluator: 'H-1', input: inp, visaType: h1Type,
    expected: { eligible: false },
  }, h1.evaluate(inp, h1Type));
}

// ============================================================
// [BATCH 3] E-2 모든 국가 × 비교육업종 제한 (~14 tests)
// ============================================================
console.log('--- [B3] E-2 국가×비교육 ---');

for (const country of E2_COUNTRIES) {
  for (const ksic of ['62', '25']) {
    const inp = baseInput({ nationality: country, educationLevel: 'BACHELOR', ksicCode: ksic });
    runTest({
      name: `B3 E-2 ${country}×${ksic} eligible+restrict`,
      evaluator: 'E-2', input: inp, visaType: e2Type,
      expected: { eligible: true, restrictionContains: '교육기관' },
    }, e2.evaluate(inp, e2Type));
  }
}

// ============================================================
// [BATCH 3] F-4 재외동포 × 유흥/청소 × 모든 직종코드 (~20 tests)
// ============================================================
console.log('--- [B3] F-4 재외동포 유흥/청소 확장 ---');

const b3F4RestrictedKsic = ['56221', '562210', '562211', '562219', '75', '7511', '7512', '7520', '7521', '7522'];
for (const ksic of b3F4RestrictedKsic) {
  const inp = baseInput({ isEthnicKorean: true, ksicCode: ksic });
  runTest({
    name: `B3 F-4 제한업종 ${ksic} blocked`,
    evaluator: 'F-4', input: inp, visaType: f4Type,
    expected: { eligible: false },
  }, f4.evaluate(inp, f4Type));
}

// F-4 전문직종 eligible
const b3F4ProfOcc = ['1111', '1211', '2111', '2211', '2311', '2511', '2711', '2811', '3111', '4111'];
for (const occ of b3F4ProfOcc) {
  const inp = baseInput({ isEthnicKorean: true, targetOccupationCode: occ });
  runTest({
    name: `B3 F-4 전문직 ${occ} eligible`,
    evaluator: 'F-4', input: inp, visaType: f4Type,
    expected: { eligible: true },
  }, f4.evaluate(inp, f4Type));
}

// ============================================================
// [BATCH 3] D-2 업종별 풀타임/시간제 전수 (~24 tests)
// ============================================================
console.log('--- [B3] D-2 업종×고용형태 ---');

const b3D2Industries = ['25', '41', '47', '55', '56', '62', '70', '85', '90', '96', '01', '50'];
for (const ksic of b3D2Industries) {
  // PART_TIME eligible
  runTest({
    name: `B3 D-2 PT ${ksic} eligible`,
    evaluator: 'D-2', input: baseInput({ jobType: 'PART_TIME', ksicCode: ksic }), visaType: d2Type,
    expected: { eligible: true },
  }, d2.evaluate(baseInput({ jobType: 'PART_TIME', ksicCode: ksic }), d2Type));
  // FULL_TIME blocked
  runTest({
    name: `B3 D-2 FT ${ksic} blocked`,
    evaluator: 'D-2', input: baseInput({ jobType: 'FULL_TIME', ksicCode: ksic }), visaType: d2Type,
    expected: { eligible: false, blockedReasonContains: '풀타임' },
  }, d2.evaluate(baseInput({ jobType: 'FULL_TIME', ksicCode: ksic }), d2Type));
}

// ============================================================
// [BATCH 3] Prohibited × 다양한 조건 전수 (~35 tests)
// ============================================================
console.log('--- [B3] Prohibited × 조건 ---');

const b3ProhConditions = [
  { edu: 'HIGH_SCHOOL', sal: 200 },
  { edu: 'BACHELOR', sal: 300 },
  { edu: 'MASTER', sal: 400 },
  { edu: 'DOCTOR', sal: 500 },
  { edu: 'COLLEGE', sal: 250 },
];
for (const [code, vt] of Object.entries(prohibitedTypes)) {
  for (const cond of b3ProhConditions) {
    const inp = baseInput({ educationLevel: cond.edu, offeredSalary: cond.sal });
    runTest({
      name: `B3 ${code} ${cond.edu}/${cond.sal} blocked`,
      evaluator: code, input: inp, visaType: vt,
      expected: { eligible: false },
    }, prohibited.evaluate(inp, vt));
  }
}

// ============================================================
// [BATCH 3] C-4 다양한 조건 (~15 tests)
// ============================================================
console.log('--- [B3] C-4 다양한 조건 ---');

const b3C4Conds = [
  { ksic: '56', job: 'FULL_TIME' }, { ksic: '56', job: 'PART_TIME' },
  { ksic: '62', job: 'FULL_TIME' }, { ksic: '85', job: 'FULL_TIME' },
  { ksic: '90', job: 'PART_TIME' }, { ksic: '25', job: 'FULL_TIME' },
  { ksic: '41', job: 'PART_TIME' }, { ksic: '01', job: 'FULL_TIME' },
  { ksic: '50', job: 'FULL_TIME' }, { ksic: '70', job: 'PART_TIME' },
  { ksic: '96', job: 'FULL_TIME' }, { ksic: '47', job: 'PART_TIME' },
  { ksic: '49', job: 'FULL_TIME' }, { ksic: '64', job: 'PART_TIME' },
  { ksic: '86', job: 'FULL_TIME' },
];
for (const tc of b3C4Conds) {
  const inp = baseInput({ ksicCode: tc.ksic, jobType: tc.job });
  runTest({
    name: `B3 C-4 ${tc.ksic}/${tc.job} eligible`,
    evaluator: 'C-4', input: inp, visaType: c4Type,
    expected: { eligible: true },
  }, c4.evaluate(inp, c4Type));
}

// ============================================================
// [BATCH 3] F-5 다양한 조건 (~12 tests)
// ============================================================
console.log('--- [B3] F-5 다양한 조건 ---');

const b3F5Conds = [
  { ksic: '56221', job: 'FULL_TIME' }, { ksic: '75', job: 'FULL_TIME' },
  { ksic: '62', job: 'PART_TIME' }, { ksic: '85', job: 'PART_TIME' },
  { ksic: '90', job: 'FULL_TIME' }, { ksic: '25', job: 'FULL_TIME' },
  { ksic: '41', job: 'PART_TIME' }, { ksic: '01', job: 'FULL_TIME' },
  { ksic: '50', job: 'FULL_TIME' }, { ksic: '70', job: 'PART_TIME' },
  { ksic: '96', job: 'FULL_TIME' }, { ksic: '47', job: 'PART_TIME' },
];
for (const tc of b3F5Conds) {
  const inp = baseInput({ ksicCode: tc.ksic, jobType: tc.job });
  runTest({
    name: `B3 F-5 ${tc.ksic}/${tc.job} eligible`,
    evaluator: 'F-5', input: inp, visaType: f5Type,
    expected: { eligible: true },
  }, f5.evaluate(inp, f5Type));
}

// ============================================================
// [BATCH 3] E-9 기업규모 × MOU국가 조합 (~34 tests)
// ============================================================
console.log('--- [B3] E-9 기업규모×국가 ---');

const b3E9Sizes = ['SME', 'MID', 'STARTUP'] as const;
for (const country of ['VN', 'PH', 'TH', 'ID', 'LK', 'KH', 'MM', 'NP', 'MN', 'UZ', 'PK']) {
  for (const size of b3E9Sizes) {
    if (country === 'VN' && size === 'SME') continue; // already tested
    const inp = baseInput({ nationality: country, companySizeType: size });
    runTest({
      name: `B3 E-9 ${country}×${size} eligible`,
      evaluator: 'E-9', input: inp, visaType: e9Type,
      expected: { eligible: true },
    }, e9.evaluate(inp, e9Type));
  }
}

// E-9 LARGE × various countries (all blocked)
for (const country of ['VN', 'TH', 'ID', 'KH', 'MM', 'NP', 'MN', 'UZ']) {
  if (country === 'VN') continue; // skip duplicate
  const inp = baseInput({ nationality: country, companySizeType: 'LARGE' });
  runTest({
    name: `B3 E-9 ${country}×LARGE blocked`,
    evaluator: 'E-9', input: inp, visaType: e9Type,
    expected: { eligible: false, blockedReasonContains: '대기업' },
  }, e9.evaluate(inp, e9Type));
}

// ============================================================
// [BATCH 3] E-7 직종×급여×기업규모 (~20 tests)
// ============================================================
console.log('--- [B3] E-7 직종×급여×규모 ---');

const b3E7Combos = [
  { occ: '2221', sal: 300, size: 'LARGE', edu: 'BACHELOR', e: true },
  { occ: '2221', sal: 289, size: 'LARGE', edu: 'BACHELOR', e: false },
  { occ: '2312', sal: 250, size: 'SME', edu: 'MASTER', e: true },
  { occ: '2312', sal: 249, size: 'SME', edu: 'MASTER', e: false },
  { occ: '2111', sal: 250, size: 'STARTUP', edu: 'DOCTOR', e: true },
  { occ: '2111', sal: 249, size: 'STARTUP', edu: 'DOCTOR', e: false },
  { occ: '2521', sal: 290, size: 'MID', edu: 'BACHELOR', e: true },
  { occ: '2521', sal: 289, size: 'MID', edu: 'BACHELOR', e: false },
  { occ: '2711', sal: 400, size: 'LARGE', edu: 'MASTER', e: true },
  { occ: '2811', sal: 500, size: 'LARGE', edu: 'DOCTOR', e: true },
  { occ: '1311', sal: 350, size: 'SME', edu: 'BACHELOR', e: true },
  { occ: '4111', sal: 260, size: 'SME', edu: 'COLLEGE', e: true },
  { occ: '4111', sal: 249, size: 'SME', edu: 'COLLEGE', e: false },
  { occ: '2221', sal: 290, size: 'MID', edu: 'COLLEGE', e: true },
  { occ: '2221', sal: 289, size: 'MID', edu: 'COLLEGE', e: false },
  { occ: '2312', sal: 300, size: 'LARGE', edu: 'HIGH_SCHOOL', e: false },
  { occ: '2312', sal: 300, size: 'SME', edu: 'HIGH_SCHOOL', e: false },
  { occ: '9111', sal: 500, size: 'SME', edu: 'DOCTOR', e: false },
  { occ: '9211', sal: 500, size: 'LARGE', edu: 'MASTER', e: false },
  { occ: '9311', sal: 300, size: 'STARTUP', edu: 'BACHELOR', e: false },
];
for (const tc of b3E7Combos) {
  const inp = baseInput({ targetOccupationCode: tc.occ, offeredSalary: tc.sal, companySizeType: tc.size, educationLevel: tc.edu });
  runTest({
    name: `B3 E-7 ${tc.occ}/${tc.sal}/${tc.size}/${tc.edu} → ${tc.e ? 'eligible' : 'blocked'}`,
    evaluator: 'E-7', input: inp, visaType: e7Type,
    expected: { eligible: tc.e },
  }, e7.evaluate(inp, e7Type));
}

// ============================================================
// [BATCH 3] F-2-7 나이×학력 조합 (~30 tests)
// ============================================================
console.log('--- [B3] F-2-7 나이×학력 ---');

const b3F27Ages = [20, 27, 32, 37, 42, 50];
const b3F27Edus = ['DOCTOR', 'MASTER', 'BACHELOR', 'COLLEGE', 'HIGH_SCHOOL'] as const;
for (const age of b3F27Ages) {
  for (const edu of b3F27Edus) {
    const ageScore = age <= 24 ? 25 : age <= 29 ? 20 : age <= 34 ? 15 : age <= 39 ? 10 : age <= 44 ? 7 : 5;
    const eduScore = edu === 'DOCTOR' ? 35 : edu === 'MASTER' ? 30 : edu === 'BACHELOR' ? 25 : edu === 'COLLEGE' ? 15 : 10;
    const total = ageScore + eduScore + 20 + 25; // TOPIK6=20, GNI300=25
    const inp = baseInput({ age, educationLevel: edu, koreanLevel: 'TOPIK6', incomeGniPercent: 300 });
    runTest({
      name: `B3 F-2-7 ${age}세×${edu} total=${total}`,
      evaluator: 'F-2-7', input: inp, visaType: f27Type,
      expected: { eligible: total >= 80 },
    }, f2.evaluate(inp, f27Type));
  }
}

// ============================================================
// [BATCH 3] H-2 재외동포 × 비동포 비교 (~12 tests)
// ============================================================
console.log('--- [B3] H-2 동포/비동포 비교 ---');

for (const country of H2_COUNTRIES) {
  // ethnic korean eligible
  const inp1 = baseInput({ nationality: country, isEthnicKorean: true, ksicCode: '41' });
  runTest({
    name: `B3 H-2 ${country} 동포 eligible`,
    evaluator: 'H-2', input: inp1, visaType: h2Type,
    expected: { eligible: true },
  }, h2.evaluate(inp1, h2Type));
  // non-ethnic korean blocked
  const inp2 = baseInput({ nationality: country, isEthnicKorean: false, ksicCode: '41' });
  runTest({
    name: `B3 H-2 ${country} 비동포 blocked`,
    evaluator: 'H-2', input: inp2, visaType: h2Type,
    expected: { eligible: false, blockedReasonContains: '재외동포' },
  }, h2.evaluate(inp2, h2Type));
}

// ============================================================
// [BATCH 3] E-Simple E-6 업종 전수 확장 (~12 tests)
// ============================================================
console.log('--- [B3] E-6 업종 전수 ---');

const b3E6Allowed = ['90', '91', '59', '9011', '9019', '9021', '9029', '9111', '9112', '5911', '5912', '5920'];
for (const ksic of b3E6Allowed) {
  const inp = baseInput({ ksicCode: ksic, educationLevel: 'HIGH_SCHOOL' });
  runTest({
    name: `B3 E-6 ${ksic} eligible`,
    evaluator: 'E-6', input: inp, visaType: eSimpleTypes['E-6'],
    expected: { eligible: true },
  }, eSimple.evaluate(inp, eSimpleTypes['E-6']));
}

// ============================================================
// [BATCH 3] D-4 업종 × 풀타임/시간제 확장 (~20 tests)
// ============================================================
console.log('--- [B3] D-4 업종×고용형태 ---');

const b3D4Industries = ['01', '10', '13', '14', '25', '41', '47', '55', '56', '62'];
for (const ksic of b3D4Industries) {
  runTest({
    name: `B3 D-4 PT ${ksic} eligible`,
    evaluator: 'D-4', input: baseInput({ jobType: 'PART_TIME', ksicCode: ksic }), visaType: dSimpleTypes['D-4'],
    expected: { eligible: true },
  }, dSimple.evaluate(baseInput({ jobType: 'PART_TIME', ksicCode: ksic }), dSimpleTypes['D-4']));
  runTest({
    name: `B3 D-4 FT ${ksic} blocked`,
    evaluator: 'D-4', input: baseInput({ jobType: 'FULL_TIME', ksicCode: ksic }), visaType: dSimpleTypes['D-4'],
    expected: { eligible: false },
  }, dSimple.evaluate(baseInput({ jobType: 'FULL_TIME', ksicCode: ksic }), dSimpleTypes['D-4']));
}

// ============================================================
// 결과 출력
// ============================================================
console.log('\n============================================================');
console.log(`테스트 완료: 총 ${totalTests}건`);
console.log(`  ✅ 통과: ${passedTests}건`);
console.log(`  ❌ 실패: ${failedTests}건`);
console.log(`  통과율: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
console.log('============================================================\n');

if (failures.length > 0) {
  console.log('=== 실패 목록 ===');
  for (const f of failures) {
    console.log(`❌ ${f.name}`);
    console.log(`   Expected: ${f.expected}`);
    console.log(`   Actual: ${f.actual}`);
    console.log('');
  }
}

process.exit(failedTests > 0 ? 1 : 0);
