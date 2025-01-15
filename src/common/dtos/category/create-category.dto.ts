import { IsStringI18n } from '@/decorators/validators/is-string-i18n.decorator';

export class CreateCategoryDto {
  @IsStringI18n()
  name: string;
}
