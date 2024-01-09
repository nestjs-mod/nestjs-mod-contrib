import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { NestjsPinoAsyncLocalStorage } from './nestjs-pino.async-local-storage';
import { NestjsPinoLoggerConfiguration } from './nestjs-pino.configuration';

@Injectable()
export class LoggerRequestIdInterceptor implements NestInterceptor {

    constructor(private readonly nestjsPinoLoggerConfiguration: NestjsPinoLoggerConfiguration) { }

    intercept(
        context: ExecutionContext,
        next: CallHandler,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        return NestjsPinoAsyncLocalStorage.run({
            requestId: req.headers[this.nestjsPinoLoggerConfiguration.requestIdHeaderName!]
        }, () => next.handle())
    }
}