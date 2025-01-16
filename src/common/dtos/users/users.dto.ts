import { User } from '@prisma/client';
import { Expose } from 'class-transformer';

export class UserResponseDto
  implements Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'picture'>
{
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  picture: string | null;
}
