import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
  Session,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

// ✅ 로컬 서비스(요리사)를 직접 가져옵니다.
import { AuthService } from './auth,service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import {
  GoogleOAuthGuard,
  SessionAuthGuard,
  RolesGuard,
  Roles,
  Facebook0AuthGuard,
  KakaoAuthGuard,
  Apple0AuthGuard,
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

  // --- 1. 회원가입 ---
  @Post('register')
  @ApiOperation({ summary: 'Register a new account' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully.',
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
  async sendOtp(@Body() { email }: { email: string }) {
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
  async verifyOtp(@Body() body: { email: string; code: string }) {
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
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // ✅ try-catch를 제거해도 됩니다. (서비스에서 에러를 던지면 NestJS가 알아서 처리함)
    const result = await this.authService.login(loginDto);

    const sessionId = String(result.sessionId);

    // 쿠키 설정은 기존 그대로 유지
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 60 * 60 * 1000,
      domain: process.env.COOKIE_DOMAIN || 'localhost',
    });

    return result;
  }

  // --- 5. 프로필 조회 ---
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
  })
  async getProfile(@Session() sessionId: string) {
    if (!sessionId) {
      throw new UnauthorizedException('Invalid or expired session');
    }
    // ✅ 객체 { sessionId: ... } 포장 없이 ID값만 깔끔하게 전달
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
      domain: process.env.COOKIE_DOMAIN || 'localhost',
    });

    return result;
  }

  // --- 7. 비밀번호 초기화 ---
  @Post('request-password-reset')
  @ApiOperation({ summary: 'Request password reset email' })
  @ApiBody({ type: RequestPasswordResetDto })
  async requestPasswordReset(@Body() { email }: RequestPasswordResetDto) {
    return await this.authService.requestPasswordReset(email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() { token, newPassword }: ResetPasswordDto) {
    return await this.authService.resetPassword(token, newPassword);
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
    const user = {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      picture: req.user.picture,
      provider: provider,
      providerId: req.user.providerId,
    };

    // AuthService 직접 호출
    const result = await this.authService.findOrCreateOAuthUser(user);

    // 쿠키 설정
    res.cookie('sessionId', result.sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 60 * 60 * 1000,
      domain: process.env.COOKIE_DOMAIN || 'localhost',
    });

    // 메인 페이지로 리다이렉트
    return res.redirect('http://jobchaja.com');
  }
}