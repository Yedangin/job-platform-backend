/**
 * JobApplicationService 단위 테스트 / JobApplicationService unit tests
 *
 * 테스트 범위 / Test coverage:
 * - 지원 생성 (applyToJob): 성공 + 중복 지원 방지
 * - 상태 변경 (updateApplicationStatus): PENDING→REVIEWING, REVIEWING→ACCEPTED, →REJECTED
 * - 최종 합격 처리 (FINAL_ACCEPTED): 채용확정 기록 생성 + 비자 시나리오 판별
 * - 지원 취소 (cancelApplication): 성공 + 확정 상태 취소 방지
 * - 내 지원 목록 조회 (getMyApplications)
 *
 * @lastVerified 2026-03-04
 */
// libs/common barrel 모킹 (uuid ESM 문제 방지) / Mock libs/common barrel to avoid uuid ESM issue
jest.mock('libs/common/src', () => {
  class _AuthPrismaService {}
  class _NotificationPrismaService {}
  class _RedisService {}
  return {
    AuthPrismaService: _AuthPrismaService,
    NotificationPrismaService: _NotificationPrismaService,
    RedisService: _RedisService,
  };
});

// 생성된 Prisma 타입 모킹 / Mock generated Prisma types
jest.mock('generated/prisma-notification', () => ({
  NotificationType: {
    APPLICATION_STATUS: 'APPLICATION_STATUS',
    NEW_APPLICATION: 'NEW_APPLICATION',
    INTERVIEW: 'INTERVIEW',
    SYSTEM: 'SYSTEM',
  },
}), { virtual: true });

// AWS SES 모킹 / Mock AWS SES
jest.mock('@aws-sdk/client-ses', () => ({
  SESClient: jest.fn().mockImplementation(() => ({
    send: jest.fn().mockResolvedValue({}),
  })),
  SendEmailCommand: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import {
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { JobApplicationService } from '../job-application.service';
import {
  AuthPrismaService,
  NotificationPrismaService,
  RedisService,
} from 'libs/common/src';
import { VisaScenarioService } from '../visa-scenario.service';

/** 모의 공고 타입 / Mock job posting type */
interface MockJobPosting {
  id: bigint;
  title: string;
  status: string;
  corporateId: bigint;
  applicationMethod: string;
  allowedVisas: string | null;
  displayAddress: string;
  boardType: string;
  tierType: string;
  applyCount: number;
}

/** 모의 지원서 타입 / Mock application type */
interface MockApplication {
  id: bigint;
  jobId: bigint;
  applicantId: string;
  status: string;
  applicationMethod: string;
  coverLetter: string | null;
  resumeSnapshot: string | null;
  selfReportedAt: Date | null;
  interviewDate: Date | null;
  interviewNote: string | null;
  rejectionReason: string | null;
  resultNotifiedAt: Date | null;
  createdAt: Date;
  visaGuideScenario: string | null;
  visaGuideGeneratedAt: Date | null;
  interviewMethod: string | null;
  interviewFirstChoice: Date | null;
  interviewSecondChoice: Date | null;
  interviewLocation: string | null;
  interviewLink: string | null;
  interviewDirections: string | null;
  interviewWhatToBring: string | null;
  proposedBy: string | null;
  proposedTime: Date | null;
  cancelReason: string | null;
  cancelledBy: string | null;
  cancelledAt: Date | null;
  job: MockJobPosting;
}

/** 기본 모의 공고 생성 / Create default mock job posting */
const createMockJob = (overrides?: Partial<MockJobPosting>): MockJobPosting => ({
  id: BigInt(100),
  title: 'Backend Developer',
  status: 'ACTIVE',
  corporateId: BigInt(500),
  applicationMethod: 'PLATFORM',
  allowedVisas: 'E-7,D-10',
  displayAddress: 'Seoul, Korea',
  boardType: 'FULLTIME',
  tierType: 'STANDARD',
  applyCount: 5,
  ...overrides,
});

/** 기본 모의 지원서 생성 / Create default mock application */
const createMockApplication = (
  overrides?: Partial<MockApplication>,
): MockApplication => ({
  id: BigInt(1),
  jobId: BigInt(100),
  applicantId: 'applicant-001',
  status: 'PENDING',
  applicationMethod: 'PLATFORM',
  coverLetter: 'I am a great fit!',
  resumeSnapshot: null,
  selfReportedAt: null,
  interviewDate: null,
  interviewNote: null,
  rejectionReason: null,
  resultNotifiedAt: null,
  createdAt: new Date('2026-03-01'),
  visaGuideScenario: null,
  visaGuideGeneratedAt: null,
  interviewMethod: null,
  interviewFirstChoice: null,
  interviewSecondChoice: null,
  interviewLocation: null,
  interviewLink: null,
  interviewDirections: null,
  interviewWhatToBring: null,
  proposedBy: null,
  proposedTime: null,
  cancelReason: null,
  cancelledBy: null,
  cancelledAt: null,
  job: createMockJob(),
  ...overrides,
});

describe('JobApplicationService', () => {
  let service: JobApplicationService;

  // Prisma 모의 객체 (AuthPrismaService) / Prisma mock
  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
    },
    jobPosting: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    jobApplication: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
    individualProfile: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    corporateProfile: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    interviewSlot: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    jobScrap: {
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  // NotificationPrismaService 모의 객체 / Notification Prisma mock
  const mockNotificationPrisma = {
    notification: {
      create: jest.fn(),
    },
  };

  // Redis 모의 객체 / Redis mock
  const mockRedis = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  // VisaScenarioService 모의 객체 / Visa scenario service mock
  const mockVisaScenarioService = {
    determineScenario: jest.fn(),
    generateChecklist: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobApplicationService,
        { provide: AuthPrismaService, useValue: mockPrisma },
        { provide: NotificationPrismaService, useValue: mockNotificationPrisma },
        { provide: RedisService, useValue: mockRedis },
        { provide: VisaScenarioService, useValue: mockVisaScenarioService },
      ],
    }).compile();

    service = module.get<JobApplicationService>(JobApplicationService);
  });

  // ============================================================
  // 1. 지원하기 테스트 / Apply to job tests
  // ============================================================
  describe('applyToJob (지원하기)', () => {
    it('성공적으로 지원서를 생성한다 / should create application successfully', async () => {
      // 개인회원 확인 / Validate INDIVIDUAL user
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'applicant-001',
        userType: 'INDIVIDUAL',
      });
      // 공고 확인 / Validate job posting
      mockPrisma.jobPosting.findUnique.mockResolvedValueOnce(createMockJob());
      // 중복 지원 없음 / No duplicate application
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(null);
      // 프로필 조회 (이력서 스냅샷용) / Profile lookup for resume snapshot
      mockPrisma.individualProfile.findUnique.mockResolvedValueOnce({
        realName: 'Kim Tester',
        nationality: 'US',
        visaType: 'E-7',
        visaExpiryDate: new Date('2027-01-01'),
        educations: [],
        careers: [],
        languages: [],
        selfIntro: 'Hello!',
      });
      // 지원서 생성 / Create application
      mockPrisma.jobApplication.create.mockResolvedValueOnce({
        id: BigInt(1),
        status: 'PENDING',
        applicationMethod: 'PLATFORM',
      });
      // 지원수 증가 / Increment apply count
      mockPrisma.jobPosting.update.mockResolvedValueOnce({});

      const result = await service.applyToJob('applicant-001', '100', {
        coverLetter: 'I am a great fit!',
      });

      expect(result.applicationId).toBe('1');
      expect(result.status).toBe('PENDING');
      expect(result.applicationMethod).toBe('PLATFORM');
      // 지원수 증가 확인 / Verify apply count was incremented
      expect(mockPrisma.jobPosting.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { applyCount: { increment: 1 } },
        }),
      );
    });

    it('중복 지원 시 ConflictException을 던진다 / should throw ConflictException for duplicate application', async () => {
      // 개인회원 확인 / Validate INDIVIDUAL user
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'applicant-001',
        userType: 'INDIVIDUAL',
      });
      // 공고 확인 / Validate job posting
      mockPrisma.jobPosting.findUnique.mockResolvedValueOnce(createMockJob());
      // 이미 지원한 공고 / Already applied
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(
        createMockApplication(),
      );

      await expect(
        service.applyToJob('applicant-001', '100', {
          coverLetter: 'Apply again!',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('기업회원이 지원하면 ForbiddenException을 던진다 / should throw ForbiddenException for corporate user applying', async () => {
      // 기업회원 / Corporate user
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'corp-user',
        userType: 'CORPORATE',
      });

      await expect(
        service.applyToJob('corp-user', '100', {}),
      ).rejects.toThrow(ForbiddenException);
    });

    it('비활성 공고에 지원하면 BadRequestException을 던진다 / should throw BadRequestException for inactive job posting', async () => {
      // 개인회원 / Individual user
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'applicant-001',
        userType: 'INDIVIDUAL',
      });
      // 비활성 공고 / Inactive job
      mockPrisma.jobPosting.findUnique.mockResolvedValueOnce(
        createMockJob({ status: 'EXPIRED' }),
      );

      await expect(
        service.applyToJob('applicant-001', '100', {}),
      ).rejects.toThrow(BadRequestException);
    });

    it('존재하지 않는 사용자는 NotFoundException을 던진다 / should throw NotFoundException for non-existent user', async () => {
      // 사용자 없음 / User not found
      mockPrisma.user.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.applyToJob('ghost-user', '100', {}),
      ).rejects.toThrow(NotFoundException);
    });

    it('존재하지 않는 공고는 NotFoundException을 던진다 / should throw NotFoundException for non-existent job', async () => {
      // 개인회원 / Individual user
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'applicant-001',
        userType: 'INDIVIDUAL',
      });
      // 공고 없음 / Job not found
      mockPrisma.jobPosting.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.applyToJob('applicant-001', '999', {}),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ============================================================
  // 2. 상태 변경 테스트 / Status transition tests
  // ============================================================
  describe('updateApplicationStatus (상태 변경)', () => {
    const corpUserId = 'corp-user-001';

    /** 기업 소유권 설정 헬퍼 / Helper to set up corporate ownership */
    const setupCorporateOwnership = () => {
      mockPrisma.corporateProfile.findUnique.mockResolvedValueOnce({
        authId: corpUserId,
        companyId: BigInt(500),
        companyNameOfficial: 'Test Corp',
      });
    };

    it('PENDING → REVIEWING 상태 전이에 성공한다 / should transition PENDING → REVIEWING successfully', async () => {
      // 지원서 조회 (PENDING 상태) / Find application in PENDING status
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(
        createMockApplication({ status: 'PENDING' }),
      );
      // 소유권 확인 / Validate ownership
      setupCorporateOwnership();
      // 업데이트 성공 / Update succeeds
      mockPrisma.jobApplication.update.mockResolvedValueOnce({
        ...createMockApplication(),
        status: 'REVIEWING',
      });

      const result = await service.updateApplicationStatus(corpUserId, '1', {
        status: 'REVIEWING',
      });

      expect(result.success).toBe(true);
      expect(result.status).toBe('REVIEWING');
    });

    it('REVIEWING → ACCEPTED 상태 전이에 성공한다 / should transition REVIEWING → ACCEPTED successfully', async () => {
      // 지원서 조회 (REVIEWING 상태) / Find application in REVIEWING status
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(
        createMockApplication({ status: 'REVIEWING' }),
      );
      // 소유권 확인 / Validate ownership
      setupCorporateOwnership();
      // 업데이트 성공 / Update succeeds
      mockPrisma.jobApplication.update.mockResolvedValueOnce({
        ...createMockApplication(),
        status: 'ACCEPTED',
      });

      const result = await service.updateApplicationStatus(corpUserId, '1', {
        status: 'ACCEPTED',
      });

      expect(result.success).toBe(true);
      expect(result.status).toBe('ACCEPTED');
    });

    it('PENDING → REJECTED 상태 전이에 성공한다 / should transition PENDING → REJECTED successfully', async () => {
      // 지원서 조회 (PENDING 상태) / Find application in PENDING status
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(
        createMockApplication({ status: 'PENDING' }),
      );
      // 소유권 확인 / Validate ownership
      setupCorporateOwnership();
      // 업데이트 성공 / Update succeeds
      mockPrisma.jobApplication.update.mockResolvedValueOnce({
        ...createMockApplication(),
        status: 'REJECTED',
        rejectionReason: 'Not a good fit',
        rejectedAt: new Date(),
        resultNotifiedAt: new Date(),
      });

      const result = await service.updateApplicationStatus(corpUserId, '1', {
        status: 'REJECTED',
        rejectionReason: 'Not a good fit',
      });

      expect(result.success).toBe(true);
      expect(result.status).toBe('REJECTED');
    });

    it('유효하지 않은 상태 전이는 BadRequestException을 던진다 / should throw BadRequestException for invalid status transition', async () => {
      // 지원서 조회 (PENDING 상태) / Find application in PENDING status
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(
        createMockApplication({ status: 'PENDING' }),
      );
      // 소유권 확인 / Validate ownership
      setupCorporateOwnership();

      // PENDING → ACCEPTED는 허용되지 않음 / PENDING → ACCEPTED is not allowed
      await expect(
        service.updateApplicationStatus(corpUserId, '1', {
          status: 'ACCEPTED',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('소유권이 없는 기업이 상태 변경 시 ForbiddenException을 던진다 / should throw ForbiddenException for non-owner corporate', async () => {
      // 지원서 조회 / Find application
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(
        createMockApplication(),
      );
      // 다른 기업의 프로필 / Different corporate profile
      mockPrisma.corporateProfile.findUnique.mockResolvedValueOnce({
        authId: 'other-corp',
        companyId: BigInt(999), // 소유권 불일치 / Ownership mismatch
      });

      await expect(
        service.updateApplicationStatus('other-corp', '1', {
          status: 'REVIEWING',
        }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('존재하지 않는 지원서의 상태 변경 시 NotFoundException을 던진다 / should throw NotFoundException for non-existent application', async () => {
      // 지원서 없음 / Application not found
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.updateApplicationStatus(corpUserId, '999', {
          status: 'REVIEWING',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ============================================================
  // 3. 최종 합격 + 비자 시나리오 테스트 / Final acceptance + visa scenario tests
  // ============================================================
  describe('FINAL_ACCEPTED (최종 합격 + 비자 시나리오)', () => {
    const corpUserId = 'corp-user-001';

    it('최종 합격 시 비자 시나리오를 판별하고 체크리스트를 생성한다 / should determine visa scenario and generate checklist on final acceptance', async () => {
      // DOCUMENT_PASSED 상태의 지원서 / Application in DOCUMENT_PASSED status
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(
        createMockApplication({
          status: 'DOCUMENT_PASSED',
          job: createMockJob({ allowedVisas: 'E-7,D-10' }),
        }),
      );
      // 소유권 확인 / Validate ownership
      mockPrisma.corporateProfile.findUnique.mockResolvedValueOnce({
        authId: corpUserId,
        companyId: BigInt(500),
      });
      // 지원서 업데이트 (상태 변경) / Update application (status change)
      mockPrisma.jobApplication.update
        .mockResolvedValueOnce({
          ...createMockApplication(),
          status: 'FINAL_ACCEPTED',
          finalAcceptedAt: new Date(),
        })
        // 두 번째 업데이트 (비자 시나리오 저장) / Second update (save visa scenario)
        .mockResolvedValueOnce({});

      // 비자 시나리오 판별 / Determine visa scenario
      mockVisaScenarioService.determineScenario.mockResolvedValueOnce({
        scenario: 'B',
        scenarioName: '학생비자 전환',
        scenarioNameEn: 'Student visa transition',
        guidanceLevel: '높음',
        visaTransition: 'D-2 → E-7',
        estimatedDuration: '4~8주',
      });
      // 체크리스트 생성 / Generate checklist
      mockVisaScenarioService.generateChecklist.mockResolvedValueOnce(5);

      const result = await service.updateApplicationStatus(corpUserId, '1', {
        status: 'FINAL_ACCEPTED',
        offeredSalary: 3500,
        expectedStartDate: '2026-04-01',
      });

      expect(result.success).toBe(true);
      expect(result.status).toBe('FINAL_ACCEPTED');
      // 비자 가이드 정보 확인 / Verify visa guide info
      expect(result.visaGuide).toBeDefined();
      expect(result.visaGuide.scenario).toBe('B');
      expect(result.visaGuide.checklistItemCount).toBe(5);
      // 비자 시나리오 서비스 호출 확인 / Verify visa scenario service was called
      expect(mockVisaScenarioService.determineScenario).toHaveBeenCalledWith(
        'applicant-001',
        3500,
        ['E-7', 'D-10'],
      );
    });

    it('비자 시나리오 판별 실패 시에도 합격 처리는 성공한다 / should still succeed final acceptance even if visa scenario fails', async () => {
      // DOCUMENT_PASSED 상태의 지원서 / Application in DOCUMENT_PASSED status
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(
        createMockApplication({ status: 'DOCUMENT_PASSED' }),
      );
      // 소유권 확인 / Validate ownership
      mockPrisma.corporateProfile.findUnique.mockResolvedValueOnce({
        authId: corpUserId,
        companyId: BigInt(500),
      });
      // 지원서 업데이트 / Update application
      mockPrisma.jobApplication.update.mockResolvedValueOnce({
        ...createMockApplication(),
        status: 'FINAL_ACCEPTED',
      });

      // 비자 시나리오 실패 / Visa scenario fails
      mockVisaScenarioService.determineScenario.mockRejectedValueOnce(
        new Error('Profile not found'),
      );

      const result = await service.updateApplicationStatus(corpUserId, '1', {
        status: 'FINAL_ACCEPTED',
      });

      expect(result.success).toBe(true);
      expect(result.status).toBe('FINAL_ACCEPTED');
      // 비자 가이드는 null / Visa guide is null
      expect(result.visaGuide).toBeNull();
    });
  });

  // ============================================================
  // 4. 지원 취소 테스트 / Cancel application tests
  // ============================================================
  describe('cancelApplication (지원 취소)', () => {
    it('PENDING 상태의 지원을 취소한다 / should cancel application in PENDING status', async () => {
      // 지원서 조회 / Find application
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(
        createMockApplication({ status: 'PENDING', interviewDate: null }),
      );
      // 지원서 업데이트 / Update application
      mockPrisma.jobApplication.update.mockResolvedValueOnce({
        ...createMockApplication(),
        status: 'CANCELLED',
      });
      // 지원수 감소 / Decrement apply count
      mockPrisma.jobPosting.update.mockResolvedValueOnce({});
      // 기업 프로필 조회 (알림용) / Corporate profile for notification
      mockPrisma.corporateProfile.findUnique.mockResolvedValueOnce({
        authId: 'corp-owner',
        companyId: BigInt(500),
      });

      const result = await service.cancelApplication('applicant-001', '1');

      expect(result.success).toBe(true);
      expect(result.status).toBe('CANCELLED');
      // 지원수 감소 확인 / Verify apply count decremented
      expect(mockPrisma.jobPosting.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { applyCount: { decrement: 1 } },
        }),
      );
    });

    it('이미 취소된 지원은 BadRequestException을 던진다 / should throw BadRequestException for already cancelled application', async () => {
      // 이미 취소된 지원서 / Already cancelled
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(
        createMockApplication({ status: 'CANCELLED' }),
      );

      await expect(
        service.cancelApplication('applicant-001', '1'),
      ).rejects.toThrow(BadRequestException);
    });

    it('이미 합격된 지원은 취소할 수 없다 / should not cancel an accepted application', async () => {
      // 합격 상태 / Accepted status
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(
        createMockApplication({ status: 'ACCEPTED' }),
      );

      await expect(
        service.cancelApplication('applicant-001', '1'),
      ).rejects.toThrow(BadRequestException);
    });

    it('이미 불합격된 지원은 취소할 수 없다 / should not cancel a rejected application', async () => {
      // 불합격 상태 / Rejected status
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(
        createMockApplication({ status: 'REJECTED' }),
      );

      await expect(
        service.cancelApplication('applicant-001', '1'),
      ).rejects.toThrow(BadRequestException);
    });

    it('다른 사용자가 취소하면 ForbiddenException을 던진다 / should throw ForbiddenException when different user tries to cancel', async () => {
      // 지원서 조회 / Find application
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(
        createMockApplication({ applicantId: 'applicant-001' }),
      );

      await expect(
        service.cancelApplication('other-user', '1'),
      ).rejects.toThrow(ForbiddenException);
    });

    it('면접 일정이 있는 지원 취소 시 슬롯을 해제한다 / should release booked slot when cancelling application with interview', async () => {
      const interviewDate = new Date('2026-04-01T10:00:00Z');
      // 면접 일정이 있는 지원서 / Application with interview date
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(
        createMockApplication({
          status: 'INTERVIEW_SCHEDULED',
          interviewDate,
        }),
      );
      // 예약된 슬롯 찾기 / Find booked slot
      mockPrisma.interviewSlot.findFirst.mockResolvedValueOnce({
        id: BigInt(10),
        jobId: BigInt(100),
        startTime: interviewDate,
        isBooked: true,
      });
      // 슬롯 해제 / Release slot
      mockPrisma.interviewSlot.update.mockResolvedValueOnce({});
      // 지원서 업데이트 / Update application
      mockPrisma.jobApplication.update.mockResolvedValueOnce({
        ...createMockApplication(),
        status: 'CANCELLED',
      });
      // 지원수 감소 / Decrement apply count
      mockPrisma.jobPosting.update.mockResolvedValueOnce({});
      // 기업 프로필 조회 / Corporate profile
      mockPrisma.corporateProfile.findUnique.mockResolvedValueOnce({
        authId: 'corp-owner',
        companyId: BigInt(500),
      });

      const result = await service.cancelApplication('applicant-001', '1');

      expect(result.success).toBe(true);
      // 슬롯 해제 확인 / Verify slot was released
      expect(mockPrisma.interviewSlot.update).toHaveBeenCalledWith({
        where: { id: BigInt(10) },
        data: { isBooked: false },
      });
    });
  });

  // ============================================================
  // 5. 내 지원 목록 조회 테스트 / My applications list tests
  // ============================================================
  describe('getMyApplications (내 지원 목록)', () => {
    it('지원 목록을 페이지네이션과 함께 반환한다 / should return applications with pagination', async () => {
      const mockJob = createMockJob();
      const mockApps = [
        {
          ...createMockApplication(),
          job: mockJob,
        },
      ];

      // 지원 목록 + 총 건수 조회 / Fetch application list + total count
      mockPrisma.jobApplication.findMany.mockResolvedValueOnce(mockApps);
      mockPrisma.jobApplication.count.mockResolvedValueOnce(1);
      // 기업 프로필 조회 / Corporate profiles
      mockPrisma.corporateProfile.findMany.mockResolvedValueOnce([
        {
          companyId: BigInt(500),
          companyNameOfficial: 'Test Corp',
          logoImageUrl: null,
        },
      ]);

      const result = await service.getMyApplications('applicant-001', {
        page: 1,
        limit: 20,
      });

      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.totalPages).toBe(1);
    });

    it('상태 필터를 적용한 조회를 수행한다 / should apply status filter to query', async () => {
      mockPrisma.jobApplication.findMany.mockResolvedValueOnce([]);
      mockPrisma.jobApplication.count.mockResolvedValueOnce(0);
      mockPrisma.corporateProfile.findMany.mockResolvedValueOnce([]);

      await service.getMyApplications('applicant-001', {
        page: 1,
        limit: 20,
        status: 'PENDING',
      });

      // findMany 호출 시 where에 status 필터 포함 확인
      // Verify status filter was included in findMany where clause
      expect(mockPrisma.jobApplication.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            applicantId: 'applicant-001',
            status: 'PENDING',
          }),
        }),
      );
    });
  });

  // ============================================================
  // 6. 스크랩 토글 테스트 / Scrap toggle tests
  // ============================================================
  describe('toggleScrap (스크랩 토글)', () => {
    it('스크랩되지 않은 공고를 스크랩한다 / should scrap an unscraped job', async () => {
      // 기존 스크랩 없음 / No existing scrap
      mockPrisma.jobScrap.findUnique.mockResolvedValueOnce(null);
      // 스크랩 생성 / Create scrap
      mockPrisma.jobScrap.create.mockResolvedValueOnce({});
      // 스크랩 카운트 증가 / Increment scrap count
      mockPrisma.jobPosting.update.mockResolvedValueOnce({});

      const result = await service.toggleScrap('user-001', '100');

      expect(result.scrapped).toBe(true);
      expect(mockPrisma.jobScrap.create).toHaveBeenCalled();
    });

    it('이미 스크랩된 공고의 스크랩을 해제한다 / should unscrap an already scraped job', async () => {
      // 기존 스크랩 존재 / Existing scrap found
      mockPrisma.jobScrap.findUnique.mockResolvedValueOnce({
        id: BigInt(1),
        jobId: BigInt(100),
        userId: 'user-001',
      });
      // 스크랩 삭제 / Delete scrap
      mockPrisma.jobScrap.delete.mockResolvedValueOnce({});
      // 스크랩 카운트 감소 / Decrement scrap count
      mockPrisma.jobPosting.update.mockResolvedValueOnce({});

      const result = await service.toggleScrap('user-001', '100');

      expect(result.scrapped).toBe(false);
      expect(mockPrisma.jobScrap.delete).toHaveBeenCalled();
    });
  });

  // ============================================================
  // 7. 결과 알림 발송 테스트 / Result notification tests
  // ============================================================
  describe('sendResultNotification (결과 알림 발송)', () => {
    it('확정된 상태의 지원에 결과 알림을 발송할 수 없다 / should not send result notification for finalized status', async () => {
      // 이미 합격 상태 / Already accepted
      mockPrisma.jobApplication.findUnique.mockResolvedValueOnce(
        createMockApplication({ status: 'ACCEPTED' }),
      );
      // 소유권 확인 / Validate ownership
      mockPrisma.corporateProfile.findUnique.mockResolvedValueOnce({
        authId: 'corp-user-001',
        companyId: BigInt(500),
      });

      await expect(
        service.sendResultNotification('corp-user-001', '1', {
          result: 'ACCEPTED',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
