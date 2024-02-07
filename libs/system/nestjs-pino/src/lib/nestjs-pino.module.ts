import { createNestModule, isProductionMode, NestModuleCategory } from '@nestjs-mod/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Logger, LoggerErrorInterceptor, LoggerModule } from 'nestjs-pino';
import { LoggerRequestIdInterceptor } from './logger-request-id.interceptor';
import { NestjsPinoAsyncLocalStorage } from './nestjs-pino.async-local-storage';
import { NestjsPinoLoggerConfiguration } from './nestjs-pino.configuration';

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
          level: isProductionMode() ? 'debug' : 'info',
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
      if (options.logger) {
        if (logger.constructor !== Object) {
          Object.setPrototypeOf(options.logger, logger);
        }
        Object.assign(options.logger, logger);
      } else {
        options.logger = logger;
      }
      options.app.useGlobalInterceptors(new LoggerErrorInterceptor());
    }
  },
});
