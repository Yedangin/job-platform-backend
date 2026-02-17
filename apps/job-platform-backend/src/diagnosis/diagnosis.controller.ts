import {
  Body,
  Controller,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { Session } from 'libs/common/src';
import { RedisService, SessionData } from 'libs/common/src';
import { DiagnosisEngineService } from './diagnosis-engine.service';
import { DiagnosisRequestDto, TrackClickDto } from './dto/diagnosis.dto';

/**
 * 비자 진단 엔진 컨트롤러 / Visa Diagnosis Engine Controller
 * 비회원도 진단 가능, 회원은 세션 기반 이력 저장
 * Guests can diagnose, members get history saved via session
 */
@ApiTags('Diagnosis')
@Controller('api/diagnosis')
export class DiagnosisController {
  constructor(
    private readonly diagnosisEngine: DiagnosisEngineService,
    private readonly redisService: RedisService,
  ) {}

  // ============================================================
  // 헬퍼 / Helpers
  // ============================================================

  /** 세션에서 userId 추출 (선택적) / Extract userId from session (optional) */
  private async getUserIdOptional(sessionId: string): Promise<string | undefined> {
    if (!sessionId) return undefined;
    try {
      const sd = await this.redisService.get(`session:${sessionId}`);
      if (!sd) return undefined;
      return JSON.parse(sd).userId;
    } catch {
      return undefined;
    }
  }

  /** 세션에서 userId 추출 (필수) / Extract userId from session (required) */
  private async requireAuth(sessionId: string): Promise<string> {
    if (!sessionId) throw new UnauthorizedException('세션 없음 / No session provided');
    const sd = await this.redisService.get(`session:${sessionId}`);
    if (!sd) throw new UnauthorizedException('잘못된 세션 / Invalid session');
    return JSON.parse(sd).userId;
  }

  // ============================================================
  // 1. POST /api/diagnosis — 진단 실행 / Run diagnosis
  // ============================================================

  @Post()
  @ApiOperation({
    summary: '비자 경로 진단 실행 / Run visa pathway diagnosis',
    description: '비회원도 사용 가능. anonymousId 헤더로 비회원 식별. Guests use X-Anonymous-Id header.',
  })
  async runDiagnosis(
    @Session() sessionId: string,
    @Headers('x-anonymous-id') anonymousId: string,
    @Body() dto: DiagnosisRequestDto,
  ) {
    const userId = await this.getUserIdOptional(sessionId);
    return await this.diagnosisEngine.diagnose(dto, userId, anonymousId);
  }

  // ============================================================
  // 2. GET /api/diagnosis/history — 진단 이력 / Diagnosis history
  // ============================================================

  @Get('history')
  @ApiOperation({ summary: '진단 이력 조회 (회원 전용) / Get diagnosis history (members only)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: '페이지 번호 / Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: '페이지 크기 / Page size' })
  async getHistory(
    @Session() sessionId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = await this.requireAuth(sessionId);
    const pageNum = Math.max(1, parseInt(page ?? '1', 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit ?? '10', 10) || 10));
    return await this.diagnosisEngine.getHistory(userId, pageNum, limitNum);
  }

  // ============================================================
  // 3. GET /api/diagnosis/:sessionId — 이전 진단 결과 조회
  // ============================================================

  @Get(':sessionId')
  @ApiOperation({ summary: '이전 진단 결과 조회 / Get previous diagnosis result' })
  @ApiParam({ name: 'sessionId', description: '진단 세션 ID / Diagnosis session ID', type: String })
  async getSession(
    @Session() sessionCookieId: string,
    @Headers('x-anonymous-id') anonymousId: string,
    @Param('sessionId') diagnosisSessionId: string,
  ) {
    const userId = await this.getUserIdOptional(sessionCookieId);
    const sessionIdBigint = BigInt(diagnosisSessionId);
    const session = await this.diagnosisEngine.getSession(sessionIdBigint, userId, anonymousId);
    if (!session) {
      throw new NotFoundException('진단 세션을 찾을 수 없습니다 / Diagnosis session not found');
    }
    return session;
  }

  // ============================================================
  // 4. POST /api/diagnosis/:sessionId/click — 클릭 추적
  // ============================================================

  @Post(':sessionId/click')
  @ApiOperation({ summary: '경로 클릭 추적 / Track pathway click' })
  @ApiParam({ name: 'sessionId', description: '진단 세션 ID / Diagnosis session ID', type: String })
  async trackClick(
    @Param('sessionId') diagnosisSessionId: string,
    @Body() dto: TrackClickDto,
  ) {
    const sessionIdBigint = BigInt(diagnosisSessionId);
    await this.diagnosisEngine.trackClick(
      sessionIdBigint,
      dto.pathwayId,
      dto.rankPosition,
      dto.actionType,
    );
    return { success: true };
  }
}
