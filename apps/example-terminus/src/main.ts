/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  NestModuleCategory,
  bootstrapNestApplication,
  createNestModule,
  isProductionMode,
} from '@nestjs-mod/common';
import { NestjsPinoLogger } from '@nestjs-mod/pino';
import { RestInfrastructureHtmlReport } from '@nestjs-mod/reports';
import { TerminusHealthCheck } from '@nestjs-mod/terminus';
import { Logger } from '@nestjs/common';
import { MemoryHealthIndicator } from '@nestjs/terminus';
import { join } from 'path';
import { AppModule } from './app/app.module';

const globalPrefix = 'api';

bootstrapNestApplication({
  project: {
    name: 'Example',
    description: 'Example',
  },
  modules: {
    system: [
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
        staticEnvironments: { port: 3000 },
        staticConfiguration: {
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
    ...(!isProductionMode()
      ? {
          infrastructure: [
            InfrastructureMarkdownReportGenerator.forRoot({
              staticConfiguration: {
                markdownFile: join(__dirname, '..', '..', '..', 'apps', 'example-terminus', 'INFRASTRUCTURE.MD'),
              },
            }),
            RestInfrastructureHtmlReport.forRoot(),
          ],
        }
      : {}),
  },
});
