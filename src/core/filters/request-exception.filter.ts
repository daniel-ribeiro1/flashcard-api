import { RequestException } from '@/exceptions/request.exception';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(RequestException)
export class RequestExceptionFilter implements ExceptionFilter {
  catch(exception: RequestException, host: ArgumentsHost) {
    const http = host.switchToHttp();

    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    // TODO: Internacionalizar a mensagem de erro
    response.status(exception.statusCode).json({
      path: request.originalUrl,
      key: exception.messageKey,
      statusCode: exception.statusCode,
      message: exception.messageKey,
    });
  }
}
