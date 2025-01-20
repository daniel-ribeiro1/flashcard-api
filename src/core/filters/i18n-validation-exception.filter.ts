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
  }: Pick<I18nValidationException, 'errors'>): Record<string, string[]> {
    const groupedErrors: Record<string, string[]> = {};

    for (const error of errors) {
      const { property, constraints, children } = error;
      const propertyErrors: string[] = [];

      if (children && children.length > 0) {
        const groupedErrorsChildren = this._groupErrorsFromException({
          errors: children,
        });

        Object.assign(groupedErrors, {
          [property]: groupedErrors[property]
            ? {
                ...groupedErrors[property],
                ...groupedErrorsChildren[property],
              }
            : groupedErrorsChildren,
        });
      }

      for (const constraintKey in constraints) {
        const validation = constraints[constraintKey].split('|');

        if (validation.length === 1) {
          propertyErrors.push(
            this._i18nService.t(validation[0], {
              lang: I18nContext.current().lang,
            }),
          );

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

      Object.assign(groupedErrors, {
        [property]: groupedErrors[property]
          ? {
              ...groupedErrors[property],
              ...propertyErrors,
            }
          : propertyErrors,
      });
    }

    return groupedErrors;
  }
}
