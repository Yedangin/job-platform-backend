/**
 * D-10 구직비자 알바 평가기
 * D-10 Job Seeking Visa Alba (Part-time) Evaluator
 *
 * @visaCode       D-10
 * @legalBasis     출입국관리법 시행령 제12조 별표1 (D-10 체류자격) / Immigration Control Act Enforcement Decree Art. 12, Schedule 1
 *                 법무부 — D-10 비자 인턴 활동 허용 범위 / MOJ — D-10 Visa Internship Activity Scope
 *                 법무부 — D-10 비자 시간제 아르바이트 특례 (2025) / MOJ — D-10 Part-time Alba Exception (2025)
 * @conditionSummary
 *   - 경로 A (인턴): E-1~E-7 전문직종만 가능, 주 40시간, 허가 불필요 (Path A: professional fields only, 40h/week, no permit)
 *   - 경로 B (특례): D-2→D-10 변경자, TOPIK 4+, 주 20시간 (Path B: D-2→D-10 changers, TOPIK 4+, 20h/week)
 *   - 단순노무 알바 → blocked (Simple labor alba → blocked)
 * @lastVerified   2026-02-23
 */

import {
  AlbaJobInput,
  AlbaVisaEvalResult,
  IAlbaVisaEvaluator,
  createEmptyAlbaResult,
} from './alba-evaluator.interface';
import { getKsicMapping } from '../../common/data/visa';

/**
 * D-10 인턴 경로(Path A)에서 허용되는 전문직 직종 코드 목록
 * Professional job category codes allowed under D-10 Path A (Internship)
 *
 * E-1~E-7 전문직종에 해당하는 알바 플랫폼 직종만 포함.
 * Only includes platform job categories that correspond to E-1~E-7 professional fields.
 *
 * E-1: 교수 → P (교육 / Education)
 * E-2: 회화지도 → P (교육 / Education)
 * E-3: 연구 → M (전문/과학/기술 / Professional/Scientific/Technical)
 * E-4: 기술지도 → M (전문/과학/기술 / Professional/Scientific/Technical)
 * E-5: 전문직업 → M, J, K 등 (다양한 전문분야 / Various professional fields)
 * E-6: 예술흥행 → R (예술/스포츠 / Arts/Sports)
 * E-7: 특정활동 → 다양 (M, J, N 등 / Various: M, J, N, etc.)
 */
const D10_PROFESSIONAL_CATEGORY_CODES: ReadonlyArray<string> = [
  'INTERN_PROFESSIONAL', // 전문직 인턴 / Professional Internship (M)
  'IT_ASSIST', // IT/개발 보조 / IT/Development Assistant (J)
  'TRANSLATION', // 번역/통역 / Translation/Interpretation (M)
  'OFFICE_ASSIST', // 사무보조 / Office Assistant (N)
  'TUTORING', // 과외/학원 강사 / Tutoring/Academy Instructor (P)
];

/**
 * D-10 인턴 경로에서 허용되는 KSIC 대분류 코드
 * KSIC section codes allowed under D-10 Path A (E-1~E-7 professional fields)
 *
 * 직종 코드 목록에 없는 새 직종이 추가될 때를 대비한 2차 검증.
 * Secondary validation for when new job categories are added that aren't in the list above.
 */
const D10_ALLOWED_KSIC_CODES: ReadonlyArray<string> = [
  'M', // 전문, 과학 및 기술 서비스업 / Professional, scientific, technical (E-3, E-4, E-5, E-7)
  'J', // 정보통신업 / Information and communication (E-5, E-7)
  'P', // 교육 서비스업 / Education (E-1, E-2)
  'R', // 예술, 스포츠 및 여가 / Arts, sports, recreation (E-6)
  'N', // 사업시설 관리 및 지원 / Business facilities management (E-7 일부)
];

export class D10AlbaEvaluator implements IAlbaVisaEvaluator {
  readonly visaCode = 'D-10';
  readonly visaName = '구직';
  readonly visaNameEn = 'Job Seeking';

  evaluate(input: AlbaJobInput): AlbaVisaEvalResult {
    const result = createEmptyAlbaResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
    );

    // === STEP 1: 직종 코드로 전문직 여부 판별 / Check if job category is professional ===
    const isProfessionalByCode = D10_PROFESSIONAL_CATEGORY_CODES.includes(
      input.jobCategoryCode,
    );

    // === STEP 2: KSIC 코드로 2차 검증 / Secondary check via KSIC code ===
    const mapping = getKsicMapping(input.jobCategoryCode);
    const ksicCode = mapping?.ksicCode ?? input.ksicCode;
    const isProfessionalByKsic = D10_ALLOWED_KSIC_CODES.includes(ksicCode);

    // === STEP 3: 전문직이 아닌 경우 → 차단 / Non-professional job → BLOCKED ===
    if (!isProfessionalByCode && !isProfessionalByKsic) {
      result.status = 'blocked';
      result.blockReasons.push(
        'D-10 비자는 단순노무 알바 불가 — 전문직종(E-1~E-7) 인턴만 가능 ' +
          '(D-10 visa does not allow simple labor alba — only professional field internships in E-1~E-7 categories)',
      );
      result.notes =
        'D-10 비자 소지자는 식당, 카페, 편의점, 공장 등 단순노무 알바에 취업할 수 없습니다. ' +
        '전문직종(IT, 번역, 연구, 교육 등) 인턴십만 허용됩니다. / ' +
        'D-10 visa holders cannot work simple labor alba (restaurant, cafe, convenience store, factory, etc.). ' +
        'Only professional field internships (IT, translation, research, education, etc.) are permitted.';
      return result;
    }

    // === STEP 4: 전문직종 → 조건부 허용 (인턴 활동 가능) / Professional field → CONDITIONAL ===
    result.status = 'conditional';

    // 인턴 형태 조건 / Internship format condition
    result.conditions.push(
      '인턴 형태로만 채용 가능 — 단순 아르바이트 계약 불가 ' +
        '(Must be hired as intern — simple part-time contract not allowed)',
    );

    // E-1~E-7 전문직종 한정 조건 / E-1~E-7 professional field restriction
    result.conditions.push(
      'E-1~E-7 전문직종 범위 내 업무만 가능 ' +
        '(Only tasks within E-1~E-7 professional field scope allowed)',
    );

    // 15일 이내 연수개시신고 필수 / Training start report within 15 days
    result.conditions.push(
      '인턴 시작 후 15일 이내 출입국관리사무소에 연수개시신고 필수 ' +
        '(Must report internship start to immigration office within 15 days)',
    );

    // D-10 하위유형별 제한 안내 / D-10 sub-type restrictions
    result.conditions.push(
      'D-10-1(유학생 출신)만 인턴 가능 — D-10-1(전문직 경력자)·D-10-2(기술창업준비)는 불가 ' +
        '(Only D-10-1 (former student) eligible — D-10-1 (professional career) and D-10-2 (tech startup) are ineligible)',
    );

    // 동일 기업 최대 1년 / Max 1 year at same company
    result.conditions.push(
      '동일 기업 인턴 기간 최대 1년 (2025.10.29 시행) ' +
        '(Max 1 year internship at the same company, effective 2025.10.29)',
    );

    // 근무시간 제한 설정 / Set work hour limit
    // 경로 A (인턴): 1일 8시간, 주 40시간 / Path A (intern): 8h/day, 40h/week
    result.maxWeeklyHours = 40;

    // 체류자격외활동허가 불필요 (인턴 경로) / No extra-status activity permit needed (intern path)
    result.requiredPermit = null;

    // 참고사항 / Notes
    result.notes =
      'D-10 인턴은 체류자격외활동허가 불필요. 단, 인턴 시작 후 15일 이내 연수개시신고 필수. ' +
      'D-10-3(첨단기술인턴)은 첨단기술 분야에 한해 인턴 가능. ' +
      '시간제 아르바이트 특례(경로 B)는 D-2→D-10 변경자 중 전문학사+ 학위(3년 미경과) + TOPIK 4급+ + ' +
      'E-1~E-7 경력 없음 조건 충족 시에만 가능하며, 이는 개별 구직자 확인이 필요합니다. / ' +
      'D-10 internship does not require extra-status activity permit, but training start must be reported within 15 days. ' +
      'D-10-3 (advanced tech intern) is limited to advanced technology fields. ' +
      'Part-time alba exception (Path B) is only available for D-2→D-10 changers with associate degree+ (within 3 years) + ' +
      'TOPIK 4+ and no E-1~E-7 history, which requires individual worker verification.';

    return result;
  }
}
