import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LogPrismaService } from 'libs/common/src';
import { AuthPrismaService } from 'libs/common/src';
import { LoggingService } from '../logging/logging.service';

/**
 * 법령 변경 관리 서비스
 * Law amendment management service
 *
 * 파이프라인 / Pipeline:
 *   감지(DETECTED) → 검토(REVIEWING) → 승인(APPROVED) → 시뮬레이션(STAGING) → 적용(APPLIED)
 *                                    → 반려(REJECTED)
 */

// 상태 전이 규칙 / Valid status transitions
const VALID_TRANSITIONS: Record<string, string[]> = {
  DETECTED: ['REVIEWING', 'REJECTED'],
  REVIEWING: ['APPROVED', 'REJECTED'],
  APPROVED: ['STAGING', 'APPLIED', 'REJECTED'], // APPLIED = 긴급 즉시 적용 / emergency immediate apply
  STAGING: ['APPLIED', 'REJECTED'],
  APPLIED: [],
  REJECTED: ['DETECTED'], // 반려 → 재검토 가능 / rejected → can re-detect
};

@Injectable()
export class LawAmendmentService {
  private readonly logger = new Logger(LawAmendmentService.name);

  constructor(
    private readonly logPrisma: LogPrismaService,
    private readonly authPrisma: AuthPrismaService,
    private readonly loggingService: LoggingService,
  ) {}

  // ================================================
  // create() — 변경건 생성 (수동 또는 자동)
  // Create amendment (manual or automatic)
  // ================================================
  async create(
    adminId: string,
    data: {
      title: string;
      source: string;
      sourceUrl?: string;
      effectiveDate: string; // ISO date string
      affectedVisaCodes: string[];
      changeSummary: Record<string, any>;
      changeDetails: Record<string, any>;
      items?: Array<{
        targetTable: string;
        targetId?: string;
        action: string;
        beforeData?: Record<string, any>;
        afterData: Record<string, any>;
      }>;
    },
  ) {
    const amendment = await this.logPrisma.lawAmendment.create({
      data: {
        title: data.title,
        source: data.source,
        sourceUrl: data.sourceUrl,
        effectiveDate: new Date(data.effectiveDate),
        status: 'DETECTED',
        affectedVisaCodes: data.affectedVisaCodes,
        changeSummary: JSON.stringify(data.changeSummary),
        changeDetails: JSON.stringify(data.changeDetails),
      },
    });

    // 변경 항목 일괄 생성 / Batch create amendment items
    if (data.items && data.items.length > 0) {
      for (const item of data.items) {
        await this.logPrisma.lawAmendmentItem.create({
          data: {
            amendmentId: amendment.id,
            targetTable: item.targetTable,
            targetId: item.targetId,
            action: item.action,
            beforeData: item.beforeData
              ? JSON.stringify(item.beforeData)
              : null,
            afterData: JSON.stringify(item.afterData),
          },
        });
      }
    }

    // 변경 로그 기록 / Log change
    await this.loggingService.logChange({
      adminId,
      tableName: 'LawAmendment',
      recordId: amendment.id,
      action: 'CREATE',
      after: JSON.stringify({ title: data.title, source: data.source }),
    });

    this.logger.log(
      `Amendment created: ${amendment.id} — ${data.title} (by admin ${adminId})`,
    );

    return {
      ...amendment,
      changeSummary: JSON.parse(amendment.changeSummary),
      changeDetails: JSON.parse(amendment.changeDetails),
    };
  }

  // ================================================
  // findAll() — 상태별 필터
  // List amendments with status filter
  // ================================================
  async findAll(filter: { status?: string; page?: number; limit?: number }) {
    const { status, page = 1, limit = 20 } = filter;
    const where: any = {};

    if (status) where.status = status;

    const [items, total] = await Promise.all([
      this.logPrisma.lawAmendment.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { items: true },
      }),
      this.logPrisma.lawAmendment.count({ where }),
    ]);

    return {
      items: items.map((a) => this.formatAmendment(a)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ================================================
  // findOne() — 상세 (items + diff)
  // Get detail with items and diff
  // ================================================
  async findOne(id: string) {
    const amendment = await this.logPrisma.lawAmendment.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!amendment) {
      throw new NotFoundException(`Amendment ${id} not found`);
    }

    return this.formatAmendment(amendment);
  }

  // ================================================
  // updateStatus() — 상태 전이
  // Status transition (DETECTED→REVIEWING→APPROVED→STAGING→APPLIED)
  // ================================================
  async updateStatus(adminId: string, id: string, newStatus: string) {
    const amendment = await this.logPrisma.lawAmendment.findUnique({
      where: { id },
    });

    if (!amendment) {
      throw new NotFoundException(`Amendment ${id} not found`);
    }

    const allowed = VALID_TRANSITIONS[amendment.status] || [];
    if (!allowed.includes(newStatus)) {
      throw new BadRequestException(
        `Cannot transition from ${amendment.status} to ${newStatus}. ` +
          `Allowed: ${allowed.join(', ') || 'none'}`,
      );
    }

    const updateData: any = { status: newStatus };

    if (newStatus === 'REVIEWING' || newStatus === 'APPROVED') {
      updateData.reviewedBy = adminId;
      updateData.reviewedAt = new Date();
    }

    const updated = await this.logPrisma.lawAmendment.update({
      where: { id },
      data: updateData,
    });

    await this.loggingService.logChange({
      adminId,
      tableName: 'LawAmendment',
      recordId: id,
      action: 'UPDATE',
      before: JSON.stringify({ status: amendment.status }),
      after: JSON.stringify({ status: newStatus }),
    });

    return this.formatAmendment(updated);
  }

  // ================================================
  // approve() — 승인 + 시행일
  // Approve and set effective date
  // ================================================
  async approve(adminId: string, id: string, effectiveDate?: string) {
    const amendment = await this.logPrisma.lawAmendment.findUnique({
      where: { id },
    });

    if (!amendment) {
      throw new NotFoundException(`Amendment ${id} not found`);
    }

    if (!['DETECTED', 'REVIEWING'].includes(amendment.status)) {
      throw new BadRequestException(
        `Cannot approve amendment with status ${amendment.status}`,
      );
    }

    const updateData: any = {
      status: 'APPROVED',
      reviewedBy: adminId,
      reviewedAt: new Date(),
    };

    if (effectiveDate) {
      updateData.effectiveDate = new Date(effectiveDate);
    }

    const updated = await this.logPrisma.lawAmendment.update({
      where: { id },
      data: updateData,
      include: { items: true },
    });

    await this.loggingService.logChange({
      adminId,
      tableName: 'LawAmendment',
      recordId: id,
      action: 'UPDATE',
      before: JSON.stringify({ status: amendment.status }),
      after: JSON.stringify({
        status: 'APPROVED',
        effectiveDate: updated.effectiveDate,
      }),
    });

    this.logger.log(`Amendment ${id} approved by admin ${adminId}`);

    return this.formatAmendment(updated);
  }

  // ================================================
  // reject() — 반려
  // Reject amendment
  // ================================================
  async reject(adminId: string, id: string, reason: string) {
    if (!reason) {
      throw new BadRequestException('Rejection reason is required');
    }

    const amendment = await this.logPrisma.lawAmendment.findUnique({
      where: { id },
    });

    if (!amendment) {
      throw new NotFoundException(`Amendment ${id} not found`);
    }

    if (amendment.status === 'APPLIED') {
      throw new BadRequestException(
        'Cannot reject an already applied amendment',
      );
    }

    const updated = await this.logPrisma.lawAmendment.update({
      where: { id },
      data: {
        status: 'REJECTED',
        rejectedAt: new Date(),
        rejectionReason: reason,
        reviewedBy: adminId,
        reviewedAt: new Date(),
      },
      include: { items: true },
    });

    await this.loggingService.logChange({
      adminId,
      tableName: 'LawAmendment',
      recordId: id,
      action: 'UPDATE',
      before: JSON.stringify({ status: amendment.status }),
      after: JSON.stringify({ status: 'REJECTED', rejectionReason: reason }),
    });

    this.logger.log(`Amendment ${id} rejected by admin ${adminId}: ${reason}`);

    return this.formatAmendment(updated);
  }

  // ================================================
  // getImpactAnalysis() — 이 변경 적용 시 기존 공고 몇 건 영향?
  // Impact analysis — how many visa types/rules affected?
  // ================================================
  async getImpactAnalysis(id: string) {
    const amendment = await this.logPrisma.lawAmendment.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!amendment) {
      throw new NotFoundException(`Amendment ${id} not found`);
    }

    const visaCodes = amendment.affectedVisaCodes;

    // 영향 비자 타입 조회 / Count affected visa types
    const affectedVisaTypes = await this.authPrisma.visaType.findMany({
      where: {
        code: { in: visaCodes },
        isActive: true,
      },
      select: { id: true, code: true, nameKo: true },
    });

    // 영향 비자 규칙 조회 / Count affected visa rules
    const affectedRules = await this.authPrisma.visaRule.findMany({
      where: {
        visaType: { code: { in: visaCodes } },
        status: 'ACTIVE',
      },
      select: {
        id: true,
        ruleName: true,
        visaType: { select: { code: true } },
      },
    });

    // 변경 항목별 영향 분석 / Per-item impact breakdown
    const itemImpacts = amendment.items.map((item) => ({
      targetTable: item.targetTable,
      targetId: item.targetId,
      action: item.action,
      description: this.describeItemImpact(item),
    }));

    const analysis = {
      amendmentId: id,
      affectedVisaCodes: visaCodes,
      affectedVisaTypeCount: affectedVisaTypes.length,
      affectedVisaTypes: affectedVisaTypes.map((v) => ({
        id: Number(v.id),
        code: v.code,
        nameKo: v.nameKo,
      })),
      affectedRuleCount: affectedRules.length,
      affectedRules: affectedRules.map((r) => ({
        id: Number(r.id),
        ruleName: r.ruleName,
        visaCode: r.visaType?.code,
      })),
      itemCount: amendment.items.length,
      itemImpacts,
      riskLevel: this.assessRiskLevel(
        affectedVisaTypes.length,
        affectedRules.length,
        amendment.items.length,
      ),
    };

    // 영향 분석 결과 저장 / Save impact analysis result
    await this.logPrisma.lawAmendment.update({
      where: { id },
      data: { impactAnalysis: JSON.stringify(analysis) },
    });

    return analysis;
  }

  // ================================================
  // simulate() — 변경 적용 전 테스트 매칭
  // Simulate — preview what changes would be applied
  // ================================================
  async simulate(id: string) {
    const amendment = await this.logPrisma.lawAmendment.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!amendment) {
      throw new NotFoundException(`Amendment ${id} not found`);
    }

    // 상태를 STAGING으로 전이 / Transition to STAGING
    if (amendment.status === 'APPROVED') {
      await this.logPrisma.lawAmendment.update({
        where: { id },
        data: { status: 'STAGING' },
      });
    }

    const simulationResults: Array<{
      itemId: string;
      targetTable: string;
      action: string;
      currentData: any;
      proposedData: any;
      canApply: boolean;
      issues: string[];
    }> = [];

    for (const item of amendment.items) {
      const result = await this.simulateItem(item);
      simulationResults.push(result);
    }

    const allCanApply = simulationResults.every((r) => r.canApply);
    const totalIssues = simulationResults.reduce(
      (acc, r) => acc + r.issues.length,
      0,
    );

    return {
      amendmentId: id,
      status: allCanApply ? 'READY' : 'HAS_ISSUES',
      totalItems: amendment.items.length,
      applyableItems: simulationResults.filter((r) => r.canApply).length,
      totalIssues,
      results: simulationResults,
    };
  }

  // ================================================
  // createItem() — 변경 항목 생성
  // Create amendment item (table/record/action/before/after)
  // ================================================
  async createItem(
    amendmentId: string,
    data: {
      targetTable: string;
      targetId?: string;
      action: string;
      beforeData?: Record<string, any>;
      afterData: Record<string, any>;
    },
  ) {
    const amendment = await this.logPrisma.lawAmendment.findUnique({
      where: { id: amendmentId },
    });

    if (!amendment) {
      throw new NotFoundException(`Amendment ${amendmentId} not found`);
    }

    if (['APPLIED', 'REJECTED'].includes(amendment.status)) {
      throw new BadRequestException(
        `Cannot add items to ${amendment.status} amendment`,
      );
    }

    const item = await this.logPrisma.lawAmendmentItem.create({
      data: {
        amendmentId,
        targetTable: data.targetTable,
        targetId: data.targetId,
        action: data.action,
        beforeData: data.beforeData ? JSON.stringify(data.beforeData) : null,
        afterData: JSON.stringify(data.afterData),
      },
    });

    return this.formatItem(item);
  }

  // ================================================
  // getDiff() — 전/후 비교
  // Get before/after diff for an item
  // ================================================
  async getDiff(itemId: string) {
    const item = await this.logPrisma.lawAmendmentItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException(`Amendment item ${itemId} not found`);
    }

    const before = item.beforeData ? JSON.parse(item.beforeData) : null;
    const after = JSON.parse(item.afterData);

    // 변경된 필드 추출 / Extract changed fields
    const changes: Array<{
      field: string;
      before: any;
      after: any;
    }> = [];

    if (before && after) {
      const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);
      for (const key of allKeys) {
        if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
          changes.push({
            field: key,
            before: before[key] ?? null,
            after: after[key] ?? null,
          });
        }
      }
    } else if (after) {
      // CREATE 케이스: before 없음 / CREATE case: no before data
      for (const key of Object.keys(after)) {
        changes.push({ field: key, before: null, after: after[key] });
      }
    }

    return {
      itemId,
      action: item.action,
      targetTable: item.targetTable,
      targetId: item.targetId,
      before,
      after,
      changes,
      isApplied: item.isApplied,
    };
  }

  // ================================================
  // applyAmendment() — 승인 + effectiveDate 도래 시 적용
  // Apply amendment: iterate items → update DB → log → set APPLIED
  // ================================================
  async applyAmendment(adminId: string, id: string) {
    const amendment = await this.logPrisma.lawAmendment.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!amendment) {
      throw new NotFoundException(`Amendment ${id} not found`);
    }

    if (!['APPROVED', 'STAGING'].includes(amendment.status)) {
      throw new BadRequestException(
        `Cannot apply amendment with status ${amendment.status}. Must be APPROVED or STAGING.`,
      );
    }

    const results: Array<{
      itemId: string;
      success: boolean;
      error?: string;
    }> = [];

    // items 순회 → VisaType/VisaRule 변경 / Iterate items → apply changes
    for (const item of amendment.items) {
      if (item.isApplied) {
        results.push({ itemId: item.id, success: true });
        continue;
      }

      try {
        await this.applyItem(item, adminId);
        results.push({ itemId: item.id, success: true });
      } catch (e) {
        this.logger.error(`Failed to apply item ${item.id}: ${e.message}`);
        results.push({ itemId: item.id, success: false, error: e.message });
      }
    }

    const allSuccess = results.every((r) => r.success);

    // status=APPLIED / Set final status
    const updated = await this.logPrisma.lawAmendment.update({
      where: { id },
      data: {
        status: allSuccess ? 'APPLIED' : amendment.status,
        appliedAt: allSuccess ? new Date() : undefined,
      },
      include: { items: true },
    });

    // 변경 로그 기록 / Log the application
    await this.loggingService.logChange({
      adminId,
      tableName: 'LawAmendment',
      recordId: id,
      action: 'UPDATE',
      before: JSON.stringify({ status: amendment.status }),
      after: JSON.stringify({
        status: allSuccess ? 'APPLIED' : amendment.status,
        appliedItemCount: results.filter((r) => r.success).length,
        failedItemCount: results.filter((r) => !r.success).length,
      }),
    });

    this.logger.log(
      `Amendment ${id} apply attempt: ${results.filter((r) => r.success).length}/${results.length} items applied`,
    );

    return {
      ...this.formatAmendment(updated),
      applyResults: results,
      allSuccess,
    };
  }

  // ================================================
  // 예약 반영 크론 — 매일 00:05 실행
  // Scheduled apply — runs daily at 00:05 for effectiveDate check
  // ================================================
  @Cron('0 5 0 * * *', { name: 'law-amendment-apply', timeZone: 'Asia/Seoul' })
  async scheduledApply() {
    this.logger.log('Running scheduled law amendment check...');

    const now = new Date();
    const pendingAmendments = await this.logPrisma.lawAmendment.findMany({
      where: {
        status: 'APPROVED',
        effectiveDate: { lte: now },
      },
      include: { items: true },
    });

    if (pendingAmendments.length === 0) {
      this.logger.log('No amendments to apply.');
      return;
    }

    this.logger.log(`Found ${pendingAmendments.length} amendments to apply.`);

    for (const amendment of pendingAmendments) {
      try {
        await this.applyAmendment('SYSTEM_SCHEDULER', amendment.id);
        this.logger.log(
          `Auto-applied amendment: ${amendment.id} — ${amendment.title}`,
        );
      } catch (e) {
        this.logger.error(
          `Failed to auto-apply amendment ${amendment.id}: ${e.message}`,
        );
      }
    }
  }

  // ================================================
  // Private helpers
  // ================================================

  /** 개별 항목 적용 / Apply a single item */
  private async applyItem(item: any, adminId: string): Promise<void> {
    const afterData = JSON.parse(item.afterData);

    switch (item.targetTable) {
      case 'VisaType':
        await this.applyVisaTypeChange(item, afterData, adminId);
        break;
      case 'VisaRule':
        await this.applyVisaRuleChange(item, afterData, adminId);
        break;
      default:
        this.logger.warn(
          `Unknown target table: ${item.targetTable}. Marking as applied.`,
        );
    }

    // 항목 적용 완료 표시 / Mark item as applied
    await this.logPrisma.lawAmendmentItem.update({
      where: { id: item.id },
      data: { isApplied: true, appliedAt: new Date() },
    });
  }

  /** VisaType 변경 적용 / Apply VisaType change */
  private async applyVisaTypeChange(
    item: any,
    afterData: any,
    adminId: string,
  ): Promise<void> {
    if (item.action === 'UPDATE' && item.targetId) {
      const existing = await this.authPrisma.visaType.findUnique({
        where: { id: BigInt(item.targetId) },
      });
      if (!existing) {
        throw new Error(`VisaType ${item.targetId} not found`);
      }

      await this.authPrisma.visaType.update({
        where: { id: BigInt(item.targetId) },
        data: afterData,
      });

      await this.loggingService.logChange({
        adminId,
        tableName: 'VisaType',
        recordId: item.targetId,
        action: 'UPDATE',
        before: item.beforeData,
        after: item.afterData,
      });
    } else if (item.action === 'CREATE') {
      const created = await this.authPrisma.visaType.create({
        data: afterData,
      });

      await this.loggingService.logChange({
        adminId,
        tableName: 'VisaType',
        recordId: String(created.id),
        action: 'CREATE',
        after: item.afterData,
      });
    } else if (item.action === 'DELETE' && item.targetId) {
      await this.authPrisma.visaType.update({
        where: { id: BigInt(item.targetId) },
        data: { isActive: false },
      });

      await this.loggingService.logChange({
        adminId,
        tableName: 'VisaType',
        recordId: item.targetId,
        action: 'DELETE',
        before: item.beforeData,
      });
    }
  }

  /** VisaRule 변경 적용 / Apply VisaRule change */
  private async applyVisaRuleChange(
    item: any,
    afterData: any,
    adminId: string,
  ): Promise<void> {
    if (item.action === 'UPDATE' && item.targetId) {
      const existing = await this.authPrisma.visaRule.findUnique({
        where: { id: BigInt(item.targetId) },
      });
      if (!existing) {
        throw new Error(`VisaRule ${item.targetId} not found`);
      }

      await this.authPrisma.visaRule.update({
        where: { id: BigInt(item.targetId) },
        data: afterData,
      });

      await this.loggingService.logChange({
        adminId,
        tableName: 'VisaRule',
        recordId: item.targetId,
        action: 'UPDATE',
        before: item.beforeData,
        after: item.afterData,
      });
    } else if (item.action === 'CREATE') {
      const created = await this.authPrisma.visaRule.create({
        data: afterData,
      });

      await this.loggingService.logChange({
        adminId,
        tableName: 'VisaRule',
        recordId: String(created.id),
        action: 'CREATE',
        after: item.afterData,
      });
    } else if (item.action === 'DELETE' && item.targetId) {
      await this.authPrisma.visaRule.update({
        where: { id: BigInt(item.targetId) },
        data: { status: 'ARCHIVED' },
      });

      await this.loggingService.logChange({
        adminId,
        tableName: 'VisaRule',
        recordId: item.targetId,
        action: 'DELETE',
        before: item.beforeData,
      });
    }
  }

  /** 개별 항목 시뮬레이션 / Simulate a single item */
  private async simulateItem(item: any) {
    const issues: string[] = [];
    let currentData: any = null;

    try {
      if (item.targetId) {
        if (item.targetTable === 'VisaType') {
          const record = await this.authPrisma.visaType.findUnique({
            where: { id: BigInt(item.targetId) },
          });
          currentData = record
            ? {
                id: Number(record.id),
                code: record.code,
                nameKo: record.nameKo,
              }
            : null;
          if (!record && item.action !== 'CREATE') {
            issues.push(`VisaType ${item.targetId} not found`);
          }
        } else if (item.targetTable === 'VisaRule') {
          const record = await this.authPrisma.visaRule.findUnique({
            where: { id: BigInt(item.targetId) },
          });
          currentData = record
            ? {
                id: Number(record.id),
                ruleName: record.ruleName,
                status: record.status,
              }
            : null;
          if (!record && item.action !== 'CREATE') {
            issues.push(`VisaRule ${item.targetId} not found`);
          }
        }
      }

      if (item.action === 'DELETE' && !item.targetId) {
        issues.push('DELETE action requires targetId');
      }
      if (item.action === 'UPDATE' && !item.targetId) {
        issues.push('UPDATE action requires targetId');
      }
    } catch (e) {
      issues.push(`Error during simulation: ${e.message}`);
    }

    return {
      itemId: item.id,
      targetTable: item.targetTable,
      action: item.action,
      currentData,
      proposedData: item.afterData ? JSON.parse(item.afterData) : null,
      canApply: issues.length === 0,
      issues,
    };
  }

  /** 항목 영향 설명 생성 / Describe item impact */
  private describeItemImpact(item: any): string {
    const actionMap: Record<string, string> = {
      CREATE: '새 레코드 생성 / Create new record',
      UPDATE: '기존 레코드 수정 / Update existing record',
      DELETE: '레코드 비활성화 / Deactivate record',
    };
    return `${item.targetTable} — ${actionMap[item.action] || item.action}${item.targetId ? ` (ID: ${item.targetId})` : ''}`;
  }

  /** 리스크 수준 평가 / Assess risk level */
  private assessRiskLevel(
    visaTypeCount: number,
    ruleCount: number,
    itemCount: number,
  ): string {
    const total = visaTypeCount + ruleCount + itemCount;
    if (total >= 10) return 'HIGH';
    if (total >= 5) return 'MEDIUM';
    return 'LOW';
  }

  /** LawAmendment JSON 파싱 포맷 / Format amendment with parsed JSON */
  private formatAmendment(amendment: any) {
    return {
      ...amendment,
      changeSummary: this.safeParse(amendment.changeSummary),
      changeDetails: this.safeParse(amendment.changeDetails),
      impactAnalysis: this.safeParse(amendment.impactAnalysis),
      items: amendment.items?.map((item: any) => this.formatItem(item)),
    };
  }

  /** LawAmendmentItem JSON 파싱 포맷 / Format item with parsed JSON */
  private formatItem(item: any) {
    return {
      ...item,
      beforeData: this.safeParse(item.beforeData),
      afterData: this.safeParse(item.afterData),
    };
  }

  /** 안전한 JSON 파싱 / Safe JSON parse */
  private safeParse(str: string | null | undefined): any {
    if (!str) return null;
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  }
}
