/**
 * AuthService 단위 테스트 / AuthService unit tests
 *
 * 테스트 범위 / Test coverage:
 * - 회원가입 (register): 성공 + 중복 이메일 충돌
 * - 로그인 (login): 성공 + 잘못된 비밀번호
 * - 계정 잠금 (lockout): 5회 실패 → 잠금, 성공 → 카운터 초기화, 잠금 중 거부
 * - 세션 관리 (session): 슬라이딩 TTL, 최대 동시 세션, 로그아웃
 * - 프로필 (profile): 조회 + 업데이트
 *
 * @lastVerified 2026-03-04
 */
// 생성된 타입 모킹 (jest.mock 호이스팅) / Mock generated type modules (hoisted by jest)
jest.mock(
  'types/auth/auth',
  () => ({
    UserRole: {
      INDIVIDUAL: 'INDIVIDUAL',
      CORPORATE: 'CORPORATE',
      ADMIN: 'ADMIN',
    },
    UserStatus: { ACTIVE: 'ACTIVE', INACTIVE: 'INACTIVE', DELETED: 'DELETED' },
  }),
  { virtual: true },
);

jest.mock(
  'generated/prisma-user',
  () => ({
    SocialProvider: {
      NONE: 'NONE',
      GOOGLE: 'GOOGLE',
      KAKAO: 'KAKAO',
      NAVER: 'NAVER',
      APPLE: 'APPLE',
    },
    UserType: {
      INDIVIDUAL: 'INDIVIDUAL',
      CORPORATE: 'CORPORATE',
      ADMIN: 'ADMIN',
    },
  }),
  { virtual: true },
);

// libs/common barrel 모킹 (uuid ESM 문제 방지) / Mock libs/common barrel to avoid uuid ESM issue
jest.mock('libs/common/src', () => {
  class _AuthPrismaService {}
  class _RedisService {}
  return {
    AuthPrismaService: _AuthPrismaService,
    RedisService: _RedisService,
    SessionData: {},
  };
});

jest.mock('libs/common/src/common/helper/generate-store-token', () => {
  class _GenerateStoreToken {}
  return { GenerateStoreToken: _GenerateStoreToken };
});

jest.mock('../../payment/coupon.service', () => {
  class _CouponService {}
  return { CouponService: _CouponService };
});

import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthPrismaService } from 'libs/common/src';
import { RedisService } from 'libs/common/src';
import { GenerateStoreToken } from 'libs/common/src/common/helper/generate-store-token';
import { CouponService } from '../../payment/coupon.service';

// bcrypt 모듈 모킹 / Mock bcrypt module
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('$2b$10$hashedPassword'),
  compare: jest.fn(),
}));

// crypto 모듈 모킹 / Mock crypto module
jest.mock('crypto', () => ({
  randomBytes: jest.fn().mockReturnValue({
    toString: jest.fn().mockReturnValue('mock-reset-token-hex'),
  }),
}));

// dns/promises 모킹 / Mock DNS resolver
jest.mock('dns/promises', () => ({
  Resolver: jest.fn().mockImplementation(() => ({
    setServers: jest.fn(),
    resolveMx: jest
      .fn()
      .mockResolvedValue([{ exchange: 'mx.example.com', priority: 10 }]),
  })),
}));

// AWS SES 모킹 / Mock AWS SES
jest.mock('@aws-sdk/client-ses', () => ({
  SESClient: jest.fn().mockImplementation(() => ({
    send: jest.fn().mockResolvedValue({}),
  })),
  SendEmailCommand: jest.fn(),
}));

// tesseract 모킹 / Mock tesseract
jest.mock('tesseract.js', () => ({}));

// bcrypt 타입 임포트 / Import bcrypt for type access
import * as bcrypt from 'bcrypt';

/** Prisma user 모의 객체 타입 / Mock Prisma user type */
interface MockUser {
  id: string;
  email: string;
  password: string | null;
  userType: string;
  socialProvider: string;
  socialProviderId: string | null;
  isActive: boolean;
  joinedAt: Date;
  lastLoginAt: Date | null;
  deletedAt: Date | null;
  deleteScheduledAt: Date | null;
  individual: { realName: string; profileImageUrl: string | null } | null;
  corporate: { managerName: string | null } | null;
}

/** 기본 모의 사용자 / Default mock user */
const createMockUser = (overrides?: Partial<MockUser>): MockUser => ({
  id: 'user-uuid-001',
  email: 'test@example.com',
  password: '$2b$10$hashedPassword',
  userType: 'INDIVIDUAL',
  socialProvider: 'NONE',
  socialProviderId: null,
  isActive: true,
  joinedAt: new Date('2026-01-01'),
  lastLoginAt: null,
  deletedAt: null,
  deleteScheduledAt: null,
  individual: { realName: 'Test User', profileImageUrl: null },
  corporate: null,
  ...overrides,
});

describe('AuthService', () => {
  let service: AuthService;

  // 의존성 모의 객체 / Dependency mocks
  const mockPrisma = {
    user: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    individualProfile: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
    corporateProfile: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
    activityLog: {
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  const mockRedisService = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    exists: jest.fn(),
    incr: jest.fn(),
    expire: jest.fn(),
    keys: jest.fn().mockResolvedValue([]),
    zrem: jest.fn(),
    zrange: jest.fn().mockResolvedValue([]),
  };

  const mockGenerateToken = {
    generate: jest.fn().mockResolvedValue('mock-session-id'),
  };

  const mockCouponService = {
    grantWelcomeCoupons: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthPrismaService, useValue: mockPrisma },
        { provide: RedisService, useValue: mockRedisService },
        { provide: GenerateStoreToken, useValue: mockGenerateToken },
        { provide: CouponService, useValue: mockCouponService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  // ============================================================
  // 1. 회원가입 테스트 / Registration tests
  // ============================================================
  describe('register (회원가입)', () => {
    const registerRequest = {
      email: 'new@example.com',
      password: 'Password123!',
      fullName: 'New User',
      role: 'INDIVIDUAL',
    };

    it('성공적으로 개인회원을 등록한다 / should register an individual user successfully', async () => {
      // 인증 티켓이 유효한 상태 / Verification ticket is valid
      mockRedisService.get.mockResolvedValueOnce('true');
      // 활성 계정 없음 / No active account
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);
      // 탈퇴 계정 없음 / No deleted account
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);
      // 트랜잭션 성공 / Transaction succeeds
      mockPrisma.$transaction.mockResolvedValueOnce({
        userId: 'new-user-id',
        userType: 'INDIVIDUAL',
      });
      // 티켓 삭제, 활동 로그 / Delete ticket, activity log
      mockRedisService.del.mockResolvedValue(undefined);
      mockPrisma.activityLog.create.mockResolvedValue({});

      const result = await service.register(registerRequest);

      // 성공 응답 확인 / Verify success response
      expect(result.success).toBe(true);
      expect(result.message).toBe('User registered successfully');
      // 인증 티켓 확인 호출 / Verified ticket check was called
      expect(mockRedisService.get).toHaveBeenCalledWith(
        'verified_ticket:new@example.com',
      );
    });

    it('중복 이메일이면 ConflictException을 던진다 / should throw ConflictException for duplicate email', async () => {
      // 인증 티켓 유효 / Valid ticket
      mockRedisService.get.mockResolvedValueOnce('true');
      // 이미 존재하는 활성 사용자 / Existing active user
      mockPrisma.user.findFirst.mockResolvedValueOnce(
        createMockUser({ userType: 'INDIVIDUAL' }),
      );

      await expect(service.register(registerRequest)).rejects.toThrow(
        ConflictException,
      );
    });

    it('인증 티켓 없으면 BadRequestException을 던진다 / should throw BadRequestException without verification ticket', async () => {
      // 인증 티켓 없음 / No verification ticket
      mockRedisService.get.mockResolvedValueOnce(null);

      await expect(service.register(registerRequest)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('기업 회원 등록 시 환영 쿠폰을 발급한다 / should grant welcome coupons for corporate registration', async () => {
      const corpRequest = {
        ...registerRequest,
        role: 'CORPORATE',
      };
      // 인증 티켓 유효 / Valid ticket
      mockRedisService.get.mockResolvedValueOnce('true');
      // 활성 계정 없음 / No active account
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);
      // 탈퇴 계정 없음 / No deleted account
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);
      // 트랜잭션 성공 (기업 회원) / Transaction succeeds (corporate)
      mockPrisma.$transaction.mockResolvedValueOnce({
        userId: 'corp-user-id',
        userType: 'CORPORATE',
      });
      mockRedisService.del.mockResolvedValue(undefined);
      mockPrisma.activityLog.create.mockResolvedValue({});

      await service.register(corpRequest);

      // 환영 쿠폰 발급 확인 / Verify welcome coupons granted
      expect(mockCouponService.grantWelcomeCoupons).toHaveBeenCalledWith(
        'corp-user-id',
      );
    });
  });

  // ============================================================
  // 2. 로그인 테스트 / Login tests
  // ============================================================
  describe('login (로그인)', () => {
    const loginRequest = {
      email: 'test@example.com',
      password: 'Password123!',
    };

    it('올바른 자격증명으로 로그인 성공한다 / should login successfully with valid credentials', async () => {
      // 잠금 상태 아님 / Not locked out
      mockRedisService.get.mockResolvedValueOnce(null);
      // 사용자 찾기 / Find user
      mockPrisma.user.findFirst.mockResolvedValueOnce(createMockUser());
      // 비밀번호 일치 / Password matches
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
      // 실패 카운터 초기화 / Reset fail counter
      mockRedisService.del.mockResolvedValue(undefined);
      // lastLoginAt 업데이트 / Update lastLoginAt
      mockPrisma.user.update.mockResolvedValue(createMockUser());
      // 세션 데이터 (accessToken 추출용) / Session data for accessToken extraction
      mockRedisService.get.mockResolvedValueOnce(
        JSON.stringify({ userId: 'user-uuid-001', accessToken: 'jwt-token' }),
      );
      // 활동 로그 / Activity log
      mockPrisma.activityLog.create.mockResolvedValue({});

      const result = await service.login(loginRequest);

      expect(result.success).toBe(true);
      expect(result.sessionId).toBe('mock-session-id');
      expect(result.message).toBe('Login successful');
      // 토큰 생성 확인 / Verify token generation
      expect(mockGenerateToken.generate).toHaveBeenCalledWith({
        userId: 'user-uuid-001',
        email: 'test@example.com',
        role: 'INDIVIDUAL',
      });
    });

    it('잘못된 비밀번호로 UnauthorizedException을 던진다 / should throw UnauthorizedException for wrong password', async () => {
      // 잠금 상태 아님 / Not locked out
      mockRedisService.get.mockResolvedValueOnce(null);
      // 사용자 찾기 / Find user
      mockPrisma.user.findFirst.mockResolvedValueOnce(createMockUser());
      // 비밀번호 불일치 / Password does not match
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);
      // 실패 카운터 증가 / Increment fail counter
      mockRedisService.incr.mockResolvedValue(1);
      mockRedisService.expire.mockResolvedValue(undefined);

      await expect(service.login(loginRequest)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('존재하지 않는 사용자로 UnauthorizedException을 던진다 / should throw UnauthorizedException for non-existent user', async () => {
      // 잠금 상태 아님 / Not locked out
      mockRedisService.get.mockResolvedValueOnce(null);
      // 사용자 없음 / User not found
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);
      // 실패 카운터 증가 (존재하지 않는 계정도 동일 처리)
      // Increment fail counter (same timing for non-existent accounts)
      mockRedisService.incr.mockResolvedValue(1);
      mockRedisService.expire.mockResolvedValue(undefined);

      await expect(service.login(loginRequest)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('기업회원 탭에서 개인회원 계정 로그인 시 거부한다 / should reject individual account on company login tab', async () => {
      const companyLoginRequest = {
        ...loginRequest,
        memberType: 'company',
      };
      // 잠금 상태 아님 / Not locked out
      mockRedisService.get.mockResolvedValueOnce(null);
      // 개인회원 계정 / Individual account
      mockPrisma.user.findFirst.mockResolvedValueOnce(
        createMockUser({ userType: 'INDIVIDUAL' }),
      );
      // 비밀번호 일치 / Password matches
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
      // 실패 카운터 초기화 / Reset fail counter
      mockRedisService.del.mockResolvedValue(undefined);

      await expect(service.login(companyLoginRequest)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  // ============================================================
  // 3. 계정 잠금 테스트 / Account lockout tests
  // ============================================================
  describe('계정 잠금 (Account lockout)', () => {
    const loginRequest = {
      email: 'test@example.com',
      password: 'WrongPassword!',
    };

    it('5회 실패 후 계정을 잠근다 / should lock account after 5 failed attempts', async () => {
      // 잠금 상태 아님 / Not locked out
      mockRedisService.get.mockResolvedValueOnce(null);
      // 사용자 찾기 / Find user
      mockPrisma.user.findFirst.mockResolvedValueOnce(createMockUser());
      // 비밀번호 불일치 / Password does not match
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);
      // 실패 카운터가 5에 도달 / Fail counter reaches 5
      mockRedisService.incr.mockResolvedValue(5);
      mockRedisService.set.mockResolvedValue(undefined);
      mockRedisService.del.mockResolvedValue(undefined);

      await expect(service.login(loginRequest)).rejects.toThrow(
        UnauthorizedException,
      );

      // incr 호출 확인 (incrementLoginFailCount 내부) / Verify incr was called
      expect(mockRedisService.incr).toHaveBeenCalledWith(
        'login_fail:test@example.com',
      );
    });

    it('로그인 성공 시 실패 카운터를 초기화한다 / should reset fail counter on successful login', async () => {
      // 잠금 상태 아님 / Not locked out
      mockRedisService.get.mockResolvedValueOnce(null);
      // 사용자 찾기 / Find user
      mockPrisma.user.findFirst.mockResolvedValueOnce(createMockUser());
      // 비밀번호 일치 / Password matches
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
      // 실패 카운터 삭제 / Delete fail counter
      mockRedisService.del.mockResolvedValue(undefined);
      // lastLoginAt 업데이트 / Update lastLoginAt
      mockPrisma.user.update.mockResolvedValue(createMockUser());
      // 세션 데이터 / Session data
      mockRedisService.get.mockResolvedValueOnce(
        JSON.stringify({ userId: 'user-uuid-001', accessToken: 'jwt-token' }),
      );
      mockPrisma.activityLog.create.mockResolvedValue({});

      await service.login({
        email: 'test@example.com',
        password: 'CorrectPassword!',
      });

      // 실패 카운터 삭제 확인 / Verify fail counter was deleted
      expect(mockRedisService.del).toHaveBeenCalledWith(
        'login_fail:test@example.com',
      );
    });

    it('잠금 상태에서 로그인을 거부한다 / should reject login during lockout', async () => {
      // 잠금 상태 / Locked out
      mockRedisService.get.mockResolvedValueOnce('locked');

      await expect(
        service.login({
          email: 'test@example.com',
          password: 'Password123!',
        }),
      ).rejects.toThrow(UnauthorizedException);

      // 사용자 조회가 실행되지 않아야 함 / User lookup should not be called
      expect(mockPrisma.user.findFirst).not.toHaveBeenCalled();
    });
  });

  // ============================================================
  // 4. 세션 관리 테스트 / Session management tests
  // ============================================================
  describe('세션 관리 (Session management)', () => {
    it('유효한 세션으로 프로필 조회 시 세션 데이터를 반환한다 / should return profile with valid session', async () => {
      // 세션 데이터 존재 / Session data exists
      mockRedisService.get.mockResolvedValueOnce(
        JSON.stringify({
          userId: 'user-uuid-001',
          role: 'INDIVIDUAL',
          accessToken: 'jwt',
        }),
      );
      // 사용자 조회 / Find user
      mockPrisma.user.findUnique.mockResolvedValueOnce(createMockUser());

      const result = await service.getProfile('valid-session-id');

      expect(result.success).toBe(true);
      expect(result.message).toBe('Profile retrieved successfully');
    });

    it('만료된 세션으로 프로필 조회 시 UnauthorizedException을 던진다 / should throw UnauthorizedException for expired session', async () => {
      // 세션 데이터 없음 (만료) / No session data (expired)
      mockRedisService.get.mockResolvedValueOnce(null);

      await expect(service.getProfile('expired-session-id')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('로그아웃 시 Redis에서 세션을 삭제한다 / should delete session from Redis on logout', async () => {
      // 세션 존재 확인 / Session exists
      mockRedisService.exists.mockResolvedValueOnce(true);
      // 활동 로그용 세션 데이터 / Session data for activity log
      mockRedisService.get.mockResolvedValueOnce(
        JSON.stringify({ userId: 'user-uuid-001', role: 'INDIVIDUAL' }),
      );
      mockPrisma.activityLog.create.mockResolvedValue({});
      // 두 번째 세션 데이터 조회 (zrem용) / Second session data fetch for zrem
      mockRedisService.get.mockResolvedValueOnce(
        JSON.stringify({ userId: 'user-uuid-001', role: 'INDIVIDUAL' }),
      );
      mockRedisService.zrem.mockResolvedValue(undefined);
      mockRedisService.del.mockResolvedValue(undefined);

      const result = await service.logout('valid-session-id');

      expect(result.success).toBe(true);
      expect(result.message).toBe('Logout successful');
      expect(mockRedisService.del).toHaveBeenCalledWith(
        'session:valid-session-id',
      );
    });

    it('유효하지 않은 세션으로 로그아웃 시 UnauthorizedException을 던진다 / should throw UnauthorizedException for invalid session logout', async () => {
      // 세션 존재하지 않음 / Session does not exist
      mockRedisService.exists.mockResolvedValueOnce(false);

      await expect(service.logout('invalid-session-id')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('활성 세션 목록을 조회한다 / should retrieve active session list', async () => {
      // 현재 세션 ID 추출을 위한 세션 데이터 / Session data for userId extraction
      mockRedisService.get.mockResolvedValueOnce(
        JSON.stringify({ userId: 'user-uuid-001', role: 'INDIVIDUAL' }),
      );
      // sorted set에서 세션 ID 목록 / Session IDs from sorted set
      mockRedisService.zrange.mockResolvedValueOnce([
        'session-1',
        'session-2',
        'session-3',
      ]);
      // 각 세션 존재 여부 / Existence check for each session
      mockRedisService.exists.mockResolvedValueOnce(true);
      mockRedisService.exists.mockResolvedValueOnce(true);
      mockRedisService.exists.mockResolvedValueOnce(false);
      // 만료된 세션 제거 / Remove expired session
      mockRedisService.zrem.mockResolvedValue(undefined);

      const result = await service.getActiveSessions('session-1');

      expect(result.success).toBe(true);
      // 2개 유효 세션 (session-3은 만료) / 2 valid sessions (session-3 expired)
      expect(result.totalCount).toBe(2);
      expect(result.maxAllowed).toBe(3);
    });
  });

  // ============================================================
  // 5. 프로필 테스트 / Profile tests
  // ============================================================
  describe('프로필 (Profile)', () => {
    it('개인 프로필 상세 조회한다 / should retrieve individual profile details', async () => {
      // 세션 데이터 / Session data
      mockRedisService.get.mockResolvedValueOnce(
        JSON.stringify({ userId: 'user-uuid-001', role: 'INDIVIDUAL' }),
      );
      // 사용자 + 프로필 조회 / User + profile lookup
      mockPrisma.user.findUnique.mockResolvedValueOnce(
        createMockUser({
          individual: {
            realName: 'Kim Tester',
            profileImageUrl: 'https://img.example.com/profile.jpg',
          },
        }),
      );

      const result = await service.getProfileDetail('valid-session');

      expect(result.id).toBe('user-uuid-001');
      expect(result.email).toBe('test@example.com');
      expect(result.userType).toBe('INDIVIDUAL');
      expect(result.individual).not.toBeNull();
    });

    it('개인회원 프로필을 업데이트한다 / should update individual profile', async () => {
      // 세션 userId 추출 / Extract userId from session
      mockRedisService.get.mockResolvedValueOnce(
        JSON.stringify({ userId: 'user-uuid-001', role: 'INDIVIDUAL' }),
      );
      // 사용자 조회 / Find user
      mockPrisma.user.findUnique.mockResolvedValueOnce(
        createMockUser({
          individual: { realName: 'Old Name', profileImageUrl: null },
        }),
      );
      // 프로필 업데이트 / Update profile
      mockPrisma.individualProfile.update.mockResolvedValueOnce({});

      const result = await service.updateMyProfile('valid-session', {
        fullName: 'New Name',
        nationality: 'US',
      });

      expect(result.success).toBe(true);
      expect(mockPrisma.individualProfile.update).toHaveBeenCalledWith({
        where: { authId: 'user-uuid-001' },
        data: expect.objectContaining({
          realName: 'New Name',
          nationality: 'US',
        }),
      });
    });

    it('존재하지 않는 사용자의 프로필 업데이트 시 NotFoundException을 던진다 / should throw NotFoundException for non-existent user profile update', async () => {
      // 세션 userId 추출 / Extract userId from session
      mockRedisService.get.mockResolvedValueOnce(
        JSON.stringify({ userId: 'nonexistent-id', role: 'INDIVIDUAL' }),
      );
      // 사용자 없음 / User not found
      mockPrisma.user.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.updateMyProfile('valid-session', { fullName: 'Test' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('기업회원 프로필을 업데이트한다 / should update corporate profile', async () => {
      // 세션 userId 추출 / Extract userId from session
      mockRedisService.get.mockResolvedValueOnce(
        JSON.stringify({ userId: 'corp-user-id', role: 'CORPORATE' }),
      );
      // 기업 사용자 조회 / Find corporate user
      mockPrisma.user.findUnique.mockResolvedValueOnce(
        createMockUser({
          id: 'corp-user-id',
          userType: 'CORPORATE',
          individual: null,
          corporate: { managerName: 'Old Manager' },
        }),
      );
      // 프로필 업데이트 / Update profile
      mockPrisma.corporateProfile.update.mockResolvedValueOnce({});

      const result = await service.updateMyProfile('valid-session', {
        fullName: 'New Manager',
      });

      expect(result.success).toBe(true);
      expect(mockPrisma.corporateProfile.update).toHaveBeenCalledWith({
        where: { authId: 'corp-user-id' },
        data: expect.objectContaining({
          managerName: 'New Manager',
        }),
      });
    });
  });

  // ============================================================
  // 6. 비밀번호 초기화 테스트 / Password reset tests
  // ============================================================
  describe('비밀번호 초기화 (Password reset)', () => {
    it('존재하는 이메일 계정에 대해 비밀번호 초기화 이메일을 발송한다 / should send password reset email for existing email account', async () => {
      // 사용자 존재 / User exists
      mockPrisma.user.findFirst.mockResolvedValueOnce(createMockUser());
      // 토큰 저장 / Store token
      mockRedisService.set.mockResolvedValue(undefined);
      // 활동 로그 / Activity log
      mockPrisma.activityLog.create.mockResolvedValue({});

      const result = await service.requestPasswordReset('test@example.com');

      expect(result.message).toContain('이메일이 발송되었습니다');
      // Redis에 리셋 토큰 저장 확인 / Verify reset token stored in Redis
      expect(mockRedisService.set).toHaveBeenCalledWith(
        expect.stringContaining('pw_reset:'),
        'user-uuid-001',
        3600,
      );
    });

    it('존재하지 않는 이메일에 대해 NotFoundException을 던진다 / should throw NotFoundException for non-existent email', async () => {
      mockPrisma.user.findFirst.mockResolvedValueOnce(null);

      await expect(
        service.requestPasswordReset('nobody@example.com'),
      ).rejects.toThrow(NotFoundException);
    });

    it('소셜 로그인 계정은 비밀번호 초기화를 거부한다 / should reject password reset for social login accounts', async () => {
      mockPrisma.user.findFirst.mockResolvedValueOnce(
        createMockUser({ socialProvider: 'GOOGLE' }),
      );

      await expect(
        service.requestPasswordReset('social@example.com'),
      ).rejects.toThrow(BadRequestException);
    });

    it('유효한 토큰으로 비밀번호를 초기화한다 / should reset password with valid token', async () => {
      // 토큰에서 userId 조회 / Get userId from token
      mockRedisService.get.mockResolvedValueOnce('user-uuid-001');
      // 사용자 조회 / Find user
      mockPrisma.user.findUnique.mockResolvedValueOnce(createMockUser());
      // 비밀번호 업데이트 / Update password
      mockPrisma.user.update.mockResolvedValue(createMockUser());
      // 토큰 삭제 / Delete token
      mockRedisService.del.mockResolvedValue(undefined);
      // 세션 무효화 / Invalidate sessions
      mockRedisService.keys.mockResolvedValueOnce([]);
      // 활동 로그 / Activity log
      mockPrisma.activityLog.create.mockResolvedValue({});

      const result = await service.resetPassword(
        'valid-token',
        'NewPassword123!',
      );

      expect(result.success).toBe(true);
      expect(mockRedisService.del).toHaveBeenCalledWith('pw_reset:valid-token');
    });

    it('만료된 토큰으로 비밀번호 초기화 시 BadRequestException을 던진다 / should throw BadRequestException for expired token', async () => {
      mockRedisService.get.mockResolvedValueOnce(null);

      await expect(
        service.resetPassword('expired-token', 'NewPassword123!'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  // ============================================================
  // 7. 비밀번호 변경 테스트 / Password change tests
  // ============================================================
  describe('비밀번호 변경 (changePassword)', () => {
    it('올바른 현재 비밀번호로 비밀번호를 변경한다 / should change password with correct current password', async () => {
      // 세션에서 userId 추출 / Extract userId from session
      mockRedisService.get.mockResolvedValueOnce(
        JSON.stringify({ userId: 'user-uuid-001', role: 'INDIVIDUAL' }),
      );
      // 사용자 조회 / Find user
      mockPrisma.user.findUnique.mockResolvedValueOnce(createMockUser());
      // 현재 비밀번호 일치 / Current password matches
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
      // 비밀번호 업데이트 / Update password
      mockPrisma.user.update.mockResolvedValue(createMockUser());
      // 다른 세션 무효화 / Invalidate other sessions
      mockRedisService.keys.mockResolvedValueOnce([]);
      // 활동 로그 / Activity log
      mockPrisma.activityLog.create.mockResolvedValue({});

      const result = await service.changePassword(
        'valid-session',
        'OldPassword!',
        'NewPassword!',
      );

      expect(result.success).toBe(true);
    });

    it('잘못된 현재 비밀번호로 BadRequestException을 던진다 / should throw BadRequestException for wrong current password', async () => {
      // 세션에서 userId 추출 / Extract userId from session
      mockRedisService.get.mockResolvedValueOnce(
        JSON.stringify({ userId: 'user-uuid-001', role: 'INDIVIDUAL' }),
      );
      // 사용자 조회 / Find user
      mockPrisma.user.findUnique.mockResolvedValueOnce(createMockUser());
      // 현재 비밀번호 불일치 / Current password does not match
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

      await expect(
        service.changePassword(
          'valid-session',
          'WrongPassword!',
          'NewPassword!',
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  // ============================================================
  // 8. 회원 탈퇴 테스트 / Account deletion tests
  // ============================================================
  describe('회원 탈퇴 (requestAccountDeletion)', () => {
    it('소프트 삭제를 수행하고 90일 후 완전 삭제를 예약한다 / should perform soft delete and schedule full deletion after 90 days', async () => {
      // 세션에서 userId 추출 / Extract userId from session
      mockRedisService.get.mockResolvedValueOnce(
        JSON.stringify({ userId: 'user-uuid-001', role: 'INDIVIDUAL' }),
      );
      // 사용자 조회 / Find user
      mockPrisma.user.findUnique.mockResolvedValueOnce(createMockUser());
      // 사용자 업데이트 / Update user
      mockPrisma.user.update.mockResolvedValue(createMockUser());
      // 세션 삭제 / Delete session
      mockRedisService.del.mockResolvedValue(undefined);
      // 활동 로그 / Activity log
      mockPrisma.activityLog.create.mockResolvedValue({});

      const result = await service.requestAccountDeletion('valid-session');

      expect(result.success).toBe(true);
      expect(mockPrisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'user-uuid-001' },
          data: expect.objectContaining({
            isActive: false,
            deletedAt: expect.any(Date),
            deleteScheduledAt: expect.any(Date),
          }),
        }),
      );
    });
  });
});
