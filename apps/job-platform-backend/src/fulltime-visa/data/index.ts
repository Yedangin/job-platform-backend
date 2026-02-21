/**
 * 정규채용관 비자 매칭 데이터 모듈
 * Fulltime Visa Matching Data Module
 *
 * 이 파일은 정규채용관에서 사용하는 모든 데이터 모듈을 re-export합니다.
 * This file re-exports all data modules used in fulltime visa matching.
 */

// ── GNI 테이블 / GNI Table ──
export * from './gni-table';

// ── E-7 직종 매핑 / E-7 Occupation Mapping ──
export * from './e7-occupation-map';

// ── 한국표준직업분류 / Korean Standard Classification of Occupations ──
export * from './occupation-code-table';

// ── 인구감소지역 (알바와 공용) / Depopulation Areas (shared with alba) ──
// 알바 비자 매칭의 depopulation-areas.ts를 re-export
// Re-export depopulation-areas.ts from alba visa matching
export {
  isDepopulationArea,
  DEPOPULATION_AREAS,
} from '../../alba-visa/data/depopulation-areas';
