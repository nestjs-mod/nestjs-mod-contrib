import { createNestModule, NestModuleCategory } from '@nestjs-mod/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Logger, LoggerErrorInterceptor, LoggerModule } from 'nestjs-pino';
import { LoggerRequestIdInterceptor } from './logger-request-id.interceptor';
import { NestjsPinoAsyncLocalStorage } from './nestjs-pino.async-local-storage';
import { NestjsPinoLoggerConfiguration } from './nestjs-pino.configuration';


export const { NestjsPinoLogger } = createNestModule({
  moduleName: 'NestjsPinoLogger',
  staticConfigurationModel: NestjsPinoLoggerConfiguration,
  preWrapApplication: async ({ project, modules, current }) => {
    if (modules[current.category]) {
      modules[current.category]!.push(
        createNestModule({
          moduleName: 'NestjsPinoLogger',
          moduleDescription: 'Pino logger for NestJS-mod (Wrapper for https://www.npmjs.com/package/nestjs-pino)',
          moduleCategory: NestModuleCategory.system,
          staticConfigurationModel: NestjsPinoLoggerConfiguration,
          imports: (staticConfiguration) => [
            LoggerModule.forRoot({
              ...staticConfiguration,
              pinoHttp: {
                name: project.name,
                level: process.env['NODE_ENV'] !== 'production' ? 'debug' : 'info',
                hooks: {
                  logMethod: function (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    inputArgs: any[],
                    // eslint-disable-next-line @typescript-eslint/ban-types
                    method: Function,
                  ): unknown {
                    if (inputArgs.length >= 2) {
                      const record = inputArgs.shift() || {};
                      const arg2 = inputArgs.shift();

                      Object.assign(record, NestjsPinoAsyncLocalStorage.getStore())

                      return method.apply(this, [record, arg2, ...inputArgs]);
                    }
                    return method.apply(this, inputArgs);
                  }
                },
                // install 'pino-pretty' package in order to use the following option
                transport: process.env['NODE_ENV'] !== 'production'
                  ? { target: 'pino-pretty' }
                  : undefined,
                ...staticConfiguration?.pinoHttp
              }
            })
          ],
          providers: [
            { provide: APP_INTERCEPTOR, useClass: LoggerRequestIdInterceptor }
          ]
        }).NestjsPinoLogger.forRootAsync({
          ...current.asyncModuleOptions,
          staticConfiguration: { ...current.staticConfiguration, requestIdHeaderName: current.staticConfiguration?.requestIdHeaderName ?? 'request-id' }
        })
      );
    }
  },
  wrapApplication: async (options) => {
    if (options.app) {
      options.app.useLogger(options.app.get(Logger));
      options.app.useGlobalInterceptors(new LoggerErrorInterceptor());
    }
  },
});
