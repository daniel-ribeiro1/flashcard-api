import { Deck } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { DeckWithCategories } from '@/types/decks/deck.type';
import { IsOptional } from 'class-validator';
import { OrderBy } from '@/enum/pagination.enum';
import { PaginationMetadataDto, PaginationOptionsDto } from '../pagination.dto';
import { PaginatedResponse } from '@/utils/pagination.util';
import { IsEnumI18n } from '@/decorators/validators/is-enum-i18n.decorator';
import { TransformToClass } from '@/decorators/transformers/transform-to-class.decorator';

import { CategoryResponseDto } from '../categories/category.dto';

export class DeckResponseDto
  implements
    Pick<Deck, 'id' | 'title' | 'description' | 'createdAt' | 'updatedAt'>
{
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  categories: CategoryResponseDto;
}
class DeckWithCategoriesOrderByDto {
  @IsEnumI18n(OrderBy)
  @IsOptional()
  title?: OrderBy;

  @IsEnumI18n(OrderBy)
  @IsOptional()
  createdAt?: OrderBy;

  @IsEnumI18n(OrderBy)
  @IsOptional()
  updatedAt?: OrderBy;
}

export class DeckWithCategoriesPaginationOptions extends PaginationOptionsDto<DeckWithCategories> {
  @IsOptional()
  @TransformToClass(DeckWithCategoriesOrderByDto)
  orderBy: DeckWithCategoriesOrderByDto;
}

export class DeckWithCategoriesPaginatedResponseDto
  extends PaginationMetadataDto
  implements PaginatedResponse<DeckResponseDto>
{
  @Expose()
  @Type(() => DeckResponseDto)
  data: DeckResponseDto[];
}
