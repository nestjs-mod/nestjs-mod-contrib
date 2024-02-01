# @nestjs-mod/prisma

Next-generation Node.js and TypeScript ORM for NestJS-mod (preview version only for Postgres)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram bot][telegram-image]][telegram-url]

## Installation

```bash
npm i --save-dev prisma@5.8.1
npm i --save @prisma/client@5.8.1 @nestjs-mod/prisma
```

## Modules

| Link                          | Category | Description                                                                                   |
| ----------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| [PrismaModule](#prismamodule) | core     | Next-generation Node.js and TypeScript ORM for NestJS-mod (preview version only for Postgres) |

## Modules descriptions

### PrismaModule

Next-generation Node.js and TypeScript ORM for NestJS-mod (preview version only for Postgres)

#### Use in NestJS

For add support prisma in NestJS please read https://docs.nestjs.com/recipes/prisma#set-up-prisma

Use with forRoot options.

```typescript
import { InjectPrismaClient, PrismaModule } from '@nestjs-mod/prisma';
import { NestFactory } from '@nestjs/core';
import { randomUUID } from 'crypto';

import { Injectable, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(
    @InjectPrismaClient()
    private readonly prismaService: PrismaClient
  ) {}

  async createUser({ externalUserId }: { externalUserId: string }) {
    return await this.prismaService.prismaUser.create({ data: { externalUserId } });
  }

  async getUsers() {
    return await this.prismaService.prismaUser.findMany();
  }
}

@Module({
  imports: [
    PrismaModule.forRoot({
      staticConfiguration: {
        prismaModule: import(`@prisma/prisma-user-client`),
        addMigrationScripts: true,
      },
    }),
  ],
  providers: [AppService],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const service = app.get<AppService>(AppService);
  const externalUserId = randomUUID();
  await service.createUser({ externalUserId });
  console.log(await service.getUsers()); // output: [{ externalUserId: '568a823e-65ea-46ba-aa57-0194ee67e0f9' }]
}

bootstrap();
```

An example of access to module services with forFeature.

```typescript
import { InjectPrismaClient, PrismaModule } from '@nestjs-mod/prisma';
import { NestFactory } from '@nestjs/core';
import { randomUUID } from 'crypto';

import { Injectable, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FeatureService {
  constructor(
    @InjectPrismaClient()
    private readonly prismaService: PrismaClient
  ) {}

  async createUser({ externalUserId }: { externalUserId: string }) {
    return await this.prismaService.prismaUser.create({ data: { externalUserId } });
  }

  async getUsers() {
    return await this.prismaService.prismaUser.findMany();
  }
}
@Module({
  imports: [
    PrismaModule.forFeature({
      featureModuleName: 'FeatureModule',
    }),
  ],
  providers: [FeatureService],
})
export class FeatureModule {}

@Module({
  imports: [
    PrismaModule.forRoot({
      staticConfiguration: {
        prismaModule: import(`@prisma/prisma-user-client`),
        addMigrationScripts: true,
      },
    }),
    FeatureModule,
  ],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const service = app.get<FeatureService>(FeatureService);
  const externalUserId = randomUUID();
  await service.createUser({ externalUserId });
  console.log(await service.getUsers()); // output: [{ externalUserId: '568a823e-65ea-46ba-aa57-0194ee67e0f9' }]
}

bootstrap();
```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.

#### Use in NestJS-mod

An example of using forRoot with parameters, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-prisma.

For Prisma to work, you must first connect the Docker Compose module and the Docker Compose module to work with the database.

```typescript
import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
  isInfrastructureMode,
} from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposePostgreSQL } from '@nestjs-mod/docker-compose';
import { FakePrismaClient, PRISMA_SCHEMA_FILE, PrismaModule } from '@nestjs-mod/prisma';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { prismaUserFeatureName } from './app/app.constants';
import { AppModule } from './app/app.module';

const globalPrefix = 'api';

bootstrapNestApplication({
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(__dirname, '..', '..', '..', 'apps/example-prisma', PACKAGE_JSON_FILE),
          packageJsonFile: join(__dirname, '..', '..', '..', PACKAGE_JSON_FILE),
          envFile: join(__dirname, '..', '..', '..', '.env'),
        },
      }),
      DefaultNestApplicationInitializer.forRoot(),
      DefaultNestApplicationListener.forRoot({
        staticConfiguration: {
          // When running in infrastructure mode, the backend server does not start.
          mode: isInfrastructureMode() ? 'init' : 'listen',
          preListen: async ({ app }) => {
            if (app) {
              app.enableShutdownHooks();
              app.setGlobalPrefix(globalPrefix);
            }
          },
          postListen: async ({ current }) => {
            if (isInfrastructureMode()) {
              /**
               * When you start the application in infrastructure mode, it should automatically close;
               * if for some reason it does not close, we forcefully close it after 30 seconds.
               */
              setTimeout(() => process.exit(0), 30000);
            }
            Logger.log(
              `🚀 Application is running on: http://${current.staticEnvironments?.hostname ?? 'localhost'}:${
                current.staticEnvironments?.port
              }/${globalPrefix}`
            );
          },
        },
      }),
    ],
    core: [
      PrismaModule.forRoot({
        staticConfiguration: {
          prismaSchemaFile: join(
            __dirname,
            '..',
            '..',
            '..',
            'apps/example-prisma/src/prisma/',
            `${prismaUserFeatureName}-${PRISMA_SCHEMA_FILE}`
          ),
          prismaFeatureName: prismaUserFeatureName,
          prismaModule: isInfrastructureMode()
            ? { PrismaClient: FakePrismaClient }
            : // remove after first run docs:infrastructure
              { PrismaClient: FakePrismaClient },
          // uncomment after first run docs:infrastructure
          // import(`@prisma/prisma-user-client`),
          addMigrationScripts: true,
        },
      }),
    ],
    feature: [AppModule.forRoot()],
    infrastructure: [
      InfrastructureMarkdownReportGenerator.forRoot({
        staticConfiguration: {
          markdownFile: join(__dirname, '..', '..', '..', 'apps/example-prisma', 'INFRASTRUCTURE.MD'),
          skipEmptySettings: true,
        },
      }),
      DockerCompose.forRoot({
        configuration: {
          dockerComposeFileVersion: '3',
          dockerComposeFile: join(__dirname, '..', '..', '..', 'apps/example-prisma', DOCKER_COMPOSE_FILE),
        },
      }),
      DockerComposePostgreSQL.forRoot(),
      DockerComposePostgreSQL.forFeature({
        featureModuleName: prismaUserFeatureName,
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
    "_____prisma_____": "_____prisma_____",
    "prisma:migrate-dev-new:example-prisma": "npm run nx -- run example-prisma:prisma-migrate-dev --create-only --name=new",
    "prisma:migrate-dev:example-prisma": "npm run nx -- run example-prisma:prisma-migrate-dev --create-only",
    "prisma:migrate-deploy:example-prisma": "npm run nx -- run example-prisma:prisma-migrate-deploy",
    "prisma:migrate-deploy": "npm run nx:many -- -t=prisma-migrate-deploy",
    "prisma:pull": "npm run nx:many -- -t=prisma-pull",
    "prisma:generate": "npm run nx:many -- -t=prisma-generate"
  },
  "scriptsComments": {
    "prisma:pull": ["Generating a prisma schema based on a database"],
    "prisma:generate": ["Generation of client prisma schema of all applications and modules"],
    "prisma:migrate-dev:example-prisma": [
      "Alias for create new migration for example-prisma (example: `npm run prisma:migrate-dev:example-prisma --name=new)`"
    ],
    "prisma:migrate-deploy": ["Applying migrations of all applications and modules"],
    "prisma:migrate-dev-new:example-prisma": ["Command to create new empty migration for example-prisma"],
    "prisma:migrate-deploy:example-prisma": ["Applying migrations for example-prisma"]
  }
}
```

Additional commands in the nx application `project.json`

```json
{
  "targets": {
    "prisma-generate": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "./node_modules/.bin/prisma generate --schema=./apps/example-prisma/src/prisma/prisma-user-schema.prisma"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    },
    "prisma-pull": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "./node_modules/.bin/prisma db pull --schema=./apps/example-prisma/src/prisma/prisma-user-schema.prisma"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    },
    "prisma-migrate-dev": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "./node_modules/.bin/prisma migrate dev --schema=./apps/example-prisma/src/prisma/prisma-user-schema.prisma"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    },
    "prisma-migrate-deploy": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "./node_modules/.bin/prisma migrate deploy --schema=./apps/example-prisma/src/prisma/prisma-user-schema.prisma"
        ],
        "parallel": false,
        "envFile": "./.env",
        "color": true
      }
    }
  }
}
```

Example of a prisma schema `schema.prisma`

```prisma
generator client {
  provider   = "prisma-client-js"
  engineType = "binary"
  output     = "../../../../node_modules/@prisma/prisma-user-client"
}

datasource db {
  provider          = "postgres"
  url               = env("PRISMA_PRISMA_USER_DATABASE_URL")
  shadowDatabaseUrl = env("PRISMA_PRISMA_USER_SHADOW_DATABASE_URL")
}

model PrismaUser {
  id             String   @id(map: "PK_PRISMA_USER") @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  externalUserId String   @unique(map: "UQ_PRISMA_USER") @db.Uuid
  createdAt      DateTime @default(now()) @db.Timestamp(6)
  updatedAt      DateTime @default(now()) @db.Timestamp(6)
}

```

Connection string environment variable

```bash
PRISMA_ROOT_DATABASE_URL=postgres://postgres:postgres_password@localhost:5432/postgres?schema=public
PRISMA_PRISMA_USER_DATABASE_URL=postgres://prisma_user:prisma_user_password@localhost:5432/prisma_user?schema=public
PRISMA_PRISMA_USER_SHADOW_DATABASE_URL=postgres://prisma_user:prisma_user_password@localhost:5432/shadow_prisma_user?schema=public
```

For create all needs prisma clients, please run `npm run generate`.

#### Shared providers

`PrismaClientFactoryService`, `PrismaClient`

#### Environments

| Key           | Description                                                                                                                | Sources                                             | Constraints                                      | Default | Value |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------ | ------- | ----- |
| `databaseUrl` | Connection string for database with credentials (example: postgres://feat:feat_password@localhost:5432/feat?schema=public) | `obj['databaseUrl']`, `process.env['DATABASE_URL']` | **isNotEmpty** (databaseUrl should not be empty) | -       | -     |

#### Static configuration

| Key                     | Description                                                                                                                                                                                                                                                                          | Constraints                                       | Default        | Value |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- | -------------- | ----- |
| `defaultLogger`         | Default logger                                                                                                                                                                                                                                                                       | **optional**                                      | -              | -     |
| `prismaModule`          | NodeJS module with Prisma modules                                                                                                                                                                                                                                                    | **isNotEmpty** (prismaModule should not be empty) | -              | -     |
| `logging`               | Logging types (all_queries or long_queries)                                                                                                                                                                                                                                          | **optional**                                      | `long_queries` | -     |
| `maxQueryExecutionTime` | Max query execution time for detect long queries                                                                                                                                                                                                                                     | **optional**                                      | `5000`         | -     |
| `prismaFeatureName`     | Prisma feature name for generate prefix to environments keys (infrastructure)                                                                                                                                                                                                        | **optional**                                      | -              | -     |
| `prismaSchemaFile`      | Schema file for prisma (infrastructure)                                                                                                                                                                                                                                              | **optional**                                      | -              | -     |
| `addMigrationScripts`   | The option specifies whether it is necessary to create scripts to work with database migrations, for those who use third-party applications to create and apply migrations in the database (infrastructure, example: https://flywaydb.org, https://www.npmjs.com/package/db-migrate) | **optional**                                      | `true`         | -     |
| `customSchemaContent`   | Unsafe string custom content for add to end of prisma schema file (infrastructure)                                                                                                                                                                                                   | **optional**                                      | -              | -     |

[Back to Top](#modules)

## Links

- https://github.com/nestjs-mod/nestjs-mod - A collection of utilities for unifying NestJS applications and modules
- https://github.com/nestjs-mod/nestjs-mod-contrib - Contrib repository for the NestJS-mod
- https://github.com/nestjs-mod/nestjs-mod-example - Example application built with [@nestjs-mod/schematics](https://github.com/nestjs-mod/nestjs-mod/tree/master/libs/schematics)
- https://github.com/nestjs-mod/nestjs-mod/blob/master/apps/example-basic/INFRASTRUCTURE.MD - A simple example of infrastructure documentation.
- https://github.com/nestjs-mod/nestjs-mod-contrib/blob/master/apps/example-prisma/INFRASTRUCTURE.MD - An extended example of infrastructure documentation with a docker-compose file and a data base.
- https://dev.to/endykaufman/collection-of-nestjs-mod-utilities-for-unifying-applications-and-modules-on-nestjs-5256 - Article about the project NestJS-mod

## License

MIT

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/prisma
[npm-url]: https://npmjs.org/package/@nestjs-mod/prisma
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/prisma
[downloads-url]: https://npmjs.org/package/@nestjs-mod/prisma
