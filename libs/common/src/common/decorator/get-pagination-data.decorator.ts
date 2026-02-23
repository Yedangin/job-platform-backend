import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export class Pagination {
  page?: number;
  pageSize?: number;
  skip?: number;
  take?: number;
  isPagination?: boolean;
}

export const PaginationParams = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Pagination | undefined => {
    const req: Request = ctx.switchToHttp().getRequest();
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const skip = (Number(page) - 1) * Number(pageSize);
    const take = Number(pageSize);

    return {
      page,
      pageSize,
      skip,
      take,
      isPagination: !Number.isNaN(skip) && !Number.isNaN(take),
    };
  },
);
