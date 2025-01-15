import { EnvironmentProprety } from '@/enum/environment.enum';
import { ExceptionMessage } from '@/enum/exceptions-message';
import { RequestContextKey } from '@/enum/request-context.enum';
import { RequestException } from '@/exceptions/request.exception';
import { UserRepository } from '@/repositories/user.repository';
import { RequestContextService } from '@/services/request-context.service';
import { DecodedAccessToken } from '@/types/auth/token.type';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _jwtService: JwtService,
    private readonly _requestContextService: RequestContextService,
    private readonly _userRepository: UserRepository,
  ) {}
  async use(req: Request, res: Response, next: (error?: Error | any) => void) {
    const accessToken = this._extractBearerToken(req.headers);
    const decodedAccessToken =
      await this._validateAndGetDecodedTokenIfValid(accessToken);
    const user = await this._validateAndGetUserIfValid(decodedAccessToken.sub);

    this._requestContextService.set(RequestContextKey.USER, {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    });

    next();
  }

  private _extractBearerToken(headers: IncomingHttpHeaders): string {
    const authorization = headers.authorization;

    if (!authorization) {
      throw new RequestException(
        ExceptionMessage.ACCESS_TOKEN_NOT_FOUND,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const [authType, accessToken] = authorization.split(' ');

    if (!authType || authType !== 'Bearer') {
      throw new RequestException(
        ExceptionMessage.INVALID_ACCESS_TOKEN,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!accessToken) {
      throw new RequestException(
        ExceptionMessage.ACCESS_TOKEN_NOT_FOUND,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return accessToken;
  }

  private async _validateAndGetDecodedTokenIfValid(
    accessToken: string,
  ): Promise<DecodedAccessToken> {
    try {
      const decodedAccessToken = await this._jwtService.verifyAsync(
        accessToken,
        {
          secret: this._configService.getOrThrow(
            EnvironmentProprety.ACCESS_TOKEN_SECRET,
          ),
        },
      );

      if (!decodedAccessToken) {
        throw new RequestException(
          ExceptionMessage.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED,
        );
      }

      return decodedAccessToken;
    } catch (error) {
      if (error instanceof RequestException) {
        throw error;
      }

      if (error instanceof JsonWebTokenError) {
        throw new RequestException(
          ExceptionMessage.INVALID_ACCESS_TOKEN,
          HttpStatus.UNAUTHORIZED,
        );
      }

      throw new RequestException(
        ExceptionMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async _validateAndGetUserIfValid(
    decodedAccessToken: string,
  ): Promise<User> {
    const user = await this._userRepository.findById(decodedAccessToken);

    if (!user) {
      throw new RequestException(
        ExceptionMessage.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
