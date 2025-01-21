import { IsNotEmptyI18n } from '@/decorators/validators/is-not-empty-i18n.decorator';
import { IsUUIDI18n } from '@/decorators/validators/is-uuid-i18n.decorator';

export class FindNextCardToReviewQueryDto {
  @IsNotEmptyI18n()
  @IsUUIDI18n()
  deckId: string;
}
