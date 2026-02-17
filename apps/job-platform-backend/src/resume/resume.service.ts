/**
 * 이력서 서비스 — CRUD + 검색/열람
 * Resume service — CRUD + search/view with viewing credits
 */
import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { AuthPrismaService, RedisService, SessionData } from 'libs/common/src';
import { ViewingCreditService } from '../payment/viewing-credit.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Injectable()
export class ResumeService {
  private readonly logger = new Logger(ResumeService.name);

  constructor(
    private readonly authPrisma: AuthPrismaService,
    private readonly redisService: RedisService,
    private readonly viewingCreditService: ViewingCreditService,
  ) {}

  /**
   * 세션에서 userId 추출 / Extract userId from Redis session
   */
  private async getUserIdFromSession(sessionId: string): Promise<string> {
    const raw = await this.redisService.get(`session:${sessionId}`);
    if (!raw) throw new NotFoundException('세션을 찾을 수 없습니다 / Session not found');
    const session = JSON.parse(raw) as SessionData;
    if (!session.userId) throw new NotFoundException('사용자 ID가 없습니다 / User ID not found');
    return session.userId;
  }

  // ──── 인재 검색 (기업용) / Talent search for corporate ────

  /**
   * 인재 목록 검색 — 기본 정보만 반환 (연락처/상세 없음)
   * Search resumes — returns basic info only (no contact/details)
   */
  async search(
    sessionId: string,
    filters: {
      nationality?: string;
      topikLevel?: number;
      jobType?: string;
      region?: string;
      page?: number;
    },
  ) {
    const userId = await this.getUserIdFromSession(sessionId);
    const page = filters.page || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    // 필터 구성 / Build where clause
    const where: any = { isComplete: true };
    if (filters.nationality) where.nationality = filters.nationality;
    if (filters.topikLevel) where.topikLevel = { gte: filters.topikLevel };
    if (filters.jobType) where.preferredJobTypes = { has: filters.jobType };
    if (filters.region) where.preferredRegions = { has: filters.region };

    const [resumes, total] = await Promise.all([
      this.authPrisma.resume.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.authPrisma.resume.count({ where }),
    ]);

    // 기본 정보만 반환 (연락처/상세 제외) / Return basic info only
    return {
      talents: resumes.map((r) => ({
        resumeId: Number(r.id),
        nationality: r.nationality,
        topikLevel: r.topikLevel,
        kiipLevel: r.kiipLevel,
        preferredJobTypes: r.preferredJobTypes,
        preferredRegions: r.preferredRegions,
        workExperienceCount: Array.isArray(r.workExperiences)
          ? (r.workExperiences as any[]).length
          : 0,
        updatedAt: r.updatedAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * 인재 상세 열람 — 열람권 차감 후 전체 이력서 반환
   * View talent detail — deducts 1 credit, returns full resume
   */
  async viewDetail(sessionId: string, resumeId: number) {
    const userId = await this.getUserIdFromSession(sessionId);

    // 이력서 존재 확인 / Check resume exists
    const resume = await this.authPrisma.resume.findFirst({
      where: { id: BigInt(resumeId) },
    });
    if (!resume) {
      throw new NotFoundException('이력서를 찾을 수 없습니다 / Resume not found');
    }

    // 열람권 차감 (이미 열람한 경우 차감 없음)
    // Deduct credit (no deduction if already viewed)
    const result = await this.viewingCreditService.useCredit(userId, resumeId);

    this.logger.log(
      `[Resume] 인재 열람: userId=${userId}, resumeId=${resumeId}, remaining=${result.remainingCredits}`,
    );

    return {
      ...this.formatResponse(resume),
      remainingCredits: result.remainingCredits,
    };
  }

  /**
   * 열람 가능 여부 확인 / Check viewing access
   */
  async checkAccess(sessionId: string, resumeId: number) {
    const userId = await this.getUserIdFromSession(sessionId);
    const remaining = await this.viewingCreditService.getRemainingCredits(userId);

    // 이미 열람 여부 확인 / Check if already viewed
    let alreadyViewed = false;
    try {
      const history = await this.viewingCreditService.getViewingHistory(userId, 1, 1000);
      alreadyViewed = history.logs.some((l) => l.resumeId === resumeId);
    } catch {
      // 열람 기록 확인 실패 시 무시 / Ignore viewing history check failure
    }

    return {
      resumeId,
      alreadyViewed,
      hasCredits: remaining > 0,
      remainingCredits: remaining,
      canView: alreadyViewed || remaining > 0,
    };
  }

  // ──── 개인 CRUD / Personal CRUD ────

  /**
   * 이력서 생성 / Create a new resume for the current user
   */
  async create(sessionId: string, dto: CreateResumeDto) {
    const userId = await this.getUserIdFromSession(sessionId);

    const existing = await this.authPrisma.resume.findUnique({
      where: { userId },
    });
    if (existing) {
      throw new ConflictException(
        '이력서가 이미 존재합니다. 수정 API를 사용하세요 / Resume already exists. Use update API.',
      );
    }

    const resume = await this.authPrisma.resume.create({
      data: {
        userId,
        nationality: dto.nationality,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : null,
        educations: dto.educations ?? undefined,
        workExperiences: dto.workExperiences ?? undefined,
        topikLevel: dto.topikLevel ?? null,
        kiipLevel: dto.kiipLevel ?? null,
        certificates: dto.certificates ?? undefined,
        preferredJobTypes: dto.preferredJobTypes ?? [],
        preferredRegions: dto.preferredRegions ?? [],
        preferredSalary: dto.preferredSalary ?? null,
        preferredEmploymentTypes: dto.preferredEmploymentTypes ?? [],
        isComplete: this.checkCompleteness(dto),
      },
    });

    this.logger.log(
      `이력서 생성 완료: userId=${userId} / Resume created: userId=${userId}`,
    );
    return this.formatResponse(resume);
  }

  /**
   * 내 이력서 조회 / Get my resume
   */
  async getMyResume(sessionId: string) {
    const userId = await this.getUserIdFromSession(sessionId);

    const resume = await this.authPrisma.resume.findUnique({
      where: { userId },
    });

    if (!resume) {
      return null;
    }

    return this.formatResponse(resume);
  }

  /**
   * 이력서 수정 / Update my resume
   */
  async update(sessionId: string, dto: UpdateResumeDto) {
    const userId = await this.getUserIdFromSession(sessionId);

    const existing = await this.authPrisma.resume.findUnique({
      where: { userId },
    });
    if (!existing) {
      throw new NotFoundException(
        '이력서가 존재하지 않습니다. 먼저 생성하세요 / Resume not found. Create one first.',
      );
    }

    const updateData: any = {};
    if (dto.nationality !== undefined) updateData.nationality = dto.nationality;
    if (dto.birthDate !== undefined)
      updateData.birthDate = dto.birthDate ? new Date(dto.birthDate) : null;
    if (dto.educations !== undefined) updateData.educations = dto.educations;
    if (dto.workExperiences !== undefined)
      updateData.workExperiences = dto.workExperiences;
    if (dto.topikLevel !== undefined) updateData.topikLevel = dto.topikLevel;
    if (dto.kiipLevel !== undefined) updateData.kiipLevel = dto.kiipLevel;
    if (dto.certificates !== undefined)
      updateData.certificates = dto.certificates;
    if (dto.preferredJobTypes !== undefined)
      updateData.preferredJobTypes = dto.preferredJobTypes;
    if (dto.preferredRegions !== undefined)
      updateData.preferredRegions = dto.preferredRegions;
    if (dto.preferredSalary !== undefined)
      updateData.preferredSalary = dto.preferredSalary;
    if (dto.preferredEmploymentTypes !== undefined)
      updateData.preferredEmploymentTypes = dto.preferredEmploymentTypes;

    const merged = { ...this.resumeToDto(existing), ...dto };
    updateData.isComplete = this.checkCompleteness(merged);

    const updated = await this.authPrisma.resume.update({
      where: { userId },
      data: updateData,
    });

    this.logger.log(
      `이력서 수정 완료: userId=${userId} / Resume updated: userId=${userId}`,
    );
    return this.formatResponse(updated);
  }

  /**
   * 이력서 삭제 / Delete my resume
   */
  async delete(sessionId: string) {
    const userId = await this.getUserIdFromSession(sessionId);

    const existing = await this.authPrisma.resume.findUnique({
      where: { userId },
    });
    if (!existing) {
      throw new NotFoundException(
        '이력서가 존재하지 않습니다 / Resume not found',
      );
    }

    await this.authPrisma.resume.delete({ where: { userId } });

    this.logger.log(
      `이력서 삭제 완료: userId=${userId} / Resume deleted: userId=${userId}`,
    );
    return { message: '이력서가 삭제되었습니다 / Resume deleted' };
  }

  // ──── 헬퍼 / Helpers ────

  private checkCompleteness(dto: Partial<CreateResumeDto>): boolean {
    if (!dto.nationality) return false;
    const edus = dto.educations;
    if (!edus || (Array.isArray(edus) && edus.length === 0)) return false;
    if (
      (dto.topikLevel === undefined || dto.topikLevel === null) &&
      (dto.kiipLevel === undefined || dto.kiipLevel === null)
    )
      return false;
    return true;
  }

  private resumeToDto(resume: any): Partial<CreateResumeDto> {
    return {
      nationality: resume.nationality,
      birthDate: resume.birthDate?.toISOString().slice(0, 10),
      educations: resume.educations,
      workExperiences: resume.workExperiences,
      topikLevel: resume.topikLevel,
      kiipLevel: resume.kiipLevel,
      certificates: resume.certificates,
      preferredJobTypes: resume.preferredJobTypes,
      preferredRegions: resume.preferredRegions,
      preferredSalary: resume.preferredSalary,
      preferredEmploymentTypes: resume.preferredEmploymentTypes,
    };
  }

  private formatResponse(resume: any) {
    return {
      id: Number(resume.id),
      userId: resume.userId,
      nationality: resume.nationality,
      birthDate: resume.birthDate,
      educations: resume.educations,
      workExperiences: resume.workExperiences,
      topikLevel: resume.topikLevel,
      kiipLevel: resume.kiipLevel,
      certificates: resume.certificates,
      preferredJobTypes: resume.preferredJobTypes,
      preferredRegions: resume.preferredRegions,
      preferredSalary: resume.preferredSalary,
      preferredEmploymentTypes: resume.preferredEmploymentTypes,
      isComplete: resume.isComplete,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  }
}
