/* eslint-disable @nx/enforce-module-boundaries */

import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  ProjectUtils,
  bootstrapNestApplication,
} from '@nestjs-mod/common';
import { NESTJS_MOD_ALL_README_GENERATOR_FOOTER, NestjsModAllReadmeGenerator } from '@nestjs-mod/reports';
import { join } from 'path';

const rootFolder = join(__dirname, '..', '..', '..');

bootstrapNestApplication({
  project: {
    name: 'nestjs-mod',
    description: 'A command line interface (CLI) for create and manipulation with NestJS-mod application',
  },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: { updateProjectOptions: false },
      }),
      DefaultNestApplicationInitializer.forRoot(),
      DefaultNestApplicationListener.forRoot({
        staticConfiguration: {
          mode: 'silent',
        },
      }),
    ],
    infrastructure: [
      NestjsModAllReadmeGenerator.forRoot({
        contextName: 'authorizer',
        staticConfiguration: {
          telegramGroup: 'https://t.me/nestjs_mod',
          packageFile: join(rootFolder, 'libs/core/authorizer/package.json'),
          markdownFile: join(rootFolder, 'libs/core/authorizer/README.md'),
          folderWithMarkdownFilesToUse: join(rootFolder, 'libs/core/authorizer'),
          utilsFolders: [join(rootFolder, 'libs/core/authorizer/src/lib')],
          modules: [import('@nestjs-mod/authorizer')],
          markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
        },
      }),
      NestjsModAllReadmeGenerator.forRoot({
        contextName: 'minio',
        staticConfiguration: {
          telegramGroup: 'https://t.me/nestjs_mod',
          packageFile: join(rootFolder, 'libs/core/minio/package.json'),
          markdownFile: join(rootFolder, 'libs/core/minio/README.md'),
          folderWithMarkdownFilesToUse: join(rootFolder, 'libs/core/minio'),
          utilsFolders: [join(rootFolder, 'libs/core/minio/src/lib')],
          modules: [import('@nestjs-mod/minio')],
          markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
        },
      }),
      NestjsModAllReadmeGenerator.forRoot({
        contextName: 'graphql',
        staticConfiguration: {
          telegramGroup: 'https://t.me/nestjs_mod',
          packageFile: join(rootFolder, 'libs/system/graphql/package.json'),
          markdownFile: join(rootFolder, 'libs/system/graphql/README.md'),
          folderWithMarkdownFilesToUse: join(rootFolder, 'libs/system/graphql'),
          utilsFolders: [join(rootFolder, 'libs/system/graphql/src/lib')],
          modules: [import('@nestjs-mod/graphql')],
          markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
        },
      }),
      NestjsModAllReadmeGenerator.forRoot({
        contextName: 'prisma',
        staticConfiguration: {
          telegramGroup: 'https://t.me/nestjs_mod',
          packageFile: join(rootFolder, 'libs/core/prisma/package.json'),
          markdownFile: join(rootFolder, 'libs/core/prisma/README.md'),
          folderWithMarkdownFilesToUse: join(rootFolder, 'libs/core/prisma'),
          utilsFolders: [join(rootFolder, 'libs/core/prisma/src/lib')],
          modules: [import('@nestjs-mod/prisma')],
          markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
        },
      }),
      NestjsModAllReadmeGenerator.forRoot({
        contextName: 'cache-manager',
        staticConfiguration: {
          telegramGroup: 'https://t.me/nestjs_mod',
          packageFile: join(rootFolder, 'libs/core/cache-manager/package.json'),
          markdownFile: join(rootFolder, 'libs/core/cache-manager/README.md'),
          folderWithMarkdownFilesToUse: join(rootFolder, 'libs/core/cache-manager'),
          utilsFolders: [join(rootFolder, 'libs/core/cache-manager/src/lib')],
          modules: [import('@nestjs-mod/cache-manager')],
          markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
        },
      }),
      NestjsModAllReadmeGenerator.forRoot({
        contextName: 'nestjs-pino',
        staticConfiguration: {
          telegramGroup: 'https://t.me/nestjs_mod',
          packageFile: join(rootFolder, 'libs/system/nestjs-pino/package.json'),
          markdownFile: join(rootFolder, 'libs/system/nestjs-pino/README.md'),
          folderWithMarkdownFilesToUse: join(rootFolder, 'libs/system/nestjs-pino'),
          utilsFolders: [join(rootFolder, 'libs/system/nestjs-pino/src/lib')],
          modules: [import('@nestjs-mod/pino')],
          markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
        },
      }),
      NestjsModAllReadmeGenerator.forRoot({
        contextName: 'terminus',
        staticConfiguration: {
          telegramGroup: 'https://t.me/nestjs_mod',
          packageFile: join(rootFolder, 'libs/system/terminus/package.json'),
          markdownFile: join(rootFolder, 'libs/system/terminus/README.md'),
          folderWithMarkdownFilesToUse: join(rootFolder, 'libs/system/terminus'),
          utilsFolders: [join(rootFolder, 'libs/system/terminus/src/lib')],
          modules: [import('@nestjs-mod/terminus')],
          markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
        },
      }),
      NestjsModAllReadmeGenerator.forRoot({
        contextName: 'pm2',
        staticConfiguration: {
          telegramGroup: 'https://t.me/nestjs_mod',
          packageFile: join(rootFolder, 'libs/infrastructure/pm2/package.json'),
          markdownFile: join(rootFolder, 'libs/infrastructure/pm2/README.md'),
          folderWithMarkdownFilesToUse: join(rootFolder, 'libs/infrastructure/pm2'),
          utilsFolders: [join(rootFolder, 'libs/infrastructure/pm2/src/lib')],
          modules: [import('@nestjs-mod/pm2')],
          markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
        },
      }),
      NestjsModAllReadmeGenerator.forRoot({
        contextName: 'docker-compose',
        staticConfiguration: {
          telegramGroup: 'https://t.me/nestjs_mod',
          packageFile: join(rootFolder, 'libs/infrastructure/docker-compose/package.json'),
          markdownFile: join(rootFolder, 'libs/infrastructure/docker-compose/README.md'),
          folderWithMarkdownFilesToUse: join(rootFolder, 'libs/infrastructure/docker-compose'),
          utilsFolders: [join(rootFolder, 'libs/infrastructure/docker-compose/src/lib')],
          modules: [import('@nestjs-mod/docker-compose')],
          markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
        },
      }),
      NestjsModAllReadmeGenerator.forRoot({
        contextName: 'flyway',
        staticConfiguration: {
          telegramGroup: 'https://t.me/nestjs_mod',
          packageFile: join(rootFolder, 'libs/infrastructure/flyway/package.json'),
          markdownFile: join(rootFolder, 'libs/infrastructure/flyway/README.md'),
          folderWithMarkdownFilesToUse: join(rootFolder, 'libs/infrastructure/flyway'),
          utilsFolders: [join(rootFolder, 'libs/infrastructure/flyway/src/lib')],
          modules: [import('@nestjs-mod/flyway')],
          markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
        },
      }),
    ],
  },
});
