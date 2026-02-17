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
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { Session } from 'libs/common/src';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@ApiTags('Resume / 이력서')
@Controller('resumes')
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
      topikLevel: topikLevel ? parseInt(topikLevel) : undefined,
      jobType,
      region,
      page: page ? parseInt(page) : 1,
    });
  }

  @Get(':resumeId/detail')
  @ApiOperation({
    summary: '인재 상세 열람 / View talent detail',
    description:
      '열람권 1건을 차감하고 상세 이력서를 반환합니다. 이미 열람한 이력서는 차감 없이 반환.',
  })
  @ApiParam({ name: 'resumeId', type: 'number' })
  @ApiResponse({ status: 200, description: '상세 이력서 / Full resume detail' })
  @ApiResponse({ status: 402, description: '열람권 부족 / Insufficient credits' })
  async viewDetail(
    @Session() sessionId: string,
    @Param('resumeId') resumeId: string,
  ) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.viewDetail(sessionId, parseInt(resumeId));
  }

  @Get(':resumeId/check-access')
  @ApiOperation({
    summary: '열람 가능 여부 확인 / Check viewing access',
    description:
      '해당 이력서를 이미 열람했는지, 열람권이 있는지 확인합니다.',
  })
  @ApiParam({ name: 'resumeId', type: 'number' })
  @ApiResponse({ status: 200, description: '접근 상태 / Access status' })
  async checkAccess(
    @Session() sessionId: string,
    @Param('resumeId') resumeId: string,
  ) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.checkAccess(sessionId, parseInt(resumeId));
  }

  // ──── 개인 CRUD / Personal CRUD ────

  @Post()
  @ApiOperation({
    summary: '이력서 생성 / Create resume',
    description: '현재 로그인 사용자의 이력서를 생성합니다. 1인당 1개만 가능합니다.',
  })
  @ApiBody({ type: CreateResumeDto })
  @ApiResponse({ status: 201, description: '이력서 생성 성공 / Resume created' })
  @ApiResponse({ status: 409, description: '이미 존재 / Already exists' })
  async create(
    @Session() sessionId: string,
    @Body() dto: CreateResumeDto,
  ) {
    if (!sessionId) throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.create(sessionId, dto);
  }

  @Get('me')
  @ApiOperation({
    summary: '내 이력서 조회 / Get my resume',
    description: '현재 로그인 사용자의 이력서를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '이력서 조회 성공 / Resume retrieved' })
  async getMyResume(@Session() sessionId: string) {
    if (!sessionId) throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.getMyResume(sessionId);
  }

  @Put('me')
  @ApiOperation({
    summary: '내 이력서 수정 / Update my resume',
    description: '현재 로그인 사용자의 이력서를 수정합니다. 변경할 필드만 전송하세요.',
  })
  @ApiBody({ type: UpdateResumeDto })
  @ApiResponse({ status: 200, description: '이력서 수정 성공 / Resume updated' })
  @ApiResponse({ status: 404, description: '이력서 없음 / Not found' })
  async update(
    @Session() sessionId: string,
    @Body() dto: UpdateResumeDto,
  ) {
    if (!sessionId) throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.update(sessionId, dto);
  }

  @Delete('me')
  @ApiOperation({
    summary: '내 이력서 삭제 / Delete my resume',
    description: '현재 로그인 사용자의 이력서를 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '이력서 삭제 성공 / Resume deleted' })
  @ApiResponse({ status: 404, description: '이력서 없음 / Not found' })
  async delete(@Session() sessionId: string) {
    if (!sessionId) throw new UnauthorizedException('로그인 필요 / Login required');
    return this.resumeService.delete(sessionId);
  }
}
