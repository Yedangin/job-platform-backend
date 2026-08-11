/** 판정 엔진 감사 버전 / Decision engine audit version */
export const VISA_JOURNEY_ENGINE_VERSION = 'visa-journey-1.0.0';

/** 판정에 필요한 기존 엔진의 최소 입력 / Minimum legacy engine inputs */
export const REQUIRED_ENGINE_INPUTS = [
  'ksicCode',
  'companySizeType',
  'employeeCountKorean',
  'employeeCountForeign',
  'annualRevenue',
  'addressRoad',
  'jobType',
  'offeredSalary',
] as const;

/** 개인정보 최소화를 위한 판정 스냅숏 허용 필드 / Allowlisted decision snapshot fields */
export const DECISION_SNAPSHOT_FIELDS = [
  ...REQUIRED_ENGINE_INPUTS,
  'nationality',
  'age',
  'educationLevel',
  'koreanLevel',
  'workExperienceYears',
  'currentVisaCode',
  'targetOccupationCode',
  'hasRecommendation',
  'hasCriminalRecord',
  'annualIncome',
  'incomeGniPercent',
  'socialIntegrationLevel',
  'isEthnicKorean',
  'koreanAncestryCountry',
  'volunteerHours',
  'hasKoreanChild',
  'hasProperty',
  'taxYearsInKorea',
  'hasImmigrationViolation',
] as const;

/** 모든 비자 여정 화면과 API가 공유하는 법적 고지 / Shared legal notice */
export const VISA_LEGAL_NOTICE = {
  code: 'GENERAL_INFORMATION_ONLY',
  ko: '잡차자는 일반적인 비자·체류 정보와 준비 판단 보조만 제공합니다. 이 결과는 체류자격 발급·변경·연장 허가를 보장하지 않으며, 잡차자가 신청을 대리하거나 법률적 결론을 내리는 것이 아닙니다. 정확한 개별 판단은 출입국민원콜센터 1345 또는 자격이 확인된 행정사와 직접 상담해 확인하세요.',
  en: 'JobChaJa provides general visa and stay information and preparation guidance only. This result does not guarantee issuance, change, or extension of status, and JobChaJa does not file an application or make a legal determination for you. Confirm your individual case directly with Immigration Contact Center 1345 or a credential-verified administrative agent.',
  agency: {
    ko: '신청 대행을 선택하는 경우 잡차자가 아닌 등록 요건을 충족한 외부 행정사와 별도 상담·계약을 진행합니다.',
    en: 'If you request filing representation, consultation and engagement are handled separately with an external administrative agent who meets the applicable registration requirements, not by JobChaJa.',
  },
} as const;
