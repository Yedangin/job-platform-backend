/**
 * 기업 계정 + 로고 + 공고 시드 / Seed companies with logos and job postings
 * Usage: npx tsx prisma/user/seed-companies.ts
 */
import { PrismaClient } from '../../generated/prisma-user';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface CompanyDef {
  email: string;
  companyNameOfficial: string;
  brandName: string;
  logoImageUrl: string;
  bizRegNumber: string;
  addressRoad: string;
  companySizeType: 'SME' | 'MID' | 'LARGE' | 'STARTUP';
}

interface JobDef {
  companyEmail: string;
  boardType: 'PART_TIME' | 'FULL_TIME';
  tierType: 'STANDARD' | 'PREMIUM';
  title: string;
  description: string;
  allowedVisas: string;
  minKoreanLevel: number;
  displayAddress: string;
  actualAddress: string;
  workIntensity: 'UPPER' | 'MIDDLE' | 'LOWER';
  contactName: string;
  contactPhone: string;
  closingDate: Date | null;
  alba?: { hourlyWage: number; workDaysMask: string; workTimeStart: string; workTimeEnd: string };
  fulltime?: { salaryMin: number; salaryMax: number; experienceLevel: string; educationLevel: string };
  isPremium?: boolean;
}

/* ── 기업 정의 (13개) / Company definitions ── */
const COMPANIES: CompanyDef[] = [
  // 프리미엄 5개 / Premium 5
  { email: 'hr@samsung-seed.com', companyNameOfficial: '삼성전자 주식회사', brandName: '삼성전자', logoImageUrl: '/images/logos/samsung.svg', bizRegNumber: '1248100998', addressRoad: '경기도 화성시 삼성전자로 1', companySizeType: 'LARGE' },
  { email: 'hr@hyundai-enc-seed.com', companyNameOfficial: '현대건설 주식회사', brandName: '현대건설', logoImageUrl: '/images/logos/hyundai-enc.svg', bizRegNumber: '1018113819', addressRoad: '서울특별시 종로구 율곡로 75', companySizeType: 'LARGE' },
  { email: 'hr@shilla-seed.com', companyNameOfficial: '호텔신라 주식회사', brandName: '신라호텔', logoImageUrl: '/images/logos/shilla.svg', bizRegNumber: '2028138844', addressRoad: '서울특별시 중구 동호로 249', companySizeType: 'LARGE' },
  { email: 'hr@cj-logistics-seed.com', companyNameOfficial: 'CJ대한통운 주식회사', brandName: 'CJ대한통운', logoImageUrl: '/images/logos/cj-logistics.svg', bizRegNumber: '1108636478', addressRoad: '서울특별시 중구 세종대로 39', companySizeType: 'LARGE' },
  { email: 'hr@mobis-seed.com', companyNameOfficial: '현대모비스 주식회사', brandName: '현대모비스', logoImageUrl: '/images/logos/mobis.svg', bizRegNumber: '1328700101', addressRoad: '서울특별시 강남구 테헤란로 33', companySizeType: 'LARGE' },
  // 실시간 8개 / Realtime 8
  { email: 'hr@sk-hynix-seed.com', companyNameOfficial: 'SK하이닉스 주식회사', brandName: 'SK하이닉스', logoImageUrl: '/images/logos/sk-hynix.svg', bizRegNumber: '2288112233', addressRoad: '경기도 이천시 부발읍 경충대로 2091', companySizeType: 'LARGE' },
  { email: 'hr@hyundai-motor-seed.com', companyNameOfficial: '현대자동차 주식회사', brandName: '현대자동차', logoImageUrl: '/images/logos/hyundai-motor.svg', bizRegNumber: '1018100516', addressRoad: '서울특별시 서초구 헌릉로 12', companySizeType: 'LARGE' },
  { email: 'hr@coupang-seed.com', companyNameOfficial: '쿠팡로지스틱스서비스유한회사', brandName: '쿠팡로지스틱스', logoImageUrl: '/images/logos/coupang.svg', bizRegNumber: '2208820033', addressRoad: '서울특별시 송파구 송파대로 570', companySizeType: 'LARGE' },
  { email: 'hr@daewoo-seed.com', companyNameOfficial: '대우건설 주식회사', brandName: '대우건설', logoImageUrl: '/images/logos/daewoo.svg', bizRegNumber: '1038136429', addressRoad: '서울특별시 중구 을지로 170', companySizeType: 'LARGE' },
  { email: 'hr@hyatt-seed.com', companyNameOfficial: '그랜드하얏트서울', brandName: '그랜드 하얏트', logoImageUrl: '/images/logos/hyatt.svg', bizRegNumber: '2118111122', addressRoad: '서울특별시 용산구 소월로 322', companySizeType: 'MID' },
  { email: 'hr@cj-food-seed.com', companyNameOfficial: 'CJ제일제당 주식회사', brandName: 'CJ제일제당', logoImageUrl: '/images/logos/cj-cheiljedang.svg', bizRegNumber: '1108127282', addressRoad: '서울특별시 중구 동호로 330', companySizeType: 'LARGE' },
  { email: 'hr@kia-seed.com', companyNameOfficial: '기아 주식회사', brandName: '기아자동차', logoImageUrl: '/images/logos/kia.svg', bizRegNumber: '1028100720', addressRoad: '서울특별시 서초구 헌릉로 12', companySizeType: 'LARGE' },
  { email: 'hr@lotte-seed.com', companyNameOfficial: '롯데글로벌로지스 주식회사', brandName: '롯데글로벌로지스', logoImageUrl: '/images/logos/lotte.svg', bizRegNumber: '1068529403', addressRoad: '서울특별시 중구 소월로2길 30', companySizeType: 'LARGE' },
];

const DAY = 86_400_000;
const future = (d: number) => new Date(Date.now() + d * DAY);

/* ── 공고 정의 (26개: 13기업 × 알바+정규직) / Job definitions: 13 companies × alba + fulltime ── */
const JOBS: JobDef[] = [
  // ═══════════════════════════════════════
  // PREMIUM 5개 기업 (각 알바+정규직 = 10건)
  // ═══════════════════════════════════════

  // 삼성전자 — 알바 (PREMIUM)
  { companyEmail: 'hr@samsung-seed.com', boardType: 'PART_TIME', tierType: 'PREMIUM', title: '반도체 생산라인 오퍼레이터 (기숙사 제공)', description: '삼성전자 평택캠퍼스 반도체 생산라인에서 오퍼레이터를 모집합니다.\n\n[주요 업무]\n- 반도체 생산장비 모니터링 및 운영\n- 웨이퍼 로딩/언로딩 작업\n- 설비 이상 시 초기 대응\n\n[근무 조건]\n- 3조 2교대 (주/야 교대)\n- 기숙사 무료 제공\n- 식사 제공 (3식)\n- 통근버스 운행', allowedVisas: 'E-9,H-2,F-4,F-2', minKoreanLevel: 2, displayAddress: '경기 평택시', actualAddress: '경기도 평택시 진위면 삼성전자로 1', workIntensity: 'UPPER', contactName: '삼성전자 채용팀', contactPhone: '031-200-1234', closingDate: future(14), alba: { hourlyWage: 14000, workDaysMask: '1111100', workTimeStart: '08:00', workTimeEnd: '20:00' }, isPremium: true },
  // 삼성전자 — 정규직
  { companyEmail: 'hr@samsung-seed.com', boardType: 'FULL_TIME', tierType: 'STANDARD', title: '반도체 설비 엔지니어 (신입/경력)', description: '삼성전자 반도체 설비 엔지니어를 모집합니다.\n\n[주요 업무]\n- 반도체 제조 설비 유지보수\n- 설비 개선 및 최적화\n- 공정 데이터 분석\n\n[자격요건]\n- 전기/전자/기계공학 전공\n- 설비 보전 경력 우대\n- 교대 근무 가능자', allowedVisas: 'E-7,F-2,F-5,F-6', minKoreanLevel: 3, displayAddress: '경기 평택시', actualAddress: '경기도 평택시 진위면 삼성전자로 1', workIntensity: 'UPPER', contactName: '삼성전자 채용팀', contactPhone: '031-200-1234', closingDate: future(21), fulltime: { salaryMin: 35000000, salaryMax: 50000000, experienceLevel: 'JUNIOR', educationLevel: 'BACHELOR' } },

  // 현대건설 — 정규직 (PREMIUM)
  { companyEmail: 'hr@hyundai-enc-seed.com', boardType: 'FULL_TIME', tierType: 'PREMIUM', title: '건설 현장 안전관리자 (경험자 우대)', description: '현대건설 강남 현장에서 안전관리자를 모집합니다.\n\n[주요 업무]\n- 건설현장 안전관리 및 점검\n- 안전교육 실시 및 기록 관리\n- 사고 예방 활동 계획 수립\n\n[자격요건]\n- 건설안전기사 또는 산업안전기사 보유자\n- 건설현장 안전관리 경력 3년 이상\n- 한국어 능통자 (TOPIK 4급 이상)', allowedVisas: 'E-7,F-2,F-5,F-6', minKoreanLevel: 4, displayAddress: '서울 강남구', actualAddress: '서울특별시 강남구 테헤란로 127', workIntensity: 'UPPER', contactName: '현대건설 인사팀', contactPhone: '02-746-1234', closingDate: future(3), fulltime: { salaryMin: 30000000, salaryMax: 40000000, experienceLevel: 'MID', educationLevel: 'BACHELOR' }, isPremium: true },
  // 현대건설 — 알바
  { companyEmail: 'hr@hyundai-enc-seed.com', boardType: 'PART_TIME', tierType: 'STANDARD', title: '건설현장 일용 보조인력 모집', description: '현대건설 송도 현장에서 보조인력을 모집합니다.\n\n[주요 업무]\n- 자재 운반 보조\n- 현장 청소 및 정리\n- 안전시설 설치 보조\n\n[근무 조건]\n- 일당제 (일 8시간)\n- 중식 제공\n- 안전장비 지급', allowedVisas: 'E-9,H-2', minKoreanLevel: 1, displayAddress: '인천 연수구', actualAddress: '인천광역시 연수구 송도동', workIntensity: 'UPPER', contactName: '현대건설 현장', contactPhone: '032-850-1234', closingDate: future(7), alba: { hourlyWage: 13500, workDaysMask: '1111100', workTimeStart: '07:00', workTimeEnd: '16:00' } },

  // 신라호텔 — 알바 (PREMIUM)
  { companyEmail: 'hr@shilla-seed.com', boardType: 'PART_TIME', tierType: 'PREMIUM', title: '호텔 주방 스태프 (식사 제공)', description: '신라호텔 메인 주방에서 조리 보조 스태프를 모집합니다.\n\n[주요 업무]\n- 식재료 전처리 및 조리 보조\n- 주방 청결 관리\n- 연회 준비 보조\n\n[근무 조건]\n- 주 5일 근무 (교대제)\n- 직원식 무료 제공\n- 유니폼 지급', allowedVisas: 'E-9,H-2,F-4', minKoreanLevel: 2, displayAddress: '서울 중구', actualAddress: '서울특별시 중구 동호로 249', workIntensity: 'UPPER', contactName: '신라호텔 인사팀', contactPhone: '02-2230-3310', closingDate: future(30), alba: { hourlyWage: 12000, workDaysMask: '1111100', workTimeStart: '07:00', workTimeEnd: '16:00' }, isPremium: true },
  // 신라호텔 — 정규직
  { companyEmail: 'hr@shilla-seed.com', boardType: 'FULL_TIME', tierType: 'STANDARD', title: '호텔 프론트데스크 매니저', description: '신라호텔에서 프론트데스크 매니저를 모집합니다.\n\n[주요 업무]\n- 고객 체크인/체크아웃 관리\n- VIP 고객 응대\n- 프론트 직원 교육 및 관리\n\n[자격요건]\n- 호텔 프론트 경력 3년 이상\n- 영어 능통, 일본어/중국어 우대\n- TOPIK 5급 이상', allowedVisas: 'E-7,F-2,F-5,F-6', minKoreanLevel: 5, displayAddress: '서울 중구', actualAddress: '서울특별시 중구 동호로 249', workIntensity: 'MIDDLE', contactName: '신라호텔 인사팀', contactPhone: '02-2230-3310', closingDate: future(15), fulltime: { salaryMin: 32000000, salaryMax: 42000000, experienceLevel: 'MID', educationLevel: 'BACHELOR' } },

  // CJ대한통운 — 알바 (PREMIUM)
  { companyEmail: 'hr@cj-logistics-seed.com', boardType: 'PART_TIME', tierType: 'PREMIUM', title: '물류센터 포장/분류 직원', description: 'CJ대한통운 인천 물류센터에서 포장/분류 직원을 모집합니다.\n\n[주요 업무]\n- 택배 상품 분류 및 포장\n- 바코드 스캔 및 적재\n- 물류 라인 정리\n\n[근무 조건]\n- 주 5일 근무\n- 중식 제공\n- 통근버스 운행\n- 장기 근무 시 수당 인상', allowedVisas: 'E-9,H-2', minKoreanLevel: 1, displayAddress: '인천 남동구', actualAddress: '인천광역시 남동구 남동서로 206', workIntensity: 'UPPER', contactName: 'CJ대한통운 채용', contactPhone: '032-820-5678', closingDate: null, alba: { hourlyWage: 13000, workDaysMask: '1111100', workTimeStart: '09:00', workTimeEnd: '18:00' }, isPremium: true },
  // CJ대한통운 — 정규직
  { companyEmail: 'hr@cj-logistics-seed.com', boardType: 'FULL_TIME', tierType: 'STANDARD', title: '물류 운영 관리자 (경력직)', description: 'CJ대한통운에서 물류 운영 관리자를 모집합니다.\n\n[주요 업무]\n- 물류센터 전체 운영 관리\n- 인력 배치 및 스케줄 관리\n- KPI 관리 및 개선활동\n\n[자격요건]\n- 물류 운영 경력 2년 이상\n- WMS 시스템 활용 가능자\n- 리더십 있는 분', allowedVisas: 'E-7,F-2,F-4,F-5', minKoreanLevel: 3, displayAddress: '인천 남동구', actualAddress: '인천광역시 남동구 남동서로 206', workIntensity: 'MIDDLE', contactName: 'CJ대한통운 채용', contactPhone: '032-820-5678', closingDate: future(18), fulltime: { salaryMin: 28000000, salaryMax: 36000000, experienceLevel: 'JUNIOR', educationLevel: 'HIGH_SCHOOL' } },

  // 현대모비스 — 정규직 (PREMIUM)
  { companyEmail: 'hr@mobis-seed.com', boardType: 'FULL_TIME', tierType: 'PREMIUM', title: '자동차 부품 품질검사원', description: '현대모비스 울산공장에서 품질검사원을 모집합니다.\n\n[주요 업무]\n- 자동차 부품 품질 검사 및 측정\n- 불량 분석 및 개선활동\n- 품질 데이터 관리\n\n[자격요건]\n- 품질관리 또는 자동차 관련 경력 2년 이상\n- 측정기 사용 가능자\n- 교대 근무 가능자', allowedVisas: 'E-9,H-2,F-2', minKoreanLevel: 3, displayAddress: '울산 북구', actualAddress: '울산광역시 북구 양정동 현대모비스', workIntensity: 'MIDDLE', contactName: '현대모비스 채용', contactPhone: '052-280-9876', closingDate: future(7), fulltime: { salaryMin: 28000000, salaryMax: 35000000, experienceLevel: 'JUNIOR', educationLevel: 'HIGH_SCHOOL' }, isPremium: true },
  // 현대모비스 — 알바
  { companyEmail: 'hr@mobis-seed.com', boardType: 'PART_TIME', tierType: 'STANDARD', title: '부품 조립 보조 (단기 알바)', description: '현대모비스 울산공장에서 부품 조립 보조를 모집합니다.\n\n[주요 업무]\n- 소형 부품 조립 보조\n- 포장 및 출하 준비\n- 라인 청소 및 정리\n\n[근무 조건]\n- 단기 가능 (1개월~)\n- 중식 제공\n- 통근버스 운행', allowedVisas: 'E-9,H-2,F-4', minKoreanLevel: 1, displayAddress: '울산 북구', actualAddress: '울산광역시 북구 양정동 현대모비스', workIntensity: 'MIDDLE', contactName: '현대모비스 채용', contactPhone: '052-280-9876', closingDate: future(14), alba: { hourlyWage: 11500, workDaysMask: '1111100', workTimeStart: '08:00', workTimeEnd: '17:00' } },

  // ═══════════════════════════════════════
  // STANDARD 8개 기업 (각 알바+정규직 = 16건)
  // ═══════════════════════════════════════

  // SK하이닉스 — 알바
  { companyEmail: 'hr@sk-hynix-seed.com', boardType: 'PART_TIME', tierType: 'STANDARD', title: '반도체 검사원 (야간 수당 포함)', description: 'SK하이닉스 이천공장에서 반도체 검사원을 모집합니다.\n\n[주요 업무]\n- 반도체 칩 외관 검사\n- 테스트 장비 운영\n- 불량품 분류 및 보고\n\n[야간 근무 수당 별도 지급]', allowedVisas: 'E-9,H-2,F-2,F-4', minKoreanLevel: 2, displayAddress: '경기 이천시', actualAddress: '경기도 이천시 부발읍 경충대로 2091', workIntensity: 'MIDDLE', contactName: 'SK하이닉스 채용', contactPhone: '031-630-4567', closingDate: future(5), alba: { hourlyWage: 12000, workDaysMask: '1111100', workTimeStart: '22:00', workTimeEnd: '06:00' } },
  // SK하이닉스 — 정규직
  { companyEmail: 'hr@sk-hynix-seed.com', boardType: 'FULL_TIME', tierType: 'STANDARD', title: '메모리 공정 엔지니어 (신입)', description: 'SK하이닉스에서 메모리 공정 엔지니어를 모집합니다.\n\n[주요 업무]\n- DRAM/NAND 공정 운영 및 관리\n- 수율 향상 활동\n- 공정 데이터 분석\n\n[자격요건]\n- 화학/재료/전자공학 전공\n- 반도체 관련 경험 우대', allowedVisas: 'E-7,F-2,F-5', minKoreanLevel: 3, displayAddress: '경기 이천시', actualAddress: '경기도 이천시 부발읍 경충대로 2091', workIntensity: 'MIDDLE', contactName: 'SK하이닉스 채용', contactPhone: '031-630-4567', closingDate: future(25), fulltime: { salaryMin: 38000000, salaryMax: 52000000, experienceLevel: 'ENTRY', educationLevel: 'BACHELOR' } },

  // 현대자동차 — 정규직
  { companyEmail: 'hr@hyundai-motor-seed.com', boardType: 'FULL_TIME', tierType: 'STANDARD', title: '용접사 — 경험자 우대 (주 5일)', description: '현대자동차 아산공장에서 용접사를 모집합니다.\n\n[주요 업무]\n- 차체 용접 작업\n- 용접 품질 검사\n- 설비 유지보수 보조\n\n[자격요건]\n- 용접기능사 이상 보유자\n- 용접 경력 1년 이상 우대', allowedVisas: 'E-9,E-7,H-2', minKoreanLevel: 2, displayAddress: '충남 아산시', actualAddress: '충청남도 아산시 인주면 현대자동차로', workIntensity: 'UPPER', contactName: '현대자동차 채용', contactPhone: '041-530-1234', closingDate: null, fulltime: { salaryMin: 24000000, salaryMax: 30000000, experienceLevel: 'JUNIOR', educationLevel: 'HIGH_SCHOOL' } },
  // 현대자동차 — 알바
  { companyEmail: 'hr@hyundai-motor-seed.com', boardType: 'PART_TIME', tierType: 'STANDARD', title: '차량 세차/검수 보조 (파트타임)', description: '현대자동차 출고센터에서 세차/검수 보조를 모집합니다.\n\n[주요 업무]\n- 출고 차량 세차\n- 외관 검수 보조\n- 차량 이동 보조\n\n[근무 조건]\n- 주 3~5일 선택 가능\n- 중식 제공', allowedVisas: 'E-9,H-2,F-4', minKoreanLevel: 1, displayAddress: '충남 아산시', actualAddress: '충청남도 아산시 인주면 현대자동차로', workIntensity: 'LOWER', contactName: '현대자동차 채용', contactPhone: '041-530-1234', closingDate: future(9), alba: { hourlyWage: 11000, workDaysMask: '1111100', workTimeStart: '09:00', workTimeEnd: '18:00' } },

  // 쿠팡 — 정규직
  { companyEmail: 'hr@coupang-seed.com', boardType: 'FULL_TIME', tierType: 'STANDARD', title: '배송 기사 (지입차 / 4대 보험)', description: '쿠팡로지스틱스에서 배송 기사를 모집합니다.\n\n[주요 업무]\n- 쿠팡 로켓배송 상품 배송\n- 고객 응대\n\n[근무 조건]\n- 지입차 지원 프로그램\n- 4대 보험 가입\n- 인센티브 제도 운영\n- 주 5일 근무', allowedVisas: 'F-2,F-4,F-5,F-6', minKoreanLevel: 3, displayAddress: '서울 및 경기', actualAddress: '서울특별시 송파구 송파대로 570', workIntensity: 'UPPER', contactName: '쿠팡 채용', contactPhone: '1600-9900', closingDate: future(12), fulltime: { salaryMin: 30000000, salaryMax: 35000000, experienceLevel: 'ENTRY', educationLevel: 'HIGH_SCHOOL' } },
  // 쿠팡 — 알바
  { companyEmail: 'hr@coupang-seed.com', boardType: 'PART_TIME', tierType: 'STANDARD', title: '물류센터 새벽 피킹 알바', description: '쿠팡 물류센터에서 새벽 피킹 알바를 모집합니다.\n\n[주요 업무]\n- 주문 상품 피킹(picking)\n- 상품 포장 및 분류\n\n[근무 조건]\n- 새벽 04:00~10:00 (6시간)\n- 시급 + 새벽수당\n- 주 3일 이상 가능', allowedVisas: 'E-9,H-2,F-2,F-4', minKoreanLevel: 1, displayAddress: '경기 이천시', actualAddress: '경기도 이천시 쿠팡 물류센터', workIntensity: 'UPPER', contactName: '쿠팡 채용', contactPhone: '1600-9900', closingDate: future(6), alba: { hourlyWage: 13500, workDaysMask: '1111100', workTimeStart: '04:00', workTimeEnd: '10:00' } },

  // 대우건설 — 알바
  { companyEmail: 'hr@daewoo-seed.com', boardType: 'PART_TIME', tierType: 'STANDARD', title: '건설 인력 — 철근공 (일당제)', description: '대우건설 강남 현장에서 철근공을 모집합니다.\n\n[주요 업무]\n- 철근 가공, 조립, 배근\n- 도면 해석 및 시공\n\n[근무 조건]\n- 일당 150,000원 이상\n- 중식 제공\n- 안전장비 지급', allowedVisas: 'E-9,H-2', minKoreanLevel: 1, displayAddress: '서울 강남구', actualAddress: '서울특별시 강남구 대치동', workIntensity: 'UPPER', contactName: '대우건설 현장소장', contactPhone: '02-2288-3456', closingDate: future(2), alba: { hourlyWage: 15000, workDaysMask: '1111100', workTimeStart: '07:00', workTimeEnd: '17:00' } },
  // 대우건설 — 정규직
  { companyEmail: 'hr@daewoo-seed.com', boardType: 'FULL_TIME', tierType: 'STANDARD', title: '건설현장 시공관리 기술자', description: '대우건설에서 시공관리 기술자를 모집합니다.\n\n[주요 업무]\n- 건축 시공 관리 및 감독\n- 공정 관리 및 품질 확인\n- 협력업체 관리\n\n[자격요건]\n- 건축기사 이상 보유\n- 시공 경력 2년 이상', allowedVisas: 'E-7,F-2,F-5', minKoreanLevel: 4, displayAddress: '서울 강남구', actualAddress: '서울특별시 강남구 대치동', workIntensity: 'UPPER', contactName: '대우건설 인사팀', contactPhone: '02-2288-3456', closingDate: future(15), fulltime: { salaryMin: 32000000, salaryMax: 45000000, experienceLevel: 'JUNIOR', educationLevel: 'BACHELOR' } },

  // 그랜드하얏트 — 알바
  { companyEmail: 'hr@hyatt-seed.com', boardType: 'PART_TIME', tierType: 'STANDARD', title: '호텔 객실 청소원 (주 5일, 고정 스케줄)', description: '그랜드 하얏트 서울에서 객실 청소원을 모집합니다.\n\n[주요 업무]\n- 객실 청소 및 정리\n- 린넨 교체 및 어메니티 보충\n- 객실 점검 보고\n\n[근무 조건]\n- 주 5일 고정 스케줄\n- 직원식 무료 제공\n- 유니폼 지급\n- 주차 가능', allowedVisas: 'E-9,H-2,F-4,D-10', minKoreanLevel: 1, displayAddress: '서울 용산구', actualAddress: '서울특별시 용산구 소월로 322', workIntensity: 'MIDDLE', contactName: '하얏트 인사팀', contactPhone: '02-799-8888', closingDate: null, alba: { hourlyWage: 11000, workDaysMask: '1111100', workTimeStart: '09:00', workTimeEnd: '18:00' } },
  // 그랜드하얏트 — 정규직
  { companyEmail: 'hr@hyatt-seed.com', boardType: 'FULL_TIME', tierType: 'STANDARD', title: '호텔 시설관리 엔지니어', description: '그랜드 하얏트 서울에서 시설관리 엔지니어를 모집합니다.\n\n[주요 업무]\n- 호텔 전기/기계 설비 관리\n- 시설 보수 및 점검\n- 긴급 수리 대응\n\n[자격요건]\n- 전기기사 또는 설비기사 자격증 보유\n- 호텔/빌딩 시설관리 경험 우대', allowedVisas: 'E-7,F-2,F-5', minKoreanLevel: 3, displayAddress: '서울 용산구', actualAddress: '서울특별시 용산구 소월로 322', workIntensity: 'MIDDLE', contactName: '하얏트 인사팀', contactPhone: '02-799-8888', closingDate: future(20), fulltime: { salaryMin: 28000000, salaryMax: 38000000, experienceLevel: 'JUNIOR', educationLevel: 'HIGH_SCHOOL' } },

  // CJ제일제당 — 알바
  { companyEmail: 'hr@cj-food-seed.com', boardType: 'PART_TIME', tierType: 'STANDARD', title: '식품 공장 라인 작업원 (일 2교대)', description: 'CJ제일제당 진천공장에서 라인 작업원을 모집합니다.\n\n[주요 업무]\n- 식품 포장 라인 운영\n- 원재료 투입 보조\n- 청결 유지 및 HACCP 기준 준수\n\n[근무 조건]\n- 2교대 (06:00~14:00 / 14:00~22:00)\n- 식사 제공\n- 통근버스 운행', allowedVisas: 'E-9,H-2,E-7', minKoreanLevel: 1, displayAddress: '충북 진천군', actualAddress: '충청북도 진천군 이월면 CJ제일제당', workIntensity: 'UPPER', contactName: 'CJ제일제당 채용', contactPhone: '043-530-7890', closingDate: future(8), alba: { hourlyWage: 11500, workDaysMask: '1111100', workTimeStart: '06:00', workTimeEnd: '14:00' } },
  // CJ제일제당 — 정규직
  { companyEmail: 'hr@cj-food-seed.com', boardType: 'FULL_TIME', tierType: 'STANDARD', title: '식품 품질관리(QC) 담당자', description: 'CJ제일제당에서 품질관리 담당자를 모집합니다.\n\n[주요 업무]\n- 원료/완제품 품질 검사\n- HACCP/ISO 기준 관리\n- 품질 데이터 분석 및 보고\n\n[자격요건]\n- 식품공학/생물학 전공\n- 품질관리 경험 1년 이상 우대', allowedVisas: 'E-7,F-2,F-5', minKoreanLevel: 3, displayAddress: '충북 진천군', actualAddress: '충청북도 진천군 이월면 CJ제일제당', workIntensity: 'MIDDLE', contactName: 'CJ제일제당 채용', contactPhone: '043-530-7890', closingDate: future(12), fulltime: { salaryMin: 26000000, salaryMax: 34000000, experienceLevel: 'ENTRY', educationLevel: 'BACHELOR' } },

  // 기아 — 알바
  { companyEmail: 'hr@kia-seed.com', boardType: 'PART_TIME', tierType: 'STANDARD', title: '자동차 도장 보조원 (초보 가능)', description: '기아자동차 광주공장에서 도장 보조원을 모집합니다.\n\n[주요 업무]\n- 차체 도장 보조 작업\n- 마스킹 및 전처리\n- 도장 품질 확인\n\n[자격요건]\n- 초보자 환영\n- 성실한 근무 태도\n- 교대 근무 가능자', allowedVisas: 'E-9,H-2,F-2', minKoreanLevel: 1, displayAddress: '광주 서구', actualAddress: '광주광역시 서구 상무대로 기아자동차', workIntensity: 'MIDDLE', contactName: '기아 채용팀', contactPhone: '062-870-1234', closingDate: future(10), alba: { hourlyWage: 12500, workDaysMask: '1111100', workTimeStart: '08:00', workTimeEnd: '17:00' } },
  // 기아 — 정규직
  { companyEmail: 'hr@kia-seed.com', boardType: 'FULL_TIME', tierType: 'STANDARD', title: '자동차 생산기술 엔지니어', description: '기아자동차에서 생산기술 엔지니어를 모집합니다.\n\n[주요 업무]\n- 차량 생산 공정 설계 및 개선\n- 생산 설비 도입 및 최적화\n- 품질 향상 활동\n\n[자격요건]\n- 기계/산업공학 전공\n- CAD/CAM 활용 가능자', allowedVisas: 'E-7,F-2,F-5,F-6', minKoreanLevel: 3, displayAddress: '광주 서구', actualAddress: '광주광역시 서구 상무대로 기아자동차', workIntensity: 'MIDDLE', contactName: '기아 채용팀', contactPhone: '062-870-1234', closingDate: future(18), fulltime: { salaryMin: 30000000, salaryMax: 45000000, experienceLevel: 'ENTRY', educationLevel: 'BACHELOR' } },

  // 롯데글로벌로지스 — 정규직
  { companyEmail: 'hr@lotte-seed.com', boardType: 'FULL_TIME', tierType: 'STANDARD', title: '물류 창고 관리자 (정규직 전환)', description: '롯데글로벌로지스 용인센터에서 창고 관리자를 모집합니다.\n\n[주요 업무]\n- 입출고 관리 및 재고 조사\n- 물류 시스템(WMS) 운영\n- 파트타임 인력 관리\n\n[근무 조건]\n- 정규직 전환 가능 (6개월 후)\n- 4대 보험 가입\n- 성과급 지급', allowedVisas: 'F-2,F-4,F-5,F-6,E-7', minKoreanLevel: 3, displayAddress: '경기 용인시', actualAddress: '경기도 용인시 처인구 남사면 롯데글로벌로지스', workIntensity: 'MIDDLE', contactName: '롯데 채용', contactPhone: '031-890-5678', closingDate: future(20), fulltime: { salaryMin: 26000000, salaryMax: 32000000, experienceLevel: 'ENTRY', educationLevel: 'HIGH_SCHOOL' } },
  // 롯데글로벌로지스 — 알바
  { companyEmail: 'hr@lotte-seed.com', boardType: 'PART_TIME', tierType: 'STANDARD', title: '택배 상하차 알바 (단기 가능)', description: '롯데글로벌로지스에서 택배 상하차 알바를 모집합니다.\n\n[주요 업무]\n- 택배 상하차 작업\n- 상품 분류 및 적재\n\n[근무 조건]\n- 단기 1주일부터 가능\n- 일 4~8시간 선택\n- 당일 지급 가능', allowedVisas: 'E-9,H-2,F-2,F-4', minKoreanLevel: 0, displayAddress: '경기 용인시', actualAddress: '경기도 용인시 처인구 남사면 롯데글로벌로지스', workIntensity: 'UPPER', contactName: '롯데 채용', contactPhone: '031-890-5678', closingDate: future(4), alba: { hourlyWage: 12000, workDaysMask: '1111110', workTimeStart: '06:00', workTimeEnd: '14:00' } },
];

async function main() {
  console.log('=== 기업 시드 시작 / Starting company seed ===\n');

  const companyMap = new Map<string, bigint>(); // email -> companyId

  for (const c of COMPANIES) {
    // 이미 있으면 스킵 / Skip if exists
    const existing = await prisma.user.findFirst({ where: { email: c.email } });
    if (existing) {
      const profile = await prisma.corporateProfile.findFirst({ where: { authId: existing.id } });
      if (profile) {
        // 로고 업데이트 / Update logo if needed
        await prisma.corporateProfile.update({
          where: { companyId: profile.companyId },
          data: { logoImageUrl: c.logoImageUrl, brandName: c.brandName },
        });
        companyMap.set(c.email, profile.companyId);
        console.log(`[SKIP] ${c.brandName} (이미 존재, 로고 업데이트)`);
        continue;
      }
    }

    const hashed = await bcrypt.hash('TestCompany123!', 10);
    const user = await prisma.user.create({
      data: {
        email: c.email,
        password: hashed,
        userType: 'CORPORATE',
        socialProvider: 'NONE',
        isActive: true,
      },
    });

    const profile = await prisma.corporateProfile.create({
      data: {
        authId: user.id,
        bizRegNumber: c.bizRegNumber,
        companyNameOfficial: c.companyNameOfficial,
        brandName: c.brandName,
        logoImageUrl: c.logoImageUrl,
        ceoName: '대표이사',
        managerName: '채용담당자',
        managerPhone: '010-0000-0000',
        addressRoad: c.addressRoad,
        companySizeType: c.companySizeType,
        verificationStatus: 'APPROVED',
        approvedAt: new Date(),
        submittedAt: new Date(),
        employeeCountKorean: 500,
        employeeCountForeign: 30,
      },
    });

    companyMap.set(c.email, profile.companyId);
    console.log(`[OK] ${c.brandName} — companyId: ${profile.companyId}`);
  }

  console.log(`\n=== 기업 ${companyMap.size}개 준비 완료 / ${companyMap.size} companies ready ===\n`);

  // 공고 생성 / Create job postings
  let created = 0;
  for (const j of JOBS) {
    const corpId = companyMap.get(j.companyEmail);
    if (!corpId) {
      console.log(`[WARN] ${j.companyEmail} 기업 못 찾음, 스킵`);
      continue;
    }

    // 중복 체크 / Check duplicates
    const dup = await prisma.jobPosting.findFirst({
      where: { corporateId: corpId, title: j.title },
    });
    if (dup) {
      console.log(`[SKIP] "${j.title}" (이미 존재)`);
      continue;
    }

    const premiumStart = j.isPremium ? new Date() : undefined;
    const premiumEnd = j.isPremium ? future(30) : undefined;

    const posting = await prisma.jobPosting.create({
      data: {
        corporateId: corpId,
        boardType: j.boardType,
        tierType: j.tierType,
        title: j.title,
        description: j.description,
        allowedVisas: j.allowedVisas,
        minKoreanLevel: j.minKoreanLevel,
        displayAddress: j.displayAddress,
        actualAddress: j.actualAddress,
        workIntensity: j.workIntensity,
        contactName: j.contactName,
        contactPhone: j.contactPhone,
        applicationMethod: 'PLATFORM',
        interviewMethod: 'OFFLINE',
        status: 'ACTIVE',
        closingDate: j.closingDate,
        isPremium: j.isPremium ?? false,
        premiumStartAt: premiumStart,
        premiumEndAt: premiumEnd,
        viewCount: Math.floor(Math.random() * 80) + 10,
        scrapCount: Math.floor(Math.random() * 15),
        applyCount: Math.floor(Math.random() * 8),
        ...(j.alba ? {
          albaAttributes: {
            create: {
              hourlyWage: j.alba.hourlyWage,
              workDaysMask: j.alba.workDaysMask,
              workTimeStart: j.alba.workTimeStart,
              workTimeEnd: j.alba.workTimeEnd,
            },
          },
        } : {}),
        ...(j.fulltime ? {
          fulltimeAttributes: {
            create: {
              salaryMin: j.fulltime.salaryMin,
              salaryMax: j.fulltime.salaryMax,
              experienceLevel: j.fulltime.experienceLevel,
              educationLevel: j.fulltime.educationLevel,
            },
          },
        } : {}),
      },
    });

    const tier = j.tierType === 'PREMIUM' ? '⭐ PREMIUM' : 'STANDARD';
    console.log(`[OK] ${tier} — "${j.title}" (id: ${posting.id})`);
    created++;
  }

  console.log(`\n=== 공고 ${created}개 생성 완료 / ${created} jobs created ===`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
