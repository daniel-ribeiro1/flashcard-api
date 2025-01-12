import { UserRepository } from '@/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  findByEmailOrUsername(emailOrUsername: string): Promise<User> {
    return this._userRepository.findByEmailOrUsername(emailOrUsername);
  }
}
