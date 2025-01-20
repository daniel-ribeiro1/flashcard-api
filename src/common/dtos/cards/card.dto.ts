import { TransformToClass } from '@/decorators/transformers/transform-to-class.decorator';
import { IsEnumI18n } from '@/decorators/validators/is-enum-i18n.decorator';
import { OrderBy } from '@/enum/pagination.enum';
import { Card } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PaginationMetadataDto, PaginationOptionsDto } from '../pagination.dto';
import { PaginatedResponse } from '@/utils/pagination.util';

export class CardResponseDto
  implements
    Pick<
      Card,
      'id' | 'front' | 'back' | 'revisionDate' | 'createdAt' | 'updatedAt'
    >
{
  @Expose()
  id: string;

  @Expose()
  front: string;

  @Expose()
  back: string;

  @Expose()
  revisionDate: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

class CardsOrderByDto {
  @IsEnumI18n(OrderBy)
  @IsOptional()
  revisionDate?: OrderBy;

  @IsEnumI18n(OrderBy)
  @IsOptional()
  createdAt?: OrderBy;

  @IsEnumI18n(OrderBy)
  @IsOptional()
  updatedAt?: OrderBy;
}

export class CardsPaginationOptions extends PaginationOptionsDto<Card> {
  @IsOptional()
  @TransformToClass(CardsOrderByDto)
  orderBy: CardsOrderByDto;
}

export class CardsPaginatedResponseDto
  extends PaginationMetadataDto
  implements PaginatedResponse<CardResponseDto>
{
  @Expose()
  @Type(() => CardResponseDto)
  data: CardResponseDto[];
}
