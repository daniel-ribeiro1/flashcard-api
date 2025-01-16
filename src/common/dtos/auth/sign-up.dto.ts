import { IsEmailI18n } from '@/decorators/validators/is-email-i18n.decorator';
import { IsNotEmptyI18n } from '@/decorators/validators/is-not-empty-i18n.decorator';
import { IsStringI18n } from '@/decorators/validators/is-string-i18n.decorator';
import { User } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class SignUpDto
  implements
    Pick<User, 'firstName' | 'lastName' | 'email' | 'password' | 'picture'>
{
  @IsStringI18n()
  @IsNotEmptyI18n()
  firstName: string;

  @IsStringI18n()
  @IsNotEmptyI18n()
  lastName: string;

  @IsEmailI18n()
  email: string;

  @IsStringI18n()
  @IsNotEmptyI18n()
  password: string;

  @IsStringI18n()
  @IsOptional()
  picture: string | null;
}
