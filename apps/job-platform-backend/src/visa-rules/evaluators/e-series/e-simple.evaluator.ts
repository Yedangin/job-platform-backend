import { BaseVisaEvaluator } from '../base.evaluator';
import { EvaluateVisaInput, VisaEvaluation, VisaTypeWithRelations } from '../evaluator.interface';

/**
 * E 시리즈 간단 평가기 (E-1, E-3, E-4, E-5, E-6, E-8, E-10)
 * 공통 로직: 고용계약 기반 조건부 취업
 */
export class ESimpleEvaluator extends BaseVisaEvaluator {
  readonly visaCodes = [
    'E-1', 'E-3', 'E-4', 'E-5',
    'E-6', 'E-6-1', 'E-6-2', 'E-6-3',
    'E-8', 'E-10', 'E-10-1', 'E-10-2',
  ];

  private readonly visaDescriptions: Record<string, { minEdu: number; industries: string; notes: string }> = {
    'E-1': { minEdu: 4, industries: '교육(85)', notes: '전문대 이상 교육기관에서 교수/강사 활동' },
    'E-3': { minEdu: 4, industries: '연구(70)', notes: '자연과학/산업기술 분야 연구 활동' },
    'E-4': { minEdu: 3, industries: '전업종', notes: '자연과학 분야 기술지도' },
    'E-5': { minEdu: 3, industries: '전문직(법률/회계/의료)', notes: '한국 자격증 보유 전문직' },
    'E-6': { minEdu: 0, industries: '예술/스포츠(90,91)', notes: '예술/연예/체육 활동' },
    'E-8': { minEdu: 0, industries: '농축산/어업(01,03)', notes: '계절근로 최대 5개월' },
    'E-10': { minEdu: 0, industries: '수상운송(50)', notes: '선원 취업' },
  };

  evaluate(input: EvaluateVisaInput, visaType: VisaTypeWithRelations): VisaEvaluation {
    const result = this.createEmptyResult();
    result.documents = this.getRequiredDocuments(visaType.requiredDocuments);

    const baseCode = visaType.parentCode ?? visaType.code;
    const desc = this.visaDescriptions[baseCode];
    if (!desc) {
      result.eligible = true;
      result.notes.push('해당 비자 상세 평가기준은 추후 업데이트 예정');
      return result;
    }

    // 학력 확인
    if (desc.minEdu > 0 && this.educationToNumber(input.educationLevel) < desc.minEdu) {
      const eduNames = ['', '고졸', '전문학사', '학사', '석사', '박사'];
      result.blockedReasons.push(`최소 학력 요건: ${eduNames[desc.minEdu]} 이상`);
      return result;
    }

    result.eligible = true;
    result.matchedIndustries.push(input.ksicCode);
    result.restrictions.push('고용계약서 상 사업장/활동에서만 근무 가능');
    result.notes.push(desc.notes);
    if (visaType.maxStayMonths) {
      result.notes.push(`최대 체류기간: ${visaType.maxStayMonths}개월`);
    }

    return result;
  }
}
