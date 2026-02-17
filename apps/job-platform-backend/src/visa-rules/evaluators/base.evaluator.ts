/**
 * 비자 평가기 베이스 클래스
 * 공통 헬퍼 메서드 제공
 */

import {
  EvaluateVisaInput,
  VisaEvaluation,
  VisaTypeWithRelations,
  IVisaEvaluator,
} from './evaluator.interface';

export abstract class BaseVisaEvaluator implements IVisaEvaluator {
  abstract readonly visaCodes: string[];
  abstract evaluate(
    input: EvaluateVisaInput,
    visaType: VisaTypeWithRelations,
  ): VisaEvaluation;

  /** 빈 평가 결과 생성 */
  protected createEmptyResult(): VisaEvaluation {
    return {
      eligible: false,
      documents: [],
      restrictions: [],
      blockedReasons: [],
      suggestions: [],
      notes: [],
      matchedIndustries: [],
      matchedOccupations: [],
    };
  }

  /** 국가 제한 확인 - whitelist 방식 (ALLOWED/MOU_REQUIRED만 통과) */
  protected checkCountryAllowed(
    nationality: string | undefined,
    restrictions: VisaTypeWithRelations['countryRestrictions'],
  ): { allowed: boolean; reason?: string } {
    if (!nationality) return { allowed: true }; // 국적 미입력 시 패스
    if (restrictions.length === 0) return { allowed: true }; // 제한 없으면 패스

    const match = restrictions.find((r) => r.countryCode === nationality);
    if (!match) {
      return {
        allowed: false,
        reason: `국적 ${nationality}은(는) 허용 국가 목록에 포함되지 않음`,
      };
    }
    if (match.restrictionType === 'BLOCKED') {
      return {
        allowed: false,
        reason: `국적 ${nationality}(${match.countryNameKo})은(는) 금지 국가`,
      };
    }
    return { allowed: true };
  }

  /** 업종 매핑 확인 - KSIC prefix 매칭 */
  protected checkIndustryAllowed(
    ksicCode: string,
    mappings: VisaTypeWithRelations['industryMappings'],
  ): { allowed: boolean; matched?: string; reason?: string } {
    if (mappings.length === 0) return { allowed: true }; // 매핑 없으면 패스

    // prefix 매칭으로 가장 구체적인 것을 찾음
    const match = mappings
      .filter((m) => ksicCode.startsWith(m.industryCode.ksicCode))
      .sort(
        (a, b) =>
          b.industryCode.ksicCode.length - a.industryCode.ksicCode.length,
      )[0];

    if (!match) {
      return {
        allowed: false,
        reason: `업종코드 ${ksicCode}은(는) 허용 업종에 포함되지 않음`,
      };
    }
    if (!match.isAllowed) {
      return {
        allowed: false,
        reason: `업종 ${match.industryCode.nameKo}은(는) 금지 업종`,
      };
    }
    return { allowed: true, matched: match.industryCode.ksicCode };
  }

  /** 직종 매핑 확인 - KSCO prefix 매칭 */
  protected checkOccupationAllowed(
    kscoCode: string | undefined,
    mappings: VisaTypeWithRelations['occupationMappings'],
  ): { allowed: boolean; matched?: string; reason?: string } {
    if (!kscoCode) return { allowed: true }; // 직종 미입력 시 패스
    if (mappings.length === 0) return { allowed: true }; // 매핑 없으면 패스

    const match = mappings
      .filter((m) => kscoCode.startsWith(m.occupationCode.kscoCode))
      .sort(
        (a, b) =>
          b.occupationCode.kscoCode.length - a.occupationCode.kscoCode.length,
      )[0];

    if (!match) {
      return {
        allowed: false,
        reason: `직종코드 ${kscoCode}은(는) 허용 직종에 포함되지 않음`,
      };
    }
    if (!match.isAllowed) {
      return {
        allowed: false,
        reason: `직종 ${match.occupationCode.nameKo}은(는) 금지 직종`,
      };
    }
    return { allowed: true, matched: match.occupationCode.kscoCode };
  }

  /** 외국인 고용 비율 확인 */
  protected checkForeignWorkerRatio(
    koreanCount: number,
    foreignCount: number,
    maxRatio: number = 0.2,
  ): { allowed: boolean; currentRatio: number; reason?: string } {
    const total = koreanCount + foreignCount;
    if (total === 0) return { allowed: true, currentRatio: 0 };
    const ratio = foreignCount / (koreanCount || 1);
    if (ratio > maxRatio) {
      return {
        allowed: false,
        currentRatio: ratio,
        reason: `외국인 고용비율 ${(ratio * 100).toFixed(1)}% (한도 ${(maxRatio * 100).toFixed(0)}% 초과)`,
      };
    }
    return { allowed: true, currentRatio: ratio };
  }

  /** 나이 확인 */
  protected checkAge(
    age: number | undefined,
    minAge: number | null,
    maxAge: number | null,
  ): { allowed: boolean; reason?: string } {
    if (age === undefined) return { allowed: true };
    if (minAge !== null && age < minAge) {
      return {
        allowed: false,
        reason: `만 ${age}세 - 최소 연령 ${minAge}세 미충족`,
      };
    }
    if (maxAge !== null && age > maxAge) {
      return {
        allowed: false,
        reason: `만 ${age}세 - 최대 연령 ${maxAge}세 초과`,
      };
    }
    return { allowed: true };
  }

  /** 필요 서류 목록 추출 */
  protected getRequiredDocuments(
    docs: VisaTypeWithRelations['requiredDocuments'],
  ): string[] {
    return docs.filter((d) => d.isRequired).map((d) => d.documentName);
  }

  /** 학력 레벨 숫자 변환 (비교용) */
  protected educationToNumber(level: string | undefined): number {
    const map: Record<string, number> = {
      HIGH_SCHOOL: 1,
      COLLEGE: 2,
      BACHELOR: 3,
      MASTER: 4,
      DOCTOR: 5,
    };
    return map[level ?? ''] ?? 0;
  }

  /** TOPIK 레벨 숫자 변환 */
  protected topikToNumber(level: string | undefined): number {
    if (!level) return 0;
    const match = level.match(/TOPIK(\d)/);
    return match ? parseInt(match[1], 10) : 0;
  }
}
