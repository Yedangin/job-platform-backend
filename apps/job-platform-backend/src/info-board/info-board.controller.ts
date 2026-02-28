import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InfoBoardService } from './info-board.service';
import { CreateInfoBoardDto } from './dto/create-info-board.dto';
import { InfoBoardQueryDto } from './dto/info-board-query.dto';

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

  @Get()
  @ApiOperation({ summary: '게시판 목록 조회 / List info board posts' })
  findAll(@Query() query: InfoBoardQueryDto) {
    return this.infoBoardService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회 / Get info board post detail' })
  findOne(@Param('id') id: string) {
    return this.infoBoardService.findOne(parseInt(id, 10));
  }

  @Post()
  @ApiOperation({
    summary: '게시글 생성 (어드민) / Create info board post (admin)',
  })
  create(@Body() dto: CreateInfoBoardDto) {
    return this.infoBoardService.create(dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '게시글 삭제 (어드민) / Delete info board post (admin)',
  })
  remove(@Param('id') id: string) {
    return this.infoBoardService.remove(parseInt(id, 10));
  }
}
