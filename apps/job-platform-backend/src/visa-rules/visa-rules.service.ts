import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Optional,
} from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';
import { RuleEngineService } from './rule-engine.service';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class VisaRulesService {
  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly ruleEngine: RuleEngineService,
    @Optional() private readonly loggingService?: LoggingService,
  ) {}

  // ==========================================
  // 비자 유형 CRUD
  // ==========================================

  async getVisaTypes() {
    const types = await this.prisma.visaType.findMany({
      orderBy: { code: 'asc' },
    });
    return types.map((t) => ({
      id: t.id.toString(),
      code: t.code,
      nameKo: t.nameKo,
      nameEn: t.nameEn,
      category: t.category,
      description: t.description,
      isActive: t.isActive,
      createdAt: t.createdAt.toISOString(),
    }));
  }

  async createVisaType(data: {
    code: string;
    nameKo: string;
    nameEn?: string;
    category: string;
    description?: string;
  }) {
    const existing = await this.prisma.visaType.findUnique({
      where: { code: data.code },
    });
    if (existing)
      throw new BadRequestException(
        `비자 코드 '${data.code}'가 이미 존재합니다.`,
      );

    const vt = await this.prisma.visaType.create({ data });
    return { success: true, id: vt.id.toString() };
  }

  async updateVisaType(
    id: string,
    data: Partial<{
      nameKo: string;
      nameEn: string;
      category: string;
      description: string;
      isActive: boolean;
    }>,
  ) {
    await this.prisma.visaType.update({
      where: { id: BigInt(id) },
      data,
    });
    return { success: true };
  }

  // ==========================================
  // 업종코드 CRUD
  // ==========================================

  async getIndustryCodes(sectionCode?: string, search?: string) {
    const where: any = {};
    if (sectionCode) where.sectionCode = sectionCode;
    if (search) {
      where.OR = [
        { ksicCode: { contains: search } },
        { nameKo: { contains: search, mode: 'insensitive' } },
      ];
    }

    const codes = await this.prisma.industryCode.findMany({
      where,
      orderBy: { ksicCode: 'asc' },
      take: 200,
    });

    return codes.map((c) => ({
      id: c.id.toString(),
      ksicCode: c.ksicCode,
      sectionCode: c.sectionCode,
      nameKo: c.nameKo,
      nameEn: c.nameEn,
      level: c.level,
      parentCode: c.parentCode,
      isActive: c.isActive,
    }));
  }

  async createIndustryCode(data: {
    ksicCode: string;
    sectionCode: string;
    nameKo: string;
    nameEn?: string;
    level?: number;
    parentCode?: string;
  }) {
    const existing = await this.prisma.industryCode.findUnique({
      where: { ksicCode: data.ksicCode },
    });
    if (existing)
      throw new BadRequestException(
        `업종코드 '${data.ksicCode}'가 이미 존재합니다.`,
      );

    const ic = await this.prisma.industryCode.create({ data });
    return { success: true, id: ic.id.toString() };
  }

  // ==========================================
  // 규칙 CRUD + 버전관리
  // ==========================================

  async getRules(filters: {
    visaTypeCode?: string;
    status?: string;
    ruleType?: string;
    page?: number;
    limit?: number;
  }) {
    const { visaTypeCode, status, ruleType, page = 1, limit = 20 } = filters;

    const where: any = {};
    if (status) where.status = status;
    if (ruleType) where.ruleType = ruleType;
    if (visaTypeCode) {
      const vt = await this.prisma.visaType.findUnique({
        where: { code: visaTypeCode },
      });
      if (vt) where.visaTypeId = vt.id;
    }

    const [rules, total] = await Promise.all([
      this.prisma.visaRule.findMany({
        where,
        include: { visaType: { select: { code: true, nameKo: true } } },
        orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.visaRule.count({ where }),
    ]);

    return {
      data: rules.map((r) => ({
        id: r.id.toString(),
        visaTypeCode: r.visaType.code,
        visaTypeNameKo: r.visaType.nameKo,
        ruleName: r.ruleName,
        ruleDescription: r.ruleDescription,
        priority: r.priority,
        ruleType: r.ruleType,
        conditions: r.conditions,
        actions: r.actions,
        version: r.version,
        status: r.status,
        effectiveFrom: r.effectiveFrom.toISOString(),
        effectiveTo: r.effectiveTo?.toISOString() || null,
        createdBy: r.createdBy,
        createdAt: r.createdAt.toISOString(),
      })),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async getRuleById(id: string) {
    const rule = await this.prisma.visaRule.findUnique({
      where: { id: BigInt(id) },
      include: { visaType: { select: { code: true, nameKo: true } } },
    });
    if (!rule) throw new NotFoundException('규칙을 찾을 수 없습니다.');

    return {
      id: rule.id.toString(),
      visaTypeCode: rule.visaType.code,
      visaTypeNameKo: rule.visaType.nameKo,
      ruleName: rule.ruleName,
      ruleDescription: rule.ruleDescription,
      priority: rule.priority,
      ruleType: rule.ruleType,
      conditions: rule.conditions,
      actions: rule.actions,
      version: rule.version,
      parentRuleId: rule.parentRuleId?.toString() || null,
      status: rule.status,
      effectiveFrom: rule.effectiveFrom.toISOString(),
      effectiveTo: rule.effectiveTo?.toISOString() || null,
      createdBy: rule.createdBy,
      updatedBy: rule.updatedBy,
      createdAt: rule.createdAt.toISOString(),
    };
  }

  async createRule(
    data: {
      visaTypeCode: string;
      ruleName: string;
      ruleDescription?: string;
      priority?: number;
      ruleType?: string;
      conditions: string;
      actions: string;
      status?: string;
      effectiveFrom: string;
      effectiveTo?: string;
    },
    adminId: string,
  ) {
    // 조건/액션 JSON 유효성 검증
    this.validateJson(data.conditions, '조건(conditions)');
    this.validateJson(data.actions, '액션(actions)');

    const visaType = await this.prisma.visaType.findUnique({
      where: { code: data.visaTypeCode },
    });
    if (!visaType)
      throw new NotFoundException(
        `비자 유형 '${data.visaTypeCode}'를 찾을 수 없습니다.`,
      );

    const rule = await this.prisma.visaRule.create({
      data: {
        visaTypeId: visaType.id,
        ruleName: data.ruleName,
        ruleDescription: data.ruleDescription,
        priority: data.priority || 100,
        ruleType: (data.ruleType as any) || 'ELIGIBILITY',
        conditions: data.conditions,
        actions: data.actions,
        status: (data.status as any) || 'ACTIVE',
        effectiveFrom: new Date(data.effectiveFrom),
        effectiveTo: data.effectiveTo ? new Date(data.effectiveTo) : null,
        createdBy: adminId,
      },
    });

    // 캐시 무효화
    await this.ruleEngine.invalidateCache();

    // 변경 로그 기록 / Change log
    this.loggingService?.logChange({
      adminId,
      tableName: 'visa_rules',
      recordId: rule.id.toString(),
      action: 'CREATE',
      after: JSON.stringify({
        ruleName: data.ruleName,
        visaTypeCode: data.visaTypeCode,
        conditions: data.conditions,
        actions: data.actions,
      }),
    });

    return { success: true, id: rule.id.toString() };
  }

  async updateRule(
    id: string,
    data: {
      ruleName?: string;
      ruleDescription?: string;
      priority?: number;
      ruleType?: string;
      conditions?: string;
      actions?: string;
      effectiveFrom?: string;
      effectiveTo?: string;
    },
    adminId: string,
  ) {
    const existing = await this.prisma.visaRule.findUnique({
      where: { id: BigInt(id) },
    });
    if (!existing) throw new NotFoundException('규칙을 찾을 수 없습니다.');

    if (data.conditions) this.validateJson(data.conditions, '조건(conditions)');
    if (data.actions) this.validateJson(data.actions, '액션(actions)');

    // 기존 규칙을 ARCHIVED로 변경
    await this.prisma.visaRule.update({
      where: { id: BigInt(id) },
      data: { status: 'ARCHIVED' },
    });

    // 새 버전 생성
    const newRule = await this.prisma.visaRule.create({
      data: {
        visaTypeId: existing.visaTypeId,
        ruleName: data.ruleName || existing.ruleName,
        ruleDescription:
          data.ruleDescription !== undefined
            ? data.ruleDescription
            : existing.ruleDescription,
        priority: data.priority ?? existing.priority,
        ruleType: (data.ruleType as any) || existing.ruleType,
        conditions: data.conditions || existing.conditions,
        actions: data.actions || existing.actions,
        version: existing.version + 1,
        parentRuleId: existing.id,
        status: 'ACTIVE',
        effectiveFrom: data.effectiveFrom
          ? new Date(data.effectiveFrom)
          : existing.effectiveFrom,
        effectiveTo: data.effectiveTo
          ? new Date(data.effectiveTo)
          : existing.effectiveTo,
        createdBy: existing.createdBy,
        updatedBy: adminId,
      },
    });

    await this.ruleEngine.invalidateCache();

    // 변경 로그 기록 / Change log
    this.loggingService?.logChange({
      adminId,
      tableName: 'visa_rules',
      recordId: newRule.id.toString(),
      action: 'UPDATE',
      before: JSON.stringify({
        id: existing.id.toString(),
        version: existing.version,
        conditions: existing.conditions,
        actions: existing.actions,
      }),
      after: JSON.stringify({
        id: newRule.id.toString(),
        version: newRule.version,
        conditions: data.conditions || existing.conditions,
        actions: data.actions || existing.actions,
      }),
    });

    return {
      success: true,
      id: newRule.id.toString(),
      version: newRule.version,
    };
  }

  async deactivateRule(id: string, adminId: string) {
    const rule = await this.prisma.visaRule.findUnique({
      where: { id: BigInt(id) },
    });
    if (!rule) throw new NotFoundException('규칙을 찾을 수 없습니다.');

    await this.prisma.visaRule.update({
      where: { id: BigInt(id) },
      data: { status: 'INACTIVE', updatedBy: adminId },
    });

    await this.ruleEngine.invalidateCache();

    // 변경 로그 기록 / Change log
    this.loggingService?.logChange({
      adminId,
      tableName: 'visa_rules',
      recordId: id,
      action: 'DELETE',
      before: JSON.stringify({
        ruleName: rule.ruleName,
        status: rule.status,
      }),
      after: JSON.stringify({ status: 'INACTIVE' }),
    });

    return { success: true };
  }

  async activateDraftRule(id: string, adminId: string) {
    const rule = await this.prisma.visaRule.findUnique({
      where: { id: BigInt(id) },
    });
    if (!rule) throw new NotFoundException('규칙을 찾을 수 없습니다.');
    if (rule.status !== 'DRAFT')
      throw new BadRequestException(
        'DRAFT 상태의 규칙만 활성화할 수 있습니다.',
      );

    await this.prisma.visaRule.update({
      where: { id: BigInt(id) },
      data: { status: 'ACTIVE', updatedBy: adminId },
    });

    await this.ruleEngine.invalidateCache();
    return { success: true };
  }

  async getRuleVersionHistory(ruleId: string) {
    // 현재 규칙과 모든 이전 버전 추적
    const rule = await this.prisma.visaRule.findUnique({
      where: { id: BigInt(ruleId) },
    });
    if (!rule) throw new NotFoundException('규칙을 찾을 수 없습니다.');

    // 같은 visaType + ruleName의 모든 버전 조회
    const versions = await this.prisma.visaRule.findMany({
      where: {
        visaTypeId: rule.visaTypeId,
        ruleName: rule.ruleName,
      },
      orderBy: { version: 'desc' },
    });

    return versions.map((v) => ({
      id: v.id.toString(),
      version: v.version,
      status: v.status,
      priority: v.priority,
      effectiveFrom: v.effectiveFrom.toISOString(),
      effectiveTo: v.effectiveTo?.toISOString() || null,
      createdBy: v.createdBy,
      updatedBy: v.updatedBy,
      createdAt: v.createdAt.toISOString(),
    }));
  }

  // --- 평가 로그 ---
  async getEvaluationLogs(page = 1, limit = 20) {
    const [logs, total] = await Promise.all([
      this.prisma.visaEvaluationLog.findMany({
        orderBy: { evaluatedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.visaEvaluationLog.count(),
    ]);

    return {
      data: logs.map((l) => ({
        id: l.id.toString(),
        corporateId: l.corporateId?.toString() || null,
        requestData: l.requestData,
        eligibleVisas: l.eligibleVisas,
        blockedVisas: l.blockedVisas,
        appliedRuleIds: l.appliedRuleIds,
        evaluatedAt: l.evaluatedAt.toISOString(),
        durationMs: l.durationMs,
      })),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  // --- 헬퍼 ---
  private validateJson(jsonStr: string, label: string) {
    try {
      JSON.parse(jsonStr);
    } catch {
      throw new BadRequestException(`${label} JSON 형식이 올바르지 않습니다.`);
    }
  }
}
