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
import { CreateApplyDto } from './dto/create-apply.dto';
import { UpdateApplyDto } from './dto/update-apply.dto';
import {
  AllAppliesWithMetaResponse,
  APPLIES_PACKAGE_NAME,
  ApplyResponse,
  ApplyServiceClient,
  DeleteApplyResponse,
  SingleApplyResponse,
} from 'types/job/apply';
import { ClientGrpc } from '@nestjs/microservices';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BasicQuery,
  grpcToHttpStatus,
  Roles,
  RolesGuard,
  SessionAuthGuard,
} from '@in-job/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';

@Controller('apply')
export class ApplyController {
  private applyService: ApplyServiceClient;
  private cacheVersion = 'v1'; // Increment this when you want to invalidate all caches

  constructor(
    @Inject(APPLIES_PACKAGE_NAME) private readonly client: ClientGrpc,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  onModuleInit() {
    this.applyService =
      this.client.getService<ApplyServiceClient>('ApplyService');
  }

  @UseGuards(SessionAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new apply' })
  @ApiResponse({
    status: 201,
    description: 'Apply created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createApplyDto: CreateApplyDto): Promise<ApplyResponse> {
    try {
      const result = await firstValueFrom(
        this.applyService.createApply({
          jobPostId: createApplyDto.jobPostId,
          userId: createApplyDto.userId,
          userInfoId: createApplyDto.userInfoId,
          isReviewed: createApplyDto.isReviewed,
          status: createApplyDto.status as any,
        })
      );

      // Invalidate all applies cache
      await this.invalidateAppliesCache();

      return result as unknown as ApplyResponse;
    } catch (error: any) {
      throw new HttpException(
        grpcToHttpStatus(error.code) === 500
          ? 'Internal Server Error'
          : error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Get()
  @ApiOperation({ summary: 'Get all applies with pagination' })
  async findAll(
    @Query() query: BasicQuery
  ): Promise<AllAppliesWithMetaResponse> {
    try {
      // Get current cache version
      const version = await this.getCacheVersion();
      const cacheKey = `applies:all:${version}:${JSON.stringify(query)}`;

      // Check cache first
      const cachedData =
        await this.cacheManager.get<AllAppliesWithMetaResponse>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const result = await firstValueFrom(
        this.applyService.getAllApplies({
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

      const response = result as unknown as AllAppliesWithMetaResponse;

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
  @Roles('ADMIN', 'SUPERADMIN')
  @Get(':id')
  @ApiOperation({ summary: 'Get an apply by ID' })
  @ApiParam({ name: 'id', description: 'Apply ID' })
  @ApiResponse({ status: 404, description: 'Apply not found' })
  async findOne(@Param('id') id: string): Promise<SingleApplyResponse> {
    try {
      const cacheKey = `apply:${id}`;

      // Check cache first
      const cachedData = await this.cacheManager.get<SingleApplyResponse>(
        cacheKey
      );
      if (cachedData) {
        return cachedData;
      }

      const result = await firstValueFrom(
        this.applyService.getApply({ applyId: id })
      );

      const response = result as unknown as SingleApplyResponse;

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
  @Roles('ADMIN', 'SUPERADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Update an apply' })
  @ApiParam({ name: 'id', description: 'Apply ID' })
  @ApiResponse({
    status: 200,
    description: 'Apply updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Apply not found' })
  async update(
    @Param('id') id: string,
    @Body() updateApplyDto: UpdateApplyDto
  ): Promise<ApplyResponse> {
    try {
      console.log('Updating apply with ID:', id);
      const result = await firstValueFrom(
        this.applyService.updateApply({
          applyId: id,
          isReviewed: updateApplyDto.isReviewed,
          status: updateApplyDto.status as any,
          userInfoId: updateApplyDto.userInfoId,
        })
      );

      console.log('Update result:', result);

      // Invalidate specific apply and all applies cache
      await this.cacheManager.del(`apply:${id}`);
      await this.invalidateAppliesCache();

      return result as unknown as ApplyResponse;
    } catch (error: any) {
      console.error('the error : ', error);
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an apply' })
  @ApiParam({ name: 'id', description: 'Apply ID' })
  @ApiResponse({
    status: 200,
    description: 'Apply deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Apply not found' })
  async remove(@Param('id') id: string): Promise<DeleteApplyResponse> {
    try {
      const result = await firstValueFrom(
        this.applyService.deleteApply({ applyId: id })
      );

      // Invalidate specific apply and all applies cache
      await this.cacheManager.del(`apply:${id}`);
      await this.invalidateAppliesCache();

      return result;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  // Helper method to get cache version
  private async getCacheVersion(): Promise<string> {
    const version = await this.cacheManager.get<string>('applies:version');
    if (!version) {
      await this.cacheManager.set('applies:version', this.cacheVersion, 0); // No expiry
      return this.cacheVersion;
    }
    return version;
  }

  // Helper method to invalidate all applies cache by incrementing version
  private async invalidateAppliesCache(): Promise<void> {
    try {
      const newVersion = `v${Date.now()}`;
      await this.cacheManager.set('applies:version', newVersion, 0); // No expiry
    } catch (error) {
      console.error('Error invalidating cache:', error);
    }
  }
}
