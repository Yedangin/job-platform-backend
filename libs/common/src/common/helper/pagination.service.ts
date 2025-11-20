import { Injectable } from '@nestjs/common';
import { BasicQuery } from '../dto/basic-query.dto';
import { AuthPrismaService } from '../prisma/auth/auth-prisma.service';

@Injectable()
export class PaginationService {
  constructor(private readonly prisma: AuthPrismaService) {}

  buildWhereCondition(
    filterModel?: string,
    filterKeyword?: string,
    searchKeyword?: string,
    searchColumns: string[] = [],
    columnTypes: Record<string, 'string' | 'number' | 'boolean'> = {},
  ) {
    const where: any = {};

    // Filter condition
    // Filter condition
    if (filterModel && filterKeyword !== undefined) {
      const isIdField = filterModel.endsWith('Id');

      if (isIdField) {
        const parsed = parseInt(filterKeyword, 10);
        if (!isNaN(parsed)) {
          where[filterModel] = { equals: BigInt(parsed) };
        }
      } else if (filterModel === 'role' || filterModel === 'status') {
        where[filterModel] = { equals: filterKeyword };
      } else {
        where[filterModel] = { contains: filterKeyword, mode: 'insensitive' };
      }
    }

    // Search condition
    if (searchKeyword && searchColumns.length > 0) {
      where.OR = searchColumns
        .map((column) => {
          const type = columnTypes[column] || 'string';

          if (type === 'string') {
            return {
              [column]: {
                contains: searchKeyword,
                // mode: 'insensitive',
              },
            };
          } else if (type === 'number') {
            const parsed = parseFloat(searchKeyword);
            if (isNaN(parsed)) {
              return {}; // ✨ skip invalid number search
            }
            return {
              [column]: parsed, // ✨ no 'contains', just exact match
            };
          } else if (type === 'boolean') {
            const lower = searchKeyword.toLowerCase();
            if (lower !== 'true' && lower !== 'false') {
              return {}; // ✨ skip invalid boolean search
            }
            return {
              [column]: lower === 'true',
            };
          }

          return {};
        })
        .filter((condition) => Object.keys(condition).length > 0); // ✨ skip empty ones
    }

    return where;
  }

  buildOrderByCondition(sortField?: string, sortType?: string) {
    return sortField && sortType ? { [sortField]: sortType } : {};
  }

  async paginate<T>(
    basicQuery: BasicQuery,
    model: any,
    searchColumns: string[] = [],
    include: any = {},
    extraWhere: any = {},
    columnTypes: Record<string, 'string' | 'number' | 'boolean'> = {}, // ✨ pass column types to paginate
  ): Promise<{
    data: T[];
    meta: { count: number; page: number; pageCount: number; limit: number };
  }> {
    const {
      page = 1,
      limit = 10,
      sortField,
      sortType,
      filterModel,
      filterKeyword,
      searchKeyword,
    } = basicQuery;

    const where = {
      ...extraWhere,
      ...this.buildWhereCondition(
        filterModel,
        filterKeyword,
        searchKeyword,
        searchColumns,
        columnTypes,
      ),
    };

    const orderBy = this.buildOrderByCondition(sortField, sortType);
    const offset = (Number(page) - 1) * Number(limit);

    const [data, count]: [T[], number] = await Promise.all([
      model.findMany({
        skip: offset,
        take: +limit,
        where,
        orderBy,
        include,
      }),
      model.count({ where }),
    ]);

    return {
      data,
      meta: {
        count,
        page: +page,
        pageCount: Math.ceil(count / Number(limit)),
        limit: +limit,
      },
    };
  }
}
