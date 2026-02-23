/**
 * D-2 유학비자 알바 평가기
 * D-2 Study Visa Alba (Part-time) Evaluator
 *
 * @visaCode       D-2
 * @legalBasis     출입국관리법 시행령 제23조 (체류자격외활동허가) / Immigration Control Act Enforcement Decree Art. 23
 *                 법무부 고시 — 외국인유학생 시간제취업 허용범위 / MOJ Notice — Part-time Employment Scope for Foreign Students
 * @conditionSummary
 *   - 체류자격외활동허가 필수 (Extra-status activity permit required)
 *   - 건설·유흥·긱워크 절대 금지 (Construction, entertainment, gig work absolutely blocked)
 *   - 2025 TOPIK 매트릭스 기반 시간 제한 (Hour limits based on 2025 TOPIK matrix)
 *   - 최대 2개 사업장 (Max 2 workplaces)
 *   - 거리 제한: 수도권 90분 / 비수도권 60분 (Distance: metro 90min / non-metro 60min)
 * @lastVerified   2026-02-23
 */

import {
  AlbaJobInput,
  AlbaVisaEvalResult,
  IAlbaVisaEvaluator,
  createEmptyAlbaResult,
} from './alba-evaluator.interface';
import {
  D2_BLOCKED_KSIC_CODES,
  D2_BLOCK_DELIVERY,
  D2_BLOCK_GIG_WORK,
  // D2_BLOCK_DISPATCH_OUTSOURCING — 향후 AlbaJobInput에 isDispatch 필드 추가 시 활성화
  // Activate when isDispatch field is added to AlbaJobInput
  D2_CONDITIONAL_KSIC_CODES,
  D2_MAX_WORKPLACES,
  D2_SUB_TYPE_RULES,
  D2_HOUR_RULES,
  D2_DISTANCE_LIMITS,
  D2_EMPLOYER_REQUIREMENTS,
  D2_PENALTIES,
  D2SubTypeRule,
  D2HourRule,
} from '../data/d2-blocked-industries';
import { getKsicMapping } from '../../common/data/visa';

export class D2AlbaEvaluator implements IAlbaVisaEvaluator {
  readonly visaCode = 'D-2';
  readonly visaName = '유학';
  readonly visaNameEn = 'Study Abroad';

  evaluate(input: AlbaJobInput): AlbaVisaEvalResult {
    const result = createEmptyAlbaResult(
      this.visaCode,
      this.visaName,
      this.visaNameEn,
    );

    // 사업장 수 제한 설정 / Set workplace limit
    result.maxWorkplaces = D2_MAX_WORKPLACES;

    // 필수 허가 유형 설정 (체류자격외활동허가, NOT 시간제취업허가)
    // Set required permit type (Extra-status activity permit, NOT part-time employment permit)
    result.requiredPermit = '체류자격외활동허가';

    // === STEP 1: D-2 하위유형 확인 / D-2 sub-type check ===
    const subTypeResult = this.checkSubType(input);
    if (subTypeResult.blocked) {
      result.status = 'blocked';
      result.blockReasons.push(subTypeResult.reason);
      return result;
    }
    if (subTypeResult.waitingPeriod) {
      // D-2-8 등 대기기간 필요 / D-2-8 etc. requires waiting period
      result.conditions.push(subTypeResult.reason);
    }

    // === STEP 2: 업종 제한 확인 / Industry restriction check ===
    const industryResult = this.checkIndustryRestriction(input);
    if (industryResult.blocked) {
      result.status = 'blocked';
      result.blockReasons.push(industryResult.reason);
      // 건설업 절대 금지의 경우 추가 처벌 정보 포함
      // Include additional penalty info for absolute construction block
      if (industryResult.penalty) {
        result.blockReasons.push(`[처벌/Penalty] ${industryResult.penalty}`);
      }
      return result;
    }
    if (industryResult.conditional) {
      // 제조업 등 조건부 업종: 조건 추가 후 계속 진행
      // Conditional industry (e.g., manufacturing): add condition and continue
      result.conditions.push(industryResult.reason);
    }

    // === STEP 3: 시간 제한 확인 / Hour limit check ===
    const hourResult = this.checkHourLimit(input);

    // 시간 결과를 결과에 반영 / Apply hour result
    if (hourResult.status === 'blocked') {
      result.status = 'blocked';
      result.blockReasons.push(hourResult.reason);
      return result;
    }

    if (hourResult.status === 'eligible') {
      // 주말만 근무이거나 방학 중 TOPIK 충족 → eligible
      // Weekend-only or vacation with TOPIK met → eligible
      result.status =
        industryResult.conditional || subTypeResult.waitingPeriod
          ? 'conditional'
          : 'eligible';
      result.maxWeeklyHours = hourResult.maxWeeklyHours ?? null;
    } else {
      // conditional 상태 / conditional status
      result.status = 'conditional';
      result.conditions.push(hourResult.reason);
      result.maxWeeklyHours = hourResult.maxWeeklyHours ?? null;
    }

    // 시간 관련 노트 추가 / Add hour-related notes
    if (hourResult.notes) {
      result.conditions.push(hourResult.notes);
    }

    // === STEP 4: 사업장 수 경고 / Workplace count warning ===
    result.conditions.push(
      `D-2 비자는 최대 ${D2_MAX_WORKPLACES}개 사업장만 허용 (D-2 visa allows max ${D2_MAX_WORKPLACES} concurrent workplaces)`,
    );

    // === STEP 5: 거리 제한 안내 / Distance restriction note ===
    const distanceNote = this.buildDistanceNote();
    result.conditions.push(distanceNote);

    // === STEP 6: 고용주 서류 + 처벌 안내 / Employer docs + penalty notes ===
    const employerNotes = this.buildEmployerNotes(input);
    const penaltyNotes = this.buildPenaltyNotes();

    // notes 필드에 종합 안내 / Comprehensive guidance in notes field
    const notesParts: string[] = [];

    // 허가 전 근무 시작 절대 금지 경고
    // ABSOLUTE WARNING: Working before permit approval is strictly prohibited
    notesParts.push(
      '[필수/Required] 체류자격외활동허가 승인 전 근무 시작 절대 금지 — 위반 시 기업도 불법고용으로 처벌 ' +
        '(Working before extra-status activity permit approval is absolutely prohibited — employer also penalized for illegal employment)',
    );

    // 허가 신청 안내 / Permit application info
    notesParts.push(
      '[신청/Application] 2025.08.07부터 하이코리아(hikorea.go.kr) 온라인 전용. 수수료 면제, 처리기간 14일 이내(통상 3~5일) ' +
        '(From 2025.08.07, online only via HiKorea. Fee exempt, processing within 14 days, typically 3-5 days)',
    );

    // 학기 vs 방학 안내 / Semester vs vacation info
    notesParts.push(
      '[학기 중/Semester] 토·공휴일 근무는 주당 시간 산정에서 제외 (사실상 무제한) ' +
        '(Weekend/holiday hours excluded from weekly count — effectively unlimited)',
    );
    notesParts.push(
      '[방학 중/Vacation] TOPIK 충족 시 시간 무제한, 미충족 시 학기 중 허용시간의 1/2 ' +
        '(Unlimited when TOPIK met, half of semester hours when not met)',
    );

    // 우대조건 안내 / Bonus condition info
    notesParts.push(
      '[우대/Bonus +5h] 인증대학 재학 / 직전학기 A학점 이상 / TOPIK 5급 이상 중 하나 충족 시 기본 시간에 +5시간 ' +
        '(+5h if any: certified university / GPA A+ previous semester / TOPIK 5+)',
    );

    // 고용주 서류 안내 / Employer document notes
    notesParts.push(employerNotes);

    // 처벌 안내 / Penalty notes
    notesParts.push(penaltyNotes);

    result.notes = notesParts.join(' | ');

    return result;
  }

  // ===========================================================================
  // D-2 하위유형 확인 / D-2 sub-type check
  //
  // D-2-5 (연구): 연구 수당 수령 중 → 차단
  // D-2-5 (Research): receiving stipend → blocked
  // D-2-8 (단기유학): 6개월 대기기간 필요 → conditional
  // D-2-8 (Short-term): 6-month waiting period → conditional
  // ===========================================================================
  private checkSubType(_input: AlbaJobInput): {
    blocked: boolean;
    waitingPeriod: boolean;
    reason: string;
    subTypeRule: D2SubTypeRule | null;
  } {
    // 현재 AlbaJobInput에 subType 필드가 없으므로,
    // 모든 D-2 하위유형에 대한 조건을 conditions에 추가.
    // 추후 input에 subType이 추가되면 개별 판정 가능.
    //
    // Currently AlbaJobInput doesn't have a subType field,
    // so we add conditions for all D-2 sub-types.
    // Once subType is added to input, individual evaluation is possible.

    // D-2-5 차단 조건과 D-2-8 대기기간 조건을 모두 conditions에 추가
    // Add both D-2-5 block and D-2-8 waiting period as conditions
    return {
      blocked: false,
      waitingPeriod: false,
      reason:
        'D-2-5(연구)는 시간제취업 불가. D-2-8(단기유학)은 입국 후 6개월 경과 필요 ' +
        '(D-2-5 Research: not eligible. D-2-8 Short-term: requires 6-month wait after entry)',
      subTypeRule: null,
    };
  }

  /**
   * D-2 하위유형으로 직접 판정 (subType이 input에 추가될 때 사용)
   * Direct sub-type evaluation (use when subType is added to input)
   *
   * @param subType D-2 하위유형 코드 (예: 'D-2-5') / D-2 sub-type code (e.g., 'D-2-5')
   */
  checkSubTypeByCode(subType: string): {
    blocked: boolean;
    waitingPeriod: boolean;
    reason: string;
    subTypeRule: D2SubTypeRule | null;
  } {
    const rule = D2_SUB_TYPE_RULES.find((r) => r.subType === subType);

    if (!rule) {
      // 알 수 없는 하위유형 → 기본 허용 (조건부)
      // Unknown sub-type → default allow (conditional)
      return {
        blocked: false,
        waitingPeriod: false,
        reason: `D-2 하위유형 '${subType}' 확인 필요 (D-2 sub-type '${subType}' needs verification)`,
        subTypeRule: null,
      };
    }

    if (rule.permission === 'blocked') {
      return {
        blocked: true,
        waitingPeriod: false,
        reason: `${rule.subType}(${rule.nameKo}) — ${rule.reasonKo} (${rule.reasonEn})`,
        subTypeRule: rule,
      };
    }

    if (rule.permission === 'waiting_period') {
      return {
        blocked: false,
        waitingPeriod: true,
        reason: `${rule.subType}(${rule.nameKo}) — ${rule.reasonKo} (${rule.reasonEn})`,
        subTypeRule: rule,
      };
    }

    return {
      blocked: false,
      waitingPeriod: false,
      reason: '',
      subTypeRule: rule,
    };
  }

  // ===========================================================================
  // 업종 제한 확인 / Check industry restriction
  //
  // 우선순위 / Priority:
  // 1. 건설업 → 절대 금지 (1차 적발 즉시 출국명령)
  //    Construction → ABSOLUTE block (immediate deportation)
  // 2. 유흥업소 → 전면 금지 (노래방, 유흥주점, 단란주점, 마사지업, PC방, 무도장)
  //    Entertainment → FULL block (karaoke, bars, massage, PC cafe, dance hall)
  // 3. 배달/긱워크 → 전면 금지 (택배, 배달대행, 대리기사)
  //    Delivery/Gig work → FULL block (parcel, food delivery, designated driver)
  // 4. 파견/도급/알선 → 전면 금지
  //    Dispatch/outsourcing → FULL block
  // 5. 제조업 → TOPIK 4+ 조건부
  //    Manufacturing → TOPIK 4+ conditional
  // ===========================================================================
  private checkIndustryRestriction(input: AlbaJobInput): {
    blocked: boolean;
    conditional: boolean;
    reason: string;
    penalty: string | null;
  } {
    // 1. KSIC 코드 기반 전면 금지 확인 (건설, 유흥)
    //    Check full block by KSIC code (construction, entertainment)
    const blockedEntry = D2_BLOCKED_KSIC_CODES.find(
      (entry) => entry.ksicCode === input.ksicCode,
    );
    if (blockedEntry) {
      return {
        blocked: true,
        conditional: false,
        reason: blockedEntry.reasonKo,
        penalty: blockedEntry.penaltyKo,
      };
    }

    // 2. 배달 전문 금지 확인 / Check delivery block
    if (D2_BLOCK_DELIVERY) {
      const mapping = getKsicMapping(input.jobCategoryCode);
      if (mapping?.isDelivery) {
        return {
          blocked: true,
          conditional: false,
          reason:
            'D-2 비자는 배달 전문 업종(배달대행 등) 취업이 금지됩니다 (D-2 visa prohibits delivery-only employment)',
          penalty:
            '유학생: 1차 1년 제한, 2차 강제퇴거 / 고용주: 3년 이하 징역 또는 3,000만원 이하 벌금',
        };
      }
    }

    // 3. 긱워크 금지 확인 (특수형태근로종사자)
    //    Check gig work block (platform/gig workers)
    if (D2_BLOCK_GIG_WORK) {
      const mapping = getKsicMapping(input.jobCategoryCode);
      if (mapping?.isGigWork) {
        return {
          blocked: true,
          conditional: false,
          reason:
            'D-2 비자는 특수형태근로종사자(택배, 배달대행, 대리기사 등) 취업이 전면 금지됩니다 ' +
            '(D-2 visa prohibits all gig/platform work: parcel delivery, food delivery agents, designated drivers, etc.)',
          penalty:
            '유학생: 1차 1년 제한, 2차 강제퇴거 / 고용주: 3년 이하 징역 또는 3,000만원 이하 벌금',
        };
      }
    }

    // 4. 유흥업소 확인 (KSIC 매핑 기반) / Check entertainment via KSIC mapping
    const mapping = getKsicMapping(input.jobCategoryCode);
    if (mapping?.isEntertainment) {
      return {
        blocked: true,
        conditional: false,
        reason:
          'D-2 비자는 유흥업소(노래방, 유흥주점, 단란주점, 마사지업, PC방, 무도장) 취업이 전면 금지됩니다 ' +
          '(D-2 visa prohibits all entertainment venue employment)',
        penalty:
          '유학생: 1차 1년 제한, 2차 강제퇴거 / 고용주: 3년 이하 징역 또는 3,000만원 이하 벌금',
      };
    }

    // 5. 파견/도급/알선 관계 확인 — 현재 input에 dispatch 플래그 없으므로 조건으로 안내
    //    Dispatch/outsourcing check — no flag in current input, so add as condition note
    //    (향후 input.isDispatch 필드 추가 시 여기서 직접 판정 가능)
    //    (Can directly evaluate here once input.isDispatch field is added)

    // 6. 조건부 허용 업종 확인 (제조업 등) / Check conditional industries (manufacturing)
    const conditionalEntry = D2_CONDITIONAL_KSIC_CODES.find(
      (entry) => entry.ksicCode === input.ksicCode,
    );
    if (conditionalEntry) {
      return {
        blocked: false,
        conditional: true,
        reason: conditionalEntry.reasonKo + ` (${conditionalEntry.reasonEn})`,
        penalty: null,
      };
    }

    return { blocked: false, conditional: false, reason: '', penalty: null };
  }

  // ===========================================================================
  // 시간 제한 확인 / Check hour limit
  //
  // 2025년 매트릭스 기반 판정 / 2025 matrix-based evaluation
  //
  // 학기 중 (월~금):
  //   - 전문학사/학부 1-2학년: TOPIK 3+: 20h base / 25h bonus. No TOPIK: 10h
  //   - 학부 3-4학년: TOPIK 4+: 20h base / 25h bonus. No TOPIK: 10h
  //   - 석사: TOPIK 4+: 25h base / 30h bonus. No TOPIK: 15h
  //   - 박사: TOPIK 4+: 30h base / 35h bonus. No TOPIK: 15h
  //
  // 주말/공휴일: TOPIK 충족 시 무제한, 미충족 시 1/2
  // 방학: TOPIK 충족 시 무제한, 미충족 시 허용시간의 1/2
  //
  // During semester (Mon-Fri):
  //   - Associate/1st-2nd year: TOPIK 3+: 20h base / 25h bonus. No TOPIK: 10h
  //   - 3rd-4th year: TOPIK 4+: 20h base / 25h bonus. No TOPIK: 10h
  //   - Master's: TOPIK 4+: 25h base / 30h bonus. No TOPIK: 15h
  //   - Doctoral: TOPIK 4+: 30h base / 35h bonus. No TOPIK: 15h
  //
  // Weekend/holiday: Unlimited when TOPIK met, half when not
  // Vacation: Unlimited when TOPIK met, half of allowed hours when not
  // ===========================================================================
  private checkHourLimit(input: AlbaJobInput): {
    status: 'eligible' | 'conditional' | 'blocked';
    reason: string;
    notes?: string;
    maxWeeklyHours?: number;
  } {
    // 주말만 근무 → TOPIK 충족 시 시간 제한 없음 / Weekend only → no hour limit when TOPIK met
    if (input.isWeekendOnly) {
      return {
        status: 'eligible',
        reason: '',
        notes:
          '주말/공휴일 근무는 TOPIK 충족 시 시간 제한 없음. TOPIK 미충족 시 학기 중 허용시간의 1/2 ' +
          '(Weekend/holiday work: unlimited when TOPIK met, half of semester hours when not met)',
        maxWeeklyHours: undefined,
      };
    }

    const hours = input.weeklyHours;

    // 최대 가능 시간 초과 확인 (박사 TOPIK 4+ 우대: 35시간)
    // Check max possible hours (Doctoral TOPIK 4+ with bonus: 35h)
    if (hours > 35) {
      return {
        status: 'blocked',
        reason:
          `D-2 비자 최대 주 35시간 초과 (신청 ${hours}시간). 박사 TOPIK 4급 이상 + 우대조건 충족 시에만 주 35시간 가능 ` +
          `(Exceeds D-2 visa max 35h/week (requested ${hours}h). Only doctoral TOPIK 4+ with bonus can work 35h)`,
        maxWeeklyHours: 35,
      };
    }

    // 30시간 초과 ~ 35시간: 박사 TOPIK 4+ 우대 필요
    // Over 30h ~ 35h: requires doctoral TOPIK 4+ with bonus
    if (hours > 30) {
      return {
        status: 'conditional',
        reason:
          '주 30시간 초과는 박사과정 TOPIK 4급+ 우대조건 충족 시에만 가능 (최대 35시간) ' +
          '(Over 30h/week only for doctoral TOPIK 4+ with bonus conditions, max 35h)',
        maxWeeklyHours: 35,
      };
    }

    // 25시간 초과 ~ 30시간: 석사 TOPIK 4+ 우대 또는 박사 TOPIK 4+ 기본
    // Over 25h ~ 30h: master's TOPIK 4+ bonus or doctoral TOPIK 4+ base
    if (hours > 25) {
      return {
        status: 'conditional',
        reason:
          '주 25시간 초과는 석사 TOPIK 4급+ 우대(주 30시간) 또는 박사 TOPIK 4급+(기본 주 30시간)에 해당 ' +
          "(Over 25h requires master's TOPIK 4+ bonus (30h) or doctoral TOPIK 4+ base (30h))",
        maxWeeklyHours: 30,
      };
    }

    // 20시간 초과 ~ 25시간: 석사 TOPIK 4+ 기본 또는 학부 우대
    // Over 20h ~ 25h: master's TOPIK 4+ base or undergraduate with bonus
    if (hours > 20) {
      return {
        status: 'conditional',
        reason:
          '주 20시간 초과는 석사 TOPIK 4급+(기본 주 25시간) 또는 학부/전문학사 TOPIK 충족 + 우대조건(주 25시간)에 해당 ' +
          "(Over 20h requires master's TOPIK 4+ base (25h) or undergrad TOPIK met + bonus (25h))",
        maxWeeklyHours: 25,
      };
    }

    // 15시간 초과 ~ 20시간: 학부/전문학사 TOPIK 충족 기본
    // Over 15h ~ 20h: undergraduate/associate TOPIK met base
    if (hours > 15) {
      return {
        status: 'conditional',
        reason:
          '주 15시간 초과는 TOPIK 충족 필요. 전문학사/학부 1-2학년: TOPIK 3급+, 학부 3-4학년: TOPIK 4급+(기본 주 20시간) ' +
          '(Over 15h requires TOPIK. Associate/1st-2nd year: TOPIK 3+, 3rd-4th year: TOPIK 4+ (base 20h))',
        maxWeeklyHours: 20,
      };
    }

    // 10시간 초과 ~ 15시간: 대학원 TOPIK 미충족 시에도 가능
    // Over 10h ~ 15h: possible even without TOPIK for graduate students
    if (hours > 10) {
      return {
        status: 'conditional',
        reason:
          '주 10시간 초과는 대학원생(석/박사) TOPIK 미충족 시에도 가능(주 15시간). ' +
          '학부생은 TOPIK 충족 필요 ' +
          '(Over 10h: graduate students can work up to 15h even without TOPIK. Undergrads require TOPIK)',
        maxWeeklyHours: 15,
      };
    }

    // 주 10시간 이하 → eligible (TOPIK 미충족 학부생도 가능)
    // 10h/week or less → eligible (even undergrads without TOPIK)
    return {
      status: 'eligible',
      reason: '',
      notes:
        '주 10시간 이하: TOPIK 미충족 학부생도 가능. 체류자격외활동허가 필수 ' +
        '(10h/week or less: available even for undergrads without TOPIK. Extra-status activity permit required)',
      maxWeeklyHours: 10,
    };
  }

  // ===========================================================================
  // 거리 제한 안내 메시지 생성 / Build distance restriction note
  //
  // 수도권(서울·경기·인천): 대중교통 90분 이내
  // 비수도권: 대중교통 60분 이내
  // 학기 중: 대학 소재지 기준 / 방학 중: 대학 소재지 또는 거주지
  // ===========================================================================
  private buildDistanceNote(): string {
    const metro = D2_DISTANCE_LIMITS.find((d) => d.areaType === 'METRO');
    const nonMetro = D2_DISTANCE_LIMITS.find((d) => d.areaType === 'NON_METRO');

    return (
      `[거리제한/Distance] 수도권 대중교통 ${metro?.maxMinutes ?? 90}분 / 비수도권 ${nonMetro?.maxMinutes ?? 60}분 이내. ` +
      `학기 중: 대학 소재지 기준, 방학 중: 대학 소재지 또는 거주지 ` +
      `(Metro area within ${metro?.maxMinutes ?? 90}min / non-metro within ${nonMetro?.maxMinutes ?? 60}min by public transit. ` +
      `Semester: from university, vacation: from university or residence)`
    );
  }

  // ===========================================================================
  // 고용주 서류 안내 메시지 생성 / Build employer document notes
  //
  // 고용주는 서류 협조 역할:
  // 사업자등록증 사본, 표준근로계약서(고용주 서명), 시간제취업확인서(고용주란)
  // ===========================================================================
  private buildEmployerNotes(input: AlbaJobInput): string {
    const requiredDocs = D2_EMPLOYER_REQUIREMENTS.filter((req) => {
      if (!req.required) return false;
      if (req.conditionalIndustry) {
        // 조건부 서류: 해당 업종일 때만 / Conditional docs: only for matching industries
        return req.conditionalIndustry.split(',').includes(input.ksicCode);
      }
      return true;
    })
      .map((req) => `${req.nameKo} (${req.nameEn})`)
      .join(', ');

    return (
      `[고용주 서류/Employer Docs] ${requiredDocs}. ` +
      `신청 주체는 유학생 본인이나, 고용주는 서류 협조 필수 ` +
      `(Application filed by student, but employer must provide supporting documents)`
    );
  }

  // ===========================================================================
  // 위반 시 처벌 안내 메시지 생성 / Build penalty notes
  //
  // 주요 처벌:
  // - 무허가 고용: 고용주 3년 이하 징역/3,000만원 이하 벌금 + 최대 3년 고용 금지
  // - 시간 초과: 유학생 1차 1년 제한, 2차 강제퇴거
  // - 근로계약서 미교부: 500만원 이하 벌금
  // ===========================================================================
  private buildPenaltyNotes(): string {
    const keyPenalties = D2_PENALTIES.slice(0, 3) // 상위 3개 주요 처벌만 / Top 3 key penalties only
      .map((p) => `${p.violationKo}: 고용주 ${p.employerPenaltyKo}`)
      .join(' / ');

    return `[처벌/Penalties] ${keyPenalties}`;
  }

  // ===========================================================================
  // 특정 학년+TOPIK에 대한 시간 규칙 조회 (외부 활용용)
  // Look up hour rule for specific schoolYear + TOPIK level (for external use)
  //
  // 사용 예시: getHourRuleForStudent('MASTER', 4) → 석사 TOPIK 4급 규칙
  // Usage: getHourRuleForStudent('MASTER', 4) → Master's TOPIK 4 rule
  // ===========================================================================
  getHourRuleForStudent(
    schoolYear: string,
    topikLevel: number,
  ): D2HourRule | undefined {
    return D2_HOUR_RULES.find(
      (rule) =>
        rule.schoolYear === schoolYear &&
        topikLevel >= rule.topikLevelMin &&
        topikLevel <= rule.topikLevelMax,
    );
  }
}
