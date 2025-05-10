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
