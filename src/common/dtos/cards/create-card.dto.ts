import { IsNotEmptyI18n } from '@/decorators/validators/is-not-empty-i18n.decorator';
import { IsStringI18n } from '@/decorators/validators/is-string-i18n.decorator';
import { IsUUIDI18n } from '@/decorators/validators/is-uuid-18n.decorator';
import { Card } from '@prisma/client';

export class CreateCardBodyDto implements Pick<Card, 'front' | 'back'> {
  @IsStringI18n()
  @IsNotEmptyI18n()
  back: string;

  @IsStringI18n()
  @IsNotEmptyI18n()
  front: string;

  @IsNotEmptyI18n()
  @IsUUIDI18n(4)
  deckId: string;
}
