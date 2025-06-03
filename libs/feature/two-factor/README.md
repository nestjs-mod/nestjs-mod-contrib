
# @nestjs-mod/two-factor

Two factor module with an error filter, guard, controller, database migrations and rest-sdk for work with module from other nodejs appliaction

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save @nestjs-mod/two-factor
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [TwoFactorModule](#twofactormodule) | feature | Two factor module with an error filter, guard, controller, database migrations and rest-sdk for work with module from other nodejs appliaction |


## Modules descriptions

### TwoFactorModule
Two factor module with an error filter, guard, controller, database migrations and rest-sdk for work with module from other nodejs appliaction

#### Shared providers
`TwoFactorService`, `TwoFactorEventsService`

#### Shared imports
`PrismaModule`, `PrismaToolsModule`

#### Configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`getTimeoutValue`|Function for determining the lifetime of code (default: 15min)|**optional**|```default```|-|

#### Static environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`useFilters`|Use filters|`obj['useFilters']`, `process.env['TWO_FACTOR_USE_FILTERS']`|**optional**|```true```|```true```|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |

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

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/two-factor
[npm-url]: https://npmjs.org/package/@nestjs-mod/two-factor
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[discord-image]: https://img.shields.io/badge/discord-online-brightgreen.svg
[discord-url]: https://discord.gg/meY7UXaG
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/two-factor
[downloads-url]: https://npmjs.org/package/@nestjs-mod/two-factor
