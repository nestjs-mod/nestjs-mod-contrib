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
