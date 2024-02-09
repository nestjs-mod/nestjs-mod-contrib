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
import { join } from 'path';
import { userFeatureName } from './app/app.constants';
import { AppModule } from './app/app.module';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-prisma');

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
      DefaultNestApplicationInitializer.forRoot(),
      DefaultNestApplicationListener.forRoot({
        staticConfiguration: {
          // When running in infrastructure mode, the backend server does not start.
          mode: isInfrastructureMode() ? 'init' : 'listen',
        },
      }),
    ],
    core: [
      PrismaModule.forRoot({
        staticConfiguration: {
          prismaSchemaFile: join(appFolder, 'src', 'prisma', `${userFeatureName}-${PRISMA_SCHEMA_FILE}`),
          prismaFeatureName: userFeatureName,
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
          markdownFile: join(appFolder, 'INFRASTRUCTURE.MD'),
          skipEmptySettings: true,
        },
      }),
      DockerCompose.forRoot({
        configuration: {
          dockerComposeFileVersion: '3',
          dockerComposeFile: join(appFolder, DOCKER_COMPOSE_FILE),
        },
      }),
      DockerComposePostgreSQL.forRoot(),
      DockerComposePostgreSQL.forFeature({
        featureModuleName: userFeatureName,
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

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.
