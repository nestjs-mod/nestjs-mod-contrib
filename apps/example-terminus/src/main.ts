/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  NestModuleCategory,
  ProjectUtils,
  bootstrapNestApplication,
  createNestModule,
  isInfrastructureMode,
  isProductionMode,
} from '@nestjs-mod/common';
import { NestjsPinoLogger } from '@nestjs-mod/pino';
import { ECOSYSTEM_CONFIG_FILE, PACKAGE_JSON_FILE, Pm2 } from '@nestjs-mod/pm2';
import { RestInfrastructureHtmlReport } from '@nestjs-mod/reports';
import { TerminusHealthCheck } from '@nestjs-mod/terminus';
import { Logger } from '@nestjs/common';
import { MemoryHealthIndicator } from '@nestjs/terminus';
import { join } from 'path';
import { AppModule } from './app/app.module';

const globalPrefix = 'api';

bootstrapNestApplication({
  globalConfigurationOptions: {
    name: 'TerminusConfiguration',
    skipValidation: isInfrastructureMode(),
  },
  globalEnvironmentsOptions: {
    name: 'TerminusEnvironments',
    skipValidation: isInfrastructureMode(),
  },
  project: {
    name: 'Example',
    description: 'Example',
  },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(__dirname, '..', '..', '..', 'apps', 'example-terminus', PACKAGE_JSON_FILE),
          packageJsonFile: join(__dirname, '..', '..', '..', PACKAGE_JSON_FILE),
          envFile: join(__dirname, '..', '..', '..', '.env'),
        },
      }),
      DefaultNestApplicationInitializer.forRoot(),
      NestjsPinoLogger.forRoot(),
      TerminusHealthCheck.forRootAsync({
        configurationFactory: (memoryHealthIndicator: MemoryHealthIndicator) => ({
          standardHealthIndicator: [
            { name: 'memory_heap', check: () => memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024) },
          ],
        }),
        inject: [MemoryHealthIndicator],
      }),
      DefaultNestApplicationListener.forRoot({
        staticConfiguration: {
          mode: isInfrastructureMode() ? 'init' : 'listen',
          preListen: async ({ app }) => {
            if (app) {
              app.setGlobalPrefix(globalPrefix);
            }
          },
          postListen: async ({ current }) => {
            Logger.log(
              `🚀 Application is running on: http://${current.staticEnvironments?.hostname ?? 'localhost'}:${
                current.staticEnvironments?.port
              }/${globalPrefix}`
            );
          },
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
    // Disable infrastructure modules in production
    ...(!isProductionMode() || isInfrastructureMode()
      ? {
          infrastructure: [
            InfrastructureMarkdownReportGenerator.forRoot({
              staticConfiguration: {
                markdownFile: join(__dirname, '..', '..', '..', 'apps', 'example-terminus', 'INFRASTRUCTURE.MD'),
                skipEmptySettings: true,
              },
            }),
            RestInfrastructureHtmlReport.forRoot(),
            Pm2.forRoot({
              configuration: {
                ecosystemConfigFile: join(__dirname, '..', '..', '..', ECOSYSTEM_CONFIG_FILE),
                applicationScriptFile: join('dist/apps/example-terminus/main.js'),
              },
            }),
          ],
        }
      : {}),
  },
});