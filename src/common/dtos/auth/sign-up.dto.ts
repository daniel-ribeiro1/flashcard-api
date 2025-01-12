import { User } from '@prisma/client';
import { IsEmail, IsOptional, IsString } from 'class-validator';

// TODO:
//  - Adicionar mensagens internacionalizadas para as valiadções
//  - Fazer com que a validação seja aplicada
export class SignUpDto
  implements
    Pick<User, 'first_name' | 'last_name' | 'email' | 'password' | 'picture'>
{
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  picture: string | null;
}
