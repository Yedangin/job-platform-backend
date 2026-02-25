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
  Logger,
  Query,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import {
  AllReportsWithMetaResponse,
  DeleteReportResponse,
  ReportResponse,
  REPORTS_PACKAGE_NAME,
  ReportServiceClient,
  SingleReportResponse,
} from 'types/job/report';
import { ClientGrpc } from '@nestjs/microservices';
import {
  BasicQuery,
  grpcToHttpStatus,
  Roles,
  RolesGuard,
  SessionAuthGuard,
} from 'libs/common/src';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@Controller('report')
export class ReportController {
  private reportService: ReportServiceClient;
  private cacheVersion = 'v1'; // Increment this when you want to invalidate all caches

  constructor(
    @Inject(REPORTS_PACKAGE_NAME) private readonly client: ClientGrpc,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  onModuleInit() {
    this.reportService =
      this.client.getService<ReportServiceClient>('ReportService');
  }

  @UseGuards(SessionAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new report' })
  @ApiResponse({
    status: 201,
    description: 'Report created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() createReportDto: CreateReportDto,
  ): Promise<ReportResponse> {
    try {
      const result = await firstValueFrom(
        this.reportService.createReport({
          title: createReportDto.title,
          reporterId: createReportDto.reporterId,
          reportedUserId: createReportDto.reportedUserId,
          reason: createReportDto.reason,
          status: createReportDto.status as any,
        }),
      );

      // Invalidate all reports cache
      await this.invalidateReportsCache();

      return result as unknown as ReportResponse;
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
  @ApiOperation({ summary: 'Get all reports with pagination' })
  async findAll(
    @Query() query: BasicQuery,
  ): Promise<AllReportsWithMetaResponse> {
    try {
      // Get current cache version
      const version = await this.getCacheVersion();
      const cacheKey = `reports:all:${version}:${JSON.stringify(query)}`;

      // Check cache first
      const cachedData =
        await this.cacheManager.get<AllReportsWithMetaResponse>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const result = await firstValueFrom(
        this.reportService.getAllReports({
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

      const response = result as unknown as AllReportsWithMetaResponse;

      // Cache for 5 minutes
      await this.cacheManager.set(cacheKey, response, 300000);

      return response;
    } catch (error: any) {
      Logger.error('the error : ', error);
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Get(':id')
  @ApiOperation({ summary: 'Get a report by ID' })
  @ApiParam({ name: 'id', description: 'Report ID' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  async findOne(@Param('id') id: string): Promise<SingleReportResponse> {
    try {
      const cacheKey = `report:${id}`;

      // Check cache first
      const cachedData =
        await this.cacheManager.get<SingleReportResponse>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const result = await firstValueFrom(
        this.reportService.getReport({ reportId: id }),
      );

      const response = result as unknown as SingleReportResponse;

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
  @ApiOperation({ summary: 'Update a report' })
  @ApiParam({ name: 'id', description: 'Report ID' })
  @ApiResponse({
    status: 200,
    description: 'Report updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Report not found' })
  async update(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
  ): Promise<ReportResponse> {
    try {
      Logger.log('Updating report with ID:', id);
      const result = await firstValueFrom(
        this.reportService.updateReport({
          reportId: id,
          title: updateReportDto.title,
          reason: updateReportDto.reason,
          status: updateReportDto.status as any,
        }),
      );

      Logger.log('Update result:', result);

      // Invalidate specific report and all reports cache
      await this.cacheManager.del(`report:${id}`);
      await this.invalidateReportsCache();

      return result as unknown as ReportResponse;
    } catch (error: any) {
      Logger.error('the error : ', error);
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a report' })
  @ApiParam({ name: 'id', description: 'Report ID' })
  @ApiResponse({
    status: 200,
    description: 'Report deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Report not found' })
  async remove(@Param('id') id: string): Promise<DeleteReportResponse> {
    try {
      const result = await firstValueFrom(
        this.reportService.deleteReport({ reportId: id }),
      );

      // Invalidate specific report and all reports cache
      await this.cacheManager.del(`report:${id}`);
      await this.invalidateReportsCache();

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
    const version = await this.cacheManager.get<string>('reports:version');
    if (!version) {
      await this.cacheManager.set('reports:version', this.cacheVersion, 0); // No expiry
      return this.cacheVersion;
    }
    return version;
  }

  // Helper method to invalidate all reports cache by incrementing version
  private async invalidateReportsCache(): Promise<void> {
    try {
      const newVersion = `v${Date.now()}`;
      await this.cacheManager.set('reports:version', newVersion, 0); // No expiry
    } catch (error) {
      Logger.error('Error invalidating cache:', error);
    }
  }
}
