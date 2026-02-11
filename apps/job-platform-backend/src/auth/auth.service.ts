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
      const adminPassword = 'dlaqpelem1!';

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
          '[Admin] ✅ 관리자 계정이 생성되었습니다. (admin / dlaqpelem1!)',
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
          // 기업 회원: profiles_corporate 생성 (필수 필드만)
          await prisma.corporateProfile.create({
            data: {
              authId: newUser.id,
              bizRegNumber: 'PENDING', // 임시값 (나중에 사업자 인증에서 입력)
              companyNameOfficial: fullName || '회사명 미입력',
              ceoName: 'PENDING', // 임시값
              managerName: fullName || '담당자명 미입력',
              managerPhone: 'PENDING', // 임시값
              managerEmail: email,
              ksicCode: 'PENDING', // 임시값
              addressRoad: 'PENDING', // 임시값
              verificationStatus: 'PENDING', // 검증 대기 상태
            },
          });
        }
      });

      // 6. 인증 티켓 삭제
      await this.redisService.del(`verified_ticket:${email}`);

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
              bizRegNumber: 'PENDING',
              companyNameOfficial: fullName || '회사명 미입력',
              ceoName: 'PENDING',
              managerName: fullName || '담당자명 미입력',
              managerPhone: 'PENDING',
              managerEmail: email,
              ksicCode: 'PENDING',
              addressRoad: 'PENDING',
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

    // 공고 수 통계 (Job DB는 별도 모듈이므로 추후 연동)
    const totalJobPostings = 0;
    const partTimePostings = 0;
    const fullTimePostings = 0;

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
