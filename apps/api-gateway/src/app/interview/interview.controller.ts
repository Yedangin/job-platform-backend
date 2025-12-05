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
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import {
  InterviewResponseDto,
  GetAllInterviewsResponseDto,
  DeleteInterviewResponseDto,
} from './dto/interview-response.dto';

import { ClientGrpc } from '@nestjs/microservices';
import {
  AllInterviewsWithMetaResponse,
  INTERVIEW_PACKAGE_NAME,
  InterviewServiceClient,
} from 'types/job/interview';
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

@ApiTags('Interviews')
@Controller('interviews')
export class InterviewController implements OnModuleInit {
  private interviewService: InterviewServiceClient;
  private cacheVersion = 'v1';

  constructor(
    @Inject(INTERVIEW_PACKAGE_NAME) private readonly client: ClientGrpc,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  onModuleInit() {
    this.interviewService =
      this.client.getService<InterviewServiceClient>('InterviewService');
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('CORPORATE', 'ADMIN', 'SUPERADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new interview' })
  @ApiResponse({
    status: 201,
    description: 'Interview created successfully',
    type: InterviewResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() createInterviewDto: CreateInterviewDto
  ): Promise<InterviewResponseDto> {
    try {
      const result = await firstValueFrom(
        this.interviewService.createInterview({
          jobPostId: createInterviewDto.jobPostId,
          memberId: createInterviewDto.memberId,
          corporateId: createInterviewDto.corporateId,
          roomId: createInterviewDto.roomId,
          interviewDate: createInterviewDto.interviewDate,
          status: createInterviewDto.status,
          failureReason: createInterviewDto.failureReason,
        })
      );

      // Invalidate cache for all interviews
      await this.invalidateInterviewCache();

      return result as unknown as InterviewResponseDto;
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
  @ApiOperation({ summary: 'Get all interviews with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Interviews retrieved successfully',
    type: GetAllInterviewsResponseDto,
  })
  async findAll(
    @Query() query: BasicQuery
  ): Promise<GetAllInterviewsResponseDto> {
    try {
      // Get current cache version
      const version = await this.getCacheVersion();
      const cacheKey = `interviews:all:${version}:${JSON.stringify(query)}`;

      console.log('Cache Key:', cacheKey);

      // Check cache first
      const cachedData =
        await this.cacheManager.get<GetAllInterviewsResponseDto>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const result = await firstValueFrom(
        this.interviewService.getAllInterviews({
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

      const response = result as unknown as AllInterviewsWithMetaResponse;

      // Cache for 5 minutes
      await this.cacheManager.set(cacheKey, response, 300000);

      return response;
    } catch (error: any) {
      console.error('Error fetching interviews:', error);
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN', 'MEMBER', 'CORPORATE')
  @Get(':id')
  @ApiOperation({ summary: 'Get an interview by ID' })
  @ApiParam({ name: 'id', description: 'Interview ID' })
  @ApiResponse({
    status: 200,
    description: 'Interview retrieved successfully',
    type: InterviewResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Interview not found' })
  async findOne(@Param('id') id: string): Promise<InterviewResponseDto> {
    try {
      const cacheKey = `interviews:${id}`;

      // Check cache first
      const cachedData = await this.cacheManager.get<InterviewResponseDto>(
        cacheKey
      );
      if (cachedData) {
        return cachedData;
      }

      const result = await firstValueFrom(
        this.interviewService.getInterview({ interviewId: id })
      );

      const response = result as unknown as InterviewResponseDto;

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
  @ApiOperation({ summary: 'Update an interview' })
  @ApiParam({ name: 'id', description: 'Interview ID' })
  @ApiResponse({
    status: 200,
    description: 'Interview updated successfully',
    type: InterviewResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Interview not found' })
  async update(
    @Param('id') id: string,
    @Body() updateInterviewDto: UpdateInterviewDto
  ): Promise<InterviewResponseDto> {
    try {
      const result = await firstValueFrom(
        this.interviewService.updateInterview({
          interviewId: id,
          roomId: updateInterviewDto.roomId,
          interviewDate: updateInterviewDto.interviewDate,
          status: updateInterviewDto.status,
          failureReason: updateInterviewDto.failureReason,
        })
      );

      // Invalidate cache
      await this.cacheManager.del(`interviews:${id}`);
      await this.invalidateInterviewCache();

      return result as unknown as InterviewResponseDto;
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
  @ApiOperation({ summary: 'Delete an interview' })
  @ApiParam({ name: 'id', description: 'Interview ID' })
  @ApiResponse({
    status: 200,
    description: 'Interview deleted successfully',
    type: DeleteInterviewResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Interview not found' })
  async remove(@Param('id') id: string): Promise<DeleteInterviewResponseDto> {
    try {
      const result = await firstValueFrom(
        this.interviewService.deleteInterview({ interviewId: id })
      );

      // Invalidate cache
      await this.cacheManager.del(`interviews:${id}`);
      await this.invalidateInterviewCache();

      return result as DeleteInterviewResponseDto;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('MEMBER', 'CORPORATE', 'ADMIN', 'SUPERADMIN')
  @Get('job-post/:jobPostId')
  @ApiOperation({ summary: 'Get interviews by job post ID' })
  @ApiParam({ name: 'jobPostId', description: 'Job post ID' })
  @ApiResponse({
    status: 200,
    description: 'Interviews retrieved successfully',
    type: GetAllInterviewsResponseDto,
  })
  async findByJobPost(
    @Param('jobPostId') jobPostId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<GetAllInterviewsResponseDto> {
    try {
      const cacheKey = `interviews:job-post:${jobPostId}:${page}:${limit}`;

      // Check cache first
      const cachedData =
        await this.cacheManager.get<GetAllInterviewsResponseDto>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const result = await firstValueFrom(
        this.interviewService.listInterviews({
          jobPostId,
          page,
          limit,
        })
      );

      const response = result as unknown as GetAllInterviewsResponseDto;

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
  @Roles('MEMBER', 'CORPORATE', 'ADMIN', 'SUPERADMIN')
  @Get('member/:memberId')
  @ApiOperation({ summary: 'Get interviews by member ID' })
  @ApiParam({ name: 'memberId', description: 'Member ID' })
  @ApiResponse({
    status: 200,
    description: 'Interviews retrieved successfully',
    type: GetAllInterviewsResponseDto,
  })
  async findByMember(
    @Param('memberId') memberId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<GetAllInterviewsResponseDto> {
    try {
      const cacheKey = `interviews:member:${memberId}:${page}:${limit}`;

      // Check cache first
      const cachedData =
        await this.cacheManager.get<GetAllInterviewsResponseDto>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const result = await firstValueFrom(
        this.interviewService.listInterviews({
          memberId,
          page,
          limit,
        })
      );

      const response = result as unknown as GetAllInterviewsResponseDto;

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
  @Get('corporate/:corporateId')
  @ApiOperation({ summary: 'Get interviews by corporate ID' })
  @ApiParam({ name: 'corporateId', description: 'Corporate ID' })
  @ApiResponse({
    status: 200,
    description: 'Interviews retrieved successfully',
    type: GetAllInterviewsResponseDto,
  })
  async findByCorporate(
    @Param('corporateId') corporateId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<GetAllInterviewsResponseDto> {
    try {
      const cacheKey = `interviews:corporate:${corporateId}:${page}:${limit}`;

      // Check cache first
      const cachedData =
        await this.cacheManager.get<GetAllInterviewsResponseDto>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const result = await firstValueFrom(
        this.interviewService.listInterviews({
          corporateId,
          page,
          limit,
        })
      );

      const response = result as unknown as GetAllInterviewsResponseDto;

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
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update interview status' })
  @ApiParam({ name: 'id', description: 'Interview ID' })
  @ApiResponse({
    status: 200,
    description: 'Interview status updated successfully',
    type: InterviewResponseDto,
  })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Body('failureReason') failureReason?: string
  ): Promise<InterviewResponseDto> {
    try {
      const result = await firstValueFrom(
        this.interviewService.updateInterview({
          interviewId: id,
          status,
          failureReason,
        })
      );

      // Invalidate cache
      await this.cacheManager.del(`interviews:${id}`);
      await this.invalidateInterviewCache();

      return result as unknown as InterviewResponseDto;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  // Helper method to get cache version
  private async getCacheVersion(): Promise<string> {
    const version = await this.cacheManager.get<string>('interviews:version');
    if (!version) {
      await this.cacheManager.set('interviews:version', this.cacheVersion, 0);
      return this.cacheVersion;
    }
    return version;
  }

  // Helper method to invalidate all interviews cache by incrementing version
  private async invalidateInterviewCache(): Promise<void> {
    try {
      const newVersion = `v${Date.now()}`;
      await this.cacheManager.set('interviews:version', newVersion, 0);
    } catch (error) {
      console.error('Error invalidating cache:', error);
    }
  }
}
