import { ValidationMessage } from '@/constants/validation-message.constant';
import { IsEnum, ValidationOptions } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export function IsEnumI18n<T extends object>(
  entity: T,
  options?: Omit<ValidationOptions, 'message'>,
): PropertyDecorator {
  return IsEnum(entity, {
    ...options,
    message: i18nValidationMessage(ValidationMessage.IS_ENUM),
  });
}
