import { UserRepository } from '@/repositories/user.repository';
import { UserService } from '@/services/user.service';
import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService],
})
export class UserModule {}
