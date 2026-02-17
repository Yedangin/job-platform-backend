import { PrismaClient } from '../../generated/prisma-user';

const prisma = new PrismaClient();

async function main() {
  console.log('[Seed] 비자 알고리즘 종합 시드 데이터 입력 시작...');

  // ==========================================
  // 1. 비자 유형 시드 (31개 + 하위유형)
  // ==========================================
  const visaTypes = [
    // === A 시리즈: 외교/공무 (취업불가) / A-series: Diplomatic (no employment) ===
    { code: 'A-1', nameKo: '외교', nameEn: 'Diplomat', category: 'VISIT', employmentLevel: 'PROHIBITED' as const, description: '외교관 및 그 가족', visaGroup: 'diplomatic', workType: 'prohibited' },
    { code: 'A-2', nameKo: '공무', nameEn: 'Government Official', category: 'VISIT', employmentLevel: 'PROHIBITED' as const, description: '공무 수행 외국인', visaGroup: 'diplomatic', workType: 'prohibited' },
    { code: 'A-3', nameKo: '협정', nameEn: 'Agreement', category: 'VISIT', employmentLevel: 'PROHIBITED' as const, description: '국제협정에 의한 체류', visaGroup: 'diplomatic', workType: 'prohibited' },

    // === B 시리즈: 관광/통과 (취업불가) / B-series: Tourist/Transit (no employment) ===
    { code: 'B-1', nameKo: '사증면제', nameEn: 'Visa Exemption', category: 'VISIT', employmentLevel: 'PROHIBITED' as const, description: '사증면제 협정국 국민', visaGroup: 'tourist', workType: 'prohibited' },
    { code: 'B-2', nameKo: '관광통과', nameEn: 'Tourist/Transit', category: 'VISIT', employmentLevel: 'PROHIBITED' as const, description: '관광, 통과 목적', visaGroup: 'tourist', workType: 'prohibited' },

    // === C 시리즈: 단기 / C-series: Short-term ===
    { code: 'C-1', nameKo: '일시취재', nameEn: 'Temporary Press', category: 'VISIT', employmentLevel: 'PROHIBITED' as const, description: '일시적 취재 활동', visaGroup: 'short_term', workType: 'prohibited' },
    { code: 'C-3', nameKo: '단기방문', nameEn: 'Short-term Visit', category: 'VISIT', employmentLevel: 'PROHIBITED' as const, description: '시장조사, 관광 등 단기방문', maxStayMonths: 3, visaGroup: 'short_term', workType: 'prohibited' },
    { code: 'C-4', nameKo: '단기취업', nameEn: 'Short-term Employment', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: '90일 이내 단기 취업(공연/모델/강연)', maxStayMonths: 3, visaGroup: 'short_term', workType: 'specific_activity', permitType: null, permitDurationMonths: 3 },

    // === D 시리즈: 유학/연수 / D-series: Study/Training ===
    { code: 'D-1', nameKo: '문화예술', nameEn: 'Culture/Arts', category: 'STUDY', employmentLevel: 'PROHIBITED' as const, description: '문화예술 활동', visaGroup: 'study', workType: 'special_permit', permitType: '체류자격외활동허가' },
    { code: 'D-2', nameKo: '유학', nameEn: 'Study Abroad', category: 'STUDY', employmentLevel: 'PART_TIME' as const, description: '전문대학 이상 유학', maxWorkHoursWeekly: 25, maxStayMonths: 24, visaGroup: 'study', workType: 'part_time_permit_required', permitType: '체류자격외활동허가', baseWeeklyHours: 25, weekendHolidayRule: 'unlimited', vacationRule: 'unlimited', maxWorkplaces: 2, permitDurationMonths: 12 },
    { code: 'D-2-1', nameKo: '전문학사', nameEn: 'Associate Degree', category: 'STUDY', parentCode: 'D-2', subTypeCode: '1', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 25, visaGroup: 'study', workType: 'part_time_permit_required', baseWeeklyHours: 25, weekendHolidayRule: 'unlimited', vacationRule: 'unlimited' },
    { code: 'D-2-2', nameKo: '학사', nameEn: 'Bachelor Degree', category: 'STUDY', parentCode: 'D-2', subTypeCode: '2', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 25, visaGroup: 'study', workType: 'part_time_permit_required', baseWeeklyHours: 25, weekendHolidayRule: 'unlimited', vacationRule: 'unlimited' },
    { code: 'D-2-3', nameKo: '석사', nameEn: 'Master Degree', category: 'STUDY', parentCode: 'D-2', subTypeCode: '3', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 30, visaGroup: 'study', workType: 'part_time_permit_required', baseWeeklyHours: 30, weekendHolidayRule: 'unlimited', vacationRule: 'unlimited' },
    { code: 'D-2-4', nameKo: '박사', nameEn: 'Doctoral Degree', category: 'STUDY', parentCode: 'D-2', subTypeCode: '4', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 30, visaGroup: 'study', workType: 'part_time_permit_required', baseWeeklyHours: 30, weekendHolidayRule: 'unlimited', vacationRule: 'unlimited' },
    { code: 'D-2-5', nameKo: '연구유학', nameEn: 'Research Student', category: 'STUDY', parentCode: 'D-2', subTypeCode: '5', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 30, visaGroup: 'study', workType: 'part_time_permit_required', baseWeeklyHours: 30 },
    { code: 'D-2-6', nameKo: '교환학생', nameEn: 'Exchange Student', category: 'STUDY', parentCode: 'D-2', subTypeCode: '6', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 25, visaGroup: 'study', workType: 'part_time_permit_required', baseWeeklyHours: 25 },
    { code: 'D-2-7', nameKo: '어학연수(D-2)', nameEn: 'Language Training (D-2)', category: 'STUDY', parentCode: 'D-2', subTypeCode: '7', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 25, visaGroup: 'study', workType: 'part_time_permit_required', baseWeeklyHours: 25 },
    { code: 'D-2-8', nameKo: '단기유학', nameEn: 'Short-term Study', category: 'STUDY', parentCode: 'D-2', subTypeCode: '8', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 25, visaGroup: 'study', workType: 'part_time_permit_required', baseWeeklyHours: 25 },
    { code: 'D-3', nameKo: '기술연수', nameEn: 'Technical Training', category: 'STUDY', employmentLevel: 'PROHIBITED' as const, description: '산업체 기술연수', visaGroup: 'study', workType: 'prohibited' },
    { code: 'D-4', nameKo: '일반연수', nameEn: 'General Training', category: 'STUDY', employmentLevel: 'PART_TIME' as const, description: '어학연수, 기술연수 등', maxWorkHoursWeekly: 20, visaGroup: 'study', workType: 'part_time_permit_required', permitType: '체류자격외활동허가', baseWeeklyHours: 20, weekendHolidayRule: 'same_as_weekday', vacationRule: 'same_as_weekday', maxWorkplaces: 1, permitDurationMonths: 12 },
    { code: 'D-4-1', nameKo: '어학연수', nameEn: 'Language Training', category: 'STUDY', parentCode: 'D-4', subTypeCode: '1', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 20, visaGroup: 'study', workType: 'part_time_permit_required', baseWeeklyHours: 20 },
    { code: 'D-4-7', nameKo: '외국어연수', nameEn: 'Foreign Language Course', category: 'STUDY', parentCode: 'D-4', subTypeCode: '7', employmentLevel: 'PART_TIME' as const, maxWorkHoursWeekly: 20, visaGroup: 'study', workType: 'part_time_permit_required', baseWeeklyHours: 20 },
    { code: 'D-10', nameKo: '구직', nameEn: 'Job Seeking', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: 'E-7 전환 대상 구직활동', maxStayMonths: 6, visaGroup: 'job_seeking', workType: 'part_time_permit_required', permitType: '체류자격외활동허가', baseWeeklyHours: 20, weekendHolidayRule: 'unlimited', vacationRule: 'unlimited', permitDurationMonths: 6 },

    // === E 시리즈: 취업 / E-series: Employment (core matching target) ===
    { code: 'E-1', nameKo: '교수', nameEn: 'Professor', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: '전문대학 이상 교수/강사', visaGroup: 'professional', workType: 'employer_specific' },
    { code: 'E-2', nameKo: '회화지도', nameEn: 'Foreign Language Instructor', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: '외국어 회화 지도', visaGroup: 'professional', workType: 'employer_specific' },
    { code: 'E-2-1', nameKo: '외국어회화 강사', nameEn: 'Conversation Instructor', category: 'WORK', parentCode: 'E-2', subTypeCode: '1', employmentLevel: 'CONDITIONAL' as const, visaGroup: 'professional', workType: 'employer_specific' },
    { code: 'E-2-2', nameKo: '외국어보조교사', nameEn: 'Teaching Assistant', category: 'WORK', parentCode: 'E-2', subTypeCode: '2', employmentLevel: 'CONDITIONAL' as const, visaGroup: 'professional', workType: 'employer_specific' },
    { code: 'E-3', nameKo: '연구', nameEn: 'Research', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: '자연과학/산업기술 분야 연구', visaGroup: 'professional', workType: 'employer_specific' },
    { code: 'E-4', nameKo: '기술지도', nameEn: 'Technology Transfer', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: '자연과학 기술지도', visaGroup: 'professional', workType: 'employer_specific' },
    { code: 'E-5', nameKo: '전문직업', nameEn: 'Professional Employment', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: '법률, 회계, 의료 등 전문직', visaGroup: 'professional', workType: 'employer_specific' },
    { code: 'E-6', nameKo: '예술흥행', nameEn: 'Arts/Entertainment', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: '예술/연예/체육 활동', visaGroup: 'professional', workType: 'employer_specific' },
    { code: 'E-6-1', nameKo: '예술활동', nameEn: 'Arts Activities', category: 'WORK', parentCode: 'E-6', subTypeCode: '1', employmentLevel: 'CONDITIONAL' as const, visaGroup: 'professional', workType: 'employer_specific' },
    { code: 'E-6-2', nameKo: '흥행활동', nameEn: 'Entertainment Activities', category: 'WORK', parentCode: 'E-6', subTypeCode: '2', employmentLevel: 'CONDITIONAL' as const, visaGroup: 'professional', workType: 'employer_specific' },
    { code: 'E-6-3', nameKo: '운동선수', nameEn: 'Professional Athlete', category: 'WORK', parentCode: 'E-6', subTypeCode: '3', employmentLevel: 'CONDITIONAL' as const, visaGroup: 'professional', workType: 'employer_specific' },
    { code: 'E-7', nameKo: '특정활동', nameEn: 'Specially Designated Activities', category: 'WORK', employmentLevel: 'CONDITIONAL' as const, description: '전문인력 취업 (IT, 엔지니어, 교수 등)', visaGroup: 'professional', workType: 'employer_specific', metadata: JSON.stringify({ gniThresholds: { standard: 290, sme: 250 }, minExperience: { standard: 5, sme: 3 } }) },
    { code: 'E-7-1', nameKo: '전문인력', nameEn: 'Professional Worker', category: 'WORK', parentCode: 'E-7', subTypeCode: '1', employmentLevel: 'CONDITIONAL' as const, description: '학사이상 전문인력', visaGroup: 'professional', workType: 'employer_specific' },
    { code: 'E-7-2', nameKo: '준전문인력', nameEn: 'Semi-Professional Worker', category: 'WORK', parentCode: 'E-7', subTypeCode: '2', employmentLevel: 'CONDITIONAL' as const, description: '전문학사/기능사 자격', visaGroup: 'professional', workType: 'employer_specific' },
    { code: 'E-7-3', nameKo: '숙련기능인력', nameEn: 'Skilled Worker', category: 'WORK', parentCode: 'E-7', subTypeCode: '3', employmentLevel: 'CONDITIONAL' as const, description: 'E-9/H-2 경력자 숙련공 전환', visaGroup: 'professional', workType: 'employer_specific' },
    { code: 'E-7-4', nameKo: '점수제 숙련기능인력', nameEn: 'Point-based Skilled Worker', category: 'WORK', parentCode: 'E-7', subTypeCode: '4', employmentLevel: 'CONDITIONAL' as const, description: '점수제 숙련기능 외국인력', visaGroup: 'professional', workType: 'employer_specific' },
    { code: 'E-8', nameKo: '계절근로', nameEn: 'Seasonal Worker', category: 'WORK', employmentLevel: 'LIMITED' as const, description: '농축산업/어업 계절근로', maxStayMonths: 5, visaGroup: 'non_skilled', workType: 'employment_permit', permitType: '고용허가' },
    { code: 'E-9', nameKo: '비전문취업', nameEn: 'Non-Professional Employment', category: 'WORK', employmentLevel: 'LIMITED' as const, description: '단순기능 외국인력 (제조업, 농축산업, 어업, 건설업, 서비스업)', maxStayMonths: 58, renewalPossible: true, visaGroup: 'non_skilled', workType: 'employment_permit', permitType: '고용허가' },
    { code: 'E-9-1', nameKo: '제조업', nameEn: 'Manufacturing', category: 'WORK', parentCode: 'E-9', subTypeCode: '1', employmentLevel: 'LIMITED' as const, visaGroup: 'non_skilled', workType: 'employment_permit' },
    { code: 'E-9-2', nameKo: '건설업', nameEn: 'Construction', category: 'WORK', parentCode: 'E-9', subTypeCode: '2', employmentLevel: 'LIMITED' as const, visaGroup: 'non_skilled', workType: 'employment_permit' },
    { code: 'E-9-3', nameKo: '농축산업', nameEn: 'Agriculture/Livestock', category: 'WORK', parentCode: 'E-9', subTypeCode: '3', employmentLevel: 'LIMITED' as const, visaGroup: 'non_skilled', workType: 'employment_permit' },
    { code: 'E-9-4', nameKo: '어업', nameEn: 'Fishing', category: 'WORK', parentCode: 'E-9', subTypeCode: '4', employmentLevel: 'LIMITED' as const, visaGroup: 'non_skilled', workType: 'employment_permit' },
    { code: 'E-9-5', nameKo: '서비스업', nameEn: 'Service', category: 'WORK', parentCode: 'E-9', subTypeCode: '5', employmentLevel: 'LIMITED' as const, visaGroup: 'non_skilled', workType: 'employment_permit' },
    { code: 'E-10', nameKo: '선원취업', nameEn: 'Crew Employment', category: 'WORK', employmentLevel: 'LIMITED' as const, description: '선원으로 취업하는 외국인', visaGroup: 'non_skilled', workType: 'employment_permit', permitType: '고용허가' },
    { code: 'E-10-1', nameKo: '내항선원', nameEn: 'Domestic Crew', category: 'WORK', parentCode: 'E-10', subTypeCode: '1', employmentLevel: 'LIMITED' as const, visaGroup: 'non_skilled', workType: 'employment_permit' },
    { code: 'E-10-2', nameKo: '외항선원', nameEn: 'Ocean-going Crew', category: 'WORK', parentCode: 'E-10', subTypeCode: '2', employmentLevel: 'LIMITED' as const, visaGroup: 'non_skilled', workType: 'employment_permit' },

    // === F 시리즈: 거주 / F-series: Residence ===
    { code: 'F-1', nameKo: '방문동거', nameEn: 'Family Visit', category: 'RESIDENCE', employmentLevel: 'PROHIBITED' as const, description: '친척 방문 동거 (취업불가, 체류자격외활동허가 시 가능)', visaGroup: 'family', workType: 'special_permit', permitType: '체류자격외활동허가' },
    { code: 'F-2', nameKo: '거주', nameEn: 'Residence', category: 'RESIDENCE', employmentLevel: 'FULL' as const, description: '장기체류 거주비자', visaGroup: 'residence', workType: 'unrestricted' },
    { code: 'F-2-1', nameKo: '국민배우자(거주)', nameEn: 'Spouse of Citizen (Residence)', category: 'RESIDENCE', parentCode: 'F-2', subTypeCode: '1', employmentLevel: 'FULL' as const, visaGroup: 'residence', workType: 'unrestricted' },
    { code: 'F-2-7', nameKo: '점수제 거주', nameEn: 'Points-based Residence', category: 'RESIDENCE', parentCode: 'F-2', subTypeCode: '7', employmentLevel: 'FULL' as const, description: '점수제 거주비자 (120점 중 80점 이상)', metadata: JSON.stringify({ requiredScore: 80, totalScore: 120 }), visaGroup: 'residence', workType: 'unrestricted' },
    { code: 'F-2-99', nameKo: '기타 거주', nameEn: 'Other Residence', category: 'RESIDENCE', parentCode: 'F-2', subTypeCode: '99', employmentLevel: 'FULL' as const, visaGroup: 'residence', workType: 'unrestricted' },
    { code: 'F-3', nameKo: '동반', nameEn: 'Dependent', category: 'RESIDENCE', employmentLevel: 'PROHIBITED' as const, description: '주재원 가족 등 동반 체류', visaGroup: 'family', workType: 'special_permit', permitType: '체류자격외활동허가' },
    { code: 'F-4', nameKo: '재외동포', nameEn: 'Overseas Korean', category: 'RESIDENCE', employmentLevel: 'LIMITED' as const, description: '재외동포 체류자격 (단순노무 제한)', visaGroup: 'ethnic_korean', workType: 'restricted_occupation' },
    { code: 'F-5', nameKo: '영주', nameEn: 'Permanent Residence', category: 'RESIDENCE', employmentLevel: 'FULL' as const, description: '영주권', visaGroup: 'residence', workType: 'unrestricted' },
    { code: 'F-5-1', nameKo: '일반영주', nameEn: 'General PR', category: 'RESIDENCE', parentCode: 'F-5', subTypeCode: '1', employmentLevel: 'FULL' as const, visaGroup: 'residence', workType: 'unrestricted' },
    { code: 'F-5-2', nameKo: '투자영주', nameEn: 'Investment PR', category: 'RESIDENCE', parentCode: 'F-5', subTypeCode: '2', employmentLevel: 'FULL' as const, visaGroup: 'residence', workType: 'unrestricted' },
    { code: 'F-5-3', nameKo: '국민배우자영주', nameEn: 'Spouse of Citizen PR', category: 'RESIDENCE', parentCode: 'F-5', subTypeCode: '3', employmentLevel: 'FULL' as const, visaGroup: 'residence', workType: 'unrestricted' },
    { code: 'F-5-6', nameKo: '고액투자영주', nameEn: 'High Investment PR', category: 'RESIDENCE', parentCode: 'F-5', subTypeCode: '6', employmentLevel: 'FULL' as const, visaGroup: 'residence', workType: 'unrestricted' },
    { code: 'F-5-11', nameKo: '점수제영주', nameEn: 'Points-based PR', category: 'RESIDENCE', parentCode: 'F-5', subTypeCode: '11', employmentLevel: 'FULL' as const, visaGroup: 'residence', workType: 'unrestricted' },
    { code: 'F-5-16', nameKo: '숙련기능영주', nameEn: 'Skilled Worker PR', category: 'RESIDENCE', parentCode: 'F-5', subTypeCode: '16', employmentLevel: 'FULL' as const, visaGroup: 'residence', workType: 'unrestricted' },
    { code: 'F-6', nameKo: '결혼이민', nameEn: 'Marriage Migration', category: 'RESIDENCE', employmentLevel: 'FULL' as const, description: '한국인 배우자', visaGroup: 'residence', workType: 'unrestricted' },

    // === H 시리즈: 방문취업/워킹홀리데이 / H-series: Working Visit/Holiday ===
    { code: 'H-1', nameKo: '관광취업', nameEn: 'Working Holiday', category: 'WORK', employmentLevel: 'FULL' as const, description: '워킹홀리데이 (협정국 청년)', maxStayMonths: 12, minAge: 18, maxAge: 30, visaGroup: 'working_holiday', workType: 'limited_hours', baseWeeklyHours: 25, permitDurationMonths: 12 },
    { code: 'H-2', nameKo: '방문취업', nameEn: 'Working Visit', category: 'WORK', employmentLevel: 'LIMITED' as const, description: '재외동포 방문취업 (허용업종 제한)', maxStayMonths: 58, renewalPossible: true, visaGroup: 'ethnic_korean', workType: 'negative_list' },
    { code: 'H-2-1', nameKo: '연고방문', nameEn: 'Family Visit Work', category: 'WORK', parentCode: 'H-2', subTypeCode: '1', employmentLevel: 'LIMITED' as const, visaGroup: 'ethnic_korean', workType: 'negative_list' },
    { code: 'H-2-5', nameKo: '추첨방문', nameEn: 'Lottery Visit Work', category: 'WORK', parentCode: 'H-2', subTypeCode: '5', employmentLevel: 'LIMITED' as const, visaGroup: 'ethnic_korean', workType: 'negative_list' },
    { code: 'H-2-7', nameKo: '자진출국방문', nameEn: 'Voluntary Departure Work', category: 'WORK', parentCode: 'H-2', subTypeCode: '7', employmentLevel: 'LIMITED' as const, visaGroup: 'ethnic_korean', workType: 'negative_list' },
  ];

  for (const vt of visaTypes) {
    // 새 필드 포함 upsert / Upsert with new fields
    const vtData = vt as any;
    await prisma.visaType.upsert({
      where: { code: vt.code },
      update: {
        nameKo: vt.nameKo, nameEn: vt.nameEn, category: vt.category,
        description: vt.description, employmentLevel: vt.employmentLevel,
        parentCode: vtData.parentCode, subTypeCode: vtData.subTypeCode,
        maxWorkHoursWeekly: vtData.maxWorkHoursWeekly, maxStayMonths: vtData.maxStayMonths,
        renewalPossible: vtData.renewalPossible, minAge: vtData.minAge, maxAge: vtData.maxAge,
        metadata: vtData.metadata,
        // 새 필드 / New fields
        visaGroup: vtData.visaGroup ?? null,
        workType: vtData.workType ?? null,
        permitType: vtData.permitType ?? null,
        baseWeeklyHours: vtData.baseWeeklyHours ?? null,
        weekendHolidayRule: vtData.weekendHolidayRule ?? null,
        vacationRule: vtData.vacationRule ?? null,
        maxWorkplaces: vtData.maxWorkplaces ?? null,
        permitDurationMonths: vtData.permitDurationMonths ?? null,
      },
      create: {
        code: vt.code, nameKo: vt.nameKo, nameEn: vt.nameEn, category: vt.category,
        description: vt.description, employmentLevel: vt.employmentLevel ?? 'PROHIBITED',
        parentCode: vtData.parentCode, subTypeCode: vtData.subTypeCode,
        maxWorkHoursWeekly: vtData.maxWorkHoursWeekly, maxStayMonths: vtData.maxStayMonths,
        renewalPossible: vtData.renewalPossible ?? false, minAge: vtData.minAge, maxAge: vtData.maxAge,
        metadata: vtData.metadata,
        // 새 필드 / New fields
        visaGroup: vtData.visaGroup ?? null,
        workType: vtData.workType ?? null,
        permitType: vtData.permitType ?? null,
        baseWeeklyHours: vtData.baseWeeklyHours ?? null,
        weekendHolidayRule: vtData.weekendHolidayRule ?? null,
        vacationRule: vtData.vacationRule ?? null,
        maxWorkplaces: vtData.maxWorkplaces ?? null,
        permitDurationMonths: vtData.permitDurationMonths ?? null,
      },
    });
  }
  console.log(`[Seed] 비자 유형 ${visaTypes.length}건 입력 완료`);

  // ==========================================
  // 2. KSIC 업종코드 시드 (주요 업종)
  // ==========================================
  // 업종 플래그 설명 / Industry flag descriptions:
  // isSimpleLabor: 단순노무 업종 (F-4 금지 대상) / Simple labor (blocked for F-4)
  // isEntertainment: 유흥업소 (대부분 비자 금지) / Entertainment venue (blocked for most visas)
  // isGambling: 도박/사행성 업종 / Gambling industry
  // isGigWork: 플랫폼/긱 노동 / Platform/gig work
  // requiresSafetyTraining: 안전교육 필수 업종 / Safety training required industry
  // platformTag: 산업분류 태그 / Industry classification tag
  const industryCodes = [
    // 농업 (A) — 안전교육 필수 / Agriculture - safety training required
    { ksicCode: '01', sectionCode: 'A', nameKo: '농업', level: 2, requiresSafetyTraining: true, platformTag: 'agriculture' },
    { ksicCode: '02', sectionCode: 'A', nameKo: '임업', level: 2, requiresSafetyTraining: true, platformTag: 'agriculture' },
    { ksicCode: '03', sectionCode: 'A', nameKo: '어업', level: 2, requiresSafetyTraining: true, platformTag: 'fishing' },
    // 광업 (B) — 안전교육 필수 / Mining - safety training required
    { ksicCode: '07', sectionCode: 'B', nameKo: '금속 광업', level: 2, requiresSafetyTraining: true, platformTag: 'mining' },
    { ksicCode: '08', sectionCode: 'B', nameKo: '비금속광물 광업', level: 2, requiresSafetyTraining: true, platformTag: 'mining' },
    // 제조업 (C) — 안전교육 필수 / Manufacturing - safety training required
    { ksicCode: '10', sectionCode: 'C', nameKo: '식료품 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '13', sectionCode: 'C', nameKo: '섬유제품 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '14', sectionCode: 'C', nameKo: '의복, 의복액세서리 및 모피제품 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '15', sectionCode: 'C', nameKo: '가죽, 가방 및 신발 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '17', sectionCode: 'C', nameKo: '펄프, 종이 및 종이제품 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '20', sectionCode: 'C', nameKo: '화학물질 및 화학제품 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '22', sectionCode: 'C', nameKo: '고무 및 플라스틱제품 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '23', sectionCode: 'C', nameKo: '비금속 광물제품 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '24', sectionCode: 'C', nameKo: '1차 금속 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '25', sectionCode: 'C', nameKo: '금속가공제품 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '26', sectionCode: 'C', nameKo: '전자부품, 컴퓨터, 영상, 음향 및 통신장비 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '27', sectionCode: 'C', nameKo: '의료, 정밀, 광학기기 및 시계 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '28', sectionCode: 'C', nameKo: '전기장비 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '29', sectionCode: 'C', nameKo: '기타 기계 및 장비 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '30', sectionCode: 'C', nameKo: '자동차 및 트레일러 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '31', sectionCode: 'C', nameKo: '기타 운송장비 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '32', sectionCode: 'C', nameKo: '가구 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    { ksicCode: '33', sectionCode: 'C', nameKo: '기타 제품 제조업', level: 2, requiresSafetyTraining: true, platformTag: 'manufacturing' },
    // 전기/가스 (D)
    { ksicCode: '35', sectionCode: 'D', nameKo: '전기, 가스, 증기 및 공기조절 공급업', level: 2, requiresSafetyTraining: true, platformTag: 'utility' },
    // 수도/하수/폐기물 (E) — 안전교육 필수 / Waste - safety training required
    { ksicCode: '37', sectionCode: 'E', nameKo: '하수, 폐수 및 분뇨 처리업', level: 2, requiresSafetyTraining: true, platformTag: 'waste' },
    { ksicCode: '38', sectionCode: 'E', nameKo: '폐기물 수집, 운반, 처리 및 원료 재생업', level: 2, requiresSafetyTraining: true, platformTag: 'waste' },
    // 건설업 (F) — 안전교육 필수 / Construction - safety training required
    { ksicCode: '41', sectionCode: 'F', nameKo: '종합 건설업', level: 2, requiresSafetyTraining: true, platformTag: 'construction' },
    { ksicCode: '42', sectionCode: 'F', nameKo: '전문직별 공사업', level: 2, requiresSafetyTraining: true, platformTag: 'construction' },
    // 도소매업 (G)
    { ksicCode: '45', sectionCode: 'G', nameKo: '자동차 및 부품 판매업', level: 2, platformTag: 'retail' },
    { ksicCode: '46', sectionCode: 'G', nameKo: '도매 및 상품 중개업', level: 2, platformTag: 'retail' },
    { ksicCode: '47', sectionCode: 'G', nameKo: '소매업', level: 2, platformTag: 'retail' },
    // 운수/창고업 (H)
    { ksicCode: '49', sectionCode: 'H', nameKo: '육상 운송 및 파이프라인 운송업', level: 2, platformTag: 'logistics' },
    { ksicCode: '50', sectionCode: 'H', nameKo: '수상 운송업', level: 2, platformTag: 'logistics' },
    { ksicCode: '52', sectionCode: 'H', nameKo: '창고 및 운송관련 서비스업', level: 2, platformTag: 'logistics' },
    // 숙박/음식점업 (I)
    { ksicCode: '55', sectionCode: 'I', nameKo: '숙박업', level: 2, platformTag: 'hospitality' },
    { ksicCode: '56', sectionCode: 'I', nameKo: '음식점 및 주점업', level: 2, platformTag: 'food_service' },
    { ksicCode: '5611', sectionCode: 'I', nameKo: '한식 음식점업', level: 4, parentCode: '56', platformTag: 'food_service' },
    { ksicCode: '5612', sectionCode: 'I', nameKo: '외국식 음식점업', level: 4, parentCode: '56', platformTag: 'food_service' },
    { ksicCode: '5619', sectionCode: 'I', nameKo: '기타 간이 음식점업', level: 4, parentCode: '56', platformTag: 'food_service' },
    { ksicCode: '56211', sectionCode: 'I', nameKo: '커피 전문점', level: 5, parentCode: '5621', platformTag: 'food_service' },
    // 주점업 — 유흥업소 / Bar/pub - entertainment venue (blocked for E-9, D-2 etc)
    { ksicCode: '56221', sectionCode: 'I', nameKo: '주점업', level: 5, parentCode: '5622', isEntertainment: true, platformTag: 'entertainment' },
    // 정보통신업 (J)
    { ksicCode: '58', sectionCode: 'J', nameKo: '출판업', level: 2, platformTag: 'it' },
    { ksicCode: '59', sectionCode: 'J', nameKo: '영상·오디오 기록물 제작 및 배급업', level: 2, platformTag: 'media' },
    { ksicCode: '61', sectionCode: 'J', nameKo: '통신업', level: 2, platformTag: 'it' },
    { ksicCode: '62', sectionCode: 'J', nameKo: '컴퓨터 프로그래밍, 시스템 통합 및 관리업', level: 2, platformTag: 'it' },
    { ksicCode: '62010', sectionCode: 'J', nameKo: '컴퓨터 프로그래밍 서비스업', level: 5, parentCode: '62', platformTag: 'it' },
    { ksicCode: '63', sectionCode: 'J', nameKo: '정보서비스업', level: 2, platformTag: 'it' },
    // 금융/보험 (K)
    { ksicCode: '64', sectionCode: 'K', nameKo: '금융업', level: 2, platformTag: 'finance' },
    { ksicCode: '65', sectionCode: 'K', nameKo: '보험 및 연금업', level: 2, platformTag: 'finance' },
    // 부동산 (L)
    { ksicCode: '68', sectionCode: 'L', nameKo: '부동산업', level: 2, platformTag: 'real_estate' },
    // 전문/과학/기술 (M)
    { ksicCode: '70', sectionCode: 'M', nameKo: '연구개발업', level: 2, platformTag: 'research' },
    { ksicCode: '71', sectionCode: 'M', nameKo: '전문서비스업', level: 2, platformTag: 'professional' },
    { ksicCode: '72', sectionCode: 'M', nameKo: '건축기술, 엔지니어링 및 관련 기술서비스업', level: 2, platformTag: 'engineering' },
    { ksicCode: '73', sectionCode: 'M', nameKo: '기타 전문, 과학 및 기술 서비스업', level: 2, platformTag: 'professional' },
    // 사업시설관리/사업지원 (N) — 청소/경비는 단순노무 / Cleaning/security = simple labor
    { ksicCode: '74', sectionCode: 'N', nameKo: '사업지원 서비스업', level: 2, platformTag: 'business_support' },
    { ksicCode: '75', sectionCode: 'N', nameKo: '건물·산업설비 청소 및 방제 서비스업', level: 2, isSimpleLabor: true, platformTag: 'cleaning' },
    // 교육 (P)
    { ksicCode: '85', sectionCode: 'P', nameKo: '교육 서비스업', level: 2, platformTag: 'education' },
    // 보건/사회복지 (Q)
    { ksicCode: '86', sectionCode: 'Q', nameKo: '보건업', level: 2, platformTag: 'healthcare' },
    { ksicCode: '87', sectionCode: 'Q', nameKo: '사회복지 서비스업', level: 2, platformTag: 'healthcare' },
    // 예술/스포츠/여가 (R) — 91(오락)은 도박/유흥 포함 가능 / 91(recreation) may include gambling
    { ksicCode: '90', sectionCode: 'R', nameKo: '창작, 예술 및 여가관련 서비스업', level: 2, platformTag: 'arts' },
    { ksicCode: '91', sectionCode: 'R', nameKo: '스포츠 및 오락관련 서비스업', level: 2, isGambling: true, platformTag: 'recreation' },
    // 협회/수리/기타 (S) — 96(기타 개인서비스)에 유흥 포함 가능 / 96 may include entertainment
    { ksicCode: '94', sectionCode: 'S', nameKo: '협회 및 단체', level: 2, platformTag: 'association' },
    { ksicCode: '95', sectionCode: 'S', nameKo: '개인 및 소비용품 수리업', level: 2, platformTag: 'repair' },
    { ksicCode: '96', sectionCode: 'S', nameKo: '기타 개인 서비스업', level: 2, isEntertainment: true, platformTag: 'personal_service' },
  ];

  for (const ic of industryCodes) {
    const icData = ic as any;
    await prisma.industryCode.upsert({
      where: { ksicCode: ic.ksicCode },
      update: {
        nameKo: ic.nameKo, sectionCode: ic.sectionCode, level: ic.level, parentCode: icData.parentCode,
        // 새 플래그 / New flags
        isSimpleLabor: icData.isSimpleLabor ?? false,
        isEntertainment: icData.isEntertainment ?? false,
        isGambling: icData.isGambling ?? false,
        isGigWork: icData.isGigWork ?? false,
        requiresSafetyTraining: icData.requiresSafetyTraining ?? false,
        platformTag: icData.platformTag ?? null,
      },
      create: {
        ksicCode: ic.ksicCode, nameKo: ic.nameKo, sectionCode: ic.sectionCode, level: ic.level,
        parentCode: icData.parentCode,
        isSimpleLabor: icData.isSimpleLabor ?? false,
        isEntertainment: icData.isEntertainment ?? false,
        isGambling: icData.isGambling ?? false,
        isGigWork: icData.isGigWork ?? false,
        requiresSafetyTraining: icData.requiresSafetyTraining ?? false,
        platformTag: icData.platformTag ?? null,
      },
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
      // 기존 criteria 삭제 후 재생성 (재시드 시 중복 방지) / Delete existing then recreate (prevent duplicates on re-seed)
      await prisma.pointSystemCriteria.deleteMany({ where: { categoryId: created.id } });
      for (const cr of cat.criteria) {
        const crData = cr as any;
        await prisma.pointSystemCriteria.create({
          data: {
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
    // 기존 서류 삭제 후 재생성 (재시드 시 중복 방지) / Delete existing then recreate
    await prisma.visaRequiredDocument.deleteMany({ where: { visaTypeId: vtId } });
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

  // ==========================================
  // 8. 고용쿼터 규칙 시드 (HireQuotaRule)
  // H-2 음식점업 내국인 수 대비 외국인 고용한도
  // ==========================================
  const getIndustryId = async (code: string) => {
    const ic = await prisma.industryCode.findUnique({ where: { ksicCode: code } });
    return ic?.id;
  };

  const foodServiceId = await getIndustryId('56');
  if (h2Id && foodServiceId) {
    // 기존 데이터 삭제 후 재생성 / Delete then recreate for idempotency
    await prisma.hireQuotaRule.deleteMany({ where: { visaCode: 'H-2', industryCodeId: foodServiceId } });
    const h2Quotas = [
      { domesticMin: 0, domesticMax: 5, foreignQuota: 4 },
      { domesticMin: 6, domesticMax: 10, foreignQuota: 8 },
      { domesticMin: 11, domesticMax: 15, foreignQuota: 10 },
      { domesticMin: 16, domesticMax: 20, foreignQuota: 14 },
      { domesticMin: 21, domesticMax: 100, foreignQuota: 20 },
      { domesticMin: 101, domesticMax: null, foreignQuota: 25 },
    ];
    for (const q of h2Quotas) {
      await prisma.hireQuotaRule.create({
        data: {
          visaCode: 'H-2',
          visaTypeId: h2Id,
          industryCodeId: foodServiceId,
          domesticMin: q.domesticMin,
          domesticMax: q.domesticMax,
          foreignQuota: q.foreignQuota,
        },
      });
    }
    console.log(`[Seed] H-2 음식점 고용쿼터 ${h2Quotas.length}건 입력`);
  }

  // E-9 제조업 고용쿼터 / E-9 manufacturing quotas
  const manufacturingId = await getIndustryId('10'); // 식료품 제조업 대표
  if (e9Id && manufacturingId) {
    await prisma.hireQuotaRule.deleteMany({ where: { visaCode: 'E-9', industryCodeId: manufacturingId } });
    const e9Quotas = [
      { domesticMin: 1, domesticMax: 10, foreignQuota: 3 },
      { domesticMin: 11, domesticMax: 50, foreignQuota: 10 },
      { domesticMin: 51, domesticMax: 100, foreignQuota: 20 },
      { domesticMin: 101, domesticMax: 300, foreignQuota: 30 },
    ];
    for (const q of e9Quotas) {
      await prisma.hireQuotaRule.create({
        data: {
          visaCode: 'E-9',
          visaTypeId: e9Id,
          industryCodeId: manufacturingId,
          domesticMin: q.domesticMin,
          domesticMax: q.domesticMax,
          foreignQuota: q.foreignQuota,
        },
      });
    }
    console.log(`[Seed] E-9 제조업 고용쿼터 ${e9Quotas.length}건 입력`);
  }

  // ==========================================
  // 9. 금지업종 시드 (ProhibitedIndustry)
  // H-2 허용제외 22개 중분류
  // ==========================================
  if (h2Id) {
    await prisma.prohibitedIndustry.deleteMany({ where: { visaCode: 'H-2' } });
    const h2Prohibited = [
      { ksicCode: '35', categoryLevel: 'medium', reasonKo: '전기·가스·증기 공급업' },
      { ksicCode: '36', categoryLevel: 'medium', reasonKo: '수도업' },
      { ksicCode: '39', categoryLevel: 'medium', reasonKo: '환경정화 및 복원업' },
      { ksicCode: '45', categoryLevel: 'medium', reasonKo: '자동차 판매업' },
      { ksicCode: '49', categoryLevel: 'medium', reasonKo: '육상운송업' },
      { ksicCode: '50', categoryLevel: 'medium', reasonKo: '수상운송업' },
      { ksicCode: '51', categoryLevel: 'medium', reasonKo: '항공운송업' },
      { ksicCode: '52', categoryLevel: 'medium', reasonKo: '창고 및 운송관련 서비스업' },
      { ksicCode: '58', categoryLevel: 'medium', reasonKo: '출판업' },
      { ksicCode: '61', categoryLevel: 'medium', reasonKo: '우편 및 통신업' },
      { ksicCode: '62', categoryLevel: 'medium', reasonKo: '컴퓨터 프로그래밍, 시스템 통합 및 관리업' },
      { ksicCode: '63', categoryLevel: 'medium', reasonKo: '정보서비스업' },
      { ksicCode: '64', categoryLevel: 'medium', reasonKo: '금융업' },
      { ksicCode: '65', categoryLevel: 'medium', reasonKo: '보험 및 연금업' },
      { ksicCode: '66', categoryLevel: 'medium', reasonKo: '금융 및 보험 관련 서비스업' },
      { ksicCode: '68', categoryLevel: 'medium', reasonKo: '부동산업' },
      { ksicCode: '70', categoryLevel: 'medium', reasonKo: '연구개발업' },
      { ksicCode: '71', categoryLevel: 'medium', reasonKo: '전문서비스업' },
      { ksicCode: '72', categoryLevel: 'medium', reasonKo: '건축기술, 엔지니어링 및 관련 기술서비스업' },
      { ksicCode: '74', categoryLevel: 'medium', reasonKo: '사업시설관리 및 조경 서비스업', hasExceptions: true, exceptionCodes: JSON.stringify(['7410', '7421']) },
      { ksicCode: '751', categoryLevel: 'minor', reasonKo: '고용알선 및 인력공급업' },
      { ksicCode: '85', categoryLevel: 'medium', reasonKo: '교육서비스업' },
    ];
    for (const p of h2Prohibited) {
      await prisma.prohibitedIndustry.create({
        data: {
          visaCode: 'H-2',
          visaTypeId: h2Id,
          ksicCode: p.ksicCode,
          categoryLevel: p.categoryLevel,
          reasonKo: p.reasonKo,
          hasExceptions: (p as any).hasExceptions ?? false,
          exceptionCodes: (p as any).exceptionCodes ?? null,
          legalBasis: '출입국관리법 시행규칙 별표 1의3',
        },
      });
    }
    console.log(`[Seed] H-2 금지업종 ${h2Prohibited.length}건 입력`);
  }

  // F-4 금지 직종 (단순노무 제한) / F-4 restricted occupations (simple labor)
  if (f4Id) {
    await prisma.prohibitedIndustry.deleteMany({ where: { visaCode: 'F-4' } });
    const f4Prohibited = [
      { ksicCode: '75', categoryLevel: 'medium', reasonKo: '건물·산업설비 청소 및 방제 서비스업 (단순노무)' },
      { ksicCode: '56221', categoryLevel: 'detail', reasonKo: '주점업 (유흥업소)' },
    ];
    for (const p of f4Prohibited) {
      await prisma.prohibitedIndustry.create({
        data: {
          visaCode: 'F-4',
          visaTypeId: f4Id,
          ksicCode: p.ksicCode,
          categoryLevel: p.categoryLevel,
          reasonKo: p.reasonKo,
          legalBasis: '출입국관리법 시행규칙',
        },
      });
    }
    console.log(`[Seed] F-4 금지업종 ${f4Prohibited.length}건 입력`);
  }

  // ==========================================
  // 10. 근로시간 규칙 시드 (WorkHourRule)
  // D-2, D-4, D-10, H-1 시간제취업 규칙
  // ==========================================
  if (d2Id) {
    await prisma.workHourRule.deleteMany({ where: { visaCode: 'D-2' } });
    const d2HourRules = [
      // 학사 TOPIK 충족 (3급+), 일반대학 / Bachelor, TOPIK met, regular univ
      { degreeLevel: 'bachelor', topikLevel: 3, topikMet: true, isCertifiedUniv: false, hasBonus: false,
        weekdayHours: 25, weekendHoliday: 'unlimited', vacation: 'unlimited', priority: 10 },
      // 학사 TOPIK 충족, 인증대학/우수학생 (+5시간) / Bachelor, certified/excellent (+5h)
      { degreeLevel: 'bachelor', topikLevel: 3, topikMet: true, isCertifiedUniv: true, hasBonus: true,
        weekdayHours: 30, weekendHoliday: 'unlimited', vacation: 'unlimited', priority: 20 },
      // 학사 TOPIK 미충족 / Bachelor, TOPIK not met
      { degreeLevel: 'bachelor', topikLevel: null, topikMet: false, isCertifiedUniv: null, hasBonus: false,
        weekdayHours: 10, weekendHoliday: 'same', vacation: 'same', priority: 5 },
      // 전문학사 TOPIK 충족 / Associate, TOPIK met
      { degreeLevel: 'associate', topikLevel: 3, topikMet: true, isCertifiedUniv: false, hasBonus: false,
        weekdayHours: 25, weekendHoliday: 'unlimited', vacation: 'unlimited', priority: 10 },
      // 전문학사 TOPIK 충족, 인증대학 / Associate, certified (+5h)
      { degreeLevel: 'associate', topikLevel: 3, topikMet: true, isCertifiedUniv: true, hasBonus: true,
        weekdayHours: 30, weekendHoliday: 'unlimited', vacation: 'unlimited', priority: 20 },
      // 전문학사 TOPIK 미충족 / Associate, TOPIK not met
      { degreeLevel: 'associate', topikLevel: null, topikMet: false, isCertifiedUniv: null, hasBonus: false,
        weekdayHours: 10, weekendHoliday: 'same', vacation: 'same', priority: 5 },
      // 석사 TOPIK 충족 (4급+) / Master, TOPIK met (4+)
      { degreeLevel: 'master', topikLevel: 4, topikMet: true, isCertifiedUniv: false, hasBonus: false,
        weekdayHours: 30, weekendHoliday: 'unlimited', vacation: 'unlimited', priority: 10 },
      // 석사 TOPIK 충족, 인증대학 (+5시간) / Master, certified (+5h)
      { degreeLevel: 'master', topikLevel: 4, topikMet: true, isCertifiedUniv: true, hasBonus: true,
        weekdayHours: 35, weekendHoliday: 'unlimited', vacation: 'unlimited', priority: 20 },
      // 석사 TOPIK 미충족 / Master, TOPIK not met
      { degreeLevel: 'master', topikLevel: null, topikMet: false, isCertifiedUniv: null, hasBonus: false,
        weekdayHours: 15, weekendHoliday: 'same', vacation: 'same', priority: 5 },
      // 박사 TOPIK 충족 (4급+) / Doctoral, TOPIK met (4+)
      { degreeLevel: 'doctoral', topikLevel: 4, topikMet: true, isCertifiedUniv: false, hasBonus: false,
        weekdayHours: 30, weekendHoliday: 'unlimited', vacation: 'unlimited', priority: 10 },
      // 박사 TOPIK 충족, 인증대학 / Doctoral, certified (+5h)
      { degreeLevel: 'doctoral', topikLevel: 4, topikMet: true, isCertifiedUniv: true, hasBonus: true,
        weekdayHours: 35, weekendHoliday: 'unlimited', vacation: 'unlimited', priority: 20 },
      // 박사 TOPIK 미충족 / Doctoral, TOPIK not met
      { degreeLevel: 'doctoral', topikLevel: null, topikMet: false, isCertifiedUniv: null, hasBonus: false,
        weekdayHours: 15, weekendHoliday: 'same', vacation: 'same', priority: 5 },
    ];
    for (const r of d2HourRules) {
      await prisma.workHourRule.create({
        data: { visaCode: 'D-2', visaTypeId: d2Id, ...r },
      });
    }
    console.log(`[Seed] D-2 근로시간 규칙 ${d2HourRules.length}건 입력`);
  }

  // D-4 근로시간 규칙 / D-4 work hour rules
  const d4Id = await getVisaId('D-4');
  if (d4Id) {
    await prisma.workHourRule.deleteMany({ where: { visaCode: 'D-4' } });
    await prisma.workHourRule.create({
      data: {
        visaCode: 'D-4', visaTypeId: d4Id,
        topikMet: true, weekdayHours: 20, weekendHoliday: 'same', vacation: 'same', priority: 10,
      },
    });
    console.log('[Seed] D-4 근로시간 규칙 1건 입력');
  }

  // D-10 근로시간 규칙 / D-10 work hour rules
  const d10Id = await getVisaId('D-10');
  if (d10Id) {
    await prisma.workHourRule.deleteMany({ where: { visaCode: 'D-10' } });
    await prisma.workHourRule.create({
      data: {
        visaCode: 'D-10', visaTypeId: d10Id,
        topikMet: true, topikLevel: 4, weekdayHours: 20, weekendHoliday: 'unlimited', vacation: 'unlimited', priority: 10,
      },
    });
    console.log('[Seed] D-10 근로시간 규칙 1건 입력');
  }

  // H-1 근로시간 규칙 / H-1 work hour rules
  if (h1Id) {
    await prisma.workHourRule.deleteMany({ where: { visaCode: 'H-1' } });
    await prisma.workHourRule.create({
      data: {
        visaCode: 'H-1', visaTypeId: h1Id,
        topikMet: true, weekdayHours: 25, weekendHoliday: 'same', vacation: 'same',
        annualMaxHours: 1300, priority: 10,
      },
    });
    console.log('[Seed] H-1 근로시간 규칙 1건 입력');
  }

  // ==========================================
  // 11. 점수제 시스템 시드 (ScoringSystem + ScoringCriteria)
  // E-7-4 K-Point, D-10 구직비자 점수제
  // ==========================================
  // 기존 F-2-7은 PointSystemCategory/Criteria로 관리, 여기선 E-7-4와 D-10 추가
  await prisma.scoringCriteria.deleteMany({});
  await prisma.scoringSystem.deleteMany({});

  // E-7-4 K-Point (300점 만점, 200점 이상) / E-7-4 K-Point system
  const e74System = await prisma.scoringSystem.create({
    data: {
      nameKo: 'E-7-4 숙련기능인력 점수제 (K-Point)',
      nameEn: 'E-7-4 Skilled Worker Point System (K-Point)',
      totalPoints: 300,
      passPoints: 200,
      additionalPassConditions: JSON.stringify({
        categoryMinimums: { income: 50, korean: 50 },
        note: '기본항목(소득, 한국어) 각 50점 이상 필수',
      }),
    },
  });
  const e74Criteria = [
    // 기본항목: 소득 (최대 100점) / Basic: Income (max 100)
    { category: 'income', itemNameKo: '평균소득 200만원 미만', points: 20, maxPointsInCategory: 100, matchCondition: JSON.stringify({ field: 'annualIncome', max: 2399 }) },
    { category: 'income', itemNameKo: '평균소득 200~250만원', points: 40, maxPointsInCategory: 100, matchCondition: JSON.stringify({ field: 'annualIncome', min: 2400, max: 2999 }) },
    { category: 'income', itemNameKo: '평균소득 250~300만원', points: 60, maxPointsInCategory: 100, matchCondition: JSON.stringify({ field: 'annualIncome', min: 3000, max: 3599 }) },
    { category: 'income', itemNameKo: '평균소득 300만원 이상', points: 80, maxPointsInCategory: 100, matchCondition: JSON.stringify({ field: 'annualIncome', min: 3600 }) },
    { category: 'income', itemNameKo: '평균소득 400만원 이상', points: 100, maxPointsInCategory: 100, matchCondition: JSON.stringify({ field: 'annualIncome', min: 4800 }) },
    // 기본항목: 한국어 (최대 100점) / Basic: Korean (max 100)
    { category: 'korean', itemNameKo: 'TOPIK 2급', points: 20, maxPointsInCategory: 100, matchCondition: JSON.stringify({ field: 'topik_level', min: 2, max: 2 }) },
    { category: 'korean', itemNameKo: 'TOPIK 3급', points: 40, maxPointsInCategory: 100, matchCondition: JSON.stringify({ field: 'topik_level', min: 3, max: 3 }) },
    { category: 'korean', itemNameKo: 'TOPIK 4급', points: 60, maxPointsInCategory: 100, matchCondition: JSON.stringify({ field: 'topik_level', min: 4, max: 4 }) },
    { category: 'korean', itemNameKo: 'TOPIK 5급 이상', points: 80, maxPointsInCategory: 100, matchCondition: JSON.stringify({ field: 'topik_level', min: 5 }) },
    { category: 'korean', itemNameKo: '사회통합프로그램 5단계', points: 100, maxPointsInCategory: 100, matchCondition: JSON.stringify({ field: 'kiip_stage', min: 5 }) },
    // 가점: 나이 / Bonus: Age
    { category: 'age', itemNameKo: '22~34세', points: 20, maxPointsInCategory: 20, matchCondition: JSON.stringify({ field: 'age', min: 22, max: 34 }) },
    { category: 'age', itemNameKo: '35~39세', points: 15, maxPointsInCategory: 20, matchCondition: JSON.stringify({ field: 'age', min: 35, max: 39 }) },
    { category: 'age', itemNameKo: '40~44세', points: 10, maxPointsInCategory: 20, matchCondition: JSON.stringify({ field: 'age', min: 40, max: 44 }) },
    // 가점: 근속기간 / Bonus: Work tenure
    { category: 'bonus', itemNameKo: '동일 사업장 2년 이상 근속', points: 20, maxPointsInCategory: 20, matchCondition: JSON.stringify({ field: 'currentEmployerMonths', min: 24 }) },
    { category: 'bonus', itemNameKo: '동일 사업장 1년 이상 근속', points: 10, maxPointsInCategory: 20, matchCondition: JSON.stringify({ field: 'currentEmployerMonths', min: 12 }) },
    // 감점: 법 위반 / Penalty: Violations
    { category: 'penalty', itemNameKo: '법 위반 1회', points: -20, matchCondition: JSON.stringify({ field: 'violationCount', min: 1, max: 1 }) },
    { category: 'penalty', itemNameKo: '법 위반 2회 이상', points: -50, matchCondition: JSON.stringify({ field: 'violationCount', min: 2 }) },
  ];
  for (const c of e74Criteria) {
    await prisma.scoringCriteria.create({
      data: { scoringSystemId: e74System.id, ...c },
    });
  }
  console.log(`[Seed] E-7-4 점수제 ${e74Criteria.length}건 입력`);

  // D-10 구직비자 점수제 (190점 만점, 60점 이상) / D-10 job-seeking visa point system
  const d10System = await prisma.scoringSystem.create({
    data: {
      nameKo: 'D-10 구직비자 점수제',
      nameEn: 'D-10 Job Seeking Visa Point System',
      totalPoints: 190,
      passPoints: 60,
      additionalPassConditions: JSON.stringify({
        categoryMinimums: { basic: 20 },
        note: '기본항목 20점 이상 필수',
      }),
    },
  });
  const d10Criteria = [
    { category: 'education', itemNameKo: '박사학위', points: 30, maxPointsInCategory: 30, matchCondition: JSON.stringify({ field: 'degreeLevel', equals: 'doctoral' }) },
    { category: 'education', itemNameKo: '석사학위', points: 25, maxPointsInCategory: 30, matchCondition: JSON.stringify({ field: 'degreeLevel', equals: 'master' }) },
    { category: 'education', itemNameKo: '학사학위', points: 20, maxPointsInCategory: 30, matchCondition: JSON.stringify({ field: 'degreeLevel', equals: 'bachelor' }) },
    { category: 'korean', itemNameKo: 'TOPIK 5급 이상', points: 20, maxPointsInCategory: 20, matchCondition: JSON.stringify({ field: 'topik_level', min: 5 }) },
    { category: 'korean', itemNameKo: 'TOPIK 4급', points: 15, maxPointsInCategory: 20, matchCondition: JSON.stringify({ field: 'topik_level', min: 4, max: 4 }) },
    { category: 'korean', itemNameKo: 'TOPIK 3급', points: 10, maxPointsInCategory: 20, matchCondition: JSON.stringify({ field: 'topik_level', min: 3, max: 3 }) },
    { category: 'age', itemNameKo: '25~29세', points: 20, maxPointsInCategory: 20, matchCondition: JSON.stringify({ field: 'age', min: 25, max: 29 }) },
    { category: 'age', itemNameKo: '30~34세', points: 15, maxPointsInCategory: 20, matchCondition: JSON.stringify({ field: 'age', min: 30, max: 34 }) },
    { category: 'bonus', itemNameKo: '국내대학 출신', points: 10, matchCondition: JSON.stringify({ field: 'domesticUniversity', equals: true }) },
    { category: 'bonus', itemNameKo: '전공 일치', points: 10, matchCondition: JSON.stringify({ field: 'majorMatch', equals: true }) },
  ];
  for (const c of d10Criteria) {
    await prisma.scoringCriteria.create({
      data: { scoringSystemId: d10System.id, ...c },
    });
  }
  console.log(`[Seed] D-10 점수제 ${d10Criteria.length}건 입력`);

  // ==========================================
  // 12. 비자 전환 경로 시드 (VisaTransition)
  // ==========================================
  await prisma.visaTransition.deleteMany({});

  const transitions = [
    // D-2 → D-10 (유학생 → 구직) / Student → Job seeking
    {
      fromVisa: 'D-2', toVisa: 'D-10', transitionType: 'upgrade',
      conditions: JSON.stringify({
        degree_min: 'associate', degree_domestic_only: true,
        years_since_degree_max: 3, topik_min: 4,
        note_ko: '국내대학 전문학사 이상 졸업 후 3년 이내, TOPIK 4급 이상',
      }),
      grantedStayMonths: 6, maxExtensions: 2,
      noteKo: '유학생 구직 전환: 졸업 후 최대 6개월 구직활동 가능',
    },
    // D-10 → E-7 (구직 → 전문인력) / Job seeking → Professional
    {
      fromVisa: 'D-10', toVisa: 'E-7', transitionType: 'upgrade',
      conditions: JSON.stringify({
        degree_min: 'bachelor', min_contract_years: 1,
        employer_conditions: { min_salary_gni_percent: 80 },
        note_ko: '학사 이상, 1년 이상 고용계약, GNI 80% 이상 급여',
      }),
      grantedStayMonths: 36, maxExtensions: null,
      noteKo: '구직비자에서 전문인력으로 전환',
    },
    // E-9 → E-7-4 (비전문 → 숙련기능인력) / Non-skilled → Skilled (point-based)
    {
      fromVisa: 'E-9', toVisa: 'E-7-4', transitionType: 'upgrade',
      conditions: JSON.stringify({
        min_work_years: 5, scoring_system_required: true,
        current_employer_min_months: 12, max_violations: 0,
        note_ko: '최근 10년 내 합법 취업 5년 이상, 현 사업장 1년 이상, 법 위반 없음, K-Point 200점 이상',
      }),
      scoringSystemId: e74System.id,
      grantedStayMonths: 36,
      noteKo: 'E-9에서 숙련기능인력(E-7-4) 전환: K-Point 점수제 200점 이상 필요',
    },
    // H-2 → F-4 (방문취업 → 재외동포) / Working visit → Overseas Korean
    {
      fromVisa: 'H-2', toVisa: 'F-4', transitionType: 'lateral',
      conditions: JSON.stringify({
        is_ethnic_korean: true, max_violations: 0,
        topik_min: 2,
        note_ko: '재외동포 확인, 법 위반 없음, TOPIK 2급 이상',
      }),
      grantedStayMonths: 36, maxExtensions: null,
      noteKo: '방문취업에서 재외동포 비자로 전환: 취업 범위 확대 (단순노무 제한)',
    },
    // H-2 → E-7-4 (방문취업 → 숙련기능인력) / Working visit → Skilled
    {
      fromVisa: 'H-2', toVisa: 'E-7-4', transitionType: 'upgrade',
      conditions: JSON.stringify({
        min_work_years: 5, scoring_system_required: true,
        current_employer_min_months: 12, max_violations: 0,
        note_ko: '최근 10년 내 합법 취업 5년 이상, K-Point 200점 이상',
      }),
      scoringSystemId: e74System.id,
      grantedStayMonths: 36,
      noteKo: 'H-2에서 숙련기능인력(E-7-4) 전환',
    },
    // F-2-7 → F-5 (점수제거주 → 영주) / Points residence → Permanent
    {
      fromVisa: 'F-2-7', toVisa: 'F-5', transitionType: 'upgrade',
      conditions: JSON.stringify({
        min_stay_years: 2, min_annual_income: 26000000,
        topik_min: 4, max_violations: 0,
        note_ko: '2년 이상 체류, 연 소득 2600만원 이상, TOPIK 4급 이상',
      }),
      grantedStayMonths: null,
      noteKo: '점수제 거주에서 영주권으로 전환',
    },
    // D-4 → D-2 (일반연수 → 유학) / General training → Study
    {
      fromVisa: 'D-4', toVisa: 'D-2', transitionType: 'upgrade',
      conditions: JSON.stringify({
        university_admission: true, topik_min: 3,
        note_ko: '전문대학 이상 입학허가, TOPIK 3급 이상',
      }),
      grantedStayMonths: 24,
      noteKo: '어학연수에서 정규과정 유학으로 전환',
    },
    // E-7-4 → F-2-7 (숙련기능인력 → 점수제거주) / Skilled → Points residence
    {
      fromVisa: 'E-7-4', toVisa: 'F-2-7', transitionType: 'upgrade',
      conditions: JSON.stringify({
        min_stay_years: 3, scoring_required: true,
        note_ko: '3년 이상 체류, F-2-7 점수제 80점 이상',
      }),
      grantedStayMonths: 36,
      noteKo: '숙련기능인력에서 점수제 거주 전환',
    },
  ];
  for (const t of transitions) {
    await prisma.visaTransition.create({
      data: {
        fromVisa: t.fromVisa,
        toVisa: t.toVisa,
        transitionType: t.transitionType,
        conditions: t.conditions,
        scoringSystemId: t.scoringSystemId ?? null,
        grantedStayMonths: t.grantedStayMonths,
        maxExtensions: (t as any).maxExtensions ?? null,
        noteKo: t.noteKo,
      },
    });
  }
  console.log(`[Seed] 비자 전환 경로 ${transitions.length}건 입력`);

  // ==========================================
  // 13. 비자 전환 체인 시드 (VisaTransitionChain)
  // ==========================================
  await prisma.visaTransitionChain.deleteMany({});

  const allTransitions = await prisma.visaTransition.findMany();
  const findTransId = (from: string, to: string) => {
    const t = allTransitions.find(tr => tr.fromVisa === from && tr.toVisa === to);
    return t ? t.id.toString() : '0';
  };

  const chains = [
    {
      chainNameKo: '유학생 취업 경로',
      chainNameEn: 'Student to Employment Path',
      visaPath: 'D-2 → D-10 → E-7',
      totalEstimatedYears: 4.5,
      descriptionKo: '유학 → 구직활동 → 전문인력 취업 (가장 일반적 경로)',
      transitionIds: JSON.stringify([findTransId('D-2', 'D-10'), findTransId('D-10', 'E-7')]),
    },
    {
      chainNameKo: '어학연수 → 유학 → 취업',
      chainNameEn: 'Language Course → Study → Employment',
      visaPath: 'D-4 → D-2 → D-10 → E-7',
      totalEstimatedYears: 6.0,
      descriptionKo: '어학연수 → 정규 유학 → 구직 → 전문인력',
      transitionIds: JSON.stringify([findTransId('D-4', 'D-2'), findTransId('D-2', 'D-10'), findTransId('D-10', 'E-7')]),
    },
    {
      chainNameKo: '동포 통합 전환',
      chainNameEn: 'Ethnic Korean Integration',
      visaPath: 'H-2 → F-4',
      totalEstimatedYears: 0.5,
      descriptionKo: '방문취업 → 재외동포 (취업 범위 확대, 단순노무 제한)',
      transitionIds: JSON.stringify([findTransId('H-2', 'F-4')]),
    },
    {
      chainNameKo: '비전문 → 숙련기능인력',
      chainNameEn: 'Non-skilled to Skilled Worker',
      visaPath: 'E-9 → E-7-4',
      totalEstimatedYears: 5.0,
      descriptionKo: '비전문취업 경력 5년 이상 → K-Point 점수제 → 숙련기능인력',
      transitionIds: JSON.stringify([findTransId('E-9', 'E-7-4')]),
    },
    {
      chainNameKo: '숙련기능 → 거주 → 영주',
      chainNameEn: 'Skilled → Residence → Permanent',
      visaPath: 'E-7-4 → F-2-7 → F-5',
      totalEstimatedYears: 8.0,
      descriptionKo: '숙련기능인력 → 점수제 거주 → 영주권 (장기 정착 경로)',
      transitionIds: JSON.stringify([findTransId('E-7-4', 'F-2-7'), findTransId('F-2-7', 'F-5')]),
    },
  ];
  for (const ch of chains) {
    await prisma.visaTransitionChain.create({ data: ch });
  }
  console.log(`[Seed] 비자 전환 체인 ${chains.length}건 입력`);

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
