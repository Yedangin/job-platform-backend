/**
 * H-2 방문취업비자 알바 평가기
 * H-2 Visit & Employment Visa Alba (Part-time) Evaluator
 *
 * H-2 핵심: 특례고용허가제 + 네거티브 리스트 방식 (2023.1.1 기준 22개 중분류)
 * H-2 key: Special Employment Permit System + Negative list approach (22 mid-categories as of 2023.1.1)
 *
 * 평가 순서 / Evaluation order:
 * 1. 유흥업소 판별 → 즉시 blocked
 *    Entertainment venue check → immediately blocked
 * 2. 직종별 H-2 네거티브 매핑 확인 (중분류 수준)
 *    Check per-job-category H-2 negative mapping (mid-category level)
 * 3. 예외 소분류 확인 (청소업, 사업시설 유지관리 등)
 *    Check exception sub-categories (cleaning, facility maintenance, etc.)
 * 4. 조건부(회색지대) 직종 판별 (배달, 사무보조 등)
 *    Conditional (gray area) category determination (delivery, office assist, etc.)
 * 5. 네거티브 아닌 경우 → eligible + 특례고용허가 조건 추가
 *    Not negative → eligible + special employment permit conditions
 *
 * 모든 eligible/conditional 결과에 고용주 의무사항 조건 포함
 * All eligible/conditional results include employer obligation conditions
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 제12조 별표1 (H-2 체류자격)
 * Immigration Control Act Enforcement Decree Article 12, Schedule 1 (H-2 status)
 * 외국인근로자의 고용 등에 관한 법률 제12조 (특례고용허가)
 * Act on Employment of Foreign Workers Article 12 (Special Employment Permit)
 * 법무부 고시 — H-2 허용/금지 업종 (2023.1.1)
 * MOJ Notice — H-2 Permitted/Prohibited Industries (2023.1.1)
 */

import {
  AlbaJobInput,
  AlbaVisaEvalResult,
  IAlbaVisaEvaluator,
  createEmptyAlbaResult,
} from './alba-evaluator.interface';
import {
  getH2JobCategoryMapping,
  isH2NegativeJobCategory,
  isH2NegativeException,
  isH2ConditionalJobCategory,
  isH2NegativeSection,
} from '../data/h2-negative-list';
import { getKsicMapping } from '../data/ksic-mapping';

export class H2AlbaEvaluator implements IAlbaVisaEvaluator {
  readonly visaCode = 'H-2';
  readonly visaName = '방문취업';
  readonly visaNameEn = 'Visit & Employment';

  evaluate(input: AlbaJobInput): AlbaVisaEvalResult {
    const result = createEmptyAlbaResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
    );

    // H-2 비자: 시간/사업장 무제한 (특례고용허가 범위 내)
    // H-2 visa: Unlimited hours and workplaces (within special employment permit scope)
    result.maxWeeklyHours = null;
    result.maxWorkplaces = null;

    const mapping = getKsicMapping(input.jobCategoryCode);

    // === STEP 1: 유흥업소 즉시 차단 / Entertainment venue — immediately blocked ===
    if (mapping?.isEntertainment) {
      result.status = 'blocked';
      result.blockReasons.push(
        '유흥업소는 H-2 비자를 포함한 모든 비자에서 취업이 금지됩니다 ' +
          '(Entertainment venues are prohibited for all visa types including H-2)',
      );
      return result;
    }

    // === STEP 2: 직종별 H-2 네거티브 매핑 확인 / Check job-category-level negative mapping ===
    const h2Mapping = getH2JobCategoryMapping(input.jobCategoryCode);

    if (h2Mapping) {
      // 매핑이 존재하면 직종별 상세 판정 사용
      // If mapping exists, use per-job-category detailed determination
      return this.evaluateWithMapping(input, result, h2Mapping, mapping);
    }

    // === STEP 3: 매핑 없는 직종 — KSIC 대분류 기반 폴백 판정 ===
    // === No mapping — fallback to KSIC section-level determination ===
    return this.evaluateBySection(input, result, mapping);
  }

  /**
   * 직종 매핑이 있는 경우의 상세 판정
   * Detailed evaluation when job category mapping exists
   */
  private evaluateWithMapping(
    input: AlbaJobInput,
    result: AlbaVisaEvalResult,
    h2Mapping: ReturnType<typeof getH2JobCategoryMapping>,
    ksicMapping: ReturnType<typeof getKsicMapping>,
  ): AlbaVisaEvalResult {
    if (!h2Mapping) return result;

    // --- 네거티브가 아닌 경우 → eligible ---
    // --- Not negative → eligible ---
    if (!h2Mapping.isNegative) {
      result.status = 'eligible';
      result.requiredPermit =
        '특례고용가능확인서 (Special Employment Permit Confirmation)';

      // 고용주 필수 의무사항 조건 추가 / Add employer obligation conditions
      this.addEmployerConditions(result, input);

      // 제조업 특수 조건: 300인 미만 사업장 / Manufacturing special condition: under 300 employees
      if (ksicMapping?.ksicCode === 'C') {
        result.conditions.push(
          '제조업: 상시근로자 300인 미만 사업장만 채용 가능 ' +
            '(Manufacturing: Only workplaces with fewer than 300 regular employees)',
        );
      }

      // 농축산업: 구인 기간 단축 / Agriculture/livestock: shortened recruitment period
      if (ksicMapping?.ksicCode === 'A') {
        result.conditions.push(
          '농축산업: 내국인 구인 기간 7일 (일반 업종 14일보다 단축) ' +
            '(Agriculture/livestock: 7-day domestic recruitment period, shortened from 14 days)',
        );
      }

      result.notes =
        `H-2 방문취업 비자 — ${h2Mapping.reasonKo}. ` +
        '특례고용허가제에 따라 구직자명부 등록자만 채용 가능. ' +
        `(H-2 visa — ${h2Mapping.reasonEn}. ` +
        'Only workers registered in the job seeker list can be hired under the Special Employment Permit System.)';

      return result;
    }

    // --- 네거티브이지만 예외 소분류에 해당 → conditional (허용이지만 조건부) ---
    // --- Negative but belongs to exception sub-category → conditional (allowed but with conditions) ---
    if (h2Mapping.isException) {
      result.status = 'conditional';
      result.requiredPermit =
        '특례고용가능확인서 (Special Employment Permit Confirmation)';

      result.conditions.push(`${h2Mapping.reasonKo} (${h2Mapping.reasonEn})`);
      result.conditions.push(
        '네거티브 중분류에 속하나 예외 허용된 소분류 — 출입국사무소 사전 확인 권장 ' +
          '(Belongs to a negative mid-category but is an allowed sub-category exception — confirm with immigration office recommended)',
      );

      // 고용주 필수 의무사항 추가 / Add employer obligations
      this.addEmployerConditions(result, input);

      result.notes =
        `H-2 방문취업 비자 — ${h2Mapping.reasonKo}. ` +
        '특례고용허가 취득 후 채용 가능하나, 업종 분류에 대해 관할 출입국사무소 확인 필요. ' +
        `(H-2 visa — ${h2Mapping.reasonEn}. ` +
        'Hiring possible after obtaining Special Employment Permit, but industry classification should be confirmed with the local immigration office.)';

      return result;
    }

    // --- 네거티브이고 조건부(회색지대) 직종 → conditional ---
    // --- Negative and conditional (gray area) category → conditional ---
    if (isH2ConditionalJobCategory(input.jobCategoryCode)) {
      result.status = 'conditional';
      result.requiredPermit =
        '특례고용가능확인서 (Special Employment Permit Confirmation)';

      result.conditions.push(`${h2Mapping.reasonKo} (${h2Mapping.reasonEn})`);
      result.conditions.push(
        '해당 직종은 업무 내용에 따라 허용/금지 판단이 다를 수 있음 — 고용센터 또는 출입국사무소 사전 확인 필수 ' +
          '(This category may be allowed or prohibited depending on actual work content — prior confirmation with Employment Center or Immigration Office is required)',
      );

      // 배달의 경우 추가 안내 / Additional guidance for delivery
      if (input.jobCategoryCode === 'DELIVERY') {
        result.conditions.push(
          '배달: 음식점 소속 배달은 음식점업(I)으로 분류될 수 있으나, 배달대행 플랫폼 소속은 운송업(H)으로 분류됨 ' +
            '(Delivery: Restaurant-employed delivery may be classified as food service (I), but delivery platform workers are classified as transport (H))',
        );
      }

      // 사무보조의 경우 추가 안내 / Additional guidance for office assist
      if (input.jobCategoryCode === 'OFFICE_ASSIST') {
        result.conditions.push(
          '사무보조: 단순 서류 정리·복사 등은 사업지원 서비스(N76)로 분류될 수 있으나, 전문 사무직은 금지 ' +
            '(Office assist: Simple filing/copying may be classified as business support (N76), but professional office work is prohibited)',
        );
      }

      // 고용주 의무사항은 conditional이어도 추가 / Add employer obligations even for conditional
      this.addEmployerConditions(result, input);

      result.notes =
        'H-2 방문취업 비자 — 해당 직종은 네거티브 중분류에 속하나 업무 내용에 따라 허용될 수 있는 회색지대. ' +
        '반드시 관할 고용센터 또는 출입국사무소에서 사전 확인 후 채용 진행. ' +
        '(H-2 visa — This category belongs to a negative mid-category but may be allowed depending on work content. ' +
        'Must confirm with the local Employment Center or Immigration Office before hiring.)';

      return result;
    }

    // --- 네거티브이고 예외도 아닌 경우 → blocked ---
    // --- Negative with no exception → blocked ---
    result.status = 'blocked';
    result.blockReasons.push(`${h2Mapping.reasonKo} (${h2Mapping.reasonEn})`);
    result.blockReasons.push(
      'H-2 비자 네거티브 리스트(2023.1.1 기준) 금지 업종 ' +
        '(Prohibited industry under H-2 visa negative list as of 2023.1.1)',
    );

    return result;
  }

  /**
   * 매핑이 없는 직종에 대한 KSIC 대분류 기반 폴백 판정
   * Fallback evaluation based on KSIC section code for unmapped categories
   */
  private evaluateBySection(
    input: AlbaJobInput,
    result: AlbaVisaEvalResult,
    ksicMapping: ReturnType<typeof getKsicMapping>,
  ): AlbaVisaEvalResult {
    const ksicCode = input.ksicCode;

    // KSIC 대분류에 네거티브 중분류가 포함되어 있는지 확인
    // Check if KSIC section contains any negative mid-categories
    if (isH2NegativeSection(ksicCode)) {
      // 대분류에 네거티브 중분류가 존재 → 보수적으로 conditional 판정
      // Section has negative mid-categories → conservatively mark as conditional
      result.status = 'conditional';
      result.requiredPermit =
        '특례고용가능확인서 (Special Employment Permit Confirmation)';

      result.conditions.push(
        `KSIC 대분류 '${ksicCode}'에 H-2 네거티브 중분류가 포함되어 있음 — 구체적 업종 확인 필요 ` +
          `(KSIC section '${ksicCode}' contains H-2 negative mid-categories — specific industry verification needed)`,
      );
      result.conditions.push(
        '고용센터 또는 출입국사무소에서 해당 사업장의 실제 업종 분류 확인 필수 ' +
          '(Must verify actual industry classification at the Employment Center or Immigration Office)',
      );

      // 고용주 의무사항 추가 / Add employer obligations
      this.addEmployerConditions(result, input);

      result.notes =
        'H-2 방문취업 비자 — 해당 KSIC 대분류에 네거티브 중분류가 포함되어 있어 사전 확인 필요. ' +
        '(H-2 visa — This KSIC section contains negative mid-categories, prior verification required.)';

      return result;
    }

    // 네거티브 대분류에 해당하지 않음 → eligible
    // Not in a negative section → eligible
    result.status = 'eligible';
    result.requiredPermit =
      '특례고용가능확인서 (Special Employment Permit Confirmation)';

    // 고용주 필수 의무사항 추가 / Add employer obligations
    this.addEmployerConditions(result, input);

    result.notes =
      'H-2 방문취업 비자 — 네거티브 리스트 외 업종으로 취업 가능. 특례고용허가제에 따른 절차 준수 필요. ' +
      '(H-2 visa — Employment allowed in industries not on the negative list. Must follow Special Employment Permit System procedures.)';

    return result;
  }

  /**
   * 고용주 필수 의무사항 (특례고용허가제) 조건 추가
   * Add employer obligation conditions (Special Employment Permit System)
   *
   * 모든 eligible/conditional 결과에 공통적으로 적용.
   * Applied commonly to all eligible/conditional results.
   *
   * [법적 근거 / Legal Basis]
   * 외국인근로자의 고용 등에 관한 법률 제12조 (특례고용허가)
   * Act on Employment of Foreign Workers Article 12 (Special Employment Permit)
   */
  private addEmployerConditions(
    result: AlbaVisaEvalResult,
    input: AlbaJobInput,
  ): void {
    const ksicMapping = getKsicMapping(input.jobCategoryCode);
    const isAgriculture = ksicMapping?.ksicCode === 'A';

    // 1. 내국인 구인 신청 의무 / Domestic recruitment obligation
    const recruitmentDays = isAgriculture ? 7 : 14;
    result.conditions.push(
      `[특례고용허가 1단계] 내국인 구인 신청: 고용센터에 ${recruitmentDays}일간 내국인 구인 노력 필수 ` +
        `([Special Employment Permit Step 1] Domestic recruitment: Must attempt to hire Korean workers for ${recruitmentDays} days at Employment Center)`,
    );

    // 2. 특례고용가능확인서 발급 / Special Employment Permit Confirmation issuance
    result.conditions.push(
      '[특례고용허가 2단계] 특례고용가능확인서 발급: 내국인 미채용 시 고용센터에서 발급 (유효기간 3년) ' +
        '([Special Employment Permit Step 2] Permit issuance: Issued by Employment Center if domestic recruitment fails (valid for 3 years))',
    );

    // 3. 구직자명부 등록자만 채용 가능 / Only registered job seekers
    result.conditions.push(
      '[특례고용허가 3단계] 구직자명부 등록자만 채용 가능 — 미등록자 채용 시 500만원 이하 과태료 ' +
        '([Special Employment Permit Step 3] Only workers registered in the job seeker list can be hired — penalty up to KRW 5,000,000 for hiring unregistered workers)',
    );

    // 4. 근로개시 신고 의무 / Work commencement reporting obligation
    result.conditions.push(
      '[특례고용허가 4단계] 근로개시 신고: 근로 시작일로부터 14일 이내 고용센터 신고 필수 — 미신고 시 500만원 이하 과태료 ' +
        '([Special Employment Permit Step 4] Work commencement report: Must report to Employment Center within 14 days of work start — penalty up to KRW 5,000,000 for non-reporting)',
    );

    // 5. 고용변동 신고 의무 / Employment change reporting obligation
    result.conditions.push(
      '[고용변동 신고] 해고·퇴직·사망·소재불명 발생 시 15일 이내 고용센터 신고 필수 — ' +
        '미신고 과태료: 3개월 미만 10만원, 3~6개월 30만원, 6~12개월 50만원, 1~2년 100만원, 2년+ 200만원 ' +
        '([Employment Change Report] Must report dismissal/resignation/death/missing within 15 days to Employment Center — ' +
        'Penalty: under 3mo KRW 100K, 3-6mo KRW 300K, 6-12mo KRW 500K, 1-2yr KRW 1M, 2yr+ KRW 2M)',
    );

    // 6. 표준근로계약서 체결 / Standard labor contract
    result.conditions.push(
      '[근로계약] 표준근로계약서 체결 필수 — 시급·근무시간·근무내용·기간·장소 명시 ' +
        '([Labor Contract] Standard labor contract required — must specify hourly wage, working hours, job description, period, and location)',
    );

    // 7. 4대보험 가입 / Social insurance enrollment
    result.conditions.push(
      '[4대보험] 산재보험 당연가입 + 건강보험 가입 + 국민연금 상호주의 + 고용보험(실업급여: 임의가입 / 고안직: 당연가입) ' +
        '([Social Insurance] Industrial accident insurance mandatory + Health insurance required + National pension by reciprocity + Employment insurance (unemployment: voluntary / job security: mandatory))',
    );
  }
}
