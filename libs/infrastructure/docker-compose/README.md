
# @nestjs-mod/docker-compose

Docker Compose is a tool for defining and running multi-container applications. It is the key to unlocking a streamlined and efficient development and deployment experience. (Generator docker-compose.yml for https://docs.docker.com/compose)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram bot][telegram-image]][telegram-url]

## Installation

```bash
npm i --save @nestjs-mod/docker-compose
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [DockerCompose](#dockercompose) | infrastructure | Docker Compose is a tool for defining and running multi-container applications. It is the key to unlocking a streamlined and efficient development and deployment experience. (Generator docker-compose.yml for https://docs.docker.com/compose) |
| [DockerComposePostgreSQL](#dockercomposepostgresql) | infrastructure | PostgreSQL (Postgres) is an open source object-relational database known for reliability and data integrity. ACID-compliant, it supports foreign keys, joins, views, triggers and stored procedures. (Generator for databases in docker-compose.yml for https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/infrastructure/docker-compose) |
| [DockerComposeRedis](#dockercomposeredis) | infrastructure | The open-source, in-memory data store used by millions of developers as a cache, vector database, document database, streaming engine, and message broker. (Generator for redis in docker-compose.yml for https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/infrastructure/redis) |


## Modules descriptions

### DockerCompose
Docker Compose is a tool for defining and running multi-container applications. It is the key to unlocking a streamlined and efficient development and deployment experience. (Generator docker-compose.yml for https://docs.docker.com/compose)

#### Use in NestJS-mod
An example you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-prisma-flyway or https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-prisma.

```typescript
import { PACKAGE_JSON_FILE, ProjectUtils, bootstrapNestApplication } from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose } from '@nestjs-mod/docker-compose';
import { join } from 'path';

export const flywayPrismaFeatureName = 'flyway-prisma';

bootstrapNestApplication({
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(
            __dirname,
            '..',
            '..',
            '..',
            'apps/example-prisma-flyway',
            PACKAGE_JSON_FILE
          ),
          packageJsonFile: join(__dirname, '..', '..', '..', PACKAGE_JSON_FILE),
          envFile: join(__dirname, '..', '..', '..', '.env'),
        },
      }),
    ],
    infrastructure: [
      DockerCompose.forRoot({
        configuration: {
          dockerComposeFileVersion: '3',
          dockerComposeFile: join(__dirname, '..', '..', '..', 'apps/example-prisma-flyway', DOCKER_COMPOSE_FILE),
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
    "_____docker-compose infra_____": "_____docker-compose infra_____",
    "docker-compose:start:example-prisma-flyway": "export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f ./apps/example-prisma-flyway/docker-compose.yml --compatibility up -d",
    "docker-compose:stop:example-prisma-flyway": "export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f ./apps/example-prisma-flyway/docker-compose.yml down"
  },
  "scriptsComments": {
    "docker-compose:start:example-prisma-flyway": [
      "Running the docker-compose infrastructure for example-prisma-flyway"
    ],
    "docker-compose:stop:example-prisma-flyway": [
      "Stopping the docker-compose infrastructure for example-prisma-flyway"
    ]
  }
}
```

Empty docker-compose file for application `docker-compose.yml` with real credenionals and add it to `.gitignore` file

```yaml
# Do not modify this file, it is generated using the DockerCompose module included with NestJS-mod.
version: '3'
```

Empty docker-compose file for application `docker-compose-example.yml` with fake credenionals

```yaml
# Do not modify this file, it is generated using the DockerCompose module included with NestJS-mod.
version: '3'
```


#### Shared providers
`ManualDockerComposeFeatures`

#### Configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`dockerComposeFile`|Main file for docker-compose, the Compose specification establishes a standard for the definition of multi-container platform-agnostic applications.|**isNotEmpty** (dockerComposeFile should not be empty)|-|-|
|`dockerComposeFileVersion`|Docker-compose file version. @see https://docs.docker.com/compose/compose-file/compose-versioning|**isNotEmpty** (dockerComposeFileVersion should not be empty)|```3```|-|

#### Feature configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`version`|The top-level version property is defined by the Compose Specification for backward compatibility. It is only informative. @see https://github.com/compose-spec/compose-spec/blob/master/04-version-and-name.md|**optional**|-|-|
|`services`|A service is an abstract definition of a computing resource within an application which can be scaled or replaced independently from other components. @see https://github.com/compose-spec/compose-spec/blob/master/05-services.md|**optional**|-|-|
|`networks`|Networks are the layer that allow services to communicate with each other. @see https://github.com/compose-spec/compose-spec/blob/master/06-networks.md|**optional**|-|-|
|`volumes`|Volumes are persistent data stores implemented by the container engine. @see https://github.com/compose-spec/compose-spec/blob/master/07-volumes.md|**optional**|-|-|
|`secrets`|Secrets are a flavor of Configs focusing on sensitive data, with specific constraint for this usage. @see https://github.com/compose-spec/compose-spec/blob/master/09-secrets.md|**optional**|-|-|
|`configs`|Configs allow services to adapt their behaviour without the need to rebuild a Docker image. @see https://github.com/compose-spec/compose-spec/blob/master/08-configs.md|**optional**|-|-|

#### Modules that use feature configuration
##### Feature module name: POSTGRE_SQL


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`version`|The top-level version property is defined by the Compose Specification for backward compatibility. It is only informative. @see https://github.com/compose-spec/compose-spec/blob/master/04-version-and-name.md|**optional**|-|-|
|`services`|A service is an abstract definition of a computing resource within an application which can be scaled or replaced independently from other components. @see https://github.com/compose-spec/compose-spec/blob/master/05-services.md|**optional**|-|{"postgre-sql":{"image":"bitnami/postgresql:15.5.0","container_name":"postgre-sql","volumes":["postgre-sql-volume:/bitnami/postgresql"],"ports":["5432:5432"],"networks":["default-network"],"healthcheck":{"test":["CMD-SHELL","pg_isready -U postgres"],"interval":"5s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}|
|`networks`|Networks are the layer that allow services to communicate with each other. @see https://github.com/compose-spec/compose-spec/blob/master/06-networks.md|**optional**|-|{"default-network":{"driver":"bridge"}}|
|`volumes`|Volumes are persistent data stores implemented by the container engine. @see https://github.com/compose-spec/compose-spec/blob/master/07-volumes.md|**optional**|-|{"postgre-sql-volume":{"name":"postgre-sql-volume"}}|
|`secrets`|Secrets are a flavor of Configs focusing on sensitive data, with specific constraint for this usage. @see https://github.com/compose-spec/compose-spec/blob/master/09-secrets.md|**optional**|-|-|
|`configs`|Configs allow services to adapt their behaviour without the need to rebuild a Docker image. @see https://github.com/compose-spec/compose-spec/blob/master/08-configs.md|**optional**|-|-|

[Back to Top](#modules)

---
### DockerComposePostgreSQL
PostgreSQL (Postgres) is an open source object-relational database known for reliability and data integrity. ACID-compliant, it supports foreign keys, joins, views, triggers and stored procedures. (Generator for databases in docker-compose.yml for https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/infrastructure/docker-compose)

#### Use in NestJS-mod
An example you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-prisma-flyway or https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-prisma.

```typescript
import { PACKAGE_JSON_FILE, ProjectUtils, bootstrapNestApplication } from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposePostgreSQL } from '@nestjs-mod/docker-compose';
import { join } from 'path';

export const flywayPrismaFeatureName = 'flyway-prisma';

bootstrapNestApplication({
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(
            __dirname,
            '..',
            '..',
            '..',
            'apps/example-prisma-flyway',
            PACKAGE_JSON_FILE
          ),
          packageJsonFile: join(__dirname, '..', '..', '..', PACKAGE_JSON_FILE),
          envFile: join(__dirname, '..', '..', '..', '.env'),
        },
      }),
    ],
    infrastructure: [
      DockerCompose.forRoot({
        configuration: {
          dockerComposeFileVersion: '3',
          dockerComposeFile: join(__dirname, '..', '..', '..', 'apps/example-prisma-flyway', DOCKER_COMPOSE_FILE),
        },
      }),
      DockerComposePostgreSQL.forRoot(),
      DockerComposePostgreSQL.forFeature({
        featureModuleName: flywayPrismaFeatureName,
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
    "_____db_____": "_____db_____",
    "db:create": "npm run nx:many -- -t=db-create"
  },
  "scriptsComments": {
    "db:create": ["Creation all databases of applications and modules"]
  }
}
```

Additional commands in the nx application `project.json`

```json
{
  "targets": {
    "db-create": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "./node_modules/.bin/rucken postgres --force-change-username=true --force-change-password=true --root-database-url=${EXAMPLE_PRISMA_FLYWAY_ROOT_DATABASE_URL} --app-database-url=${EXAMPLE_PRISMA_FLYWAY_FLYWAY_PRISMA_DATABASE_URL}"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    }
  }
}
```

Add database options to docker-compose file for application `docker-compose.yml` with real credenionals and add it to `.gitignore` file

```yaml
version: '3'
services:
  example-prisma-flyway-postgre-sql:
    image: bitnami/postgresql:15.5.0
    container_name: example-prisma-flyway-postgre-sql
    volumes:
      - example-prisma-flyway-postgre-sql-volume:/bitnami/postgresql
    ports:
      - 5432:5432
    networks:
      - example-prisma-flyway-network
    healthcheck:
      test:
        - CMD-SHELL
        - pg_isready -U postgres
      interval: 5s
      timeout: 5s
      retries: 5
    tty: true
    restart: always
    environment:
      POSTGRESQL_USERNAME: postgres
      POSTGRESQL_PASSWORD: postgres_password
      POSTGRESQL_DATABASE: postgres
networks:
  example-prisma-flyway-network:
    driver: bridge
volumes:
  example-prisma-flyway-postgre-sql-volume:
    name: example-prisma-flyway-postgre-sql-volume
```

Add database options to docker-compose file for application `docker-compose-example.yml` with fake credenionals

```yaml
# Do not modify this file, it is generated using the DockerCompose module included with NestJS-mod.
version: '3'
services:
  example-prisma-flyway-postgre-sql:
    image: bitnami/postgresql:15.5.0
    container_name: example-prisma-flyway-postgre-sql
    volumes:
      - example-prisma-flyway-postgre-sql-volume:/bitnami/postgresql
    ports:
      - 5432:5432
    networks:
      - example-prisma-flyway-network
    healthcheck:
      test:
        - CMD-SHELL
        - pg_isready -U postgres
      interval: 5s
      timeout: 5s
      retries: 5
    tty: true
    restart: always
    environment:
      POSTGRESQL_USERNAME: value_for_postgresql_username
      POSTGRESQL_PASSWORD: value_for_postgresql_password
      POSTGRESQL_DATABASE: value_for_postgresql_database
networks:
  example-prisma-flyway-network:
    driver: bridge
volumes:
  example-prisma-flyway-postgre-sql-volume:
    name: example-prisma-flyway-postgre-sql-volume
```


#### Static environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`rootDatabaseUrl`|Connection string for PostgreSQL with root credentials (example: postgres://postgres:postgres_password@localhost:5432/postgres?schema=public, username must be "postgres")|`obj['rootDatabaseUrl']`, `process.env['ROOT_DATABASE_URL']`|**isNotEmpty** (rootDatabaseUrl should not be empty)|-|-|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`networks`|Network, if not set networkNames have project name and driver=bridge.|**optional**|-|-|
|`externalPort`|External port for sharing container.|**optional**|```5432```|-|
|`image`|Docker image name|**optional**|```bitnami/postgresql:15.5.0```|-|

#### Feature environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`databaseUrl`|Connection string for PostgreSQL with module credentials (example: postgres://feat:feat_password@localhost:5432/feat?schema=public)|`obj['databaseUrl']`, `process.env['DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|-|-|

[Back to Top](#modules)

---
### DockerComposeRedis
The open-source, in-memory data store used by millions of developers as a cache, vector database, document database, streaming engine, and message broker. (Generator for redis in docker-compose.yml for https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/infrastructure/redis)

#### Use in NestJS-mod
An example you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-cache-manager.

```typescript
import {
  InfrastructureMarkdownReportGenerator,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
} from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposeRedis } from '@nestjs-mod/docker-compose';
import { join } from 'path';
import { userFeatureName } from './app/app.constants';

bootstrapNestApplication({
  globalConfigurationOptions: { debug: true },
  globalEnvironmentsOptions: { debug: true },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(
            __dirname,
            '..',
            '..',
            '..',
            'apps/example-cache-manager',
            PACKAGE_JSON_FILE
          ),
          packageJsonFile: join(__dirname, '..', '..', '..', PACKAGE_JSON_FILE),
          envFile: join(__dirname, '..', '..', '..', '.env'),
        },
      }),
    ],
    infrastructure: [
      InfrastructureMarkdownReportGenerator.forRoot({
        staticConfiguration: {
          markdownFile: join(__dirname, '..', '..', '..', 'apps/example-cache-manager', 'INFRASTRUCTURE.MD'),
          skipEmptySettings: true,
        },
      }),
      DockerCompose.forRoot({
        configuration: {
          dockerComposeFileVersion: '3',
          dockerComposeFile: join(__dirname, '..', '..', '..', 'apps/example-cache-manager', DOCKER_COMPOSE_FILE),
        },
      }),
      DockerComposeRedis.forRoot({ staticConfiguration: { featureName: userFeatureName } }),
    ],
  },
});
```

After connecting the module to the application and `npm run build` and starting generation of documentation through `npm run docs:infrastructure`, you will have new files and scripts to run.

New scripts mostly `package.json`

Add database options to docker-compose file for application `docker-compose.yml` with real credenionals and add it to `.gitignore` file

```yaml
version: '3'
services:
  'cache-manager-redis':
    'image': 'bitnami/redis:7.2'
    'container_name': 'cache-manager-redis'
    'volumes':
      - 'cache-manager-redis-volume:/bitnami/redis/data'
    'ports':
      - '6379:6379'
    'networks':
      - 'cache-manager-network'
    'environment':
      'REDIS_DATABASE': '0'
      'REDIS_PASSWORD': 'redis_password'
      'REDIS_DISABLE_COMMANDS': 'FLUSHDB,FLUSHALL'
      'REDIS_IO_THREADS': 2
      'REDIS_IO_THREADS_DO_READS': 'yes'
    'healthcheck':
      'test':
        - 'CMD-SHELL'
        - 'redis-cli ping | grep PONG'
      'interval': '5s'
      'timeout': '5s'
      'retries': 5
    'tty': true
    'restart': 'always'
networks:
  example-cache-manager-network:
    driver: bridge
volumes:
  example-cache-manager-volume:
    name: example-cache-manager-volume
```

Add database options to docker-compose file for application `docker-compose-example.yml` with fake credenionals

```yaml
# Do not modify this file, it is generated using the DockerCompose module included with NestJS-mod.
version: '3'
services:
  'cache-manager-redis':
    'image': 'bitnami/redis:7.2'
    'container_name': 'cache-manager-redis'
    'volumes':
      - 'cache-manager-redis-volume:/bitnami/redis/data'
    'ports':
      - '6379:6379'
    'networks':
      - 'cache-manager-network'
    'environment':
      'REDIS_DATABASE': 'value_for_redis_database'
      'REDIS_PASSWORD': 'value_for_redis_password'
      'REDIS_DISABLE_COMMANDS': 'value_for_redis_disable_commands'
      'REDIS_IO_THREADS': 'value_for_redis_io_threads'
      'REDIS_IO_THREADS_DO_READS': 'value_for_redis_io_threads_do_reads'
    'healthcheck':
      'test':
        - 'CMD-SHELL'
        - 'redis-cli ping | grep PONG'
      'interval': '5s'
      'timeout': '5s'
      'retries': 5
    'tty': true
    'restart': 'always'
networks:
  example-cache-manager-network:
    driver: bridge
volumes:
  example-cache-manager-volume:
    name: example-cache-manager-volume
```

Connection string environment variable

```bash
EXAMPLE_CACHE_MANAGER_CACHE_MANAGER_USER_REDIS_URL=redis://:redis_password@localhost:6379
```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.


#### Static environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`redisUrl`|Connection string for Redis (example: redis://:redis_password@localhost:6379)|`obj['redisUrl']`, `process.env['REDIS_URL']`|**isNotEmpty** (redisUrl should not be empty)|-|-|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`networks`|Network, if not set networkNames have project name and driver=bridge.|**optional**|-|-|
|`externalPort`|External port for sharing container.|**optional**|```6379```|-|
|`image`|Docker image name|**optional**|```bitnami/redis:7.2```|-|
|`disableCommands`|Redis disable commands.|**optional**|```FLUSHDB,FLUSHALL```|-|
|`ioThreads`|Redis IO threads.|**optional**|```2```|-|
|`ioThreadsDoReads`|Redis IO threads.|**optional**|```yes```|-|
|`featureName`|Feature name for generate prefix to environments keys|**optional**|-|-|

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

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/docker-compose
[npm-url]: https://npmjs.org/package/@nestjs-mod/docker-compose
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/docker-compose
[downloads-url]: https://npmjs.org/package/@nestjs-mod/docker-compose
