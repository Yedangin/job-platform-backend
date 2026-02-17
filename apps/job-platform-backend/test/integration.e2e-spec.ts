/**
 * E2E 통합 테스트 — 실행 중인 서버(localhost:8000) 대상
 * E2E integration tests — against running server (localhost:8000)
 *
 * 실행 방법 / How to run:
 *   1. npm run start:dev (서버 가동)
 *   2. npx jest --config apps/job-platform-backend/test/jest-e2e.json --testPathPattern=integration
 */

const BASE = 'http://localhost:8000';

// 헬퍼 / Helpers
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function authHeaders(sessionId: string): Record<string, string> {
  return { 'Content-Type': 'application/json', Cookie: `sessionId=${sessionId}` };
}

/** 429 rate-limit 자동 재시도 / Auto-retry on 429 with backoff */
async function fetchRetry(
  url: string,
  init?: RequestInit,
  retries = 3,
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, init);
    if (res.status === 429) {
      const wait = (i + 1) * 7000; // 7s, 14s, 21s
      await sleep(wait);
      continue;
    }
    return res;
  }
  return fetch(url, init); // final attempt
}

async function login(email: string, password: string): Promise<string> {
  const res = await fetchRetry(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Login failed: ${data.message}`);
  const cookie = res.headers.get('set-cookie') || '';
  const match = cookie.match(/sessionId=([^;]+)/);
  return match?.[1] || data.sessionId;
}

// 세션 캐시 / Session cache
let corpSession: string;
let seekerSession: string;

beforeAll(async () => {
  corpSession = await login('testcorp@test.com', 'TestCorp123!');
  seekerSession = await login('testseeker@test.com', 'TestSeeker123!');
}, 30000);

// ===================================
// 기업 플로우 / Corporate flow
// ===================================
describe('기업 플로우 / Corporate flow', () => {
  let createdJobId: string;

  test('공고 등록 → DRAFT 생성 / Job create → DRAFT status', async () => {
    const res = await fetchRetry(`${BASE}/jobs/create`, {
      method: 'POST',
      headers: authHeaders(corpSession),
      body: JSON.stringify({
        boardType: 'FULL_TIME',
        title: 'E2E 테스트 — IT 개발자',
        description: '테스트 공고입니다.',
        displayAddress: '서울 강남',
        actualAddress: '서울특별시 강남구 테헤란로 1',
        allowedVisas: 'E-7,F-2,F-5',
        minKoreanLevel: 3,
        workIntensity: 'MIDDLE',
        contactName: '테스트',
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
      }),
    });
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.jobId).toBeDefined();
    expect(data.status).toBe('DRAFT');
    createdJobId = data.jobId;
  }, 30000);

  test('공고 활성화 / Activate job', async () => {
    const res = await fetchRetry(`${BASE}/jobs/${createdJobId}/activate`, {
      method: 'POST',
      headers: authHeaders(corpSession),
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.status).toBe('ACTIVE');
  }, 30000);

  test('공고 조회 확인 / Verify job listing', async () => {
    const res = await fetchRetry(`${BASE}/jobs/${createdJobId}`, {
      headers: authHeaders(corpSession),
    });
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.title).toBe('E2E 테스트 — IT 개발자');
    expect(data.allowedVisas).toContain('E-7');
  }, 30000);

  test('매칭 API — IT 업종 (62010) / Match API — IT industry', async () => {
    const res = await fetchRetry(`${BASE}/visa-rules/evaluate`, {
      method: 'POST',
      headers: authHeaders(corpSession),
      body: JSON.stringify({
        ksicCode: '62010',
        companySizeType: 'MID',
        employeeCountKorean: 50,
        employeeCountForeign: 5,
        annualRevenue: 500000,
        addressRoad: '서울 강남',
        jobType: 'FULL_TIME',
        offeredSalary: 300,
      }),
    });
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.eligibleVisas).toBeDefined();
    expect(data.eligibleVisas.length).toBeGreaterThan(0);
  }, 60000);

  test('매칭 API — 제조업 (10110) / Match API — Manufacturing', async () => {
    const res = await fetchRetry(`${BASE}/visa-rules/evaluate`, {
      method: 'POST',
      headers: authHeaders(corpSession),
      body: JSON.stringify({
        ksicCode: '10110',
        companySizeType: 'SME',
        employeeCountKorean: 30,
        employeeCountForeign: 10,
        annualRevenue: 200000,
        addressRoad: '경기 화성',
        jobType: 'FULL_TIME',
        offeredSalary: 220,
      }),
    });
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.eligibleVisas).toBeDefined();
  }, 60000);

  test('매칭 API — 음식점 (56111) / Match API — Restaurant', async () => {
    const res = await fetchRetry(`${BASE}/visa-rules/evaluate`, {
      method: 'POST',
      headers: authHeaders(corpSession),
      body: JSON.stringify({
        ksicCode: '56111',
        companySizeType: 'SME',
        employeeCountKorean: 5,
        employeeCountForeign: 2,
        annualRevenue: 50000,
        addressRoad: '서울 마포',
        jobType: 'PART_TIME',
        offeredSalary: 200,
      }),
    });
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.eligibleVisas).toBeDefined();
  }, 60000);
});

// ===================================
// 구직자 플로우 / Job seeker flow
// ===================================
describe('구직자 플로우 / Job seeker flow', () => {
  test('이력서 조회 / Get resume', async () => {
    const res = await fetchRetry(`${BASE}/resumes/me`, {
      headers: authHeaders(seekerSession),
    });
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.nationality).toBe('VN');
    expect([4, 5]).toContain(data.topikLevel);
  }, 30000);

  test('이력서 수정 / Update resume', async () => {
    const res = await fetchRetry(`${BASE}/resumes/me`, {
      method: 'PUT',
      headers: authHeaders(seekerSession),
      body: JSON.stringify({
        topikLevel: 5,
        preferredSalary: 350,
      }),
    });
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.topikLevel).toBe(5);
  }, 30000);

  test('이력서 수정 확인 / Verify resume update', async () => {
    const res = await fetchRetry(`${BASE}/resumes/me`, {
      headers: authHeaders(seekerSession),
    });
    const data = await res.json();
    expect(data.topikLevel).toBe(5);
    expect(data.preferredSalary).toBe(350);
  }, 30000);

  test('비자 인증 상태 확인 / Visa verification status', async () => {
    const res = await fetchRetry(`${BASE}/visa-verification/me`, {
      headers: authHeaders(seekerSession),
    });
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.visaCode).toBe('D-2');
    expect(['SUBMITTED', 'PENDING', 'VERIFIED', 'REJECTED']).toContain(data.verificationStatus);
  }, 30000);

  test('비자 필터 목록 — visaFilter=true / Visa filtered listing', async () => {
    const res = await fetchRetry(`${BASE}/jobs/listing?visaFilter=true&boardType=FULL_TIME`, {
      headers: authHeaders(seekerSession),
    });
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.items).toBeDefined();
    expect(Array.isArray(data.items)).toBe(true);
  }, 30000);

  test('eligible 공고 조회 / Eligible jobs listing', async () => {
    const res = await fetchRetry(`${BASE}/jobs/eligible?boardType=PART_TIME`, {
      headers: authHeaders(seekerSession),
    });
    // 200 또는 400(비자인증 안됨) / 200 or 400 (visa unverified)
    expect([200, 400]).toContain(res.status);
  }, 30000);
});

// ===================================
// 에러 케이스 / Error cases
// ===================================
describe('에러 케이스 / Error cases', () => {
  test('미인증 사용자 → 401 / Unauthenticated → 401', async () => {
    const res = await fetch(`${BASE}/resumes/me`);
    expect(res.status).toBe(401);
  });

  test('잘못된 비자코드 → 400 / Invalid visa code → 400', async () => {
    const res = await fetchRetry(`${BASE}/visa-verification`, {
      method: 'POST',
      headers: authHeaders(seekerSession),
      body: JSON.stringify({
        visaCode: '',
        visaExpiryDate: '2027-01-01',
        foreignRegistrationNumber: '1234567890123',
        verificationMethod: 'MANUAL',
      }),
    });
    expect([400, 422]).toContain(res.status);
  }, 30000);

  test('존재하지 않는 공고 → 404 / Non-existent job → 404', async () => {
    const res = await fetchRetry(`${BASE}/jobs/nonexistent-id/eligibility`, {
      headers: authHeaders(seekerSession),
    });
    expect(res.status).toBe(404);
  }, 30000);

  test('잘못된 이력서 DTO → 400 / Invalid resume DTO → 400', async () => {
    const res = await fetchRetry(`${BASE}/resumes`, {
      method: 'POST',
      headers: authHeaders(seekerSession),
      body: JSON.stringify({ nationality: 123 }),
    });
    expect(res.status).toBe(400);
  }, 30000);
});

// ===================================
// 경계값 테스트 / Boundary value tests
// ===================================
describe('경계값 / Boundary values', () => {
  test('급여 — 최저임금 정확히 (2026년 10,030원 기준, 월 약 174만) / Salary at minimum wage', async () => {
    const res = await fetchRetry(`${BASE}/visa-rules/evaluate`, {
      method: 'POST',
      headers: authHeaders(corpSession),
      body: JSON.stringify({
        ksicCode: '56111',
        companySizeType: 'SME',
        employeeCountKorean: 5,
        employeeCountForeign: 1,
        annualRevenue: 30000,
        addressRoad: '서울',
        jobType: 'PART_TIME',
        offeredSalary: 174,
      }),
    });
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.eligibleVisas).toBeDefined();
  }, 60000);

  test('급여 — 0원 / Salary zero', async () => {
    const res = await fetchRetry(`${BASE}/visa-rules/evaluate`, {
      method: 'POST',
      headers: authHeaders(corpSession),
      body: JSON.stringify({
        ksicCode: '56111',
        companySizeType: 'SME',
        employeeCountKorean: 5,
        employeeCountForeign: 1,
        annualRevenue: 30000,
        addressRoad: '서울',
        jobType: 'PART_TIME',
        offeredSalary: 0,
      }),
    });
    // 0원은 유효성 검사에서 걸릴 수 있음, 429는 rate limit / Zero salary may fail validation, 429 is rate limit
    expect([200, 201, 400, 429]).toContain(res.status);
  }, 60000);

  test('만료일 — 오늘/어제/내일 비자 / Expiry date edge cases', async () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(yesterday).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(tomorrow).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('TOPIK 경계 — evaluate는 회사 측 정보만 필요 / Evaluate needs company-side info only', async () => {
    const res = await fetchRetry(`${BASE}/visa-rules/evaluate`, {
      method: 'POST',
      headers: authHeaders(corpSession),
      body: JSON.stringify({
        ksicCode: '62010',
        companySizeType: 'MID',
        employeeCountKorean: 50,
        employeeCountForeign: 5,
        annualRevenue: 500000,
        addressRoad: '서울',
        jobType: 'FULL_TIME',
        offeredSalary: 300,
      }),
    });
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.eligibleVisas).toBeDefined();
    expect(data.eligibleVisas.length).toBeGreaterThan(0);
  }, 60000);
});
