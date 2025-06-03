import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { TwoFactorError } from './two-factor.errors';

@Catch(TwoFactorError)
export class TwoFactorExceptionsFilter extends BaseExceptionFilter {
  private logger = new Logger(TwoFactorExceptionsFilter.name);

  override catch(exception: TwoFactorError, host: ArgumentsHost) {
    if (exception instanceof TwoFactorError) {
      this.logger.error(exception, exception.stack);
      super.catch(
        new HttpException(
          {
            code: exception.code,
            message: exception.message,
            metadata: exception.metadata,
          },
          HttpStatus.BAD_REQUEST
        ),
        host
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.logger.error(exception, (exception as any)?.stack);
      super.catch(exception, host);
    }
  }
}
