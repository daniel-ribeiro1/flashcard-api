import { applyDecorators } from '@nestjs/common';
import {
  ClassConstructor,
  plainToInstance,
  Transform,
} from 'class-transformer';
import { ValidateNested, ValidationOptions } from 'class-validator';

export function TransformToClass<T>(
  objectModel: ClassConstructor<T>,
  validationOptions?: Omit<ValidationOptions, 'message'>,
): PropertyDecorator {
  return applyDecorators(
    Transform(({ value }) => {
      if (value instanceof objectModel) return value;

      return plainToInstance(objectModel, JSON.parse(value), {
        enableImplicitConversion: true,
      });
    }),
    ValidateNested(validationOptions),
  );
}
