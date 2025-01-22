import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '@/repositories/user.repository';
import { SignUpDto } from '@/dtos/auth/sign-up.dto';
import { compareEncryptedData, encrypt } from '@/utils/encryption.util';
import { RequestException } from '@/exceptions/request.exception';
import { ExceptionMessage } from '@/enum/exceptions-message';
import { SignInDto } from '@/dtos/auth/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentProprety } from '@/enum/environment.enum';
import { SignInResponse } from '@/types/auth/sign-in.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _jwtService: JwtService,
    private readonly _userRepository: UserRepository,
  ) {}

  async signUp(body: SignUpDto) {
    const user = await this._userRepository.findByEmail(body.email);

    if (user) {
      throw new RequestException(
        ExceptionMessage.EMAIL_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    body.password = await encrypt(body.password);

    return this._userRepository.create(body);
  }

  async signIn(body: SignInDto): Promise<SignInResponse> {
    const user = await this._userRepository.findByEmail(body.email);

    if (!user) {
      throw new RequestException(
        ExceptionMessage.INVALID_EMAIL_OR_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!(await compareEncryptedData(body.password, user.password))) {
      throw new RequestException(
        ExceptionMessage.INVALID_EMAIL_OR_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return {
      accessToken: this._jwtService.sign(payload, {
        secret: this._configService.getOrThrow(
          EnvironmentProprety.ACCESS_TOKEN_SECRET,
        ),
        expiresIn: this._configService.getOrThrow(
          EnvironmentProprety.ACCESS_TOKEN_EXPIRATION_TIME,
        ),
      }),
      refreshToken: this._jwtService.sign(payload, {
        secret: this._configService.getOrThrow(
          EnvironmentProprety.REFRESH_TOKEN_SECRET,
        ),
        expiresIn: this._configService.getOrThrow(
          EnvironmentProprety.REFRESH_TOKEN_EXPIRATION_TIME,
        ),
      }),
    };
  }
}
