import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

export class SerializerInterceptor implements NestInterceptor {
  constructor(private readonly _modelObject: ClassConstructor<unknown>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) =>
        plainToClass(this._modelObject, data, {
          enableImplicitConversion: true,
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}
