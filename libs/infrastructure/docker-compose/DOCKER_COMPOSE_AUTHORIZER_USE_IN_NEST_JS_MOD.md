An example of using Maildev, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-authorizer/INFRASTRUCTURE.MD.

```typescript
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { AuthorizerModule } from '@nestjs-mod/authorizer';
import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
  isInfrastructureMode,
} from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposeAuthorizer, DockerComposePostgreSQL } from '@nestjs-mod/docker-compose';
import { join } from 'path';
import { adminSecret } from './app/app.constants';
import { AppModule } from './app/app.module';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-authorizer');

bootstrapNestApplication({
  globalConfigurationOptions: { debug: true },
  globalEnvironmentsOptions: { debug: true },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(__dirname, '..', '..', '..', 'apps/example-authorizer', PACKAGE_JSON_FILE),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, 'apps', 'example-authorizer', '.env'),
        },
      }),
      DefaultNestApplicationInitializer.forRoot(),
      DefaultNestApplicationListener.forRoot({
        staticConfiguration: {
          // When running in infrastructure mode, the backend server does not start.
          mode: isInfrastructureMode() ? 'silent' : 'listen',
        },
      }),
    ],
    feature: [
      AuthorizerModule.forRootAsync({
        environments: {
          authorizerURL: 'http://localhost:8080',
          redirectURL: 'http://localhost:3000'
        }
      }),
      AppModule.forRoot()
    ],
    infrastructure: [
      InfrastructureMarkdownReportGenerator.forRoot({
        staticConfiguration: {
          markdownFile: join(appFolder, 'INFRASTRUCTURE.MD'),
          skipEmptySettings: true,
          style: 'pretty',
        },
      }),
      DockerCompose.forRoot({
        configuration: {
          dockerComposeFileVersion: '3',
          dockerComposeFile: join(appFolder, DOCKER_COMPOSE_FILE),
        },
      }),
      DockerComposePostgreSQL.forRoot({
        staticEnvironments: {
          rootDatabaseUrl: 'postgres://postgres:postgres_password@localhost:5432/postgres?schema=public'
        }
      }),
      DockerComposeAuthorizer.forRoot({
        staticEnvironments: {
          databaseType: 'postgres',
          databaseUrl: 'postgres://postgres:postgres_password@example-authorizer-postgre-sql:5432/postgres',
          databaseName: 'authorizer',
          adminSecret
        }
      }),
    ],
  },
});

```

After connecting the module to the application and `npm run manual:prepare` and starting generation of documentation through `npm run docs:infrastructure:example-authorizer`, you will have new files and scripts to run.

New scripts mostly `package.json`

Add database options to docker-compose file for application `docker-compose.yml` with real credenionals and add it to `.gitignore` file

```yaml
# Do not modify this file, it is generated using the DockerCompose module included with NestJS-mod.
version: "3"
services:
  example-authorizer-postgre-sql:
    image: "bitnami/postgresql:15.5.0"
    container_name: "example-authorizer-postgre-sql"
    volumes:
      - "example-authorizer-postgre-sql-volume:/bitnami/postgresql"
    ports:
      - "5432:5432"
    networks:
      - "example-authorizer-network"
    healthcheck:
      test:
        - "CMD-SHELL"
        - "pg_isready -U postgres"
      interval: "5s"
      timeout: "5s"
      retries: 5
    tty: true
    restart: "always"
    environment:
      POSTGRESQL_USERNAME: "${EXAMPLE_AUTHORIZER_POSTGRE_SQL_POSTGRESQL_USERNAME}"
      POSTGRESQL_PASSWORD: "${EXAMPLE_AUTHORIZER_POSTGRE_SQL_POSTGRESQL_PASSWORD}"
      POSTGRESQL_DATABASE: "${EXAMPLE_AUTHORIZER_POSTGRE_SQL_POSTGRESQL_DATABASE}"
  example-authorizer-authorizer:
    image: "lakhansamani/authorizer:1.3.8"
    container_name: "example-authorizer-authorizer"
    ports:
      - "8080:8080"
    networks:
      - "example-authorizer-network"
    environment:
      DATABASE_TYPE: "${EXAMPLE_AUTHORIZER_AUTHORIZER_DATABASE_TYPE}"
      DATABASE_URL: "${EXAMPLE_AUTHORIZER_AUTHORIZER_DATABASE_URL}"
      DATABASE_NAME: "${EXAMPLE_AUTHORIZER_AUTHORIZER_DATABASE_NAME}"
      ADMIN_SECRET: "${EXAMPLE_AUTHORIZER_AUTHORIZER_ADMIN_SECRET}"
      PORT: "${EXAMPLE_AUTHORIZER_AUTHORIZER_PORT}"
      COOKIE_NAME: "${EXAMPLE_AUTHORIZER_AUTHORIZER_COOKIE_NAME}"
      DISABLE_PLAYGROUND: "${EXAMPLE_AUTHORIZER_AUTHORIZER_DISABLE_PLAYGROUND}"
      ACCESS_TOKEN_EXPIRY_TIME: "${EXAMPLE_AUTHORIZER_AUTHORIZER_ACCESS_TOKEN_EXPIRY_TIME}"
      IMAGE: "${EXAMPLE_AUTHORIZER_AUTHORIZER_IMAGE}"
      EXTERNAL_CLIENT_PORT: "${EXAMPLE_AUTHORIZER_AUTHORIZER_EXTERNAL_CLIENT_PORT}"
      ENV: "${EXAMPLE_AUTHORIZER_AUTHORIZER_ENV}"
      RESET_PASSWORD_URL: "${EXAMPLE_AUTHORIZER_AUTHORIZER_RESET_PASSWORD_URL}"
      ROLES: "${EXAMPLE_AUTHORIZER_AUTHORIZER_ROLES}"
      DEFAULT_ROLES: "${EXAMPLE_AUTHORIZER_AUTHORIZER_DEFAULT_ROLES}"
      JWT_ROLE_CLAIM: "${EXAMPLE_AUTHORIZER_AUTHORIZER_JWT_ROLE_CLAIM}"
      ORGANIZATION_NAME: "${EXAMPLE_AUTHORIZER_AUTHORIZER_ORGANIZATION_NAME}"
      ORGANIZATION_LOGO: "${EXAMPLE_AUTHORIZER_AUTHORIZER_ORGANIZATION_LOGO}"
      COUCHBASE_BUCKET: "${EXAMPLE_AUTHORIZER_AUTHORIZER_COUCHBASE_BUCKET}"
      COUCHBASE_BUCKET_RAM_QUOTA: "${EXAMPLE_AUTHORIZER_AUTHORIZER_COUCHBASE_BUCKET_RAM_QUOTA}"
      COUCHBASE_SCOPE: "${EXAMPLE_AUTHORIZER_AUTHORIZER_COUCHBASE_SCOPE}"
    tty: true
    restart: "always"
    depends_on: {}
networks:
  example-authorizer-network:
    driver: "bridge"
volumes:
  example-authorizer-postgre-sql-volume:
    name: "example-authorizer-postgre-sql-volume"
```

New environment variable

```bash
# example-authorizer-postgre-sql (generated)
EXAMPLE_AUTHORIZER_POSTGRE_SQL_POSTGRESQL_USERNAME=postgres
EXAMPLE_AUTHORIZER_POSTGRE_SQL_POSTGRESQL_PASSWORD=postgres_password
EXAMPLE_AUTHORIZER_POSTGRE_SQL_POSTGRESQL_DATABASE=postgres
# example-authorizer-authorizer (generated)
EXAMPLE_AUTHORIZER_AUTHORIZER_DATABASE_TYPE=postgres
EXAMPLE_AUTHORIZER_AUTHORIZER_DATABASE_URL=postgres://postgres:postgres_password@example-authorizer-postgre-sql:5432/postgres
EXAMPLE_AUTHORIZER_AUTHORIZER_DATABASE_NAME=authorizer
EXAMPLE_AUTHORIZER_AUTHORIZER_ADMIN_SECRET=adminSecret
EXAMPLE_AUTHORIZER_AUTHORIZER_PORT=8080
EXAMPLE_AUTHORIZER_AUTHORIZER_COOKIE_NAME=authorizer
EXAMPLE_AUTHORIZER_AUTHORIZER_DISABLE_PLAYGROUND=true
EXAMPLE_AUTHORIZER_AUTHORIZER_ACCESS_TOKEN_EXPIRY_TIME=30m
EXAMPLE_AUTHORIZER_AUTHORIZER_IMAGE=
EXAMPLE_AUTHORIZER_AUTHORIZER_EXTERNAL_CLIENT_PORT=8080
EXAMPLE_AUTHORIZER_AUTHORIZER_ENV=
EXAMPLE_AUTHORIZER_AUTHORIZER_RESET_PASSWORD_URL=/reset-password
EXAMPLE_AUTHORIZER_AUTHORIZER_ROLES=user,admin
EXAMPLE_AUTHORIZER_AUTHORIZER_DEFAULT_ROLES=user
EXAMPLE_AUTHORIZER_AUTHORIZER_JWT_ROLE_CLAIM=role
EXAMPLE_AUTHORIZER_AUTHORIZER_ORGANIZATION_NAME=Authorizer
EXAMPLE_AUTHORIZER_AUTHORIZER_ORGANIZATION_LOGO='Authorizer Logo'
EXAMPLE_AUTHORIZER_AUTHORIZER_COUCHBASE_BUCKET=authorizer
EXAMPLE_AUTHORIZER_AUTHORIZER_COUCHBASE_BUCKET_RAM_QUOTA=1000
EXAMPLE_AUTHORIZER_AUTHORIZER_COUCHBASE_SCOPE=_default
# EXAMPLE_AUTHORIZER_AUTHORIZER_DATABASE_URL (generated)
LOCALHOST_EXAMPLE_AUTHORIZER_AUTHORIZER_DATABASE_URL=postgres://postgres:postgres_password@localhost:5432/postgres
```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.
