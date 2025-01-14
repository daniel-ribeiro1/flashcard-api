import { IsEmailI18n } from '@/decorators/validators/is-email-i18n.decorator';
import { IsNotEmptyI18n } from '@/decorators/validators/is-not-empty-i18n.decorator';
import { IsStringI18n } from '@/decorators/validators/is-string-i18n.decorator';
import { User } from '@prisma/client';

export class SignInDto implements Pick<User, 'email' | 'password'> {
  @IsEmailI18n()
  email: string;

  @IsStringI18n()
  @IsNotEmptyI18n()
  password: string;
}
