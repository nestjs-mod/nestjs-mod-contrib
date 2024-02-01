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
import { FLYWAY_JS_CONFIG_FILE, FlywayModule } from '@nestjs-mod/flyway';
import { NestjsPinoLogger } from '@nestjs-mod/pino';
import { ECOSYSTEM_CONFIG_FILE, Pm2 } from '@nestjs-mod/pm2';
import { FakePrismaClient, PRISMA_SCHEMA_FILE, PrismaModule } from '@nestjs-mod/prisma';
import { TerminusHealthCheck } from '@nestjs-mod/terminus';
import { Logger } from '@nestjs/common';
import { MemoryHealthIndicator } from '@nestjs/terminus';
import { join } from 'path';
import { flywayPrismaFeatureName } from './app/app.constants';
import { AppModule } from './app/app.module';

const globalPrefix = 'api';

bootstrapNestApplication({
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(
            __dirname,
            '..',
            '..',
            '..',
            'apps/example-prisma-flyway',
            PACKAGE_JSON_FILE
          ),
          packageJsonFile: join(__dirname, '..', '..', '..', PACKAGE_JSON_FILE),
          envFile: join(__dirname, '..', '..', '..', '.env'),
        },
      }),
      DefaultNestApplicationInitializer.forRoot(),
      NestjsPinoLogger.forRoot(),
      TerminusHealthCheck.forRootAsync({
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
          preListen: async ({ app }) => {
            if (app) {
              app.enableShutdownHooks();
              app.setGlobalPrefix(globalPrefix);
            }
          },
          postListen: async ({ current }) => {
            if (isInfrastructureMode()) {
              /**
               * When you start the application in infrastructure mode, it should automatically close;
               * if for some reason it does not close, we forcefully close it after 30 seconds.
               */
              setTimeout(() => process.exit(0), 30000);
            }
            Logger.log(
              `🚀 Application is running on: http://${current.staticEnvironments?.hostname ?? 'localhost'}:${
                current.staticEnvironments?.port
              }/${globalPrefix}`
            );
          },
        },
      }),
    ],
    core: [
      PrismaModule.forRoot({
        staticConfiguration: {
          prismaSchemaFile: join(
            __dirname,
            '..',
            '..',
            '..',
            'apps/example-prisma-flyway/src/prisma/',
            `${flywayPrismaFeatureName}-${PRISMA_SCHEMA_FILE}`
          ),
          prismaFeatureName: flywayPrismaFeatureName,
          prismaModule: isInfrastructureMode()
            ? { PrismaClient: FakePrismaClient }
            : // remove after first run docs:infrastructure
              // { PrismaClient: FakePrismaClient },
              // uncomment after first run docs:infrastructure
              import(`@prisma/flyway-prisma-client`),
          addMigrationScripts: false,
        },
      }),
    ],
    feature: [AppModule.forRoot()],
    infrastructure: [
      InfrastructureMarkdownReportGenerator.forRoot({
        staticConfiguration: {
          markdownFile: join(__dirname, '..', '..', '..', 'apps/example-prisma-flyway', 'INFRASTRUCTURE.MD'),
          skipEmptySettings: true,
        },
      }),
      DockerCompose.forRoot({
        configuration: {
          dockerComposeFileVersion: '3',
          dockerComposeFile: join(__dirname, '..', '..', '..', 'apps/example-prisma-flyway', DOCKER_COMPOSE_FILE),
        },
      }),
      DockerComposePostgreSQL.forRoot(),
      DockerComposePostgreSQL.forFeature({
        featureModuleName: flywayPrismaFeatureName,
      }),
      FlywayModule.forRoot({
        staticConfiguration: {
          flywayFeatureName: flywayPrismaFeatureName,
          flywayMigrationsFolder: join(__dirname, '..', '..', '..', 'apps/example-prisma-flyway/src/migrations'),
          flywayConfigFile: join(__dirname, '..', '..', '..', FLYWAY_JS_CONFIG_FILE),
        },
      }),
      Pm2.forRoot({
        configuration: {
          ecosystemConfigFile: join(__dirname, '..', '..', '..', ECOSYSTEM_CONFIG_FILE),
          applicationScriptFile: join('dist/apps/example-prisma-flyway/main.js'),
        },
      }),
    ],
  },
});
