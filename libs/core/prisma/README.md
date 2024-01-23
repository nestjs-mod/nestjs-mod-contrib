
# @nestjs-mod/prisma

Next-generation Node.js and TypeScript ORM for NestJS-mod (preview version)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram bot][telegram-image]][telegram-url]

## Installation

```bash
npm i --save @nestjs-mod/prisma
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [PrismaModule](#prismamodule) | core | Next-generation Node.js and TypeScript ORM for NestJS-mod (preview version) |


## Modules descriptions

### PrismaModule
Next-generation Node.js and TypeScript ORM for NestJS-mod (preview version)

#### Shared providers
`PrismaClientFactoryService`, `PrismaClient`

#### Environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`databaseUrl`|Connection string for database with credentials (example: postgres://feat:feat_password@localhost:5432/feat?schema=public)|`obj['databaseUrl']`, `process.env['DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|-|-|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`defaultLogger`|Default logger|**optional**|-|-|
|`prismaModule`|NodeJS module with Prisma modules|**isNotEmpty** (prismaModule should not be empty)|-|-|
|`prismaFeatureName`|Prisma feature name for generate prefix to environments keys|**isNotEmpty** (prismaFeatureName should not be empty)|-|-|
|`prismaSchemaFile`|Schema file for prisma|**isNotEmpty** (prismaSchemaFile should not be empty)|-|-|
|`logging`|Logging types (all_queries|long_queries)|**optional**|```long_queries```|-|
|`maxQueryExecutionTime`|Max query execution time for detect long queries|**optional**|```5000```|-|
|`addMigrationScripts`|The option specifies whether it is necessary to create scripts to work with database migrations, for those who use third-party applications to create and apply migrations in the database (example: https://flywaydb.org, https://www.npmjs.com/package/ db-migrate)|**optional**|```true```|-|
|`customSchemaContent`|Unsafe string custom content for add to end of prisma schema file|**optional**|-|-|

[Back to Top](#modules)

## Links

* https://github.com/nestjs-mod/nestjs-mod - A collection of utilities for unifying NestJS applications and modules
* https://github.com/nestjs-mod/nestjs-mod-contrib - Contrib repository for the NestJS-mod
* https://github.com/nestjs-mod/nestjs-mod-example - Example application built with [@nestjs-mod/schematics](https://github.com/nestjs-mod/nestjs-mod/tree/master/libs/schematics)


## License

MIT

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/prisma
[npm-url]: https://npmjs.org/package/@nestjs-mod/prisma
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/prisma
[downloads-url]: https://npmjs.org/package/@nestjs-mod/prisma
