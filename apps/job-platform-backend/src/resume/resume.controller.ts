/**
 * 이력서 컨트롤러 — CRUD + 검색/열람 엔드포인트
 * Resume controller — CRUD + search/view endpoints
 */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { Session, SessionAuthGuard } from 'libs/common/src';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { UpdateScoutVisibilityDto } from './dto/update-scout-visibility.dto';

function parsePage(value?: string): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function parseTopikLevel(value?: string): number | undefined {
  if (value === undefined || value === '') return undefined;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 && parsed <= 6
    ? parsed
    : undefined;
}

@ApiTags('Resume / 이력서')
@Controller('resumes')
@UseGuards(SessionAuthGuard)
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  // ──── 인재 검색 (기업용) / Talent search (for corporate) ────

  @Get('search')
  @ApiOperation({
    summary: '인재 검색 / Search talent resumes',
    description:
      '완성된 이력서를 검색합니다. 기본정보(국적, 비자, 경력)만 노출. 연락처/상세는 열람권 필요.',
  })
  @ApiQuery({ name: 'nationality', required: false })
  @ApiQuery({ name: 'topikLevel', required: false })
  @ApiQuery({ name: 'jobType', required: false })
  @ApiQuery({ name: 'region', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiResponse({ status: 200, description: '인재 목록 / Talent list' })
  async search(
    @Session() sessionId: string,
    @Query('nationality') nationality?: string,
    @Query('topikLevel') topikLevel?: string,
    @Query('jobType') jobType?: string,
    @Query('region') region?: string,
    @Query('page') page?: string,
  ) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.search(sessionId, {
      nationality,
      topikLevel: parseTopikLevel(topikLevel),
      jobType,
      region,
      page: parsePage(page),
    });
  }

  @Get('viewed')
  @ApiOperation({
    summary: '최근 열람 인재 / Recently viewed talents',
    description: '현재도 공개 동의가 활성화된 열람 이력만 반환합니다.',
  })
  @ApiQuery({ name: 'page', required: false })
  async getViewed(
    @Session() sessionId: string,
    @Query('page') page?: string,
  ) {
    if (!sessionId)
      throw new UnauthorizedException('로그인이 필요 / Login required');
    return this.resumeService.getViewed(
      sessionId,
      parsePage(page),
    );
  }

  @Get(':resumeId/detail')
  @ApiOperation({
    summary: '인재 상세 열람 / View talent detail',
    description:
      '열람권 1건을 차감하고 상세 이력서를 반환합니다. 이미 열람한 이력서는 차감 없이 반환.',
  })
  @ApiParam({ name: 'resumeId', type: 'number' })
  @ApiResponse({ status: 200, description: '상세 이력서 / Full resume detail' })
  @ApiResponse({
    status: 402,
    description: '열람권 부족 / Insufficient credits',
  })
  async viewDetail(
    @Session() sessionId: string,
    @Param('resumeId', ParseIntPipe) resumeId: number,
  ) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.viewDetail(sessionId, resumeId);
  }

  @Get(':resumeId/check-access')
  @ApiOperation({
    summary: '열람 가능 여부 확인 / Check viewing access',
    description: '해당 이력서를 이미 열람했는지, 열람권이 있는지 확인합니다.',
  })
  @ApiParam({ name: 'resumeId', type: 'number' })
  @ApiResponse({ status: 200, description: '접근 상태 / Access status' })
  async checkAccess(
    @Session() sessionId: string,
    @Param('resumeId', ParseIntPipe) resumeId: number,
  ) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.checkAccess(sessionId, resumeId);
  }

  // ──── 북마크 / Bookmark ────

  @Get('bookmarks')
  @ApiOperation({
    summary: '북마크 인재 목록 / Bookmarked talents',
    description: '기업회원이 북마크한 인재 목록을 조회합니다.',
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiResponse({
    status: 200,
    description: '북마크 인재 목록 / Bookmarked talent list',
  })
  async getBookmarks(
    @Session() sessionId: string,
    @Query('page') page?: string,
  ) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.getBookmarks(
      sessionId,
      parsePage(page),
    );
  }

  @Get('bookmarks/ids')
  @ApiOperation({
    summary: '북마크된 이력서 ID 목록 / Bookmarked resume IDs',
    description: '검색 결과에서 북마크 상태 표시에 사용합니다.',
  })
  @ApiResponse({ status: 200, description: '북마크 ID 목록 / Bookmarked IDs' })
  async getBookmarkedIds(@Session() sessionId: string) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    const ids = await this.resumeService.getBookmarkedIds(sessionId);
    return { ids };
  }

  @Post(':resumeId/bookmark')
  @ApiOperation({
    summary: '인재 북마크 추가 / Add talent bookmark',
    description: '관심 인재를 북마크에 추가합니다.',
  })
  @ApiParam({ name: 'resumeId', type: 'number' })
  @ApiResponse({
    status: 201,
    description: '북마크 추가 성공 / Bookmark added',
  })
  async addBookmark(
    @Session() sessionId: string,
    @Param('resumeId', ParseIntPipe) resumeId: number,
  ) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.addBookmark(sessionId, resumeId);
  }

  @Delete(':resumeId/bookmark')
  @ApiOperation({
    summary: '인재 북마크 제거 / Remove talent bookmark',
    description: '북마크에서 인재를 제거합니다.',
  })
  @ApiParam({ name: 'resumeId', type: 'number' })
  @ApiResponse({
    status: 200,
    description: '북마크 제거 성공 / Bookmark removed',
  })
  async removeBookmark(
    @Session() sessionId: string,
    @Param('resumeId', ParseIntPipe) resumeId: number,
  ) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.removeBookmark(sessionId, resumeId);
  }

  @Get(':resumeId/is-bookmarked')
  @ApiOperation({
    summary: '북마크 여부 확인 / Check bookmark status',
    description: '특정 인재가 북마크되어 있는지 확인합니다.',
  })
  @ApiParam({ name: 'resumeId', type: 'number' })
  @ApiResponse({ status: 200, description: '북마크 상태 / Bookmark status' })
  async isBookmarked(
    @Session() sessionId: string,
    @Param('resumeId', ParseIntPipe) resumeId: number,
  ) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.isBookmarked(sessionId, resumeId);
  }

  // ──── 개인 CRUD / Personal CRUD ────

  @Post()
  @ApiOperation({
    summary: '이력서 생성 / Create resume',
    description:
      '현재 로그인 사용자의 이력서를 생성합니다. 1인당 1개만 가능합니다.',
  })
  @ApiBody({ type: CreateResumeDto })
  @ApiResponse({
    status: 201,
    description: '이력서 생성 성공 / Resume created',
  })
  @ApiResponse({ status: 409, description: '이미 존재 / Already exists' })
  async create(@Session() sessionId: string, @Body() dto: CreateResumeDto) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.create(sessionId, dto);
  }

  @Get('me')
  @ApiOperation({
    summary: '내 이력서 조회 / Get my resume',
    description: '현재 로그인 사용자의 이력서를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '이력서 조회 성공 / Resume retrieved',
  })
  async getMyResume(@Session() sessionId: string) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.getMyResume(sessionId);
  }

  @Get('me/scout-visibility')
  @ApiOperation({
    summary: '인재채용관 공개 상태 / Get talent-pool visibility',
  })
  async getScoutVisibility(@Session() sessionId: string) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.getScoutVisibility(sessionId);
  }

  @Put('me/scout-visibility')
  @ApiOperation({
    summary: '인재채용관 공개 동의 변경 / Update talent-pool visibility',
  })
  async updateScoutVisibility(
    @Session() sessionId: string,
    @Body() dto: UpdateScoutVisibilityDto,
  ) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.updateScoutVisibility(sessionId, dto);
  }

  @Put('me')
  @ApiOperation({
    summary: '내 이력서 수정 / Update my resume',
    description:
      '현재 로그인 사용자의 이력서를 수정합니다. 변경할 필드만 전송하세요.',
  })
  @ApiBody({ type: UpdateResumeDto })
  @ApiResponse({
    status: 200,
    description: '이력서 수정 성공 / Resume updated',
  })
  @ApiResponse({ status: 404, description: '이력서 없음 / Not found' })
  async update(@Session() sessionId: string, @Body() dto: UpdateResumeDto) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.update(sessionId, dto);
  }

  @Delete('me')
  @ApiOperation({
    summary: '내 이력서 삭제 / Delete my resume',
    description: '현재 로그인 사용자의 이력서를 삭제합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '이력서 삭제 성공 / Resume deleted',
  })
  @ApiResponse({ status: 404, description: '이력서 없음 / Not found' })
  async delete(@Session() sessionId: string) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.delete(sessionId);
  }
}
