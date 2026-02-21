/**
 * F-2 거주비자 정규직 평가기
 * F-2 Residence Visa Fulltime Evaluator
 *
 * F-2 핵심: 거의 제한 없는 취업. 유흥업소만 금지, F-2-7 점수제는 조건부.
 * F-2 core: Almost unrestricted employment. Only entertainment venues blocked, F-2-7 point system conditional.
 *
 * [F-2 하위 유형 / F-2 Subtypes]
 * F-2-1: 국민의 미성년 외국인 자녀 (Minor child of Korean national)
 * F-2-2: 국민 또는 영주권자 배우자 (Spouse of Korean or permanent resident)
 * F-2-3: 난민인정자 (Recognized refugee)
 * F-2-4: 부 또는 모가 한국인인 자 (Person with Korean parent)
 * F-2-5: F-5 신청 요건 충족 (Meets F-5 application requirements)
 * F-2-6: 미화 50만불 이상 투자 (Invested 500K USD+)
 * F-2-7: 점수제 (Point system) ← 조건부 (Conditional)
 * F-2-99: 법무부장관 인정 (Approved by MOJ)
 *
 * [F-2-7 점수제 조건 / F-2-7 Point System Condition]
 * F-2-7 소지자는 이전 비자(E-7, E-5 등)와 동일 분야에서만 취업 가능.
 * F-2-7 holders can only work in the same field as their previous visa (E-7, E-5, etc).
 *
 * [채용 트랙 / Hiring Track]
 * - IMMEDIATE: 즉시 채용 가능 (F비자 소지자)
 *
 * [법적 근거 / Legal Basis]
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
import { getKsicMapping } from '../../alba-visa/data/ksic-mapping';

export class F2FulltimeEvaluator implements IFulltimeVisaEvaluator {
  readonly visaCode = 'F-2';
  readonly visaName = '거주';
  readonly visaNameEn = 'Residence';

  /**
   * Job-side evaluation: F-2는 대부분 공고에 적합 (유흥업소 제외)
   * Job-side evaluation: F-2 is eligible for most jobs (except entertainment)
   */
  evaluateJob(input: FulltimeJobInput): FulltimeVisaEvalResult {
    const result = createEmptyFulltimeResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
      'IMMEDIATE',
    );

    // KSIC 매핑 조회: 유흥업소 확인
    // KSIC mapping lookup: check entertainment venues
    const mapping = getKsicMapping(input.occupationCode);
    if (mapping?.isEntertainment) {
      result.status = 'blocked';
      result.blockReasons.push(
        'F-2 비자도 유흥업소 취업이 금지됩니다 ' +
          '(F-2 visa also prohibits entertainment venue employment)',
      );
      return result;
    }

    // 대부분의 F-2는 적합 (F-2-7 점수제 제외)
    // Most F-2 holders are eligible (except F-2-7 point system)
    result.status = 'conditional';

    // F-2-7 점수제 조건 추가
    // Add F-2-7 point system condition
    result.conditions.push(
      'F-2-7 점수제 비자 소지자는 이전 비자(E-7, E-5 등)와 동일 분야에서만 취업 가능 ' +
        '(F-2-7 point system holders can only work in the same field as their previous visa)',
    );

    result.requiredPermit = null; // 별도 허가 불필요 / No additional permit

    result.notes =
      'F-2 거주비자 — 대부분 제한 없이 취업 가능. F-2-7 점수제의 경우 이전 비자 분야 제한 ' +
      '(F-2 Residence — Most holders have no restrictions. F-2-7 point system limited to previous visa field)';

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

    // F-2-7 점수제인 경우 추가 검증
    // Additional validation for F-2-7 point system
    if (profile.currentVisaSubtype === 'F-2-7') {
      // F-2-7은 이전 비자(E-7, E-5 등)와 동일 분야인지 확인 필요
      // F-2-7 needs to check if same field as previous visa (E-7, E-5, etc)
      // 이 검증은 이력서 경력 데이터 기반으로 별도 수행 필요
      // This validation needs separate processing based on resume career data

      result.conditions.push(
        '이전 비자 분야와 일치 여부 확인 필요 (Need to verify if same field as previous visa)',
      );
    } else {
      // F-2-7이 아닌 경우 제한 없음
      // No restrictions if not F-2-7
      result.status = 'eligible';
      result.conditions = result.conditions.filter((c) => !c.includes('F-2-7'));
    }

    return result;
  }
}
