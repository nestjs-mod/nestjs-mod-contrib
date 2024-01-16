/* eslint-disable @nx/enforce-module-boundaries */

import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
} from '@nestjs-mod/common';
import { NestjsModAllReadmeGenerator } from '@nestjs-mod/reports';
import { join } from 'path';

bootstrapNestApplication({
  globalConfigurationOptions: {
    skipValidation: true,
  },
  globalEnvironmentsOptions: {
    skipValidation: true,
  },
  project: {
    name: 'nestjs-mod',
    description: 'A command line interface (CLI) for create and manipulation with NestJS-mod application',
  },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(__dirname, '..', '..', '..', 'apps', 'cli', PACKAGE_JSON_FILE),
          patchGlobalConfigurationAndEnvironmentsOptions: false,
          patchProject: false,
        },
      }),
      DefaultNestApplicationInitializer.forRoot(),
      DefaultNestApplicationListener.forRoot({
        staticConfiguration: {
          mode: 'init',
        },
      }),
    ],
    infrastructure: [
      InfrastructureMarkdownReportGenerator.forRoot({
        contextName: 'cli',
        staticConfiguration: {
          markdownFile: join(__dirname, '..', '..', '..', 'apps', 'cli', 'INFRASTRUCTURE.MD'),
          skipEmptySettings: false,
        },
      }),
      NestjsModAllReadmeGenerator.forRoot({
        contextName: 'nestjs-pino',
        staticConfiguration: {
          telegramGroup: 'https://t.me/nestjs_mod',
          packageFile: join(__dirname, '..', '..', '..', 'libs/system/nestjs-pino/package.json'),
          markdownFile: join(__dirname, '..', '..', '..', 'libs/system/nestjs-pino/README.md'),
          utilsFolders: [join(__dirname, '..', '..', '..', 'libs/system/nestjs-pino/src/lib')],
          modules: [import('@nestjs-mod/pino')],
        },
      }),
      NestjsModAllReadmeGenerator.forRoot({
        contextName: 'terminus',
        staticConfiguration: {
          telegramGroup: 'https://t.me/nestjs_mod',
          packageFile: join(__dirname, '..', '..', '..', 'libs/system/terminus/package.json'),
          markdownFile: join(__dirname, '..', '..', '..', 'libs/system/terminus/README.md'),
          utilsFolders: [join(__dirname, '..', '..', '..', 'libs/system/terminus/src/lib')],
          modules: [import('@nestjs-mod/terminus')],
        },
      }),
      NestjsModAllReadmeGenerator.forRoot({
        contextName: 'pm2',
        staticConfiguration: {
          telegramGroup: 'https://t.me/nestjs_mod',
          packageFile: join(__dirname, '..', '..', '..', 'libs/infrastructure/pm2/package.json'),
          markdownFile: join(__dirname, '..', '..', '..', 'libs/infrastructure/pm2/README.md'),
          utilsFolders: [join(__dirname, '..', '..', '..', 'libs/infrastructure/pm2/src/lib')],
          modules: [import('@nestjs-mod/pm2')],
        },
      }),
    ],
  },
});
