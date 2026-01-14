import { Injectable, NotFoundException } from '@nestjs/common';
import { Apply, JobPost } from 'generated/prisma-job';
import {
  AuthPrismaService,
  JobPrismaService,
  PaginationResult,
  PaginationService,
} from '@in-job/common';
import {
  AllAppliesWithMetaResponse,
  CreateApplyRequest,
  DeleteApplyResponse,
  ApplyResponse,
  AppliedStatus,
  SingleApplyResponse,
  UpdateApplyRequest,
} from 'types/job/apply';

@Injectable()
export class ApplyService {
  constructor(
    private readonly userPrisma: AuthPrismaService,
    private readonly prisma: JobPrismaService,
    private readonly paginationService: PaginationService
  ) {}

  private mapApplyStatus(status: string): AppliedStatus {
    const statusMap: Record<string, AppliedStatus> = {
      PENDING: AppliedStatus.PENDING,
      INTERVIEW: AppliedStatus.INTERVIEW,
      CONFIRMED: AppliedStatus.CONFIRMED,
      REJECTED: AppliedStatus.REJECTED,
      SUCCESS: AppliedStatus.SUCCESS,
    };
    return statusMap[status] || AppliedStatus.PENDING;
  }

  private mapApplyToResponse(apply: Apply & { jobPost?: JobPost }) {
    return {
      id: apply.id,
      jobPostId: apply.jobPostId,
      userId: apply.userId,
      userInfoId: apply.userInfoId || undefined,
      isReviewed: apply.isReviewed,
      status: this.mapApplyStatus(apply.status as string),
      appliedAt: apply.appliedAt.toISOString(),
      memberFullname: apply.memberFullName || undefined,
      memberEmail: apply.memberEmail || undefined,
      memberPhone: apply.memberPhone || undefined,
      memberCVForm: apply.memberCVForm || undefined,
      // jobPosts: apply.jobPost
      //   ? [
      //       {
      //         id: apply.jobPost.id,
      //         title: apply.jobPost.title,
      //       },
      //     ]
      //   : [],
      jobPosts: {
        id: apply.jobPost.id,
        title: apply.jobPost.title,
      },
      
    };
  }

  async findAll(basicQuery: any): Promise<AllAppliesWithMetaResponse> {
    const searchColumn = ['id', 'jobPostId', 'userId', 'userInfoId'];

    const result = await this.paginationService.paginate<Apply>(
      basicQuery,
      this.prisma.apply,
      searchColumn,
      {
        // Include any relations if needed
        jobPost: true,
      }
    );

    const mappedData = (result as PaginationResult<Apply>)?.data.map((apply) =>
      this.mapApplyToResponse(apply)
    );

    return { data: mappedData, meta: result.meta };
  }

  async findOne(applyId: string): Promise<SingleApplyResponse> {
    const apply = await this.prisma.apply.findUnique({
      where: { id: applyId },
      include: { jobPost: true },
    });

    if (!apply) {
      throw new NotFoundException(`Apply with ID ${applyId} not found`);
    }

    return {
      message: 'Apply retrieved successfully',
      apply: {
        id: apply.id,
        jobPostId: apply.jobPostId,
        userId: apply.userId,
        userInfoId: apply.userInfoId || undefined,
        isReviewed: apply.isReviewed,
        status: this.mapApplyStatus(apply.status as string),
        appliedAt: apply.appliedAt.toISOString(),
        jobPosts: {
          id: apply.jobPost.id,
          title: apply.jobPost.title,
        },
      },
    };
  }

  async create(createApplyDto: CreateApplyRequest): Promise<ApplyResponse> {
    // Check if job post exists
    const jobPost = await this.prisma.jobPost.findUnique({
      where: { id: createApplyDto.jobPostId },
    });

    if (!jobPost) {
      throw new NotFoundException(
        `Job post with ID ${createApplyDto.jobPostId} not found`
      );
    }

    const memberInformation = await this.userPrisma.user.findUnique({
      where: { id: createApplyDto.userId },
      include: {
        userInformation: {
          select : {
            cvForm: true,
          }
        }
      }
    })

    const apply = await this.prisma.apply.create({
      data: {
        jobPostId: createApplyDto.jobPostId,
        userId: createApplyDto.userId,
        userInfoId: createApplyDto.userInfoId,
        isReviewed: createApplyDto.isReviewed || false,
        status: (createApplyDto.status as any) || 'PENDING',
        memberFullName: memberInformation?.fullName || undefined,
        memberEmail: memberInformation?.email || undefined,
        memberPhone: memberInformation?.phone || undefined,
        memberCVForm: memberInformation?.userInformation?.cvForm || undefined,
      },
    });

    // Increment appliesCount in job post
    await this.prisma.jobPost.update({
      where: { id: createApplyDto.jobPostId },
      data: {
        appliesCount: {
          increment: 1,
        },
      },
    });

    return {
      success: true,
      message: 'Apply created successfully',
    };
  }

  async update(updateApplyDto: UpdateApplyRequest): Promise<ApplyResponse> {
    const { applyId } = updateApplyDto;
    const existingApply = await this.prisma.apply.findUnique({
      where: { id: applyId },
    });

    if (!existingApply) {
      throw new NotFoundException(`Apply with ID ${applyId} not found`);
    }

    const updateData: any = {};

    if (updateApplyDto.isReviewed !== undefined)
      updateData.isReviewed = updateApplyDto.isReviewed;
    if (updateApplyDto.status !== undefined)
      updateData.status = updateApplyDto.status;
    if (updateApplyDto.userInfoId !== undefined)
      updateData.userInfoId = updateApplyDto.userInfoId;

    const apply = await this.prisma.apply.update({
      where: { id: applyId },
      data: updateData,
    });

    return {
      success: true,
      message: 'Apply updated successfully',
    };
  }

  async remove(applyId: string): Promise<DeleteApplyResponse> {
    const existingApply = await this.prisma.apply.findUnique({
      where: { id: applyId },
    });

    if (!existingApply) {
      throw new NotFoundException(`Apply with ID ${applyId} not found`);
    }

    await this.prisma.apply.delete({
      where: { id: applyId },
    });

    // Decrement appliesCount in job post
    await this.prisma.jobPost.update({
      where: { id: existingApply.jobPostId },
      data: {
        appliesCount: {
          decrement: 1,
        },
      },
    });

    return {
      success: true,
      message: 'Apply deleted successfully',
    };
  }
}
