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
} from '@nestjs-mod/common';
import { RestInfrastructureHtmlReport } from '@nestjs-mod/reports';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { AppModule } from './app/app.module';
import { NestjsPinoLogger } from '@nestjs-mod/pino'


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
              `🚀 Application is running on: http://${current.staticEnvironments?.hostname ?? 'localhost'
              }:${current.staticEnvironments?.port}/${globalPrefix}`
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
        imports: [
          AppModule,
        ],
      }).AppModule.forRootAsync(),
    ],
    // Disable infrastructure modules in production
    ...(process.env['NODE_ENV'] !== 'production'
      ? {
        infrastructure: [
          InfrastructureMarkdownReportGenerator.forRoot({
            staticConfiguration: {
              markdownFile: join(
                __dirname,
                '..',
                '..',
                '..',
                'apps',
                'example-pino-logger',
                'INFRASTRUCTURE.MD'
              ),
            },
          }),
          RestInfrastructureHtmlReport.forRoot(),
        ],
      }
      : {}),
  },
});
