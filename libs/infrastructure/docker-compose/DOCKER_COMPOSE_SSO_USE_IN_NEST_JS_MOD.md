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
