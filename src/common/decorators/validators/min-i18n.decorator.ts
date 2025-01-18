import { ValidationMessage } from '@/constants/validation-message.constant';
import { Min, ValidationOptions } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export function MinI18n(
  number?: number,
  validationOptions?: Omit<ValidationOptions, 'message'>,
): PropertyDecorator {
  return Min(number, {
    ...validationOptions,
    message: i18nValidationMessage(ValidationMessage.MIN_VALUE(number)),
  });
}
