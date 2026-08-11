import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';
import type { PolicyChange, Prisma } from 'generated/prisma-user';
import {
  PolicyChangeQueryDto,
  ReviewPolicyChangeDto,
} from './dto/visa-policy.dto';
import {
  ApprovedPolicyEvidence,
  ApprovedPolicyEvidenceResult,
} from './visa-policy.types';

const PUBLIC_VISA_CODES = new Set([
  'D-2',
  'D-2-1',
  'D-2-2',
  'D-4',
  'D-8',
  'D-10',
  'E-7',
  'E-7-1',
  'E-7-4',
  'E-9',
  'F-2-7',
  'F-2-R',
  'F-4',
  'H-1',
  'H-2',
]);

const REVIEW_TRANSITIONS: Record<string, readonly string[]> = {
  PENDING: ['REVIEWED', 'DISMISSED'],
  REVIEWED: [],
  RULE_DRAFTED: ['APPLIED', 'DISMISSED'],
  APPLIED: [],
  DISMISSED: [],
};

const OFFICIAL_SOURCE_HOSTS: Record<string, readonly string[]> = {
  law_go_kr: ['law.go.kr', 'www.law.go.kr'],
  immigration_go_kr: ['immigration.go.kr', 'www.immigration.go.kr'],
  eps_go_kr: ['eps.go.kr', 'www.eps.go.kr'],
  moel_go_kr: ['moel.go.kr', 'www.moel.go.kr'],
  hikorea_go_kr: ['hikorea.go.kr', 'www.hikorea.go.kr'],
};

@Injectable()
export class VisaPolicyService {
  constructor(private readonly prisma: AuthPrismaService) {}

  async getPolicyChanges(filters: PolicyChangeQueryDto) {
    const {
      sourceSite,
      reviewStatus,
      affectedVisaTypes,
      page = 1,
      limit = 20,
    } = filters;

    const where: Prisma.PolicyChangeWhereInput = {};
    if (sourceSite) where.sourceSite = sourceSite;
    if (reviewStatus) where.reviewStatus = reviewStatus;
    if (affectedVisaTypes) {
      where.affectedVisaTypes = { contains: affectedVisaTypes.trim() };
    }

    const [changes, total] = await Promise.all([
      this.prisma.policyChange.findMany({
        where,
        orderBy: { detectedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.policyChange.count({ where }),
    ]);

    return {
      data: changes.map((change) => this.serializePolicyChange(change)),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async getPolicyChangeById(id: string) {
    const policyChangeId = this.parsePolicyChangeId(id);
    const change = await this.prisma.policyChange.findUnique({
      where: { id: policyChangeId },
    });
    if (!change) {
      throw new NotFoundException('정책 변경 건을 찾을 수 없습니다.');
    }
    return this.serializePolicyChange(change);
  }

  async reviewPolicyChange(
    id: string,
    data: ReviewPolicyChangeDto,
    adminId: string,
  ) {
    const policyChangeId = this.parsePolicyChangeId(id);
    return this.prisma.$transaction(async (tx) => {
      const change = await tx.policyChange.findUnique({
        where: { id: policyChangeId },
      });
      if (!change) {
        throw new NotFoundException('정책 변경 건을 찾을 수 없습니다.');
      }

      const currentStatus = String(change.reviewStatus);
      const nextStatus = data.reviewStatus;
      if (!REVIEW_TRANSITIONS[currentStatus]?.includes(nextStatus)) {
        throw new ConflictException(
          `허용되지 않은 정책 상태 전이입니다: ${currentStatus} -> ${nextStatus}`,
        );
      }

      const affectedVisaTypes =
        data.affectedVisaTypes?.trim() || change.affectedVisaTypes;
      if (nextStatus === 'REVIEWED' && !affectedVisaTypes) {
        throw new BadRequestException(
          '검토 완료 전에 영향받는 비자 유형을 지정해야 합니다.',
        );
      }

      if (nextStatus === 'APPLIED') {
        await this.assertApplicableEvidence(
          tx,
          { ...change, affectedVisaTypes },
          adminId,
        );
      }

      await tx.policyChange.update({
        where: { id: policyChangeId },
        data: {
          reviewStatus: nextStatus,
          reviewNote: data.reviewNote,
          affectedVisaTypes,
          reviewedBy: adminId,
          reviewedAt: new Date(),
        },
      });

      return { success: true, reviewStatus: nextStatus };
    });
  }

  async createDraftRuleFromChange(changeId: string, adminId: string) {
    const policyChangeId = this.parsePolicyChangeId(changeId);
    return this.prisma.$transaction(async (tx) => {
      const change = await tx.policyChange.findUnique({
        where: { id: policyChangeId },
      });
      if (!change) {
        throw new NotFoundException('정책 변경 건을 찾을 수 없습니다.');
      }
      if (String(change.reviewStatus) !== 'REVIEWED') {
        throw new ConflictException(
          'REVIEWED 상태의 정책 변경만 규칙 초안을 만들 수 있습니다.',
        );
      }
      if (change.draftRuleId) {
        throw new ConflictException('이미 연결된 규칙 초안이 있습니다.');
      }

      const visaCodes = this.parseAffectedVisaCodes(change.affectedVisaTypes);
      if (visaCodes.length === 0) {
        throw new BadRequestException(
          '영향받는 비자 유형을 먼저 지정해주세요.',
        );
      }

      const visaType = await tx.visaType.findUnique({
        where: { code: visaCodes[0] },
      });
      if (!visaType) {
        throw new BadRequestException('등록되지 않은 비자 유형입니다.');
      }

      const rule = await tx.visaRule.create({
        data: {
          visaTypeId: visaType.id,
          ruleName: `[초안] ${change.pageTitle || '정책 변경 반영'}`.substring(
            0,
            100,
          ),
          ruleDescription: `정책 변경 ID: ${changeId}\n출처: ${change.sourceSite}\n요약: ${change.summary}`,
          priority: 100,
          ruleType: 'ELIGIBILITY',
          conditions: JSON.stringify({
            operator: 'AND',
            clauses: [],
            _reviewRequired: true,
          }),
          actions: JSON.stringify({
            type: 'REVIEW_REQUIRED',
            documents: [],
            restrictions: [],
            notes: '관리자 검토 후 별도 규칙 관리 화면에서 활성화해야 합니다.',
          }),
          status: 'DRAFT',
          effectiveFrom: change.effectiveDate || new Date(),
          createdBy: adminId,
        },
      });

      await tx.policyChange.update({
        where: { id: policyChangeId },
        data: {
          draftRuleId: rule.id,
          reviewStatus: 'RULE_DRAFTED',
        },
      });

      return { success: true, ruleId: rule.id.toString() };
    });
  }

  async getApprovedEvidence(
    visaCode: string,
    asOfInput?: string,
  ): Promise<ApprovedPolicyEvidenceResult> {
    const normalizedVisaCode = this.normalizePublicVisaCode(visaCode);
    const asOf = this.parseAsOf(asOfInput);
    const grouped = await this.getApprovedEvidenceForVisaCodes(
      [normalizedVisaCode],
      asOf,
    );
    return {
      visaCode: normalizedVisaCode,
      asOf: asOf.toISOString(),
      evidence: grouped.get(normalizedVisaCode) ?? [],
    };
  }

  async getApprovedEvidenceForVisaCodes(
    visaCodes: string[],
    asOf = new Date(),
  ): Promise<Map<string, ApprovedPolicyEvidence[]>> {
    const normalizedCodes = Array.from(
      new Set(
        visaCodes
          .map((code) => code.trim().toUpperCase())
          .filter((code) => PUBLIC_VISA_CODES.has(code)),
      ),
    );
    const result = new Map<string, ApprovedPolicyEvidence[]>(
      normalizedCodes.map((code) => [code, []]),
    );
    if (normalizedCodes.length === 0) return result;

    const rules = await this.prisma.visaRule.findMany({
      where: {
        status: 'ACTIVE',
        effectiveFrom: { lte: asOf },
        OR: [{ effectiveTo: null }, { effectiveTo: { gt: asOf } }],
        visaType: { code: { in: normalizedCodes } },
      },
      select: {
        id: true,
        version: true,
        status: true,
        effectiveFrom: true,
        effectiveTo: true,
        visaType: { select: { code: true } },
      },
    });

    const activeRules = rules.filter(
      (rule) =>
        String(rule.status) === 'ACTIVE' &&
        rule.effectiveFrom <= asOf &&
        (!rule.effectiveTo || rule.effectiveTo > asOf),
    );
    if (activeRules.length === 0) return result;

    const ruleById = new Map(
      activeRules.map((rule) => [rule.id.toString(), rule]),
    );
    const changes = await this.prisma.policyChange.findMany({
      where: {
        reviewStatus: 'APPLIED',
        draftRuleId: { in: activeRules.map((rule) => rule.id) },
        reviewedBy: { not: null },
        reviewedAt: { not: null, lte: asOf },
        contentHash: { not: null },
        OR: [{ effectiveDate: null }, { effectiveDate: { lte: asOf } }],
      },
      select: {
        sourceSite: true,
        sourceUrl: true,
        contentHash: true,
        effectiveDate: true,
        reviewedAt: true,
        reviewedBy: true,
        reviewStatus: true,
        draftRuleId: true,
      },
      orderBy: { reviewedAt: 'desc' },
    });

    for (const change of changes) {
      if (
        String(change.reviewStatus) !== 'APPLIED' ||
        !change.draftRuleId ||
        !change.reviewedBy ||
        !change.reviewedAt ||
        change.reviewedAt > asOf ||
        !change.contentHash ||
        !/^[a-f0-9]{64}$/i.test(change.contentHash) ||
        !change.sourceUrl ||
        (change.effectiveDate && change.effectiveDate > asOf) ||
        !this.isOfficialSourceUrl(change.sourceSite, change.sourceUrl)
      ) {
        continue;
      }
      const rule = ruleById.get(change.draftRuleId.toString());
      if (!rule) continue;
      const evidence: ApprovedPolicyEvidence = {
        visaCode: rule.visaType.code,
        sourceSite: change.sourceSite,
        sourceUrl: change.sourceUrl,
        contentHash: change.contentHash,
        effectiveDate: change.effectiveDate?.toISOString() ?? null,
        reviewedAt: change.reviewedAt.toISOString(),
        ruleId: rule.id.toString(),
        version: rule.version,
      };
      result.get(rule.visaType.code)?.push(evidence);
    }

    return result;
  }

  async getPolicySummary() {
    const [
      pendingChanges,
      totalChanges,
      activeRules,
      draftRules,
      totalVisaTypes,
    ] = await Promise.all([
      this.prisma.policyChange.count({ where: { reviewStatus: 'PENDING' } }),
      this.prisma.policyChange.count(),
      this.prisma.visaRule.count({ where: { status: 'ACTIVE' } }),
      this.prisma.visaRule.count({ where: { status: 'DRAFT' } }),
      this.prisma.visaType.count({ where: { isActive: true } }),
    ]);

    return {
      pendingChanges,
      totalChanges,
      activeRules,
      draftRules,
      totalVisaTypes,
    };
  }

  private async assertApplicableEvidence(
    tx: Prisma.TransactionClient,
    change: PolicyChange,
    approvingAdminId: string,
  ) {
    if (
      !change.draftRuleId ||
      !change.sourceSite ||
      !change.sourceUrl ||
      !change.contentHash ||
      !change.reviewedBy ||
      !change.reviewedAt
    ) {
      throw new BadRequestException(
        '적용에는 연결 규칙, 출처, 콘텐츠 해시와 선행 검토자가 필요합니다.',
      );
    }
    if (!/^[a-f0-9]{64}$/i.test(change.contentHash)) {
      throw new BadRequestException('유효한 SHA-256 콘텐츠 해시가 필요합니다.');
    }
    if (!this.isOfficialSourceUrl(change.sourceSite, change.sourceUrl)) {
      throw new BadRequestException(
        '출처 사이트와 일치하는 공식 HTTPS URL이 필요합니다.',
      );
    }

    const rule = await tx.visaRule.findUnique({
      where: { id: change.draftRuleId },
      include: { visaType: true },
    });
    const now = new Date();
    if (
      !rule ||
      String(rule.status) !== 'ACTIVE' ||
      rule.effectiveFrom > now ||
      (rule.effectiveTo && rule.effectiveTo <= now)
    ) {
      throw new BadRequestException('현재 유효한 ACTIVE 규칙이 필요합니다.');
    }
    if (!rule.createdBy || rule.createdBy === approvingAdminId) {
      throw new ConflictException(
        '규칙 작성자와 정책 적용 승인자는 서로 달라야 합니다.',
      );
    }
    const affectedCodes = this.parseAffectedVisaCodes(change.affectedVisaTypes);
    if (!affectedCodes.includes(rule.visaType.code)) {
      throw new BadRequestException(
        '연결 규칙의 비자 코드가 영향 비자 목록에 포함되어야 합니다.',
      );
    }
  }

  private parsePolicyChangeId(id: string): bigint {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('잘못된 정책 변경 ID입니다.');
    }
    try {
      const parsed = BigInt(id);
      if (parsed <= 0n || parsed > 9_223_372_036_854_775_807n) {
        throw new Error();
      }
      return parsed;
    } catch {
      throw new BadRequestException('잘못된 정책 변경 ID입니다.');
    }
  }

  private normalizePublicVisaCode(value: string): string {
    let normalized: string;
    try {
      normalized = decodeURIComponent(value).trim().toUpperCase();
    } catch {
      throw new BadRequestException('잘못된 비자 코드입니다.');
    }
    if (!PUBLIC_VISA_CODES.has(normalized)) {
      throw new BadRequestException(
        '공개 조회가 허용되지 않은 비자 코드입니다.',
      );
    }
    return normalized;
  }

  private parseAsOf(value?: string): Date {
    const asOf = value ? new Date(value) : new Date();
    if (Number.isNaN(asOf.getTime())) {
      throw new BadRequestException('잘못된 기준일입니다.');
    }
    if (asOf.getTime() > Date.now() + 60_000) {
      throw new BadRequestException('미래 기준일은 조회할 수 없습니다.');
    }
    return asOf;
  }

  private isOfficialSourceUrl(sourceSite: string, sourceUrl: string): boolean {
    const allowedHosts = OFFICIAL_SOURCE_HOSTS[sourceSite];
    if (!allowedHosts) return false;
    try {
      const url = new URL(sourceUrl);
      return (
        url.protocol === 'https:' &&
        url.username === '' &&
        url.password === '' &&
        url.port === '' &&
        allowedHosts.includes(url.hostname.toLowerCase())
      );
    } catch {
      return false;
    }
  }

  private parseAffectedVisaCodes(value?: string | null): string[] {
    return (value ?? '')
      .split(',')
      .map((code) => code.trim().toUpperCase())
      .filter(Boolean);
  }

  private serializePolicyChange(change: PolicyChange) {
    return {
      id: change.id.toString(),
      sourceSite: change.sourceSite,
      sourceUrl: change.sourceUrl,
      pageTitle: change.pageTitle,
      summary: change.summary,
      previousContent: change.previousContent,
      currentContent: change.currentContent,
      changeType: change.changeType,
      affectedVisaTypes: change.affectedVisaTypes,
      effectiveDate: change.effectiveDate?.toISOString() || null,
      reviewStatus: change.reviewStatus,
      reviewedBy: change.reviewedBy,
      reviewedAt: change.reviewedAt?.toISOString() || null,
      reviewNote: change.reviewNote,
      draftRuleId: change.draftRuleId?.toString() || null,
      detectedAt: change.detectedAt.toISOString(),
    };
  }
}
