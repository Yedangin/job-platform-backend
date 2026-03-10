import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Request,
  Res,
  UnauthorizedException,
  UploadedFile,
  Logger,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { Response } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

// ✅ 로컬 서비스(요리사)를 직접 가져옵니다.
import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { VerifyPasswordDto } from './dto/verify-password.dto';
import { CreateSupportTicketDto } from './dto/support-ticket.dto';
import { AnswerTicketDto } from './dto/answer-ticket.dto';
import { CorporateActionDto } from './dto/corporate-action.dto';
import { UpdateNotificationSettingsDto } from './dto/notification-settings.dto';
import {
  GoogleOAuthGuard,
  SessionAuthGuard,
  RolesGuard,
  Roles,
  Facebook0AuthGuard,
  KakaoAuthGuard,
  Apple0AuthGuard,
  Session,
  SkipCsrf,
} from 'libs/common/src';
import { SocialProvider } from 'types/auth/auth';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  // ✅ [변경 1] 복잡한 ClientGrpc 대신 AuthService를 직접 주입받습니다.
  constructor(private readonly authService: AuthService) {}

  // ❌ [삭제됨] onModuleInit: 8001번 포트와 연결하는 과정이 필요 없습니다.
  // ❌ [삭제됨] grpcToHttpStatus: gRPC 에러를 변환할 필요가 없습니다. (NestJS 기본 에러 사용)

  @Get()
  @UseGuards(SessionAuthGuard)
  getHello(): string {
    return 'Auth System is running (Monolith Mode)';
  }

  @Get('admin')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Admin only endpoint (example)' })
  @ApiResponse({
    status: 200,
    description: 'Access granted for admin users.',
  })
  getAdminData(): string {
    return 'This is admin-only data';
  }

  // --- 관리자 통계 API / Admin statistics API ---
  @Get('admin/stats')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Get admin dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Admin stats retrieved.' })
  async getAdminStats() {
    return await this.authService.getAdminStats();
  }

  // --- 1. 회원가입 ---
  @Post('register')
  @ApiOperation({ summary: 'Register a new account' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully.',
  })
  // 인증 엔드포인트 강화 제한: 1분 5회 / Stricter rate limit for auth endpoint: 5 per minute
  @Throttle({
    short: { ttl: 60000, limit: 5 },
    medium: { ttl: 300000, limit: 10 },
  })
  async register(@Body() registerDto: RegisterDto) {
    // ✅ [변경 2] firstValueFrom 없이 바로 함수를 호출합니다.
    return await this.authService.register(registerDto);
  }

  // --- 2. OTP 발송 ---
  @Post('send-otp')
  @ApiOperation({ summary: 'Send verification OTP to email' })
  @ApiBody({ schema: { example: { email: 'user@example.com' } } })
  @ApiResponse({ status: 200, description: 'OTP sent successfully.' })
  // 인증 엔드포인트 강화 제한: 1분 3회 / Stricter rate limit for auth endpoint: 3 per minute
  @Throttle({
    short: { ttl: 60000, limit: 3 },
    medium: { ttl: 300000, limit: 10 },
  })
  async sendOtp(@Body() { email }: SendOtpDto) {
    // ✅ 외부 서버 호출 X -> 내부 함수 실행 O
    return await this.authService.sendOtp(email);
  }

  // --- 3. OTP 검증 ---
  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP code' })
  @ApiBody({
    schema: { example: { email: 'user@example.com', code: '123456' } },
  })
  @ApiResponse({ status: 200, description: 'OTP verified successfully.' })
  // 인증 엔드포인트 강화 제한: 1분 5회 / Stricter rate limit for auth endpoint: 5 per minute
  @Throttle({
    short: { ttl: 60000, limit: 5 },
    medium: { ttl: 300000, limit: 15 },
  })
  async verifyOtp(@Body() body: VerifyOtpDto) {
    return await this.authService.verifyOtp(body.email, body.code);
  }

  // --- 4. 로그인 ---
  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful. Session cookie set.',
  })
  // 인증 엔드포인트 강화 제한: 1분 5회 / Stricter rate limit for auth endpoint: 5 per minute
  @Throttle({
    short: { ttl: 60000, limit: 5 },
    medium: { ttl: 300000, limit: 15 },
  })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // ✅ try-catch를 제거해도 됩니다. (서비스에서 에러를 던지면 NestJS가 알아서 처리함)
    const result = await this.authService.login(loginDto);

    const sessionId = String(result.sessionId);

    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24시간 / 24 hours (Redis 세션 TTL과 일치 / Match Redis session TTL)
      path: '/',
    });

    Logger.log('[Login] 쿠키 설정 완료:', {
      sessionId: sessionId.substring(0, 20) + '...',
      httpOnly: true,
      secure: isProduction,
    });

    return result;
  }

  // --- 5. 프로필 조회 ---
  // rate limit 제외: F5 새로고침 시 429로 인해 로그인 상태 깜빡임 방지
  // Skip throttle: prevents 429 causing auth state flickering on F5 refresh
  @SkipThrottle({ short: true, medium: true })
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
  })
  async getProfile(@Session() sessionId: string, @Request() req: any) {
    Logger.log('[getProfile] === 프로필 조회 요청 ===');
    Logger.log(
      '[getProfile] cookies.sessionId:',
      req.cookies?.sessionId ? 'EXISTS' : 'NONE',
    );
    Logger.log(
      '[getProfile] Authorization header:',
      req.headers?.authorization
        ? req.headers.authorization.substring(0, 30) + '...'
        : 'NONE',
    );
    Logger.log(
      '[getProfile] Extracted sessionId:',
      sessionId ? sessionId.substring(0, 30) + '...' : 'NULL',
    );

    if (!sessionId) {
      Logger.log('[getProfile] FAIL: sessionId가 null/undefined');
      throw new UnauthorizedException('No session provided');
    }
    return await this.authService.getProfile(sessionId);
  }

  // --- 6. 로그아웃 ---
  @Post('logout')
  @ApiOperation({ summary: 'Logout current user' })
  @ApiResponse({
    status: 200,
    description: 'Logout successful. Session cookie cleared.',
  })
  async logout(
    @Session() sessionId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.logout(sessionId);

    res.clearCookie('sessionId', {
      path: '/',
    });

    return result;
  }

  // --- 6-2. 활성 세션 목록 조회 / Get active sessions ---
  @Get('sessions')
  @ApiOperation({ summary: 'Get list of active sessions for current user' })
  @ApiResponse({ status: 200, description: 'Active sessions retrieved.' })
  async getActiveSessions(@Session() sessionId: string) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.authService.getActiveSessions(sessionId);
  }

  // --- 6-3. 특정 세션 강제 종료 / Terminate specific session ---
  @Post('sessions/:targetSessionId/terminate')
  @ApiOperation({ summary: 'Terminate a specific session (not current)' })
  @ApiResponse({ status: 200, description: 'Session terminated.' })
  async terminateSession(
    @Session() sessionId: string,
    @Param('targetSessionId') targetSessionId: string,
  ) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.authService.terminateSession(sessionId, targetSessionId);
  }

  // --- 7. 비밀번호 초기화 ---
  @Post('request-password-reset')
  @ApiOperation({ summary: 'Request password reset email' })
  @ApiBody({ type: RequestPasswordResetDto })
  // 인증 엔드포인트 강화 제한: 1분 3회 / Stricter rate limit for auth endpoint: 3 per minute
  @Throttle({
    short: { ttl: 60000, limit: 3 },
    medium: { ttl: 300000, limit: 5 },
  })
  async requestPasswordReset(@Body() { email }: RequestPasswordResetDto) {
    return await this.authService.requestPasswordReset(email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiBody({ type: ResetPasswordDto })
  // 인증 엔드포인트 강화 제한: 1분 3회 / Stricter rate limit for auth endpoint: 3 per minute
  @Throttle({
    short: { ttl: 60000, limit: 3 },
    medium: { ttl: 300000, limit: 5 },
  })
  async resetPassword(@Body() { token, newPassword }: ResetPasswordDto) {
    return await this.authService.resetPassword(token, newPassword);
  }

  // --- 8. 비밀번호 변경 (이메일 계정만) ---
  @Post('change-password')
  @ApiOperation({ summary: 'Change password (email accounts only)' })
  @ApiBody({
    schema: { example: { oldPassword: 'current', newPassword: 'new123' } },
  })
  // 인증 엔드포인트 강화 제한: 1분 3회 / Stricter rate limit for auth endpoint: 3 per minute
  @Throttle({
    short: { ttl: 60000, limit: 3 },
    medium: { ttl: 300000, limit: 5 },
  })
  async changePassword(
    @Session() sessionId: string,
    @Body() body: ChangePasswordDto,
  ) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.authService.changePassword(
      sessionId,
      body.oldPassword,
      body.newPassword,
    );
  }

  // --- 9. 프로필 상세 조회 ---
  @Get('my/profile-detail')
  @ApiOperation({ summary: 'Get detailed profile info' })
  async getProfileDetail(@Session() sessionId: string) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.authService.getProfileDetail(sessionId);
  }

  // --- 9-2. 내 프로필 업데이트 (이름 변경, 프로필 이미지 URL) ---
  // Update my profile (name, profile image URL)
  @Put('my/update-profile')
  @ApiOperation({ summary: 'Update my profile (name, profile image URL)' })
  @ApiBody({
    schema: {
      example: { fullName: '홍길동', profileImageUrl: 'https://...' },
    },
  })
  async updateMyProfile(
    @Session() sessionId: string,
    @Body() body: UpdateProfileDto,
  ) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.authService.updateMyProfile(sessionId, body);
  }

  // --- 10. 회원탈퇴 ---
  @Post('delete-account')
  @ApiOperation({ summary: 'Request account deletion (soft delete, 90 days)' })
  async deleteAccount(@Session() sessionId: string) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.authService.requestAccountDeletion(sessionId);
  }

  // --- 11. 알림 설정 조회 ---
  @Get('my/notification-settings')
  @ApiOperation({ summary: 'Get notification settings' })
  async getNotificationSettings(@Session() sessionId: string) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.authService.getNotificationSettings(sessionId);
  }

  // --- 12. 알림 설정 변경 / Update notification settings ---
  @Put('my/notification-settings')
  @ApiOperation({
    summary: 'Update notification settings (SMS, email, kakao, marketing)',
  })
  @ApiBody({
    schema: {
      example: { sms: true, email: true, kakao: false, marketing: false },
    },
  })
  async updateNotificationSettings(
    @Session() sessionId: string,
    @Body()
    body: UpdateNotificationSettingsDto,
  ) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.authService.updateNotificationSettings(
      sessionId,
      body.sms,
      body.email,
      body.kakao,
      body.marketing,
    );
  }

  // --- 12-b. 비밀번호 확인 (보안 재인증) / Verify current password ---
  @Post('verify-password')
  @ApiOperation({
    summary: 'Verify current password for security re-authentication',
  })
  @ApiBody({ schema: { example: { password: 'currentPassword123' } } })
  // 인증 엔드포인트 강화 제한: 1분 5회 / Stricter rate limit for auth endpoint: 5 per minute
  @Throttle({
    short: { ttl: 60000, limit: 5 },
    medium: { ttl: 300000, limit: 10 },
  })
  async verifyPassword(
    @Session() sessionId: string,
    @Body() body: VerifyPasswordDto,
  ) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.authService.verifyPassword(sessionId, body.password);
  }

  // --- 13. 고객센터 문의 작성 ---
  @Post('support-ticket')
  @ApiOperation({ summary: 'Create a support ticket' })
  @ApiBody({
    schema: { example: { title: '문의 제목', content: '문의 내용' } },
  })
  async createSupportTicket(
    @Session() sessionId: string,
    @Body() body: CreateSupportTicketDto,
  ) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.authService.createSupportTicket(
      sessionId,
      body.title,
      body.content,
    );
  }

  // --- 14. 내 문의 목록 ---
  @Get('my/support-tickets')
  @ApiOperation({ summary: 'Get my support tickets' })
  async getMySupportTickets(@Session() sessionId: string) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.authService.getMySupportTickets(sessionId);
  }

  // --- 15. Admin: 모든 문의 조회 / Admin: Get all support tickets ---
  @Get('admin/support-tickets')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Get all support tickets (admin)' })
  async getAllSupportTickets() {
    return await this.authService.getAllSupportTickets();
  }

  // --- 16. Admin: 문의 답변 / Admin: Answer support ticket ---
  @Put('admin/support-tickets/:id')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Answer a support ticket (admin)' })
  @ApiBody({ schema: { example: { answer: '답변 내용' } } })
  async answerSupportTicket(
    @Param('id') id: string,
    @Body() body: AnswerTicketDto,
  ) {
    return await this.authService.answerSupportTicket(id, body.answer);
  }

  // --- 17. Admin: 활동 로그 조회 / Admin: Get activity logs ---
  @Get('admin/activity-logs')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Get activity logs (admin, sortable/filterable)' })
  async getActivityLogs(
    @Query('actionType') actionType?: string,
    @Query('userName') userName?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sortField') sortField?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ) {
    return await this.authService.getActivityLogs({
      actionType,
      userName,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
      sortField: sortField || 'createdAt',
      sortOrder: sortOrder || 'desc',
    });
  }

  // --- 18. 사업자등록번호 진위확인 + 휴폐업 상태조회 ---
  // 인증 필수 (비인증 사용자의 무분별한 조회 방지)
  // Auth required (prevent unauthenticated mass lookups)
  @Post('verify-business-number')
  @ApiOperation({
    summary:
      'Verify business registration number (authenticity + status) via NTS API',
  })
  @ApiBody({
    schema: {
      example: {
        bizRegNumber: '1234567890',
        ceoName: '홍길동',
        companyName: '테스트기업',
        openDate: '20200101',
      },
    },
  })
  async verifyBusinessNumber(
    @Session() sessionId: string,
    @Body()
    body: {
      bizRegNumber: string;
      ceoName: string;
      companyName: string;
      openDate: string;
    },
  ) {
    if (!sessionId) {
      throw new UnauthorizedException(
        '인증이 필요합니다 / Authentication required',
      );
    }
    await this.authService.getProfile(sessionId);
    return await this.authService.verifyBusinessNumber(body);
  }

  // --- 18-2. 기업 서류 파일 업로드 (사업자등록증 / 재직증명서) ---
  @Post('upload-corporate-doc')
  @ApiOperation({ summary: 'Upload corporate document (bizReg or empCert)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req: any, file, cb) => {
          const docType = req.body?.docType || 'unknown';
          const userId = 'temp'; // 실제 userId는 서비스에서 처리
          const uploadPath = path.join(
            process.cwd(),
            'uploads',
            'corporate-docs',
            docType,
          );
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          // multer가 originalname을 latin1로 디코딩하므로 UTF-8로 재변환
          const decodedName = Buffer.from(file.originalname, 'latin1').toString(
            'utf8',
          );
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
        const allowedMimes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              '허용되지 않는 파일 형식입니다. JPG, PNG, PDF만 업로드 가능합니다.',
            ),
            false,
          );
        }
      },
    }),
  )
  async uploadCorporateDoc(
    @Session() sessionId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { docType: 'bizReg' | 'empCert' },
  ) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    if (!file) throw new BadRequestException('파일을 선택해주세요.');
    if (!body.docType || !['bizReg', 'empCert'].includes(body.docType)) {
      throw new BadRequestException(
        'docType은 bizReg 또는 empCert여야 합니다.',
      );
    }
    return await this.authService.uploadCorporateDoc(
      sessionId,
      file,
      body.docType,
    );
  }

  // --- 19. 기업 인증 상태 조회 ---
  // rate limit 제외: F5 새로고침 시 429로 인해 로그인 상태 깜빡임 방지
  // Skip throttle: prevents 429 causing auth state flickering on F5 refresh
  @SkipThrottle({ short: true, medium: true })
  @Get('corporate-verify')
  @ApiOperation({ summary: 'Get corporate verification status' })
  async getCorporateVerifyStatus(@Session() sessionId: string) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.authService.getCorporateVerificationStatus(sessionId);
  }

  // --- 19. 기업 인증 정보 제출 ---
  @Put('corporate-verify')
  @ApiOperation({ summary: 'Submit corporate verification data' })
  async submitCorporateVerify(
    @Session() sessionId: string,
    @Request() req: any,
    @Body()
    body: {
      bizRegNumber: string;
      companyNameOfficial: string;
      ceoName: string;
      managerName: string;
      managerPhone: string;
      ksicCode?: string;
      addressRoad?: string;
      companySizeType?: string;
      proofDocumentUrl?: string;
      bizRegDocPath?: string;
      bizRegDocOrigName?: string;
      empCertDocPath?: string;
      empCertDocOrigName?: string;
      isCeoSelf?: boolean;
    },
  ) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    // IP 주소 추출 (대표자 본인 선언 법적 근거용)
    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip;
    return await this.authService.submitCorporateVerification(
      sessionId,
      body,
      clientIp,
    );
  }

  // --- 19-2. Admin: 전체 회원 목록 조회 / Admin: Get all users list ---
  @Get('admin/users')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Get all users with profiles (admin)' })
  async getAdminUsers(
    @Query('type') type?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
  ) {
    return await this.authService.getAdminUsers({
      type,
      search,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
      sortBy,
      sortOrder,
    });
  }

  // --- 19-3. Admin: 기업 서류 파일 조회 / Admin: Serve corporate document file ---
  @Get('admin/corporate-doc-file')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Serve corporate document file (admin only)' })
  async getCorporateDocFile(
    @Query('path') filePath: string,
    @Res() res: Response,
  ) {
    // 보안: path traversal 방지 / Security: prevent path traversal
    if (!filePath || filePath.includes('..')) {
      throw new BadRequestException('잘못된 파일 경로입니다.');
    }
    const normalizedPath = filePath.replace(/\\/g, '/');
    if (!normalizedPath.startsWith('uploads/corporate-docs/')) {
      throw new BadRequestException('접근할 수 없는 경로입니다.');
    }

    const absolutePath = path.join(process.cwd(), normalizedPath);
    if (!fs.existsSync(absolutePath)) {
      throw new NotFoundException('파일을 찾을 수 없습니다.');
    }

    // Content-Type 판별 / Determine Content-Type
    const ext = path.extname(absolutePath).toLowerCase();
    const mimeMap: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.pdf': 'application/pdf',
    };
    const contentType = mimeMap[ext] || 'application/octet-stream';

    res.setHeader('Content-Type', contentType);
    const fileStream = fs.createReadStream(absolutePath);
    fileStream.pipe(res);
  }

  // --- 20. Admin: 기업 인증 목록 조회 / Admin: Get corporate verification list ---
  @Get('admin/corporate-verifications')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Get corporate verification list (admin)' })
  async getCorporateVerifications(@Query('status') status?: string) {
    return await this.authService.getCorporateVerifications(status);
  }

  // --- 21. Admin: 기업 인증 승인/거절 ---
  @Put('admin/corporate-verifications/:userId')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Approve or reject corporate verification (admin)' })
  @ApiBody({
    schema: {
      example: { action: 'APPROVE', reason: '거절 사유 (거절 시 필수)' },
    },
  })
  async updateCorporateVerification(
    @Session() sessionId: string,
    @Param('userId') userId: string,
    @Body() body: CorporateActionDto,
  ) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.authService.updateCorporateVerification(
      sessionId,
      userId,
      body.action,
      body.reason,
      body.rejectionDetails,
    );
  }

  // --- 22. Admin: 회원 상세 조회 (이력서+비자인증 포함) ---
  // --- 22. Admin: Get user detail with resume + visa verification ---
  @Get('admin/users/:userId')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({
    summary: 'Get user detail with resume and visa verification (admin)',
  })
  async getAdminUserDetail(@Param('userId') userId: string) {
    return await this.authService.getAdminUserDetail(userId);
  }

  // --- 23. Admin: 비자인증 승인/거절 ---
  // --- 23. Admin: Approve or reject visa verification ---
  @Put('admin/visa-verification/:id')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Approve or reject visa verification (admin)' })
  @ApiBody({
    schema: {
      example: {
        action: 'VERIFIED',
        rejectionReason: '거절 사유 (거절 시 필수)',
      },
    },
  })
  async updateVisaVerification(
    @Session() sessionId: string,
    @Param('id') id: string,
    @Body() body: { action: 'VERIFIED' | 'REJECTED'; rejectionReason?: string },
  ) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.authService.updateVisaVerification(
      sessionId,
      id,
      body.action,
      body.rejectionReason,
    );
  }

  // ==========================================
  // [소셜 로그인] 중복 코드를 제거하고 버그를 수정했습니다.
  // ==========================================

  // --- Google ---
  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: 'Google OAuth callback' })
  async googleAuthRedirect(
    @Request() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.handleSocialLogin(req, res, SocialProvider.GOOGLE);
  }

  // --- Facebook ---
  @Get('facebook')
  @UseGuards(Facebook0AuthGuard)
  @ApiOperation({ summary: 'Initiate Facebook OAuth login' })
  async facebookAuth() {}

  @Get('facebook/callback')
  @UseGuards(Facebook0AuthGuard)
  @ApiOperation({ summary: 'Facebook OAuth callback' })
  async facebookAuthRedirect(
    @Request() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    // 🚨 기존 코드 버그 수정: provider가 GOOGLE로 되어 있던 것을 FACEBOOK으로 변경
    return this.handleSocialLogin(req, res, SocialProvider.FACEBOOK);
  }

  // --- Kakao ---
  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  @ApiOperation({ summary: 'Initiate Kakao OAuth login' })
  async kakaoAuth() {}

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  @ApiOperation({ summary: 'Kakao OAuth callback' })
  async kakaoOAuthRedirect(
    @Request() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    // 🚨 기존 코드 버그 수정: provider가 GOOGLE로 되어 있던 것을 KAKAO로 변경
    return this.handleSocialLogin(req, res, SocialProvider.KAKAO);
  }

  // --- Apple ---
  @Get('apple')
  @UseGuards(Apple0AuthGuard)
  @ApiOperation({ summary: 'Initiate Apple OAuth Login' })
  async appleAuth() {}

  @Get('apple/callback')
  @UseGuards(Apple0AuthGuard)
  @ApiOperation({ summary: 'Apple OAuth callback' })
  async AppleOAuthRedirect(
    @Request() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    // 🚨 기존 코드 버그 수정: provider가 GOOGLE로 되어 있던 것을 APPLE로 변경
    return this.handleSocialLogin(req, res, SocialProvider.APPLE);
  }

  /**
   * ✅ 소셜 로그인 공통 처리 함수 (Private Helper)
   * 기존에 4번 반복되던 코드를 하나로 통합했습니다.
   */
  private async handleSocialLogin(
    req: any,
    res: Response,
    provider: SocialProvider,
  ) {
    try {
      // pending_user_type 쿠키에서 요청된 회원 유형 읽기
      const cookieUserType = req.cookies?.pending_user_type || null;
      // 쿼리 파라미터 fallback (프록시 경유 시)
      const queryUserType = req.query?.userType || null;
      const requestedUserType = cookieUserType || queryUserType || null;
      Logger.log('[소셜 로그인 콜백]', {
        provider,
        cookieUserType,
        queryUserType,
        requestedUserType,
        allCookies: JSON.stringify(req.cookies),
        email: req.user?.email,
        providerId: req.user?.providerId,
      });

      const user = {
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        picture: req.user.picture,
        provider: provider,
        providerId: req.user.providerId,
      };

      // AuthService 직접 호출 (requestedUserType 전달)
      const result = await this.authService.findOrCreateOAuthUser(
        user,
        requestedUserType,
      );

      Logger.log('[소셜 로그인 성공]', {
        sessionId: result.sessionId,
        message: result.message,
      });

      const isProduction = process.env.NODE_ENV === 'production';
      res.cookie('sessionId', result.sessionId, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24시간 / 24 hours (Redis 세션 TTL과 일치 / Match Redis session TTL)
        path: '/',
      });

      // pending_user_type 쿠키 삭제 / Clear pending_user_type cookie
      res.clearCookie('pending_user_type', { path: '/' });

      // 앱에서 호출 시 딥링크로 리다이렉트 / Redirect to deep link when called from app
      const pendingPlatform = req.cookies?.pending_platform || null;
      if (pendingPlatform === 'app') {
        res.clearCookie('pending_platform', { path: '/' });
        Logger.log(
          '[소셜 로그인] 앱 딥링크 리다이렉트 / App deep link redirect',
          {
            sessionId: result.sessionId,
          },
        );
        return res.redirect(
          `jobchaja://auth/callback?sessionId=${result.sessionId}`,
        );
      }

      // 웹: 메인 페이지로 리다이렉트 (쿠키 기반, URL에 sessionId 노출 금지)
      // Web: Redirect to main page (cookie-based, never expose sessionId in URL)
      const baseUrl = process.env.CLIENT_URL || 'http://localhost:3000';

      // 프론트엔드에서 읽을 수 있도록 짧은 수명의 세션 초기화 쿠키 설정
      // Set short-lived session init cookie readable by frontend JS
      res.cookie('session_init', result.sessionId, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        maxAge: 60 * 1000, // 1분 후 자동 만료 / Expires in 1 minute
        path: '/',
      });

      // pending_platform 쿠키 삭제 (웹일 때도 정리) / Clear pending_platform cookie
      res.clearCookie('pending_platform', { path: '/' });

      return res.redirect(baseUrl);
    } catch (error) {
      Logger.error('[소셜 로그인 에러 / Social login error]', {
        provider,
        email: req.user?.email,
        error: error.message,
      });
      throw error;
    }
  }

  // --- GDPR: 내 데이터 내보내기 (Article 20 - Data Portability) ---
  @Get('my-data')
  @UseGuards(SessionAuthGuard)
  @ApiOperation({
    summary: 'Export all personal data as JSON (GDPR Article 20)',
  })
  async exportMyData(@Session() sessionId: string) {
    return await this.authService.exportMyData(sessionId);
  }
}
