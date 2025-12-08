import { AllReviewsWithMetaResponse, DeleteReviewResponse, ReviewResponse, REVIEWS_PACKAGE_NAME, ReviewServiceClient, SingleReviewResponse } from 'types/job/review';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
  HttpException,
  Query,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { BasicQuery, grpcToHttpStatus, Roles, RolesGuard, SessionAuthGuard } from '@in-job/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@Controller('review')
export class ReviewController {
  private reviewService: ReviewServiceClient;
  private cacheVersion = 'v1'; // Increment this when you want to invalidate all caches

  constructor(
    @Inject(REVIEWS_PACKAGE_NAME) private readonly client: ClientGrpc,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  onModuleInit() {
    this.reviewService =
      this.client.getService<ReviewServiceClient>('ReviewService');
  }

  @UseGuards(SessionAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({
    status: 201,
    description: 'Review created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 422, description: 'Validation error - Rating must be between 1 and 5' })
  async create(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<ReviewResponse> {
    try {
      const result = await firstValueFrom(
        this.reviewService.createReview({
          interviewId: createReviewDto.interviewId,
          reviewerId: createReviewDto.reviewerId,
          rating: createReviewDto.rating,
          comment: createReviewDto.comment,
        }),
      );

      // Invalidate all reviews cache
      await this.invalidateReviewsCache();

      return result as unknown as ReviewResponse;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Get()
  @ApiOperation({ summary: 'Get all reviews with pagination' })
  async findAll(
    @Query() query: BasicQuery,
  ): Promise<AllReviewsWithMetaResponse> {
    try {
      // Get current cache version
      const version = await this.getCacheVersion();
      const cacheKey = `reviews:all:${version}:${JSON.stringify(query)}`;

      // Check cache first
      const cachedData =
        await this.cacheManager.get<AllReviewsWithMetaResponse>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const result = await firstValueFrom(
        this.reviewService.getAllReviews({
          basicQuery: {
            page: query.page,
            limit: query.limit,
            searchKeyword: query.searchKeyword,
            sortField: query.sortField,
            sortType: query.sortType,
            filterModel: query.filterModel,
            filterKeyword: query.filterKeyword,
          },
        }),
      );

      const response = result as unknown as AllReviewsWithMetaResponse;

      // Cache for 5 minutes
      await this.cacheManager.set(cacheKey, response, 300000);

      return response;
    } catch (error: any) {
      console.error('the error : ', error);
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Get(':id')
  @ApiOperation({ summary: 'Get a review by ID' })
  @ApiParam({ name: 'id', description: 'Review ID' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  async findOne(@Param('id') id: string): Promise<SingleReviewResponse> {
    try {
      const cacheKey = `review:${id}`;

      // Check cache first
      const cachedData =
        await this.cacheManager.get<SingleReviewResponse>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const result = await firstValueFrom(
        this.reviewService.getReview({ reviewId: id }),
      );

      const response = result as unknown as SingleReviewResponse;

      // Cache for 5 minutes
      await this.cacheManager.set(cacheKey, response, 300000);

      return response;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a review' })
  @ApiParam({ name: 'id', description: 'Review ID' })
  @ApiResponse({
    status: 200,
    description: 'Review updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Review not found' })
  @ApiResponse({ status: 422, description: 'Validation error - Rating must be between 1 and 5' })
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewResponse> {
    try {
      console.log('Updating review with ID:', id);
      const result = await firstValueFrom(
        this.reviewService.updateReview({
          reviewId: id,
          rating: updateReviewDto.rating,
          comment: updateReviewDto.comment,
        }),
      );

      console.log('Update result:', result);

      // Invalidate specific review and all reviews cache
      await this.cacheManager.del(`review:${id}`);
      await this.invalidateReviewsCache();

      return result as unknown as ReviewResponse;
    } catch (error: any) {
      console.error('the error : ', error);
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review' })
  @ApiParam({ name: 'id', description: 'Review ID' })
  @ApiResponse({
    status: 200,
    description: 'Review deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Review not found' })
  async remove(@Param('id') id: string): Promise<DeleteReviewResponse> {
    try {
      const result = await firstValueFrom(
        this.reviewService.deleteReview({ reviewId: id }),
      );

      // Invalidate specific review and all reviews cache
      await this.cacheManager.del(`review:${id}`);
      await this.invalidateReviewsCache();

      return result;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
      );
    }
  }

  // Helper method to get cache version
  private async getCacheVersion(): Promise<string> {
    const version = await this.cacheManager.get<string>('reviews:version');
    if (!version) {
      await this.cacheManager.set('reviews:version', this.cacheVersion, 0); // No expiry
      return this.cacheVersion;
    }
    return version;
  }

  // Helper method to invalidate all reviews cache by incrementing version
  private async invalidateReviewsCache(): Promise<void> {
    try {
      const newVersion = `v${Date.now()}`;
      await this.cacheManager.set('reviews:version', newVersion, 0); // No expiry
    } catch (error) {
      console.error('Error invalidating cache:', error);
    }
  }

}
