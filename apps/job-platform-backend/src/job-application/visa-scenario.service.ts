/**
 * 비자 시나리오 판별 서비스 / Visa scenario determination service
 * 최종 합격 시 구직자의 비자 상태에 따라 시나리오 A~F를 자동 판별
 * Automatically determines visa scenario (A-F) based on applicant's visa status at final acceptance
 *
 * Spec 08 §4-2 기반 / Based on Spec 08 §4-2
 */
import { Injectable, Logger } from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';

/** 비자 시나리오 코드 / Visa scenario code */
export type VisaScenario = 'A' | 'B' | 'D' | 'E' | 'F';
// C (E-9/H-2) 제외: 고용허가제 대상 → 플랫폼 채용확정 제외 (spec 08 §4-3)
// C (E-9/H-2) excluded: subject to Employment Permit System → not handled by platform

/** 시나리오 판별 결과 / Scenario determination result */
export interface ScenarioResult {
  scenario: VisaScenario;
  scenarioName: string;
  scenarioNameEn: string;
  guidanceLevel: string; // 축하만 | 중간 | 높음 | 최고
  visaTransition: string; // 예: "D-10 → E-7"
  estimatedDuration: string; // 예: "2~4주"
  salaryCheck?: {
    meetsMinimum: boolean;
    minimumSalary: number; // 만원 단위
    offeredSalary: number;
    note: string;
  };
}

/** F비자 계열 (취업 제한 없음) / F-series visas (no work restriction) */
const F_SERIES_VISAS = ['F-2', 'F-4', 'F-5', 'F-6', 'F-2-7', 'F-2-99'];

/** 학생비자 (졸업 후 취업 전환) / Student visas (post-graduation transition) */
const STUDENT_VISAS = ['D-2', 'D-4', 'D-4-1'];

/** E-7 최저연봉 기준 (만원, GNI × 80% 기준 2026년 추정) / E-7 minimum salary (10K KRW, est. 2026) */
const E7_MIN_SALARY_MANWON = 3200;

@Injectable()
export class VisaScenarioService {
  private readonly logger = new Logger(VisaScenarioService.name);

  constructor(private readonly prisma: AuthPrismaService) {}

  /**
   * 시나리오 자동 판별 / Automatically determine visa scenario
   * @param applicantId 구직자 authId / Applicant auth ID
   * @param offeredSalary 제시 연봉 (만원) / Offered salary (10K KRW)
   * @param eligibleVisas 비자 매칭 결과 / Visa matching results
   */
  async determineScenario(
    applicantId: string,
    offeredSalary?: number,
    eligibleVisas?: string[],
  ): Promise<ScenarioResult> {
    // 구직자 프로필 조회 / Fetch applicant profile
    const profile = await this.prisma.individualProfile.findUnique({
      where: { authId: applicantId },
      select: {
        visaType: true,
        visaExpiryDate: true,
        nationality: true,
        addressRoad: true,
      },
    });

    const currentVisa = profile?.visaType || null;
    // 거주지 판별: 한국 주소가 있으면 KR, 없으면 OVERSEAS / Residence: KR if address exists
    const isInKorea = !!profile?.addressRoad;

    this.logger.log(
      `시나리오 판별: visa=${currentVisa}, inKorea=${isInKorea}, salary=${offeredSalary} / Determining scenario`,
    );

    let result: ScenarioResult;

    // 시나리오 판별 분기 (spec 08 §4-2) / Scenario branching
    if (isInKorea && currentVisa && this.isFSeriesVisa(currentVisa)) {
      // 시나리오 A: 한국 거주 + F계열 비자 / Scenario A: In Korea + F-series visa
      result = {
        scenario: 'A',
        scenarioName: '취업 제한 없음',
        scenarioNameEn: 'No Work Restriction',
        guidanceLevel: '축하만',
        visaTransition: `${currentVisa} (변경 불필요)`,
        estimatedDuration: '즉시 근무 가능',
      };
    } else if (isInKorea && currentVisa === 'D-10') {
      // 시나리오 B: 한국 거주 + D-10 → E-7 변경 / Scenario B: D-10 → E-7 change
      result = {
        scenario: 'B',
        scenarioName: '체류자격 변경 (D-10 → E-7)',
        scenarioNameEn: 'Status Change (D-10 → E-7)',
        guidanceLevel: '중간',
        visaTransition: 'D-10 → E-7',
        estimatedDuration: '약 2~4주',
      };
    } else if (isInKorea && currentVisa && this.isStudentVisa(currentVisa)) {
      // 시나리오 D: 한국 거주 + 학생비자 → 졸업 후 취업 / Scenario D: Student → Work
      result = {
        scenario: 'D',
        scenarioName: '졸업 후 취업 비자 전환',
        scenarioNameEn: 'Post-Graduation Work Visa',
        guidanceLevel: '높음',
        visaTransition: `${currentVisa} → D-10 → E-7`,
        estimatedDuration: '약 4~8주 (졸업 시기에 따라 상이)',
      };
    } else if (!isInKorea && !currentVisa) {
      // 시나리오 E: 해외 거주 + 비자 없음 → 기업 스폰서십 / Scenario E: Overseas, no visa
      result = {
        scenario: 'E',
        scenarioName: '기업 스폰서십 (비자 신규 발급)',
        scenarioNameEn: 'Company Sponsorship (New Visa)',
        guidanceLevel: '최고',
        visaTransition: '없음 → E-7 (사증 발급)',
        estimatedDuration: '약 4~8주',
      };
    } else if (!isInKorea && currentVisa) {
      // 시나리오 F: 해외 거주 + 비자 보유 (이전 거주 경험) / Scenario F: Overseas with existing visa
      const isExpired = profile?.visaExpiryDate
        ? new Date(profile.visaExpiryDate) < new Date()
        : false;

      result = {
        scenario: 'F',
        scenarioName: isExpired
          ? '비자 만료 → 재발급 필요'
          : '기존 비자 활용 (재입국)',
        scenarioNameEn: isExpired
          ? 'Visa Expired - Reissuance Required'
          : 'Use Existing Visa (Re-entry)',
        guidanceLevel: '중간',
        visaTransition: isExpired
          ? `${currentVisa} (만료) → E-7 신규`
          : `${currentVisa} → 재입국 + 변경`,
        estimatedDuration: isExpired ? '약 4~8주' : '약 2~4주',
      };
    } else {
      // 한국 거주 + 기타 비자 → B와 유사 처리 / In Korea + other visa → similar to B
      result = {
        scenario: 'B',
        scenarioName: '체류자격 변경 필요',
        scenarioNameEn: 'Status Change Required',
        guidanceLevel: '중간',
        visaTransition: `${currentVisa || '미상'} → E-7`,
        estimatedDuration: '약 2~4주',
      };
    }

    // 연봉 기준 검증 (spec 08 §8-2) / Salary validation
    if (offeredSalary && result.scenario !== 'A') {
      // E-7 최저연봉 기준은 DB 관리가 원칙이나, 시드 데이터 없을 경우 상수 사용
      // E-7 minimum should be DB-managed, fallback to constant
      const minSalary = await this.getMinimumSalary();
      result.salaryCheck = {
        meetsMinimum: offeredSalary >= minSalary,
        minimumSalary: minSalary,
        offeredSalary,
        note:
          offeredSalary >= minSalary
            ? `E-7 비자 최저연봉 기준 충족 (${minSalary}만원 이상)`
            : `⚠️ E-7 비자 최저연봉 기준 미달 (기준: ${minSalary}만원). 비자 발급이 어려울 수 있습니다.`,
      };
    }

    this.logger.log(
      `시나리오 판별 완료: ${result.scenario} (${result.scenarioName}) / Scenario determined`,
    );

    return result;
  }

  /**
   * 체크리스트 템플릿으로부터 아이템 생성 / Generate checklist items from templates
   * @param applicationId 지원 ID / Application ID
   * @param scenario 시나리오 코드 / Scenario code
   */
  async generateChecklist(
    applicationId: bigint,
    scenario: string,
  ): Promise<number> {
    // 해당 시나리오의 활성 템플릿 조회 / Fetch active templates for scenario
    const templates = await this.prisma.visaChecklistTemplate.findMany({
      where: { scenario, isActive: true },
      orderBy: [{ category: 'asc' }, { itemOrder: 'asc' }],
    });

    if (templates.length === 0) {
      this.logger.warn(
        `시나리오 ${scenario}의 체크리스트 템플릿 없음. 기본 생성 / No templates for scenario ${scenario}, using defaults`,
      );
      // 템플릿 없으면 기본 항목 생성 / Generate default items if no templates
      return this.generateDefaultChecklist(applicationId, scenario);
    }

    // 템플릿에서 아이템 벌크 생성 / Bulk create items from templates
    const items = templates.map((t) => ({
      applicationId,
      category: t.category,
      itemText: t.itemText,
      itemOrder: t.itemOrder,
      isChecked: false,
    }));

    await this.prisma.visaChecklistItem.createMany({ data: items });
    return items.length;
  }

  /**
   * 기본 체크리스트 생성 (템플릿 미등록 시) / Default checklist when no templates
   */
  private async generateDefaultChecklist(
    applicationId: bigint,
    scenario: string,
  ): Promise<number> {
    const defaults = this.getDefaultItems(scenario);
    if (defaults.length === 0) return 0;

    const items = defaults.map((d) => ({
      applicationId,
      category: d.category,
      itemText: d.text,
      itemOrder: d.order,
      isChecked: false,
    }));

    await this.prisma.visaChecklistItem.createMany({ data: items });
    return items.length;
  }

  /** 기본 체크리스트 아이템 / Default checklist items per scenario */
  private getDefaultItems(
    scenario: string,
  ): { category: string; text: string; order: number }[] {
    switch (scenario) {
      case 'A':
        return [
          {
            category: 'APPLICANT',
            text: '근로계약서 작성 (입사일에 진행)',
            order: 1,
          },
          {
            category: 'APPLICANT',
            text: '건강보험/국민연금 가입 (회사에서 처리)',
            order: 2,
          },
          {
            category: 'APPLICANT',
            text: '은행 계좌 개설 (급여 수령용)',
            order: 3,
          },
        ];
      case 'B':
        return [
          // 기업 / Company
          { category: 'COMPANY', text: '고용계약서', order: 1 },
          { category: 'COMPANY', text: '사업자등록증 사본', order: 2 },
          { category: 'COMPANY', text: '납세증명서', order: 3 },
          { category: 'COMPANY', text: '외국인 고용 사유서', order: 4 },
          // 구직자 / Applicant
          { category: 'APPLICANT', text: '여권 원본', order: 1 },
          { category: 'APPLICANT', text: '외국인등록증', order: 2 },
          { category: 'APPLICANT', text: '학위증명서 (원본 + 사본)', order: 3 },
          { category: 'APPLICANT', text: '경력증명서', order: 4 },
          { category: 'APPLICANT', text: 'TOPIK 성적표 (해당 시)', order: 5 },
          { category: 'APPLICANT', text: '체류자격 변경 신청서', order: 6 },
          { category: 'APPLICANT', text: '수수료 ₩130,000 준비', order: 7 },
        ];
      case 'D':
        return [
          { category: 'COMPANY', text: '고용계약서', order: 1 },
          { category: 'COMPANY', text: '사업자등록증 사본', order: 2 },
          { category: 'COMPANY', text: '납세증명서', order: 3 },
          { category: 'COMPANY', text: '외국인 고용 사유서', order: 4 },
          { category: 'APPLICANT', text: '여권 원본', order: 1 },
          { category: 'APPLICANT', text: '외국인등록증', order: 2 },
          {
            category: 'APPLICANT',
            text: '졸업증명서 또는 졸업예정증명서',
            order: 3,
          },
          { category: 'APPLICANT', text: '학위증명서 (원본 + 사본)', order: 4 },
          { category: 'APPLICANT', text: '경력증명서 (해당 시)', order: 5 },
          { category: 'APPLICANT', text: 'TOPIK 성적표 (해당 시)', order: 6 },
          { category: 'APPLICANT', text: '체류자격 변경 신청서', order: 7 },
          { category: 'APPLICANT', text: '수수료 ₩130,000 준비', order: 8 },
        ];
      case 'E':
        return [
          // 기업 Step 1 / Company documents
          { category: 'COMPANY', text: '고용 추천서', order: 1 },
          { category: 'COMPANY', text: '사업자등록증 사본', order: 2 },
          { category: 'COMPANY', text: '납세증명서 (최근 1년)', order: 3 },
          { category: 'COMPANY', text: '고용계약서', order: 4 },
          { category: 'COMPANY', text: '외국인 고용 사유서', order: 5 },
          {
            category: 'COMPANY',
            text: '비자 발급 인정서 신청 (출입국관리사무소)',
            order: 6,
          },
          { category: 'COMPANY', text: '인정서를 구직자에게 전달', order: 7 },
          // 구직자 / Applicant
          {
            category: 'APPLICANT',
            text: '여권 (유효기간 6개월 이상)',
            order: 1,
          },
          {
            category: 'APPLICANT',
            text: '학위증명서 + 아포스티유 인증',
            order: 2,
          },
          {
            category: 'APPLICANT',
            text: '경력증명서 + 아포스티유 인증',
            order: 3,
          },
          { category: 'APPLICANT', text: '범죄경력증명서', order: 4 },
          {
            category: 'APPLICANT',
            text: '건강진단서 (결핵고위험국가 해당 시)',
            order: 5,
          },
          { category: 'APPLICANT', text: '사진 (3.5×4.5cm)', order: 6 },
          {
            category: 'APPLICANT',
            text: '비자 발급 인정서 (기업에서 전달받음)',
            order: 7,
          },
          {
            category: 'APPLICANT',
            text: '본국 한국대사관에서 비자 신청',
            order: 8,
          },
          {
            category: 'APPLICANT',
            text: '입국 후 90일 이내 외국인등록',
            order: 9,
          },
        ];
      case 'F':
        return [
          { category: 'COMPANY', text: '고용계약서', order: 1 },
          { category: 'COMPANY', text: '사업자등록증 사본', order: 2 },
          { category: 'COMPANY', text: '납세증명서', order: 3 },
          { category: 'APPLICANT', text: '여권 원본', order: 1 },
          { category: 'APPLICANT', text: '기존 비자 유효기간 확인', order: 2 },
          {
            category: 'APPLICANT',
            text: '체류자격 변경 신청서 (필요 시)',
            order: 3,
          },
          { category: 'APPLICANT', text: '외국인등록 (재입국 시)', order: 4 },
        ];
      default:
        return [];
    }
  }

  // ──── 헬퍼 / Helpers ────

  private isFSeriesVisa(visa: string): boolean {
    return F_SERIES_VISAS.some((f) =>
      visa.startsWith(f.split('-').slice(0, 2).join('-')),
    );
  }

  private isStudentVisa(visa: string): boolean {
    return STUDENT_VISAS.some((s) => visa.startsWith(s));
  }

  /** E-7 최저연봉 조회 (DB → 상수 fallback) / Get E-7 min salary from DB or fallback */
  private async getMinimumSalary(): Promise<number> {
    try {
      // VisaIncomeReference에서 E-7 기준 조회 / Lookup E-7 from VisaIncomeReference
      const ref = await this.prisma.visaIncomeReference.findUnique({
        where: { visaCode: 'E-7' },
      });
      // avgAnnualIncome은 원 단위 → 만원으로 변환 / Convert KRW to 10K unit
      if (ref) return Math.round((Number(ref.avgAnnualIncome) * 0.8) / 10000);
    } catch {
      // 테이블 미존재/데이터 없음 → fallback / Table missing → fallback
    }
    return E7_MIN_SALARY_MANWON;
  }
}
