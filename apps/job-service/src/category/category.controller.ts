import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  AllCategoriesWithMetaResponse,
  GetAllCategoriesRequest,
  GetCategoryRequest,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  DeleteCategoryRequest,
  CategoryResponse,
  DeleteCategoryResponse,
} from 'types/job/category';
import { httpToGrpcStatus } from 'libs/common/src/common/helper/htto-to-grpc.helper';
import { CategoryService } from './category.service';

@Controller()
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @GrpcMethod('CategoryService', 'CreateCategory')
  async CreateCategory(
    request: CreateCategoryRequest,
  ): Promise<CategoryResponse> {
    try {
      return this.categoriesService.create({
        name: request.name,
        description: request.description,
        parentCategoryId: request.parentCategoryId,
      });
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('CategoryService', 'GetAllCategories')
  async GetAllCategories(
    request: GetAllCategoriesRequest,
  ): Promise<AllCategoriesWithMetaResponse> {
    try {
      return this.categoriesService.findAll(request.basicQuery);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('CategoryService', 'GetCategory')
  async GetCategory(request: GetCategoryRequest): Promise<CategoryResponse> {
    try {
      return this.categoriesService.findOne(request.categoryId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('CategoryService', 'UpdateCategory')
  async UpdateCategory(
    request: UpdateCategoryRequest,
  ): Promise<CategoryResponse> {
    try {
      return this.categoriesService.update(request.categoryId, {
        name: request.name,
        description: request.description,
        parentCategoryId: request.parentCategoryId,
      });
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('CategoryService', 'DeleteCategory')
  async DeleteCategory(
    request: DeleteCategoryRequest,
  ): Promise<DeleteCategoryResponse> {
    try {
      return this.categoriesService.remove(request.categoryId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('CategoryService', 'ListCategories')
  async ListCategories(request: any): Promise<any> {
    try {
      // Implement ListCategories if needed, or return basic implementation
      throw new Error('ListCategories not implemented');
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }
}
