import { RequestExceptionFilter } from '@/filters/request-exception.filter';
import { PrismaService } from '@/services/prisma.service';
import { Global, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

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
    {
      provide: APP_FILTER,
      useClass: RequestExceptionFilter,
    },
  ],
  exports: [PrismaService],
})
export class CommonModule {}
