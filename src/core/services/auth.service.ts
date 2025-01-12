import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/repositories/user.repository';
import { SignUpDto } from '@/dtos/auth/sign-up.dto';
import { encrypt } from '@/utils/encryption.util';

@Injectable()
export class AuthService {
  constructor(private readonly _userRepository: UserRepository) {}

  async signUp(signUp: SignUpDto) {
    const user = await this._userRepository.findByEmail(signUp.email);

    if (user) {
      // TODO: Internacionalizar o erro
      throw new Error('User already exists');
    }

    signUp.password = await encrypt(signUp.password);

    return this._userRepository.create(signUp);
  }
}
