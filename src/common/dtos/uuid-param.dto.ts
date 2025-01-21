import { IsNotEmptyI18n } from '@/decorators/validators/is-not-empty-i18n.decorator';
import { IsUUIDI18n } from '@/decorators/validators/is-uuid-i18n.decorator';

export class UUIDParamDto {
  @IsUUIDI18n(4)
  @IsNotEmptyI18n()
  id: string;
}
