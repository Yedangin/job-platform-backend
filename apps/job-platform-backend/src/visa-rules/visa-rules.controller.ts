import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Session } from 'libs/common/src';
import { VisaRulesService } from './visa-rules.service';
import { RuleEngineService, EvaluateVisaInput } from './rule-engine.service';
import { PointCalculatorService } from './evaluators/point-calculator.service';
import { AuthPrismaService, RedisService, SessionData } from 'libs/common/src';
import { VisaPolicyEvaluationService } from './visa-policy-evaluation.service';

@ApiTags('Visa Rules')
@Controller('visa-rules')
export class VisaRulesController {
  constructor(
    private readonly visaRulesService: VisaRulesService,
    private readonly ruleEngine: RuleEngineService,
    private readonly pointCalculator: PointCalculatorService,
    private readonly prisma: AuthPrismaService,
    private readonly redisService: RedisService,
    private readonly policyEvaluation: VisaPolicyEvaluationService,
  ) {}

  // --- 헬퍼: 세션에서 Admin 확인 ---
  private async requireAdmin(sessionId: string): Promise<string> {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    const sd = await this.redisService.get(`session:${sessionId}`);
    if (!sd) throw new UnauthorizedException('Invalid session');
    const session: SessionData = JSON.parse(sd);
    if (session.role !== 'ADMIN')
      throw new UnauthorizedException('Admin access required');
    return session.userId;
  }

  private async requireAuth(sessionId: string): Promise<string> {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    const sd = await this.redisService.get(`session:${sessionId}`);
    if (!sd) throw new UnauthorizedException('Invalid session');
    return JSON.parse(sd).userId;
  }

  // ==========================================
  // 비자 적격성 평가
  // ==========================================

  @Post('evaluate')
  @ApiOperation({ summary: 'Evaluate visa eligibility for a job posting' })
  async evaluate(
    @Session() sessionId: string,
    @Body() input: EvaluateVisaInput,
  ) {
    await this.requireAuth(sessionId);
    return this.policyEvaluation.evaluate(input);
  }

  @Post('test-evaluate')
  @ApiOperation({ summary: 'Test evaluation (admin sandbox, no log)' })
  async testEvaluate(
    @Session() sessionId: string,
    @Body() input: EvaluateVisaInput,
  ) {
    await this.requireAdmin(sessionId);
    return await this.ruleEngine.evaluateVisaEligibility(input, false);
  }

  // ==========================================
  // 비자 유형 관리
  // ==========================================

  @Get('visa-types')
  @ApiOperation({ summary: 'List all visa types' })
  async getVisaTypes(@Session() sessionId: string) {
    await this.requireAuth(sessionId);
    return await this.visaRulesService.getVisaTypes();
  }

  @Post('visa-types')
  @ApiOperation({ summary: 'Create visa type' })
  async createVisaType(
    @Session() sessionId: string,
    @Body()
    body: {
      code: string;
      nameKo: string;
      nameEn?: string;
      category: string;
      description?: string;
    },
  ) {
    await this.requireAdmin(sessionId);
    return await this.visaRulesService.createVisaType(body);
  }

  @Put('visa-types/:id')
  @ApiOperation({ summary: 'Update visa type' })
  async updateVisaType(
    @Session() sessionId: string,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    await this.requireAdmin(sessionId);
    return await this.visaRulesService.updateVisaType(id, body);
  }

  // ==========================================
  // 업종코드 관리
  // ==========================================

  @Get('industry-codes')
  @ApiOperation({ summary: 'List industry codes' })
  async getIndustryCodes(
    @Session() sessionId: string,
    @Query('sectionCode') sectionCode?: string,
    @Query('search') search?: string,
  ) {
    await this.requireAuth(sessionId);
    return await this.visaRulesService.getIndustryCodes(sectionCode, search);
  }

  @Post('industry-codes')
  @ApiOperation({ summary: 'Create industry code' })
  async createIndustryCode(
    @Session() sessionId: string,
    @Body()
    body: {
      ksicCode: string;
      sectionCode: string;
      nameKo: string;
      nameEn?: string;
      level?: number;
      parentCode?: string;
    },
  ) {
    await this.requireAdmin(sessionId);
    return await this.visaRulesService.createIndustryCode(body);
  }

  // ==========================================
  // 규칙 관리
  // ==========================================

  @Get('rules')
  @ApiOperation({ summary: 'List rules' })
  async getRules(
    @Session() sessionId: string,
    @Query('visaTypeCode') visaTypeCode?: string,
    @Query('status') status?: string,
    @Query('ruleType') ruleType?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    await this.requireAdmin(sessionId);
    return await this.visaRulesService.getRules({
      visaTypeCode,
      status,
      ruleType,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get('rules/:id')
  @ApiOperation({ summary: 'Get rule detail' })
  async getRule(@Session() sessionId: string, @Param('id') id: string) {
    await this.requireAdmin(sessionId);
    return await this.visaRulesService.getRuleById(id);
  }

  @Post('rules')
  @ApiOperation({ summary: 'Deprecated: use a policy release rule draft' })
  async createRule(@Session() sessionId: string, @Body() body: unknown) {
    await this.requireAdmin(sessionId);
    void body;
    throw new BadRequestException(
      '규칙은 정책 스튜디오의 DRAFT 릴리스 안에서만 생성할 수 있습니다.',
    );
  }

  @Put('rules/:id')
  @ApiOperation({ summary: 'Deprecated: create a new policy release version' })
  async updateRule(
    @Session() sessionId: string,
    @Param('id') id: string,
    @Body() body: unknown,
  ) {
    await this.requireAdmin(sessionId);
    void body;
    throw new BadRequestException(
      `규칙 ${id}은 직접 수정할 수 없습니다. 새 정책 릴리스 버전을 생성하세요.`,
    );
  }

  @Delete('rules/:id')
  @ApiOperation({ summary: 'Deactivate rule' })
  async deactivateRule(@Session() sessionId: string, @Param('id') id: string) {
    await this.requireAdmin(sessionId);
    throw new BadRequestException(
      `규칙 ${id}은 직접 비활성화할 수 없습니다. 정책 릴리스 또는 롤백 절차를 사용하세요.`,
    );
  }

  @Post('rules/:id/activate')
  @ApiOperation({ summary: 'Activate a DRAFT rule' })
  async activateRule(@Session() sessionId: string, @Param('id') id: string) {
    await this.requireAdmin(sessionId);
    throw new BadRequestException(
      `규칙 ${id}은 직접 활성화할 수 없습니다. 검토·승인된 정책 릴리스를 사용하세요.`,
    );
  }

  @Get('rules/:id/versions')
  @ApiOperation({ summary: 'Get rule version history' })
  async getRuleVersions(@Session() sessionId: string, @Param('id') id: string) {
    await this.requireAdmin(sessionId);
    return await this.visaRulesService.getRuleVersionHistory(id);
  }

  // ==========================================
  // 평가 로그
  // ==========================================

  @Get('evaluation-logs')
  @ApiOperation({ summary: 'List evaluation logs (admin)' })
  async getEvaluationLogs(
    @Session() sessionId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    await this.requireAdmin(sessionId);
    return await this.visaRulesService.getEvaluationLogs(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
    );
  }

  // ==========================================
  // 비자 상세 정보 (확장 API)
  // ==========================================

  @Get('visa-types/:code/details')
  @ApiOperation({
    summary: 'Get full visa type details with mappings, countries, documents',
  })
  async getVisaTypeDetails(
    @Session() sessionId: string,
    @Param('code') code: string,
  ) {
    await this.requireAuth(sessionId);
    const vt = await this.prisma.visaType.findUnique({
      where: { code },
      include: {
        countryRestrictions: { orderBy: { countryNameKo: 'asc' } },
        industryMappings: { include: { industryCode: true } },
        occupationMappings: { include: { occupationCode: true } },
        requiredDocuments: { orderBy: { sortOrder: 'asc' } },
        pointCategories: {
          include: { criteria: { orderBy: { sortOrder: 'asc' } } },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
    if (!vt) return { error: 'Visa type not found' };

    // 하위 유형도 포함
    const subTypes = await this.prisma.visaType.findMany({
      where: { parentCode: code, isActive: true },
      orderBy: { code: 'asc' },
    });

    return {
      ...vt,
      id: vt.id.toString(),
      subTypes: subTypes.map((s) => ({ ...s, id: s.id.toString() })),
    };
  }

  @Get('point-system/:visaCode')
  @ApiOperation({
    summary: 'Get point system categories and criteria for a visa',
  })
  async getPointSystem(
    @Session() sessionId: string,
    @Param('visaCode') visaCode: string,
  ) {
    await this.requireAuth(sessionId);
    const vt = await this.prisma.visaType.findUnique({
      where: { code: visaCode },
    });
    if (!vt) return { error: 'Visa type not found' };

    const categories = await this.prisma.pointSystemCategory.findMany({
      where: { visaTypeId: vt.id },
      include: { criteria: { orderBy: { sortOrder: 'asc' } } },
      orderBy: { sortOrder: 'asc' },
    });

    return {
      visaCode,
      visaName: vt.nameKo,
      totalMaxScore: categories.reduce((sum, c) => sum + c.maxScore, 0),
      requiredScore: 80,
      categories: categories.map((c) => ({
        ...c,
        id: c.id.toString(),
        visaTypeId: c.visaTypeId.toString(),
        criteria: c.criteria.map((cr) => ({
          ...cr,
          id: cr.id.toString(),
          categoryId: cr.categoryId.toString(),
        })),
      })),
    };
  }

  @Post('evaluate-individual')
  @ApiOperation({
    summary: 'Evaluate visa eligibility with individual-side data',
  })
  async evaluateIndividual(
    @Session() sessionId: string,
    @Body() input: EvaluateVisaInput,
  ) {
    await this.requireAuth(sessionId);
    return this.policyEvaluation.evaluate(input);
  }

  @Post('calculate-points')
  @ApiOperation({ summary: 'Calculate point system score for a specific visa' })
  async calculatePoints(
    @Session() sessionId: string,
    @Body() body: { visaCode: string; input: EvaluateVisaInput },
  ) {
    await this.requireAuth(sessionId);
    const vt = await this.prisma.visaType.findUnique({
      where: { code: body.visaCode },
    });
    if (!vt) return { error: 'Visa type not found' };
    return await this.pointCalculator.calculateScore(vt.id, body.input);
  }

  @Get('occupation-codes')
  @ApiOperation({ summary: 'List KSCO occupation codes' })
  async getOccupationCodes(
    @Session() sessionId: string,
    @Query('search') search?: string,
    @Query('level') level?: string,
    @Query('parentCode') parentCode?: string,
  ) {
    await this.requireAuth(sessionId);
    const where: any = { isActive: true };
    if (level) where.level = parseInt(level);
    if (parentCode) where.parentCode = parentCode;
    if (search) {
      where.OR = [
        { kscoCode: { contains: search } },
        { nameKo: { contains: search } },
        { nameEn: { contains: search, mode: 'insensitive' } },
      ];
    }
    const codes = await this.prisma.occupationCode.findMany({
      where,
      orderBy: { kscoCode: 'asc' },
      take: 200,
    });
    return codes.map((c) => ({ ...c, id: c.id.toString() }));
  }

  @Get('countries/:visaCode')
  @ApiOperation({ summary: 'Get country restrictions for a visa type' })
  async getCountryRestrictions(
    @Session() sessionId: string,
    @Param('visaCode') visaCode: string,
  ) {
    await this.requireAuth(sessionId);
    const vt = await this.prisma.visaType.findUnique({
      where: { code: visaCode },
    });
    if (!vt) return { error: 'Visa type not found' };
    const restrictions = await this.prisma.visaCountryRestriction.findMany({
      where: { visaTypeId: vt.id },
      orderBy: { countryNameKo: 'asc' },
    });
    return restrictions.map((r) => ({
      ...r,
      id: r.id.toString(),
      visaTypeId: r.visaTypeId.toString(),
    }));
  }
}
