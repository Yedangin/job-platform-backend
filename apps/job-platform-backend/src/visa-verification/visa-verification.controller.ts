/**
 * 비자 인증 컨트롤러 — OCR + 수동입력 엔드포인트
 * Visa verification controller — OCR + manual input endpoints
 */
import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { Session } from 'libs/common/src';
import { VisaVerificationService } from './visa-verification.service';
import { CreateVisaVerificationDto } from './dto/create-visa-verification.dto';
import * as path from 'path';
import * as fs from 'fs';

@ApiTags('Visa Verification / 비자 인증')
@Controller('visa-verification')
export class VisaVerificationController {
  constructor(
    private readonly visaVerificationService: VisaVerificationService,
  ) {}

  @Post()
  @ApiOperation({
    summary: '비자 인증 제출 (수동입력) / Submit visa verification (manual)',
    description:
      '비자 정보를 수동으로 입력하여 인증을 제출합니다. / Submit visa verification with manual input.',
  })
  @ApiBody({ type: CreateVisaVerificationDto })
  @ApiResponse({ status: 201, description: '제출 성공 / Submitted' })
  @ApiResponse({ status: 400, description: '입력값 오류 / Invalid input' })
  @ApiResponse({ status: 409, description: '이미 인증 완료 / Already verified' })
  async submitManual(
    @Session() sessionId: string,
    @Body() dto: CreateVisaVerificationDto,
  ) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.visaVerificationService.submitManual(sessionId, dto);
  }

  @Post('ocr')
  @ApiOperation({
    summary: '비자 인증 제출 (OCR) / Submit via ARC image OCR',
    description:
      '외국인등록증 이미지를 업로드하여 OCR로 비자 정보를 추출합니다. / Upload ARC image for OCR extraction.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: '외국인등록증 이미지 / ARC image (JPG, PNG, PDF)',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'OCR 처리 완료 / OCR processed' })
  @ApiResponse({ status: 400, description: '파일 없음/OCR 실패 / No file or OCR failed' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.join(
            process.cwd(),
            'uploads',
            'visa-verification',
          );
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const decodedName = Buffer.from(
            file.originalname,
            'latin1',
          ).toString('utf8');
          const timestamp = Date.now();
          const ext = path.extname(decodedName);
          const safeName = decodedName
            .replace(ext, '')
            .replace(/[^a-zA-Z0-9가-힣_-]/g, '_')
            .substring(0, 50);
          cb(null, `${timestamp}_${safeName}${ext}`);
        },
      }),
      limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
      fileFilter: (req, file, cb) => {
        const allowedMimes = [
          'image/jpeg',
          'image/png',
          'image/webp',
          'application/pdf',
        ];
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              '허용되지 않는 파일 형식입니다. JPG, PNG, PDF만 가능합니다 / Only JPG, PNG, PDF allowed',
            ),
            false,
          );
        }
      },
    }),
  )
  async submitOcr(
    @Session() sessionId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.visaVerificationService.submitOcr(sessionId, file);
  }

  @Get('me')
  @ApiOperation({
    summary: '내 비자 인증 상태 조회 / Get my visa verification status',
    description:
      '현재 로그인 사용자의 비자 인증 상태를 조회합니다. / Get visa verification status for current user.',
  })
  @ApiResponse({ status: 200, description: '조회 성공 / Retrieved' })
  async getMyVerification(@Session() sessionId: string) {
    if (!sessionId)
      throw new UnauthorizedException('로그인 필요 / Login required');
    return this.visaVerificationService.getMyVerification(sessionId);
  }
}
