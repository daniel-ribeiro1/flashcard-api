import { IsUUIDI18n } from '@/decorators/validators/is-uuid-18n.decorator';
import { CardsPaginationOptions } from './card.dto';
import { IsNotEmptyI18n } from '@/decorators/validators/is-not-empty-i18n.decorator';

export class FindAllCardsQueryDto extends CardsPaginationOptions {
  @IsUUIDI18n(4)
  @IsNotEmptyI18n()
  deckId: string;
}
