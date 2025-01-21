import { ValidationMessage } from '@/constants/validation-message.constant';
import { IsBoolean, ValidationOptions } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export function IsBooleanI18n(
  validationOptions?: Omit<ValidationOptions, 'message'>,
): PropertyDecorator {
  return IsBoolean({
    ...validationOptions,
    message: i18nValidationMessage(ValidationMessage.IS_BOOLEAN),
  });
}
