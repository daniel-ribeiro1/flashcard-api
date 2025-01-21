import { IsNotEmptyI18n } from '@/decorators/validators/is-not-empty-i18n.decorator';
import { IsUUIDI18n } from '@/decorators/validators/is-uuid-18n.decorator';

export class ReviewQueryDto {
  @IsNotEmptyI18n()
  @IsUUIDI18n()
  deckId: string;
}
