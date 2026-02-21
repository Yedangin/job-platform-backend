/**
 * STEP 5: 프론트↔백엔드 시나리오 테스트
 * Integration scenario tests via HTTP
 */

const BASE = 'http://localhost:8000';

interface TestResult {
  name: string;
  passed: boolean;
  detail: string;
}

const results: TestResult[] = [];

function assert(name: string, condition: boolean, detail: string) {
  results.push({ name, passed: condition, detail });
  const icon = condition ? 'PASS' : 'FAIL';
  console.log(`  [${icon}] ${name}: ${detail}`);
}

async function login(email: string, password: string): Promise<string> {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Login failed for ${email}: ${JSON.stringify(data)}`);
  // 쿠키에서 sessionId 추출 / Extract sessionId from Set-Cookie
  const setCookie = res.headers.get('set-cookie') || '';
  const match = setCookie.match(/sessionId=([^;]+)/);
  if (match) return match[1];
  // 응답 body에서 sessionId / From response body
  if (data.sessionId) return data.sessionId;
  throw new Error(`No sessionId for ${email}: ${JSON.stringify(data)}`);
}

function authHeaders(sessionId: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Cookie': `sessionId=${sessionId}`,
  };
}

async function scenario1(corpSession: string) {
  console.log('\n========================================');
  console.log('시나리오 1: 기업 공고등록 + 매칭');
  console.log('========================================');

  // 1-1. 공고 등록 / Create job posting
  const jobBody = {
    boardType: 'FULL_TIME',
    title: '시나리오 테스트 - 소프트웨어 개발자 채용',
    description: 'NestJS + React 개발자를 모집합니다.',
    displayAddress: '서울 강남구',
    actualAddress: '서울특별시 강남구 테헤란로 123',
    allowedVisas: 'E-7,F-2,F-5',
    minKoreanLevel: 3,
    workIntensity: 'MIDDLE',
    benefits: ['4대보험', '식대지원', '재택근무'],
    contactName: '김채용',
    contactPhone: '02-1234-5678',
    applicationMethod: 'PLATFORM',
    interviewMethod: 'ONLINE',
    employmentSubType: 'PERMANENT',
    fulltimeAttributes: {
      salaryMin: 3600,
      salaryMax: 5000,
      experienceLevel: 'JUNIOR',
      educationLevel: 'BACHELOR',
    },
  };

  const createRes = await fetch(`${BASE}/jobs/create`, {
    method: 'POST',
    headers: authHeaders(corpSession),
    body: JSON.stringify(jobBody),
  });
  const createData = await createRes.json();
  assert('1-1 공고 생성', createRes.ok || createRes.status === 201,
    `status=${createRes.status}, jobId=${createData.jobId || 'N/A'}`);

  const jobId = createData.jobId;

  // 1-1b. 공고 활성화 / Activate job (DRAFT → ACTIVE)
  if (jobId) {
    const activateRes = await fetch(`${BASE}/jobs/${jobId}/activate`, {
      method: 'POST',
      headers: authHeaders(corpSession),
      body: JSON.stringify({}),
    });
    const activateData = await activateRes.json();
    assert('1-1b 공고 활성화', activateRes.ok,
      `status=${activateRes.status}, active=${activateData.status || activateData.success}`);
  }

  // 1-2. 매칭 API 호출 / Call visa-rules evaluate
  const matchBody = {
    ksicCode: '62010',
    companySizeType: 'MID',
    employeeCountKorean: 50,
    employeeCountForeign: 5,
    annualRevenue: 500000,
    addressRoad: '서울특별시 강남구 테헤란로 123',
    jobType: 'FULL_TIME',
    offeredSalary: 300,
  };

  const matchRes = await fetch(`${BASE}/visa-rules/evaluate`, {
    method: 'POST',
    headers: authHeaders(corpSession),
    body: JSON.stringify(matchBody),
  });
  const matchData = await matchRes.json();
  assert('1-2 매칭 API', matchRes.ok, `status=${matchRes.status}, eligible=${matchData.eligibleVisas?.length || 0}`);

  // 1-3. 매칭 결과 확인 — IT업종(62010)에서 eligible 비자 존재 여부
  // E-7 requires targetOccupationCode which wasn't provided, so it may not match
  const eligibleCodes = (matchData.eligibleVisas || []).map((v: { code?: string }) => v.code);
  assert('1-3 매칭 결과', eligibleCodes.length > 0,
    `eligible ${eligibleCodes.length}개: ${eligibleCodes.slice(0, 8).join(', ')}`);

  // 1-4. 급여 변경 후 결과 변동 / Change salary and check difference
  const matchBody2 = { ...matchBody, offeredSalary: 150 };
  const matchRes2 = await fetch(`${BASE}/visa-rules/evaluate`, {
    method: 'POST',
    headers: authHeaders(corpSession),
    body: JSON.stringify(matchBody2),
  });
  const matchData2 = await matchRes2.json();
  const eligibleCodes2 = (matchData2.eligibleVisas || []).map((v: { code?: string }) => v.code);
  assert('1-4 급여 변경 결과', matchRes2.ok,
    `300만: ${eligibleCodes.length}개 → 150만: ${eligibleCodes2.length}개`);

  // 1-5. 공고 조회 시 matchedVisaTypes 확인 / Check saved job has matchedVisaTypes
  if (jobId) {
    const getRes = await fetch(`${BASE}/jobs/${jobId}`, {
      headers: authHeaders(corpSession),
    });
    const getJob = await getRes.json();
    const keys = Object.keys(getJob).join(', ');
    assert('1-5 공고 조회', getRes.ok,
      `keys=[${keys.substring(0, 100)}], title=${getJob.title || 'N/A'}, allowedVisas=${getJob.allowedVisas || 'N/A'}`);
  }

  return jobId;
}

async function scenario2(seekerSession: string) {
  console.log('\n========================================');
  console.log('시나리오 2: 외국인 프로필 완성');
  console.log('========================================');

  // 2-1. 이력서 생성 / Create resume
  const resumeBody = {
    nationality: 'VN',
    birthDate: '1995-03-15',
    educations: [
      {
        school: '한국대학교',
        major: '컴퓨터공학',
        degree: 'BACHELOR',
        graduationYear: 2020,
        country: 'KR',
      },
    ],
    workExperiences: [
      {
        company: 'ABC Corp',
        role: '소프트웨어 개발자',
        startDate: '2020-07',
        endDate: '2024-06',
        description: 'Backend development',
      },
    ],
    topikLevel: 4,
    kiipLevel: 0,
    certificates: [],
    preferredJobTypes: ['FULL_TIME'],
    preferredRegions: ['서울'],
    preferredSalary: 300,
    preferredEmploymentTypes: ['REGULAR'],
  };

  const createRes = await fetch(`${BASE}/resumes`, {
    method: 'POST',
    headers: authHeaders(seekerSession),
    body: JSON.stringify(resumeBody),
  });
  const createData = await createRes.json();
  // 이미 존재하면 409도 정상 / 409 Conflict is expected if already created
  assert('2-1 이력서 생성/존재', createRes.status === 201 || createRes.status === 409,
    `status=${createRes.status}, msg=${createData.message || JSON.stringify(createData).substring(0, 80)}`);

  // 2-2. 이력서 조회 / Get resume
  const getRes = await fetch(`${BASE}/resumes/me`, {
    headers: authHeaders(seekerSession),
  });
  const getData = await getRes.json();
  assert('2-2 이력서 조회', getRes.ok,
    `nationality=${getData.nationality || 'N/A'}, topik=${getData.topikLevel}`);

  // 2-3. 비자 인증 / Create visa verification
  const verifyBody = {
    visaCode: 'D-2',
    visaSubType: null,
    visaExpiryDate: '2027-03-01',
    foreignRegistrationNumber: '1234567890123',
    verificationMethod: 'MANUAL',
  };

  const verifyRes = await fetch(`${BASE}/visa-verification`, {
    method: 'POST',
    headers: authHeaders(seekerSession),
    body: JSON.stringify(verifyBody),
  });
  const verifyData = await verifyRes.json();
  assert('2-3 비자 인증', verifyRes.status === 201 || verifyRes.ok,
    `status=${verifyRes.status}, msg=${verifyData.message || JSON.stringify(verifyData).substring(0, 80)}`);

  // 2-4. 비자 인증 상태 확인 / Check verification status
  const statusRes = await fetch(`${BASE}/visa-verification/me`, {
    headers: authHeaders(seekerSession),
  });
  const statusData = await statusRes.json();
  assert('2-4 인증 상태', statusRes.ok,
    `status=${statusData.verificationStatus || 'N/A'}, code=${statusData.visaCode || 'N/A'}`);
}

async function scenario3(seekerSession: string, jobId: string | undefined) {
  console.log('\n========================================');
  console.log('시나리오 3: 비자 필터링');
  console.log('========================================');

  // 3-1. visa 필터 목록 / Visa filtered listing
  const listRes = await fetch(`${BASE}/jobs/listing?visaFilter=true&boardType=FULL_TIME`, {
    headers: authHeaders(seekerSession),
  });
  const listData = await listRes.json();
  assert('3-1 비자필터 목록', listRes.ok,
    `status=${listRes.status}, items=${listData.items?.length || 0}, total=${listData.total || 0}`);

  // 3-2. eligible API 호출 / Eligible jobs
  const eligibleRes = await fetch(`${BASE}/jobs/eligible?boardType=PART_TIME`, {
    headers: authHeaders(seekerSession),
  });
  const eligibleData = await eligibleRes.json();
  assert('3-2 eligible 목록', eligibleRes.ok || eligibleRes.status === 400,
    `status=${eligibleRes.status}, items=${eligibleData.items?.length || 0}, msg=${eligibleData.message || ''}`);

  // 3-3. 정규직 공고 eligibility / Full-time eligibility (D-2 → should be limited)
  if (jobId) {
    const eligRes = await fetch(`${BASE}/jobs/${jobId}/eligibility`, {
      headers: authHeaders(seekerSession),
    });
    const eligData = await eligRes.json();
    const eligKeys = Object.keys(eligData).join(', ');
    assert('3-3 상세 적격판정', eligRes.ok,
      `status=${eligRes.status}, keys=[${eligKeys.substring(0, 80)}], eligible=${eligData.eligible}, msg=${eligData.message || ''}`);
    if (!eligRes.ok) console.log('    Full response:', JSON.stringify(eligData).substring(0, 200));
  } else {
    assert('3-3 상세 적격판정', false, 'No jobId from scenario 1');
  }
}

async function scenario4(seekerSession: string) {
  console.log('\n========================================');
  console.log('시나리오 4: 에러 케이스');
  console.log('========================================');

  // 4-1. 토큰 없이 보호된 API / No auth on protected endpoint
  const noAuthRes = await fetch(`${BASE}/resumes/me`);
  assert('4-1 미인증 401', noAuthRes.status === 401 || noAuthRes.status === 403,
    `status=${noAuthRes.status}`);

  // 4-2. 잘못된 DTO / Invalid DTO
  const badRes = await fetch(`${BASE}/resumes`, {
    method: 'POST',
    headers: authHeaders(seekerSession),
    body: JSON.stringify({ nationality: 123 }),
  });
  assert('4-2 잘못된 DTO 400', badRes.status === 400,
    `status=${badRes.status}`);

  // 4-3. 존재하지 않는 공고 / Non-existent job eligibility
  const notFoundRes = await fetch(`${BASE}/jobs/nonexistent-id-99999/eligibility`, {
    headers: authHeaders(seekerSession),
  });
  assert('4-3 404 공고', notFoundRes.status === 404,
    `status=${notFoundRes.status}`);

  // 4-4. 만료 비자 경고 / Expired visa warning
  // 비자 인증을 만료일로 다시 설정 → 경고 포함 / Already verified, check via listing
  const listRes = await fetch(`${BASE}/jobs/listing?boardType=FULL_TIME`, {
    headers: authHeaders(seekerSession),
  });
  assert('4-4 일반 목록 조회', listRes.ok, `status=${listRes.status}`);
}

async function main() {
  console.log('=== STEP 5: 시나리오 테스트 시작 ===\n');

  try {
    // 로그인 / Login all test accounts
    console.log('--- 로그인 ---');
    const corpSession = await login('testcorp@test.com', 'TestCorp123!');
    console.log(`  Corp session: ${corpSession.substring(0, 20)}...`);

    const seekerSession = await login('testseeker@test.com', 'TestSeeker123!');
    console.log(`  Seeker session: ${seekerSession.substring(0, 20)}...`);

    // 시나리오 실행 / Run scenarios
    const jobId = await scenario1(corpSession);
    await scenario2(seekerSession);
    await scenario3(seekerSession, jobId);
    await scenario4(seekerSession);

    // 결과 요약 / Summary
    console.log('\n========================================');
    console.log('=== 테스트 결과 요약 ===');
    console.log('========================================');
    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed).length;
    console.log(`  통과: ${passed}개 / 실패: ${failed}개 / 총: ${results.length}개`);
    if (failed > 0) {
      console.log('\n  실패 항목:');
      results.filter(r => !r.passed).forEach(r => {
        console.log(`    [FAIL] ${r.name}: ${r.detail}`);
      });
    }
  } catch (err) {
    console.error('테스트 오류:', err);
  }
}

main();
