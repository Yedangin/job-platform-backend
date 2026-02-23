/**
 * F-2 거주비자 정규직 평가기
 * F-2 Residence Visa Fulltime Evaluator
 *
 * F-2 핵심: 거의 제한 없는 취업. 유흥업소 + 단순노무 금지, F-2-7 점수제는 조건부.
 * F-2 core: Almost unrestricted employment. Entertainment + simple labor blocked, F-2-7 point system conditional.
 *
 * [F-2 하위 유형 / F-2 Subtypes]
 * F-2-1: 국민의 미성년 외국인 자녀 (Minor child of Korean national)
 * F-2-2: 국민 또는 영주권자 배우자 (Spouse of Korean or permanent resident)
 * F-2-3: 난민인정자 (Recognized refugee)
 * F-2-4: 부 또는 모가 한국인인 자 (Person with Korean parent)
 * F-2-5: F-5 신청 요건 충족 (Meets F-5 application requirements)
 * F-2-6: 미화 50만불 이상 투자 (Invested 500K USD+)
 * F-2-7: 점수제 (Point system) ← 유흥/단순노무만 제한, 그 외 자유 (Only entertainment/simple labor restricted, rest free)
 * F-2-R: 지역특화형 (Regional type) ← 향후 구현 (Future implementation)
 * F-2-99: 법무부장관 인정 (Approved by MOJ)
 *
 * [취업 제한 / Employment Restrictions]
 * ① 유흥업소 (사행행위/유흥주점/풍속영업) — ALWAYS BLOCKED
 *    Entertainment venues (gambling/bars/adult entertainment) — ALWAYS BLOCKED
 * ② 단순노무 (KSCO 대분류 9) — BLOCKED (인구감소지역 예외)
 *    Simple labor (KSCO major group 9) — BLOCKED (depopulation area exception)
 *
 * [F-2-7 점수제 조건 / F-2-7 Point System Condition]
 * F-2-7 소지자는 유흥/단순노무만 제한, 그 외 분야는 자유 취업 가능.
 * F-2-7 holders are only restricted from entertainment/simple labor, free employment in other fields.
 *
 * [F-2-R 지역특화형 / F-2-R Regional Type]
 * 인구감소지역에서는 단순노무 제한 해제. 유흥업소 제한만 유지.
 * In depopulation areas, simple labor restriction lifted. Only entertainment restriction remains.
 *
 * [채용 트랙 / Hiring Track]
 * - IMMEDIATE: 즉시 채용 가능 (F비자 소지자)
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 별표1의3 — F-2 거주자격 취업활동 제한
 * 출입국관리법 시행령 제12조 별표1 — F-2 거주자격
 * 법무부 — F-2 거주자격 취업활동 범위
 */

import {
  FulltimeJobInput,
  ApplicantProfile,
  FulltimeVisaEvalResult,
  IFulltimeVisaEvaluator,
  createEmptyFulltimeResult,
} from './fulltime-evaluator.interface';
<<<<<<< HEAD
import { getKsicMapping } from '../../alba-visa/data/ksic-mapping';
import { isSimpleLaborOccupation } from '../data/occupation-code-table';
=======
import { getKsicMapping } from '../../common/data/visa';
>>>>>>> ba747a8 (feat: add alba hiring visa analysis service and refactor evaluators)

export class F2FulltimeEvaluator implements IFulltimeVisaEvaluator {
  readonly visaCode = 'F-2';
  readonly visaName = '거주';
  readonly visaNameEn = 'Residence';

  /**
   * Job-side evaluation: F-2는 대부분 공고에 적합 (유흥업소/단순노무 제외)
   * Job-side evaluation: F-2 is eligible for most jobs (except entertainment/simple labor)
   */
  evaluateJob(input: FulltimeJobInput): FulltimeVisaEvalResult {
    const result = createEmptyFulltimeResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
      'IMMEDIATE',
    );

    result.requiredPermit = null; // 별도 허가 불필요 / No additional permit

    // ====================================================================
    // STEP 1: 유흥업소 확인 (항상 금지)
    // STEP 1: Entertainment venue check (always blocked)
    // 법적 근거: 출입국관리법 시행령 별표1의3
    // Legal basis: Immigration Act Enforcement Decree Appendix 1-3
    // ====================================================================
    const mapping = getKsicMapping(input.occupationCode);
    if (mapping?.isEntertainment) {
      result.status = 'blocked';
      result.blockReasons.push(
        'F-2 비자는 유흥업소(사행행위/유흥주점/풍속영업) 취업이 금지됩니다 ' +
          '(F-2 visa prohibits entertainment venue employment — gambling/bars/adult entertainment)',
      );
      result.notes =
        '유흥업소 제한 — 인구감소지역(F-2-R)에서도 불가 ' +
        '(Entertainment restriction — blocked even in F-2-R depopulation areas)';
      return result;
    }

    // ====================================================================
    // STEP 2: 단순노무 확인 (KSCO 대분류 9)
    // STEP 2: Simple labor check (KSCO major group 9)
    // 법적 근거: 출입국관리법 시행령 별표1의3
    // Legal basis: Immigration Act Enforcement Decree Appendix 1-3
    // ====================================================================
    const isSimpleLabor = isSimpleLaborOccupation(input.occupationCode);

    if (isSimpleLabor) {
      // --- 2-a: 인구감소지역 예외 → eligible (단순노무 제한 해제) ---
      // --- 2-a: Depopulation area exception → eligible (simple labor restriction lifted) ---
      if (input.workAddress.isDepopulationArea) {
        result.status = 'conditional';
        result.notes =
          '인구감소지역 — 단순노무 제한 해제, F-2-7 점수제 조건만 확인 필요 ' +
          '(Depopulation area — Simple labor restriction lifted, only F-2-7 point system condition to verify)';
      } else {
        // --- 2-b: 비인구감소지역 → blocked ---
        // --- 2-b: Non-depopulation area → blocked ---
        result.status = 'blocked';
        result.blockReasons.push(
          'F-2 비자는 단순노무 직종(KSCO 대분류 9) 취업이 금지됩니다 (인구감소지역 제외) ' +
            '(F-2 visa prohibits simple labor occupations — KSCO major group 9, except depopulation areas)',
        );
        result.notes =
          '인구감소지역 근무 시 단순노무 취업 가능 ' +
          '(Simple labor employment possible in depopulation areas)';
        return result;
      }
    }

    // ====================================================================
    // STEP 3: 적합 판정 + F-2-7 점수제 조건
    // STEP 3: Eligible determination + F-2-7 point system condition
    // ====================================================================

    // 단순노무가 아니거나, 인구감소지역 단순노무인 경우 여기에 도달
    // Reaches here if not simple labor, or simple labor in depopulation area
    if (!isSimpleLabor) {
      result.status = 'conditional';
    }

    // F-2-7 점수제 조건 추가
    // Add F-2-7 point system condition
    result.conditions.push(
      'F-2-7 점수제 비자 소지자는 유흥/단순노무만 제한, 그 외 자유 취업 가능 ' +
        '(F-2-7 point system holders: only entertainment/simple labor restricted, rest free)',
    );

    if (!result.notes) {
      result.notes =
        'F-2 거주비자 — 유흥업소/단순노무 제외 자유 취업 가능. F-2-7 점수제도 동일 제한 적용 ' +
        '(F-2 Residence — Free employment except entertainment/simple labor. Same restrictions for F-2-7 point system)';
    }

    result.estimatedDays = 0; // 즉시 채용 가능 / Immediate hiring
    result.requiredDocuments = [
      '외국인등록증 사본 (Copy of Alien Registration Card)',
      '이력서 및 경력증명서 (Resume and work experience certificate)',
      '근로계약서 (Labor contract)',
    ];

    // F-2-7 점수제인 경우 추가 서류
    // Additional documents for F-2-7 point system
    result.conditions.push(
      'F-2-7 점수제 해당 시: 이전 비자 경력증명서 제출 필요 ' +
        '(If F-2-7 point system: Previous visa work experience certificate required)',
    );

    return result;
  }

  /**
   * Applicant-side evaluation: 지원자의 F-2 하위 유형 확인
   * Applicant-side evaluation: Check applicant's F-2 subtype
   */
  evaluateApplicant(
    input: FulltimeJobInput,
    profile: ApplicantProfile,
  ): FulltimeVisaEvalResult {
    const result = this.evaluateJob(input);

    // ====================================================================
    // F-2-R 지역특화형: 단순노무 제한 해제
    // F-2-R Regional type: Simple labor restriction lifted
    // (향후 구현 — 현재는 conditional 유지)
    // (Future implementation — currently keep as conditional)
    // ====================================================================
    if (profile.currentVisaSubtype === 'F-2-R') {
      // F-2-R은 단순노무 제한이 해제됨
      // F-2-R has simple labor restriction lifted
      if (result.status === 'blocked') {
        const isSimpleLabor = isSimpleLaborOccupation(input.occupationCode);
        if (isSimpleLabor) {
          // 단순노무 차단이었다면 해제 (유흥업소 차단은 유지)
          // Lift simple labor block (entertainment block remains)
          result.status = 'conditional';
          result.blockReasons = [];
          result.notes =
            'F-2-R 거주(지역특화) — 단순노무 포함 취업 가능 (유흥업소 제한만 유지) ' +
            '(F-2-R Residence (Regional) — Employment including simple labor allowed, only entertainment restriction remains)';
        }
      }
      // F-2-R은 F-2-7 점수제 조건 불필요 → 조건 제거
      // F-2-R does not need F-2-7 point system condition → remove conditions
      result.conditions = result.conditions.filter((c) => !c.includes('F-2-7'));
      if (result.status === 'conditional') {
        result.status = 'eligible';
      }
      return result;
    }

    // ====================================================================
    // F-2-7 점수제: 유흥/단순노무만 제한, 그 외 자유
    // F-2-7 Point system: Only entertainment/simple labor restricted, rest free
    // ====================================================================
    if (profile.currentVisaSubtype === 'F-2-7') {
      // F-2-7은 유흥/단순노무만 제한, 그 외 분야는 자유 취업
      // F-2-7 only restricted from entertainment/simple labor, free in other fields
      // (유흥/단순노무 차단은 evaluateJob에서 이미 처리됨)
      // (Entertainment/simple labor blocks already handled in evaluateJob)

      if (result.status === 'conditional') {
        // 유흥/단순노무가 아닌 경우 → eligible
        // If not entertainment/simple labor → eligible
        result.status = 'eligible';
        result.conditions = result.conditions.filter((c) => !c.includes('F-2-7'));
        result.notes =
          'F-2-7 점수제 — 유흥/단순노무 외 자유 취업 가능 ' +
          '(F-2-7 Point system — Free employment except entertainment/simple labor)';
      }

      return result;
    }

    // ====================================================================
    // 기타 F-2 하위 유형 (F-2-1~6, F-2-99): 유흥/단순노무 외 제한 없음
    // Other F-2 subtypes (F-2-1~6, F-2-99): No restrictions except entertainment/simple labor
    // ====================================================================
    if (result.status === 'conditional') {
      result.status = 'eligible';
      result.conditions = result.conditions.filter((c) => !c.includes('F-2-7'));
    }

    return result;
  }
}
