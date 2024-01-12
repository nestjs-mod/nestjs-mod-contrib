
# @nestjs-mod/terminus

Terminus integration provides readiness/liveness health checks for NestJS-mod (Wrapper for https://www.npmjs.com/package/@nestjs/terminus)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram bot][telegram-image]][telegram-url]

## Installation

```bash
npm i --save @nestjs-mod/terminus
```



## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [TerminusHealthCheck](#terminushealthcheck) | system | Terminus integration provides readiness/liveness health checks for NestJS-mod (Wrapper for https://www.npmjs.com/package/@nestjs/terminus) |



## Modules descriptions

### TerminusHealthCheck
Terminus integration provides readiness/liveness health checks for NestJS-mod (Wrapper for https://www.npmjs.com/package/@nestjs/terminus)

#### Shared providers
`TerminusHealthCheckService`

#### Shared imports
`TerminusModule`

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`endpoint`|Rest endpoint for health check|**optional**|```health```|-|
|`errorLogStyle`|The style of the error logger @default 'json'|**optional**|-|-|
|`logger`|The logger to use. Either default logger or your own.|**optional**|-|-|
|`gracefulShutdownTimeoutMs`|The timeout to wait in ms before the application shuts down @default 0|**optional**|-|-|

#### Feature configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`name`|Name of health check|**isNotEmpty** (name should not be empty)|-|-|
|`isHealthy`|Logic for health check|**isNotEmpty** (isHealthy should not be empty)|-|-|

[Back to Top](#modules)

## License

MIT

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/terminus
[npm-url]: https://npmjs.org/package/@nestjs-mod/terminus
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/terminus
[downloads-url]: https://npmjs.org/package/@nestjs-mod/terminus
