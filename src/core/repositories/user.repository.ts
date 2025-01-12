import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly _prisma: PrismaService) {}

  findByEmail(email: string): Promise<User> {
    return this._prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  create(
    user: Pick<
      User,
      'first_name' | 'last_name' | 'email' | 'password' | 'picture'
    >,
  ): Promise<User> {
    return this._prisma.user.create({
      data: user,
    });
  }
}
