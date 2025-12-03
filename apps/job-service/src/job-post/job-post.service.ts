import { Injectable, NotFoundException } from '@nestjs/common';
import { JobPost } from 'generated/prisma-job';
import {
  JobPrismaService,
  PaginationResult,
  PaginationService,
} from 'libs/common/src';

import {
  AllJobPostsWithMetaResponse,
  JobPostResponse,
  DeleteJobPostResponse,
  ListJobPostResponse,
} from 'types/job/job-post';

@Injectable()
export class JobPostService {
  constructor(
    private readonly prisma: JobPrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  private mapJobPostToResponse(
    jobPost: JobPost & { category?: any; applies?: any[] },
  ) {
    return {
      id: jobPost.id,
      corporateId: jobPost.corporateId,
      title: jobPost.title ?? undefined,
      description: jobPost.description ?? undefined,
      location: jobPost.location ?? undefined,
      salaryRange: jobPost.salaryRange ?? undefined,
      categoryId: jobPost.categoryId ?? undefined,
      feeType: jobPost.feeType ?? undefined,
      status: jobPost.status,
      approvedBy: jobPost.approvedBy ?? undefined,
      appliesCount: jobPost.appliesCount ?? undefined,
      createdAt: jobPost.createdAt.toISOString(),
      updatedAt: jobPost.updatedAt.toISOString(),
      expiredAt: jobPost.expiredAt?.toISOString() ?? undefined,
      category: jobPost.category
        ? {
            id: jobPost.category.id,
            name: jobPost.category.name ?? undefined,
            description: jobPost.category.description ?? undefined,
          }
        : undefined,
      applies:
        jobPost.applies?.map((apply) => ({
          id: apply.id,
          jobPostId: apply.jobPostId,
          userId: apply.userId,
          status: apply.status,
          appliedAt: apply.appliedAt.toISOString(),
        })) ?? [],
    };
  }

  async findAll(basicQuery: any): Promise<AllJobPostsWithMetaResponse> {
    const searchColumn = [
      'id',
      'title',
      'description',
      'location',
      'salaryRange',
    ];

    // Build where clause for filters
    // const where: Prisma.JobPostWhereInput = {};

    // if (basicQuery.filterModel) {
    //   if (basicQuery.filterModel.corporateId) {
    //     where.corporateId = basicQuery.filterModel.corporateId;
    //   }
    //   if (basicQuery.filterModel.categoryId) {
    //     where.categoryId = basicQuery.filterModel.categoryId;
    //   }
    //   if (basicQuery.filterModel.status) {
    //     where.status = basicQuery.filterModel.status;
    //   }
    //   if (basicQuery.filterModel.feeType) {
    //     where.feeType = basicQuery.filterModel.feeType;
    //   }
    // }

    const result = await this.paginationService.paginate<JobPost>(
      basicQuery,
      this.prisma.jobPost,
      searchColumn,
      {
        category: true,
        // applies: {
        //   take: 10, // Limit applies in listing
        // },
      },
      // where,
    );

    const mappedData = (result as PaginationResult<JobPost>)?.data.map(
      (jobPost) => this.mapJobPostToResponse(jobPost),
    );

    return { data: mappedData, meta: result.meta };
  }

  async findOne(jobPostId: string): Promise<ListJobPostResponse> {
    const jobPost = await this.prisma.jobPost.findUnique({
      where: { id: jobPostId },
      include: {
        category: true,
        applies: true,
        interviews: true,
      },
    });

    if (!jobPost) {
      throw new NotFoundException(`Job post with ID ${jobPostId} not found`);
    }

    return {
      jobPost: this.mapJobPostToResponse(jobPost as any),
    };
  }

  async create(data: {
    title?: string;
    description?: string;
    location?: string;
    salaryRange?: string;
    categoryId?: string;
    feeType?: string;
    status?: string;
    expiredAt?: string;
    corporateId: string;
  }): Promise<JobPostResponse> {
    // Check if category exists if provided
    if (data.categoryId) {
      const categoryExists = await this.prisma.category.findUnique({
        where: { id: data.categoryId },
      });

      if (!categoryExists) {
        throw new NotFoundException(
          `Category with ID ${data.categoryId} not found`,
        );
      }
    }

    const jobPost = await this.prisma.jobPost.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        salaryRange: data.salaryRange,
        categoryId: data.categoryId,
        feeType: data.feeType,
        status: data.status as any,
        expiredAt: data.expiredAt ? new Date(data.expiredAt) : undefined,
        corporateId: data.corporateId,
      },
      include: {
        category: true,
      },
    });

    return {
      success: true,
      message: 'Job post created successfully',
    };
  }

  async update(
    jobPostId: string,
    data: {
      title?: string;
      description?: string;
      location?: string;
      salaryRange?: string;
      categoryId?: string;
      feeType?: string;
      status?: string;
      expiredAt?: string;
      approvedBy?: string;
      appliesCount?: number;
    },
  ): Promise<JobPostResponse> {
    const existingJobPost = await this.prisma.jobPost.findUnique({
      where: { id: jobPostId },
    });

    if (!existingJobPost) {
      throw new NotFoundException(`Job post with ID ${jobPostId} not found`);
    }

    // Check if category exists if provided and changed
    if (data.categoryId && data.categoryId !== existingJobPost.categoryId) {
      const categoryExists = await this.prisma.category.findUnique({
        where: { id: data.categoryId },
      });

      if (!categoryExists) {
        throw new NotFoundException(
          `Category with ID ${data.categoryId} not found`,
        );
      }
    }

    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.location !== undefined) updateData.location = data.location;
    if (data.salaryRange !== undefined)
      updateData.salaryRange = data.salaryRange;
    if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
    if (data.feeType !== undefined) updateData.feeType = data.feeType;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.expiredAt !== undefined)
      updateData.expiredAt = new Date(data.expiredAt);
    if (data.approvedBy !== undefined) updateData.approvedBy = data.approvedBy;
    if (data.appliesCount !== undefined)
      updateData.appliesCount = data.appliesCount;

    const jobPost = await this.prisma.jobPost.update({
      where: { id: jobPostId },
      data: updateData,
      include: {
        category: true,
      },
    });

    return {
      success: true,
      message: 'Job post updated successfully',
    };
  }

  async remove(jobPostId: string): Promise<DeleteJobPostResponse> {
    const existingJobPost = await this.prisma.jobPost.findUnique({
      where: { id: jobPostId },
    });

    if (!existingJobPost) {
      throw new NotFoundException(`Job post with ID ${jobPostId} not found`);
    }

    // Check if job post has applies
    const appliesCount = await this.prisma.apply.count({
      where: { jobPostId: jobPostId },
    });

    if (appliesCount > 0) {
      throw new Error(
        'Cannot delete job post with applications. Please delete applications first.',
      );
    }

    // Check if job post has interviews
    const interviewsCount = await this.prisma.interview.count({
      where: { jobPostId: jobPostId },
    });

    if (interviewsCount > 0) {
      throw new Error(
        'Cannot delete job post with interviews. Please delete interviews first.',
      );
    }

    await this.prisma.jobPost.delete({
      where: { id: jobPostId },
    });

    return {
      success: true,
      message: 'Job post deleted successfully',
    };
  }

  async listByCorporate(
    corporateId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    const [jobPosts, total] = await Promise.all([
      this.prisma.jobPost.findMany({
        where: { corporateId },
        include: {
          category: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.jobPost.count({ where: { corporateId } }),
    ]);

    return {
      data: jobPosts.map((jobPost) => this.mapJobPostToResponse(jobPost)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
