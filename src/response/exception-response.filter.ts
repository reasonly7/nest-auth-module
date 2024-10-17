import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
  ExceptionFilter,
} from '@nestjs/common';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';

@Catch()
class ExceptionResponseFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionResponseFilter.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let code = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Unknown Error';

    if (exception instanceof HttpException) {
      code = exception.getStatus();
      message = exception.message;

      // Compatible with ValidationPipe
      const msgList = (exception.getResponse() as { message: string[] })
        .message;
      if (msgList && Array.isArray(msgList) && msgList.length > 0) {
        message = msgList[0];
      }
    }

    const responseBody = { data: null, message, code, success: false };

    httpAdapter.reply(ctx.getResponse(), responseBody, code);

    this.logger.error(message, (exception as HttpException).stack);
  }
}

export const ExceptionResponseFilterProvider = {
  provide: APP_FILTER,
  useClass: ExceptionResponseFilter,
};
