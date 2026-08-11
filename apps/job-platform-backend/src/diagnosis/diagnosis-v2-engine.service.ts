import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src/common/prisma/auth/auth-prisma.service';
import * as diagnosisMatrixData from '../data/diagnosis-matrix.json';
import { TranslationService } from '../translation/translation.service';
import { VisaPolicyService } from '../visa-policy/visa-policy.service';
import { ApprovedPolicyEvidence } from '../visa-policy/visa-policy.types';
import {
  assessPathwayRequirements,
  getH1AgeLimit,
  getRequirementCatalogVersion,
  isEpsSendingCountry,
  RequirementAssessment,
  RequirementFitStatus,
  RequirementSummary,
  scoreRequirements,
  summarizeRequirements,
} from './diagnosis-requirement-evaluator';

export type PlannerLanguage = 'en' | 'ko' | 'vi' | 'th' | 'fil';
export type DifficultyLevel = 'easy' | 'moderate' | 'hard' | 'expert_review';

export interface DiagnosisInput {
  nationality: string;
  residenceCountry?: string;
  age: number;
  educationLevel: string;
  availableAnnualFund: number;
  finalGoal: string;
  priorityPreference: string;
  language?: string;
  topikLevel?: number;
  kiipStage?: number;
  workExperienceYears?: number;
  major?: string;
  majorCategory?: string;
  targetOccupation?: string;
  isEthnicKorean?: boolean;
  currentVisa?: string;
  koreaStayMonths?: number;
  hasDegreeDocument?: boolean;
}

export interface Milestone {
  order: number;
  monthFromStart: number;
  type: string;
  nameKo: string;
  nameEn: string;
  visaStatus: string;
  canWorkPartTime: boolean;
  weeklyHours: number;
  estimatedMonthlyIncome: number;
  requirements: string;
  platformAction: string;
}

export interface NextStep {
  actionType: string;
  nameKo: string;
  nameEn: string;
  description: string;
  url?: string;
}

export interface RecommendedPathway {
  pathwayId: string;
  nameKo: string;
  nameEn: string;
  finalScore: number;
  suitabilityScore: number;
  readinessScore: number;
  dataCompletenessScore: number;
  requirementStatus: RequirementFitStatus;
  difficultyLevel: DifficultyLevel;
  scoreBreakdown: {
    base: number;
    ageMultiplier: number;
    nationalityMultiplier: number;
    fundMultiplier: number;
    educationMultiplier: number;
    priorityWeight: number;
    comparisonScore: number;
    requirementScore: number;
    dataCompletenessScore: number;
  };
  feasibilityLabel: string;
  estimatedMonths: number;
  estimatedCostWon: number;
  visaChain: string;
  visaChainItems: string[];
  platformSupport: string;
  milestones: Milestone[];
  nextSteps: NextStep[];
  note: string;
  strengths: string[];
  gaps: string[];
  riskFlags: string[];
  requirementAssessments: RequirementAssessment[];
  requirementSummary: RequirementSummary;
  needsHumanReview: boolean;
  policyEvidence: ApprovedPolicyEvidence[];
  policyAsOf: string;
  policyVersion: string | null;
  policyStatus: 'EVIDENCE_AVAILABLE' | 'REVIEW_REQUIRED';
  display: {
    language: PlannerLanguage;
    title: string;
    subtitle: string;
    difficultyLabel: string;
    primaryReason: string;
    trustBadge: string;
  };
}

export interface DiagnosisResult {
  sessionId?: number;
  pathways: RecommendedPathway[];
  meta: {
    sessionId?: number;
    totalPathwaysEvaluated: number;
    hardFilteredOut: number;
    timestamp: string;
    language: PlannerLanguage;
    engineVersion: string;
    policyVersion: string;
    policyLastVerifiedAt: string;
    policyConfidence: {
      score: number | null;
      level: string;
      description: string;
    };
    policyStatus: 'REVIEW_REQUIRED';
    informationOnly: true;
    profileConfidence: {
      score: number;
      completedFields: number;
      totalFields: number;
      missingFields: string[];
    };
    legalNotice: string;
  };
}

interface PathwayDef {
  pathwayId: string;
  pathwayType: string;
  ageMin: number;
  ageMax: number;
  minEducation: string;
  allowedNationalityType: string;
  topikMin: number;
  minFund: number;
  requiresEthnicKorean: boolean;
  estimatedMonths: number;
  estimatedCostWon: number;
  platformSupport: string;
  baseScore: number;
}

interface NationalityInfo {
  tier: string;
  epsCountry: boolean;
  whCountry: boolean;
  dongpo: boolean;
  domesticE7: boolean;
}

const ENGINE_VERSION = 'planner-v2-requirement-scoring-2026-08-07';
const POLICY_VERSION = getRequirementCatalogVersion();
const POLICY_LAST_VERIFIED_AT = '2026-08-07';

const SUPPORTED_LANGS: PlannerLanguage[] = ['en', 'ko', 'vi', 'th', 'fil'];

const DIFFICULTY_COPY: Record<
  PlannerLanguage,
  Record<DifficultyLevel, string>
> = {
  en: {
    easy: 'Lower complexity',
    moderate: 'Moderate preparation',
    hard: 'High preparation required',
    expert_review: 'Expert review recommended',
  },
  ko: {
    easy: '비교적 수월',
    moderate: '준비 필요',
    hard: '준비 난이도 높음',
    expert_review: '전문가 검토 권장',
  },
  vi: {
    easy: 'Độ phức tạp thấp',
    moderate: 'Cần chuẩn bị thêm',
    hard: 'Yêu cầu chuẩn bị cao',
    expert_review: 'Nên được chuyên gia xem xét',
  },
  th: {
    easy: 'ความซับซ้อนต่ำ',
    moderate: 'ต้องเตรียมเพิ่มเติม',
    hard: 'ต้องเตรียมค่อนข้างมาก',
    expert_review: 'ควรให้ผู้เชี่ยวชาญตรวจสอบ',
  },
  fil: {
    easy: 'Mas mababang komplikasyon',
    moderate: 'Kailangan ng paghahanda',
    hard: 'Mataas ang kailangan na paghahanda',
    expert_review: 'Kailangan ng expert review',
  },
};

const NOTICE_COPY: Record<PlannerLanguage, string> = {
  en: 'JobChaja does not make an official or legal visa or stay-status determination. It only organizes possible routes and preparation information from the entered data and linked policy records. Every stage is reviewed separately and may be refused; one stage never guarantees the next. Reconfirm current official rules and their application to your case before filing.',
  ko: '잡차자는 비자·체류자격에 관한 공식 또는 법적 판단을 내리지 않습니다. 입력 정보와 연결된 정책 자료를 바탕으로 검토 가능한 경로와 준비 정보를 정리할 뿐입니다. 각 단계는 별도로 심사되고 불허될 수 있으며, 이전 단계가 다음 단계의 승인을 보장하지 않습니다. 신청 전 최신 공식 기준과 개인별 적용 여부를 재확인하세요.',
  vi: 'JobChaja không đưa ra quyết định chính thức hoặc pháp lý về visa hay tư cách lưu trú. Dịch vụ chỉ sắp xếp các lộ trình và thông tin chuẩn bị có thể xem xét từ dữ liệu đã nhập và hồ sơ chính sách được liên kết. Mỗi giai đoạn được xem xét riêng và có thể bị từ chối; giai đoạn trước không bảo đảm giai đoạn sau. Hãy xác nhận lại quy định chính thức hiện hành và việc áp dụng cho trường hợp của bạn trước khi nộp.',
  th: 'JobChaja ไม่ได้วินิจฉัยวีซ่าหรือสถานะการพำนักอย่างเป็นทางการหรือทางกฎหมาย บริการเพียงจัดเส้นทางและข้อมูลการเตรียมจากข้อมูลที่กรอกและหลักฐานนโยบายที่เชื่อมโยง แต่ละขั้นตอนพิจารณาแยกกันและอาจถูกปฏิเสธได้ การผ่านขั้นหนึ่งไม่รับประกันขั้นถัดไป โปรดยืนยันกฎทางการล่าสุดและการใช้กับกรณีของคุณก่อนยื่นคำขอ',
  fil: 'Hindi gumagawa ang JobChaja ng opisyal o legal na desisyon tungkol sa visa o stay status. Inaayos lamang nito ang mga posibleng route at paghahanda mula sa inilagay na data at naka-link na policy records. Hiwalay ang pagsusuri sa bawat stage at maaaring tanggihan; hindi garantiya ng susunod na stage ang naunang approval. Kumpirmahin ang kasalukuyang official rules at aplikasyon nito sa iyong kaso bago mag-file.',
};

const PATHWAY_COPY: Record<
  string,
  {
    ko: string;
    en: string;
    subtitleEn: string;
    subtitleKo: string;
    chain: string[];
    reasonEn: string;
    reasonKo: string;
  }
> = {
  'PW-001': {
    ko: 'GKS 학부 장학 경로',
    en: 'GKS Undergraduate Scholarship Path',
    subtitleEn: 'Government scholarship route before degree study',
    subtitleKo: '정부초청 장학 후 학위 과정으로 진입',
    chain: ['GKS', 'D-2', 'D-10', 'E-7'],
    reasonEn:
      'Good when cost reduction and long-term stability matter more than speed.',
    reasonKo: '비용 절감과 장기 안정성이 빠른 입국보다 중요할 때 유리합니다.',
  },
  'PW-002': {
    ko: 'GKS 대학원 장학 경로',
    en: 'GKS Graduate Scholarship Path',
    subtitleEn: 'Graduate scholarship route for bachelor degree holders',
    subtitleKo: '학사 이상 보유자를 위한 대학원 장학 경로',
    chain: ['GKS', 'D-2', 'D-10', 'E-7'],
    reasonEn:
      'Useful for applicants with strong academic records and patience for selection.',
    reasonKo:
      '학업 이력이 강하고 선발 절차를 기다릴 수 있는 사용자에게 적합합니다.',
  },
  'PW-003': {
    ko: '어학연수 후 전문대·취업 경로',
    en: 'Language Study to College and Work Path',
    subtitleEn:
      'D-4 preparation followed by college, job search, and skilled work',
    subtitleKo: 'D-4 준비 후 전문대, 구직, 숙련 취업으로 이어지는 경로',
    chain: ['D-4', 'D-2-1', 'D-10', 'E-7-4'],
    reasonEn:
      'A practical route when Korean level or school admission is not ready yet.',
    reasonKo: '한국어와 입학 준비가 아직 부족할 때 현실적인 단계형 경로입니다.',
  },
  'PW-004': {
    ko: '어학연수 후 4년제·전문직 경로',
    en: 'Language Study to University and Professional Work Path',
    subtitleEn:
      'D-4 preparation followed by university and professional employment',
    subtitleKo: 'D-4 준비 후 4년제 대학과 전문직 취업을 노리는 경로',
    chain: ['D-4', 'D-2-2', 'D-10', 'E-7-1'],
    reasonEn:
      'Best for applicants who can invest more time and tuition for a stronger work track.',
    reasonKo: '시간과 학비를 더 투자해 전문직 취업 가능성을 키우는 경로입니다.',
  },
  'PW-005': {
    ko: '대학 직접 입학 경로',
    en: 'Direct University Admission Path',
    subtitleEn:
      'Enter degree study directly when Korean and documents are ready',
    subtitleKo: '한국어와 입학 서류가 준비된 경우 바로 학위 과정으로 진입',
    chain: ['D-2', 'D-10', 'E-7'],
    reasonEn:
      'Strong when TOPIK and admission documents are already close to ready.',
    reasonKo: 'TOPIK과 입학 서류 준비가 된 사용자에게 강한 경로입니다.',
  },
  'PW-006': {
    ko: '고용허가제 E-9 경로',
    en: 'EPS E-9 Employment Path',
    subtitleEn: 'Government-managed non-professional employment route',
    subtitleKo: '정부 관리 고용허가제 기반 비전문취업 경로',
    chain: ['EPS-TOPIK', 'E-9'],
    reasonEn:
      'Available only for EPS sending countries and should be treated as official-process guidance.',
    reasonKo:
      'EPS 송출국 대상이며 사설 매칭이 아닌 공식 절차 안내로 다뤄야 합니다.',
  },
  'PW-007': {
    ko: 'E-9에서 E-7-4 전환 경로',
    en: 'E-9 to E-7-4 Skilled Worker Path',
    subtitleEn:
      'Longer route from EPS work experience to skilled worker status',
    subtitleKo: 'E-9 근무 경험을 쌓은 뒤 숙련기능인력으로 전환하는 경로',
    chain: ['E-9', 'E-7-4'],
    reasonEn:
      'A long-term option after Korean work experience, language, and employer recommendation.',
    reasonKo:
      '한국 근무 경력, 한국어, 사업주 추천을 전제로 하는 장기 경로입니다.',
  },
  'PW-008': {
    ko: '워킹홀리데이 H-1 경로',
    en: 'Working Holiday H-1 Path',
    subtitleEn: 'Short-term stay and work experience for eligible countries',
    subtitleKo: '협정 국가 청년을 위한 단기 체류·경험 경로',
    chain: ['H-1'],
    reasonEn:
      'Fast and flexible, but not designed as a permanent employment route.',
    reasonKo: '빠르고 유연하지만 장기 취업 경로로 설계된 비자는 아닙니다.',
  },
  'PW-009': {
    ko: '해외 초청 E-7 경로',
    en: 'Overseas Invitation E-7 Path',
    subtitleEn: 'Professional employment route with a Korean employer sponsor',
    subtitleKo: '한국 고용주의 초청과 직무 적합성이 필요한 전문취업 경로',
    chain: ['E-7'],
    reasonEn:
      'Strong when degree, experience, and a Korean employer match the E-7 occupation.',
    reasonKo: '학력, 경력, 한국 고용주, E-7 직종 적합성이 맞아야 강해집니다.',
  },
  'PW-010': {
    ko: '국내 체류 중 E-7 전환 경로',
    en: 'Domestic Change to E-7 Path',
    subtitleEn:
      'Change from study or job-search status into professional employment',
    subtitleKo: '유학·구직 체류 중 전문취업으로 전환하는 경로',
    chain: ['D-2 or D-10', 'E-7'],
    reasonEn:
      'Useful when the applicant is already in Korea and has a verified employer match.',
    reasonKo: '이미 한국에 있고 검증된 고용주 매칭이 있을 때 유리합니다.',
  },
  'PW-011': {
    ko: 'D-8-1 법인투자 경로',
    en: 'D-8-1 Corporate Investment Path',
    subtitleEn:
      'Corporate investment route requiring capital, equity, and business evidence',
    subtitleKo: '투자금·의결권 지분·사업 실재성 증빙이 필요한 법인투자 경로',
    chain: ['D-8-1'],
    reasonEn:
      'Only realistic when investment capital and business evidence are strong.',
    reasonKo: '투자 자본과 사업 증빙이 충분할 때만 현실적인 경로입니다.',
  },
  'PW-016': {
    ko: 'D-8-4 기술창업 경로',
    en: 'D-8-4 Technology Startup Path',
    subtitleEn:
      'Technology startup route based on education, OASIS points, or an accepted special track',
    subtitleKo: '학력·OASIS 점수 또는 인정 특례를 이용하는 기술창업 경로',
    chain: ['D-8-4'],
    reasonEn:
      'Requires a Korean technology-startup corporation and a verified OASIS or special-track qualification.',
    reasonKo:
      '국내 기술창업 법인과 OASIS 또는 특례 자격을 별도로 검증해야 합니다.',
  },
  'PW-012': {
    ko: 'F-2-7 점수제 거주 경로',
    en: 'F-2-7 Points Residence Path',
    subtitleEn:
      'Residence path based on points from income, education, age, and Korean ability',
    subtitleKo: '소득, 학력, 나이, 한국어 등을 종합하는 점수제 거주 경로',
    chain: ['F-2-7'],
    reasonEn:
      'Needs careful scoring and document review before the user relies on it.',
    reasonKo: '점수 산정과 서류 검토가 필요하므로 상세 검토가 중요합니다.',
  },
  'PW-013': {
    ko: 'F-2-R 지역특화 경로',
    en: 'F-2-R Regional Residence Path',
    subtitleEn:
      'Regional route tied to local government and employer conditions',
    subtitleKo: '지자체와 지역 고용 조건이 연결되는 지역특화 경로',
    chain: ['F-2-R'],
    reasonEn:
      'Can be attractive when the applicant is open to regional settlement.',
    reasonKo: '지역 정착 의사가 있을 때 검토 가치가 있는 경로입니다.',
  },
  'PW-014': {
    ko: 'H-2 방문취업 동포 경로',
    en: 'H-2 Working Visit Path for Overseas Koreans',
    subtitleEn: 'Ethnic Korean working visit route',
    subtitleKo: '재외동포 대상 방문취업 경로',
    chain: ['H-2', 'F-4'],
    reasonEn:
      'Depends on ethnic Korean eligibility and country-specific requirements.',
    reasonKo: '동포 자격과 국가별 요건 확인이 핵심입니다.',
  },
  'PW-015': {
    ko: 'F-4 재외동포 경로',
    en: 'F-4 Overseas Korean Path',
    subtitleEn: 'Overseas Korean status with broader work flexibility',
    subtitleKo: '취업 자유도가 넓은 재외동포 체류 경로',
    chain: ['F-4'],
    reasonEn:
      'Strong for eligible overseas Koreans, but proof documents must be checked.',
    reasonKo: '자격 대상자에게 강하지만 동포 증빙 서류 확인이 필요합니다.',
  },
};

@Injectable()
export class DiagnosisV2EngineService {
  private readonly logger = new Logger(DiagnosisV2EngineService.name);
  private readonly matrix: any = diagnosisMatrixData;

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly translationService: TranslationService,
    private readonly visaPolicyService: VisaPolicyService,
  ) {}

  async diagnose(
    input: DiagnosisInput,
    userId?: string,
    anonymousId?: string,
  ): Promise<DiagnosisResult> {
    const validUserId = userId
      ? await this.getValidIndividualUserId(userId)
      : null;
    const validAnonymousId = validUserId
      ? undefined
      : this.validateAnonymousOwner(anonymousId, true);
    const language = this.normalizeLanguage(input.language);
    const pathways: PathwayDef[] = this.matrix.pathways ?? [];
    const natInfo = this.getNationalityInfo(input.nationality);
    const profileConfidence = this.calculateProfileConfidence(input);

    let hardFilteredOut = 0;
    const scored: RecommendedPathway[] = [];

    for (const pw of pathways) {
      const hardResult = this.applyHardFilters(pw, input, natInfo);
      if (!hardResult.pass) {
        hardFilteredOut++;
        continue;
      }

      const copy = PATHWAY_COPY[pw.pathwayId] ?? this.defaultCopy(pw);
      const requirementAssessments = assessPathwayRequirements(
        pw.pathwayId,
        input,
        natInfo,
        language,
      );
      const requirementSummary = summarizeRequirements(requirementAssessments);
      const requirementScoring = scoreRequirements(requirementAssessments);
      const comparison = this.calculateScore(pw, input);
      const finalScore = Math.round(
        requirementScoring.score * 0.8 + comparison.finalScore * 0.2,
      );
      if (finalScore <= 0) {
        hardFilteredOut++;
        continue;
      }
      const difficultyLevel = this.getDifficultyLevel(finalScore, pw.pathwayId);
      const gaps = this.generateGaps(pw, input, requirementAssessments);
      const riskFlags = this.generateRiskFlags(pw, input);
      const strengths = this.generateStrengths(pw, input, natInfo);
      const needsHumanReview =
        difficultyLevel === 'expert_review' ||
        riskFlags.length > 0 ||
        requirementSummary.unmet > 0 ||
        requirementSummary.unknown > 0 ||
        [
          'points_system',
          'regional',
          'investment',
          'direct_employment',
        ].includes(pw.pathwayType);

      scored.push({
        pathwayId: pw.pathwayId,
        nameKo: copy.ko,
        nameEn: copy.en,
        finalScore,
        suitabilityScore: comparison.finalScore,
        readinessScore: requirementScoring.score,
        dataCompletenessScore: requirementScoring.completenessScore,
        requirementStatus: requirementScoring.status,
        difficultyLevel,
        scoreBreakdown: {
          ...comparison.scoreBreakdown,
          comparisonScore: comparison.finalScore,
          requirementScore: requirementScoring.score,
          dataCompletenessScore: requirementScoring.completenessScore,
        },
        feasibilityLabel: this.getProfileMatchLabel(finalScore),
        estimatedMonths: pw.estimatedMonths,
        // The policy matrix stores costs in 10,000 KRW units.
        estimatedCostWon: pw.estimatedCostWon * 10_000,
        visaChain: copy.chain.join(' -> '),
        visaChainItems: copy.chain,
        platformSupport: pw.platformSupport,
        milestones: this.generateMilestones(copy, pw, language),
        nextSteps: this.generateNextSteps(pw, input, language),
        note: language === 'ko' ? copy.reasonKo : copy.reasonEn,
        strengths,
        gaps,
        riskFlags,
        requirementAssessments,
        requirementSummary,
        needsHumanReview,
        policyEvidence: [],
        policyAsOf: '',
        policyVersion: null,
        policyStatus: 'REVIEW_REQUIRED',
        display: {
          language,
          title: language === 'ko' ? copy.ko : copy.en,
          subtitle: language === 'ko' ? copy.subtitleKo : copy.subtitleEn,
          difficultyLabel: DIFFICULTY_COPY[language][difficultyLevel],
          primaryReason: language === 'ko' ? copy.reasonKo : copy.reasonEn,
          trustBadge:
            language === 'ko'
              ? '신청 전 공식 출처 확인 필요'
              : 'Check official sources before applying',
        },
      });
    }

    scored.sort((a, b) => b.finalScore - a.finalScore);
    const topPathways = scored.slice(0, 5);
    const policyAsOf = new Date();
    await this.attachPolicyEvidence(topPathways, policyAsOf);
    await this.localizePathways(topPathways, language);

    const linkedEvidence = topPathways.flatMap(
      (pathway) => pathway.policyEvidence,
    );
    const linkedVersions = Array.from(
      new Set(
        linkedEvidence.map(
          (evidence) => `${evidence.ruleId}:v${evidence.version}`,
        ),
      ),
    ).sort();
    const lastReviewedAt = linkedEvidence
      .map((evidence) => evidence.reviewedAt)
      .sort()
      .at(-1);

    const resultWithoutSession: DiagnosisResult = {
      pathways: topPathways,
      meta: {
        totalPathwaysEvaluated: pathways.length,
        hardFilteredOut,
        timestamp: new Date().toISOString(),
        language,
        engineVersion: ENGINE_VERSION,
        policyVersion:
          linkedVersions.length > 0
            ? `approved-evidence:${linkedVersions.join(',')}`
            : POLICY_VERSION,
        policyLastVerifiedAt: lastReviewedAt ?? POLICY_LAST_VERIFIED_AT,
        policyConfidence: {
          score: null,
          level: 'REVIEW_REQUIRED',
          description:
            'Profile comparison only. Linked evidence is limited to reviewed policy records and does not determine legal eligibility.',
        },
        policyStatus: 'REVIEW_REQUIRED',
        informationOnly: true,
        profileConfidence,
        legalNotice: NOTICE_COPY[language],
      },
    };

    const created = await this.saveSession(
      input,
      resultWithoutSession,
      validUserId ?? undefined,
      validAnonymousId,
    );

    if (created?.sessionId) {
      const sessionId = Number(created.sessionId);
      resultWithoutSession.sessionId = sessionId;
      resultWithoutSession.meta.sessionId = sessionId;
    }

    return resultWithoutSession;
  }

  async claimSession(sessionId: bigint, userId: string, anonymousId?: string) {
    const session = await this.prisma.diagnosisSession.findUnique({
      where: { sessionId },
    });

    if (!session) {
      throw new NotFoundException('Diagnosis session not found');
    }

    const profile = await this.prisma.individualProfile.findUnique({
      where: { authId: userId },
      select: { authId: true },
    });

    if (!profile) {
      throw new ForbiddenException({
        code: 'INDIVIDUAL_ACCOUNT_REQUIRED',
        message: 'Only individual accounts can save visa planner results.',
      });
    }

    if (session.userId && session.userId !== userId) {
      throw new ForbiddenException({
        code: 'SESSION_OWNER_MISMATCH',
        message: 'This diagnosis session belongs to another user.',
      });
    }

    if (session.userId === userId) {
      return {
        sessionId: Number(sessionId),
        saved: true,
        profileUpdated: false,
        reason: 'ALREADY_OWNED',
      };
    }

    if (!session.anonymousId || !anonymousId) {
      throw new ConflictException({
        code: 'ANONYMOUS_OWNER_REQUIRED',
        message: 'The anonymous owner token is required to save this result.',
      });
    }

    const validAnonymousId = this.validateAnonymousOwner(anonymousId, true);
    if (session.anonymousId !== validAnonymousId) {
      throw new ForbiddenException({
        code: 'ANONYMOUS_OWNER_MISMATCH',
        message: 'Anonymous session owner mismatch.',
      });
    }

    await this.prisma.diagnosisSession.update({
      where: { sessionId },
      data: {
        userId,
        convertedToSignup: true,
      },
    });

    const profileUpdated = await this.applyProfileHints(
      userId,
      session.inputSnapshot as unknown as DiagnosisInput,
    );

    return {
      sessionId: Number(sessionId),
      saved: true,
      profileUpdated,
      reason: 'CLAIMED',
    };
  }

  async getSession(sessionId: bigint, userId?: string, anonymousId?: string) {
    const session = await this.findOwnedSession(sessionId, userId, anonymousId);
    if (!session) return null;

    return {
      ...session,
      sessionId: Number(session.sessionId),
      previousSessionId: session.previousSessionId
        ? Number(session.previousSessionId)
        : null,
    };
  }

  async getHistory(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.diagnosisSession.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          sessionId: true,
          topPathwayId: true,
          pathwayCount: true,
          createdAt: true,
          inputSnapshot: true,
          resultsSnapshot: true,
          convertedToSignup: true,
          convertedToPaid: true,
        },
      }),
      this.prisma.diagnosisSession.count({ where: { userId } }),
    ]);

    return {
      items: items.map((item) => ({
        ...item,
        sessionId: Number(item.sessionId),
      })),
      total,
      page,
      limit,
    };
  }

  async trackClick(
    sessionId: bigint,
    pathwayId: string,
    rankPosition: number,
    actionType: string,
    userId?: string,
    anonymousId?: string,
  ) {
    const session = await this.findOwnedSession(sessionId, userId, anonymousId);
    if (!session) {
      throw new NotFoundException('Diagnosis session not found');
    }
    return this.prisma.diagnosisPathwayClick.create({
      data: { sessionId, pathwayId, rankPosition, actionType },
    });
  }

  getMatrix() {
    return this.matrix;
  }

  async getAnalytics(from: Date, to: Date, groupBy: string) {
    const sessions = await this.prisma.diagnosisSession.findMany({
      where: { createdAt: { gte: from, lte: to } },
      select: {
        sessionId: true,
        topPathwayId: true,
        inputSnapshot: true,
        convertedToSignup: true,
        convertedToPaid: true,
        createdAt: true,
      },
    });

    const groups = new Map<string, { count: number; converted: number }>();
    for (const session of sessions) {
      const input = session.inputSnapshot as any;
      const key =
        groupBy === 'nationality'
          ? (input?.nationality ?? 'unknown')
          : groupBy === 'age'
            ? this.getAgeBracket(input?.age ?? 0)
            : (session.topPathwayId ?? 'none');
      const existing = groups.get(key) ?? { count: 0, converted: 0 };
      existing.count++;
      if (session.convertedToSignup || session.convertedToPaid) {
        existing.converted++;
      }
      groups.set(key, existing);
    }

    return {
      totalSessions: sessions.length,
      periodFrom: from.toISOString(),
      periodTo: to.toISOString(),
      groupBy,
      breakdown: Array.from(groups.entries())
        .map(([key, value]) => ({
          key,
          count: value.count,
          conversionRate:
            value.count > 0
              ? Math.round((value.converted / value.count) * 100) / 100
              : 0,
        }))
        .sort((a, b) => b.count - a.count),
    };
  }

  private async saveSession(
    input: DiagnosisInput,
    result: DiagnosisResult,
    userId?: string,
    anonymousId?: string,
  ): Promise<{ sessionId: bigint } | null> {
    try {
      return await this.prisma.diagnosisSession.create({
        data: {
          userId: userId ?? null,
          anonymousId: anonymousId ?? null,
          inputSnapshot: input as any,
          resultsSnapshot: result as any,
          topPathwayId: result.pathways[0]?.pathwayId ?? null,
          pathwayCount: result.pathways.length,
        },
        select: { sessionId: true },
      });
    } catch (error) {
      this.logger.warn(`Failed to save V2 diagnosis session: ${error}`);
      return null;
    }
  }

  private async findOwnedSession(
    sessionId: bigint,
    userId?: string,
    anonymousId?: string,
  ) {
    const prevalidatedAnonymousId = userId
      ? undefined
      : this.validateAnonymousOwner(anonymousId, true);
    const session = await this.prisma.diagnosisSession.findUnique({
      where: { sessionId },
    });
    if (!session) return null;

    if (session.userId) {
      if (!userId || session.userId !== userId) {
        throw new ForbiddenException({
          code: 'SESSION_OWNER_MISMATCH',
          message: 'This diagnosis session belongs to another user.',
        });
      }
      return session;
    }

    if (!session.anonymousId) {
      throw new UnauthorizedException({
        code: 'ANONYMOUS_OWNER_REQUIRED',
        message: 'The anonymous owner token is required.',
      });
    }
    const validAnonymousId =
      prevalidatedAnonymousId ?? this.validateAnonymousOwner(anonymousId, true);
    if (session.anonymousId !== validAnonymousId) {
      throw new ForbiddenException({
        code: 'ANONYMOUS_OWNER_MISMATCH',
        message: 'Anonymous session owner mismatch.',
      });
    }
    return session;
  }

  private validateAnonymousOwner(
    anonymousId: string | undefined,
    required: boolean,
  ): string | undefined {
    if (!anonymousId) {
      if (!required) return undefined;
      throw new UnauthorizedException({
        code: 'ANONYMOUS_OWNER_REQUIRED',
        message: 'A valid anonymous owner token is required.',
      });
    }
    const normalized = anonymousId.trim();
    if (!/^[A-Za-z0-9_-]{16,128}$/.test(normalized)) {
      throw new BadRequestException({
        code: 'INVALID_ANONYMOUS_OWNER',
        message: 'The anonymous owner token format is invalid.',
      });
    }
    return normalized;
  }

  private async getValidIndividualUserId(
    userId: string,
  ): Promise<string | null> {
    const profile = await this.prisma.individualProfile.findUnique({
      where: { authId: userId },
      select: { authId: true },
    });
    return profile ? userId : null;
  }

  private async applyProfileHints(
    userId: string,
    input: DiagnosisInput,
  ): Promise<boolean> {
    const data: Record<string, unknown> = {};

    if (input.nationality) data.nationality = input.nationality;
    if (typeof input.availableAnnualFund === 'number') {
      data.availableAnnualFund = Math.max(
        0,
        Math.round(input.availableAnnualFund),
      );
    }
    if (typeof input.topikLevel === 'number')
      data.topikLevel = input.topikLevel;
    if (typeof input.kiipStage === 'number') data.kiipStage = input.kiipStage;
    if (typeof input.isEthnicKorean === 'boolean') {
      data.isEthnicKorean = input.isEthnicKorean;
    }
    if (typeof input.koreaStayMonths === 'number') {
      data.koreaStayMonths = Math.max(0, Math.round(input.koreaStayMonths));
    }
    if (input.finalGoal) data.finalGoal = input.finalGoal;
    if (input.priorityPreference)
      data.priorityPreference = input.priorityPreference;
    if (input.major) data.major = input.major;
    if (input.majorCategory) data.majorCategory = input.majorCategory;
    if (input.targetOccupation) data.currentRole = input.targetOccupation;

    const mappedEducation = this.mapEducationLevel(input.educationLevel);
    if (mappedEducation) data.finalEducationLvl = mappedEducation;

    if (Object.keys(data).length === 0) return false;

    try {
      await this.prisma.individualProfile.update({
        where: { authId: userId },
        data: data as any,
      });
      return true;
    } catch (error) {
      this.logger.warn(`Failed to apply profile hints: ${error}`);
      return false;
    }
  }

  private applyHardFilters(
    pw: PathwayDef,
    input: DiagnosisInput,
    natInfo: NationalityInfo | null,
  ): { pass: boolean; reason?: string } {
    // New H-2 issuance was discontinued on 2026-02-12. It must not be
    // recommended as a new overseas-entry route.
    if (pw.pathwayId === 'PW-014') {
      return { pass: false, reason: 'route_closed' };
    }

    if (pw.pathwayId === 'PW-008') {
      const ageLimit = getH1AgeLimit(input.nationality);
      if (!ageLimit || input.age < ageLimit.min || input.age > ageLimit.max) {
        return { pass: false, reason: 'h1_country_or_age' };
      }
    }

    if (pw.pathwayId === 'PW-006') {
      const maximumAge = 39;
      if (!isEpsSendingCountry(input.nationality)) {
        return { pass: false, reason: 'eps_nationality' };
      }
      if (input.age < 18 || input.age > maximumAge) {
        return { pass: false, reason: 'eps_age' };
      }
    }

    if (
      !['PW-006', 'PW-007', 'PW-008'].includes(pw.pathwayId) &&
      !this.isNationalityAllowed(
        pw.allowedNationalityType,
        natInfo,
        input.isEthnicKorean,
      )
    ) {
      return { pass: false, reason: 'nationality' };
    }

    if (pw.requiresEthnicKorean && !input.isEthnicKorean) {
      return { pass: false, reason: 'ethnic_korean' };
    }

    return { pass: true };
  }

  private calculateScore(pw: PathwayDef, input: DiagnosisInput) {
    const base = pw.baseScore;
    // A general age preference is not a legal acquisition rule. Exact age
    // gates stay in the requirement evaluators for H-1, EPS, and GKS.
    const ageMultiplier = 1;
    // Nationality tiers and estimated rejection rates have no linked official
    // source in V2. Country-specific legal eligibility stays in hard filters,
    // while profile scoring remains neutral until reviewed policy data exists.
    const nationalityMultiplier = 1;
    // Funds and education are now assessed against versioned requirement
    // records. The legacy matrix multipliers had no linked official basis and
    // could both inflate a minimum value and hide a preparable near-miss.
    const fundMultiplier = 1;
    const educationMultiplier = 1;
    const priorityWeight =
      this.matrix.priorityWeights?.[pw.pathwayId]?.[input.priorityPreference] ??
      0.5;

    const raw =
      base *
      ageMultiplier *
      nationalityMultiplier *
      fundMultiplier *
      educationMultiplier *
      priorityWeight;

    return {
      finalScore: Math.min(100, Math.round(raw)),
      scoreBreakdown: {
        base,
        ageMultiplier: Math.round(ageMultiplier * 100) / 100,
        nationalityMultiplier,
        fundMultiplier,
        educationMultiplier,
        priorityWeight,
      },
    };
  }

  private calculateProfileConfidence(input: DiagnosisInput) {
    const checks: Array<[keyof DiagnosisInput, string]> = [
      ['nationality', 'nationality'],
      ['residenceCountry', 'residence country'],
      ['age', 'age'],
      ['educationLevel', 'education'],
      ['availableAnnualFund', 'funds'],
      ['finalGoal', 'goal'],
      ['priorityPreference', 'priority'],
      ['topikLevel', 'TOPIK'],
      ['workExperienceYears', 'work experience'],
      ['major', 'major'],
    ];

    const missingFields = checks
      .filter(([key]) => {
        const value = input[key];
        return value === undefined || value === null || value === '';
      })
      .map(([, label]) => label);
    const completedFields = checks.length - missingFields.length;

    return {
      score: Math.round((completedFields / checks.length) * 100),
      completedFields,
      totalFields: checks.length,
      missingFields,
    };
  }

  private generateStrengths(
    pw: PathwayDef,
    input: DiagnosisInput,
    natInfo: NationalityInfo | null,
  ) {
    const strengths: string[] = [];
    const educationLevels = [
      'none',
      'middle',
      'high_school',
      'associate',
      'bachelor',
      'master',
      'doctor',
    ];
    if (
      pw.minEducation !== 'none' &&
      educationLevels.indexOf(input.educationLevel) >
        educationLevels.indexOf(pw.minEducation)
    ) {
      strengths.push('education_match');
    }
    if (pw.topikMin > 0 && (input.topikLevel ?? 0) > pw.topikMin)
      strengths.push('language_ready');
    if (pw.minFund > 0 && input.availableAnnualFund > pw.minFund) {
      strengths.push('fund_ready');
    }
    if (pw.allowedNationalityType === 'EPS_16' && natInfo?.epsCountry) {
      strengths.push('eps_country');
    }
    if (pw.requiresEthnicKorean && input.isEthnicKorean) {
      strengths.push('ethnic_korean_match');
    }
    return strengths;
  }

  private generateGaps(
    pw: PathwayDef,
    input: DiagnosisInput,
    requirementAssessments: RequirementAssessment[],
  ) {
    const gaps = requirementAssessments
      .filter(
        (item) =>
          item.severity === 'required' &&
          (item.status === 'unmet' || item.status === 'unknown'),
      )
      .map((item) => item.id);
    if (pw.minFund > 0 && input.availableAnnualFund < pw.minFund) {
      if (!gaps.some((gap) => gap.includes('fund'))) gaps.push('fund_gap');
    }
    if (pw.topikMin > 0 && (input.topikLevel ?? 0) < pw.topikMin) {
      if (!gaps.some((gap) => gap.includes('language'))) {
        gaps.push('topik_gap');
      }
    }
    if (
      !input.hasDegreeDocument &&
      ['study_direct', 'direct_employment'].includes(pw.pathwayType)
    ) {
      gaps.push('degree_document_check');
    }
    if (!input.workExperienceYears && pw.pathwayType === 'direct_employment') {
      gaps.push('career_evidence_needed');
    }
    return gaps;
  }

  private generateRiskFlags(pw: PathwayDef, input: DiagnosisInput) {
    const riskFlags: string[] = [];
    if (pw.pathwayType === 'government')
      riskFlags.push('official_process_only');
    if (pw.pathwayType === 'points_system')
      riskFlags.push('points_must_be_verified');
    if (pw.pathwayType === 'regional') riskFlags.push('regional_quota_changes');
    if (pw.pathwayType === 'investment')
      riskFlags.push('investment_document_review');
    if (
      input.currentVisa &&
      input.koreaStayMonths &&
      input.koreaStayMonths > 0
    ) {
      riskFlags.push('status_change_rules_must_be_checked');
    }
    return riskFlags;
  }

  private generateMilestones(
    copy: (typeof PATHWAY_COPY)[string],
    pw: PathwayDef,
    language: PlannerLanguage,
  ) {
    const chain = copy.chain;
    return chain.map((visaStatus, index) => {
      const isFirst = index === 0;
      const isLast = index === chain.length - 1;
      const nameKo =
        chain.length === 1
          ? `${visaStatus} 신청 준비`
          : isFirst
            ? `${visaStatus} 입국 준비`
            : isLast
              ? `${visaStatus} 전환 준비`
              : `${visaStatus} 체류자격 준비`;
      const nameEn =
        chain.length === 1
          ? `Prepare the ${visaStatus} application`
          : isFirst
            ? `Prepare to enter with ${visaStatus}`
            : isLast
              ? `Prepare to change to ${visaStatus}`
              : `Prepare the ${visaStatus} status`;
      const requirements =
        language === 'ko'
          ? isFirst
            ? `${visaStatus} 신청에 필요한 서류와 자격 조건, 최신 공관·출입국 기준을 확인합니다.`
            : isLast
              ? `${visaStatus} 자격 조건과 신청 시점에 적용되는 최신 기준을 확인합니다.`
              : `이전 단계를 마친 뒤 ${visaStatus} 체류자격 요건과 변경 가능 여부를 확인합니다.`
          : isFirst
            ? `Check the documents, eligibility, and latest consular or immigration criteria for ${visaStatus}.`
            : isLast
              ? `Check the ${visaStatus} eligibility and criteria in effect when you apply.`
              : `After the previous step, check the ${visaStatus} requirements and whether a status change is allowed.`;

      return {
        order: index + 1,
        monthFromStart:
          chain.length <= 1
            ? pw.estimatedMonths
            : Math.round((pw.estimatedMonths / (chain.length - 1)) * index),
        type:
          index === 0
            ? 'prepare'
            : index === chain.length - 1
              ? 'target_status'
              : 'transition',
        nameKo,
        nameEn,
        visaStatus,
        canWorkPartTime: ['D-2', 'D-10', 'H-1'].some((v) =>
          visaStatus.includes(v),
        ),
        weeklyHours: visaStatus.includes('D-2') ? 20 : 0,
        estimatedMonthlyIncome: visaStatus.includes('E-') ? 280 : 0,
        requirements,
        platformAction:
          index === chain.length - 1 ? pw.platformSupport : 'checklist',
      };
    });
  }

  private generateNextSteps(
    pw: PathwayDef,
    input: DiagnosisInput,
    language: PlannerLanguage,
  ): NextStep[] {
    const steps: NextStep[] = [];

    if (pw.pathwayType.includes('study') || pw.pathwayType === 'scholarship') {
      if ((input.topikLevel ?? 0) < 3) {
        steps.push({
          actionType: 'improve_korean',
          nameKo: '한국어 준비도 올리기',
          nameEn: 'Improve Korean readiness',
          description:
            language === 'ko'
              ? 'TOPIK 또는 사회통합프로그램을 준비하면 학업과 취업 단계로 이어지는 데 도움이 됩니다.'
              : 'TOPIK or KIIP preparation can improve study and work transitions.',
        });
      }
      steps.push({
        actionType: 'prepare_school_docs',
        nameKo: '학교 지원 서류 확인',
        nameEn: 'Check school application documents',
        description:
          language === 'ko'
            ? '학위·졸업증명서, 성적증명서, 입학 및 재정 증빙을 준비합니다.'
            : 'Prepare degree, transcript, admission, and financial documents.',
      });
    } else if (pw.pathwayType === 'government') {
      steps.push({
        actionType: 'eps_official_info',
        nameKo: 'EPS 공식 절차 확인',
        nameEn: 'Check the official EPS process',
        description:
          language === 'ko'
            ? '송출국의 신청 절차와 시험 일정은 EPS 공식 공고에서 확인합니다.'
            : 'Use official EPS notices for sending-country procedures and tests.',
      });
    } else if (pw.pathwayType === 'direct_employment') {
      steps.push({
        actionType: 'build_employer_profile',
        nameKo: '고용주 검토용 프로필 보강',
        nameEn: 'Build employer-ready profile',
        description:
          language === 'ko'
            ? '경력 증빙, 학위 서류, 희망 직무와 포트폴리오를 프로필에 추가합니다.'
            : 'Add career evidence, degree documents, target role, and portfolio.',
      });
    } else {
      steps.push({
        actionType: 'request_review',
        nameKo: '전문가 검토 요청',
        nameEn: 'Request expert review',
        description:
          language === 'ko'
            ? '신청 전에 자격을 갖춘 출입국 전문가에게 개인 조건과 서류를 확인받습니다.'
            : 'Have a licensed immigration professional review the route before filing.',
      });
    }

    return steps;
  }

  private async attachPolicyEvidence(
    pathways: RecommendedPathway[],
    asOf: Date,
  ): Promise<void> {
    const codesByPathway = new Map<string, string[]>();
    const allCodes = new Set<string>();

    for (const pathway of pathways) {
      const codes = Array.from(
        new Set(
          pathway.visaChainItems.flatMap(
            (item) =>
              item.toUpperCase().match(/\b[A-Z]-\d+(?:-[A-Z0-9]+)?\b/g) ?? [],
          ),
        ),
      );
      codesByPathway.set(pathway.pathwayId, codes);
      codes.forEach((code) => allCodes.add(code));
    }

    let evidenceByCode = new Map<string, ApprovedPolicyEvidence[]>();
    try {
      evidenceByCode =
        await this.visaPolicyService.getApprovedEvidenceForVisaCodes(
          Array.from(allCodes),
          asOf,
        );
    } catch (error) {
      this.logger.warn(
        `Policy evidence lookup failed safely: ${(error as Error).message}`,
      );
    }

    const policyAsOf = asOf.toISOString();
    for (const pathway of pathways) {
      const visaCodes = codesByPathway.get(pathway.pathwayId) ?? [];
      const evidence = visaCodes.flatMap(
        (visaCode) => evidenceByCode.get(visaCode) ?? [],
      );
      const hasCompleteEvidence =
        visaCodes.length > 0 &&
        visaCodes.every(
          (visaCode) => (evidenceByCode.get(visaCode)?.length ?? 0) > 0,
        );
      const versions = Array.from(
        new Set(
          evidence.map(
            (item) => `${item.visaCode}:${item.ruleId}:v${item.version}`,
          ),
        ),
      ).sort();

      pathway.policyEvidence = evidence;
      pathway.policyAsOf = policyAsOf;
      pathway.policyVersion = versions.length > 0 ? versions.join(',') : null;
      pathway.policyStatus = hasCompleteEvidence
        ? 'EVIDENCE_AVAILABLE'
        : 'REVIEW_REQUIRED';

      if (!hasCompleteEvidence) {
        pathway.needsHumanReview = true;
        if (!pathway.riskFlags.includes('policy_evidence_missing')) {
          pathway.riskFlags.push('policy_evidence_missing');
        }
        pathway.display.trustBadge =
          pathway.display.language === 'ko'
            ? '승인된 정책 근거 부족: 공식 기관 확인 필요'
            : 'Policy evidence incomplete: official confirmation required';
      } else {
        pathway.display.trustBadge =
          pathway.display.language === 'ko'
            ? '검토된 출처 연결됨: 신청 전 공식 요건 재확인'
            : 'Reviewed sources linked: reconfirm official requirements';
      }
    }
  }

  private async localizePathways(
    pathways: RecommendedPathway[],
    language: PlannerLanguage,
  ): Promise<void> {
    if (language === 'en' || language === 'ko') return;

    const targetLanguage = language;
    const entries: Array<{
      text: string;
      apply: (translated: string) => void;
    }> = [];

    for (const pathway of pathways) {
      entries.push(
        {
          text: pathway.display.title,
          apply: (value) => {
            pathway.display.title = value;
          },
        },
        {
          text: pathway.display.subtitle,
          apply: (value) => {
            pathway.display.subtitle = value;
          },
        },
        {
          text: pathway.display.primaryReason,
          apply: (value) => {
            pathway.display.primaryReason = value;
          },
        },
        {
          text: pathway.display.trustBadge,
          apply: (value) => {
            pathway.display.trustBadge = value;
          },
        },
        {
          text: pathway.note,
          apply: (value) => {
            pathway.note = value;
          },
        },
      );

      for (const milestone of pathway.milestones) {
        entries.push(
          {
            text: milestone.nameEn,
            apply: (value) => {
              milestone.nameEn = value;
            },
          },
          {
            text: milestone.requirements,
            apply: (value) => {
              milestone.requirements = value;
            },
          },
        );
      }

      for (const step of pathway.nextSteps) {
        entries.push(
          {
            text: step.nameEn,
            apply: (value) => {
              step.nameEn = value;
            },
          },
          {
            text: step.description,
            apply: (value) => {
              step.description = value;
            },
          },
        );
      }

      for (const assessment of pathway.requirementAssessments) {
        entries.push(
          {
            text: assessment.title,
            apply: (value) => {
              assessment.title = value;
            },
          },
          {
            text: assessment.currentValue,
            apply: (value) => {
              assessment.currentValue = value;
            },
          },
          {
            text: assessment.requiredValue,
            apply: (value) => {
              assessment.requiredValue = value;
            },
          },
          {
            text: assessment.explanation,
            apply: (value) => {
              assessment.explanation = value;
            },
          },
          {
            text: assessment.action,
            apply: (value) => {
              assessment.action = value;
            },
          },
        );
        if (assessment.shortfall) {
          entries.push({
            text: assessment.shortfall,
            apply: (value) => {
              assessment.shortfall = value;
            },
          });
        }
      }
    }

    try {
      const translated = await this.translationService.translateTexts(
        entries.map((entry) => entry.text),
        targetLanguage,
        'en',
      );
      translated.forEach((value, index) => entries[index]?.apply(value));
    } catch (error) {
      this.logger.warn(
        `Planner translation fallback (${language}): ${(error as Error).message}`,
      );
    }
  }

  private getDifficultyLevel(
    score: number,
    pathwayId: string,
  ): DifficultyLevel {
    if (['PW-011', 'PW-012', 'PW-013', 'PW-016'].includes(pathwayId)) {
      return 'expert_review';
    }
    if (score >= 70) return 'easy';
    if (score >= 50) return 'moderate';
    if (score >= 30) return 'hard';
    return 'expert_review';
  }

  private getProfileMatchLabel(score: number): string {
    if (score >= 71) return 'higher_profile_match';
    if (score >= 51) return 'moderate_profile_match';
    if (score >= 1) return 'lower_profile_match';
    return 'insufficient_information';
  }

  private getNationalityInfo(nationality: string): NationalityInfo | null {
    return this.matrix.nationalityTiers?.[nationality] ?? null;
  }

  private getAgeBracket(age: number): string {
    if (age <= 22) return '18-22';
    if (age <= 25) return '23-25';
    if (age <= 30) return '26-30';
    if (age <= 35) return '31-35';
    if (age <= 40) return '36-40';
    if (age <= 45) return '41-45';
    if (age <= 50) return '46-50';
    if (age <= 55) return '51-55';
    if (age <= 60) return '56-60';
    return '61+';
  }

  private getFundBracket(fund: number): string {
    if (fund < 300) return '0-300';
    if (fund < 500) return '300-500';
    if (fund < 1000) return '500-1000';
    if (fund < 2000) return '1000-2000';
    if (fund < 3000) return '2000-3000';
    return '3000+';
  }

  private meetsMinEducation(actual: string, min: string): boolean {
    const levels = [
      'none',
      'middle',
      'high_school',
      'associate',
      'bachelor',
      'master',
      'doctor',
    ];
    return levels.indexOf(actual) >= levels.indexOf(min);
  }

  private isNationalityAllowed(
    allowedType: string,
    natInfo: NationalityInfo | null,
    isEthnicKorean?: boolean,
  ): boolean {
    if (allowedType === 'ALL') return true;
    if (!natInfo) return allowedType === 'ALL';

    switch (allowedType) {
      case 'EPS_16':
        return natInfo.epsCountry === true;
      case 'WH_18':
        return natInfo.whCountry === true;
      case 'H2_ELIGIBLE':
        return natInfo.dongpo === true && isEthnicKorean === true;
      case 'DONGPO_ALL':
        return isEthnicKorean === true;
      case 'DOMESTIC_OK':
        return true;
      default:
        return true;
    }
  }

  private normalizeLanguage(language?: string): PlannerLanguage {
    if (language === 'tl') return 'fil';
    return SUPPORTED_LANGS.includes(language as PlannerLanguage)
      ? (language as PlannerLanguage)
      : 'en';
  }

  private mapEducationLevel(educationLevel?: string) {
    switch (educationLevel) {
      case 'high_school':
        return 'HIGH_SCHOOL';
      case 'associate':
        return 'COLLEGE';
      case 'bachelor':
        return 'BACHELOR';
      case 'master':
        return 'MASTER';
      case 'doctor':
        return 'DOCTOR';
      default:
        return undefined;
    }
  }

  private defaultCopy(pw: PathwayDef) {
    return {
      ko: pw.pathwayId,
      en: pw.pathwayId,
      subtitleEn: 'Korea visa pathway',
      subtitleKo: '한국 체류 경로',
      chain: [pw.pathwayId],
      reasonEn:
        'This route should be checked with the latest official policy before filing.',
      reasonKo: '신청 전 최신 공식 정책 확인이 필요합니다.',
    };
  }
}
