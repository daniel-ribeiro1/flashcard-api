import { RequestContextKey } from '@/enum/request-context.enum';
import { User } from '@prisma/client';

export type UserRequestContext = Pick<
  User,
  'id' | 'first_name' | 'last_name' | 'email'
>;

export type RequestContext = {
  [RequestContextKey.USER]: UserRequestContext;
};
