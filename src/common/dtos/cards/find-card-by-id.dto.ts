import { IsNotEmptyI18n } from '@/decorators/validators/is-not-empty-i18n.decorator';
import { IsUUIDI18n } from '@/decorators/validators/is-uuid-18n.decorator';

export class FindCardByIdQueryDto {
  @IsUUIDI18n(4)
  @IsNotEmptyI18n()
  deckId: string;
}
