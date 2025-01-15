import { ValidationMessage } from '@/constants/validation-message.constant';
import { IsNumber, IsNumberOptions, ValidationOptions } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export function IsNumberI18n(
  isNumberOptions?: IsNumberOptions,
  validationOptions?: Omit<ValidationOptions, 'message'>,
): PropertyDecorator {
  return IsNumber(isNumberOptions, {
    ...validationOptions,
    message: i18nValidationMessage(ValidationMessage.IS_NUMBER),
  });
}
