/**
 * F-5 영주비자 정규직 평가기
 * F-5 Permanent Residence Visa Fulltime Evaluator
 *
 * F-5 핵심: 내국인과 동일한 취업 권리. 모든 직종, 모든 조건에서 채용 가능.
 * F-5 core: Same employment rights as Korean nationals. Hireable for all occupations and conditions.
 *
 * [특징 / Characteristics]
 * ① 업종 제한 없음 (No industry restriction)
 * ② 직종 제한 없음 (No occupation restriction)
 * ③ 연봉 제한 없음 (No salary restriction)
 * ④ 학력 요구 없음 (No education requirement)
 * ⑤ 별도 허가 불필요 (No additional permit required)
 *
 * [채용 트랙 / Hiring Track]
 * - IMMEDIATE: 즉시 채용 가능 (F비자 소지자)
 *
 * [법적 근거 / Legal Basis]
 * 출입국관리법 시행령 별표1 제28호 — F-5: 영주자격
 * 대한민국에서 영구적 체류 가능, 활동 제한 없음
 */

import {
  FulltimeJobInput,
  ApplicantProfile,
  FulltimeVisaEvalResult,
  IFulltimeVisaEvaluator,
  createEmptyFulltimeResult,
} from './fulltime-evaluator.interface';

export class F5FulltimeEvaluator implements IFulltimeVisaEvaluator {
  readonly visaCode = 'F-5';
  readonly visaName = '영주';
  readonly visaNameEn = 'Permanent Residence';

  /**
   * Job-side evaluation: F-5는 모든 공고에 적합
   * Job-side evaluation: F-5 is eligible for all job postings
   */
  evaluateJob(_input: FulltimeJobInput): FulltimeVisaEvalResult {
    const result = createEmptyFulltimeResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
      'IMMEDIATE',
    );

    // 무조건 적합 — 내국인과 동일한 취업 권리
    // Always eligible — same employment rights as Korean nationals
    result.status = 'eligible';
    result.requiredPermit = null; // 별도 허가 불필요 / No additional permit

    result.notes =
      'F-5 영주비자 — 내국인과 동일한 취업 권리, 모든 직종 취업 가능, 별도 허가 불필요 ' +
      '(F-5 Permanent Residence — Same employment rights as Korean nationals, ' +
      'eligible for all occupations, no additional permit required)';

    result.estimatedDays = 0; // 즉시 채용 가능 / Immediate hiring
    result.requiredDocuments = [
      '외국인등록증 사본 (Copy of Alien Registration Card)',
      '이력서 및 경력증명서 (Resume and work experience certificate)',
      '근로계약서 (Labor contract)',
    ];

    return result;
  }

  /**
   * Applicant-side evaluation: 지원자 프로필 기반 교차 검증
   * Applicant-side evaluation: Cross-validation with applicant profile
   */
  evaluateApplicant(
    input: FulltimeJobInput,
    profile: ApplicantProfile,
  ): FulltimeVisaEvalResult {
    // F-5는 job-side와 동일 — 지원자 조건과 무관하게 항상 적합
    // F-5 is same as job-side — always eligible regardless of applicant conditions
    const result = this.evaluateJob(input);

    // 지원자의 학력/경력이 공고 요구사항을 충족하는지 별도 확인 가능
    // Can separately check if applicant's education/experience meets job requirements
    // (이는 비자 평가와 별개이므로 여기서는 생략)
    // (This is separate from visa evaluation, so omitted here)

    return result;
  }
}
