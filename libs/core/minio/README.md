
# @nestjs-mod/minio

Minio client for NestJS-mod (Wrapper for https://www.npmjs.com/package/nestjs-minio)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save minio@7.1.3 nestjs-minio@2.5.4 @nestjs-mod/minio
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [MinioModule](#miniomodule) | core | Minio client for NestJS-mod (Wrapper for https://www.npmjs.com/package/nestjs-minio) |


## Modules descriptions

### MinioModule
Minio client for NestJS-mod (Wrapper for https://www.npmjs.com/package/nestjs-minio)

#### Use in NestJS
A simple example of generating a link to upload and download a picture.

```typescript
import { NestFactory } from '@nestjs/core';

import { DefaultBucketNames, MinioFilesService, MinioModule, PresignedUrlsRequest } from '@nestjs-mod/minio';
import { Controller, Get, Module, Query } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly minioFilesService: MinioFilesService) {}

  @Get('images-presigned-url')
  getImagesPresignedUrl(@Query() request: PresignedUrlsRequest) {
    return this.minioFilesService.getPresignedUrls({
      bucketName: DefaultBucketNames.images,
      expiry: 60,
      ext: request.ext,
    });
  }

  @Get('video-presigned-url')
  getVideoPresignedUrl(@Query() request: PresignedUrlsRequest) {
    return this.minioFilesService.getPresignedUrls({
      bucketName: DefaultBucketNames.video,
      expiry: 60,
      ext: request.ext,
    });
  }

  @Get('documents-presigned-url')
  getDocumentsPresignedUrl(@Query() request: PresignedUrlsRequest) {
    return this.minioFilesService.getPresignedUrls({
      bucketName: DefaultBucketNames.documents,
      expiry: 60,
      ext: request.ext,
    });
  }
}

process.env.MINIO_SERVER_HOST = 'localhost';
process.env.MINIO_SERVER_PORT = '9000';
process.env.MINIO_ACCESS_KEY = 'minioadmin';
process.env.MINIO_SECRET_KEY = '6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgppq';
process.env.MINIO_USE_SSL = 'false';
process.env.MINIO_DEFAULT_USER_ID = 'default';

@Module({
  imports: [MinioModule.forRoot()],
  controllers: [AppController],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const appController = app.get<AppController>(AppController);
  console.log(await lastValueFrom(appController.getImagesPresignedUrl({ ext: 'png' })));
  /**
   * output:
   * {
   *   uploadUrl: '/images/default/images_ac98618c-f2ec-4a2f-a4a8-a4690e8fd543.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240213T071934Z&X-Amz-Expires=60&X-Amz-SignedHeaders=host&X-Amz-Signature=ea5c4246876c0c15a57e7c6cb0035fb3122c4887b052d2138d643f3e88e8a4c3',
   *   downloadUrl: '/images/default/images_ac98618c-f2ec-4a2f-a4a8-a4690e8fd543.png'
   * }
   */
}

bootstrap();
```


#### Use in NestJS-mod
An example of using Minio, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-minio and frontend on Angular here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-minio-angular.

For work with Minio, you must first connect the Docker Compose module and the Docker Compose module to work with the Minio.

```typescript
import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
  createNestModule,
  isInfrastructureMode,
} from '@nestjs-mod/common';
import { DefaultBucketNames, MinioFilesService, MinioModule, PresignedUrlsRequest } from '@nestjs-mod/minio';
import { Controller, Get, Query } from '@nestjs/common';
import { join } from 'path';
import { lastValueFrom } from 'rxjs';
import { userFeatureName } from './app/app.constants';

import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposeMinio } from '@nestjs-mod/docker-compose';

@Controller()
export class AppController {
  constructor(private readonly minioFilesService: MinioFilesService) {}

  @Get('images-presigned-url')
  getImagesPresignedUrl(@Query() request: PresignedUrlsRequest) {
    return this.minioFilesService.getPresignedUrls({
      bucketName: DefaultBucketNames.images,
      expiry: 60,
      ext: request.ext,
    });
  }

  @Get('video-presigned-url')
  getVideoPresignedUrl(@Query() request: PresignedUrlsRequest) {
    return this.minioFilesService.getPresignedUrls({
      bucketName: DefaultBucketNames.video,
      expiry: 60,
      ext: request.ext,
    });
  }

  @Get('documents-presigned-url')
  getDocumentsPresignedUrl(@Query() request: PresignedUrlsRequest) {
    return this.minioFilesService.getPresignedUrls({
      bucketName: DefaultBucketNames.documents,
      expiry: 60,
      ext: request.ext,
    });
  }
}

const { AppModule } = createNestModule({
  moduleName: 'AppModule',
  imports: [MinioModule.forFeature()],
  controllers: [AppController],
});

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-minio');

bootstrapNestApplication({
  globalConfigurationOptions: { debug: true },
  globalEnvironmentsOptions: { debug: true },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(appFolder, PACKAGE_JSON_FILE),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, '.env'),
        },
      }),
      DefaultNestApplicationInitializer.forRoot({
        staticConfiguration: {
          bufferLogs: true,
        },
      }),
      DefaultNestApplicationListener.forRoot({
        staticConfiguration: {
          // When running in infrastructure mode, the backend server does not start.
          mode: isInfrastructureMode() ? 'silent' : 'listen',
          postListen: async ({ app }) => {
            if (app) {
              const appController = app.get<AppController>(AppController);
              console.log(await lastValueFrom(appController.getImagesPresignedUrl({ ext: 'png' })));
              /**
               * output:
               * {
               *   uploadUrl: '/images/default/images_ac98618c-f2ec-4a2f-a4a8-a4690e8fd543.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240213T071934Z&X-Amz-Expires=60&X-Amz-SignedHeaders=host&X-Amz-Signature=ea5c4246876c0c15a57e7c6cb0035fb3122c4887b052d2138d643f3e88e8a4c3',
               *   downloadUrl: '/images/default/images_ac98618c-f2ec-4a2f-a4a8-a4690e8fd543.png'
               * }
               */
            }
          },
        },
      }),
    ],
    core: [MinioModule.forRoot()],
    feature: [AppModule.forRoot()],
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
          dockerComposeFile: join(appFolder, DOCKER_COMPOSE_FILE),
        },
      }),
      DockerComposeMinio.forRoot({
        staticConfiguration: {
          nginxPort: 1111,
          nginxFilesFolder: join(appFolder, 'ngnix'),
          featureName: userFeatureName,
        },
      }),
    ],
  },
});
```

New environment variable

```bash
EXAMPLE_MINIO_MINIO_SERVER_HOST=localhost
EXAMPLE_MINIO_MINIO_SERVER_PORT=9000
EXAMPLE_MINIO_MINIO_ACCESS_KEY=minioadmin
EXAMPLE_MINIO_MINIO_SECRET_KEY=6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgppq
EXAMPLE_MINIO_MINIO_USE_SSL=false
EXAMPLE_MINIO_MINIO_DEFAULT_USER_ID=default
EXAMPLE_MINIO_PORT=3006
EXAMPLE_MINIO_HOSTNAME=
```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.


#### Shared providers
`MinioService`, `MinioFilesService`

#### Static environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`minioServerHost`|Server host|`obj['minioServerHost']`, `process.env['MINIO_SERVER_HOST']`|**isNotEmpty** (minioServerHost should not be empty)|-|-|
|`minioServerPort`|Server port|`obj['minioServerPort']`, `process.env['MINIO_SERVER_PORT']`|**optional**|```9000```|```9000```|
|`minioAccessKey`|Access key|`obj['minioAccessKey']`, `process.env['MINIO_ACCESS_KEY']`|**isNotEmpty** (minioAccessKey should not be empty)|-|-|
|`minioSecretKey`|Secret key|`obj['minioSecretKey']`, `process.env['MINIO_SECRET_KEY']`|**isNotEmpty** (minioSecretKey should not be empty)|-|-|
|`minioUseSSL`|Use SSL|`obj['minioUseSSL']`, `process.env['MINIO_USE_SSL']`|**optional**|```false```|```false```|
|`minioDefaultUserId`|Default user id|`obj['minioDefaultUserId']`, `process.env['MINIO_DEFAULT_USER_ID']`|**optional**|```default```|```default```|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`featureName`|Feature name for generate prefix to environments keys|**optional**|-|-|
|`region`|Region|**optional**|```us-east-1```|-|
|`transport`|Transport|**optional**|-|-|
|`sessionToken`|Session token|**optional**|-|-|
|`partSize`|Part size|**optional**|-|-|
|`pathStyle`|Config options name|**optional**|```true```|-|
|`credentialsProvider`|Credentials provider|**optional**|-|-|
|`s3AccelerateEndpoint`|S3 accelerate endpoint|**optional**|-|-|
|`transportAgent`|Transport agent|**optional**|-|-|
|`buckets`|Buckets with policy|**optional**|```{"images":{"policy":{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":["*"]},"Action":["s3:PutObject","s3:AbortMultipartUpload","s3:DeleteObject","s3:GetObject"],"Resource":["arn:aws:s3:::images/*.jpg","arn:aws:s3:::images/*.jpeg","arn:aws:s3:::images/*.png","arn:aws:s3:::images/*.gif"]}],"Conditions":[["content-length-range",5242880]]},"ext":["jpg","jpeg","png","gif"]},"video":{"policy":{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":["*"]},"Action":["s3:PutObject","s3:AbortMultipartUpload","s3:DeleteObject","s3:GetObject"],"Resource":["arn:aws:s3:::video/*.mp4"]}],"Conditions":[["content-length-range",52428800]]},"ext":["mp4"]},"documents":{"policy":{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":["*"]},"Action":["s3:PutObject","s3:AbortMultipartUpload","s3:DeleteObject","s3:GetObject"],"Resource":["arn:aws:s3:::documents/*.doc","arn:aws:s3:::documents/*.docx","arn:aws:s3:::documents/*.xls","arn:aws:s3:::documents/*.md","arn:aws:s3:::documents/*.odt","arn:aws:s3:::documents/*.txt","arn:aws:s3:::documents/*.xml","arn:aws:s3:::documents/*.rtf","arn:aws:s3:::documents/*.csv"]}],"Conditions":[["content-length-range",10485760]]},"ext":["doc","docx","xls","md","odt","txt","xml","rtf","csv"]}}```|-|

[Back to Top](#modules)

## Links

* https://github.com/nestjs-mod/nestjs-mod - A collection of utilities for unifying NestJS applications and modules
* https://github.com/nestjs-mod/nestjs-mod-contrib - Contrib repository for the NestJS-mod
* https://github.com/nestjs-mod/nestjs-mod-example - Example application built with [@nestjs-mod/schematics](https://github.com/nestjs-mod/nestjs-mod/tree/master/libs/schematics)
* https://github.com/nestjs-mod/nestjs-mod/blob/master/apps/example-basic/INFRASTRUCTURE.MD - A simple example of infrastructure documentation.
* https://github.com/nestjs-mod/nestjs-mod-contrib/blob/master/apps/example-prisma/INFRASTRUCTURE.MD - An extended example of infrastructure documentation with a docker-compose file and a data base.
* https://dev.to/endykaufman/collection-of-nestjs-mod-utilities-for-unifying-applications-and-modules-on-nestjs-5256 - Article about the project NestJS-mod
* https://habr.com/ru/articles/788916 - Коллекция утилит NestJS-mod для унификации приложений и модулей на NestJS


## License

MIT

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/minio
[npm-url]: https://npmjs.org/package/@nestjs-mod/minio
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[discord-image]: https://img.shields.io/badge/discord-online-brightgreen.svg
[discord-url]: https://discord.gg/meY7UXaG
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/minio
[downloads-url]: https://npmjs.org/package/@nestjs-mod/minio
