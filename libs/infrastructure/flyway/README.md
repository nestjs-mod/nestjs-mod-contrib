
# @nestjs-mod/flyway

Flyway - utility for working with database migrations (official site: https://flywaydb.org, preview version only for Postgres)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save-dev node-flywaydb@3.0.7
npm i --save @nestjs-mod/flyway
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [Flyway](#flyway) | infrastructure | Flyway - utility for working with database migrations (official site: https://flywaydb.org, preview version only for Postgres) |


## Modules descriptions

### Flyway
Flyway - utility for working with database migrations (official site: https://flywaydb.org, preview version only for Postgres)

#### Use in NestJS-mod
An example you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-prisma-flyway.

```typescript
import { PACKAGE_JSON_FILE, ProjectUtils, bootstrapNestApplication } from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposePostgreSQL } from '@nestjs-mod/docker-compose';
import { FLYWAY_JS_CONFIG_FILE, Flyway } from '@nestjs-mod/flyway';
import { join } from 'path';

export const flywayPrismaFeatureName = 'flyway-prisma';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-prisma-flyway');

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
        featureModuleName: flywayPrismaFeatureName,
      }),
      Flyway.forRoot({
        staticConfiguration: {
          featureName: flywayPrismaFeatureName,
          migrationsFolder: join(appFolder, 'src', 'migrations'),
          configFile: join(rootFolder, FLYWAY_JS_CONFIG_FILE),
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
    "_____flyway_____": "_____flyway_____",
    "flyway:create:example-prisma-flyway": "./node_modules/.bin/nx run example-prisma-flyway:flyway-create-migration",
    "flyway:migrate:example-prisma-flyway": "./node_modules/.bin/nx run example-prisma-flyway:flyway-migrate"
  },
  "scriptsComments": {
    "flyway:create:example-prisma-flyway": ["Command to create new empty migration for example-prisma-flyway"],
    "flyway:migrate:example-prisma-flyway": ["Applying migrations for example-prisma-flyway"]
  }
}
```

Additional commands in the nx application `project.json`

```json
{
  "targets": {
    "flyway-create-migration": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "echo 'select 1;' > ./apps/example-prisma-flyway/src/migrations/V`date +%Y%m%d%H%M`__NewMigration.sql"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    },
    "flyway-migrate": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "export DATABASE_URL=${EXAMPLE_PRISMA_FLYWAY_FLYWAY_PRISMA_DATABASE_URL} && export DATABASE_MIGRATIONS_LOCATIONS=./apps/example-prisma-flyway/src/migrations && ./node_modules/.bin/flyway -c ./.flyway.js migrate"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    },
    "flyway-info": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "export DATABASE_URL=${EXAMPLE_PRISMA_FLYWAY_FLYWAY_PRISMA_DATABASE_URL} && export DATABASE_MIGRATIONS_LOCATIONS=./apps/example-prisma-flyway/src/migrations && ./node_modules/.bin/flyway -c ./.flyway.js info"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    },
    "flyway-baseline": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "export DATABASE_URL=${EXAMPLE_PRISMA_FLYWAY_FLYWAY_PRISMA_DATABASE_URL} && export DATABASE_MIGRATIONS_LOCATIONS=./apps/example-prisma-flyway/src/migrations && ./node_modules/.bin/flyway -c ./.flyway.js baseline"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    },
    "flyway-validate": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "export DATABASE_URL=${EXAMPLE_PRISMA_FLYWAY_FLYWAY_PRISMA_DATABASE_URL} && export DATABASE_MIGRATIONS_LOCATIONS=./apps/example-prisma-flyway/src/migrations && ./node_modules/.bin/flyway -c ./.flyway.js validate"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    },
    "flyway-repair": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "export DATABASE_URL=${EXAMPLE_PRISMA_FLYWAY_FLYWAY_PRISMA_DATABASE_URL} && export DATABASE_MIGRATIONS_LOCATIONS=./apps/example-prisma-flyway/src/migrations && ./node_modules/.bin/flyway -c ./.flyway.js repair"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    }
  }
}
```

Common config for flyway `.flyway.js`

```javascript
const { ConnectionString } = require('connection-string');
const cs = new ConnectionString(process.env.DATABASE_URL);
const {
  user: USERNAME,
  password: PASSWORD,
  HOST = cs.host,
  DATABASE = cs.path && cs.path[0],
  SCHEMA = cs.params && cs.params.schema,
  SCHEMAS = cs.params && cs.params.schemas,
} = cs;

module.exports = {
  flywayArgs: {
    url: `jdbc:postgresql://${HOST}/${DATABASE}`,
    schemas: SCHEMAS || SCHEMA,
    defaultSchema: SCHEMA,
    locations: `filesystem:${process.env.DATABASE_MIGRATIONS_LOCATIONS || 'migrations'}`,
    user: USERNAME,
    password: PASSWORD,
    table: '__migrations',
    sqlMigrationSuffixes: '.sql',
  },
  // Use to configure environment variables used by flyway
  env: {
    JAVA_ARGS: '-Djava.util.logging.config.file=./conf/logging.properties',
  },
  version: '10.1.0', // optional, empty or missing will download the latest
  mavinPlugins: [
    {
      // optional, use to add any plugins (ie. logging)
      groupId: 'org.slf4j',
      artifactId: 'slf4j-api',
      version: '1.7.36',
      // This can be a specifc url to download that may be different then the auto generated url.
      downloadUrl: 'https://repo1.maven.org/maven2/org/slf4j/slf4j-api/1.7.36/slf4j-api-1.7.36.jar',
    },
    {
      groupId: 'org.slf4j',
      artifactId: 'slf4j-jdk14',
      version: '1.7.36',
    },
  ],
  downloads: {
    storageDirectory: `${__dirname}/tmp`, // optional, the specific directory to store the flyway downloaded files. The directory must be writable by the node app process' user.
    expirationTimeInMs: -1, // optional, -1 will never check for updates, defaults to 1 day.
  },
};
```


#### Environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`databaseUrl`|Connection string for database with credentials (example: postgres://feat:feat_password@localhost:5432/feat?schema=public)|`obj['databaseUrl']`, `process.env['DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|-|-|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`featureName`|Flyway feature name for generate prefix to environments keys|**optional**|-|-|
|`migrationsFolder`|Folder with migrations|**isNotEmpty** (migrationsFolder should not be empty)|-|-|
|`configFile`|Javascript config file for flyway (.flyway.js)|**isNotEmpty** (configFile should not be empty)|-|-|
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

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/flyway
[npm-url]: https://npmjs.org/package/@nestjs-mod/flyway
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[discord-image]: https://img.shields.io/badge/discord-online-brightgreen.svg
[discord-url]: https://discord.gg/meY7UXaG
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/flyway
[downloads-url]: https://npmjs.org/package/@nestjs-mod/flyway
