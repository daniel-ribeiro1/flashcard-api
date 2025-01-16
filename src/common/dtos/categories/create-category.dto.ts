import { IsStringI18n } from '@/decorators/validators/is-string-i18n.decorator';

export class CreateCategoryBodyDto {
  @IsStringI18n()
  name: string;
}
