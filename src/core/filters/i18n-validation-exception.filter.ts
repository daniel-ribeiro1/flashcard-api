import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nContext, I18nService, I18nValidationException } from 'nestjs-i18n';

@Catch(I18nValidationException)
export class I18nValidationExceptionFilter implements ExceptionFilter {
  constructor(private readonly _i18nService: I18nService) {}

  catch(exception: I18nValidationException, host: ArgumentsHost): void {
    const http = host.switchToHttp();

    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    const errors = this._groupErrorsFromException(exception);

    const json = {
      path: request.url,
      statusCode: HttpStatus.BAD_REQUEST,
      errors,
    };

    response.status(json.statusCode).json(json);
  }

  private _groupErrorsFromException({
    errors,
  }: I18nValidationException): Record<string, string[]> {
    const groupedErrors: Record<string, string[]> = {};

    for (const error of errors) {
      const { property, constraints } = error;
      const propertyErrors: string[] = [];

      for (const constraintKey in constraints) {
        const validation = constraints[constraintKey].split('|');

        if (validation.length === 1) {
          propertyErrors.push(validation[0]);
          continue;
        }

        const [key, args] = validation;

        propertyErrors.push(
          this._i18nService.t(key, {
            args: args ? JSON.parse(args) : undefined,
            lang: I18nContext.current().lang,
          }),
        );
      }

      Object.assign(groupedErrors, { [property]: propertyErrors });
    }

    return groupedErrors;
  }
}
