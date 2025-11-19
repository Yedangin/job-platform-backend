export interface PaginationMeta {
  count: number;
  page: number;
  pageCount: number;
  limit: number;
}

export interface PaginationResult<T> {
  data: T[];
  meta: PaginationMeta;
}
