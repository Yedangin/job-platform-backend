import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';

@Injectable()
export class JobScrapService {
  constructor(private readonly prisma: AuthPrismaService) {}

  async scrapJob(userId: string, jobId: string) {
    const job = await this.prisma.jobPosting.findUnique({
      where: { id: BigInt(jobId) },
    });
    if (!job) throw new NotFoundException('Job posting not found');

    const existing = await this.prisma.jobScrap.findUnique({
      where: { jobId_userId: { jobId: BigInt(jobId), userId } },
    });
    if (existing) throw new ConflictException('Already scrapped');

    await this.prisma.$transaction([
      this.prisma.jobScrap.create({
        data: { jobId: BigInt(jobId), userId },
      }),
      this.prisma.jobPosting.update({
        where: { id: BigInt(jobId) },
        data: { scrapCount: { increment: 1 } },
      }),
    ]);

    return { success: true };
  }

  async unscrapJob(userId: string, jobId: string) {
    const existing = await this.prisma.jobScrap.findUnique({
      where: { jobId_userId: { jobId: BigInt(jobId), userId } },
    });
    if (!existing) throw new NotFoundException('Scrap not found');

    await this.prisma.$transaction([
      this.prisma.jobScrap.delete({
        where: { jobId_userId: { jobId: BigInt(jobId), userId } },
      }),
      this.prisma.jobPosting.update({
        where: { id: BigInt(jobId) },
        data: { scrapCount: { decrement: 1 } },
      }),
    ]);

    return { success: true };
  }

  async getMyScraps(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.jobScrap.findMany({
        where: { userId },
        include: {
          job: {
            include: { albaAttributes: true, fulltimeAttributes: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.jobScrap.count({ where: { userId } }),
    ]);

    // Batch load corporate profiles
    const corporateIds = [
      ...new Set(items.map((s) => s.job.corporateId)),
    ];
    const corporates = await this.prisma.corporateProfile.findMany({
      where: { companyId: { in: corporateIds } },
    });
    const corpMap = new Map(
      corporates.map((c) => [c.companyId.toString(), c]),
    );

    return {
      items: items.map((s) => {
        const corp = corpMap.get(s.job.corporateId.toString());
        return {
          scrapId: s.id.toString(),
          scrappedAt: s.createdAt,
          job: {
            id: s.job.id.toString(),
            title: s.job.title,
            boardType: s.job.boardType,
            status: s.job.status,
            displayAddress: s.job.displayAddress,
            closingDate: s.job.closingDate,
            albaAttributes: s.job.albaAttributes
              ? { hourlyWage: s.job.albaAttributes.hourlyWage }
              : null,
            fulltimeAttributes: s.job.fulltimeAttributes
              ? {
                  salaryMin: s.job.fulltimeAttributes.salaryMin,
                  salaryMax: s.job.fulltimeAttributes.salaryMax,
                }
              : null,
            company: corp
              ? {
                  companyId: corp.companyId.toString(),
                  companyName: corp.companyNameOfficial,
                  logoImageUrl: corp.logoImageUrl,
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
}
