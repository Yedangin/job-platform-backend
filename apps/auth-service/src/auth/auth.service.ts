import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  RegisterRequest,
  LoginRequest,
  UserResponse,
  LoginSuccessResponse,
  User,
  UserRole,
  UserStatus,
  RegisterSuccessResponse,
  PasswordResetResponse,
  SocialProvider as ProtoSocialProvider,
} from 'types/auth/auth';
import { AuthPrismaService, RedisService, SessionData } from 'libs/common/src';
import {
  SocialProvider as PrismaSocialProvider,
  User as PrismaUser,
  UserType,
} from 'generated/prisma-user';
import { GenerateStoreToken } from 'libs/common/src/common/helper/generate-store-token';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { getEmailVerificationTemplate } from 'libs/common/src/mail/templates/email-verification.template';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private sesClient: SESClient;

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly generateToken: GenerateStoreToken,
    private readonly redisService: RedisService,
  ) {
    this.sesClient = new SESClient({
      region: process.env.AWS_REGION || 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
      },
    });
  }

  async sendOtp(email: string) {
    const limitKey = `otp_limit:${email}`; // 1분 제한용 키
    const dailyKey = `otp_daily:${email}`; // 하루 제한용 키

    // 1. 1분 이내 재발송 요청 확인
    const isLocked = await this.redisService.get(limitKey);
    if (isLocked) {
      throw new RpcException({
        code: 3, // INVALID_ARGUMENT (또는 상황에 맞는 gRPC 상태 코드)
        message: '너무 자주 요청하셨습니다. 1분 후에 다시 시도해주세요.',
      });
    }

    // 2. 하루 최대 발송 횟수 확인 (10회)
    const dailyCount = (await this.redisService.get(dailyKey)) || 0;
    if (Number(dailyCount) >= 10) {
      throw new RpcException({
        code: 8, // RESOURCE_EXHAUSTED
        message: '오늘 하루 인증 요청 횟수(10회)를 모두 초과했습니다.',
      });
    }

    // 3. OTP 생성 및 발송 로직
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const command = new SendEmailCommand({
      Source: process.env.MAIL_FROM,
      Destination: { ToAddresses: [email] },
      Message: {
        Subject: {
          Data: '[JobChaja] 이메일 인증번호 안내',
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: this.getEmailHtmlTemplate(otp),
            Charset: 'UTF-8',
          },
        },
      },
    });

    try {
      // SES 메일 발송
      await this.sesClient.send(command);

      // 4. Redis 데이터 업데이트 (데이터를 모두 문자열로 변환하여 저장)
      // OTP 본문 저장
      await this.redisService.set(`otp:${email}`, otp, 180);

      // 1분 제한 설정
      await this.redisService.set(limitKey, 'locked', 60);

      // 🔴 숫자(nextCount)를 문자열로 변환하여 저장 (중요)
      const nextCount = Number(dailyCount) + 1;
      await this.redisService.set(dailyKey, String(nextCount), 86400);

      return { success: true, message: '인증번호가 발송되었습니다.' };
    } catch (error) {
      // Redis 에러인지 SES 에러인지 명확히 로그 남기기
      console.error('발송 로직 에러 상세:', error);
      throw new RpcException({
        code: 13,
        message: '인증번호 처리 중 오류가 발생했습니다.',
      });
    }
  }
  private getEmailHtmlTemplate(otp: string): string {
    return `
    <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px; border: 1px solid #eee; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #007bff; margin: 0; font-size: 28px;">JobChaja</h2>
      </div>
      <div style="background-color: #f9f9f9; padding: 30px; border-radius: 8px; text-align: center;">
        <p style="font-size: 16px; color: #555; margin-bottom: 20px;">안녕하세요. 외국인 구인구직 플랫폼 <b>JobChaja</b>입니다.</p>
        <p style="font-size: 14px; color: #777;">서비스 이용을 위해 아래 인증번호를 입력해 주세요.</p>
        <div style="margin: 30px 0; padding: 20px; background-color: #fff; border: 2px solid #007bff; border-radius: 8px; font-size: 36px; font-weight: bold; color: #007bff; letter-spacing: 8px;">
          ${otp}
        </div>
        <p style="font-size: 13px; color: #999;">이 인증번호는 <b>3분</b> 동안 유효합니다.</p>
      </div>
      <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #bbb;">
        <p>본 메일은 발신전용입니다. 궁금하신 점은 고객센터로 문의해 주세요.</p>
        <p>© 2026 JobChaja. All rights reserved.</p>
      </div>
    </div>
    `;
  }
  // [신규] 2. 인증번호 검증
  async verifyOtp(email: string, code: string) {
    const savedOtp = await this.redisService.get(`otp:${email}`);
    if (!savedOtp || savedOtp !== code) {
      throw new BadRequestException('인증번호가 틀렸거나 만료되었습니다.');
    }
    // 검증 성공 시 10분짜리 '인증 티켓' 발행
    await this.redisService.set(`verified_ticket:${email}`, 'true', 600);
    await this.redisService.del(`otp:${email}`);
    return { success: true, message: '이메일 인증 성공' };
  }

  // [수정] 3. 회원가입 (에러 필드 교정 및 인증 티켓 로직 추가)
  async register(request: RegisterRequest): Promise<RegisterSuccessResponse> {
    const { email, password, fullName, role } = request;

    const isVerified = await this.redisService.get(`verified_ticket:${email}`);
    if (!isVerified) {
      throw new BadRequestException('이메일 인증이 완료되지 않았습니다.');
    }

    const existingUser = await this.prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Prisma 스키마(INDIVIDUAL, CORPORATE)에 맞게 매핑
    let finalUserType: UserType = UserType.INDIVIDUAL;
    if (role && role.toUpperCase() === 'CORPORATE') {
      finalUserType = UserType.CORPORATE;
    }

    await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        userType: finalUserType,
      },
    });

    await this.redisService.del(`verified_ticket:${email}`);

    return { success: true, message: 'User registered successfully' };
  }

  // [수정] 4. 로그인 (user.role -> user.userType 교정)
  async login(request: LoginRequest): Promise<LoginSuccessResponse> {
    const { email, password } = request;

    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // role 대신 userType 사용
    const payload = { userId: user.id, email: user.email, role: user.userType };
    const sessionId = await this.generateToken.generate(payload);
    const accessToken = await this.getAccessTokenFromSession(sessionId);

    return {
      success: true,
      sessionId,
      message: 'Login successful',
      accessToken,
      user: this.mapPrismaUserToProto(user),
    };
  }

  async getProfile(sessionId: string): Promise<UserResponse> {
    const sessionDataStr = await this.redisService.get(`session:${sessionId}`);
    if (!sessionDataStr)
      throw new UnauthorizedException('Invalid or expired session');

    const sessionData = JSON.parse(sessionDataStr) as SessionData;
    const user = await this.prisma.user.findUnique({
      where: { id: sessionData.userId },
    });

    if (!user) throw new NotFoundException('User not found');

    return {
      success: true,
      message: 'Profile retrieved successfully',
      user: this.mapPrismaUserToProto(user),
    };
  }

  // [수정] 5. 비밀번호 재설정 (verificationToken 테이블 미존재 에러 해결을 위해 Redis 방식 권장)
  // 현재 에러가 발생하는 구간이므로, 일단 주석 처리하거나 Redis 방식으로 전환해야 함
  async requestPasswordReset(email: string): Promise<PasswordResetResponse> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) throw new NotFoundException('User does not exist');

    if (user.socialProvider && user.socialProvider !== 'NONE') {
      throw new BadRequestException(
        '소셜 로그인 계정은 비밀번호 초기화를 사용할 수 없습니다.',
      );
    }

    const token = crypto.randomBytes(32).toString('hex');
    await this.redisService.set(`pw_reset:${token}`, user.id, 3600);

    // Send password reset email via SES (background)
    setImmediate(async () => {
      const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
      const command = new SendEmailCommand({
        Source: process.env.MAIL_FROM,
        Destination: { ToAddresses: [email] },
        Message: {
          Subject: {
            Data: '[JobChaja] 비밀번호 재설정 안내',
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: `
                <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
                  <h2 style="color: #007bff;">JobChaja 비밀번호 재설정</h2>
                  <p>아래 링크를 클릭하여 비밀번호를 재설정해주세요.</p>
                  <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 6px;">비밀번호 재설정</a>
                  <p style="margin-top: 20px; font-size: 13px; color: #999;">이 링크는 1시간 동안 유효합니다.</p>
                </div>
              `,
              Charset: 'UTF-8',
            },
          },
        },
      });

      try {
        await this.sesClient.send(command);
        console.log(`[AWS SES 전송 성공] Password reset email to: ${email}`);
      } catch (error) {
        console.error('[AWS SES 전송 실패] Password reset email:', error);
      }
    });

    return {
      message: '비밀번호 재설정 이메일이 발송되었습니다.',
    };
  }

  async resetPassword(token: string, newPw: string) {
    const userId = await this.redisService.get(`pw_reset:${token}`);
    if (!userId) {
      throw new BadRequestException('유효하지 않거나 만료된 토큰입니다.');
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const hashedPassword = await bcrypt.hash(newPw, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    await this.redisService.del(`pw_reset:${token}`);

    return { success: true, message: '비밀번호가 재설정되었습니다.' };
  }

  async logout(sessionId: string): Promise<RegisterSuccessResponse> {
    const exists = await this.redisService.exists(`session:${sessionId}`);
    if (!exists) throw new UnauthorizedException('Invalid or expired session');

    await this.redisService.del(`session:${sessionId}`);
    return { success: true, message: 'Logout successful' };
  }

  async findOrCreateOAuthUser(profile: {
    email?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    provider: ProtoSocialProvider;
    providerId: string;
  }) {
    const prismaProvider = this.mapProtoToPrismaSocialProvider(
      profile.provider,
    );
    const existingSocialAuth = await this.prisma.socialAuth.findFirst({
      where: { provider: prismaProvider, providerId: profile.providerId },
      include: { user: true },
    });

    if (existingSocialAuth) {
      const payload = {
        userId: existingSocialAuth.user.id,
        email: existingSocialAuth.user.email,
        role: existingSocialAuth.user.userType,
      };
      const sessionId = await this.generateToken.generate(payload);
      const accessToken = await this.getAccessTokenFromSession(sessionId);

      return {
        success: true,
        sessionId,
        message: 'Login successful',
        accessToken,
        user: this.mapPrismaUserToProto(existingSocialAuth.user),
      };
    }

    let user: PrismaUser | null = null;
    if (profile.email) {
      user = await this.prisma.user.findFirst({
        where: { email: profile.email },
      });
    }

    if (!user) {
      const fullName =
        [profile.firstName, profile.lastName].filter(Boolean).join(' ') || null;
      let email =
        profile.email || `${prismaProvider}_${profile.providerId}@oauth.local`;
      user = await this.prisma.user.create({
        data: { email, fullName, userType: UserType.INDIVIDUAL },
      });
    }

    return { success: true, message: 'OAuth Login Ready' };
  }

  // --- 헬퍼 메서드 (필드명 에러 해결 핵심) ---

  private async getAccessTokenFromSession(
    sessionId: string,
  ): Promise<string | undefined> {
    const sessionDataStr = await this.redisService.get(`session:${sessionId}`);
    if (sessionDataStr) {
      const sessionData = JSON.parse(sessionDataStr) as SessionData;
      return sessionData.accessToken;
    }
    return undefined;
  }

  private mapPrismaUserToProto(user: PrismaUser): User {
    // 에러 해결: Prisma 스키마에 없는 필드는 기본값으로 대응
    return {
      id: user.id,
      role: this.mapUserRole(user.userType), // user.role -> user.userType
      email: user.email || undefined,
      phone: undefined, // 스키마에 없으므로 undefined
      fullName: user.fullName || undefined,
      status: UserStatus.ACTIVE, // 스키마 필드 부재로 기본값 매핑
      isEmailedVerified: true,
      isPhoneVerified: false,
      walletId: undefined, // 스키마 필드 부재
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  private mapUserRole(role: string): UserRole {
    const roleMap: Record<string, UserRole> = {
      GUEST: UserRole.GUEST,
      MEMBER: UserRole.MEMBER,
      CORPORATE: UserRole.CORPORATE,
      ADMIN: UserRole.ADMIN,
      SUPERADMIN: UserRole.SUPERADMIN,
    };
    return roleMap[role] || UserRole.USER_ROLE_UNSPECIFIED;
  }

  private mapUserStatus(status: string): UserStatus {
    const statusMap: Record<string, UserStatus> = {
      PENDING: UserStatus.PENDING,
      ACTIVE: UserStatus.ACTIVE,
    };
    return statusMap[status] || UserStatus.USER_STATUS_UNSPECIFIED;
  }

  private mapProtoToPrismaSocialProvider(
    protoProvider: ProtoSocialProvider,
  ): PrismaSocialProvider {
    const providerMap: Record<ProtoSocialProvider, PrismaSocialProvider> = {
      [ProtoSocialProvider.GOOGLE]: 'GOOGLE' as PrismaSocialProvider,
      [ProtoSocialProvider.FACEBOOK]: 'FACEBOOK' as PrismaSocialProvider,
      [ProtoSocialProvider.KAKAO]: 'KAKAO' as PrismaSocialProvider,
      [ProtoSocialProvider.APPLE]: 'APPLE' as PrismaSocialProvider,
      [ProtoSocialProvider.UNRECOGNIZED]: 'GOOGLE' as PrismaSocialProvider,
    };
    return providerMap[protoProvider] || ('GOOGLE' as PrismaSocialProvider);
  }
}
