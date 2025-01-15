import { IsNumberI18n } from '@/decorators/validators/is-number-18n.decorator';
import { Transform } from 'class-transformer';

export class FindOneCategoryByIdDto {
  @Transform(({ value }) => Number(value))
  @IsNumberI18n()
  id: number;
}
