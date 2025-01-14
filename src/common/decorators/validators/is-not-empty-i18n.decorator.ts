import { ValidationMessage } from '@/constants/validation-message.constant';
import { IsNotEmpty, ValidationOptions } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export function IsNotEmptyI18n(
  validationOptions?: Omit<ValidationOptions, 'message'>,
): PropertyDecorator {
  return IsNotEmpty({
    ...validationOptions,
    message: i18nValidationMessage(ValidationMessage.IS_NOT_EMPTY),
  });
}
