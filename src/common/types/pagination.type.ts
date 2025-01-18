export type OrderByOptions<T> = {
  [key in keyof T]?: 'asc' | 'desc';
};

export type PaginationOptions<T> = {
  page: number;
  take: number;
  orderBy: OrderByOptions<T>;
};

export type PaginatedResponseOptions = {
  page: number;
  take: number;
  total: number;
};

export type PaginationMetadata<T> = {
  data: T[];
  page: number;
  take: number;
  totalItems: number;
  itemsCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
