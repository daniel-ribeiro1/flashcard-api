import { ValidationMessage } from '@/constants/validation-message.constant';
import { IsUUID, ValidationOptions } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export function IsUUIDI18n(
  uuidVersion?: validator.UUIDVersion,
  validationOptions?: Omit<ValidationOptions, 'message'>,
): PropertyDecorator {
  return IsUUID(uuidVersion, {
    ...validationOptions,
    message: i18nValidationMessage(ValidationMessage.IS_UUID),
  });
}
