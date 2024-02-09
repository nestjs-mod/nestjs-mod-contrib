An example you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-prisma-flyway or https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-prisma.

```typescript
import { PACKAGE_JSON_FILE, ProjectUtils, bootstrapNestApplication } from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposePostgreSQL } from '@nestjs-mod/docker-compose';
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
