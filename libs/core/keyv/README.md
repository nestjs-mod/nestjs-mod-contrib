
# @nestjs-mod/keyv

Simple key-value storage with support for multiple backends, and a consistent interface for NestJS-mod (Wrapper for https://www.npmjs.com/package/keyv)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save keyv@5.2.3 @nestjs-mod/keyv
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [KeyvModule](#keyvmodule) | core | Simple key-value storage with support for multiple backends, and a consistent interface for NestJS-mod (Wrapper for https://www.npmjs.com/package/keyv) |


## Modules descriptions

### KeyvModule
Simple key-value storage with support for multiple backends, and a consistent interface for NestJS-mod (Wrapper for https://www.npmjs.com/package/keyv)

#### Shared providers
`KeyvService`

#### Environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`url`|Connection string for store data (example: redis://:redis_password@localhost:6379)|`obj['url']`, `process.env['KEYV_URL']`|**optional**|-|-|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`defaultLogger`|Default logger|**optional**|-|-|
|`featureName`|Feature name for generate prefix to environments keys|**optional**|-|-|
|`emitErrors`|Emit errors.|**optional**|```true```|-|
|`namespace`|Namespace for the current instance.|**optional**|-|-|
|`serialize`|A custom serialization function.|**optional**|```default```|-|
|`deserialize`|A custom deserialization function.|**optional**|```default```|-|
|`store`|The storage adapter instance to be used by Keyv.|**optional**|-|-|
|`storeFactoryByEnvironmentUrl`|Function for create storage adapter instance to be used by Keyv by environment url.|**optional**|-|-|
|`ttl`|Default TTL. Can be overridden by specifying a TTL on `.set()`.|**optional**|-|-|
|`compression`|Enable compression option.|**optional**|-|-|
|`stats`|Enable or disable statistics (default is false)|**optional**|```false```|-|
|`useKeyPrefix`|Enable or disable key prefixing (default is true)|**optional**|```true```|-|

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

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/keyv
[npm-url]: https://npmjs.org/package/@nestjs-mod/keyv
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[discord-image]: https://img.shields.io/badge/discord-online-brightgreen.svg
[discord-url]: https://discord.gg/meY7UXaG
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/keyv
[downloads-url]: https://npmjs.org/package/@nestjs-mod/keyv
