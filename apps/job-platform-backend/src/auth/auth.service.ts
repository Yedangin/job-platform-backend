import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Resolver } from 'dns/promises';
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
import * as Tesseract from 'tesseract.js';
import * as path from 'path';
import * as fs from 'fs';
import {
  SocialProvider as PrismaSocialProvider,
  User as PrismaUser,
  UserType,
} from 'generated/prisma-user';
import { GenerateStoreToken } from 'libs/common/src/common/helper/generate-store-token';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class AuthService implements OnModuleInit {
  private sesClient: SESClient;
  private dnsResolver: Resolver;

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly generateToken: GenerateStoreToken,
    private readonly redisService: RedisService,
  ) {
    // ✅ AWS SES 설정
    this.sesClient = new SESClient({
      region: process.env.AWS_REGION || 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
      },
    });

    // ✅ DNS Resolver를 Google Public DNS로 강제 설정
    this.dnsResolver = new Resolver();
    this.dnsResolver.setServers([
      '8.8.8.8', // Google Public DNS Primary
      '8.8.4.4', // Google Public DNS Secondary
      '1.1.1.1', // Cloudflare DNS (Fallback)
    ]);
  }

  // ✅ 서버 시작 시 Admin 계정 자동 생성
  async onModuleInit() {
    try {
      const adminEmail = 'admin';
      const adminPassword = 'adminpage1!';

      const existingAdmin = await this.prisma.user.findFirst({
        where: { email: adminEmail },
      });

      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await this.prisma.user.create({
          data: {
            email: adminEmail,
            password: hashedPassword,
            userType: UserType.ADMIN,
            socialProvider: 'NONE',
            isActive: true,
          },
        });
        console.log(
          '[Admin] ✅ 관리자 계정이 생성되었습니다. (admin / adminpage1!)',
        );
      } else {
        console.log('[Admin] ✅ 관리자 계정이 이미 존재합니다.');
      }
    } catch (error) {
      console.error('[Admin] ❌ 관리자 계정 생성 실패:', error);
    }
  }

  // --- 1. OTP 발송 (AWS SES 사용) ---
  async sendOtp(email: string) {
    const limitKey = `otp_limit:${email}`; // 1분 제한용 키
    const dailyKey = `otp_daily:${email}`; // 하루 제한용 키

    // 1. 1분 이내 재발송 요청 확인
    const isLocked = await this.redisService.get(limitKey);
    if (isLocked) {
      throw new BadRequestException(
        '너무 자주 요청하셨습니다. 1분 후에 다시 시도해주세요.',
      );
    }

    // 2. 하루 최대 발송 횟수 확인 (10회)
    const dailyCount = (await this.redisService.get(dailyKey)) || 0;
    if (Number(dailyCount) >= 10) {
      throw new BadRequestException(
        '오늘 하루 인증 요청 횟수(10회)를 모두 초과했습니다.',
      );
    }

    // 2-1. 이미 가입된 이메일인지 확인
    const existingUser = await this.prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      const userTypeKorean =
        existingUser.userType === 'INDIVIDUAL' ? '개인' : '기업';
      throw new ConflictException(
        `이미 ${userTypeKorean} 회원으로 가입된 이메일입니다.`,
      );
    }

    // 3. 이메일 도메인 MX 레코드 검증
    const domain = email.split('@')[1];
    if (!domain) {
      throw new BadRequestException('올바른 이메일 형식이 아닙니다.');
    }

    try {
      const mxRecords = await this.dnsResolver.resolveMx(domain);
      if (!mxRecords || mxRecords.length === 0) {
        throw new BadRequestException('존재하지 않는 이메일 도메인입니다.');
      }
      console.log(
        `[MX 검증 성공] ${domain}:`,
        mxRecords.map((r) => r.exchange).join(', '),
      );
    } catch (error: any) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error(`[MX 검증 실패] ${domain}:`, error.code);
      throw new BadRequestException(
        '유효하지 않은 이메일 주소입니다. 도메인을 확인해주세요.',
      );
    }

    // 4. OTP 생성
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 5. Redis에 즉시 저장
    await this.redisService.set(`otp:${email}`, otp, 300); // 5분 유효
    await this.redisService.set(limitKey, 'locked', 60); // 1분 잠금

    const nextCount = Number(dailyCount) + 1;
    await this.redisService.set(dailyKey, String(nextCount), 86400); // 1일 유지

    // 6. 즉시 성공 응답 반환
    const response = { success: true, message: '인증번호가 발송되었습니다.' };

    // 7. AWS SES 발송은 비동기로 백그라운드 처리
    setImmediate(async () => {
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
        await this.sesClient.send(command);
        console.log(`[AWS SES 전송 성공] To: ${email}, OTP: ${otp}`);
      } catch (error) {
        console.error('[AWS SES 전송 실패] 백그라운드 발송 에러:', error);
      }
    });

    return response;
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
        <p style="font-size: 13px; color: #999;">이 인증번호는 <b>5분</b> 동안 유효합니다.</p>
      </div>
      <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #bbb;">
        <p>본 메일은 발신전용입니다. 궁금하신 점은 고객센터로 문의해 주세요.</p>
        <p>© 2026 JobChaja. All rights reserved.</p>
      </div>
    </div>
    `;
  }

  // --- 2. 인증번호 검증 ---
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

  // --- 3. 회원가입 (★ 핵심 로직: 트랜잭션 + One Account Policy) ---
  async register(request: RegisterRequest): Promise<RegisterSuccessResponse> {
    const { email, password, fullName, role } = request;

    // 1. 인증 티켓 확인
    const isVerified = await this.redisService.get(`verified_ticket:${email}`);
    if (!isVerified) {
      throw new BadRequestException('이메일 인증이 완료되지 않았습니다.');
    }

    // 2. One Account Policy: 이메일 중복 체크
    const existingUser = await this.prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      const userTypeKorean =
        existingUser.userType === 'INDIVIDUAL' ? '개인' : '기업';
      throw new ConflictException(
        `이미 ${userTypeKorean} 회원으로 가입된 이메일입니다.`,
      );
    }

    // 3. 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. UserType 매핑 (Prisma 스키마에 맞게)
    const finalUserType: UserType =
      role === 'CORPORATE' ? UserType.CORPORATE : UserType.INDIVIDUAL;

    // 5. ★ 트랜잭션: User + Profile 동시 생성
    try {
      await this.prisma.$transaction(async (prisma) => {
        // 5-1. users_auth 생성
        const newUser = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            userType: finalUserType,
            socialProvider: 'NONE',
            isActive: true,
          },
        });

        // 5-2. 프로필 테이블 초기 Row 생성
        if (finalUserType === UserType.INDIVIDUAL) {
          // 개인 회원: profiles_individual 생성 (필수 필드만)
          await prisma.individualProfile.create({
            data: {
              authId: newUser.id,
              realName: fullName || '이름 미입력',
              nationality: 'UNKNOWN', // 임시값 (나중에 프로필 수정에서 입력)
              birthDate: new Date('1900-01-01'), // 임시값
              gender: 'M', // 임시값
              visaType: 'PENDING', // 임시값
              visaExpiryDate: new Date('2099-12-31'), // 임시값
            },
          });
        } else if (finalUserType === UserType.CORPORATE) {
          // 기업 회원: profiles_corporate 생성 (최소 필드만, 인증 제출 시 나머지 입력)
          await prisma.corporateProfile.create({
            data: {
              authId: newUser.id,
              managerName: fullName || null,
              managerEmail: email,
              verificationStatus: 'PENDING',
            },
          });
        }
      });

      // 6. 인증 티켓 삭제
      await this.redisService.del(`verified_ticket:${email}`);

      // 활동 로그: 회원가입
      await this.logActivity(null, email, fullName || null, null, 'REGISTER', `${finalUserType} 회원가입`);

      return { success: true, message: 'User registered successfully' };
    } catch (error) {
      console.error('[회원가입 트랜잭션 실패]', error);
      throw new InternalServerErrorException(
        '회원가입 처리 중 오류가 발생했습니다.',
      );
    }
  }

  // --- 4. 로그인 ---
  async login(
    request: LoginRequest & { memberType?: string },
  ): Promise<LoginSuccessResponse> {
    const { email, password, memberType } = request as any;

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

    // 탭별 회원 유형 검증 (ADMIN은 모든 탭에서 로그인 가능)
    if (memberType && user.userType !== 'ADMIN') {
      if (memberType === 'company' && user.userType !== 'CORPORATE') {
        throw new UnauthorizedException(
          '기업회원으로 등록되지 않은 계정입니다. 개인회원 탭에서 로그인해주세요.',
        );
      }
      if (memberType === 'seeker' && user.userType === 'CORPORATE') {
        throw new UnauthorizedException(
          '기업회원 계정입니다. 기업회원 탭에서 로그인해주세요.',
        );
      }
    }

    // ★ lastLoginAt 업데이트
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const payload = { userId: user.id, email: user.email, role: user.userType };
    const sessionId = await this.generateToken.generate(payload);
    const accessToken = await this.getAccessTokenFromSession(sessionId);

    // 활동 로그
    await this.logActivity(user.id, user.email, null, null, 'LOGIN', '로그인');

    return {
      success: true,
      sessionId,
      message: 'Login successful',
      accessToken,
      user: this.mapPrismaUserToProto(user),
    };
  }

  // --- 5. 프로필 조회 ---
  async getProfile(sessionId: string): Promise<UserResponse> {
    const redisKey = `session:${sessionId}`;
    console.log(
      '[getProfile Service] Redis key:',
      redisKey.substring(0, 40) + '...',
    );

    const sessionDataStr = await this.redisService.get(redisKey);
    console.log(
      '[getProfile Service] Redis result:',
      sessionDataStr ? 'FOUND' : 'NOT_FOUND',
    );

    if (!sessionDataStr) {
      console.log('[getProfile Service] FAIL: Redis에서 세션 데이터 없음');
      throw new UnauthorizedException('Invalid or expired session');
    }

    const sessionData = JSON.parse(sessionDataStr) as SessionData;
    console.log(
      '[getProfile Service] Session userId:',
      sessionData.userId,
      'role:',
      sessionData.role,
    );

    const user = await this.prisma.user.findUnique({
      where: { id: sessionData.userId },
    });

    if (!user) throw new NotFoundException('User not found');

    console.log(
      '[getProfile Service] SUCCESS: user found, type:',
      user.userType,
    );

    return {
      success: true,
      message: 'Profile retrieved successfully',
      user: this.mapPrismaUserToProto(user),
    };
  }

  // --- 6. 로그아웃 ---
  async logout(sessionId: string): Promise<RegisterSuccessResponse> {
    const exists = await this.redisService.exists(`session:${sessionId}`);
    if (!exists) throw new UnauthorizedException('Invalid or expired session');

    // 로그아웃 전에 사용자 정보 조회 (로그용)
    try {
      const sessionDataStr = await this.redisService.get(
        `session:${sessionId}`,
      );
      if (sessionDataStr) {
        const sd = JSON.parse(sessionDataStr) as SessionData;
        await this.logActivity(
          sd.userId,
          null,
          null,
          null,
          'LOGOUT',
          '로그아웃',
        );
      }
    } catch {}

    await this.redisService.del(`session:${sessionId}`);
    return { success: true, message: 'Logout successful' };
  }

  // --- 7. 소셜 로그인 (★ 핵심 로직) ---
  async findOrCreateOAuthUser(
    profile: {
      email?: string;
      firstName?: string;
      lastName?: string;
      picture?: string;
      provider: ProtoSocialProvider;
      providerId: string;
    },
    requestedUserType?: string | null,
  ) {
    const prismaProvider = this.mapProtoToPrismaSocialProvider(
      profile.provider,
    );
    const isCorporate = requestedUserType === 'CORPORATE';

    // Step 1: provider + providerId로 기존 회원 찾기
    const existingUser = await this.prisma.user.findFirst({
      where: {
        socialProvider: prismaProvider,
        socialProviderId: profile.providerId,
      },
    });

    if (existingUser) {
      // 기존 회원 -> 로그인 성공
      await this.prisma.user.update({
        where: { id: existingUser.id },
        data: { lastLoginAt: new Date() },
      });

      const payload = {
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.userType,
      };
      const sessionId = await this.generateToken.generate(payload);
      const accessToken = await this.getAccessTokenFromSession(sessionId);

      // 활동 로그: 소셜 로그인
      await this.logActivity(existingUser.id, existingUser.email, null, null, 'SOCIAL_LOGIN', `${prismaProvider} 소셜 로그인`);

      return {
        success: true,
        sessionId,
        message: 'Login successful',
        accessToken,
        user: this.mapPrismaUserToProto(existingUser),
      };
    }

    // Step 2: email로 기존 회원 찾기 (소셜 계정 통합 방지)
    if (profile.email) {
      const emailUser = await this.prisma.user.findFirst({
        where: { email: profile.email },
      });

      if (emailUser) {
        throw new ConflictException(
          '이미 일반 이메일(또는 다른 소셜 계정)로 가입된 이메일입니다. 기존 계정으로 로그인해주세요.',
        );
      }
    }

    // Step 3: 신규 회원가입 (트랜잭션)
    const fullName =
      [profile.firstName, profile.lastName].filter(Boolean).join(' ') ||
      '소셜 사용자';
    const email =
      profile.email || `${prismaProvider}_${profile.providerId}@oauth.local`;
    const finalUserType = isCorporate
      ? UserType.CORPORATE
      : UserType.INDIVIDUAL;

    console.log('[소셜 로그인] 신규 회원가입:', {
      email,
      finalUserType,
      requestedUserType,
    });

    try {
      const newUser = await this.prisma.$transaction(async (prisma) => {
        // 3-1. users_auth 생성
        const user = await prisma.user.create({
          data: {
            email,
            socialProvider: prismaProvider,
            socialProviderId: profile.providerId,
            userType: finalUserType,
            isActive: true,
          },
        });

        // 3-2. 프로필 생성 (회원 유형에 따라 분기)
        if (isCorporate) {
          await prisma.corporateProfile.create({
            data: {
              authId: user.id,
              managerName: fullName || null,
              managerEmail: email,
              verificationStatus: 'PENDING',
            },
          });
        } else {
          await prisma.individualProfile.create({
            data: {
              authId: user.id,
              realName: fullName,
              nationality: 'UNKNOWN',
              birthDate: new Date('1900-01-01'),
              gender: 'M',
              visaType: 'PENDING',
              visaExpiryDate: new Date('2099-12-31'),
              profileImageUrl: profile.picture,
            },
          });
        }

        return user;
      });

      // 로그인 성공
      const payload = {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.userType,
      };
      const sessionId = await this.generateToken.generate(payload);
      const accessToken = await this.getAccessTokenFromSession(sessionId);

      // 활동 로그: 소셜 신규가입+로그인
      await this.logActivity(newUser.id, newUser.email, fullName, null, 'SOCIAL_LOGIN', `${prismaProvider} 소셜 신규가입`);

      return {
        success: true,
        sessionId,
        message: 'Social login successful',
        accessToken,
        user: this.mapPrismaUserToProto(newUser),
      };
    } catch (error) {
      console.error('[소셜 로그인 회원가입 실패]', error);
      throw new InternalServerErrorException(
        '소셜 로그인 처리 중 오류가 발생했습니다.',
      );
    }
  }

  // --- 8. 비밀번호 초기화 ---
  async requestPasswordReset(email: string): Promise<PasswordResetResponse> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) throw new NotFoundException('User does not exist');

    const token = crypto.randomBytes(32).toString('hex');
    await this.redisService.set(`pw_reset:${token}`, user.id, 3600);

    return {
      message: `Password reset token (Redis): ${token}`,
    };
  }

  async resetPassword(token: string, newPw: string) {
    // TODO: 구현 필요
    return { message: 'Password reset successful' };
  }

  // --- 9. 관리자 통계 조회 ---
  async getAdminStats() {
    // 전체 회원수
    const totalUsers = await this.prisma.user.count();

    // 유저 타입별 회원수
    const individualUsers = await this.prisma.user.count({
      where: { userType: 'INDIVIDUAL' },
    });
    const corporateUsers = await this.prisma.user.count({
      where: { userType: 'CORPORATE' },
    });
    const adminUsers = await this.prisma.user.count({
      where: { userType: 'ADMIN' },
    });

    // 소셜 로그인 회원수 (NONE이 아닌 회원)
    const socialUsers = await this.prisma.user.count({
      where: { socialProvider: { not: 'NONE' } },
    });

    // 이메일 회원수 (소셜 로그인이 NONE인 회원, ADMIN 제외)
    const emailUsers = await this.prisma.user.count({
      where: { socialProvider: 'NONE', userType: { not: 'ADMIN' } },
    });

    // 오늘 로그인한 회원수 (일일 접속자)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dailyActiveUsers = await this.prisma.user.count({
      where: {
        lastLoginAt: { gte: today },
      },
    });

    // 전체 프로필 수 (개인회원 프로필)
    const totalProfiles = await this.prisma.individualProfile.count();

    // 공고 수 통계
    const [totalJobPostings, partTimePostings, fullTimePostings] = await Promise.all([
      this.prisma.jobPosting.count(),
      this.prisma.jobPosting.count({ where: { boardType: 'PART_TIME' } }),
      this.prisma.jobPosting.count({ where: { boardType: 'FULL_TIME' } }),
    ]);

    return {
      totalUsers,
      individualUsers,
      corporateUsers,
      adminUsers,
      socialUsers,
      emailUsers,
      dailyActiveUsers,
      totalProfiles,
      totalJobPostings,
      partTimePostings,
      fullTimePostings,
    };
  }

  // 인증된 사용자 ID를 세션에서 직접 추출하는 헬퍼
  private async getSessionUserId(sessionId: string): Promise<string> {
    const sessionDataStr = await this.redisService.get(`session:${sessionId}`);
    if (!sessionDataStr)
      throw new UnauthorizedException('Invalid or expired session');
    const sessionData = JSON.parse(sessionDataStr) as SessionData;
    return sessionData.userId;
  }

  // --- 10. 비밀번호 변경 (이메일 계정만) ---
  async changePassword(
    sessionId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const userId = await this.getSessionUserId(sessionId);
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    if (user.socialProvider !== 'NONE') {
      throw new BadRequestException(
        '소셜 로그인 계정은 비밀번호를 변경할 수 없습니다.',
      );
    }
    if (!user.password) {
      throw new BadRequestException('비밀번호가 설정되지 않은 계정입니다.');
    }

    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid)
      throw new BadRequestException('현재 비밀번호가 일치하지 않습니다.');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    await this.logActivity(
      user.id,
      user.email,
      null,
      null,
      'PASSWORD_CHANGE',
      '비밀번호 변경',
    );
    return { success: true, message: '비밀번호가 변경되었습니다.' };
  }

  // --- 11. 프로필 상세 조회 ---
  async getProfileDetail(sessionId: string) {
    const redisKey = `session:${sessionId}`;
    const sessionDataStr = await this.redisService.get(redisKey);
    if (!sessionDataStr)
      throw new UnauthorizedException('Invalid or expired session');

    const sessionData = JSON.parse(sessionDataStr) as SessionData;
    const user = await this.prisma.user.findUnique({
      where: { id: sessionData.userId },
      include: { individual: true, corporate: true },
    });

    if (!user) throw new NotFoundException('User not found');

    return {
      id: user.id,
      email: user.email,
      userType: user.userType,
      socialProvider: user.socialProvider,
      isActive: user.isActive,
      joinedAt: user.joinedAt.toISOString(),
      individual: user.individual
        ? {
            realName: user.individual.realName,
            nationality: user.individual.nationality,
            gender: user.individual.gender,
            visaType: user.individual.visaType,
            visaExpiryDate: user.individual.visaExpiryDate?.toISOString(),
            isProfileCompleted: user.individual.isProfileCompleted,
            profileImageUrl: user.individual.profileImageUrl,
          }
        : null,
      corporate: user.corporate
        ? {
            companyNameOfficial: user.corporate.companyNameOfficial,
            brandName: user.corporate.brandName,
            logoImageUrl: user.corporate.logoImageUrl,
            verificationStatus: user.corporate.verificationStatus,
          }
        : null,
    };
  }

  // --- 12. 회원탈퇴 (소프트 삭제) ---
  async requestAccountDeletion(sessionId: string) {
    const userId = await this.getSessionUserId(sessionId);
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const now = new Date();
    const deleteDate = new Date(now);
    deleteDate.setDate(deleteDate.getDate() + 90);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isActive: false,
        deletedAt: now,
        deleteScheduledAt: deleteDate,
      },
    });

    // 세션 삭제
    await this.redisService.del(`session:${sessionId}`);

    await this.logActivity(
      userId,
      user.email || null,
      null,
      null,
      'ACCOUNT_DELETE',
      '회원탈퇴 요청 (90일 후 완전 삭제)',
    );
    return {
      success: true,
      message: '회원탈퇴가 요청되었습니다. 90일 후 계정이 완전히 삭제됩니다.',
    };
  }

  // --- 13. 알림 설정 조회 ---
  async getNotificationSettings(sessionId: string) {
    const userId = await this.getSessionUserId(sessionId);
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    return {
      notifSms: user.notifSms,
      notifEmail: user.notifEmail,
      notifKakao: user.notifKakao,
      notifEnabledAt: user.notifEnabledAt?.toISOString() || null,
    };
  }

  // --- 14. 알림 설정 변경 ---
  async updateNotificationSettings(
    sessionId: string,
    sms: boolean,
    email: boolean,
    kakao: boolean,
  ) {
    const userId = await this.getSessionUserId(sessionId);
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const hasAnyEnabled = sms || email || kakao;

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        notifSms: sms,
        notifEmail: email,
        notifKakao: kakao,
        notifEnabledAt: hasAnyEnabled ? new Date() : null,
      },
    });

    await this.logActivity(
      userId,
      user.email || null,
      null,
      null,
      'NOTIFICATION_UPDATE',
      `알림 설정 변경: SMS=${sms}, Email=${email}, KakaoTalk=${kakao}`,
    );
    return { success: true, message: '알림 설정이 변경되었습니다.' };
  }

  // --- 15. 고객센터 문의 작성 ---
  async createSupportTicket(sessionId: string, title: string, content: string) {
    const userId = await this.getSessionUserId(sessionId);
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const ticket = await this.prisma.supportTicket.create({
      data: {
        userId,
        title,
        content,
      },
    });

    await this.logActivity(
      userId,
      user.email || null,
      null,
      null,
      'SUPPORT_TICKET',
      `고객센터 문의: ${title}`,
    );
    return {
      success: true,
      message: '문의가 등록되었습니다.',
      ticketId: ticket.id.toString(),
    };
  }

  // --- 16. 내 문의 목록 ---
  async getMySupportTickets(sessionId: string) {
    const userId = await this.getSessionUserId(sessionId);

    const tickets = await this.prisma.supportTicket.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return tickets.map((t) => ({
      id: t.id.toString(),
      title: t.title,
      content: t.content,
      status: t.status,
      answer: t.answer,
      answeredAt: t.answeredAt?.toISOString() || null,
      createdAt: t.createdAt.toISOString(),
    }));
  }

  // --- 17. Admin: 모든 문의 조회 ---
  async getAllSupportTickets() {
    const tickets = await this.prisma.supportTicket.findMany({
      include: { user: { select: { email: true, userType: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return tickets.map((t) => ({
      id: t.id.toString(),
      userId: t.userId,
      userEmail: t.user.email,
      userType: t.user.userType,
      title: t.title,
      content: t.content,
      status: t.status,
      answer: t.answer,
      answeredAt: t.answeredAt?.toISOString() || null,
      createdAt: t.createdAt.toISOString(),
    }));
  }

  // --- 18. Admin: 문의 답변 ---
  async answerSupportTicket(ticketId: string, answer: string) {
    await this.prisma.supportTicket.update({
      where: { id: BigInt(ticketId) },
      data: { answer, status: 'ANSWERED', answeredAt: new Date() },
    });
    return { success: true, message: '답변이 등록되었습니다.' };
  }

  // --- 19. Admin: 활동 로그 조회 ---
  async getActivityLogs(filters: {
    actionType?: string;
    userName?: string;
    page?: number;
    limit?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const {
      actionType,
      userName,
      page = 1,
      limit = 20,
      sortField = 'createdAt',
      sortOrder = 'desc',
    } = filters;

    const where: any = {};
    if (actionType) where.actionType = actionType;
    if (userName) where.userName = { contains: userName, mode: 'insensitive' };

    const [logs, total] = await Promise.all([
      this.prisma.activityLog.findMany({
        where,
        orderBy: { [sortField]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.activityLog.count({ where }),
    ]);

    return {
      data: logs.map((l) => ({
        id: l.id.toString(),
        userId: l.userId,
        userEmail: l.userEmail,
        userName: l.userName,
        userGender: l.userGender,
        actionType: l.actionType,
        description: l.description,
        metadata: l.metadata,
        ipAddress: l.ipAddress,
        createdAt: l.createdAt.toISOString(),
      })),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  // --- 활동 로그 기록 헬퍼 ---
  async logActivity(
    userId: string | null,
    email: string | null,
    name: string | null,
    gender: string | null,
    actionType: string,
    description?: string,
    metadata?: string,
    ipAddress?: string,
  ) {
    try {
      await this.prisma.activityLog.create({
        data: {
          userId,
          userEmail: email,
          userName: name,
          userGender: gender,
          actionType,
          description,
          metadata,
          ipAddress,
        },
      });
    } catch (error) {
      console.error('[ActivityLog] 로그 기록 실패:', error);
    }
  }

  // --- 20. 사업자등록번호 진위확인 + 휴폐업 상태조회 (공공데이터포털 국세청 API) ---
  async verifyBusinessNumber(dto: {
    bizRegNumber: string;
    ceoName: string;
    companyName: string;
    openDate: string;
  }) {
    const serviceKey = process.env.NTS_API_SERVICE_KEY;
    if (!serviceKey) {
      throw new InternalServerErrorException(
        '사업자 상태조회 API 키가 설정되지 않았습니다.',
      );
    }

    const cleanNumber = dto.bizRegNumber.replace(/[^0-9]/g, '');
    if (cleanNumber.length !== 10) {
      throw new BadRequestException('사업자등록번호는 10자리 숫자여야 합니다.');
    }
    if (!dto.ceoName?.trim()) {
      throw new BadRequestException('대표자 성명을 입력해주세요.');
    }
    if (!dto.companyName?.trim()) {
      throw new BadRequestException('기업명을 입력해주세요.');
    }
    const cleanDate = dto.openDate?.replace(/[^0-9]/g, '') || '';
    if (cleanDate.length !== 8) {
      throw new BadRequestException('개업일자는 8자리(YYYYMMDD) 형식이어야 합니다.');
    }

    try {
      // Step 1: 진위확인 API (validate) - 사업자번호 + 대표자명 + 개업일자 + 상호 일치 확인
      const validateUrl = `https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${serviceKey}`;
      const validateResponse = await fetch(validateUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          businesses: [
            {
              b_no: cleanNumber,
              start_dt: cleanDate,
              p_nm: dto.ceoName.trim(),
              b_nm: dto.companyName.trim(),
            },
          ],
        }),
      });

      if (!validateResponse.ok) {
        const errorText = await validateResponse.text();
        console.error('[NTS Validate API] HTTP 에러:', validateResponse.status, errorText);
        throw new InternalServerErrorException('국세청 진위확인 API 호출에 실패했습니다.');
      }

      const validateResult = await validateResponse.json();
      console.log('[NTS Validate API] 응답:', JSON.stringify(validateResult, null, 2));

      const validateData = validateResult.data?.[0];
      if (!validateData) {
        throw new BadRequestException('사업자 진위확인 정보를 조회할 수 없습니다.');
      }

      // valid: "01" = 일치, "02" = 불일치
      if (validateData.valid !== '01') {
        return {
          bizRegNumber: cleanNumber,
          businessStatus: '',
          businessStatusCode: '',
          statusDetail: '',
          taxType: '',
          endDate: '',
          isValid: false,
          message: '사업자 정보가 일치하지 않습니다. 사업자등록번호, 기업명, 대표자 성명, 개업일자를 확인해주세요.',
        };
      }

      // Step 2: 휴폐업 상태조회 API (status) - 계속사업자인지 확인
      const statusUrl = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${serviceKey}`;
      const statusResponse = await fetch(statusUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({ b_no: [cleanNumber] }),
      });

      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        console.error('[NTS Status API] HTTP 에러:', statusResponse.status, errorText);
        throw new InternalServerErrorException('국세청 상태조회 API 호출에 실패했습니다.');
      }

      const statusResult = await statusResponse.json();
      console.log('[NTS Status API] 응답:', JSON.stringify(statusResult, null, 2));

      const statusData = statusResult.data?.[0];
      if (!statusData) {
        throw new BadRequestException('사업자 상태 정보를 조회할 수 없습니다.');
      }

      const statusMap: Record<string, string> = {
        '01': '계속사업자',
        '02': '휴업자',
        '03': '폐업자',
      };

      const businessStatus =
        statusData.b_stt || statusMap[statusData.b_stt_cd] || '미등록 사업자';
      const isActive = statusData.b_stt_cd === '01';
      const statusDetail = statusData.tax_type || businessStatus;

      return {
        bizRegNumber: statusData.b_no,
        businessStatus,
        businessStatusCode: statusData.b_stt_cd || '',
        statusDetail,
        taxType: statusData.tax_type || '',
        endDate: statusData.end_dt || '',
        isValid: isActive,
        message: isActive
          ? '사업자 정보가 확인되었습니다.'
          : `사업자 상태: ${businessStatus}. 정상 사업자(계속사업자)만 등록 가능합니다.`,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }
      console.error('[NTS API] 네트워크 에러:', error);
      throw new InternalServerErrorException(
        '국세청 API 연동 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      );
    }
  }

  // --- 20-2. 기업 서류 파일 업로드 ---
  async uploadCorporateDoc(
    sessionId: string,
    file: Express.Multer.File,
    docType: 'bizReg' | 'empCert',
  ) {
    const userId = await this.getSessionUserId(sessionId);
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    if (user.userType !== 'CORPORATE') {
      throw new UnauthorizedException('기업 회원만 접근 가능합니다.');
    }

    // 파일을 userId별 디렉토리로 이동
    const targetDir = path.join(
      process.cwd(),
      'uploads',
      'corporate-docs',
      userId,
      docType === 'bizReg' ? 'biz-reg' : 'emp-cert',
    );
    fs.mkdirSync(targetDir, { recursive: true });

    const targetPath = path.join(targetDir, path.basename(file.path));
    fs.renameSync(file.path, targetPath);

    // 상대 경로로 저장 (DB에 저장할 경로)
    const relativePath = path.relative(process.cwd(), targetPath).replace(/\\/g, '/');

    // multer가 originalname을 latin1로 디코딩하므로 UTF-8로 재변환
    const decodedOriginalName = Buffer.from(file.originalname, 'latin1').toString('utf8');

    // 활동 로그: 서류 업로드
    await this.logActivity(userId, user.email, null, null, 'CORPORATE_DOC_UPLOAD',
      `${docType === 'bizReg' ? '사업자등록증' : '재직증명서'} 업로드: ${decodedOriginalName}`);

    return {
      success: true,
      filePath: relativePath,
      originalName: decodedOriginalName,
    };
  }

  // --- 20-3. OCR로 사업자등록번호 추출 ---
  async ocrExtractBizNumber(filePath: string): Promise<string | null> {
    const ext = path.extname(filePath).toLowerCase();
    // PDF는 OCR 불가 → 스킵
    if (ext === '.pdf') {
      console.log('[OCR] PDF 파일은 OCR 스킵:', filePath);
      return null;
    }

    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.join(process.cwd(), filePath);

    if (!fs.existsSync(absolutePath)) {
      console.error('[OCR] 파일이 존재하지 않음:', absolutePath);
      return null;
    }

    try {
      // Tesseract PSM 6 = uniform block of text (사업자등록증에 적합)
      const result = await Tesseract.recognize(absolutePath, 'kor+eng', {
        tessedit_pageseg_mode: '6' as any,
        tessedit_char_whitelist: '0123456789-가나다라마바사아자차카타파하등록번호사업자법인 \n',
      } as any);
      const text = result.data.text;
      console.log('[OCR] 추출된 전체 텍스트:', text);

      // 줄 단위로 분석하여 사업자등록번호 찾기
      const lines = text.split('\n');
      let bizNumber: string | null = null;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const nextLine = (lines[i + 1] || '').trim();

        // 법인등록번호 줄은 건너뜀 (13자리: XXXXXX-XXXXXXX)
        if (/법인/.test(line)) {
          continue;
        }

        // 방법 1: "등록번호" 키워드가 있는 줄에서 XXX-XX-XXXXX 패턴 찾기
        if (/등록\s*번호|사업자/.test(line) && !/법인/.test(line)) {
          // 같은 줄에서 번호 찾기
          const dashMatch = line.match(/(\d{3})\s*[-–—]\s*(\d{2})\s*[-–—]\s*(\d{5})/);
          if (dashMatch) {
            bizNumber = dashMatch[1] + dashMatch[2] + dashMatch[3];
            console.log('[OCR] 등록번호 키워드 + 대시 패턴 매칭:', bizNumber);
            break;
          }
          // 같은 줄에 10자리 숫자
          const plainMatch = line.match(/(\d{3})\s*(\d{2})\s*(\d{5})/);
          if (plainMatch) {
            bizNumber = plainMatch[1] + plainMatch[2] + plainMatch[3];
            console.log('[OCR] 등록번호 키워드 + 연속숫자 매칭:', bizNumber);
            break;
          }
          // 다음 줄에서 번호 찾기 (등록번호: \n 485-86-03274 형태)
          const nextDashMatch = nextLine.match(/(\d{3})\s*[-–—]\s*(\d{2})\s*[-–—]\s*(\d{5})/);
          if (nextDashMatch) {
            bizNumber = nextDashMatch[1] + nextDashMatch[2] + nextDashMatch[3];
            console.log('[OCR] 등록번호 키워드(다음줄) + 대시 패턴 매칭:', bizNumber);
            break;
          }
          const nextPlainMatch = nextLine.match(/(\d{3})\s*(\d{2})\s*(\d{5})/);
          if (nextPlainMatch) {
            bizNumber = nextPlainMatch[1] + nextPlainMatch[2] + nextPlainMatch[3];
            console.log('[OCR] 등록번호 키워드(다음줄) + 연속숫자 매칭:', bizNumber);
            break;
          }
        }
      }

      // 방법 2: 키워드 없이 전체 텍스트에서 XXX-XX-XXXXX 패턴 찾기 (법인등록번호 제외)
      if (!bizNumber) {
        // 법인등록번호 근처가 아닌 XXX-XX-XXXXX 패턴 찾기
        const allDashMatches = [...text.matchAll(/(\d{3})\s*[-–—]\s*(\d{2})\s*[-–—]\s*(\d{5})/g)];
        for (const m of allDashMatches) {
          const matchIndex = m.index || 0;
          // 매치 앞 30자 내에 "법인"이 없는지 확인
          const preceding = text.substring(Math.max(0, matchIndex - 30), matchIndex);
          if (!/법인/.test(preceding)) {
            bizNumber = m[1] + m[2] + m[3];
            console.log('[OCR] 전체텍스트 대시 패턴 매칭 (법인 제외):', bizNumber);
            break;
          }
        }
      }

      // 방법 3: 문서 상단부 (앞 40%)에서 10자리 숫자 찾기 (사업자번호는 보통 상단에 위치)
      if (!bizNumber) {
        const topPortion = text.substring(0, Math.floor(text.length * 0.4));
        // 법인등록번호가 아닌 줄에서 10자리 연속 숫자
        const topLines = topPortion.split('\n');
        for (const tl of topLines) {
          if (/법인/.test(tl)) continue;
          const pm = tl.match(/(\d{10})/);
          if (pm) {
            bizNumber = pm[1];
            console.log('[OCR] 상단 10자리 연속숫자 매칭:', bizNumber);
            break;
          }
        }
      }

      if (!bizNumber) {
        console.log('[OCR] 사업자등록번호 패턴을 찾지 못함');
      }
      return bizNumber;
    } catch (error) {
      console.error('[OCR] 텍스트 추출 실패:', error);
      return null;
    }
  }

  // --- 21. 기업 인증 상태 조회 ---
  async getCorporateVerificationStatus(sessionId: string) {
    const userId = await this.getSessionUserId(sessionId);
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    if (user.userType !== 'CORPORATE') {
      throw new UnauthorizedException('기업 회원만 접근 가능합니다.');
    }

    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) throw new NotFoundException('기업 프로필을 찾을 수 없습니다.');

    return {
      verificationStatus: corp.verificationStatus,
      isBizVerified: corp.isBizVerified,
      lastRejectionReason: corp.lastRejectionReason,
      submittedAt: corp.submittedAt?.toISOString() || null,
      approvedAt: corp.approvedAt?.toISOString() || null,
      bizRegNumber: corp.bizRegNumber,
      companyNameOfficial: corp.companyNameOfficial,
      ceoName: corp.ceoName,
      managerName: corp.managerName,
      managerPhone: corp.managerPhone,
      managerEmail: corp.managerEmail,
      ksicCode: corp.ksicCode,
      addressRoad: corp.addressRoad,
      companySizeType: corp.companySizeType,
      proofDocumentUrl: corp.proofDocumentUrl,
      bizRegDocPath: corp.bizRegDocPath,
      bizRegDocOrigName: corp.bizRegDocOrigName,
      empCertDocPath: corp.empCertDocPath,
      empCertDocOrigName: corp.empCertDocOrigName,
      isCeoSelf: corp.isCeoSelf,
      ocrVerified: corp.ocrVerified,
      ocrExtractedBizNo: corp.ocrExtractedBizNo,
    };
  }

  // --- 21. 기업 인증 정보 제출 ---
  async submitCorporateVerification(
    sessionId: string,
    data: {
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
    clientIp?: string,
  ) {
    const userId = await this.getSessionUserId(sessionId);
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    if (user.userType !== 'CORPORATE') {
      throw new UnauthorizedException('기업 회원만 접근 가능합니다.');
    }

    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) throw new NotFoundException('기업 프로필을 찾을 수 없습니다.');

    // SUBMITTED 또는 APPROVED 상태에서는 재제출 불가
    if (corp.verificationStatus === 'SUBMITTED') {
      throw new UnauthorizedException('이미 인증 심사가 진행 중입니다.');
    }
    if (corp.verificationStatus === 'APPROVED') {
      throw new UnauthorizedException('이미 인증이 완료되었습니다.');
    }

    // OCR 검증 (사업자등록증 이미지가 있는 경우)
    let ocrVerified = false;
    let ocrExtractedBizNo: string | null = null;
    if (data.bizRegDocPath) {
      ocrExtractedBizNo = await this.ocrExtractBizNumber(data.bizRegDocPath);
      if (ocrExtractedBizNo) {
        const cleanInputBizNo = data.bizRegNumber.replace(/[^0-9]/g, '');
        ocrVerified = ocrExtractedBizNo === cleanInputBizNo;
        console.log('[OCR 검증]', {
          extracted: ocrExtractedBizNo,
          input: cleanInputBizNo,
          match: ocrVerified,
        });
      }
    }

    // verificationMethod 결정
    const isCeoSelf = data.isCeoSelf === true;
    const verificationMethod = isCeoSelf ? 'CEO_MATCH' : 'DOCUMENT_MANUAL';

    await this.prisma.corporateProfile.update({
      where: { authId: userId },
      data: {
        bizRegNumber: data.bizRegNumber,
        companyNameOfficial: data.companyNameOfficial,
        ceoName: data.ceoName,
        managerName: data.managerName,
        managerPhone: data.managerPhone,
        ksicCode: data.ksicCode || null,
        addressRoad: data.addressRoad || null,
        companySizeType: (data.companySizeType as any) || 'SME',
        proofDocumentUrl: data.proofDocumentUrl || null,
        // 서류 업로드 관련
        bizRegDocPath: data.bizRegDocPath || null,
        bizRegDocOrigName: data.bizRegDocOrigName || null,
        empCertDocPath: data.empCertDocPath || null,
        empCertDocOrigName: data.empCertDocOrigName || null,
        // 대표자 본인 선언
        isCeoSelf,
        ceoSelfDeclaredAt: isCeoSelf ? new Date() : null,
        ceoSelfDeclaredIp: isCeoSelf ? (clientIp || null) : null,
        // OCR 결과
        ocrVerified,
        ocrExtractedBizNo,
        // 인증 방법 및 상태
        verificationMethod: verificationMethod as any,
        verificationStatus: 'SUBMITTED',
        submittedAt: new Date(),
        lastRejectionReason: null,
      },
    });

    // 활동 로그: 기업 인증 신청
    await this.logActivity(userId, user.email, null, null, 'CORPORATE_VERIFY_SUBMIT',
      `기업 인증 신청: ${data.companyNameOfficial} (${data.bizRegNumber})`);

    return { success: true, message: '기업 인증 정보가 제출되었습니다. 관리자 승인을 기다려주세요.' };
  }

  // --- 22. Admin: 기업 인증 목록 조회 ---
  async getCorporateVerifications(filter?: string) {
    const where: any = {};
    if (filter && filter !== 'ALL') {
      where.verificationStatus = filter;
    }

    const profiles = await this.prisma.corporateProfile.findMany({
      where,
      include: { user: { select: { email: true, joinedAt: true } } },
      orderBy: { updatedAt: 'desc' },
    });

    return profiles.map((p) => ({
      companyId: p.companyId.toString(),
      authId: p.authId,
      email: p.user.email,
      joinedAt: p.user.joinedAt.toISOString(),
      bizRegNumber: p.bizRegNumber,
      companyNameOfficial: p.companyNameOfficial,
      ceoName: p.ceoName,
      managerName: p.managerName,
      managerPhone: p.managerPhone,
      managerEmail: p.managerEmail,
      ksicCode: p.ksicCode,
      addressRoad: p.addressRoad,
      companySizeType: p.companySizeType,
      verificationStatus: p.verificationStatus,
      isBizVerified: p.isBizVerified,
      lastRejectionReason: p.lastRejectionReason,
      submittedAt: p.submittedAt?.toISOString() || null,
      approvedAt: p.approvedAt?.toISOString() || null,
      proofDocumentUrl: p.proofDocumentUrl,
      bizRegDocPath: p.bizRegDocPath,
      bizRegDocOrigName: p.bizRegDocOrigName,
      empCertDocPath: p.empCertDocPath,
      empCertDocOrigName: p.empCertDocOrigName,
      isCeoSelf: p.isCeoSelf,
      ocrVerified: p.ocrVerified,
      ocrExtractedBizNo: p.ocrExtractedBizNo,
      verificationMethod: p.verificationMethod,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  }

  // --- 23. Admin: 기업 인증 승인/거절 ---
  async updateCorporateVerification(
    adminSessionId: string,
    userId: string,
    action: 'APPROVE' | 'REJECT',
    reason?: string,
  ) {
    // Admin 확인
    const profile = await this.getProfile(adminSessionId);
    if (profile.user?.role !== 5) {
      throw new UnauthorizedException('Admin access required');
    }

    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) throw new NotFoundException('기업 프로필을 찾을 수 없습니다.');

    if (action === 'APPROVE') {
      await this.prisma.corporateProfile.update({
        where: { authId: userId },
        data: {
          verificationStatus: 'APPROVED',
          isBizVerified: true,
          approvedAt: new Date(),
        },
      });
      // 활동 로그: 관리자 승인
      await this.logActivity(userId, null, null, null, 'CORPORATE_VERIFY_APPROVE',
        `기업 인증 승인: ${corp.companyNameOfficial || userId}`);
      return { success: true, message: '기업 인증이 승인되었습니다.' };
    } else {
      // REJECT → PENDING으로 되돌림 + 거절 사유 저장
      if (!reason) {
        throw new UnauthorizedException('거절 시 사유를 입력해주세요.');
      }
      await this.prisma.corporateProfile.update({
        where: { authId: userId },
        data: {
          verificationStatus: 'PENDING',
          lastRejectionReason: reason,
          submittedAt: null,
        },
      });
      // 활동 로그: 관리자 거절
      await this.logActivity(userId, null, null, null, 'CORPORATE_VERIFY_REJECT',
        `기업 인증 거절: ${corp.companyNameOfficial || userId}`, reason);
      return { success: true, message: '기업 인증이 거절되었습니다.' };
    }
  }

  // --- 24. Admin: 전체 회원 목록 조회 ---
  async getAdminUsers(filters: {
    type?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }) {
    const { type = 'ALL', search, page = 1, limit = 20, sortBy = 'latest', sortOrder = 'desc' } = filters;

    const where: any = {};
    // ADMIN 제외
    where.userType = { not: 'ADMIN' };

    if (type === 'INDIVIDUAL') where.userType = 'INDIVIDUAL';
    else if (type === 'CORPORATE') where.userType = 'CORPORATE';

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { individual: { realName: { contains: search, mode: 'insensitive' } } },
        { corporate: { companyNameOfficial: { contains: search, mode: 'insensitive' } } },
        { corporate: { managerName: { contains: search, mode: 'insensitive' } } },
      ];
    }

    // 정렬 기준 설정
    let orderBy: any;
    const order = sortOrder === 'asc' ? 'asc' : 'desc';
    switch (sortBy) {
      case 'name':
        // 이름/회사명 정렬 - individual.realName 또는 corporate.companyNameOfficial
        if (type === 'CORPORATE') {
          orderBy = { corporate: { companyNameOfficial: order } };
        } else if (type === 'INDIVIDUAL') {
          orderBy = { individual: { realName: order } };
        } else {
          orderBy = { email: order }; // ALL 탭에서는 이메일 기준
        }
        break;
      case 'joinedAt':
        orderBy = { joinedAt: order };
        break;
      case 'lastLogin':
        orderBy = { lastLoginAt: order };
        break;
      case 'needsAction':
        // 조치필요 정렬: 기업회원 SUBMITTED 상태 우선
        orderBy = [
          { corporate: { submittedAt: 'desc' } },
          { joinedAt: 'desc' },
        ];
        break;
      case 'latest':
      default:
        orderBy = { lastLoginAt: order };
        break;
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        include: { individual: true, corporate: true },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users.map((u) => {
        // 조치필요 여부 판단
        const needsAction =
          (u.corporate?.verificationStatus === 'SUBMITTED') || // 기업 인증 심사대기
          (u.corporate?.verificationStatus === 'REJECTED') || // 거절 후 재심사 가능
          (u.corporate?.ocrVerified === false); // OCR 불일치

        return {
          id: u.id,
          email: u.email,
          userType: u.userType,
          socialProvider: u.socialProvider === 'NONE' ? null : u.socialProvider,
          isActive: u.isActive,
          joinedAt: u.joinedAt.toISOString(),
          lastLoginAt: u.lastLoginAt?.toISOString() || null,
          updatedAt: (u.corporate?.updatedAt || u.individual?.updatedAt || u.lastLoginAt || u.joinedAt).toISOString(),
          needsAction,
          individual: u.individual
            ? {
                realName: u.individual.realName,
                nationality: u.individual.nationality,
                gender: u.individual.gender,
                birthDate: u.individual.birthDate?.toISOString().split('T')[0] || null,
                visaType: u.individual.visaType,
                visaExpiryDate: u.individual.visaExpiryDate?.toISOString().split('T')[0] || null,
                addressRoad: u.individual.addressRoad,
                desiredJobType: u.individual.desiredJobType,
                desiredSalary: u.individual.desiredSalary,
                desiredIndustries: u.individual.desiredIndustries,
                finalEducationLvl: u.individual.finalEducationLvl,
                koreanFluencyLvl: u.individual.koreanFluencyLvl,
                totalCareerMonths: u.individual.totalCareerMonths,
                profileImageUrl: u.individual.profileImageUrl,
                selfIntro: u.individual.selfIntro,
                isProfileCompleted: u.individual.isProfileCompleted,
                profileCompletionPercent: this.calcProfileCompletion(u.individual),
              }
            : null,
          corporate: u.corporate
            ? {
                companyNameOfficial: u.corporate.companyNameOfficial,
                bizRegNumber: u.corporate.bizRegNumber,
                ceoName: u.corporate.ceoName,
                managerName: u.corporate.managerName,
                managerPhone: u.corporate.managerPhone,
                managerEmail: u.corporate.managerEmail,
                verificationStatus: u.corporate.verificationStatus,
                verificationMethod: u.corporate.verificationMethod,
                bizRegDocPath: u.corporate.bizRegDocPath,
                bizRegDocOrigName: u.corporate.bizRegDocOrigName,
                empCertDocPath: u.corporate.empCertDocPath,
                empCertDocOrigName: u.corporate.empCertDocOrigName,
                isCeoSelf: u.corporate.isCeoSelf,
                ocrVerified: u.corporate.ocrVerified,
                ocrExtractedBizNo: u.corporate.ocrExtractedBizNo,
                isBizVerified: u.corporate.isBizVerified,
                submittedAt: u.corporate.submittedAt?.toISOString() || null,
                approvedAt: u.corporate.approvedAt?.toISOString() || null,
                lastRejectionReason: u.corporate.lastRejectionReason,
              }
            : null,
        };
      }),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  // 프로필 완성도 계산 (0~100%)
  private calcProfileCompletion(profile: any): number {
    let score = 0;
    // 필수 기본 (30%): realName, nationality, birthDate, gender
    const basic = [profile.realName, profile.nationality, profile.birthDate, profile.gender];
    const basicFilled = basic.filter((v) => v && v !== 'UNKNOWN' && v !== '1900-01-01').length;
    score += (basicFilled / 4) * 30;
    // 비자 정보 (20%): visaType, visaExpiryDate
    const visa = [profile.visaType, profile.visaExpiryDate];
    const visaFilled = visa.filter((v) => v && v !== 'PENDING').length;
    score += (visaFilled / 2) * 20;
    // 연락처/주소 (10%): addressRoad
    if (profile.addressRoad) score += 10;
    // 취업 희망 (15%): desiredJobType, desiredSalary, desiredIndustries
    let jobScore = 0;
    if (profile.desiredJobType) jobScore++;
    if (profile.desiredSalary > 0) jobScore++;
    if (profile.desiredIndustries) jobScore++;
    score += (jobScore / 3) * 15;
    // 역량 (15%): finalEducationLvl, koreanFluencyLvl, totalCareerMonths
    let compScore = 0;
    if (profile.finalEducationLvl) compScore++;
    if (profile.koreanFluencyLvl) compScore++;
    if (profile.totalCareerMonths > 0) compScore++;
    score += (compScore / 3) * 15;
    // 프레젠테이션 (10%): profileImageUrl, selfIntro
    let presScore = 0;
    if (profile.profileImageUrl) presScore++;
    if (profile.selfIntro) presScore++;
    score += (presScore / 2) * 10;

    return Math.round(score);
  }

  // --- 헬퍼 메서드 ---

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
    return {
      id: user.id,
      role: this.mapUserRole(user.userType),
      email: user.email || undefined,
      phone: undefined,
      fullName: undefined, // fullName은 User 테이블에서 제거됨
      status: user.isActive ? UserStatus.ACTIVE : UserStatus.INACTIVE,
      isEmailedVerified: true,
      isPhoneVerified: false,
      walletId: undefined,
      createdAt: user.joinedAt.toISOString(),
      updatedAt: user.joinedAt.toISOString(), // updatedAt이 없으므로 joinedAt 사용
    };
  }

  private mapUserRole(role: string): UserRole {
    const roleMap: Record<string, UserRole> = {
      GUEST: UserRole.GUEST,
      MEMBER: UserRole.MEMBER,
      INDIVIDUAL: UserRole.INDIVIDUAL,
      CORPORATE: UserRole.CORPORATE,
      ADMIN: UserRole.ADMIN,
      SUPERADMIN: UserRole.SUPERADMIN,
    };
    return roleMap[role] || UserRole.USER_ROLE_UNSPECIFIED;
  }

  private mapProtoToPrismaSocialProvider(
    protoProvider: ProtoSocialProvider,
  ): PrismaSocialProvider {
    const providerMap: Record<ProtoSocialProvider, PrismaSocialProvider> = {
      [ProtoSocialProvider.NONE]: 'NONE' as PrismaSocialProvider,
      [ProtoSocialProvider.GOOGLE]: 'GOOGLE' as PrismaSocialProvider,
      [ProtoSocialProvider.FACEBOOK]: 'FACEBOOK' as PrismaSocialProvider,
      [ProtoSocialProvider.KAKAO]: 'KAKAO' as PrismaSocialProvider,
      [ProtoSocialProvider.APPLE]: 'APPLE' as PrismaSocialProvider,
      [ProtoSocialProvider.UNRECOGNIZED]: 'NONE' as PrismaSocialProvider,
    };
    return providerMap[protoProvider] || ('NONE' as PrismaSocialProvider);
  }
}
