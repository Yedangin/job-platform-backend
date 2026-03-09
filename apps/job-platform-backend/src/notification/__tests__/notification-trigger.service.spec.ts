/**
 * NotificationTriggerService 단위 테스트 / NotificationTriggerService unit tests
 *
 * 테스트 범위 / Test coverage:
 * - 알림 생성 (fire): DB 기록 + gRPC 발송
 * - 사용자 설정 존중: 이메일 수신 거부, 마케팅 미동의
 * - 다수 사용자 발송 (fireToMany): 성공/실패 카운트
 * - 이벤트 카탈로그 조회 (getEventCatalog)
 * - 알 수 없는 이벤트 코드 처리
 * - 채널 결정 로직
 *
 * @lastVerified 2026-03-04
 */
// 생성된 타입 모킹 (jest.mock 호이스팅) / Mock generated type modules (hoisted by jest)
jest.mock(
  'types/notification/notification',
  () => ({
    NOTIFICATION_PACKAGE_NAME: 'NOTIFICATION_PACKAGE_NAME',
    NOTIFICATION_SERVICE_NAME: 'NotificationService',
  }),
  { virtual: true },
);

// libs/common barrel 모킹 (uuid ESM 문제 방지) / Mock libs/common barrel to avoid uuid ESM issue
jest.mock('libs/common/src', () => {
  class _AuthPrismaService {}
  return { AuthPrismaService: _AuthPrismaService };
});

import { Test, TestingModule } from '@nestjs/testing';
import { NotificationTriggerService } from '../notification-trigger.service';
import { AuthPrismaService } from 'libs/common/src';
import { NOTIFICATION_PACKAGE_NAME } from 'types/notification/notification';
import { of } from 'rxjs';

/** gRPC 알림 서비스 모의 객체 타입 / Mock gRPC notification service client type */
interface MockNotificationServiceClient {
  sendNotification: jest.Mock;
}

/** Prisma user 모의 객체 타입 / Mock Prisma user type for notification context */
interface MockNotifUser {
  email: string;
  notifEmail: boolean;
  marketingConsent: boolean;
}

/** 기본 모의 사용자 생성 / Create default mock user for notifications */
const createMockNotifUser = (
  overrides?: Partial<MockNotifUser>,
): MockNotifUser => ({
  email: 'worker@example.com',
  notifEmail: true,
  marketingConsent: true,
  ...overrides,
});

describe('NotificationTriggerService', () => {
  let service: NotificationTriggerService;

  // gRPC 모의 객체 / gRPC mock
  const mockNotificationServiceClient: MockNotificationServiceClient = {
    sendNotification: jest.fn(),
  };

  // gRPC 클라이언트 모의 객체 / gRPC client mock
  const mockGrpcClient = {
    getService: jest.fn().mockReturnValue(mockNotificationServiceClient),
  };

  // Prisma 모의 객체 / Prisma mock
  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationTriggerService,
        { provide: NOTIFICATION_PACKAGE_NAME, useValue: mockGrpcClient },
        { provide: AuthPrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<NotificationTriggerService>(
      NotificationTriggerService,
    );

    // onModuleInit 수동 호출 (gRPC 서비스 초기화)
    // Manually call onModuleInit to initialize gRPC service
    service.onModuleInit();
  });

  // ============================================================
  // 1. 알림 발송 (fire) 테스트 / Notification fire tests
  // ============================================================
  describe('fire (알림 발송)', () => {
    it('유효한 이벤트 코드로 DB 알림을 생성하고 gRPC로 발송한다 / should create DB notification and send via gRPC with valid event code', async () => {
      // 사용자 조회 / Find user
      mockPrisma.user.findUnique.mockResolvedValueOnce(createMockNotifUser());
      // gRPC 발송 성공 / gRPC send success
      mockNotificationServiceClient.sendNotification.mockReturnValueOnce(
        of({ success: true, message: 'Sent' }),
      );

      const result = await service.fire('N-01', 'user-001', {
        companyName: 'ABC Corp',
      });

      // 성공 확인 / Verify success
      expect(result.success).toBe(true);
      // gRPC 호출 확인 / Verify gRPC was called
      expect(
        mockNotificationServiceClient.sendNotification,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-001',
          notificationType: 'CORP_VERIFY_SUBMITTED',
          channel: 'BOTH',
        }),
      );
    });

    it('알 수 없는 이벤트 코드는 실패를 반환한다 / should return failure for unknown event code', async () => {
      const result = await service.fire('N-99', 'user-001');

      expect(result.success).toBe(false);
      expect(result.message).toContain('Unknown event code');
      // gRPC 호출 안 됨 / gRPC should not be called
      expect(
        mockNotificationServiceClient.sendNotification,
      ).not.toHaveBeenCalled();
    });

    it('사용자를 찾을 수 없어도 gRPC 발송을 시도한다 / should attempt gRPC send even if user not found', async () => {
      // 사용자 없음 / User not found
      mockPrisma.user.findUnique.mockResolvedValueOnce(null);
      // gRPC 발송 성공 / gRPC send success
      mockNotificationServiceClient.sendNotification.mockReturnValueOnce(
        of({ success: true, message: 'Sent' }),
      );

      const result = await service.fire('N-01', 'nonexistent-user');

      expect(result.success).toBe(true);
      // gRPC 호출 시 email은 undefined / Email should be undefined in gRPC call
      expect(
        mockNotificationServiceClient.sendNotification,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'nonexistent-user',
        }),
      );
    });

    it('gRPC 오류 시 실패를 반환한다 / should return failure on gRPC error', async () => {
      // 사용자 조회 / Find user
      mockPrisma.user.findUnique.mockResolvedValueOnce(createMockNotifUser());
      // gRPC 발송 실패 / gRPC send fails
      mockNotificationServiceClient.sendNotification.mockReturnValueOnce(
        of({ success: false, message: 'gRPC error' }),
      );

      const result = await service.fire('N-01', 'user-001');

      expect(result.success).toBe(false);
    });

    it('gRPC 예외 발생 시 실패를 반환한다 / should return failure on gRPC exception', async () => {
      // 사용자 조회 / Find user
      mockPrisma.user.findUnique.mockResolvedValueOnce(createMockNotifUser());
      // gRPC 예외 / gRPC throws exception
      mockNotificationServiceClient.sendNotification.mockImplementationOnce(
        () => {
          throw new Error('Connection refused');
        },
      );

      const result = await service.fire('N-01', 'user-001');

      expect(result.success).toBe(false);
      expect(result.message).toContain('Connection refused');
    });
  });

  // ============================================================
  // 2. 마케팅 동의 및 채널 결정 테스트 / Marketing consent and channel tests
  // ============================================================
  describe('마케팅 동의 존중 (Marketing consent respect)', () => {
    it('마케팅 미동의 시 PLATFORM 채널로만 발송한다 / should send only via PLATFORM when marketing not consented', async () => {
      // 마케팅 미동의 사용자 / User without marketing consent
      mockPrisma.user.findUnique.mockResolvedValueOnce(
        createMockNotifUser({ marketingConsent: false }),
      );
      // gRPC 발송 성공 / gRPC send success
      mockNotificationServiceClient.sendNotification.mockReturnValueOnce(
        of({ success: true, message: 'Sent' }),
      );

      // N-32는 마케팅 동의 필요 이벤트 / N-32 requires marketing consent
      await service.fire('N-32', 'user-001', { couponName: 'Test Coupon' });

      // PLATFORM 채널로 발송 확인 / Verify sent via PLATFORM channel
      expect(
        mockNotificationServiceClient.sendNotification,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          channel: 'PLATFORM',
        }),
      );
    });

    it('마케팅 동의 시 기본 채널(BOTH)로 발송한다 / should send via default channel (BOTH) when marketing consented', async () => {
      // 마케팅 동의 사용자 / User with marketing consent
      mockPrisma.user.findUnique.mockResolvedValueOnce(
        createMockNotifUser({ marketingConsent: true }),
      );
      // gRPC 발송 성공 / gRPC send success
      mockNotificationServiceClient.sendNotification.mockReturnValueOnce(
        of({ success: true, message: 'Sent' }),
      );

      await service.fire('N-32', 'user-001', { couponName: 'Test Coupon' });

      expect(
        mockNotificationServiceClient.sendNotification,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          channel: 'BOTH',
        }),
      );
    });
  });

  // ============================================================
  // 3. 이메일 수신 거부 테스트 / Email opt-out tests
  // ============================================================
  describe('이메일 수신 거부 (Email opt-out)', () => {
    it('이메일 수신 거부 + EMAIL 전용 채널이면 PLATFORM으로 대체한다 / should fallback to PLATFORM when email disabled and channel is EMAIL only', async () => {
      // 이메일 수신 거부 사용자 / User with email disabled
      mockPrisma.user.findUnique.mockResolvedValueOnce(
        createMockNotifUser({ notifEmail: false }),
      );
      // gRPC 발송 성공 / gRPC send success
      mockNotificationServiceClient.sendNotification.mockReturnValueOnce(
        of({ success: true, message: 'Sent' }),
      );

      // N-08은 EMAIL 전용 채널 / N-08 has EMAIL-only channel
      await service.fire('N-08', 'user-001');

      // PLATFORM으로 대체 확인 / Verify fallback to PLATFORM
      expect(
        mockNotificationServiceClient.sendNotification,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          channel: 'PLATFORM',
        }),
      );
    });

    it('이메일 수신 거부 + BOTH 채널이면 BOTH를 유지한다 / should keep BOTH channel even when email disabled', async () => {
      // BOTH 채널은 이메일 수신 거부와 관계없이 유지
      // BOTH channel is kept regardless of email opt-out
      mockPrisma.user.findUnique.mockResolvedValueOnce(
        createMockNotifUser({ notifEmail: false }),
      );
      mockNotificationServiceClient.sendNotification.mockReturnValueOnce(
        of({ success: true, message: 'Sent' }),
      );

      // N-01은 BOTH 채널 / N-01 has BOTH channel
      await service.fire('N-01', 'user-001');

      expect(
        mockNotificationServiceClient.sendNotification,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          channel: 'BOTH',
        }),
      );
    });
  });

  // ============================================================
  // 4. 다수 사용자 발송 테스트 / Fire to many users tests
  // ============================================================
  describe('fireToMany (다수 사용자 발송)', () => {
    it('다수 사용자에게 알림을 발송하고 성공/실패를 카운트한다 / should send to multiple users and count success/failure', async () => {
      // 첫 번째 사용자: 성공 / First user: success
      mockPrisma.user.findUnique.mockResolvedValueOnce(createMockNotifUser());
      mockNotificationServiceClient.sendNotification.mockReturnValueOnce(
        of({ success: true, message: 'Sent' }),
      );

      // 두 번째 사용자: 실패 / Second user: failure
      mockPrisma.user.findUnique.mockResolvedValueOnce(createMockNotifUser());
      mockNotificationServiceClient.sendNotification.mockReturnValueOnce(
        of({ success: false, message: 'Failed' }),
      );

      // 세 번째 사용자: 성공 / Third user: success
      mockPrisma.user.findUnique.mockResolvedValueOnce(createMockNotifUser());
      mockNotificationServiceClient.sendNotification.mockReturnValueOnce(
        of({ success: true, message: 'Sent' }),
      );

      const result = await service.fireToMany('N-01', [
        'user-001',
        'user-002',
        'user-003',
      ]);

      expect(result.sent).toBe(2);
      expect(result.failed).toBe(1);
    });

    it('빈 사용자 배열이면 0/0을 반환한다 / should return 0/0 for empty user array', async () => {
      const result = await service.fireToMany('N-01', []);

      expect(result.sent).toBe(0);
      expect(result.failed).toBe(0);
    });
  });

  // ============================================================
  // 5. 이벤트 카탈로그 조회 테스트 / Event catalog tests
  // ============================================================
  describe('getEventCatalog (이벤트 카탈로그)', () => {
    it('전체 이벤트 카탈로그를 반환한다 / should return the complete event catalog', () => {
      const catalog = service.getEventCatalog();

      // N-01 ~ N-33까지 존재 확인 / Verify N-01 to N-33 exist
      expect(catalog['N-01']).toBeDefined();
      expect(catalog['N-01'].notificationType).toBe('CORP_VERIFY_SUBMITTED');
      expect(catalog['N-33']).toBeDefined();
      expect(catalog['N-33'].notificationType).toBe('GENERAL_COUPON_EXPIRY');
    });

    it('원본 카탈로그의 복사본을 반환한다 (불변성) / should return a copy of the catalog (immutability)', () => {
      const catalog1 = service.getEventCatalog();
      const catalog2 = service.getEventCatalog();

      // 같은 내용이지만 다른 객체 / Same content but different object
      expect(catalog1).toEqual(catalog2);
      expect(catalog1).not.toBe(catalog2);
    });
  });

  // ============================================================
  // 6. 옵션 전달 테스트 / Options passthrough tests
  // ============================================================
  describe('fire options (발송 옵션)', () => {
    it('옵션의 email이 사용자 email보다 우선한다 / should prefer options email over user email', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce(
        createMockNotifUser({ email: 'original@example.com' }),
      );
      mockNotificationServiceClient.sendNotification.mockReturnValueOnce(
        of({ success: true, message: 'Sent' }),
      );

      await service.fire(
        'N-01',
        'user-001',
        {},
        {
          email: 'override@example.com',
        },
      );

      expect(
        mockNotificationServiceClient.sendNotification,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'override@example.com',
        }),
      );
    });

    it('priority와 relatedJobPostId 옵션을 전달한다 / should pass priority and relatedJobPostId options', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce(createMockNotifUser());
      mockNotificationServiceClient.sendNotification.mockReturnValueOnce(
        of({ success: true, message: 'Sent' }),
      );

      await service.fire(
        'N-21',
        'user-001',
        { title: 'Backend Dev' },
        {
          priority: 1,
          relatedJobPostId: 'job-123',
        },
      );

      expect(
        mockNotificationServiceClient.sendNotification,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          priority: 1,
          relatedJobPostId: 'job-123',
        }),
      );
    });
  });

  // ============================================================
  // 7. 콘텐츠 생성 테스트 / Content generation tests
  // ============================================================
  describe('콘텐츠 생성 (Content generation)', () => {
    it('변수를 치환하여 알림 콘텐츠를 생성한다 / should interpolate variables in notification content', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce(createMockNotifUser());
      mockNotificationServiceClient.sendNotification.mockReturnValueOnce(
        of({ success: true, message: 'Sent' }),
      );

      await service.fire('N-21', 'user-001', { title: 'Backend Developer' });

      // gRPC 호출에서 content에 title이 포함되었는지 확인
      // Verify the content in the gRPC call includes the title
      expect(
        mockNotificationServiceClient.sendNotification,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.stringContaining('Backend Developer'),
        }),
      );
    });
  });
});
