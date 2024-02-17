import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
  isInfrastructureMode,
} from '@nestjs-mod/common';
import { FastifyNestApplicationInitializer, FastifyNestApplicationListener } from '@nestjs-mod/fastify';
import { GRAPHQL_SCHEMA_FILE, GraphqlModule } from '@nestjs-mod/graphql';
import { NestjsPinoLoggerModule } from '@nestjs-mod/pino';
import { ECOSYSTEM_CONFIG_FILE, Pm2 } from '@nestjs-mod/pm2';
import { TerminusHealthCheckModule } from '@nestjs-mod/terminus';
import { MemoryHealthIndicator } from '@nestjs/terminus';
import { join } from 'path';
import { AppModule } from './app/app.module';

const platform = process.env.PLATFORM === 'fastify' ? 'fastify' : 'express';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-graphql');

bootstrapNestApplication({
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(appFolder, PACKAGE_JSON_FILE),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, '.env'),
        },
      }),
      platform === 'express'
        ? DefaultNestApplicationInitializer.forRoot({ staticConfiguration: { bufferLogs: true } })
        : FastifyNestApplicationInitializer.forRoot({ staticConfiguration: { bufferLogs: true } }),
      NestjsPinoLoggerModule.forRoot(),
      TerminusHealthCheckModule.forRootAsync({
        configurationFactory: (memoryHealthIndicator: MemoryHealthIndicator) => ({
          standardHealthIndicators: [
            { name: 'memory_heap', check: () => memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024) },
          ],
        }),
        inject: [MemoryHealthIndicator],
      }),
      platform === 'express'
        ? DefaultNestApplicationListener.forRoot({
            staticConfiguration: {
              // When running in infrastructure mode, the backend server does not start.
              mode: isInfrastructureMode() ? 'silent' : 'listen',
            },
          })
        : FastifyNestApplicationListener.forRoot({
            staticConfiguration: {
              // When running in infrastructure mode, the backend server does not start.
              mode: isInfrastructureMode() ? 'silent' : 'listen',
            },
          }),
      GraphqlModule.forRoot({
        configuration: {
          autoSchemaFile: join(appFolder, GRAPHQL_SCHEMA_FILE),
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
      Pm2.forRoot({
        configuration: {
          ecosystemConfigFile: join(rootFolder, ECOSYSTEM_CONFIG_FILE),
          applicationScriptFile: join('dist/apps/example-graphql/main.js'),
        },
      }),
    ],
  },
});
