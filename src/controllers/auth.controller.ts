import { Serialize } from '@/decorators/serialize.decorator';
import { SignInDto } from '@/dtos/auth/sign-in.dto';
import { SignUpDto } from '@/dtos/auth/sign-up.dto';
import { UserResponseDto } from '@/dtos/users/users.dto';
import { AuthService } from '@/services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { SignInResponse } from '@/types/auth/sign-in.type';

@Controller()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Serialize(UserResponseDto)
  @Post('sign-up')
  signUp(@Body() body: SignUpDto): Promise<User> {
    return this._authService.signUp(body);
  }

  @Post('sign-in')
  signIn(@Body() body: SignInDto): Promise<SignInResponse> {
    return this._authService.signIn(body);
  }
}
