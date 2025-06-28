
# @nestjs-mod/pg-flyway

PgFlyway - utility for working with database migrations (site: https://www.npmjs.com/package/pg-flyway, preview version only for Postgres)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save-dev pg-flyway@1.2.5
npm i --save @nestjs-mod/pg-flyway
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [PgFlyway](#pgflyway) | infrastructure | PgFlyway - utility for working with database migrations (site: https://www.npmjs.com/package/pg-flyway, preview version only for Postgres) |


## Modules descriptions

### PgFlyway
PgFlyway - utility for working with database migrations (site: https://www.npmjs.com/package/pg-flyway, preview version only for Postgres)

#### Use in NestJS-mod
An example you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-prisma-pg-flyway.

```typescript
import { PACKAGE_JSON_FILE, ProjectUtils, bootstrapNestApplication } from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposePostgreSQL } from '@nestjs-mod/docker-compose';
import { PgFlyway } from '@nestjs-mod/pg-flyway';
import { join } from 'path';

export const pgflywayPrismaFeatureName = 'pg-flyway-prisma';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-prisma-pg-flyway');

bootstrapNestApplication({
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(appFolder, PACKAGE_JSON_FILE),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, '.env'),
        },
      }),
    ],
    infrastructure: [
      DockerCompose.forRoot({
        configuration: {
          dockerComposeFileVersion: '3',
          dockerComposeFile: join(appFolder, DOCKER_COMPOSE_FILE),
        },
      }),
      DockerComposePostgreSQL.forRoot(),
      DockerComposePostgreSQL.forFeature({
        featureModuleName: pgflywayPrismaFeatureName,
      }),
      PgFlyway.forRoot({
        staticConfiguration: {
          featureName: pgflywayPrismaFeatureName,
          migrationsFolder: join(appFolder, 'src', 'migrations'),
        },
      }),
    ],
  },
});
```

After connecting the module to the application and `npm run build` and starting generation of documentation through `npm run docs:infrastructure`, you will have new files and scripts to run.

New scripts mostly `package.json`

```json
{
  "scripts": {
    "_____pg-flyway_____": "_____pg-flyway_____",
    "pg-flyway:create:example-prisma-pg-flyway": "./node_modules/.bin/nx run example-prisma-pg-flyway:pg-flyway-create-migration",
    "pg-flyway:migrate:example-prisma-pg-flyway": "./node_modules/.bin/nx run example-prisma-pg-flyway:pg-flyway-migrate"
  },
  "scriptsComments": {
    "pg-flyway:create:example-prisma-pg-flyway": [
      "Command to create new empty migration for example-prisma-pg-flyway, for set name pass name to --args, example: npm run pg-flyway:create:appname --args=Init"
    ],
    "pg-flyway:migrate:example-prisma-pg-flyway": ["Applying migrations for example-prisma-pg-flyway"]
  }
}
```

Additional commands in the nx application `project.json`

```json
{
  "targets": {
    "pg-flyway-create-migration": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "export PG_FLYWAY_DATABASE_URL=${EXAMPLE_PRISMA_PG_FLYWAY_PG_FLYWAY_PRISMA_DATABASE_URL} && export PG_FLYWAY_HISTORY_TABLE=__migrations_example_prisma_pg_flyway && export PG_FLYWAY_LOCATIONS=./apps/example-prisma-pg-flyway/src/migrations && ./node_modules/.bin/pg-flyway create --name=${npm_config_args:-NewMigration}"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    },
    "pg-flyway-migrate": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "export PG_FLYWAY_DATABASE_URL=${EXAMPLE_PRISMA_PG_FLYWAY_PG_FLYWAY_PRISMA_DATABASE_URL} && export PG_FLYWAY_HISTORY_TABLE=__migrations_example_prisma_pg_flyway && export PG_FLYWAY_LOCATIONS=./apps/example-prisma-pg-flyway/src/migrations && ./node_modules/.bin/pg-flyway migrate"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    },
    "pg-flyway-info": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "export PG_FLYWAY_DATABASE_URL=${EXAMPLE_PRISMA_PG_FLYWAY_PG_FLYWAY_PRISMA_DATABASE_URL} && export PG_FLYWAY_HISTORY_TABLE=__migrations_example_prisma_pg_flyway && export PG_FLYWAY_LOCATIONS=./apps/example-prisma-pg-flyway/src/migrations && ./node_modules/.bin/pg-flyway info"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    },
    "pg-flyway-baseline": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "export PG_FLYWAY_DATABASE_URL=${EXAMPLE_PRISMA_PG_FLYWAY_PG_FLYWAY_PRISMA_DATABASE_URL} && export PG_FLYWAY_HISTORY_TABLE=__migrations_example_prisma_pg_flyway && export PG_FLYWAY_LOCATIONS=./apps/example-prisma-pg-flyway/src/migrations && ./node_modules/.bin/pg-flyway baseline"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    },
    "pg-flyway-validate": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "export PG_FLYWAY_DATABASE_URL=${EXAMPLE_PRISMA_PG_FLYWAY_PG_FLYWAY_PRISMA_DATABASE_URL} && export PG_FLYWAY_HISTORY_TABLE=__migrations_example_prisma_pg_flyway && export PG_FLYWAY_LOCATIONS=./apps/example-prisma-pg-flyway/src/migrations && ./node_modules/.bin/pg-flyway validate"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    },
    "pg-flyway-repair": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "export PG_FLYWAY_DATABASE_URL=${EXAMPLE_PRISMA_PG_FLYWAY_PG_FLYWAY_PRISMA_DATABASE_URL} && export PG_FLYWAY_HISTORY_TABLE=__migrations_example_prisma_pg_flyway && export PG_FLYWAY_LOCATIONS=./apps/example-prisma-pg-flyway/src/migrations && ./node_modules/.bin/pg-flyway repair"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    }
  }
}
```


#### Environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`databaseUrl`|Connection string for database with credentials (example: postgres://feat:feat_password@localhost:5432/feat?schema=public)|`obj['databaseUrl']`, `process.env['DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|-|-|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`featureName`|PgFlyway feature name for generate prefix to environments keys|**optional**|-|-|
|`migrationsFolder`|Folder with migrations|**isNotEmpty** (migrationsFolder should not be empty)|-|-|
|`pgFlywayHistoryTable`|Table with history of migrations|**optional**|-|-|
|`nxProjectJsonFile`|Application or library project.json-file (nx)|**optional**|-|-|

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

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/pg-flyway
[npm-url]: https://npmjs.org/package/@nestjs-mod/pg-flyway
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[discord-image]: https://img.shields.io/badge/discord-online-brightgreen.svg
[discord-url]: https://discord.gg/meY7UXaG
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/pg-flyway
[downloads-url]: https://npmjs.org/package/@nestjs-mod/pg-flyway
