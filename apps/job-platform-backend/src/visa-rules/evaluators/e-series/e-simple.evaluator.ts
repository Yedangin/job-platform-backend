import { BaseVisaEvaluator } from '../base.evaluator';
import {
  EvaluateVisaInput,
  VisaEvaluation,
  VisaTypeWithRelations,
} from '../evaluator.interface';

/**
 * E 시리즈 간단 평가기 (E-1, E-3, E-4, E-5, E-6, E-8, E-10)
 * 공통 로직: 고용계약 기반 조건부 취업
 */
export class ESimpleEvaluator extends BaseVisaEvaluator {
  readonly visaCodes = [
    'E-1',
    'E-3',
    'E-4',
    'E-5',
    'E-6',
    'E-6-1',
    'E-6-2',
    'E-6-3',
    'E-8',
    'E-10',
    'E-10-1',
    'E-10-2',
  ];

  private readonly visaDescriptions: Record<
    string,
    { minEdu: number; allowedPrefixes?: string[]; notes: string }
  > = {
    'E-1': {
      minEdu: 4,
      allowedPrefixes: ['85'],
      notes: '전문대 이상 교육기관에서 교수/강사 활동',
    },
    'E-3': {
      minEdu: 4,
      allowedPrefixes: ['70', '72', '73', '21'],
      notes: '자연과학/산업기술 분야 연구 활동',
    },
    'E-4': { minEdu: 3, notes: '자연과학 분야 기술지도' },
    'E-5': {
      minEdu: 3,
      notes: '한국 자격증 보유 전문직 (법률/회계/의료)',
    },
    'E-6': {
      minEdu: 0,
      allowedPrefixes: ['90', '91', '59'],
      notes: '예술/연예/체육 활동',
    },
    'E-8': {
      minEdu: 0,
      allowedPrefixes: ['01', '02', '03'],
      notes: '계절근로 최대 5개월 (농축산/어업만 허용)',
    },
    'E-10': {
      minEdu: 0,
      allowedPrefixes: ['50'],
      notes: '선원 취업 (수상운송업)',
    },
  };

  evaluate(
    input: EvaluateVisaInput,
    visaType: VisaTypeWithRelations,
  ): VisaEvaluation {
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
    if (
      desc.minEdu > 0 &&
      this.educationToNumber(input.educationLevel) < desc.minEdu
    ) {
      const eduNames = ['', '고졸', '전문학사', '학사', '석사', '박사'];
      result.blockedReasons.push(
        `최소 학력 요건: ${eduNames[desc.minEdu]} 이상`,
      );
      return result;
    }

    // 업종 제한 확인 (해당 비자에 허용 업종이 지정된 경우)
    if (desc.allowedPrefixes && desc.allowedPrefixes.length > 0) {
      const industryAllowed = desc.allowedPrefixes.some((p) =>
        input.ksicCode.startsWith(p),
      );
      if (!industryAllowed) {
        result.blockedReasons.push(
          `업종코드 ${input.ksicCode}은(는) ${baseCode} 비자 허용 업종이 아님`,
        );
        result.suggestions.push(`${baseCode} 허용 업종: ${desc.notes}`);
        return result;
      }
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
