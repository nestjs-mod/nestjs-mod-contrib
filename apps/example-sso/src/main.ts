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
