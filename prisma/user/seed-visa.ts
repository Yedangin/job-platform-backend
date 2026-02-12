import { PrismaClient } from '../../generated/prisma-user';

const prisma = new PrismaClient();

async function main() {
  console.log('[Seed] 비자 알고리즘 종합 시드 데이터 입력 시작...');

  // ==========================================
  // 1. 비자 유형 시드 (31개 + 하위유형)
  // ==========================================
  const visaTypes = [
    // === A 시리즈: 외교/공무 (취업불가) ===
    { code: 'A-1', nameKo: '외교', nameEn: 'Diplomat', category: 'VISIT', employmentLevel: 'PROHIBITED' as const, description: '외교관 및 그 가족' },
    { code: 'A-2', nameKo: '공무', nameEn: 'Government Official', category: 'VISIT', employmentLevel: 'PROHIBITED' as const, description: '공무 수행 외국인' },
    { code: 'A-3', nameKo: '협정', nameEn: 'Agreement', category: 'VISIT', employmentLevel: 'PROHIBITED' as const, description: '국제협정에 의한 체류' },

    // === B 시리즈: 관광/통과 (취업불가) ===
    { code: 'B-1', nameKo: '사증면제', nameEn: 'Visa Exemption', category: 'VISIT', employmentLevel: 'PROHIBITED' as const, description: '사증면제 협정국 국민' },
    { code: 'B-2', nameKo: '관광통과', nameEn: 'Tourist/Transit', category: 'VISIT', employmentLevel: 'PROHIBITED' as const, description: '관광, 통과 목적' },

    // === C 시리즈: 단기 ===
    { code: 'C-1', nameKo: '일시취재', nameEn: 'Temporary Press', category: 'VISIT', employmentLevel: 'PROHIBITED' as const, description: '일시적 취재 활동' },
    { code: 'C-3', nameKo: '단기방문', nameEn: 'Short-term Visit', category: 'VISIT', employmentLevel: 'PROHIBITED' as const, description: '시장조사, 관광 등 단기방문', maxStayMonths: 3 },
    { code: 'C-4', nameKo: '단기취업', nameEn: 'Short-term Employment', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: '90일 이내 단기 취업', maxStayMonths: 3 },

    // === D 시리즈: 유학/연수 ===
    { code: 'D-1', nameKo: '문화예술', nameEn: 'Culture/Arts', category: 'STUDY', employmentLevel: 'PROHIBITED' as const, description: '문화예술 활동' },
    { code: 'D-2', nameKo: '유학', nameEn: 'Study Abroad', category: 'STUDY', employmentLevel: 'PART_TIME' as const, description: '전문대학 이상 유학', maxWorkHoursWeekly: 20, maxStayMonths: 24 },
    { code: 'D-2-1', nameKo: '전문학사', nameEn: 'Associate Degree', category: 'STUDY', parentCode: 'D-2', subTypeCode: '1', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 20 },
    { code: 'D-2-2', nameKo: '학사', nameEn: 'Bachelor Degree', category: 'STUDY', parentCode: 'D-2', subTypeCode: '2', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 20 },
    { code: 'D-2-3', nameKo: '석사', nameEn: 'Master Degree', category: 'STUDY', parentCode: 'D-2', subTypeCode: '3', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 20 },
    { code: 'D-2-4', nameKo: '박사', nameEn: 'Doctoral Degree', category: 'STUDY', parentCode: 'D-2', subTypeCode: '4', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 20 },
    { code: 'D-2-5', nameKo: '연구유학', nameEn: 'Research Student', category: 'STUDY', parentCode: 'D-2', subTypeCode: '5', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 20 },
    { code: 'D-2-6', nameKo: '교환학생', nameEn: 'Exchange Student', category: 'STUDY', parentCode: 'D-2', subTypeCode: '6', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 20 },
    { code: 'D-2-7', nameKo: '어학연수(D-2)', nameEn: 'Language Training (D-2)', category: 'STUDY', parentCode: 'D-2', subTypeCode: '7', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 20 },
    { code: 'D-2-8', nameKo: '단기유학', nameEn: 'Short-term Study', category: 'STUDY', parentCode: 'D-2', subTypeCode: '8', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 20 },
    { code: 'D-3', nameKo: '기술연수', nameEn: 'Technical Training', category: 'STUDY', employmentLevel: 'PROHIBITED' as const, description: '산업체 기술연수' },
    { code: 'D-4', nameKo: '일반연수', nameEn: 'General Training', category: 'STUDY', employmentLevel: 'PART_TIME' as const, description: '어학연수, 기술연수 등', maxWorkHoursWeekly: 20 },
    { code: 'D-4-1', nameKo: '어학연수', nameEn: 'Language Training', category: 'STUDY', parentCode: 'D-4', subTypeCode: '1', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 20 },
    { code: 'D-4-7', nameKo: '외국어연수', nameEn: 'Foreign Language Course', category: 'STUDY', parentCode: 'D-4', subTypeCode: '7', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 20 },
    { code: 'D-10', nameKo: '구직', nameEn: 'Job Seeking', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: 'E-7 전환 대상 구직활동', maxStayMonths: 6 },

    // === E 시리즈: 취업 ===
    { code: 'E-1', nameKo: '교수', nameEn: 'Professor', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: '전문대학 이상 교수/강사' },
    { code: 'E-2', nameKo: '회화지도', nameEn: 'Foreign Language Instructor', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: '외국어 회화 지도' },
    { code: 'E-2-1', nameKo: '외국어회화 강사', nameEn: 'Conversation Instructor', category: 'WORK', parentCode: 'E-2', subTypeCode: '1', employmentLevel: 'CONDITIONAL' as const },
    { code: 'E-2-2', nameKo: '외국어보조교사', nameEn: 'Teaching Assistant', category: 'WORK', parentCode: 'E-2', subTypeCode: '2', employmentLevel: 'CONDITIONAL' as const },
    { code: 'E-3', nameKo: '연구', nameEn: 'Research', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: '자연과학/산업기술 분야 연구' },
    { code: 'E-4', nameKo: '기술지도', nameEn: 'Technology Transfer', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: '자연과학 기술지도' },
    { code: 'E-5', nameKo: '전문직업', nameEn: 'Professional Employment', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: '법률, 회계, 의료 등 전문직' },
    { code: 'E-6', nameKo: '예술흥행', nameEn: 'Arts/Entertainment', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: '예술/연예/체육 활동' },
    { code: 'E-6-1', nameKo: '예술활동', nameEn: 'Arts Activities', category: 'WORK', parentCode: 'E-6', subTypeCode: '1', employmentLevel: 'CONDITIONAL' as const },
    { code: 'E-6-2', nameKo: '흥행활동', nameEn: 'Entertainment Activities', category: 'WORK', parentCode: 'E-6', subTypeCode: '2', employmentLevel: 'CONDITIONAL' as const },
    { code: 'E-6-3', nameKo: '운동선수', nameEn: 'Professional Athlete', category: 'WORK', parentCode: 'E-6', subTypeCode: '3', employmentLevel: 'CONDITIONAL' as const },
    { code: 'E-7', nameKo: '특정활동', nameEn: 'Specially Designated Activities', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: '전문인력 취업 (IT, 엔지니어, 교수 등)' },
    { code: 'E-7-1', nameKo: '전문인력', nameEn: 'Professional Worker', category: 'WORK', parentCode: 'E-7', subTypeCode: '1', employmentLevel: 'CONDITIONAL' as const, description: '학사이상 전문인력' },
    { code: 'E-7-2', nameKo: '준전문인력', nameEn: 'Semi-Professional Worker', category: 'WORK', parentCode: 'E-7', subTypeCode: '2', employmentLevel: 'CONDITIONAL' as const, description: '전문학사/기능사 자격' },
    { code: 'E-7-3', nameKo: '숙련기능인력', nameEn: 'Skilled Worker', category: 'WORK', parentCode: 'E-7', subTypeCode: '3', employmentLevel: 'CONDITIONAL' as const, description: 'E-9/H-2 경력자 숙련공 전환' },
    { code: 'E-7-4', nameKo: '점수제 숙련기능인력', nameEn: 'Point-based Skilled Worker', category: 'WORK', parentCode: 'E-7', subTypeCode: '4', employmentLevel: 'CONDITIONAL' as const, description: '점수제 숙련기능 외국인력' },
    { code: 'E-8', nameKo: '계절근로', nameEn: 'Seasonal Worker', category: 'WORK', employmentLevel: 'LIMITED' as const, description: '농축산업/어업 계절근로', maxStayMonths: 5 },
    { code: 'E-9', nameKo: '비전문취업', nameEn: 'Non-Professional Employment', category: 'WORK', employmentLevel: 'LIMITED' as const, description: '단순기능 외국인력 (제조업, 농축산업, 어업, 건설업, 서비스업)', maxStayMonths: 58, renewalPossible: true },
    { code: 'E-9-1', nameKo: '제조업', nameEn: 'Manufacturing', category: 'WORK', parentCode: 'E-9', subTypeCode: '1', employmentLevel: 'LIMITED' as const },
    { code: 'E-9-2', nameKo: '건설업', nameEn: 'Construction', category: 'WORK', parentCode: 'E-9', subTypeCode: '2', employmentLevel: 'LIMITED' as const },
    { code: 'E-9-3', nameKo: '농축산업', nameEn: 'Agriculture/Livestock', category: 'WORK', parentCode: 'E-9', subTypeCode: '3', employmentLevel: 'LIMITED' as const },
    { code: 'E-9-4', nameKo: '어업', nameEn: 'Fishing', category: 'WORK', parentCode: 'E-9', subTypeCode: '4', employmentLevel: 'LIMITED' as const },
    { code: 'E-9-5', nameKo: '서비스업', nameEn: 'Service', category: 'WORK', parentCode: 'E-9', subTypeCode: '5', employmentLevel: 'LIMITED' as const },
    { code: 'E-10', nameKo: '선원취업', nameEn: 'Crew Employment', category: 'WORK', employmentLevel: 'LIMITED' as const, description: '선원으로 취업하는 외국인' },
    { code: 'E-10-1', nameKo: '내항선원', nameEn: 'Domestic Crew', category: 'WORK', parentCode: 'E-10', subTypeCode: '1', employmentLevel: 'LIMITED' as const },
    { code: 'E-10-2', nameKo: '외항선원', nameEn: 'Ocean-going Crew', category: 'WORK', parentCode: 'E-10', subTypeCode: '2', employmentLevel: 'LIMITED' as const },

    // === F 시리즈: 거주 ===
    { code: 'F-1', nameKo: '방문동거', nameEn: 'Family Visit', category: 'RESIDENCE', employmentLevel: 'PROHIBITED' as const, description: '친척 방문 동거 (취업불가, 체류자격외활동허가 시 가능)' },
    { code: 'F-2', nameKo: '거주', nameEn: 'Residence', category: 'RESIDENCE', employmentLevel: 'FULL' as const, description: '장기체류 거주비자' },
    { code: 'F-2-1', nameKo: '국민배우자(거주)', nameEn: 'Spouse of Citizen (Residence)', category: 'RESIDENCE', parentCode: 'F-2', subTypeCode: '1', employmentLevel: 'FULL' as const },
    { code: 'F-2-7', nameKo: '점수제 거주', nameEn: 'Points-based Residence', category: 'RESIDENCE', parentCode: 'F-2', subTypeCode: '7', employmentLevel: 'FULL' as const, description: '점수제 거주비자 (120점 중 80점 이상)', metadata: JSON.stringify({ requiredScore: 80, totalScore: 120 }) },
    { code: 'F-2-99', nameKo: '기타 거주', nameEn: 'Other Residence', category: 'RESIDENCE', parentCode: 'F-2', subTypeCode: '99', employmentLevel: 'FULL' as const },
    { code: 'F-3', nameKo: '동반', nameEn: 'Dependent', category: 'RESIDENCE', employmentLevel: 'PROHIBITED' as const, description: '주재원 가족 등 동반 체류' },
    { code: 'F-4', nameKo: '재외동포', nameEn: 'Overseas Korean', category: 'RESIDENCE', employmentLevel: 'LIMITED' as const, description: '재외동포 체류자격 (단순노무 제한)' },
    { code: 'F-5', nameKo: '영주', nameEn: 'Permanent Residence', category: 'RESIDENCE', employmentLevel: 'FULL' as const, description: '영주권' },
    { code: 'F-5-1', nameKo: '일반영주', nameEn: 'General PR', category: 'RESIDENCE', parentCode: 'F-5', subTypeCode: '1', employmentLevel: 'FULL' as const },
    { code: 'F-5-2', nameKo: '투자영주', nameEn: 'Investment PR', category: 'RESIDENCE', parentCode: 'F-5', subTypeCode: '2', employmentLevel: 'FULL' as const },
    { code: 'F-5-3', nameKo: '국민배우자영주', nameEn: 'Spouse of Citizen PR', category: 'RESIDENCE', parentCode: 'F-5', subTypeCode: '3', employmentLevel: 'FULL' as const },
    { code: 'F-5-6', nameKo: '고액투자영주', nameEn: 'High Investment PR', category: 'RESIDENCE', parentCode: 'F-5', subTypeCode: '6', employmentLevel: 'FULL' as const },
    { code: 'F-5-11', nameKo: '점수제영주', nameEn: 'Points-based PR', category: 'RESIDENCE', parentCode: 'F-5', subTypeCode: '11', employmentLevel: 'FULL' as const },
    { code: 'F-5-16', nameKo: '숙련기능영주', nameEn: 'Skilled Worker PR', category: 'RESIDENCE', parentCode: 'F-5', subTypeCode: '16', employmentLevel: 'FULL' as const },
    { code: 'F-6', nameKo: '결혼이민', nameEn: 'Marriage Migration', category: 'RESIDENCE', employmentLevel: 'FULL' as const, description: '한국인 배우자' },

    // === H 시리즈: 방문취업/워킹홀리데이 ===
    { code: 'H-1', nameKo: '관광취업', nameEn: 'Working Holiday', category: 'WORK', employmentLevel: 'FULL' as const, description: '워킹홀리데이 (협정국 청년)', maxStayMonths: 12, minAge: 18, maxAge: 30 },
    { code: 'H-2', nameKo: '방문취업', nameEn: 'Working Visit', category: 'WORK', employmentLevel: 'LIMITED' as const, description: '재외동포 방문취업 (허용업종 제한)', maxStayMonths: 58, renewalPossible: true },
    { code: 'H-2-1', nameKo: '연고방문', nameEn: 'Family Visit Work', category: 'WORK', parentCode: 'H-2', subTypeCode: '1', employmentLevel: 'LIMITED' as const },
    { code: 'H-2-5', nameKo: '추첨방문', nameEn: 'Lottery Visit Work', category: 'WORK', parentCode: 'H-2', subTypeCode: '5', employmentLevel: 'LIMITED' as const },
    { code: 'H-2-7', nameKo: '자진출국방문', nameEn: 'Voluntary Departure Work', category: 'WORK', parentCode: 'H-2', subTypeCode: '7', employmentLevel: 'LIMITED' as const },
  ];

  for (const vt of visaTypes) {
    await prisma.visaType.upsert({
      where: { code: vt.code },
      update: {
        nameKo: vt.nameKo, nameEn: vt.nameEn, category: vt.category,
        description: vt.description, employmentLevel: vt.employmentLevel,
        parentCode: vt.parentCode, subTypeCode: vt.subTypeCode,
        maxWorkHoursWeekly: vt.maxWorkHoursWeekly, maxStayMonths: vt.maxStayMonths,
        renewalPossible: vt.renewalPossible, minAge: vt.minAge, maxAge: vt.maxAge,
        metadata: vt.metadata,
      },
      create: {
        code: vt.code, nameKo: vt.nameKo, nameEn: vt.nameEn, category: vt.category,
        description: vt.description, employmentLevel: vt.employmentLevel ?? 'PROHIBITED',
        parentCode: vt.parentCode, subTypeCode: vt.subTypeCode,
        maxWorkHoursWeekly: vt.maxWorkHoursWeekly, maxStayMonths: vt.maxStayMonths,
        renewalPossible: vt.renewalPossible ?? false, minAge: vt.minAge, maxAge: vt.maxAge,
        metadata: vt.metadata,
      },
    });
  }
  console.log(`[Seed] 비자 유형 ${visaTypes.length}건 입력 완료`);

  // ==========================================
  // 2. KSIC 업종코드 시드 (주요 업종)
  // ==========================================
  const industryCodes = [
    // 농업 (A)
    { ksicCode: '01', sectionCode: 'A', nameKo: '농업', level: 2 },
    { ksicCode: '02', sectionCode: 'A', nameKo: '임업', level: 2 },
    { ksicCode: '03', sectionCode: 'A', nameKo: '어업', level: 2 },
    // 광업 (B)
    { ksicCode: '07', sectionCode: 'B', nameKo: '금속 광업', level: 2 },
    { ksicCode: '08', sectionCode: 'B', nameKo: '비금속광물 광업', level: 2 },
    // 제조업 (C)
    { ksicCode: '10', sectionCode: 'C', nameKo: '식료품 제조업', level: 2 },
    { ksicCode: '13', sectionCode: 'C', nameKo: '섬유제품 제조업', level: 2 },
    { ksicCode: '14', sectionCode: 'C', nameKo: '의복, 의복액세서리 및 모피제품 제조업', level: 2 },
    { ksicCode: '15', sectionCode: 'C', nameKo: '가죽, 가방 및 신발 제조업', level: 2 },
    { ksicCode: '17', sectionCode: 'C', nameKo: '펄프, 종이 및 종이제품 제조업', level: 2 },
    { ksicCode: '20', sectionCode: 'C', nameKo: '화학물질 및 화학제품 제조업', level: 2 },
    { ksicCode: '22', sectionCode: 'C', nameKo: '고무 및 플라스틱제품 제조업', level: 2 },
    { ksicCode: '23', sectionCode: 'C', nameKo: '비금속 광물제품 제조업', level: 2 },
    { ksicCode: '24', sectionCode: 'C', nameKo: '1차 금속 제조업', level: 2 },
    { ksicCode: '25', sectionCode: 'C', nameKo: '금속가공제품 제조업', level: 2 },
    { ksicCode: '26', sectionCode: 'C', nameKo: '전자부품, 컴퓨터, 영상, 음향 및 통신장비 제조업', level: 2 },
    { ksicCode: '27', sectionCode: 'C', nameKo: '의료, 정밀, 광학기기 및 시계 제조업', level: 2 },
    { ksicCode: '28', sectionCode: 'C', nameKo: '전기장비 제조업', level: 2 },
    { ksicCode: '29', sectionCode: 'C', nameKo: '기타 기계 및 장비 제조업', level: 2 },
    { ksicCode: '30', sectionCode: 'C', nameKo: '자동차 및 트레일러 제조업', level: 2 },
    { ksicCode: '31', sectionCode: 'C', nameKo: '기타 운송장비 제조업', level: 2 },
    { ksicCode: '32', sectionCode: 'C', nameKo: '가구 제조업', level: 2 },
    { ksicCode: '33', sectionCode: 'C', nameKo: '기타 제품 제조업', level: 2 },
    // 전기/가스 (D)
    { ksicCode: '35', sectionCode: 'D', nameKo: '전기, 가스, 증기 및 공기조절 공급업', level: 2 },
    // 수도/하수/폐기물 (E)
    { ksicCode: '37', sectionCode: 'E', nameKo: '하수, 폐수 및 분뇨 처리업', level: 2 },
    { ksicCode: '38', sectionCode: 'E', nameKo: '폐기물 수집, 운반, 처리 및 원료 재생업', level: 2 },
    // 건설업 (F)
    { ksicCode: '41', sectionCode: 'F', nameKo: '종합 건설업', level: 2 },
    { ksicCode: '42', sectionCode: 'F', nameKo: '전문직별 공사업', level: 2 },
    // 도소매업 (G)
    { ksicCode: '45', sectionCode: 'G', nameKo: '자동차 및 부품 판매업', level: 2 },
    { ksicCode: '46', sectionCode: 'G', nameKo: '도매 및 상품 중개업', level: 2 },
    { ksicCode: '47', sectionCode: 'G', nameKo: '소매업', level: 2 },
    // 운수/창고업 (H)
    { ksicCode: '49', sectionCode: 'H', nameKo: '육상 운송 및 파이프라인 운송업', level: 2 },
    { ksicCode: '50', sectionCode: 'H', nameKo: '수상 운송업', level: 2 },
    { ksicCode: '52', sectionCode: 'H', nameKo: '창고 및 운송관련 서비스업', level: 2 },
    // 숙박/음식점업 (I)
    { ksicCode: '55', sectionCode: 'I', nameKo: '숙박업', level: 2 },
    { ksicCode: '56', sectionCode: 'I', nameKo: '음식점 및 주점업', level: 2 },
    { ksicCode: '5611', sectionCode: 'I', nameKo: '한식 음식점업', level: 4, parentCode: '56' },
    { ksicCode: '5612', sectionCode: 'I', nameKo: '외국식 음식점업', level: 4, parentCode: '56' },
    { ksicCode: '5619', sectionCode: 'I', nameKo: '기타 간이 음식점업', level: 4, parentCode: '56' },
    { ksicCode: '56211', sectionCode: 'I', nameKo: '커피 전문점', level: 5, parentCode: '5621' },
    { ksicCode: '56221', sectionCode: 'I', nameKo: '주점업', level: 5, parentCode: '5622' },
    // 정보통신업 (J)
    { ksicCode: '58', sectionCode: 'J', nameKo: '출판업', level: 2 },
    { ksicCode: '59', sectionCode: 'J', nameKo: '영상·오디오 기록물 제작 및 배급업', level: 2 },
    { ksicCode: '61', sectionCode: 'J', nameKo: '통신업', level: 2 },
    { ksicCode: '62', sectionCode: 'J', nameKo: '컴퓨터 프로그래밍, 시스템 통합 및 관리업', level: 2 },
    { ksicCode: '62010', sectionCode: 'J', nameKo: '컴퓨터 프로그래밍 서비스업', level: 5, parentCode: '62' },
    { ksicCode: '63', sectionCode: 'J', nameKo: '정보서비스업', level: 2 },
    // 금융/보험 (K)
    { ksicCode: '64', sectionCode: 'K', nameKo: '금융업', level: 2 },
    { ksicCode: '65', sectionCode: 'K', nameKo: '보험 및 연금업', level: 2 },
    // 부동산 (L)
    { ksicCode: '68', sectionCode: 'L', nameKo: '부동산업', level: 2 },
    // 전문/과학/기술 (M)
    { ksicCode: '70', sectionCode: 'M', nameKo: '연구개발업', level: 2 },
    { ksicCode: '71', sectionCode: 'M', nameKo: '전문서비스업', level: 2 },
    { ksicCode: '72', sectionCode: 'M', nameKo: '건축기술, 엔지니어링 및 관련 기술서비스업', level: 2 },
    { ksicCode: '73', sectionCode: 'M', nameKo: '기타 전문, 과학 및 기술 서비스업', level: 2 },
    // 사업시설관리/사업지원 (N)
    { ksicCode: '74', sectionCode: 'N', nameKo: '사업지원 서비스업', level: 2 },
    { ksicCode: '75', sectionCode: 'N', nameKo: '건물·산업설비 청소 및 방제 서비스업', level: 2 },
    // 교육 (P)
    { ksicCode: '85', sectionCode: 'P', nameKo: '교육 서비스업', level: 2 },
    // 보건/사회복지 (Q)
    { ksicCode: '86', sectionCode: 'Q', nameKo: '보건업', level: 2 },
    { ksicCode: '87', sectionCode: 'Q', nameKo: '사회복지 서비스업', level: 2 },
    // 예술/스포츠/여가 (R)
    { ksicCode: '90', sectionCode: 'R', nameKo: '창작, 예술 및 여가관련 서비스업', level: 2 },
    { ksicCode: '91', sectionCode: 'R', nameKo: '스포츠 및 오락관련 서비스업', level: 2 },
    // 협회/수리/기타 (S)
    { ksicCode: '94', sectionCode: 'S', nameKo: '협회 및 단체', level: 2 },
    { ksicCode: '95', sectionCode: 'S', nameKo: '개인 및 소비용품 수리업', level: 2 },
    { ksicCode: '96', sectionCode: 'S', nameKo: '기타 개인 서비스업', level: 2 },
  ];

  for (const ic of industryCodes) {
    await prisma.industryCode.upsert({
      where: { ksicCode: ic.ksicCode },
      update: { nameKo: ic.nameKo, sectionCode: ic.sectionCode, level: ic.level, parentCode: ic.parentCode },
      create: ic,
    });
  }
  console.log(`[Seed] 업종코드 ${industryCodes.length}건 입력 완료`);

  // ==========================================
  // 3. KSCO 직종코드 시드
  // ==========================================
  const occupationCodes = [
    // 대분류 (level 1)
    { kscoCode: '1', nameKo: '관리자', nameEn: 'Managers', level: 1 },
    { kscoCode: '2', nameKo: '전문가 및 관련 종사자', nameEn: 'Professionals', level: 1 },
    { kscoCode: '3', nameKo: '사무 종사자', nameEn: 'Clerks', level: 1 },
    { kscoCode: '4', nameKo: '서비스 종사자', nameEn: 'Service Workers', level: 1 },
    { kscoCode: '5', nameKo: '판매 종사자', nameEn: 'Sales Workers', level: 1 },
    { kscoCode: '6', nameKo: '농림어업 숙련 종사자', nameEn: 'Agriculture/Forestry/Fishery Workers', level: 1 },
    { kscoCode: '7', nameKo: '기능원 및 관련 기능 종사자', nameEn: 'Craft Workers', level: 1 },
    { kscoCode: '8', nameKo: '장치·기계 조작 및 조립 종사자', nameEn: 'Machine Operators', level: 1 },
    { kscoCode: '9', nameKo: '단순노무 종사자', nameEn: 'Elementary Workers', level: 1 },

    // 중분류 (level 2) - E-7 핵심 직종
    { kscoCode: '13', nameKo: '전문 서비스 관리자', nameEn: 'Professional Service Managers', level: 2, parentCode: '1' },
    { kscoCode: '15', nameKo: '건설·전기·생산 관련 관리자', nameEn: 'Construction/Production Managers', level: 2, parentCode: '1' },
    { kscoCode: '21', nameKo: '과학 전문가 및 관련직', nameEn: 'Science Professionals', level: 2, parentCode: '2' },
    { kscoCode: '22', nameKo: '정보통신 전문가 및 기술직', nameEn: 'IT Professionals', level: 2, parentCode: '2' },
    { kscoCode: '23', nameKo: '공학 전문가 및 기술직', nameEn: 'Engineering Professionals', level: 2, parentCode: '2' },
    { kscoCode: '24', nameKo: '보건·사회복지 및 종교 관련직', nameEn: 'Health/Social Professionals', level: 2, parentCode: '2' },
    { kscoCode: '25', nameKo: '교육 전문가 및 관련직', nameEn: 'Education Professionals', level: 2, parentCode: '2' },
    { kscoCode: '26', nameKo: '법률·행정 전문직', nameEn: 'Legal/Admin Professionals', level: 2, parentCode: '2' },
    { kscoCode: '27', nameKo: '경영·금융 전문가 및 관련직', nameEn: 'Business/Finance Professionals', level: 2, parentCode: '2' },
    { kscoCode: '28', nameKo: '문화·예술·디자인·방송 관련직', nameEn: 'Culture/Arts/Design', level: 2, parentCode: '2' },

    // 소분류 (level 3) - E-7 상세 직종
    { kscoCode: '221', nameKo: '컴퓨터 하드웨어 및 통신공학 기술자', nameEn: 'Computer HW/Telecom Engineers', level: 3, parentCode: '22' },
    { kscoCode: '222', nameKo: '소프트웨어 개발자', nameEn: 'Software Developers', level: 3, parentCode: '22' },
    { kscoCode: '223', nameKo: '데이터 및 네트워크 관련 전문가', nameEn: 'Data/Network Specialists', level: 3, parentCode: '22' },
    { kscoCode: '224', nameKo: '정보보안 전문가', nameEn: 'Information Security', level: 3, parentCode: '22' },
    { kscoCode: '231', nameKo: '건축·토목공학 기술자', nameEn: 'Civil/Architecture Engineers', level: 3, parentCode: '23' },
    { kscoCode: '232', nameKo: '화학·환경공학 기술자', nameEn: 'Chemical/Environmental Engineers', level: 3, parentCode: '23' },
    { kscoCode: '233', nameKo: '금속·재료공학 기술자', nameEn: 'Materials Engineers', level: 3, parentCode: '23' },
    { kscoCode: '234', nameKo: '전기·전자공학 기술자', nameEn: 'Electrical/Electronics Engineers', level: 3, parentCode: '23' },
    { kscoCode: '235', nameKo: '기계·로봇공학 기술자', nameEn: 'Mechanical/Robotics Engineers', level: 3, parentCode: '23' },
    { kscoCode: '236', nameKo: '산업공학 기술자', nameEn: 'Industrial Engineers', level: 3, parentCode: '23' },
    { kscoCode: '281', nameKo: '디자이너', nameEn: 'Designers', level: 3, parentCode: '28' },
    { kscoCode: '282', nameKo: '작가 및 출판 전문가', nameEn: 'Writers/Publishers', level: 3, parentCode: '28' },
    { kscoCode: '283', nameKo: '학예사, 사서 및 기록물관리사', nameEn: 'Curators/Librarians', level: 3, parentCode: '28' },
    { kscoCode: '284', nameKo: '번역가 및 통역가', nameEn: 'Translators/Interpreters', level: 3, parentCode: '28' },
    { kscoCode: '251', nameKo: '대학교수', nameEn: 'University Professors', level: 3, parentCode: '25' },
    { kscoCode: '252', nameKo: '학교교사', nameEn: 'School Teachers', level: 3, parentCode: '25' },

    // 서비스/기능원 (E-9, H-2 관련)
    { kscoCode: '41', nameKo: '조리사', nameEn: 'Cooks/Chefs', level: 2, parentCode: '4' },
    { kscoCode: '42', nameKo: '미용·예식·의료보조 서비스직', nameEn: 'Beauty/Ceremony/Medical Assist', level: 2, parentCode: '4' },
    { kscoCode: '71', nameKo: '식품가공 관련 기능직', nameEn: 'Food Processing', level: 2, parentCode: '7' },
    { kscoCode: '72', nameKo: '섬유·의복 관련 기능직', nameEn: 'Textile/Clothing', level: 2, parentCode: '7' },
    { kscoCode: '73', nameKo: '금속 성형 관련 기능직', nameEn: 'Metal Forming', level: 2, parentCode: '7' },
    { kscoCode: '74', nameKo: '기계 관련 기능직', nameEn: 'Machinery Craft', level: 2, parentCode: '7' },
    { kscoCode: '75', nameKo: '전기·전자 관련 기능직', nameEn: 'Electrical Craft', level: 2, parentCode: '7' },
    { kscoCode: '76', nameKo: '건설·채굴 관련 기능직', nameEn: 'Construction Craft', level: 2, parentCode: '7' },
    { kscoCode: '81', nameKo: '식품·섬유 기계조작직', nameEn: 'Food/Textile Machine Operators', level: 2, parentCode: '8' },
    { kscoCode: '82', nameKo: '금속·기계 관련 기계조작직', nameEn: 'Metal Machine Operators', level: 2, parentCode: '8' },
    { kscoCode: '83', nameKo: '운전 및 운송 관련직', nameEn: 'Drivers/Transport', level: 2, parentCode: '8' },

    // 단순노무 (F-4 금지 직종)
    { kscoCode: '91', nameKo: '건설·광업 단순종사자', nameEn: 'Construction Elementary', level: 2, parentCode: '9' },
    { kscoCode: '92', nameKo: '운송 관련 단순종사자', nameEn: 'Transport Elementary', level: 2, parentCode: '9' },
    { kscoCode: '93', nameKo: '제조 관련 단순종사자', nameEn: 'Manufacturing Elementary', level: 2, parentCode: '9' },
    { kscoCode: '94', nameKo: '청소 및 경비 관련 단순종사자', nameEn: 'Cleaning/Security Elementary', level: 2, parentCode: '9' },
    { kscoCode: '95', nameKo: '가사·음식·매장 판매 단순종사자', nameEn: 'Domestic/Food Elementary', level: 2, parentCode: '9' },
    { kscoCode: '99', nameKo: '농림어업 및 기타 서비스 단순종사자', nameEn: 'Agriculture Elementary', level: 2, parentCode: '9' },
  ];

  for (const oc of occupationCodes) {
    await prisma.occupationCode.upsert({
      where: { kscoCode: oc.kscoCode },
      update: { nameKo: oc.nameKo, nameEn: oc.nameEn, level: oc.level, parentCode: oc.parentCode },
      create: oc,
    });
  }
  console.log(`[Seed] 직종코드 ${occupationCodes.length}건 입력 완료`);

  // ==========================================
  // 4. 국가 제한 시드
  // ==========================================
  const getVisaId = async (code: string) => {
    const vt = await prisma.visaType.findUnique({ where: { code } });
    return vt?.id;
  };

  // E-9 MOU 17개국
  const e9Id = await getVisaId('E-9');
  if (e9Id) {
    const e9Countries = [
      { code: 'PH', name: '필리핀' }, { code: 'VN', name: '베트남' }, { code: 'TH', name: '태국' },
      { code: 'ID', name: '인도네시아' }, { code: 'LK', name: '스리랑카' }, { code: 'KH', name: '캄보디아' },
      { code: 'MM', name: '미얀마' }, { code: 'NP', name: '네팔' }, { code: 'MN', name: '몽골' },
      { code: 'UZ', name: '우즈베키스탄' }, { code: 'PK', name: '파키스탄' }, { code: 'CN', name: '중국' },
      { code: 'TL', name: '동티모르' }, { code: 'BD', name: '방글라데시' }, { code: 'KG', name: '키르기스스탄' },
      { code: 'LA', name: '라오스' }, { code: 'FJ', name: '피지' },
    ];
    for (const c of e9Countries) {
      await prisma.visaCountryRestriction.upsert({
        where: { visaTypeId_countryCode: { visaTypeId: e9Id, countryCode: c.code } },
        update: { countryNameKo: c.name },
        create: { visaTypeId: e9Id, countryCode: c.code, countryNameKo: c.name, restrictionType: 'MOU_REQUIRED' },
      });
    }
    console.log(`[Seed] E-9 MOU 국가 ${e9Countries.length}건 입력`);
  }

  // H-1 워킹홀리데이 협정국 25개국
  const h1Id = await getVisaId('H-1');
  if (h1Id) {
    const h1Countries = [
      { code: 'AU', name: '호주' }, { code: 'CA', name: '캐나다' }, { code: 'NZ', name: '뉴질랜드' },
      { code: 'JP', name: '일본' }, { code: 'FR', name: '프랑스' }, { code: 'DE', name: '독일' },
      { code: 'GB', name: '영국' }, { code: 'IE', name: '아일랜드' }, { code: 'SE', name: '스웨덴' },
      { code: 'DK', name: '덴마크' }, { code: 'NL', name: '네덜란드' }, { code: 'IT', name: '이탈리아' },
      { code: 'PT', name: '포르투갈' }, { code: 'ES', name: '스페인' }, { code: 'AT', name: '오스트리아' },
      { code: 'CZ', name: '체코' }, { code: 'HU', name: '헝가리' }, { code: 'PL', name: '폴란드' },
      { code: 'CL', name: '칠레' }, { code: 'AR', name: '아르헨티나' }, { code: 'HK', name: '홍콩' },
      { code: 'TW', name: '대만' }, { code: 'IL', name: '이스라엘' }, { code: 'BE', name: '벨기에' },
      { code: 'FI', name: '핀란드' },
    ];
    for (const c of h1Countries) {
      await prisma.visaCountryRestriction.upsert({
        where: { visaTypeId_countryCode: { visaTypeId: h1Id, countryCode: c.code } },
        update: { countryNameKo: c.name },
        create: { visaTypeId: h1Id, countryCode: c.code, countryNameKo: c.name, restrictionType: 'ALLOWED' },
      });
    }
    console.log(`[Seed] H-1 워킹홀리데이 국가 ${h1Countries.length}건 입력`);
  }

  // H-2 방문취업 - 재외동포 (CIS + 중국)
  const h2Id = await getVisaId('H-2');
  if (h2Id) {
    const h2Countries = [
      { code: 'CN', name: '중국' }, { code: 'RU', name: '러시아' },
      { code: 'UZ', name: '우즈베키스탄' }, { code: 'KZ', name: '카자흐스탄' },
      { code: 'KG', name: '키르기스스탄' }, { code: 'UA', name: '우크라이나' },
    ];
    for (const c of h2Countries) {
      await prisma.visaCountryRestriction.upsert({
        where: { visaTypeId_countryCode: { visaTypeId: h2Id, countryCode: c.code } },
        update: { countryNameKo: c.name },
        create: { visaTypeId: h2Id, countryCode: c.code, countryNameKo: c.name, restrictionType: 'ALLOWED', notes: '재외동포 (한국계)' },
      });
    }
    console.log(`[Seed] H-2 재외동포 국가 ${h2Countries.length}건 입력`);
  }

  // E-2 원어민 영어권 국가
  const e2Id = await getVisaId('E-2');
  if (e2Id) {
    const e2Countries = [
      { code: 'US', name: '미국' }, { code: 'GB', name: '영국' }, { code: 'CA', name: '캐나다' },
      { code: 'AU', name: '호주' }, { code: 'NZ', name: '뉴질랜드' }, { code: 'IE', name: '아일랜드' },
      { code: 'ZA', name: '남아프리카공화국' },
    ];
    for (const c of e2Countries) {
      await prisma.visaCountryRestriction.upsert({
        where: { visaTypeId_countryCode: { visaTypeId: e2Id, countryCode: c.code } },
        update: { countryNameKo: c.name },
        create: { visaTypeId: e2Id, countryCode: c.code, countryNameKo: c.name, restrictionType: 'ALLOWED', notes: '영어 원어민 국가' },
      });
    }
    console.log(`[Seed] E-2 영어권 국가 ${e2Countries.length}건 입력`);
  }

  // ==========================================
  // 5. F-2-7 점수제 시드 (120점 만점, 80점 통과)
  // ==========================================
  const f27Id = await getVisaId('F-2-7');
  if (f27Id) {
    const categories = [
      {
        categoryCode: 'AGE', categoryName: '나이', maxScore: 25, sortOrder: 1,
        criteria: [
          { criteriaName: '18~24세', minValue: 18, maxValue: 24, score: 25, sortOrder: 1 },
          { criteriaName: '25~29세', minValue: 25, maxValue: 29, score: 20, sortOrder: 2 },
          { criteriaName: '30~34세', minValue: 30, maxValue: 34, score: 15, sortOrder: 3 },
          { criteriaName: '35~39세', minValue: 35, maxValue: 39, score: 10, sortOrder: 4 },
          { criteriaName: '40~44세', minValue: 40, maxValue: 44, score: 7, sortOrder: 5 },
          { criteriaName: '45세 이상', minValue: 45, maxValue: 999, score: 5, sortOrder: 6 },
        ],
      },
      {
        categoryCode: 'EDUCATION', categoryName: '학력', maxScore: 35, sortOrder: 2,
        criteria: [
          { criteriaName: '박사학위', matchValue: 'DOCTOR', score: 35, sortOrder: 1 },
          { criteriaName: '석사학위', matchValue: 'MASTER', score: 30, sortOrder: 2 },
          { criteriaName: '학사학위', matchValue: 'BACHELOR', score: 25, sortOrder: 3 },
          { criteriaName: '전문학사', matchValue: 'COLLEGE', score: 15, sortOrder: 4 },
          { criteriaName: '고등학교 졸업', matchValue: 'HIGH_SCHOOL', score: 10, sortOrder: 5 },
        ],
      },
      {
        categoryCode: 'KOREAN', categoryName: '한국어능력', maxScore: 20, sortOrder: 3,
        criteria: [
          { criteriaName: 'TOPIK 6급', matchValue: 'TOPIK6', score: 20, sortOrder: 1 },
          { criteriaName: 'TOPIK 5급', matchValue: 'TOPIK5', score: 16, sortOrder: 2 },
          { criteriaName: 'TOPIK 4급', matchValue: 'TOPIK4', score: 12, sortOrder: 3 },
          { criteriaName: 'TOPIK 3급', matchValue: 'TOPIK3', score: 8, sortOrder: 4 },
          { criteriaName: 'TOPIK 2급', matchValue: 'TOPIK2', score: 4, sortOrder: 5 },
          { criteriaName: '사회통합프로그램 5단계', matchValue: 'KIIP5', score: 20, sortOrder: 6 },
          { criteriaName: '사회통합프로그램 4단계', matchValue: 'KIIP4', score: 15, sortOrder: 7 },
          { criteriaName: '사회통합프로그램 3단계', matchValue: 'KIIP3', score: 10, sortOrder: 8 },
        ],
      },
      {
        categoryCode: 'INCOME', categoryName: '소득 (GNI 기준)', maxScore: 25, sortOrder: 4,
        criteria: [
          { criteriaName: 'GNI 300% 이상', minValue: 300, maxValue: 9999, score: 25, sortOrder: 1 },
          { criteriaName: 'GNI 200~300%', minValue: 200, maxValue: 299, score: 20, sortOrder: 2 },
          { criteriaName: 'GNI 150~200%', minValue: 150, maxValue: 199, score: 15, sortOrder: 3 },
          { criteriaName: 'GNI 100~150%', minValue: 100, maxValue: 149, score: 10, sortOrder: 4 },
          { criteriaName: 'GNI 80~100%', minValue: 80, maxValue: 99, score: 5, sortOrder: 5 },
        ],
      },
      {
        categoryCode: 'SOCIAL', categoryName: '사회통합 등 가산점', maxScore: 15, sortOrder: 5,
        criteria: [
          { criteriaName: '자원봉사 (연 20시간 이상)', matchValue: 'VOLUNTEER_20H', score: 2, sortOrder: 1 },
          { criteriaName: '자원봉사 (연 40시간 이상)', matchValue: 'VOLUNTEER_40H', score: 3, sortOrder: 2 },
          { criteriaName: '한국 국적 자녀', matchValue: 'KR_CHILD', score: 5, sortOrder: 3 },
          { criteriaName: '정부 추천', matchValue: 'GOV_RECOMMEND', score: 5, sortOrder: 4 },
          { criteriaName: '한국 내 부동산 소유', matchValue: 'PROPERTY', score: 3, sortOrder: 5 },
          { criteriaName: '한국 내 납세 3년 이상', matchValue: 'TAX_3Y', score: 2, sortOrder: 6 },
          { criteriaName: '범죄경력 없음 확인', matchValue: 'NO_CRIME', score: 1, sortOrder: 7 },
          { criteriaName: '범죄경력 있음 (감점)', matchValue: 'HAS_CRIME', score: -5, sortOrder: 8 },
          { criteriaName: '출입국법 위반 (감점)', matchValue: 'IMMIGRATION_VIOLATION', score: -10, sortOrder: 9 },
        ],
      },
    ];

    for (const cat of categories) {
      const created = await prisma.pointSystemCategory.upsert({
        where: { visaTypeId_categoryCode: { visaTypeId: f27Id, categoryCode: cat.categoryCode } },
        update: { categoryName: cat.categoryName, maxScore: cat.maxScore, sortOrder: cat.sortOrder },
        create: { visaTypeId: f27Id, categoryCode: cat.categoryCode, categoryName: cat.categoryName, maxScore: cat.maxScore, sortOrder: cat.sortOrder },
      });
      for (const cr of cat.criteria) {
        const crData = cr as any;
        await prisma.pointSystemCriteria.upsert({
          where: { id: -1n }, // force create (no unique constraint on criteria)
          update: {},
          create: {
            categoryId: created.id,
            criteriaName: crData.criteriaName,
            minValue: crData.minValue ?? null,
            maxValue: crData.maxValue ?? null,
            matchValue: crData.matchValue ?? null,
            score: crData.score,
            sortOrder: crData.sortOrder,
          },
        });
      }
    }
    console.log('[Seed] F-2-7 점수제 5개 카테고리 입력 완료');
  }

  // ==========================================
  // 6. 비자별 필요 서류 시드
  // ==========================================
  const documentSets: { visaCode: string; docs: { name: string; code: string; required: boolean; condition?: string }[] }[] = [
    {
      visaCode: 'E-9',
      docs: [
        { name: '여권 사본', code: 'PASSPORT_COPY', required: true },
        { name: '비자발급인정서', code: 'VISA_ISSUANCE_CERT', required: true },
        { name: '표준근로계약서', code: 'STANDARD_LABOR_CONTRACT', required: true },
        { name: '건강진단서', code: 'HEALTH_CERTIFICATE', required: true },
        { name: 'EPS-TOPIK 합격증', code: 'EPS_TOPIK', required: true },
        { name: '기능시험 합격증', code: 'SKILL_TEST_CERT', required: false, condition: '해당 업종 기능시험 실시 시' },
        { name: '사업자등록증 사본', code: 'BIZ_REG_COPY', required: true },
        { name: '고용허가서', code: 'EMPLOYMENT_PERMIT', required: true },
      ],
    },
    {
      visaCode: 'E-7',
      docs: [
        { name: '여권 사본', code: 'PASSPORT_COPY', required: true },
        { name: '고용계약서', code: 'EMPLOYMENT_CONTRACT', required: true },
        { name: '학위증명서', code: 'DEGREE_CERT', required: true },
        { name: '경력증명서', code: 'CAREER_CERT', required: false, condition: '경력으로 학위 대체 시' },
        { name: '자격증 사본', code: 'LICENSE_COPY', required: false, condition: '자격증 보유 시' },
        { name: '사업자등록증 사본', code: 'BIZ_REG_COPY', required: true },
        { name: '납세증명서', code: 'TAX_CERT', required: true },
        { name: '중소기업확인서', code: 'SME_CERT', required: false, condition: 'GNI 70% 적용 시' },
      ],
    },
    {
      visaCode: 'F-2-7',
      docs: [
        { name: '여권 사본', code: 'PASSPORT_COPY', required: true },
        { name: '외국인등록증', code: 'ARC', required: true },
        { name: '점수산정표', code: 'POINT_CALC_SHEET', required: true },
        { name: '학위증명서', code: 'DEGREE_CERT', required: true },
        { name: 'TOPIK 성적표', code: 'TOPIK_SCORE', required: false, condition: '한국어능력 점수 산정 시' },
        { name: '사회통합프로그램 이수증', code: 'KIIP_CERT', required: false, condition: '사회통합 점수 산정 시' },
        { name: '소득금액 증명원', code: 'INCOME_CERT', required: true },
        { name: '재직증명서', code: 'EMPLOYMENT_CERT', required: true },
        { name: '범죄경력 증명서', code: 'CRIMINAL_RECORD', required: true },
      ],
    },
    {
      visaCode: 'H-1',
      docs: [
        { name: '여권 사본', code: 'PASSPORT_COPY', required: true },
        { name: '왕복항공권 예약확인서', code: 'FLIGHT_BOOKING', required: true },
        { name: '여행자보험 가입증명', code: 'TRAVEL_INSURANCE', required: true },
        { name: '은행잔고증명 (300만원 이상)', code: 'BANK_STATEMENT', required: true },
        { name: '이력서', code: 'RESUME', required: true },
        { name: '최종학력 증명서', code: 'DEGREE_CERT', required: true },
      ],
    },
    {
      visaCode: 'H-2',
      docs: [
        { name: '여권 사본', code: 'PASSPORT_COPY', required: true },
        { name: '재외동포 증명서류', code: 'OVERSEAS_KOREAN_CERT', required: true },
        { name: '건강진단서', code: 'HEALTH_CERTIFICATE', required: true },
        { name: '가족관계 증명서류', code: 'FAMILY_RELATION_CERT', required: false, condition: '연고 방문 시' },
        { name: '한국어능력 시험성적', code: 'KOREAN_TEST', required: false, condition: '추첨 방문 시' },
      ],
    },
    {
      visaCode: 'D-2',
      docs: [
        { name: '여권 사본', code: 'PASSPORT_COPY', required: true },
        { name: '입학허가서', code: 'ADMISSION_LETTER', required: true },
        { name: '최종학력 증명서', code: 'DEGREE_CERT', required: true },
        { name: '재정능력 증명서', code: 'FINANCIAL_CERT', required: true },
        { name: '시간제취업 확인서', code: 'PARTTIME_WORK_PERMIT', required: false, condition: '아르바이트 시' },
      ],
    },
    {
      visaCode: 'E-2',
      docs: [
        { name: '여권 사본', code: 'PASSPORT_COPY', required: true },
        { name: '학위증명서 (학사 이상)', code: 'DEGREE_CERT', required: true },
        { name: '범죄경력 증명서 (아포스티유)', code: 'CRIMINAL_RECORD_APOSTILLE', required: true },
        { name: '건강진단서', code: 'HEALTH_CERTIFICATE', required: true },
        { name: '고용계약서', code: 'EMPLOYMENT_CONTRACT', required: true },
        { name: '사업자등록증 사본', code: 'BIZ_REG_COPY', required: true },
      ],
    },
    {
      visaCode: 'F-4',
      docs: [
        { name: '여권 사본', code: 'PASSPORT_COPY', required: true },
        { name: '재외동포 입증 서류', code: 'OVERSEAS_KOREAN_CERT', required: true },
        { name: '가족관계 증명', code: 'FAMILY_RELATION_CERT', required: true },
        { name: '범죄경력 증명서', code: 'CRIMINAL_RECORD', required: true },
      ],
    },
    {
      visaCode: 'F-5',
      docs: [
        { name: '여권 사본', code: 'PASSPORT_COPY', required: true },
        { name: '외국인등록증', code: 'ARC', required: true },
        { name: '체류자격별 입증 서류', code: 'VISA_SPECIFIC_DOCS', required: true },
        { name: '소득금액 증명원', code: 'INCOME_CERT', required: true },
        { name: '범죄경력 증명서', code: 'CRIMINAL_RECORD', required: true },
        { name: '한국어능력 증명 (TOPIK/사회통합)', code: 'KOREAN_CERT', required: true },
      ],
    },
  ];

  for (const ds of documentSets) {
    const vtId = await getVisaId(ds.visaCode);
    if (!vtId) continue;
    for (let i = 0; i < ds.docs.length; i++) {
      const doc = ds.docs[i];
      await prisma.visaRequiredDocument.create({
        data: {
          visaTypeId: vtId,
          documentName: doc.name,
          documentCode: doc.code,
          isRequired: doc.required,
          conditionDesc: doc.condition,
          sortOrder: i + 1,
        },
      });
    }
  }
  console.log(`[Seed] 비자별 필요서류 ${documentSets.length}개 비자 입력 완료`);

  // ==========================================
  // 7. 초기 규칙 시드 (기존 유지 + 보강)
  // ==========================================
  const e7Id = await getVisaId('E-7');
  const f4Id = await getVisaId('F-4');
  const d2Id = await getVisaId('D-2');

  if (!e9Id || !h2Id || !e7Id || !f4Id || !d2Id) {
    console.error('[Seed] 비자 유형 ID를 찾을 수 없습니다.');
    return;
  }

  const rules = [
    {
      visaTypeId: e9Id,
      ruleName: 'E-9 제조업 300인 미만 허용',
      ruleDescription: '제조업(C) 300인 미만 사업장에 E-9 비자 외국인 채용 허용',
      priority: 10,
      ruleType: 'ELIGIBILITY' as const,
      conditions: JSON.stringify({ operator: 'AND', clauses: [
        { field: 'ksicCode', op: 'STARTS_WITH', value: '1' },
        { field: 'companySizeType', op: 'IN', value: ['SME', 'STARTUP'] },
      ]}),
      actions: JSON.stringify({ type: 'ELIGIBLE', documents: ['사업자등록증', '고용허가서', '표준근로계약서'], restrictions: [], notes: '제조업 300인 미만 사업장 E-9 허용' }),
      status: 'ACTIVE' as const, effectiveFrom: new Date('2024-01-01'),
    },
    {
      visaTypeId: e9Id,
      ruleName: 'E-9 서비스업 허용 업종',
      ruleDescription: '숙박/음식점업(I) 등 서비스업 E-9 허용 업종',
      priority: 10,
      ruleType: 'ELIGIBILITY' as const,
      conditions: JSON.stringify({ operator: 'AND', clauses: [{ field: 'ksicCode', op: 'STARTS_WITH', value: '55' }] }),
      actions: JSON.stringify({ type: 'ELIGIBLE', documents: ['사업자등록증', '고용허가서', '표준근로계약서'], restrictions: [], notes: '숙박업 E-9 허용' }),
      status: 'ACTIVE' as const, effectiveFrom: new Date('2024-01-01'),
    },
    {
      visaTypeId: e9Id,
      ruleName: 'E-9 외국인 비율 20% 제한',
      ruleDescription: '외국인 직원수가 한국인 직원수의 20%를 초과하면 E-9 채용 불가',
      priority: 5,
      ruleType: 'QUOTA' as const,
      conditions: JSON.stringify({ operator: 'AND', clauses: [
        { field: 'employeeCountForeign', op: 'PERCENTAGE_LTE', of: 'employeeCountKorean', percent: 20 },
      ]}),
      actions: JSON.stringify({ type: 'BLOCKED', reason: '외국인 고용 비율 20% 초과 - 추가 채용 불가', suggestion: '한국인 직원 채용 후 비율 조정 필요' }),
      status: 'ACTIVE' as const, effectiveFrom: new Date('2024-01-01'),
    },
    {
      visaTypeId: e9Id,
      ruleName: 'E-9 건설업 허용',
      ruleDescription: '건설업(F) E-9 허용',
      priority: 10,
      ruleType: 'ELIGIBILITY' as const,
      conditions: JSON.stringify({ operator: 'AND', clauses: [{ field: 'ksicCode', op: 'STARTS_WITH', value: '41' }] }),
      actions: JSON.stringify({ type: 'ELIGIBLE', documents: ['사업자등록증', '고용허가서', '건설업 면허증'], restrictions: [], notes: '건설업 E-9 허용' }),
      status: 'ACTIVE' as const, effectiveFrom: new Date('2024-01-01'),
    },
    {
      visaTypeId: e9Id,
      ruleName: 'E-9 농축산업 허용',
      ruleDescription: '농축산업(A-01) E-9 허용',
      priority: 10,
      ruleType: 'ELIGIBILITY' as const,
      conditions: JSON.stringify({ operator: 'AND', clauses: [{ field: 'ksicCode', op: 'STARTS_WITH', value: '01' }] }),
      actions: JSON.stringify({ type: 'ELIGIBLE', documents: ['사업자등록증', '고용허가서'], restrictions: [], notes: '농축산업 E-9 허용' }),
      status: 'ACTIVE' as const, effectiveFrom: new Date('2024-01-01'),
    },
    {
      visaTypeId: e9Id,
      ruleName: 'E-9 어업 허용',
      ruleDescription: '어업(A-03) E-9 허용',
      priority: 10,
      ruleType: 'ELIGIBILITY' as const,
      conditions: JSON.stringify({ operator: 'AND', clauses: [{ field: 'ksicCode', op: 'STARTS_WITH', value: '03' }] }),
      actions: JSON.stringify({ type: 'ELIGIBLE', documents: ['사업자등록증', '고용허가서'], restrictions: [], notes: '어업 E-9 허용' }),
      status: 'ACTIVE' as const, effectiveFrom: new Date('2024-01-01'),
    },
    {
      visaTypeId: h2Id,
      ruleName: 'H-2 서비스업 허용',
      ruleDescription: '숙박/음식점업 방문취업 허용',
      priority: 10,
      ruleType: 'ELIGIBILITY' as const,
      conditions: JSON.stringify({ operator: 'AND', clauses: [{ field: 'ksicCode', op: 'STARTS_WITH', value: '56' }] }),
      actions: JSON.stringify({ type: 'ELIGIBLE', documents: ['사업자등록증', '특례고용가능확인서'], restrictions: ['재외동포(중국/구소련) 대상'], notes: '음식점업 H-2 허용' }),
      status: 'ACTIVE' as const, effectiveFrom: new Date('2024-01-01'),
    },
    {
      visaTypeId: h2Id,
      ruleName: 'H-2 제조업 허용',
      ruleDescription: '제조업 방문취업 허용 (300인 미만)',
      priority: 10,
      ruleType: 'ELIGIBILITY' as const,
      conditions: JSON.stringify({ operator: 'AND', clauses: [
        { field: 'ksicCode', op: 'STARTS_WITH', value: '1' },
        { field: 'companySizeType', op: 'IN', value: ['SME', 'STARTUP'] },
      ]}),
      actions: JSON.stringify({ type: 'ELIGIBLE', documents: ['사업자등록증', '특례고용가능확인서'], restrictions: ['재외동포(중국/구소련) 대상'], notes: '제조업 H-2 허용' }),
      status: 'ACTIVE' as const, effectiveFrom: new Date('2024-01-01'),
    },
    {
      visaTypeId: h2Id,
      ruleName: 'H-2 건설업 허용',
      ruleDescription: '건설업 방문취업 허용',
      priority: 10,
      ruleType: 'ELIGIBILITY' as const,
      conditions: JSON.stringify({ operator: 'AND', clauses: [{ field: 'ksicCode', op: 'STARTS_WITH', value: '41' }] }),
      actions: JSON.stringify({ type: 'ELIGIBLE', documents: ['사업자등록증', '특례고용가능확인서'], restrictions: ['재외동포 대상'], notes: '건설업 H-2 허용' }),
      status: 'ACTIVE' as const, effectiveFrom: new Date('2024-01-01'),
    },
    {
      visaTypeId: e7Id,
      ruleName: 'E-7 임금 요건 (GNI 80%)',
      ruleDescription: 'E-7 비자 발급 시 1인당 GNI 80% 이상 급여 필요 (약 290만원/월)',
      priority: 10,
      ruleType: 'ELIGIBILITY' as const,
      conditions: JSON.stringify({ operator: 'AND', clauses: [{ field: 'offeredSalary', op: 'GTE', value: 290 }] }),
      actions: JSON.stringify({ type: 'ELIGIBLE', documents: ['사업자등록증', '고용계약서', '학력/경력 증명서'], restrictions: ['학사학위 이상 또는 관련 경력 5년'], notes: 'E-7 전문인력 채용 가능 (GNI 80% 충족)' }),
      status: 'ACTIVE' as const, effectiveFrom: new Date('2024-01-01'),
    },
    {
      visaTypeId: e7Id,
      ruleName: 'E-7 중소/벤처 임금 완화 (GNI 70%)',
      ruleDescription: '중소기업/스타트업은 GNI 70% 이상으로 완화 (약 250만원/월)',
      priority: 8,
      ruleType: 'ELIGIBILITY' as const,
      conditions: JSON.stringify({ operator: 'AND', clauses: [
        { field: 'companySizeType', op: 'IN', value: ['SME', 'STARTUP'] },
        { field: 'offeredSalary', op: 'GTE', value: 250 },
      ]}),
      actions: JSON.stringify({ type: 'ELIGIBLE', documents: ['사업자등록증', '고용계약서', '학력/경력 증명서', '중소기업확인서 또는 벤처기업확인서'], restrictions: ['학사학위 이상 또는 관련 경력 3년'], notes: 'E-7 중소/벤처 완화 적용 (GNI 70%)' }),
      status: 'ACTIVE' as const, effectiveFrom: new Date('2024-01-01'),
    },
    {
      visaTypeId: f4Id,
      ruleName: 'F-4 단순노무 취업 제한',
      ruleDescription: '재외동포(F-4)는 단순노무 분야 취업 제한',
      priority: 5,
      ruleType: 'RESTRICTION' as const,
      conditions: JSON.stringify({ operator: 'AND', clauses: [{ field: 'ksicCode', op: 'STARTS_WITH', value: '75' }] }),
      actions: JSON.stringify({ type: 'BLOCKED', reason: 'F-4 비자 소지자는 청소/경비 등 단순노무 취업 제한', suggestion: 'H-2(방문취업) 또는 E-9(비전문취업) 비자 소지자 채용 검토' }),
      status: 'ACTIVE' as const, effectiveFrom: new Date('2024-01-01'),
    },
    {
      visaTypeId: d2Id,
      ruleName: 'D-2 시간제 취업 허용',
      ruleDescription: '유학비자 학기 중 주 20시간 이내 시간제 취업 허용',
      priority: 10,
      ruleType: 'ELIGIBILITY' as const,
      conditions: JSON.stringify({ operator: 'AND', clauses: [
        { field: 'jobType', op: 'EQ', value: 'PART_TIME' },
      ]}),
      actions: JSON.stringify({ type: 'ELIGIBLE', documents: ['시간제취업 허가서', '재학증명서'], restrictions: ['주 20시간 이내', '유흥업소 불가', '학기 중 풀타임 불가'], notes: 'D-2 유학비자 시간제 취업 가능' }),
      status: 'ACTIVE' as const, effectiveFrom: new Date('2024-01-01'),
    },
  ];

  for (const rule of rules) {
    const existing = await prisma.visaRule.findFirst({ where: { ruleName: rule.ruleName } });
    if (!existing) {
      await prisma.visaRule.create({ data: rule });
    }
  }
  console.log(`[Seed] 규칙 ${rules.length}건 입력 완료`);

  console.log('[Seed] 비자 알고리즘 종합 시드 데이터 입력 완료!');
}

main()
  .catch((e) => {
    console.error('[Seed] 에러:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
