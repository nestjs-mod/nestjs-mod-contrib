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
import { PgFlyway } from '@nestjs-mod/pg-flyway';
import { NestjsPinoLoggerModule } from '@nestjs-mod/pino';
import { ECOSYSTEM_CONFIG_FILE, Pm2 } from '@nestjs-mod/pm2';
import { FakePrismaClient, PRISMA_SCHEMA_FILE, PrismaModule } from '@nestjs-mod/prisma';
import { TerminusHealthCheckModule } from '@nestjs-mod/terminus';
import { MemoryHealthIndicator } from '@nestjs/terminus';
import { join } from 'path';
import { flywayPrismaFeatureName } from './app/app.constants';
import { AppModule } from './app/app.module';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-prisma-pg-flyway');

bootstrapNestApplication({
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
          mode: isInfrastructureMode() ? 'silent' : 'listen',
        },
      }),
    ],
    core: [
      PrismaModule.forRoot({
        staticConfiguration: {
          schemaFile: join(appFolder, 'src', 'prisma', `${flywayPrismaFeatureName}-${PRISMA_SCHEMA_FILE}`),
          featureName: flywayPrismaFeatureName,
          prismaModule: isInfrastructureMode()
            ? { PrismaClient: FakePrismaClient }
            : // remove after first run docs:infrastructure
              //{ PrismaClient: FakePrismaClient },
              // uncomment after first run docs:infrastructure
              import(`@prisma/pg-flyway-prisma-client`),
          addMigrationScripts: false,
          binaryTargets: ['native', 'linux-musl-openssl-3.0.x', 'linux-musl-openssl-3.0.x'],
          output: join(rootFolder, 'node_modules', '@prisma/pg-flyway-prisma-client'),
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
      DockerComposePostgreSQL.forRoot(),
      DockerComposePostgreSQL.forFeature({
        featureModuleName: flywayPrismaFeatureName,
      }),
      PgFlyway.forRoot({
        staticConfiguration: {
          featureName: flywayPrismaFeatureName,
          migrationsFolder: join(appFolder, 'src', 'migrations'),
        },
      }),
      Pm2.forRoot({
        configuration: {
          ecosystemConfigFile: join(rootFolder, ECOSYSTEM_CONFIG_FILE),
          applicationScriptFile: join('dist/apps/example-prisma-pg-flyway/main.js'),
        },
      }),
    ],
  },
});
