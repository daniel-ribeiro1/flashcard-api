import { IsNotEmptyI18n } from '@/decorators/validators/is-not-empty-i18n.decorator';
import { IsUuidI18n } from '@/decorators/validators/is-uuid-18n.decorator';

export class FindDeckByIdParamsDto {
  @IsUuidI18n(4)
  @IsNotEmptyI18n()
  id: string;
}
