import { ValidationMessage } from '@/constants/validation-message.constant';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ClassConstructor,
  plainToInstance,
  Transform,
} from 'class-transformer';
import { ValidateNested, ValidationOptions } from 'class-validator';
import { I18nValidationException } from 'nestjs-i18n';

export function TransformToClass<T>(
  objectModel: ClassConstructor<T>,
  validationOptions?: Omit<ValidationOptions, 'message'>,
): PropertyDecorator {
  return applyDecorators(
    Transform(({ value, key }) => {
      try {
        if (value instanceof objectModel) return value;

        return plainToInstance(objectModel, JSON.parse(value), {
          enableImplicitConversion: true,
        });
      } catch {
        throw new I18nValidationException(
          [
            {
              property: key,
              value,
              constraints: {
                [key]: ValidationMessage.IS_JSON,
              },
            },
          ],
          HttpStatus.BAD_REQUEST,
        );
      }
    }),
    ValidateNested(validationOptions),
  );
}
