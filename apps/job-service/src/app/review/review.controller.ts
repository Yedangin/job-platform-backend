import { Controller } from '@nestjs/common';
import { ReviewService } from './review.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  AllReviewsWithMetaResponse,
  CreateReviewRequest,
  DeleteReviewRequest,
  DeleteReviewResponse,
  GetAllReviewsRequest,
  GetReviewRequest,
  ReviewResponse,
  SingleReviewResponse,
  UpdateReviewRequest,
} from 'types/job/review';
import { httpToGrpcStatus } from '@in-job/common';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @GrpcMethod('ReviewService', 'CreateReview')
  async CreateReview(request: CreateReviewRequest): Promise<ReviewResponse> {
    try {
      return await this.reviewService.create(request);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('ReviewService', 'GetAllReviews')
  async GetAllReviews(
    request: GetAllReviewsRequest
  ): Promise<AllReviewsWithMetaResponse> {
    try {
      const reviews = await this.reviewService.findAll(request.basicQuery);
      return reviews;
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('ReviewService', 'GetReview')
  async GetReview(request: GetReviewRequest): Promise<SingleReviewResponse> {
    try {
      return await this.reviewService.findOne(request.reviewId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('ReviewService', 'UpdateReview')
  async UpdateReview(request: UpdateReviewRequest): Promise<ReviewResponse> {
    try {
      return this.reviewService.update({
        reviewId: request.reviewId,
        rating: request.rating,
        comment: request.comment,
      });
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('ReviewService', 'DeleteReview')
  async DeleteReview(
    request: DeleteReviewRequest
  ): Promise<DeleteReviewResponse> {
    try {
      return await this.reviewService.remove(request.reviewId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }
}
