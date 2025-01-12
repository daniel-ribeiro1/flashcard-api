import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly _prisma: PrismaService) {}

  findByEmailOrUsername(emailOrUsername: string): Promise<User> {
    return this._prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });
  }
}
