import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';

@Injectable()
export class VisaPolicyService {
  constructor(private readonly prisma: AuthPrismaService) {}

  /**
   * 정책 변경 목록 조회 (페이징/필터)
   */
  async getPolicyChanges(filters: {
    sourceSite?: string;
    reviewStatus?: string;
    page?: number;
    limit?: number;
  }) {
    const { sourceSite, reviewStatus, page = 1, limit = 20 } = filters;

    const where: any = {};
    if (sourceSite) where.sourceSite = sourceSite;
    if (reviewStatus) where.reviewStatus = reviewStatus;

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
      data: changes.map((c) => ({
        id: c.id.toString(),
        sourceSite: c.sourceSite,
        sourceUrl: c.sourceUrl,
        pageTitle: c.pageTitle,
        summary: c.summary,
        previousContent: c.previousContent,
        currentContent: c.currentContent,
        changeType: c.changeType,
        affectedVisaTypes: c.affectedVisaTypes,
        effectiveDate: c.effectiveDate?.toISOString() || null,
        reviewStatus: c.reviewStatus,
        reviewedBy: c.reviewedBy,
        reviewedAt: c.reviewedAt?.toISOString() || null,
        reviewNote: c.reviewNote,
        draftRuleId: c.draftRuleId?.toString() || null,
        detectedAt: c.detectedAt.toISOString(),
      })),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * 정책 변경 상세 조회
   */
  async getPolicyChangeById(id: string) {
    const change = await this.prisma.policyChange.findUnique({
      where: { id: BigInt(id) },
    });
    if (!change) throw new NotFoundException('정책 변경 건을 찾을 수 없습니다.');

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

  /**
   * 관리자: 정책 변경 검토 처리
   */
  async reviewPolicyChange(
    id: string,
    data: {
      reviewStatus: string;
      reviewNote?: string;
      affectedVisaTypes?: string;
    },
    adminId: string,
  ) {
    const change = await this.prisma.policyChange.findUnique({
      where: { id: BigInt(id) },
    });
    if (!change) throw new NotFoundException('정책 변경 건을 찾을 수 없습니다.');

    await this.prisma.policyChange.update({
      where: { id: BigInt(id) },
      data: {
        reviewStatus: data.reviewStatus as any,
        reviewNote: data.reviewNote,
        affectedVisaTypes: data.affectedVisaTypes,
        reviewedBy: adminId,
        reviewedAt: new Date(),
      },
    });

    return { success: true };
  }

  /**
   * 정책 변경에서 규칙 초안 생성
   */
  async createDraftRuleFromChange(changeId: string, adminId: string) {
    const change = await this.prisma.policyChange.findUnique({
      where: { id: BigInt(changeId) },
    });
    if (!change) throw new NotFoundException('정책 변경 건을 찾을 수 없습니다.');

    // 영향받는 비자 유형에서 첫 번째 비자를 기본 대상으로
    const visaCodes = change.affectedVisaTypes?.split(',').map((s) => s.trim()) || [];
    let visaTypeId: bigint | null = null;

    if (visaCodes.length > 0) {
      const vt = await this.prisma.visaType.findUnique({
        where: { code: visaCodes[0] },
      });
      if (vt) visaTypeId = vt.id;
    }

    if (!visaTypeId) {
      throw new BadRequestException(
        '영향받는 비자 유형을 먼저 지정해주세요.',
      );
    }

    // DRAFT 규칙 생성
    const draftConditions = JSON.stringify({
      operator: 'AND',
      clauses: [
        {
          field: 'ksicCode',
          op: 'STARTS_WITH',
          value: '',
          _note: '업종코드를 입력하세요',
        },
      ],
    });

    const draftActions = JSON.stringify({
      type: 'ELIGIBLE',
      documents: [],
      restrictions: [],
      notes: `정책 변경 반영: ${change.pageTitle || change.summary.substring(0, 50)}`,
    });

    const rule = await this.prisma.visaRule.create({
      data: {
        visaTypeId,
        ruleName: `[초안] ${change.pageTitle || '정책 변경 반영'}`.substring(0, 100),
        ruleDescription: `정책 변경 ID: ${changeId}\n출처: ${change.sourceSite}\n요약: ${change.summary}`,
        priority: 100,
        ruleType: 'ELIGIBILITY',
        conditions: draftConditions,
        actions: draftActions,
        status: 'DRAFT',
        effectiveFrom: change.effectiveDate || new Date(),
        createdBy: adminId,
      },
    });

    // 정책 변경에 초안 연결
    await this.prisma.policyChange.update({
      where: { id: BigInt(changeId) },
      data: {
        draftRuleId: rule.id,
        reviewStatus: 'RULE_DRAFTED',
        reviewedBy: adminId,
        reviewedAt: new Date(),
      },
    });

    return { success: true, ruleId: rule.id.toString() };
  }

  /**
   * 대시보드 요약 통계
   */
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
}
