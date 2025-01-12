import { HttpException, HttpStatus } from '@nestjs/common';

export class RequestException extends HttpException {
  constructor(
    public messageKey: string,
    public statusCode: HttpStatus,
  ) {
    super(messageKey, statusCode);
  }
}
