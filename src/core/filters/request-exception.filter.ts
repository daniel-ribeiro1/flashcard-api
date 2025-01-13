import { I18nLanguage } from '@/enum/i18n-language.enum';
import { RequestException } from '@/exceptions/request.exception';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Catch(RequestException)
export class RequestExceptionFilter implements ExceptionFilter {
  constructor(private readonly _i18nService: I18nService) {}
  catch(exception: RequestException, host: ArgumentsHost): void {
    const http = host.switchToHttp();

    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    const json = {
      path: request.originalUrl,
      key: exception.messageKey,
      statusCode: exception.statusCode,
      message: this._translate(exception.messageKey),
    };

    response.status(exception.statusCode).json(json);
  }

  private _translate(messageKey: string): string {
    return String(
      this._i18nService.t(`exceptions.${messageKey}`, {
        lang: I18nContext.current()?.lang || I18nLanguage.PT_BR,
      }),
    );
  }
}
