import { I18nValidationExceptionFilter } from '@/filters/i18n-validation-exception.filter';
import { RequestExceptionFilter } from '@/filters/request-exception.filter';
import { PrismaService } from '@/services/prisma.service';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  I18nValidationPipe,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentProprety } from '@/enum/environment.enum';
import { RequestContextService } from '@/services/request-context.service';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow(
          EnvironmentProprety.I18N_FALLBACK_LANGUAGE,
        ),
        loaderOptions: {
          path: join(__dirname, '..', 'i18n'),
          watch: true,
        },
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
      inject: [ConfigService],
    }),
  ],
  providers: [
    ConfigService,
    PrismaService,
    RequestContextService,
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new I18nValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          validateCustomDecorators: true,
        });
      },
    },
    {
      provide: APP_FILTER,
      useClass: I18nValidationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: RequestExceptionFilter,
    },
  ],
  exports: [ConfigService, PrismaService, RequestContextService],
})
export class CommonModule {}
