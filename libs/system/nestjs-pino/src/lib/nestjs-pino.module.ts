import { createNestModule, isProductionMode, NestModuleCategory } from '@nestjs-mod/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { randomUUID } from 'crypto';
import { Logger, LoggerModule } from 'nestjs-pino';
import { LoggerRequestIdInterceptor } from './logger-request-id.interceptor';
import { NestjsPinoAsyncLocalStorage } from './nestjs-pino.async-local-storage';
import { NestjsPinoLoggerConfiguration, X_REQUEST_ID } from './nestjs-pino.configuration';

export const { NestjsPinoLoggerModule } = createNestModule({
  moduleName: 'NestjsPinoLoggerModule',
  moduleDescription: 'Pino logger for NestJS-mod (Wrapper for https://www.npmjs.com/package/nestjs-pino)',
  moduleCategory: NestModuleCategory.system,
  configurationModel: NestjsPinoLoggerConfiguration,
  imports: ({ settingsModule }) => [
    LoggerModule.forRootAsync({
      imports: [settingsModule],
      inject: [NestjsPinoLoggerConfiguration],
      useFactory: (nestjsPinoLoggerConfiguration: NestjsPinoLoggerConfiguration) => ({
        ...nestjsPinoLoggerConfiguration,
        pinoHttp: {
          level: isProductionMode() ? 'debug' : 'trace',
          hooks: {
            logMethod: function (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              inputArgs: any[],
              // eslint-disable-next-line @typescript-eslint/ban-types
              method: Function
            ): unknown {
              if (inputArgs.length >= 2) {
                const record = inputArgs.shift() || {};
                const arg2 = inputArgs.shift();

                Object.assign(record, NestjsPinoAsyncLocalStorage.getStore());
                return method.apply(this, [record, arg2, ...inputArgs]);
              }
              return method.apply(this, inputArgs);
            },
          },

          // install 'pino-pretty' package in order to use the following option
          transport: isProductionMode() ? undefined : { target: 'pino-pretty' },
          autoLogging: true,
          // Define a custom request id function
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          genReqId: function (req: any, res: any) {
            const existingID = req.id ?? req.headers[X_REQUEST_ID];
            if (existingID) {
              return existingID;
            }
            const id = randomUUID();
            res.setHeader('X-Request-Id', id);
            return id;
          },
          ...nestjsPinoLoggerConfiguration?.pinoHttp,
        },
      }),
    }),
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggerRequestIdInterceptor }],
  // set custom options to application
  wrapApplication: async (options) => {
    if (options.app) {
      const logger = options.app.get(Logger);
      options.app.useLogger(logger);
      options.app.flushLogs();
      if (options.logger) {
        if (logger.constructor !== Object) {
          Object.setPrototypeOf(options.logger, logger);
        }
        Object.assign(options.logger, logger);
      } else {
        options.logger = logger;
      }
    }
  },
});
