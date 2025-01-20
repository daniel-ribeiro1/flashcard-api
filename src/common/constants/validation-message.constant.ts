export const ValidationMessage = {
  IS_EMAIL: 'validations.IS_EMAIL',
  IS_ENUM: 'validations.IS_ENUM',
  IS_NOT_EMPTY: 'validations.IS_NOT_EMPTY',
  IS_NUMBER: 'validations.IS_NUMBER',
  IS_STRING: 'validations.IS_STRING',
  IS_UUID: 'validations.IS_UUID',
  IS_JSON: 'validations.IS_JSON',
  MAX_VALUE: (number: number) =>
    `validations.MAX_VALUE|${JSON.stringify({ number })}`,
  MIN_VALUE: (number: number) =>
    `validations.MIN_VALUE|${JSON.stringify({ number })}`,
};
