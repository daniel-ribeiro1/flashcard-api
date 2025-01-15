import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import ApplicationModules from '@/modules';
import { AuthorizationMiddleware } from '@/middlewares/authorization.middleware';

@Module({
  imports: [...ApplicationModules],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude(
        {
          path: 'sign-up',
          method: RequestMethod.POST,
        },
        {
          path: 'sign-in',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('*');
  }
}
