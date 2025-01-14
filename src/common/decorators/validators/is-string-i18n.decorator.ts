import { ValidationMessage } from '@/constants/validation-message.constant';
import { IsString, ValidationOptions } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export function IsStringI18n(
  validationOptions?: Omit<ValidationOptions, 'message'>,
): PropertyDecorator {
  return IsString({
    ...validationOptions,
    message: i18nValidationMessage(ValidationMessage.IS_STRING),
  });
}
