import { IsNotEmptyI18n } from '@/decorators/validators/is-not-empty-i18n.decorator';
import { IsNumberI18n } from '@/decorators/validators/is-number-18n.decorator';
import { Transform } from 'class-transformer';

export class IntIdParamDto {
  @Transform(({ value }) => Number(value))
  @IsNotEmptyI18n()
  @IsNumberI18n()
  id: number;
}
