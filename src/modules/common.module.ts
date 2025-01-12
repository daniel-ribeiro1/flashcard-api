import { PrismaService } from '@/services/prisma.service';
import { Global, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new ValidationPipe({
          whitelist: true,
        });
      },
    },
  ],
  exports: [PrismaService],
})
export class CommonModule {}
