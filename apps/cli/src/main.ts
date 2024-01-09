/* eslint-disable @nx/enforce-module-boundaries */

import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  bootstrapNestApplication,
} from '@nestjs-mod/common';
import { NestjsModAllReadmeGenerator } from '@nestjs-mod/reports';
import { join } from 'path';

bootstrapNestApplication({
  project: {
    name: 'nestjs-mod',
    description:
      'A command line interface (CLI) for create and manipulation with NestJS-mod application',
  },
  modules: {
    system: [
      DefaultNestApplicationInitializer.forRoot(),
      DefaultNestApplicationListener.forRoot({
        staticEnvironments: { port: 3000 },
        staticConfiguration: { mode: 'init' },
      }),
    ],
    infrastructure: [
      NestjsModAllReadmeGenerator.forRoot({
        name: 'nestjs-pino',
        configuration: {
          telegramGroup: 'https://t.me/nestjs_mod',
          packageFile: join(
            __dirname,
            '..',
            '..',
            '..',
            'libs/system/nestjs-pino/package.json'
          ),
          markdownFile: join(
            __dirname,
            '..',
            '..',
            '..',
            'libs/system/nestjs-pino/README.md'
          ),
          utilsFolders: [
            join(__dirname, '..', '..', '..', 'libs/system/nestjs-pino/src/lib'),
          ],
          modules: [import('@nestjs-mod/pino')],
        },
      }),
    ],
  },
});
