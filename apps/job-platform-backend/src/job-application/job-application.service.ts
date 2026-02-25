import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
  Logger,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthPrismaService, RedisService } from 'libs/common/src';
import {
  NOTIFICATION_PACKAGE_NAME,
  NotificationServiceClient,
  NOTIFICATION_SERVICE_NAME,
  NotificationType,
  NotificationChannel,
} from 'types/notification/notification';

@Injectable()
export class JobApplicationService implements OnModuleInit {
  // NestJS Logger 인스턴스 (console.log 사용 금지)
  // NestJS Logger instance (no console.log)
  private readonly logger = new Logger(JobApplicationService.name);

  // gRPC 알림 서비스 클라이언트
  // gRPC notification service client
  private notificationService: NotificationServiceClient;

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly redis: RedisService,
    @Inject(NOTIFICATION_PACKAGE_NAME) private readonly grpcClient: ClientGrpc,
  ) {}

  // 모듈 초기화 시 gRPC 서비스 클라이언트 획득
  // Obtain gRPC service client on module initialization
  onModuleInit() {
    this.notificationService =
      this.grpcClient.getService<NotificationServiceClient>(
        NOTIFICATION_SERVICE_NAME,
      );
  }

  // ========================================
  // [내부] 알림 발송 헬퍼 — 실패해도 메인 흐름 중단 없음
  // [Internal] Notification send helper — never blocks main flow on failure
  // ========================================
  private async sendNotificationSafe(
    userId: string,
    subject: string,
    content: string,
    notificationType: NotificationType,
  ): Promise<void> {
    try {
      await firstValueFrom(
        this.notificationService.sendNotification({
          userId,
          subject,
          content,
          notificationType,
          channel: NotificationChannel.BOTH,
        }),
      );
    } catch (err) {
      // 알림 발송 실패는 경고로만 기록하고 예외를 상위로 전파하지 않음
      // Log notification failure as warning only — do not re-throw
      this.logger.warn(
        `알림 발송 실패 / Notification send failed for userId=${userId}: ${err}`,
      );
    }
  }

  // ========================================
  // 지원하기
  // Apply to a job posting
  // ========================================
  async applyToJob(
    userId: string,
    data: {
      jobId: string;
      applicationMethod?: string;
      coverLetter?: string;
    },
  ) {
    const job = await this.prisma.jobPosting.findUnique({
      where: { id: BigInt(data.jobId) },
    });
    if (!job) throw new NotFoundException('Job posting not found');
    if (job.status !== 'ACTIVE') {
      throw new BadRequestException('This job posting is not active');
    }

    // 중복 지원 확인 / Check duplicate application
    const existing = await this.prisma.jobApplication.findUnique({
      where: {
        jobId_applicantId: {
          jobId: BigInt(data.jobId),
          applicantId: userId,
        },
      },
    });
    if (existing) throw new ConflictException('Already applied to this job');

    const method = data.applicationMethod || job.applicationMethod;

    let resumeSnapshot: string | null = null;
    if (method === 'PLATFORM') {
      // 이력서 스냅샷 생성 / Create resume snapshot
      const profile = await this.prisma.individualProfile.findUnique({
        where: { authId: userId },
        include: {
          educations: true,
          careers: true,
          languages: true,
        },
      });
      if (profile) {
        resumeSnapshot = JSON.stringify({
          realName: profile.realName,
          nationality: profile.nationality,
          visaType: profile.visaType,
          visaExpiryDate: profile.visaExpiryDate,
          educations: profile.educations.map((e) => ({
            schoolName: e.schoolName,
            majorName: e.majorName,
            degreeLevel: e.degreeLevel,
            graduationStatus: e.graduationStatus,
          })),
          careers: profile.careers.map((c) => ({
            companyName: c.companyName,
            dutyRole: c.dutyRole,
            startDate: c.startDate,
            endDate: c.endDate,
            isCurrent: c.isCurrent,
          })),
          languages: profile.languages.map((l) => ({
            languageType: l.languageType,
            testType: l.testType,
            scoreLevel: l.scoreLevel,
          })),
          selfIntro: profile.selfIntro,
        });
      }
    }

    const application = await this.prisma.jobApplication.create({
      data: {
        jobId: BigInt(data.jobId),
        applicantId: userId,
        applicationMethod: method as any,
        coverLetter: data.coverLetter,
        resumeSnapshot,
        selfReportedAt: method !== 'PLATFORM' ? new Date() : null,
      },
    });

    // 지원수 증가 / Increment application count
    await this.prisma.jobPosting.update({
      where: { id: BigInt(data.jobId) },
      data: { applyCount: { increment: 1 } },
    });

    // ============================================================
    // [알림] 기업회원에게 새 지원자 도착 알림 발송
    // [Notification] Notify company of new applicant
    // ============================================================
    // 지원자 이름 및 기업 authId 조회
    // Fetch applicant's name and company authId
    const [applicantProfile, companyProfile] = await Promise.all([
      this.prisma.individualProfile.findUnique({
        where: { authId: userId },
        select: { realName: true },
      }),
      this.prisma.corporateProfile.findUnique({
        where: { companyId: job.corporateId },
        select: { authId: true },
      }),
    ]);

    if (companyProfile?.authId) {
      const workerName = applicantProfile?.realName ?? '지원자';
      await this.sendNotificationSafe(
        companyProfile.authId,
        '새 지원자가 있습니다',
        `${workerName}님이 '${job.title}' 공고에 지원했습니다.`,
        NotificationType.APPLICATION_ALERT,
      );
    }

    return {
      applicationId: application.id.toString(),
      status: application.status,
      applicationMethod: application.applicationMethod,
    };
  }

  // ========================================
  // 내 지원 목록 (구직자)
  // My applications list (worker/job-seeker)
  // ========================================
  async getMyApplications(
    userId: string,
    query: { status?: string; page?: number; limit?: number },
  ) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: Record<string, unknown> = { applicantId: userId };
    if (query.status) where.status = query.status;

    const [items, total] = await Promise.all([
      this.prisma.jobApplication.findMany({
        where,
        include: { job: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.jobApplication.count({ where }),
    ]);

    // 기업 정보 조회 / Fetch company information
    const corpIds = [...new Set(items.map((i) => i.job.corporateId))];
    const corporates = await this.prisma.corporateProfile.findMany({
      where: { companyId: { in: corpIds } },
    });
    const corpMap = new Map(corporates.map((c) => [c.companyId.toString(), c]));

    return {
      items: items.map((app) => {
        const corp = corpMap.get(app.job.corporateId.toString());
        return {
          id: app.id.toString(),
          status: app.status,
          applicationMethod: app.applicationMethod,
          coverLetter: app.coverLetter,
          selfReportedAt: app.selfReportedAt,
          interviewDate: app.interviewDate,
          interviewNote: app.interviewNote,
          rejectionReason: app.rejectionReason,
          resultNotifiedAt: app.resultNotifiedAt,
          createdAt: app.createdAt,
          job: {
            id: app.job.id.toString(),
            title: app.job.title,
            boardType: app.job.boardType,
            tierType: app.job.tierType,
            status: app.job.status,
            displayAddress: app.job.displayAddress,
            allowedVisas: app.job.allowedVisas,
            companyName: corp?.companyNameOfficial || 'Unknown',
            logoImageUrl: corp?.logoImageUrl,
          },
        };
      }),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ========================================
  // 공고별 지원자 목록 (기업회원)
  // Applications list per job posting (company)
  // ========================================
  async getJobApplications(
    userId: string,
    jobId: string,
    query: { page?: number; limit?: number },
  ) {
    // 소유권 확인 / Verify ownership
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) throw new ForbiddenException('Corporate profile required');

    const job = await this.prisma.jobPosting.findUnique({
      where: { id: BigInt(jobId) },
    });
    if (!job) throw new NotFoundException('Job posting not found');
    if (job.corporateId !== corp.companyId) {
      throw new ForbiddenException('Not the owner');
    }

    const page = query.page || 1;
    const limit = query.limit || 20;
    const where = { jobId: BigInt(jobId) };

    const [items, total] = await Promise.all([
      this.prisma.jobApplication.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.jobApplication.count({ where }),
    ]);

    // 지원자 프로필 조회 / Fetch applicant profiles
    const applicantIds = items.map((i) => i.applicantId);
    const profiles = await this.prisma.individualProfile.findMany({
      where: { authId: { in: applicantIds } },
    });
    const profileMap = new Map(profiles.map((p) => [p.authId, p]));

    return {
      items: items.map((app) => {
        const profile = profileMap.get(app.applicantId);
        return {
          id: app.id.toString(),
          applicantId: app.applicantId,
          status: app.status,
          applicationMethod: app.applicationMethod,
          coverLetter: app.coverLetter,
          resumeSnapshot: app.resumeSnapshot
            ? JSON.parse(app.resumeSnapshot)
            : null,
          selfReportedAt: app.selfReportedAt,
          interviewDate: app.interviewDate,
          interviewNote: app.interviewNote,
          rejectionReason: app.rejectionReason,
          createdAt: app.createdAt,
          applicant: profile
            ? {
                realName: profile.realName,
                nationality: profile.nationality,
                visaType: profile.visaType,
                visaExpiryDate: profile.visaExpiryDate,
                profileImageUrl: profile.profileImageUrl,
              }
            : null,
        };
      }),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ========================================
  // 지원 상태 변경 (기업회원)
  // Update application status (company)
  // ========================================
  async updateApplicationStatus(
    userId: string,
    applicationId: string,
    data: {
      status: string;
      interviewDate?: string;
      interviewNote?: string;
      rejectionReason?: string;
    },
  ) {
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: BigInt(applicationId) },
      include: { job: true },
    });
    if (!app) throw new NotFoundException('Application not found');

    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp || app.job.corporateId !== corp.companyId) {
      throw new ForbiddenException('Not the owner');
    }

    const updateData: Record<string, unknown> = { status: data.status };
    if (data.interviewDate)
      updateData.interviewDate = new Date(data.interviewDate);
    if (data.interviewNote) updateData.interviewNote = data.interviewNote;
    if (data.rejectionReason) updateData.rejectionReason = data.rejectionReason;
    if (data.status === 'ACCEPTED' || data.status === 'REJECTED') {
      updateData.resultNotifiedAt = new Date();
    }

    await this.prisma.jobApplication.update({
      where: { id: BigInt(applicationId) },
      data: updateData,
    });

    // ============================================================
    // [알림] 상태 변경에 따라 구직자에게 알림 발송
    // [Notification] Notify worker based on new application status
    // ============================================================
    const jobTitle = app.job.title;
    const workerUserId = app.applicantId;

    if (data.status === 'INTERVIEW_SCHEDULED') {
      // 면접 일정 확정 알림 / Interview scheduled notification
      await this.sendNotificationSafe(
        workerUserId,
        '면접 일정이 확정되었습니다',
        `'${jobTitle}' 공고의 면접 일정이 확정되었습니다.`,
        NotificationType.INTERVIEW_UPDATE,
      );
    } else if (data.status === 'ACCEPTED') {
      // 합격 알림 / Acceptance notification
      await this.sendNotificationSafe(
        workerUserId,
        '합격을 축하드립니다!',
        `'${jobTitle}' 공고에 최종 합격하셨습니다.`,
        NotificationType.STATUS_ALERT,
      );
    } else if (data.status === 'REJECTED') {
      // 불합격 알림 / Rejection notification
      await this.sendNotificationSafe(
        workerUserId,
        '지원 결과 안내',
        `'${jobTitle}' 공고에 아쉽게도 합격하지 못했습니다.`,
        NotificationType.STATUS_ALERT,
      );
    }

    return { success: true, status: data.status };
  }

  // ========================================
  // 외부 지원 자가체크 (구직자)
  // Self-report external application (worker)
  // ========================================
  async selfReportApplication(userId: string, applicationId: string) {
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: BigInt(applicationId) },
    });
    if (!app) throw new NotFoundException('Application not found');
    if (app.applicantId !== userId) {
      throw new ForbiddenException('Not the applicant');
    }

    await this.prisma.jobApplication.update({
      where: { id: BigInt(applicationId) },
      data: { selfReportedAt: new Date() },
    });

    return { success: true };
  }

  // ========================================
  // 스크랩 토글
  // Toggle job scrap/bookmark
  // ========================================
  async toggleScrap(userId: string, jobId: string) {
    const existing = await this.prisma.jobScrap.findUnique({
      where: {
        jobId_userId: {
          jobId: BigInt(jobId),
          userId,
        },
      },
    });

    if (existing) {
      await this.prisma.jobScrap.delete({
        where: { id: existing.id },
      });
      await this.prisma.jobPosting.update({
        where: { id: BigInt(jobId) },
        data: { scrapCount: { decrement: 1 } },
      });
      return { scrapped: false };
    } else {
      await this.prisma.jobScrap.create({
        data: {
          jobId: BigInt(jobId),
          userId,
        },
      });
      await this.prisma.jobPosting.update({
        where: { id: BigInt(jobId) },
        data: { scrapCount: { increment: 1 } },
      });
      return { scrapped: true };
    }
  }

  // ========================================
  // 내 스크랩 목록
  // My scrapped/bookmarked jobs list
  // ========================================
  async getMyScraps(userId: string, query: { page?: number; limit?: number }) {
    const page = query.page || 1;
    const limit = query.limit || 20;

    const [items, total] = await Promise.all([
      this.prisma.jobScrap.findMany({
        where: { userId },
        include: {
          job: {
            include: { albaAttributes: true, fulltimeAttributes: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.jobScrap.count({ where: { userId } }),
    ]);

    const corpIds = [...new Set(items.map((i) => i.job.corporateId))];
    const corporates = await this.prisma.corporateProfile.findMany({
      where: { companyId: { in: corpIds } },
    });
    const corpMap = new Map(corporates.map((c) => [c.companyId.toString(), c]));

    return {
      items: items.map((scrap) => {
        const corp = corpMap.get(scrap.job.corporateId.toString());
        return {
          scrapId: scrap.id.toString(),
          scrappedAt: scrap.createdAt,
          job: {
            id: scrap.job.id.toString(),
            title: scrap.job.title,
            boardType: scrap.job.boardType,
            tierType: scrap.job.tierType,
            status: scrap.job.status,
            displayAddress: scrap.job.displayAddress,
            allowedVisas: scrap.job.allowedVisas,
            applicationMethod: scrap.job.applicationMethod,
            companyName: corp?.companyNameOfficial || 'Unknown',
            logoImageUrl: corp?.logoImageUrl,
            albaAttributes: scrap.job.albaAttributes
              ? { hourlyWage: scrap.job.albaAttributes.hourlyWage }
              : null,
            fulltimeAttributes: scrap.job.fulltimeAttributes
              ? {
                  salaryMin: scrap.job.fulltimeAttributes.salaryMin,
                  salaryMax: scrap.job.fulltimeAttributes.salaryMax,
                }
              : null,
          },
        };
      }),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ========================================
  // 스크랩 여부 확인
  // Check if a job is scrapped
  // ========================================
  async checkScrap(userId: string, jobId: string) {
    const scrap = await this.prisma.jobScrap.findUnique({
      where: {
        jobId_userId: {
          jobId: BigInt(jobId),
          userId,
        },
      },
    });
    return { scrapped: !!scrap };
  }
}
