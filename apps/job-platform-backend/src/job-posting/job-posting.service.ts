import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthPrismaService, RedisService } from 'libs/common/src';
import { CouponService } from '../payment/coupon.service';

@Injectable()
export class JobPostingService {
  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly redis: RedisService,
    private readonly couponService: CouponService,
  ) {}

  // ========================================
  // 공고 목록 (공개)
  // ========================================
  async getJobListings(query: {
    boardType?: string;
    tierType?: string;
    visa?: string;
    keyword?: string;
    employmentSubType?: string;
    page?: number;
    limit?: number;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {
      status: 'ACTIVE',
    };

    if (query.boardType) {
      where.boardType = query.boardType;
    }
    if (query.tierType) {
      where.tierType = query.tierType;
    }
    if (query.visa) {
      where.allowedVisas = { contains: query.visa };
    }
    if (query.keyword) {
      where.OR = [
        { title: { contains: query.keyword, mode: 'insensitive' } },
        { description: { contains: query.keyword, mode: 'insensitive' } },
      ];
    }
    if (query.employmentSubType) {
      where.employmentSubType = query.employmentSubType;
    }

    const [items, total] = await Promise.all([
      this.prisma.jobPosting.findMany({
        where,
        include: {
          albaAttributes: true,
          fulltimeAttributes: true,
        },
        orderBy: [
          { isFeatured: 'desc' }, // 추천 공고 우선 / Featured first
          { tierType: 'asc' }, // PREMIUM first (P < S alphabetically)
          { bumpedAt: 'desc' }, // 끌어올리기 최신순 / Bumped first
          { createdAt: 'desc' }, // 최신 등록순 / Newest first
        ],
        skip,
        take: limit,
      }),
      this.prisma.jobPosting.count({ where }),
    ]);

    // 기업 프로필 정보를 별도로 조회
    const corporateIds = [...new Set(items.map((i) => i.corporateId))];
    const corporates = await this.prisma.corporateProfile.findMany({
      where: { companyId: { in: corporateIds } },
    });
    const corpMap = new Map(corporates.map((c) => [c.companyId.toString(), c]));

    return {
      items: items.map((item) => {
        const corp = corpMap.get(item.corporateId.toString());
        return this.formatJobPosting(item, corp);
      }),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ========================================
  // 공고 상세 (공개)
  // ========================================
  async getJobDetail(jobId: string, viewerIp?: string) {
    const job = await this.prisma.jobPosting.findUnique({
      where: { id: BigInt(jobId) },
      include: {
        albaAttributes: true,
        fulltimeAttributes: true,
      },
    });

    if (!job || job.status === 'DRAFT') {
      throw new NotFoundException('Job posting not found');
    }

    // 조회수 증가 (Redis로 IP 중복 방지, 1시간)
    if (viewerIp) {
      const viewKey = `job_view:${jobId}:${viewerIp}`;
      const alreadyViewed = await this.redis.exists(viewKey);
      if (!alreadyViewed) {
        await this.redis.set(viewKey, '1', 3600);
        await this.prisma.jobPosting.update({
          where: { id: BigInt(jobId) },
          data: { viewCount: { increment: 1 } },
        });
      }
    }

    const corp = await this.prisma.corporateProfile.findUnique({
      where: { companyId: job.corporateId },
    });

    return this.formatJobPosting(job, corp);
  }

  // ========================================
  // 공고 생성 (기업회원)
  // ========================================
  async createJobPosting(userId: string, data: any) {
    // 기업 프로필 확인
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) {
      throw new ForbiddenException('Corporate profile required');
    }

    // 기업 인증 완료 여부 확인
    if (corp.verificationStatus !== 'APPROVED') {
      throw new ForbiddenException(
        '기업 인증이 완료되지 않았습니다. 기업 인증 후 이용 가능합니다.',
      );
    }

    const jobData: any = {
      corporateId: corp.companyId,
      boardType: data.boardType,
      tierType: data.tierType || 'STANDARD',
      title: data.title,
      description: data.description,
      workContentImg: data.workContentImg,
      allowedVisas: data.allowedVisas, // "E-9,H-2,F-4"
      minKoreanLevel: data.minKoreanLevel || 0,
      displayAddress: data.displayAddress,
      actualAddress: data.actualAddress,
      workIntensity: data.workIntensity || 'MIDDLE',
      benefits: data.benefits ? JSON.stringify(data.benefits) : null,
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      contactEmail: data.contactEmail,
      applicationMethod: data.applicationMethod || 'PLATFORM',
      externalUrl: data.externalUrl,
      externalEmail: data.externalEmail,
      interviewMethod: data.interviewMethod || 'OFFLINE',
      interviewPlace: data.interviewPlace,
      employmentSubType: data.employmentSubType,
      closingDate: data.closingDate ? new Date(data.closingDate) : null,
      status: 'DRAFT',
    };

    const job = await this.prisma.jobPosting.create({
      data: jobData,
    });

    // boardType별 속성 추가
    if (data.boardType === 'PART_TIME' && data.albaAttributes) {
      await this.prisma.jobAttributesAlba.create({
        data: {
          jobId: job.id,
          hourlyWage: data.albaAttributes.hourlyWage,
          workPeriod: data.albaAttributes.workPeriod,
          workDaysMask: data.albaAttributes.workDaysMask || '1111100',
          workTimeStart: data.albaAttributes.workTimeStart,
          workTimeEnd: data.albaAttributes.workTimeEnd,
        },
      });
    } else if (data.boardType === 'FULL_TIME' && data.fulltimeAttributes) {
      await this.prisma.jobAttributesFulltime.create({
        data: {
          jobId: job.id,
          salaryMin: data.fulltimeAttributes.salaryMin,
          salaryMax: data.fulltimeAttributes.salaryMax,
          experienceLevel: data.fulltimeAttributes.experienceLevel || 'ENTRY',
          educationLevel:
            data.fulltimeAttributes.educationLevel || 'HIGH_SCHOOL',
        },
      });
    }

    // 첫 공고 등록 시 쿠폰 자동 발급 / Auto-grant coupon on first job posting
    const existingJobCount = await this.prisma.jobPosting.count({
      where: { corporateId: corp.companyId },
    });
    if (existingJobCount === 1) {
      // 방금 생성한 것이 유일한 공고 = 첫 공고
      // The just-created one is the only posting = first posting
      await this.couponService.grantFirstPostCoupons(userId, Number(job.id));
    }

    return { jobId: job.id.toString(), status: 'DRAFT' };
  }

  // ========================================
  // 공고 수정 (기업회원, 소유자)
  // ========================================
  async updateJobPosting(userId: string, jobId: string, data: any) {
    const job = await this.getOwnedJob(userId, jobId);

    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.allowedVisas !== undefined)
      updateData.allowedVisas = data.allowedVisas;
    if (data.minKoreanLevel !== undefined)
      updateData.minKoreanLevel = data.minKoreanLevel;
    if (data.displayAddress !== undefined)
      updateData.displayAddress = data.displayAddress;
    if (data.actualAddress !== undefined)
      updateData.actualAddress = data.actualAddress;
    if (data.workIntensity !== undefined)
      updateData.workIntensity = data.workIntensity;
    if (data.benefits !== undefined)
      updateData.benefits = JSON.stringify(data.benefits);
    if (data.contactName !== undefined)
      updateData.contactName = data.contactName;
    if (data.contactPhone !== undefined)
      updateData.contactPhone = data.contactPhone;
    if (data.contactEmail !== undefined)
      updateData.contactEmail = data.contactEmail;
    if (data.applicationMethod !== undefined)
      updateData.applicationMethod = data.applicationMethod;
    if (data.externalUrl !== undefined)
      updateData.externalUrl = data.externalUrl;
    if (data.externalEmail !== undefined)
      updateData.externalEmail = data.externalEmail;
    if (data.interviewMethod !== undefined)
      updateData.interviewMethod = data.interviewMethod;
    if (data.interviewPlace !== undefined)
      updateData.interviewPlace = data.interviewPlace;
    if (data.employmentSubType !== undefined)
      updateData.employmentSubType = data.employmentSubType;
    if (data.closingDate !== undefined)
      updateData.closingDate = data.closingDate
        ? new Date(data.closingDate)
        : null;
    if (data.workContentImg !== undefined)
      updateData.workContentImg = data.workContentImg;

    await this.prisma.jobPosting.update({
      where: { id: BigInt(jobId) },
      data: updateData,
    });

    // alba/fulltime attributes 업데이트
    if (data.albaAttributes && job.boardType === 'PART_TIME') {
      await this.prisma.jobAttributesAlba.upsert({
        where: { jobId: BigInt(jobId) },
        update: data.albaAttributes,
        create: { jobId: BigInt(jobId), ...data.albaAttributes },
      });
    }
    if (data.fulltimeAttributes && job.boardType === 'FULL_TIME') {
      await this.prisma.jobAttributesFulltime.upsert({
        where: { jobId: BigInt(jobId) },
        update: data.fulltimeAttributes,
        create: { jobId: BigInt(jobId), ...data.fulltimeAttributes },
      });
    }

    return { success: true };
  }

  // ========================================
  // 공고 활성화 (결제 완료 후)
  // ========================================
  async activateJobPosting(userId: string, jobId: string, orderId?: string) {
    const job = await this.getOwnedJob(userId, jobId);

    if (job.status !== 'DRAFT') {
      throw new BadRequestException('Only DRAFT postings can be activated');
    }

    const updateData: any = { status: 'ACTIVE' };
    if (orderId) {
      updateData.orderId = BigInt(orderId);
    }

    await this.prisma.jobPosting.update({
      where: { id: BigInt(jobId) },
      data: updateData,
    });

    return { success: true, status: 'ACTIVE' };
  }

  // ========================================
  // 공고 마감
  // ========================================
  async closeJobPosting(userId: string, jobId: string) {
    await this.getOwnedJob(userId, jobId);

    await this.prisma.jobPosting.update({
      where: { id: BigInt(jobId) },
      data: { status: 'CLOSED' },
    });

    return { success: true, status: 'CLOSED' };
  }

  // ========================================
  // 내 공고 목록 (기업회원)
  // ========================================
  async getMyJobPostings(
    userId: string,
    query: { status?: string; page?: number; limit?: number },
  ) {
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) {
      throw new ForbiddenException('Corporate profile required');
    }

    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { corporateId: corp.companyId };
    if (query.status) where.status = query.status;

    const [items, total] = await Promise.all([
      this.prisma.jobPosting.findMany({
        where,
        include: { albaAttributes: true, fulltimeAttributes: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.jobPosting.count({ where }),
    ]);

    return {
      items: items.map((item) => this.formatJobPosting(item, corp)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ========================================
  // 비자 추천 (규칙 엔진 연동)
  // ========================================
  async suggestVisas(userId: string) {
    const corp = await this.prisma.corporateProfile.findUnique({
      where: { authId: userId },
    });
    if (!corp) {
      throw new ForbiddenException('Corporate profile required');
    }

    // 활성 비자 유형 전체 목록 반환 + 기업 정보 기반 추천
    const allVisas = await this.prisma.visaType.findMany({
      where: { isActive: true },
      orderBy: { code: 'asc' },
    });

    return {
      allVisas: allVisas.map((v) => ({
        id: v.id.toString(),
        code: v.code,
        nameKo: v.nameKo,
        nameEn: v.nameEn,
        category: v.category,
      })),
      companyInfo: {
        ksicCode: corp.ksicCode,
        companySizeType: corp.companySizeType,
        employeeCountKorean: corp.employeeCountKorean,
        employeeCountForeign: corp.employeeCountForeign,
      },
    };
  }

  // ========================================
  // 활성 비자 유형 목록 (공개)
  // ========================================
  async getVisaTypes() {
    const types = await this.prisma.visaType.findMany({
      where: { isActive: true },
      orderBy: { code: 'asc' },
    });
    return types.map((v) => ({
      id: v.id.toString(),
      code: v.code,
      nameKo: v.nameKo,
      nameEn: v.nameEn,
      category: v.category,
    }));
  }

  // ========================================
  // Admin: 전체 공고 목록
  // ========================================
  async getAllJobPostings(query: {
    status?: string;
    boardType?: string;
    search?: string;
    corporateId?: string;
    page?: number;
    limit?: number;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.boardType) where.boardType = query.boardType;
    if (query.corporateId) where.corporateId = BigInt(query.corporateId);

    // search로 제목/회사명 검색 시, 회사명은 corporateId로 변환하여 필터링
    let searchCorpIds: bigint[] | null = null;
    if (query.search) {
      // 제목으로 직접 검색
      const titleCondition = {
        title: { contains: query.search, mode: 'insensitive' as const },
      };

      // 회사명으로 검색하여 corporateId 목록 가져오기
      const matchingCorps = await this.prisma.corporateProfile.findMany({
        where: {
          companyNameOfficial: { contains: query.search, mode: 'insensitive' },
        },
        select: { companyId: true },
      });
      searchCorpIds = matchingCorps.map((c) => c.companyId);

      if (searchCorpIds.length > 0) {
        where.OR = [titleCondition, { corporateId: { in: searchCorpIds } }];
      } else {
        where.title = { contains: query.search, mode: 'insensitive' };
      }
    }

    const [items, total] = await Promise.all([
      this.prisma.jobPosting.findMany({
        where,
        include: { albaAttributes: true, fulltimeAttributes: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.jobPosting.count({ where }),
    ]);

    const corporateIds = [...new Set(items.map((i) => i.corporateId))];
    const corporates = await this.prisma.corporateProfile.findMany({
      where: { companyId: { in: corporateIds } },
    });
    const corpMap = new Map(corporates.map((c) => [c.companyId.toString(), c]));

    return {
      items: items.map((item) => {
        const corp = corpMap.get(item.corporateId.toString());
        return this.formatJobPosting(item, corp);
      }),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ========================================
  // Admin: 공고 중지
  // ========================================
  async suspendJobPosting(adminId: string, jobId: string, reason: string) {
    const job = await this.prisma.jobPosting.findUnique({
      where: { id: BigInt(jobId) },
    });
    if (!job) throw new NotFoundException('Job posting not found');

    await this.prisma.jobPosting.update({
      where: { id: BigInt(jobId) },
      data: {
        status: 'SUSPENDED',
        suspendedAt: new Date(),
        suspendReason: reason,
        suspendedBy: adminId,
      },
    });

    await this.prisma.adminJobAction.create({
      data: {
        jobId: BigInt(jobId),
        adminId,
        actionType: 'SUSPEND',
        reason,
      },
    });

    return { success: true };
  }

  // ========================================
  // Admin: 공고 중지 해제
  // ========================================
  async unsuspendJobPosting(adminId: string, jobId: string) {
    await this.prisma.jobPosting.update({
      where: { id: BigInt(jobId) },
      data: {
        status: 'ACTIVE',
        suspendedAt: null,
        suspendReason: null,
        suspendedBy: null,
      },
    });

    await this.prisma.adminJobAction.create({
      data: {
        jobId: BigInt(jobId),
        adminId,
        actionType: 'UNSUSPEND',
      },
    });

    return { success: true };
  }

  // ========================================
  // Helpers
  // ========================================
  private async getOwnedJob(userId: string, jobId: string) {
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
    return job;
  }

  private formatJobPosting(item: any, corp?: any) {
    return {
      id: item.id.toString(),
      corporateId: item.corporateId.toString(),
      orderId: item.orderId?.toString(),
      boardType: item.boardType,
      tierType: item.tierType,
      title: item.title,
      description: item.description,
      workContentImg: item.workContentImg,
      status: item.status,
      closingDate: item.closingDate,
      allowedVisas: item.allowedVisas,
      minKoreanLevel: item.minKoreanLevel,
      displayAddress: item.displayAddress,
      actualAddress: item.actualAddress,
      workIntensity: item.workIntensity,
      benefits: item.benefits ? JSON.parse(item.benefits) : null,
      contactName: item.contactName,
      contactPhone: item.contactPhone,
      contactEmail: item.contactEmail,
      applicationMethod: item.applicationMethod,
      externalUrl: item.externalUrl,
      externalEmail: item.externalEmail,
      interviewMethod: item.interviewMethod,
      interviewPlace: item.interviewPlace,
      employmentSubType: item.employmentSubType,
      viewCount: item.viewCount,
      scrapCount: item.scrapCount,
      applyCount: item.applyCount,
      expiresAt: item.expiresAt,
      bumpedAt: item.bumpedAt,
      isUrgent: item.isUrgent || false,
      isFeatured: item.isFeatured || false,
      featuredUntil: item.featuredUntil,
      suspendedAt: item.suspendedAt,
      suspendReason: item.suspendReason,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      // 알바/정규직 전용 속성
      albaAttributes: item.albaAttributes
        ? {
            hourlyWage: item.albaAttributes.hourlyWage,
            workPeriod: item.albaAttributes.workPeriod,
            workDaysMask: item.albaAttributes.workDaysMask,
            workTimeStart: item.albaAttributes.workTimeStart,
            workTimeEnd: item.albaAttributes.workTimeEnd,
          }
        : null,
      fulltimeAttributes: item.fulltimeAttributes
        ? {
            salaryMin: item.fulltimeAttributes.salaryMin,
            salaryMax: item.fulltimeAttributes.salaryMax,
            experienceLevel: item.fulltimeAttributes.experienceLevel,
            educationLevel: item.fulltimeAttributes.educationLevel,
          }
        : null,
      // 기업 정보
      company: corp
        ? {
            companyId: corp.companyId.toString(),
            companyName: corp.companyNameOfficial,
            brandName: corp.brandName,
            logoImageUrl: corp.logoImageUrl,
            ksicCode: corp.ksicCode,
            addressRoad: corp.addressRoad,
          }
        : null,
    };
  }
}
