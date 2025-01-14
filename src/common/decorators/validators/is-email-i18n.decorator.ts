import { ValidationMessage } from '@/constants/validation-message.constant';
import { IsEmail, ValidationOptions } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export function IsEmailI18n(
  emailOptions?: validator.IsEmailOptions,
  validationOptions?: Omit<ValidationOptions, 'message'>,
): PropertyDecorator {
  return IsEmail(emailOptions, {
    ...validationOptions,
    message: i18nValidationMessage(ValidationMessage.IS_EMAIL),
  });
}
