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
import { CreateSanctionDto } from './dto/create-sanction.dto';
import { UpdateSanctionDto } from './dto/update-sanction.dto';
import {
  AllSanctionsWithMetaResponse,
  SANCTIONS_PACKAGE_NAME,
  SanctionResponse,
  SanctionServiceClient,
  DeleteSanctionResponse,
  SingleSanctionResponse,
} from 'types/auth/sanction';
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

@Controller('sanction')
export class SanctionController {
  private sanctionService: SanctionServiceClient;
  private cacheVersion = 'v1';

  constructor(
    @Inject(SANCTIONS_PACKAGE_NAME) private readonly client: ClientGrpc,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  onModuleInit() {
    this.sanctionService =
      this.client.getService<SanctionServiceClient>('SanctionService');
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new sanction' })
  @ApiResponse({
    status: 201,
    description: 'Sanction created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async create(@Body() createSanctionDto: CreateSanctionDto): Promise<SanctionResponse> {
    try {
      const result = await firstValueFrom(
        this.sanctionService.createSanction({
          userId: createSanctionDto.userId,
          sanctionType: createSanctionDto.sanctionType,
          reason: createSanctionDto.reason,
          startDate: createSanctionDto.startDate,
          endDate: createSanctionDto.endDate,
        })
      );

      // Invalidate all sanctions cache
      await this.invalidateSanctionsCache();

      return result as unknown as SanctionResponse;
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
  @ApiOperation({ summary: 'Get all sanctions with pagination' })
  async findAll(
    @Query() query: BasicQuery
  ): Promise<AllSanctionsWithMetaResponse> {
    try {
      // Get current cache version
      const version = await this.getCacheVersion();
      const cacheKey = `sanctions:all:${version}:${JSON.stringify(query)}`;

      // Check cache first
      const cachedData =
        await this.cacheManager.get<AllSanctionsWithMetaResponse>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const result = await firstValueFrom(
        this.sanctionService.getAllSanctions({
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

      const response = result as unknown as AllSanctionsWithMetaResponse;

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
  @ApiOperation({ summary: 'Get a sanction by ID' })
  @ApiParam({ name: 'id', description: 'Sanction ID' })
  @ApiResponse({ status: 404, description: 'Sanction not found' })
  async findOne(@Param('id') id: string): Promise<SingleSanctionResponse> {
    try {
      const cacheKey = `sanction:${id}`;

      // Check cache first
      const cachedData = await this.cacheManager.get<SingleSanctionResponse>(
        cacheKey
      );
      if (cachedData) {
        return cachedData;
      }

      const result = await firstValueFrom(
        this.sanctionService.getSanction({ sanctionId: id })
      );

      const response = result as unknown as SingleSanctionResponse;

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
  @ApiOperation({ summary: 'Update a sanction' })
  @ApiParam({ name: 'id', description: 'Sanction ID' })
  @ApiResponse({
    status: 200,
    description: 'Sanction updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Sanction not found' })
  async update(
    @Param('id') id: string,
    @Body() updateSanctionDto: UpdateSanctionDto
  ): Promise<SanctionResponse> {
    try {
      const result = await firstValueFrom(
        this.sanctionService.updateSanction({
          sanctionId: id,
          sanctionType: updateSanctionDto.sanctionType,
          reason: updateSanctionDto.reason,
          startDate: updateSanctionDto.startDate,
          endDate: updateSanctionDto.endDate,
        })
      );

      // Invalidate specific sanction and all sanctions cache
      await this.cacheManager.del(`sanction:${id}`);
      await this.invalidateSanctionsCache();

      return result as unknown as SanctionResponse;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sanction' })
  @ApiParam({ name: 'id', description: 'Sanction ID' })
  @ApiResponse({
    status: 200,
    description: 'Sanction deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Sanction not found' })
  async remove(@Param('id') id: string): Promise<DeleteSanctionResponse> {
    try {
      const result = await firstValueFrom(
        this.sanctionService.deleteSanction({ sanctionId: id })
      );

      // Invalidate specific sanction and all sanctions cache
      await this.cacheManager.del(`sanction:${id}`);
      await this.invalidateSanctionsCache();

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
    const version = await this.cacheManager.get<string>('sanctions:version');
    if (!version) {
      await this.cacheManager.set('sanctions:version', this.cacheVersion, 0);
      return this.cacheVersion;
    }
    return version;
  }

  // Helper method to invalidate all sanctions cache by incrementing version
  private async invalidateSanctionsCache(): Promise<void> {
    try {
      const newVersion = `v${Date.now()}`;
      await this.cacheManager.set('sanctions:version', newVersion, 0);
    } catch (error) {
      console.error('Error invalidating cache:', error);
    }
  }
}
