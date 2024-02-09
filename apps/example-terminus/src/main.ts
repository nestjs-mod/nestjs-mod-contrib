/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import {
  DOT_ENV_FILE,
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  NestModuleCategory,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
  createNestModule,
  isInfrastructureMode,
} from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposePostgreSQL } from '@nestjs-mod/docker-compose';
import { NestjsPinoLoggerModule } from '@nestjs-mod/pino';
import { ECOSYSTEM_CONFIG_FILE, Pm2 } from '@nestjs-mod/pm2';
import { TerminusHealthCheckModule } from '@nestjs-mod/terminus';
import { MemoryHealthIndicator } from '@nestjs/terminus';
import { join } from 'path';
import { AppModule } from './app/app.module';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-terminus');

bootstrapNestApplication({
  globalEnvironmentsOptions: { debug: true },
  globalConfigurationOptions: { debug: true },
  modules: {
    core: [
      createNestModule({
        moduleName: 'CORE1',
        moduleCategory: NestModuleCategory.core,
      }).CORE1.forRoot(),
    ],
    integrations: [
      createNestModule({
        moduleName: 'INTEGRATIONS1',
        moduleCategory: NestModuleCategory.core,
      }).INTEGRATIONS1.forRoot(),
    ],
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
          mode: isInfrastructureMode() ? 'init' : 'listen',
        },
      }),
    ],
    feature: [
      createNestModule({
        moduleName: AppModule.name,
        moduleDescription: 'Main app module',
        moduleCategory: NestModuleCategory.feature,
        imports: [AppModule],
      }).AppModule.forRootAsync(),
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
          dockerComposeFile: join(rootFolder, DOCKER_COMPOSE_FILE),
        },
      }),
      DockerComposePostgreSQL.forRoot(),
      DockerComposePostgreSQL.forFeature({
        featureModuleName: 'feat',
        // featureEnvironments: { databaseUrl: 'feature connection' },
      }),
      Pm2.forRoot({
        configuration: {
          ecosystemConfigFile: join(rootFolder, ECOSYSTEM_CONFIG_FILE),
          applicationScriptFile: join('dist/apps/example-terminus/main.js'),
        },
      }),
    ],
  },
});
