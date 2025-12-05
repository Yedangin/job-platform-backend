import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  OnModuleInit,
  Query,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UpdateJobPostDto } from './dto/update-job-post.dto';
import {
  JobPostResponseDto,
  GetAllJobPostsResponseDto,
  DeleteJobPostResponseDto,
} from './dto/job-post-response.dto';

import { ClientGrpc } from '@nestjs/microservices';
import {
  AllJobPostsWithMetaResponse,
  JOBPOST_PACKAGE_NAME,
  JobPostServiceClient,
} from 'types/job/job-post';
import { firstValueFrom } from 'rxjs';
import {
  BasicQuery,
  grpcToHttpStatus,
  Roles,
  RolesGuard,
  SessionAuthGuard,
} from '@in-job/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateJobPostDto } from './dto/create-job-post.dto';

@ApiTags('Job Posts')
@Controller('job-posts')
export class JobPostController implements OnModuleInit {
  private jobPostService: JobPostServiceClient;
  private cacheVersion = 'v1';

  constructor(
    @Inject(JOBPOST_PACKAGE_NAME) private readonly client: ClientGrpc,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  onModuleInit() {
    this.jobPostService =
      this.client.getService<JobPostServiceClient>('JobPostService');
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('CORPORATE', 'ADMIN', 'SUPERADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new job post' })
  @ApiResponse({
    status: 201,
    description: 'Job post created successfully',
    type: JobPostResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() createJobPostDto: CreateJobPostDto
  ): Promise<JobPostResponseDto> {
    try {
      const result = await firstValueFrom(
        this.jobPostService.createJobPost({
          title: createJobPostDto.title,
          description: createJobPostDto.description,
          location: createJobPostDto.location,
          salaryRange: createJobPostDto.salaryRange,
          categoryId: createJobPostDto.categoryId,
          feeType: createJobPostDto.feeType,
          status: createJobPostDto.status,
          expiredAt: createJobPostDto.expiredAt,
          corporateId: createJobPostDto.corporateId,
        })
      );

      // Invalidate cache for all job posts
      await this.invalidateJobPostCache();

      return result as unknown as JobPostResponseDto;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN', 'MEMBER', 'CORPORATE')
  @Get()
  @ApiOperation({ summary: 'Get all job posts with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Job posts retrieved successfully',
    // type: GetAllJobPostsResponseDto,
  })
  async findAll(
    @Query() query: BasicQuery
  ): Promise<GetAllJobPostsResponseDto> {
    try {
      // Get current cache version
      const version = await this.getCacheVersion();
      const cacheKey = `job-posts:all:${version}:${JSON.stringify(query)}`;

      console.log('Cache Key:', cacheKey);

      // Check cache first
      const cachedData = await this.cacheManager.get<GetAllJobPostsResponseDto>(
        cacheKey
      );
      if (cachedData) {
        return cachedData;
      }

      const result = await firstValueFrom(
        this.jobPostService.getAllJobPosts({
          basicQuery: {
            page: query.page,
            limit: query.limit,
            searchKeyword: query.searchKeyword,
            sortField: query.sortField,
            sortType: query.sortType,
            filterModel: query.filterModel,
            filterKeyword: query.filterKeyword,
          },
        })
      );

      const response = result as unknown as AllJobPostsWithMetaResponse;

      // Cache for 5 minutes
      await this.cacheManager.set(cacheKey, response, 300000);

      return response;
    } catch (error: any) {
      console.error('Error fetching job posts:', error);
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN', 'MEMBER', 'CORPORATE')
  @Get(':id')
  @ApiOperation({ summary: 'Get a job post by ID' })
  @ApiParam({ name: 'id', description: 'Job post ID' })
  @ApiResponse({
    status: 200,
    description: 'Job post retrieved successfully',
    type: JobPostResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Job post not found' })
  async findOne(@Param('id') id: string): Promise<JobPostResponseDto> {
    try {
      const cacheKey = `job-posts:${id}`;

      // Check cache first
      const cachedData = await this.cacheManager.get<JobPostResponseDto>(
        cacheKey
      );
      if (cachedData) {
        return cachedData;
      }

      const result = await firstValueFrom(
        this.jobPostService.getJobPost({ jobPostId: id })
      );

      const response = result as unknown as JobPostResponseDto;

      // Cache for 5 minutes
      await this.cacheManager.set(cacheKey, response, 300000);

      return response;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('CORPORATE', 'ADMIN', 'SUPERADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a job post' })
  @ApiParam({ name: 'id', description: 'Job post ID' })
  @ApiResponse({
    status: 200,
    description: 'Job post updated successfully',
    type: JobPostResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Job post not found' })
  async update(
    @Param('id') id: string,
    @Body() updateJobPostDto: UpdateJobPostDto
  ): Promise<JobPostResponseDto> {
    try {
      const result = await firstValueFrom(
        this.jobPostService.updateJobPost({
          jobPostId: id,
          title: updateJobPostDto.title,
          description: updateJobPostDto.description,
          location: updateJobPostDto.location,
          salaryRange: updateJobPostDto.salaryRange,
          categoryId: updateJobPostDto.categoryId,
          feeType: updateJobPostDto.feeType,
          status: updateJobPostDto.status,
          expiredAt: updateJobPostDto.expiredAt,
          approvedBy: updateJobPostDto.approvedBy,
          appliesCount: updateJobPostDto.appliesCount,
        })
      );

      // Invalidate cache
      await this.cacheManager.del(`job-posts:${id}`);
      await this.invalidateJobPostCache();

      return result as unknown as JobPostResponseDto;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('CORPORATE', 'ADMIN', 'SUPERADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job post' })
  @ApiParam({ name: 'id', description: 'Job post ID' })
  @ApiResponse({
    status: 200,
    description: 'Job post deleted successfully',
    type: DeleteJobPostResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Job post not found' })
  async remove(@Param('id') id: string): Promise<DeleteJobPostResponseDto> {
    try {
      const result = await firstValueFrom(
        this.jobPostService.deleteJobPost({ jobPostId: id })
      );

      // Invalidate cache
      await this.cacheManager.del(`job-posts:${id}`);
      await this.invalidateJobPostCache();

      return result as DeleteJobPostResponseDto;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  // @UseGuards(SessionAuthGuard, RolesGuard)
  // @Roles('CORPORATE', 'ADMIN', 'SUPERADMIN')
  // @Get('corporate/:corporateId')
  // @ApiOperation({ summary: 'Get job posts by corporate ID' })
  // @ApiParam({ name: 'corporateId', description: 'Corporate ID' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Job posts retrieved successfully',
  //   type: GetAllJobPostsResponseDto,
  // })
  // async findByCorporate(
  //   @Param('corporateId') corporateId: string,
  //   @Query('page') page: number = 1,
  //   @Query('limit') limit: number = 10,
  // ): Promise<GetAllJobPostsResponseDto> {
  //   try {
  //     const cacheKey = `job-posts:corporate:${corporateId}:${page}:${limit}`;

  //     // Check cache first
  //     const cachedData =
  //       await this.cacheManager.get<GetAllJobPostsResponseDto>(cacheKey);
  //     if (cachedData) {
  //       return cachedData;
  //     }

  //     const result = await firstValueFrom(
  //       this.jobPostService.listJobPosts({
  //         corporateId,
  //         page,
  //         limit,
  //       }),
  //     );

  //     const response = result as unknown as GetAllJobPostsResponseDto;

  //     // Cache for 5 minutes
  //     await this.cacheManager.set(cacheKey, response, 300000);

  //     return response;
  //   } catch (error: any) {
  //     throw new HttpException(
  //       error.details ?? error.message ?? 'Internal server error',
  //       grpcToHttpStatus(error.code ?? 2),
  //     );
  //   }
  // }

  // Helper method to get cache version
  private async getCacheVersion(): Promise<string> {
    const version = await this.cacheManager.get<string>('job-posts:version');
    if (!version) {
      await this.cacheManager.set('job-posts:version', this.cacheVersion, 0);
      return this.cacheVersion;
    }
    return version;
  }

  private async invalidateJobPostCache(): Promise<void> {
    try {
      const newVersion = `v${Date.now()}`;
      await this.cacheManager.set('job-posts:version', newVersion, 0);
    } catch (error) {
      console.error('Error invalidating cache:', error);
    }
  }
}
