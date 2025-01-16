import { IsNotEmptyI18n } from '@/decorators/validators/is-not-empty-i18n.decorator';
import { IsNumberI18n } from '@/decorators/validators/is-number-18n.decorator';
import { IsStringI18n } from '@/decorators/validators/is-string-i18n.decorator';
import { Deck } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateDeckBodyDto implements Pick<Deck, 'title' | 'description'> {
  @IsStringI18n()
  @IsNotEmptyI18n()
  title: string;

  @IsStringI18n()
  @IsOptional()
  description: string | null;

  @Type(() => Array<number>)
  @IsNumberI18n(undefined, { each: true })
  @IsOptional()
  categoryIds?: number[];
}
