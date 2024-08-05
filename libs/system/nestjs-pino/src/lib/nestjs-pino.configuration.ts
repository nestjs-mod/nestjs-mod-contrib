import { ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { Type } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
import { Params } from 'nestjs-pino';
import { DestinationStream } from 'pino';
import { Options } from 'pino-http';

export const X_REQUEST_ID = 'x-request-id';

@ConfigModel()
export class NestjsPinoLoggerConfiguration implements Params {
  @ConfigModelProperty({
    description: `Header name for search requestId`,
    default: X_REQUEST_ID,
  })
  requestIdHeaderName?: string;

  @ConfigModelProperty({
    description: `Optional parameter for routing. It should implement interface of parameters of NestJS built-in \`MiddlewareConfigProxy['forRoutes']\`. @see https://docs.nestjs.com/middleware#applying-middleware It can be used for both disabling automatic req/res logs and removing request context from following logs. It works for all requests by default. If you only need to turn off the automatic request/response logging for some specific (or all) routes but keep request context for app logs use \`pinoHttp.autoLogging\` field.`,
  })
  exclude?: (string | RouteInfo)[];

  @ConfigModelProperty({
    description: `Optional parameter for routing. It should implement interface of parameters of NestJS built-in \`MiddlewareConfigProxy['forRoutes']\`. @see https://docs.nestjs.com/middleware#applying-middleware It can be used for both disabling automatic req/res logs and removing request context from following logs. It works for all requests by default. If you only need to turn off the automatic request/response logging for some specific (or all) routes but keep request context for app logs use \`pinoHttp.autoLogging\` field.`,
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forRoutes?: (string | RouteInfo | Type<any>)[];

  @ConfigModelProperty({
    description: `Optional parameters for \`pino-http\` module @see https://github.com/pinojs/pino-http#pinohttpopts-stream`,
  })
  pinoHttp?: Options | DestinationStream | [Options, DestinationStream];

  @ConfigModelProperty({
    description: `Optional parameter to change property name \`context\` in resulted logs, so logs will be like: \\{"level":30, ... "RENAME_CONTEXT_VALUE_HERE":"AppController" \\}`,
  })
  renameContext?: string;

  @ConfigModelProperty({
    description: `Optional parameter to skip pino configuration in case you are using FastifyAdapter, and already configure logger in adapter's config. The Pros and cons of this approach are described in the FAQ section of the documentation: @see https://github.com/iamolegga/nestjs-pino#faq.`,
  })
  useExisting?: true;
}
