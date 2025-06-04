import {
  bootstrapNestApplication,
  createNestModule,
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  ProjectUtils,
} from '@nestjs-mod/common';
import { NESTJS_MOD_ALL_README_GENERATOR_FOOTER, NestjsModAllReadmeGenerator } from '@nestjs-mod/reports';
import { join } from 'path';

import { FILES_EXTRA_MODELS, FilesModule } from '@nestjs-mod/files';
import { NOTIFICATIONS_EXTRA_MODELS, NotificationsModule } from '@nestjs-mod/notifications';
import { TwoFactorModule } from '@nestjs-mod/two-factor';
import { WEBHOOK_EXTRA_MODELS, WebhookModule } from '@nestjs-mod/webhook';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { camelCase, upperCamelCase } from 'case-anything';
import { spawnSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, rmdirSync, rmSync, writeFileSync } from 'node:fs';

const rootFolder = join(__dirname, '..', '..', '..');

if (process.env['GENERATE_SWAGGER_JSON'] === 'true') {
  process.env.NESTJS_MODE = 'infrastructure';
  process.env.WEBHOOK_DATABASE_URL = 'url';
  process.env.TWO_FACTOR_DATABASE_URL = 'url';
  process.env.NOTIFICATIONS_DATABASE_URL = 'url';

  const swaggerJsonGenerator = async (module: any, name: string, extraModels: any) => {
    spawnSync(
      join(rootFolder, 'node_modules/.bin/prisma'),
      `generate --schema=./libs/feature/${name}/src/prisma/schema.prisma`.split(' ')
    );

    let app: INestApplication | null = await NestFactory.create(module.forRoot());
    app.setGlobalPrefix('api');
    const swaggerConf = new DocumentBuilder().addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, swaggerConf, {
      extraModels: [...extraModels],
    });
    SwaggerModule.setup('swagger', app, document);
    writeFileSync(join(rootFolder, `libs/feature/${name}`, 'swagger.json'), JSON.stringify(document));
    app.close();
    app = null;
  };

  const swaggerSdkGenerator = async (name: string) => {
    const Name = upperCamelCase(name);
    const naMe = camelCase(name);
    if (existsSync(join(rootFolder, `./libs/feature/${name}-afat`))) {
      if (existsSync(join(rootFolder, `./libs/feature/${name}-afat/src/lib/generated/rest-sdk`))) {
        rmdirSync(join(rootFolder, `./libs/feature/${name}-afat/src/lib/generated/rest-sdk`), { recursive: true });
      }
      if (
        existsSync(join(rootFolder, `./libs/feature/${name}-afat/src/lib/generated/${name}-rest_sdk-angular.module.ts`))
      ) {
        rmSync(join(rootFolder, `./libs/feature/${name}-afat/src/lib/generated/${name}-rest_sdk-angular.module.ts`), {
          recursive: true,
        });
      }
      mkdirSync(join(rootFolder, `./libs/feature/${name}-afat/src/lib/generated/rest-sdk`), { recursive: true });
      spawnSync(
        join(rootFolder, 'node_modules/.bin/openapi-generator-cli'),
        `generate -i ./libs/feature/${name}/swagger.json -g typescript-angular -o ./libs/feature/${name}-afat/src/lib/generated/rest-sdk --skip-validate-spec --additional-properties=apiModulePrefix=${Name}RestClient,configurationPrefix=${Name}RestClient,fileNaming=kebab-case,modelFileSuffix=.interface,modelSuffix=Interface,enumNameSuffix=Type,enumPropertyNaming=original,serviceFileSuffix=-rest.service,serviceSuffix=RestService`.split(
          ' '
        )
      );
      rmSync(join(rootFolder, `./libs/feature/${name}-afat/src/lib/generated/rest-sdk/README.md`), { recursive: true });
      writeFileSync(
        join(rootFolder, `./libs/feature/${name}-afat/src/lib/generated/${name}-rest_sdk-angular.module.ts`),
        `import { NgModule, Injectable } from '@angular/core';
import {
  ${Name}RestClientApiModule,
  ${Name}RestClientConfiguration,
  ${Name}RestService,
} from './rest-sdk';
import { HttpHeaders } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ${Name}RestSdkAngularService {
  constructor(
    private readonly ${naMe}RestClientConfiguration: ${Name}RestClientConfiguration,
    private readonly ${naMe}RestService: ${Name}RestService
  ) {
    ${naMe}RestService.configuration.withCredentials = true;
  }

  get${Name}Api() {
    if (!this.${naMe}RestService) {
      throw new Error('${naMe}Api not set');
    }
    return this.${naMe}RestService;
  }

  updateHeaders(headers: Record<string, string>) {
    this.${naMe}RestService.defaultHeaders = new HttpHeaders(headers);
  }

  webSocket<T>({
    path,
    eventName,
    options,
  }: {
    path: string;
    eventName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any;
  }) {
    const wss = new WebSocket(
      (this.${naMe}RestClientConfiguration.basePath || '')
        .replace('/api', '')
        .replace('http', 'ws') + path,
      options
    );
    return new Observable<{ data: T; event: string }>((observer) => {
      wss.addEventListener('open', () => {
        wss.addEventListener('message', ({ data }) => {
          observer.next(JSON.parse(data.toString()));
        });
        wss.addEventListener('error', (err) => {
          observer.error(err);
          if (wss?.readyState == WebSocket.OPEN) {
            wss.close();
          }
        });
        wss.send(
          JSON.stringify({
            event: eventName,
            data: true,
          })
        );
      });
    }).pipe(
      finalize(() => {
        if (wss?.readyState == WebSocket.OPEN) {
          wss.close();
        }
      })
    );
  }
}

@NgModule({})
export class ${Name}RestSdkAngularModule {
  public static forRoot(configuration: Partial<${Name}RestClientConfiguration>) {
    const ${naMe}RestClientConfiguration = new ${Name}RestClientConfiguration(
      configuration
    );
    const ${naMe}RestClientApiModule = ${Name}RestClientApiModule.forRoot(
      () => ${naMe}RestClientConfiguration
    );
    return {
      ngModule: ${Name}RestSdkAngularModule,
      providers: [
        {
          provide: ${Name}RestClientConfiguration,
          useValue: ${naMe}RestClientConfiguration,
        },
      ],
      imports: [${naMe}RestClientApiModule],
      exports: [${naMe}RestClientApiModule, ${Name}RestClientConfiguration],
    };
  }
}
`
      );
    }
    if (existsSync(join(rootFolder, `./libs/feature/${name}`))) {
      if (existsSync(join(rootFolder, `./libs/feature/${name}/src/lib/generated/rest-sdk`))) {
        rmdirSync(join(rootFolder, `./libs/feature/${name}/src/lib/generated/rest-sdk`), { recursive: true });
      }
      if (existsSync(join(rootFolder, `./libs/feature/${name}/src/lib/generated/${name}-rest_sdk.module.ts`))) {
        rmSync(join(rootFolder, `./libs/feature/${name}/src/lib/generated/${name}-rest_sdk.module.ts`), {
          recursive: true,
        });
      }
      mkdirSync(join(rootFolder, `./libs/feature/${name}/src/lib/generated/rest-sdk`), { recursive: true });
      spawnSync(
        join(rootFolder, 'node_modules/.bin/openapi-generator-cli'),
        `generate -i ./libs/feature/${name}/swagger.json --skip-validate-spec -g typescript-axios -o ./libs/feature/${name}/src/lib/generated/rest-sdk`.split(
          ' '
        )
      );
      rmdirSync(join(rootFolder, `./libs/feature/${name}/src/lib/generated/rest-sdk/docs`), { recursive: true });
      writeFileSync(
        join(rootFolder, `./libs/feature/${name}/src/lib/generated/${name}-rest_sdk.module.ts`),
        `import axios, { AxiosInstance } from 'axios';
import { Observable, finalize } from 'rxjs';

import WebSocket from 'ws';
import {
  Configuration,
  ${Name}Api,
} from './rest-sdk';

export class ${Name}RestSdkService {
  private ${naMe}Api?: ${Name}Api;
  private ${naMe}ApiAxios?: AxiosInstance;

  private wsHeaders: Record<string, string> = {};

  constructor(
    private options?: {
      serverUrl?: string;
      headers?: Record<string, string>;
    }
  ) {
    this.createApiClients();
    this.updateHeaders(options?.headers || {});
  }

  get${Name}Api() {
    if (!this.${naMe}Api) {
      throw new Error('${naMe}Api not set');
    }
    return this.${naMe}Api;
  }

  updateHeaders(headers: Record<string, string>) {
    Object.assign(this.wsHeaders, headers);

    if (this.${naMe}ApiAxios) {
      Object.assign(this.${naMe}ApiAxios.defaults.headers.common, headers);
    }
  }

  webSocket<T>({
    path,
    eventName,
    options,
  }: {
    path: string;
    eventName: string;
    options?: WebSocket.ClientOptions;
  }) {
    const wss = new WebSocket(
      this.options?.serverUrl?.replace('/api', '').replace('http', 'ws') + path,
      {
        ...(options || {}),
        headers: this.wsHeaders || {},
      }
    );
    return new Observable<{ data: T; event: string }>((observer) => {
      wss.on('open', () => {
        wss.on('message', (data) => {
          observer.next(JSON.parse(data.toString()));
        });
        wss.on('error', (err) => {
          observer.error(err);
          if (wss?.readyState == WebSocket.OPEN) {
            wss.close();
          }
        });
        wss.send(
          JSON.stringify({
            event: eventName,
            data: true,
          })
        );
      });
    }).pipe(
      finalize(() => {
        if (wss?.readyState == WebSocket.OPEN) {
          wss.close();
        }
      })
    );
  }

  private createApiClients() {
    this.${naMe}ApiAxios = axios.create();
    this.${naMe}Api = new ${Name}Api(
      new Configuration({
        basePath: this.options?.serverUrl,
      }),
      undefined,
      this.${naMe}ApiAxios
    );
  }
}
`
      );
    }
  };

  const main = async () => {
    await swaggerJsonGenerator(WebhookModule, 'webhook', WEBHOOK_EXTRA_MODELS);
    // await swaggerJsonGenerator(TwoFactorModule, 'two-factor', TWO_FACTOR_EXTRA_MODELS);
    await swaggerJsonGenerator(
      createNestModule({
        moduleName: 'RootFilesModule',
        imports: [WebhookModule.forRoot(), TwoFactorModule.forRoot(), FilesModule.forRoot()],
      }).RootFilesModule,
      'files',
      FILES_EXTRA_MODELS
    );
    await swaggerJsonGenerator(
      createNestModule({
        moduleName: 'RootNotificationsModule',
        imports: [WebhookModule.forRoot(), TwoFactorModule.forRoot(), NotificationsModule.forRoot()],
      }).RootNotificationsModule,
      'notifications',
      NOTIFICATIONS_EXTRA_MODELS
    );

  const files2: string[] = [
    'libs/feature/notifications/src/lib/generated/prisma-client/internal/class.ts',
    'libs/feature/two-factor/src/lib/generated/prisma-client/internal/class.ts',
    'libs/feature/webhook/src/lib/generated/prisma-client/internal/class.ts',
  ];
  for (let file of files2) {
    writeFileSync(
      file,
      readFileSync(file)
        .toString()
        .split('("@prisma/client/runtime')
        .join('("node_modules/@prisma/client/runtime')
        .split('require.resolve(')
        .join("(await import('node:path')).resolve(")
    );
  }

    await swaggerSdkGenerator('files');
    await swaggerSdkGenerator('webhook');
    // await swaggerSdkGenerator('two-factor');
    await swaggerSdkGenerator('notifications');

    spawnSync(join(rootFolder, 'node_modules/.bin/rucken'), `make-ts-list`.split(' '));

    process.exit();
  };

  main();
} else {
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
          contextName: 'files-afat',
          staticConfiguration: {
            telegramGroup: 'https://t.me/nestjs_mod',
            discord: 'https://discord.gg/meY7UXaG',
            packageFile: join(rootFolder, 'libs/feature/files-afat/package.json'),
            markdownFile: join(rootFolder, 'libs/feature/files-afat/README.md'),
            folderWithMarkdownFilesToUse: join(rootFolder, 'libs/feature/files-afat'),
            utilsFolders: [join(rootFolder, 'libs/feature/files-afat/src/lib')],
            modules: [],
            markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
          },
        }),
        NestjsModAllReadmeGenerator.forRoot({
          contextName: 'webhook-afat',
          staticConfiguration: {
            telegramGroup: 'https://t.me/nestjs_mod',
            discord: 'https://discord.gg/meY7UXaG',
            packageFile: join(rootFolder, 'libs/feature/webhook-afat/package.json'),
            markdownFile: join(rootFolder, 'libs/feature/webhook-afat/README.md'),
            folderWithMarkdownFilesToUse: join(rootFolder, 'libs/feature/webhook-afat'),
            utilsFolders: [join(rootFolder, 'libs/feature/webhook-afat/src/lib')],
            modules: [],
            markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
          },
        }),
        NestjsModAllReadmeGenerator.forRoot({
          contextName: 'files',
          staticConfiguration: {
            telegramGroup: 'https://t.me/nestjs_mod',
            discord: 'https://discord.gg/meY7UXaG',
            packageFile: join(rootFolder, 'libs/feature/files/package.json'),
            markdownFile: join(rootFolder, 'libs/feature/files/README.md'),
            folderWithMarkdownFilesToUse: join(rootFolder, 'libs/feature/files'),
            utilsFolders: [join(rootFolder, 'libs/feature/files/src/lib')],
            modules: [import('@nestjs-mod/files')],
            markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
          },
        }),
        NestjsModAllReadmeGenerator.forRoot({
          contextName: 'notifications',
          staticConfiguration: {
            telegramGroup: 'https://t.me/nestjs_mod',
            discord: 'https://discord.gg/meY7UXaG',
            packageFile: join(rootFolder, 'libs/feature/notifications/package.json'),
            markdownFile: join(rootFolder, 'libs/feature/notifications/README.md'),
            folderWithMarkdownFilesToUse: join(rootFolder, 'libs/feature/notifications'),
            utilsFolders: [join(rootFolder, 'libs/feature/notifications/src/lib')],
            modules: [import('@nestjs-mod/notifications')],
            markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
          },
        }),
        NestjsModAllReadmeGenerator.forRoot({
          contextName: 'two-factor',
          staticConfiguration: {
            telegramGroup: 'https://t.me/nestjs_mod',
            discord: 'https://discord.gg/meY7UXaG',
            packageFile: join(rootFolder, 'libs/feature/two-factor/package.json'),
            markdownFile: join(rootFolder, 'libs/feature/two-factor/README.md'),
            folderWithMarkdownFilesToUse: join(rootFolder, 'libs/feature/two-factor'),
            utilsFolders: [join(rootFolder, 'libs/feature/two-factor/src/lib')],
            modules: [import('@nestjs-mod/two-factor')],
            markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
          },
        }),
        NestjsModAllReadmeGenerator.forRoot({
          contextName: 'webhook',
          staticConfiguration: {
            telegramGroup: 'https://t.me/nestjs_mod',
            discord: 'https://discord.gg/meY7UXaG',
            packageFile: join(rootFolder, 'libs/feature/webhook/package.json'),
            markdownFile: join(rootFolder, 'libs/feature/webhook/README.md'),
            folderWithMarkdownFilesToUse: join(rootFolder, 'libs/feature/webhook'),
            utilsFolders: [join(rootFolder, 'libs/feature/webhook/src/lib')],
            modules: [import('@nestjs-mod/webhook')],
            markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
          },
        }),
        NestjsModAllReadmeGenerator.forRoot({
          contextName: 'validation',
          staticConfiguration: {
            telegramGroup: 'https://t.me/nestjs_mod',
            discord: 'https://discord.gg/meY7UXaG',
            packageFile: join(rootFolder, 'libs/core/validation/package.json'),
            markdownFile: join(rootFolder, 'libs/core/validation/README.md'),
            folderWithMarkdownFilesToUse: join(rootFolder, 'libs/core/validation'),
            utilsFolders: [join(rootFolder, 'libs/core/validation/src/lib')],
            modules: [import('@nestjs-mod/validation')],
            markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
          },
        }),
        NestjsModAllReadmeGenerator.forRoot({
          contextName: 'prisma-tools',
          staticConfiguration: {
            telegramGroup: 'https://t.me/nestjs_mod',
            discord: 'https://discord.gg/meY7UXaG',
            packageFile: join(rootFolder, 'libs/core/prisma-tools/package.json'),
            markdownFile: join(rootFolder, 'libs/core/prisma-tools/README.md'),
            folderWithMarkdownFilesToUse: join(rootFolder, 'libs/core/prisma-tools'),
            utilsFolders: [join(rootFolder, 'libs/core/prisma-tools/src/lib')],
            modules: [import('@nestjs-mod/prisma-tools')],
            markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
          },
        }),
        NestjsModAllReadmeGenerator.forRoot({
          contextName: 'swagger',
          staticConfiguration: {
            telegramGroup: 'https://t.me/nestjs_mod',
            discord: 'https://discord.gg/meY7UXaG',
            packageFile: join(rootFolder, 'libs/system/swagger/package.json'),
            markdownFile: join(rootFolder, 'libs/system/swagger/README.md'),
            folderWithMarkdownFilesToUse: join(rootFolder, 'libs/system/swagger'),
            utilsFolders: [join(rootFolder, 'libs/system/swagger/src/lib')],
            modules: [import('@nestjs-mod/swagger')],
            markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
          },
        }),
        NestjsModAllReadmeGenerator.forRoot({
          contextName: 'afat',
          staticConfiguration: {
            telegramGroup: 'https://t.me/nestjs_mod',
            discord: 'https://discord.gg/meY7UXaG',
            packageFile: join(rootFolder, 'libs/feature/afat/package.json'),
            markdownFile: join(rootFolder, 'libs/feature/afat/README.md'),
            folderWithMarkdownFilesToUse: join(rootFolder, 'libs/feature/afat'),
            utilsFolders: [join(rootFolder, 'libs/feature/afat/src/lib')],
            modules: [],
            markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
          },
        }),
        NestjsModAllReadmeGenerator.forRoot({
          contextName: 'supabase',
          staticConfiguration: {
            telegramGroup: 'https://t.me/nestjs_mod',
            discord: 'https://discord.gg/meY7UXaG',
            packageFile: join(rootFolder, 'libs/core/supabase/package.json'),
            markdownFile: join(rootFolder, 'libs/core/supabase/README.md'),
            folderWithMarkdownFilesToUse: join(rootFolder, 'libs/core/supabase'),
            utilsFolders: [join(rootFolder, 'libs/core/supabase/src/lib')],
            modules: [import('@nestjs-mod/supabase')],
            markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
          },
        }),
        NestjsModAllReadmeGenerator.forRoot({
          contextName: 'sso',
          staticConfiguration: {
            telegramGroup: 'https://t.me/nestjs_mod',
            discord: 'https://discord.gg/meY7UXaG',
            packageFile: join(rootFolder, 'libs/core/sso/package.json'),
            markdownFile: join(rootFolder, 'libs/core/sso/README.md'),
            folderWithMarkdownFilesToUse: join(rootFolder, 'libs/core/sso'),
            utilsFolders: [join(rootFolder, 'libs/core/sso/src/lib')],
            modules: [import('@nestjs-mod/sso')],
            markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
          },
        }),
        NestjsModAllReadmeGenerator.forRoot({
          contextName: 'authorizer',
          staticConfiguration: {
            telegramGroup: 'https://t.me/nestjs_mod',
            discord: 'https://discord.gg/meY7UXaG',
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
            discord: 'https://discord.gg/meY7UXaG',
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
            discord: 'https://discord.gg/meY7UXaG',
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
            discord: 'https://discord.gg/meY7UXaG',
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
            discord: 'https://discord.gg/meY7UXaG',
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
            discord: 'https://discord.gg/meY7UXaG',
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
            discord: 'https://discord.gg/meY7UXaG',
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
            discord: 'https://discord.gg/meY7UXaG',
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
            discord: 'https://discord.gg/meY7UXaG',
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
            discord: 'https://discord.gg/meY7UXaG',
            packageFile: join(rootFolder, 'libs/infrastructure/flyway/package.json'),
            markdownFile: join(rootFolder, 'libs/infrastructure/flyway/README.md'),
            folderWithMarkdownFilesToUse: join(rootFolder, 'libs/infrastructure/flyway'),
            utilsFolders: [join(rootFolder, 'libs/infrastructure/flyway/src/lib')],
            modules: [import('@nestjs-mod/flyway')],
            markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
          },
        }),
        NestjsModAllReadmeGenerator.forRoot({
          contextName: 'keyv',
          staticConfiguration: {
            telegramGroup: 'https://t.me/nestjs_mod',
            discord: 'https://discord.gg/meY7UXaG',
            packageFile: join(rootFolder, 'libs/core/keyv/package.json'),
            markdownFile: join(rootFolder, 'libs/core/keyv/README.md'),
            folderWithMarkdownFilesToUse: join(rootFolder, 'libs/core/keyv'),
            utilsFolders: [join(rootFolder, 'libs/core/keyv/src/lib')],
            modules: [import('@nestjs-mod/keyv')],
            markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
          },
        }),
        NestjsModAllReadmeGenerator.forRoot({
          contextName: 'pg-flyway',
          staticConfiguration: {
            telegramGroup: 'https://t.me/nestjs_mod',
            discord: 'https://discord.gg/meY7UXaG',
            packageFile: join(rootFolder, 'libs/infrastructure/pg-flyway/package.json'),
            markdownFile: join(rootFolder, 'libs/infrastructure/pg-flyway/README.md'),
            folderWithMarkdownFilesToUse: join(rootFolder, 'libs/infrastructure/pg-flyway'),
            utilsFolders: [join(rootFolder, 'libs/infrastructure/pg-flyway/src/lib')],
            modules: [import('@nestjs-mod/pg-flyway')],
            markdownFooter: NESTJS_MOD_ALL_README_GENERATOR_FOOTER,
          },
        }),
      ],
    },
  });
}
