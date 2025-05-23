
# @nestjs-mod/docker-compose

Docker Compose is a tool for defining and running multi-container applications. It is the key to unlocking a streamlined and efficient development and deployment experience. (Generator docker-compose.yml for https://docs.docker.com/compose)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save @nestjs-mod/docker-compose
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [DockerCompose](#dockercompose) | infrastructure | Docker Compose is a tool for defining and running multi-container applications. It is the key to unlocking a streamlined and efficient development and deployment experience. (Generator docker-compose.yml for https://docs.docker.com/compose) |
| [DockerComposeAuthorizer](#dockercomposeauthorizer) | infrastructure | Authorizer is an open-source authentication and authorization solution for your applications. Bring your database and have complete control over the user information. You can self-host authorizer instances and connect to supported databases. (Generator for https://authorizer.dev in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose) |
| [DockerComposeMaildev](#dockercomposemaildev) | infrastructure | MailDev is a simple way to test your projects generated email during development, with an easy to use web interface that runs on your machine. (Generator for maildev in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose) |
| [DockerComposeMinio](#dockercomposeminio) | infrastructure | MinIO is a high-performance, S3 compatible object storage. (Generator for minio in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose) |
| [DockerComposeNats](#dockercomposenats) | infrastructure | NATS is an open source, lightweight and high-performance messaging system. It is ideal for distributed systems and supports modern cloud architectures and pub-sub, request-reply and queuing models. (Generator for nats in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose) |
| [DockerComposeNginx](#dockercomposenginx) | infrastructure | Nginx is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. (Generator for nginx in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose) |
| [DockerComposePostgreSQL](#dockercomposepostgresql) | infrastructure | PostgreSQL (Postgres) is an open source object-relational database known for reliability and data integrity. ACID-compliant, it supports foreign keys, joins, views, triggers and stored procedures. (Generator for databases in docker-compose.yml for https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/infrastructure/docker-compose) |
| [DockerComposeRedis](#dockercomposeredis) | infrastructure | The open-source, in-memory data store used by millions of developers as a cache, vector database, document database, streaming engine, and message broker. (Generator for redis in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose) |
| [DockerComposeSso](#dockercomposesso) | infrastructure | Single Sign-On on NestJS and Angular with webhooks and social authorization. (Generator for https://github.com/nestjs-mod/nestjs-mod-sso in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose) |


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

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-prisma-flyway');

bootstrapNestApplication({
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(
            appFolder
            PACKAGE_JSON_FILE
          ),
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
    "docker-compose:start:example-prisma-flyway": "export COMPOSE_INTERACTIVE_NO_CLI=1 && docker compose -f ./apps/example-prisma-flyway/docker-compose.yml --compatibility up -d",
    "docker-compose:stop:example-prisma-flyway": "export COMPOSE_INTERACTIVE_NO_CLI=1 && docker compose -f ./apps/example-prisma-flyway/docker-compose.yml down"
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
|`dockerComposeFile`|Main file for docker-compose, the Compose specification establishes a standard for the definition of multi-container platform-agnostic applications|**isNotEmpty** (dockerComposeFile should not be empty)|-|-|
|`prodDockerComposeFile`|Main file for prod docker-compose, the Compose specification establishes a standard for the definition of multi-container platform-agnostic applications|**optional**|-|-|
|`exampleDockerComposeFile`|Example file for docker-compose, the Compose specification establishes a standard for the definition of multi-container platform-agnostic applications|**optional**|-|-|
|`prodDockerComposeEnvFile`|Dotenv file for prod docker-compose file|**optional**|-|-|
|`dockerComposeFileVersion`|Docker-compose file version. @see https://docs.docker.com/compose/compose-file/compose-versioning|**isNotEmpty** (dockerComposeFileVersion should not be empty)|```3```|-|
|`beforeSaveExampleDockerComposeFile`|Before save file for example docker-compose|**optional**|-|-|
|`beforeSaveDockerComposeFile`|Before save main file for docker-compose|**optional**|-|-|
|`beforeSaveProdDockerComposeFile`|Before save main file for prod docker-compose|**optional**|-|-|
|`beforeSaveDockerComposeEnvFile`|Method before save dotenv file for docker-compose file|**optional**|-|-|
|`beforeSaveProdDockerComposeEnvFile`|Method before save dotenv file for prod docker-compose file|**optional**|-|-|

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
##### Feature module name: AUTHORIZER


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`version`|The top-level version property is defined by the Compose Specification for backward compatibility. It is only informative. @see https://github.com/compose-spec/compose-spec/blob/master/04-version-and-name.md|**optional**|-|-|
|`services`|A service is an abstract definition of a computing resource within an application which can be scaled or replaced independently from other components. @see https://github.com/compose-spec/compose-spec/blob/master/05-services.md|**optional**|-|```{"authorizer":{"image":"lakhansamani/authorizer:1.3.8","container_name":"authorizer","ports":["8080:8080"],"networks":["default-network"],"environment":{"DATABASE_NAME":"authorizer","PORT":8080,"COOKIE_NAME":"authorizer","DISABLE_PLAYGROUND":true,"ACCESS_TOKEN_EXPIRY_TIME":"30m","IMAGE":"lakhansamani/authorizer:1.3.8","EXTERNAL_CLIENT_PORT":8080,"ENV":"production","RESET_PASSWORD_URL":"/reset-password","ROLES":"user,admin","DEFAULT_ROLES":"user","JWT_ROLE_CLAIM":"role","ORGANIZATION_NAME":"Authorizer","ORGANIZATION_LOGO":"Authorizer Logo","COUCHBASE_BUCKET":"authorizer","COUCHBASE_BUCKET_RAM_QUOTA":1000,"COUCHBASE_SCOPE":"_default"},"keysOfEnvironmentsWithStaticValue":["featureName","image","networks","dependsOnServiceNames","env"],"tty":true,"restart":"always","depends_on":{}}}```|
|`networks`|Networks are the layer that allow services to communicate with each other. @see https://github.com/compose-spec/compose-spec/blob/master/06-networks.md|**optional**|-|```{"default-network":{"driver":"bridge"}}```|
|`volumes`|Volumes are persistent data stores implemented by the container engine. @see https://github.com/compose-spec/compose-spec/blob/master/07-volumes.md|**optional**|-|-|
|`secrets`|Secrets are a flavor of Configs focusing on sensitive data, with specific constraint for this usage. @see https://github.com/compose-spec/compose-spec/blob/master/09-secrets.md|**optional**|-|-|
|`configs`|Configs allow services to adapt their behaviour without the need to rebuild a Docker image. @see https://github.com/compose-spec/compose-spec/blob/master/08-configs.md|**optional**|-|-|

#### Modules that use feature configuration
##### Feature module name: POSTGRE_SQL


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`version`|The top-level version property is defined by the Compose Specification for backward compatibility. It is only informative. @see https://github.com/compose-spec/compose-spec/blob/master/04-version-and-name.md|**optional**|-|-|
|`services`|A service is an abstract definition of a computing resource within an application which can be scaled or replaced independently from other components. @see https://github.com/compose-spec/compose-spec/blob/master/05-services.md|**optional**|-|```{"postgre-sql":{"image":"bitnami/postgresql:15.5.0","container_name":"postgre-sql","volumes":["postgre-sql-volume:/bitnami/postgresql"],"ports":["5432:5432"],"networks":["default-network"],"healthcheck":{"test":["CMD-SHELL","pg_isready -U postgres"],"interval":"5s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}```|
|`networks`|Networks are the layer that allow services to communicate with each other. @see https://github.com/compose-spec/compose-spec/blob/master/06-networks.md|**optional**|-|```{"default-network":{"driver":"bridge"}}```|
|`volumes`|Volumes are persistent data stores implemented by the container engine. @see https://github.com/compose-spec/compose-spec/blob/master/07-volumes.md|**optional**|-|```{"postgre-sql-volume":{"name":"postgre-sql-volume"}}```|
|`secrets`|Secrets are a flavor of Configs focusing on sensitive data, with specific constraint for this usage. @see https://github.com/compose-spec/compose-spec/blob/master/09-secrets.md|**optional**|-|-|
|`configs`|Configs allow services to adapt their behaviour without the need to rebuild a Docker image. @see https://github.com/compose-spec/compose-spec/blob/master/08-configs.md|**optional**|-|-|

#### Modules that use feature configuration
##### Feature module name: MAILDEV


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`version`|The top-level version property is defined by the Compose Specification for backward compatibility. It is only informative. @see https://github.com/compose-spec/compose-spec/blob/master/04-version-and-name.md|**optional**|-|-|
|`services`|A service is an abstract definition of a computing resource within an application which can be scaled or replaced independently from other components. @see https://github.com/compose-spec/compose-spec/blob/master/05-services.md|**optional**|-|```{"maildev":{"image":"maildev/maildev:2.2.1","container_name":"maildev","ports":["1025:1025","1080:1080"],"networks":["default-network"],"environment":{"MAILDEV_SMTP_PORT":1025,"MAILDEV_WEB_PORT":1080},"keysOfEnvironmentsWithStaticValue":["featureName","image","networks","smtpPort","webPort"],"healthcheck":{"test":"wget -O - http://localhost:${MAILDEV_WEB_PORT}${MAILDEV_BASE_PATHNAME}/healthz || exit 1","interval":"10s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}```|
|`networks`|Networks are the layer that allow services to communicate with each other. @see https://github.com/compose-spec/compose-spec/blob/master/06-networks.md|**optional**|-|```{"default-network":{"driver":"bridge"}}```|
|`volumes`|Volumes are persistent data stores implemented by the container engine. @see https://github.com/compose-spec/compose-spec/blob/master/07-volumes.md|**optional**|-|-|
|`secrets`|Secrets are a flavor of Configs focusing on sensitive data, with specific constraint for this usage. @see https://github.com/compose-spec/compose-spec/blob/master/09-secrets.md|**optional**|-|-|
|`configs`|Configs allow services to adapt their behaviour without the need to rebuild a Docker image. @see https://github.com/compose-spec/compose-spec/blob/master/08-configs.md|**optional**|-|-|

#### Modules that use feature configuration
##### Feature module name: MINIO


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`version`|The top-level version property is defined by the Compose Specification for backward compatibility. It is only informative. @see https://github.com/compose-spec/compose-spec/blob/master/04-version-and-name.md|**optional**|-|-|
|`services`|A service is an abstract definition of a computing resource within an application which can be scaled or replaced independently from other components. @see https://github.com/compose-spec/compose-spec/blob/master/05-services.md|**optional**|-|```{"minio":{"image":"bitnami/minio:2024.2.9","container_name":"minio","volumes":["minio-volume:/bitnami/minio/data"],"ports":["9000:9000","9001:9001"],"networks":["default-network"],"environment":{},"keysOfEnvironmentsWithStaticValue":["featureName","image","networks","nginxBucketsLocations","nginxConfigContent","nginxConfigFolder","nginxLogsFolder"],"healthcheck":{"test":["CMD-SHELL","mc","ready","local"],"interval":"5s","timeout":"5s","retries":5},"tty":true,"restart":"always"}}```|
|`networks`|Networks are the layer that allow services to communicate with each other. @see https://github.com/compose-spec/compose-spec/blob/master/06-networks.md|**optional**|-|```{"default-network":{"driver":"bridge"}}```|
|`volumes`|Volumes are persistent data stores implemented by the container engine. @see https://github.com/compose-spec/compose-spec/blob/master/07-volumes.md|**optional**|-|```{"minio-volume":{"name":"minio-volume"}}```|
|`secrets`|Secrets are a flavor of Configs focusing on sensitive data, with specific constraint for this usage. @see https://github.com/compose-spec/compose-spec/blob/master/09-secrets.md|**optional**|-|-|
|`configs`|Configs allow services to adapt their behaviour without the need to rebuild a Docker image. @see https://github.com/compose-spec/compose-spec/blob/master/08-configs.md|**optional**|-|-|

#### Modules that use feature configuration
##### Feature module name: NGINX


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`version`|The top-level version property is defined by the Compose Specification for backward compatibility. It is only informative. @see https://github.com/compose-spec/compose-spec/blob/master/04-version-and-name.md|**optional**|-|-|
|`services`|A service is an abstract definition of a computing resource within an application which can be scaled or replaced independently from other components. @see https://github.com/compose-spec/compose-spec/blob/master/05-services.md|**optional**|-|```{"nginx":{"image":"nginx:alpine","container_name":"nginx","volumes":[],"ports":[],"networks":["default-network"],"tty":true,"restart":"always","depends_on":{}}}```|
|`networks`|Networks are the layer that allow services to communicate with each other. @see https://github.com/compose-spec/compose-spec/blob/master/06-networks.md|**optional**|-|```{"default-network":{"driver":"bridge"}}```|
|`volumes`|Volumes are persistent data stores implemented by the container engine. @see https://github.com/compose-spec/compose-spec/blob/master/07-volumes.md|**optional**|-|-|
|`secrets`|Secrets are a flavor of Configs focusing on sensitive data, with specific constraint for this usage. @see https://github.com/compose-spec/compose-spec/blob/master/09-secrets.md|**optional**|-|-|
|`configs`|Configs allow services to adapt their behaviour without the need to rebuild a Docker image. @see https://github.com/compose-spec/compose-spec/blob/master/08-configs.md|**optional**|-|-|

#### Modules that use feature configuration
##### Feature module name: NATS


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`version`|The top-level version property is defined by the Compose Specification for backward compatibility. It is only informative. @see https://github.com/compose-spec/compose-spec/blob/master/04-version-and-name.md|**optional**|-|-|
|`services`|A service is an abstract definition of a computing resource within an application which can be scaled or replaced independently from other components. @see https://github.com/compose-spec/compose-spec/blob/master/05-services.md|**optional**|-|```{"nats":{"image":"bitnami/nats:2.10.5","container_name":"nats","volumes":["nats-volume:/bitnami/nats/data"],"ports":["8222:8222","4222:4222"],"networks":["default-network"],"environment":{"NATS_EXTRA_ARGS":"-js"},"keysOfEnvironmentsWithStaticValue":["featureName","image","extraArgs","networks"],"tty":true,"restart":"always"}}```|
|`networks`|Networks are the layer that allow services to communicate with each other. @see https://github.com/compose-spec/compose-spec/blob/master/06-networks.md|**optional**|-|```{"default-network":{"driver":"bridge"}}```|
|`volumes`|Volumes are persistent data stores implemented by the container engine. @see https://github.com/compose-spec/compose-spec/blob/master/07-volumes.md|**optional**|-|```{"nats-volume":{"name":"nats-volume"}}```|
|`secrets`|Secrets are a flavor of Configs focusing on sensitive data, with specific constraint for this usage. @see https://github.com/compose-spec/compose-spec/blob/master/09-secrets.md|**optional**|-|-|
|`configs`|Configs allow services to adapt their behaviour without the need to rebuild a Docker image. @see https://github.com/compose-spec/compose-spec/blob/master/08-configs.md|**optional**|-|-|

[Back to Top](#modules)

---
### DockerComposeAuthorizer
Authorizer is an open-source authentication and authorization solution for your applications. Bring your database and have complete control over the user information. You can self-host authorizer instances and connect to supported databases. (Generator for https://authorizer.dev in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Use in NestJS-mod
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


#### Static environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`adminSecret`|Super admin secret used to access the master data|`obj['adminSecret']`, `process.env['ADMIN_SECRET']`|**isNotEmpty** (adminSecret should not be empty)|-|-|
|`databaseType`|Which database you are using. Supported database types are postgres, mysql, planetscale, sqlite, sqlserver, mongodb, arangodb, yugabyte, mariadb, cassandradb, scylladb, couchbase, dynamodb|`obj['databaseType']`, `process.env['DATABASE_TYPE']`|**isNotEmpty** (databaseType should not be empty)|-|-|
|`databaseUrl`|Database connection string. In case of cluster url eg. for cassandra db, you can use comma separated IPs|`obj['databaseUrl']`, `process.env['DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|-|-|
|`databaseName`|Name of database to connect to. This is useful in case of arangodb and mongodb. If not set, default value will be used|`obj['databaseName']`, `process.env['DATABASE_NAME']`|**optional**|```authorizer```|```authorizer```|
|`redisUrl`|Redis URL where sessions can be persisted	false	sessions will be stored in memory|`obj['redisUrl']`, `process.env['REDIS_URL']`|**optional**|-|-|
|`databasePort`|Port on which database connection should be made. This is used when DATABASE_URL is not mentioned. At the moment supported by cassandradb|`obj['databasePort']`, `process.env['DATABASE_PORT']`|**optional**|-|-|
|`databaseHost`|Host/IP on which database connection should be made. This is used when DATABASE_URL is not mentioned. At the moment supported by cassandradb type|`obj['databaseHost']`, `process.env['DATABASE_HOST']`|**optional**|-|-|
|`databaseUsername`|Username for the database access with permission to create tables and records. At the moment supported by cassandradb, scylladb type|`obj['databaseUsername']`, `process.env['DATABASE_USERNAME']`|**optional**|-|-|
|`databasePassword`|Password for the database access with permission to create tables and records. At the moment supported by cassandradb, scylladb type|`obj['databasePassword']`, `process.env['DATABASE_PASSWORD']`|**optional**|-|-|
|`databaseCert`|Base64 encoded certificate string used to make SSL connection. At the moment supported by cassandradb,scylladb type|`obj['databaseCert']`, `process.env['DATABASE_CERT']`|**optional**|-|-|
|`databaseCertKey`|Base64 encoded key string used to make SSL connection. At the moment supported by cassandradb,scylladb type|`obj['databaseCertKey']`, `process.env['DATABASE_CERT_KEY']`|**optional**|-|-|
|`databaseCaCert`|Base64 encoded CA certificate string used to make SSL connection. At the moment supported by cassandradb, scylladb type|`obj['databaseCaCert']`, `process.env['DATABASE_CA_CERT']`|**optional**|-|-|
|`port`|Port on which server should be running|`obj['port']`, `process.env['PORT']`|**optional**|```8080```|```8080```|
|`authorizerUrl`|Domain name of the server, eg https://authorizer.herokuapp.com|`obj['authorizerUrl']`, `process.env['AUTHORIZER_URL']`|**optional**|-|-|
|`cookieName`|Name of cookie to be set by server|`obj['cookieName']`, `process.env['COOKIE_NAME']`|**optional**|```authorizer```|```authorizer```|
|`smtpHost`|SMTP host is used to send email verification emails and forgot password emails	false	If not set email sending can fail|`obj['smtpHost']`, `process.env['SMTP_HOST']`|**optional**|-|-|
|`smtpPort`|SMTP Port is used along with SMTP host|`obj['smtpPort']`, `process.env['SMTP_PORT']`|**optional**|-|-|
|`smtpUsername`|Username for your smtp provider|`obj['smtpUsername']`, `process.env['SMTP_USERNAME']`|**optional**|-|-|
|`smtpPassword`|Password for your smt provider|`obj['smtpPassword']`, `process.env['SMTP_PASSWORD']`|**optional**|-|-|
|`senderEmail`|Email to be used in From section while sending emails|`obj['senderEmail']`, `process.env['SENDER_EMAIL']`|**optional**|-|-|
|`senderName`|Email sender name that is displayed in the inbox instead of just showing the email address|`obj['senderName']`, `process.env['SENDER_NAME']`|**optional**|-|-|
|`disablePlayground`|To disable playground|`obj['disablePlayground']`, `process.env['DISABLE_PLAYGROUND']`|**optional**|```true```|```true```|
|`accessTokenExpiryTime`|Time interval for how long access token will be expired in 1h15m15s format|`obj['accessTokenExpiryTime']`, `process.env['ACCESS_TOKEN_EXPIRY_TIME']`|**optional**|```30m```|```30m```|
|`awsAccessKeyId`|AWS access key used for connecting to dynamodb. Make sure access credentials has rights for dynamodb. Used with DATABASE_TYPE=dynamodb|`obj['awsAccessKeyId']`, `process.env['AWS_ACCESS_KEY_ID']`|**optional**|-|-|
|`awsSecretAccessKey`|AWS secret access key used for connecting to dynamodb. Make sure access credentials has rights for dynamodb. Used with DATABASE_TYPE=dynamodb|`obj['awsSecretAccessKey']`, `process.env['AWS_SECRET_ACCESS_KEY']`|**optional**|-|-|
|`googleClientId`|OAuth Google login client id|`obj['googleClientId']`, `process.env['GOOGLE_CLIENT_ID']`|**optional**|-|-|
|`googleClientSecret`|OAuth Google login client secret|`obj['googleClientSecret']`, `process.env['GOOGLE_CLIENT_SECRET']`|**optional**|-|-|
|`githubClientId`|OAuth Github login client id|`obj['githubClientId']`, `process.env['GITHUB_CLIENT_ID']`|**optional**|-|-|
|`githubClientSecret`|OAuth Github login client secret|`obj['githubClientSecret']`, `process.env['GITHUB_CLIENT_SECRET']`|**optional**|-|-|
|`facebookClientId`|OAuth Facebook login client id|`obj['facebookClientId']`, `process.env['FACEBOOK_CLIENT_ID']`|**optional**|-|-|
|`facebookClientSecret`|OAuth Facebook login client secret|`obj['facebookClientSecret']`, `process.env['FACEBOOK_CLIENT_SECRET']`|**optional**|-|-|
|`linkedinClientId`|OAuth LinkedIn login client id|`obj['linkedinClientId']`, `process.env['LINKEDIN_CLIENT_ID']`|**optional**|-|-|
|`linkedinClientSecret`|OAuth LinkedIn login client secret|`obj['linkedinClientSecret']`, `process.env['LINKEDIN_CLIENT_SECRET']`|**optional**|-|-|
|`appleClientId`|OAuth Apple login client id|`obj['appleClientId']`, `process.env['APPLE_CLIENT_ID']`|**optional**|-|-|
|`appleClientSecret`|OAuth Apple login client secret|`obj['appleClientSecret']`, `process.env['APPLE_CLIENT_SECRET']`|**optional**|-|-|
|`twitterClientId`|OAuth Twitter login client id|`obj['twitterClientId']`, `process.env['TWITTER_CLIENT_ID']`|**optional**|-|-|
|`twitterClientSecret`|OAuth Twitter login client secret|`obj['twitterClientSecret']`, `process.env['TWITTER_CLIENT_SECRET']`|**optional**|-|-|
|`microsoftClientId`|OAuth Microsoft login client id|`obj['microsoftClientId']`, `process.env['MICROSOFT_CLIENT_ID']`|**optional**|-|-|
|`microsoftClientSecret`|OAuth Microsoft login client secret|`obj['microsoftClientSecret']`, `process.env['MICROSOFT_CLIENT_SECRET']`|**optional**|-|-|
|`microsoftActiveDirectoryTenantId`|Microsoft Active Directory Tenant ID obtained from azure portal|`obj['microsoftActiveDirectoryTenantId']`, `process.env['MICROSOFT_ACTIVE_DIRECTORY_TENANT_ID']`|**optional**|-|-|
|`smtpLocalName`|-|`obj['smtpLocalName']`, `process.env['SMTP_LOCAL_NAME']`|**optional**|-|-|
|`jwtSecret`|-|`obj['jwtSecret']`, `process.env['JWT_SECRET']`|**optional**|-|-|
|`jwtPrivateKey`|-|`obj['jwtPrivateKey']`, `process.env['JWT_PRIVATE_KEY']`|**optional**|-|-|
|`jwtPublicKey`|-|`obj['jwtPublicKey']`, `process.env['JWT_PUBLIC_KEY']`|**optional**|-|-|
|`appUrl`|-|`obj['appUrl']`, `process.env['APP_URL']`|**optional**|-|-|
|`discordClientId`|-|`obj['discordClientId']`, `process.env['DISCORD_CLIENT_ID']`|**optional**|-|-|
|`discordClientSecret`|-|`obj['discordClientSecret']`, `process.env['DISCORD_CLIENT_SECRET']`|**optional**|-|-|
|`twitchClientId`|-|`obj['twitchClientId']`, `process.env['TWITCH_CLIENT_ID']`|**optional**|-|-|
|`twitchClientSecret`|-|`obj['twitchClientSecret']`, `process.env['TWITCH_CLIENT_SECRET']`|**optional**|-|-|
|`clientId`|-|`obj['clientId']`, `process.env['CLIENT_ID']`|**optional**|-|-|
|`clientSecret`|-|`obj['clientSecret']`, `process.env['CLIENT_SECRET']`|**optional**|-|-|
|`encryptionKey`|-|`obj['encryptionKey']`, `process.env['ENCRYPTION_KEY']`|**optional**|-|-|
|`isProd`|-|`obj['isProd']`, `process.env['IS_PROD']`|**optional**|-|-|
|`allowedOrigins`|-|`obj['allowedOrigins']`, `process.env['ALLOWED_ORIGINS']`|**optional**|-|-|
|`twilioApiKey`|-|`obj['twilioApiKey']`, `process.env['TWILIO_API_KEY']`|**optional**|-|-|
|`twilioApiSecret`|-|`obj['twilioApiSecret']`, `process.env['TWILIO_API_SECRET']`|**optional**|-|-|
|`twilioAccountSid`|-|`obj['twilioAccountSid']`, `process.env['TWILIO_ACCOUNT_SID']`|**optional**|-|-|
|`twilioSender`|-|`obj['twilioSender']`, `process.env['TWILIO_SENDER']`|**optional**|-|-|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`image`|Docker image name|**optional**|```lakhansamani/authorizer:1.3.8```|-|
|`featureName`|Feature name for generate prefix to environments keys|**optional**|-|-|
|`networks`|Network, if not set networkNames have project name and driver=bridge|**optional**|-|-|
|`externalClientPort`|External port for sharing container|**optional**|```8080```|-|
|`dependsOnServiceNames`|Depends on services|**optional**|-|-|
|`env`|Which env you are running your server in. Supported envs production, development|**optional**|```production```|-|
|`resetPasswordUrl`|Reset password link, that can be used to send the correct forgot password link|**optional**|```/reset-password```|-|
|`disableBasicAuthentication`|Used to explicitly disable email and password based authentication|**optional**|-|-|
|`disableEmailVerification`|Used to disable the email verification while signing up|**optional**|-|-|
|`disableMagicLinkLogin`|Used to disable the password less login up|**optional**|-|-|
|`disableLoginPage`|Used to disable the default login page that comes with authorizer instance. This is helpful when user is building their custom login page|**optional**|-|-|
|`disableSignUp`|Used to disable the sign up feature. It is useful when you want to have beta release of your product and invite only limited users|**optional**|-|-|
|`roles`|Comma separated list of roles that your platform supports|**optional**|```user,admin```|-|
|`defaultRoles`|Comma separated list of roles that acts as Default roles which you would like to assign to users while they signup /login|**optional**|```user```|-|
|`protectedRoles`|Comma separated list of roles for which signup should be disabled. Example admin roles. This roles can only assigned manually via super admin like adminUpdateProfile|**optional**|-|-|
|`jwtRoleClaim`|Claim key that will be part of JWT token|**optional**|```role```|-|
|`organizationName`|Name of organization that you want on default login page|**optional**|```Authorizer```|-|
|`organizationLogo`|Logo of organization that you want on default login page|**optional**|```Authorizer Logo```|-|
|`customAccessTokenScript`|Javascript function to add extra keys to your JWT id token. This feature is developed using otto and only supports writing function in ES5. Check the sample here|**optional**|-|-|
|`awsRegion`|AWS, region id, where dynamod db tables are to be created. Used with DATABASE_TYPE=dynamodb|**optional**|-|-|
|`couchbaseBucket`|Bucket used for couchbase database. Used with DATABASE_TYPE=couchbase|**optional**|```authorizer```|-|
|`couchbaseBucketRamQuota`|RAM Quota for the bucket used for couchbase database. It has to be numeric value only. Used with DATABASE_TYPE=couchbase|**optional**|```1000```|-|
|`couchbaseScope`|Scope in which bucket is created. Used with DATABASE_TYPE=couchbase|**optional**|```_default```|-|
|`test`|-|**optional**|-|-|
|`envPath`|-|**optional**|-|-|
|`isEmailServiceEnabled`|-|**optional**|-|-|
|`isSmsServiceEnabled`|-|**optional**|-|-|
|`appCookieSecure`|-|**optional**|-|-|
|`adminCookieSecure`|-|**optional**|-|-|
|`jwtType`|-|**optional**|-|-|
|`jwk`|-|**optional**|-|-|
|`disableMobileBasicAuthentication`|-|**optional**|-|-|
|`disableRedisForEnv`|-|**optional**|-|-|
|`disableStrongPassword`|-|**optional**|-|-|
|`enforceMultiFactorAuthentication`|-|**optional**|-|-|
|`disableMultiFactorAuthentication`|-|**optional**|-|-|
|`disableTotpLogin`|-|**optional**|-|-|
|`disableMailOtpLogin`|-|**optional**|-|-|
|`disablePhoneVerification`|-|**optional**|-|-|
|`defaultAuthorizeResponseType`|-|**optional**|-|-|
|`defaultAuthorizeResponseMode`|-|**optional**|-|-|

[Back to Top](#modules)

---
### DockerComposeMaildev
MailDev is a simple way to test your projects generated email during development, with an easy to use web interface that runs on your machine. (Generator for maildev in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Use in NestJS-mod
An example of using Maildev, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-maildev.

```typescript
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
  isInfrastructureMode,
} from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposeMaildev } from '@nestjs-mod/docker-compose';
import { join } from 'path';
import { AppModule } from './app/app.module';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-maildev');

bootstrapNestApplication({
  globalConfigurationOptions: { debug: true },
  globalEnvironmentsOptions: { debug: true },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(__dirname, '..', '..', '..', 'apps/example-maildev', PACKAGE_JSON_FILE),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, '.env'),
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
    feature: [AppModule.forRoot()],
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
      DockerComposeMaildev.forRoot(),
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
  example-maildev-maildev:
    image: 'maildev/maildev:2.2.1'
    container_name: 'example-maildev-maildev'
    ports:
      - '1025:1025'
      - '1080:1080'
    networks:
      - 'example-maildev-network'
    environment:
      MAILDEV_SMTP_PORT: '1025'
      MAILDEV_WEB_PORT: '1080'
    healthcheck:
      test: 'wget -O - http://localhost:${MAILDEV_WEB_PORT}${MAILDEV_BASE_PATHNAME}/healthz || exit 1'
      interval: '10s'
      timeout: '5s'
      retries: 5
    tty: true
    restart: 'always'
networks:
  example-maildev-network:
    driver: 'bridge'
```

New environment variable

```bash
# example-maildev-maildev (generated)
EXAMPLE_MAILDEV_MAILDEV_MAILDEV_SMTP_PORT=1025
EXAMPLE_MAILDEV_MAILDEV_MAILDEV_WEB_PORT=1080
```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.


#### Static environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`maildevMailDirectory`|Directory for persisting mail.|`obj['maildevMailDirectory']`, `process.env['MAILDEV_MAIL_DIRECTORY']`|**optional**|-|-|
|`maildevHttps`|Switch from http to https protocol.|`obj['maildevHttps']`, `process.env['MAILDEV_HTTPS']`|**optional**|-|-|
|`maildevHttpsKey`|The file path to the ssl private key.|`obj['maildevHttpsKey']`, `process.env['MAILDEV_HTTPS_KEY']`|**optional**|-|-|
|`maildevHttpsCert`|The file path to the ssl cert file.|`obj['maildevHttpsCert']`, `process.env['MAILDEV_HTTPS_CERT']`|**optional**|-|-|
|`maildevIp`|IP Address to bind SMTP service to, defaults to :: (any IPv4/v6).|`obj['maildevIp']`, `process.env['MAILDEV_IP']`|**optional**|-|-|
|`maildevOutgoingHost`|SMTP host for outgoing mail.|`obj['maildevOutgoingHost']`, `process.env['MAILDEV_OUTGOING_HOST']`|**optional**|-|-|
|`maildevOutgoingPort`|SMTP port for outgoing mail.|`obj['maildevOutgoingPort']`, `process.env['MAILDEV_OUTGOING_PORT']`|**optional**|-|-|
|`maildevOutgoingUser`|SMTP user for outgoing mail.|`obj['maildevOutgoingUser']`, `process.env['MAILDEV_OUTGOING_USER']`|**optional**|-|-|
|`maildevOutgoingPass`|SMTP password for outgoing mail.|`obj['maildevOutgoingPass']`, `process.env['MAILDEV_OUTGOING_PASS']`|**optional**|-|**hidden**|
|`maildevOutgoingSecure`|Use SMTP SSL for outgoing mail.|`obj['maildevOutgoingSecure']`, `process.env['MAILDEV_OUTGOING_SECURE']`|**optional**|-|-|
|`maildevAutoRelay`|Use auto-relay mode. Optional relay email address.|`obj['maildevAutoRelay']`, `process.env['MAILDEV_AUTO_RELAY']`|**optional**|-|-|
|`maildevAutoRelayRules`|Filter rules for auto relay mode.|`obj['maildevAutoRelayRules']`, `process.env['MAILDEV_AUTO_RELAY_RULES']`|**optional**|-|-|
|`maildevIncomingUser`|SMTP user for incoming mail.|`obj['maildevIncomingUser']`, `process.env['MAILDEV_INCOMING_USER']`|**optional**|-|-|
|`maildevIncomingPass`|SMTP password for incoming mail.|`obj['maildevIncomingPass']`, `process.env['MAILDEV_INCOMING_PASS']`|**optional**|-|**hidden**|
|`maildevIncomingSecure`|Use SMTP SSL for incoming emails.|`obj['maildevIncomingSecure']`, `process.env['MAILDEV_INCOMING_SECURE']`|**optional**|-|-|
|`maildevIncomingCert`|Cert file location for incoming SSL.|`obj['maildevIncomingCert']`, `process.env['MAILDEV_INCOMING_CERT']`|**optional**|-|-|
|`maildevIncomingKey`|Key file location for incoming SSL.|`obj['maildevIncomingKey']`, `process.env['MAILDEV_INCOMING_KEY']`|**optional**|-|-|
|`maildevWebIp`|IP Address to bind HTTP service to, defaults to --ip.|`obj['maildevWebIp']`, `process.env['MAILDEV_WEB_IP']`|**optional**|-|-|
|`maildevWebUser`|HTTP user for GUI.|`obj['maildevWebUser']`, `process.env['MAILDEV_WEB_USER']`|**optional**|-|-|
|`maildevWebPass`|HTTP password for GUI.|`obj['maildevWebPass']`, `process.env['MAILDEV_WEB_PASS']`|**optional**|-|**hidden**|
|`maildevBasePathname`|Base path for URLs.|`obj['maildevBasePathname']`, `process.env['MAILDEV_BASE_PATHNAME']`|**optional**|-|-|
|`maildevDisableWeb`|Disable the use of the web interface. Useful for unit testing.|`obj['maildevDisableWeb']`, `process.env['MAILDEV_DISABLE_WEB']`|**optional**|-|-|
|`maildevHideExtensions`|Comma separated list of SMTP extensions to NOT advertise (SMTPUTF8, PIPELINING, 8BITMIME).|`obj['maildevHideExtensions']`, `process.env['MAILDEV_HIDE_EXTENSIONS']`|**optional**|-|-|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`image`|Docker image name|**optional**|```maildev/maildev:2.2.1```|-|
|`featureName`|Feature name for generate prefix to environments keys|**optional**|-|-|
|`networks`|Network, if not set networkNames have project name and driver=bridge.|**optional**|-|-|
|`smtpPort`|SMTP port to catch mail|**optional**|```1025```|-|
|`webPort`|Port to run the Web GUI.|**optional**|```1080```|-|

[Back to Top](#modules)

---
### DockerComposeMinio
MinIO is a high-performance, S3 compatible object storage. (Generator for minio in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Use in NestJS-mod
An example of using Minio, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-minio and frontend on Angular here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-minio-angular.

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
import { join } from 'path';

import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposeMinio } from '@nestjs-mod/docker-compose';

const userFeatureName = 'minio-user';
const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-minio');

bootstrapNestApplication({
  globalConfigurationOptions: { debug: true },
  globalEnvironmentsOptions: { debug: true },
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
          mode: isInfrastructureMode() ? 'silent' : 'listen',
        },
      }),
    ],
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
      DockerComposeMinio.forRoot({
        staticConfiguration: {
          nginxPort: 1111,
          nginxFilesFolder: join(appFolder, 'ngnix'),
          featureName: userFeatureName,
        },
      }),
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
  example-minio-minio:
    image: 'bitnami/minio:2024.2.9'
    container_name: 'example-minio-minio'
    volumes:
      - 'example-minio-minio-volume:/bitnami/minio/data'
    ports:
      - '9000:9000'
      - '9001:9001'
    networks:
      - 'example-minio-network'
    environment:
      MINIO_ROOT_USER: 'minioadmin'
      MINIO_ROOT_PASSWORD: '6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgppq'
    healthcheck:
      test:
        - 'CMD-SHELL'
        - 'mc'
        - 'ready'
        - 'local'
      interval: '5s'
      timeout: '5s'
      retries: 5
    tty: true
    restart: 'always'
  example-minio-nginx:
    image: 'nginx:alpine'
    container_name: 'example-minio-nginx'
    volumes:
      - './ngnix/config:/etc/nginx/conf.d'
      - './ngnix/logs:/var/log/nginx/'
    ports:
      - '1111:1111'
    networks:
      - 'example-minio-network'
    tty: true
    restart: 'always'
    depends_on:
      example-minio-minio:
        condition: 'service_started'
networks:
  example-minio-network:
    driver: 'bridge'
volumes:
  example-minio-minio-volume:
    name: 'example-minio-minio-volume'
```

Add database options to docker-compose file for application `docker-compose-example.yml` with fake credenionals

```yaml
# Do not modify this file, it is generated using the DockerCompose module included with NestJS-mod.
version: '3'
services:
  example-minio-minio:
    image: 'bitnami/minio:2024.2.9'
    container_name: 'example-minio-minio'
    volumes:
      - 'example-minio-minio-volume:/bitnami/minio/data'
    ports:
      - '9000:9000'
      - '9001:9001'
    networks:
      - 'example-minio-network'
    environment:
      MINIO_ROOT_USER: 'value_for_minio_root_user'
      MINIO_ROOT_PASSWORD: 'value_for_minio_root_password'
    healthcheck:
      test:
        - 'CMD-SHELL'
        - 'mc'
        - 'ready'
        - 'local'
      interval: '5s'
      timeout: '5s'
      retries: 5
    tty: true
    restart: 'always'
  example-minio-nginx:
    image: 'nginx:alpine'
    container_name: 'example-minio-nginx'
    volumes:
      - './ngnix/config:/etc/nginx/conf.d'
      - './ngnix/logs:/var/log/nginx/'
    ports:
      - '1111:1111'
    networks:
      - 'example-minio-network'
    tty: true
    restart: 'always'
    depends_on:
      example-minio-minio:
        condition: 'service_started'
networks:
  example-minio-network:
    driver: 'bridge'
volumes:
  example-minio-minio-volume:
    name: 'example-minio-minio-volume'
```

New environment variable

```bash
EXAMPLE_MINIO_MINIO_USER_MINIO_ROOT_USER=minioadmin
EXAMPLE_MINIO_MINIO_USER_MINIO_ROOT_PASSWORD=6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgppq
```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.


#### Static environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`minioRootUser`|Minio root user.|`obj['minioRootUser']`, `process.env['MINIO_ROOT_USER']`|**isNotEmpty** (minioRootUser should not be empty)|-|-|
|`minioRootPassword`|Minio root password.|`obj['minioRootPassword']`, `process.env['MINIO_ROOT_PASSWORD']`|**isNotEmpty** (minioRootPassword should not be empty)|-|-|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`image`|Docker image name|**optional**|```bitnami/minio:2024.2.9```|-|
|`featureName`|Feature name for generate prefix to environments keys|**optional**|-|-|
|`networks`|Network, if not set networkNames have project name and driver=bridge.|**optional**|-|-|
|`externalPort`|External port for S3 API operations on the default MinIO server port.|**optional**|```9000```|-|
|`externalConsolePort`|External console for browser access on the MinIO Console port.|**optional**|```9001```|-|
|`nginxPort`|External port for proxy access over nginx (infrastructure, need for disable CORS errors)|**optional**|-|-|
|`nginxConfigFolder`|Folder for store nginx config (infrastructure)|**optional**|-|-|
|`nginxLogsFolder`|Folder for store nginx logs (infrastructure)|**optional**|-|-|
|`nginxBucketsLocations`|Locations for proxy to minio (infrastructure)|**optional**|[ ```files``` ]|-|
|`nginxConfigContent`|Custom nginx config content (infrastructure)|**optional**|-|-|

[Back to Top](#modules)

---
### DockerComposeNats
NATS is an open source, lightweight and high-performance messaging system. It is ideal for distributed systems and supports modern cloud architectures and pub-sub, request-reply and queuing models. (Generator for nats in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Static environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`natsEnableAuth`|Enable Authentication.|`obj['natsEnableAuth']`, `process.env['NATS_ENABLE_AUTH']`|**optional**|-|-|
|`natsUsername`|Username credential for client connections.|`obj['natsUsername']`, `process.env['NATS_USERNAME']`|**optional**|-|-|
|`natsPassword`|Password credential for client connections.|`obj['natsPassword']`, `process.env['NATS_PASSWORD']`|**optional**|-|-|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`image`|Docker image name.|**optional**|```bitnami/nats:2.10.5```|-|
|`featureName`|Feature name for generate prefix to environments keys|**optional**|-|-|
|`networks`|Network, if not set networkNames have project name and driver=bridge.|**optional**|-|-|
|`externalClientPort`|External client port for sharing container.|**optional**|```4222```|-|
|`externalHttpPort`|External http port for sharing container.|**optional**|```8222```|-|
|`extraArgs`|Extra arguments.|**optional**|```-js```|-|

[Back to Top](#modules)

---
### DockerComposeNginx
Nginx is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. (Generator for nginx in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`image`|Docker image name|**optional**|```nginx:alpine```|-|
|`configContent`|Config content|**isNotEmpty** (configContent should not be empty)|-|-|
|`configFolder`|Config folder for map volume to /etc/nginx/conf.d|**isNotEmpty** (configFolder should not be empty)|-|-|
|`logsFolder`|Logs folder for map volume to /var/log/nginx/|**optional**|-|-|
|`dependsOnServiceNames`|Depends on services|**optional**|-|-|
|`ports`|Ports|**optional**|-|-|
|`networks`|Network, if not set networkNames have project name and driver=bridge.|**optional**|-|-|

[Back to Top](#modules)

---
### DockerComposePostgreSQL
PostgreSQL (Postgres) is an open source object-relational database known for reliability and data integrity. ACID-compliant, it supports foreign keys, joins, views, triggers and stored procedures. (Generator for databases in docker-compose.yml for https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/infrastructure/docker-compose)

#### Use in NestJS-mod
An example you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-prisma-flyway or https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-prisma.

```typescript
import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
} from '@nestjs-mod/common';
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
      DefaultNestApplicationInitializer.forRoot(),
      DefaultNestApplicationListener.forRoot({
        staticConfiguration: {
          // When running in infrastructure mode, the backend server does not start.
          mode: isInfrastructureMode() ? 'silent' : 'listen',
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
    "db:create": "./node_modules/.bin/nx run-many -t=db-create"
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
          "./node_modules/.bin/pg-create-db --force-change-username=true --force-change-password=true --root-database-url=${EXAMPLE_PRISMA_FLYWAY_ROOT_DATABASE_URL} --app-database-url=${EXAMPLE_PRISMA_FLYWAY_FLYWAY_PRISMA_DATABASE_URL}"
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
|`image`|Docker image name|**optional**|```bitnami/postgresql:15.5.0```|-|
|`networks`|Network, if not set networkNames have project name and driver=bridge.|**optional**|-|-|
|`externalPort`|External port for sharing container.|**optional**|```5432```|-|
|`nxProjectJsonFile`|Application or library project.json-file (nx)|**optional**|-|-|

#### Feature configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`nxProjectJsonFile`|Application or library project.json-file (nx)|**optional**|-|-|

#### Feature environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`databaseUrl`|Connection string for PostgreSQL with module credentials (example: postgres://feat:feat_password@localhost:5432/feat?schema=public)|`obj['databaseUrl']`, `process.env['DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|-|-|

[Back to Top](#modules)

---
### DockerComposeRedis
The open-source, in-memory data store used by millions of developers as a cache, vector database, document database, streaming engine, and message broker. (Generator for redis in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Use in NestJS-mod
An example you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-cache-manager.

```typescript
import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
} from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposeRedis } from '@nestjs-mod/docker-compose';
import { join } from 'path';
import { userFeatureName } from './app/app.constants';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-cache-manager');

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
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, '.env'),
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
  cache-manager-redis:
    image: 'bitnami/redis:7.2'
    container_name: 'cache-manager-redis'
    volumes:
      - 'cache-manager-redis-volume:/bitnami/redis/data'
    ports:
      - '6379:6379'
    networks:
      - 'cache-manager-network'
    environment:
      REDIS_DATABASE: '0'
      REDIS_PASSWORD: 'redis_password'
      REDIS_DISABLE_COMMANDS: 'FLUSHDB,FLUSHALL'
      REDIS_IO_THREADS: 2
      REDIS_IO_THREADS_DO_READS: 'yes'
    healthcheck:
      test:
        - 'CMD-SHELL'
        - 'redis-cli ping | grep PONG'
      interval: '5s'
      timeout: '5s'
      retries: 5
    tty: true
    restart: 'always'
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
  cache-manager-redis:
    image: 'bitnami/redis:7.2'
    container_name: 'cache-manager-redis'
    volumes:
      - 'cache-manager-redis-volume:/bitnami/redis/data'
    ports:
      - '6379:6379'
    networks:
      - 'cache-manager-network'
    environment:
      REDIS_DATABASE: 'value_for_redis_database'
      REDIS_PASSWORD: 'value_for_redis_password'
      REDIS_DISABLE_COMMANDS: 'value_for_redis_disable_commands'
      REDIS_IO_THREADS: 'value_for_redis_io_threads'
      REDIS_IO_THREADS_DO_READS: 'value_for_redis_io_threads_do_reads'
    healthcheck:
      test:
        - 'CMD-SHELL'
        - 'redis-cli ping | grep PONG'
      interval: '5s'
      timeout: '5s'
      retries: 5
    tty: true
    restart: 'always'
networks:
  example-cache-manager-network:
    driver: bridge
volumes:
  example-cache-manager-volume:
    name: example-cache-manager-volume
```

New environment variable

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
|`image`|Docker image name|**optional**|```bitnami/redis:7.2```|-|
|`featureName`|Feature name for generate prefix to environments keys|**optional**|-|-|
|`networks`|Network, if not set networkNames have project name and driver=bridge.|**optional**|-|-|
|`externalPort`|External port for sharing container.|**optional**|```6379```|-|
|`disableCommands`|Redis disable commands.|**optional**|```FLUSHDB,FLUSHALL```|-|
|`ioThreads`|Redis IO threads.|**optional**|```2```|-|
|`ioThreadsDoReads`|Redis IO threads.|**optional**|```yes```|-|

[Back to Top](#modules)

---
### DockerComposeSso
Single Sign-On on NestJS and Angular with webhooks and social authorization. (Generator for https://github.com/nestjs-mod/nestjs-mod-sso in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)

#### Use in NestJS-mod
An example of using Single Sign-On, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-sso/INFRASTRUCTURE.MD.


```typescript
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import {
  bootstrapNestApplication,
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  isInfrastructureMode,
  PACKAGE_JSON_FILE,
  ProjectUtils,
} from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposeMinio, DockerComposePostgreSQL, DockerComposeRedis, DockerComposeSso } from '@nestjs-mod/docker-compose';
import { SsoModule } from '@nestjs-mod/sso';
import { join } from 'path';
import { adminSecret } from './app/app.constants';
import { AppModule } from './app/app.module';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-sso');

bootstrapNestApplication({
  globalConfigurationOptions: { debug: true },
  globalEnvironmentsOptions: { debug: true },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(__dirname, '..', '..', '..', 'apps/example-sso', PACKAGE_JSON_FILE),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, 'apps', 'example-sso', '.env'),
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
      SsoModule.forRootAsync({
        staticEnvironments: {
          url: 'http://localhost:8080',
          adminSecret
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
      DockerComposeMinio.forRoot({
        staticEnvironments: { minioRootUser: 'FWGmrAGaeMKM', minioRootPassword: 'QatVJuLoZRARlJguoZMpoKvZMJHzvuOR' }
      }),
      DockerComposePostgreSQL.forRoot({
        staticEnvironments: {
          rootDatabaseUrl: 'postgres://postgres:postgres_password@localhost:5432/postgres?schema=public'
        }
      }),
      DockerComposeRedis.forRoot({ staticEnvironments: { redisUrl: 'redis://:CHmeOQrZWUHwgahrfzsrzuREOxgAENsC@localhost:6379' } }),
      DockerComposeSso.forRoot({
        staticEnvironments: {
          databaseUrl: 'postgres://postgres:postgres_password@example-sso-postgre-sql:5432/postgres?schema=public',
          singleSignOnSsoAdminSecret: adminSecret,
          singleSignOnSsoAdminEmail: 'nestjs-mod-sso@site15.ru',
          singleSignOnSsoAdminUsername: 'admin',
          singleSignOnSsoAdminPassword: 'SbxcbII7RUvCOe9TDXnKhfRrLJW5cGDA',
          singleSignOnMinioServerHost: 'example-sso-minio',
          singleSignOnMinioAccessKey: 'FWGmrAGaeMKM',
          singleSignOnMinioSecretKey: 'QatVJuLoZRARlJguoZMpoKvZMJHzvuOR',
          singleSignOnKeyvUrl: 'redis://:CHmeOQrZWUHwgahrfzsrzuREOxgAENsC@example-sso-redis:6379',
          singleSignOnSsoDefaultPublicProjects: 'Beijing:ru=Пекин,Jq6GQ6Rzz6x8HNOD4x2Hc2eM0cfiCVUzGfsi,X6nk0OZXQJboSEfugnH35e9oSeg5RFlV0DQprtYyYDQjNli9mA;Moscow:ru=Москва,OceX08HGZ89PTkPpg9KDk5ErY1uMfDcfFKkw,VJztpDIwvqG6IkTVEIDEw1Ed2Wu5oHu6zfBe7CCJFrCtyWO2Yv;New York:ru=Нью-Йорк,4OGD25Rmn3W3MP0kMd7c90rGP1WwK8u4wL1w,qm8nc9MgKyvd6Hgl3jY5BjgDFSBqNvxcu6o52kDjIC168OsM1R;',
          singleSignOnSsoDefaultProject: 'default:ru=по умолчанию,KzMRNEZTetzatIgQPVSDYfeGyaZrbLzkcxNc,qaHkVpAtUVIpDdLXMlAOzsBfMRJblWoHpXguYQRBuSEBpGKbWt',
          singleSignOnSsoDisableEmailVerification: false,
          singleSignOnSsoServerUrl: 'http://localhost:8080',
          singleSignOnSsoClientUrl: 'http://localhost:8080'
        }
      }),
    ],
  },
});

```

After connecting the module to the application and `npm run manual:prepare` and starting generation of documentation through `npm run docs:infrastructure:example-sso`, you will have new files and scripts to run.

New scripts mostly `package.json`

Add database options to docker-compose file for application `docker-compose.yml` with real credenionals and add it to `.gitignore` file

```yaml
# Do not modify this file, it is generated using the DockerCompose module included with NestJS-mod.
version: "3"
services:
  example-sso-postgre-sql:
    image: "bitnami/postgresql:15.5.0"
    container_name: "example-sso-postgre-sql"
    volumes:
      - "example-sso-postgre-sql-volume:/bitnami/postgresql"
    ports:
      - "5432:5432"
    networks:
      - "example-sso-network"
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
      POSTGRESQL_USERNAME: "${EXAMPLE_SSO_POSTGRE_SQL_POSTGRESQL_USERNAME}"
      POSTGRESQL_PASSWORD: "${EXAMPLE_SSO_POSTGRE_SQL_POSTGRESQL_PASSWORD}"
      POSTGRESQL_DATABASE: "${EXAMPLE_SSO_POSTGRE_SQL_POSTGRESQL_DATABASE}"
  example-sso-minio:
    image: "bitnami/minio:2024.2.9"
    container_name: "example-sso-minio"
    volumes:
      - "example-sso-minio-volume:/bitnami/minio/data"
    ports:
      - "9000:9000"
      - "9001:9001"
    networks:
      - "example-sso-network"
    environment:
      MINIO_ROOT_USER: "${EXAMPLE_SSO_MINIO_MINIO_ROOT_USER}"
      MINIO_ROOT_PASSWORD: "${EXAMPLE_SSO_MINIO_MINIO_ROOT_PASSWORD}"
    healthcheck:
      test:
        - "CMD-SHELL"
        - "mc"
        - "ready"
        - "local"
      interval: "5s"
      timeout: "5s"
      retries: 5
    tty: true
    restart: "always"
  example-sso-redis:
    image: "bitnami/redis:7.2"
    container_name: "example-sso-redis"
    volumes:
      - "example-sso-redis-volume:/bitnami/redis/data"
    ports:
      - "6379:6379"
    networks:
      - "example-sso-network"
    environment:
      REDIS_DATABASE: "${EXAMPLE_SSO_REDIS_REDIS_DATABASE}"
      REDIS_PASSWORD: "${EXAMPLE_SSO_REDIS_REDIS_PASSWORD}"
      REDIS_DISABLE_COMMANDS: "${EXAMPLE_SSO_REDIS_REDIS_DISABLE_COMMANDS}"
      REDIS_IO_THREADS: "${EXAMPLE_SSO_REDIS_REDIS_IO_THREADS}"
      REDIS_IO_THREADS_DO_READS: "${EXAMPLE_SSO_REDIS_REDIS_IO_THREADS_DO_READS}"
    healthcheck:
      test:
        - "CMD-SHELL"
        - "redis-cli --no-auth-warning -a $$REDIS_PASSWORD ping | grep PONG"
      interval: "5s"
      timeout: "5s"
      retries: 5
    tty: true
    restart: "always"
  example-sso-single-sign-on:
    image: "ghcr.io/nestjs-mod/nestjs-mod-sso-server:1.5.5"
    container_name: "example-sso-single-sign-on"
    ports:
      - "8080:8080"
    networks:
      - "example-sso-network"
    environment:
      DATABASE_URL: "${EXAMPLE_SSO_SINGLE_SIGN_ON_DATABASE_URL}"
      SINGLE_SIGN_ON_SSO_ADMIN_SECRET: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_ADMIN_SECRET}"
      SINGLE_SIGN_ON_SSO_ADMIN_EMAIL: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_ADMIN_EMAIL}"
      SINGLE_SIGN_ON_SSO_ADMIN_USERNAME: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_ADMIN_USERNAME}"
      SINGLE_SIGN_ON_SSO_ADMIN_PASSWORD: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_ADMIN_PASSWORD}"
      SINGLE_SIGN_ON_MINIO_SERVER_HOST: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_MINIO_SERVER_HOST}"
      SINGLE_SIGN_ON_MINIO_ACCESS_KEY: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_MINIO_ACCESS_KEY}"
      SINGLE_SIGN_ON_MINIO_SECRET_KEY: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_MINIO_SECRET_KEY}"
      SINGLE_SIGN_ON_KEYV_URL: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_KEYV_URL}"
      SINGLE_SIGN_ON_SSO_DEFAULT_PUBLIC_PROJECTS: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_DEFAULT_PUBLIC_PROJECTS}"
      SINGLE_SIGN_ON_SSO_DEFAULT_PROJECT: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_DEFAULT_PROJECT}"
      SINGLE_SIGN_ON_SSO_DISABLE_EMAIL_VERIFICATION: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_DISABLE_EMAIL_VERIFICATION}"
      SINGLE_SIGN_ON_SSO_SERVER_URL: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_SERVER_URL}"
      SINGLE_SIGN_ON_SSO_CLIENT_URL: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_CLIENT_URL}"
      SINGLE_SIGN_ON_PORT: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_PORT}"
      SINGLE_SIGN_ON_SSO_USER_AVAILABLE_ROLES: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_USER_AVAILABLE_ROLES}"
      SINGLE_SIGN_ON_SSO_USER_DEFAULT_ROLES: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_USER_DEFAULT_ROLES}"
      SINGLE_SIGN_ON_SSO_ADMIN_DEFAULT_ROLES: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_ADMIN_DEFAULT_ROLES}"
      SINGLE_SIGN_ON_SSO_MANAGER_DEFAULT_ROLES: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_MANAGER_DEFAULT_ROLES}"
      SINGLE_SIGN_ON_SSO_JWT_SECRET_KEY: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_JWT_SECRET_KEY}"
      SINGLE_SIGN_ON_SSO_JWT_ACCESS_TOKEN_EXPIRES_IN: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_JWT_ACCESS_TOKEN_EXPIRES_IN}"
      SINGLE_SIGN_ON_SSO_JWT_REFRESH_TOKEN_EXPIRES_IN: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_JWT_REFRESH_TOKEN_EXPIRES_IN}"
      SINGLE_SIGN_ON_SSO_CACHE_TTL: "${EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_CACHE_TTL}"
      IMAGE: "${EXAMPLE_SSO_SINGLE_SIGN_ON_IMAGE}"
      EXTERNAL_CLIENT_PORT: "${EXAMPLE_SSO_SINGLE_SIGN_ON_EXTERNAL_CLIENT_PORT}"
    tty: true
    restart: "always"
    depends_on: {}
networks:
  example-sso-network:
    driver: "bridge"
volumes:
  example-sso-postgre-sql-volume:
    name: "example-sso-postgre-sql-volume"
  example-sso-minio-volume:
    name: "example-sso-minio-volume"
  example-sso-redis-volume:
    name: "example-sso-redis-volume"

```

New environment variable

```bash
# example-sso-postgre-sql (generated)
EXAMPLE_SSO_POSTGRE_SQL_POSTGRESQL_USERNAME=postgres
EXAMPLE_SSO_POSTGRE_SQL_POSTGRESQL_PASSWORD=postgres_password
EXAMPLE_SSO_POSTGRE_SQL_POSTGRESQL_DATABASE=postgres
# example-sso-minio (generated)
EXAMPLE_SSO_MINIO_MINIO_ROOT_USER=FWGmrAGaeMKM
EXAMPLE_SSO_MINIO_MINIO_ROOT_PASSWORD=QatVJuLoZRARlJguoZMpoKvZMJHzvuOR
# example-sso-redis (generated)
EXAMPLE_SSO_REDIS_REDIS_DATABASE=0
EXAMPLE_SSO_REDIS_REDIS_PASSWORD=CHmeOQrZWUHwgahrfzsrzuREOxgAENsC
EXAMPLE_SSO_REDIS_REDIS_DISABLE_COMMANDS=
EXAMPLE_SSO_REDIS_REDIS_IO_THREADS=
EXAMPLE_SSO_REDIS_REDIS_IO_THREADS_DO_READS=
# example-sso-single-sign-on (generated)
EXAMPLE_SSO_SINGLE_SIGN_ON_DATABASE_URL=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_ADMIN_SECRET=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_ADMIN_EMAIL=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_ADMIN_USERNAME=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_ADMIN_PASSWORD=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_MINIO_SERVER_HOST=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_MINIO_ACCESS_KEY=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_MINIO_SECRET_KEY=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_KEYV_URL=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_DEFAULT_PUBLIC_PROJECTS=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_DEFAULT_PROJECT=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_DISABLE_EMAIL_VERIFICATION=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_SERVER_URL=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_CLIENT_URL=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_PORT=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_USER_AVAILABLE_ROLES=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_USER_DEFAULT_ROLES=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_ADMIN_DEFAULT_ROLES=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_MANAGER_DEFAULT_ROLES=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_JWT_SECRET_KEY=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_JWT_ACCESS_TOKEN_EXPIRES_IN=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_JWT_REFRESH_TOKEN_EXPIRES_IN=
EXAMPLE_SSO_SINGLE_SIGN_ON_SINGLE_SIGN_ON_SSO_CACHE_TTL=
EXAMPLE_SSO_SINGLE_SIGN_ON_IMAGE=
EXAMPLE_SSO_SINGLE_SIGN_ON_EXTERNAL_CLIENT_PORT=
```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.


#### Static environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`databaseUrl`|Postgres database connection string|`obj['databaseUrl']`, `process.env['DATABASE_URL']`|**isNotEmpty** (databaseUrl should not be empty)|-|-|
|`singleSignOnPort`|Port on which server should be running|`obj['singleSignOnPort']`, `process.env['SINGLE_SIGN_ON_PORT']`|**optional**|```8080```|```8080```|
|`singleSignOnKeyvUrl`|Storage for cache|`obj['singleSignOnKeyvUrl']`, `process.env['SINGLE_SIGN_ON_KEYV_URL']`|**isNotEmpty** (singleSignOnKeyvUrl should not be empty)|-|-|
|`singleSignOnMinioServerHost`|Minio host (for store profile picture)|`obj['singleSignOnMinioServerHost']`, `process.env['SINGLE_SIGN_ON_MINIO_SERVER_HOST']`|**isNotEmpty** (singleSignOnMinioServerHost should not be empty)|-|-|
|`singleSignOnMinioAccessKey`|Minio access key (for store profile picture)|`obj['singleSignOnMinioAccessKey']`, `process.env['SINGLE_SIGN_ON_MINIO_ACCESS_KEY']`|**isNotEmpty** (singleSignOnMinioAccessKey should not be empty)|-|-|
|`singleSignOnMinioSecretKey`|Minio secret key (for store profile picture)|`obj['singleSignOnMinioSecretKey']`, `process.env['SINGLE_SIGN_ON_MINIO_SECRET_KEY']`|**isNotEmpty** (singleSignOnMinioSecretKey should not be empty)|-|-|
|`singleSignOnNotificationsMailTransport`|Mail transport (example: smtps://username@domain.com:password@smtp.domain.com)|`obj['singleSignOnNotificationsMailTransport']`, `process.env['SINGLE_SIGN_ON_NOTIFICATIONS_MAIL_TRANSPORT']`|**optional**|-|-|
|`singleSignOnNotificationsMailDefaultSenderName`|Default sender name (example: Username)|`obj['singleSignOnNotificationsMailDefaultSenderName']`, `process.env['SINGLE_SIGN_ON_NOTIFICATIONS_MAIL_DEFAULT_SENDER_NAME']`|**optional**|-|-|
|`singleSignOnNotificationsMailDefaultSenderEmail`|Default sender email (example: username@domain.com)|`obj['singleSignOnNotificationsMailDefaultSenderEmail']`, `process.env['SINGLE_SIGN_ON_NOTIFICATIONS_MAIL_DEFAULT_SENDER_EMAIL']`|**optional**|-|-|
|`singleSignOnSsoServerUrl`|Server URL|`obj['singleSignOnSsoServerUrl']`, `process.env['SINGLE_SIGN_ON_SSO_SERVER_URL']`|**isNotEmpty** (singleSignOnSsoServerUrl should not be empty)|-|-|
|`singleSignOnSsoClientUrl`|Client URL|`obj['singleSignOnSsoClientUrl']`, `process.env['SINGLE_SIGN_ON_SSO_CLIENT_URL']`|**isNotEmpty** (singleSignOnSsoClientUrl should not be empty)|-|-|
|`singleSignOnSsoAdminSecret`|Admin secret key|`obj['singleSignOnSsoAdminSecret']`, `process.env['SINGLE_SIGN_ON_SSO_ADMIN_SECRET']`|**optional**|-|-|
|`singleSignOnSsoAdminEmail`|Global admin username|`obj['singleSignOnSsoAdminEmail']`, `process.env['SINGLE_SIGN_ON_SSO_ADMIN_EMAIL']`|**optional**|```admin@example.com```|```admin@example.com```|
|`singleSignOnSsoAdminUsername`|Global admin username|`obj['singleSignOnSsoAdminUsername']`, `process.env['SINGLE_SIGN_ON_SSO_ADMIN_USERNAME']`|**isNotEmpty** (singleSignOnSsoAdminUsername should not be empty)|```admin```|```admin```|
|`singleSignOnSsoAdminPassword`|Global admin password|`obj['singleSignOnSsoAdminPassword']`, `process.env['SINGLE_SIGN_ON_SSO_ADMIN_PASSWORD']`|**optional**|-|-|
|`singleSignOnSsoUserAvailableRoles`|Available user roles|`obj['singleSignOnSsoUserAvailableRoles']`, `process.env['SINGLE_SIGN_ON_SSO_USER_AVAILABLE_ROLES']`|**optional**|[ ```admin```, ```manager```, ```user``` ]|[ ```admin```, ```manager```, ```user``` ]|
|`singleSignOnSsoUserDefaultRoles`|Default roles for new user|`obj['singleSignOnSsoUserDefaultRoles']`, `process.env['SINGLE_SIGN_ON_SSO_USER_DEFAULT_ROLES']`|**optional**|[ ```user``` ]|[ ```user``` ]|
|`singleSignOnSsoAdminDefaultRoles`|Default roles for admin|`obj['singleSignOnSsoAdminDefaultRoles']`, `process.env['SINGLE_SIGN_ON_SSO_ADMIN_DEFAULT_ROLES']`|**optional**|[ ```admin``` ]|[ ```admin``` ]|
|`singleSignOnSsoManagerDefaultRoles`|Default roles for manager|`obj['singleSignOnSsoManagerDefaultRoles']`, `process.env['SINGLE_SIGN_ON_SSO_MANAGER_DEFAULT_ROLES']`|**optional**|[ ```manager``` ]|[ ```manager``` ]|
|`singleSignOnSsoJwtSecretKey`|Secret key for generate jwt keys|`obj['singleSignOnSsoJwtSecretKey']`, `process.env['SINGLE_SIGN_ON_SSO_JWT_SECRET_KEY']`|**optional**|```AcJwUY9AP6FPf8XnfwbSuW7ZjwoaPiFJ```|```AcJwUY9AP6FPf8XnfwbSuW7ZjwoaPiFJ```|
|`singleSignOnSsoJwtAccessTokenExpiresIn`|Access token expires in|`obj['singleSignOnSsoJwtAccessTokenExpiresIn']`, `process.env['SINGLE_SIGN_ON_SSO_JWT_ACCESS_TOKEN_EXPIRES_IN']`|**optional**|```30m```|```30m```|
|`singleSignOnSsoJwtRefreshTokenExpiresIn`|Refresh token expires in|`obj['singleSignOnSsoJwtRefreshTokenExpiresIn']`, `process.env['SINGLE_SIGN_ON_SSO_JWT_REFRESH_TOKEN_EXPIRES_IN']`|**optional**|```24h```|```24h```|
|`singleSignOnSsoCacheTTL`|TTL for cached data|`obj['singleSignOnSsoCacheTTL']`, `process.env['SINGLE_SIGN_ON_SSO_CACHE_TTL']`|**optional**|```15000```|```15000```|
|`singleSignOnSsoDefaultPublicProjects`|Default public projects (example: "name1:ru=название1:tt=исем1,clientId1,clientSecret1;name2:ru=название2:tt=исем2,clientId2,clientSecret2")|`obj['singleSignOnSsoDefaultPublicProjects']`, `process.env['SINGLE_SIGN_ON_SSO_DEFAULT_PUBLIC_PROJECTS']`|**optional**|-|-|
|`singleSignOnSsoDefaultProject`|Default projects (example: "name3:ru=название3,clientId3,clientSecret3;name4:ru=название4,clientId4,clientSecret4")|`obj['singleSignOnSsoDefaultProject']`, `process.env['SINGLE_SIGN_ON_SSO_DEFAULT_PROJECT']`|**optional**|-|-|
|`singleSignOnSsoDisableEmailVerification`|Used to disable the email verification while signing up|`obj['singleSignOnSsoDisableEmailVerification']`, `process.env['SINGLE_SIGN_ON_SSO_DISABLE_EMAIL_VERIFICATION']`|**optional**|```false```|```false```|
|`singleSignOnSsoGoogleOauthClientId`|Client ID for Google application (https://console.cloud.google.com/apis/credentials)|`obj['singleSignOnSsoGoogleOauthClientId']`, `process.env['SINGLE_SIGN_ON_SSO_GOOGLE_OAUTH_CLIENT_ID']`|**optional**|-|-|
|`singleSignOnSsoGoogleOauthClientSecretKey`|Client secret key for Google application (https://console.cloud.google.com/apis/credentials)|`obj['singleSignOnSsoGoogleOauthClientSecretKey']`, `process.env['SINGLE_SIGN_ON_SSO_GOOGLE_OAUTH_CLIENT_SECRET_KEY']`|**optional**|-|-|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`image`|Docker image name|**optional**|```ghcr.io/nestjs-mod/nestjs-mod-sso-server:1.7.0```|-|
|`featureName`|Feature name for generate prefix to environments keys|**optional**|-|-|
|`networks`|Network, if not set networkNames have project name and driver=bridge|**optional**|-|-|
|`externalClientPort`|External port for sharing container|**optional**|```8080```|-|
|`dependsOnServiceNames`|Depends on services|**optional**|-|-|

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

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/docker-compose
[npm-url]: https://npmjs.org/package/@nestjs-mod/docker-compose
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[discord-image]: https://img.shields.io/badge/discord-online-brightgreen.svg
[discord-url]: https://discord.gg/meY7UXaG
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/docker-compose
[downloads-url]: https://npmjs.org/package/@nestjs-mod/docker-compose
