import { Serialize } from '@/decorators/serialize.decorator';
import { SignUpDto } from '@/dtos/auth/sign-up.dto';
import { UserDto } from '@/dtos/users/users.dto';
import { AuthService } from '@/services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';

@Controller()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Serialize(UserDto)
  @Post('sign-up')
  signUp(@Body() body: SignUpDto): Promise<User> {
    return this._authService.signUp(body);
  }
}
