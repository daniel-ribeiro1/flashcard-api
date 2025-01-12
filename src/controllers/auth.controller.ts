import { SignUpDto } from '@/dtos/auth/sign-up.dto';
import { AuthService } from '@/services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';

@Controller()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  // TODO: Adicionar filtro para remover a senha do usuário da resposta
  @Post('sign-up')
  signUp(@Body() body: SignUpDto): Promise<User> {
    return this._authService.signUp(body);
  }
}
