import { Injectable, NotFoundException } from '@nestjs/common';
import { Interview, Prisma } from 'generated/prisma-job';
import {
  JobPrismaService,
  PaginationResult,
  PaginationService,
} from '@in-job/common';

import {
  AllInterviewsWithMetaResponse,
  Interview as InterviewProto,
  JobPost as JobPostProto,
  Review as ReviewProto,
  InterviewResponse,
  DeleteInterviewResponse,
  ListInterviewResponse,
} from 'types/job/interview';

@Injectable()
export class InterviewService {
  constructor(
    private readonly prisma: JobPrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  private mapInterviewToResponse(
    interview: Interview & { jobPost?: any; reviews?: any[] },
  ): InterviewProto {
    return {
      id: interview.id,
      jobPostId: interview.jobPostId,
      memberId: interview.memberId,
      corporateId: interview.corporateId,
      roomId: interview.roomId ?? undefined,
      interviewDate: interview.interviewDate?.toISOString() ?? undefined,
      status: interview.status,
      failureReason: interview.failureReason ?? undefined,
      createdAt: interview.createdAt.toISOString(),
      updatedAt: interview.updatedAt.toISOString(),
      jobPost: interview.jobPost
        ? this.mapJobPostToProto(interview.jobPost)
        : undefined,
      reviews: interview.reviews
        ? interview.reviews.map((review) => this.mapReviewToProto(review))
        : [],
    };
  }

  private mapJobPostToProto(jobPost: any): JobPostProto {
    return {
      id: jobPost.id,
      title: jobPost.title ?? undefined,
      corporateId: jobPost.corporateId,
    };
  }

  private mapReviewToProto(review: any): ReviewProto {
    return {
      id: review.id,
      interviewId: review.interviewId,
      reviewerId: review.reviewerId,
      rating: review.rating ?? undefined,
      comment: review.comment ?? undefined,
      createdAt: review.createdAt.toISOString(),
    };
  }

  async findAll(basicQuery: any): Promise<AllInterviewsWithMetaResponse> {
    const searchColumn = ['id', 'roomId', 'failureReason'];

    // Build where clause for filters
    const where: Prisma.InterviewWhereInput = {};

    if (basicQuery.filterModel) {
      if (basicQuery.filterModel.jobPostId) {
        where.jobPostId = basicQuery.filterModel.jobPostId;
      }
      if (basicQuery.filterModel.memberId) {
        where.memberId = basicQuery.filterModel.memberId;
      }
      if (basicQuery.filterModel.corporateId) {
        where.corporateId = basicQuery.filterModel.corporateId;
      }
      if (basicQuery.filterModel.status) {
        where.status = basicQuery.filterModel.status;
      }
    }

    const result = await this.paginationService.paginate<Interview>(
      basicQuery,
      this.prisma.interview,
      searchColumn,
      {
        jobPost: true,
        reviews: true,
      },
      where,
    );

    const mappedData = (result as PaginationResult<Interview>)?.data.map(
      (interview) => this.mapInterviewToResponse(interview),
    );

    return {
      data: mappedData,
      meta: result.meta,
    };
  }

  async findOne(interviewId: string): Promise<ListInterviewResponse> {
    const interview = await this.prisma.interview.findUnique({
      where: { id: interviewId },
      include: {
        jobPost: true,
        reviews: true,
      },
    });

    if (!interview) {
      throw new NotFoundException(`Interview with ID ${interviewId} not found`);
    }

    return {
      interview: this.mapInterviewToResponse(interview),
    };
  }

  async create(data: {
    jobPostId: string;
    memberId: string;
    corporateId: string;
    roomId?: string;
    interviewDate?: string;
    status?: string;
    failureReason?: string;
  }): Promise<InterviewResponse> {
    // Check if job post exists
    const jobPostExists = await this.prisma.jobPost.findUnique({
      where: { id: data.jobPostId },
    });

    if (!jobPostExists) {
      throw new NotFoundException(
        `Job post with ID ${data.jobPostId} not found`,
      );
    }

    // Check if interview already exists for this job post and member
    const existingInterview = await this.prisma.interview.findFirst({
      where: {
        jobPostId: data.jobPostId,
        memberId: data.memberId,
      },
    });

    if (existingInterview) {
      throw new Error('Interview already exists for this job post and member');
    }

    const interview = await this.prisma.interview.create({
      data: {
        jobPostId: data.jobPostId,
        memberId: data.memberId,
        corporateId: data.corporateId,
        roomId: data.roomId,
        interviewDate: data.interviewDate
          ? new Date(data.interviewDate)
          : undefined,
        status: (data.status as any) || 'PENDING',
        failureReason: data.failureReason,
      },
      include: {
        jobPost: true,
        reviews: true,
      },
    });

    return {
      success: true,
      message: 'Interview created successfully',
      data: this.mapInterviewToResponse(interview),
    };
  }

  async update(
    interviewId: string,
    data: {
      roomId?: string;
      interviewDate?: string;
      status?: string;
      failureReason?: string;
    },
  ): Promise<InterviewResponse> {
    const existingInterview = await this.prisma.interview.findUnique({
      where: { id: interviewId },
    });

    if (!existingInterview) {
      throw new NotFoundException(`Interview with ID ${interviewId} not found`);
    }

    const updateData: any = {};
    if (data.roomId !== undefined) updateData.roomId = data.roomId;
    if (data.interviewDate !== undefined)
      updateData.interviewDate = new Date(data.interviewDate);
    if (data.status !== undefined) updateData.status = data.status;
    if (data.failureReason !== undefined)
      updateData.failureReason = data.failureReason;

    const interview = await this.prisma.interview.update({
      where: { id: interviewId },
      data: updateData,
      include: {
        jobPost: true,
        reviews: true,
      },
    });

    return {
      success: true,
      message: 'Interview updated successfully',
      data: this.mapInterviewToResponse(interview),
    };
  }

  async remove(interviewId: string): Promise<DeleteInterviewResponse> {
    const existingInterview = await this.prisma.interview.findUnique({
      where: { id: interviewId },
    });

    if (!existingInterview) {
      throw new NotFoundException(`Interview with ID ${interviewId} not found`);
    }

    // Check if interview has reviews
    const reviewsCount = await this.prisma.review.count({
      where: { interviewId: interviewId },
    });

    if (reviewsCount > 0) {
      throw new Error(
        'Cannot delete interview with reviews. Please delete reviews first.',
      );
    }

    await this.prisma.interview.delete({
      where: { id: interviewId },
    });

    return {
      success: true,
      message: 'Interview deleted successfully',
    };
  }

  async listByJobPost(jobPostId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [interviews, total] = await Promise.all([
      this.prisma.interview.findMany({
        where: { jobPostId },
        include: {
          jobPost: true,
          reviews: true,
        },
        skip,
        take: limit,
        orderBy: { interviewDate: 'desc' },
      }),
      this.prisma.interview.count({ where: { jobPostId } }),
    ]);

    return {
      data: interviews.map((interview) =>
        this.mapInterviewToResponse(interview),
      ),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async listByMember(memberId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [interviews, total] = await Promise.all([
      this.prisma.interview.findMany({
        where: { memberId },
        include: {
          jobPost: true,
          reviews: true,
        },
        skip,
        take: limit,
        orderBy: { interviewDate: 'desc' },
      }),
      this.prisma.interview.count({ where: { memberId } }),
    ]);

    return {
      data: interviews.map((interview) =>
        this.mapInterviewToResponse(interview),
      ),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async listByCorporate(
    corporateId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    const [interviews, total] = await Promise.all([
      this.prisma.interview.findMany({
        where: { corporateId },
        include: {
          jobPost: true,
          reviews: true,
        },
        skip,
        take: limit,
        orderBy: { interviewDate: 'desc' },
      }),
      this.prisma.interview.count({ where: { corporateId } }),
    ]);

    return {
      data: interviews.map((interview) =>
        this.mapInterviewToResponse(interview),
      ),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateStatus(
    interviewId: string,
    status: string,
    failureReason?: string,
  ): Promise<InterviewResponse> {
    const existingInterview = await this.prisma.interview.findUnique({
      where: { id: interviewId },
    });

    if (!existingInterview) {
      throw new NotFoundException(`Interview with ID ${interviewId} not found`);
    }

    const updateData: any = { status };
    if (failureReason !== undefined) updateData.failureReason = failureReason;

    const interview = await this.prisma.interview.update({
      where: { id: interviewId },
      data: updateData,
      include: {
        jobPost: true,
        reviews: true,
      },
    });

    return {
      success: true,
      message: 'Interview status updated successfully',
      data: this.mapInterviewToResponse(interview),
    };
  }
}
