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
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetAllCategoriesDto } from './dto/get-all-categories.dto';
import {
  CategoryResponseDto,
  GetAllCategoriesResponseDto,
  DeleteCategoryResponseDto,
} from './dto/category-response.dto';

import { ClientGrpc } from '@nestjs/microservices';
import {
  AllCategoriesWithMetaResponse,
  CATEGORY_PACKAGE_NAME,
  CategoryServiceClient,
} from 'types/job/category';
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

@ApiTags('Categories')
@Controller('categories')
export class CategoryController implements OnModuleInit {
  private categoryService: CategoryServiceClient;
  private cacheVersion = 'v1';

  constructor(
    @Inject(CATEGORY_PACKAGE_NAME) private readonly client: ClientGrpc,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  onModuleInit() {
    this.categoryService =
      this.client.getService<CategoryServiceClient>('CategoryService');
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'Category created successfully',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<CategoryResponseDto> {
    try {
      const result = await firstValueFrom(
        this.categoryService.createCategory({
          name: createCategoryDto.name,
          description: createCategoryDto.description,
          parentCategoryId: createCategoryDto.parentCategoryId,
        })
      );

      return result as unknown as CategoryResponseDto;
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
  @ApiOperation({ summary: 'Get all categories with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Categories retrieved successfully',
  })
  async findAll(
    @Query() query: BasicQuery
  ): Promise<GetAllCategoriesResponseDto> {
    try {
      // Get current cache version
      const version = await this.getCacheVersion();
      // FIXED: Changed from 'reports:all:' to 'categories:all:'
      const cacheKey = `categories:all:${version}:${JSON.stringify(query)}`;

      console.log('Cache Key :', cacheKey);

      // Check cache first
      const cachedData =
        await this.cacheManager.get<GetAllCategoriesResponseDto>(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const result = await firstValueFrom(
        this.categoryService.getAllCategories({
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

      const response = result as unknown as AllCategoriesWithMetaResponse;

      // Cache for 5 minutes
      await this.cacheManager.set(cacheKey, response, 300000);

      return response;
    } catch (error: any) {
      console.error('the error : ', error);
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN', 'MEMBER', 'CORPORATE')
  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Category retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findOne(@Param('id') id: string): Promise<CategoryResponseDto> {
    try {
      // FIXED: Consistent cache key - using plural 'categories:' throughout
      const cacheKey = `categories:${id}`;

      // Check cache first
      const cachedData = await this.cacheManager.get<CategoryResponseDto>(
        cacheKey
      );
      if (cachedData) {
        return cachedData;
      }
      const result = await firstValueFrom(
        this.categoryService.getCategory({ categoryId: id })
      );

      const response = result as unknown as CategoryResponseDto;

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
  @ApiOperation({ summary: 'Update a category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ): Promise<CategoryResponseDto> {
    try {
      const result = await firstValueFrom(
        this.categoryService.updateCategory({
          categoryId: id,
          name: updateCategoryDto.name,
          description: updateCategoryDto.description,
          parentCategoryId: updateCategoryDto.parentCategoryId,
        })
      );

      // FIXED: Changed from 'category:${id}' to 'categories:${id}' to match findOne()
      await this.cacheManager.del(`categories:${id}`);
      await this.invalidateCategoryCache();

      return result as unknown as CategoryResponseDto;
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
  @ApiOperation({ summary: 'Delete a category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({
    status: 200,
    description: 'Category deleted successfully',
    type: DeleteCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async remove(@Param('id') id: string): Promise<DeleteCategoryResponseDto> {
    try {
      const result = await firstValueFrom(
        this.categoryService.deleteCategory({ categoryId: id })
      );

      // ADDED: Invalidate specific category and all categories cache
      await this.cacheManager.del(`categories:${id}`);
      await this.invalidateCategoryCache();

      return result as DeleteCategoryResponseDto;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  // Helper method to get cache version
  private async getCacheVersion(): Promise<string> {
    const version = await this.cacheManager.get<string>('categories:version');
    if (!version) {
      await this.cacheManager.set('categories:version', this.cacheVersion, 0);
      return this.cacheVersion;
    }
    return version;
  }

  // Helper method to invalidate all categories cache by incrementing version
  private async invalidateCategoryCache(): Promise<void> {
    try {
      const newVersion = `v${Date.now()}`;
      await this.cacheManager.set('categories:version', newVersion, 0);
    } catch (error) {
      console.error('Error invalidating cache:', error);
    }
  }
}
