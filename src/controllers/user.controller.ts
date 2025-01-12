import { UserService } from '@/services/user.service';
import { Controller } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}
}
