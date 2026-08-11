import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CurrentSession,
  Public,
  Roles,
  RolesGuard,
  SessionAuthGuard,
  SessionData,
} from 'libs/common/src';
import { InfoBoardService } from './info-board.service';
import { CreateInfoBoardDto } from './dto/create-info-board.dto';
import { UpdateInfoBoardDto } from './dto/update-info-board.dto';
import { TranslateInfoBoardDto } from './dto/translate-info-board.dto';
import {
  ConfigureFeaturedInfoBoardDto,
  RemoveFeaturedInfoBoardDto,
  ReorderFeaturedInfoBoardDto,
} from './dto/featured-info-board.dto';
import {
  AdminInfoBoardQueryDto,
  FeaturedInfoBoardQueryDto,
  InfoBoardLocaleQueryDto,
  InfoBoardQueryDto,
} from './dto/info-board-query.dto';

/**
 * 정보 게시판 컨트롤러 — 외국인 생활 가이드
 * Info board controller — foreign worker life guide
 *
 * GET  /info-board         목록 (필터+검색+페이징) / List
 * GET  /info-board/:id     단건 조회 / Detail
 * POST /info-board         생성 (어드민) / Create (admin)
 * DELETE /info-board/:id   삭제 (어드민) / Delete (admin)
 */
@ApiTags('Info Board / 정보 게시판')
@Controller('info-board')
export class InfoBoardController {
  constructor(private readonly infoBoardService: InfoBoardService) {}

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Get('admin/featured/audit')
  @ApiOperation({ summary: '메인 슬라이더 변경 이력 / Slider audit log' })
  findFeaturedAudit() {
    return this.infoBoardService.findFeaturedAudit();
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Post('admin/translate')
  @ApiOperation({ summary: '게시글 초안 자동 번역 / Translate board draft' })
  translateDraft(@Body() dto: TranslateInfoBoardDto) {
    return this.infoBoardService.translateDraft(dto);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Get('admin/featured')
  @ApiOperation({ summary: '메인 슬라이더 관리 목록 / Admin slider list' })
  findAdminFeatured(@Query() query: InfoBoardLocaleQueryDto) {
    return this.infoBoardService.findAdminFeatured(query);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Put('admin/featured/order')
  @ApiOperation({ summary: '메인 슬라이더 순서 변경 / Reorder slider' })
  reorderFeatured(
    @Body() dto: ReorderFeaturedInfoBoardDto,
    @CurrentSession() session: SessionData,
  ) {
    return this.infoBoardService.reorderFeatured(dto, session.userId);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Post('admin/featured/:id/remove')
  @ApiOperation({ summary: '메인 슬라이더에서 내리기 / Remove from slider' })
  removeFeatured(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RemoveFeaturedInfoBoardDto,
    @CurrentSession() session: SessionData,
  ) {
    return this.infoBoardService.removeFeatured(
      id,
      dto.expectedVersion,
      session.userId,
    );
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Put('admin/featured/:id')
  @ApiOperation({ summary: '게시글과 전용 배너 연결 / Configure slider item' })
  configureFeatured(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ConfigureFeaturedInfoBoardDto,
    @CurrentSession() session: SessionData,
  ) {
    return this.infoBoardService.configureFeatured(id, dto, session.userId);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Get('admin/attachments/:id/content')
  @ApiOperation({ summary: '관리자 첨부 이미지 미리보기 / Admin attachment' })
  async getAdminAttachmentContent(@Param('id', ParseIntPipe) id: number) {
    const file = await this.infoBoardService.getAdminAttachment(id);
    return new StreamableFile(file.buffer, { type: file.mimeType });
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Get('admin/posts')
  @ApiOperation({ summary: '관리자 게시글 목록 / Admin post list' })
  findAdminAll(@Query() query: AdminInfoBoardQueryDto) {
    return this.infoBoardService.findAdminAll(query);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Get('admin/posts/:id')
  @ApiOperation({ summary: '관리자 게시글 상세 / Admin post detail' })
  findAdminOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: InfoBoardLocaleQueryDto,
  ) {
    return this.infoBoardService.findAdminOne(id, query);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('CORPORATE', 'ADMIN', 'SUPERADMIN')
  @Get('company/posts')
  @ApiOperation({ summary: '기업 대상 게시글 목록 / Company post list' })
  findCompanyAll(@Query() query: InfoBoardQueryDto) {
    return this.infoBoardService.findCompanyAll(query);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('CORPORATE', 'ADMIN', 'SUPERADMIN')
  @Get('company/posts/:id')
  @ApiOperation({ summary: '기업 대상 게시글 상세 / Company post detail' })
  findCompanyOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: InfoBoardLocaleQueryDto,
  ) {
    return this.infoBoardService.findCompanyOne(id, query);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('CORPORATE', 'ADMIN', 'SUPERADMIN')
  @Get('company/attachments/:id/content')
  @ApiOperation({ summary: '기업 대상 첨부파일 조회 / Company attachment' })
  async getCompanyAttachmentContent(@Param('id', ParseIntPipe) id: number) {
    const file = await this.infoBoardService.getCompanyAttachment(id);
    return new StreamableFile(file.buffer, { type: file.mimeType });
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('INDIVIDUAL', 'MEMBER', 'ADMIN', 'SUPERADMIN')
  @Get('worker/posts')
  @ApiOperation({ summary: '근로자 대상 게시글 목록 / Worker post list' })
  findWorkerAll(@Query() query: InfoBoardQueryDto) {
    return this.infoBoardService.findWorkerAll(query);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('INDIVIDUAL', 'MEMBER', 'ADMIN', 'SUPERADMIN')
  @Get('worker/posts/:id')
  @ApiOperation({ summary: '근로자 대상 게시글 상세 / Worker post detail' })
  findWorkerOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: InfoBoardLocaleQueryDto,
  ) {
    return this.infoBoardService.findWorkerOne(id, query);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('INDIVIDUAL', 'MEMBER', 'ADMIN', 'SUPERADMIN')
  @Get('worker/attachments/:id/content')
  @ApiOperation({ summary: '근로자 대상 첨부파일 조회 / Worker attachment' })
  async getWorkerAttachmentContent(@Param('id', ParseIntPipe) id: number) {
    const file = await this.infoBoardService.getWorkerAttachment(id);
    return new StreamableFile(file.buffer, { type: file.mimeType });
  }

  @Public()
  @Get('attachments/:id/content')
  @ApiOperation({
    summary: '게시된 글의 첨부파일 조회 / Public attachment content',
  })
  async getAttachmentContent(@Param('id', ParseIntPipe) id: number) {
    const file = await this.infoBoardService.getPublicAttachment(id);
    return new StreamableFile(file.buffer, { type: file.mimeType });
  }

  @Public()
  @Get('featured')
  @ApiOperation({ summary: '메인 슬라이더 공지 목록 / Featured notices' })
  findFeatured(@Query() query: FeaturedInfoBoardQueryDto) {
    return this.infoBoardService.findFeatured(query);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '게시판 목록 조회 / List info board posts' })
  findAll(@Query() query: InfoBoardQueryDto) {
    return this.infoBoardService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회 / Get info board post detail' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: InfoBoardLocaleQueryDto,
  ) {
    return this.infoBoardService.findOne(id, query);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Post('attachments')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024, files: 1 },
    }),
  )
  @ApiOperation({ summary: '게시판 첨부파일 업로드 / Upload board attachment' })
  uploadAttachment(
    @UploadedFile() file: Express.Multer.File,
    @CurrentSession() session: SessionData,
  ) {
    return this.infoBoardService.uploadAttachment(file, session.userId);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Delete('attachments/:id')
  @ApiOperation({ summary: '게시판 첨부파일 삭제 / Delete board attachment' })
  deleteAttachment(@Param('id', ParseIntPipe) id: number) {
    return this.infoBoardService.deleteAttachment(id);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Post()
  @ApiOperation({
    summary: '게시글 생성 (어드민) / Create info board post (admin)',
  })
  create(
    @Body() dto: CreateInfoBoardDto,
    @CurrentSession() session: SessionData,
  ) {
    return this.infoBoardService.create(dto, session.userId);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Put(':id')
  @ApiOperation({ summary: '게시글 수정 (어드민) / Update info board post' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInfoBoardDto,
    @CurrentSession() session: SessionData,
  ) {
    return this.infoBoardService.update(id, dto, session.userId);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Post(':id/restore')
  @ApiOperation({ summary: '삭제 게시글 복구 (어드민) / Restore deleted post' })
  restore(
    @Param('id', ParseIntPipe) id: number,
    @CurrentSession() session: SessionData,
  ) {
    return this.infoBoardService.restore(id, session.userId);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Delete(':id')
  @ApiOperation({
    summary: '게시글 삭제 (어드민) / Delete info board post (admin)',
  })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentSession() session: SessionData,
  ) {
    return this.infoBoardService.remove(id, session.userId);
  }
}
