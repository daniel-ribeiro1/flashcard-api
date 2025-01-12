import { AuthController } from '@/controllers/auth.controller';
import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { AuthService } from '@/services/auth.service';

@Module({
  controllers: [AuthController],
  imports: [UserModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
