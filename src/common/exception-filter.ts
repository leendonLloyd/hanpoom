import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError, BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(exception);
    if (exception instanceof BadRequestException) {
      const res: string | { message?: [string] } = exception.getResponse();
      response.status(HttpStatus.BAD_REQUEST).json({
        errorCode: 'E0000',
        message: typeof res === 'object' ? res.message[0] : res,
      });
    } else {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({message: 'Internal Server Error'});
    }
  }
}
