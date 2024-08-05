
# @nestjs-mod/pino

Pino logger for NestJS-mod (Wrapper for https://www.npmjs.com/package/nestjs-pino)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram bot][telegram-image]][telegram-url]

## Installation

```bash
npm i --save pino-http pino nestjs-pino @nestjs-mod/pino
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [NestjsPinoLoggerModule](#nestjspinologgermodule) | system | Pino logger for NestJS-mod (Wrapper for https://www.npmjs.com/package/nestjs-pino) |


## Modules descriptions

### NestjsPinoLoggerModule
Pino logger for NestJS-mod (Wrapper for https://www.npmjs.com/package/nestjs-pino)

#### Use in NestJS-mod
An example of using forRoot with parameters, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-pino-logger.

Passing requestId from the frontend is supported.

```typescript
import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  bootstrapNestApplication,
} from '@nestjs-mod/common';
import { NestjsPinoLoggerModule } from '@nestjs-mod/pino';

bootstrapNestApplication({
  modules: {
    system: [
      DefaultNestApplicationInitializer.forRoot({ staticConfiguration: { bufferLogs: true } }),
      NestjsPinoLoggerModule.forRoot(),
      DefaultNestApplicationListener.forRoot({
        staticEnvironments: { port: 3000 },
      }),
    ],
  },
});
```


#### Configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`requestIdHeaderName`|Header name for search requestId|**optional**|```x-request-id```|-|
|`exclude`|Optional parameter for routing. It should implement interface of parameters of NestJS built-in `MiddlewareConfigProxy['forRoutes']`. @see https://docs.nestjs.com/middleware#applying-middleware It can be used for both disabling automatic req/res logs and removing request context from following logs. It works for all requests by default. If you only need to turn off the automatic request/response logging for some specific (or all) routes but keep request context for app logs use `pinoHttp.autoLogging` field.|**optional**|-|-|
|`forRoutes`|Optional parameter for routing. It should implement interface of parameters of NestJS built-in `MiddlewareConfigProxy['forRoutes']`. @see https://docs.nestjs.com/middleware#applying-middleware It can be used for both disabling automatic req/res logs and removing request context from following logs. It works for all requests by default. If you only need to turn off the automatic request/response logging for some specific (or all) routes but keep request context for app logs use `pinoHttp.autoLogging` field.|**optional**|-|-|
|`pinoHttp`|Optional parameters for `pino-http` module @see https://github.com/pinojs/pino-http#pinohttpopts-stream|**optional**|-|-|
|`renameContext`|Optional parameter to change property name `context` in resulted logs, so logs will be like: \{"level":30, ... "RENAME_CONTEXT_VALUE_HERE":"AppController" \}|**optional**|-|-|
|`useExisting`|Optional parameter to skip pino configuration in case you are using FastifyAdapter, and already configure logger in adapter's config. The Pros and cons of this approach are described in the FAQ section of the documentation: @see https://github.com/iamolegga/nestjs-pino#faq.|**optional**|-|-|

[Back to Top](#modules)

## Links

* https://github.com/nestjs-mod/nestjs-mod - A collection of utilities for unifying NestJS applications and modules
* https://github.com/nestjs-mod/nestjs-mod-contrib - Contrib repository for the NestJS-mod
* https://github.com/nestjs-mod/nestjs-mod-example - Example application built with [@nestjs-mod/schematics](https://github.com/nestjs-mod/nestjs-mod/tree/master/libs/schematics)
* https://github.com/nestjs-mod/nestjs-mod/blob/master/apps/example-basic/INFRASTRUCTURE.MD - A simple example of infrastructure documentation.
* https://github.com/nestjs-mod/nestjs-mod-contrib/blob/master/apps/example-prisma/INFRASTRUCTURE.MD - An extended example of infrastructure documentation with a docker-compose file and a data base.
* https://dev.to/endykaufman/collection-of-nestjs-mod-utilities-for-unifying-applications-and-modules-on-nestjs-5256 - Article about the project NestJS-mod


## License

MIT

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/pino
[npm-url]: https://npmjs.org/package/@nestjs-mod/pino
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/pino
[downloads-url]: https://npmjs.org/package/@nestjs-mod/pino
