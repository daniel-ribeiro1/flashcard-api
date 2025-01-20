import {
  OrderByOptions,
  PaginatedResponseOptions,
  PaginationOptions,
} from '@/types/pagination.type';

export function paginateQuery<T>(paginationOptions: PaginationOptions<T>): {
  skip: number;
  take: number;
  orderBy: OrderByOptions<T> | OrderByOptions<T>[];
} {
  return {
    skip:
      paginationOptions.page * paginationOptions.take - paginationOptions.take,
    take: paginationOptions.take,
    orderBy: orderByOptions(paginationOptions.orderBy),
  };
}

export function orderByOptions<T>(
  options?: OrderByOptions<T>,
): OrderByOptions<T> | OrderByOptions<T>[] {
  const keys = Object.keys(options || {}).map((key) => key as keyof T);

  if (keys.length === 0) return undefined;
  if (keys.length === 1) return options;

  return keys.map(
    (key) =>
      ({
        [key]: options[key],
      }) as OrderByOptions<T>,
  );
}

export class PaginatedResponse<T> implements PaginatedResponse<T> {
  page: number;
  take: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsCount: number;
  totalItems: number;

  constructor(
    public data: T[],
    options: PaginatedResponseOptions,
  ) {
    this.page = options.page;
    this.take = options.take;
    this.totalItems = options.total;
    this.itemsCount = this.data.length;

    this.hasNextPage = options.page * options.take < options.total;
    this.hasPreviousPage = options.page > 1;
  }
}
