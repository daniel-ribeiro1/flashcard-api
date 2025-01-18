import { IsNumberI18n } from '@/decorators/validators/is-number-18n.decorator';
import { MaxI18n } from '@/decorators/validators/max-i18n.decorator';
import { MinI18n } from '@/decorators/validators/min-i18n.decorator';
import { PaginationOptions } from '@/types/pagination.type';
import { Expose, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginationOptionsDto<T>
  implements Omit<PaginationOptions<T>, 'orderBy'>
{
  @Type(() => Number)
  @MinI18n(1)
  @IsNumberI18n()
  @IsOptional()
  page: number = 1;

  @Type(() => Number)
  @MinI18n(1)
  @MaxI18n(50)
  @IsNumberI18n()
  @IsOptional()
  take: number = 10;
}

export class PaginationMetadataDto {
  @Expose()
  page: number;

  @Expose()
  take: number;

  @Expose()
  totalItems: number;

  @Expose()
  itemsCount: number;

  @Expose()
  hasNextPage: boolean;

  @Expose()
  hasPreviousPage: boolean;
}
