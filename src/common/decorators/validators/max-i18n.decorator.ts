import { ValidationMessage } from '@/constants/validation-message.constant';
import { Max, ValidationOptions } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export function MaxI18n(
  number?: number,
  validationOptions?: Omit<ValidationOptions, 'message'>,
): PropertyDecorator {
  return Max(number, {
    ...validationOptions,
    message: i18nValidationMessage(ValidationMessage.MAX_VALUE(number)),
  });
}
