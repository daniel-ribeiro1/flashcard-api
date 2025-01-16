import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly _prisma: PrismaService) {}

  findById(id: string): Promise<User> {
    return this._prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

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
      'firstName' | 'lastName' | 'email' | 'password' | 'picture'
    >,
  ): Promise<User> {
    return this._prisma.user.create({
      data: user,
    });
  }
}
