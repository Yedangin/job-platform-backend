import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import {
  AuthPrismaService,
  NotificationPrismaService,
  RedisService,
} from 'libs/common/src';
import { NotificationType } from 'generated/prisma-notification';
import {
  ApplyToJobDto,
  GetMyApplicationsQueryDto,
  GetJobApplicationsQueryDto,
  UpdateApplicationStatusDto,
  CreateInterviewSlotsDto,
  SelectInterviewSlotDto,
  ProposeNewTimeDto,
  SendResultNotificationDto,
  ProposeInterviewDto,
  AcceptInterviewDto,
} from './dto';

@Injectable()
export class JobApplicationService {
  private readonly logger = new Logger(JobApplicationService.name);
  private readonly sesClient: SESClient;

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly notificationPrisma: NotificationPrismaService,
    private readonly redis: RedisService,
  ) {
    this.sesClient = new SESClient({
      region: process.env.AWS_REGION || 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
      },
    });
  }

  // ========================================
  // 1. 지원하기 (Apply to Job)
  // ========================================
  async applyToJob(userId: string, jobId: string, dto: ApplyToJobDto) {
    // 개인회원 확인 / Validate INDIVIDUAL user
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');
    if (user.userType !== 'INDIVIDUAL') {
      throw new ForbiddenException('Only INDIVIDUAL users can apply to jobs');
    }

    // 공고 확인 / Validate job posting
    const job = await this.prisma.jobPosting.findUnique({
      where: { id: BigInt(jobId) },
    });
    if (!job) throw new NotFoundException('Job posting not found');
    if (job.status !== 'ACTIVE') {
      throw new BadRequestException('This job posting is not active');
    }

    // 중복 지원 확인 / Check duplicate application
    const existing = await this.prisma.jobApplication.findUnique({
      where: {
        jobId_applicantId: {
          jobId: BigInt(jobId),
          applicantId: userId,
        },
      },
    });
    if (existing) throw new ConflictException('Already applied to this job');

    const method = dto.applicationMethod || job.applicationMethod;

    // 이력서 스냅샷 생성 / Create resume snapshot for PLATFORM applications
    let resumeSnapshot: string | null = null;
    if (method === 'PLATFORM') {
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
        jobId: BigInt(jobId),
        applicantId: userId,
        applicationMethod: method as any,
        coverLetter: dto.coverLetter,
        resumeSnapshot,
        selfReportedAt: method !== 'PLATFORM' ? new Date() : null,
      },
    });

    // 지원수 증가 / Increment apply count
    await this.prisma.jobPosting.update({
      where: { id: BigInt(jobId) },
      data: { applyCount: { increment: 1 } },
    });

    return {
      applicationId: application.id.toString(),
      status: application.status,
      applicationMethod: application.applicationMethod,
    };
  }

  // ========================================
  // 2. 내 지원 목록 (My Applications - Job Seeker)
  // ========================================
  async getMyApplications(userId: string, query: GetMyApplicationsQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { applicantId: userId };
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

    // 기업 정보 조회 / Fetch corporate profiles
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
  // 3. 공고별 지원자 목록 (Job Applications - Corporate)
  // ========================================
  async getJobApplications(
    userId: string,
    jobId: string,
    query: GetJobApplicationsQueryDto,
  ) {
    // 소유권 확인 / Validate ownership
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
    const where: any = { jobId: BigInt(jobId) };
    if (query.status) where.status = query.status;

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
          resultNotifiedAt: app.resultNotifiedAt,
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
  // 4. 지원 상태 변경 (Update Application Status - Corporate)
  // ========================================
  async updateApplicationStatus(
    userId: string,
    applicationId: string,
    dto: UpdateApplicationStatusDto,
  ) {
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: BigInt(applicationId) },
      include: { job: true },
    });
    if (!app) throw new NotFoundException('Application not found');

    // 소유권 확인 / Validate ownership
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp || app.job.corporateId !== corp.companyId) {
      throw new ForbiddenException('Not the owner');
    }

    // 상태 전이 검증 / Validate status transition
    const validTransitions: Record<string, string[]> = {
      PENDING: ['REVIEWING', 'INTERVIEW_SCHEDULED', 'REJECTED'],
      REVIEWING: ['INTERVIEW_SCHEDULED', 'ACCEPTED', 'REJECTED'],
      INTERVIEW_SCHEDULED: ['ACCEPTED', 'REJECTED'],
    };
    const allowed = validTransitions[app.status] || [];
    if (!allowed.includes(dto.status)) {
      throw new BadRequestException(
        `Cannot transition from ${app.status} to ${dto.status}`,
      );
    }

    const updateData: any = { status: dto.status };
    if (dto.interviewDate) {
      updateData.interviewDate = new Date(dto.interviewDate);
    }
    if (dto.interviewNote) {
      updateData.interviewNote = dto.interviewNote;
    }
    if (dto.rejectionReason) {
      updateData.rejectionReason = dto.rejectionReason;
    }
    if (dto.status === 'REJECTED') {
      updateData.resultNotifiedAt = new Date();
    }

    const updated = await this.prisma.jobApplication.update({
      where: { id: BigInt(applicationId) },
      data: updateData,
    });

    // INTERVIEW_SCHEDULED로 변경 시 면접 초대 발송 / Send interview invitation
    if (dto.status === 'INTERVIEW_SCHEDULED') {
      setImmediate(() => {
        this.sendInterviewInvitation(userId, applicationId).catch((err) => {
          this.logger.error(
            `Failed to send interview invitation for app ${applicationId}:`,
            err,
          );
        });
      });
    }

    return { success: true, status: updated.status };
  }

  // ========================================
  // 5. 면접 슬롯 생성 (Create Interview Slots - Corporate)
  // ========================================
  async createInterviewSlots(
    userId: string,
    jobId: string,
    dto: CreateInterviewSlotsDto,
  ) {
    // 소유권 확인 / Validate ownership
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) throw new ForbiddenException('Corporate profile required');

    const job = await this.prisma.jobPosting.findUnique({
      where: { id: BigInt(jobId) },
    });
    if (!job) throw new NotFoundException('Job posting not found');
    if (job.corporateId !== corp.companyId) {
      throw new ForbiddenException('Not the owner of this posting');
    }

    if (!dto.slots || dto.slots.length === 0) {
      throw new BadRequestException('At least one slot is required');
    }

    // 슬롯 유효성 검증 / Validate slot times
    const now = new Date();
    for (const slot of dto.slots) {
      const start = new Date(slot.startTime);
      const end = new Date(slot.endTime);
      if (start >= end) {
        throw new BadRequestException('Slot startTime must be before endTime');
      }
      if (start <= now) {
        throw new BadRequestException('Slot startTime must be in the future');
      }
    }

    // 슬롯 일괄 생성 / Bulk create slots
    const created = await Promise.all(
      dto.slots.map((slot) =>
        this.prisma.interviewSlot.create({
          data: {
            jobId: BigInt(jobId),
            startTime: new Date(slot.startTime),
            endTime: new Date(slot.endTime),
            isBooked: false,
          },
        }),
      ),
    );

    return {
      success: true,
      slotsCreated: created.length,
      slots: created.map((s) => ({
        slotId: s.id.toString(),
        startTime: s.startTime,
        endTime: s.endTime,
        isBooked: s.isBooked,
      })),
    };
  }

  // ========================================
  // 6. 면접 슬롯 조회 (Get Interview Slots)
  // ========================================
  async getInterviewSlots(userId: string, jobId: string) {
    const job = await this.prisma.jobPosting.findUnique({
      where: { id: BigInt(jobId) },
    });
    if (!job) throw new NotFoundException('Job posting not found');

    // 기업회원 여부 확인 / Check if user is corporate owner
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    const isCorporateOwner = corp && job.corporateId === corp.companyId;

    // 지원자 여부 확인 / Check if user is an applicant
    const application = await this.prisma.jobApplication.findUnique({
      where: {
        jobId_applicantId: {
          jobId: BigInt(jobId),
          applicantId: userId,
        },
      },
    });
    const isApplicant = !!application;

    if (!isCorporateOwner && !isApplicant) {
      throw new ForbiddenException(
        'Only the job owner or applicants can view interview slots',
      );
    }

    // 슬롯 조회 / Fetch slots
    let where: any = { jobId: BigInt(jobId) };

    // 지원자는 예약 가능한 슬롯만 조회 / Applicants see only available slots
    if (!isCorporateOwner) {
      where = {
        ...where,
        OR: [
          { isBooked: false },
          // 본인이 선택한 슬롯도 포함 / Include slot selected by this applicant
          ...(application?.interviewDate
            ? [{ startTime: application.interviewDate }]
            : []),
        ],
      };
    }

    const slots = await this.prisma.interviewSlot.findMany({
      where,
      orderBy: { startTime: 'asc' },
    });

    return {
      jobId: jobId,
      slots: slots.map((s) => ({
        slotId: s.id.toString(),
        startTime: s.startTime,
        endTime: s.endTime,
        isBooked: s.isBooked,
      })),
    };
  }

  // ========================================
  // 7. 면접 슬롯 선택 (Select Interview Slot - Applicant)
  // ========================================
  async selectInterviewSlot(
    userId: string,
    applicationId: string,
    dto: SelectInterviewSlotDto,
  ) {
    // 지원서 확인 / Find application
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: BigInt(applicationId) },
      include: { job: true },
    });
    if (!app) throw new NotFoundException('Application not found');
    if (app.applicantId !== userId) {
      throw new ForbiddenException('Not the applicant');
    }

    // INTERVIEW_SCHEDULED 상태에서만 슬롯 선택 가능 / Only when interview is scheduled
    if (app.status !== 'INTERVIEW_SCHEDULED' && app.status !== 'REVIEWING') {
      throw new BadRequestException(
        'Application must be in INTERVIEW_SCHEDULED or REVIEWING status to select a slot',
      );
    }

    // 슬롯 확인 / Validate slot
    const slot = await this.prisma.interviewSlot.findUnique({
      where: { id: BigInt(dto.slotId) },
    });
    if (!slot) throw new NotFoundException('Interview slot not found');
    if (slot.jobId !== app.jobId) {
      throw new BadRequestException(
        'This slot does not belong to the same job posting',
      );
    }
    if (slot.isBooked) {
      throw new ConflictException('This interview slot is already booked');
    }

    // 트랜잭션으로 슬롯 예약 + 지원서 업데이트 / Transaction: book slot + update application
    await this.prisma.$transaction(async (tx) => {
      await tx.interviewSlot.update({
        where: { id: BigInt(dto.slotId) },
        data: { isBooked: true },
      });

      await tx.jobApplication.update({
        where: { id: BigInt(applicationId) },
        data: {
          status: 'INTERVIEW_SCHEDULED',
          interviewDate: slot.startTime,
          interviewNote: `Slot confirmed: ${slot.startTime.toISOString()} - ${slot.endTime.toISOString()}`,
        },
      });
    });

    // 기업에게 알림 / Notify corporate owner
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { companyId: app.job.corporateId },
    });
    if (corp) {
      const corpEmail = await this.getApplicantEmail(corp.authId);
      if (corpEmail) {
        setImmediate(() => {
          this.createInAppNotification(
            corp.authId,
            'INTERVIEW_UPDATE',
            `지원자가 면접 시간을 선택했습니다. / An applicant has selected an interview slot.`,
            {
              applicationId: applicationId,
              slotId: dto.slotId,
              interviewTime: slot.startTime.toISOString(),
            },
          ).catch((err) =>
            this.logger.error('Failed to create in-app notification:', err),
          );
        });
      }
    }

    return {
      success: true,
      status: 'INTERVIEW_SCHEDULED',
      interviewDate: slot.startTime,
      slotId: dto.slotId,
    };
  }

  // ========================================
  // 8. 새 시간 제안 (Propose New Time - Applicant/Employer)
  // ========================================
  async proposeNewTime(
    userId: string,
    applicationId: string,
    dto: ProposeNewTimeDto,
  ) {
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: BigInt(applicationId) },
      include: { job: true },
    });
    if (!app) throw new NotFoundException('Application not found');

    // 권한 확인 / Validate permission
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    const isCorporateOwner = corp && app.job.corporateId === corp.companyId;
    const isApplicant = app.applicantId === userId;

    if (!isCorporateOwner && !isApplicant) {
      throw new ForbiddenException(
        'Only the job owner or applicant can propose a new time',
      );
    }

    // 제안 가능한 상태 확인 / Validate status for proposing
    const allowedStatuses = ['INTERVIEW_SCHEDULED', 'REVIEWING', 'PENDING'];
    if (!allowedStatuses.includes(app.status)) {
      throw new BadRequestException(
        `Cannot propose new time when status is ${app.status}`,
      );
    }

    const proposedTime = new Date(dto.proposedTime);
    if (proposedTime <= new Date()) {
      throw new BadRequestException('Proposed time must be in the future');
    }

    const proposedBy = isCorporateOwner ? 'EMPLOYER' : 'APPLICANT';

    await this.prisma.jobApplication.update({
      where: { id: BigInt(applicationId) },
      data: {
        interviewDate: proposedTime,
        interviewNote: dto.note
          ? `[${proposedBy} proposed] ${dto.note}`
          : `[${proposedBy} proposed] New time: ${proposedTime.toISOString()}`,
        status: 'REVIEWING',
      },
    });

    // 상대방에게 알림 / Notify the other party
    const notifyUserId = isCorporateOwner
      ? app.applicantId
      : corp
        ? corp.authId
        : null;
    if (notifyUserId) {
      setImmediate(() => {
        this.createInAppNotification(
          notifyUserId,
          'INTERVIEW_UPDATE',
          `면접 시간 변경이 제안되었습니다. / A new interview time has been proposed.`,
          {
            applicationId: applicationId,
            proposedBy,
            proposedTime: proposedTime.toISOString(),
          },
        ).catch((err) =>
          this.logger.error('Failed to create in-app notification:', err),
        );
      });
    }

    return {
      success: true,
      status: 'REVIEWING',
      proposedBy,
      proposedTime,
    };
  }

  // ========================================
  // 9. 지원 취소 (Cancel Application - Applicant)
  // ========================================
  async cancelApplication(userId: string, applicationId: string) {
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: BigInt(applicationId) },
      include: { job: true },
    });
    if (!app) throw new NotFoundException('Application not found');
    if (app.applicantId !== userId) {
      throw new ForbiddenException('Not the applicant');
    }

    // 이미 취소/합격/불합격 상태면 취소 불가 / Cannot cancel if already finalized
    if (['CANCELLED', 'ACCEPTED', 'REJECTED'].includes(app.status)) {
      throw new BadRequestException(
        `Cannot cancel application with status ${app.status}`,
      );
    }

    // 예약된 슬롯 해제 / Release booked slot if exists
    if (app.interviewDate) {
      const bookedSlot = await this.prisma.interviewSlot.findFirst({
        where: {
          jobId: app.jobId,
          startTime: app.interviewDate,
          isBooked: true,
        },
      });
      if (bookedSlot) {
        await this.prisma.interviewSlot.update({
          where: { id: bookedSlot.id },
          data: { isBooked: false },
        });
      }
    }

    await this.prisma.jobApplication.update({
      where: { id: BigInt(applicationId) },
      data: { status: 'CANCELLED' },
    });

    // 지원수 감소 / Decrement apply count
    await this.prisma.jobPosting.update({
      where: { id: app.jobId },
      data: { applyCount: { decrement: 1 } },
    });

    // 기업에게 알림 / Notify corporate owner
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { companyId: app.job.corporateId },
    });
    if (corp) {
      setImmediate(() => {
        this.createInAppNotification(
          corp.authId,
          'APPLICATION_ALERT',
          `지원자가 지원을 취소했습니다. / An applicant has cancelled their application.`,
          {
            applicationId: applicationId,
            jobId: app.jobId.toString(),
          },
        ).catch((err) =>
          this.logger.error('Failed to create in-app notification:', err),
        );
      });
    }

    return { success: true, status: 'CANCELLED' };
  }

  // ========================================
  // 10. 결과 알림 발송 (Send Result Notification - Corporate)
  // ========================================
  async sendResultNotification(
    userId: string,
    applicationId: string,
    dto: SendResultNotificationDto,
  ) {
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: BigInt(applicationId) },
      include: { job: true },
    });
    if (!app) throw new NotFoundException('Application not found');

    // 소유권 확인 / Validate ownership
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp || app.job.corporateId !== corp.companyId) {
      throw new ForbiddenException('Not the owner');
    }

    // 상태 검증 / Validate current status
    if (['CANCELLED', 'ACCEPTED', 'REJECTED'].includes(app.status)) {
      throw new BadRequestException(
        `Cannot send result notification for status ${app.status}`,
      );
    }

    // 지원서 상태 업데이트 / Update application status
    const newStatus = dto.result;
    const updateData: any = {
      status: newStatus,
      resultNotifiedAt: new Date(),
    };
    if (dto.rejectionReason) {
      updateData.rejectionReason = dto.rejectionReason;
    }

    await this.prisma.jobApplication.update({
      where: { id: BigInt(applicationId) },
      data: updateData,
    });

    // 지원자 이메일 조회 / Get applicant email
    const applicantEmail = await this.getApplicantEmail(app.applicantId);

    const companyName = corp.companyNameOfficial || 'Unknown Company';
    const jobTitle = app.job.title;

    // 이메일 발송 / Send email notification
    if (applicantEmail) {
      const isAccepted = dto.result === 'ACCEPTED';
      const subject = isAccepted
        ? `[JobChaja] 축하합니다! ${companyName} 지원 결과 안내 / Congratulations! Application Result`
        : `[JobChaja] ${companyName} 지원 결과 안내 / Application Result Notification`;

      const html = this.getResultEmailTemplate({
        companyName,
        jobTitle,
        isAccepted,
        message: dto.message,
        rejectionReason: dto.rejectionReason,
      });

      setImmediate(() => {
        this.sendEmailNotification(applicantEmail, subject, html).catch((err) =>
          this.logger.error(
            `Failed to send result email to ${applicantEmail}:`,
            err,
          ),
        );
      });
    }

    // 인앱 알림 생성 / Create in-app notification
    const isAccepted = dto.result === 'ACCEPTED';
    const notifContent = isAccepted
      ? `${companyName}에서 합격 통보를 보냈습니다. / You have been accepted by ${companyName}.`
      : `${companyName}에서 지원 결과를 안내드립니다. / Application result from ${companyName}.`;

    setImmediate(() => {
      this.createInAppNotification(
        app.applicantId,
        'APPLICATION_ALERT',
        notifContent,
        {
          applicationId: applicationId,
          jobId: app.jobId.toString(),
          result: dto.result,
        },
      ).catch((err) =>
        this.logger.error('Failed to create in-app notification:', err),
      );
    });

    return {
      success: true,
      status: newStatus,
      resultNotifiedAt: new Date(),
    };
  }

  // ========================================
  // 11. 면접 초대 발송 (Send Interview Invitation)
  // ========================================
  async sendInterviewInvitation(userId: string, applicationId: string) {
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: BigInt(applicationId) },
      include: { job: true },
    });
    if (!app) throw new NotFoundException('Application not found');

    // 소유권 확인 / Validate ownership
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp || app.job.corporateId !== corp.companyId) {
      throw new ForbiddenException('Not the owner');
    }

    // 지원자 이메일 조회 / Get applicant email
    const applicantEmail = await this.getApplicantEmail(app.applicantId);

    const companyName = corp.companyNameOfficial || 'Unknown Company';
    const jobTitle = app.job.title;

    // 면접 슬롯 조회 / Get available interview slots
    const slots = await this.prisma.interviewSlot.findMany({
      where: {
        jobId: app.jobId,
        isBooked: false,
      },
      orderBy: { startTime: 'asc' },
    });

    const slotSelectionUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/applications/${applicationId}/select-slot`;

    // 이메일 발송 / Send email
    if (applicantEmail) {
      const subject = `[JobChaja] ${companyName} 면접 초대 / Interview Invitation from ${companyName}`;
      const html = this.getInterviewInvitationEmailTemplate({
        companyName,
        jobTitle,
        slotSelectionUrl,
        interviewDate: app.interviewDate,
        interviewNote: app.interviewNote,
        availableSlots: slots.map((s) => ({
          startTime: s.startTime,
          endTime: s.endTime,
        })),
      });

      setImmediate(() => {
        this.sendEmailNotification(applicantEmail, subject, html).catch((err) =>
          this.logger.error(
            `Failed to send interview invitation to ${applicantEmail}:`,
            err,
          ),
        );
      });
    }

    // 인앱 알림 생성 / Create in-app notification
    setImmediate(() => {
      this.createInAppNotification(
        app.applicantId,
        'INTERVIEW_UPDATE',
        `${companyName}에서 면접을 요청했습니다. 면접 시간을 선택해주세요. / ${companyName} has requested an interview. Please select a time slot.`,
        {
          applicationId: applicationId,
          jobId: app.jobId.toString(),
          slotSelectionUrl,
        },
      ).catch((err) =>
        this.logger.error('Failed to create in-app notification:', err),
      );
    });

    return { success: true, message: 'Interview invitation sent' };
  }

  // ========================================
  // 외부 지원 자가체크 (Self Report - Job Seeker)
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
  // 스크랩 토글 (Toggle Scrap)
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
  // 내 스크랩 목록 (My Scraps)
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
  // 스크랩 여부 확인 (Check Scrap)
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

  // ========================================
  // Private Helpers
  // ========================================

  /**
   * 지원자 이메일 조회 / Lookup email from User table
   */
  private async getApplicantEmail(applicantId: string): Promise<string | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: applicantId },
      select: { email: true },
    });
    return user?.email ?? null;
  }

  /**
   * AWS SES 이메일 발송 / Send email via AWS SES
   */
  private async sendEmailNotification(
    to: string,
    subject: string,
    html: string,
  ): Promise<void> {
    const command = new SendEmailCommand({
      Source: process.env.MAIL_FROM,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: html,
            Charset: 'UTF-8',
          },
        },
      },
    });

    try {
      await this.sesClient.send(command);
      this.logger.log(`[AWS SES] Email sent to: ${to}, subject: ${subject}`);
    } catch (error) {
      this.logger.error(`[AWS SES] Failed to send email to: ${to}`, error);
      throw error;
    }
  }

  /**
   * 인앱 알림 생성 / Create in-app notification record
   */
  private async createInAppNotification(
    userId: string,
    type: string,
    content: string,
    metadata?: object,
  ): Promise<void> {
    try {
      await this.notificationPrisma.notification.create({
        data: {
          userId,
          content,
          notificationType: type as NotificationType,
          status: 'PENDING',
          channel: 'PUSH',
          isRead: false,
          metadata: metadata ? JSON.stringify(metadata) : null,
        },
      });
      this.logger.log(
        `[Notification] In-app notification created for user: ${userId}, type: ${type}`,
      );
    } catch (error) {
      this.logger.error(
        `[Notification] Failed to create in-app notification for user: ${userId}`,
        error,
      );
    }
  }

  // ========================================
  // Email Templates
  // ========================================

  /**
   * 합격/불합격 결과 이메일 템플릿 / Result notification email template
   */
  private getResultEmailTemplate(params: {
    companyName: string;
    jobTitle: string;
    isAccepted: boolean;
    message?: string;
    rejectionReason?: string;
  }): string {
    const { companyName, jobTitle, isAccepted, message, rejectionReason } =
      params;

    const resultTitle = isAccepted
      ? '합격을 축하드립니다! / Congratulations!'
      : '지원 결과 안내 / Application Result';

    const resultMessage = isAccepted
      ? `<p style="font-size: 16px; color: #28a745; font-weight: bold;">
           ${companyName}에서 귀하의 지원을 합격 처리하였습니다.<br>
           Your application to ${companyName} has been accepted.
         </p>`
      : `<p style="font-size: 16px; color: #333;">
           ${companyName}에서 지원 결과를 안내드립니다.<br>
           We would like to inform you of the application result from ${companyName}.
         </p>
         ${rejectionReason ? `<p style="font-size: 14px; color: #666;">사유 / Reason: ${rejectionReason}</p>` : ''}`;

    return `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>${resultTitle}</title></head>
      <body style="font-family: 'Pretendard', sans-serif; background-color: #f4f5f7; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; margin-top: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #007bff; margin: 0; font-size: 28px; font-weight: 800;">JobChaja</h1>
            <p style="color: #888; font-size: 14px; margin-top: 5px;">Global Job Platform for Foreigners</p>
          </div>
          <div style="border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 30px 0;">
            <h2 style="text-align: center; color: #333;">${resultTitle}</h2>
            <p style="font-size: 14px; color: #666; text-align: center;">
              공고 / Job: <strong>${jobTitle}</strong><br>
              기업 / Company: <strong>${companyName}</strong>
            </p>
            <div style="margin: 20px 0; text-align: center;">
              ${resultMessage}
            </div>
            ${message ? `<p style="font-size: 14px; color: #555; text-align: center; margin-top: 15px; background-color: #f8f9fa; padding: 15px; border-radius: 6px;">${message}</p>` : ''}
          </div>
          <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
            <p>본 메일은 발신 전용입니다.<br>&copy; 2026 JobChaja. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * 면접 초대 이메일 템플릿 / Interview invitation email template
   */
  private getInterviewInvitationEmailTemplate(params: {
    companyName: string;
    jobTitle: string;
    slotSelectionUrl: string;
    interviewDate?: Date | null;
    interviewNote?: string | null;
    availableSlots: { startTime: Date; endTime: Date }[];
  }): string {
    const {
      companyName,
      jobTitle,
      slotSelectionUrl,
      interviewDate,
      interviewNote,
      availableSlots,
    } = params;

    const slotsHtml =
      availableSlots.length > 0
        ? `<div style="margin: 20px 0;">
             <p style="font-size: 14px; color: #333; font-weight: bold;">
               선택 가능한 면접 시간 / Available Interview Times:
             </p>
             <ul style="list-style: none; padding: 0;">
               ${availableSlots
                 .map(
                   (s) =>
                     `<li style="padding: 8px 12px; margin: 4px 0; background-color: #f0f7ff; border-radius: 4px; font-size: 14px;">
                       ${s.startTime.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })} ~ ${s.endTime.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
                     </li>`,
                 )
                 .join('')}
             </ul>
           </div>`
        : '';

    const directDateHtml =
      interviewDate && availableSlots.length === 0
        ? `<p style="font-size: 14px; color: #333;">
             면접 일시 / Interview Date: <strong>${interviewDate.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</strong>
           </p>`
        : '';

    return `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>면접 초대 / Interview Invitation</title></head>
      <body style="font-family: 'Pretendard', sans-serif; background-color: #f4f5f7; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; margin-top: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #007bff; margin: 0; font-size: 28px; font-weight: 800;">JobChaja</h1>
            <p style="color: #888; font-size: 14px; margin-top: 5px;">Global Job Platform for Foreigners</p>
          </div>
          <div style="border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 30px 0;">
            <h2 style="text-align: center; color: #333;">면접 초대 / Interview Invitation</h2>
            <p style="font-size: 14px; color: #666; text-align: center;">
              공고 / Job: <strong>${jobTitle}</strong><br>
              기업 / Company: <strong>${companyName}</strong>
            </p>
            <div style="margin: 20px 0; text-align: center;">
              <p style="font-size: 16px; color: #333;">
                ${companyName}에서 면접을 요청했습니다.<br>
                ${companyName} has invited you for an interview.
              </p>
            </div>
            ${directDateHtml}
            ${slotsHtml}
            ${interviewNote ? `<p style="font-size: 13px; color: #666; background-color: #f8f9fa; padding: 12px; border-radius: 6px;">메모 / Note: ${interviewNote}</p>` : ''}
            <div style="text-align: center; margin-top: 25px;">
              <a href="${slotSelectionUrl}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: bold;">
                면접 시간 선택하기 / Select Interview Time
              </a>
            </div>
          </div>
          <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
            <p>본 메일은 발신 전용입니다.<br>&copy; 2026 JobChaja. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ========================================
  // 12. 면접 일정 제안 (Propose Interview)
  // ========================================
  async proposeInterview(
    applicationId: bigint,
    dto: ProposeInterviewDto,
    actorType: 'EMPLOYER' | 'APPLICANT',
    actorId: bigint,
  ) {
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: applicationId },
      include: { job: true },
    });
    if (!app) throw new NotFoundException('Application not found');

    // 권한 확인 / Validate actor owns this application
    if (actorType === 'EMPLOYER') {
      const corp = await this.prisma.corporateProfile.findUnique({
        where: { companyId: actorId },
      });
      if (!corp || app.job.corporateId !== corp.companyId) {
        throw new ForbiddenException('Not the owner of this job posting');
      }
    } else {
      if (app.applicantId !== actorId.toString()) {
        throw new ForbiddenException('Not the applicant');
      }
    }

    // 협상 횟수 제한 / Check round-trip limit (max 1)
    if (app.interviewRoundTrips >= 1) {
      throw new BadRequestException(
        'Maximum negotiation round-trips reached. The interview must be accepted or rejected.',
      );
    }

    // 상태 전이 검증 / Validate status for proposing
    if (actorType === 'EMPLOYER') {
      const allowedStatuses = [
        'PENDING',
        'INTERVIEW_REQUESTED',
        'COORDINATION_NEEDED',
      ];
      if (!allowedStatuses.includes(app.status)) {
        throw new BadRequestException(
          `Employer cannot propose interview when status is ${app.status}`,
        );
      }
    } else {
      // 지원자는 INTERVIEW_REQUESTED 상태에서만 역제안 가능
      // Applicant can only counter-propose when status is INTERVIEW_REQUESTED
      if (app.status !== 'INTERVIEW_REQUESTED') {
        throw new BadRequestException(
          `Applicant can only counter-propose when status is INTERVIEW_REQUESTED`,
        );
      }
    }

    // 면접 시간 유효성 검증 / Validate proposed times are in the future
    const firstChoice = new Date(dto.firstChoice);
    if (firstChoice <= new Date()) {
      throw new BadRequestException(
        'First choice datetime must be in the future',
      );
    }
    if (dto.secondChoice) {
      const secondChoice = new Date(dto.secondChoice);
      if (secondChoice <= new Date()) {
        throw new BadRequestException(
          'Second choice datetime must be in the future',
        );
      }
    }

    // 상태 결정 / Determine new status
    const newStatus =
      actorType === 'EMPLOYER' ? 'INTERVIEW_REQUESTED' : 'COORDINATION_NEEDED';

    // 지원서 업데이트 / Update application with interview details
    const updated = await this.prisma.jobApplication.update({
      where: { id: applicationId },
      data: {
        interviewMethod: dto.interviewMethod as any,
        interviewFirstChoice: firstChoice,
        interviewSecondChoice: dto.secondChoice
          ? new Date(dto.secondChoice)
          : null,
        interviewLocation: dto.location || null,
        interviewLink: dto.link || null,
        interviewRoundTrips: { increment: 1 },
        proposedBy: actorType as any,
        status: newStatus as any,
      },
    });

    // 상대방에게 알림 / Notify the other party
    if (actorType === 'EMPLOYER') {
      // 지원자에게 알림 / Notify applicant
      setImmediate(() => {
        this.createInAppNotification(
          app.applicantId,
          'INTERVIEW_UPDATE',
          `기업에서 면접 일정을 제안했습니다. 확인해주세요. / The employer has proposed an interview schedule. Please review.`,
          {
            applicationId: applicationId.toString(),
            jobId: app.jobId.toString(),
            proposedBy: actorType,
            interviewMethod: dto.interviewMethod,
            firstChoice: dto.firstChoice,
            secondChoice: dto.secondChoice,
            note: dto.note,
          },
        ).catch((err) =>
          this.logger.error('Failed to create in-app notification:', err),
        );
      });
    } else {
      // 기업에게 알림 / Notify employer
      const corp = await this.prisma.corporateProfile.findUnique({
        where: { companyId: app.job.corporateId },
      });
      if (corp) {
        setImmediate(() => {
          this.createInAppNotification(
            corp.authId,
            'INTERVIEW_UPDATE',
            `지원자가 면접 일정을 역제안했습니다. 확인해주세요. / The applicant has counter-proposed an interview schedule. Please review.`,
            {
              applicationId: applicationId.toString(),
              jobId: app.jobId.toString(),
              proposedBy: actorType,
              interviewMethod: dto.interviewMethod,
              firstChoice: dto.firstChoice,
              secondChoice: dto.secondChoice,
              note: dto.note,
            },
          ).catch((err) =>
            this.logger.error('Failed to create in-app notification:', err),
          );
        });
      }
    }

    return {
      success: true,
      status: newStatus,
      proposedBy: actorType,
      interviewMethod: dto.interviewMethod,
      firstChoice: firstChoice,
      secondChoice: dto.secondChoice ? new Date(dto.secondChoice) : null,
      interviewRoundTrips: updated.interviewRoundTrips,
    };
  }

  // ========================================
  // 13. 면접 수락 (Accept Interview - Applicant)
  // ========================================
  async acceptInterview(
    applicationId: bigint,
    dto: AcceptInterviewDto,
    applicantId: bigint,
  ) {
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: applicationId },
      include: { job: true },
    });
    if (!app) throw new NotFoundException('Application not found');

    // 지원자 확인 / Validate applicant
    if (app.applicantId !== applicantId.toString()) {
      throw new ForbiddenException('Not the applicant');
    }

    // 상태 확인 / Validate status
    if (
      app.status !== 'INTERVIEW_REQUESTED' &&
      app.status !== 'COORDINATION_NEEDED'
    ) {
      throw new BadRequestException(
        `Cannot accept interview when status is ${app.status}. Must be INTERVIEW_REQUESTED or COORDINATION_NEEDED.`,
      );
    }

    // 선택한 시간 결정 / Determine selected datetime
    let selectedTime: Date | null = null;
    if (dto.selectedChoice === 'FIRST') {
      selectedTime = app.interviewFirstChoice;
    } else {
      selectedTime = app.interviewSecondChoice;
    }

    if (!selectedTime) {
      throw new BadRequestException(
        `The ${dto.selectedChoice.toLowerCase()} choice datetime is not available`,
      );
    }

    // 지원서 업데이트 / Update application
    await this.prisma.jobApplication.update({
      where: { id: applicationId },
      data: {
        proposedTime: selectedTime,
        status: 'CONFIRMED',
      },
    });

    // 면접 확정 이메일 + 인앱 알림 발송 (지원자 + 기업 모두)
    // Send interview confirmation email + in-app notifications (both applicant & employer)
    setImmediate(() => {
      this.sendInterviewConfirmationEmail(applicationId).catch((err) => {
        this.logger.error(
          `Failed to send interview confirmation for app ${applicationId}:`,
          err,
        );
      });
    });

    return {
      success: true,
      status: 'CONFIRMED',
      confirmedTime: selectedTime,
      selectedChoice: dto.selectedChoice,
    };
  }

  // ========================================
  // 14. 면접 확정 이메일 발송 (Interview Confirmation Email)
  // ========================================
  async sendInterviewConfirmationEmail(applicationId: bigint): Promise<void> {
    // 지원서 + 공고 정보 조회 / Fetch application with job posting info
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: applicationId },
      include: { job: true },
    });
    if (!app) {
      this.logger.error(
        `[InterviewConfirmation] Application not found: ${applicationId}`,
      );
      return;
    }

    // 기업 정보 조회 / Fetch corporate profile
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { companyId: app.job.corporateId },
    });
    const companyName = corp?.companyNameOfficial || 'Unknown Company';
    const jobTitle = app.job.title;

    // 확정된 면접 시간 결정 / Determine the confirmed interview time
    const confirmedTime = app.proposedTime || app.interviewDate;

    // 면접 방식 결정 / Determine interview method
    const interviewMethod =
      (app as any).interviewMethod || app.job.interviewMethod || 'OFFLINE';
    const interviewLocation =
      (app as any).interviewLocation || app.job.interviewPlace;
    const interviewLink = (app as any).interviewLink;

    // 1. 지원자에게 확정 이메일 발송 / Send confirmation email to applicant
    const applicantEmail = await this.getApplicantEmail(app.applicantId);

    if (applicantEmail) {
      const subject = `[JobChaja] ${companyName} 면접 확정 안내 / Interview Confirmed with ${companyName}`;
      const html = this.getInterviewConfirmationEmailTemplate({
        companyName,
        jobTitle,
        confirmedTime,
        interviewMethod,
        interviewLocation,
        interviewLink,
        recipientType: 'APPLICANT',
      });

      setImmediate(() => {
        this.sendEmailNotification(applicantEmail, subject, html).catch((err) =>
          this.logger.error(
            `Failed to send interview confirmation email to applicant ${applicantEmail}:`,
            err,
          ),
        );
      });
    }

    // 2. 지원자에게 인앱 알림 생성 / Create in-app notification for applicant
    const confirmedTimeStr = confirmedTime
      ? confirmedTime.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
      : '미정 / TBD';

    setImmediate(() => {
      this.createInAppNotification(
        app.applicantId,
        'INTERVIEW_UPDATE',
        `${companyName} 면접이 확정되었습니다. (${confirmedTimeStr}) / Your interview with ${companyName} has been confirmed. (${confirmedTimeStr})`,
        {
          applicationId: applicationId.toString(),
          jobId: app.jobId.toString(),
          interviewTime: confirmedTime?.toISOString() || null,
          interviewMethod,
          ...(interviewMethod === 'ONLINE' && interviewLink
            ? { meetingLink: interviewLink }
            : {}),
          ...(interviewMethod === 'OFFLINE' && interviewLocation
            ? { location: interviewLocation }
            : {}),
        },
      ).catch((err) =>
        this.logger.error(
          'Failed to create in-app notification for applicant:',
          err,
        ),
      );
    });

    // 3. 기업 담당자에게 확정 알림 이메일 + 인앱 알림 / Notify employer
    if (corp) {
      const corpEmail = await this.getApplicantEmail(corp.authId);

      if (corpEmail) {
        const corpSubject = `[JobChaja] 면접 확정 안내 - ${jobTitle} / Interview Confirmed - ${jobTitle}`;
        const corpHtml = this.getInterviewConfirmationEmailTemplate({
          companyName,
          jobTitle,
          confirmedTime,
          interviewMethod,
          interviewLocation,
          interviewLink,
          recipientType: 'EMPLOYER',
        });

        setImmediate(() => {
          this.sendEmailNotification(corpEmail, corpSubject, corpHtml).catch(
            (err) =>
              this.logger.error(
                `Failed to send interview confirmation email to employer ${corpEmail}:`,
                err,
              ),
          );
        });
      }

      setImmediate(() => {
        this.createInAppNotification(
          corp.authId,
          'INTERVIEW_UPDATE',
          `면접이 확정되었습니다. (${confirmedTimeStr}) / Interview has been confirmed. (${confirmedTimeStr})`,
          {
            applicationId: applicationId.toString(),
            jobId: app.jobId.toString(),
            interviewTime: confirmedTime?.toISOString() || null,
            interviewMethod,
            ...(interviewMethod === 'ONLINE' && interviewLink
              ? { meetingLink: interviewLink }
              : {}),
            ...(interviewMethod === 'OFFLINE' && interviewLocation
              ? { location: interviewLocation }
              : {}),
          },
        ).catch((err) =>
          this.logger.error(
            'Failed to create in-app notification for employer:',
            err,
          ),
        );
      });
    }

    this.logger.log(
      `[InterviewConfirmation] Confirmation notifications sent for application ${applicationId}`,
    );
  }

  /**
   * 면접 확정 이메일 템플릿 / Interview confirmation email template
   */
  private getInterviewConfirmationEmailTemplate(params: {
    companyName: string;
    jobTitle: string;
    confirmedTime: Date | null;
    interviewMethod: string;
    interviewLocation?: string | null;
    interviewLink?: string | null;
    recipientType: 'APPLICANT' | 'EMPLOYER';
  }): string {
    const {
      companyName,
      jobTitle,
      confirmedTime,
      interviewMethod,
      interviewLocation,
      interviewLink,
      recipientType,
    } = params;

    const isApplicant = recipientType === 'APPLICANT';
    const isOnline = interviewMethod === 'ONLINE';

    const confirmedTimeStr = confirmedTime
      ? confirmedTime.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
      : '미정 / TBD';

    const methodLabel = isOnline
      ? '온라인 면접 / Online Interview'
      : '오프라인 면접 / Offline Interview';

    const methodDetailHtml = isOnline
      ? `<div style="margin: 15px 0; padding: 16px; background-color: #e8f5e9; border-radius: 8px; border-left: 4px solid #28a745;">
           <p style="font-size: 14px; color: #333; margin: 0 0 8px 0; font-weight: bold;">
             면접 방식 / Interview Method: ${methodLabel}
           </p>
           ${
             interviewLink
               ? `<p style="font-size: 14px; color: #333; margin: 0 0 8px 0;">미팅 링크 / Meeting Link:</p>
                  <a href="${interviewLink}" style="display: inline-block; background-color: #28a745; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: bold; margin-top: 4px;">미팅 참여하기 / Join Meeting</a>
                  <p style="font-size: 12px; color: #666; margin-top: 8px; word-break: break-all;">${interviewLink}</p>`
               : `<p style="font-size: 13px; color: #666; margin: 0;">미팅 링크는 별도 안내드립니다. / Meeting link will be provided separately.</p>`
           }
         </div>`
      : `<div style="margin: 15px 0; padding: 16px; background-color: #fff3e0; border-radius: 8px; border-left: 4px solid #ff9800;">
           <p style="font-size: 14px; color: #333; margin: 0 0 8px 0; font-weight: bold;">
             면접 방식 / Interview Method: ${methodLabel}
           </p>
           ${
             interviewLocation
               ? `<p style="font-size: 14px; color: #333; margin: 0;">면접 장소 / Location: <strong>${interviewLocation}</strong></p>`
               : `<p style="font-size: 13px; color: #666; margin: 0;">면접 장소는 별도 안내드립니다. / Interview location will be provided separately.</p>`
           }
         </div>`;

    const bodyMessage = isApplicant
      ? `<p style="font-size: 16px; color: #28a745; font-weight: bold;">면접 일정이 확정되었습니다.<br>Your interview schedule has been confirmed.</p>
         <p style="font-size: 14px; color: #555; margin-top: 8px;">아래 일정에 맞춰 면접에 참석해주세요.<br>Please attend the interview at the scheduled time below.</p>`
      : `<p style="font-size: 16px; color: #28a745; font-weight: bold;">면접 일정이 확정되었습니다.<br>The interview schedule has been confirmed.</p>
         <p style="font-size: 14px; color: #555; margin-top: 8px;">지원자가 면접 일정을 수락하였습니다.<br>The applicant has accepted the interview schedule.</p>`;

    return `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>면접 확정 / Interview Confirmed</title></head>
      <body style="font-family: 'Pretendard', sans-serif; background-color: #f4f5f7; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; margin-top: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #007bff; margin: 0; font-size: 28px; font-weight: 800;">JobChaja</h1>
            <p style="color: #888; font-size: 14px; margin-top: 5px;">Global Job Platform for Foreigners</p>
          </div>
          <div style="border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 30px 0;">
            <h2 style="text-align: center; color: #28a745;">면접 확정 / Interview Confirmed</h2>
            <p style="font-size: 14px; color: #666; text-align: center;">
              공고 / Job: <strong>${jobTitle}</strong><br>
              기업 / Company: <strong>${companyName}</strong>
            </p>
            <div style="margin: 20px 0; text-align: center;">${bodyMessage}</div>
            <div style="margin: 20px 0; padding: 16px; background-color: #f0f7ff; border-radius: 8px; text-align: center;">
              <p style="font-size: 13px; color: #666; margin: 0 0 4px 0;">면접 일시 / Interview Date & Time</p>
              <p style="font-size: 20px; color: #007bff; font-weight: bold; margin: 0;">${confirmedTimeStr}</p>
            </div>
            ${methodDetailHtml}
          </div>
          <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
            <p>본 메일은 발신 전용입니다.<br>&copy; 2026 JobChaja. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
