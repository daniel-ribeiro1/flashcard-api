import { UserRepository } from '@/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}
}
