/**
 * 비자 매칭 공용 데이터 모듈
 * Shared Visa Matching Data Module
 *
 * 알바(alba-visa)와 정규채용(fulltime-visa) 모듈에서 공통으로 사용하는
 * 데이터 파일들을 re-export합니다.
 *
 * Re-exports data files shared between alba-visa and fulltime-visa modules.
 */

// ── KSIC 매핑 / KSIC Mapping ──
export * from './ksic-mapping';

// ── 인구감소지역 / Depopulation Areas ──
export * from './depopulation-areas';

// ── GNI 테이블 / GNI Table ──
export * from './gni-table';

// ── 한국표준직업분류 / Korean Standard Classification of Occupations ──
export * from './occupation-code-table';

// ── 최저임금 기준 / Minimum Wage Standards ──
export * from './minimum-wage-standards';
