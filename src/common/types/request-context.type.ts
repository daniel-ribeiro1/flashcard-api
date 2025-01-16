import { RequestContextKey } from '@/enum/request-context.enum';
import { User } from '@prisma/client';

export type UserRequestContext = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'email'
>;

export type RequestContext = {
  [RequestContextKey.USER]: UserRequestContext;
};
