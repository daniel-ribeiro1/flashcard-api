export const ValidationMessage = {
  IS_BOOLEAN: 'validations.IS_BOOLEAN',
  IS_EMAIL: 'validations.IS_EMAIL',
  IS_ENUM: 'validations.IS_ENUM',
  IS_JSON: 'validations.IS_JSON',
  IS_NOT_EMPTY: 'validations.IS_NOT_EMPTY',
  IS_NUMBER: 'validations.IS_NUMBER',
  IS_STRING: 'validations.IS_STRING',
  IS_UUID: 'validations.IS_UUID',
  MAX_VALUE: (number: number) =>
    `validations.MAX_VALUE|${JSON.stringify({ number })}`,
  MIN_VALUE: (number: number) =>
    `validations.MIN_VALUE|${JSON.stringify({ number })}`,
};
