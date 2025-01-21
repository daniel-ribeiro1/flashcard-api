import { IsBooleanI18n } from '@/decorators/validators/is-boolean-i18n.decorator';
import { IsNotEmptyI18n } from '@/decorators/validators/is-not-empty-i18n.decorator';
import { IsUUIDI18n } from '@/decorators/validators/is-uuid-i18n.decorator';

export class ReviewCardBodyDto {
  @IsNotEmptyI18n()
  @IsUUIDI18n()
  deckId: string;

  @IsNotEmptyI18n()
  @IsUUIDI18n()
  cardId: string;

  @IsBooleanI18n()
  @IsNotEmptyI18n()
  isTrue: boolean;
}
