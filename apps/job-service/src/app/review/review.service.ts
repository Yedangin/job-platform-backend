import { AllReviewsWithMetaResponse, CreateReviewRequest, DeleteReviewResponse, ReviewResponse, SingleReviewResponse, UpdateReviewRequest } from 'types/job/review';
import { BasicQuery, JobPrismaService, PaginationResult, PaginationService } from '@in-job/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Review } from 'generated/prisma-job';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: JobPrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  private mapReviewToResponse(review: Review) {
    return {
      id: review.id,
      interviewId: review.interviewId,
      reviewerId: review.reviewerId,
      rating: review.rating || undefined,
      comment: review.comment || undefined,
      createdAt: review.createdAt.toISOString(),
    };
  }

  async findAll(basicQuery: BasicQuery): Promise<AllReviewsWithMetaResponse> {
    const searchColumn = ['id', 'comment'];

    const result = await this.paginationService.paginate<Review>(
      basicQuery,
      this.prisma.review,
      searchColumn,
      {
        interview: true,
      },
    );

    const mappedData = (result as PaginationResult<Review>)?.data.map(
      (review) => this.mapReviewToResponse(review),
    );

    return { data: mappedData, meta: result.meta };
  }


  async findOne(reviewId: string): Promise<SingleReviewResponse> {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
      include: { interview: true },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${reviewId} not found`);
    }

    return {
      message: 'Review retrieved successfully',
      review: {
        id: review.id,
        interviewId: review.interviewId,
        reviewerId: review.reviewerId,
        rating: review.rating || undefined,
        comment: review.comment || undefined,
        createdAt: review.createdAt.toISOString(),
      },
    };
  }

  async create(createReviewDto: CreateReviewRequest): Promise<ReviewResponse> {
    // Validate rating if provided
    if (createReviewDto.rating !== undefined && (createReviewDto.rating < 1 || createReviewDto.rating > 5)) {
      throw new Error('Rating must be between 1 and 5');
    }

    const review = await this.prisma.review.create({
      data: {
        interviewId: createReviewDto.interviewId,
        reviewerId: createReviewDto.reviewerId,
        rating: createReviewDto.rating,
        comment: createReviewDto.comment,
      },
    });

    return {
      success: true,
      message: 'Review created successfully',
    };
  }

  async update(updateReviewDto: UpdateReviewRequest): Promise<ReviewResponse> {
    const { reviewId } = updateReviewDto;
    const existingReview = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      throw new NotFoundException(`Review with ID ${reviewId} not found`);
    }

    // Validate rating if provided
    if (updateReviewDto.rating !== undefined && (updateReviewDto.rating < 1 || updateReviewDto.rating > 5)) {
      throw new Error('Rating must be between 1 and 5');
    }

    const updateData: any = {};

    if (updateReviewDto.rating !== undefined)
      updateData.rating = updateReviewDto.rating;
    if (updateReviewDto.comment !== undefined)
      updateData.comment = updateReviewDto.comment;

    const review = await this.prisma.review.update({
      where: { id: reviewId },
      data: updateData,
    });

    return {
      success: true,
      message: 'Review updated successfully',
    };
  }

  async remove(reviewId: string): Promise<DeleteReviewResponse> {
    const existingReview = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      throw new NotFoundException(`Review with ID ${reviewId} not found`);
    }

    await this.prisma.review.delete({
      where: { id: reviewId },
    });

    return {
      success: true,
      message: 'Review deleted successfully',
    };
  }
}
