import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '@/repositories/user.repository';
import { SignUpDto } from '@/dtos/auth/sign-up.dto';
import { encrypt } from '@/utils/encryption.util';
import { RequestException } from '@/exceptions/request.exception';
import { ErrorMessage } from '@/constants/error-message';

@Injectable()
export class AuthService {
  constructor(private readonly _userRepository: UserRepository) {}

  async signUp(signUp: SignUpDto) {
    const user = await this._userRepository.findByEmail(signUp.email);

    if (user) {
      throw new RequestException(
        ErrorMessage.EMAIL_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    signUp.password = await encrypt(signUp.password);

    return this._userRepository.create(signUp);
  }
}
