import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'generated/prisma-job';
import {
  JobPrismaService,
  PaginationResult,
  PaginationService,
} from 'libs/common/src';

import {
  AllCategoriesWithMetaResponse,
  CategoryResponse,
  DeleteCategoryResponse,
  ListCategoryResponse,
} from 'types/job/category';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: JobPrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  private mapCategoryToResponse(
    category: Category & { parent?: Category; children?: Category[] },
  ) {
    return {
      id: category.id,
      name: category.name ?? undefined,
      description: category.description ?? undefined,
      parentCategoryId: category.parentCategoryId ?? undefined,
      parent: category.parent
        ? this.mapCategoryToResponse(category.parent)
        : undefined,
      children:
        category.children?.map((child) => this.mapCategoryToResponse(child)) ??
        [],
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
    };
  }

  async findAll(basicQuery: any): Promise<AllCategoriesWithMetaResponse> {
    const searchColumn = ['id', 'name', 'description'];

    const result = await this.paginationService.paginate<Category>(
      basicQuery,
      this.prisma.category,
      searchColumn,
      {
        parent: true,
        children: true,
      },
    );

    const mappedData = (result as PaginationResult<Category>)?.data.map(
      (category) => this.mapCategoryToResponse(category),
    );

    return { data: mappedData, meta: result.meta };
  }

  async findOne(categoryId: string): Promise<ListCategoryResponse> {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        parent: true,
        children: true,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    return {
      category: this.mapCategoryToResponse(category as any),
    };
  }

  async create(data: {
    name?: string;
    description?: string;
    parentCategoryId?: string;
  }): Promise<CategoryResponse> {
    // Check if parent category exists if provided
    if (data.parentCategoryId) {
      const parentExists = await this.prisma.category.findUnique({
        where: { id: data.parentCategoryId },
      });

      if (!parentExists) {
        throw new NotFoundException(
          `Parent category with ID ${data.parentCategoryId} not found`,
        );
      }
    }

    const category = await this.prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        parentCategoryId: data.parentCategoryId,
      },
    });

    return {
      success: true,
      message: 'Category created successfully',
    };
  }

  async update(
    categoryId: string,
    data: {
      name?: string;
      description?: string;
      parentCategoryId?: string;
    },
  ): Promise<CategoryResponse> {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    // Check if parent category exists if provided
    if (
      data.parentCategoryId &&
      data.parentCategoryId !== existingCategory.parentCategoryId
    ) {
      const parentExists = await this.prisma.category.findUnique({
        where: { id: data.parentCategoryId },
      });

      if (!parentExists) {
        throw new NotFoundException(
          `Parent category with ID ${data.parentCategoryId} not found`,
        );
      }

      // Prevent circular reference
      if (data.parentCategoryId === categoryId) {
        throw new Error('Category cannot be its own parent');
      }

      // Check for deeper circular references
      const isDescendant = await this.isDescendant(
        categoryId,
        data.parentCategoryId,
      );
      if (isDescendant) {
        throw new Error(
          'Circular reference detected: parent is a descendant of this category',
        );
      }
    }

    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.parentCategoryId !== undefined)
      updateData.parentCategoryId = data.parentCategoryId;

    const category = await this.prisma.category.update({
      where: { id: categoryId },
      data: updateData,
    });

    return {
      success: true,
      message: 'Category updated successfully',
    };
  }

  async remove(categoryId: string): Promise<DeleteCategoryResponse> {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    // Check if category has children
    const childrenCount = await this.prisma.category.count({
      where: { parentCategoryId: categoryId },
    });

    if (childrenCount > 0) {
      throw new Error(
        'Cannot delete category with children. Please reassign or delete children first.',
      );
    }

    await this.prisma.category.delete({
      where: { id: categoryId },
    });

    return {
      success: true,
      message: 'Category deleted successfully',
    };
  }

  private async isDescendant(
    parentId: string,
    childId: string,
  ): Promise<boolean> {
    const children = await this.prisma.category.findMany({
      where: { parentCategoryId: parentId },
    });

    for (const child of children) {
      if (child.id === childId) {
        return true;
      }
      if (await this.isDescendant(child.id, childId)) {
        return true;
      }
    }

    return false;
  }
}
