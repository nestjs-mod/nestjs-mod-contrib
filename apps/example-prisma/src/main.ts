import {
  DOT_ENV_FILE,
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
  isInfrastructureMode,
} from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposePostgreSQL } from '@nestjs-mod/docker-compose';
import { NestjsPinoLoggerModule } from '@nestjs-mod/pino';
import { ECOSYSTEM_CONFIG_FILE, Pm2 } from '@nestjs-mod/pm2';
import { FakePrismaClient, PRISMA_SCHEMA_FILE, PrismaModule } from '@nestjs-mod/prisma';
import { TerminusHealthCheckModule } from '@nestjs-mod/terminus';
import { MemoryHealthIndicator } from '@nestjs/terminus';
import { join } from 'path';
import { userFeatureName } from './app/app.constants';
import { AppModule } from './app/app.module';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-prisma');

bootstrapNestApplication({
  globalConfigurationOptions: { debug: true },
  globalEnvironmentsOptions: { debug: true },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(appFolder, PACKAGE_JSON_FILE),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, DOT_ENV_FILE),
        },
      }),
      DefaultNestApplicationInitializer.forRoot({ staticConfiguration: { bufferLogs: true } }),
      NestjsPinoLoggerModule.forRoot(),
      TerminusHealthCheckModule.forRootAsync({
        configurationFactory: (memoryHealthIndicator: MemoryHealthIndicator) => ({
          standardHealthIndicators: [
            { name: 'memory_heap', check: () => memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024) },
          ],
        }),
        inject: [MemoryHealthIndicator],
      }),
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
            : import(`@prisma/prisma-user-client`),
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
      Pm2.forRoot({
        configuration: {
          ecosystemConfigFile: join(rootFolder, ECOSYSTEM_CONFIG_FILE),
          applicationScriptFile: join('dist/apps/example-prisma/main.js'),
        },
      }),
    ],
  },
});
