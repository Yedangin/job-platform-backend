/**
 * 비자 인증 서비스 — OCR + 수동입력, 인증 상태 관리
 * Visa verification service — OCR + manual input, verification status management
 */
import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { AuthPrismaService, RedisService, SessionData } from 'libs/common/src';
import {
  CreateVisaVerificationDto,
  VerifyMethodInput,
} from './dto/create-visa-verification.dto';
import { Prisma } from '../../../../generated/prisma-user';
import * as Tesseract from 'tesseract.js';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class VisaVerificationService {
  private readonly logger = new Logger(VisaVerificationService.name);

  constructor(
    private readonly authPrisma: AuthPrismaService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * 세션에서 userId 추출
   * Extract userId from Redis session
   */
  private async getUserIdFromSession(sessionId: string): Promise<string> {
    const raw = await this.redisService.get(`session:${sessionId}`);
    if (!raw)
      throw new NotFoundException(
        '세션을 찾을 수 없습니다 / Session not found',
      );
    const session = JSON.parse(raw) as SessionData;
    if (!session.userId)
      throw new NotFoundException(
        '사용자 ID가 없습니다 / User ID not found',
      );
    return session.userId;
  }

  /**
   * 비자 인증 제출 (수동입력)
   * Submit visa verification (manual input)
   */
  async submitManual(sessionId: string, dto: CreateVisaVerificationDto) {
    const userId = await this.getUserIdFromSession(sessionId);

    // 기존 인증 확인 / Check existing
    const existing = await this.authPrisma.visaVerification.findUnique({
      where: { userId },
    });
    if (existing && existing.verificationStatus === 'VERIFIED') {
      throw new ConflictException(
        '이미 인증 완료된 비자가 있습니다 / Already verified',
      );
    }

    // 비자코드 유효성 확인 / Validate visa code
    const visaType = await this.authPrisma.visaType.findUnique({
      where: { code: dto.visaCode },
    });
    if (!visaType) {
      throw new BadRequestException(
        `유효하지 않은 비자 코드: ${dto.visaCode} / Invalid visa code: ${dto.visaCode}`,
      );
    }

    // upsert: 기존 있으면 업데이트, 없으면 생성
    // upsert: update if exists, create if not
    const verification = await this.authPrisma.visaVerification.upsert({
      where: { userId },
      update: {
        visaCode: dto.visaCode,
        visaSubType: dto.visaSubType ?? null,
        visaExpiryDate: new Date(dto.visaExpiryDate),
        foreignRegistrationNumber: dto.foreignRegistrationNumber ?? null,
        verificationMethod: dto.verificationMethod,
        verificationStatus: 'SUBMITTED',
        ocrExtractedData: Prisma.DbNull,
        ocrImagePath: null,
      },
      create: {
        userId,
        visaCode: dto.visaCode,
        visaSubType: dto.visaSubType ?? null,
        visaExpiryDate: new Date(dto.visaExpiryDate),
        foreignRegistrationNumber: dto.foreignRegistrationNumber ?? null,
        verificationMethod: dto.verificationMethod,
        verificationStatus: 'SUBMITTED',
      },
    });

    // IndividualProfile 비자정보 동기화
    // Sync visa info to IndividualProfile
    await this.syncVisaToProfile(userId, dto.visaCode, dto.visaExpiryDate);

    this.logger.log(
      `비자 인증 제출: userId=${userId}, visa=${dto.visaCode} / Visa verification submitted`,
    );
    return this.formatResponse(verification);
  }

  /**
   * 비자 인증 제출 (OCR — 외국인등록증 이미지)
   * Submit visa verification via OCR (ARC image)
   */
  async submitOcr(sessionId: string, file: Express.Multer.File) {
    const userId = await this.getUserIdFromSession(sessionId);

    if (!file) {
      throw new BadRequestException(
        '이미지 파일이 필요합니다 / Image file required',
      );
    }

    // OCR 실행 / Run OCR
    const absolutePath = path.resolve(file.path);
    this.logger.log(
      `OCR 시작: ${absolutePath} / OCR started: ${absolutePath}`,
    );

    let ocrResult: any;
    try {
      const result = await Tesseract.recognize(absolutePath, 'kor+eng', {
        tessedit_pageseg_mode: '6' as any,
      } as any);
      ocrResult = result.data;
    } catch (error) {
      this.logger.error(
        `OCR 실패: ${error.message} / OCR failed: ${error.message}`,
      );
      throw new BadRequestException(
        'OCR 처리 실패. 더 선명한 이미지를 업로드해주세요 / OCR failed. Please upload a clearer image.',
      );
    }

    // OCR 텍스트에서 비자 정보 추출
    // Extract visa info from OCR text
    const extracted = this.extractVisaInfoFromOcr(ocrResult.text);

    this.logger.log(
      `OCR 추출 결과: ${JSON.stringify(extracted)} / OCR extraction result`,
    );

    // 비자코드 확인 / Validate visa code if extracted
    let visaCode = extracted.visaCode ?? 'UNKNOWN';
    if (visaCode !== 'UNKNOWN') {
      const visaType = await this.authPrisma.visaType.findUnique({
        where: { code: visaCode },
      });
      if (!visaType) visaCode = 'UNKNOWN';
    }

    // upsert
    const verification = await this.authPrisma.visaVerification.upsert({
      where: { userId },
      update: {
        visaCode,
        visaSubType: extracted.visaSubType ?? null,
        visaExpiryDate: extracted.expiryDate
          ? new Date(extracted.expiryDate)
          : new Date('2099-12-31'),
        foreignRegistrationNumber: extracted.registrationNumber ?? null,
        verificationMethod: 'OCR',
        verificationStatus: 'SUBMITTED',
        ocrImagePath: file.path,
        ocrExtractedData: {
          rawText: ocrResult.text,
          confidence: ocrResult.confidence,
          extracted,
        },
      },
      create: {
        userId,
        visaCode,
        visaSubType: extracted.visaSubType ?? null,
        visaExpiryDate: extracted.expiryDate
          ? new Date(extracted.expiryDate)
          : new Date('2099-12-31'),
        foreignRegistrationNumber: extracted.registrationNumber ?? null,
        verificationMethod: 'OCR',
        verificationStatus: 'SUBMITTED',
        ocrImagePath: file.path,
        ocrExtractedData: {
          rawText: ocrResult.text,
          confidence: ocrResult.confidence,
          extracted,
        },
      },
    });

    // 프로필 동기화 (비자코드가 유효할 때만)
    // Sync to profile only when visa code is valid
    if (visaCode !== 'UNKNOWN' && extracted.expiryDate) {
      await this.syncVisaToProfile(userId, visaCode, extracted.expiryDate);
    }

    this.logger.log(
      `OCR 비자 인증 제출: userId=${userId} / OCR visa verification submitted`,
    );

    return {
      ...this.formatResponse(verification),
      ocrExtracted: extracted,
      ocrConfidence: ocrResult.confidence,
      needsManualReview:
        visaCode === 'UNKNOWN' || !extracted.expiryDate || ocrResult.confidence < 70,
    };
  }

  /**
   * 내 비자 인증 상태 조회
   * Get my visa verification status
   */
  async getMyVerification(sessionId: string) {
    const userId = await this.getUserIdFromSession(sessionId);

    const verification = await this.authPrisma.visaVerification.findUnique({
      where: { userId },
    });

    if (!verification) {
      return null;
    }

    return this.formatResponse(verification);
  }

  /**
   * OCR 텍스트에서 비자 정보 추출
   * Extract visa information from OCR text
   *
   * 외국인등록증(ARC) 포맷:
   * - 체류자격: E-7-1 or 체류자격 E-7
   * - 체류기간: YYYY.MM.DD ~ YYYY.MM.DD or YYYY-MM-DD
   * - 등록번호: XXXXXX-XXXXXXX (13자리)
   */
  private extractVisaInfoFromOcr(text: string): {
    visaCode: string | null;
    visaSubType: string | null;
    expiryDate: string | null;
    registrationNumber: string | null;
  } {
    const result = {
      visaCode: null as string | null,
      visaSubType: null as string | null,
      expiryDate: null as string | null,
      registrationNumber: null as string | null,
    };

    // 1. 비자코드 추출 / Extract visa code
    // 패턴: "체류자격" 근처에 E-7-1, D-2, F-4 등
    const visaPattern =
      /(?:체류자격|STATUS|Status|status)\s*[:\s]*([A-Z]-\d{1,2}(?:-\d{1,2})?)/i;
    const visaMatch = text.match(visaPattern);
    if (visaMatch) {
      const code = visaMatch[1].toUpperCase();
      // 하위유형 분리 / Separate sub-type
      const parts = code.split('-');
      if (parts.length >= 2) {
        result.visaCode = `${parts[0]}-${parts[1]}`;
      }
      if (parts.length >= 3) {
        result.visaSubType = code;
      }
    }

    // 2. 만료일 추출 / Extract expiry date
    // 패턴: YYYY.MM.DD 또는 YYYY-MM-DD (마지막 날짜를 만료일로)
    const datePattern = /(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/g;
    const dates: string[] = [];
    let dateMatch: RegExpExecArray | null;
    while ((dateMatch = datePattern.exec(text)) !== null) {
      const y = parseInt(dateMatch[1]);
      const m = parseInt(dateMatch[2]);
      const d = parseInt(dateMatch[3]);
      if (y >= 2020 && y <= 2040 && m >= 1 && m <= 12 && d >= 1 && d <= 31) {
        dates.push(
          `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
        );
      }
    }
    // 가장 늦은 날짜 = 만료일 / Latest date = expiry
    if (dates.length > 0) {
      dates.sort();
      result.expiryDate = dates[dates.length - 1];
    }

    // 3. 외국인등록번호 추출 / Extract foreign registration number
    // 패턴: 6자리-7자리
    const regNumPattern = /(\d{6})\s*[-]\s*(\d{7})/;
    const regMatch = text.match(regNumPattern);
    if (regMatch) {
      result.registrationNumber = `${regMatch[1]}-${regMatch[2]}`;
    }

    return result;
  }

  /**
   * IndividualProfile에 비자 정보 동기화
   * Sync visa info to IndividualProfile
   */
  private async syncVisaToProfile(
    userId: string,
    visaCode: string,
    expiryDate: string,
  ) {
    try {
      await this.authPrisma.individualProfile.updateMany({
        where: { authId: userId },
        data: {
          visaType: visaCode,
          visaExpiryDate: new Date(expiryDate),
        },
      });
    } catch (error) {
      // 프로필이 없을 수 있음 — 무시
      // Profile may not exist — ignore
      this.logger.warn(
        `프로필 비자 동기화 실패 (무시 가능): ${error.message} / Profile visa sync failed (ignorable)`,
      );
    }
  }

  /**
   * 응답 포맷
   * Format response (BigInt → number)
   */
  private formatResponse(v: any) {
    return {
      id: Number(v.id),
      userId: v.userId,
      visaCode: v.visaCode,
      visaSubType: v.visaSubType,
      visaExpiryDate: v.visaExpiryDate,
      foreignRegistrationNumber: v.foreignRegistrationNumber,
      verificationMethod: v.verificationMethod,
      verificationStatus: v.verificationStatus,
      verifiedAt: v.verifiedAt,
      rejectionReason: v.rejectionReason,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
    };
  }
}
