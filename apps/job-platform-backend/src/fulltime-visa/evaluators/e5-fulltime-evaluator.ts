// @ts-nocheck — 플랫폼에서 제외. 파일 보관용. / Excluded from platform. Kept for reference.
/**
 * E-5 전문직업 비자 정규직 평가기
 * E-5 Professional Visa Fulltime Evaluator
 *
 * E-5 핵심: 법정 전문직(변호사, 의사, 공인회계사 등) 활동을 하는 외국인 비자.
 * E-5 core: Visa for foreigners engaged in legally designated professional occupations (lawyers, doctors, CPAs, etc.).
 *
 * [E-5 요건 / E-5 Requirements]
 * ① 대상: 법정 전문직 자격증 보유자 (변호사, 의사, 치과의사, 한의사, 약사, 공인회계사, 건축사 등)
 *    Target: Holders of legally designated professional licenses (lawyers, doctors, dentists, Korean medicine doctors, pharmacists, CPAs, architects, etc.)
 * ② 자격증: 한국 또는 해당 국가의 전문직 자격증 보유
 *    License: Korean or foreign professional license
 * ③ 학력: 해당 전문직 관련 학위 (보통 석사 이상)
 *    Education: Degree related to professional field (typically Master's or higher)
 * ④ 연봉: 별도 최저임금 제한 없음 (전문직 임금 기준)
 *    Salary: No separate minimum wage restriction (follows professional wage standards)
 * ⑤ 면허 인정: 한국 법령에 따라 외국 면허 인정 여부 확인 필요
 *    License recognition: Need to check foreign license recognition according to Korean law
 *
 * [채용 트랙 / Hiring Track]
 * - SPONSOR: 해외 전문직 인재 채용 (기업이 비자 스폰서)
 *            Overseas professional hire (company sponsors visa)
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제23조 제5항 — E-5 전문직업 체류자격
 * 변호사법, 의료법, 약사법, 공인회계사법, 건축사법 등 각 전문직 관련 법률
 * Attorney Act, Medical Service Act, Pharmaceutical Affairs Act, CPA Act, Architects Act, etc.
 */

import {
  FulltimeJobInput,
  ApplicantProfile,
  FulltimeVisaEvalResult,
  IFulltimeVisaEvaluator,
  createEmptyFulltimeResult,
} from './fulltime-evaluator.interface';

/**
 * 법정 전문직 목록
 * Legally designated professional occupations
 */
const LEGAL_PROFESSIONAL_OCCUPATIONS = [
  '변호사',
  'Lawyer',
  'Attorney',
  '의사',
  'Doctor',
  'Physician',
  '치과의사',
  'Dentist',
  '한의사',
  'Korean Medicine Doctor',
  '약사',
  'Pharmacist',
  '공인회계사',
  'CPA',
  'Certified Public Accountant',
  '건축사',
  'Architect',
  '변리사',
  'Patent Attorney',
  '세무사',
  'Tax Accountant',
  '관세사',
  'Customs Broker',
  '법무사',
  'Judicial Scrivener',
];

export class E5FulltimeEvaluator implements IFulltimeVisaEvaluator {
  readonly visaCode = 'E-5';
  readonly visaName = '전문직업';
  readonly visaNameEn = 'Professional';

  /**
   * Job-side evaluation: 전문직 자격증 + 학력 기준 확인
   * Job-side evaluation: Check professional license + education requirements
   */
  evaluateJob(input: FulltimeJobInput): FulltimeVisaEvalResult {
    // 해외 전문직 채용 → SPONSOR 트랙
    // Overseas professional hire → SPONSOR track
    const hiringTrack = input.overseasHireWilling ? 'SPONSOR' : 'TRANSFER';

    const result = createEmptyFulltimeResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
      hiringTrack,
    );

    // ====================================================================
    // STEP 1: 법정 전문직 여부 확인 / Check legal professional occupation
    // ====================================================================
    // occupationCode 또는 직종명으로 전문직 확인
    // Check professional occupation by occupationCode or occupation name
    // (실제 구현 시 FulltimeJobInput에 occupationName 필드 추가 필요)
    const occupationName = (input as any).occupationName || '';
    const isProfessional = LEGAL_PROFESSIONAL_OCCUPATIONS.some((prof) =>
      occupationName.includes(prof),
    );

    // 임시로 occupationCode 앞 2자리가 '24'인 경우 전문직으로 간주 (법률/보건의료 전문가)
    // Temporarily consider occupationCode starting with '24' as professional (legal/healthcare professionals)
    const isProfessionalByCode =
      input.occupationCode?.startsWith('24') ?? false;

    if (!isProfessional && !isProfessionalByCode) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-5 비자는 법정 전문직(변호사, 의사, 공인회계사 등)에만 발급됩니다. ' +
          '해당 직종은 법정 전문직이 아닙니다 ' +
          '(E-5 visa is only issued for legally designated professional occupations (lawyers, doctors, CPAs, etc.). ' +
          'This occupation is not a legal professional occupation)',
      );
      result.notes =
        '법정 전문직 목록: 변호사, 의사, 치과의사, 한의사, 약사, 공인회계사, 건축사, 변리사, 세무사, 관세사, 법무사 등 ' +
        '(Legal professional list: Lawyers, doctors, dentists, Korean medicine doctors, pharmacists, CPAs, architects, patent attorneys, tax accountants, customs brokers, judicial scriveners, etc.)';
      return result;
    }

    // ====================================================================
    // STEP 2: 조건부 적합 / Conditional eligible
    // ====================================================================
    result.status = 'conditional';

    result.conditions.push(
      '해당 전문직 자격증 보유 필요 (한국 또는 외국 면허) ' +
        '(Professional license required: Korean or foreign license)',
    );

    result.conditions.push(
      '외국 면허의 경우 한국 법령에 따른 면허 인정 확인 필요 ' +
        '(For foreign licenses, need to verify license recognition according to Korean law)',
    );

    result.conditions.push(
      '해당 전문직 관련 학위 필요 (보통 석사 이상) ' +
        "(Degree related to professional field required, typically Master's or higher)",
    );

    result.requiredPermit = null; // 비자 자체가 취업허가 / Visa itself is work permit

    result.notes =
      `E-5 전문직업 비자 — 법정 전문직 활동 가능. ` +
      `직종: ${occupationName || input.occupationCode} ` +
      `(E-5 Professional visa — Legal professional activities allowed. ` +
      `Occupation: ${occupationName || input.occupationCode})`;

    // 해외 스폰서 채용 vs 이직 채용
    // Overseas sponsor hire vs transfer hire
    if (hiringTrack === 'SPONSOR') {
      result.estimatedDays = 60; // 해외 전문직: 비자 신청 + 면허 인정 ~60일 / Overseas: visa application + license recognition ~60 days
      result.requiredDocuments = [
        '여권 사본 (Passport copy)',
        '전문직 자격증 사본 (Professional license copy)',
        '학위증명서 (Degree certificate)',
        '성적증명서 (Transcript)',
        '경력증명서 (Work experience certificate)',
        '외국 면허 인정서 (한국 정부 발급) (Foreign license recognition certificate - if applicable)',
        '범죄경력증명서 (Criminal record certificate)',
        '근로계약서 (Labor contract)',
        '사업자등록증 (Business registration certificate)',
      ];
    } else {
      result.estimatedDays = 14; // E비자 이직: 직장변경 신고 ~14일 / E visa transfer: job change notification ~14 days
      result.requiredDocuments = [
        '외국인등록증 사본 (Copy of Alien Registration Card)',
        '현재 E-5 비자 사본 (Current E-5 visa copy)',
        '전문직 자격증 사본 (Professional license copy)',
        '학위증명서 (Degree certificate)',
        '경력증명서 (Work experience certificate)',
        '근로계약서 (Labor contract)',
        '직장변경 신고서 (Job change notification)',
      ];
    }

    return result;
  }

  /**
   * Applicant-side evaluation: 지원자의 전문직 자격증 + 학력 교차 검증
   * Applicant-side evaluation: Cross-validate applicant's professional license + education
   */
  evaluateApplicant(
    input: FulltimeJobInput,
    profile: ApplicantProfile,
  ): FulltimeVisaEvalResult {
    const result = this.evaluateJob(input);

    if (result.status === 'blocked') {
      return result; // 이미 blocked면 더 이상 검증 불필요 / If already blocked, no further validation
    }

    // ====================================================================
    // 지원자 전문직 자격증 교차 검증 / Cross-validate applicant professional license
    // ====================================================================
    const hasProfessionalLicense =
      profile.professionalLicense && profile.professionalLicense.length > 0;

    if (!hasProfessionalLicense) {
      result.status = 'blocked';
      result.blockReasons.push(
        'E-5 비자 요건 미충족: 해당 전문직 자격증 보유 필요. ' +
          '지원자: 전문직 자격증 미제공 ' +
          '(E-5 visa requirements not met: Professional license required. ' +
          'Applicant: Professional license not provided)',
      );
      return result;
    }

    // 자격증 일치 확인
    // Check license match
    const occupationName = (input as any).occupationName || '';
    const licenseMatch = profile.professionalLicense!.some((license) =>
      LEGAL_PROFESSIONAL_OCCUPATIONS.some(
        (prof) => license.includes(prof) && occupationName.includes(prof),
      ),
    );

    if (!licenseMatch && occupationName) {
      result.status = 'blocked';
      result.blockReasons.push(
        `E-5 비자 요건 미충족: ${occupationName} 관련 자격증 필요. ` +
          `지원자 자격증: ${profile.professionalLicense!.join(', ')} ` +
          `(E-5 visa requirements not met: License related to ${occupationName} required. ` +
          `Applicant licenses: ${profile.professionalLicense!.join(', ')})`,
      );
      return result;
    }

    // ====================================================================
    // 자격증 보유 확인 시 조건 제거
    // Remove license condition if confirmed
    // ====================================================================
    result.conditions = result.conditions.filter(
      (c) => !c.includes('해당 전문직 자격증'),
    );
    result.conditions.push(
      `전문직 자격증 보유: ${profile.professionalLicense!.join(', ')} ` +
        `(Professional license confirmed: ${profile.professionalLicense!.join(', ')})`,
    );

    // ====================================================================
    // 학력 확인 (권장사항, blocking은 아님)
    // Check education (recommendation, not blocking)
    // ====================================================================
    const hasMastersOrHigher =
      profile.educationLevel === 'MASTER' ||
      profile.educationLevel === 'DOCTORATE';

    if (hasMastersOrHigher) {
      result.conditions = result.conditions.filter(
        (c) => !c.includes('해당 전문직 관련 학위'),
      );
      result.conditions.push(
        `학력 요건 충족: ${profile.educationLevel} ` +
          `(Education requirement met: ${profile.educationLevel})`,
      );
    }

    // ====================================================================
    // 자격증 보유 시 eligible
    // If professional license confirmed, set to eligible
    // ====================================================================
    if (hasProfessionalLicense) {
      result.status = 'eligible';
    }

    return result;
  }
}
