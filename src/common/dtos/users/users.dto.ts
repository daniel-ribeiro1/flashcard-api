import { User } from '@prisma/client';
import { Expose } from 'class-transformer';

export class UserDto
  implements Pick<User, 'id' | 'first_name' | 'last_name' | 'email' | 'picture'>
{
  @Expose()
  id: string;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  email: string;

  @Expose()
  picture: string | null;
}
