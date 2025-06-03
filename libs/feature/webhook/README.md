
# @nestjs-mod/webhook

Webhook module with an error filter, guard, controller, database migrations and rest-sdk for work with module from other nodejs appliaction

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save @nestjs-mod/webhook
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [WebhookModule](#webhookmodule) | feature | Webhook module with an error filter, guard, controller, database migrations and rest-sdk for work with module from other nodejs appliaction |


## Modules descriptions

### WebhookModule
Webhook module with an error filter, guard, controller, database migrations and rest-sdk for work with module from other nodejs appliaction

#### Shared providers
`WebhookService`, `WebhookUsersService`

#### Shared imports
`HttpModule`, `PrismaModule`

#### Configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`events`|List of available events|**optional**|-|-|
|`syncMode`|When we run an application in a serverless environment, our background tasks do not have time to complete, to disable background tasks and process requests on demand, we need to switch this property to true|**optional**|```false```|-|

#### Static environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`useGuards`|Use guards|`obj['useGuards']`, `process.env['WEBHOOK_USE_GUARDS']`|**optional**|```true```|```true```|
|`useFilters`|Use filters|`obj['useFilters']`, `process.env['WEBHOOK_USE_FILTERS']`|**optional**|```true```|```true```|
|`autoCreateUser`|Auto create user from guard|`obj['autoCreateUser']`, `process.env['WEBHOOK_AUTO_CREATE_USER']`|**optional**|```true```|```true```|
|`skipGuardErrors`|Skip any guard errors|`obj['skipGuardErrors']`, `process.env['WEBHOOK_SKIP_GUARD_ERRORS']`|**optional**|```false```|```false```|
|`cacheTTL`|TTL for cached data|`obj['cacheTTL']`, `process.env['WEBHOOK_CACHE_TTL']`|**optional**|```15000```|```15000```|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`guards`|External guards for controllers|**optional**|-|-|
|`mutateController`|Function for additional mutation of controllers|**optional**|-|-|

#### Feature configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`events`|List of available events|**optional**|-|-|

[Back to Top](#modules)

## Links

* https://github.com/nestjs-mod/nestjs-mod - A collection of utilities for unifying NestJS applications and modules
* https://github.com/nestjs-mod/nestjs-mod-contrib - Contrib repository for the NestJS-mod
* https://github.com/nestjs-mod/nestjs-mod-example - Example application built with [@nestjs-mod/schematics](https://github.com/nestjs-mod/nestjs-mod/tree/master/libs/schematics)
* https://github.com/nestjs-mod/nestjs-mod/blob/master/apps/example-basic/INFRASTRUCTURE.MD - A simple example of infrastructure documentation.
* https://github.com/nestjs-mod/nestjs-mod-contrib/blob/master/apps/example-prisma/INFRASTRUCTURE.MD - An extended example of infrastructure documentation with a docker-compose file and a data base.
* https://dev.to/endykaufman/collection-of-nestjs-mod-utilities-for-unifying-applications-and-modules-on-nestjs-5256 - Article about the project NestJS-mod
* https://habr.com/ru/articles/788916 - Коллекция утилит NestJS-mod для унификации приложений и модулей на NestJS


## License

MIT

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/webhook
[npm-url]: https://npmjs.org/package/@nestjs-mod/webhook
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[discord-image]: https://img.shields.io/badge/discord-online-brightgreen.svg
[discord-url]: https://discord.gg/meY7UXaG
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/webhook
[downloads-url]: https://npmjs.org/package/@nestjs-mod/webhook
